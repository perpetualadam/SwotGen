# 🧪 TEST MODE SETUP - COMPLETE GUIDE

**Status**: ✅ **READY TO CONFIGURE**  
**Date**: October 17, 2025  
**Mode**: Test Mode (Safe Testing)  
**Time**: 20 minutes

---

## 🎯 WHAT WE'RE DOING

We're setting up Stripe **test mode** first to verify everything works before going live.

**Why Test Mode First?**
```
✅ Safe - No real money charged
✅ Test - Verify complete flow works
✅ Confidence - Know everything is correct
✅ Easy - Switch to live mode later
```

---

## 📋 STEP 1: GET YOUR TEST STRIPE PAYMENT LINK

### 1.1 Open Stripe Dashboard in Test Mode

```
1. Go to: https://dashboard.stripe.com
2. Look for "Test Mode" toggle in top right
3. Make sure it's ON (should show "Test Mode" label)
4. You should see test data (test payments, etc.)
```

### 1.2 Create Test Payment Link

```
1. In left sidebar, click: "Payment Links"
2. Click: "+ New" button
3. Fill in the form:
   - Product name: SwotGen Premium
   - Description: Unlimited SWOT analyses + PDF export
   - Price: 9.99
   - Currency: GBP (£)
   - Quantity: Fixed (1)
4. Click: "Create link"
```

### 1.3 Copy Your Test Payment Link

```
1. After link is created, you'll see the URL
2. Example: https://buy.stripe.com/test/[unique-id]
3. Copy the full URL
4. Save it somewhere safe
```

### 1.4 (Optional) Set Success URL

```
1. In Payment Link settings, scroll to "After payment"
2. Find "Success URL" field
3. Enter: https://swotgen.vercel.app?premium=true
4. Click "Save"
```

---

## 📋 STEP 2: ADD TEST PAYMENT LINK TO LOCAL ENVIRONMENT

### 2.1 Edit .env.local File

```
1. Open your project in VS Code
2. Find or create: .env.local file
3. Add this line:
   NEXT_PUBLIC_STRIPE_PAYMENT_LINK=[Your Test Payment Link URL]
4. Save the file
```

**Example**:
```
NEXT_PUBLIC_STRIPE_PAYMENT_LINK=https://buy.stripe.com/test/abc123xyz
```

### 2.2 Restart Dev Server

```
1. In terminal, press: Ctrl+C (to stop current server)
2. Run: npm run dev
3. Wait for "Ready in X.Xs" message
4. Dev server should be running at http://localhost:3000
```

---

## 📋 STEP 3: TEST LOCALLY WITH TEST CARD

### 3.1 Open Your Local App

```
1. Go to: http://localhost:3000
2. Wait for page to load
```

### 3.2 Analyze an Idea

```
1. Enter a business idea (e.g., "AI fitness app")
2. Select focus area (e.g., "Market Opportunity")
3. Click "Analyze"
4. Wait for SWOT results
```

### 3.3 Click Upgrade Button

```
1. After SWOT results appear
2. Click "Upgrade" button
3. Premium modal should open
4. Click "Upgrade Now"
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

### 3.6 Check Browser Console

```
1. Press F12 to open developer tools
2. Click "Console" tab
3. Look for any errors (red text)
4. If no errors, everything is working!
```

---

## 📋 STEP 4: ADD TEST PAYMENT LINK TO VERCEL

### 4.1 Open Vercel Dashboard

```
1. Go to: https://vercel.com
2. Log in with your account
3. Click on your "swotgen" project
```

### 4.2 Go to Settings

```
1. Click "Settings" tab at top
2. In left sidebar, click "Environment Variables"
3. You should see a list of existing variables
```

### 4.3 Add New Environment Variable

```
1. Click "Add New" button
2. Fill in the form:
   - Name: NEXT_PUBLIC_STRIPE_PAYMENT_LINK
   - Value: [Your Test Payment Link URL from Step 1.3]
   - Environments: Check all three:
     ✓ Production
     ✓ Preview
     ✓ Development
3. Click "Save"
```

### 4.4 Redeploy Your App

```
1. Click "Deployments" tab
2. Find the latest deployment (top of list)
3. Click the "..." menu on the right
4. Click "Redeploy"
5. Wait for deployment to complete (2-3 minutes)
6. You should see "Ready" status when done
```

---

## 📋 STEP 5: TEST ON VERCEL WITH TEST CARD

### 5.1 Open Your Vercel URL

```
1. Go to: https://swotgen.vercel.app
2. (Or your custom domain if you have one)
3. Wait for page to load
```

### 5.2 Analyze an Idea

```
1. Enter a business idea
2. Select focus area
3. Click "Analyze"
4. Wait for SWOT results
```

### 5.3 Click Upgrade Button

```
1. Click "Upgrade" button
2. Premium modal should open
3. Click "Upgrade Now"
```

### 5.4 Complete Test Payment

```
1. Stripe payment page should open
2. Use test card: 4242 4242 4242 4242
3. Expiry: 12/25
4. CVC: 123
5. Complete payment
6. You should be redirected back to app
```

### 5.5 Verify Export Works

```
1. Export button should appear
2. Click "Export as PDF"
3. PDF should download
4. Open PDF and verify content
```

### 5.6 Check Browser Console

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

### Declined Payment (for testing error handling)
```
Card: 4000 0000 0000 0002
Expiry: 12/25
CVC: 123
Result: Payment declined
```

### 3D Secure (for testing authentication)
```
Card: 4000 0025 0000 3155
Expiry: 12/25
CVC: 123
Result: Requires 3D Secure authentication
```

---

## 📊 COMPLETE FLOW

```
User → Analyzes Idea → Clicks Upgrade → Pays via Stripe (Test)
→ Redirected to App → Export Button Appears → Exports PDF
```

---

## 🔐 SECURITY NOTES

### Test Mode
```
✅ No real money charged
✅ Safe to test multiple times
✅ Test cards don't work on live mode
✅ Live cards don't work on test mode
```

### Environment Variables
```
✅ .env.local is NOT committed to Git
✅ Vercel environment variables are secure
✅ Only NEXT_PUBLIC_ variables visible in frontend
✅ Keep secret keys private
```

---

## 📞 TROUBLESHOOTING

### Payment Modal Doesn't Open
```
Problem: Clicking "Upgrade" does nothing
Solution:
1. Check: .env.local has NEXT_PUBLIC_STRIPE_PAYMENT_LINK
2. Restart: Dev server (Ctrl+C, npm run dev)
3. Check: Browser console (F12) for errors
4. Verify: Payment link URL is correct
```

### Stripe Page Doesn't Load
```
Problem: Payment modal opens but Stripe page is blank
Solution:
1. Check: Payment link URL is correct
2. Check: You're in test mode
3. Allow: Pop-ups in browser settings
4. Try: Different browser
```

### Export Button Doesn't Appear After Payment
```
Problem: Payment completes but export button missing
Solution:
1. Refresh: Page (F5)
2. Check: Browser console (F12) for errors
3. Check: localStorage has isPremium=true
4. Check: URL has ?premium=true parameter
```

### PDF Doesn't Download
```
Problem: Export button exists but PDF doesn't download
Solution:
1. Check: Browser console (F12) for errors
2. Check: Browser download settings
3. Allow: Downloads from localhost
4. Try: Different browser
```

---

## 🎯 NEXT STEPS

### After Successful Testing
1. ✅ Verify all tests pass
2. ✅ Confirm export works
3. ✅ Check Stripe dashboard for test payment
4. ⏳ Switch to live mode (when ready)
5. ⏳ Create live payment link
6. ⏳ Update Vercel environment variable
7. ⏳ Redeploy app
8. ⏳ Share with users

### Monitoring
1. Check Stripe dashboard for payments
2. Monitor app for errors
3. Gather user feedback
4. Iterate and improve

---

## 🎉 SUMMARY

### Test Mode Setup
```
✅ Create test payment link
✅ Add to .env.local
✅ Test locally
✅ Add to Vercel
✅ Test on Vercel
```

### Time Required
```
Step 1: 5 minutes
Step 2: 2 minutes
Step 3: 5 minutes
Step 4: 5 minutes
Step 5: 5 minutes
Total: 22 minutes
```

### Result
```
✅ Complete payment flow working
✅ Export feature working
✅ Ready for live mode
✅ Confident to go live
```

---

**Ready? Start with Step 1! 🚀**

