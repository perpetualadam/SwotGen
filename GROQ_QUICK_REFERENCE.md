# ⚡ Groq API Quick Reference

**Status**: ✅ **READY TO USE**

---

## 🔑 API DETAILS

| Item | Value |
|------|-------|
| **Endpoint** | `https://api.groq.com/openai/v1/chat/completions` |
| **Model** | `llama-3.1-8b-instant` |
| **Auth** | `Authorization: Bearer YOUR_API_KEY` |
| **Content-Type** | `application/json` |

---

## 📝 REQUEST FORMAT

```javascript
{
  "model": "llama-3.1-8b-instant",
  "messages": [
    { "role": "system", "content": "You are a business analyst." },
    { "role": "user", "content": "Analyze this idea..." }
  ],
  "temperature": 0.7,
  "max_tokens": 1024
}
```

---

## 📤 RESPONSE FORMAT

```javascript
{
  "choices": [
    {
      "message": {
        "content": "Your response here"
      }
    }
  ]
}
```

**Access content**: `data.choices[0].message.content`

---

## 🚀 TEST NOW

```bash
# 1. Start dev server
npm run dev

# 2. Go to http://localhost:3000

# 3. Enter business idea

# 4. Click "Analyze"

# 5. See SWOT analysis ✅
```

---

## 🔧 YOUR IMPLEMENTATION

**File**: `pages/api/analyze.js`  
**Function**: `analyzeWithGroq()` (lines 50-100)

**What it does**:
1. Takes idea + focus area
2. Creates SWOT prompt
3. Sends to Groq API
4. Parses JSON response
5. Returns SWOT data

---

## 📊 AVAILABLE MODELS

| Model | Speed | Quality | Use Case |
|-------|-------|---------|----------|
| `llama-3.1-8b-instant` | ⚡⚡⚡ | ⭐⭐⭐⭐ | **SWOT Analysis** |
| `llama-3.1-70b-versatile` | ⚡⚡ | ⭐⭐⭐⭐⭐ | Complex tasks |
| `mixtral-8x7b-32768` | ⚡⚡ | ⭐⭐⭐⭐ | General purpose |
| `gemma-7b-it` | ⚡⚡⚡ | ⭐⭐⭐ | Simple tasks |

---

## 🔑 ENVIRONMENT

```env
GROQ_API_KEY=your_groq_api_key_here
```

**Get key**: https://console.groq.com/

---

## ❌ COMMON ERRORS

| Error | Solution |
|-------|----------|
| "API configuration error" | Check `.env.local` has `GROQ_API_KEY` |
| "401 Unauthorized" | API key invalid or expired |
| "429 Too Many Requests" | Rate limit - wait and retry |
| "500 Server Error" | Groq server issue - try again |

---

## 📚 RESOURCES

- **Console**: https://console.groq.com/
- **Docs**: https://console.groq.com/docs
- **Status**: https://status.groq.com/
- **Discord**: https://discord.gg/groq

---

## ✅ CHECKLIST

- [x] Endpoint configured
- [x] Model set correctly
- [x] Request format verified
- [x] Response parsing implemented
- [x] Error handling added
- [ ] Local test passed
- [ ] Deployed to Netlify
- [ ] Live test passed

---

**Ready to test! 🚀**

