import React, { useState, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getSessionFn } from '../../lib/authentication'
import { getAttendeesFn, deleteUserFn, createUserFn, getCategoriesFn, updateUserFn, getGeofencesByOrgFn, bulkEnrollFn } from '../../lib/queries'
import { THEME } from '../../theme'
import { useNotification } from '../../components/Notification'
import Card from '../../components/Card'

export const Route = createFileRoute('/client/users')({
  component: ClientUsersPage,
})

function ClientUsersPage() {
  const queryClient = useQueryClient()
  const { showNotif, confirm } = useNotification()
  const [activeTab, setActiveTab] = useState<'Client' | 'Attendee'>('Attendee')
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [editingUser, setEditingUser] = useState<any>(null)

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    categoryId: ''
  })
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)

  // Enrollment Config State
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false)
  const [enrollType, setEnrollType] = useState<'all' | 'category' | 'selective'>('all')
  const [enrollTargetId, setEnrollTargetId] = useState('')
  const [enrollGeofenceIds, setEnrollGeofenceIds] = useState<string[]>([])
  const [selectedUserIds, setSelectedUserIds] = useState<Set<string>>(new Set())
  const [gfSearch, setGfSearch] = useState('')

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['client-users'],
    queryFn: () => getAttendeesFn(),
  })

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['client-categories'],
    queryFn: () => getCategoriesFn(),
  })

  const { data: sessionUser, isLoading: sessionLoading } = useQuery({
    queryKey: ['session-user'],
    queryFn: () => getSessionFn(),
  })

  const { data: geofences } = useQuery({
    queryKey: ['org-geofences'],
    queryFn: () => getGeofencesByOrgFn(),
    enabled: isEnrollModalOpen
  })

  const createMutation = useMutation({
    mutationFn: (data: any) => createUserFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client-users'] })
      showNotif('User created successfully!', 'success')
      setIsModalOpen(false)
      setNewUser({ name: '', email: '', password: '', categoryId: '' })
    },
    onError: (error: any) => {
      showNotif(`Failed to create user: ${error.message}`, 'error')
    }
  })

  const updateMutation = useMutation({
    mutationFn: (args: { id: string, role: string, data: any }) => updateUserFn({ data: args }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client-users'] })
      queryClient.invalidateQueries({ queryKey: ['client-logs'] })
      showNotif('User updated successfully!', 'success')
      setIsModalOpen(false)
      setEditingUser(null)
      setNewUser({ name: '', email: '', password: '', categoryId: '' })
    },
    onError: (error: any) => {
      showNotif(`Failed to update user: ${error.message}`, 'error')
    }
  })

  const bulkEnrollMutation = useMutation({
    mutationFn: (data: any) => bulkEnrollFn({ data }),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: ['client-users'] })
      showNotif(`Successfully enrolled ${res.count} attendees!`, 'success')
      setIsEnrollModalOpen(false)
      setSelectedUserIds(new Set())
      setEnrollGeofenceIds([])
    },
    onError: (error: any) => showNotif(error.message, 'error')
  })

  const deleteMutation = useMutation({
    mutationFn: (args: { id: string, role: string }) => deleteUserFn({ data: args }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client-users'] })
      showNotif('User deleted successfully!', 'success')
    },
    onError: (error: any) => {
      const msg = error?.message || String(error)
      if (msg.toLowerCase().includes('unauthorized')) {
        showNotif('You are not authorized to delete this user. Contact an administrator.', 'error')
      } else {
        showNotif(`Failed to delete user: ${msg}`, 'error')
      }
    }
  })

  const filteredUsers = useMemo(() => {
    if (!users) return []
    return users
      .filter((u: any) => {
        const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
        const matchesTab = (u.role || 'Attendee') === activeTab
        return matchesSearch && matchesTab
      })
  }, [users, search, activeTab, sessionUser])

  const counts = useMemo(() => {
    return {
      All: users?.length || 0,
      Client: users?.filter((u: any) => u.role === 'Client').length || 0,
      Attendee: users?.filter((u: any) => (u.role || 'Attendee') === 'Attendee').length || 0
    }
  }, [users])

  if (usersLoading || categoriesLoading || sessionLoading) return <div className="p-8 font-black uppercase text-slate-400 animate-pulse">Scanning Personnel Records...</div>

  const handleEditClick = (user: any) => {
    if ((user.role || 'Attendee') !== 'Attendee') {
      return showNotif('You cannot edit other clients.', 'error')
    }
    setEditingUser(user)
    setNewUser({
      name: user.name,
      email: user.email,
      password: '',
      categoryId: user.categoryId || ''
    })
    setIsModalOpen(true)
  }


  const generatePassword = () => {
    if (!newUser.name) return showNotif('Enter a name first', 'info')
    const base = newUser.name.split(' ')[0].toLowerCase()
    const generated = `${base.charAt(0).toUpperCase()}${base.slice(1)}@GP2026`
    setNewUser(prev => ({ ...prev, password: generated }))
  }

  return (
    <>
      <div className="h-[calc(100vh-80px)] flex flex-col bg-white -m-4 md:-m-8">
        {/* 1. TOP HEADER SECTION (Static) */}
        <div className="shrink-0 bg-white border-b-4 border-slate-100 px-4 md:px-8 pt-6 pb-4 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 uppercase leading-none">Attendee Registry</h2>
              <p className="text-slate-500 font-bold uppercase tracking-tight text-xs mt-1">
                {filteredUsers.length} {activeTab === 'Client' ? 'Client' : 'Attendee'}{filteredUsers.length !== 1 ? 's' : ''} • Workforce access management
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <div className="relative group flex-1 sm:flex-none">
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Filter attendees..."
                  className="w-full sm:min-w-[240px] pl-10 pr-6 py-2.5 bg-white border-3 border-dark-border rounded-2xl text-[10px] font-black uppercase outline-none shadow-[3px_3px_0px_0px_#2b2b2b] focus:shadow-none focus:translate-x-0.5 focus:translate-y-0.5 transition-all"
                />
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsEnrollModalOpen(true)}
                  className="px-5 py-2.5 bg-white text-indigo-600 rounded-2xl font-black uppercase text-[9px] tracking-widest border-3 border-indigo-600 shadow-[3px_3px_0px_0px_#4f46e5] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all whitespace-nowrap"
                >
                  Enrollment Config
                </button>
                <button
                  onClick={() => {
                    setEditingUser(null)
                    setNewUser({ name: '', email: '', password: '', categoryId: '' })
                    setIsModalOpen(true)
                  }}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[9px] tracking-widest border-3 border-dark-border shadow-[3px_3px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all whitespace-nowrap"
                >
                  + Add Attendee
                </button>
              </div>
            </div>
          </div>

          {/* Tabs & Status Summary */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 px-2">
            <div className="flex items-center gap-3">
              {[
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

            <div className="flex items-center gap-3 pb-3 px-4">
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Registry Status</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-black text-slate-900 uppercase">{selectedUserIds.size} Selected</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. MAIN DATA SECTION (Scrollable) */}
        <div className="flex-1 min-h-0 flex flex-col bg-white overflow-hidden md:border-l-4 md:border-r-4 md:border-t-4 border-dark-border">
          <div className="flex-1 overflow-auto no-scrollbar">
            <table className="w-full text-left border-separate border-spacing-0 relative">
              <thead>
                <tr className="bg-slate-50">
                  <th className="sticky top-0 z-30 bg-slate-50 border-b-4 border-dark-border px-8 py-5 w-10">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-2 border-dark-border accent-indigo-600 disabled:opacity-20"
                      checked={activeTab === 'Attendee' && filteredUsers.length > 0 && selectedUserIds.size === filteredUsers.length}
                      disabled={activeTab === 'Client'}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUserIds(new Set(filteredUsers.map(u => u.id)))
                        } else {
                          setSelectedUserIds(new Set())
                        }
                      }}
                    />
                  </th>
                  <th className="sticky top-0 z-30 bg-slate-50 border-b-4 border-dark-border px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Attendee Info</th>
                  <th className="sticky top-0 z-30 bg-slate-50 border-b-4 border-dark-border px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Role / Status</th>
                  {activeTab === 'Attendee' && (
                    <>
                      <th className="sticky top-0 z-30 bg-slate-50 border-b-4 border-dark-border px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Department</th>
                      <th className="sticky top-0 z-30 bg-slate-50 border-b-4 border-dark-border px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Authorized Zones</th>
                    </>
                  )}
                  {activeTab === 'Client' && (
                    <th className="sticky top-0 z-30 bg-slate-50 border-b-4 border-dark-border px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Org Code</th>
                  )}
                  <th className="sticky top-0 z-30 bg-slate-50 border-b-4 border-dark-border px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y-4 divide-slate-100">
                {filteredUsers.map((user: any) => (
                  <tr key={user.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded border-2 border-dark-border accent-indigo-600"
                        checked={selectedUserIds.has(user.id)}
                        disabled={user.role === 'Client'}
                        onChange={() => {
                          const next = new Set(selectedUserIds)
                          if (next.has(user.id)) next.delete(user.id)
                          else next.add(user.id)
                          setSelectedUserIds(next)
                        }}
                      />
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 border-2 border-indigo-100 flex items-center justify-center text-xl font-black text-indigo-600 shadow-sm group-hover:scale-110 transition-transform">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-slate-900 uppercase tracking-tight">
                            {user.name} {user.id === sessionUser?.id && <span className="text-indigo-600 ml-1 text-[8px]">(YOU)</span>}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 lowercase">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1.5">
                        <span className={`inline-flex w-fit px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider border-2 ${user.role === 'Client'
                          ? 'bg-amber-50 text-amber-600 border-amber-200'
                          : 'bg-green-50 text-green-600 border-green-200'
                          }`}
                        >
                          {user.role === 'Client' ? '🏢' : '👤'} {user.role || 'Attendee'}
                        </span>
                        <div className="flex items-center gap-1.5 ml-1">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[8px] font-black uppercase tracking-tighter text-emerald-600">
                            Verified {user.role || 'Attendee'}
                          </span>
                        </div>
                      </div>
                    </td>
                    {activeTab === 'Attendee' && (
                      <>
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight">
                              {categories?.find((c: any) => String(c.id) === String(user.categoryId))?.name || user.category?.name || 'Unassigned'}
                            </span>
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                              Personnel Group
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                            {user.enrollment?.length > 0 ? (
                              user.enrollment.map((e: any) => (
                                <span key={e.id} className="px-2 py-1 bg-indigo-50 text-indigo-600 border-2 border-indigo-100 rounded-lg text-[8px] font-black uppercase tracking-tighter whitespace-nowrap">
                                  📍 {e.geofence?.name}
                                </span>
                              ))
                            ) : (
                              <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">---</span>
                            )}
                          </div>
                        </td>
                      </>
                    )}
                    {activeTab === 'Client' && (
                      <td className="px-8 py-6">
                        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-tight">
                          {user.orgCode || '---'}
                        </span>
                      </td>
                    )}
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleEditClick(user)}
                          disabled={user.role === 'Client'}
                          className="p-3 bg-white rounded-xl border-3 border-slate-100 text-slate-400 hover:border-indigo-600 hover:text-indigo-600 transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(79,70,229,0.2)] disabled:opacity-30 disabled:hover:border-slate-100 disabled:hover:text-slate-400"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={async () => {
                            if ((user.role || 'Attendee') !== 'Attendee') {
                              return showNotif('Only attendees can be removed here.', 'error')
                            }
                            const isConfirmed = await confirm({
                              title: 'Remove Access?',
                              message: `Are you sure you want to remove ${user.name}? They will no longer be able to log attendance for this organization.`,
                              type: 'danger',
                              confirmText: 'Revoke Access'
                            })
                            if (isConfirmed) {
                              console.log('[client] delete payload:', { id: user?.id, role: user?.role || 'Attendee' })
                              deleteMutation.mutate({ id: user.id, role: user.role || 'Attendee' })
                            }
                          }}
                          disabled={user.role === 'Client'}
                          className="p-3 bg-white rounded-xl border-3 border-slate-100 text-slate-400 hover:border-rose-500 hover:text-rose-500 transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(244,63,94,0.2)] disabled:opacity-30 disabled:hover:border-slate-100 disabled:hover:text-slate-400"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={activeTab === 'Attendee' ? 6 : 5} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4 opacity-40 grayscale">
                        <div className="text-6xl">🕵️‍♂️</div>
                        <div className="text-xs font-black uppercase tracking-[0.2em]">No attendees found matching your query</div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ADD/EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[2000] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <Card className="w-full max-w-lg p-10 bg-white border-4 border-dark-border shadow-[12px_12px_0px_0px_#2b2b2b] animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                  {editingUser ? 'Edit Registry' : 'New Attendee'}
                </h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                  {editingUser ? 'Updating Attendee Credentials' : 'Provisioning Access Token'}
                </p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-2xl hover:bg-slate-100 flex items-center justify-center text-3xl transition-all">✕</button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault()
              if (editingUser) {
                const updateData: any = { ...newUser }
                if (!updateData.password) delete updateData.password
                const payload = { id: editingUser.id, role: 'Attendee', data: updateData }
                console.log('[client] updateUser payload:', payload)
                updateMutation.mutate(payload)
              } else {
                createMutation.mutate(newUser)
              }
            }} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                <input
                  required
                  value={newUser.name}
                  onChange={e => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. John Wick"
                  className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-3 border-dark-border text-xs font-black focus:bg-white transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                <input
                  required
                  type="email"
                  value={newUser.email}
                  onChange={e => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="john@example.com"
                  className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-3 border-dark-border text-xs font-black focus:bg-white transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    {editingUser ? 'Update Password (Optional)' : 'Access Password'}
                  </label>
                  <button
                    type="button"
                    onClick={generatePassword}
                    className="text-[8px] font-black uppercase text-indigo-600 hover:underline tracking-widest"
                  >
                    ✨ Auto-Generate
                  </button>
                </div>
                <div className="relative group">
                  <input
                    required={!editingUser}
                    type={showPassword ? 'text' : 'password'}
                    value={newUser.password}
                    onChange={e => setNewUser(prev => ({ ...prev, password: e.target.value }))}
                    placeholder={editingUser ? '•••••••• (leave blank to keep)' : '••••••••'}
                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-3 border-dark-border text-xs font-black focus:bg-white transition-all outline-none pr-24"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white border-2 border-slate-200 rounded-lg text-[8px] font-black uppercase tracking-widest hover:border-dark-border transition-all"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Department / Category</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                    className="w-full flex items-center justify-between px-5 py-4 bg-slate-50 rounded-2xl border-3 border-dark-border text-xs font-black uppercase transition-all outline-none focus:bg-white"
                  >
                    <span>
                      {newUser.categoryId
                        ? categories?.find((c: any) => String(c.id) === String(newUser.categoryId))?.name || 'Unknown Category'
                        : 'Select Category'}
                    </span>
                    <span className={`text-[10px] transition-transform duration-300 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
                  </button>

                  {isCategoryDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-[2010]" onClick={() => setIsCategoryDropdownOpen(false)} />
                      <div className="absolute top-full left-0 right-0 mt-3 bg-white border-4 border-dark-border rounded-2xl shadow-[8px_8px_0px_0px_#2b2b2b] z-[2020] overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-60 overflow-y-auto no-scrollbar">
                        <div className="p-2 grid gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              setNewUser(prev => ({ ...prev, categoryId: '' }))
                              setIsCategoryDropdownOpen(false)
                            }}
                            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${!newUser.categoryId
                                ? 'bg-indigo-600 text-white'
                                : 'text-slate-600 hover:bg-slate-50'
                              }`}
                          >
                            <span>🚫</span>
                            <span>None / Select</span>
                          </button>
                          {categories?.map((cat: any) => (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => {
                                setNewUser(prev => ({ ...prev, categoryId: String(cat.id) }))
                                setIsCategoryDropdownOpen(false)
                              }}
                              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${String(newUser.categoryId) === String(cat.id)
                                  ? 'bg-indigo-600 text-white'
                                  : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                              <span>📂</span>
                              <span>{cat.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="w-full py-5 bg-indigo-600 text-white rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] text-xs font-black uppercase tracking-[0.2em] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 border-4 border-dark-border"
                >
                  {createMutation.isPending || updateMutation.isPending ? 'Processing...' : editingUser ? 'Update Attendee' : 'Provision Access'}
                </button>
              </div>
            </form>
          </Card>
        </div>
      )}
      {/* ENROLLMENT CONFIG MODAL */}
      {isEnrollModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[2000] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <Card className="w-full max-w-4xl p-0 bg-white border-4 border-slate-900 shadow-[16px_16px_0px_0px_#2b2b2b] animate-in zoom-in-95 duration-300 overflow-hidden flex h-[600px]">
            {/* Left Panel: Target Selection */}
            <div className="w-1/2 p-10 border-r-4 border-slate-900 overflow-y-auto">
              <div className="mb-10">
                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Enrollment Config</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Mass assign geofence permissions</p>
              </div>

              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">1. Select Target Group</label>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { id: 'all', label: 'All Attendees', icon: '🌍' },
                      { id: 'category', label: 'By Department', icon: '🏢' },
                      { id: 'selective', label: `Selective (${selectedUserIds.size} Selected)`, icon: '🎯' }
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setEnrollType(t.id as any)}
                        className={`p-4 rounded-2xl border-3 flex items-center gap-4 transition-all ${enrollType === t.id
                            ? 'bg-indigo-600 border-slate-900 text-white shadow-[4px_4px_0px_0px_#2b2b2b]'
                            : 'bg-slate-50 border-slate-100 hover:border-slate-300 text-slate-600'
                          }`}
                      >
                        <span className="text-xl">{t.icon}</span>
                        <span className="text-xs font-black uppercase tracking-tight">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {enrollType === 'category' && (
                  <div className="space-y-3 animate-in slide-in-from-top-2 duration-200">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">2. Select Department</label>
                    <select
                      value={enrollTargetId}
                      onChange={e => setEnrollTargetId(e.target.value)}
                      className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-3 border-dark-border text-xs font-black uppercase appearance-none"
                    >
                      <option value="">Choose Category...</option>
                      {categories?.map((cat: any) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                {enrollType === 'selective' && selectedUserIds.size === 0 && (
                  <div className="p-4 bg-amber-50 border-2 border-amber-200 rounded-xl text-center">
                    <p className="text-[9px] font-black text-amber-600 uppercase">No users selected in the main registry table</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel: Zone Selection */}
            <div className="w-1/2 p-10 bg-slate-50 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">3. Select Authorized Zones</label>
                <button
                  onClick={() => { setIsEnrollModalOpen(false); setGfSearch(''); }}
                  className="w-8 h-8 rounded-lg hover:bg-slate-200 flex items-center justify-center text-xl transition-all"
                >✕</button>
              </div>

              <div className="mb-4 relative">
                <input
                  value={gfSearch}
                  onChange={e => setGfSearch(e.target.value)}
                  placeholder="Search zones..."
                  className="w-full pl-10 pr-4 py-3 bg-white border-3 border-dark-border rounded-xl text-[10px] font-black uppercase outline-none focus:shadow-lg transition-all"
                />
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs">🔍</div>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 pr-2 py-2">
                {geofences?.filter((gf: any) => gf.isActive && gf.name.toLowerCase().includes(gfSearch.toLowerCase())).map((gf: any) => (
                  <button
                    key={gf.id}
                    onClick={() => {
                      if (enrollGeofenceIds.includes(gf.id)) {
                        setEnrollGeofenceIds(prev => prev.filter(id => id !== gf.id))
                      } else {
                        setEnrollGeofenceIds(prev => [...prev, gf.id])
                      }
                    }}
                    className={`w-full p-4 rounded-2xl border-3 flex items-center justify-between transition-all ${enrollGeofenceIds.includes(gf.id)
                        ? 'bg-white border-indigo-600 shadow-[4px_4px_0px_0px_#4f46e5]'
                        : 'bg-white border-slate-100 hover:border-slate-300'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 border-2 border-indigo-100 flex items-center justify-center text-sm">📍</div>
                      <div className="text-left">
                        <div className="text-[10px] font-black uppercase tracking-tight text-slate-900">{gf.name}</div>
                        <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Radius: {gf.radius}m</div>
                      </div>
                    </div>
                    {enrollGeofenceIds.includes(gf.id) && (
                      <div className="w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[10px]">✓</div>
                    )}
                  </button>
                ))}
              </div>

              <div className="pt-8">
                <button
                  disabled={bulkEnrollMutation.isPending || enrollGeofenceIds.length === 0 || (enrollType === 'category' && !enrollTargetId) || (enrollType === 'selective' && selectedUserIds.size === 0)}
                  onClick={() => bulkEnrollMutation.mutate({
                    type: enrollType,
                    targetId: enrollTargetId,
                    userIds: Array.from(selectedUserIds),
                    geofenceIds: enrollGeofenceIds
                  })}
                  className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all disabled:opacity-50 border-4 border-slate-900"
                >
                  {bulkEnrollMutation.isPending ? 'Processing...' : 'Apply Enrollment'}
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
