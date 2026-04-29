import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { BrainCircuit, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { resetPassword } from '../services/supabase';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await resetPassword(email);
    
    if (error) {
      toast.error(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      toast.success("Reset link sent!");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 blur-[120px]" />
      
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-xl font-heading font-medium hover:opacity-80 transition-opacity z-20">
        <BrainCircuit className="w-6 h-6 text-primary" />
        FORGE
      </Link>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading font-medium tracking-tight mb-2">Reset your access.</h1>
          <p className="text-white/60">We'll send you a link to reset your password.</p>
        </div>
        
        <Card className="p-8 bg-[#050505] border-white/10 shadow-2xl space-y-6">
          {success ? (
            <div className="space-y-6 text-center">
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <p className="text-sm text-primary-foreground">Check your inbox for a reset link.</p>
              </div>
              <Link to="/login" className="block">
                <Button className="w-full h-12 text-sm font-bold uppercase tracking-widest bg-primary hover:bg-orange-600 text-white transition-all">
                  Back to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/50 font-mono">Email Address</label>
                  <Input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="founder@brand.xyz" 
                    className="bg-black border-white/10 h-12" 
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit"
                disabled={loading}
                className="w-full h-12 text-sm font-bold uppercase tracking-widest bg-primary hover:bg-orange-600 text-white transition-all"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
          )}
          
          <div className="text-center">
            <Link to="/login" className="inline-flex items-center text-xs text-white/40 hover:text-white transition-colors">
              <ArrowLeft className="w-3 h-3 mr-2" /> Back to login
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
