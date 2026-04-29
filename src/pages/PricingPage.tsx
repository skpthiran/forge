import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$19",
      desc: "For validating ideas and creating brand launch kits.",
      features: ["1 Brand project", "Basic Market reports", "Export options"],
      recommended: false
    },
    {
      name: "Builder",
      price: "$49",
      desc: "For serious founders building multiple brand projects.",
      features: ["3 Brand projects", "AI brand identity generation", "Product strategy", "Website copy", "Priority AI"],
      recommended: true
    },
    {
      name: "Forge Pro",
      price: "$99",
      desc: "For agencies, ecommerce operators, and power users.",
      features: ["Unlimited projects", "Growth campaigns", "Finance tools", "Dedicated Support"],
      recommended: false
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20">
      <div className="text-center">
        <h1 className="text-4xl font-heading font-medium tracking-tight mb-4">Pricing</h1>
        <p className="text-muted-foreground text-lg">Choose the intelligence level for your brand.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
        {plans.map((plan) => (
          <Card key={plan.name} className={`p-8 bg-black/50 border flex flex-col ${plan.recommended ? 'border-primary relative shadow-[0_0_30px_rgba(249,115,22,0.15)]' : 'border-white/10'}`}>
            {plan.recommended && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-primary text-primary-foreground text-[10px] uppercase tracking-widest rounded-full font-bold">
                Most Popular
              </div>
            )}
            <h3 className="text-2xl font-medium mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-4">
               <span className="text-4xl font-light">{plan.price}</span>
               <span className="text-muted-foreground">/month</span>
            </div>
            <p className="text-sm text-muted-foreground mb-8 min-h-[40px]">{plan.desc}</p>
            
            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <Button className={plan.recommended ? "bg-white text-black hover:bg-gray-200" : "bg-white/5 hover:bg-white/10"}>
              {plan.recommended ? "Start Building" : "Select Plan"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
