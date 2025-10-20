# 🚀 COMPLETE LIVE SETUP GUIDE

**Status**: Ready to go live  
**Time**: 15 minutes total  
**Mode**: Live Mode (Real Payments)

---

## ⚠️ IMPORTANT SECURITY NOTE

**Before we start, let's fix your Vercel environment variables:**

### What you should have:
```
NEXT_PUBLIC_STRIPE_PAYMENT_LINK = https://buy.stripe.com/[your-live-url]
```

### What you should NOT have:
```
❌ Secret key (sk_) - REMOVE THIS
❌ Public key (pk_) - Not needed for Payment Links
```

**Secret keys should NEVER be in Vercel** - they're a security risk!

---

## 🎯 PART 1: CREATE LIVE PAYMENT LINK (5 min)

### Step 1: Open Stripe Dashboard
```
1. Go to: https://dashboard.stripe.com
2. Log in with your account
```

### Step 2: Switch to Live Mode
```
1. Look at top right corner
2. If it says "Test Mode", click the toggle
3. It should now say "Live Mode"
```

### Step 3: Go to Payment Links
```
1. Left sidebar → "Payment Links"
2. Click: "+ New"
```

### Step 4: Fill in Details
```
Product name: SwotGen Premium
Description: Unlimited SWOT analyses + PDF export
Price: 9.99
Currency: GBP (£)
Quantity: Fixed (1)
```

### Step 5: Set Success URL (Optional)
```
Success URL: https://swotgen.vercel.app?premium=true
```

### Step 6: Create Link
```
1. Click: "Create link"
2. Wait for success message
3. Copy the URL
```

### Step 7: Verify URL
```
✓ Should NOT contain "test"
✓ Should start with: https://buy.stripe.com/
```

---

## 🎯 PART 2: CLEAN UP VERCEL (3 min)

### Step 1: Go to Vercel
```
1. Go to: https://vercel.com
2. Click: Your "swotgen" project
3. Settings → Environment Variables
```

### Step 2: Remove Secret Key
```
1. Find: Any variable with "sk_" (secret key)
2. Click: Delete button (trash icon)
3. Confirm deletion
```

### Step 3: Update Payment Link
```
1. Find: NEXT_PUBLIC_STRIPE_PAYMENT_LINK
2. Click: Edit (pencil icon)
3. Replace: Old URL with new live URL
4. Click: "Save"
```

### Step 4: Verify Variables
```
You should have:
✓ NEXT_PUBLIC_STRIPE_PAYMENT_LINK = https://buy.stripe.com/[live-url]

You should NOT have:
✗ Any sk_ keys
✗ Any pk_ keys
```

---

## 🎯 PART 3: REDEPLOY APP (3 min)

### Step 1: Redeploy
```
1. Click: "Deployments" tab
2. Find: Latest deployment (top of list)
3. Click: "..." menu
4. Click: "Redeploy"
```

### Step 2: Wait for Deployment
```
1. Wait: 2-3 minutes
2. Status should change to "Ready"
3. You should see a green checkmark
```

### Step 3: Verify Deployment
```
1. Click: The deployment
2. You should see "Ready" status
3. No errors should appear
```

---

## 🎯 PART 4: TEST LIVE (4 min)

### Step 1: Open Your App
```
1. Go to: https://swotgen.vercel.app
2. Wait for page to load
```

### Step 2: Analyze an Idea
```
1. Enter: "AI fitness app"
2. Select: "Market Opportunity"
3. Click: "Analyze"
4. Wait for SWOT results
```

### Step 3: Click Upgrade
```
1. Click: "Upgrade" button
2. Premium modal should open
3. Click: "Upgrade Now"
```

### Step 4: Complete Payment
```
1. Stripe payment page opens
2. Enter card details:
   - Use REAL card (real payment will be charged)
   - Or use test card to verify (will be declined)
3. Click: "Pay"
```

### Step 5: Verify Export Button
```
1. After payment, you should be redirected
2. Export button should appear
3. Click: "Export as PDF"
4. PDF should download
```

### Step 6: Check Console
```
1. Press: F12 (open developer tools)
2. Click: "Console" tab
3. Look for: Any red errors
4. Should be: No errors
```

---

## ✅ VERIFICATION CHECKLIST

### Stripe Setup
- [ ] In Live Mode (not Test Mode)
- [ ] Payment link created
- [ ] URL copied
- [ ] URL does NOT contain "test"

### Vercel Setup
- [ ] Secret key (sk_) removed
- [ ] NEXT_PUBLIC_STRIPE_PAYMENT_LINK updated
- [ ] App redeployed
- [ ] Deployment status: "Ready"

### Live Testing
- [ ] Payment modal opens
- [ ] Stripe page loads
- [ ] Payment completes
- [ ] Redirected back to app
- [ ] Export button appears
- [ ] PDF exports successfully
- [ ] No errors in console

---

## 📊 COMPLETE FLOW

```
1. User goes to https://swotgen.vercel.app
2. User analyzes a business idea
3. SWOT results appear
4. User clicks "Upgrade"
5. Premium modal opens
6. User clicks "Upgrade Now"
7. Stripe payment page opens
8. User enters REAL card details
9. User clicks "Pay"
10. Payment is processed
11. Stripe redirects to app with ?premium=true
12. App detects premium=true
13. App sets isPremium = true
14. Export button appears
15. User clicks "Export as PDF"
16. PDF downloads to computer
```

---

## 🎉 AFTER GOING LIVE

### Immediate
1. Verify payment in Stripe dashboard
2. Confirm export works
3. Check for errors

### Next
1. Share app with users
2. Monitor Stripe dashboard
3. Monitor app for errors
4. Gather user feedback

### Ongoing
1. Check Stripe dashboard regularly
2. Monitor app performance
3. Respond to user feedback
4. Iterate and improve

---

## 📞 QUICK HELP

### Payment doesn't go through?
```
1. Check: You're in live mode (not test mode)
2. Check: Payment link URL is correct
3. Check: Card is valid
4. Check: Stripe dashboard for errors
```

### Export button doesn't appear?
```
1. Refresh: Page (F5)
2. Check: Browser console (F12)
3. Check: localStorage has isPremium=true
```

### Need to go back to test mode?
```
1. Create new test payment link
2. Update Vercel environment variable
3. Redeploy app
4. Test again
```

---

## ✅ SUMMARY

### What You'll Do
1. Create live payment link (5 min)
2. Clean up Vercel (3 min)
3. Redeploy app (3 min)
4. Test live (4 min)

### Total Time: 15 minutes

### Result
✅ Live payment system working  
✅ Real payments being processed  
✅ Ready to share with users  

---

## 🚀 START NOW

**Step 1**: Create live payment link (5 min)  
**Step 2**: Clean up Vercel (3 min)  
**Step 3**: Redeploy app (3 min)  
**Step 4**: Test live (4 min)  

**Total: 15 minutes**

---

**Ready? Start with Part 1! 🚀**

