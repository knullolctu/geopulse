import React, { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProfileFn } from '../../lib/queries'
import { logoutFn } from '../../lib/authentication'
import { useNavigate } from '@tanstack/react-router'
import Card from '../../components/Card'
import { useNotification } from '../../components/Notification'

export const Route = createFileRoute('/client/profile')({
  component: ClientProfilePage,
})

function ClientProfilePage() {
  const { user } = Route.useRouteContext() as any
  const { showNotif } = useNotification()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [name, setName] = useState(user?.name ?? '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPasswords, setShowPasswords] = useState(false)
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile')

  const updateMutation = useMutation({
    mutationFn: (data: any) => updateProfileFn({ data }),
    onSuccess: () => {
      showNotif('Profile updated successfully!', 'success')
      queryClient.invalidateQueries({ queryKey: ['session-user'] })
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    },
    onError: (err: any) => {
      showNotif(err?.message ?? 'Update failed', 'error')
    },
  })

  const logoutMutation = useMutation({
    mutationFn: () => logoutFn(),
    onSuccess: () => {
      navigate({ to: '/login' })
    },
  })

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return showNotif('Name cannot be empty', 'error')
    updateMutation.mutate({ name })
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) return showNotif('New passwords do not match', 'error')
    if (newPassword.length < 6) return showNotif('Password must be at least 6 characters', 'error')
    updateMutation.mutate({ name, currentPassword, newPassword })
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Identity Card */}
      <Card className="p-8 border-4 border-[#2b2b2b] shadow-[8px_8px_0px_0px_#2b2b2b] bg-gradient-to-br from-slate-900 to-indigo-950 text-white">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-indigo-500 border-4 border-white/20 flex items-center justify-center text-4xl font-black shrink-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
            {(user?.name ?? 'C').charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="text-2xl font-black uppercase tracking-tighter leading-none">{user?.name ?? '—'}</div>
            <div className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest mt-1">{user?.email ?? ''}</div>
            <div className="flex items-center gap-3 mt-3">
              <span className="px-3 py-1 bg-indigo-500/30 border border-indigo-400/30 rounded-lg text-[9px] font-black uppercase tracking-widest text-indigo-200">
                🏢 Client
              </span>
              <span className="px-3 py-1 bg-white/10 border border-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-300">
                {user?.orgCode ?? '—'}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b-4 border-slate-100 pb-0">
        {(['profile', 'security'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-t-2xl font-black uppercase text-[10px] tracking-widest border-t-4 border-l-4 border-r-4 transition-all ${
              activeTab === tab
                ? 'bg-white border-[#2b2b2b] text-slate-900 -mb-[4px] translate-y-[2px] z-10'
                : 'bg-slate-50 border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab === 'profile' ? '👤 Profile' : '🔒 Security'}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <Card className="p-8 border-4 border-[#2b2b2b] shadow-[6px_6px_0px_0px_#2b2b2b]">
          <h3 className="text-xl font-black uppercase tracking-tighter mb-6">Account Information</h3>
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Display Name</label>
              <input
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-3 border-[#2b2b2b] text-sm font-black focus:bg-white transition-all outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email Address</label>
              <input
                value={user?.email ?? ''}
                disabled
                className="w-full px-5 py-4 bg-slate-100 rounded-2xl border-3 border-slate-200 text-sm font-black text-slate-400 cursor-not-allowed outline-none"
              />
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider ml-1">Email cannot be changed. Contact admin.</p>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Organization Code</label>
              <input
                value={user?.orgCode ?? ''}
                disabled
                className="w-full px-5 py-4 bg-slate-100 rounded-2xl border-3 border-slate-200 text-sm font-black text-slate-400 cursor-not-allowed outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] border-3 border-[#2b2b2b] shadow-[6px_6px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#2b2b2b] transition-all disabled:opacity-50"
            >
              {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </Card>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <Card className="p-8 border-4 border-[#2b2b2b] shadow-[6px_6px_0px_0px_#2b2b2b]">
          <h3 className="text-xl font-black uppercase tracking-tighter mb-6">Change Password</h3>
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            {[
              { label: 'Current Password', value: currentPassword, setter: setCurrentPassword },
              { label: 'New Password', value: newPassword, setter: setNewPassword },
              { label: 'Confirm New Password', value: confirmPassword, setter: setConfirmPassword },
            ].map(({ label, value, setter }) => (
              <div key={label} className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</label>
                <div className="relative">
                  <input
                    required
                    type={showPasswords ? 'text' : 'password'}
                    value={value}
                    onChange={e => setter(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-3 border-[#2b2b2b] text-sm font-black focus:bg-white transition-all outline-none pr-20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(s => !s)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    {showPasswords ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
            ))}
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] border-3 border-[#2b2b2b] shadow-[6px_6px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#2b2b2b] transition-all disabled:opacity-50"
            >
              {updateMutation.isPending ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </Card>
      )}

      {/* Danger Zone */}
      <Card className="p-6 border-4 border-rose-200 shadow-[4px_4px_0px_0px_#fecaca]">
        <h3 className="text-sm font-black uppercase tracking-widest text-rose-600 mb-4">Danger Zone</h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-black text-slate-900 uppercase">Sign Out</div>
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">End your current session</div>
          </div>
          <button
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
            className="px-6 py-3 bg-rose-500 text-white rounded-xl font-black uppercase text-[10px] tracking-widest border-2 border-rose-700 shadow-[3px_3px_0px_0px_#9f1239] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all disabled:opacity-50"
          >
            {logoutMutation.isPending ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      </Card>
    </div>
  )
}
