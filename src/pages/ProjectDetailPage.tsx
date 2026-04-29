import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, ArrowRight, Activity, Palette, Package, FileText, Rocket, Cpu, Download, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getBrandById, Brand } from '../services/supabase';
import { exportBrandKitPDF } from '../utils/exportPDF';
import { useEffect, useState } from 'react';
import { sendBlueprintEmail } from '../services/gemini';
import { supabase } from '../services/supabase';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'signal';
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [signalResult, setSignalResult] = useState<any>(null);
  const [craftResult, setCraftResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const url = `${window.location.origin}/b/${id}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    async function loadData() {
      if (!id) return;
      try {
        const { data, error } = await getBrandById(id);
        if (error) throw error;
        setBrand(data);
        // Data structure from select('*, signal_results(*), craft_results(*)')
        const sr = Array.isArray(data.signal_results) 
          ? data.signal_results[0] 
          : data.signal_results
        const cr = Array.isArray(data.craft_results) 
          ? data.craft_results[0] 
          : data.craft_results
        setSignalResult(sr || null)
        setCraftResult(cr || null)
        console.log('Project data loaded:', { signal: sr, craft: cr })

        const { data: { user } } = await supabase.auth.getUser()
        if (user?.email && data.craft_results?.[0]) {
          const emailKey = `forge_email_sent_${id}`
          if (!sessionStorage.getItem(emailKey)) {
            sessionStorage.setItem(emailKey, '1')
            sendBlueprintEmail({
              userEmail: user.email,
              brandName: data.name || '',
              industry: data.industry || '',
              demandScore: data.signal_results?.[0]?.demand_score,
              competitionLevel: data.signal_results?.[0]?.competition_level,
              tagline: data.craft_results?.[0]?.selected_tagline,
            })
          }
        }
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

      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-2">
        {[
          { id: 'signal', label: 'Signal', icon: Activity },
          { id: 'craft', label: 'Craft', icon: Palette },
          { id: 'reach', label: 'Reach', icon: Rocket },
          { id: 'pulse', label: 'Pulse', icon: CheckCircle2 },
          { id: 'capital', label: 'Capital', icon: Package },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
              activeTab === tab.id
                ? 'bg-orange-500 text-black shadow-lg shadow-orange-500/20'
                : 'text-white/40 hover:text-white/60 hover:bg-white/5'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="col-span-2 space-y-8">
            {activeTab === 'signal' && (
              signalResult ? (
                <Card className={`p-6 bg-[#050505] border-white/10 ring-2 ring-blue-500 border-blue-500/50`}>
                  <div className="flex items-center gap-3 mb-4">
                     <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center text-blue-400"><Activity className="w-4 h-4"/></div>
                     <h3 className="text-sm font-heading tracking-widest uppercase text-white">Market Intel</h3>
                  </div>
                  <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                           <div className="text-[10px] uppercase text-muted-foreground mb-1">Demand Score</div>
                           <div className="text-2xl font-light text-green-400">{signalResult.demand_score}%</div>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                           <div className="text-[10px] uppercase text-muted-foreground mb-1">Competition</div>
                           <div className="text-2xl font-light text-orange-400">{signalResult.competition_level}</div>
                        </div>
                     </div>
                     <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="text-[10px] uppercase text-muted-foreground mb-2">Market Gap</div>
                        <p className="text-sm text-white/80 leading-relaxed">{signalResult.market_gap}</p>
                     </div>
                  </div>
                </Card>
              ) : (
                <div className="text-center py-16 space-y-4 bg-black border border-dashed border-white/10 rounded-xl">
                  <p className="text-muted-foreground">No signal analysis yet for this brand.</p>
                  <Button 
                    onClick={() => navigate('/signal')}
                    className="bg-blue-600 hover:bg-blue-700 text-white uppercase tracking-widest text-xs font-bold"
                  >
                    Run Signal Engine
                  </Button>
                </div>
              )
            )}

            {activeTab === 'craft' && (
              craftResult ? (
                <div className="space-y-6">
                  <Card className={`p-6 bg-[#050505] border-white/10 ring-2 ring-primary border-primary/50`}>
                    <div className="flex items-center gap-3 mb-4">
                       <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary"><Palette className="w-4 h-4"/></div>
                       <h3 className="text-sm font-heading tracking-widest uppercase text-white">Identity & Voice</h3>
                    </div>
                    <div className="space-y-6">
                       <div>
                          <div className="text-[10px] uppercase text-muted-foreground mb-1 font-mono">Selected Name</div>
                          <div className="text-3xl font-bold text-white">{craftResult.selected_name}</div>
                       </div>
                       <div>
                          <div className="text-[10px] uppercase text-muted-foreground mb-1 font-mono">Core Tagline</div>
                          <div className="text-xl italic text-primary">"{craftResult.selected_tagline}"</div>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 rounded bg-white/5 border border-white/10">
                             <div className="text-[10px] uppercase text-muted-foreground mb-1">Tone</div>
                             <div className="text-sm">{craftResult.brand_voice?.tone}</div>
                          </div>
                          <div className="p-3 rounded bg-white/5 border border-white/10">
                             <div className="text-[10px] uppercase text-muted-foreground mb-1">Vibe</div>
                             <div className="text-sm">{craftResult.brand_voice?.vibe}</div>
                          </div>
                       </div>
                       <div>
                          <div className="text-[10px] uppercase text-muted-foreground mb-2 font-mono">Color Palette</div>
                          <div className="flex gap-2">
                             {craftResult.color_palette?.map((c: any, i: number) => (
                               <div key={i} className="flex flex-col items-center gap-1">
                                  <div className="w-10 h-10 rounded border border-white/10" style={{ backgroundColor: c.hex }} />
                                  <span className="text-[8px] font-mono text-white/40">{c.hex}</span>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                  </Card>
                  
                  <Card className="p-6 bg-black border-white/10">
                    <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-mono">Product Concepts</h3>
                    <div className="space-y-3">
                      {craftResult.product_concepts?.map((p: any, i: number) => (
                        <div key={i} className="p-3 rounded bg-white/[0.02] border border-white/5 flex justify-between items-center">
                          <div>
                            <div className="text-sm font-medium text-white">{p.name}</div>
                            <div className="text-[10px] text-white/40">{p.desc}</div>
                          </div>
                          <div className="text-xs font-mono text-primary">{p.price}</div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-16 space-y-4 bg-black border border-dashed border-white/10 rounded-xl">
                  <p className="text-muted-foreground">No brand identity forged yet.</p>
                  <Button 
                    onClick={() => navigate('/craft')}
                    className="bg-primary hover:bg-orange-600 text-white uppercase tracking-widest text-xs font-bold"
                  >
                    Run Craft Engine
                  </Button>
                </div>
              )
            )}

            {activeTab === 'reach' && (
              <div className="text-center py-16 space-y-4 bg-black border border-dashed border-white/10 rounded-xl">
                <p className="text-muted-foreground">Run this engine to generate growth and marketing results.</p>
                <Button 
                  onClick={() => navigate('/reach')}
                  className="bg-primary hover:bg-orange-600 text-white uppercase tracking-widest text-xs font-bold"
                >
                  Run Reach Engine
                </Button>
              </div>
            )}

            {activeTab === 'pulse' && (
              <div className="text-center py-16 space-y-4 bg-black border border-dashed border-white/10 rounded-xl">
                <p className="text-muted-foreground">Run this engine to analyze sentiment and customer strategy.</p>
                <Button 
                  onClick={() => navigate('/pulse')}
                  className="bg-primary hover:bg-orange-600 text-white uppercase tracking-widest text-xs font-bold"
                >
                  Run Pulse Engine
                </Button>
              </div>
            )}

            {activeTab === 'capital' && (
              <div className="text-center py-16 space-y-4 bg-black border border-dashed border-white/10 rounded-xl">
                <p className="text-muted-foreground">Run this engine to generate financial and ops reports.</p>
                <Button 
                  onClick={() => navigate('/capital')}
                  className="bg-primary hover:bg-orange-600 text-white uppercase tracking-widest text-xs font-bold"
                >
                  Run Capital Engine
                </Button>
              </div>
            )}
         </div>

         <div className="col-span-1 space-y-6">
            <Card className="p-6 bg-gradient-to-br from-[#0c0c0c] to-[#050505] border-white/10 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Cpu className="w-32 h-32 text-primary" />
               </div>
               <h3 className="text-xs uppercase tracking-widest text-primary mb-6 font-mono relative z-10 flex items-center gap-2"><Sparkles className="w-3 h-3"/> AI Recommendations</h3>
                <div className="space-y-4 relative z-10">
                  <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-200 text-sm leading-relaxed">
                    {signalResult?.market_gap
                      ? `Market opportunity: ${signalResult.market_gap}`
                      : 'Run the Signal Engine to get your market opportunity analysis.'}
                  </div>
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-200 text-sm leading-relaxed">
                    {signalResult?.opportunity_window
                      ? `Your launch window is ${signalResult.opportunity_window}. Act within this timeframe to capture first-mover advantage.`
                      : 'Run the Signal Engine to see your optimal launch window.'}
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm leading-relaxed">
                    {craftResult?.product_concepts?.[0]
                      ? `"${craftResult.product_concepts[0].name}" (${craftResult.product_concepts[0].price}) has the highest margin potential. Feature it in your first marketing push.`
                      : 'Run the Craft Engine to generate your product concepts.'}
                  </div>
               </div>
            </Card>

            <Button
              onClick={handleShare}
              variant="outline"
              className="w-full h-12 border-white/10 text-white/60 hover:text-white hover:border-white/30 uppercase tracking-widest font-bold text-xs"
            >
              {copied ? '✓ Link Copied!' : '🔗 Share Brand Page'}
            </Button>

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
