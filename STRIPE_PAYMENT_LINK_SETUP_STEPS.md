# 📝 STRIPE PAYMENT LINK - STEP-BY-STEP SETUP

**Time**: 15 minutes  
**Difficulty**: Easy  
**Status**: Ready to configure

---

## 🎯 STEP 1: CREATE STRIPE PAYMENT LINK

### 1.1 Open Stripe Dashboard

```
1. Go to: https://dashboard.stripe.com
2. Log in with your Stripe account
3. Look for "Test Mode" toggle in top right corner
4. Make sure it's ON (should show "Test Mode" label)
```

### 1.2 Navigate to Payment Links

```
1. In left sidebar, find "Payment Links"
2. Click on "Payment Links"
3. You should see a list of existing payment links (if any)
4. Click "+ New" button in top right
```

### 1.3 Fill in Payment Link Details

```
Product Information:
- Product name: SwotGen Premium
- Description: Unlimited SWOT analyses + PDF export
- Image: (optional - leave blank)

Pricing:
- Price: 9.99
- Currency: GBP (£)
- Quantity: Fixed (1)

Billing:
- Billing period: One-time payment (default)
```

### 1.4 Create the Link

```
1. Scroll down and click "Create link"
2. Wait for the link to be created
3. You'll see a success message
4. The payment link URL will be displayed
```

### 1.5 Copy Your Payment Link URL

```
Example URL format:
https://buy.stripe.com/test/[unique-id]

1. Copy the full URL
2. Save it somewhere safe (you'll need it in Step 2)
3. Keep this URL private
```

### 1.6 (Optional) Set Success URL

```
1. In Payment Link settings, scroll to "After payment"
2. Find "Success URL" field
3. Enter: https://swotgen.vercel.app?premium=true
4. This redirects users back to your app after payment
5. Click "Save"
```

---

## 🎯 STEP 2: ADD TO VERCEL ENVIRONMENT VARIABLES

### 2.1 Open Vercel Dashboard

```
1. Go to: https://vercel.com
2. Log in with your account
3. Click on your "swotgen" project
```

### 2.2 Go to Settings

```
1. Click "Settings" tab at top
2. In left sidebar, click "Environment Variables"
3. You should see a list of existing variables
```

### 2.3 Add New Environment Variable

```
1. Click "Add New" button
2. Fill in the form:
   - Name: NEXT_PUBLIC_STRIPE_PAYMENT_LINK
   - Value: [Your Stripe Payment Link URL from Step 1.5]
   - Environments: Check all three:
     ✓ Production
     ✓ Preview
     ✓ Development
3. Click "Save"
```

### 2.4 Verify Variable Added

```
1. You should see the new variable in the list
2. It should show: NEXT_PUBLIC_STRIPE_PAYMENT_LINK
3. The value should be hidden (for security)
```

### 2.5 Redeploy Your App

```
1. Click "Deployments" tab
2. Find the latest deployment (top of list)
3. Click the "..." menu on the right
4. Click "Redeploy"
5. Wait for deployment to complete (2-3 minutes)
6. You should see "Ready" status when done
```

---

## 🎯 STEP 3: TEST LOCALLY

### 3.1 Add to Local Environment

```
1. Open .env.local file in your project
2. Add this line:
   NEXT_PUBLIC_STRIPE_PAYMENT_LINK=[Your Stripe Payment Link URL]
3. Save the file
```

### 3.2 Restart Dev Server

```
1. In terminal, press: Ctrl+C (to stop current server)
2. Run: npm run dev
3. Wait for "Ready in X.Xs" message
4. Dev server should be running at http://localhost:3000
```

### 3.3 Test Payment Flow

```
1. Open: http://localhost:3000
2. Enter a business idea (e.g., "AI fitness app")
3. Select focus area (e.g., "Market Opportunity")
4. Click "Analyze"
5. Wait for SWOT results
6. Click "Upgrade" button
7. Stripe payment modal should open
```

### 3.4 Complete Test Payment

```
1. Stripe payment page should open in new window
2. Fill in payment details:
   - Card: 4242 4242 4242 4242
   - Expiry: 12/25 (or any future date)
   - CVC: 123
   - Name: Test User
   - Email: test@example.com
3. Click "Pay" button
4. Payment should complete
5. You should be redirected back to app
```

### 3.5 Verify Export Button Appears

```
1. After payment, you should be back at http://localhost:3000
2. Look for "Premium Feature" label
3. Below it should be "📥 Export as PDF" button
4. Click the button
5. PDF should download to your Downloads folder
6. Open PDF and verify it contains SWOT data
```

---

## 🎯 STEP 4: TEST ON VERCEL

### 4.1 Open Your Vercel URL

```
1. Go to: https://swotgen.vercel.app
2. (Or your custom domain if you have one)
3. Wait for page to load
```

### 4.2 Test Payment Flow

```
1. Enter a business idea
2. Select focus area
3. Click "Analyze"
4. Wait for SWOT results
5. Click "Upgrade" button
6. Stripe payment modal should open
```

### 4.3 Complete Test Payment

```
1. Stripe payment page should open
2. Use test card: 4242 4242 4242 4242
3. Complete payment
4. You should be redirected back to app
```

### 4.4 Verify Export Works

```
1. Export button should appear
2. Click "Export as PDF"
3. PDF should download
4. Open PDF and verify content
```

### 4.5 Check Browser Console

```
1. Press F12 to open developer tools
2. Click "Console" tab
3. Look for any errors (red text)
4. If no errors, everything is working!
```

---

## ✅ VERIFICATION CHECKLIST

### Local Testing
- [ ] Dev server running at http://localhost:3000
- [ ] Payment modal opens when clicking "Upgrade"
- [ ] Stripe payment page loads
- [ ] Test payment completes successfully
- [ ] Redirected back to app
- [ ] Export button appears
- [ ] PDF exports successfully
- [ ] No errors in console

### Vercel Testing
- [ ] App loads at https://swotgen.vercel.app
- [ ] Payment modal opens when clicking "Upgrade"
- [ ] Stripe payment page loads
- [ ] Test payment completes successfully
- [ ] Redirected back to app
- [ ] Export button appears
- [ ] PDF exports successfully
- [ ] No errors in console

---

## 🎯 STRIPE TEST CARDS

### Successful Payment
```
Card: 4242 4242 4242 4242
Expiry: 12/25 (any future date)
CVC: 123 (any 3 digits)
Result: Payment succeeds
```

### Declined Payment
```
Card: 4000 0000 0000 0002
Expiry: 12/25
CVC: 123
Result: Payment declined (for testing error handling)
```

### 3D Secure
```
Card: 4000 0025 0000 3155
Expiry: 12/25
CVC: 123
Result: Requires 3D Secure authentication
```

---

## 🔐 SECURITY REMINDERS

### Do's
```
✅ Keep Stripe secret key private
✅ Use environment variables for sensitive data
✅ Test with test mode first
✅ Never commit .env.local to Git
✅ Use HTTPS in production
```

### Don'ts
```
❌ Don't share your secret key
❌ Don't commit API keys to Git
❌ Don't use live mode for testing
❌ Don't hardcode payment links
❌ Don't expose sensitive data in frontend
```

---

## 📞 TROUBLESHOOTING

### Payment Modal Doesn't Open
```
Problem: Clicking "Upgrade" does nothing
Solution:
1. Check .env.local has NEXT_PUBLIC_STRIPE_PAYMENT_LINK
2. Restart dev server (Ctrl+C, npm run dev)
3. Check browser console (F12) for errors
4. Verify payment link URL is correct
```

### Stripe Page Doesn't Load
```
Problem: Payment modal opens but Stripe page is blank
Solution:
1. Check payment link URL is correct
2. Check Stripe account is active
3. Check you're in test mode
4. Allow pop-ups in browser settings
```

### Export Button Doesn't Appear After Payment
```
Problem: Payment completes but export button missing
Solution:
1. Refresh page (F5)
2. Check browser console (F12) for errors
3. Check localStorage has isPremium=true
4. Check URL has ?premium=true parameter
```

### PDF Doesn't Download
```
Problem: Export button exists but PDF doesn't download
Solution:
1. Check browser console (F12) for errors
2. Check browser download settings
3. Allow downloads from localhost
4. Try different browser
```

---

## 🎉 NEXT STEPS

### After Successful Testing
1. Switch Stripe to live mode
2. Create live payment link
3. Update Vercel environment variable
4. Redeploy app
5. Share with users

### Monitoring
1. Check Stripe dashboard for payments
2. Monitor app for errors
3. Gather user feedback
4. Iterate and improve

---

**Ready? Start with Step 1! 🚀**

