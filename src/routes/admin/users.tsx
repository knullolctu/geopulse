import React, { useState, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import Card from '../../components/Card'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUsersFn, getOrganizationsFn, createUserFn, deleteUserFn, updateUserFn } from '../../lib/queries'
import { useNotification } from '../../components/Notification'

export const Route = createFileRoute('/admin/users')({ component: UsersPage })

function UsersPage() {
  const queryClient = useQueryClient()
  const { showNotif, confirm } = useNotification()
  
  const [activeTab, setActiveTab] = useState<'All' | 'Client' | 'Attendee'>('All')
  const [search, setSearch] = useState('')
  const [selectedOrg, setSelectedOrg] = useState('All Organizations')
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [editingUser, setEditingUser] = useState<any>(null)
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Attendee',
    orgCode: ''
  })

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsersFn()
  })

  const { data: orgs, isLoading: orgsLoading } = useQuery({
    queryKey: ['organizations'],
    queryFn: () => getOrganizationsFn()
  })

  const createMutation = useMutation({
    mutationFn: (data: any) => createUserFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      showNotif('User created successfully!', 'success')
      setIsModalOpen(false)
      setNewUser({ name: '', email: '', password: '', role: 'Attendee', orgCode: '' })
      setShowPassword(false)
    },
    onError: (error: any) => {
      showNotif(`Failed to create user: ${error.message}`, 'error')
    }
  })

  const updateMutation = useMutation({
    mutationFn: (args: { id: string, role: string, data: any }) => updateUserFn({ data: args }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      showNotif('User updated successfully!', 'success')
      setIsModalOpen(false)
      setEditingUser(null)
      setNewUser({ name: '', email: '', password: '', role: 'Attendee', orgCode: '' })
      setShowPassword(false)
    },
    onError: (error: any) => {
      showNotif(`Failed to update user: ${error.message}`, 'error')
    }
  })

  const deleteMutation = useMutation({
    mutationFn: (args: { id: string, role: string }) => deleteUserFn({ data: args }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      showNotif('User deleted successfully!', 'success')
    },
    onError: (error: any) => {
      showNotif(`Failed to delete user: ${error.message}`, 'error')
    }
  })

  const filteredUsers = useMemo(() => {
    if (!users) return []
    return users.filter(u => {
      const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || 
                           u.email.toLowerCase().includes(search.toLowerCase())
      
      const matchesTab = activeTab === 'All' || u.role === activeTab
      
      const matchesOrg = selectedOrg === 'All Organizations' || u.orgCode === selectedOrg
      
      return matchesSearch && matchesTab && matchesOrg
    })
  }, [users, search, activeTab, selectedOrg])

  const counts = useMemo(() => {
    return {
      All: users?.length || 0,
      Client: users?.filter((u: any) => u.role === 'Client').length || 0,
      Attendee: users?.filter((u: any) => (u.role || 'Attendee') === 'Attendee').length || 0
    }
  }, [users])

  const generatePassword = () => {
    if (!newUser.name) return showNotif('Enter a name first', 'info')
    const base = newUser.name.split(' ')[0].toLowerCase()
    const generated = `${base.charAt(0).toUpperCase()}${base.slice(1)}@GP2026`
    setNewUser(prev => ({ ...prev, password: generated }))
  }

  const handleEditClick = (user: any) => {
    setEditingUser(user)
    setNewUser({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
      orgCode: user.orgCode || ''
    })
    setIsModalOpen(true)
  }

  if (usersLoading || orgsLoading) return <div className="p-8 font-black uppercase text-slate-400 animate-pulse">Syncing Network Personnel...</div>

  return (
    <>
      <div className="h-[calc(100vh-80px)] flex flex-col bg-white -m-4 md:-m-8">
        {/* 1. TOP HEADER SECTION (Static) */}
        <div className="shrink-0 bg-white border-b-4 border-slate-100 px-4 md:px-8 pt-6 pb-4 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 uppercase leading-none">Network Members</h2>
              <p className="text-slate-500 font-bold uppercase tracking-tight text-xs mt-1">
                {filteredUsers.length} total members matched • Root level management
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <div className="relative group flex-1 sm:flex-none">
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search personnel..."
                  className="w-full sm:min-w-[280px] pl-10 pr-12 py-2.5 bg-white border-3 border-dark-border rounded-2xl text-[10px] font-black uppercase outline-none shadow-[3px_3px_0px_0px_#2b2b2b] focus:shadow-none focus:translate-x-0.5 focus:translate-y-0.5 transition-all"
                />
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</div>
                {search && (
                  <button 
                    onClick={() => setSearch('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 transition-all text-xs font-black shadow-sm"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="relative group">
                <button
                  onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
                  className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-2xl border-3 border-dark-border shadow-[3px_3px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all min-w-[220px]"
                >
                  <div className="flex flex-col items-start flex-1 text-left">
                    <label className="text-[7px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">Organization</label>
                    <div className="text-[9px] font-black uppercase tracking-widest text-slate-900 flex items-center gap-2 truncate max-w-[150px]">
                      <span>{selectedOrg === 'All Organizations' ? '🌎 All Orgs' : `🏢 ${orgs?.find((o: any) => o.orgCode === selectedOrg)?.name || selectedOrg}`}</span>
                    </div>
                  </div>
                  <div className={`text-slate-400 text-[10px] transition-transform duration-300 ${orgDropdownOpen ? 'rotate-180' : ''}`}>▼</div>
                </button>

                {orgDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setOrgDropdownOpen(false)} />
                    <div className="absolute top-full right-0 mt-3 w-64 bg-white border-4 border-dark-border rounded-2xl shadow-[8px_8px_0px_0px_#2b2b2b] z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right max-h-[400px] overflow-y-auto custom-scrollbar">
                      <div className="p-2 grid gap-1">
                        <button
                          onClick={() => { setSelectedOrg('All Organizations'); setOrgDropdownOpen(false); }}
                          className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedOrg === 'All Organizations' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                        >
                          <span className="text-sm">🌎</span>
                          All Organizations
                        </button>
                        <div className="h-px bg-slate-100 my-1 mx-2" />
                        {orgs?.map((org: any) => (
                          <button
                            key={org.id}
                            onClick={() => {
                              setSelectedOrg(org.orgCode)
                              setOrgDropdownOpen(false)
                            }}
                            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedOrg === org.orgCode
                                ? 'bg-indigo-600 text-white'
                                : 'text-slate-600 hover:bg-slate-50'
                              }`}
                          >
                            <span className="text-sm">🏢</span>
                            {org.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={() => {
                  setEditingUser(null)
                  setNewUser({ name: '', email: '', password: '', role: 'Attendee', orgCode: '' })
                  setIsModalOpen(true)
                  setShowPassword(false)
                }}
                className="flex items-center gap-4 px-6 py-2.5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest border-3 border-dark-border shadow-[3px_3px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all whitespace-nowrap"
              >
                <div className="flex flex-col items-start flex-1 text-left">
                  <label className="text-[7px] font-black uppercase tracking-[0.2em] text-indigo-200/80 mb-0.5">Member Access</label>
                  <div className="text-[9px] font-black uppercase tracking-widest text-white flex items-center gap-2">
                    <span>+ Provision Member</span>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 px-2">
            {[
              { id: 'All', label: 'All Members', icon: '🌍', count: counts.All },
              { id: 'Attendee', label: 'Attendees', icon: '👤', count: counts.Attendee },
              { id: 'Client', label: 'Clients', icon: '🏢', count: counts.Client }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`px-8 py-4 rounded-t-2xl font-black uppercase text-[10px] tracking-widest transition-all border-t-4 border-l-4 border-r-4 flex items-center gap-3 ${activeTab === t.id
                    ? 'bg-white border-dark-border text-slate-900 -mb-[4px] z-20 relative'
                    : 'bg-slate-100/50 border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                  }`}
              >
                <span className="text-sm">{t.icon}</span>
                <span>{t.label}</span>
                <span className={`px-2 py-0.5 rounded-md text-[8px] border-2 ${activeTab === t.id
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : 'bg-white border-slate-200 text-slate-400'
                  }`}>
                  {t.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. MAIN DATA SECTION (Scrollable) */}
        <div className="flex-1 min-h-0 flex flex-col bg-white overflow-hidden md:border-l-4 md:border-r-4 md:border-t-4 border-dark-border">
          <div className="flex-1 overflow-auto no-scrollbar">
            <table className="w-full text-left border-separate border-spacing-0 relative">
              <thead>
                <tr className="bg-slate-50">
                  <th className="sticky top-0 z-30 bg-slate-50 border-b-4 border-dark-border px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Personnel Info</th>
                  <th className="sticky top-0 z-30 bg-slate-50 border-b-4 border-dark-border px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Role / Status</th>
                  <th className="sticky top-0 z-30 bg-slate-50 border-b-4 border-dark-border px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Organization Access</th>
                  <th className="sticky top-0 z-30 bg-slate-50 border-b-4 border-dark-border px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y-4 divide-slate-100">
                {filteredUsers.map((user: any) => (
                  <tr key={user.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 border-2 border-indigo-100 flex items-center justify-center text-xl font-black text-indigo-600 shadow-sm group-hover:scale-110 transition-transform">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-slate-900 uppercase tracking-tight">{user.name}</span>
                          <span className="text-[10px] font-bold text-slate-400 lowercase">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1.5">
                        <span className={`inline-flex w-fit px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider border-2 ${user.role === 'Client'
                          ? 'bg-amber-50 text-amber-600 border-amber-200'
                          : 'bg-indigo-50 text-indigo-600 border-indigo-200'
                          }`}
                        >
                          {user.role === 'Client' ? '🏢' : '👤'} {user.role}
                        </span>
                        <div className="flex items-center gap-1.5 ml-1">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[8px] font-black uppercase text-emerald-600 tracking-tighter">Network Verified</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight">
                          {orgs?.find((o: any) => o.orgCode === user.orgCode)?.name || user.orgCode || 'ROOT SYSTEM'}
                        </span>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                          Personnel Authority
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleEditClick(user)}
                          className="p-3 bg-white rounded-xl border-3 border-slate-100 text-slate-400 hover:border-indigo-600 hover:text-indigo-600 transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(79,70,229,0.2)]"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={async () => {
                            const isConfirmed = await confirm({
                              title: 'Remove Member?',
                              message: `Are you sure you want to remove ${user.name}? This will revoke their access to the entire GeoPulse network.`,
                              type: 'danger',
                              confirmText: 'Revoke Access'
                            })
                            if (isConfirmed) deleteMutation.mutate({ id: user.id, role: user.role })
                          }}
                          className="p-3 bg-white rounded-xl border-3 border-slate-100 text-slate-400 hover:border-rose-500 hover:text-rose-500 transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(244,63,94,0.2)]"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL SECTION */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[2000] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <Card className="w-full max-w-lg p-10 bg-white border-4 border-slate-900 shadow-[12px_12px_0px_0px_#2b2b2b] animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                  {editingUser ? 'Edit Member' : 'New Member'}
                </h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                  {editingUser ? 'Update Credentials' : 'Network Provisioning'}
                </p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-2xl hover:bg-slate-100 flex items-center justify-center text-3xl transition-all">✕</button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault()
              if (!newUser.orgCode) return showNotif('Please assign an organization', 'error')
              if (editingUser) {
                const updateData: any = { ...newUser }
                if (!updateData.password) delete updateData.password
                updateMutation.mutate({ id: editingUser.id, role: newUser.role, data: updateData })
              } else {
                createMutation.mutate(newUser)
              }
            }} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                <input required value={newUser.name} onChange={e => setNewUser(prev => ({ ...prev, name: e.target.value }))} className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-3 border-slate-900 text-xs font-black uppercase outline-none" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                <input required type="email" value={newUser.email} onChange={e => setNewUser(prev => ({ ...prev, email: e.target.value }))} className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-3 border-slate-900 text-xs font-black lowercase outline-none" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">{editingUser ? 'Update Password (Optional)' : 'Access Password'}</label>
                  <button type="button" onClick={generatePassword} className="text-[8px] font-black uppercase text-indigo-600 hover:underline">✨ Auto-Generate</button>
                </div>
                <div className="relative group">
                  <input required={!editingUser} type={showPassword ? 'text' : 'password'} value={newUser.password} onChange={e => setNewUser(prev => ({ ...prev, password: e.target.value }))} className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-3 border-slate-900 text-xs font-black outline-none pr-24" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white border-2 border-slate-200 rounded-lg text-[8px] font-black uppercase hover:border-slate-900">{showPassword ? 'Hide' : 'Show'}</button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Access Level</label>
                  <select value={newUser.role} onChange={e => setNewUser(prev => ({ ...prev, role: e.target.value }))} className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-3 border-slate-900 text-xs font-black uppercase outline-none appearance-none">
                    <option value="Attendee">👤 Attendee</option>
                    <option value="Client">🏢 Client</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Organization</label>
                  <select required value={newUser.orgCode} onChange={e => setNewUser(prev => ({ ...prev, orgCode: e.target.value }))} className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-3 border-slate-900 text-xs font-black uppercase outline-none appearance-none">
                    <option value="">Select Org</option>
                    {orgs?.map((org: any) => <option key={org.id} value={org.orgCode}>{org.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="pt-6">
                <button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="w-full py-5 bg-indigo-600 text-white rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] text-xs font-black uppercase tracking-[0.2em] border-4 border-slate-900 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50">
                  {createMutation.isPending || updateMutation.isPending ? 'Processing...' : editingUser ? 'Update Member' : 'Provision Member'}
                </button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </>
  )
}
