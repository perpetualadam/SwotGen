# SwotGen - Technical Specifications

## 🔧 **API SPECIFICATIONS**

### **POST /api/analyze**

**Purpose:** Generate strategic analysis for a business idea

**Request Body:**
```json
{
  "idea": "string (3-500 chars, required)",
  "focusArea": "string (optional, default: 'Market')",
  "framework": "string (optional, default: 'swot')"
}
```

**Valid Framework Values:**
- `swot` - SWOT Analysis
- `pestle` - PESTLE Analysis
- `porters` - Porter's Five Forces
- `noise` - NOISE Analysis
- `balanced-scorecard` - Balanced Scorecard
- `vrio` - VRIO Framework
- `mckinsey-7s` - McKinsey 7S Model

**Response (200 OK):**
```json
{
  "Strengths": ["item1", "item2", "item3"],
  "Weaknesses": ["item1", "item2", "item3"],
  "Opportunities": ["item1", "item2", "item3"],
  "Threats": ["item1", "item2", "item3"],
  "NicheScore": 75
}
```

**Error Responses:**

| Status | Error | Cause |
|--------|-------|-------|
| 400 | Invalid idea parameter | Missing or non-string idea |
| 400 | Idea must be between 3 and 500 characters | Input length invalid |
| 405 | Method not allowed | Non-POST request |
| 500 | API configuration error | Missing API keys |
| 500 | Failed to analyze idea | Groq API error/timeout |

---

## 🎨 **COMPONENT SPECIFICATIONS**

### **InputForm.js**

**Props:**
```javascript
{
  onSubmit: (data) => void,  // Called with {idea, focusArea, framework}
  isLoading: boolean         // Disables form during submission
}
```

**State:**
```javascript
{
  idea: string,              // Business idea input
  focusArea: string,         // Selected focus area
  framework: string,         // Selected framework
  error: string,             // Validation error message
  isPremium: boolean,        // Premium status from localStorage
  showUpgradeHint: boolean   // Show upgrade message
}
```

**Features:**
- Input validation (3-500 chars)
- Framework dropdown with premium restrictions
- Focus area selector
- Error message display
- Upgrade hint for non-premium users

### **ExportButton.js**

**Props:**
```javascript
{
  analysisData: object,      // Analysis results to export
  framework: string,         // Framework type (for filename)
  idea: string,              // Business idea (for metadata)
  focusArea: string,         // Focus area (for metadata)
  disabled: boolean          // Disable button
}
```

**State:**
```javascript
{
  isExporting: boolean,      // Export in progress
  error: string,             // Export error message
  isPremium: boolean         // Premium status from localStorage
}
```

**Export Functions:**
- `exportToPDF()` - All users
- `exportToCSV()` - Premium only
- `exportToJSON()` - Premium only

### **FrameworkDisplay.js**

**Props:**
```javascript
{
  data: object,              // Analysis data
  framework: string,         // Framework ID
  idea: string,              // Business idea
  focusArea: string          // Focus area
}
```

**Features:**
- Dynamic grid layout (2x2 or 2x3)
- Category-specific colors and icons
- Score display
- Responsive design

### **PremiumModal.js**

**Props:**
```javascript
{
  isOpen: boolean,           // Modal visibility
  onClose: () => void,       // Close handler
  onSuccess: () => void      // Payment success handler
}
```

**Features:**
- Stripe Payment Link integration
- Message-based payment verification
- Popup window management
- 30-minute timeout
- Error handling

---

## 💾 **DATA STRUCTURES**

### **Framework Configuration**

```javascript
{
  id: string,                // Unique identifier
  name: string,              // Display name
  description: string,       // Short description
  categories: string[],      // Category names
  categoryLabels: object,    // Display labels (optional)
  scoreField: string,        // Score field name
  scoreLabel: string,        // Score display label
  layout: string,            // Grid layout (2x2 or 2x3)
  colors: {
    [category]: {
      bg: string,            // Background color class
      border: string,        // Border color class
      text: string,          // Text color class
      header: string         // Header color class
    }
  },
  icons: {
    [category]: string       // Emoji icon
  }
}
```

### **Analysis Response**

```javascript
{
  [category1]: string[],     // Array of analysis items
  [category2]: string[],
  ...
  [scoreField]: number       // Score 0-100
}
```

### **Export Data (CSV)**

```
Business Idea,{idea}
Focus Area,{focusArea}
Framework,{frameworkName}
Generated,{timestamp}

{Category1}
,{item1}
,{item2}
...

{scoreLabel},{score}/100
```

### **Export Data (JSON)**

```javascript
{
  metadata: {
    businessIdea: string,
    focusArea: string,
    framework: string,
    frameworkId: string,
    generated: ISO8601,
    platform: "SwotGen"
  },
  analysis: {
    [category]: string[],
    [scoreField]: number
  }
}
```

---

## 🔐 **PREMIUM STATUS MANAGEMENT**

### **localStorage Key**
- **Key:** `isPremium`
- **Type:** String
- **Values:** `'true'` or not set
- **Scope:** Domain-specific

### **Setting Premium Status**

```javascript
// After successful payment
localStorage.setItem('isPremium', 'true');
```

### **Checking Premium Status**

```javascript
// In components
useEffect(() => {
  const savedPremium = localStorage.getItem('isPremium');
  setIsPremium(savedPremium === 'true');
}, []);
```

### **Removing Premium Status**

```javascript
// Downgrade to free
localStorage.removeItem('isPremium');
```

---

## 🎯 **PAYMENT FLOW**

### **Step 1: User Initiates Payment**
- User clicks "Upgrade Now" button
- PremiumModal opens Stripe Payment Link in popup

### **Step 2: Stripe Payment**
- User completes payment on Stripe
- Stripe redirects to `/payment-success` page

### **Step 3: Success Page**
- Success page posts `'payment_success'` message to parent window
- Parent window receives message via `window.addEventListener('message')`

### **Step 4: Premium Access Granted**
- Parent window sets `localStorage.isPremium = 'true'`
- Components re-render with premium features
- Modal closes

### **Step 5: Persistence**
- Premium status persists across sessions
- Components check localStorage on mount

---

## 🌐 **ENVIRONMENT VARIABLES**

### **Required (Server-side)**
```
GROQ_API_KEY=your_groq_api_key
```

### **Required (Client-side)**
```
NEXT_PUBLIC_STRIPE_PAYMENT_LINK=https://buy.stripe.com/...
```

### **Optional**
```
TOGETHER_API_KEY=your_together_api_key
OPENAI_API_KEY=your_openai_api_key
```

---

## 📱 **RESPONSIVE DESIGN**

### **Breakpoints**
- **Mobile:** < 640px (Tailwind `sm`)
- **Tablet:** 640px - 1024px (Tailwind `md`, `lg`)
- **Desktop:** > 1024px (Tailwind `xl`)

### **Layout Adjustments**
- **Mobile:** Single column, stacked components
- **Tablet:** 2-column grid for frameworks
- **Desktop:** Full 2x2 or 2x3 grid

---

## ⚡ **PERFORMANCE OPTIMIZATION**

### **Frontend**
- Code splitting (Next.js automatic)
- Image optimization (if used)
- CSS minification (Tailwind)
- React hooks optimization

### **Backend**
- Serverless functions (Vercel)
- API response caching (if needed)
- Error handling and logging

### **Export**
- Client-side generation (no server load)
- Streaming for large files
- Efficient CSV/JSON serialization

---

## 🧪 **TESTING REQUIREMENTS**

### **Unit Tests**
- Input validation
- Framework selection
- Premium status checks
- Export format generation

### **Integration Tests**
- API endpoint functionality
- Payment flow
- Export functionality
- Premium restrictions

### **E2E Tests**
- Complete user journey (free tier)
- Complete user journey (premium)
- Payment flow
- Export and download

---

## 📊 **MONITORING & LOGGING**

### **Server-side Logging**
```javascript
console.error('Analysis error:', error);
console.error('Missing API key - ...');
```

### **Client-side Logging**
```javascript
console.error('Error:', err);
```

### **Metrics to Track**
- API response times
- Error rates
- Payment conversion rate
- Export usage
- Framework popularity

---

## 🔄 **API RATE LIMITING**

**Current:** No rate limiting (Vercel default)

**Recommended for Production:**
- 10 requests per minute per IP
- 100 requests per hour per user
- Implement via middleware or Vercel Edge Functions

---

## 🛡️ **SECURITY CONSIDERATIONS**

### **Input Validation**
- Length validation (3-500 chars)
- Type checking (string)
- Framework whitelist

### **XSS Prevention**
- HTML escaping in CSV export
- No eval() or innerHTML
- React's built-in XSS protection

### **CSRF Protection**
- Same-origin policy
- Stripe handles payment security

### **API Security**
- API keys in environment variables
- No sensitive data in logs
- HTTPS only (Vercel)

---

## 📈 **SCALABILITY**

### **Current Capacity**
- Unlimited concurrent users (Vercel serverless)
- Unlimited analyses (no database)
- Unlimited exports (client-side generation)

### **Bottlenecks**
- Groq API rate limits
- Stripe API rate limits
- Network bandwidth

### **Scaling Strategy**
- Add caching layer (Redis)
- Implement queue system (Bull, RabbitMQ)
- Database for analytics (optional)
- CDN for static assets (Vercel default)

---

## 🚀 **DEPLOYMENT CHECKLIST**

- ✅ Environment variables configured
- ✅ API keys secured
- ✅ Payment link configured
- ✅ Success URL set in Stripe
- ✅ Build passes without errors
- ✅ All tests passing
- ✅ Performance acceptable
- ✅ Security review complete
- ✅ Monitoring configured
- ✅ Backup plan in place

---

**Last Updated:** 2025-10-24  
**Version:** 1.0.0

