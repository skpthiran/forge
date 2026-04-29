import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Activity, Sparkles, TrendingUp, Search, BrainCircuit, RefreshCw, Zap, ArrowRight, LineChart as ChartIcon, CheckCircle2, AlertCircle, Palette, Target } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function DashboardHome() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6 mt-8">
        <div>
          <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-white/5 border border-white/10 text-white/70 text-[10px] uppercase tracking-wider mb-3">
            <Zap className="w-3 h-3 text-primary" /> FORGE COMMAND CENTER
          </div>
          <h1 className="text-4xl lg:text-5xl font-heading font-medium tracking-tight mb-2">Build faster.</h1>
          <p className="text-muted-foreground text-lg">Turn raw instinct into execution.</p>
        </div>
        <div className="flex gap-4">
           <div className="relative w-64 lg:w-80 hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search projects or signals..." className="pl-9 bg-black/50 border-white/10" />
           </div>
           <Link to="/new-brand">
             <Button className="gap-2 bg-white text-black hover:bg-gray-200 uppercase tracking-widest text-xs font-bold h-10 px-6 custom-glow">
               <PlusCircle className="w-4 h-4" />
               New Brand
             </Button>
           </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="col-span-1 lg:col-span-2 p-8 bg-gradient-to-br from-[#1a1a1a] to-[#050505] border-white/10 relative overflow-hidden group h-[280px] flex flex-col justify-between text-white shadow-lg">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-20 filter grayscale mix-blend-overlay group-hover:opacity-30 transition-opacity duration-700" />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
           <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
           
           <div className="relative z-10 flex justify-between items-start">
              <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30 uppercase tracking-widest text-[9px] font-bold">Priority Project</Badge>
              
              <div className="text-right">
                <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest mb-1">Launch Readiness</div>
                <div className="text-3xl font-light text-green-400 font-mono">84<span className="text-lg text-green-400/50">%</span></div>
              </div>
           </div>
           
           <div className="relative z-10">
              <h2 className="text-3xl font-heading font-medium mb-2">IronBloom Launch Prep</h2>
              <p className="text-white/70 mb-6 max-w-md text-sm leading-relaxed">The AI recommends generating 3 new TikTok ad angles today based on shifting competitor signals in the heavy activewear niche.</p>
              <div className="flex gap-3">
                 <Link to="/project/ironbloom"><Button className="bg-primary hover:bg-orange-600 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)] uppercase tracking-widest text-xs font-bold px-6 border-none">Resume Work <ArrowRight className="w-4 h-4 ml-2"/></Button></Link>
              </div>
           </div>
        </Card>
        
        {/* Active Projects mock */}
        {[
          { name: 'AURA Wear', stage: 'Market Intel', progress: 15, icon: TrendingUp, status: 'Drafting', color: 'text-blue-400' },
          { name: 'NovaSkin Studio', stage: 'Brand Identity', progress: 45, icon: Sparkles, status: 'Active', color: 'text-purple-400' },
        ].map((project) => (
          <Card key={project.name} className="p-6 bg-[#050505] border-white/5 flex flex-col justify-between h-[280px] hover:bg-white/[0.02] hover:border-white/20 transition-all cursor-pointer group relative overflow-hidden shadow-md">
             
             <div className="flex justify-between items-start relative z-10">
               <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center bg-black shadow-inner shadow-white/5 relative overflow-hidden group-hover:border-white/30 transition-colors">
                 <project.icon className={`w-5 h-5 ${project.color} group-hover:scale-110 transition-transform relative z-10`} />
                 <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
               </div>
               <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest border border-white/5 px-2 py-1 rounded bg-black">{project.stage}</span>
             </div>
             
             <div className="relative z-10 mt-auto">
                <div className="flex items-center gap-2 mb-2">
                   <div className={`w-1.5 h-1.5 rounded-full ${project.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`} />
                   <span className="text-[10px] text-white/40 uppercase tracking-widest">{project.status}</span>
                </div>
                <h3 className="text-xl font-heading font-medium text-white mb-4 group-hover:text-white/90 transition-colors">{project.name}</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground">Completion</span>
                     <span className="text-xs font-mono font-medium text-white/80">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className={`bg-gradient-to-r from-white/20 to-white/60 group-hover:from-primary/50 group-hover:to-primary transition-all h-full rounded-full`} style={{ width: `${project.progress}%` }} />
                  </div>
                </div>
             </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        <div className="col-span-1 lg:col-span-2 space-y-6">
           <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-4">
              <h2 className="text-xl font-heading font-medium flex items-center gap-2"><Activity className="w-5 h-5 text-primary"/> AI Activity Log</h2>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-white border border-transparent hover:border-white/10"><RefreshCw className="w-3 h-3 mr-2" /> Sync Engines</Button>
           </div>
           
           <Card className="bg-[#050505] border-white/5 p-6">
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[1.4rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[1px] before:bg-gradient-to-b before:from-primary/50 before:via-white/10 before:to-transparent">
                 {[
                   { engine: "Reach Engine", action: "Generated 4 new TikTok hooks for IronBloom.", detail: "Based on competitor weakness in heavy activewear.", time: "Just now", color: "text-orange-400", bg: "bg-orange-500/20", icon: CheckCircle2 },
                   { engine: "Signal Engine", action: "Detected shifting trends in men's sizing.", detail: "Market data shows 24% increase in 'oversized' search volume.", time: "2 hours ago", color: "text-blue-400", bg: "bg-blue-500/20", icon: ChartIcon },
                   { engine: "Craft Engine", action: "Finalized color palette for NovaSkin Studio.", detail: "Aesthetic aligned to target audience preferences.", time: "1 day ago", color: "text-purple-400", bg: "bg-purple-500/20", icon: Palette }
                 ].map((activity, i) => (
                   <div key={i} className="relative flex items-start md:items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                     <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-white/80 relative overflow-hidden group-hover:border-white/30 transition-colors mt-1 md:mt-0">
                       <activity.icon className="w-4 h-4 relative z-10" />
                       <div className={`absolute inset-0 ${activity.bg}`} />
                     </div>
                     
                     <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-xl border border-white/5 bg-black shadow-sm group-hover:border-white/10 transition-colors relative overflow-hidden">
                       <div className={`absolute left-0 top-0 bottom-0 w-1 ${activity.bg.replace('/20', '')}`} />
                       <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                         <span className={`text-[10px] font-mono uppercase tracking-widest ${activity.color} bg-white/5 px-2 py-0.5 rounded w-fit`}>{activity.engine}</span>
                         <time className="text-[10px] text-white/40 font-mono uppercase tracking-widest">{activity.time}</time>
                       </div>
                       <div className="text-sm font-medium text-white/90 mb-1 leading-snug">{activity.action}</div>
                       <div className="text-xs text-white/50">{activity.detail}</div>
                     </div>
                   </div>
                 ))}
              </div>
           </Card>
        </div>

        <div className="col-span-1 space-y-6">
           <h2 className="text-xl font-heading font-medium border-b border-white/10 pb-4 flex items-center gap-2"><Target className="w-5 h-5 text-primary"/> Market Signals</h2>
           
           <Card className="bg-[#050505] border-white/5 p-4 flex flex-col gap-4">
              <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 relative overflow-hidden">
                <div className="flex gap-2 items-start">
                   <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                   <div>
                     <h4 className="text-xs font-bold uppercase tracking-widest text-red-400 mb-1">Competitor Action</h4>
                     <p className="text-sm text-red-200/80 leading-relaxed mb-3">Gymshark just dropped a new heavyweight collection. You need to differentiate positioning ASAP.</p>
                     <Button size="sm" className="h-7 text-[10px] bg-red-500/20 hover:bg-red-500/40 text-red-100 border border-red-500/30 uppercase tracking-widest">Adjust Strategy</Button>
                   </div>
                </div>
              </div>
              
              {[
                { title: "Trending Aesthetic", desc: "Gymwear with minimalist identity is rising among 18–25 male audiences.", tag: "Opportunity" },
                { title: "Pain Point Spike", desc: "Customers complain about poor fit in budget activewear in EU markets.", tag: "Product Gap" },
              ].map((signal, i) => (
                <div key={i} className="p-4 rounded-xl border border-white/5 bg-black hover:border-white/20 transition-colors flex flex-col gap-2 group cursor-pointer">
                  <div className="flex justify-between items-start">
                     <span className="text-[10px] uppercase font-mono tracking-widest text-primary border border-primary/20 px-1.5 py-0.5 rounded bg-primary/10">{signal.tag}</span>
                  </div>
                  <h4 className="text-sm font-medium text-white/90">{signal.title}</h4>
                  <p className="text-xs text-white/50 leading-relaxed">{signal.desc}</p>
                </div>
              ))}
           </Card>
           
           <Link to="/signal" className="block mt-4">
             <Button variant="outline" className="w-full bg-black border-white/10 text-xs text-white/70 hover:text-white hover:bg-white/5 uppercase tracking-widest font-bold">Open Signal Engine</Button>
           </Link>
        </div>
      </div>
    </div>
  );
}
