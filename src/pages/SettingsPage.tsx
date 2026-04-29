import { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'
import { getUserPlan, PLAN_LIMITS } from '../services/supabase'
import { Link } from 'react-router-dom'

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [planInfo, setPlanInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      const info = await getUserPlan()
      setPlanInfo(info)
      setLoading(false)
    }
    load()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const handlePasswordReset = async () => {
    if (!user?.email) return
    const { error } = await supabase.auth.resetPasswordForEmail(user.email)
    setMessage(error ? 'Failed to send reset email.' : 'Reset link sent to your email.')
  }

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="mb-12">
          <Link to="/dashboard" className="text-xs text-white/40 hover:text-white/60 uppercase tracking-widest transition-colors">
            ← Dashboard
          </Link>
          <h1 className="text-3xl font-bold mt-6">Settings</h1>
        </div>

        {/* Account */}
        <section className="mb-8 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6">Account</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-white/40 uppercase tracking-widest">Email</label>
              <p className="text-white mt-1">{user?.email}</p>
            </div>
            <div>
              <label className="text-xs text-white/40 uppercase tracking-widest">User ID</label>
              <p className="text-white/40 text-xs mt-1 font-mono">{user?.id}</p>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button
              onClick={handlePasswordReset}
              className="px-4 py-2 rounded-lg border border-white/10 hover:border-white/20 text-white/60 hover:text-white text-xs uppercase tracking-widest transition-all"
            >
              Reset Password
            </button>
          </div>
          {message && <p className="mt-3 text-xs text-orange-400">{message}</p>}
        </section>

        {/* Plan */}
        <section className="mb-8 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6">Plan</h2>
          {planInfo && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold capitalize">{planInfo.plan} Plan</p>
                  <p className="text-xs text-white/40 mt-1">
                    {planInfo.brandCount} of {planInfo.limit === 999999 ? 'unlimited' : planInfo.limit} brand saves used
                  </p>
                </div>
                {planInfo.plan === 'free' && (
                  <Link
                    to="/pricing"
                    className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-black text-xs font-bold uppercase tracking-widest transition-all"
                  >
                    Upgrade
                  </Link>
                )}
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full"
                  style={{ width: `${Math.min((planInfo.brandCount / (planInfo.limit === 999999 ? Math.max(planInfo.brandCount, 1) : planInfo.limit)) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}
        </section>

        {/* Danger Zone */}
        <section className="p-6 rounded-2xl bg-red-500/[0.03] border border-red-500/10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-red-400/60 mb-6">Danger Zone</h2>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 rounded-lg border border-red-500/20 hover:border-red-500/40 text-red-400/60 hover:text-red-400 text-xs uppercase tracking-widest transition-all"
          >
            Sign Out
          </button>
        </section>
      </div>
    </div>
  )
}
