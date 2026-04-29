import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2?target=deno'

serve(async () => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )
  // Lightweight ping — just count brands table
  const { count } = await supabase
    .from('brands')
    .select('*', { count: 'exact', head: true })

  console.log(`Keep-alive ping: ${count} brands in DB`)

  return new Response(JSON.stringify({ ok: true, count }), {
    headers: { 'Content-Type': 'application/json' }
  })
})
