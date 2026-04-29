import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const STEPS = [
  {
    icon: '📡',
    engine: 'Signal Engine',
    desc: 'Validates your market. Demand score, competition map, audience heat.',
    color: 'blue',
  },
  {
    icon: '🎨',
    engine: 'Craft Engine',
    desc: 'Builds your identity. Name, palette, voice, product concepts.',
    color: 'purple',
  },
  {
    icon: '📣',
    engine: 'Reach Engine',
    desc: 'Generates your growth plan. Hooks, ad angles, email sequences.',
    color: 'green',
  },
  {
    icon: '💬',
    engine: 'Pulse Engine',
    desc: 'Designs your customer experience. Support, retention, FAQ.',
    color: 'rose',
  },
  {
    icon: '💰',
    engine: 'Capital Engine',
    desc: 'Models your financials. Margins, budget, 30-day projections.',
    color: 'yellow',
  },
]

interface EmptyStateProps {
  isFirstTime: boolean
  onCreateBrand: () => void
}

export default function EmptyState({ isFirstTime, onCreateBrand }: EmptyStateProps) {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % STEPS.length)
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  if (!isFirstTime) {
    // Returning user with no brands — simple nudge
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-4xl mb-4">⚡</div>
        <h3 className="text-xl font-bold text-white mb-2">No brands yet</h3>
        <p className="text-white/40 text-sm mb-8 max-w-sm">
          Create your first brand and run all five engines to get a full blueprint in minutes.
        </p>
        <button
          onClick={onCreateBrand}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-400 text-black font-bold rounded-xl text-sm uppercase tracking-widest transition-all"
        >
          Create First Brand →
        </button>
      </div>
    )
  }

  // First-time user — full onboarding
  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      {/* Welcome header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs uppercase tracking-widest font-bold mb-6">
          ⚡ Welcome to FORGE
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
          Your brand OS is ready.
        </h2>
        <p className="text-white/40 text-sm max-w-md mx-auto leading-relaxed">
          Enter your idea once. FORGE runs five AI engines and gives you a complete brand
          blueprint — market validation, identity, marketing, financials, and a PDF kit.
        </p>
      </div>

      {/* Engine preview ticker */}
      <div className="mb-10 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-xs text-white/40 uppercase tracking-widest">Five engines will run</span>
        </div>
        <div className="space-y-2">
          {STEPS.map((step, i) => (
            <div
              key={step.engine}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-500 ${
                activeStep === i
                  ? 'bg-white/[0.04] border border-white/10'
                  : 'opacity-40'
              }`}
            >
              <span className="text-xl shrink-0">{step.icon}</span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white">{step.engine}</p>
                <p className="text-xs text-white/40 truncate">{step.desc}</p>
              </div>
              {activeStep === i && (
                <div className="ml-auto shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3-step process */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { num: '01', label: 'Enter your idea', sub: '30 seconds' },
          { num: '02', label: 'Run the engines', sub: '~2 minutes' },
          { num: '03', label: 'Download PDF kit', sub: 'Instant' },
        ].map(step => (
          <div key={step.num} className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-3xl font-bold text-white/5 font-mono mb-1">{step.num}</div>
            <p className="text-xs font-bold text-white">{step.label}</p>
            <p className="text-xs text-orange-400 mt-0.5">{step.sub}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <button
          onClick={onCreateBrand}
          className="px-8 py-4 bg-orange-500 hover:bg-orange-400 text-black font-bold rounded-xl text-sm uppercase tracking-widest transition-all shadow-lg shadow-orange-500/20 w-full max-w-xs"
        >
          Build my first brand →
        </button>
        <p className="text-xs text-white/20 mt-4">Free plan · No credit card · 3 brand saves included</p>
      </div>
    </div>
  )
}
