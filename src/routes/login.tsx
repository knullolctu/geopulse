import React, { useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import Card from '../components/Card'
import { THEME } from '../theme'
import { useNotification } from '../components/Notification'
import { clientLogin } from '../lib/client-auth'
import { supabase } from '../lib/supabase'

export const Route = createFileRoute('/login')({
  head: () => ({ meta: [{ title: 'GeoPulse - Login' }] }),
  component: LoginPage
})

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForgot, setShowForgot] = useState(false)
  const [forgotStep, setForgotStep] = useState(1) // 1: Verify, 2: Reset
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotBday, setForgotBday] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNew, setConfirmNew] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResetting, setIsResetting] = useState(false)

  const { showNotif } = useNotification()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await clientLogin(email, password)
      if (result.success && result.user) {
        showNotif('Welcome back!', 'success')
        const role = result.user.role
        if (!result.user.orgCode && role !== 'Admin') {
          navigate({ to: '/onboard' })
          return
        }
        if (role === 'Admin') navigate({ to: '/admin/dashboard' })
        else if (role === 'Attendee') navigate({ to: '/attendee/dashboard' })
        else if (role === 'Client') navigate({ to: '/client/dashboard' })
        else navigate({ to: '/' })
        return
      }
      showNotif(result.error || 'Login failed. Please try again.', 'error')
    } catch (err: any) {
      showNotif(err?.message || 'Login failed. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault()
    setIsVerifying(true)
    try {
      // Verify identity by checking email + birthdate match in Supabase
      const email = forgotEmail.toLowerCase().trim()
      const bday = new Date(forgotBday).toISOString().split('T')[0]
      const { data: a } = await supabase.from('attendee').select('birthDate').eq('email', email).maybeSingle()
      const match = a && a.birthDate && a.birthDate.split('T')[0] === bday
      if (match) {
        showNotif('Identity verified! Please set your new password.', 'success')
        setForgotStep(2)
      } else {
        showNotif('Verification failed. Information does not match.', 'error')
      }
    } catch (err: any) {
      showNotif(err?.message || 'Verification failed. Check your details.', 'error')
    } finally {
      setIsVerifying(false)
    }
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    if (newPassword !== confirmNew) {
      showNotif('Passwords do not match', 'error')
      return
    }
    setIsResetting(true)
    try {
      const email = forgotEmail.toLowerCase().trim()
      const sha = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(newPassword))
      const hash = Array.from(new Uint8Array(sha)).map(b => b.toString(16).padStart(2, '0')).join('')
      const { error } = await supabase.from('attendee').update({ passwordHash: hash, updatedAt: new Date().toISOString() }).eq('email', email)
      if (error) throw error
      showNotif('Password reset successfully!', 'success')
      setShowForgot(false)
      setForgotStep(1)
      setForgotEmail('')
      setForgotBday('')
      setNewPassword('')
      setConfirmNew('')
    } catch (err: any) {
      showNotif(err?.message || 'Reset failed. Check your details.', 'error')
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 py-20" style={{ background: THEME.colors.comicBg }}>
      <main className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col items-center mb-10">
          <Link to="/" className="group">
            <div
              className="w-20 h-20 flex items-center justify-center shadow-[6px_6px_0px_0px_#2b2b2b] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all mb-4 overflow-hidden"
              style={{ background: '#fff', border: `4px solid ${THEME.colors.darkBorder}`, borderRadius: '50%' }}
            >
              <img src="/logo.png" alt="GeoPulse Logo" className="w-16 h-16 object-contain" />
            </div>
          </Link>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900">Login</h1>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2">Welcome back to Geopulse</p>
        </div>

        <Card className="p-10" style={{ background: '#fff', border: `3px solid ${THEME.colors.darkBorder}`, boxShadow: '12px 12px 0px 0px #2b2b2b' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
                className="w-full px-5 py-3.5 rounded-xl border-2 border-[#2b2b2b] bg-slate-50 font-bold focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500">Password</label>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgot(true)
                    setForgotStep(1)
                  }}
                  className="text-[10px] font-black uppercase text-indigo-600 hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                  className="w-full px-5 py-3.5 rounded-xl border-2 border-[#2b2b2b] bg-slate-50 font-bold focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase text-slate-400 hover:text-slate-900 transition-colors"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all disabled:opacity-50"
                style={{ background: THEME.colors.logoAccent, border: `3px solid ${THEME.colors.darkBorder}` }}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>

              <div className="flex items-center gap-4 text-slate-200 py-2">
                <div className="h-px flex-1 bg-slate-100" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">or join us</span>
                <div className="h-px flex-1 bg-slate-100" />
              </div>

              <Link
                to="/register"
                className="w-full flex items-center justify-center py-4 bg-white text-[#2b2b2b] rounded-2xl font-black uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] border-2 border-[#2b2b2b] hover:bg-slate-50 hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                Create Account
              </Link>
            </div>
          </form>
        </Card>

        <div className="mt-10 text-center">
          <Link to="/" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </main>

      {/* FORGOT PASSWORD MODAL */}
      {showForgot && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[1000] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="w-full max-w-md animate-in zoom-in-95 duration-500">
            <Card className="p-10 bg-white border-6 border-slate-900 shadow-[16px_16px_0px_0px_#2b2b2b] rounded-3xl relative">
              <button
                onClick={() => {
                  setShowForgot(false)
                  setForgotStep(1)
                }}
                className="absolute top-6 right-6 w-10 h-10 rounded-xl border-2 border-slate-100 flex items-center justify-center hover:border-slate-900 transition-all font-bold"
              >
                ✕
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl border-2 border-indigo-100 flex items-center justify-center text-3xl mx-auto mb-4 shadow-[4px_4px_0px_0px_#4f46e5]">
                  {forgotStep === 1 ? '🔑' : '✨'}
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
                  {forgotStep === 1 ? 'Reset Access' : 'New Password'}
                </h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                  {forgotStep === 1 ? 'Verify identity to continue' : 'Secure your account now'}
                </p>
              </div>

              {forgotStep === 1 ? (
                <form onSubmit={handleVerify} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Registered Email</label>
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-900 bg-slate-50 font-bold focus:bg-white transition-all outline-none"
                      placeholder="name@company.com"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Birth Date</label>
                    <input
                      type="date"
                      required
                      value={forgotBday}
                      onChange={(e) => setForgotBday(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-900 bg-slate-50 font-bold focus:bg-white transition-all outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest border-3 border-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all disabled:opacity-50 mt-4"
                  >
                    {isVerifying ? 'Verifying...' : 'Verify Identity'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleReset} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">New Password</label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-900 bg-slate-50 font-bold focus:bg-white transition-all outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Confirm Password</label>
                    <input
                      type="password"
                      required
                      value={confirmNew}
                      onChange={(e) => setConfirmNew(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-900 bg-slate-50 font-bold focus:bg-white transition-all outline-none"
                      placeholder="••••••••"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isResetting}
                    className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest border-3 border-slate-900 shadow-[6px_6px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all disabled:opacity-50 mt-4"
                  >
                    {isResetting ? 'Saving...' : 'Set New Password'}
                  </button>
                </form>
              )}
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

