# 🎯 MULTI-FRAMEWORK STRATEGIC ANALYSIS PLATFORM - IMPLEMENTATION PLAN

## ✅ REQUIREMENTS CONFIRMED

I understand all requirements:
- ✅ Keep existing SWOT functionality working
- ✅ Add 6 new frameworks (PESTLE, Porter's Five Forces, NOISE, Balanced Scorecard, VRIO, McKinsey 7S)
- ✅ Framework selector dropdown on main page
- ✅ AI prompts adapted for each framework
- ✅ PDF export works for all frameworks
- ✅ Premium/free tier structure maintained
- ✅ UI displays results appropriately for each framework
- ✅ Update pricing section and premium modal
- ✅ Maintain all existing functionality (payment, localStorage, export logic)

---

## 📋 IMPLEMENTATION PLAN

### **PHASE 1: CORE INFRASTRUCTURE (Files to Create/Modify)**

#### **1. Create Framework Configuration File**
**File:** `lib/frameworks.js` (NEW)
- Define all 7 frameworks with metadata
- Structure: name, description, categories, colors, icons
- Example:
```javascript
export const FRAMEWORKS = {
  SWOT: {
    id: 'swot',
    name: 'SWOT Analysis',
    description: 'Strengths, Weaknesses, Opportunities, Threats',
    categories: ['Strengths', 'Weaknesses', 'Opportunities', 'Threats'],
    colors: { /* ... */ },
    icons: { /* ... */ }
  },
  PESTLE: {
    id: 'pestle',
    name: 'PESTLE Analysis',
    description: 'Political, Economic, Social, Technological, Legal, Environmental',
    categories: ['Political', 'Economic', 'Social', 'Technological', 'Legal', 'Environmental'],
    // ...
  },
  // ... other frameworks
}
```

#### **2. Create Display Components for Each Framework**
**Files:** `components/FrameworkDisplay.js` (NEW)
- Generic component that renders any framework
- Takes framework type and data as props
- Dynamically renders categories based on framework structure
- Handles different layouts (4-grid for SWOT, 6-grid for PESTLE, etc.)

#### **3. Update API Route**
**File:** `pages/api/analyze.js` (MODIFY)
- Add `framework` parameter to request body
- Create separate prompt generators for each framework
- Functions: `generateSWOTPrompt()`, `generatePESTLEPrompt()`, etc.
- Update response parsing to handle different framework structures
- Maintain backward compatibility (default to SWOT if not specified)

#### **4. Update Main Page**
**File:** `pages/index.js` (MODIFY)
- Add framework selector dropdown
- Add `selectedFramework` state
- Pass framework to API call
- Update form data to include framework
- Replace `SWOTDisplay` with `FrameworkDisplay`
- Update title/description based on selected framework

#### **5. Update Export Component**
**File:** `components/ExportButton.js` (MODIFY)
- Accept framework type as prop
- Generate PDF with framework-specific layout
- Update PDF title and structure based on framework
- Maintain existing PDF styling

#### **6. Update Input Form**
**File:** `components/InputForm.js` (MODIFY)
- Add framework selector dropdown
- Pass selected framework to parent component
- Update form labels/descriptions based on framework

#### **7. Update Premium Modal**
**File:** `components/PremiumModal.js` (MODIFY)
- Update text from "SWOT analyses" to "strategic analyses"
- Update text from "PDF export" to "PDF export for all frameworks"
- Update features list to mention "All 7 strategic frameworks"

#### **8. Update Pricing Section**
**File:** `pages/index.js` (MODIFY - Footer section)
- Update from "Unlimited analyses + PDF export"
- To: "Unlimited analyses + PDF export for all 7 frameworks"

---

### **PHASE 2: FRAMEWORK DEFINITIONS**

#### **Framework Structures:**

**1. SWOT (4 categories)**
- Strengths, Weaknesses, Opportunities, Threats
- Colors: Green, Red, Blue, Yellow
- Layout: 2x2 grid

**2. PESTLE (6 categories)**
- Political, Economic, Social, Technological, Legal, Environmental
- Colors: Purple, Green, Pink, Blue, Orange, Brown
- Layout: 2x3 grid

**3. Porter's Five Forces (5 categories)**
- Competitive Rivalry, Supplier Power, Buyer Power, Threat of Substitution, Threat of New Entry
- Colors: Red, Orange, Yellow, Blue, Purple
- Layout: Center + 4 corners (or 2x3 grid)

**4. NOISE (5 categories)**
- Needs, Opportunities, Improvements, Strengths, Exceptions
- Colors: Blue, Green, Yellow, Purple, Orange
- Layout: 2x3 grid (with one spanning)

**5. Balanced Scorecard (4 perspectives)**
- Financial, Customer, Internal Processes, Learning & Growth
- Colors: Blue, Green, Orange, Purple
- Layout: 2x2 grid

**6. VRIO (4 factors)**
- Value, Rarity, Imitability, Organization
- Colors: Green, Blue, Orange, Purple
- Layout: 2x2 grid

**7. McKinsey 7S (7 elements)**
- Strategy, Structure, Systems, Shared Values, Skills, Style, Staff
- Colors: Rainbow (7 different colors)
- Layout: 3x3 grid (center + 6 around)

---

### **PHASE 3: AI PROMPT TEMPLATES**

Each framework needs a custom prompt that:
1. Explains the framework to the AI
2. Requests JSON response with framework-specific structure
3. Provides example format
4. Includes validation rules

Example PESTLE prompt:
```
Analyze the business idea using PESTLE framework:
- Political: Government policies, regulations, political stability
- Economic: Economic growth, inflation, interest rates, currency
- Social: Demographics, cultural trends, consumer attitudes
- Technological: Tech innovations, automation, digital transformation
- Legal: Laws, compliance, intellectual property
- Environmental: Climate, sustainability, natural resources

Respond in JSON format:
{
  "Political": ["factor1", "factor2", ...],
  "Economic": [...],
  ...
}
```

---

### **PHASE 4: TESTING STRATEGY**

1. **Unit Tests:**
   - Test each framework prompt generation
   - Test response parsing for each framework
   - Test framework configuration loading

2. **Integration Tests:**
   - Test API with each framework
   - Test UI rendering for each framework
   - Test PDF export for each framework

3. **Manual Testing:**
   - Test each framework end-to-end
   - Test framework switching
   - Test premium/free tier for each framework
   - Test PDF export for each framework
   - Test payment flow still works

---

### **PHASE 5: BACKWARD COMPATIBILITY**

- Default framework: SWOT (if not specified)
- Existing SWOT analyses still work
- localStorage still works (add framework to saved data)
- Payment flow unchanged
- Export button logic unchanged

---

## 📊 FILE CHANGES SUMMARY

| File | Type | Changes |
|------|------|---------|
| `lib/frameworks.js` | CREATE | Framework definitions and metadata |
| `components/FrameworkDisplay.js` | CREATE | Generic framework display component |
| `pages/api/analyze.js` | MODIFY | Add framework parameter, prompt generators |
| `pages/index.js` | MODIFY | Add framework selector, state management |
| `components/InputForm.js` | MODIFY | Add framework dropdown |
| `components/ExportButton.js` | MODIFY | Framework-aware PDF export |
| `components/PremiumModal.js` | MODIFY | Update text to mention all frameworks |
| `components/SWOTDisplay.js` | KEEP | Keep for backward compatibility |

---

## 🎨 UI MOCKUP

```
┌─────────────────────────────────────────┐
│  SwotGen - Strategic Analysis Platform  │
├─────────────────────────────────────────┤
│                                         │
│  Idea: [________________]               │
│  Focus Area: [________________]         │
│                                         │
│  Framework: [SWOT ▼]                   │
│  ├─ SWOT Analysis                      │
│  ├─ PESTLE Analysis                    │
│  ├─ Porter's Five Forces               │
│  ├─ NOISE Analysis                     │
│  ├─ Balanced Scorecard                 │
│  ├─ VRIO Framework                     │
│  └─ McKinsey 7S Model                  │
│                                         │
│  [Analyze]                              │
│                                         │
├─────────────────────────────────────────┤
│  Results (Framework-specific layout)    │
│  [Export PDF] [Upgrade]                 │
└─────────────────────────────────────────┘
```

---

## ✅ IMPLEMENTATION CHECKLIST

- [ ] Create `lib/frameworks.js` with all framework definitions
- [ ] Create `components/FrameworkDisplay.js` component
- [ ] Update `pages/api/analyze.js` with framework support
- [ ] Update `pages/index.js` with framework selector
- [ ] Update `components/InputForm.js` with dropdown
- [ ] Update `components/ExportButton.js` for all frameworks
- [ ] Update `components/PremiumModal.js` text
- [ ] Update pricing section in `pages/index.js`
- [ ] Test each framework end-to-end
- [ ] Test PDF export for each framework
- [ ] Test payment flow still works
- [ ] Deploy to Vercel

---

## 🚀 NEXT STEPS

1. **Confirm this plan** - Do you approve this approach?
2. **Start Phase 1** - Create framework infrastructure
3. **Implement incrementally** - Test after each major change
4. **Deploy** - Push to GitHub and Vercel

---

**Ready to proceed? Confirm and I'll start implementing! 🚀**

