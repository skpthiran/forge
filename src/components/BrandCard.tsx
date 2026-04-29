import { Link, useNavigate } from 'react-router-dom'
import { Brand } from '../services/supabase'

const ENGINES = [
  { key: 'signal', label: 'Signal', icon: '📡', path: 'signal' },
  { key: 'craft',  label: 'Craft',  icon: '🎨', path: 'craft'  },
  { key: 'reach',  label: 'Reach',  icon: '📣', path: 'reach'  },
  { key: 'pulse',  label: 'Pulse',  icon: '💬', path: 'pulse'  },
  { key: 'capital',label: 'Capital',icon: '💰', path: 'capital'},
]

interface BrandCardProps {
  brand: Brand
  onDelete?: (id: string) => void
}

export default function BrandCard({ brand, onDelete }: BrandCardProps) {
  const navigate = useNavigate()
  const readiness = brand.launch_readiness || 0

  const readinessColor =
    readiness >= 75 ? 'bg-green-500' :
    readiness >= 40 ? 'bg-orange-500' :
    'bg-red-500/60'

  const statusColor =
    brand.status === 'launched' ? 'text-green-400 bg-green-500/10 border-green-500/20' :
    brand.status === 'building' ? 'text-orange-400 bg-orange-500/10 border-orange-500/20' :
    'text-white/40 bg-white/5 border-white/10'

  return (
    <div className="group relative flex flex-col rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300 overflow-hidden">

      {/* Readiness bar — top edge */}
      <div className="h-0.5 w-full bg-white/5">
        <div
          className={`h-full ${readinessColor} transition-all`}
          style={{ width: `${readiness}%` }}
        />
      </div>

      {/* Main content */}
      <div className="p-5 flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <h3 className="font-bold text-white text-base truncate leading-tight">
              {brand.name}
            </h3>
            {brand.industry && (
              <p className="text-xs text-white/30 mt-0.5 truncate">{brand.industry}</p>
            )}
          </div>
          <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full border capitalize ${statusColor}`}>
            {brand.status || 'draft'}
          </span>
        </div>

        {brand.idea && (
          <p className="text-xs text-white/40 leading-relaxed line-clamp-2 mb-4">
            {brand.idea}
          </p>
        )}

        {/* Launch readiness score */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-white/30 uppercase tracking-widest">Launch Readiness</span>
          <span className="text-xs font-bold text-white/60">{readiness}%</span>
        </div>
        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
          <div
            className={`h-full ${readinessColor} rounded-full transition-all`}
            style={{ width: `${readiness}%` }}
          />
        </div>
      </div>

      {/* Quick-run engine buttons */}
      <div className="px-5 pb-3">
        <p className="text-xs text-white/20 uppercase tracking-widest mb-2">Quick run</p>
        <div className="flex gap-1.5">
          {ENGINES.map((engine) => (
            <button
              key={engine.key}
              title={`Run ${engine.label} Engine`}
              onClick={(e) => {
                e.preventDefault()
                navigate(`/project/${brand.id}?tab=${engine.path}`)
              }}
              className="flex-1 flex flex-col items-center gap-1 py-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-orange-500/30 transition-all group/btn"
            >
              <span className="text-sm">{engine.icon}</span>
              <span className="text-[9px] text-white/30 group-hover/btn:text-orange-400 transition-colors uppercase tracking-wide">
                {engine.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-white/[0.03] flex items-center justify-between">
        <span className="text-xs text-white/20">
          {new Date(brand.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
        <div className="flex items-center gap-2">
          {onDelete && (
            <button
              onClick={(e) => {
                e.preventDefault()
                if (confirm(`Delete "${brand.name}"? This cannot be undone.`)) {
                  onDelete(brand.id)
                }
              }}
              className="text-xs text-white/20 hover:text-red-400 transition-colors px-2 py-1 rounded"
            >
              Delete
            </button>
          )}
          <Link
            to={`/project/${brand.id}`}
            className="text-xs text-orange-400 hover:text-orange-300 font-bold uppercase tracking-widest transition-colors"
          >
            Open →
          </Link>
        </div>
      </div>
    </div>
  )
}
