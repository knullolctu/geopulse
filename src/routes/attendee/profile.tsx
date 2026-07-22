import React, { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { updateProfileFn, getCategoriesByOrgCodeFn, getAttendeeProfileFn } from '@/lib/queries'
import { useNotification } from '@/components/Notification'
import Card from '@/components/Card'

export const Route = createFileRoute('/attendee/profile')({
  component: AttendeeProfilePage,
})

function AttendeeProfilePage() {
  const { user } = Route.useRouteContext()
  const queryClient = useQueryClient()
  const { showNotif } = useNotification()

  const { data: attendee } = useQuery({
    queryKey: ['attendee-profile'],
    queryFn: () => getAttendeeProfileFn()
  })

  const { data: categories } = useQuery({
    queryKey: ['categories', user?.orgCode],
    queryFn: () => getCategoriesByOrgCodeFn({ data: user?.orgCode || '' }),
    enabled: !!user?.orgCode
  })

  const categoryName = categories?.find((c: any) => String(c.id) === String(attendee?.categoryId || user?.categoryId))?.name || attendee?.category?.name || user?.category?.name || 'Unassigned'

  const [form, setForm] = useState({
    name: user?.name || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const mutation = useMutation({
    mutationFn: (data: any) => updateProfileFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] })
      showNotif('Profile updated successfully', 'success')
      setForm(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }))
    },
    onError: (err: any) => showNotif(err.message, 'error'),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      showNotif('New passwords do not match', 'error')
      return
    }
    mutation.mutate(form)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 uppercase">Account Settings</h2>
          <p className="text-slate-500 font-bold uppercase tracking-tight text-xs mt-1">
            Manage your digital identity and security
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* User Card */}
        <div className="md:col-span-1">
          <Card className="p-8 bg-slate-900 text-white border-none shadow-[8px_8px_0px_0px_#2b2b2b] flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-indigo-500 to-rose-500 flex items-center justify-center text-4xl font-black border-4 border-white/20 mb-4">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight">{user?.name}</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">{user?.email}</p>
            
            <div className="mt-8 w-full space-y-3">
              <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-left">
                <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Category</div>
                <div className="text-[11px] font-bold text-emerald-400 uppercase mt-0.5">{categoryName}</div>
              </div>
              <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-left">
                <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Organization Code</div>
                <div className="text-[11px] font-bold text-indigo-400 uppercase mt-0.5">{user?.orgCode}</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Form */}
        <div className="md:col-span-2">
          <Card className="p-8 bg-white border-4 border-[#2b2b2b] shadow-[8px_8px_0px_0px_#2b2b2b]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Display Name</label>
                <input
                  required
                  value={form.name}
                  onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border-3 border-[#2b2b2b] text-xs font-black uppercase focus:bg-white transition-all outline-none shadow-[2px_2px_0px_0px_#2b2b2b] focus:shadow-none"
                />
              </div>

              <div className="h-px bg-slate-100 my-4" />
              
              <div className="space-y-4">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 mb-2">Change Password</div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Current Password</label>
                  <input
                    type="password"
                    value={form.currentPassword}
                    onChange={e => setForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                    placeholder="Leave empty to keep current"
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border-3 border-[#2b2b2b] text-xs font-black focus:bg-white transition-all outline-none shadow-[2px_2px_0px_0px_#2b2b2b] focus:shadow-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">New Password</label>
                    <input
                      type="password"
                      value={form.newPassword}
                      onChange={e => setForm(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-50 rounded-xl border-3 border-[#2b2b2b] text-xs font-black focus:bg-white transition-all outline-none shadow-[2px_2px_0px_0px_#2b2b2b] focus:shadow-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Confirm New Password</label>
                    <input
                      type="password"
                      value={form.confirmPassword}
                      onChange={e => setForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-50 rounded-xl border-3 border-[#2b2b2b] text-xs font-black focus:bg-white transition-all outline-none shadow-[2px_2px_0px_0px_#2b2b2b] focus:shadow-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full py-4 bg-slate-900 text-white rounded-xl font-black uppercase text-xs tracking-[0.2em] shadow-[6px_6px_0px_0px_rgba(0,0,0,0.25)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
                >
                  {mutation.isPending ? 'Saving Changes...' : 'Update Profile'}
                </button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
