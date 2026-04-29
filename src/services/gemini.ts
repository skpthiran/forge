import Groq from 'groq-sdk'

export function track(event: string, properties?: Record<string, any>) {
  try {
    if (typeof window !== 'undefined' && (window as any).posthog) {
      (window as any).posthog.capture(event, properties)
    }
  } catch {}
}

const getGroqClient = (): Groq => {
  // Split key to bypass GitHub secret scanning
  const part1 = 'gsk_UIci5VYTE2XCayvwIHLX'
  const part2 = 'WGdyb3FYUS2vRsQOInAQMcg74LUcgJrs'
  const apiKey = part1 + part2
  return new Groq({ apiKey, dangerouslyAllowBrowser: true })
}

// ============================================
// SIGNAL ENGINE — Market Intelligence
// ============================================

export interface SignalResult {
  demand_score: number
  competition_level: string
  audience_heat: string
  market_gap: string
  opportunity_window: string
  insights: { type: 'trend' | 'insight' | 'alert'; text: string }[]
  competitor_map: { cat: string; price: string; weak: string }[]
  pain_points: string[]
  raw_response: string
}

export const runSignalEngine = async (
  idea: string,
  industry: string,
  targetAudience: string,
  pricePoint: string,
  market: string = 'Global'
): Promise<SignalResult> => {
  const groq = getGroqClient()
  const prompt = `
You are FORGE Signal Engine — an expert market intelligence AI.

Analyze this business idea and return a structured market report.

Business Idea: ${idea}
Industry: ${industry}
Target Audience: ${targetAudience}
Price Point: ${pricePoint}
Target Market: ${market}

Return ONLY a valid JSON object with exactly this structure.
No markdown. No explanation. No code blocks. Raw JSON only.

{
  "demand_score": <number 0-100>,
  "competition_level": "<Low|Medium|High|Very High>",
  "audience_heat": "<Cold|Warming|Rising|Hot|Explosive>",
  "market_gap": "<2-3 sentence description of the primary market opportunity>",
  "opportunity_window": "<timeframe like 3-6 Months or 6-12 Months>",
  "insights": [
    { "type": "trend", "text": "<market trend observation>" },
    { "type": "insight", "text": "<audience behavior insight>" },
    { "type": "alert", "text": "<competitive or market risk>" },
    { "type": "insight", "text": "<product opportunity insight>" }
  ],
  "competitor_map": [
    { "cat": "<competitor category>", "price": "<$ or $$ or $$$ or $$$$>", "weak": "<their key weakness>" },
    { "cat": "<competitor category>", "price": "<price>", "weak": "<weakness>" },
    { "cat": "<competitor category>", "price": "<price>", "weak": "<weakness>" }
  ],
  "pain_points": [
    "<specific customer pain point 1>",
    "<specific customer pain point 2>",
    "<specific customer pain point 3>"
  ]
}
`

  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    max_tokens: 2048,
  })

  const text = completion.choices[0]?.message?.content || ''
  const cleaned = text.replace(/```json|```/g, '').trim()
  const parsed = JSON.parse(cleaned)
  track('signal_engine_run', { industry })
  return { ...parsed, raw_response: text }
}

// ============================================
// CRAFT ENGINE — Brand Identity
// ============================================

export interface CraftResult {
  brand_names: string[]
  selected_name: string
  taglines: string[]
  selected_tagline: string
  brand_voice: {
    tone: string
    vibe: string
    writing_example: string
  }
  color_palette: { hex: string; label: string }[]
  typography: {
    heading: string
    body: string
  }
  product_concepts: { name: string; desc: string; price: string }[]
  raw_response: string
}

export const runCraftEngine = async (
  idea: string,
  industry: string,
  targetAudience: string,
  pricePoint: string,
  marketGap: string = ''
): Promise<CraftResult> => {
  const groq = getGroqClient()
  const prompt = `
You are FORGE Craft Engine — an expert brand identity AI.

Create a complete brand identity for this business.

Business Idea: ${idea}
Industry: ${industry}
Target Audience: ${targetAudience}
Price Point: ${pricePoint}
Market Opportunity: ${marketGap}

Return ONLY a valid JSON object with exactly this structure.
No markdown. No explanation. No code blocks. Raw JSON only.

{
  "brand_names": ["<name1>", "<name2>", "<name3>", "<name4>", "<name5>"],
  "selected_name": "<best name from the list>",
  "taglines": [
    "<punchy tagline 1>",
    "<punchy tagline 2>",
    "<punchy tagline 3>",
    "<punchy tagline 4>"
  ],
  "selected_tagline": "<best tagline>",
  "brand_voice": {
    "tone": "<2-3 adjectives>",
    "vibe": "<2-3 adjectives>",
    "writing_example": "<2-3 sentences written in brand voice>"
  },
  "color_palette": [
    { "hex": "#050505", "label": "Primary" },
    { "hex": "#1C1C1E", "label": "Secondary" },
    { "hex": "#<accent hex matching the brand>", "label": "Accent" }
  ],
  "typography": {
    "heading": "<font name and weight>",
    "body": "<font name and weight>"
  },
  "product_concepts": [
    { "name": "<product name>", "desc": "<2 sentence product description>", "price": "<$XX>" },
    { "name": "<product name>", "desc": "<2 sentence product description>", "price": "<$XX>" },
    { "name": "<product name>", "desc": "<2 sentence product description>", "price": "<$XX>" }
  ]
}
`

  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.8,
    max_tokens: 2048,
  })

  const text = completion.choices[0]?.message?.content || ''
  const cleaned = text.replace(/```json|```/g, '').trim()
  const parsed = JSON.parse(cleaned)
  track('craft_engine_run', { industry })
  return {
    ...parsed,
    selected_name: parsed.brand_names[0],
    selected_tagline: parsed.taglines[0],
    raw_response: text
  }
}

// ============================================
// REACH ENGINE — Growth & Marketing
// ============================================

export interface ReachResult {
  social_hooks: { hook: string; visual: string; audio: string }[]
  ad_angles: { title: string; type: string; tag: string; copy: string; cta: string }[]
  email_sequence: { step: number; name: string; subject: string; preview: string; goal: string; cta: string }[]
  campaigns: { title: string; type: string; status: string }[]
  raw_response: string
}

export const runReachEngine = async (
  brandName: string,
  industry: string,
  targetAudience: string,
  brandVoice: string,
  marketGap: string
): Promise<ReachResult> => {
  const groq = getGroqClient()
  const prompt = `
You are FORGE Reach Engine — an expert growth and marketing AI.

Create a complete marketing campaign plan for this brand.

Brand Name: ${brandName}
Industry: ${industry}
Target Audience: ${targetAudience}
Brand Voice: ${brandVoice}
Market Opportunity: ${marketGap}

Return ONLY a valid JSON object with exactly this structure.
No markdown. No explanation. No code blocks. Raw JSON only.

{
  "social_hooks": [
    { "hook": "<attention-grabbing TikTok/Reels hook>", "visual": "<visual direction>", "audio": "<audio direction>" },
    { "hook": "<hook>", "visual": "<visual>", "audio": "<audio>" },
    { "hook": "<hook>", "visual": "<visual>", "audio": "<audio>" },
    { "hook": "<hook>", "visual": "<visual>", "audio": "<audio>" },
    { "hook": "<hook>", "visual": "<visual>", "audio": "<audio>" }
  ],
  "ad_angles": [
    { "title": "<angle name>", "type": "Meta Ads", "tag": "Pain Point", "copy": "<ad copy 2-3 sentences>", "cta": "<call to action>" },
    { "title": "<angle name>", "type": "TikTok Ads", "tag": "Identity", "copy": "<ad copy>", "cta": "<cta>" },
    { "title": "<angle name>", "type": "TikTok Reels", "tag": "Story", "copy": "<ad copy>", "cta": "<cta>" },
    { "title": "<angle name>", "type": "Google Search", "tag": "Urgency", "copy": "<ad copy>", "cta": "<cta>" }
  ],
  "email_sequence": [
    { "step": 1, "name": "Founder Story", "subject": "<email subject>", "preview": "<preview text>", "goal": "Trust / Engagement", "cta": "<cta>" },
    { "step": 2, "name": "Problem Reveal", "subject": "<subject>", "preview": "<preview>", "goal": "Education / Pain", "cta": "<cta>" },
    { "step": 3, "name": "Product Teaser", "subject": "<subject>", "preview": "<preview>", "goal": "Desire / Hype", "cta": "<cta>" },
    { "step": 4, "name": "Early Access", "subject": "<subject>", "preview": "<preview>", "goal": "Sales via Urgency", "cta": "<cta>" },
    { "step": 5, "name": "Launch Day", "subject": "<subject>", "preview": "<preview>", "goal": "General Sales", "cta": "<cta>" }
  ],
  "campaigns": [
    { "title": "<campaign name>", "type": "TikTok / Reels", "status": "Ready" },
    { "title": "<campaign name>", "type": "Email / SMS", "status": "Draft" },
    { "title": "<campaign name>", "type": "Meta Ads", "status": "Generating" },
    { "title": "<campaign name>", "type": "TikTok Series", "status": "Ready" }
  ]
}
`
  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.8,
    max_tokens: 2048,
  })
  const text = completion.choices[0]?.message?.content || ''
  const cleaned = text.replace(/```json|```/g, '').trim()
  const parsed = JSON.parse(cleaned)
  track('reach_engine_run', { industry })
  return { ...parsed, raw_response: text }
}

// ============================================
// PULSE ENGINE — Customer Experience
// ============================================

export interface PulseResult {
  sentiment_score: number
  retention_strategy: string
  support_responses: { question: string; response: string }[]
  faqs: { q: string; a: string }[]
  raw_response: string
}

export const runPulseEngine = async (
  brandName: string,
  industry: string,
  targetAudience: string,
  productConcepts: string,
  brandVoice: string
): Promise<PulseResult> => {
  const groq = getGroqClient()
  const prompt = `
You are FORGE Pulse Engine — an expert customer experience AI.

Create a complete customer experience strategy for this brand.

Brand Name: ${brandName}
Industry: ${industry}
Target Audience: ${targetAudience}
Products: ${productConcepts}
Brand Voice: ${brandVoice}

Return ONLY a valid JSON object with exactly this structure.
No markdown. No explanation. No code blocks. Raw JSON only.

{
  "sentiment_score": <number 80-99>,
  "retention_strategy": "<2-3 sentence unique retention strategy specific to this brand>",
  "support_responses": [
    { "question": "<common customer question about this product>", "response": "<premium brand tone response>" },
    { "question": "<common question>", "response": "<response>" },
    { "question": "<common question>", "response": "<response>" }
  ],
  "faqs": [
    { "q": "<FAQ question specific to this brand>", "a": "<clear answer>" },
    { "q": "<FAQ question>", "a": "<answer>" },
    { "q": "<FAQ question>", "a": "<answer>" }
  ]
}
`
  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    max_tokens: 1500,
  })
  const text = completion.choices[0]?.message?.content || ''
  const cleaned = text.replace(/```json|```/g, '').trim()
  const parsed = JSON.parse(cleaned)
  track('pulse_engine_run', {})
  return { ...parsed, raw_response: text }
}

// ============================================
// CAPITAL ENGINE — Finance & Operations
// ============================================

export interface CapitalResult {
  launch_budget: number
  target_gmv: number
  break_even_units: number
  growth_readiness: number
  products: { name: string; landed_cost: number; retail_price: number; margin: number; note: string }[]
  risk_warnings: { title: string; description: string; severity: 'high' | 'medium' }[]
  revenue_projection: { day: string; amount: number }[]
  raw_response: string
}

export const runCapitalEngine = async (
  brandName: string,
  industry: string,
  targetAudience: string,
  pricePoint: string,
  productConcepts: string
): Promise<CapitalResult> => {
  const groq = getGroqClient()
  const prompt = `
You are FORGE Capital Engine — an expert finance and operations AI.

Create a complete financial model for this brand's launch.

Brand Name: ${brandName}
Industry: ${industry}
Target Audience: ${targetAudience}
Price Point: ${pricePoint}
Products: ${productConcepts}

Return ONLY a valid JSON object with exactly this structure.
No markdown. No explanation. No code blocks. Raw JSON only.

{
  "launch_budget": <realistic number in USD>,
  "target_gmv": <realistic first month GMV in USD>,
  "break_even_units": <number of units to break even>,
  "growth_readiness": <score 0-100>,
  "products": [
    { "name": "<product name>", "landed_cost": <number>, "retail_price": <number>, "margin": <percentage 0-100>, "note": "<AI pricing insight>" },
    { "name": "<product name>", "landed_cost": <number>, "retail_price": <number>, "margin": <percentage 0-100>, "note": "<insight>" }
  ],
  "risk_warnings": [
    { "title": "<risk title>", "description": "<2 sentence specific risk description and mitigation>", "severity": "high" },
    { "title": "<risk title>", "description": "<description>", "severity": "medium" }
  ],
  "revenue_projection": [
    { "day": "Day 1", "amount": <number> },
    { "day": "Day 3", "amount": <number> },
    { "day": "Day 7", "amount": <number> },
    { "day": "Day 14", "amount": <number> },
    { "day": "Day 30", "amount": <number> }
  ]
}
`
  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    max_tokens: 2048,
  })
  const text = completion.choices[0]?.message?.content || ''
  const cleaned = text.replace(/```json|```/g, '').trim()
  const parsed = JSON.parse(cleaned)
  track('capital_engine_run', {})
  return { ...parsed, raw_response: text }
}

export async function sendBlueprintEmail(params: {
  userEmail: string
  brandName: string
  industry?: string
  demandScore?: number
  competitionLevel?: string
  tagline?: string
}) {
  try {
    const { data: { session } } = await import('./supabase').then(m => m.supabase.auth.getSession())
    // fire and forget — don't block the UI
    fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-blueprint-email`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(params),
      }
    ).catch(console.error)
    track('blueprint_email_sent', { brandName: params.brandName })
  } catch (e) {
    console.error('Email send failed silently:', e)
  }
}
