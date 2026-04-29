import Stripe from 'https://esm.sh/stripe@14?target=deno'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2?target=deno'
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2024-04-10',
})

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

const PLAN_LIMITS: Record<string, number> = {
  starter: 10,
  builder: 50,
  pro: 999999,
}

serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
  }

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const signature = req.headers.get('stripe-signature')
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
  const body = await req.text()

  let event: Stripe.Event

  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature!,
      webhookSecret!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return new Response(JSON.stringify({ error: 'Invalid signature' }), {
      status: 400,
      headers: corsHeaders,
    })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.metadata?.userId
    const plan = session.metadata?.plan
    const customerId = session.customer as string

    if (userId && plan) {
      const { error } = await supabase
        .from('profiles')
        .update({
          plan: plan,
          stripe_customer_id: customerId,
        })
        .eq('id', userId)

      if (error) {
        console.error('Failed to update profile plan:', error)
        return new Response(JSON.stringify({ error: 'DB update failed' }), {
          status: 500,
          headers: corsHeaders,
        })
      }

      console.log(`Updated user ${userId} to plan: ${plan}`)
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription
    const customerId = subscription.customer as string

    await supabase
      .from('profiles')
      .update({ plan: 'free' })
      .eq('stripe_customer_id', customerId)
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
