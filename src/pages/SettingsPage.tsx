import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Settings, User, Building, Cpu, CreditCard } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-heading font-medium tracking-tight mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your workspace, preferences, and billing.</p>
      </div>

      <Tabs defaultValue="profile" className="flex flex-col md:flex-row gap-8">
        <TabsList className="flex md:flex-col h-auto bg-transparent border-0 justify-start w-full md:w-48 space-y-0 md:space-y-2 space-x-2 md:space-x-0 overflow-x-auto">
           <TabsTrigger value="profile" className="data-active:bg-white/10 data-active:text-white justify-start py-2 px-4 w-full text-muted-foreground"><User className="w-4 h-4 mr-3" /> Profile</TabsTrigger>
           <TabsTrigger value="workspace" className="data-active:bg-white/10 data-active:text-white justify-start py-2 px-4 w-full text-muted-foreground"><Building className="w-4 h-4 mr-3" /> Workspace</TabsTrigger>
           <TabsTrigger value="ai" className="data-active:bg-white/10 data-active:text-white justify-start py-2 px-4 w-full text-muted-foreground"><Cpu className="w-4 h-4 mr-3" /> AI Engine</TabsTrigger>
           <TabsTrigger value="billing" className="data-active:bg-white/10 data-active:text-white justify-start py-2 px-4 w-full text-muted-foreground"><CreditCard className="w-4 h-4 mr-3" /> Billing</TabsTrigger>
        </TabsList>

        <div className="flex-1">
          <TabsContent value="profile" className="m-0 animate-in fade-in zoom-in-95 duration-300">
             <Card className="p-8 bg-black border-white/10 space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Founder Profile</h3>
                  <p className="text-sm text-muted-foreground">Update your personal details.</p>
                </div>
                <div className="space-y-4 max-w-md">
                   <div className="space-y-2">
                     <label className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Full Name</label>
                     <Input defaultValue="Alex Founder" className="bg-white/5 border-white/10" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Email Address</label>
                     <Input defaultValue="alex@founder.co" className="bg-white/5 border-white/10" />
                   </div>
                   <Button className="mt-4 bg-white text-black hover:bg-gray-200 uppercase tracking-widest text-xs font-bold px-6">Save Changes</Button>
                </div>
             </Card>
          </TabsContent>

          <TabsContent value="workspace" className="m-0 animate-in fade-in zoom-in-95 duration-300">
             <Card className="p-8 bg-black border-white/10 space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Workspace Settings</h3>
                  <p className="text-sm text-muted-foreground">Manage defaults for all new projects.</p>
                </div>
                <div className="space-y-4 max-w-md">
                   <div className="space-y-2">
                     <label className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Default Industry</label>
                     <Input defaultValue="Fashion & Apparel" className="bg-white/5 border-white/10" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Default Target Market</label>
                     <Input defaultValue="United States" className="bg-white/5 border-white/10" />
                   </div>
                   <Button className="mt-4 bg-white text-black hover:bg-gray-200 uppercase tracking-widest text-xs font-bold px-6">Save Workspace</Button>
                </div>
             </Card>
          </TabsContent>

          <TabsContent value="ai" className="m-0 animate-in fade-in zoom-in-95 duration-300">
             <Card className="p-8 bg-black border-white/10 space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">AI Engine Tuning</h3>
                  <p className="text-sm text-muted-foreground">Adjust how FORGE generates your blueprints.</p>
                </div>
                
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg mb-4">
                   <p className="text-sm text-primary">Forge Pro accounts get priority access to advanced models.</p>
                </div>
                
                <div className="space-y-4">
                   <div className="flex items-center justify-between p-4 rounded-md border border-white/5 bg-white/[0.02]">
                      <div>
                         <p className="text-sm font-medium text-white">Aggressive Differentiation</p>
                         <p className="text-xs text-white/50">AI will suggest more polarizing, high-risk/high-reward positioning.</p>
                      </div>
                      <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer shadow-[0_0_10px_rgba(249,115,22,0.3)]">
                         <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5" />
                      </div>
                   </div>
                   <div className="flex items-center justify-between p-4 rounded-md border border-white/5 bg-white/[0.02]">
                      <div>
                         <p className="text-sm font-medium text-white">Direct-Response Copy</p>
                         <p className="text-xs text-white/50">Prioritize conversion over poetic brand storytelling in copy generation.</p>
                      </div>
                      <div className="w-10 h-5 bg-white/10 rounded-full relative cursor-pointer">
                         <div className="w-4 h-4 bg-white/50 rounded-full absolute left-0.5 top-0.5" />
                      </div>
                   </div>
                </div>
             </Card>
          </TabsContent>

          <TabsContent value="billing" className="m-0 animate-in fade-in zoom-in-95 duration-300">
             <Card className="p-8 bg-black border-white/10 space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Current Plan</h3>
                  <p className="text-sm text-muted-foreground">You are currently on a paid subscription.</p>
                </div>
                <div className="p-6 rounded-xl border border-white/10 bg-gradient-to-br from-[#0c0c0c] to-[#050505]">
                   <div className="flex justify-between items-center mb-6">
                      <h4 className="text-2xl font-bold tracking-tight text-white font-heading">Forge Pro</h4>
                      <Badge className="bg-white text-black hover:bg-gray-200">Active</Badge>
                   </div>
                   <div className="text-sm text-muted-foreground mb-6">
                      $99/month. Next billing date: Oct 1, 2024.
                   </div>
                   <div className="flex gap-4">
                      <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10">Manage Subscription</Button>
                      <Button variant="ghost" className="text-muted-foreground hover:text-white">View Invoices</Button>
                   </div>
                </div>
             </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
