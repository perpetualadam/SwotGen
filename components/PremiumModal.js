import { useState } from 'react';

/**
 * PremiumModal Component
 *
 * Displays a modal with upgrade options and opens Stripe Payment Link
 *
 * Payment Flow:
 * 1. User clicks "Upgrade Now"
 * 2. Payment link opens in new window with success_url parameter
 * 3. User completes payment on Stripe
 * 4. Stripe redirects to success_url with ?premium=true&payment_success=true
 * 5. Success page posts message to parent window
 * 6. Parent window receives message and calls onSuccess()
 * 7. Premium access is granted
 *
 * If user closes window without completing payment:
 * - Window close is detected
 * - onSuccess() is NOT called
 * - Premium access is NOT granted
 *
 * Props:
 *   - isOpen: boolean - Whether modal is visible
 *   - onClose: function - Called when user clicks Cancel
 *   - onSuccess: function - Called when payment is verified as successful
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
      // Note: The payment link should be configured in Stripe dashboard with:
      // Success URL: https://swot-gen.vercel.app/payment-success
      // This ensures Stripe redirects to our success page after payment
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

      // Set up a listener for the payment success message
      // The success page will post a message to the parent window
      const handleMessage = (event) => {
        // Verify the message is from our success page
        if (event.origin !== window.location.origin) {
          return;
        }

        if (event.data === 'payment_success') {
          clearInterval(checkInterval);
          clearTimeout(timeoutId);
          window.removeEventListener('message', handleMessage);
          setIsLoading(false);

          // Call success callback - payment was verified
          onSuccess();
        }
      };

      window.addEventListener('message', handleMessage);

      // Check if payment window was closed (user cancelled)
      const checkInterval = setInterval(() => {
        if (paymentWindow.closed) {
          clearInterval(checkInterval);
          window.removeEventListener('message', handleMessage);
          setIsLoading(false);
          // Don't call onSuccess - user closed the window without completing payment
        }
      }, 1000);

      // Timeout after 30 minutes
      const timeoutId = setTimeout(() => {
        clearInterval(checkInterval);
        window.removeEventListener('message', handleMessage);
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
          <p className="text-gray-600 mt-2">Unlock all 11 frameworks and advanced export options</p>
        </div>

        {/* Tier Comparison */}
        <div className="mb-6 space-y-4">
          {/* Free Tier */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">🆓 Free Tier</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-gray-400 flex-shrink-0">•</span>
                <span>SWOT Analysis framework only</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 flex-shrink-0">•</span>
                <span>PDF export</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 flex-shrink-0">•</span>
                <span>Unlimited analyses</span>
              </li>
            </ul>
          </div>

          {/* Premium Tier */}
          <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-300">
            <h3 className="font-semibold text-gray-900 mb-3">💎 Premium Tier</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                <span><strong>All 11 frameworks:</strong> SWOT, PESTLE, Porter's Five Forces, NOISE, Balanced Scorecard, VRIO, McKinsey 7S, Business Model Canvas, Ansoff Matrix, Value Proposition Canvas, OKR</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                <span><strong>Multiple export formats:</strong> PDF, CSV, JSON</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                <span>Unlimited analyses</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                <span>Advanced market insights</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Price Box */}
        <div className="mb-6 p-4 bg-cyan-50 rounded-lg border-2 border-cyan-200">
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
                : 'bg-cyan-600 hover:bg-cyan-700 text-white cursor-pointer'
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

