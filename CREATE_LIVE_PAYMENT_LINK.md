# 🚀 CREATE LIVE PAYMENT LINK - STEP BY STEP

**Status**: Ready to create  
**Time**: 5 minutes  
**Mode**: Live Mode (Real Payments)

---

## 🎯 STEP 1: OPEN STRIPE DASHBOARD

### What to do:
1. Go to: https://dashboard.stripe.com
2. Log in with your Stripe account
3. You should see your dashboard

### What to look for:
- Top right corner should show "Live Mode" (not "Test Mode")
- If it says "Test Mode", click the toggle to switch to "Live Mode"

---

## 🎯 STEP 2: NAVIGATE TO PAYMENT LINKS

### What to do:
1. Look at the left sidebar
2. Find: "Payment Links" (under "Payments" section)
3. Click: "Payment Links"

### What you should see:
- A list of your payment links (if you have any)
- A "+ New" button at the top

---

## 🎯 STEP 3: CREATE NEW PAYMENT LINK

### What to do:
1. Click: "+ New" button
2. You'll see a form to create a new payment link

### What you should see:
- A form with fields to fill in
- Options for product, price, quantity, etc.

---

## 🎯 STEP 4: FILL IN PRODUCT DETAILS

### Product Name:
1. Find: "Product name" field
2. Enter: `SwotGen Premium`

### Description (Optional):
1. Find: "Description" field
2. Enter: `Unlimited SWOT analyses + PDF export`

### Price:
1. Find: "Price" field
2. Enter: `9.99`

### Currency:
1. Find: "Currency" dropdown
2. Select: `GBP (£)`

### Quantity:
1. Find: "Quantity" section
2. Select: "Fixed quantity"
3. Enter: `1`

---

## 🎯 STEP 5: CONFIGURE SUCCESS URL (OPTIONAL BUT RECOMMENDED)

### What to do:
1. Scroll down to "After payment" section
2. Find: "Success URL" field
3. Enter: `https://swotgen.vercel.app?premium=true`

### Why:
- This tells Stripe where to redirect after payment
- Your app will detect `?premium=true` and activate premium
- Makes the flow seamless

---

## 🎯 STEP 6: CREATE THE LINK

### What to do:
1. Scroll to bottom of form
2. Click: "Create link" button
3. Wait for the link to be created

### What you should see:
- A success message
- Your new payment link URL

---

## 🎯 STEP 7: COPY YOUR PAYMENT LINK URL

### What to do:
1. Find your new payment link in the list
2. Look for the URL (starts with `https://buy.stripe.com/`)
3. Click the copy button (or select and copy manually)

### Example URL:
```
https://buy.stripe.com/[unique-id]
```

### Important:
- Should NOT contain "test" in the URL
- Should start with `https://buy.stripe.com/`

---

## 🎯 STEP 8: VERIFY IT'S LIVE MODE

### What to do:
1. Look at your payment link URL
2. Make sure it does NOT contain "test"
3. Example of LIVE URL: `https://buy.stripe.com/aBC123xyz`
4. Example of TEST URL: `https://buy.stripe.com/test/aBC123xyz`

### If it says "test":
- You're in test mode
- Go back and switch to "Live Mode" first
- Then create a new payment link

---

## ✅ VERIFICATION CHECKLIST

- [ ] Logged into Stripe
- [ ] In "Live Mode" (not "Test Mode")
- [ ] Navigated to "Payment Links"
- [ ] Clicked "+ New"
- [ ] Filled in product name: "SwotGen Premium"
- [ ] Filled in price: "9.99"
- [ ] Selected currency: "GBP"
- [ ] Set quantity: "Fixed (1)"
- [ ] (Optional) Set success URL: "https://swotgen.vercel.app?premium=true"
- [ ] Clicked "Create link"
- [ ] Copied the payment link URL
- [ ] Verified URL does NOT contain "test"

---

## 📋 YOUR LIVE PAYMENT LINK

**Paste your URL here**:
```
[Your live payment link URL]
```

---

## 🎯 NEXT STEPS

1. Copy your payment link URL
2. Go to: https://vercel.com
3. Update environment variable: `NEXT_PUBLIC_STRIPE_PAYMENT_LINK`
4. Paste your URL
5. Redeploy app
6. Test live payment

---

## 📞 TROUBLESHOOTING

### Can't find "Payment Links"?
```
1. Make sure you're logged into Stripe
2. Look in left sidebar under "Payments"
3. If still can't find it, try refreshing the page
```

### URL contains "test"?
```
1. You're in test mode
2. Switch to "Live Mode" (top right toggle)
3. Create a new payment link
```

### Can't see "+ New" button?
```
1. Make sure you're on the "Payment Links" page
2. Try refreshing the page
3. Check if you have permission to create links
```

---

## ✅ SUMMARY

### What You'll Do
1. Open Stripe dashboard
2. Go to Payment Links
3. Click "+ New"
4. Fill in product details
5. Create link
6. Copy URL

### Total Time: 5 minutes

### Result
✅ Live payment link created  
✅ Ready to add to Vercel  
✅ Ready to go live  

---

**Ready? Start with Step 1! 🚀**

