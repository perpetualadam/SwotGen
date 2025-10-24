// API Route: /api/analyze
// Handles POST requests to generate strategic analysis using Groq, Together.ai, or OpenAI
// Supports multiple frameworks: SWOT, PESTLE, Porter's Five Forces, NOISE, Balanced Scorecard, VRIO, McKinsey 7S, Business Model Canvas, Ansoff Matrix, Value Proposition Canvas

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { idea, focusArea = 'Market', framework = 'swot' } = req.body;

  // Validate input
  if (!idea || typeof idea !== 'string') {
    return res.status(400).json({ error: 'Invalid idea parameter' });
  }

  const trimmedIdea = idea.trim();
  if (trimmedIdea.length < 3 || trimmedIdea.length > 500) {
    return res.status(400).json({ error: 'Idea must be between 3 and 500 characters' });
  }

  // Validate framework
  const validFrameworks = ['swot', 'pestle', 'porters', 'noise', 'balanced-scorecard', 'vrio', 'mckinsey-7s', 'bmc', 'ansoff', 'vpc'];
  const selectedFramework = validFrameworks.includes(framework) ? framework : 'swot';

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
    let analysisData;
    if (groqKey) {
      analysisData = await analyzeWithGroq(trimmedIdea, focusArea, selectedFramework, groqKey);
    } else if (togetherKey) {
      analysisData = await analyzeWithTogetherAI(trimmedIdea, focusArea, selectedFramework, togetherKey);
    } else {
      analysisData = await analyzeWithOpenAI(trimmedIdea, focusArea, selectedFramework, openaiKey);
    }

    return res.status(200).json(analysisData);
  } catch (error) {
    console.error('Analysis error:', error);
    return res.status(500).json({ error: 'Failed to analyze idea. Please try again.' });
  }
}

// Generate prompt based on framework
function generatePrompt(idea, focusArea, framework) {
  const baseContext = `Business Idea: "${idea}"\nFocus Area: ${focusArea}`;

  switch (framework) {
    case 'pestle':
      return `You are a business analyst. Analyze the following business idea using PESTLE analysis.

${baseContext}

Provide your response in the following JSON format ONLY (no markdown, no extra text):
{
  "Political": ["factor1", "factor2", "factor3"],
  "Economic": ["factor1", "factor2", "factor3"],
  "Social": ["factor1", "factor2", "factor3"],
  "Technological": ["factor1", "factor2", "factor3"],
  "Legal": ["factor1", "factor2", "factor3"],
  "Environmental": ["factor1", "factor2", "factor3"],
  "ViabilityScore": 75
}

Ensure ViabilityScore is an integer between 0-100.`;

    case 'porters':
      return `You are a business analyst. Analyze the following business idea using Porter's Five Forces framework.

${baseContext}

Provide your response in the following JSON format ONLY (no markdown, no extra text):
{
  "CompetitiveRivalry": ["factor1", "factor2", "factor3"],
  "SupplierPower": ["factor1", "factor2", "factor3"],
  "BuyerPower": ["factor1", "factor2", "factor3"],
  "ThreatOfSubstitution": ["factor1", "factor2", "factor3"],
  "ThreatOfNewEntry": ["factor1", "factor2", "factor3"],
  "CompetitiveIntensity": 75
}

Ensure CompetitiveIntensity is an integer between 0-100.`;

    case 'noise':
      return `You are a business analyst. Analyze the following business idea using NOISE analysis.

${baseContext}

Provide your response in the following JSON format ONLY (no markdown, no extra text):
{
  "Needs": ["need1", "need2", "need3"],
  "Opportunities": ["opp1", "opp2", "opp3"],
  "Improvements": ["imp1", "imp2", "imp3"],
  "Strengths": ["str1", "str2", "str3"],
  "Exceptions": ["exc1", "exc2", "exc3"],
  "PotentialScore": 75
}

Ensure PotentialScore is an integer between 0-100.`;

    case 'balanced-scorecard':
      return `You are a business analyst. Analyze the following business idea using Balanced Scorecard framework.

${baseContext}

Provide your response in the following JSON format ONLY (no markdown, no extra text):
{
  "Financial": ["metric1", "metric2", "metric3"],
  "Customer": ["metric1", "metric2", "metric3"],
  "InternalProcesses": ["metric1", "metric2", "metric3"],
  "LearningGrowth": ["metric1", "metric2", "metric3"],
  "StrategicAlignment": 75
}

Ensure StrategicAlignment is an integer between 0-100.`;

    case 'vrio':
      return `You are a business analyst. Analyze the following business idea using VRIO framework.

${baseContext}

Provide your response in the following JSON format ONLY (no markdown, no extra text):
{
  "Value": ["factor1", "factor2", "factor3"],
  "Rarity": ["factor1", "factor2", "factor3"],
  "Imitability": ["factor1", "factor2", "factor3"],
  "Organization": ["factor1", "factor2", "factor3"],
  "CompetitiveAdvantage": 75
}

Ensure CompetitiveAdvantage is an integer between 0-100.`;

    case 'mckinsey-7s':
      return `You are a business analyst. Analyze the following business idea using McKinsey 7S Model.

${baseContext}

Provide your response in the following JSON format ONLY (no markdown, no extra text):
{
  "Strategy": ["element1", "element2", "element3"],
  "Structure": ["element1", "element2", "element3"],
  "Systems": ["element1", "element2", "element3"],
  "SharedValues": ["element1", "element2", "element3"],
  "Skills": ["element1", "element2", "element3"],
  "Style": ["element1", "element2", "element3"],
  "Staff": ["element1", "element2", "element3"],
  "OrganizationalAlignment": 75
}

Ensure OrganizationalAlignment is an integer between 0-100.`;

    case 'bmc':
      return `You are a business analyst. Analyze the following business idea using the Business Model Canvas framework.

${baseContext}

Provide your response in the following JSON format ONLY (no markdown, no extra text):
{
  "CustomerSegments": ["segment1", "segment2", "segment3"],
  "ValuePropositions": ["value1", "value2", "value3"],
  "Channels": ["channel1", "channel2", "channel3"],
  "CustomerRelationships": ["relationship1", "relationship2", "relationship3"],
  "RevenueStreams": ["stream1", "stream2", "stream3"],
  "KeyResources": ["resource1", "resource2", "resource3"],
  "KeyActivities": ["activity1", "activity2", "activity3"],
  "KeyPartnerships": ["partner1", "partner2", "partner3"],
  "CostStructure": ["cost1", "cost2", "cost3"],
  "BusinessViability": 75
}

Ensure BusinessViability is an integer between 0-100.`;

    case 'ansoff':
      return `You are a business analyst. Analyze the following business idea using the Ansoff Matrix framework.

${baseContext}

Provide your response in the following JSON format ONLY (no markdown, no extra text):
{
  "MarketPenetration": ["strategy1", "strategy2", "strategy3"],
  "MarketDevelopment": ["strategy1", "strategy2", "strategy3"],
  "ProductDevelopment": ["strategy1", "strategy2", "strategy3"],
  "Diversification": ["strategy1", "strategy2", "strategy3"],
  "GrowthPotential": 75
}

Ensure GrowthPotential is an integer between 0-100.`;

    case 'vpc':
      return `You are a business analyst. Analyze the following business idea using the Value Proposition Canvas framework.

${baseContext}

Provide your response in the following JSON format ONLY (no markdown, no extra text):
{
  "CustomerJobs": ["job1", "job2", "job3"],
  "Pains": ["pain1", "pain2", "pain3"],
  "Gains": ["gain1", "gain2", "gain3"],
  "ProductsServices": ["product1", "product2", "product3"],
  "PainRelievers": ["reliever1", "reliever2", "reliever3"],
  "GainCreators": ["creator1", "creator2", "creator3"],
  "ValueAlignment": 75
}

Ensure ValueAlignment is an integer between 0-100.`;

    default: // SWOT
      return `You are a business analyst. Analyze the following business idea and provide a SWOT analysis.

${baseContext}

Provide your response in the following JSON format ONLY (no markdown, no extra text):
{
  "Strengths": ["strength1", "strength2", "strength3"],
  "Weaknesses": ["weakness1", "weakness2", "weakness3"],
  "Opportunities": ["opportunity1", "opportunity2", "opportunity3"],
  "Threats": ["threat1", "threat2", "threat3"],
  "NicheScore": 75
}

Ensure NicheScore is an integer between 0-100 representing market viability.`;
  }
}

// Analyze using Groq API (groq.com)
async function analyzeWithGroq(idea, focusArea, framework, apiKey) {
  const prompt = generatePrompt(idea, focusArea, framework);

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

  return parseFrameworkResponse(content, framework);
}

// Analyze using Together.ai API
async function analyzeWithTogetherAI(idea, focusArea, framework, apiKey) {
  const prompt = generatePrompt(idea, focusArea, framework);

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

  return parseFrameworkResponse(content, framework);
}

// Analyze using OpenAI API
async function analyzeWithOpenAI(idea, focusArea, framework, apiKey) {
  const prompt = generatePrompt(idea, focusArea, framework);

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

  return parseFrameworkResponse(content, framework);
}

// Parse and validate the LLM response based on framework
function parseFrameworkResponse(content, framework) {
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

    // Validate and normalize based on framework
    switch (framework) {
      case 'pestle':
        return {
          Political: Array.isArray(parsed.Political) ? parsed.Political.slice(0, 5) : [],
          Economic: Array.isArray(parsed.Economic) ? parsed.Economic.slice(0, 5) : [],
          Social: Array.isArray(parsed.Social) ? parsed.Social.slice(0, 5) : [],
          Technological: Array.isArray(parsed.Technological) ? parsed.Technological.slice(0, 5) : [],
          Legal: Array.isArray(parsed.Legal) ? parsed.Legal.slice(0, 5) : [],
          Environmental: Array.isArray(parsed.Environmental) ? parsed.Environmental.slice(0, 5) : [],
          ViabilityScore: Math.min(100, Math.max(0, parseInt(parsed.ViabilityScore) || 50)),
        };

      case 'porters':
        return {
          CompetitiveRivalry: Array.isArray(parsed.CompetitiveRivalry) ? parsed.CompetitiveRivalry.slice(0, 5) : [],
          SupplierPower: Array.isArray(parsed.SupplierPower) ? parsed.SupplierPower.slice(0, 5) : [],
          BuyerPower: Array.isArray(parsed.BuyerPower) ? parsed.BuyerPower.slice(0, 5) : [],
          ThreatOfSubstitution: Array.isArray(parsed.ThreatOfSubstitution) ? parsed.ThreatOfSubstitution.slice(0, 5) : [],
          ThreatOfNewEntry: Array.isArray(parsed.ThreatOfNewEntry) ? parsed.ThreatOfNewEntry.slice(0, 5) : [],
          CompetitiveIntensity: Math.min(100, Math.max(0, parseInt(parsed.CompetitiveIntensity) || 50)),
        };

      case 'noise':
        return {
          Needs: Array.isArray(parsed.Needs) ? parsed.Needs.slice(0, 5) : [],
          Opportunities: Array.isArray(parsed.Opportunities) ? parsed.Opportunities.slice(0, 5) : [],
          Improvements: Array.isArray(parsed.Improvements) ? parsed.Improvements.slice(0, 5) : [],
          Strengths: Array.isArray(parsed.Strengths) ? parsed.Strengths.slice(0, 5) : [],
          Exceptions: Array.isArray(parsed.Exceptions) ? parsed.Exceptions.slice(0, 5) : [],
          PotentialScore: Math.min(100, Math.max(0, parseInt(parsed.PotentialScore) || 50)),
        };

      case 'balanced-scorecard':
        return {
          Financial: Array.isArray(parsed.Financial) ? parsed.Financial.slice(0, 5) : [],
          Customer: Array.isArray(parsed.Customer) ? parsed.Customer.slice(0, 5) : [],
          InternalProcesses: Array.isArray(parsed.InternalProcesses) ? parsed.InternalProcesses.slice(0, 5) : [],
          LearningGrowth: Array.isArray(parsed.LearningGrowth) ? parsed.LearningGrowth.slice(0, 5) : [],
          StrategicAlignment: Math.min(100, Math.max(0, parseInt(parsed.StrategicAlignment) || 50)),
        };

      case 'vrio':
        return {
          Value: Array.isArray(parsed.Value) ? parsed.Value.slice(0, 5) : [],
          Rarity: Array.isArray(parsed.Rarity) ? parsed.Rarity.slice(0, 5) : [],
          Imitability: Array.isArray(parsed.Imitability) ? parsed.Imitability.slice(0, 5) : [],
          Organization: Array.isArray(parsed.Organization) ? parsed.Organization.slice(0, 5) : [],
          CompetitiveAdvantage: Math.min(100, Math.max(0, parseInt(parsed.CompetitiveAdvantage) || 50)),
        };

      case 'mckinsey-7s':
        return {
          Strategy: Array.isArray(parsed.Strategy) ? parsed.Strategy.slice(0, 5) : [],
          Structure: Array.isArray(parsed.Structure) ? parsed.Structure.slice(0, 5) : [],
          Systems: Array.isArray(parsed.Systems) ? parsed.Systems.slice(0, 5) : [],
          SharedValues: Array.isArray(parsed.SharedValues) ? parsed.SharedValues.slice(0, 5) : [],
          Skills: Array.isArray(parsed.Skills) ? parsed.Skills.slice(0, 5) : [],
          Style: Array.isArray(parsed.Style) ? parsed.Style.slice(0, 5) : [],
          Staff: Array.isArray(parsed.Staff) ? parsed.Staff.slice(0, 5) : [],
          OrganizationalAlignment: Math.min(100, Math.max(0, parseInt(parsed.OrganizationalAlignment) || 50)),
        };

      case 'bmc':
        return {
          CustomerSegments: Array.isArray(parsed.CustomerSegments) ? parsed.CustomerSegments.slice(0, 5) : [],
          ValuePropositions: Array.isArray(parsed.ValuePropositions) ? parsed.ValuePropositions.slice(0, 5) : [],
          Channels: Array.isArray(parsed.Channels) ? parsed.Channels.slice(0, 5) : [],
          CustomerRelationships: Array.isArray(parsed.CustomerRelationships) ? parsed.CustomerRelationships.slice(0, 5) : [],
          RevenueStreams: Array.isArray(parsed.RevenueStreams) ? parsed.RevenueStreams.slice(0, 5) : [],
          KeyResources: Array.isArray(parsed.KeyResources) ? parsed.KeyResources.slice(0, 5) : [],
          KeyActivities: Array.isArray(parsed.KeyActivities) ? parsed.KeyActivities.slice(0, 5) : [],
          KeyPartnerships: Array.isArray(parsed.KeyPartnerships) ? parsed.KeyPartnerships.slice(0, 5) : [],
          CostStructure: Array.isArray(parsed.CostStructure) ? parsed.CostStructure.slice(0, 5) : [],
          BusinessViability: Math.min(100, Math.max(0, parseInt(parsed.BusinessViability) || 50)),
        };

      case 'ansoff':
        return {
          MarketPenetration: Array.isArray(parsed.MarketPenetration) ? parsed.MarketPenetration.slice(0, 5) : [],
          MarketDevelopment: Array.isArray(parsed.MarketDevelopment) ? parsed.MarketDevelopment.slice(0, 5) : [],
          ProductDevelopment: Array.isArray(parsed.ProductDevelopment) ? parsed.ProductDevelopment.slice(0, 5) : [],
          Diversification: Array.isArray(parsed.Diversification) ? parsed.Diversification.slice(0, 5) : [],
          GrowthPotential: Math.min(100, Math.max(0, parseInt(parsed.GrowthPotential) || 50)),
        };

      case 'vpc':
        return {
          CustomerJobs: Array.isArray(parsed.CustomerJobs) ? parsed.CustomerJobs.slice(0, 5) : [],
          Pains: Array.isArray(parsed.Pains) ? parsed.Pains.slice(0, 5) : [],
          Gains: Array.isArray(parsed.Gains) ? parsed.Gains.slice(0, 5) : [],
          ProductsServices: Array.isArray(parsed.ProductsServices) ? parsed.ProductsServices.slice(0, 5) : [],
          PainRelievers: Array.isArray(parsed.PainRelievers) ? parsed.PainRelievers.slice(0, 5) : [],
          GainCreators: Array.isArray(parsed.GainCreators) ? parsed.GainCreators.slice(0, 5) : [],
          ValueAlignment: Math.min(100, Math.max(0, parseInt(parsed.ValueAlignment) || 50)),
        };

      default: // SWOT
        return {
          Strengths: Array.isArray(parsed.Strengths) ? parsed.Strengths.slice(0, 5) : [],
          Weaknesses: Array.isArray(parsed.Weaknesses) ? parsed.Weaknesses.slice(0, 5) : [],
          Opportunities: Array.isArray(parsed.Opportunities) ? parsed.Opportunities.slice(0, 5) : [],
          Threats: Array.isArray(parsed.Threats) ? parsed.Threats.slice(0, 5) : [],
          NicheScore: Math.min(100, Math.max(0, parseInt(parsed.NicheScore) || 50)),
        };
    }
  } catch (error) {
    console.error('Parse error:', error);
    // Return default response based on framework
    return getDefaultResponse(framework);
  }
}

// Get default response for a framework
function getDefaultResponse(framework) {
  switch (framework) {
    case 'pestle':
      return {
        Political: ['Stable regulatory environment', 'Government support'],
        Economic: ['Growing market', 'Favorable economic conditions'],
        Social: ['Changing consumer preferences', 'Demographic trends'],
        Technological: ['Digital transformation', 'Emerging technologies'],
        Legal: ['Compliance requirements', 'Industry regulations'],
        Environmental: ['Sustainability concerns', 'Green initiatives'],
        ViabilityScore: 50,
      };

    case 'porters':
      return {
        CompetitiveRivalry: ['Moderate competition', 'Differentiation opportunities'],
        SupplierPower: ['Multiple suppliers', 'Reasonable pricing'],
        BuyerPower: ['Price-sensitive customers', 'Switching costs'],
        ThreatOfSubstitution: ['Alternative solutions', 'Emerging substitutes'],
        ThreatOfNewEntry: ['Market barriers', 'Capital requirements'],
        CompetitiveIntensity: 50,
      };

    case 'noise':
      return {
        Needs: ['Customer pain points', 'Market gaps'],
        Opportunities: ['Market expansion', 'New segments'],
        Improvements: ['Process optimization', 'Quality enhancement'],
        Strengths: ['Core competencies', 'Unique capabilities'],
        Exceptions: ['Standout features', 'Competitive advantages'],
        PotentialScore: 50,
      };

    case 'balanced-scorecard':
      return {
        Financial: ['Revenue growth', 'Profitability targets'],
        Customer: ['Customer satisfaction', 'Market share'],
        InternalProcesses: ['Operational efficiency', 'Quality metrics'],
        LearningGrowth: ['Employee development', 'Innovation capacity'],
        StrategicAlignment: 50,
      };

    case 'vrio':
      return {
        Value: ['Customer value creation', 'Problem solving'],
        Rarity: ['Unique resources', 'Distinctive capabilities'],
        Imitability: ['Difficult to replicate', 'Proprietary processes'],
        Organization: ['Organizational readiness', 'Resource alignment'],
        CompetitiveAdvantage: 50,
      };

    case 'mckinsey-7s':
      return {
        Strategy: ['Business direction', 'Competitive positioning'],
        Structure: ['Organizational design', 'Reporting relationships'],
        Systems: ['Business processes', 'Technology infrastructure'],
        SharedValues: ['Company culture', 'Core values'],
        Skills: ['Key competencies', 'Talent capabilities'],
        Style: ['Leadership approach', 'Management style'],
        Staff: ['Team composition', 'Talent management'],
        OrganizationalAlignment: 50,
      };

    case 'bmc':
      return {
        CustomerSegments: ['Primary target market', 'Secondary segments'],
        ValuePropositions: ['Core value delivery', 'Unique benefits'],
        Channels: ['Distribution channels', 'Customer touchpoints'],
        CustomerRelationships: ['Engagement strategy', 'Support model'],
        RevenueStreams: ['Primary revenue source', 'Secondary streams'],
        KeyResources: ['Essential assets', 'Critical capabilities'],
        KeyActivities: ['Core operations', 'Key processes'],
        KeyPartnerships: ['Strategic partners', 'Supplier relationships'],
        CostStructure: ['Fixed costs', 'Variable costs'],
        BusinessViability: 50,
      };

    case 'ansoff':
      return {
        MarketPenetration: ['Increase market share', 'Improve customer retention'],
        MarketDevelopment: ['Enter new geographic markets', 'Target new customer segments'],
        ProductDevelopment: ['Develop new features', 'Create product variations'],
        Diversification: ['Explore new markets', 'Develop new products'],
        GrowthPotential: 50,
      };

    case 'vpc':
      return {
        CustomerJobs: ['Primary customer need', 'Secondary objectives'],
        Pains: ['Customer frustrations', 'Market challenges'],
        Gains: ['Desired outcomes', 'Success metrics'],
        ProductsServices: ['Core offering', 'Supporting services'],
        PainRelievers: ['Problem solutions', 'Friction reduction'],
        GainCreators: ['Value delivery', 'Benefit realization'],
        ValueAlignment: 50,
      };

    default: // SWOT
      return {
        Strengths: ['Innovative concept', 'Clear value proposition'],
        Weaknesses: ['Market validation needed', 'Resource constraints'],
        Opportunities: ['Growing market demand', 'Strategic partnerships'],
        Threats: ['Competitive landscape', 'Market saturation'],
        NicheScore: 50,
      };
  }
}

