import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Send, Megaphone, Smartphone, AtSign, Calendar, MessageSquare, Target, Mail, LayoutTemplate, Layers, Loader2 } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { runReachEngine, ReachResult } from '../services/gemini'

export default function ReachEnginePage() {
  const [brandName, setBrandName] = useState('')
  const [industry, setIndustry] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const [brandVoice, setBrandVoice] = useState('')
  const [marketGap, setMarketGap] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ReachResult | null>(null)
  const [error, setError] = useState('')

  const handleRun = async () => {
    if (!brandName || !industry) return
    setLoading(true)
    setError('')
    try {
      const data = await runReachEngine(brandName, industry, targetAudience, brandVoice, marketGap)
      setResult(data)
    } catch (e) {
      setError('AI generation failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] uppercase tracking-wider mb-3">
            <Megaphone className="w-3 h-3" /> Growth AI
          </div>
          <h1 className="text-3xl lg:text-4xl font-heading font-medium tracking-tight mb-2">Reach Engine</h1>
          <p className="text-muted-foreground">Growth & Marketing AI: Ad angles, content hooks, and campaigns.</p>
        </div>
      </div>

      {!result ? (
        <Card className="p-8 bg-black border-white/10 max-w-2xl">
          <h2 className="text-lg font-heading font-medium mb-6">Brand Details</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-2 block">Brand Name</label>
              <Input value={brandName} onChange={e => setBrandName(e.target.value)} placeholder="e.g. IronBloom" className="bg-zinc-900 border-white/10" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-2 block">Industry</label>
              <Input value={industry} onChange={e => setIndustry(e.target.value)} placeholder="e.g. Gymwear / Fitness" className="bg-zinc-900 border-white/10" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-2 block">Target Audience</label>
              <Input value={targetAudience} onChange={e => setTargetAudience(e.target.value)} placeholder="e.g. Men 18-30 who train seriously" className="bg-zinc-900 border-white/10" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-2 block">Brand Voice (optional)</label>
              <Input value={brandVoice} onChange={e => setBrandVoice(e.target.value)} placeholder="e.g. Bold, minimal, no-nonsense" className="bg-zinc-900 border-white/10" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-2 block">Market Opportunity (optional)</label>
              <Textarea value={marketGap} onChange={e => setMarketGap(e.target.value)} placeholder="Paste market gap from Signal Engine..." className="bg-zinc-900 border-white/10 resize-none" rows={3} />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button onClick={handleRun} disabled={loading || !brandName || !industry} className="w-full bg-primary hover:bg-orange-600 text-white uppercase tracking-widest text-xs font-bold h-11">
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating Campaign...</> : 'Generate Campaign'}
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-1 space-y-6">
            <Card className="p-6 bg-black border-white/10">
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-mono flex items-center gap-2"><Send className="w-4 h-4"/> Active Campaigns</h3>
              <div className="space-y-3">
                {result.campaigns.map((camp, i) => (
                  <div key={i} className="p-4 rounded-lg bg-[#050505] border border-white/5 hover:border-white/20 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border ${camp.status === 'Ready' ? 'text-blue-400 border-blue-400/30 bg-blue-400/10' : 'text-orange-400 border-orange-400/30 bg-orange-400/10'}`}>{camp.status}</span>
                      <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">{camp.type}</span>
                    </div>
                    <h4 className="text-sm font-medium text-white/80 mt-2">{camp.title}</h4>
                  </div>
                ))}
              </div>
            </Card>
            <Button variant="outline" className="w-full border-white/10 text-white/60 hover:text-white text-xs" onClick={() => setResult(null)}>Run Again</Button>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <Card className="p-0 bg-black/50 border-white/10 h-full flex flex-col backdrop-blur-sm overflow-hidden">
              <Tabs defaultValue="social" className="flex flex-col h-full w-full">
                <div className="p-6 border-b border-white/10 bg-[#050505]">
                  <h3 className="text-xl font-heading font-medium mb-4 text-white">Content Generator</h3>
                  <TabsList className="bg-black border border-white/10 h-10 w-fit">
                    <TabsTrigger value="social" className="uppercase tracking-widest text-[10px] py-2 px-4 font-bold"><Smartphone className="w-3 h-3 mr-2"/> Social Hooks</TabsTrigger>
                    <TabsTrigger value="ads" className="uppercase tracking-widest text-[10px] py-2 px-4 font-bold"><Target className="w-3 h-3 mr-2"/> Ad Angles</TabsTrigger>
                    <TabsTrigger value="email" className="uppercase tracking-widest text-[10px] py-2 px-4 font-bold"><Mail className="w-3 h-3 mr-2"/> Email Flow</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="social" className="flex-1 p-6 outline-none m-0">
                  <div className="space-y-4">
                    {result.social_hooks.map((hook, i) => (
                      <div key={i} className="flex gap-4 p-5 rounded-xl border border-white/5 bg-[#050505] group hover:border-primary/50 transition-colors">
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 text-primary font-mono text-xs">{i + 1}</div>
                        <div className="flex-1">
                          <p className="text-white/90 font-medium text-lg mb-3">"{hook.hook}"</p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-[10px] text-white/50 border-white/10 bg-black font-normal rounded-sm">Visual: {hook.visual}</Badge>
                            <Badge variant="outline" className="text-[10px] text-white/50 border-white/10 bg-black font-normal rounded-sm">Audio: {hook.audio}</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="ads" className="flex-1 p-6 outline-none m-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {result.ad_angles.map((ad, i) => (
                      <div key={i} className="p-5 rounded-xl border border-white/5 bg-[#050505] hover:border-primary/50 transition-all flex flex-col">
                        <div className="flex justify-between items-start mb-4 gap-2">
                          <Badge variant="outline" className="text-[9px] uppercase border-white/10 text-white/60 bg-black/50">{ad.type}</Badge>
                          <span className="text-[10px] text-primary uppercase font-mono border border-primary/20 px-1.5 py-0.5 rounded bg-primary/10">{ad.tag}</span>
                        </div>
                        <h4 className="text-lg font-heading font-medium text-white mb-2">{ad.title}</h4>
                        <p className="text-sm text-white/60 mb-6 leading-relaxed flex-grow">"{ad.copy}"</p>
                        <div className="mt-auto px-3 py-2 border border-white/10 rounded-md bg-white/5 text-xs text-white/80 font-mono text-center">→ {ad.cta}</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="email" className="flex-1 p-6 outline-none m-0">
                  <div className="space-y-4">
                    {result.email_sequence.map((email, i) => (
                      <div key={i} className="flex items-start group">
                        <div className="flex items-center justify-center w-12 h-12 rounded bg-black border border-white/20 shrink-0 z-10 group-hover:border-primary transition-colors">
                          <span className="font-mono text-sm text-white/80 group-hover:text-primary">E{email.step}</span>
                        </div>
                        <div className="ml-6 w-full p-5 rounded-xl border border-white/5 bg-[#050505] group-hover:border-white/10 transition-colors">
                          <div className="flex items-center justify-between mb-3">
                            <h5 className="text-base font-medium text-white/90">{email.name}</h5>
                            <span className="text-[10px] uppercase font-mono text-primary">Goal: {email.goal}</span>
                          </div>
                          <div className="space-y-2 mb-4 bg-black/50 p-3 rounded-lg border border-white/5">
                            <div className="grid grid-cols-[60px_1fr] gap-2">
                              <span className="text-[10px] uppercase text-white/40 font-mono text-right">Subject</span>
                              <span className="text-sm text-white/90">"{email.subject}"</span>
                            </div>
                            <div className="grid grid-cols-[60px_1fr] gap-2">
                              <span className="text-[10px] uppercase text-white/40 font-mono text-right">Preview</span>
                              <span className="text-xs text-white/60">{email.preview}</span>
                            </div>
                          </div>
                          <span className="text-xs text-white/40 font-mono bg-white/5 px-2 py-1 rounded">CTA: {email.cta}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
