import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, ArrowRight, Activity, Palette, Package, FileText, Rocket, Cpu, Download, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getBrandById, Brand } from '../services/supabase';
import { exportBrandKitPDF } from '../utils/exportPDF';
import { useEffect, useState } from 'react';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [signalResult, setSignalResult] = useState<any>(null);
  const [craftResult, setCraftResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!id) return;
      try {
        const { data, error } = await getBrandById(id);
        if (error) throw error;
        setBrand(data);
        // Data structure from select('*, signal_results(*), craft_results(*)')
        setSignalResult(data.signal_results?.[0] || null);
        setCraftResult(data.craft_results?.[0] || null);
      } catch (err) {
        console.error('Error loading project:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  const handleExportPDF = () => {
    if (!brand) return;
    exportBrandKitPDF({
      brandName: brand.name || 'Brand',
      tagline: brand.idea || craftResult?.selected_tagline || '',
      industry: brand.industry || '',
      targetAudience: brand.target_audience || '',
      pricePoint: brand.price_point || '',
      // Signal data
      demandScore: signalResult?.demand_score,
      competitionLevel: signalResult?.competition_level,
      audienceHeat: signalResult?.audience_heat,
      marketGap: signalResult?.market_gap,
      opportunityWindow: signalResult?.opportunity_window,
      painPoints: signalResult?.pain_points as string[] | undefined,
      // Craft data
      brandVoice: craftResult?.brand_voice as any,
      colorPalette: craftResult?.color_palette as any,
      typography: craftResult?.typography as any,
      productConcepts: craftResult?.product_concepts as any,
      taglines: craftResult?.taglines as string[] | undefined,
    });
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4 animate-in fade-in duration-500"><Loader2 className="w-8 h-8 text-primary animate-spin" /><p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">Forging Project Details...</p></div>
    );
  }

  if (!brand) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4"><AlertCircle className="w-8 h-8 text-red-400" /><p className="text-muted-foreground">Project not found.</p></div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-6">
        <div>
           <Badge variant="outline" className="mb-4 border-primary text-primary bg-primary/10 uppercase tracking-widest text-[10px]">Brand Project</Badge>
           <h1 className="text-4xl lg:text-5xl font-heading font-medium tracking-tight mb-2">{brand.name}</h1>
           <p className="text-muted-foreground text-lg">{brand.idea}</p>
        </div>
        <div className="flex items-center gap-6">
           <div className="text-right">
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">Brand Health</div>
              <div className="text-3xl font-light text-green-400">{signalResult?.demand_score || '—'}%</div>
           </div>
           <div className="text-right">
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">Launch Readiness</div>
              <div className="text-3xl font-light text-white">{brand.launch_readiness || 0}%</div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Card className="p-6 bg-[#050505] border-white/10 hover:border-primary/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary"><Palette className="w-4 h-4"/></div>
                     <h3 className="text-sm font-heading tracking-widest uppercase text-white group-hover:text-primary transition-colors">Identity & Voice</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">{craftResult?.brand_voice?.tone || 'Tone not yet defined.'} {craftResult?.brand_voice?.personality || ''}</p>
                  <div className="flex gap-2">
                     {craftResult?.color_palette?.map((c: any, i: number) => (
                       <span key={i} className="w-4 h-4 rounded-full border border-white/10" style={{ backgroundColor: c.hex }} title={c.name} />
                     )) || <span className="text-[10px] text-white/20">No colors set</span>}
                  </div>
               </Card>
               <Card className="p-6 bg-[#050505] border-white/10 hover:border-blue-500/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center text-blue-400"><Activity className="w-4 h-4"/></div>
                     <h3 className="text-sm font-heading tracking-widest uppercase text-white group-hover:text-blue-400 transition-colors">Market Intel</h3>
                  </div>
                  <div className="space-y-2">
                     <div className="flex justify-between text-xs"><span className="text-white/50">Demand</span><span className="text-green-400">{signalResult?.demand_score ? 'High' : '—'}</span></div>
                     <div className="flex justify-between text-xs"><span className="text-white/50">Competition</span><span className="text-orange-400">{signalResult?.competition_level || '—'}</span></div>
                     <div className="flex justify-between text-xs"><span className="text-white/50">Price Point</span><span className="text-white">{brand.price_point || '—'}</span></div>
                  </div>
               </Card>
               <Card className="p-6 bg-[#050505] border-white/10 hover:border-green-500/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="w-8 h-8 rounded bg-green-500/20 flex items-center justify-center text-green-400"><Package className="w-4 h-4"/></div>
                     <h3 className="text-sm font-heading tracking-widest uppercase text-white group-hover:text-green-400 transition-colors">Product Strategy</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">{craftResult?.product_concepts?.length || 0} active SKUs prepared for Drop 01.</p>
                  <p className="text-xs text-green-400 font-mono">View Tech Packs &rarr;</p>
               </Card>
               <Card className="p-6 bg-[#050505] border-white/10 hover:border-purple-500/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="w-8 h-8 rounded bg-purple-500/20 flex items-center justify-center text-purple-400"><Rocket className="w-4 h-4"/></div>
                     <h3 className="text-sm font-heading tracking-widest uppercase text-white group-hover:text-purple-400 transition-colors">Launch Content</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">Email sequence generated. {craftResult?.taglines?.length || 0} taglines ready. Ad copy drafted.</p>
                  <p className="text-xs text-purple-400 font-mono">Open Content Hub &rarr;</p>
               </Card>
            </div>

            <Card className="p-0 bg-black border-white/10 overflow-hidden">
               <div className="p-6 border-b border-white/5 bg-[#050505] flex justify-between items-center">
                  <h3 className="text-sm uppercase tracking-widest text-white font-mono flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Launch Checklist</h3>
                  <Badge variant="outline" className="border-white/10 text-[10px]">T-Minus 14 Days</Badge>
               </div>
               <div className="p-2">
                 {[
                   { title: "Validate product idea with AI", done: true },
                   { title: "Generate brand identity and voice", done: true },
                   { title: "Review generated website copy", done: true },
                   { title: "Finalize tech packs and order samples", done: false },
                   { title: "Film TikTok hooks (4 scripts ready)", done: false },
                   { title: "Setup Shopify and connect domain", done: false },
                   { title: "Launch pre-order campaign", done: false },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-4 p-4 hover:bg-white/[0.02] transition-colors rounded-md group cursor-pointer">
                     <div className="w-5 h-5 rounded flex items-center justify-center border border-white/20 group-hover:border-white/50 transition-colors data-[state=done]:bg-primary data-[state=done]:border-primary" data-state={item.done ? 'done' : 'open'}>
                        {item.done && <CheckCircle2 className="w-3 h-3 text-white" />}
                     </div>
                     <span className={`text-sm ${item.done ? 'text-white/40 line-through' : 'text-white/90'}`}>{item.title}</span>
                   </div>
                 ))}
               </div>
            </Card>
         </div>

         <div className="col-span-1 space-y-6">
            <Card className="p-6 bg-gradient-to-br from-[#0c0c0c] to-[#050505] border-white/10 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Cpu className="w-32 h-32 text-primary" />
               </div>
               <h3 className="text-xs uppercase tracking-widest text-primary mb-6 font-mono relative z-10 flex items-center gap-2"><Sparkles className="w-3 h-3"/> AI Recommendations</h3>
               <div className="space-y-4 relative z-10">
                  <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-200 text-sm leading-relaxed">
                    Consider launching with a limited drop model (pre-order) to validate demand before investing in bulk inventory.
                  </div>
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-200 text-sm leading-relaxed">
                    Your target audience reacts well to behind-the-scenes founder content. Begin documenting your supplier search process now.
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm leading-relaxed">
                    "Void 5-Inch Shorts" have the highest margin potential. Feature them prominently in Meta Ad carousels.
                  </div>
               </div>
            </Card>

            <Button 
               onClick={handleExportPDF}
               className="w-full h-14 bg-white text-black hover:bg-gray-200 uppercase tracking-widest font-bold text-xs">
               <Download className="w-4 h-4 mr-2"/> Export Brand Kit (.PDF)
            </Button>
         </div>
      </div>
    </div>
  );
}
