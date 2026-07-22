import React, { useState, useEffect } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import Card from '../components/Card'
import { THEME } from '../theme'
import { useNotification } from '../components/Notification'
import { clientRegister } from '../lib/client-auth'
import { useNavigate } from '@tanstack/react-router'

// Password validation function
const validatePassword = (password: string) => {
  return {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  }
}

const isPasswordValid = (password: string) => {
  const validation = validatePassword(password)
  return Object.values(validation).every(v => v === true)
}

export const Route = createFileRoute('/register')({
  head: () => ({ meta: [{ title: 'GeoPulse - Register' }] }),
  component: RegisterPage
})

function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false
  })
  const { showNotif } = useNotification()
  const navigate = useNavigate()

  // Update password validation when password changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setPassword(newPassword)
    setPasswordValidation(validatePassword(newPassword))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (!isPasswordValid(password)) {
      showNotif('Password does not meet all requirements', 'error')
      return
    }

    if (password !== confirm) {
      showNotif('Passwords do not match', 'error')
      return
    }

    if (!birthDate) {
      showNotif('Please enter your birthday', 'error')
      return
    }

    setIsSubmitting(true)

    try {
      const result = await clientRegister({
        name,
        email,
        password,
        birthDate,
      })
      if (result.success) {
        showNotif('Account created successfully!', 'success')
        setTimeout(() => navigate({ to: '/login' }), 800)
        return
      }
      showNotif(result.error || 'Registration failed. Check your details.', 'error')
    } catch (err: any) {
      showNotif(err?.message || 'Registration failed. Check your details.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 py-20" style={{ background: THEME.colors.comicBg }}>
      <main className="w-full max-w-lg animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col items-center mb-10">
          <Link to="/" className="group">
            <div
              className="w-20 h-20 flex items-center justify-center shadow-[6px_6px_0px_0px_#2b2b2b] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all mb-4 overflow-hidden"
              style={{ background: '#fff', border: `4px solid ${THEME.colors.darkBorder}`, borderRadius: '50%' }}
            >
              <img src="/logo.png" alt="GeoPulse Logo" className="w-16 h-16 object-contain" />
            </div>
          </Link>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900 text-center">Register</h1>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2">Start tracking with precision</p>
        </div>

        <Card className="p-10" style={{ background: '#fff', border: `3px solid ${THEME.colors.darkBorder}`, boxShadow: '12px 12px 0px 0px #2b2b2b' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-5 py-3.5 rounded-xl border-2 border-[#2b2b2b] bg-slate-50 font-bold focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-5 py-3.5 rounded-xl border-2 border-[#2b2b2b] bg-slate-50 font-bold focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500">Birthday</label>
              <input
                type="date"
                required
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl border-2 border-[#2b2b2b] bg-slate-50 font-bold focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Password"
                  className="w-full px-5 py-3.5 rounded-xl border-2 border-[#2b2b2b] bg-slate-50 font-bold focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase text-slate-400">{showPassword ? 'Hide' : 'Show'}</button>
              </div>
              {password && (
                <div className="mt-3 p-3 bg-slate-100 rounded-lg space-y-2">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-600">Password Requirements:</p>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`w-4 h-4 flex items-center justify-center rounded ${passwordValidation.minLength ? 'bg-green-500 text-white' : 'bg-slate-300'}`}>
                        {passwordValidation.minLength ? '✓' : ''}
                      </span>
                      <span className={passwordValidation.minLength ? 'text-slate-700' : 'text-slate-500'}>At least 8 characters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`w-4 h-4 flex items-center justify-center rounded ${passwordValidation.hasUppercase ? 'bg-green-500 text-white' : 'bg-slate-300'}`}>
                        {passwordValidation.hasUppercase ? '✓' : ''}
                      </span>
                      <span className={passwordValidation.hasUppercase ? 'text-slate-700' : 'text-slate-500'}>Uppercase letter (A-Z)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`w-4 h-4 flex items-center justify-center rounded ${passwordValidation.hasLowercase ? 'bg-green-500 text-white' : 'bg-slate-300'}`}>
                        {passwordValidation.hasLowercase ? '✓' : ''}
                      </span>
                      <span className={passwordValidation.hasLowercase ? 'text-slate-700' : 'text-slate-500'}>Lowercase letter (a-z)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`w-4 h-4 flex items-center justify-center rounded ${passwordValidation.hasNumber ? 'bg-green-500 text-white' : 'bg-slate-300'}`}>
                        {passwordValidation.hasNumber ? '✓' : ''}
                      </span>
                      <span className={passwordValidation.hasNumber ? 'text-slate-700' : 'text-slate-500'}>Number (0-9)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`w-4 h-4 flex items-center justify-center rounded ${passwordValidation.hasSpecial ? 'bg-green-500 text-white' : 'bg-slate-300'}`}>
                        {passwordValidation.hasSpecial ? '✓' : ''}
                      </span>
                      <span className={passwordValidation.hasSpecial ? 'text-slate-700' : 'text-slate-500'}>Special character (!@#$%^&* etc.)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full px-5 py-3.5 rounded-xl border-2 border-[#2b2b2b] bg-slate-50 font-bold focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase text-slate-400">{showConfirm ? 'Hide' : 'Show'}</button>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <button
                type="submit"
                disabled={isSubmitting || !isPasswordValid(password) || password !== confirm}
                className="w-full py-4 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 disabled:translate-y-0"
                style={{ background: THEME.colors.logoAccent, border: `3px solid ${THEME.colors.darkBorder}` }}
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </button>

              <div className="text-center pt-2">
                <span className="text-[10px] font-bold uppercase text-slate-400">Already a member?</span>
                <Link to="/login" className="ml-2 text-[10px] font-black uppercase hover:underline" style={{ color: THEME.colors.logoAccent }}>Sign In Instead</Link>
              </div>
            </div>
          </form>
        </Card>

        <div className="mt-10 text-center">
          <Link to="/" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  )
}

