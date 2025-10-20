# 📊 FRAMEWORK SPECIFICATIONS & DATA STRUCTURES

## 1️⃣ SWOT ANALYSIS (4 Categories)

**Structure:**
```javascript
{
  framework: 'swot',
  Strengths: ['item1', 'item2', 'item3'],
  Weaknesses: ['item1', 'item2', 'item3'],
  Opportunities: ['item1', 'item2', 'item3'],
  Threats: ['item1', 'item2', 'item3'],
  NicheScore: 75
}
```

**UI Layout:** 2x2 Grid
**Colors:** Green, Red, Blue, Yellow
**Icons:** 💪, ⚠️, 🚀, 🎯

---

## 2️⃣ PESTLE ANALYSIS (6 Categories)

**Structure:**
```javascript
{
  framework: 'pestle',
  Political: ['factor1', 'factor2', 'factor3'],
  Economic: ['factor1', 'factor2', 'factor3'],
  Social: ['factor1', 'factor2', 'factor3'],
  Technological: ['factor1', 'factor2', 'factor3'],
  Legal: ['factor1', 'factor2', 'factor3'],
  Environmental: ['factor1', 'factor2', 'factor3'],
  ViabilityScore: 75
}
```

**UI Layout:** 2x3 Grid
**Colors:** Purple, Green, Pink, Blue, Orange, Brown
**Icons:** 🏛️, 💰, 👥, 🔧, ⚖️, 🌍

---

## 3️⃣ PORTER'S FIVE FORCES (5 Categories)

**Structure:**
```javascript
{
  framework: 'porters',
  CompetitiveRivalry: ['factor1', 'factor2', 'factor3'],
  SupplierPower: ['factor1', 'factor2', 'factor3'],
  BuyerPower: ['factor1', 'factor2', 'factor3'],
  ThreatOfSubstitution: ['factor1', 'factor2', 'factor3'],
  ThreatOfNewEntry: ['factor1', 'factor2', 'factor3'],
  CompetitiveIntensity: 75
}
```

**UI Layout:** Center + 4 Corners (or 2x3 grid)
**Colors:** Red, Orange, Yellow, Blue, Purple
**Icons:** ⚔️, 🤝, 👤, 🔄, 🚪

---

## 4️⃣ NOISE ANALYSIS (5 Categories)

**Structure:**
```javascript
{
  framework: 'noise',
  Needs: ['need1', 'need2', 'need3'],
  Opportunities: ['opp1', 'opp2', 'opp3'],
  Improvements: ['imp1', 'imp2', 'imp3'],
  Strengths: ['str1', 'str2', 'str3'],
  Exceptions: ['exc1', 'exc2', 'exc3'],
  PotentialScore: 75
}
```

**UI Layout:** 2x3 Grid
**Colors:** Blue, Green, Yellow, Purple, Orange
**Icons:** 🎯, 💡, 🔧, 💪, ⭐

---

## 5️⃣ BALANCED SCORECARD (4 Perspectives)

**Structure:**
```javascript
{
  framework: 'balanced-scorecard',
  Financial: ['metric1', 'metric2', 'metric3'],
  Customer: ['metric1', 'metric2', 'metric3'],
  InternalProcesses: ['metric1', 'metric2', 'metric3'],
  LearningGrowth: ['metric1', 'metric2', 'metric3'],
  StrategicAlignment: 75
}
```

**UI Layout:** 2x2 Grid
**Colors:** Blue, Green, Orange, Purple
**Icons:** 💵, 😊, ⚙️, 📚

---

## 6️⃣ VRIO FRAMEWORK (4 Factors)

**Structure:**
```javascript
{
  framework: 'vrio',
  Value: ['factor1', 'factor2', 'factor3'],
  Rarity: ['factor1', 'factor2', 'factor3'],
  Imitability: ['factor1', 'factor2', 'factor3'],
  Organization: ['factor1', 'factor2', 'factor3'],
  CompetitiveAdvantage: 75
}
```

**UI Layout:** 2x2 Grid
**Colors:** Green, Blue, Orange, Purple
**Icons:** 💎, 🌟, 🔐, 🏢

---

## 7️⃣ McKINSEY 7S MODEL (7 Elements)

**Structure:**
```javascript
{
  framework: 'mckinsey-7s',
  Strategy: ['element1', 'element2', 'element3'],
  Structure: ['element1', 'element2', 'element3'],
  Systems: ['element1', 'element2', 'element3'],
  SharedValues: ['element1', 'element2', 'element3'],
  Skills: ['element1', 'element2', 'element3'],
  Style: ['element1', 'element2', 'element3'],
  Staff: ['element1', 'element2', 'element3'],
  OrganizationalAlignment: 75
}
```

**UI Layout:** 3x3 Grid (Center + 6 around)
**Colors:** 7 different colors (rainbow)
**Icons:** 🎯, 🏗️, 💻, 💝, 🎓, 🎨, 👨‍💼

---

## 📝 COMMON RESPONSE STRUCTURE

All frameworks return:
```javascript
{
  framework: 'framework-id',
  [category1]: [...items],
  [category2]: [...items],
  ...
  [scoreField]: number (0-100)
}
```

**Score Field Names:**
- SWOT: `NicheScore`
- PESTLE: `ViabilityScore`
- Porter's: `CompetitiveIntensity`
- NOISE: `PotentialScore`
- Balanced Scorecard: `StrategicAlignment`
- VRIO: `CompetitiveAdvantage`
- McKinsey 7S: `OrganizationalAlignment`

---

## 🎨 COLOR SCHEME

| Framework | Color 1 | Color 2 | Color 3 | Color 4 | Color 5 | Color 6 | Color 7 |
|-----------|---------|---------|---------|---------|---------|---------|---------|
| SWOT | Green | Red | Blue | Yellow | - | - | - |
| PESTLE | Purple | Green | Pink | Blue | Orange | Brown | - |
| Porter's | Red | Orange | Yellow | Blue | Purple | - | - |
| NOISE | Blue | Green | Yellow | Purple | Orange | - | - |
| Balanced | Blue | Green | Orange | Purple | - | - | - |
| VRIO | Green | Blue | Orange | Purple | - | - | - |
| McKinsey | Red | Orange | Yellow | Green | Blue | Purple | Pink |

---

## 📊 GRID LAYOUTS

**2x2 Grid (SWOT, Balanced Scorecard, VRIO):**
```
┌─────────┬─────────┐
│ Item 1  │ Item 2  │
├─────────┼─────────┤
│ Item 3  │ Item 4  │
└─────────┴─────────┘
```

**2x3 Grid (PESTLE, NOISE):**
```
┌─────────┬─────────┬─────────┐
│ Item 1  │ Item 2  │ Item 3  │
├─────────┼─────────┼─────────┤
│ Item 4  │ Item 5  │ Item 6  │
└─────────┴─────────┴─────────┘
```

**3x3 Grid (McKinsey 7S):**
```
┌─────────┬─────────┬─────────┐
│ Item 1  │ Item 2  │ Item 3  │
├─────────┼─────────┼─────────┤
│ Item 4  │ CENTER  │ Item 5  │
├─────────┼─────────┼─────────┤
│ Item 6  │ Item 7  │ Item 8  │
└─────────┴─────────┴─────────┘
```

**Center + 4 Corners (Porter's Five Forces - Alternative):**
```
        ┌─────────┐
        │ Item 1  │
        └─────────┘
┌─────────┐     ┌─────────┐
│ Item 2  │     │ Item 3  │
└─────────┘     └─────────┘
        ┌─────────┐
        │ Item 4  │
        └─────────┘
        ┌─────────┐
        │ Item 5  │
        └─────────┘
```

---

## ✅ VALIDATION RULES

- Each category must have 3-5 items
- Score must be 0-100
- All items must be non-empty strings
- Framework field must match one of the 7 framework IDs
- Response must include all required categories

---

## 🔄 BACKWARD COMPATIBILITY

- Default framework: SWOT
- If no framework specified: Use SWOT
- Existing SWOT data structure unchanged
- localStorage can store framework preference


