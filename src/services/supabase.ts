import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
