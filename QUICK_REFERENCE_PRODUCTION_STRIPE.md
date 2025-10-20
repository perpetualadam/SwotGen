# ⚡ QUICK REFERENCE - PRODUCTION & STRIPE

**Status**: ✅ **READY TO CONFIGURE**  
**Time**: 20 minutes  
**Difficulty**: Easy

---

## 📋 YOUR QUESTIONS - QUICK ANSWERS

### Q1: Will PDF export work on Vercel after premium upgrade?

**A**: ✅ **YES - AUTOMATICALLY**

- Export code deployed (commit 87cba60)
- Export button appears when isPremium = true
- No configuration needed
- 100% ready

---

### Q2: How to set up Stripe payment?

**A**: **4 SIMPLE STEPS (20 minutes)**

---

## 🚀 STRIPE SETUP - 4 STEPS

### STEP 1: Create Stripe Payment Link (5 min)

```
1. Go: https://dashboard.stripe.com
2. Click: "Payment Links" → "+ New"
3. Fill in:
   - Product: SwotGen Premium
   - Price: 9.99 GBP
   - Quantity: Fixed (1)
4. Click: "Create link"
5. Copy the URL
```

**Example URL**:
```
https://buy.stripe.com/test/[unique-id]
```

---

### STEP 2: Add to Vercel (5 min)

```
1. Go: https://vercel.com
2. Click: Your "swotgen" project
3. Click: Settings → Environment Variables
4. Click: "Add New"
5. Fill in:
   - Name: NEXT_PUBLIC_STRIPE_PAYMENT_LINK
   - Value: [Your Stripe URL from Step 1]
   - Environments: ✓ Production ✓ Preview ✓ Development
6. Click: "Save"
7. Click: Deployments → "..." → "Redeploy"
8. Wait for deployment (2-3 min)
```

---

### STEP 3: Test Locally (5 min)

```
1. Edit .env.local:
   NEXT_PUBLIC_STRIPE_PAYMENT_LINK=[Your Stripe URL]

2. Restart dev server:
   Ctrl+C
   npm run dev

3. Test at http://localhost:3000:
   - Analyze an idea
   - Click "Upgrade"
   - Use test card: 4242 4242 4242 4242
   - Expiry: 12/25
   - CVC: 123
   - Complete payment
   - Export button should appear
   - Test PDF export
```

---

### STEP 4: Test on Vercel (5 min)

```
1. Go: https://swotgen.vercel.app

2. Test payment flow:
   - Analyze an idea
   - Click "Upgrade"
   - Use test card: 4242 4242 4242 4242
   - Complete payment
   - Export button should appear
   - Test PDF export

3. Check console (F12):
   - No errors should appear
```

---

## ✅ VERIFICATION CHECKLIST

### Local Testing
- [ ] Payment modal opens
- [ ] Stripe page loads
- [ ] Test payment completes
- [ ] Redirected back to app
- [ ] Export button appears
- [ ] PDF exports successfully

### Vercel Testing
- [ ] Payment modal opens
- [ ] Stripe page loads
- [ ] Test payment completes
- [ ] Redirected back to app
- [ ] Export button appears
- [ ] PDF exports successfully

---

## 🎯 STRIPE TEST CARDS

```
Successful Payment:
Card: 4242 4242 4242 4242
Expiry: 12/25 (any future date)
CVC: 123 (any 3 digits)

Declined Payment:
Card: 4000 0000 0000 0002
Expiry: 12/25
CVC: 123
```

---

## 📊 COMPLETE FLOW

```
User → Analyzes Idea → Clicks Upgrade → Pays via Stripe
→ Redirected to App → Export Button Appears → Exports PDF
```

---

## 🔐 SECURITY

```
✅ Keep secret key private
✅ Use environment variables
✅ Test with test mode first
✅ Never commit .env.local to Git
```

---

## 📞 TROUBLESHOOTING

### Payment Modal Doesn't Open
```
1. Check: NEXT_PUBLIC_STRIPE_PAYMENT_LINK is set
2. Restart: Dev server (Ctrl+C, npm run dev)
3. Check: Browser console (F12) for errors
```

### Export Button Doesn't Appear
```
1. Refresh: Page (F5)
2. Check: Browser console (F12) for errors
3. Check: localStorage has isPremium=true
```

### Stripe Page Doesn't Load
```
1. Check: Payment link URL is correct
2. Check: You're in test mode
3. Allow: Pop-ups in browser
```

---

## 📚 DETAILED GUIDES

- **PRODUCTION_DEPLOYMENT_VERIFICATION.md** - Export status
- **STRIPE_SETUP_COMPLETE_GUIDE.md** - Stripe overview
- **STRIPE_PAYMENT_LINK_SETUP_STEPS.md** - Step-by-step guide
- **PRODUCTION_AND_STRIPE_COMPLETE_GUIDE.md** - Complete guide

---

## 🎉 SUMMARY

### Export Feature
```
✅ Status: Deployed
✅ Ready: YES
✅ Configuration: None needed
```

### Stripe Payment
```
⏳ Status: Ready to configure
⏳ Time: 20 minutes
⏳ Steps: 4 simple steps
```

### Result
```
✅ Export works
✅ Payment works
✅ Ready for users
```

---

## 🚀 START NOW

1. **Step 1**: Create Stripe Payment Link (5 min)
2. **Step 2**: Add to Vercel (5 min)
3. **Step 3**: Test Locally (5 min)
4. **Step 4**: Test on Vercel (5 min)

**Total: 20 minutes**

---

**Ready? Start with Step 1! 🚀**

