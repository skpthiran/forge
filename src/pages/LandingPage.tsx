import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { BatteryCharging, Globe, Target, LayoutDashboard, BrainCircuit, LineChart } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-foreground overflow-hidden font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-6 backdrop-blur-md border-b justify-between w-full border-white/5 bg-black/50">
        <div className="text-2xl font-heading font-extrabold tracking-widest uppercase flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.5)]">
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          FORGE
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground mr-12">
          <a href="#product" className="hover:text-white transition-colors cursor-pointer">Product</a>
          <a href="#pricing" className="hover:text-white transition-colors cursor-pointer">Pricing</a>
          <a href="#manifesto" className="hover:text-white transition-colors cursor-pointer">Manifesto</a>
        </div>
        <div className="flex gap-4">
          <Link to="/login">
            <Button variant="ghost" className="text-muted-foreground hover:text-white hover:bg-white/10 uppercase tracking-widest text-xs">Login</Button>
          </Link>
          <Link to="/new-brand">
            <Button className="bg-primary hover:bg-orange-600 text-white uppercase tracking-widest text-xs px-6 custom-glow">Start Forging</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 md:px-12 flex flex-col lg:flex-row items-center relative z-10 max-w-[1600px] mx-auto">
        
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] -translate-y-1/2 -z-10 pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] z-[-10] pointer-events-none" />

        <div className="flex-1 lg:pr-12 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 mt-12 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">Version 2.0 Live</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-[90px] xl:text-[110px] leading-[0.85] font-heading font-medium tracking-tighter mb-8 text-white">
              Forge a <span className="text-gradient-molten font-bold">real brand</span><br/>from a raw idea.
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-12 font-light leading-relaxed">
              FORGE is an AI Brand Operating System that turns your business idea into market research, brand identity, product strategy, website copy, launch content, and growth direction — all in one intelligent workspace.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
              <Link to="/new-brand">
                <Button className="h-14 px-8 text-sm uppercase tracking-widest font-semibold bg-white text-black hover:bg-gray-200 w-full sm:w-auto shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  Start Forging
                </Button>
              </Link>
              <Button variant="outline" className="h-14 px-8 text-sm uppercase tracking-widest font-semibold border-white/20 hover:bg-white/5 hover:text-white w-full sm:w-auto">
                Watch Demo
              </Button>
            </div>
            
            <p className="mt-8 text-xs font-mono text-muted-foreground uppercase tracking-widest opacity-60">
              Built for creators, founders, solo entrepreneurs, agencies, and small brands.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="flex-1 w-full mt-20 lg:mt-0 perspective-1000"
        >
          {/* Dashboard Mockup */}
          <div className="relative rounded-2xl border border-white/10 bg-black shadow-[0_20px_70px_rgba(0,0,0,0.8)] overflow-hidden transform rotate-y-[-5deg] rotate-x-[5deg] scale-[0.95]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            <div className="h-8 border-b border-white/10 flex items-center px-4 gap-2 bg-[#0a0a0a]">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="p-6 grid grid-cols-3 gap-6 h-[500px]">
              <div className="col-span-1 border-r border-white/5 pr-6 space-y-4">
                 <div className="h-10 bg-white/5 rounded w-full" />
                 <div className="h-6 bg-white/5 rounded w-3/4" />
                 <div className="h-6 bg-white/5 rounded w-full" />
                 <div className="h-6 bg-white/5 rounded w-5/6" />
                 <div className="h-24 bg-primary/10 border border-primary/20 rounded mt-8" />
              </div>
              <div className="col-span-2 space-y-6">
                <div className="h-32 bg-white/5 rounded border border-white/10 p-6 relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-orange-500" />
                   <div className="h-4 bg-white/10 w-1/4 rounded mb-4" />
                   <div className="h-4 bg-white/10 w-1/2 rounded" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-40 bg-white/5 rounded border border-white/10" />
                  <div className="h-40 bg-white/5 rounded border border-white/10" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* The Problem */}
      <section className="py-32 px-6 md:px-12 border-t border-white/5 relative z-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight mb-16 text-center">Starting a brand is <span className="italic text-muted-foreground">still too hard.</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "You don't know what to sell", icon: Target },
              { title: "You don't know who the audience is", icon: Globe },
              { title: "You don't know how to position", icon: LayoutDashboard },
              { title: "You need too many tools & skills", icon: BatteryCharging }
            ].map((pain, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center mb-6 group-hover:border-primary/50 transition-colors">
                  <pain.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-lg font-medium text-white/90">{pain.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The 5 AI Engines */}
      <section id="product" className="py-32 px-6 md:px-12 border-t border-white/5 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight mb-4">Five intelligent engines.<br/>One complete <span className="text-primary italic">operating system.</span></h2>
            <p className="text-lg text-muted-foreground">Every phase of building a brand, augmented by specialized AI.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Signal Engine", sub: "Market Intelligence", desc: "Finds trends, gaps, competitors, pain points, and product opportunities." },
              { name: "Craft Engine", sub: "Brand & Product Creation", desc: "Creates names, positioning, product concepts, identity direction, and launch assets." },
              { name: "Reach Engine", sub: "Growth & Marketing", desc: "Generates ad angles, content hooks, campaigns, emails, and influencer strategies." },
              { name: "Pulse Engine", sub: "Customer Experience", desc: "Helps brands handle support, reviews, loyalty, retention, and customer communication." },
              { name: "Capital Engine", sub: "Finance & Operations", desc: "Helps with pricing, margins, inventory, revenue forecasting, and growth decisions." }
            ].map((engine, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-[#0c0c0c] to-[#050505] border border-white/10 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.1)] transition-all group"
              >
                <div className="text-xs font-mono uppercase tracking-widest text-primary mb-2">{engine.sub}</div>
                <h3 className="text-2xl font-medium mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-orange-400 transition-colors uppercase tracking-wide font-heading">{engine.name}</h3>
                <p className="text-muted-foreground leading-relaxed">{engine.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-32 px-6 md:px-12 relative z-10 border-t border-white/5 bg-[#020202]">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
               <h2 className="text-4xl md:text-5xl lg:text-5xl font-heading font-medium tracking-tight leading-tight">
                 Your Brand Blueprint,<br/><span className="text-primary italic">Forged in Minutes.</span>
               </h2>
               <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl relative">
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                    <BrainCircuit className="w-24 h-24 text-white" />
                 </div>
                 <p className="font-mono text-xs text-primary mb-4 uppercase tracking-widest">Raw Input</p>
                 <p className="text-2xl font-light leading-relaxed text-white/90 relative z-10">
                   "I want to start a premium gym clothing brand for young men who hate neon colors and giant logos."
                 </p>
               </div>
               <div className="flex items-center gap-4 text-white/50 text-xs font-mono uppercase tracking-widest">
                  <div className="w-12 h-[1px] bg-white/20" /> Processed via FORGE AI
               </div>
            </div>
            <div className="flex-1 w-full space-y-4">
               {[
                 { title: "Market gap found", desc: "Minimalist activewear for \"stealth wealth\" lifters." },
                 { title: "Target audience mapped", desc: "Gen Z males, 18-28. High disposable income." },
                 { title: "Brand names generated", desc: "IronBloom, OBSIDIAN Fit, VLTGE." },
                 { title: "First product line created", desc: "400gsm oversized pump cover, 5-inch core shorts." },
               ].map((item, i) => (
                 <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="p-6 rounded-xl border border-white/[0.08] bg-black flex items-start gap-4 relative overflow-hidden group hover:border-primary/30 transition-colors"
                 >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                    <LineChart className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <div>
                      <h4 className="text-white font-medium mb-1 group-hover:text-primary transition-colors">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Who It's For */}
      <section className="py-24 px-6 md:px-12 bg-[#020202] border-t border-white/5 relative z-10 text-center">
         <div className="max-w-4xl mx-auto">
            <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-12">Engineered For</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {['Solo Founders', 'Student Entrepreneurs', 'Content Creators', 'Small Business Owners', 'Agencies', 'Ecommerce Builders'].map(audience => (
                <div key={audience} className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-sm uppercase tracking-wider hover:bg-white/10 transition-colors">
                   {audience}
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="py-32 px-6 md:px-12 border-t border-white/5 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight mb-4">Pricing that scales<br/>with your ambition.</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
             {[
               { name: "Starter", price: "$19", desc: "For validating ideas and creating brand launch kits." },
               { name: "Builder", price: "$49", desc: "For serious founders building multiple brand projects.", popular: true },
               { name: "Forge Pro", price: "$99", desc: "For agencies, ecommerce operators, and power users." }
             ].map((plan, i) => (
                <div key={i} className={`p-8 rounded-2xl border ${plan.popular ? 'border-primary relative shadow-[0_0_40px_rgba(249,115,22,0.1)] bg-white/[0.02]' : 'border-white/10 bg-black'}`}>
                   {plan.popular && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-primary text-primary-foreground text-[10px] uppercase font-bold tracking-widest rounded-full">Most Popular</div>}
                   <h3 className="text-xl font-medium mb-2">{plan.name}</h3>
                   <div className="flex items-baseline gap-1 mb-4">
                     <span className="text-4xl font-light">{plan.price}</span><span className="text-muted-foreground">/mo</span>
                   </div>
                   <p className="text-sm text-muted-foreground mb-8">{plan.desc}</p>
                   <Button className={`w-full ${plan.popular ? 'bg-white text-black hover:bg-gray-200' : 'bg-white/5 hover:bg-white/10 text-white'}`}>Select Plan</Button>
                </div>
             ))}
           </div>
        </div>
      </section>

      <section id="manifesto" className="py-32 px-6 md:px-12 text-center relative overflow-hidden border-t border-white/5 bg-[#050505]">
          <div className="absolute inset-0 bg-primary/5 blur-[100px]" />
          <h2 className="text-5xl md:text-7xl font-heading font-medium tracking-tight mb-12 relative z-10">
            Your idea does not need to<br/> <span className="italic text-muted-foreground">stay in your head.</span>
          </h2>
          <Link to="/new-brand" className="relative z-10 inline-block">
            <Button className="h-16 px-12 text-sm uppercase tracking-widest font-bold bg-white text-black hover:bg-gray-200 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              Start Forging Your Brand
            </Button>
          </Link>
      </section>

    </div>
  );
}
