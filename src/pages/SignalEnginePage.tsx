import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, TrendingUp, AlertCircle, Activity, Globe, Zap, LineChart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function SignalEnginePage() {
  const [market, setMarket] = useState('US / EU');

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
             <button onClick={() => setMarket('Global')} className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded ${market === 'Global' ? 'bg-white/10 text-white' : 'text-muted-foreground hover:text-white'}`}>Global</button>
             <button onClick={() => setMarket('US / EU')} className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded ${market === 'US / EU' ? 'bg-primary text-white shadow-[0_0_10px_rgba(249,115,22,0.3)]' : 'text-muted-foreground hover:text-white'}`}>US / EU</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="p-6 bg-black border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Target className="w-24 h-24 text-green-500" />
            </div>
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-mono relative z-10">Demand Score</h3>
            <div className="flex items-baseline gap-2 relative z-10">
               <span className="text-5xl font-light text-green-400">84</span>
               <span className="text-muted-foreground">/100</span>
            </div>
            <p className="text-sm mt-4 text-white/80 relative z-10">Strong search intent for "minimalist heavyweight gym shirts" over past 90 days.</p>
         </Card>
         <Card className="p-6 bg-black border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap className="w-24 h-24 text-orange-500" />
            </div>
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-mono relative z-10">Competition Level</h3>
            <div className="flex items-baseline gap-2 relative z-10">
               <span className="text-5xl font-light text-orange-400">High</span>
            </div>
            <p className="text-sm mt-4 text-white/80 relative z-10">Saturated with dropshippers. Lacking authentic, brand-first luxury players.</p>
         </Card>
         <Card className="p-6 bg-black border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Globe className="w-24 h-24 text-blue-500" />
            </div>
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-mono relative z-10">Audience Heat</h3>
            <div className="flex items-baseline gap-2 relative z-10">
               <span className="text-5xl font-light text-blue-400">Rising</span>
            </div>
            <p className="text-sm mt-4 text-white/80 relative z-10">Strong among disciplined male lifters, ages 18–28 in urban areas.</p>
         </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-1 border-r border-white/10 pr-8 space-y-8">
           <div>
              <h3 className="text-sm font-heading tracking-widest uppercase text-muted-foreground mb-6 flex items-center gap-2"><LineChart className="w-4 h-4"/> AI Insight Feed</h3>
              <div className="space-y-4">
                 {[
                   { type: 'trend', text: "Oversized pump covers are rising across fitness creator content." },
                   { type: 'insight', text: "Young male lifters prefer low-logo, premium-feel gymwear." },
                   { type: 'alert', text: "Budget activewear reviews show repeated complaints about shrinking and weak fabric." },
                   { type: 'insight', text: "Local brands have weak emotional positioning and generic product pages." }
                 ].map((feed, i) => (
                   <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                     <Badge variant="outline" className={`mb-2 text-[9px] uppercase tracking-wider ${
                        feed.type === 'trend' ? 'text-blue-400 border-blue-400/30' : 
                        feed.type === 'alert' ? 'text-orange-400 border-orange-400/30' : 
                        'text-green-400 border-green-400/30'
                     }`}>{feed.type}</Badge>
                     <p className="text-sm leading-relaxed text-white/90">{feed.text}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="col-span-2 space-y-8 pl-0 lg:pl-4">
           <Card className="p-8 bg-black/50 border-white/10 backdrop-blur-sm shadow-[0_0_40px_rgba(0,0,0,0.5)]">
               <h3 className="text-sm font-heading tracking-widest uppercase text-muted-foreground mb-6">Market Gap Analysis</h3>
               <div className="p-6 rounded-xl bg-orange-500/5 border border-orange-500/20 mb-8">
                  <h4 className="text-orange-400 font-medium mb-2">The Primary Opportunity</h4>
                  <p className="text-lg font-light leading-relaxed text-white/90">
                    Minimal premium gymwear with authentic, serious identity and strong storytelling. There is a "stealth wealth" trend emerging in fitness apparel that mainstream brands are too loud to capture.
                  </p>
               </div>

               <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-mono">Competitor Mapping</h4>
               <div className="space-y-4 mb-8">
                  <div className="grid grid-cols-12 gap-4 items-center text-xs text-muted-foreground pb-2 border-b border-white/10">
                     <div className="col-span-4">Category</div>
                     <div className="col-span-3">Price Pt</div>
                     <div className="col-span-5">Weakness Detected</div>
                  </div>
                  {[
                    { cat: "Mainstream Giants (Nike/UA)", price: "$$$", weak: "Too generic, loud logos, no tribe feel." },
                    { cat: "Influencer Brands", price: "$$-$$$", weak: "Often low quality, relies on founder personality." },
                    { cat: "Amazon Budget", price: "$", weak: "Terrible fit, shrinks instantly, no brand equity." }
                  ].map((comp, i) => (
                    <div key={i} className="grid grid-cols-12 gap-4 items-center py-2">
                       <div className="col-span-4 text-sm font-medium">{comp.cat}</div>
                       <div className="col-span-3 text-sm font-mono text-muted-foreground">{comp.price}</div>
                       <div className="col-span-5 text-sm text-white/70">{comp.weak}</div>
                    </div>
                  ))}
               </div>
           </Card>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-[#050505] border-white/10">
                 <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-mono">Audience Pain Points</h3>
                 <ul className="space-y-3">
                    <li className="flex gap-3"><AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /><span className="text-sm text-white/80">Shirts shrink vertically after one wash.</span></li>
                    <li className="flex gap-3"><AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /><span className="text-sm text-white/80">Logos crack and peel within months.</span></li>
                    <li className="flex gap-3"><AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /><span className="text-sm text-white/80">Necklines stretch out and look sloppy.</span></li>
                 </ul>
              </Card>
              <Card className="p-6 bg-[#050505] border-white/10 flex flex-col justify-between">
                 <div>
                   <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-mono">Opportunity Window</h3>
                   <div className="text-3xl font-light mb-2">6 - 9 Months</div>
                   <p className="text-sm text-muted-foreground">Optimal time to build audience before major brands adapt to the minimalist trend.</p>
                 </div>
                 <Button className="w-full mt-6 bg-white/5 hover:bg-white/10 text-white border border-white/10">Export Full Report</Button>
              </Card>
           </div>
        </div>
      </div>
    </div>
  );
}
