import React, { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProfileFn } from '../../lib/queries'
import { logoutFn } from '../../lib/authentication'
import { useNavigate } from '@tanstack/react-router'
import Card from '../../components/Card'
import { useNotification } from '../../components/Notification'
import { THEME } from '../../theme'

export const Route = createFileRoute('/admin/profile')({
  component: AdminProfilePage,
})

function AdminProfilePage() {
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
      showNotif('Administrative profile synchronized.', 'success')
      queryClient.invalidateQueries({ queryKey: ['session-user'] })
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    },
    onError: (err: any) => {
      showNotif(err?.message ?? 'Update failed', 'error')
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
    <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">System Identity</h2>
        <p className="text-slate-500 font-bold uppercase tracking-tight text-xs mt-1">Manage your administrative credentials and personal profile.</p>
      </div>

      {/* Identity Card */}
      <Card className="p-8 border-4 border-[#2b2b2b] shadow-[8px_8px_0px_0px_#2b2b2b] bg-slate-900 text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700" />
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-20 h-20 rounded-2xl bg-white text-slate-900 border-4 border-slate-900 flex items-center justify-center text-4xl font-black shrink-0 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
            {(user?.name ?? 'A').charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="text-2xl font-black uppercase tracking-tighter leading-none flex items-center gap-3">
                {user?.name ?? '—'}
                <span className="px-2 py-0.5 bg-indigo-500 text-[8px] rounded border border-indigo-400">ROOT ACCESS</span>
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 flex items-center gap-2">
                <span>{user?.email ?? ''}</span>
                <span className="w-1 h-1 rounded-full bg-slate-700" />
                <span className="text-indigo-400">ADMINISTRATOR</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b-4 border-slate-100">
        {(['profile', 'security'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-3 rounded-t-2xl font-black uppercase text-[10px] tracking-widest border-t-4 border-l-4 border-r-4 transition-all ${
              activeTab === tab
                ? 'bg-white border-[#2b2b2b] text-slate-900 -mb-[4px] translate-y-[2px] z-10'
                : 'bg-slate-50 border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab === 'profile' ? '👤 Details' : '🔒 Security'}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <Card className="p-8 border-4 border-[#2b2b2b] shadow-[6px_6px_0px_0px_#2b2b2b] bg-white">
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Full Name</label>
              <input
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-3 border-[#2b2b2b] text-sm font-black focus:bg-white transition-all outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Administrative Email</label>
              <input
                value={user?.email ?? ''}
                disabled
                className="w-full px-5 py-4 bg-slate-100 rounded-2xl border-3 border-slate-200 text-sm font-black text-slate-400 cursor-not-allowed outline-none"
              />
              <p className="text-[9px] font-bold text-rose-400 uppercase tracking-wider ml-1 italic">Email accounts are locked to root configuration.</p>
            </div>
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] border-3 border-[#2b2b2b] shadow-[6px_6px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all disabled:opacity-50"
            >
              {updateMutation.isPending ? 'Synchronizing...' : 'Update Administrative Identity'}
            </button>
          </form>
        </Card>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <Card className="p-8 border-4 border-[#2b2b2b] shadow-[6px_6px_0px_0px_#2b2b2b] bg-white">
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            {[
              { label: 'Current Root Password', value: currentPassword, setter: setCurrentPassword },
              { label: 'New Root Password', value: newPassword, setter: setNewPassword },
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
              className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] border-3 border-[#2b2b2b] shadow-[6px_6px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all disabled:opacity-50"
            >
              {updateMutation.isPending ? 'Encrypting...' : 'Reset Administrative Key'}
            </button>
          </form>
        </Card>
      )}
    </div>
  )
}
