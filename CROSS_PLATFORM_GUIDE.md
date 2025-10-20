# 🖥️ Cross-Platform Guide
## Windows, macOS, and Linux Compatibility

**Status**: ✅ **Fully Cross-Platform Compatible**  
**Tested On**: Windows (PowerShell), macOS (zsh), Linux (bash)  

---

## 📋 Quick Reference

### Operating Systems Supported
- ✅ **Windows 10/11** (PowerShell or CMD)
- ✅ **macOS 11+** (zsh or bash)
- ✅ **Linux** (bash, zsh, or other shells)

### Node.js Requirements
- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher
- **Git**: Latest version

---

## 🔧 Platform-Specific Commands

### 1. Copy Environment File

#### Windows (PowerShell)
```powershell
Copy-Item .env.local.example .env.local
```

#### Windows (CMD)
```cmd
copy .env.local.example .env.local
```

#### macOS / Linux (bash/zsh)
```bash
cp .env.local.example .env.local
```

---

### 2. List Files in Directory

#### Windows (PowerShell)
```powershell
Get-ChildItem
# Or shorter:
ls
```

#### Windows (CMD)
```cmd
dir
```

#### macOS / Linux (bash/zsh)
```bash
ls -la
```

---

### 3. Remove Directory (Clean Build)

#### Windows (PowerShell)
```powershell
Remove-Item -Recurse -Force .next
```

#### Windows (CMD)
```cmd
rmdir /s /q .next
```

#### macOS / Linux (bash/zsh)
```bash
rm -rf .next
```

---

### 4. Edit Environment File

#### Windows (PowerShell)
```powershell
# Open in Notepad
notepad .env.local

# Or use VS Code
code .env.local
```

#### Windows (CMD)
```cmd
# Open in Notepad
notepad .env.local
```

#### macOS (zsh/bash)
```bash
# Open in default editor
nano .env.local

# Or use VS Code
code .env.local

# Or use vim
vim .env.local
```

#### Linux (bash/zsh)
```bash
# Open in nano
nano .env.local

# Or use vim
vim .env.local

# Or use VS Code
code .env.local
```

---

### 5. Run Development Server

#### All Platforms (Same Command)
```bash
npm run dev
```

**Output** (all platforms):
```
▲ Next.js 14.2.33
- Local: http://localhost:3000
✓ Ready in 2.5s
```

---

### 6. Build for Production

#### All Platforms (Same Command)
```bash
npm run build
```

---

### 7. Start Production Server

#### All Platforms (Same Command)
```bash
npm start
```

---

### 8. Git Commands (All Platforms Same)

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# Add remote repository
git remote add origin <your-repo-url>

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## 📁 Path Separators

### Important Note
**npm and Node.js handle path separators automatically across all platforms.**

You can use forward slashes `/` in:
- `package.json` scripts
- `next.config.js`
- `tailwind.config.js`
- Import statements in JavaScript

**Examples** (work on all platforms):
```javascript
// These work on Windows, macOS, and Linux:
import InputForm from './components/InputForm';
import styles from './styles/globals.css';
```

---

## 🚀 Complete Setup Workflow (All Platforms)

### Step 1: Verify Node.js Installation
```bash
node --version
npm --version
```

**Expected Output**:
```
v18.0.0 (or higher)
9.0.0 (or higher)
```

### Step 2: Verify Dependencies Are Installed
```bash
npm list --depth=0
```

**Expected Output**:
```
idea-swot-generator@1.0.0
├── next@14.2.33
├── react@18.3.1
├── react-dom@18.3.1
├── stripe@14.25.0
├── autoprefixer@10.4.21
├── postcss@8.5.6
└── tailwindcss@3.4.18
```

### Step 3: Create Environment File

**Windows (PowerShell)**:
```powershell
Copy-Item .env.local.example .env.local
notepad .env.local
```

**macOS/Linux**:
```bash
cp .env.local.example .env.local
nano .env.local
```

### Step 4: Add API Key

Edit `.env.local` and add:
```env
TOGETHER_API_KEY=sk_xxxxxxxxxxxx
```

Or for OpenAI:
```env
OPENAI_API_KEY=sk-xxxxxxxxxxxx
```

### Step 5: Test Locally

```bash
npm run dev
```

Then open: http://localhost:3000

### Step 6: Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push -u origin main
```

### Step 7: Deploy to Vercel

1. Visit https://vercel.com/new
2. Import GitHub repository
3. Add environment variables
4. Click Deploy

---

## 🔍 Troubleshooting by Platform

### Windows-Specific Issues

#### Issue: "npm: The term 'npm' is not recognized"
**Solution**: Reinstall Node.js from https://nodejs.org/

#### Issue: "PowerShell execution policy error"
**Solution**: Run PowerShell as Administrator and execute:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### Issue: "Port 3000 already in use"
**Solution**:
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or run on different port
npm run dev -- -p 3001
```

---

### macOS-Specific Issues

#### Issue: "Command not found: npm"
**Solution**: Install Node.js using Homebrew:
```bash
brew install node
```

#### Issue: "Port 3000 already in use"
**Solution**:
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or run on different port
npm run dev -- -p 3001
```

#### Issue: "Permission denied" when running commands
**Solution**: Use `sudo` or fix permissions:
```bash
sudo chown -R $(whoami) ~/.npm
```

---

### Linux-Specific Issues

#### Issue: "Command not found: npm"
**Solution**: Install Node.js using package manager:
```bash
# Ubuntu/Debian
sudo apt-get install nodejs npm

# Fedora
sudo dnf install nodejs npm

# Arch
sudo pacman -S nodejs npm
```

#### Issue: "Port 3000 already in use"
**Solution**:
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or run on different port
npm run dev -- -p 3001
```

#### Issue: "Permission denied" errors
**Solution**: Fix npm permissions:
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

---

## 📦 Dependency Status

### Current Installation Status
✅ **All 157 dependencies are already installed**

The `node_modules` directory contains:
- ✅ next@14.2.33
- ✅ react@18.3.1
- ✅ react-dom@18.3.1
- ✅ stripe@14.25.0
- ✅ tailwindcss@3.4.18
- ✅ autoprefixer@10.4.21
- ✅ postcss@8.5.6
- ✅ Plus 150 transitive dependencies

### Do I Need to Run `npm install` Again?

**Answer**: No, unless:
1. You delete the `node_modules` folder
2. You change `package.json`
3. You clone the repository on a new machine

### Is `node_modules` in `.gitignore`?

**Answer**: Yes ✅

The `.gitignore` file includes:
```
node_modules/
```

This is the **standard practice** for Node.js projects because:
- `node_modules` is very large (~500MB+)
- It's platform-specific
- It can be regenerated from `package.json` and `package-lock.json`

### Deployment Readiness

✅ **The project is ready to deploy immediately after creating `.env.local`**

**Workflow**:
1. Create `.env.local` with API key
2. Test locally with `npm run dev`
3. Push to GitHub (node_modules NOT included)
4. Deploy to Vercel
5. Vercel automatically runs `npm install` during deployment

---

## 🔐 Environment Variables

### File: `.env.local`

**Location**: Project root directory  
**Status**: In `.gitignore` (won't be committed)  
**Visibility**: Local only (not shared)

### File: `.env.local.example`

**Location**: Project root directory  
**Status**: Committed to Git  
**Purpose**: Template for developers

### Vercel Environment Variables

**Location**: Vercel Dashboard → Project Settings → Environment Variables  
**Status**: Encrypted by Vercel  
**Visibility**: Only accessible to deployed application

---

## 🎯 Platform Comparison Table

| Task | Windows (PowerShell) | macOS (zsh) | Linux (bash) |
|------|----------------------|-------------|--------------|
| Copy file | `Copy-Item` | `cp` | `cp` |
| List files | `Get-ChildItem` or `ls` | `ls -la` | `ls -la` |
| Remove dir | `Remove-Item -Recurse` | `rm -rf` | `rm -rf` |
| Edit file | `notepad` or `code` | `nano` or `code` | `nano` or `code` |
| Run dev | `npm run dev` | `npm run dev` | `npm run dev` |
| Git commands | Same | Same | Same |
| npm commands | Same | Same | Same |

---

## ✅ Verification Checklist

### Before Deployment (All Platforms)

- [ ] Node.js 18+ installed: `node --version`
- [ ] npm 9+ installed: `npm --version`
- [ ] Git installed: `git --version`
- [ ] `.env.local` created with API key
- [ ] `npm run dev` works locally
- [ ] Form submission works
- [ ] SWOT results display
- [ ] No console errors

### After Pushing to GitHub

- [ ] Repository created on GitHub
- [ ] Code pushed successfully
- [ ] `.env.local` NOT in repository
- [ ] `node_modules` NOT in repository
- [ ] `package-lock.json` IS in repository

### After Deploying to Vercel

- [ ] Vercel project created
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] App loads at Vercel URL
- [ ] Form works in production
- [ ] SWOT results display
- [ ] No console errors

---

## 🚀 Quick Start by Platform

### Windows Users
```powershell
# 1. Copy environment file
Copy-Item .env.local.example .env.local

# 2. Edit with Notepad
notepad .env.local

# 3. Test locally
npm run dev

# 4. Push to GitHub
git add .
git commit -m "Initial commit"
git push -u origin main
```

### macOS Users
```bash
# 1. Copy environment file
cp .env.local.example .env.local

# 2. Edit with nano
nano .env.local

# 3. Test locally
npm run dev

# 4. Push to GitHub
git add .
git commit -m "Initial commit"
git push -u origin main
```

### Linux Users
```bash
# 1. Copy environment file
cp .env.local.example .env.local

# 2. Edit with nano
nano .env.local

# 3. Test locally
npm run dev

# 4. Push to GitHub
git add .
git commit -m "Initial commit"
git push -u origin main
```

---

## 📞 Platform-Specific Support

### Windows Support
- **IDE**: Visual Studio Code (recommended)
- **Terminal**: PowerShell or CMD
- **Node.js**: Download from https://nodejs.org/
- **Git**: Download from https://git-scm.com/

### macOS Support
- **IDE**: Visual Studio Code (recommended)
- **Terminal**: zsh (default) or bash
- **Node.js**: `brew install node`
- **Git**: `brew install git`

### Linux Support
- **IDE**: Visual Studio Code (recommended)
- **Terminal**: bash, zsh, or other
- **Node.js**: Use package manager (apt, dnf, pacman, etc.)
- **Git**: Use package manager

---

## 🎉 You're Ready!

Your project is **100% cross-platform compatible** and ready to deploy on:
- ✅ Windows
- ✅ macOS
- ✅ Linux

**Next Step**: Choose your platform above and follow the quick start guide!

---

**Happy deploying on your platform! 🚀**

