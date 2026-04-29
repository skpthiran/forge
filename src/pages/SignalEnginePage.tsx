import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Target, TrendingUp, AlertCircle, Activity, Globe, Zap, LineChart, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { runSignalEngine, SignalResult } from '../services/gemini';
import { toast } from 'sonner';

export default function SignalEnginePage() {
  const [market, setMarket] = useState('Global');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [result, setResult] = useState<SignalResult | null>(null);

  // Form State
  const [idea, setIdea] = useState('');
  const [industry, setIndustry] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [pricePoint, setPricePoint] = useState('');

  const handleRunAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea || !industry) {
      toast.error('Please describe your idea and industry.');
      return;
    }

    setIsAnalyzing(true);
    setHasResult(false);
    
    try {
      const data = await runSignalEngine(idea, industry, targetAudience, pricePoint, market);
      setResult(data);
      setHasResult(true);
    } catch (err: any) {
      console.error(err);
      toast.error('Analysis failed: ' + (err.message || 'Unknown error'));
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] uppercase tracking-wider mb-3">
            <Activity className="w-3 h-3" /> Live Intel
          </div>
          <h1 className="text-3xl lg:text-4xl font-heading font-medium tracking-tight mb-2">Signal Engine</h1>
          <p className="text-muted-foreground">Market Intelligence AI: Trends, competitors, and product opportunities.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex bg-black/50 border border-white/10 rounded-md p-1">
             <button onClick={() => setMarket('Global')} className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded transition-all ${market === 'Global' ? 'bg-primary text-white shadow-[0_0_10px_rgba(249,115,22,0.3)]' : 'text-muted-foreground hover:text-white'}`}>Global</button>
             <button onClick={() => setMarket('US / EU')} className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded transition-all ${market === 'US / EU' ? 'bg-primary text-white shadow-[0_0_10px_rgba(249,115,22,0.3)]' : 'text-muted-foreground hover:text-white'}`}>US / EU</button>
          </div>
        </div>
      </div>

      {/* Input Form */}
      <Card className="p-8 border-white/10 bg-black shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
        <form onSubmit={handleRunAnalysis} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">The Vision</label>
            <Textarea 
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Describe your product or brand idea in detail..." 
              className="min-h-[100px] bg-white/5 border-white/10 text-lg focus-visible:ring-blue-500/50"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="space-y-2">
               <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Industry</label>
               <Input value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="e.g. SaaS, Fashion" className="bg-white/5 border-white/10" required />
             </div>
             <div className="space-y-2">
               <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Target Audience</label>
               <Input value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} placeholder="e.g. Gen Z lifters" className="bg-white/5 border-white/10" />
             </div>
             <div className="space-y-2">
               <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Price Point</label>
               <Input value={pricePoint} onChange={(e) => setPricePoint(e.target.value)} placeholder="e.g. $50-$100" className="bg-white/5 border-white/10" />
             </div>
          </div>

          <Button 
            disabled={isAnalyzing}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white uppercase tracking-widest font-bold text-xs"
          >
            {isAnalyzing ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing Signals...</> : "Run Signal Analysis"}
          </Button>
        </form>
      </Card>

      {(isAnalyzing || hasResult) && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-black border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Target className="w-24 h-24 text-green-500" />
                </div>
                <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-mono relative z-10">Demand Score</h3>
                <div className="flex items-baseline gap-2 relative z-10">
                  {isAnalyzing ? (
                    <div className="h-12 w-20 bg-white/5 animate-pulse rounded" />
                  ) : (
                    <>
                      <span className="text-5xl font-light text-green-400">{result?.demand_score}</span>
                      <span className="text-muted-foreground">/100</span>
                    </>
                  )}
                </div>
                <p className="text-sm mt-4 text-white/80 relative z-10">
                  {isAnalyzing ? <div className="h-4 w-full bg-white/5 animate-pulse rounded mt-2" /> : "Calculated based on current search intent and social sentiment."}
                </p>
            </Card>
            <Card className="p-6 bg-black border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Zap className="w-24 h-24 text-orange-500" />
                </div>
                <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-mono relative z-10">Competition Level</h3>
                <div className="flex items-baseline gap-2 relative z-10">
                  {isAnalyzing ? (
                    <div className="h-12 w-32 bg-white/5 animate-pulse rounded" />
                  ) : (
                    <span className="text-5xl font-light text-orange-400">{result?.competition_level}</span>
                  )}
                </div>
                <p className="text-sm mt-4 text-white/80 relative z-10">
                  {isAnalyzing ? <div className="h-4 w-full bg-white/5 animate-pulse rounded mt-2" /> : "Market saturation analysis vs. brand-first opportunities."}
                </p>
            </Card>
            <Card className="p-6 bg-black border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Globe className="w-24 h-24 text-blue-500" />
                </div>
                <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-mono relative z-10">Audience Heat</h3>
                <div className="flex items-baseline gap-2 relative z-10">
                  {isAnalyzing ? (
                    <div className="h-12 w-32 bg-white/5 animate-pulse rounded" />
                  ) : (
                    <span className="text-5xl font-light text-blue-400">{result?.audience_heat}</span>
                  )}
                </div>
                <p className="text-sm mt-4 text-white/80 relative z-10">
                  {isAnalyzing ? <div className="h-4 w-full bg-white/5 animate-pulse rounded mt-2" /> : "Engagement levels within the primary target demographic."}
                </p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-1 border-r border-white/10 pr-8 space-y-8">
              <div>
                  <h3 className="text-sm font-heading tracking-widest uppercase text-muted-foreground mb-6 flex items-center gap-2"><LineChart className="w-4 h-4"/> AI Insight Feed</h3>
                  <div className="space-y-4">
                    {isAnalyzing ? (
                      [1,2,3,4].map(i => <div key={i} className="h-24 w-full bg-white/5 animate-pulse rounded-xl" />)
                    ) : (
                      result?.insights.map((feed, i) => (
                        <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                          <Badge variant="outline" className={`mb-2 text-[9px] uppercase tracking-wider ${
                            feed.type === 'trend' ? 'text-blue-400 border-blue-400/30' : 
                            feed.type === 'alert' ? 'text-orange-400 border-orange-400/30' : 
                            'text-green-400 border-green-400/30'
                          }`}>{feed.type}</Badge>
                          <p className="text-sm leading-relaxed text-white/90">{feed.text}</p>
                        </div>
                      ))
                    )}
                  </div>
              </div>
            </div>

            <div className="col-span-2 space-y-8 pl-0 lg:pl-4">
              <Card className="p-8 bg-black/50 border-white/10 backdrop-blur-sm shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                  <h3 className="text-sm font-heading tracking-widest uppercase text-muted-foreground mb-6">Market Gap Analysis</h3>
                  <div className="p-6 rounded-xl bg-orange-500/5 border border-orange-500/20 mb-8">
                      <h4 className="text-orange-400 font-medium mb-2">The Primary Opportunity</h4>
                      {isAnalyzing ? (
                        <div className="h-20 w-full bg-white/5 animate-pulse rounded" />
                      ) : (
                        <p className="text-lg font-light leading-relaxed text-white/90">
                          {result?.market_gap}
                        </p>
                      )}
                  </div>

                  <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-mono">Competitor Mapping</h4>
                  <div className="space-y-4 mb-8">
                      <div className="grid grid-cols-12 gap-4 items-center text-xs text-muted-foreground pb-2 border-b border-white/10">
                        <div className="col-span-4">Category</div>
                        <div className="col-span-3">Price Pt</div>
                        <div className="col-span-5">Weakness Detected</div>
                      </div>
                      {isAnalyzing ? (
                        [1,2,3].map(i => <div key={i} className="h-10 w-full bg-white/5 animate-pulse rounded" />)
                      ) : (
                        result?.competitor_map.map((comp, i) => (
                          <div key={i} className="grid grid-cols-12 gap-4 items-center py-2">
                            <div className="col-span-4 text-sm font-medium">{comp.cat}</div>
                            <div className="col-span-3 text-sm font-mono text-muted-foreground">{comp.price}</div>
                            <div className="col-span-5 text-sm text-white/70">{comp.weak}</div>
                          </div>
                        ))
                      )}
                  </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6 bg-[#050505] border-white/10">
                    <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-mono">Audience Pain Points</h3>
                    <ul className="space-y-3">
                        {isAnalyzing ? (
                          [1,2,3].map(i => <div key={i} className="h-6 w-full bg-white/5 animate-pulse rounded" />)
                        ) : (
                          result?.pain_points.map((pt, i) => (
                            <li key={i} className="flex gap-3"><AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /><span className="text-sm text-white/80">{pt}</span></li>
                          ))
                        )}
                    </ul>
                  </Card>
                  <Card className="p-6 bg-[#050505] border-white/10 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-mono">Opportunity Window</h3>
                      {isAnalyzing ? (
                        <div className="h-10 w-32 bg-white/5 animate-pulse rounded mb-2" />
                      ) : (
                        <div className="text-3xl font-light mb-2">{result?.opportunity_window}</div>
                      )}
                      <p className="text-sm text-muted-foreground">Optimal timeframe to capture this market gap before trend adaptation.</p>
                    </div>
                    <Button variant="outline" className="w-full mt-6 border-white/10 hover:bg-white/5 text-white">Export Analysis</Button>
                  </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
