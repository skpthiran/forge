import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getBrands, Brand, deleteBrand } from '../services/supabase';
import BrandCard from '../components/BrandCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search, FolderOpen, Filter } from 'lucide-react';
import { toast } from 'sonner';

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [filtered, setFiltered] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    async function load() {
      try {
        const { data } = await getBrands();
        setBrands(data || []);
        setFiltered(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    let result = brands;
    if (search) {
      result = result.filter(b =>
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        (b.industry || '').toLowerCase().includes(search.toLowerCase())
      );
    }
    if (statusFilter !== 'all') {
      result = result.filter(b => b.status === statusFilter);
    }
    setFiltered(result);
  }, [search, statusFilter, brands]);

  const handleDelete = async (id: string) => {
    const { error } = await deleteBrand(id);
    if (!error) {
      setBrands(prev => prev.filter(b => b.id !== id));
      toast.success('Brand deleted.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700 pb-16">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6 mt-8">
        <div>
          <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-white/5 border border-white/10 text-white/70 text-[10px] uppercase tracking-wider mb-3">
            <FolderOpen className="w-3 h-3 text-primary" /> ALL PROJECTS
          </div>
          <h1 className="text-4xl lg:text-5xl font-heading font-medium tracking-tight mb-1">Your Brands</h1>
          <p className="text-muted-foreground">
            {loading ? 'Loading...' : `${brands.length} brand${brands.length !== 1 ? 's' : ''} in your forge`}
          </p>
        </div>
        <Link to="/new-brand">
          <Button className="gap-2 bg-primary hover:bg-orange-600 text-white uppercase tracking-widest text-xs font-bold h-10 px-6">
            <PlusCircle className="w-4 h-4" /> New Brand
          </Button>
        </Link>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search brands..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 bg-black/50 border-white/10"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'active', 'archived'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider border transition-all ${
                statusFilter === s
                  ? 'bg-primary text-white border-primary'
                  : 'bg-black/50 text-muted-foreground border-white/10 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* BRAND GRID */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map(i => (
            <Card key={i} className="h-[280px] bg-white/5 border-white/10 animate-pulse rounded-xl" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(brand => (
            <BrandCard key={brand.id} brand={brand} onDelete={handleDelete} />
          ))}
        </div>
      ) : brands.length === 0 ? (
        <div className="text-center py-24 space-y-4">
          <FolderOpen className="w-12 h-12 text-white/10 mx-auto" />
          <p className="text-muted-foreground">No brands yet.</p>
          <Link to="/new-brand">
            <Button className="bg-primary hover:bg-orange-600 text-white uppercase tracking-widest text-xs font-bold">
              Forge Your First Brand
            </Button>
          </Link>
        </div>
      ) : (
        <div className="text-center py-24 space-y-2">
          <p className="text-muted-foreground">No brands match your search.</p>
          <button onClick={() => { setSearch(''); setStatusFilter('all'); }} className="text-primary text-sm hover:underline">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
