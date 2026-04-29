import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { HeartPulse, MessageCircle, Star, Inbox, Sparkles, Send, Loader2 } from 'lucide-react'
import { runPulseEngine, PulseResult } from '../services/gemini'

export default function PulseEnginePage() {
  const [brandName, setBrandName] = useState('')
  const [industry, setIndustry] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const [productConcepts, setProductConcepts] = useState('')
  const [brandVoice, setBrandVoice] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<PulseResult | null>(null)
  const [error, setError] = useState('')

  const handleRun = async () => {
    if (!brandName || !industry) return
    setLoading(true)
    setError('')
    try {
      const data = await runPulseEngine(brandName, industry, targetAudience, productConcepts, brandVoice)
      setResult(data)
    } catch (e) {
      setError('AI generation failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex justify-between items-end border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] uppercase tracking-wider mb-3">
            <HeartPulse className="w-3 h-3" /> Listening
          </div>
          <h1 className="text-3xl lg:text-4xl font-heading font-medium tracking-tight mb-2">Pulse Engine</h1>
          <p className="text-muted-foreground">Customer Experience AI: Support, loyalty, and feedback.</p>
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
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-2 block">Products (optional)</label>
              <Textarea value={productConcepts} onChange={e => setProductConcepts(e.target.value)} placeholder="e.g. Vitamin C serum $45, Retinol cream $65..." className="bg-zinc-900 border-white/10 resize-none" rows={3} />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-2 block">Brand Voice (optional)</label>
              <Input value={brandVoice} onChange={e => setBrandVoice(e.target.value)} placeholder="e.g. Science-backed, clean, trustworthy" className="bg-zinc-900 border-white/10" />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button onClick={handleRun} disabled={loading || !brandName || !industry} className="w-full bg-primary hover:bg-orange-600 text-white uppercase tracking-widest text-xs font-bold h-11">
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...</> : 'Run Pulse Analysis'}
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6 bg-black border-white/10">
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-mono">Sentiment Score</h3>
              <div className="text-4xl font-light text-green-400 mb-2">{result.sentiment_score}%</div>
              <p className="text-xs text-white/50">AI projected brand sentiment</p>
            </Card>
            <Card className="col-span-3 p-6 bg-black border-white/10">
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-mono">AI Retention Strategy</h3>
              <p className="text-sm text-white/80 leading-relaxed mb-4">"{result.retention_strategy}"</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-2 space-y-6">
              <h2 className="text-lg font-heading font-medium flex items-center gap-2"><Inbox className="w-5 h-5 text-muted-foreground" /> AI Support Inbox</h2>
              <div className="space-y-4">
                {result.support_responses.map((msg, i) => (
                  <Card key={i} className="p-0 bg-[#050505] border-white/10 overflow-hidden">
                    <div className="p-4 border-b border-white/5 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs text-white/50">C</div>
                        <p className="text-sm text-white font-medium">{msg.question}</p>
                      </div>
                    </div>
                    <div className="p-4 bg-black relative">
                      <div className="absolute top-4 left-4">
                        <div className="w-6 h-6 rounded-sm bg-primary/20 flex items-center justify-center border border-primary/30"><Sparkles className="w-3 h-3 text-primary" /></div>
                      </div>
                      <div className="pl-10">
                        <p className="text-xs text-primary uppercase font-mono tracking-widest mb-2">AI Drafted Response</p>
                        <p className="text-sm text-white/80 leading-relaxed mb-4">"{msg.response}"</p>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-white text-black hover:bg-gray-200 text-xs px-4 h-8"><Send className="w-3 h-3 mr-2"/> Send Reply</Button>
                          <Button size="sm" variant="outline" className="border-white/10 text-xs px-4 h-8 bg-transparent">Edit</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="col-span-1 space-y-6">
              <h2 className="text-lg font-heading font-medium flex items-center gap-2"><Star className="w-5 h-5 text-muted-foreground" /> FAQ Builder</h2>
              <Card className="p-6 bg-black border-white/10">
                <div className="space-y-4">
                  {result.faqs.map((faq, i) => (
                    <div key={i} className="pb-4 border-b border-white/5 last:border-0 last:pb-0">
                      <h4 className="text-sm font-medium text-white mb-1">Q: {faq.q}</h4>
                      <p className="text-xs text-white/60">A: {faq.a}</p>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6 bg-white/5 border border-white/10 hover:bg-white/10 text-xs text-white">Export to Website Copy</Button>
              </Card>
              <Button variant="outline" className="w-full border-white/10 text-white/60 hover:text-white text-xs" onClick={() => setResult(null)}>Run Again</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
