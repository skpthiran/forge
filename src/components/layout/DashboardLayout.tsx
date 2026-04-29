import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  PlusCircle, 
  Activity, 
  Cpu, 
  Send, 
  HeartPulse, 
  Briefcase, 
  FolderOpen, 
  CreditCard, 
  Settings,
  Sparkles,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../contexts/AuthContext';
import { getProfile } from '../../services/supabase'
import { useEffect } from 'react';

const sidebarItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: PlusCircle, label: 'New Brand', path: '/new-brand' },
  { icon: Activity, label: 'Signal Engine', path: '/signal' },
  { icon: Cpu, label: 'Craft Engine', path: '/craft' },
  { icon: Send, label: 'Reach Engine', path: '/reach' },
  { icon: HeartPulse, label: 'Pulse Engine', path: '/pulse' },
  { icon: Briefcase, label: 'Capital Engine', path: '/capital' },
  { icon: FolderOpen, label: 'Projects', path: '/projects' },
  { icon: CreditCard, label: 'Pricing', path: '/pricing' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

function SidebarContent({ isMobile = false, setIsOpen }: { isMobile?: boolean, setIsOpen?: (v: boolean) => void }) {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [plan, setPlan] = useState('Free')

  useEffect(() => {
    getProfile().then(({ data }) => {
      if (data?.plan) setPlan(data.plan.charAt(0).toUpperCase() + data.plan.slice(1))
    })
  }, [])

  return (
    <>
      <div className="p-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen?.(false)}>
          <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-primary to-orange-700 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-heading font-bold tracking-widest uppercase">Forge</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen?.(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all group relative",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              {isActive && !isMobile && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
              {isActive && isMobile && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
              )}
              <Icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-border mt-auto space-y-2">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center outline outline-1 outline-border overflow-hidden">
            <span className="text-xs font-bold text-foreground">
              {(user?.user_metadata?.full_name?.[0] || user?.email?.[0] || '?').toUpperCase()}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium truncate max-w-[150px]">
              {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
            </span>
            <span className="text-xs text-muted-foreground">{plan}</span>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          className="w-full justify-start gap-3 px-3 text-muted-foreground hover:text-red-400 hover:bg-red-400/5 transition-colors"
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4" />
          <span className="text-xs uppercase tracking-widest font-bold">Log Out</span>
        </Button>
      </div>
    </>
  );
}

export default function DashboardLayout() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-shrink-0 border-r border-border bg-black flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-gradient-to-b from-black to-background">
        {/* Soft background glow */}
        <div className="absolute top-0 right-0 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-primary/5 rounded-full blur-[100px] md:blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        {/* Top bar */}
        <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-white/5 z-20 backdrop-blur-sm bg-black/50 md:bg-transparent">
          <div className="flex items-center gap-4">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-0 bg-black border-r border-white/10 flex flex-col">
                <SidebarContent isMobile setIsOpen={setIsOpen} />
              </SheetContent>
            </Sheet>
            
            <div className="text-xs md:text-sm text-muted-foreground font-mono hidden md:block">
              {location.pathname}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] md:text-xs font-medium outline outline-1 outline-primary/30 flex items-center gap-2 custom-glow uppercase tracking-widest">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse" />
                AI Online
             </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 z-10 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
