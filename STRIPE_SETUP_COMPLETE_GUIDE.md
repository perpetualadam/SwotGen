# 🚀 STRIPE PAYMENT SETUP - COMPLETE GUIDE

**Status**: ✅ **READY TO CONFIGURE**  
**Date**: October 17, 2025  
**Time**: 15 minutes to complete

---

## 📋 QUESTION 2: STRIPE PAYMENT INTEGRATION

### What You Need to Do

You have your Stripe API keys:
- Publishable key (starts with `pk_`)
- Secret key (starts with `sk_`)

**Important**: You only need the **Publishable Key** for this setup (the one starting with `pk_`).

---

## 🎯 STEP 1: CREATE STRIPE PAYMENT LINK

### What is a Payment Link?

A Stripe Payment Link is a simple URL that customers click to pay. It's the easiest way to accept payments without building a custom checkout.

### How to Create It

**Step 1.1**: Go to Stripe Dashboard
```
1. Open: https://dashboard.stripe.com
2. Log in with your Stripe account
3. Make sure you're in "Test Mode" (toggle in top right)
```

**Step 1.2**: Create Payment Link
```
1. Click: "Payment Links" in left sidebar
2. Click: "+ New" button
3. Fill in the form:
   - Product name: "SwotGen Premium"
   - Description: "Unlimited SWOT analyses + PDF export"
   - Price: 9.99
   - Currency: GBP (£)
   - Quantity: Fixed (1)
4. Click: "Create link"
```

**Step 1.3**: Configure Payment Link
```
1. After link is created, you'll see the URL
2. Copy the URL (looks like: https://buy.stripe.com/test/...)
3. Save this URL - you'll need it in Step 2
```

**Step 1.4**: Set Success URL (Optional but Recommended)
```
1. In Payment Link settings, scroll to "After payment"
2. Set "Success URL" to: https://swotgen.vercel.app?premium=true
3. This redirects users back to your app after payment
4. Save changes
```

---

## 🎯 STEP 2: ADD PAYMENT LINK TO VERCEL

### Configure Environment Variable

**Step 2.1**: Go to Vercel Dashboard
```
1. Open: https://vercel.com
2. Log in with your account
3. Click on your "swotgen" project
```

**Step 2.2**: Add Environment Variable
```
1. Click: "Settings" tab
2. Click: "Environment Variables" in left sidebar
3. Click: "Add New" button
4. Fill in:
   - Name: NEXT_PUBLIC_STRIPE_PAYMENT_LINK
   - Value: [Your Stripe Payment Link URL]
   - Environments: Select "Production", "Preview", "Development"
5. Click: "Save"
```

**Step 2.3**: Redeploy Your App
```
1. Go to: "Deployments" tab
2. Find the latest deployment
3. Click: "..." menu
4. Click: "Redeploy"
5. Wait for deployment to complete (2-3 minutes)
```

---

## 🎯 STEP 3: TEST PAYMENT FLOW LOCALLY

### Test Before Going Live

**Step 3.1**: Add Payment Link to Local Environment
```
1. Create/edit .env.local file
2. Add: NEXT_PUBLIC_STRIPE_PAYMENT_LINK=[Your Stripe Payment Link URL]
3. Save file
4. Restart dev server: Ctrl+C, then npm run dev
```

**Step 3.2**: Test Payment Flow Locally
```
1. Go to: http://localhost:3000
2. Analyze an idea
3. Click: "Upgrade" button
4. Stripe payment modal should open
5. Use Stripe test card: 4242 4242 4242 4242
6. Expiry: Any future date (e.g., 12/25)
7. CVC: Any 3 digits (e.g., 123)
8. Complete payment
9. You should be redirected back to app
10. Export button should appear
11. Try exporting a PDF
```

**Test Card Details**:
```
Card Number: 4242 4242 4242 4242
Expiry: 12/25 (or any future date)
CVC: 123 (or any 3 digits)
Name: Any name
Email: Any email
```

---

## 🎯 STEP 4: TEST PAYMENT FLOW ON VERCEL

### Test on Production

**Step 4.1**: Go to Your Vercel URL
```
1. Open: https://swotgen.vercel.app
2. (Or your custom domain if you have one)
```

**Step 4.2**: Test Payment Flow
```
1. Analyze an idea
2. Click: "Upgrade" button
3. Stripe payment modal should open
4. Use Stripe test card: 4242 4242 4242 4242
5. Complete payment
6. You should be redirected back to app
7. Export button should appear
8. Try exporting a PDF
```

**Step 4.3**: Verify Everything Works
```
✓ Payment modal opens
✓ Stripe payment page loads
✓ Payment completes successfully
✓ Redirected back to app
✓ Export button appears
✓ PDF exports successfully
✓ No errors in console
```

---

## 🔐 SECURITY NOTES

### What's Secure
```
✅ Payment Link: Hosted by Stripe (PCI compliant)
✅ Card Data: Never touches your server
✅ API Keys: Only publishable key used in frontend
✅ Secret Key: Keep it secret, never share it
```

### What You Should Do
```
✅ Keep secret key private
✅ Never commit .env.local to Git
✅ Use environment variables for sensitive data
✅ Test with Stripe test cards first
✅ Switch to live mode only when ready
```

---

## 📊 COMPLETE FLOW DIAGRAM

```
User Flow:
1. User analyzes idea
2. User clicks "Upgrade" button
3. PremiumModal opens
4. User clicks "Upgrade Now"
5. Stripe Payment Link opens in new window
6. User enters payment details
7. User completes payment
8. Stripe redirects to: https://swotgen.vercel.app?premium=true
9. App detects premium=true in URL
10. App sets localStorage.setItem('isPremium', 'true')
11. Export button appears
12. User can export PDFs
```

---

## ✅ CHECKLIST

### Before Testing
- [ ] Created Stripe Payment Link
- [ ] Copied Payment Link URL
- [ ] Added to .env.local (for local testing)
- [ ] Added to Vercel environment variables
- [ ] Redeployed app on Vercel

### During Local Testing
- [ ] Payment modal opens
- [ ] Stripe payment page loads
- [ ] Test card payment completes
- [ ] Redirected back to app
- [ ] Export button appears
- [ ] PDF exports successfully

### During Vercel Testing
- [ ] Payment modal opens
- [ ] Stripe payment page loads
- [ ] Test card payment completes
- [ ] Redirected back to app
- [ ] Export button appears
- [ ] PDF exports successfully

### After Testing
- [ ] All tests passed
- [ ] Ready for live mode
- [ ] Ready to share with users

---

## 🎯 NEXT STEPS

### Immediate
1. Create Stripe Payment Link (Step 1)
2. Add to Vercel environment variables (Step 2)
3. Test locally (Step 3)
4. Test on Vercel (Step 4)

### After Testing
1. Switch Stripe to live mode
2. Update payment link to live mode
3. Update Vercel environment variable
4. Redeploy app
5. Share with users

### Monitoring
1. Check Stripe dashboard for payments
2. Monitor app for errors
3. Gather user feedback
4. Iterate and improve

---

## 📞 TROUBLESHOOTING

### Payment Modal Doesn't Open
```
1. Check: NEXT_PUBLIC_STRIPE_PAYMENT_LINK is set
2. Check: Payment link URL is correct
3. Check: Browser console for errors (F12)
4. Restart: Dev server (Ctrl+C, npm run dev)
```

### Payment Completes but Export Button Doesn't Appear
```
1. Check: Browser console for errors (F12)
2. Check: localStorage has isPremium=true
3. Refresh: Page (F5)
4. Check: URL has ?premium=true parameter
```

### Stripe Payment Page Doesn't Load
```
1. Check: Payment link URL is correct
2. Check: Stripe account is active
3. Check: You're in test mode
4. Check: Browser pop-ups are allowed
```

---

## 🎉 SUMMARY

### What You'll Do
1. Create Stripe Payment Link (5 min)
2. Add to Vercel environment variables (5 min)
3. Test locally (5 min)
4. Test on Vercel (5 min)

### Total Time: ~20 minutes

### Result
✅ Premium payment system working  
✅ Export button appears after payment  
✅ PDF export works for premium users  
✅ Ready to share with users  

---

**Ready? Start with Step 1! 🚀**

