import { useState } from 'react'
import { supabase } from '../services/supabase'

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$19',
    period: '/month',
    features: ['10 brand saves', 'Signal Engine', 'Craft Engine', 'PDF export'],
    cta: 'Get Starter',
  },
  {
    id: 'builder',
    name: 'Builder',
    price: '$49',
    period: '/month',
    features: ['50 brand saves', 'Everything in Starter', 'Priority AI', 'Team sharing'],
    cta: 'Get Builder',
    popular: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$99',
    period: '/month',
    features: ['Unlimited brands', 'Everything in Builder', 'White-label export', 'API access'],
    cta: 'Get Pro',
  },
]

export default function Pricing() {
  const [loading, setLoading] = useState<string | null>(null)

  const handleCheckout = async (planId: string) => {
    setLoading(planId)
    try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      window.location.href = '/login'
      return
    }

    const priceIds: Record<string, string> = {
      starter: 'price_1TRXcEKj0cl4OuvZvPQDAvKR',
      builder: 'price_1TRXd8Kj0cl4OuvZMFNPBDKk',
      pro: 'price_1TRXdmKj0cl4OuvZV8A0FpIh',
    }

    const { data, error } = await supabase.functions.invoke('create-checkout', {
      body: {
        priceId: priceIds[planId],
        userId: user.id,
        userEmail: user.email,
      },
    })

    if (error) throw error
    if (data?.url) window.location.href = data.url
    } catch (err) {
      console.error('Checkout error:', err)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-zinc-400 text-lg">Scale your brand building with FORGE</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl border p-8 flex flex-col gap-6 ${
                plan.popular
                  ? 'border-orange-500 bg-zinc-900'
                  : 'border-zinc-800 bg-zinc-950'
              }`}
            >
              {plan.popular && (
                <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
                  Most Popular
                </span>
              )}
              <div>
                <h2 className="text-2xl font-bold">{plan.name}</h2>
                <div className="mt-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-zinc-400">{plan.period}</span>
                </div>
              </div>
              <ul className="flex flex-col gap-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-zinc-300 text-sm">
                    <span className="text-orange-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout(plan.id)}
                disabled={loading === plan.id}
                className={`w-full py-3 rounded-xl font-bold transition-all ${
                  plan.popular
                    ? 'bg-orange-500 hover:bg-orange-400 text-black'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                }`}
              >
                {loading === plan.id ? 'Loading...' : plan.cta}
              </button>
            </div>
          ))}
        </div>
        <p className="text-center text-zinc-500 text-sm mt-12">
          Free plan includes 3 brand saves. Upgrade anytime. Cancel anytime.
        </p>
      </div>
    </div>
  )
}
