// API Route: /api/analyze
// Handles POST requests to generate SWOT analysis using Groq, Together.ai, or OpenAI

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { idea, focusArea = 'Market' } = req.body;

  // Validate input
  if (!idea || typeof idea !== 'string') {
    return res.status(400).json({ error: 'Invalid idea parameter' });
  }

  const trimmedIdea = idea.trim();
  if (trimmedIdea.length < 10 || trimmedIdea.length > 500) {
    return res.status(400).json({ error: 'Idea must be between 10 and 500 characters' });
  }

  // Check for API key (Groq first, then Together.ai, then OpenAI)
  const groqKey = process.env.GROQ_API_KEY;
  const togetherKey = process.env.TOGETHER_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!groqKey && !togetherKey && !openaiKey) {
    console.error('Missing API key - no GROQ_API_KEY, TOGETHER_API_KEY, or OPENAI_API_KEY found');
    return res.status(500).json({ error: 'API configuration error' });
  }

  try {
    // Determine which API to use (priority: Groq > Together.ai > OpenAI)
    let swotData;
    if (groqKey) {
      swotData = await analyzeWithGroq(trimmedIdea, focusArea, groqKey);
    } else if (togetherKey) {
      swotData = await analyzeWithTogetherAI(trimmedIdea, focusArea, togetherKey);
    } else {
      swotData = await analyzeWithOpenAI(trimmedIdea, focusArea, openaiKey);
    }

    return res.status(200).json(swotData);
  } catch (error) {
    console.error('Analysis error:', error);
    return res.status(500).json({ error: 'Failed to analyze idea. Please try again.' });
  }
}

// Analyze using Groq API (groq.com)
async function analyzeWithGroq(idea, focusArea, apiKey) {
  const prompt = `You are a business analyst. Analyze the following business idea and provide a SWOT analysis.

Business Idea: "${idea}"
Focus Area: ${focusArea}

Provide your response in the following JSON format ONLY (no markdown, no extra text):
{
  "Strengths": ["strength1", "strength2", "strength3"],
  "Weaknesses": ["weakness1", "weakness2", "weakness3"],
  "Opportunities": ["opportunity1", "opportunity2", "opportunity3"],
  "Threats": ["threat1", "threat2", "threat3"],
  "NicheScore": 75
}

Ensure NicheScore is an integer between 0-100 representing market viability.`;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: 'You are a business analyst. Respond only with valid JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Groq API error: ${response.statusText} - ${errorData.error?.message || ''}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || '';

  return parseSwotResponse(content);
}

// Analyze using Together.ai API
async function analyzeWithTogetherAI(idea, focusArea, apiKey) {
  const prompt = `You are a business analyst. Analyze the following business idea and provide a SWOT analysis.

Business Idea: "${idea}"
Focus Area: ${focusArea}

Provide your response in the following JSON format ONLY (no markdown, no extra text):
{
  "Strengths": ["strength1", "strength2", "strength3"],
  "Weaknesses": ["weakness1", "weakness2", "weakness3"],
  "Opportunities": ["opportunity1", "opportunity2", "opportunity3"],
  "Threats": ["threat1", "threat2", "threat3"],
  "NicheScore": 75
}

Ensure NicheScore is an integer between 0-100 representing market viability.`;

  const response = await fetch('https://api.together.xyz/inference', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'meta-llama/Llama-2-70b-chat-hf',
      prompt: prompt,
      max_tokens: 1024,
      temperature: 0.7,
      top_p: 0.9,
    }),
  });

  if (!response.ok) {
    throw new Error(`Together.ai API error: ${response.statusText}`);
  }

  const data = await response.json();
  const content = data.output?.choices?.[0]?.text || '';

  return parseSwotResponse(content);
}

// Analyze using OpenAI API
async function analyzeWithOpenAI(idea, focusArea, apiKey) {
  const prompt = `You are a business analyst. Analyze the following business idea and provide a SWOT analysis.

Business Idea: "${idea}"
Focus Area: ${focusArea}

Provide your response in the following JSON format ONLY (no markdown, no extra text):
{
  "Strengths": ["strength1", "strength2", "strength3"],
  "Weaknesses": ["weakness1", "weakness2", "weakness3"],
  "Opportunities": ["opportunity1", "opportunity2", "opportunity3"],
  "Threats": ["threat1", "threat2", "threat3"],
  "NicheScore": 75
}

Ensure NicheScore is an integer between 0-100 representing market viability.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a business analyst. Respond only with valid JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || '';

  return parseSwotResponse(content);
}

// Parse and validate the LLM response
function parseSwotResponse(content) {
  try {
    // Extract JSON from the response (handle markdown code blocks)
    let jsonStr = content.trim();
    
    // Remove markdown code blocks if present
    if (jsonStr.includes('```json')) {
      jsonStr = jsonStr.split('```json')[1].split('```')[0].trim();
    } else if (jsonStr.includes('```')) {
      jsonStr = jsonStr.split('```')[1].split('```')[0].trim();
    }

    const parsed = JSON.parse(jsonStr);

    // Validate structure
    const result = {
      Strengths: Array.isArray(parsed.Strengths) ? parsed.Strengths.slice(0, 5) : [],
      Weaknesses: Array.isArray(parsed.Weaknesses) ? parsed.Weaknesses.slice(0, 5) : [],
      Opportunities: Array.isArray(parsed.Opportunities) ? parsed.Opportunities.slice(0, 5) : [],
      Threats: Array.isArray(parsed.Threats) ? parsed.Threats.slice(0, 5) : [],
      NicheScore: Math.min(100, Math.max(0, parseInt(parsed.NicheScore) || 50)),
    };

    return result;
  } catch (error) {
    console.error('Parse error:', error);
    // Return default response if parsing fails
    return {
      Strengths: ['Innovative concept', 'Clear value proposition'],
      Weaknesses: ['Market validation needed', 'Resource constraints'],
      Opportunities: ['Growing market demand', 'Strategic partnerships'],
      Threats: ['Competitive landscape', 'Market saturation'],
      NicheScore: 50,
    };
  }
}

