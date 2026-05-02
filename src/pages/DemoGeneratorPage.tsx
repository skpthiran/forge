import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BrainCircuit, Sparkles, Target, Palette, Zap, FileText, Rocket, CheckCircle2, Download, Save, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { runSignalEngine, runCraftEngine, SignalResult, CraftResult } from '../services/gemini';
import { createBrand, saveSignalResult, saveCraftResult, getProfile, supabase } from '../services/supabase'
import { toast } from 'sonner'

export default function DemoGeneratorPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const navigate = useNavigate();

  // Form State
  const [idea, setIdea] = useState('I want to start a premium gym clothing brand for young men.');
  const [industry, setIndustry] = useState('Activewear / Fashion');
  const [targetAudience, setTargetAudience] = useState('Males 18-28');
  const [pricePoint, setPricePoint] = useState('Premium ($50 - $120)');
  const [market, setMarket] = useState('Global');

  // Result State
  const [signalResult, setSignalResult] = useState<SignalResult | null>(null);
  const [craftResult, setCraftResult] = useState<CraftResult | null>(null);

  const loadingSteps = [
    "Scanning market signals...",
    "Mapping audience pain points...",
    "Finding product gaps...",
    "Forging brand identity...",
    "Generating launch assets...",
    "Blueprint ready."
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setLoadingStep(0);
    
    try {
      // Step 1: Signal Engine
      setLoadingStep(0);
      const signal = await runSignalEngine(idea, industry, targetAudience, pricePoint, market);
      setSignalResult(signal);
      
      // Step 2-3: Mapping pain points & finding gaps (simulation of progress)
      setLoadingStep(1);
      await new Promise(r => setTimeout(r, 1000));
      setLoadingStep(2);

      // Step 4: Craft Engine
      setLoadingStep(3);
      const craft = await runCraftEngine(idea, industry, targetAudience, pricePoint, signal.market_gap);
      setCraftResult(craft);

      // Step 5: Ready to finalize
      setLoadingStep(5);
      await new Promise(r => setTimeout(r, 800));
      await new Promise(r => setTimeout(r, 800));
      
      setIsGenerating(false);
      setShowReveal(true);
      toast.success('Brand blueprint forged successfully!');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Failed to forge brand. Please try again.');
      setIsGenerating(false);
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success('Share link copied to clipboard');
  }

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    if (!signalResult || !craftResult) return
    setIsSaving(true)
    try {
      const { data: profile } = await getProfile()
      const planLimits = { free: 3, starter: 10, builder: 30, pro: 999 }
      const plan = profile?.plan || 'free'
      const used = profile?.brands_used || 0
      if (used >= planLimits[plan as keyof typeof planLimits]) {
        toast.error(`Plan limit reached. Upgrade to create more brands.`)
        setIsSaving(false)
        return
      }

      const { data: brand, error: brandError } = await createBrand({
        name: craftResult.selected_name,
        idea: idea,
        industry: industry,
        target_audience: targetAudience,
        price_point: pricePoint,
      })
      if (brandError || !brand) throw brandError

      await saveSignalResult(brand.id, {
        demand_score: signalResult.demand_score,
        competition_level: signalResult.competition_level,
        audience_heat: signalResult.audience_heat,
        market_gap: signalResult.market_gap,
        opportunity_window: signalResult.opportunity_window,
        insights: signalResult.insights,
        competitor_map: signalResult.competitor_map,
        pain_points: signalResult.pain_points,
        raw_response: signalResult.raw_response,
      })

      await saveCraftResult(brand.id, {
        brand_names: craftResult.brand_names,
        selected_name: craftResult.selected_name,
        taglines: craftResult.taglines,
        selected_tagline: craftResult.selected_tagline,
        brand_voice: craftResult.brand_voice,
        color_palette: craftResult.color_palette,
        typography: craftResult.typography,
        product_concepts: craftResult.product_concepts,
        raw_response: craftResult.raw_response,
      })

      await supabase
        .from('profiles')
        .update({ brands_used: used + 1 })
        .eq('id', (await supabase.auth.getUser()).data.user?.id)

      toast.success('Brand saved to your Command Center!')
      navigate('/dashboard')
    } catch (err) {
      console.error(err)
      toast.error('Failed to save brand. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700 pb-12">
      
      {!isDone && !isGenerating && !showReveal && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }} 
          className="pt-12 pb-24"
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] uppercase tracking-[0.2em] mb-6"
            >
              Initiation Sequence
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-heading font-medium tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
              Forge Your Brand
            </h1>
            <p className="text-zinc-400 max-w-xl mx-auto text-lg leading-relaxed">
              We don't just build businesses. We forge emotional infrastructure. 
              Describe the soul of your idea below.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleGenerate} className="space-y-12">
              {/* The Spark */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary text-xs font-mono">01</div>
                  <h2 className="text-xl font-heading font-light tracking-wide text-white/90">The Spark</h2>
                </div>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-2xl blur opacity-25 group-focus-within:opacity-100 transition duration-1000"></div>
                  <Textarea 
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="I want to start a premium gym clothing brand..." 
                    className="min-h-[160px] bg-zinc-950/80 border-white/5 text-xl font-light placeholder:text-zinc-700 focus-visible:ring-primary/30 relative z-10 rounded-2xl p-6"
                    required
                  />
                </div>
              </div>

              {/* The Foundation */}
              <div className="space-y-6 pt-6 border-t border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-500 text-xs font-mono">02</div>
                  <h2 className="text-xl font-heading font-light tracking-wide text-white/90">The Foundation</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                   <div className="space-y-2">
                     <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Industry Sector</label>
                     <Input value={industry} onChange={(e) => setIndustry(e.target.value)} className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 h-10 focus-visible:ring-0 focus-visible:border-primary transition-all text-lg" required />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Target Audience</label>
                     <Input value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 h-10 focus-visible:ring-0 focus-visible:border-primary transition-all text-lg" required />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Price Positioning</label>
                     <Input value={pricePoint} onChange={(e) => setPricePoint(e.target.value)} className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 h-10 focus-visible:ring-0 focus-visible:border-primary transition-all text-lg" required />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Geographic Focus</label>
                     <select 
                      value={market} 
                      onChange={(e) => setMarket(e.target.value)}
                      className="w-full bg-transparent border-0 border-b border-white/10 rounded-none px-0 h-10 focus:outline-none focus:border-primary transition-all text-lg appearance-none cursor-pointer"
                     >
                       <option value="Global" className="bg-zinc-950 text-white">Global Market</option>
                       <option value="US" className="bg-zinc-950 text-white">United States</option>
                       <option value="EU" className="bg-zinc-950 text-white">European Union</option>
                     </select>
                   </div>
                </div>
              </div>

              <div className="pt-12">
                <Button 
                  type="submit" 
                  className="w-full h-16 bg-white text-black hover:bg-zinc-200 uppercase tracking-[0.3em] font-bold text-xs rounded-2xl shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Initiate Forging Process
                </Button>
                <p className="text-center text-zinc-600 text-[10px] uppercase tracking-widest mt-6 font-mono">
                  FORGE BRAND OS v1.0 — Secure Environment
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      )}

      {isGenerating && (
        <div className="flex flex-col items-center justify-center min-h-[70vh] animate-in fade-in duration-500">
           <div className="relative mb-16">
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-48 h-48 border-t border-b border-primary/20 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }} 
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border-l border-r border-white/10 rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                 <BrainCircuit className="w-12 h-12 text-white animate-pulse" />
              </div>
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-primary/10 rounded-full blur-3xl"
              />
           </div>
           
           <div className="w-80 text-center">
              <AnimatePresence mode="wait">
                 <motion.div
                   key={loadingStep}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   className="font-mono text-xs tracking-[0.4em] uppercase text-primary mb-8"
                 >
                   {loadingSteps[loadingStep]}
                 </motion.div>
              </AnimatePresence>
              
              <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                 <motion.div 
                   className="h-full bg-primary"
                   initial={{ width: "0%" }}
                   animate={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                   transition={{ duration: 0.5 }}
                 />
              </div>
           </div>
        </div>
      )}

      {showReveal && craftResult && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-center relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="text-[10px] font-mono uppercase tracking-[0.5em] text-primary mb-8"
            >
              Identity Forged
            </motion.div>
            
            <h1 className="text-6xl md:text-9xl font-heading font-medium tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
              {craftResult.selected_name}
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="text-xl md:text-2xl text-zinc-400 font-light tracking-wide max-w-2xl mx-auto italic"
            >
              "{craftResult.selected_tagline}"
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Button 
                onClick={() => {
                  setShowReveal(false);
                  setIsDone(true);
                }}
                className="bg-white text-black hover:bg-zinc-200 px-10 h-14 rounded-2xl font-bold uppercase tracking-widest text-xs"
              >
                Reveal Full Blueprint
              </Button>
              <Button 
                variant="outline"
                onClick={handleShare}
                className="border-white/10 hover:bg-white/5 px-10 h-14 rounded-2xl text-xs uppercase tracking-widest"
              >
                Share Identity
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {isDone && craftResult && signalResult && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-6 gap-4">
             <div>
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] uppercase tracking-wider mb-3">
                  <CheckCircle2 className="w-3 h-3" /> Blueprint Ready
                </div>
                <h1 className="text-3xl font-heading font-medium">{craftResult.selected_name}</h1>
                <p className="text-muted-foreground">{craftResult.selected_tagline}</p>
             </div>
             <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
               <Button variant="outline" onClick={handleShare} className="border-white/10 hover:bg-white/5 order-3 md:order-1 flex-1 md:flex-none">Share Blueprint</Button>
               <Button variant="outline" className="border-white/10 hover:bg-white/5 order-2 md:order-2 flex-1 md:flex-none" onClick={() => navigate('/dashboard')}><Download className="w-4 h-4 mr-2"/> To Dashboard</Button>
               <Button className="bg-primary hover:bg-orange-600 text-white order-1 md:order-3 w-full md:w-auto px-6" onClick={handleSave}><Save className="w-4 h-4 mr-2"/> Finalize & Save</Button>
             </div>
          </div>

          <Tabs defaultValue="intel" className="w-full">
            <div className="overflow-x-auto scrollbar-hide pb-2">
               <TabsList className="bg-black/50 border border-white/10 p-1 rounded-lg w-max justify-start h-auto flex-nowrap mb-4">
                 <TabsTrigger value="intel" className="data-[state=active]:bg-primary data-[state=active]:text-white uppercase tracking-wider text-[11px] py-2 px-4 rounded-md whitespace-nowrap"><Target className="w-3 h-3 mr-2"/>Market Intel</TabsTrigger>
                 <TabsTrigger value="identity" className="data-[state=active]:bg-primary data-[state=active]:text-white uppercase tracking-wider text-[11px] py-2 px-4 rounded-md whitespace-nowrap"><Palette className="w-3 h-3 mr-2"/>Brand Identity</TabsTrigger>
                 <TabsTrigger value="product" className="data-[state=active]:bg-primary data-[state=active]:text-white uppercase tracking-wider text-[11px] py-2 px-4 rounded-md whitespace-nowrap"><Zap className="w-3 h-3 mr-2"/>Product Strategy</TabsTrigger>
                 <TabsTrigger value="copy" className="data-[state=active]:bg-primary data-[state=active]:text-white uppercase tracking-wider text-[11px] py-2 px-4 rounded-md whitespace-nowrap"><FileText className="w-3 h-3 mr-2"/>Website Copy</TabsTrigger>
                 <TabsTrigger value="launch" className="data-[state=active]:bg-primary data-[state=active]:text-white uppercase tracking-wider text-[11px] py-2 px-4 rounded-md whitespace-nowrap"><Rocket className="w-3 h-3 mr-2"/>Launch Content</TabsTrigger>
               </TabsList>
            </div>

            <div className="mt-4">
              <TabsContent value="intel" className="animate-in fade-in slide-in-from-right-4 duration-500 outline-none m-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <Card className="p-6 bg-black border-white/10 col-span-2 space-y-6">
                      <div>
                        <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-4 font-mono">Market Gap</h3>
                        <p className="text-xl font-light leading-relaxed">
                          {signalResult.market_gap}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
                         <div>
                            <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Demand Score</h4>
                            <div className="text-4xl font-light text-green-400">{signalResult.demand_score}/100</div>
                         </div>
                         <div>
                            <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Competition</h4>
                            <div className="text-4xl font-light text-orange-400">{signalResult.competition_level}</div>
                         </div>
                      </div>
                   </Card>
                   <Card className="p-6 bg-black border-white/10 space-y-6">
                      <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-4 font-mono">Pain Points</h3>
                      <ul className="space-y-4">
                        {signalResult.pain_points.map((pt: string, i: number) => (
                          <li key={i} className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" /><span className="text-sm text-white/80">{pt}</span></li>
                        ))}
                      </ul>
                   </Card>
                </div>
              </TabsContent>

              <TabsContent value="identity" className="animate-in fade-in slide-in-from-right-4 duration-500 outline-none space-y-6 m-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-6 bg-black border-white/10 space-y-4">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Name Options</h3>
                    <div className="space-y-2">
                       {craftResult.brand_names.map((n: string, i: number) => (
                         <div key={i} className={cn("p-3 border border-white/10 rounded-md font-heading text-lg transition-colors", n === craftResult.selected_name ? "bg-white/5 text-white" : "text-muted-foreground")}>
                            {n}
                         </div>
                       ))}
                    </div>
                  </Card>
                  
                  <Card className="p-6 bg-black border-white/10 space-y-4 col-span-1 md:col-span-2">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Color Palette</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:h-32">
                       {craftResult.color_palette.map((c: any, i: number) => (
                         <div key={i} className="rounded-md border border-white/10 flex items-end p-3 h-24 md:h-auto" style={{ backgroundColor: c.hex }}>
                           <span className="text-xs font-medium mix-blend-difference invert">{c.label}: {c.hex}</span>
                         </div>
                       ))}
                    </div>
                    <div className="pt-4 flex flex-col sm:flex-row gap-4">
                       <div className="flex-1">
                          <h4 className="text-[10px] uppercase text-muted-foreground mb-1">Primary Typeface</h4>
                          <p className="font-heading text-xl">{craftResult.typography.heading}</p>
                       </div>
                       <div className="flex-1">
                          <h4 className="text-[10px] uppercase text-muted-foreground mb-1">Secondary Typeface</h4>
                          <p className="font-sans text-xl">{craftResult.typography.body}</p>
                       </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="product" className="animate-in fade-in slide-in-from-right-4 duration-500 outline-none m-0">
                <Card className="p-6 bg-black border-white/10">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">Phase 1 Launch Products</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {craftResult.product_concepts.map((prod: any, i: number) => (
                      <div key={i} className="p-5 border border-white/10 rounded-xl bg-white/[0.02]">
                        <div className="w-full aspect-[4/3] bg-white/5 rounded-md mb-4 flex items-center justify-center">
                          <Sparkles className="w-6 h-6 text-muted-foreground/30" />
                        </div>
                        <div className="flex justify-between items-start mb-2 gap-2">
                          <h4 className="font-medium text-white/90 leading-tight">{prod.name}</h4>
                          <span className="text-primary text-sm font-mono shrink-0">{prod.price}</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-2">{prod.desc}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="copy" className="animate-in fade-in slide-in-from-right-4 duration-500 outline-none m-0">
                <div className="space-y-6">
                  <Card className="p-8 md:p-12 bg-black border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5 hidden sm:block">
                      <FileText className="w-64 h-64 text-white" />
                    </div>
                    <div className="max-w-2xl relative z-10">
                      <span className="text-[10px] uppercase tracking-widest text-primary mb-4 block font-mono">Brand Voice: {craftResult.brand_voice.tone}</span>
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading tracking-tighter mb-6 leading-tight text-white">{craftResult.selected_tagline}</h2>
                      <p className="text-lg md:text-xl text-white/60 mb-8 max-w-lg leading-relaxed">{craftResult.brand_voice.writing_example}</p>
                      <Button className="bg-white text-black hover:bg-gray-200 uppercase tracking-widest text-xs font-bold px-8 h-12 w-full sm:w-auto">Start Building</Button>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="launch" className="animate-in fade-in slide-in-from-right-4 duration-500 outline-none m-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6 bg-black border-white/10">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Strategic Market Heat</h3>
                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                       <div className="text-[10px] text-primary uppercase mb-2">Audience Response</div>
                       <div className="font-medium text-sm mb-1">{signalResult.audience_heat}</div>
                       <p className="text-xs text-white/50">Opportunity window: {signalResult.opportunity_window}</p>
                    </div>
                  </Card>
                  
                  <Card className="p-6 bg-black border-white/10">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Key Insights</h3>
                    <div className="space-y-3">
                      {signalResult.insights.map((ins: any, i: number) => (
                        <div key={i} className="flex items-center gap-3">
                           <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", ins.type === 'trend' ? 'bg-blue-400' : ins.type === 'insight' ? 'bg-primary' : 'bg-red-400')} />
                           <span className="text-sm text-white/90">{ins.text}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </div>
          </Tabs>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/10 gap-6 mt-8">
             <div className="flex items-center gap-2 text-white/40 text-xs font-mono uppercase tracking-widest">
               <BrainCircuit className="w-4 h-4" />
               Forged by FORGE AI Engine
             </div>
             <Button onClick={() => navigate('/dashboard')} className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 uppercase tracking-widest font-bold text-xs h-12 px-8 custom-glow">
                Enter Command Center <ArrowRight className="w-4 h-4 ml-2" />
             </Button>
          </div>

        </motion.div>
      )}
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
