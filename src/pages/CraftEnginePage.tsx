import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Palette, PenTool, Type, Sparkles, Box, Wand2, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { runCraftEngine, CraftResult } from '../services/gemini';
import { toast } from 'sonner';

export default function CraftEnginePage() {
  const [isForging, setIsForging] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [result, setResult] = useState<CraftResult | null>(null);
  const [isFormExpanded, setIsFormExpanded] = useState(true);

  // Form State
  const [idea, setIdea] = useState('');
  const [industry, setIndustry] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [pricePoint, setPricePoint] = useState('');

  // Selected State (overrides)
  const [selectedName, setSelectedName] = useState('');
  const [selectedTagline, setSelectedTagline] = useState('');

  const handleForge = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!idea || !industry) {
      toast.error('Please describe your idea and industry.');
      return;
    }

    setIsForging(true);
    
    try {
      const data = await runCraftEngine(idea, industry, targetAudience, pricePoint);
      setResult(data);
      setSelectedName(data.selected_name);
      setSelectedTagline(data.selected_tagline);
      setHasResult(true);
      setIsFormExpanded(false);
      toast.success('Identity forged!');
    } catch (err: any) {
      console.error(err);
      toast.error('Forging failed: ' + (err.message || 'Unknown error'));
    } finally {
      setIsForging(false);
    }
  };

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
        {hasResult && (
          <Button 
            onClick={() => handleForge()} 
            disabled={isForging}
            className="bg-white text-black hover:bg-gray-200 uppercase tracking-widest text-xs font-bold px-6 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            {isForging ? <Loader2 className="w-4 h-4 animate-spin" /> : "Regenerate Identity"}
          </Button>
        )}
      </div>

      {/* Input Form */}
      <Card className="bg-black border-white/10 overflow-hidden">
        <button 
          onClick={() => setIsFormExpanded(!isFormExpanded)}
          className="w-full p-4 flex items-center justify-between text-muted-foreground hover:text-white transition-colors border-b border-white/5"
        >
          <span className="text-xs font-mono uppercase tracking-widest">Brand Parameters</span>
          {isFormExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        
        {isFormExpanded && (
          <div className="p-8 space-y-6 animate-in slide-in-from-top-2 duration-300">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Brand Vision</label>
              <Textarea 
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Describe your brand's core mission and vibe..." 
                className="min-h-[100px] bg-white/5 border-white/10 text-lg focus-visible:ring-purple-500/50"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="space-y-2">
                 <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Industry</label>
                 <Input value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="e.g. Wellness, Gaming" className="bg-white/5 border-white/10" required />
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Target Audience</label>
                 <Input value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} placeholder="e.g. Remote workers" className="bg-white/5 border-white/10" />
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Price Point</label>
                 <Input value={pricePoint} onChange={(e) => setPricePoint(e.target.value)} placeholder="e.g. Mid-range" className="bg-white/5 border-white/10" />
               </div>
            </div>

            <Button 
              onClick={handleForge}
              disabled={isForging}
              className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white uppercase tracking-widest font-bold text-xs"
            >
              {isForging ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Forging Identity...</> : "Forge Identity"}
            </Button>
          </div>
        )}
      </Card>

      {(isForging || hasResult) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {/* Brand Core */}
          <div className="space-y-8">
             <Card className="p-8 bg-black/50 border-white/10 backdrop-blur-md">
                <div className="flex items-center justify-between mb-6">
                   <h3 className="text-sm font-heading tracking-widest uppercase text-muted-foreground flex items-center gap-2"><PenTool className="w-4 h-4" /> Brand Name</h3>
                   <Badge variant="outline" className="border-white/10 text-white/50 text-[9px] uppercase">Selected</Badge>
                </div>
                {isForging ? (
                  <div className="h-16 w-3/4 bg-white/5 animate-pulse rounded mb-6" />
                ) : (
                  <h2 className="text-5xl font-heading font-bold mb-6 text-white tracking-tighter">{selectedName}.</h2>
                )}
                <div className="space-y-2">
                   <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-mono">Alternatives Generated</h4>
                   <div className="flex flex-wrap gap-2">
                      {isForging ? (
                        [1,2,3,4].map(i => <div key={i} className="h-8 w-24 bg-white/5 animate-pulse rounded" />)
                      ) : (
                        result?.brand_names.filter(n => n !== selectedName).map(name => (
                          <div 
                            key={name} 
                            onClick={() => setSelectedName(name)}
                            className="px-3 py-1.5 rounded bg-white/[0.02] border border-white/5 text-sm text-white/70 hover:text-white hover:border-white/20 transition-colors cursor-pointer"
                          >
                            {name}
                          </div>
                        ))
                      )}
                   </div>
                </div>
             </Card>

             <Card className="p-8 bg-black border-white/10">
                <h3 className="text-sm font-heading tracking-widest uppercase text-muted-foreground mb-6 flex items-center gap-2"><Type className="w-4 h-4" /> Taglines</h3>
                <div className="space-y-4">
                   {isForging ? (
                     [1,2,3].map(i => <div key={i} className="h-20 w-full bg-white/5 animate-pulse rounded" />)
                   ) : (
                     result?.taglines.map((tag, i) => (
                       <div 
                        key={i} 
                        onClick={() => setSelectedTagline(tag)}
                        className={`p-4 rounded border transition-colors cursor-pointer ${tag === selectedTagline ? 'bg-primary/5 border-primary/30 text-white' : 'bg-white/[0.02] border-white/5 text-white/70 hover:border-white/20 hover:text-white'}`}
                       >
                          <span className="font-medium text-lg">&ldquo;{tag}&rdquo;</span>
                       </div>
                     ))
                   )}
                </div>
             </Card>

             <Card className="p-8 bg-gradient-to-br from-[#0c0c0c] to-[#050505] border-white/10">
                <h3 className="text-sm font-heading tracking-widest uppercase text-muted-foreground mb-6 flex items-center gap-2"><Sparkles className="w-4 h-4" /> Voice & Tone</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                   <div className="p-4 rounded-xl border border-white/5 bg-black/50">
                      <div className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-1">Tone</div>
                      <div className="font-medium">{isForging ? "..." : result?.brand_voice.tone}</div>
                   </div>
                   <div className="p-4 rounded-xl border border-white/5 bg-black/50">
                      <div className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-1">Vibe</div>
                      <div className="font-medium">{isForging ? "..." : result?.brand_voice.vibe}</div>
                   </div>
                </div>
                <div className="p-4 rounded-xl border border-white/5 bg-black/50">
                   <div className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-2">Write like this:</div>
                   <p className="text-sm leading-relaxed text-white/80 italic border-l-2 border-primary pl-4">
                     {isForging ? "Generating brand voice example..." : `"${result?.brand_voice.writing_example}"`}
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
                      {isForging ? (
                        <div className="w-full bg-white/5 animate-pulse" />
                      ) : (
                        result?.color_palette.map((c, i) => (
                          <div 
                            key={i} 
                            className="flex-grow flex items-end p-2 transition-all hover:flex-[2]" 
                            style={{ backgroundColor: c.hex }}
                          >
                            <span className="text-[10px] font-mono mix-blend-difference invert">{c.label}: {c.hex}</span>
                          </div>
                        ))
                      )}
                   </div>
                </div>

                <div>
                   <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">Typography System</h4>
                   <div className="space-y-4">
                      <div className="p-4 rounded border border-white/5 bg-white/[0.02] flex justify-between items-center">
                         <div>
                           <div className="text-[10px] uppercase text-muted-foreground mb-1">Display / Headers</div>
                           <div className="font-heading text-2xl tracking-tight">{isForging ? "Loading..." : result?.typography.heading}</div>
                         </div>
                         <Button variant="ghost" size="sm" className="text-xs border border-white/10">Aa</Button>
                      </div>
                      <div className="p-4 rounded border border-white/5 bg-white/[0.02] flex justify-between items-center">
                         <div>
                           <div className="text-[10px] uppercase text-muted-foreground mb-1">Body / UI</div>
                           <div className="font-sans text-xl">{isForging ? "Loading..." : result?.typography.body}</div>
                         </div>
                         <Button variant="ghost" size="sm" className="text-xs border border-white/10">Aa</Button>
                      </div>
                   </div>
                </div>
             </Card>

             <Card className="p-8 bg-black border-white/10">
                <h3 className="text-sm font-heading tracking-widest uppercase text-muted-foreground mb-6 flex items-center gap-2"><Box className="w-4 h-4" /> Product Concepts</h3>
                <div className="space-y-4">
                   {isForging ? (
                     [1,2,3].map(i => <div key={i} className="h-24 w-full bg-white/5 animate-pulse rounded-xl" />)
                   ) : (
                     result?.product_concepts.map((prod, i) => (
                       <div key={i} className="p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-primary/30 transition-colors group">
                          <div className="flex justify-between items-start mb-2">
                             <h4 className="font-medium text-white group-hover:text-primary transition-colors">{prod.name}</h4>
                             <span className="text-sm font-mono text-muted-foreground">{prod.price}</span>
                          </div>
                          <p className="text-sm text-white/60 leading-relaxed">{prod.desc}</p>
                       </div>
                     ))
                   )}
                </div>
             </Card>
          </div>
        </div>
      )}
    </div>
  );
}
