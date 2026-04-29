import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette, PenTool, Type, Sparkles, Box, Wand2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function CraftEnginePage() {
  const brandNames = ["IronBloom", "Obsidian Fit", "VLTGE", "AURA Wear", "Monolith Athletics"];
  const taglines = [
    "Built in silence.",
    "Lift like the work matters.",
    "No noise. Just output.",
    "Forged for the disciplined."
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex justify-between items-end border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] uppercase tracking-wider mb-3">
            <Wand2 className="w-3 h-3" /> Identity Forged
          </div>
          <h1 className="text-3xl lg:text-4xl font-heading font-medium tracking-tight mb-2">Craft Engine</h1>
          <p className="text-muted-foreground">Brand & Product Creation AI: Identity, voice, and launch assets.</p>
        </div>
        <Button className="bg-white text-black hover:bg-gray-200 uppercase tracking-widest text-xs font-bold px-6 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          Regenerate Identity
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Brand Core */}
        <div className="space-y-8">
           <Card className="p-8 bg-black/50 border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-sm font-heading tracking-widest uppercase text-muted-foreground flex items-center gap-2"><PenTool className="w-4 h-4" /> Brand Name</h3>
                 <Badge variant="outline" className="border-white/10 text-white/50 text-[9px] uppercase">Selected</Badge>
              </div>
              <h2 className="text-5xl font-heading font-bold mb-6 text-white tracking-tighter">IronBloom.</h2>
              <div className="space-y-2">
                 <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-mono">Alternatives Generated</h4>
                 <div className="flex flex-wrap gap-2">
                    {brandNames.slice(1).map(name => (
                      <div key={name} className="px-3 py-1.5 rounded bg-white/[0.02] border border-white/5 text-sm text-white/70 hover:text-white hover:border-white/20 transition-colors cursor-pointer">{name}</div>
                    ))}
                 </div>
              </div>
           </Card>

           <Card className="p-8 bg-black border-white/10">
              <h3 className="text-sm font-heading tracking-widest uppercase text-muted-foreground mb-6 flex items-center gap-2"><Type className="w-4 h-4" /> Taglines</h3>
              <div className="space-y-4">
                 {taglines.map((tag, i) => (
                   <div key={i} className={`p-4 rounded border ${i === 0 ? 'bg-primary/5 border-primary/30 text-white' : 'bg-white/[0.02] border-white/5 text-white/70 hover:border-white/20 hover:text-white transition-colors cursor-pointer'}`}>
                      <span className="font-medium text-lg">&ldquo;{tag}&rdquo;</span>
                   </div>
                 ))}
              </div>
           </Card>

           <Card className="p-8 bg-gradient-to-br from-[#0c0c0c] to-[#050505] border-white/10">
              <h3 className="text-sm font-heading tracking-widest uppercase text-muted-foreground mb-6 flex items-center gap-2"><Sparkles className="w-4 h-4" /> Voice & Tone</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                 <div className="p-4 rounded-xl border border-white/5 bg-black/50">
                    <div className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-1">Tone</div>
                    <div className="font-medium">Confident, Quiet, Intense</div>
                 </div>
                 <div className="p-4 rounded-xl border border-white/5 bg-black/50">
                    <div className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-1">Vibe</div>
                    <div className="font-medium">Dark Luxury, Cinematic</div>
                 </div>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-black/50">
                 <div className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-2">Write like this:</div>
                 <p className="text-sm leading-relaxed text-white/80 italic border-l-2 border-primary pl-4">
                   "We don't do neon. We don't do loud logos. We build gear for the work nobody sees. Heavyweight fabric, precision seams, and silence."
                 </p>
              </div>
           </Card>
        </div>

        {/* Visual & Product */}
        <div className="space-y-8">
           <Card className="p-8 bg-black border-white/10">
              <h3 className="text-sm font-heading tracking-widest uppercase text-muted-foreground mb-6 flex items-center gap-2"><Palette className="w-4 h-4" /> Visual Identity</h3>
              
              <div className="mb-8">
                 <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">Color Palette</h4>
                 <div className="flex w-full h-20 rounded-lg overflow-hidden border border-white/10">
                    <div className="flex-grow bg-[#050505] flex items-end p-2"><span className="text-[10px] text-white/30 font-mono">#050505</span></div>
                    <div className="w-1/4 bg-[#1C1C1E] flex items-end p-2 border-l border-white/5"><span className="text-[10px] text-white/30 font-mono">#1C1C1E</span></div>
                    <div className="w-1/6 bg-[#F97316] flex items-end p-2 border-l border-black/20"><span className="text-[10px] text-black/50 font-mono">#F97316</span></div>
                 </div>
              </div>

              <div>
                 <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">Typography System</h4>
                 <div className="space-y-4">
                    <div className="p-4 rounded border border-white/5 bg-white/[0.02] flex justify-between items-center">
                       <div>
                         <div className="text-[10px] uppercase text-muted-foreground mb-1">Display / Headers</div>
                         <div className="font-heading text-2xl tracking-tight">Outfit SemiBold</div>
                       </div>
                       <Button variant="ghost" size="sm" className="text-xs border border-white/10">Aa</Button>
                    </div>
                    <div className="p-4 rounded border border-white/5 bg-white/[0.02] flex justify-between items-center">
                       <div>
                         <div className="text-[10px] uppercase text-muted-foreground mb-1">Body / UI</div>
                         <div className="font-sans text-xl">Inter Regular</div>
                       </div>
                       <Button variant="ghost" size="sm" className="text-xs border border-white/10">Aa</Button>
                    </div>
                 </div>
              </div>
           </Card>

           <Card className="p-8 bg-black border-white/10">
              <h3 className="text-sm font-heading tracking-widest uppercase text-muted-foreground mb-6 flex items-center gap-2"><Box className="w-4 h-4" /> Product Concepts</h3>
              <div className="space-y-4">
                 {[
                   { name: "Obsidian Core Pump Cover", desc: "400gsm heavyweight cotton. Boxy drop-shoulder fit. Single tonal embroidered flower on the spine.", price: "$48" },
                   { name: "Void 5-Inch Shorts", desc: "4-way stretch woven fabric. Hidden magnetic zip pockets. Raw edge aesthetic.", price: "$55" },
                   { name: "Foundation Ribbed Tank", desc: "Ultra-stretch ribbed cotton blend. High neck cut. For serious upper body days.", price: "$32" }
                 ].map((prod, i) => (
                   <div key={i} className="p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-primary/30 transition-colors group">
                      <div className="flex justify-between items-start mb-2">
                         <h4 className="font-medium text-white group-hover:text-primary transition-colors">{prod.name}</h4>
                         <span className="text-sm font-mono text-muted-foreground">{prod.price}</span>
                      </div>
                      <p className="text-sm text-white/60 leading-relaxed">{prod.desc}</p>
                   </div>
                 ))}
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
