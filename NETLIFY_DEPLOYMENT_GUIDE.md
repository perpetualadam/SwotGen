# 🚀 Netlify Deployment Guide - Step by Step
## Idea SWOT Generator - Next.js 14 Application

**Time Required**: 15-20 minutes  
**Difficulty**: Easy  
**Prerequisites**: GitHub account, Netlify account  

---

## 📋 PRE-DEPLOYMENT CHECKLIST

Before you start, verify:

- [ ] Your code is on GitHub (or GitLab/Bitbucket)
- [ ] All changes are committed: `git status` shows clean
- [ ] `.env.local` is in `.gitignore` (not in repository)
- [ ] `package.json` has correct scripts
- [ ] `next.config.js` exists
- [ ] `pages/api/analyze.js` exists
- [ ] You have Grok API key (or Together.ai/OpenAI as backup)
- [ ] You have Stripe Payment Link URL (optional - can add later)

### Verify Your Setup
```bash
# Check git status
git status

# Should show: "On branch main, nothing to commit, working tree clean"

# Check .gitignore
cat .gitignore | grep env.local

# Should show: ".env.local" is listed
```

---

## STEP 1: Create Netlify Account (5 minutes)

### 1.1 Go to Netlify
Visit: https://app.netlify.com

### 1.2 Sign Up
- Click **"Sign up"**
- Choose **"GitHub"** (recommended)
- Authorize Netlify to access your GitHub account
- Complete the setup

### 1.3 Verify Email
- Check your email
- Click verification link
- You're ready to deploy!

---

## STEP 2: Connect Your Repository (5 minutes)

### 2.1 Create New Site
1. Go to https://app.netlify.com
2. Click **"Add new site"**
3. Click **"Import an existing project"**

### 2.2 Choose Git Provider
- Click **"GitHub"** (or GitLab/Bitbucket)
- Authorize if needed

### 2.3 Select Repository
1. Search for your repository: `SwotGen` or `idea-swot-generator`
2. Click to select it
3. Click **"Install"** if prompted

### 2.4 Configure Build Settings
Netlify will show build settings. **Verify**:

```
Build command: npm run build
Publish directory: .next
Node version: 18 (or latest)
```

**These should be auto-detected correctly!**

If not, set them manually:
- **Build command**: `npm run build`
- **Publish directory**: `.next`

### 2.5 Deploy
Click **"Deploy site"**

**Status**: Building... (wait 2-3 minutes)

---

## STEP 3: Add Environment Variables (3 minutes)

### 3.1 Go to Site Settings
1. After deployment completes, go to **"Site settings"**
2. Click **"Build & Deploy"** in left sidebar
3. Click **"Environment"**

### 3.2 Add Variables
Click **"Edit variables"** and add:

#### Variable 1: Grok API Key (Primary)
```
Name: GROK_API_KEY
Value: your_grok_api_key_here
```

OR (if using Together.ai):
```
Name: TOGETHER_API_KEY
Value: your_together_api_key_here
```

OR (if using OpenAI):
```
Name: OPENAI_API_KEY
Value: your_openai_api_key_here
```

#### Variable 2: Stripe Payment Link (Optional - Add Later)
```
Name: NEXT_PUBLIC_STRIPE_PAYMENT_LINK
Value: https://buy.stripe.com/test_abc123...
```
(Leave blank for now if you haven't created the payment link yet)

### 3.3 Save Variables
Click **"Save"**

---

## STEP 4: Trigger New Deploy (2 minutes)

### 4.1 Go to Deploys
1. Click **"Deploys"** tab
2. Click **"Trigger deploy"**
3. Click **"Deploy site"**

### 4.2 Wait for Build
- Status shows: "Building..."
- Wait 2-3 minutes
- Status changes to: "Published" ✅

### 4.3 Get Your URL
Your site is now live at:
```
https://your-site-name.netlify.app
```

---

## STEP 5: Test Your Deployment (5 minutes)

### 5.1 Visit Your Site
1. Click the site URL
2. Your app should load
3. You should see the SWOT Generator interface

### 5.2 Test API Route
1. Enter a business idea (e.g., "AI-powered fitness app")
2. Click "Analyze"
3. Wait for SWOT analysis
4. Should see results in 2-3 seconds

### 5.3 Test Premium Features
1. Click "Upgrade" button
2. Premium modal should appear
3. Click "Upgrade Now"
4. Stripe Payment Link should open
5. Close the window
6. Premium status should activate

### 5.4 Test Persistence
1. Refresh the page
2. Premium status should persist
3. Button should show "⭐ Premium"

### 5.5 Verify Environment Variables
If you see errors:
- "API configuration error" → Check API key
- "Payment link not configured" → Check Stripe link
- Go back to Step 3 and verify variables

---

## STEP 6: Custom Domain (Optional - 5 minutes)

### 6.1 Add Custom Domain
1. Go to **"Site settings"**
2. Click **"Domain management"**
3. Click **"Add custom domain"**
4. Enter your domain (e.g., `swotgen.com`)
5. Follow DNS setup instructions

### 6.2 Configure DNS
- Update your domain registrar's DNS settings
- Point to Netlify nameservers
- Wait 24-48 hours for propagation

---

## TROUBLESHOOTING

### Build Fails
**Error**: "Build failed"

**Solution**:
1. Check build logs: Click **"Deploys"** → Failed deploy → **"Deploy log"**
2. Look for error message
3. Common issues:
   - Missing dependencies: Run `npm install`
   - Wrong Node version: Set to 18+
   - Missing environment variables: Add them in Step 3

### API Routes Don't Work
**Error**: "404 Not Found" on `/api/analyze`

**Solution**:
1. Verify `pages/api/analyze.js` exists
2. Trigger new deploy (Step 4)
3. Check Netlify Functions in dashboard

### Environment Variables Not Working
**Error**: "API configuration error"

**Solution**:
1. Go to **"Site settings"** → **"Build & Deploy"** → **"Environment"**
2. Verify variables are added
3. Trigger new deploy (Step 4)
4. Variables take effect after redeploy

### Stripe Payment Link Not Working
**Error**: "Payment link not configured"

**Solution**:
1. Verify `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` is added
2. Check URL format: `https://buy.stripe.com/test_...`
3. Trigger new deploy (Step 4)

### Site Shows Old Version
**Error**: Seeing old content after deploy

**Solution**:
1. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Try incognito/private window

---

## MONITORING & MAINTENANCE

### View Analytics
1. Go to **"Analytics"** tab
2. See page views, bandwidth, etc.

### View Logs
1. Go to **"Deploys"** tab
2. Click latest deploy
3. Click **"Deploy log"** to see build output
4. Click **"Function log"** to see API errors

### Monitor Functions
1. Go to **"Functions"** tab
2. See invocation count
3. See execution time
4. See errors

### Set Up Alerts (Optional)
1. Go to **"Site settings"** → **"Notifications"**
2. Add email notifications for:
   - Deploy failures
   - High bandwidth usage
   - Function errors

---

## PERFORMANCE TIPS

### Optimize Build Time
- Keep dependencies minimal
- Use `npm ci` instead of `npm install`
- Cache dependencies

### Optimize Function Performance
- Keep API responses small
- Use caching headers
- Minimize external API calls

### Optimize Bandwidth
- Enable compression (automatic)
- Use CDN (automatic)
- Optimize images

---

## NEXT STEPS

### Immediate
- [ ] Deploy to Netlify (this guide)
- [ ] Test all features
- [ ] Share your site URL

### This Week
- [ ] Monitor performance
- [ ] Check analytics
- [ ] Gather user feedback

### Next Week
- [ ] Add custom domain
- [ ] Set up monitoring
- [ ] Plan upgrades

### Later
- [ ] Upgrade to Pro tier if needed
- [ ] Add webhooks for payment verification
- [ ] Add database for user accounts
- [ ] Migrate to Vercel if needed

---

## 🎯 SUMMARY

| Step | Time | Status |
|------|------|--------|
| 1. Create Netlify Account | 5 min | ⏳ |
| 2. Connect Repository | 5 min | ⏳ |
| 3. Add Environment Variables | 3 min | ⏳ |
| 4. Trigger Deploy | 2 min | ⏳ |
| 5. Test Deployment | 5 min | ⏳ |
| **Total** | **20 min** | ⏳ |

---

## 🚀 YOU'RE READY!

Your Idea SWOT Generator is ready to deploy to Netlify!

**Start with Step 1 above and follow each step carefully.**

**Questions?** See NETLIFY_COMPATIBILITY_ANALYSIS.md for more details.

---

**Happy deploying! 🎉**

