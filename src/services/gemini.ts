import { supabase } from './supabase'

export function track(event: string, properties?: Record<string, any>) {
  try {
    if (typeof window !== 'undefined' && (window as any).posthog) {
      (window as any).posthog.capture(event, properties)
    }
  } catch {}
}

async function callGroq(messages: any[], options: { model?: string; temperature?: number; max_tokens?: number } = {}) {
  const { data, error } = await supabase.functions.invoke('groq-proxy', {
    body: {
      messages,
      model: options.model || 'llama-3.3-70b-versatile',
      temperature: options.temperature ?? 0.7,
      max_tokens: options.max_tokens ?? 2048,
    },
  })

  if (error) {
    console.error('Groq Proxy Error:', error)
    throw new Error('AI Engine is temporarily unavailable. Please try again.')
  }

  return data
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
  const completion = await callGroq([{ role: 'user', content: prompt }], {
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    max_tokens: 2048,
  })

  const text = completion.choices[0]?.message?.content || ''
  let cleaned = text.replace(/```json|```/g, '').trim()
  // Extract JSON object if there's extra text around it
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('Signal Engine returned invalid response. Please try again.')
  const parsed = JSON.parse(jsonMatch[0])
  if (typeof parsed.demand_score !== 'number') throw new Error('Incomplete AI response. Please try again.')
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
  const completion = await callGroq([{ role: 'user', content: prompt }], {
    model: 'llama-3.3-70b-versatile',
    temperature: 0.8,
    max_tokens: 2048,
  })

  const text = completion.choices[0]?.message?.content || ''
  let cleaned = text.replace(/```json|```/g, '').trim()
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('Craft Engine returned invalid response. Please try again.')
  const parsed = JSON.parse(jsonMatch[0])
  track('craft_engine_run', { industry })
  return {
    ...parsed,
    selected_name: parsed.brand_names?.[0] || parsed.selected_name || '',
    selected_tagline: parsed.taglines?.[0] || parsed.selected_tagline || '',
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
  const completion = await callGroq([{ role: 'user', content: prompt }], {
    model: 'llama-3.3-70b-versatile',
    temperature: 0.8,
    max_tokens: 2048,
  })
  const text = completion.choices[0]?.message?.content || ''
  const cleaned = text.replace(/```json|```/g, '').trim()
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('AI returned invalid response. Please try again.')
  const parsed = JSON.parse(jsonMatch[0])
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
  const completion = await callGroq([{ role: 'user', content: prompt }], {
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    max_tokens: 1500,
  })
  const text = completion.choices[0]?.message?.content || ''
  const cleaned = text.replace(/```json|```/g, '').trim()
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('AI returned invalid response. Please try again.')
  const parsed = JSON.parse(jsonMatch[0])
  track('pulse_engine_run', { industry })
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
  const completion = await callGroq([{ role: 'user', content: prompt }], {
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    max_tokens: 2048,
  })
  const text = completion.choices[0]?.message?.content || ''
  const cleaned = text.replace(/```json|```/g, '').trim()
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('AI returned invalid response. Please try again.')
  const parsed = JSON.parse(jsonMatch[0])
  track('capital_engine_run', { industry })
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
    // fire and forget — don't block the UI
    supabase.functions.invoke('send-blueprint-email', {
      body: params,
    }).catch(console.error)
    track('blueprint_email_sent', { brandName: params.brandName })
  } catch (e) {
    console.error('Email send failed silently:', e)
  }
}
