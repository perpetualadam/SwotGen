import { useEffect, useState } from 'react';
import Head from 'next/head';

/**
 * Payment Success Page
 *
 * This page is shown after successful Stripe payment.
 * It posts a message to the parent window (the payment modal)
 * to notify that payment was successful.
 *
 * The parent window will then:
 * 1. Receive the message
 * 2. Call onSuccess() callback
 * 3. Grant premium access
 * 4. Close the payment window
 *
 * Scenarios:
 * 1. Opened as popup from payment flow: window.close() will work
 * 2. Accessed directly in browser: window.close() will be blocked, show manual close button
 */
export default function PaymentSuccess() {
  const [isPopup, setIsPopup] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);

  useEffect(() => {
    // Check if this window was opened by JavaScript (popup)
    // window.opener is only set when opened via window.open()
    const isOpenedAsPopup = window.opener !== null;
    setIsPopup(isOpenedAsPopup);

    // Post message to parent window (the payment modal)
    // This tells the parent that payment was successful
    if (window.opener) {
      window.opener.postMessage('payment_success', window.location.origin);
    }

    // Try to close this window after a short delay
    // This gives the parent time to process the message
    const timer = setTimeout(() => {
      window.close();

      // If window.close() didn't work (e.g., direct navigation),
      // show the manual close button after 2 seconds
      setTimeout(() => {
        setShowCloseButton(true);
      }, 2000);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Payment Successful - SwotGen</title>
        <meta name="description" content="Your payment was successful" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for upgrading to Premium. Your payment has been processed successfully.
          </p>

          {/* Features */}
          <div className="mb-6 space-y-2 text-left">
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span className="text-gray-700">Unlimited SWOT analyses</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span className="text-gray-700">PDF export feature</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span className="text-gray-700">Advanced insights</span>
            </div>
          </div>

          {/* Status Message */}
          {!showCloseButton ? (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700 flex items-center justify-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
                {isPopup ? 'Redirecting you back...' : 'Processing...'}
              </p>
            </div>
          ) : (
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-700">
                {isPopup
                  ? 'Window should close automatically. If not, click the button below.'
                  : 'You can now close this window or return to the app.'}
              </p>
            </div>
          )}

          {/* Manual Close Button - Show when auto-close fails or on direct access */}
          {showCloseButton && (
            <button
              onClick={() => {
                // Try to close the window
                window.close();
                // If that doesn't work, redirect to home
                setTimeout(() => {
                  window.location.href = '/';
                }, 500);
              }}
              className="mt-6 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
            >
              Close Window or Return Home
            </button>
          )}

          {/* Security Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
              <span>🔒</span>
              <span>Secure payment powered by Stripe</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

