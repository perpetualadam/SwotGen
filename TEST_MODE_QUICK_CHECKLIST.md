# ✅ TEST MODE - QUICK CHECKLIST

**Status**: Ready to start  
**Time**: 20 minutes  
**Mode**: Test Mode (Safe)

---

## 🎯 STEP 1: CREATE TEST PAYMENT LINK (5 min)

### Checklist
- [ ] Go to: https://dashboard.stripe.com
- [ ] Make sure "Test Mode" is ON (top right)
- [ ] Click: "Payment Links" in sidebar
- [ ] Click: "+ New"
- [ ] Fill in:
  - [ ] Product: SwotGen Premium
  - [ ] Price: 9.99
  - [ ] Currency: GBP
  - [ ] Quantity: Fixed (1)
- [ ] Click: "Create link"
- [ ] Copy the URL
- [ ] Save URL somewhere safe

**Your Test Payment Link URL**:
```
[Paste your URL here]
```

---

## 🎯 STEP 2: ADD TO LOCAL ENVIRONMENT (2 min)

### Checklist
- [ ] Open: .env.local file
- [ ] Add line:
  ```
  NEXT_PUBLIC_STRIPE_PAYMENT_LINK=[Your Test URL]
  ```
- [ ] Save file
- [ ] Restart dev server:
  - [ ] Press: Ctrl+C
  - [ ] Run: npm run dev
  - [ ] Wait for: "Ready in X.Xs"

---

## 🎯 STEP 3: TEST LOCALLY (5 min)

### Checklist
- [ ] Go to: http://localhost:3000
- [ ] Enter idea: "AI fitness app"
- [ ] Select focus area: "Market Opportunity"
- [ ] Click: "Analyze"
- [ ] Wait for SWOT results
- [ ] Click: "Upgrade" button
- [ ] Click: "Upgrade Now"
- [ ] Stripe page opens
- [ ] Enter test card:
  - [ ] Card: 4242 4242 4242 4242
  - [ ] Expiry: 12/25
  - [ ] CVC: 123
  - [ ] Name: Test User
  - [ ] Email: test@example.com
- [ ] Click: "Pay"
- [ ] Wait for redirect
- [ ] Verify: Export button appears
- [ ] Click: "Export as PDF"
- [ ] Verify: PDF downloads
- [ ] Open PDF and verify content
- [ ] Check console (F12): No errors

---

## 🎯 STEP 4: ADD TO VERCEL (5 min)

### Checklist
- [ ] Go to: https://vercel.com
- [ ] Click: Your "swotgen" project
- [ ] Click: "Settings" tab
- [ ] Click: "Environment Variables"
- [ ] Click: "Add New"
- [ ] Fill in:
  - [ ] Name: NEXT_PUBLIC_STRIPE_PAYMENT_LINK
  - [ ] Value: [Your Test URL]
  - [ ] Environments: ✓ Production ✓ Preview ✓ Development
- [ ] Click: "Save"
- [ ] Click: "Deployments" tab
- [ ] Click: "..." on latest deployment
- [ ] Click: "Redeploy"
- [ ] Wait for: "Ready" status (2-3 min)

---

## 🎯 STEP 5: TEST ON VERCEL (5 min)

### Checklist
- [ ] Go to: https://swotgen.vercel.app
- [ ] Enter idea: "AI fitness app"
- [ ] Select focus area: "Market Opportunity"
- [ ] Click: "Analyze"
- [ ] Wait for SWOT results
- [ ] Click: "Upgrade" button
- [ ] Click: "Upgrade Now"
- [ ] Stripe page opens
- [ ] Enter test card:
  - [ ] Card: 4242 4242 4242 4242
  - [ ] Expiry: 12/25
  - [ ] CVC: 123
- [ ] Click: "Pay"
- [ ] Wait for redirect
- [ ] Verify: Export button appears
- [ ] Click: "Export as PDF"
- [ ] Verify: PDF downloads
- [ ] Check console (F12): No errors

---

## ✅ VERIFICATION

### Local Testing Results
- [ ] Payment modal opened: YES / NO
- [ ] Stripe page loaded: YES / NO
- [ ] Test payment completed: YES / NO
- [ ] Redirected back to app: YES / NO
- [ ] Export button appeared: YES / NO
- [ ] PDF exported successfully: YES / NO
- [ ] No errors in console: YES / NO

### Vercel Testing Results
- [ ] Payment modal opened: YES / NO
- [ ] Stripe page loaded: YES / NO
- [ ] Test payment completed: YES / NO
- [ ] Redirected back to app: YES / NO
- [ ] Export button appeared: YES / NO
- [ ] PDF exported successfully: YES / NO
- [ ] No errors in console: YES / NO

---

## 🎯 TEST CARD

```
Card: 4242 4242 4242 4242
Expiry: 12/25
CVC: 123
```

---

## 📊 COMPLETE FLOW

```
1. Analyze idea
2. Click "Upgrade"
3. Enter test card
4. Complete payment
5. Export button appears
6. Export PDF
```

---

## 🎉 NEXT STEPS

### If All Tests Pass ✅
1. Verify Stripe dashboard shows test payment
2. Switch to live mode (when ready)
3. Create live payment link
4. Update Vercel environment variable
5. Redeploy app
6. Share with users

### If Tests Fail ❌
1. Check browser console (F12) for errors
2. Verify payment link URL is correct
3. Verify environment variables are set
4. Restart dev server
5. Try again

---

## 📞 QUICK TROUBLESHOOTING

### Payment modal doesn't open
```
1. Check: .env.local has NEXT_PUBLIC_STRIPE_PAYMENT_LINK
2. Restart: Dev server (Ctrl+C, npm run dev)
3. Check: Browser console (F12)
```

### Export button doesn't appear
```
1. Refresh: Page (F5)
2. Check: Browser console (F12)
3. Check: localStorage has isPremium=true
```

### PDF doesn't download
```
1. Check: Browser console (F12)
2. Check: Browser download settings
3. Try: Different browser
```

---

**Ready? Start with Step 1! 🚀**

