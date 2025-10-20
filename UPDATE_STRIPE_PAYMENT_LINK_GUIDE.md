# 🔗 UPDATE STRIPE PAYMENT LINK - STEP BY STEP

**Status**: Ready to update  
**Time**: 3 minutes  
**Importance**: Critical for payment verification

---

## 🎯 WHAT YOU'RE DOING

You're adding a "Success URL" to your Stripe payment link. This tells Stripe where to redirect after successful payment, which enables the payment verification fix.

---

## 📋 STEP 1: OPEN STRIPE DASHBOARD

### What to do:
1. Go to: https://dashboard.stripe.com
2. Log in with your Stripe account
3. You should see your dashboard

### What to look for:
- You should be in "Live Mode" (not "Test Mode")
- Top right should show "Live Mode"

---

## 📋 STEP 2: GO TO PAYMENT LINKS

### What to do:
1. Look at the left sidebar
2. Find: "Payment Links" (under "Payments" section)
3. Click: "Payment Links"

### What you should see:
- A list of your payment links
- Your "SwotGen Premium" payment link should be there

---

## 📋 STEP 3: FIND YOUR SWOTGEN PREMIUM LINK

### What to do:
1. Look at the list of payment links
2. Find: "SwotGen Premium" (or similar name)
3. You should see the link URL starting with `https://buy.stripe.com/`

### What you should see:
- Product name: SwotGen Premium
- Price: £9.99
- Status: Active

---

## 📋 STEP 4: CLICK EDIT

### What to do:
1. Find your SwotGen Premium payment link
2. Look for: Edit button (pencil icon) on the right side
3. Click: The edit button

### What you should see:
- Payment link editor opens
- Form with product details
- Various settings and options

---

## 📋 STEP 5: SCROLL TO "AFTER PAYMENT" SECTION

### What to do:
1. Scroll down in the payment link editor
2. Look for: "After payment" section
3. You should see options for what happens after payment

### What you should see:
- "After payment" heading
- Options for success and failure URLs
- "Success URL" field

---

## 📋 STEP 6: FIND THE SUCCESS URL FIELD

### What to do:
1. In the "After payment" section
2. Find: "Success URL" field
3. This is where you'll enter the redirect URL

### What you should see:
- A text input field labeled "Success URL"
- It might be empty or have an old URL
- There might also be a "Failure URL" field

---

## 📋 STEP 7: ENTER THE SUCCESS URL

### What to do:
1. Click: The "Success URL" field
2. Clear: Any existing text
3. Enter: `https://swotgen.vercel.app/payment-success`
4. Make sure: No extra spaces or characters

### Important:
- Must be exactly: `https://swotgen.vercel.app/payment-success`
- No trailing slash
- No query parameters
- No extra spaces

### Example:
```
✓ Correct: https://swotgen.vercel.app/payment-success
✗ Wrong: https://swotgen.vercel.app/payment-success/
✗ Wrong: https://swotgen.vercel.app/payment-success?
✗ Wrong: https://swotgen.vercel.app/payment-success (with space)
```

---

## 📋 STEP 8: SAVE THE CHANGES

### What to do:
1. Scroll to: Bottom of the form
2. Look for: "Save" or "Update" button
3. Click: The save button

### What you should see:
- Success message appears
- Payment link is updated
- You're back at the payment links list

---

## ✅ VERIFICATION CHECKLIST

- [ ] Logged into Stripe
- [ ] In "Live Mode" (not "Test Mode")
- [ ] Navigated to "Payment Links"
- [ ] Found "SwotGen Premium" payment link
- [ ] Clicked "Edit" button
- [ ] Scrolled to "After payment" section
- [ ] Found "Success URL" field
- [ ] Entered: `https://swotgen.vercel.app/payment-success`
- [ ] Clicked "Save" button
- [ ] Success message appeared

---

## 📊 WHAT THIS DOES

### Before Update:
```
User completes payment → Stripe shows success page
→ User closes window → App doesn't know if payment succeeded
```

### After Update:
```
User completes payment → Stripe redirects to /payment-success
→ /payment-success posts message to parent window
→ Parent window knows payment succeeded
→ Premium access is granted
```

---

## 📞 TROUBLESHOOTING

### Can't find "Payment Links"?
```
1. Make sure you're logged into Stripe
2. Look in left sidebar under "Payments"
3. If still can't find it, try refreshing the page
4. Make sure you're in "Live Mode"
```

### Can't find "After payment" section?
```
1. Scroll down in the payment link editor
2. It should be below the product details
3. Try refreshing the page
4. Try editing a different payment link first
```

### Can't find "Success URL" field?
```
1. Make sure you're in the "After payment" section
2. Scroll down more
3. Try refreshing the page
4. Try using a different browser
```

### Success URL field is grayed out?
```
1. You might not have permission to edit
2. Try logging out and back in
3. Try using a different Stripe account
4. Contact Stripe support
```

### Changes won't save?
```
1. Make sure URL is exactly: https://swotgen.vercel.app/payment-success
2. No extra spaces or characters
3. Try refreshing the page
4. Try using a different browser
5. Try clearing browser cache
```

---

## 🎯 NEXT STEPS

After updating the payment link:

1. ✅ Payment link updated
2. ⏳ Test the fix (5 min)
3. ⏳ Verify payment verification works

---

## ✅ SUMMARY

### What You'll Do
1. Open Stripe dashboard
2. Go to Payment Links
3. Find SwotGen Premium link
4. Click Edit
5. Scroll to "After payment"
6. Enter Success URL: `https://swotgen.vercel.app/payment-success`
7. Click Save

### Total Time: 3 minutes

### Result
✅ Payment link updated  
✅ Success URL configured  
✅ Ready to test payment verification  

---

**Ready? Start with Step 1! 🚀**

