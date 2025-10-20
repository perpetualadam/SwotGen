# ⚙️ Platform-Specific Configuration Files
## Idea SWOT Generator - Deploy to Multiple Clouds

**Status**: ✅ **READY FOR MULTI-CLOUD DEPLOYMENT**  
**Configuration Files Needed**: Optional (most platforms auto-detect)  

---

## 📋 Overview

Your Next.js application requires **minimal configuration** for multi-cloud deployment. Most platforms auto-detect the build process. However, some platforms benefit from explicit configuration files.

---

## 🔧 Configuration Files by Platform

### 1. VERCEL (No Config Needed) ✅

**Auto-detected**: Yes  
**Config file**: Not needed  
**Why**: Vercel has native Next.js support

**Vercel.json** (Optional):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "env": {
    "TOGETHER_API_KEY": "@together_api_key",
    "OPENAI_API_KEY": "@openai_api_key"
  }
}
```

---

### 2. NETLIFY (No Config Needed) ✅

**Auto-detected**: Yes  
**Config file**: Optional  
**Why**: Netlify detects Next.js automatically

**netlify.toml** (Optional):
```toml
[build]
  command = "npm run build"
  functions = "api"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/.next/index.html"
  status = 200
```

---

### 3. RAILWAY (No Config Needed) ✅

**Auto-detected**: Yes  
**Config file**: Not needed  
**Why**: Railway auto-detects Node.js projects

**railway.json** (Optional):
```json
{
  "build": {
    "builder": "nixpacks"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyMaxRetries": 5
  }
}
```

---

### 4. RENDER (No Config Needed) ✅

**Auto-detected**: Yes  
**Config file**: Optional  
**Why**: Render auto-detects Node.js projects

**render.yaml** (Optional):
```yaml
services:
  - type: web
    name: idea-swot-generator
    env: node
    buildCommand: npm run build
    startCommand: npm start
    envVars:
      - key: NODE_VERSION
        value: 18
```

---

### 5. AWS AMPLIFY (No Config Needed) ✅

**Auto-detected**: Yes  
**Config file**: Optional  
**Why**: Amplify detects Next.js automatically

**amplify.yml** (Optional):
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

---

### 6. GOOGLE CLOUD RUN (Dockerfile Required) 📦

**Auto-detected**: No  
**Config file**: Required  
**Why**: Cloud Run uses containers

**Dockerfile**:
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Runtime stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
EXPOSE 3000
CMD ["npm", "start"]
```

**.dockerignore**:
```
node_modules
npm-debug.log
.git
.gitignore
README.md
.env.local
.next
```

**cloudbuild.yaml** (Optional):
```yaml
steps:
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/idea-swot-generator', '.']
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/idea-swot-generator']
  - name: 'gcr.io/cloud-builders/run'
    args:
      - 'deploy'
      - 'idea-swot-generator'
      - '--image=gcr.io/$PROJECT_ID/idea-swot-generator'
      - '--region=us-central1'
      - '--platform=managed'
```

---

### 7. AZURE APP SERVICE (No Config Needed) ✅

**Auto-detected**: Yes  
**Config file**: Not needed  
**Why**: Azure auto-detects Node.js projects

**web.config** (Optional - for IIS):
```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <webSocket enabled="false" />
    <handlers>
      <add name="iisnode" path="server.js" verb="*" modules="iisnode" />
    </handlers>
    <rewrite>
      <rules>
        <rule name="NodeInspector" patternSyntax="ECMAScript" stopProcessing="true">
          <match url="^server.js\/debug[\/]?" />
        </rule>
        <rule name="StaticContent">
          <action type="Rewrite" url="public{REQUEST_URI}" />
        </rule>
        <rule name="DynamicContent">
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True" />
          </conditions>
          <action type="Rewrite" url="server.js" />
        </rule>
      </rules>
    </rewrite>
    <security>
      <requestFiltering>
        <hiddenSegments>
          <add segment="node_modules" />
        </hiddenSegments>
      </requestFiltering>
    </security>
  </system.webServer>
</configuration>
```

---

### 8. CLOUDFLARE PAGES (No Config Needed) ✅

**Auto-detected**: Yes  
**Config file**: Not needed  
**Why**: Cloudflare auto-detects Next.js

**wrangler.toml** (Optional):
```toml
name = "idea-swot-generator"
type = "javascript"
account_id = "your_account_id"
workers_dev = true
route = "example.com/*"
zone_id = "your_zone_id"

[env.production]
name = "idea-swot-generator-prod"
route = "example.com/*"
zone_id = "your_zone_id"
```

---

### 9. DIGITALOCEAN APP PLATFORM (No Config Needed) ✅

**Auto-detected**: Yes  
**Config file**: Optional  
**Why**: DigitalOcean auto-detects Node.js

**app.yaml** (Optional):
```yaml
name: idea-swot-generator
services:
  - name: web
    github:
      repo: your-username/idea-swot-generator
      branch: main
    build_command: npm run build
    run_command: npm start
    http_port: 3000
    envs:
      - key: NODE_ENV
        value: production
```

---

## 📦 Docker Configuration (For Container Platforms)

### Dockerfile (Multi-stage Build)
```dockerfile
# Stage 1: Build
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### .dockerignore
```
.git
.gitignore
README.md
.env.local
.env.*.local
node_modules
npm-debug.log
.next
.vercel
```

---

## 🔐 Environment Variables Configuration

### Vercel
```
Project Settings → Environment Variables
Add: TOGETHER_API_KEY, OPENAI_API_KEY
```

### Netlify
```
Site settings → Build & deploy → Environment
Add: TOGETHER_API_KEY, OPENAI_API_KEY
```

### Railway
```
Project → Variables
Add: TOGETHER_API_KEY, OPENAI_API_KEY
```

### Render
```
Environment → Add Environment Variable
Add: TOGETHER_API_KEY, OPENAI_API_KEY
```

### AWS Amplify
```
App settings → Environment variables
Add: TOGETHER_API_KEY, OPENAI_API_KEY
```

### Google Cloud Run
```
Cloud Run → Edit & Deploy
Add variables in deployment
```

### Azure App Service
```
Configuration → Application settings
Add: TOGETHER_API_KEY, OPENAI_API_KEY
```

### Cloudflare Pages
```
Settings → Environment variables
Add: TOGETHER_API_KEY, OPENAI_API_KEY
```

---

## ✅ Configuration Checklist

- [x] Vercel - No config needed
- [x] Netlify - No config needed
- [x] Railway - No config needed
- [x] Render - No config needed
- [x] AWS Amplify - No config needed
- [x] Google Cloud Run - Dockerfile provided
- [x] Azure App Service - No config needed
- [x] Cloudflare Pages - No config needed
- [x] DigitalOcean - No config needed

---

## 🚀 Deployment Commands by Platform

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

### Railway
```bash
npm install -g @railway/cli
railway up
```

### Google Cloud Run
```bash
gcloud run deploy idea-swot-generator \
  --source . \
  --platform managed \
  --region us-central1
```

### AWS Amplify
```bash
npm install -g @aws-amplify/cli
amplify init
amplify publish
```

### Azure
```bash
az webapp up --name idea-swot-generator
```

---

## 📊 Configuration Summary

| Platform | Config File | Required | Auto-Detect |
|----------|------------|----------|------------|
| Vercel | vercel.json | No | Yes |
| Netlify | netlify.toml | No | Yes |
| Railway | railway.json | No | Yes |
| Render | render.yaml | No | Yes |
| AWS Amplify | amplify.yml | No | Yes |
| Google Cloud | Dockerfile | Yes | No |
| Azure | web.config | No | Yes |
| Cloudflare | wrangler.toml | No | Yes |
| DigitalOcean | app.yaml | No | Yes |

---

## ✨ Summary

### Configuration Status
✅ **Most platforms auto-detect** Next.js  
✅ **No config files required** for most platforms  
✅ **Dockerfile provided** for container platforms  
✅ **Ready for immediate deployment**  

### Next Steps
1. Choose your platform
2. Use provided config files (if needed)
3. Add environment variables
4. Deploy!

---

**Your application is ready for multi-cloud deployment! 🚀**

