import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HeartPulse, MessageCircle, Star, Repeat, Inbox, CheckCircle2, Sparkles, Send } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function PulseEnginePage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex justify-between items-end border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] uppercase tracking-wider mb-3">
            <HeartPulse className="w-3 h-3" /> Listening
          </div>
          <h1 className="text-3xl lg:text-4xl font-heading font-medium tracking-tight mb-2">Pulse Engine</h1>
          <p className="text-muted-foreground">Customer Experience AI: Support, loyalty, and feedback.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <Card className="p-6 bg-black border-white/10">
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-mono">Sentiment Score</h3>
            <div className="text-4xl font-light text-green-400 mb-2">92%</div>
            <p className="text-xs text-white/50">Based on 0 mock reviews (Pre-launch)</p>
         </Card>
         <Card className="p-6 bg-black border-white/10">
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-mono">Pending Tickets</h3>
            <div className="text-4xl font-light text-white mb-2">4</div>
            <p className="text-xs text-white/50">AI has drafted responses.</p>
         </Card>
         <Card className="col-span-2 p-6 bg-black border-white/10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5">
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-mono">AI Retention Strategy</h3>
            <p className="text-sm text-white/80 leading-relaxed max-w-sm mb-4">
              "To build a cult following for IronBloom, include a handwritten-style note about discipline in every first order, signed by 'Founder'. Do not offer discounts; offer early access to Drop 02."
            </p>
            <Button size="sm" variant="outline" className="h-7 text-xs border-white/10 bg-white/5">Apply to Post-Purchase Flow</Button>
         </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="col-span-2 space-y-6">
            <h2 className="text-lg font-heading font-medium flex items-center gap-2"><Inbox className="w-5 h-5 text-muted-foreground" /> AI Support Inbox</h2>
            <div className="space-y-4">
               {[
                 { q: "Will the pump cover shrink after washing?", from: "alex.g@gmail.com", time: "2 hours ago" },
                 { q: "Can I pre-order the 5-inch shorts?", from: "david199@yahoo.com", time: "5 hours ago" },
                 { q: "Do you ship to the UK?", from: "smith.j@outlook.com", time: "1 day ago" }
               ].map((msg, i) => (
                 <Card key={i} className="p-0 bg-[#050505] border-white/10 overflow-hidden">
                    <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs text-white/50">{msg.from.charAt(0).toUpperCase()}</div>
                         <div>
                            <p className="text-xs font-mono text-muted-foreground">{msg.from}</p>
                            <p className="text-sm text-white font-medium">{msg.q}</p>
                         </div>
                       </div>
                       <span className="text-[10px] text-white/30 uppercase">{msg.time}</span>
                    </div>
                    <div className="p-4 bg-black relative">
                       <div className="absolute top-4 left-4">
                         <div className="w-6 h-6 rounded-sm bg-primary/20 flex items-center justify-center border border-primary/30"><Sparkles className="w-3 h-3 text-primary" /></div>
                       </div>
                       <div className="pl-10">
                          <p className="text-xs text-primary uppercase font-mono tracking-widest mb-2">AI Drafted Response — Premium Tone</p>
                          <p className="text-sm text-white/80 leading-relaxed mb-4">
                            "Hey Alex. The pump cover is made from pre-shrunk 400gsm heavyweight cotton. To maintain the exact boxy fit, we recommend washing cold and hang drying. Let us know if you need sizing help. - IronBloom Team"
                          </p>
                          <div className="flex gap-2">
                             <Button size="sm" className="bg-white text-black hover:bg-gray-200 text-xs px-4 h-8"><Send className="w-3 h-3 mr-2"/> Send Reply</Button>
                             <Button size="sm" variant="outline" className="border-white/10 text-xs px-4 h-8 bg-transparent">Edit</Button>
                          </div>
                       </div>
                    </div>
                 </Card>
               ))}
            </div>
         </div>

         <div className="col-span-1 space-y-6">
            <h2 className="text-lg font-heading font-medium flex items-center gap-2"><Star className="w-5 h-5 text-muted-foreground" /> FAQ Builder</h2>
            <Card className="p-6 bg-black border-white/10">
               <p className="text-sm text-muted-foreground mb-6">Based on market research and our product strategy, the AI suggests these FAQs for the landing page:</p>
               <div className="space-y-4">
                 {[
                   { q: "Why is it so heavy?", a: "We use 400gsm cotton so it drapes perfectly and hides sweat during heavy lifts." },
                   { q: "Is there a built-in liner?", a: "No. Our 5-inch shorts are unlined for maximum versatility." },
                   { q: "When will Drop 01 ship?", a: "All pre-orders will be dispatched within 14 days of the drop closing." }
                 ].map((faq, i) => (
                   <div key={i} className="pb-4 border-b border-white/5 last:border-0 last:pb-0">
                      <h4 className="text-sm font-medium text-white mb-1">Q: {faq.q}</h4>
                      <p className="text-xs text-white/60">A: {faq.a}</p>
                   </div>
                 ))}
               </div>
               <Button className="w-full mt-6 bg-white/5 border border-white/10 hover:bg-white/10 text-xs text-white">Export to Website Copy</Button>
            </Card>
         </div>
      </div>
    </div>
  );
}
