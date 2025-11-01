import { useState, useEffect } from 'react';
import { getFrameworkOptions } from '../lib/frameworks';

export default function InputForm({ onSubmit, isLoading }) {
  const [idea, setIdea] = useState('');
  const [focusArea, setFocusArea] = useState('Market');
  const [framework, setFramework] = useState('swot');
  const [error, setError] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [showUpgradeHint, setShowUpgradeHint] = useState(false);

  // Load premium status from localStorage on mount
  useEffect(() => {
    const savedPremium = localStorage.getItem('isPremium');
    setIsPremium(savedPremium === 'true');
  }, []);

  // Validate input before submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Trim and validate idea input
    const trimmedIdea = idea.trim();
    if (!trimmedIdea) {
      setError('Please enter a business idea');
      return;
    }

    if (trimmedIdea.length < 3) {
      setError('Please provide at least 3 characters');
      return;
    }

    if (trimmedIdea.length > 500) {
      setError('Idea must be less than 500 characters');
      return;
    }

    // Call parent handler with validated data
    onSubmit({ idea: trimmedIdea, focusArea, framework });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="space-y-4">
        {/* Error message display */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Idea input field */}
        <div>
          <label htmlFor="idea" className="block text-sm font-medium text-gray-700 mb-2">
            Describe Your Business Idea
          </label>
          <textarea
            id="idea"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="e.g., An AI-powered personal finance app that helps freelancers track expenses and optimize taxes..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            rows="4"
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500 mt-1">{idea.length}/500 characters</p>
        </div>

        {/* Focus area dropdown */}
        <div>
          <label htmlFor="focusArea" className="block text-sm font-medium text-gray-700 mb-2">
            Focus Area (Optional)
          </label>
          <select
            id="focusArea"
            value={focusArea}
            onChange={(e) => setFocusArea(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
            disabled={isLoading}
          >
            <option value="Market">Market</option>
            <option value="Product">Product</option>
            <option value="Team">Team</option>
          </select>
        </div>

        {/* Strategic Framework dropdown */}
        <div>
          <label htmlFor="framework" className="block text-sm font-medium text-gray-700 mb-2">
            Strategic Framework
          </label>
          <select
            id="framework"
            value={framework}
            onChange={(e) => {
              const selectedId = e.target.value;
              // For non-premium users, only allow SWOT
              if (!isPremium && selectedId !== 'swot') {
                setShowUpgradeHint(true);
                return;
              }
              setFramework(selectedId);
              setShowUpgradeHint(false);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
            disabled={isLoading}
          >
            {getFrameworkOptions().map((fw) => {
              const isPremiumFramework = fw.id !== 'swot';
              const isDisabled = !isPremium && isPremiumFramework;
              return (
                <option key={fw.id} value={fw.id} disabled={isDisabled}>
                  {fw.name} {isDisabled ? '🔒 Premium' : ''} - {fw.description}
                </option>
              );
            })}
          </select>

          {/* Upgrade hint for non-premium users */}
          {showUpgradeHint && !isPremium && (
            <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
              <span>🔒</span>
              <span>Upgrade to Premium to unlock all 7 strategic frameworks</span>
            </p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            'Analyze Idea'
          )}
        </button>
      </div>
    </form>
  );
}

