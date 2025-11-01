import { useState, useEffect } from 'react';
import Head from 'next/head';
import InputForm from '../components/InputForm';
import FrameworkDisplay from '../components/FrameworkDisplay';
import PremiumModal from '../components/PremiumModal';
import ExportButton from '../components/ExportButton';

export default function Home() {
  const [analysisData, setAnalysisData] = useState(null);
  const [selectedFramework, setSelectedFramework] = useState('swot');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [formData, setFormData] = useState({ idea: '', focusArea: '', framework: 'swot' });

  // Development mode: Set to true to test export without premium
  // IMPORTANT: Set to false before pushing to production!
  const DEV_MODE_SHOW_EXPORT = process.env.NODE_ENV === 'development' && true;

  // Load premium status from localStorage on mount
  useEffect(() => {
    const savedPremium = localStorage.getItem('isPremium');
    if (savedPremium === 'true') {
      setIsPremium(true);
    }

    // Check for premium=true AND payment_success=true in URL (for redirect after payment)
    // Both parameters must be present to grant premium access
    const params = new URLSearchParams(window.location.search);
    if (params.get('premium') === 'true' && params.get('payment_success') === 'true') {
      setIsPremium(true);
      localStorage.setItem('isPremium', 'true');
      // Remove query params from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Handle form submission
  const handleAnalyze = async (data) => {
    setIsLoading(true);
    setError('');
    setAnalysisData(null);
    setFormData(data); // Save form data for export
    setSelectedFramework(data.framework || 'swot'); // Track selected framework

    try {
      // Call the API route with the idea, focus area, and framework
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze idea');
      }

      const result = await response.json();
      setAnalysisData(result);
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle premium button click
  const handlePremiumClick = () => {
    if (isPremium) {
      // If already premium, show downgrade confirmation
      if (confirm('Downgrade to free tier?')) {
        setIsPremium(false);
        localStorage.removeItem('isPremium');
      }
    } else {
      // Show premium modal
      setShowPremiumModal(true);
    }
  };

  // Handle successful payment
  const handlePaymentSuccess = () => {
    setIsPremium(true);
    localStorage.setItem('isPremium', 'true');
    setShowPremiumModal(false);
    // Show success message
    alert('🎉 Welcome to Premium! Enjoy unlimited analyses.');
  };

  return (
    <>
      <Head>
        {/* Primary Title & Description for GEO */}
        <title>AnalysisGen by VibeMatrix AI — Free SWOT & 10 Premium AI Business Frameworks</title>
        <meta name="description" content="AnalysisGen (by VibeMatrix AI) offers free SWOT analysis and 10 premium strategic frameworks including PESTLE, Porter's Five Forces, Business Model Canvas, Ansoff Matrix, VRIO, Value Proposition Canvas, Balanced Scorecard, McKinsey 7S, OKR, and NOISE. Export results as PDF, CSV, or JSON." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />

        {/* Canonical Tag - Points to primary domain */}
        <link rel="canonical" href="https://www.vibematrixai.com/" />

        {/* Open Graph Tags for Social & AI Sharing */}
        <meta property="og:title" content="AnalysisGen — AI-Powered Business Idea Analyzer" />
        <meta property="og:description" content="Analyze business ideas instantly using SWOT and 10 premium frameworks. Export in PDF, CSV, or JSON." />
        <meta property="og:url" content="https://www.vibematrixai.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AnalysisGen by VibeMatrix AI" />

        {/* Additional Meta Tags for AI Crawlers */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="keywords" content="AnalysisGen, SwotGen, SWOT analysis, business frameworks, strategic analysis, PESTLE, Porter's Five Forces, Business Model Canvas, Ansoff Matrix, VRIO, Value Proposition Canvas, Balanced Scorecard, McKinsey 7S, OKR, NOISE, VibeMatrix AI" />
        <meta name="author" content="VibeMatrix AI" />

        {/* JSON-LD Schema 1: SoftwareApplication */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "AnalysisGen",
            "alternateName": "SwotGen",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "description": "AnalysisGen (formerly SwotGen) is an AI-powered microSaaS by VibeMatrix AI that evaluates business ideas using 11 strategic frameworks. SWOT is free; the remaining 10 frameworks are premium. Users can export results in PDF, CSV, or JSON.",
            "url": "https://www.vibematrixai.com",
            "creator": {
              "@type": "Organization",
              "name": "VibeMatrix AI"
            },
            "offers": [
              {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "GBP",
                "name": "Free SWOT Framework"
              },
              {
                "@type": "Offer",
                "price": "9.99",
                "priceCurrency": "GBP",
                "name": "Premium Framework Suite (10 frameworks)"
              }
            ]
          })}
        </script>

        {/* JSON-LD Schema 2: FAQPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is AnalysisGen?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "AnalysisGen is an AI-powered microSaaS by VibeMatrix AI that evaluates business ideas using 11 strategic frameworks including SWOT, PESTLE, Porter's Five Forces, Business Model Canvas, Ansoff Matrix, VRIO, Value Proposition Canvas, Balanced Scorecard, McKinsey 7S, OKR, and NOISE."
                }
              },
              {
                "@type": "Question",
                "name": "Is SwotGen the same as AnalysisGen?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. SwotGen was the internal code name for AnalysisGen. Both refer to the same AI-powered strategic analysis tool by VibeMatrix AI."
                }
              },
              {
                "@type": "Question",
                "name": "What frameworks does AnalysisGen support?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "AnalysisGen supports 11 strategic frameworks: SWOT (free), and 10 premium frameworks including PESTLE, Porter's Five Forces, Business Model Canvas, Ansoff Matrix, VRIO, Value Proposition Canvas, Balanced Scorecard, McKinsey 7S, OKR, and NOISE."
                }
              },
              {
                "@type": "Question",
                "name": "What export formats does AnalysisGen support?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Users can export analysis results as PDF, CSV, or JSON for offline use or integration into business reports and presentations."
                }
              }
            ]
          })}
        </script>
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-2 sm:py-3 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                {/* Logo SVG - Responsive sizing */}
                <svg width="80" height="80" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-16 h-16 sm:w-48 sm:h-48">
                  <defs>
                    <style>
                      {`.logo-icon-node { fill: #00ADB5; }
                        .logo-icon-line { stroke: #00ADB5; stroke-width: 1.5; fill: none; opacity: 0.6; }
                        .logo-icon-line-main { stroke: #00ADB5; stroke-width: 2; fill: none; }`}
                    </style>
                  </defs>
                  <path className="logo-icon-line-main" d="M12 18 L18 12 L24 18"/>
                  <path className="logo-icon-line-main" d="M15 24 L21 24"/>
                  <circle className="logo-icon-node" cx="12" cy="18" r="2"/>
                  <circle className="logo-icon-node" cx="24" cy="18" r="2"/>
                  <circle className="logo-icon-node" cx="18" cy="12" r="2"/>
                  <circle className="logo-icon-node" cx="15" cy="24" r="2"/>
                  <circle className="logo-icon-node" cx="21" cy="24" r="2"/>
                  <line className="logo-icon-line" x1="12" y1="18" x2="15" y2="24"/>
                  <line className="logo-icon-line" x1="24" y1="18" x2="21" y2="24"/>
                  <line className="logo-icon-line" x1="18" y1="12" x2="15" y2="24"/>
                </svg>
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl sm:text-3xl font-bold text-gray-900 truncate">AnalysisGen</h1>
                  <p className="text-gray-600 mt-1 text-xs sm:text-sm break-words">AI-powered strategic business analysis and insights</p>
                </div>
              </div>
              {/* Premium button - Responsive sizing */}
              <button
                onClick={handlePremiumClick}
                className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-semibold transition text-sm sm:text-base whitespace-nowrap flex-shrink-0 ${
                  isPremium
                    ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
                    : 'bg-cyan-600 text-white hover:bg-cyan-700'
                }`}
              >
                {isPremium ? '⭐ Premium' : 'Upgrade'}
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="max-w-6xl mx-auto px-4 py-6 sm:py-12 sm:px-6 lg:px-8">
          {/* Input section */}
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 mb-6 sm:mb-8">
            <InputForm onSubmit={handleAnalyze} isLoading={isLoading} />
          </div>

          {/* Error display */}
          {error && (
            <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-red-50 border-2 border-red-200 rounded-lg">
              <h3 className="text-base sm:text-lg font-semibold text-red-800 mb-2">Error</h3>
              <p className="text-sm sm:text-base text-red-700">{error}</p>
            </div>
          )}

          {/* Results section */}
          {analysisData && (
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8">
              <FrameworkDisplay
                framework={selectedFramework}
                data={analysisData}
                isPremium={isPremium}
              />

              {/* Export button - only for premium users (or dev mode) */}
              {(isPremium || DEV_MODE_SHOW_EXPORT) && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-4">
                    {DEV_MODE_SHOW_EXPORT && !isPremium ? '🧪 Dev Mode - Export Test' : 'Premium Feature'}
                  </p>
                  <ExportButton
                    analysisData={analysisData}
                    framework={selectedFramework}
                    idea={formData.idea}
                    focusArea={formData.focusArea}
                  />
                </div>
              )}
            </div>
          )}

          {/* Empty state */}
          {!analysisData && !isLoading && !error && (
            <div className="text-center py-0">
              <p className="text-gray-500 text-lg">
                Enter your business idea above to get started with strategic analysis
              </p>
            </div>
          )}
        </div>

        {/* GEO Content Section 1: About AnalysisGen */}
        <section id="about" aria-label="About AnalysisGen" className="bg-gray-50 border-t border-gray-200 mt-12">
          <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About AnalysisGen</h2>
            <p className="text-gray-700 leading-relaxed">
              AnalysisGen by VibeMatrix AI is an AI-powered strategic analysis tool that evaluates business ideas using 11 proven frameworks. Generate a SWOT analysis for free, or unlock 10 premium frameworks including PESTLE, Porter's Five Forces, Business Model Canvas, Ansoff Matrix, VRIO, Value Proposition Canvas, Balanced Scorecard, McKinsey 7S, OKR Framework, and NOISE. Export results as PDF, CSV, or JSON — all from a single-page interface.
            </p>
          </div>
        </section>

        {/* GEO Content Section 2: Frameworks List */}
        <section id="frameworks" aria-label="Available Frameworks" className="bg-white border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">11 Strategic Frameworks Available in AnalysisGen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">🆓 Free Framework</h3>
                <ul className="space-y-3 text-gray-700">
                  <li><strong>SWOT Analysis</strong> — Analyze strengths, weaknesses, opportunities, and threats.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-cyan-700 mb-3">💎 Premium Frameworks (10)</h3>
                <ul className="space-y-3 text-gray-700">
                  <li><strong>PESTLE Analysis</strong> — Evaluate political, economic, social, technological, legal, and environmental factors.</li>
                  <li><strong>Porter's Five Forces</strong> — Assess industry competition, supplier power, buyer power, threat of substitutes, and threat of new entrants.</li>
                  <li><strong>Business Model Canvas</strong> — Visualize your business structure across 9 building blocks.</li>
                  <li><strong>Ansoff Matrix</strong> — Explore growth strategy options: market penetration, market development, product development, and diversification.</li>
                  <li><strong>VRIO Framework</strong> — Analyze internal resources for value, rarity, imitability, and organization.</li>
                  <li><strong>Value Proposition Canvas</strong> — Align products and services with customer jobs, pains, and gains.</li>
                  <li><strong>Balanced Scorecard</strong> — Track performance across financial, customer, internal processes, and learning & growth perspectives.</li>
                  <li><strong>McKinsey 7S Model</strong> — Evaluate organizational alignment across strategy, structure, systems, shared values, skills, style, and staff.</li>
                  <li><strong>OKR Framework</strong> — Define objectives and key results for business execution and goal tracking.</li>
                  <li><strong>NOISE Analysis</strong> — Analyze organizational needs, opportunities, improvements, strengths, and exceptions.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                <p className="text-sm text-gray-600">
                  AnalysisGen by VibeMatrix AI helps entrepreneurs analyze their business ideas with 11 strategic frameworks and AI-powered insights.
                </p>
              </div>

              <div className="text-right md:text-center">
                <h3 className="font-semibold text-gray-900 mb-2">🆓 Free Tier</h3>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• SWOT Analysis only</li>
                  <li>• PDF export</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">💎 Premium - £9.99</h3>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• All 11 frameworks</li>
                  <li>• PDF, CSV, JSON export</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
              <p>&copy; 2025 AnalysisGen by VibeMatrix AI. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>

      {/* Premium Modal */}
      <PremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        onSuccess={handlePaymentSuccess}
      />
    </>
  );
}

