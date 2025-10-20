# ⚡ Stripe Quick Start Guide
## Idea SWOT Generator - Payment Implementation

**Status**: Ready to implement  
**Time to implement**: 3-6 hours  
**Complexity**: Medium  

---

## 🎯 Quick Summary

Your project has **Stripe scaffolding** but **no payment processing**. Here's what you need to know:

| Item | Status |
|------|--------|
| Stripe library | ✅ Installed (v14.25.0) |
| Environment variables | ✅ Configured |
| Payment processing | ❌ Not implemented |
| Checkout flow | ❌ Not implemented |
| Webhook handling | ❌ Not implemented |
| Premium UI | ⚠️ UI only, no functionality |

---

## 🚀 Fastest Implementation Path (3 Hours)

### Step 1: Get Stripe API Keys (5 minutes)
1. Go to https://stripe.com
2. Create account
3. Go to Dashboard → Developers → API Keys
4. Copy Secret Key and Publishable Key
5. Add to `.env.local`:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### Step 2: Create Payment API Route (30 minutes)
Create `pages/api/create-payment-intent.js`:
```javascript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 999, // $9.99 in cents
      currency: 'usd',
      metadata: { product: 'premium_subscription' },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

### Step 3: Install Frontend Library (5 minutes)
```bash
npm install @stripe/react-stripe-js @stripe/js
```

### Step 4: Create Checkout Component (45 minutes)
Create `components/CheckoutForm.js`:
```javascript
import { loadStripe } from '@stripe/js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';

export default function CheckoutForm({ onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Get payment intent
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
      });
      const { clientSecret } = await res.json();

      // Confirm payment
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (paymentIntent.status === 'succeeded') {
        onSuccess();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <p className="text-red-600">{error}</p>}
      <button 
        type="submit" 
        disabled={!stripe || loading}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? 'Processing...' : 'Pay $9.99'}
      </button>
    </form>
  );
}
```

### Step 5: Add to Premium Modal (30 minutes)
Update `pages/index.js`:
```javascript
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/js';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Home() {
  const [showPayment, setShowPayment] = useState(false);

  const handlePremiumClick = () => {
    setShowPayment(true);
  };

  return (
    <>
      {/* ... existing code ... */}
      
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-md">
            <h2 className="text-2xl font-bold mb-4">Upgrade to Premium</h2>
            <p className="mb-6">Get unlimited SWOT analyses for $9.99</p>
            <Elements stripe={stripePromise}>
              <CheckoutForm 
                onSuccess={() => {
                  setIsPremium(true);
                  setShowPayment(false);
                }}
              />
            </Elements>
            <button 
              onClick={() => setShowPayment(false)}
              className="mt-4 w-full text-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
```

### Step 6: Test (30 minutes)
1. Run `npm run dev`
2. Click Premium toggle
3. Use test card: `4242 4242 4242 4242`
4. Any future date and any CVC
5. Verify payment succeeds

---

## 💰 Pricing Options

### Option 1: One-Time Payment (Simplest)
- **Price**: $9.99 one-time
- **Implementation**: 3 hours
- **Best for**: MVP, testing
- **Code**: Use Payment Intent API (above)

### Option 2: Monthly Subscription (Recommended)
- **Price**: $4.99/month
- **Implementation**: 4-5 hours
- **Best for**: Recurring revenue
- **Code**: Use Subscriptions API

```javascript
// Create subscription
const subscription = await stripe.subscriptions.create({
  customer: customerId,
  items: [{ price: 'price_1234567890' }],
});
```

### Option 3: Freemium (Most Complex)
- **Free**: 3 analyses/month
- **Premium**: Unlimited
- **Price**: $4.99/month
- **Implementation**: 6-8 hours
- **Best for**: User acquisition

---

## 🔐 Security Checklist

- [ ] Secret key in `.env.local` (never exposed)
- [ ] Publishable key can be public
- [ ] HTTPS enabled (required for production)
- [ ] Webhook signature verification implemented
- [ ] No sensitive data logged
- [ ] Error messages don't expose details

---

## 📊 Testing Checklist

- [ ] Test successful payment
- [ ] Test failed payment
- [ ] Test webhook delivery
- [ ] Test subscription creation
- [ ] Test subscription cancellation
- [ ] Test error scenarios
- [ ] Test with test mode keys
- [ ] Test with live mode keys (production)

---

## 🧪 Test Cards

| Card | Number | Status |
|------|--------|--------|
| Visa | 4242 4242 4242 4242 | ✅ Success |
| Visa | 4000 0000 0000 0002 | ❌ Declined |
| Visa | 4000 0025 0000 3155 | ⚠️ 3D Secure |
| Amex | 3782 822463 10005 | ✅ Success |
| Discover | 6011 1111 1111 1117 | ✅ Success |

**Use any future date and any CVC**

---

## 🚨 Common Issues

### Issue: "Missing API key"
**Solution**: Check `.env.local` has `STRIPE_SECRET_KEY`

### Issue: "Publishable key not found"
**Solution**: Check `.env.local` has `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### Issue: "Payment failed"
**Solution**: Check test card number, use `4242 4242 4242 4242`

### Issue: "Webhook not received"
**Solution**: Set up webhook endpoint in Stripe Dashboard

### Issue: "CORS error"
**Solution**: Stripe.js handles CORS, check network tab

---

## 📚 Resources

### Official Docs
- **Stripe Docs**: https://stripe.com/docs
- **Node.js Library**: https://stripe.com/docs/libraries/node
- **Stripe.js**: https://stripe.com/docs/stripe-js
- **React Integration**: https://stripe.com/docs/stripe-js/react

### Examples
- **Stripe Samples**: https://github.com/stripe-samples
- **Next.js Examples**: https://github.com/stripe-samples/nextjs-subscription-payments

### Support
- **Stripe Support**: https://support.stripe.com
- **Stack Overflow**: Tag `stripe`

---

## 🎯 Next Steps

### Immediate (Today)
1. ✅ Read this guide
2. ✅ Create Stripe account
3. ✅ Get API keys

### This Week
1. ✅ Implement payment API route
2. ✅ Install Stripe.js
3. ✅ Create checkout component
4. ✅ Test with test cards

### Next Week
1. ✅ Add webhook handler
2. ✅ Implement subscription management
3. ✅ Add feature gating
4. ✅ Deploy to production

---

## 💡 Pro Tips

1. **Start with one-time payment** - Easier to implement
2. **Use test mode first** - Never use live keys in development
3. **Test webhooks locally** - Use Stripe CLI
4. **Monitor Stripe Dashboard** - Watch for failed payments
5. **Keep API keys secure** - Never commit to Git
6. **Use Stripe's UI** - Don't build custom payment forms
7. **Handle errors gracefully** - Show user-friendly messages
8. **Log important events** - For debugging

---

## ✅ Implementation Checklist

### Setup
- [ ] Stripe account created
- [ ] API keys obtained
- [ ] Environment variables configured
- [ ] Stripe.js installed

### Backend
- [ ] Payment Intent API route created
- [ ] Error handling implemented
- [ ] Tested with test cards

### Frontend
- [ ] Checkout component created
- [ ] Payment form integrated
- [ ] Error messages displayed
- [ ] Loading states added

### Testing
- [ ] Test successful payment
- [ ] Test failed payment
- [ ] Test error scenarios
- [ ] Verified in Stripe Dashboard

### Production
- [ ] Switched to live API keys
- [ ] HTTPS enabled
- [ ] Webhook endpoint configured
- [ ] Tested with real payment

---

## 🎉 Summary

**Current Status**: Stripe ready to implement  
**Fastest Path**: 3 hours for one-time payment  
**Recommended**: Start with one-time, upgrade to subscriptions later  
**Complexity**: Medium (straightforward with examples)  

**You're ready to add payments! 🚀**

---

**Questions? Check STRIPE_IMPLEMENTATION_ANALYSIS.md for detailed info**

