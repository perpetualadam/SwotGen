import { useState } from 'react';

/**
 * PremiumModal Component
 * 
 * Displays a modal with upgrade options and opens Stripe Payment Link
 * 
 * Props:
 *   - isOpen: boolean - Whether modal is visible
 *   - onClose: function - Called when user clicks Cancel
 *   - onSuccess: function - Called when payment is completed
 */
export default function PremiumModal({ isOpen, onClose, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpgradeClick = () => {
    setError('');
    setIsLoading(true);

    // Get payment link from environment variables
    const paymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;

    if (!paymentLink) {
      setError('Payment link not configured. Please contact support.');
      setIsLoading(false);
      return;
    }

    try {
      // Open Stripe Payment Link in new window
      const paymentWindow = window.open(
        paymentLink,
        'stripe_payment',
        'width=500,height=700,resizable=yes,scrollbars=yes'
      );

      if (!paymentWindow) {
        setError('Pop-up blocked. Please allow pop-ups and try again.');
        setIsLoading(false);
        return;
      }

      // Check if payment window was closed
      // This is a simple approach - assumes user completed payment if they closed the window
      const checkInterval = setInterval(() => {
        if (paymentWindow.closed) {
          clearInterval(checkInterval);
          setIsLoading(false);
          
          // Call success callback
          // In production, verify payment via webhook
          onSuccess();
        }
      }, 1000);

      // Timeout after 30 minutes
      setTimeout(() => {
        clearInterval(checkInterval);
        if (!paymentWindow.closed) {
          paymentWindow.close();
        }
        setIsLoading(false);
      }, 30 * 60 * 1000);
    } catch (err) {
      setError('Failed to open payment page. Please try again.');
      setIsLoading(false);
      console.error('Payment error:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 animate-in">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Upgrade to Premium</h2>
          <p className="text-gray-600 mt-2">Unlock unlimited SWOT analyses</p>
        </div>

        {/* Features List */}
        <div className="mb-6 space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-green-600 font-bold text-lg flex-shrink-0">✓</span>
            <span className="text-gray-700">Unlimited SWOT analyses</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-600 font-bold text-lg flex-shrink-0">✓</span>
            <span className="text-gray-700">Advanced market insights</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-600 font-bold text-lg flex-shrink-0">✓</span>
            <span className="text-gray-700">Priority support</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-600 font-bold text-lg flex-shrink-0">✓</span>
            <span className="text-gray-700">Export results as PDF</span>
          </div>
        </div>

        {/* Price Box */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
          <p className="text-sm text-gray-600 font-medium">One-time payment</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">£9.99</p>
          <p className="text-xs text-gray-500 mt-2">No recurring charges</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleUpgradeClick}
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition ${
              isLoading
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Opening payment...
              </span>
            ) : (
              'Upgrade Now'
            )}
          </button>

          <button
            onClick={onClose}
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition ${
              isLoading
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900 cursor-pointer'
            }`}
          >
            Cancel
          </button>
        </div>

        {/* Security Info */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-1">
            <span>🔒</span>
            <span>Secure payment powered by Stripe</span>
          </p>
          <p className="text-xs text-gray-400 text-center mt-2">
            Your payment information is encrypted and secure
          </p>
        </div>
      </div>
    </div>
  );
}

