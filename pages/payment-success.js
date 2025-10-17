import { useEffect } from 'react';
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
 */
export default function PaymentSuccess() {
  useEffect(() => {
    // Post message to parent window (the payment modal)
    // This tells the parent that payment was successful
    if (window.opener) {
      window.opener.postMessage('payment_success', window.location.origin);
    }

    // Close this window after a short delay
    // This gives the parent time to process the message
    const timer = setTimeout(() => {
      window.close();
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

          {/* Loading Message */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700 flex items-center justify-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
              Redirecting you back...
            </p>
          </div>

          {/* Manual Close Button */}
          <button
            onClick={() => window.close()}
            className="mt-6 w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-semibold transition"
          >
            Close Window
          </button>

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

