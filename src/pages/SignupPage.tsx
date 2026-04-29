import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';
import { motion } from 'motion/react';
import { signUp } from '../services/supabase';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { error } = await signUp(email, password, fullName);
    
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-[120px]" />
        <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-xl font-heading font-medium hover:opacity-80 transition-opacity z-20">
          <BrainCircuit className="w-6 h-6 text-primary" />
          FORGE
        </Link>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md relative z-10 text-center">
          <Card className="p-8 bg-[#050505] border-white/10 shadow-2xl space-y-6">
            <h1 className="text-2xl font-heading font-medium tracking-tight">Check your email.</h1>
            <p className="text-white/60">We've sent a confirmation link to {email}. Please verify your account to continue.</p>
            <Link to="/login" className="block">
              <Button className="w-full h-12 text-sm font-bold uppercase tracking-widest bg-primary text-white hover:bg-orange-600 transition-all">
                Back to Login
              </Button>
            </Link>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 blur-[120px]" />
      
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-xl font-heading font-medium hover:opacity-80 transition-opacity z-20">
        <BrainCircuit className="w-6 h-6 text-primary" />
        FORGE
      </Link>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading font-medium tracking-tight mb-4 leading-tight">Start building the brand that does not stay in your head.</h1>
          <p className="text-white/60">Create your operating system.</p>
        </div>
        
        <Card className="p-8 bg-[#050505] border-white/10 shadow-2xl space-y-6">
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/50 font-mono">Full Name</label>
                <Input 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe" 
                  className="bg-black border-white/10 h-12" 
                  required
                />
              </div>
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
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/50 font-mono">Password</label>
                <Input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="bg-black border-white/10 h-12" 
                  required
                />
              </div>
            </div>
            
            {error && (
              <div className="text-red-500 text-xs text-center">{error}</div>
            )}
            
            <Button 
              type="submit"
              disabled={loading}
              className="w-full h-12 text-sm font-bold uppercase tracking-widest bg-white text-black hover:bg-gray-200 custom-glow transition-all"
            >
              {loading ? 'Creating...' : 'Create Account'}
            </Button>
          </form>
          
          <div className="text-center text-xs text-white/40">
            Already have an account? <Link to="/login" className="text-white hover:text-primary transition-colors">Log in</Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
