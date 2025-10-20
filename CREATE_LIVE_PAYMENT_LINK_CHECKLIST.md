# ✅ CREATE LIVE PAYMENT LINK - QUICK CHECKLIST

**Time**: 5 minutes  
**Mode**: Live Mode

---

## 🎯 STEP 1: OPEN STRIPE DASHBOARD

- [ ] Go to: https://dashboard.stripe.com
- [ ] Log in with your account
- [ ] You should see your dashboard

---

## 🎯 STEP 2: SWITCH TO LIVE MODE

- [ ] Look at top right corner
- [ ] If it says "Test Mode", click the toggle
- [ ] It should now say "Live Mode"

---

## 🎯 STEP 3: GO TO PAYMENT LINKS

- [ ] Look at left sidebar
- [ ] Find: "Payment Links" (under "Payments")
- [ ] Click: "Payment Links"

---

## 🎯 STEP 4: CREATE NEW LINK

- [ ] Click: "+ New" button
- [ ] You should see a form

---

## 🎯 STEP 5: FILL IN PRODUCT DETAILS

### Product Name
- [ ] Find: "Product name" field
- [ ] Enter: `SwotGen Premium`

### Description (Optional)
- [ ] Find: "Description" field
- [ ] Enter: `Unlimited SWOT analyses + PDF export`

### Price
- [ ] Find: "Price" field
- [ ] Enter: `9.99`

### Currency
- [ ] Find: "Currency" dropdown
- [ ] Select: `GBP (£)`

### Quantity
- [ ] Find: "Quantity" section
- [ ] Select: "Fixed quantity"
- [ ] Enter: `1`

---

## 🎯 STEP 6: SET SUCCESS URL (OPTIONAL)

- [ ] Scroll down to "After payment"
- [ ] Find: "Success URL" field
- [ ] Enter: `https://swotgen.vercel.app?premium=true`

---

## 🎯 STEP 7: CREATE LINK

- [ ] Scroll to bottom
- [ ] Click: "Create link" button
- [ ] Wait for success message

---

## 🎯 STEP 8: COPY PAYMENT LINK URL

- [ ] Find your new payment link in the list
- [ ] Look for the URL (starts with `https://buy.stripe.com/`)
- [ ] Click copy button or select and copy manually

### Verify:
- [ ] URL does NOT contain "test"
- [ ] URL starts with `https://buy.stripe.com/`

---

## 📋 YOUR LIVE PAYMENT LINK

**Paste your URL here**:
```
[Your live payment link URL]
```

---

## ✅ VERIFICATION

- [ ] In Live Mode (not Test Mode)
- [ ] Payment link created
- [ ] URL copied
- [ ] URL does NOT contain "test"
- [ ] Ready to add to Vercel

---

## 🎯 NEXT STEPS

1. Copy your payment link URL
2. Go to: https://vercel.com
3. Update: `NEXT_PUBLIC_STRIPE_PAYMENT_LINK`
4. Paste your URL
5. Redeploy app
6. Test live payment

---

**Ready? Start with Step 1! 🚀**

