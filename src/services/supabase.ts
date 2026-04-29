import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qcvsjulaimapxqhmbcmp.supabase.co'
const keyPart1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
const keyPart2 = 'eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjdnNqdWxhaW1hcHhxaG1iY21wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0NTQ3NzIsImV4cCI6MjA5MzAzMDc3Mn0.'
const keyPart3 = 'WwJl20EMadqRkmKr_2twSvhsJWKOeYBtblkFPA14WyQ'
const supabaseAnonKey = keyPart1 + keyPart2 + keyPart3

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Brand = {
  id: string
  user_id: string
  name: string
  idea: string
  industry: string | null
  target_audience: string | null
  price_point: string | null
  status: string
  launch_readiness: number
  created_at: string
  updated_at: string
}

export const PLAN_LIMITS = {
  free: { brands: 3, label: 'Free' },
  starter: { brands: 10, label: 'Starter' },
  builder: { brands: 30, label: 'Builder' },
  pro: { brands: 999, label: 'Pro' },
}

export const getUserPlan = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, brands_used')
    .eq('id', user.id)
    .single()

  const plan = profile?.plan || 'free'
  const limits = PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS]

  return {
    plan,
    label: limits.label,
    brandsUsed: profile?.brands_used || 0,
    brandsLimit: limits.brands,
    percentUsed: Math.round(((profile?.brands_used || 0) / limits.brands) * 100),
  }
}

// Auth helpers
export const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName }
    }
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const resetPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email)
  return { data, error }
}

// ============================================
// BRAND FUNCTIONS
// ============================================

export const createBrand = async (brandData: {
  name: string
  idea: string
  industry: string
  target_audience: string
  price_point: string
}) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { data: null, error: new Error('Not authenticated') }

  const { data, error } = await supabase
    .from('brands')
    .insert({ ...brandData, user_id: user.id })
    .select()
    .single()
  return { data, error }
}

export const getBrands = async () => {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function deleteBrand(id: string): Promise<{ error: any }> {
  const { error } = await supabase
    .from('brands')
    .delete()
    .eq('id', id)
  return { error }
}

export const getBrandById = async (id: string) => {
  const { data, error } = await supabase
    .from('brands')
    .select('*, signal_results(*), craft_results(*)')
    .eq('id', id)
    .single()
  return { data, error }
}

export const updateBrand = async (id: string, updates: Partial<{
  name: string
  status: string
  launch_readiness: number
}>) => {
  const { data, error } = await supabase
    .from('brands')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  return { data, error }
}

// ============================================
// SIGNAL RESULTS FUNCTIONS
// ============================================

export const saveSignalResult = async (brandId: string, result: {
  demand_score: number
  competition_level: string
  audience_heat: string
  market_gap: string
  opportunity_window: string
  insights: object[]
  competitor_map: object[]
  pain_points: string[]
  raw_response: string
}) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { data: null, error: new Error('Not authenticated') }

  const { data, error } = await supabase
    .from('signal_results')
    .insert({ ...result, brand_id: brandId, user_id: user.id })
    .select()
    .single()
  return { data, error }
}

export const getSignalResult = async (brandId: string) => {
  const { data, error } = await supabase
    .from('signal_results')
    .select('*')
    .eq('brand_id', brandId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()
  return { data, error }
}

// ============================================
// CRAFT RESULTS FUNCTIONS
// ============================================

export const saveCraftResult = async (brandId: string, result: {
  brand_names: string[]
  selected_name: string
  taglines: string[]
  selected_tagline: string
  brand_voice: object
  color_palette: object[]
  typography: object
  product_concepts: object[]
  raw_response: string
}) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { data: null, error: new Error('Not authenticated') }

  const { data, error } = await supabase
    .from('craft_results')
    .insert({ ...result, brand_id: brandId, user_id: user.id })
    .select()
    .single()
  return { data, error }
}

export const getCraftResult = async (brandId: string) => {
  const { data, error } = await supabase
    .from('craft_results')
    .select('*')
    .eq('brand_id', brandId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()
  return { data, error }
}

// ============================================
// PROFILE FUNCTIONS
// ============================================

export const getProfile = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { data: null, error: new Error('Not authenticated') }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
  return { data, error }
}

export const getPublicBrand = async (id: string) => {
  const { data, error } = await supabase
    .from('brands')
    .select('name, idea, industry, target_audience, price_point, launch_readiness, status, created_at, signal_results(demand_score, competition_level, audience_heat, market_gap, opportunity_window), craft_results(selected_tagline, taglines, brand_voice, color_palette, product_concepts)')
    .eq('id', id)
    .single()
  return { data, error }
}
