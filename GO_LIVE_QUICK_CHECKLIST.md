# ✅ GO LIVE - QUICK CHECKLIST

**Status**: Ready to go live  
**Time**: 10 minutes  
**Mode**: Live Mode (Real Payments)

---

## 🎯 STEP 1: CREATE LIVE PAYMENT LINK (3 min)

### Checklist
- [ ] Go to: https://dashboard.stripe.com
- [ ] Make sure: "Test Mode" is OFF (should show "Live Mode")
- [ ] Click: "Payment Links" → "+ New"
- [ ] Fill in:
  - [ ] Product: SwotGen Premium
  - [ ] Price: 9.99 GBP
  - [ ] Quantity: Fixed (1)
- [ ] Click: "Create link"
- [ ] Copy the URL

**Your Live Payment Link URL**:
```
[Paste your URL here]
```

---

## 🎯 STEP 2: UPDATE VERCEL (3 min)

### Checklist
- [ ] Go to: https://vercel.com
- [ ] Click: Your "swotgen" project
- [ ] Settings → Environment Variables
- [ ] Find: NEXT_PUBLIC_STRIPE_PAYMENT_LINK
- [ ] Click: Edit (pencil icon)
- [ ] Replace: Old test URL with new live URL
- [ ] Click: "Save"
- [ ] Click: Deployments tab
- [ ] Click: "..." on latest deployment
- [ ] Click: "Redeploy"
- [ ] Wait: 2-3 minutes for deployment

---

## 🎯 STEP 3: TEST LIVE (4 min)

### Checklist
- [ ] Go to: https://swotgen.vercel.app
- [ ] Enter idea: "AI fitness app"
- [ ] Select focus area: "Market Opportunity"
- [ ] Click: "Analyze"
- [ ] Wait for SWOT results
- [ ] Click: "Upgrade" button
- [ ] Click: "Upgrade Now"
- [ ] Stripe page opens
- [ ] Enter card details:
  - [ ] Use REAL card (or test card to verify)
  - [ ] Complete payment
- [ ] Wait for redirect
- [ ] Verify: Export button appears
- [ ] Click: "Export as PDF"
- [ ] Verify: PDF downloads
- [ ] Check console (F12): No errors

---

## ✅ VERIFICATION

### Live Testing Results
- [ ] Payment modal opened: YES / NO
- [ ] Stripe page loaded: YES / NO
- [ ] Payment completed: YES / NO
- [ ] Redirected back to app: YES / NO
- [ ] Export button appeared: YES / NO
- [ ] PDF exported successfully: YES / NO
- [ ] No errors in console: YES / NO

---

## 🎯 AFTER GOING LIVE

### Immediate
- [ ] Verify payment in Stripe dashboard
- [ ] Confirm export works
- [ ] Check for errors

### Next
- [ ] Share app with users
- [ ] Monitor Stripe dashboard
- [ ] Monitor app for errors
- [ ] Gather user feedback

---

## 📊 COMPLETE FLOW

```
User → Analyzes Idea → Clicks Upgrade → Pays with REAL card
→ Redirected to App → Export Button Appears → Exports PDF
```

---

## 🎉 SUMMARY

### What You'll Do
1. Create live payment link (3 min)
2. Update Vercel (3 min)
3. Test live (4 min)

### Total Time: 10 minutes

### Result
✅ Live payment system working  
✅ Real payments being processed  
✅ Ready to share with users  

---

**Ready? Start with Step 1! 🚀**

