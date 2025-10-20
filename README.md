# 💡 Idea SWOT Generator

A production-ready microSaaS application that generates AI-powered SWOT analysis for business ideas. Built with Next.js 14, Tailwind CSS, and serverless API routes.

## Features

✅ **AI-Powered SWOT Analysis** - Generates Strengths, Weaknesses, Opportunities, and Threats  
✅ **Niche Viability Score** - 0-100 score indicating market potential  
✅ **Responsive Design** - Works on desktop, tablet, and mobile  
✅ **Smooth Animations** - Fade-in and slide-in effects for results  
✅ **Input Validation** - Client and server-side validation  
✅ **Error Handling** - Graceful error messages and fallbacks  
✅ **Stripe Integration Ready** - Scaffolding for premium features  
✅ **Vercel Ready** - Deploy to Vercel free tier instantly  

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes (Serverless)
- **AI**: Together.ai or OpenAI API
- **Styling**: Tailwind CSS with custom animations
- **Deployment**: Vercel

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd idea-swot-generator
npm install
```

### 2. Set Up Environment Variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your API keys:

```env
# Option A: Together.ai (Recommended - free tier available)
TOGETHER_API_KEY=your_api_key_here

# Option B: OpenAI (Alternative)
# OPENAI_API_KEY=your_api_key_here

# Stripe (Optional - for future monetization)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_key_here
STRIPE_SECRET_KEY=your_key_here
```

### 3. Get API Keys

**Together.ai (Recommended)**
- Visit: https://www.together.ai/
- Sign up for free account
- Get API key from dashboard
- Free tier includes generous credits

**OpenAI (Alternative)**
- Visit: https://platform.openai.com/api-keys
- Create API key
- Add billing method (pay-as-you-go)

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
idea-swot-generator/
├── pages/
│   ├── _app.js              # Next.js app wrapper
│   ├── index.js             # Landing page
│   └── api/
│       └── analyze.js       # API route for SWOT analysis
├── components/
│   ├── InputForm.js         # Form component with validation
│   └── SWOTDisplay.js       # SWOT results display
├── styles/
│   └── globals.css          # Global styles and animations
├── public/                  # Static assets
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.local.example       # Environment variables template
└── README.md
```

## How It Works

1. **User Input**: User enters business idea (10-500 characters) and selects focus area
2. **Validation**: Frontend validates input, shows error if invalid
3. **API Call**: Form submits to `/api/analyze` endpoint
4. **AI Processing**: Backend calls Together.ai or OpenAI API with structured prompt
5. **Response Parsing**: API response is parsed and validated
6. **Display**: Results shown in animated SWOT cards with niche score

## API Endpoint

### POST `/api/analyze`

**Request:**
```json
{
  "idea": "An AI-powered personal finance app for freelancers",
  "focusArea": "Market"
}
```

**Response:**
```json
{
  "Strengths": ["Growing freelance market", "AI adoption increasing", "..."],
  "Weaknesses": ["Competitive landscape", "User acquisition costs", "..."],
  "Opportunities": ["International expansion", "B2B partnerships", "..."],
  "Threats": ["Established competitors", "Economic downturn", "..."],
  "NicheScore": 72
}
```

## Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy to Vercel

- Visit: https://vercel.com/new
- Import your GitHub repository
- Add environment variables:
  - `TOGETHER_API_KEY` or `OPENAI_API_KEY`
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (optional)
  - `STRIPE_SECRET_KEY` (optional)
- Click "Deploy"

Your app is now live! 🚀

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `TOGETHER_API_KEY` | Yes* | Together.ai API key (*or use OPENAI_API_KEY) |
| `OPENAI_API_KEY` | Yes* | OpenAI API key (*or use TOGETHER_API_KEY) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | No | Stripe publishable key for frontend |
| `STRIPE_SECRET_KEY` | No | Stripe secret key for backend |

## Customization

### Change AI Model

Edit `pages/api/analyze.js`:
- For Together.ai: Change `model` parameter (line ~60)
- For OpenAI: Change `model` parameter (line ~90)

### Modify SWOT Prompt

Edit the `prompt` variable in `pages/api/analyze.js` to customize analysis focus.

### Styling

- Tailwind config: `tailwind.config.js`
- Global styles: `styles/globals.css`
- Component styles: Inline Tailwind classes

## Troubleshooting

### "API configuration error"
- Ensure `.env.local` exists with API key
- Verify key is correct and has permissions
- Restart dev server after changing `.env.local`

### "Failed to analyze idea"
- Check API key is valid
- Verify API has available credits
- Check browser console for detailed error
- Try with shorter idea description

### Styling not loading
- Clear `.next` folder: `rm -rf .next`
- Restart dev server: `npm run dev`

## Performance Tips

- API calls are cached by browser (consider adding cache headers)
- Results are stored in component state (not persisted)
- Animations use CSS (GPU-accelerated)
- Tailwind CSS is optimized for production

## Future Enhancements

- [ ] User authentication (Supabase)
- [ ] Save/export SWOT analysis
- [ ] Premium features (detailed reports, PDF export)
- [ ] Analytics dashboard
- [ ] Team collaboration
- [ ] API rate limiting
- [ ] Caching layer

## License

MIT

## Support

For issues or questions:
1. Check troubleshooting section
2. Review API documentation
3. Check browser console for errors
4. Verify environment variables

---

**Ready to deploy?** Follow the Vercel deployment steps above and your SWOT generator will be live in minutes! 🎉

