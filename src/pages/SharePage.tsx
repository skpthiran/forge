import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPublicBrand } from '../services/supabase'

export default function SharePage() {
  const { id } = useParams<{ id: string }>()
  const [brand, setBrand] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function load() {
      if (!id) return
      const { data, error } = await getPublicBrand(id)
      if (error || !data) { setNotFound(true) }
      else { setBrand(data) }
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (notFound) return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center gap-4 text-white">
      <p className="text-white/40 text-sm">Brand not found or no longer public.</p>
      <Link to="/" className="text-orange-400 text-xs hover:underline">← Back to FORGE</Link>
    </div>
  )

  const signal = brand.signal_results?.[0]
  const craft = brand.craft_results?.[0]
  const readiness = brand.launch_readiness || 0
  const readinessColor = readiness >= 75 ? '#22c55e' : readiness >= 40 ? '#f97316' : '#ef4444'

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* FORGE badge */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <span className="text-orange-500 font-black text-lg tracking-tight">FORGE</span>
            <span className="text-white/20 text-xs uppercase tracking-widest">Brand Blueprint</span>
          </div>
          <Link
            to="/signup"
            className="text-xs px-3 py-1.5 rounded-lg border border-orange-500/30 text-orange-400 hover:bg-orange-500/10 transition-all uppercase tracking-widest font-bold"
          >
            Build yours free →
          </Link>
        </div>

        {/* Hero */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-2 py-1 rounded border border-white/10 bg-white/5 text-white/40 text-[10px] uppercase tracking-widest mb-4">
            {brand.industry || 'Brand'}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-3">{brand.name}</h1>
          {craft?.selected_tagline && (
            <p className="text-lg text-white/50 italic">"{craft.selected_tagline}"</p>
          )}
        </div>

        {/* Stats row */}
        {signal && (
          <div className="grid grid-cols-3 gap-3 mb-10">
            {[
              { label: 'Demand Score', value: signal.demand_score ? `${signal.demand_score}%` : '—' },
              { label: 'Competition', value: signal.competition_level || '—' },
              { label: 'Launch Readiness', value: `${readiness}%` },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                <p className="text-xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-[10px] text-white/30 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Readiness bar */}
        <div className="mb-10 p-5 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-white/40 uppercase tracking-widest">Launch Readiness</span>
            <span className="text-xs font-bold" style={{ color: readinessColor }}>{readiness}%</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${readiness}%`, backgroundColor: readinessColor }}
            />
          </div>
        </div>

        {/* Color palette */}
        {craft?.color_palette?.length > 0 && (
          <div className="mb-10">
            <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Brand Palette</p>
            <div className="flex gap-3">
              {craft.color_palette.map((c: any, i: number) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div
                    className="w-12 h-12 rounded-xl border border-white/10"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-[9px] text-white/30 font-mono">{c.hex}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Market opportunity */}
        {signal?.market_gap && (
          <div className="mb-10 p-5 rounded-xl bg-white/[0.02] border border-white/5">
            <p className="text-xs text-white/30 uppercase tracking-widest mb-2">Market Opportunity</p>
            <p className="text-sm text-white/70 leading-relaxed">{signal.market_gap}</p>
          </div>
        )}

        {/* Brand idea */}
        <div className="mb-10 p-5 rounded-xl bg-white/[0.02] border border-white/5">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-2">The Idea</p>
          <p className="text-sm text-white/70 leading-relaxed">{brand.idea}</p>
        </div>

        {/* CTA footer */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm font-bold text-white">Built with FORGE AI</p>
            <p className="text-xs text-white/30 mt-1">Turn your idea into a full brand blueprint in minutes.</p>
          </div>
          <Link
            to="/signup"
            className="px-6 py-3 bg-orange-500 hover:bg-orange-400 text-black font-bold rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg shadow-orange-500/20 shrink-0"
          >
            Build yours free →
          </Link>
        </div>

      </div>
    </div>
  )
}
