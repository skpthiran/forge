import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send, Megaphone, Smartphone, AtSign, Calendar, MessageSquare, Target, Mail, LayoutTemplate, Layers } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function ReachEnginePage() {
  const campaigns = [
    { title: "Founder Story Launch", type: "TikTok / Reels", status: "Ready", glow: "text-blue-400 border-blue-400" },
    { title: "Limited Drop: Collection 01", type: "Email / SMS", status: "Draft", glow: "text-orange-400 border-orange-400" },
    { title: "The Anti-Neon Angle", type: "Meta Ads", status: "Generating", glow: "text-yellow-400 border-yellow-400" },
    { title: "Behind-the-Scenes Supplier Hunt", type: "TikTok Series", status: "Ready", glow: "text-blue-400 border-blue-400" }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] uppercase tracking-wider mb-3">
            <Megaphone className="w-3 h-3" /> Growth Engaged
          </div>
          <h1 className="text-3xl lg:text-4xl font-heading font-medium tracking-tight mb-2">Reach Engine</h1>
          <p className="text-muted-foreground">Growth & Marketing AI: Ad angles, content hooks, and campaigns.</p>
        </div>
        <Button className="bg-primary hover:bg-orange-600 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)] uppercase tracking-widest text-xs font-bold h-10 px-6" onClick={() => toast.success('Campaign generation initiated.', { description: 'The reach engine is spinning up assets.' })}>
          Generate Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Left Column - Quick Actions & Status */}
         <div className="col-span-1 space-y-6">
            <Card className="p-6 bg-black border-white/10">
               <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-mono flex items-center gap-2"><Send className="w-4 h-4"/> Active Strategies</h3>
               <div className="space-y-3">
                  {campaigns.map((camp, i) => (
                    <div key={i} className="p-4 rounded-lg bg-[#050505] border border-white/5 hover:border-white/20 transition-colors cursor-pointer group shadow-sm">
                       <div className="flex justify-between items-start mb-2">
                          <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border ${camp.glow}/30 bg-white/5 ${camp.glow}`}>{camp.status}</span>
                          <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">{camp.type}</span>
                       </div>
                       <h4 className="text-sm font-medium text-white/80 group-hover:text-primary transition-colors mt-2">{camp.title}</h4>
                    </div>
                  ))}
               </div>
            </Card>

            <Card className="p-6 bg-gradient-to-b from-[#1a1a1a] to-black border-white/10 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Calendar className="w-32 h-32 text-white" />
               </div>
               <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-mono flex items-center gap-2 relative z-10"><Calendar className="w-4 h-4"/> Launch Calendar</h3>
               <div className="text-center py-8 relative z-10">
                  <div className="text-6xl font-light text-white mb-2 tracking-tighter">T-14</div>
                  <p className="text-[10px] text-primary uppercase tracking-widest font-bold">Days until Pre-Order</p>
               </div>
               <div className="space-y-3 mt-4 pt-4 border-t border-white/10 relative z-10">
                 <div className="flex justify-between items-center text-xs text-white/80"><span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Post Hook Video 1</span><span className="text-primary font-mono text-[10px] uppercase">Today</span></div>
                 <div className="flex justify-between items-center text-xs text-white/60"><span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-white/20" /> Send Email Teaser</span><span className="font-mono text-[10px] uppercase">Tomorrow</span></div>
                 <div className="flex justify-between items-center text-xs text-white/60"><span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-white/20" /> Launch Meta Ads</span><span className="font-mono text-[10px] uppercase">In 3 days</span></div>
               </div>
            </Card>
         </div>

         {/* Right Column - Generation Workspace */}
         <div className="col-span-1 lg:col-span-2">
            <Card className="p-0 bg-black/50 border-white/10 h-full flex flex-col backdrop-blur-sm overflow-hidden">
               <Tabs defaultValue="social" className="flex flex-col h-full w-full">
                 <div className="p-6 border-b border-white/10 bg-[#050505] overflow-x-auto scrollbar-hide">
                    <h3 className="text-xl font-heading font-medium mb-4 text-white">Content Generator</h3>
                    <TabsList className="bg-black border border-white/10 h-10 w-fit shrink-0">
                      <TabsTrigger value="social" className="data-active:bg-primary data-active:text-white uppercase tracking-widest text-[10px] py-2 px-4 font-bold"><Smartphone className="w-3 h-3 mr-2"/> Social Hooks</TabsTrigger>
                      <TabsTrigger value="ads" className="data-active:bg-primary data-active:text-white uppercase tracking-widest text-[10px] py-2 px-4 font-bold"><Target className="w-3 h-3 mr-2"/> Ad Angles</TabsTrigger>
                      <TabsTrigger value="email" className="data-active:bg-primary data-active:text-white uppercase tracking-widest text-[10px] py-2 px-4 font-bold"><Mail className="w-3 h-3 mr-2"/> Email Flow</TabsTrigger>
                    </TabsList>
                 </div>

                 <TabsContent value="social" className="flex-1 p-6 outline-none m-0 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="flex items-center justify-between mb-6">
                       <h4 className="text-xs font-mono text-white/60 uppercase tracking-widest">TikTok / Reels Hooks</h4>
                       <Button variant="outline" size="sm" className="h-8 text-xs border-white/10 bg-white/5 hover:bg-white/10 hover:text-white"><MessageSquare className="w-3 h-3 mr-2"/>Generate More</Button>
                    </div>
                    <div className="space-y-4">
                       {[
                         "I’m building a premium gymwear brand from zero. Day 1.",
                         "Why do most gym clothes feel cheap after 3 washes?",
                         "This is not another loud-logo neon fitness brand.",
                         "Building for the guys who train in silence. No cameras.",
                         "Watch me try to find a factory that makes 400gsm pump covers."
                       ].map((hook, i) => (
                          <div key={i} className="flex flex-col sm:flex-row gap-4 p-5 rounded-xl border border-white/5 bg-[#050505] group hover:border-primary/50 transition-colors shadow-sm">
                             <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 text-primary font-mono text-xs shadow-inner shadow-primary/20">{i + 1}</div>
                             <div className="flex-1">
                               <p className="text-white/90 font-medium md:text-lg mb-3 group-hover:text-white transition-colors leading-snug">"{hook}"</p>
                               <div className="flex flex-wrap gap-2">
                                  <Badge variant="outline" className="text-[10px] text-white/50 border-white/10 bg-black font-normal rounded-sm">Visual: Talking to camera</Badge>
                                  <Badge variant="outline" className="text-[10px] text-white/50 border-white/10 bg-black font-normal rounded-sm">Audio: Low lofi</Badge>
                               </div>
                             </div>
                             <div className="sm:self-center mt-2 sm:mt-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white/50 hover:text-white"><Target className="w-4 h-4" /></Button>
                             </div>
                          </div>
                       ))}
                    </div>
                 </TabsContent>
                 
                 <TabsContent value="ads" className="flex-1 p-6 outline-none m-0 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="flex items-center justify-between mb-6">
                       <h4 className="text-xs font-mono text-white/60 uppercase tracking-widest">Performance Marketing Angles</h4>
                       <Button variant="outline" size="sm" className="h-8 text-xs border-white/10 bg-white/5 hover:bg-white/10 hover:text-white"><LayoutTemplate className="w-3 h-3 mr-2"/>View Templates</Button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       {[
                         { title: "The Quality Gap", type: "Meta Ads", tag: "Pain Point", copy: "Most gymwear dies after 3 washes. We built 400gsm heavyweight cotton that endures. No shrinkage, no fading.", cta: "Shop The Heavyweight Collection", bg: "from-blue-500/10 to-transparent", hover: "hover:border-blue-500/50" },
                         { title: "The Anti-Noise", type: "TikTok Ads", tag: "Identity", copy: "No neon. No loud logos. Just heavy fabric and discipline. Built for the guys who train in silence.", cta: "Discover IronBloom", bg: "from-primary/10 to-transparent", hover: "hover:border-primary/50" },
                         { title: "Founder's Reality", type: "TikTok Reels", tag: "Story", copy: "I got tired of buying 'premium' gym shirts that fit terribly. So I spent 8 months sourcing our own.", cta: "See Our Process", bg: "from-purple-500/10 to-transparent", hover: "hover:border-purple-500/50" },
                         { title: "Drop 01 Scarcity", type: "Google Search", tag: "Urgency", copy: "IronBloom Drop 01. Premium fit, heavy cotton. Limited quantities available. Restocks take 60 days.", cta: "Shop Drop 01 Now", bg: "from-red-500/10 to-transparent", hover: "hover:border-red-500/50" },
                       ].map((ad, i) => (
                         <div key={i} className={`p-5 rounded-xl border border-white/5 bg-gradient-to-br bg-[#050505] ${ad.bg} ${ad.hover} transition-all group flex flex-col h-full shadow-sm`}>
                            <div className="flex justify-between items-start mb-4 gap-2">
                               <Badge variant="outline" className="text-[9px] uppercase tracking-wider border-white/10 text-white/60 bg-black/50 shrink-0">{ad.type}</Badge>
                               <span className="text-[10px] text-primary uppercase font-mono tracking-widest border border-primary/20 px-1.5 py-0.5 rounded bg-primary/10 shrink-0">{ad.tag}</span>
                            </div>
                            <h4 className="text-lg font-heading font-medium text-white mb-2">{ad.title}</h4>
                            <p className="text-sm text-white/60 mb-6 leading-relaxed flex-grow">"{ad.copy}"</p>
                            <div className="mt-auto px-3 py-2 border border-white/10 rounded-md bg-white/5 text-xs text-white/80 font-medium font-mono text-center truncate group-hover:bg-white/10 transition-colors cursor-pointer">
                               &rarr; {ad.cta}
                            </div>
                         </div>
                       ))}
                    </div>
                 </TabsContent>

                 <TabsContent value="email" className="flex-1 p-6 outline-none m-0 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="flex items-center justify-between mb-6">
                       <h4 className="text-xs font-mono text-white/60 uppercase tracking-widest">Launch Sequence <span className="text-primary tracking-normal">(5 Emails)</span></h4>
                       <Button variant="outline" size="sm" className="h-8 text-xs border-primary/30 text-primary bg-primary/10 hover:bg-primary/20 hover:text-primary" onClick={() => toast.success('Exporting sequence to Klaviyo...', { description: 'Connecting via integration.'})}><Layers className="w-3 h-3 mr-2"/>Export to Klaviyo</Button>
                    </div>

                    <div className="relative before:absolute before:inset-0 before:ml-[1.4rem] before:-translate-x-px before:h-full before:w-0.5 before:bg-white/10 space-y-4">
                       {[
                         { step: 1, name: "Founder Story", subj: "Why I started IronBloom.", preview: "The gymwear industry is broken. Here's how we're fixing it.", goal: "Trust / Engagement", cta: "Read the story", status: "Ready" },
                         { step: 2, name: "Problem Reveal", subj: "Stop buying disposable gym clothes.", preview: "Most fabrics die after 3 washes. We built something different.", goal: "Education / Pain", cta: "See the fabric tech", status: "Ready" },
                         { step: 3, name: "Product Teaser", subj: "400gsm Heavyweight. The Drop 01 details.", preview: "A sneak peek at the cuts, colors, and sizing.", goal: "Desire / Hype", cta: "View Lookbook", status: "Review" },
                         { step: 4, name: "Early Access", subj: "VIP Early Access is LIVE. 🔑", preview: "You have 2 hours before the public drop. Inventory is limited.", goal: "Sales via Urgency", cta: "Shop Early Access", status: "Draft" },
                         { step: 5, name: "Drop 01 Live", subj: "IronBloom Drop 01 is officially live.", preview: "The Heavyweight Collection is available now.", goal: "General Sales", cta: "Shop Collection 01", status: "Draft" },
                       ].map((email, i) => (
                         <div key={i} className="relative flex items-start group">
                           <div className="flex items-center justify-center w-12 h-12 rounded bg-black border border-white/20 shrink-0 z-10 shadow-md group-hover:border-primary transition-colors">
                              <span className="font-mono text-sm text-white/80 group-hover:text-primary transition-colors">E{email.step}</span>
                           </div>
                           
                           <div className="ml-4 md:ml-6 w-full p-4 md:p-5 rounded-xl border border-white/5 bg-[#050505] shadow-sm group-hover:border-white/10 transition-colors">
                             <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-2">
                               <h5 className="text-base font-medium text-white/90 flex items-center gap-2">
                                  {email.name}
                                  {email.status === 'Ready' && <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 text-[9px] uppercase">Ready</Badge>}
                                  {email.status === 'Review' && <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30 text-[9px] uppercase">Review</Badge>}
                                  {email.status === 'Draft' && <Badge variant="outline" className="bg-white/5 text-white/40 border-white/10 text-[9px] uppercase">Draft</Badge>}
                               </h5>
                               <span className="text-[10px] uppercase font-mono tracking-widest text-primary shrink-0">Goal: {email.goal}</span>
                             </div>
                             
                             <div className="space-y-2 mb-4 bg-black/50 p-3 rounded-lg border border-white/5">
                               <div className="grid grid-cols-[60px_1fr] items-baseline gap-2">
                                  <span className="text-[10px] uppercase text-white/40 font-mono text-right">Subject</span>
                                  <span className="text-sm text-white/90 truncate">"{email.subj}"</span>
                               </div>
                               <div className="grid grid-cols-[60px_1fr] items-baseline gap-2">
                                  <span className="text-[10px] uppercase text-white/40 font-mono text-right">Preview</span>
                                  <span className="text-xs text-white/60 truncate">{email.preview}</span>
                               </div>
                             </div>
                             
                             <div className="flex items-center justify-between">
                                <span className="text-xs text-white/40 font-mono bg-white/5 px-2 py-1 rounded">CTA: {email.cta}</span>
                                <Button variant="ghost" size="sm" className="h-6 text-[10px] uppercase tracking-wider text-white/50 hover:text-white">Edit Copy</Button>
                             </div>
                           </div>
                         </div>
                       ))}
                    </div>
                 </TabsContent>
               </Tabs>
            </Card>
         </div>
      </div>
    </div>
  );
}
