import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import EmptyState from '../components/EmptyState';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Activity, Sparkles, TrendingUp, Search, BrainCircuit, RefreshCw, Zap, ArrowRight, LineChart as ChartIcon, CheckCircle2, AlertCircle, Palette, Target, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { getBrands, Brand, getUserPlan, PLAN_LIMITS } from '../services/supabase';

export default function DashboardHome() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [planInfo, setPlanInfo] = useState<{ plan: string; brandCount: number; limit: number } | null>(null);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(false);

  useEffect(() => {
    async function loadBrands() {
      try {
        const { data, error } = await getBrands();
        if (error) throw error;
        setBrands(data || []);
        
        if ((data || []).length === 0) {
          const joined = user?.created_at;
          const isNew = joined && (Date.now() - new Date(joined).getTime()) < 1000 * 60 * 60 * 24 * 3;
          setIsFirstTime(!!isNew);
        } else {
          const seen = sessionStorage.getItem('forge_welcome_seen');
          if (!seen) {
            setShowWelcomeBanner(true);
            sessionStorage.setItem('forge_welcome_seen', '1');
          }
        }
        
        const info = await getUserPlan();
        setPlanInfo(info);
      } catch (err) {
        console.error('Failed to load brands:', err);
      } finally {
        setLoading(false);
      }
    }
    loadBrands();
  }, []);

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
           {planInfo && planInfo.brandCount >= planInfo.limit ? (
             <div className="flex items-center gap-3">
               <span className="text-xs text-white/40">
                 {planInfo.brandCount}/{planInfo.limit} brands used
               </span>
               <Link
                 to="/pricing"
                 className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-orange-500/40 text-orange-400 text-xs font-bold uppercase tracking-widest hover:bg-orange-500/10 transition-all"
               >
                 Upgrade to add more →
               </Link>
             </div>
           ) : (
             <Link to="/demo">
               <Button className="gap-2 bg-white text-black hover:bg-gray-200 uppercase tracking-widest text-xs font-bold h-10 px-6 custom-glow">
                 <PlusCircle className="w-4 h-4" />
                 New Brand
               </Button>
             </Link>
           )}
        </div>
      </div>

       {showWelcomeBanner && (
         <div className="mb-6 flex items-center justify-between p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 animate-in slide-in-from-top duration-500">
           <div className="flex items-center gap-3">
             <span className="text-orange-400 text-lg">⚡</span>
             <div>
               <p className="text-sm font-bold text-white">Welcome back to FORGE</p>
               <p className="text-xs text-white/40">Open any brand to continue building or run a new engine.</p>
             </div>
           </div>
           <button
             onClick={() => setShowWelcomeBanner(false)}
             className="text-white/20 hover:text-white/60 transition-colors text-lg shrink-0 ml-4"
           >
             ×
           </button>
         </div>
       )}

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          [1,2,3,4].map(i => (
            <Card key={i} className="h-[280px] bg-white/5 border-white/10 animate-pulse rounded-xl" />
          ))
        ) : brands.length > 0 ? (
          brands.map((brand) => (
            <Link key={brand.id} to={`/project/${brand.id}`} className="block">
              <Card className="p-6 bg-[#050505] border-white/5 flex flex-col justify-between h-[280px] hover:bg-white/[0.02] hover:border-white/20 transition-all cursor-pointer group relative overflow-hidden shadow-md">
                <div className="flex justify-between items-start relative z-10">
                  <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center bg-black shadow-inner shadow-white/5 relative overflow-hidden group-hover:border-white/30 transition-colors">
                    <Sparkles className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform relative z-10" />
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <Badge variant="outline" className="text-[9px] uppercase tracking-widest border-white/10">Active</Badge>
                </div>
                
                <div className="relative z-10 mt-auto">
                    <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">{brand.industry}</div>
                    <h3 className="text-2xl font-heading font-medium text-white mb-4 group-hover:text-primary transition-colors truncate">{brand.name}</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground">Forging Progress</span>
                         <span className="text-xs font-mono font-medium text-white/80">Ready</span>
                      </div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-primary/50 to-primary h-full rounded-full w-full" />
                      </div>
                    </div>
                </div>
              </Card>
            </Link>
          ))
        ) : (
          <div className="col-span-full">
            <EmptyState
              isFirstTime={isFirstTime}
              onCreateBrand={() => navigate('/new-brand')}
            />
          </div>
        )}
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
                   { engine: "Signal Engine", action: "Detected shifting trends in men's sizing.", detail: "Market data shows 24% increase in 'oversized' search volume.", time: "2 hours ago", color: "text-blue-400", bg: "bg-blue-500/20", icon: ChartIcon },
                   { engine: "Craft Engine", action: "Finalized color palette for latest brand.", detail: "Aesthetic aligned to target audience preferences.", time: "1 day ago", color: "text-purple-400", bg: "bg-purple-500/20", icon: Palette }
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
                     <p className="text-sm text-red-200/80 leading-relaxed mb-3">Major player just dropped a new collection in your niche. You need to differentiate positioning ASAP.</p>
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

       {planInfo && (
         <div className="mt-8 p-4 rounded-xl bg-white/[0.02] border border-white/5">
           <div className="flex justify-between items-center mb-2">
             <span className="text-xs text-white/40 uppercase tracking-widest">Brand saves</span>
             <span className="text-xs text-white/60">
               {planInfo.brandCount} / {planInfo.limit === 999999 ? '∞' : planInfo.limit}
               <span className="ml-2 text-orange-400 capitalize">{planInfo.plan} plan</span>
             </span>
           </div>
           <div className="h-1 bg-white/5 rounded-full overflow-hidden">
             <div
               className="h-full bg-orange-500 rounded-full transition-all"
               style={{ width: `${Math.min((planInfo.brandCount / (planInfo.limit === 999999 ? planInfo.brandCount || 1 : planInfo.limit)) * 100, 100)}%` }}
             />
           </div>
           {planInfo.plan === 'free' && (
             <p className="text-xs text-white/30 mt-2">
               Free plan · <Link to="/pricing" className="text-orange-400 hover:underline">Upgrade for more brands</Link>
             </p>
           )}
         </div>
       )}
    </div>
  );
}
