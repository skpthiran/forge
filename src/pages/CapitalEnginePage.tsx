import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, BarChart3, Calculator, TrendingUp, AlertTriangle } from 'lucide-react';

export default function CapitalEnginePage() {
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
        <Button className="bg-white text-black hover:bg-gray-200 uppercase tracking-widest text-xs font-bold px-6">
          Update Metrics
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         <Card className="p-5 bg-black/50 border-white/10">
            <div className="text-[10px] uppercase text-muted-foreground font-mono mb-2">Est. Launch Budget</div>
            <div className="text-3xl font-light text-white">$2,500</div>
         </Card>
         <Card className="p-5 bg-black/50 border-white/10">
            <div className="text-[10px] uppercase text-muted-foreground font-mono mb-2">Target GMV (Drop 01)</div>
            <div className="text-3xl font-light text-white">$9,900</div>
         </Card>
         <Card className="p-5 bg-black/50 border-white/10">
            <div className="text-[10px] uppercase text-muted-foreground font-mono mb-2">Break-Even Units</div>
            <div className="text-3xl font-light text-white">220</div>
         </Card>
         <Card className="p-5 bg-black/50 border-primary/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5" />
            <div className="text-[10px] uppercase text-primary font-mono mb-2 relative z-10">Growth Readiness</div>
            <div className="text-3xl font-light text-primary relative z-10">72<span className="text-lg text-primary/50">/100</span></div>
         </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <Card className="p-8 bg-black border-white/10">
            <h3 className="text-sm font-heading tracking-widest uppercase text-muted-foreground mb-6 flex items-center gap-2"><Calculator className="w-4 h-4" /> Pricing Optimizer</h3>
            
            <div className="space-y-6">
               <div className="p-5 rounded-lg border border-white/5 bg-white/[0.02]">
                  <div className="flex justify-between items-center mb-4">
                     <h4 className="font-medium text-white">Heavyweight Pump Cover</h4>
                     <span className="text-xs text-primary font-mono uppercase bg-primary/10 px-2 py-1 rounded">Hero Product</span>
                  </div>
                  
                  <div className="space-y-3">
                     <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-sm text-white/50">Landed Cost (Unit + Ship)</span>
                        <span className="text-sm font-mono">$18.00</span>
                     </div>
                     <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-sm text-white/50">Suggested Retail Price</span>
                        <span className="text-lg text-white font-mono">$45.00</span>
                     </div>
                     <div className="flex justify-between items-center pt-1">
                        <span className="text-sm text-white/80 font-medium">Gross Margin</span>
                        <span className="text-lg font-mono text-green-400">60%</span>
                     </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded text-xs text-blue-200">
                     <span className="font-bold">AI Note:</span> Competitors average $35-$40. Pricing at $45 creates a Veblen effect and justifies the 'premium unmarked' positioning.
                  </div>
               </div>

               <div className="p-5 rounded-lg border border-white/5 bg-white/[0.02] opacity-70">
                  <div className="flex justify-between items-center mb-4">
                     <h4 className="font-medium text-white">5-Inch Core Shorts</h4>
                  </div>
                  <div className="space-y-3">
                     <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-sm text-white/50">Landed Cost</span>
                        <span className="text-sm font-mono">$22.00</span>
                     </div>
                     <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-sm text-white/50">Retail Price</span>
                        <span className="text-lg font-mono">$55.00</span>
                     </div>
                  </div>
               </div>
            </div>
         </Card>

         <div className="space-y-8">
            <Card className="p-8 bg-gradient-to-b from-[#0a0a0a] to-[#050505] border-white/10">
               <h3 className="text-sm font-heading tracking-widest uppercase text-muted-foreground mb-6 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-orange-400" /> Risk Warnings</h3>
               <div className="space-y-4">
                  <div className="flex gap-4 items-start p-4 bg-orange-500/5 rounded-lg border border-orange-500/10">
                     <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0 animate-pulse" />
                     <div>
                        <h4 className="text-sm text-white font-medium mb-1">Inventory Capital Trap</h4>
                        <p className="text-xs text-white/70 leading-relaxed">Ordering full size runs (S-XXL) evenly will trap $800 in slow-moving stock. Weight your initial buy 60% towards M and L based on your target demographic.</p>
                     </div>
                  </div>
                  <div className="flex gap-4 items-start p-4 bg-white/5 rounded-lg border border-white/5">
                     <div className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2 shrink-0" />
                     <div>
                        <h4 className="text-sm text-white font-medium mb-1">Customer Acquisition Cost</h4>
                        <p className="text-xs text-white/70 leading-relaxed">At $45 retail, you only have $27 of gross margin. Meta Ads CAC for new apparel brands is currently ~$32. You MUST rely on organic TikTok/Reels for Drop 01 profitability.</p>
                     </div>
                  </div>
               </div>
            </Card>

            <Card className="p-8 bg-black border-white/10">
               <h3 className="text-sm font-heading tracking-widest uppercase text-muted-foreground mb-6 flex items-center gap-2"><BarChart3 className="w-4 h-4" /> Revenue Projection (Drop 01)</h3>
               <div className="h-32 flex items-end justify-between border-b border-white/10 pb-2 mb-2 px-2">
                 {/* Mock Chart */}
                 <div className="w-1/6 bg-white/5 h-[10%] rounded-t-sm" />
                 <div className="w-1/6 bg-white/10 h-[25%] rounded-t-sm" />
                 <div className="w-1/6 bg-white/20 h-[50%] rounded-t-sm" />
                 <div className="w-1/6 bg-primary/40 h-[85%] rounded-t-sm" />
                 <div className="w-1/6 bg-primary h-[100%] rounded-t-sm custom-glow" />
               </div>
               <div className="flex justify-between text-[10px] text-white/50 font-mono px-2 uppercase">
                  <span>Day 1</span>
                  <span>Day 3</span>
                  <span>Day 5</span>
                  <span>Day 7</span>
                  <span>Day 14</span>
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}
