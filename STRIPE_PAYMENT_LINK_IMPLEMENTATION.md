# 💳 Stripe Payment Link Implementation Guide
## Idea SWOT Generator - Step-by-Step Integration

**Status**: Ready to implement  
**Time to implement**: 30-45 minutes  
**Complexity**: Low  

---

## 🎯 Quick Overview

A **Stripe Payment Link** is the simplest way to accept payments. It's a pre-built, hosted payment page that you can link to from your app. No complex backend code needed!

### How It Works
1. User clicks "Premium" toggle
2. Payment modal appears with your Stripe Payment Link
3. User clicks "Upgrade" button
4. Opens Stripe's hosted payment page
5. User completes payment
6. Redirected back to your app
7. Premium status is activated

---

## 📋 STEP 1: Get Your Stripe Payment Link URL

### In Stripe Dashboard
1. Go to https://dashboard.stripe.com
2. Click **"Payment Links"** in the left sidebar
3. Click **"Create"** button
4. Set up your payment link:
   - **Product name**: "Premium Subscription"
   - **Price**: $9.99 (or your price)
   - **Billing period**: One-time (or Monthly)
5. Click **"Create link"**
6. Copy the URL (looks like: `https://buy.stripe.com/test_abc123...`)

### Store in Environment Variables
Add to `.env.local`:
```env
NEXT_PUBLIC_STRIPE_PAYMENT_LINK=https://buy.stripe.com/test_abc123...
```

**Why `NEXT_PUBLIC_`?** Because it needs to be accessible from the browser.

---

## 📋 STEP 2: Update `.env.local.example`

Add the Stripe Payment Link to your template:

```env
# Stripe Payment Link (for monetization)
# Get it from: https://dashboard.stripe.com/payment-links
NEXT_PUBLIC_STRIPE_PAYMENT_LINK=your_stripe_payment_link_url_here
```

---

## 📋 STEP 3: Create a Premium Modal Component

Create `components/PremiumModal.js`:

```javascript
import { useState } from 'react';

export default function PremiumModal({ isOpen, onClose, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgradeClick = () => {
    setIsLoading(true);
    // Open Stripe Payment Link in new window
    const paymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;
    
    if (!paymentLink) {
      alert('Payment link not configured');
      setIsLoading(false);
      return;
    }

    // Open in new window
    const window_obj = window.open(paymentLink, 'stripe_payment', 'width=500,height=700');
    
    // Check if payment was completed (user returns to app)
    // This is a simple approach - see advanced section for better methods
    const checkInterval = setInterval(() => {
      if (window_obj.closed) {
        clearInterval(checkInterval);
        setIsLoading(false);
        // Assume payment succeeded if user closed the window
        // In production, use webhooks for verification
        onSuccess();
      }
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Upgrade to Premium</h2>
          <p className="text-gray-600 mt-2">Unlock unlimited SWOT analyses</p>
        </div>

        {/* Features */}
        <div className="mb-6 space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-green-600 font-bold">✓</span>
            <span className="text-gray-700">Unlimited SWOT analyses</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-600 font-bold">✓</span>
            <span className="text-gray-700">Advanced market insights</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-600 font-bold">✓</span>
            <span className="text-gray-700">Priority support</span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600">One-time payment</p>
          <p className="text-3xl font-bold text-gray-900">$9.99</p>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleUpgradeClick}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
          >
            {isLoading ? 'Opening payment...' : 'Upgrade Now'}
          </button>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="w-full bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg transition"
          >
            Cancel
          </button>
        </div>

        {/* Info */}
        <p className="text-xs text-gray-500 text-center mt-4">
          Secure payment powered by Stripe
        </p>
      </div>
    </div>
  );
}
```

---

## 📋 STEP 4: Update `pages/index.js`

Replace the premium toggle with a button that opens the modal:

```javascript
import { useState } from 'react';
import Head from 'next/head';
import InputForm from '../components/InputForm';
import SWOTDisplay from '../components/SWOTDisplay';
import PremiumModal from '../components/PremiumModal';

export default function Home() {
  const [swotData, setSWOTData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  // Handle form submission
  const handleAnalyze = async (formData) => {
    setIsLoading(true);
    setError('');
    setSWOTData(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze idea');
      }

      const data = await response.json();
      setSWOTData(data);
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
      setIsPremium(false);
    } else {
      setShowPremiumModal(true);
    }
  };

  // Handle successful payment
  const handlePaymentSuccess = () => {
    setIsPremium(true);
    setShowPremiumModal(false);
    // Show success message
    alert('🎉 Welcome to Premium! Enjoy unlimited analyses.');
  };

  return (
    <>
      <Head>
        <title>Idea SWOT Generator - Analyze Your Business Idea</title>
        <meta name="description" content="Generate SWOT analysis for your business ideas using AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">💡 Idea SWOT Generator</h1>
                <p className="text-gray-600 mt-1">Analyze your business idea with AI-powered insights</p>
              </div>
              {/* Premium button */}
              <div className="flex items-center gap-3">
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
          {swotData && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <SWOTDisplay data={swotData} />
            </div>
          )}

          {/* Empty state */}
          {!swotData && !isLoading && !error && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Enter your business idea above to get started with your SWOT analysis
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
                  Idea SWOT Generator helps entrepreneurs analyze their business ideas with AI-powered insights.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Features</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• AI-powered SWOT analysis</li>
                  <li>• Niche viability scoring</li>
                  <li>• Instant results</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Pricing</h3>
                <p className="text-sm text-gray-600">
                  Free tier available. Premium features coming soon.
                </p>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
              <p>&copy; 2024 Idea SWOT Generator. All rights reserved.</p>
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
```

---

## 🔄 STEP 5: Handle Payment Success (Advanced)

### Option A: Simple (Current Approach)
- User clicks "Upgrade"
- Payment window opens
- When user closes window, assume payment succeeded
- **Pros**: Simple, no backend needed
- **Cons**: Not reliable, user could close without paying

### Option B: Better (Recommended)
Use URL parameters to track payment status:

```javascript
// In PremiumModal.js
const handleUpgradeClick = () => {
  const paymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;
  const returnUrl = `${window.location.origin}?premium=true`;
  
  // Add return URL to payment link
  const linkWithReturn = `${paymentLink}?client_reference_id=${Date.now()}`;
  
  window.location.href = linkWithReturn;
};

// In pages/index.js
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('premium') === 'true') {
    setIsPremium(true);
    // Remove query param from URL
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}, []);
```

### Option C: Best (Production)
Use Stripe webhooks to verify payment (requires backend):
- See STRIPE_IMPLEMENTATION_ANALYSIS.md for webhook setup

---

## 🧪 Testing

### Test Payment Link
1. Add your payment link to `.env.local`
2. Run `npm run dev`
3. Click "Upgrade" button
4. Use test card: `4242 4242 4242 4242`
5. Any future date and any CVC
6. Complete payment
7. Verify premium status updates

### Test Cards
- **Success**: 4242 4242 4242 4242
- **Declined**: 4000 0000 0000 0002
- **3D Secure**: 4000 0025 0000 3155

---

## 📊 Persistence (Database-Free)

### Current Limitation
Since your app is stateless (no database), premium status resets on page refresh.

### Solutions

**Option 1: Browser Storage (Simple)**
```javascript
// Save to localStorage
localStorage.setItem('isPremium', 'true');

// Load on page load
useEffect(() => {
  const saved = localStorage.getItem('isPremium');
  if (saved === 'true') {
    setIsPremium(true);
  }
}, []);
```

**Option 2: URL Parameter (Shareable)**
```javascript
// Add to URL: ?premium=true
// User can share link with premium status
```

**Option 3: Supabase (Recommended)**
Add a simple database to track premium users:
- Store user email + premium status
- Verify on page load
- See SUPABASE_SETUP.md for details

---

## ✅ Implementation Checklist

- [ ] Create Stripe Payment Link in dashboard
- [ ] Add `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` to `.env.local`
- [ ] Update `.env.local.example`
- [ ] Create `components/PremiumModal.js`
- [ ] Update `pages/index.js`
- [ ] Test with test payment link
- [ ] Test with test cards
- [ ] Verify premium status updates
- [ ] Deploy to production

---

## 🚀 Next Steps

1. **Immediate**: Create payment link in Stripe Dashboard
2. **Today**: Add to `.env.local` and implement modal
3. **This week**: Test payment flow
4. **Next week**: Add persistence (localStorage or Supabase)
5. **Later**: Add webhooks for production verification

---

## 📚 Resources

- **Stripe Payment Links**: https://stripe.com/docs/payment-links
- **Stripe Test Cards**: https://stripe.com/docs/testing
- **Stripe Dashboard**: https://dashboard.stripe.com

---

**Ready to implement? Start with Step 1! 🚀**

