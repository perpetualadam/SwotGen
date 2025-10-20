# ⚡ Quick Start Guide
## Idea SWOT Generator - 5 Minute Setup

---

## 🖥️ Choose Your Platform

### Windows Users
👉 Use **PowerShell** commands below (or CMD alternatives)

### macOS/Linux Users
👉 Use **bash/zsh** commands below

---

## 🎯 TL;DR - Fastest Path to Deployment

### Local Development (5 minutes)

#### Windows (PowerShell)
```powershell
# 1. Create environment file
Copy-Item .env.local.example .env.local

# 2. Edit with Notepad
notepad .env.local
# Add: TOGETHER_API_KEY=sk_xxxxxxxxxxxx

# 3. Start development server
npm run dev

# 4. Open http://localhost:3000 and test
# Enter an idea, click "Analyze Idea", see SWOT results
```

#### macOS/Linux (bash/zsh)
```bash
# 1. Create environment file
cp .env.local.example .env.local

# 2. Edit with nano
nano .env.local
# Add: TOGETHER_API_KEY=sk_xxxxxxxxxxxx

# 3. Start development server
npm run dev

# 4. Open http://localhost:3000 and test
# Enter an idea, click "Analyze Idea", see SWOT results
```

### Deploy to Vercel (3 minutes)

```bash
# 1. Push to GitHub (same on all platforms)
git add .
git commit -m "Initial commit"
git push origin main

# 2. Go to https://vercel.com/new
# Import your GitHub repository

# 3. Add environment variable:
# Name: TOGETHER_API_KEY
# Value: (paste your key)

# 4. Click Deploy
# Done! Your app is live 🎉
```

---

## 📋 Pre-Deployment Checklist

### ✅ Installation Complete
```bash
npm list --depth=0
# Should show: next, react, react-dom, tailwindcss, etc.
```

### ✅ Environment Variables Ready

#### Windows (PowerShell)
```powershell
# 1. Create .env.local
Copy-Item .env.local.example .env.local

# 2. Get API key from https://www.together.ai/
# 3. Edit with Notepad
notepad .env.local
# Add: TOGETHER_API_KEY=sk_xxxxxxxxxxxx
```

#### macOS/Linux (bash/zsh)
```bash
# 1. Create .env.local
cp .env.local.example .env.local

# 2. Get API key from https://www.together.ai/
# 3. Edit with nano
nano .env.local
# Add: TOGETHER_API_KEY=sk_xxxxxxxxxxxx
```

### ✅ Local Testing Works
```bash
npm run dev
# Visit http://localhost:3000
# Test: Enter idea → Click "Analyze Idea" → See SWOT results
```

### ✅ Code Ready for GitHub
```bash
# Verify .env.local is NOT committed
git status
# Should NOT show .env.local

# Commit code
git add .
git commit -m "Initial commit"
```

### ✅ GitHub Repository Created
- Go to https://github.com/new
- Create repository
- Copy repository URL

### ✅ Code Pushed to GitHub
```bash
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

---

## 🚀 Deployment Steps

### Step 1: Deploy to Vercel
1. Visit https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repository
4. Click "Import"

### Step 2: Add Environment Variables
1. After import, scroll to "Environment Variables"
2. Add variable:
   - **Name:** `TOGETHER_API_KEY`
   - **Value:** `sk_xxxxxxxxxxxx` (your key)
3. Click "Add"
4. Click "Deploy"

### Step 3: Wait for Deployment
- Vercel will build and deploy your app
- Takes 1-2 minutes
- You'll get a URL like: `https://swotgen.vercel.app`

### Step 4: Test Deployed App
1. Click the URL or visit your Vercel dashboard
2. Test the form with a sample idea
3. Verify SWOT results appear
4. Check browser console for errors

---

## 🔑 API Key Setup

### Together.ai (Recommended - Free)

1. Visit https://www.together.ai/
2. Click "Sign Up"
3. Verify email
4. Go to Dashboard → API Keys
5. Copy your API key
6. Paste into `.env.local`:
   ```env
   TOGETHER_API_KEY=sk_xxxxxxxxxxxx
   ```

### OpenAI (Alternative)

1. Visit https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy the key (only shown once!)
4. Paste into `.env.local`:
   ```env
   OPENAI_API_KEY=sk-xxxxxxxxxxxx
   ```

---

## ⚠️ Security Reminders

- ✅ `.env.local` is in `.gitignore` (won't be committed)
- ✅ Never commit `.env.local` to GitHub
- ✅ Never share your API keys
- ✅ Regenerate keys if accidentally exposed
- ✅ Use `NEXT_PUBLIC_*` only for public keys

---

## 🐛 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| "Cannot find module 'next'" | Run `npm install` |
| "TOGETHER_API_KEY is undefined" | Create `.env.local` with API key |
| "API error: 401" | Verify API key is correct |
| "Port 3000 already in use" | Run `npm run dev -- -p 3001` |
| "Tailwind styles not loading" | Run `rm -rf .next && npm run dev` |
| "Deployed app shows error" | Add environment variables to Vercel |

---

## 📞 Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm start               # Start production server

# Git
git add .               # Stage all files
git commit -m "msg"     # Commit changes
git push origin main    # Push to GitHub

# Verification
npm list --depth=0      # Check installed packages
git status              # Check git status
```

---

## ✨ What You Get

✅ AI-powered SWOT analysis  
✅ Niche viability scoring (0-100)  
✅ Beautiful responsive design  
✅ Smooth animations  
✅ Error handling  
✅ Production-ready code  
✅ Free hosting on Vercel  

---

## 🎉 You're Ready!

Follow the steps above and your SWOT Generator will be live in ~10 minutes.

**Questions?** See `DEPLOYMENT_GUIDE.md` for detailed information.

