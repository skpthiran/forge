import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import EmptyState from '../components/EmptyState';
import BrandCard from '../components/BrandCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Activity, Sparkles, TrendingUp, Search, BrainCircuit, RefreshCw, Zap, ArrowRight, LineChart as ChartIcon, CheckCircle2, AlertCircle, Palette, Target, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { getBrands, Brand, getUserPlan, PLAN_LIMITS, deleteBrand } from '../services/supabase';
import { toast } from 'sonner';

export default function DashboardHome() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [planInfo, setPlanInfo] = useState<any>(null);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('upgraded') === 'true') {
      toast.success('Plan upgraded successfully! Welcome to your new plan.')
      window.history.replaceState({}, '', '/dashboard')
    }
  }, [])

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

  const handleDelete = async (id: string) => {
    const { error } = await deleteBrand(id)
    if (!error) {
      setBrands(prev => prev.filter(b => b.id !== id))
      const info = await getUserPlan()
      setPlanInfo(info)
    }
  }

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
           {planInfo && planInfo.brandsUsed >= planInfo.brandsLimit ? (
             <div className="flex items-center gap-3">
               <span className="text-xs text-white/40">
                 {planInfo.brandsUsed}/{planInfo.brandsLimit} brands used
               </span>
               <Link
                 to="/pricing"
                 className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-orange-500/40 text-orange-400 text-xs font-bold uppercase tracking-widest hover:bg-orange-500/10 transition-all"
               >
                 Upgrade to add more →
               </Link>
             </div>
           ) : (
             <Link to="/new-brand">
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

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          [1,2,3].map(i => (
            <Card key={i} className="h-[280px] bg-white/5 border-white/10 animate-pulse rounded-xl" />
          ))
        ) : brands.length > 0 ? (
          brands.map((brand) => (
            <BrandCard
              key={brand.id}
              brand={brand}
              onDelete={handleDelete}
            />
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
              <div className="space-y-3">
                {brands && brands.length > 0 ? (
                  brands.slice(0, 3).map((brand) => (
                    <div key={brand.id} className="flex items-center gap-3 p-3 rounded-lg bg-black/50 border border-white/5">
                      <div className="text-[10px] text-muted-foreground font-mono uppercase">
                        {new Date(brand.created_at).toLocaleDateString()}
                      </div>
                      <div className="text-sm font-medium">{brand.name}</div>
                      <div className="text-xs text-muted-foreground">{brand.industry}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground p-3">
                    No activity yet. Forge your first brand to get started.
                  </div>
                )}
              </div>
           </Card>
        </div>

        <div className="col-span-1 space-y-6">
           <h2 className="text-xl font-heading font-medium border-b border-white/10 pb-4 flex items-center gap-2"><Target className="w-5 h-5 text-primary"/> Market Signals</h2>
           
           <Card className="bg-[#050505] border-white/5 p-4 flex flex-col gap-4">
              <div className="text-sm text-muted-foreground p-4">
                Market signals will appear here as you run your engines.
              </div>
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
               {planInfo.brandsUsed} / {planInfo.brandsLimit === 999 ? '∞' : planInfo.brandsLimit}
               <span className="ml-2 text-orange-400 capitalize">{planInfo.plan} plan</span>
             </span>
           </div>
           <div className="h-1 bg-white/5 rounded-full overflow-hidden">
             <div
               className="h-full bg-orange-500 rounded-full transition-all"
               style={{ width: `${planInfo.percentUsed}%` }}
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
