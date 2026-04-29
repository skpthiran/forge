import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

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
  const prompt = `
You are FORGE Signal Engine — an expert market intelligence AI.

Analyze this business idea and return a structured market report:

Business Idea: ${idea}
Industry: ${industry}
Target Audience: ${targetAudience}
Price Point: ${pricePoint}
Target Market: ${market}

Return ONLY a valid JSON object with exactly this structure (no markdown, no explanation):
{
  "demand_score": <number 0-100>,
  "competition_level": "<Low|Medium|High|Very High>",
  "audience_heat": "<Cold|Warming|Rising|Hot|Explosive>",
  "market_gap": "<2-3 sentence description of the primary market opportunity>",
  "opportunity_window": "<timeframe like '3-6 Months' or '6-12 Months'>",
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

  const result = await model.generateContent(prompt)
  const text = result.response.text()
  const cleaned = text.replace(/```json|```/g, '').trim()
  const parsed = JSON.parse(cleaned)
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
  const prompt = `
You are FORGE Craft Engine — an expert brand identity AI.

Create a complete brand identity for this business:

Business Idea: ${idea}
Industry: ${industry}
Target Audience: ${targetAudience}
Price Point: ${pricePoint}
Market Opportunity: ${marketGap}

Return ONLY a valid JSON object with exactly this structure (no markdown, no explanation):
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
    "writing_example": "<2-3 sentences written in the brand voice>"
  },
  "color_palette": [
    { "hex": "#<hex>", "label": "<Primary>" },
    { "hex": "#<hex>", "label": "<Secondary>" },
    { "hex": "#<hex>", "label": "<Accent>" }
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

  const result = await model.generateContent(prompt)
  const text = result.response.text()
  const cleaned = text.replace(/```json|```/g, '').trim()
  const parsed = JSON.parse(cleaned)
  return {
    ...parsed,
    selected_name: parsed.brand_names[0],
    selected_tagline: parsed.taglines[0],
    raw_response: text
  }
}
