import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Briefcase, BarChart3, Calculator, AlertTriangle, Loader2 } from 'lucide-react'
import { runCapitalEngine, CapitalResult } from '../services/gemini'

export default function CapitalEnginePage() {
  const [brandName, setBrandName] = useState('')
  const [industry, setIndustry] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const [pricePoint, setPricePoint] = useState('')
  const [productConcepts, setProductConcepts] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CapitalResult | null>(null)
  const [error, setError] = useState('')

  const handleRun = async () => {
    if (!brandName || !industry) return
    setLoading(true)
    setError('')
    try {
      const data = await runCapitalEngine(brandName, industry, targetAudience, pricePoint, productConcepts)
      setResult(data)
    } catch (e) {
      setError('AI generation failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const maxRevenue = result ? Math.max(...result.revenue_projection.map(r => r.amount)) : 0

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex justify-between items-end border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[10px] uppercase tracking-wider mb-3">
            <Briefcase className="w-3 h-3" /> CFO Copilot
          </div>
          <h1 className="text-3xl lg:text-4xl font-heading font-medium tracking-tight mb-2">Capital Engine</h1>
          <p className="text-muted-foreground">Finance & Operations AI: Margins, inventory, and forecasting.</p>
        </div>
      </div>

      {!result ? (
        <Card className="p-8 bg-black border-white/10 max-w-2xl">
          <h2 className="text-lg font-heading font-medium mb-6">Brand Details</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-2 block">Brand Name</label>
              <Input value={brandName} onChange={e => setBrandName(e.target.value)} placeholder="e.g. Pura Vita" className="bg-zinc-900 border-white/10" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-2 block">Industry</label>
              <Input value={industry} onChange={e => setIndustry(e.target.value)} placeholder="e.g. Skincare" className="bg-zinc-900 border-white/10" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-2 block">Target Audience</label>
              <Input value={targetAudience} onChange={e => setTargetAudience(e.target.value)} placeholder="e.g. Women 25-40" className="bg-zinc-900 border-white/10" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-2 block">Price Point</label>
              <Input value={pricePoint} onChange={e => setPricePoint(e.target.value)} placeholder="e.g. $40-$120 premium" className="bg-zinc-900 border-white/10" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-2 block">Products (optional)</label>
              <Textarea value={productConcepts} onChange={e => setProductConcepts(e.target.value)} placeholder="e.g. Vitamin C serum, Retinol cream, Cleanser..." className="bg-zinc-900 border-white/10 resize-none" rows={3} />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button onClick={handleRun} disabled={loading || !brandName || !industry} className="w-full bg-primary hover:bg-orange-600 text-white uppercase tracking-widest text-xs font-bold h-11">
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Modeling Finances...</> : 'Run Capital Analysis'}
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-5 bg-black/50 border-white/10">
              <div className="text-[10px] uppercase text-muted-foreground font-mono mb-2">Est. Launch Budget</div>
              <div className="text-3xl font-light text-white">${result.launch_budget.toLocaleString()}</div>
            </Card>
            <Card className="p-5 bg-black/50 border-white/10">
              <div className="text-[10px] uppercase text-muted-foreground font-mono mb-2">Target GMV</div>
              <div className="text-3xl font-light text-white">${result.target_gmv.toLocaleString()}</div>
            </Card>
            <Card className="p-5 bg-black/50 border-white/10">
              <div className="text-[10px] uppercase text-muted-foreground font-mono mb-2">Break-Even Units</div>
              <div className="text-3xl font-light text-white">{result.break_even_units}</div>
            </Card>
            <Card className="p-5 bg-black/50 border-primary/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5" />
              <div className="text-[10px] uppercase text-primary font-mono mb-2 relative z-10">Growth Readiness</div>
              <div className="text-3xl font-light text-primary relative z-10">{result.growth_readiness}<span className="text-lg text-primary/50">/100</span></div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-8 bg-black border-white/10">
              <h3 className="text-sm font-heading tracking-widest uppercase text-muted-foreground mb-6 flex items-center gap-2"><Calculator className="w-4 h-4" /> Pricing Optimizer</h3>
              <div className="space-y-4">
                {result.products.map((product, i) => (
                  <div key={i} className="p-5 rounded-lg border border-white/5 bg-white/[0.02]">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium text-white">{product.name}</h4>
                      {i === 0 && <span className="text-xs text-primary font-mono uppercase bg-primary/10 px-2 py-1 rounded">Hero Product</span>}
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-sm text-white/50">Landed Cost</span>
                        <span className="text-sm font-mono">${product.landed_cost}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-sm text-white/50">Retail Price</span>
                        <span className="text-lg text-white font-mono">${product.retail_price}</span>
                      </div>
                      <div className="flex justify-between items-center pt-1">
                        <span className="text-sm text-white/80 font-medium">Gross Margin</span>
                        <span className="text-lg font-mono text-green-400">{product.margin}%</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded text-xs text-blue-200">
                      <span className="font-bold">AI Note:</span> {product.note}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="space-y-8">
              <Card className="p-8 bg-black border-white/10">
                <h3 className="text-sm font-heading tracking-widest uppercase text-muted-foreground mb-6 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-orange-400" /> Risk Warnings</h3>
                <div className="space-y-4">
                  {result.risk_warnings.map((risk, i) => (
                    <div key={i} className={`flex gap-4 items-start p-4 rounded-lg border ${risk.severity === 'high' ? 'bg-orange-500/5 border-orange-500/10' : 'bg-white/5 border-white/5'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${risk.severity === 'high' ? 'bg-orange-500 animate-pulse' : 'bg-white/30'}`} />
                      <div>
                        <h4 className="text-sm text-white font-medium mb-1">{risk.title}</h4>
                        <p className="text-xs text-white/70 leading-relaxed">{risk.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-8 bg-black border-white/10">
                <h3 className="text-sm font-heading tracking-widest uppercase text-muted-foreground mb-6 flex items-center gap-2"><BarChart3 className="w-4 h-4" /> Revenue Projection</h3>
                <div className="h-32 flex items-end justify-between border-b border-white/10 pb-2 mb-2 px-2 gap-2">
                  {result.revenue_projection.map((point, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full rounded-t-sm bg-primary/60 hover:bg-primary transition-colors" style={{ height: `${(point.amount / maxRevenue) * 100}%`, minHeight: '4px' }} title={`$${point.amount.toLocaleString()}`} />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-white/50 font-mono px-2 uppercase">
                  {result.revenue_projection.map((point, i) => <span key={i}>{point.day}</span>)}
                </div>
              </Card>

              <Button variant="outline" className="w-full border-white/10 text-white/60 hover:text-white text-xs" onClick={() => setResult(null)}>Run Again</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
