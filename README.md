---

# FORGE — AI Brand Operating System

<div align="center">

![FORGE](https://img.shields.io/badge/FORGE-AI%20Brand%20OS-orange?style=for-the-badge)
![Version](https://img.shields.io/badge/version-2.0-white?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![Built With](https://img.shields.io/badge/built%20with-Vite%20%2B%20React%20%2B%20Supabase-blue?style=for-the-badge)

**Turn a raw business idea into a complete brand blueprint in under 60 seconds.**

[Live Demo](https://forge-7f8.pages.dev) · [Start Forging](https://forge-7f8.pages.dev/new-brand) · [Pricing](https://forge-7f8.pages.dev/pricing)

</div>

---

## What is FORGE?

FORGE is an AI-powered Brand Operating System built for solo founders, creators, small businesses, and agencies. You input a raw business idea. FORGE outputs a complete, production-ready brand blueprint — market research, brand identity, marketing campaigns, customer experience strategy, and financial projections — all in under 60 seconds.

No agency. No freelancer. No weeks of back-and-forth.
Just you, your idea, and five AI engines working in parallel.

---

## The Problem

Starting a brand is expensive, slow, and overwhelming.

| What you need | What it costs | How long it takes |
|---|---|---|
| Market research | $2,000 – $10,000 | 2 – 4 weeks |
| Brand identity (agency) | $5,000 – $50,000 | 4 – 8 weeks |
| Marketing strategy | $1,500 – $5,000/mo | Ongoing |
| Customer experience setup | $1,000 – $3,000 | 1 – 2 weeks |
| Financial modeling | $500 – $2,000 | 1 week |
| **Total** | **$10,000 – $70,000+** | **2 – 4 months** |

FORGE replaces all of this for **$19 – $99/month**.

---

## The Five Engines

### 🔵 Signal Engine — Market Intelligence
Analyzes your business idea against current market data to produce:
- **Demand Score** (0–100) based on search intent and audience behavior
- **Competition Level** mapping with competitor weaknesses identified
- **Audience Heat** rating showing how active your target market is
- **Market Gap Analysis** — the specific opportunity your brand can own
- **AI Insight Feed** — trends, alerts, and product opportunities
- **Pain Points** — what your target customers are actually frustrated by
- **Opportunity Window** — optimal timeframe to enter the market

### 🟠 Craft Engine — Brand Identity
Generates a complete brand identity including:
- **5 Brand Name Options** with the strongest recommendation highlighted
- **4 Tagline Variations** — punchy, memorable, on-brand
- **Brand Voice Guide** — tone, vibe, and writing examples
- **Color Palette** — 3 hex colors with psychological reasoning
- **Typography Direction** — heading and body font recommendations
- **3 Product Concepts** — specific products with pricing and descriptions

### 🟢 Reach Engine — Growth & Marketing
Builds a full go-to-market strategy:
- **5 TikTok/Reels Hooks** with visual and audio direction
- **4 Ad Angle Campaigns** for Meta, TikTok, and Google
- **5-Email Launch Sequence** — from founder story to launch day
- **Campaign Calendar** with status tracking

### 🔴 Pulse Engine — Customer Experience
Creates your customer-facing playbook:
- **Sentiment Score** prediction
- **Retention Strategy** specific to your brand and audience
- **Support Response Templates** in your brand voice
- **FAQ Library** — pre-built answers to common questions

### 🟡 Capital Engine — Finance & Operations
Generates your financial foundation:
- **Launch Budget** estimate with breakdown
- **Target GMV** for first month
- **Break-Even Unit** calculation
- **Product Margin Analysis** — landed cost vs retail price
- **Revenue Projection** — Day 1 through Day 30
- **Risk Warnings** with severity ratings and mitigation advice

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | Vite + React + TypeScript | SPA with fast HMR |
| Styling | Tailwind CSS v4 + shadcn/ui | Design system |
| Auth + DB | Supabase (Postgres + RLS) | User data and security |
| AI Engine | Groq Cloud (Llama 3.3 70B) | All AI generation |
| Payments | Stripe | Subscription billing |
| Hosting | Cloudflare Pages | Global edge deployment |
| Email | Supabase Edge Functions (Deno) | Transactional emails |

---

## Architecture
forge/
├── src/
│   ├── pages/
│   │   ├── LandingPage.tsx          # Marketing homepage
│   │   ├── DashboardHome.tsx        # Command center overview
│   │   ├── ProjectsPage.tsx         # Brand management
│   │   ├── ProjectDetailPage.tsx    # Per-brand engine tabs
│   │   ├── DemoGeneratorPage.tsx    # New brand wizard
│   │   ├── SignalEnginePage.tsx     # Market intelligence
│   │   ├── CraftEnginePage.tsx      # Brand identity
│   │   ├── ReachEnginePage.tsx      # Growth & marketing
│   │   ├── PulseEnginePage.tsx      # Customer experience
│   │   ├── CapitalEnginePage.tsx    # Finance & operations
│   │   ├── PricingPage.tsx          # Stripe checkout
│   │   ├── SharePage.tsx            # Public brand share
│   │   └── SettingsPage.tsx         # Account management
│   ├── services/
│   │   ├── gemini.ts                # All AI engine calls (Groq)
│   │   └── supabase.ts              # Database + auth client
│   ├── components/
│   │   ├── layout/DashboardLayout.tsx
│   │   ├── BrandCard.tsx
│   │   └── ProtectedRoute.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx          # Global auth state
│   └── utils/
│       └── exportPDF.ts             # Brand kit PDF export
├── supabase/
│   ├── schema.sql                   # Full DB schema + RLS
│   └── functions/
│       ├── create-checkout/         # Stripe checkout session
│       ├── stripe-webhook/          # Plan upgrade on payment
│       ├── send-blueprint-email/    # Blueprint email delivery
│       └── keep-alive/              # Prevent DB pause
└── public/
└── _redirects                   # Cloudflare SPA routing

---

## Database Schema

```sql
-- Core tables
profiles          -- User plan, usage tracking
brands            -- Every brand a user creates
signal_results    -- AI market intelligence per brand
craft_results     -- AI brand identity per brand

-- Security
Row Level Security (RLS) enabled on all tables
Policies: users can only read/write their own data
Public share policy: brands readable by anyone via /b/:id
```

---

## Pricing

| Plan | Price | Brands | Engines |
|---|---|---|---|
| Free | $0 | 3 | Signal + Craft |
| Starter | $19/mo | 10 | All 5 engines |
| Builder | $49/mo | 30 | All 5 + Priority AI |
| Pro | $99/mo | Unlimited | Everything + White-label |

---

## Getting Started (Local Development)

### Prerequisites
- Node.js 18+
- A Supabase project
- A Groq API key (free at console.groq.com)
- A Stripe account (for payments)

### 1. Clone the repo
```bash
git clone https://github.com/skpthiran/forge.git
cd forge
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
```

Fill in your `.env`:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GROQ_API_KEY=your_groq_api_key
```

### 3. Set up the database
Go to your Supabase project → SQL Editor → paste and run the contents of `supabase/schema.sql`

### 4. Run locally
```bash
npm run dev
```

App runs at `http://localhost:3000`

### 5. Deploy to Cloudflare Pages
Connect your GitHub repo to Cloudflare Pages with:
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables: add your three keys

---

## Supabase Edge Functions

Deploy all edge functions:
```bash
npx supabase functions deploy create-checkout --project-ref YOUR_PROJECT_REF
npx supabase functions deploy stripe-webhook --project-ref YOUR_PROJECT_REF
npx supabase functions deploy send-blueprint-email --project-ref YOUR_PROJECT_REF
npx supabase functions deploy keep-alive --project-ref YOUR_PROJECT_REF
```

Required secrets in Supabase Edge Functions:
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
SUPABASE_SERVICE_ROLE_KEY

---

## Roadmap

- [x] Signal Engine — Market Intelligence
- [x] Craft Engine — Brand Identity  
- [x] Reach Engine — Growth & Marketing
- [x] Pulse Engine — Customer Experience
- [x] Capital Engine — Finance & Operations
- [x] Supabase Auth + RLS
- [x] Stripe Subscriptions
- [x] PDF Brand Kit Export
- [x] Public Brand Share Links
- [x] Cloudflare Pages Deployment
- [ ] Onboarding flow for new users
- [ ] Agency tier + team seats
- [ ] White-label export
- [ ] API access for Pro users
- [ ] Mobile app (React Native)
- [ ] Affiliate program

---

## Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

<div align="center">

Built by [Thiran Wijesingha](https://github.com/skpthiran)

**FORGE — From raw idea to real brand. In seconds.**

</div>

---
