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
        <title>AnalysisGen - Multi-Framework Strategic Analysis Platform</title>
        <meta name="description" content="Analyze your business ideas with 7 strategic frameworks: SWOT, PESTLE, Porter's Five Forces, NOISE, Balanced Scorecard, VRIO, and McKinsey 7S" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">🎯 AnalysisGen</h1>
              </div>
              {/* Premium button */}
              <button
                onClick={handlePremiumClick}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  isPremium
                    ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isPremium ? '⭐ Premium' : 'Upgrade'}
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Input section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <InputForm onSubmit={handleAnalyze} isLoading={isLoading} />
          </div>

          {/* Error display */}
          {error && (
            <div className="mb-8 p-6 bg-red-50 border-2 border-red-200 rounded-lg">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Error</h3>
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Results section */}
          {analysisData && (
            <div className="bg-white rounded-lg shadow-lg p-8">
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
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Enter your business idea above to get started with strategic analysis
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                <p className="text-sm text-gray-600">
                  AnalysisGen helps entrepreneurs analyze their business ideas with 7 strategic frameworks and AI-powered insights.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Frameworks</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• SWOT Analysis</li>
                  <li>• PESTLE Analysis</li>
                  <li>• Porter's Five Forces</li>
                  <li>• NOISE, VRIO, Balanced Scorecard, McKinsey 7S</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Pricing</h3>
                <div className="text-sm text-gray-600 space-y-3">
                  <div>
                    <p className="font-medium text-gray-900">🆓 Free Tier</p>
                    <ul className="text-xs text-gray-500 space-y-1 mt-1">
                      <li>• SWOT Analysis only</li>
                      <li>• PDF export</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">💎 Premium - £9.99</p>
                    <ul className="text-xs text-gray-500 space-y-1 mt-1">
                      <li>• All 7 frameworks</li>
                      <li>• PDF, CSV, JSON export</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
              <p>&copy; 2025 Idea SWOT Generator. All rights reserved.</p>
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

