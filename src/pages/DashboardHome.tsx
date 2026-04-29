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
    async function loadData() {
      try {
        setLoading(true)
        const [{ data: brandsData }, planData] = await Promise.all([
          getBrands(),
          getUserPlan(),
        ])
        console.log('Dashboard brands loaded:', brandsData)
        setBrands(brandsData || [])
        setPlanInfo(planData)
        
        if ((brandsData || []).length === 0) {
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
      } catch (err) {
        console.error('Failed to load dashboard data:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData();
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
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700 pb-16">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6 mt-8">
        <div>
          <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-primary/10 border border-primary/20 text-primary text-[10px] uppercase tracking-wider mb-3">
            <Zap className="w-3 h-3" /> FORGE COMMAND CENTER
          </div>
          <h1 className="text-4xl lg:text-5xl font-heading font-medium tracking-tight mb-1">
            {user?.user_metadata?.full_name
              ? `Welcome back, ${user.user_metadata.full_name.split(' ')[0]}.`
              : 'Command Center.'}
          </h1>
          <p className="text-muted-foreground text-lg">
            {brands.length === 0
              ? 'Your forge is empty. Start building your first brand.'
              : `You have ${brands.length} brand${brands.length > 1 ? 's' : ''} in the forge.`}
          </p>
        </div>
        <div className="flex gap-3 items-center">
          {planInfo && planInfo.brandsUsed >= planInfo.brandsLimit ? (
            <Link
              to="/pricing"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-orange-500/40 text-orange-400 text-xs font-bold uppercase tracking-widest hover:bg-orange-500/10 transition-all"
            >
              Upgrade Plan →
            </Link>
          ) : (
            <Link to="/new-brand">
              <Button className="gap-2 bg-primary hover:bg-orange-600 text-white uppercase tracking-widest text-xs font-bold h-10 px-6">
                <PlusCircle className="w-4 h-4" /> New Brand
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* UPGRADE TOAST */}
      {showWelcomeBanner && (
        <div className="flex items-center justify-between p-4 rounded-xl bg-primary/10 border border-primary/20 animate-in slide-in-from-top duration-500">
          <div className="flex items-center gap-3">
            <span className="text-primary text-lg">⚡</span>
            <div>
              <p className="text-sm font-bold text-white">Welcome back to FORGE</p>
              <p className="text-xs text-white/40">Open any brand to continue building or forge a new one.</p>
            </div>
          </div>
          <button onClick={() => setShowWelcomeBanner(false)} className="text-white/20 hover:text-white/60 text-lg ml-4">×</button>
        </div>
      )}

      {/* STATS ROW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Brands Forged',
            value: loading ? '—' : brands.length,
            icon: <BrainCircuit className="w-5 h-5 text-primary" />,
            sub: planInfo ? `${planInfo.brandsLimit === 999 ? '∞' : planInfo.brandsLimit} plan limit` : '',
          },
          {
            label: 'Active Brands',
            value: loading ? '—' : brands.filter(b => b.status === 'active').length,
            icon: <Activity className="w-5 h-5 text-green-400" />,
            sub: 'Currently building',
          },
          {
            label: 'Plan',
            value: loading ? '—' : planInfo?.label || 'Free',
            icon: <Sparkles className="w-5 h-5 text-yellow-400" />,
            sub: <Link to="/pricing" className="text-primary hover:underline">Upgrade →</Link>,
          },
          {
            label: 'Avg Readiness',
            value: loading ? '—' : brands.length > 0
              ? `${Math.round(brands.reduce((a, b) => a + (b.launch_readiness || 0), 0) / brands.length)}%`
              : '0%',
            icon: <TrendingUp className="w-5 h-5 text-blue-400" />,
            sub: 'Across all brands',
          },
        ].map((stat, i) => (
          <Card key={i} className="p-5 bg-black border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{stat.label}</span>
              {stat.icon}
            </div>
            <div className="text-3xl font-light text-white">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.sub}</div>
          </Card>
        ))}
      </div>

      {/* ENGINE QUICK LAUNCH */}
      <div>
        <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Quick Launch</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { label: 'Signal', desc: 'Market Intel', path: '/signal', color: 'text-blue-400 border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10' },
            { label: 'Craft', desc: 'Brand Identity', path: '/craft', color: 'text-primary border-primary/20 bg-primary/5 hover:bg-primary/10' },
            { label: 'Reach', desc: 'Growth & Ads', path: '/reach', color: 'text-green-400 border-green-500/20 bg-green-500/5 hover:bg-green-500/10' },
            { label: 'Pulse', desc: 'Customer CX', path: '/pulse', color: 'text-rose-400 border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10' },
            { label: 'Capital', desc: 'Finance', path: '/capital', color: 'text-yellow-400 border-yellow-500/20 bg-yellow-500/5 hover:bg-yellow-500/10' },
          ].map((engine) => (
            <Link key={engine.path} to={engine.path}>
              <div className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${engine.color}`}>
                <div className={`text-sm font-bold mb-1 ${engine.color.split(' ')[0]}`}>{engine.label}</div>
                <div className="text-xs text-white/40">{engine.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* BRAND CARDS */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-medium flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" /> Your Brands
          </h2>
          {brands.length > 0 && (
            <span className="text-xs text-muted-foreground">{brands.length} total</span>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading ? (
            [1, 2, 3].map(i => (
              <Card key={i} className="h-[280px] bg-white/5 border-white/10 animate-pulse rounded-xl" />
            ))
          ) : brands.length > 0 ? (
            brands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} onDelete={handleDelete} />
            ))
          ) : (
            <div className="col-span-full">
              <EmptyState isFirstTime={isFirstTime} onCreateBrand={() => navigate('/new-brand')} />
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM ROW: Activity + Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" /> Recent Activity
          </h2>
          <Card className="bg-[#050505] border-white/5 p-4 space-y-2">
            {brands.length > 0 ? (
              brands.slice(0, 5).map((brand) => (
                <Link key={brand.id} to={`/project/${brand.id}`}>
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-white group-hover:text-primary transition-colors">{brand.name}</div>
                        <div className="text-xs text-muted-foreground">{brand.industry || 'No industry set'}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-white/30 font-mono">
                        {new Date(brand.created_at).toLocaleDateString()}
                      </span>
                      <ArrowRight className="w-3 h-3 text-white/20 group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-sm text-muted-foreground p-4 text-center">
                No activity yet. Forge your first brand.
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <ChartIcon className="w-4 h-4 text-primary" /> Plan Usage
          </h2>
          {planInfo && (
            <Card className="bg-[#050505] border-white/5 p-5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium capitalize">{planInfo.label} Plan</span>
                <Link to="/pricing">
                  <span className="text-xs text-primary hover:underline cursor-pointer">Upgrade →</span>
                </Link>
              </div>
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                  <span>Brands used</span>
                  <span>{planInfo.brandsUsed} / {planInfo.brandsLimit === 999 ? '∞' : planInfo.brandsLimit}</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${Math.min(planInfo.percentUsed, 100)}%` }}
                  />
                </div>
              </div>
              {planInfo.plan === 'free' && (
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-xs text-white/60 mb-2">Unlock unlimited brands, priority AI, and more.</p>
                  <Link to="/pricing">
                    <Button size="sm" className="w-full bg-primary hover:bg-orange-600 text-white text-xs uppercase tracking-widest">
                      Upgrade Now
                    </Button>
                  </Link>
                </div>
              )}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">All Engines</p>
                {[
                  { name: 'Signal', color: 'bg-blue-500' },
                  { name: 'Craft', color: 'bg-primary' },
                  { name: 'Reach', color: 'bg-green-500' },
                  { name: 'Pulse', color: 'bg-rose-500' },
                  { name: 'Capital', color: 'bg-yellow-500' },
                ].map(e => (
                  <div key={e.name} className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${e.color}`} />
                    <span className="text-xs text-white/60">{e.name} Engine</span>
                    <span className="ml-auto text-[10px] text-green-400 font-mono">ACTIVE</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
