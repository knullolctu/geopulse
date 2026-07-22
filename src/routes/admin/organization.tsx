import React, { useState, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import Card from '../../components/Card'
import { THEME } from '../../theme'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getOrganizationsFn, createOrganizationFn, updateOrganizationFn, deleteOrganizationFn, getPendingOrganizationsFn, approveOrganizationFn } from '../../lib/queries'
import { useNotification } from '../../components/Notification'

export const Route = createFileRoute('/admin/organization')({ component: OrganizationPage })

function OrganizationPage() {
  const queryClient = useQueryClient()
  const { showNotif } = useNotification()
  const [isCreating, setIsCreating] = React.useState(false)
  const [editingOrg, setEditingOrg] = React.useState<any>(null)
  const [deletingOrg, setDeletingOrg] = React.useState<any>(null)
  const [approvingOrg, setApprovingOrg] = React.useState<any>(null)
  const [newOrg, setNewOrg] = React.useState({ name: '', orgCode: '', description: '' })
  const [searchTerm, setSearchTerm] = React.useState('')

  const normalizeOrgCode = (value: string) => value.toUpperCase()
  const finalizeOrgCode = (value: string) => value.trim().toUpperCase()

  const randomizeOrgCode = (type: 'create' | 'edit' | 'approve' = 'create') => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    const code = `ORG-${result}`
    if (type === 'edit' && editingOrg) {
      setEditingOrg({ ...editingOrg, orgCode: code })
    } else if (type === 'approve' && approvingOrg) {
      setApprovingOrg({ ...approvingOrg, orgCode: code })
    } else {
      setNewOrg({ ...newOrg, orgCode: code })
    }
  }

  const handleNameChange = (name: string) => {
    setNewOrg({ ...newOrg, name })
  }

  const { data: orgs, isLoading: orgsLoading } = useQuery({
    queryKey: ['organizations'],
    queryFn: () => getOrganizationsFn()
  })

  const { data: pendingOrgs } = useQuery({
    queryKey: ['pending-orgs'],
    queryFn: () => getPendingOrganizationsFn(),
    enabled: true
  })

  const filteredOrgs = useMemo(() => {
    if (!orgs) return []
    return orgs.filter((o: any) => {
      // Only show active (approved) organizations in the main list
      if (!(o.isActive === 1 || o.isActive === true)) return false
      
      return o.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
             (o.orgCode || '').toLowerCase().includes(searchTerm.toLowerCase())
    })
  }, [orgs, searchTerm])

  const createMutation = useMutation({
    mutationFn: (data: any) => createOrganizationFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] })
      setIsCreating(false)
      setNewOrg({ name: '', orgCode: '', description: '' })
      showNotif('Organization created successfully!', 'success')
    },
    onError: (err: any) => {
      showNotif(err.message, 'error')
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ orgId, updateData }: { orgId: string, updateData: any }) => 
      updateOrganizationFn({ data: { orgId, updateData } }),
    onSuccess: (res: any) => {
      if (res?.error) {
        showNotif(res.error, 'error')
        return
      }
      showNotif('Organization updated successfully!', 'success')
      queryClient.invalidateQueries({ queryKey: ['organizations'] })
      setEditingOrg(null)
    },
    onError: (err: any) => {
      showNotif(err.message, 'error')
    }
  })

  const deleteMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => deleteOrganizationFn({ data: { id } }),
    onSuccess: (res: any) => {
      if (res?.error) {
        showNotif(res.error, 'error')
        return
      }
      queryClient.invalidateQueries({ queryKey: ['organizations'] })
      queryClient.invalidateQueries({ queryKey: ['pending-orgs'] })
      setDeletingOrg(null)
      showNotif('Organization deleted successfully!', 'success')
      setTimeout(() => window.location.reload(), 1000)
    },
    onError: (err: any) => {
      showNotif(err.message, 'error')
    }
  })

  const toggleActivate = (id: string, currentStatus: any) => {
    const isActive = currentStatus === 1 || currentStatus === true
    const nextStatus = !isActive
    updateMutation.mutate({ orgId: id, updateData: { isActive: nextStatus } })
  }

  const approveMutation = useMutation({
    mutationFn: (args: { orgId: string; orgCode?: string }) => approveOrganizationFn({ data: args }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-orgs'] })
      queryClient.invalidateQueries({ queryKey: ['organizations'] })
      setApprovingOrg(null)
      showNotif('Organization approved', 'success')
      setTimeout(() => window.location.reload(), 1000)
    },
    onError: (err: any) => showNotif(err.message, 'error')
  })

  if (orgsLoading) return <div className="p-8 font-black uppercase text-slate-400 animate-pulse">Syncing Network Nodes...</div>

  const createOrgCode = finalizeOrgCode(newOrg.orgCode)
  const editingOrgCode = editingOrg ? finalizeOrgCode(editingOrg.orgCode || '') : ''
  const approvingOrgCode = approvingOrg ? finalizeOrgCode(approvingOrg.orgCode || '') : ''
  
  return (
    <>
      <div className="h-[calc(100vh-80px)] flex flex-col bg-white -m-4 md:-m-8">
        {/* 1. TOP HEADER SECTION (Static) */}
        <div className="shrink-0 bg-white border-b-4 border-slate-100 px-4 md:px-8 pt-6 pb-4 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 uppercase leading-none">Organizations</h2>
              <p className="text-slate-500 font-bold uppercase tracking-tight text-xs mt-1">
                {filteredOrgs.length} active nodes within the GeoPulse network
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <div className="relative group flex-1 sm:flex-none">
                <input 
                  type="text"
                  placeholder="Search network nodes..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full sm:min-w-[320px] pl-10 pr-12 py-2.5 bg-white border-3 border-dark-border rounded-2xl text-[10px] font-black uppercase outline-none shadow-[3px_3px_0px_0px_#2b2b2b] focus:shadow-none focus:translate-x-0.5 focus:translate-y-0.5 transition-all"
                />
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</div>
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 transition-all text-xs font-black shadow-sm"
                  >
                    ✕
                  </button>
                )}
              </div>

              <button 
                onClick={() => setIsCreating(true)}
                className="flex items-center gap-4 px-6 py-2.5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest border-3 border-dark-border shadow-[3px_3px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all whitespace-nowrap mr-1"
              >
                <div className="flex flex-col items-start flex-1 text-left">
                  <label className="text-[7px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">Network Node</label>
                  <div className="text-[9px] font-black uppercase tracking-widest text-white flex items-center gap-2">
                    <span>+ Add Organization</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* 2. MAIN DATA SECTION (Scrollable) */}
        <div className="flex-1 min-h-0 flex flex-col bg-white overflow-hidden md:border-l-4 md:border-r-4 md:border-t-4 border-dark-border">
          <div className="flex-1 overflow-auto no-scrollbar p-4 md:p-8 space-y-4">
            {/* Pending applications section */}
            {pendingOrgs && pendingOrgs.length > 0 && (
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Incoming Requests</h3>
                  <div className="px-2 py-0.5 bg-amber-100 text-amber-600 text-[10px] font-black rounded-lg border-2 border-amber-200 animate-pulse">
                    {pendingOrgs.length} PENDING
                  </div>
                </div>
                <div className="grid gap-3">
                  {pendingOrgs.map((o: any) => (
                    <div key={o.id} className="p-5 bg-white rounded-2xl border-3 border-dark-border shadow-[4px_4px_0px_0px_#2b2b2b] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-50 rounded-xl border-3 border-dashed border-amber-300 flex items-center justify-center text-xl">
                          📩
                        </div>
                        <div>
                          <div className="font-black uppercase text-slate-900 tracking-tight">{o.name}</div>
                          {o.description && (
                            <p className="text-[10px] font-bold text-slate-500 mt-1 line-clamp-2 max-w-md">
                              {o.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">New Node Request</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                            <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Awaiting Code</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button 
                          onClick={() => setApprovingOrg(o)} 
                          className="flex-1 sm:flex-none px-6 py-2 bg-emerald-500 text-white rounded-xl border-3 border-dark-border font-black uppercase text-[10px] tracking-widest shadow-[3px_3px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => setDeletingOrg(o)} 
                          className="flex-1 sm:flex-none px-6 py-2 bg-white text-rose-500 rounded-xl border-3 border-dark-border font-black uppercase text-[10px] tracking-widest shadow-[3px_3px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="h-px bg-slate-100 w-full" />
              </div>
            )}
            
            {filteredOrgs.map((o: any) => {
              const isActive = o.isActive === 1 || o.isActive === true;
              return (
                <div key={o.id} className="p-4 bg-slate-50 rounded-2xl border-3 border-dark-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-indigo-50 transition-all shadow-[4px_4px_0px_0px_#f1f5f9] hover:shadow-[4px_4px_0px_0px_rgba(79,70,229,0.1)]">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-white rounded-2xl border-3 border-dark-border flex items-center justify-center text-2xl shadow-[3px_3px_0px_0px_#2b2b2b] shrink-0 group-hover:scale-110 transition-transform">
                      🏢
                    </div>
                    <div className="space-y-1">
                      <div className="text-lg font-black uppercase tracking-tighter text-slate-900 leading-none">{o.name}</div>
                      {o.description && (
                        <div className="text-[10px] font-bold text-slate-500 italic line-clamp-1 max-w-sm">
                          "{o.description}"
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-100/50 px-2 py-0.5 rounded-lg border-2 border-indigo-200/50">
                          {o.orgCode}
                        </div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Node ID: {o.id.split('-')[0]}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-6 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                    <div className="flex items-center gap-4">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {isActive ? 'Active' : 'Paused'}
                      </span>
                      <button 
                        onClick={() => toggleActivate(o.id, o.isActive)}
                        disabled={updateMutation.isPending}
                        className={`w-14 h-7 rounded-full border-3 border-dark-border relative transition-colors duration-300 ${isActive ? 'bg-emerald-400' : 'bg-slate-200'}`}
                      >
                        <div className={`absolute top-0.5 w-5 h-5 rounded-full border-3 border-dark-border bg-white transition-all duration-300 shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] ${isActive ? 'left-7' : 'left-0.5'}`} />
                      </button>
                    </div>

                    <div className="h-10 w-[3px] bg-slate-200 rounded-full" />

                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setEditingOrg(o)}
                        className="p-3 bg-white hover:bg-slate-900 hover:text-white rounded-xl transition-all border-3 border-dark-border shadow-[3px_3px_0px_0px_#2b2b2b] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => setDeletingOrg(o)}
                        className="p-3 bg-white hover:bg-red-600 hover:text-white rounded-xl transition-all border-3 border-dark-border shadow-[3px_3px_0px_0px_#2b2b2b] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {filteredOrgs.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center p-20 text-center border-4 border-dashed border-slate-100 rounded-3xl space-y-4">
                <div className="text-5xl animate-bounce">📭</div>
                <p className="text-slate-400 font-black uppercase tracking-widest text-sm">No network nodes found matching your query.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CREATE MODAL */}
      {isCreating && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <Card className="w-full max-w-md p-10 bg-white border-4 border-dark-border shadow-[12px_12px_0px_0px_#2b2b2b] animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">New Node</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Network Expansion</p>
              </div>
              <button onClick={() => setIsCreating(false)} className="w-12 h-12 rounded-2xl hover:bg-slate-100 flex items-center justify-center text-3xl transition-all">✕</button>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Entity Name</label>
                <input 
                  type="text"
                  value={newOrg.name}
                  onChange={e => handleNameChange(e.target.value)}
                  className="w-full p-5 bg-slate-50 rounded-2xl border-3 border-dark-border font-black uppercase outline-none focus:bg-white transition-colors"
                  placeholder="ACME CORP"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Description</label>
                <textarea 
                  value={newOrg.description}
                  onChange={e => setNewOrg({...newOrg, description: e.target.value})}
                  className="w-full p-5 bg-slate-50 rounded-2xl border-3 border-dark-border font-bold text-sm outline-none focus:bg-white transition-colors min-h-[100px] resize-none"
                  placeholder="What is this node for?"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Unique Org Code</label>
                <div className="flex gap-3">
                  <input 
                    type="text"
                    value={newOrg.orgCode}
                    onChange={e => setNewOrg({...newOrg, orgCode: normalizeOrgCode(e.target.value)})}
                    className="flex-1 p-5 bg-slate-50 rounded-2xl border-3 border-dark-border font-black uppercase outline-none focus:bg-white transition-colors"
                    placeholder="ACME-01"
                  />
                  <button 
                    type="button"
                    onClick={() => randomizeOrgCode('create')}
                    className="p-5 bg-indigo-50 rounded-2xl border-3 border-dark-border hover:bg-indigo-100 transition-colors flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(79,70,229,0.2)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    ✨
                  </button>
                </div>
              </div>
              <div className="pt-6">
                <button 
                  onClick={() => createMutation.mutate({ ...newOrg, orgCode: createOrgCode })}
                  disabled={createMutation.isPending || !newOrg.name.trim() || !createOrgCode}
                  className="w-full py-5 bg-indigo-600 text-white rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] text-xs font-black uppercase tracking-[0.2em] border-4 border-dark-border hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
                >
                  {createMutation.isPending ? 'Syncing...' : 'Initialize Node'}
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* EDIT MODAL */}
      {editingOrg && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <Card className="w-full max-w-md p-10 bg-white border-4 border-dark-border shadow-[12px_12px_0px_0px_#2b2b2b] animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Edit Node</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Network Maintenance</p>
              </div>
              <button onClick={() => setEditingOrg(null)} className="w-12 h-12 rounded-2xl hover:bg-slate-100 flex items-center justify-center text-3xl transition-all">✕</button>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Entity Name</label>
                <input 
                  type="text"
                  value={editingOrg.name}
                  onChange={e => setEditingOrg({...editingOrg, name: e.target.value})}
                  className="w-full p-5 bg-slate-50 rounded-2xl border-3 border-dark-border font-black uppercase outline-none focus:bg-white transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Description</label>
                <textarea 
                  value={editingOrg.description || ''}
                  onChange={e => setEditingOrg({...editingOrg, description: e.target.value})}
                  className="w-full p-5 bg-slate-50 rounded-2xl border-3 border-dark-border font-bold text-sm outline-none focus:bg-white transition-colors min-h-[100px] resize-none"
                  placeholder="Organization description..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Org Code</label>
                <div className="flex gap-4">
                  <input 
                    type="text"
                    value={editingOrg.orgCode || ''}
                    onChange={e => setEditingOrg({...editingOrg, orgCode: normalizeOrgCode(e.target.value)})}
                    className="flex-1 p-5 bg-slate-50 rounded-2xl border-3 border-dark-border font-black uppercase outline-none focus:bg-white transition-colors"
                  />
                  <button 
                    type="button"
                    onClick={() => randomizeOrgCode('edit')}
                    className="p-5 bg-indigo-50 rounded-2xl border-3 border-dark-border hover:bg-indigo-100 transition-colors flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(79,70,229,0.2)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    ✨
                  </button>
                </div>
              </div>
              <div className="pt-6">
                <button 
                  onClick={() => updateMutation.mutate({ orgId: editingOrg.id, updateData: { name: editingOrg.name, orgCode: editingOrgCode, description: editingOrg.description } })}
                  disabled={updateMutation.isPending}
                  className="w-full py-5 bg-slate-900 text-white rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] text-xs font-black uppercase tracking-[0.2em] border-4 border-dark-border hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
                >
                  {updateMutation.isPending ? 'Syncing...' : 'Save Configuration'}
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* APPROVE MODAL */}
      {approvingOrg && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <Card className="w-full max-w-md p-10 bg-white border-4 border-emerald-600 shadow-[12px_12px_0px_0px_#059669] animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Approve Node</h3>
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-1">Finalize Activation for {approvingOrg.name}</p>
              </div>
              <button onClick={() => setApprovingOrg(null)} className="w-12 h-12 rounded-2xl hover:bg-slate-100 flex items-center justify-center text-3xl transition-all">✕</button>
            </div>
            <div className="space-y-6">
              <div className="p-5 bg-slate-50 border-3 border-dark-border rounded-2xl relative">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-1.5">Description From Database</label>
                <div className="text-xs font-bold text-slate-700 leading-relaxed italic">
                  {approvingOrg.description ? `"${approvingOrg.description}"` : <span className="text-slate-400">Column "description" is empty for this node</span>}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Assigned Organization Code</label>
                <div className="flex gap-4">
                  <input 
                    type="text"
                    value={approvingOrg.orgCode || ''}
                    onChange={e => setApprovingOrg({...approvingOrg, orgCode: normalizeOrgCode(e.target.value)})}
                    className="flex-1 p-5 bg-slate-50 rounded-2xl border-3 border-dark-border font-black uppercase outline-none focus:bg-white transition-colors"
                    placeholder="ORG-XXXXXX"
                  />
                  <button 
                    type="button"
                    onClick={() => randomizeOrgCode('approve')}
                    className="p-5 bg-emerald-50 rounded-2xl border-3 border-emerald-600/30 hover:bg-emerald-100 transition-colors flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(5,150,105,0.2)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    ✨
                  </button>
                </div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight ml-1 mt-2">
                  The client will use this code to join the organization.
                </p>
              </div>
              <div className="pt-6">
                <button 
                  onClick={() => approveMutation.mutate({ orgId: approvingOrg.id, orgCode: approvingOrgCode })}
                  disabled={approveMutation.isPending || !approvingOrgCode}
                  className="w-full py-5 bg-emerald-600 text-white rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] text-xs font-black uppercase tracking-[0.2em] border-4 border-dark-border hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
                >
                  {approveMutation.isPending ? 'Activating...' : 'Approve & Activate Node'}
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* DELETE CONFIRMATION */}
      {deletingOrg && (
        <div className="fixed inset-0 bg-red-900/40 backdrop-blur-sm z-[2000] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <Card className="w-full max-w-sm p-10 bg-white border-4 border-red-600 shadow-[12px_12px_0px_0px_#991b1b] animate-in zoom-in-95 duration-300">
            <div className="text-4xl mb-4">{deletingOrg.isActive ? '⚠️' : '🚫'}</div>
            <h3 className="text-xl font-black uppercase tracking-tighter mb-2">
              {deletingOrg.isActive ? 'Decommission Node?' : 'Reject Request?'}
            </h3>
            <p className="text-xs font-bold text-slate-500 uppercase leading-relaxed mb-8">
              {deletingOrg.isActive 
                ? `This will permanently remove "${deletingOrg.name}" and all its associated geofences and users. This action is irreversible.`
                : `This will decline the request from "${deletingOrg.name}" and remove it from the system.`}
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setDeletingOrg(null)}
                className="flex-1 py-3 font-black uppercase text-slate-500 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => deleteMutation.mutate({ id: deletingOrg.id })}
                disabled={deleteMutation.isPending}
                className="flex-1 py-3 bg-red-600 text-white rounded-xl border-3 border-[#2b2b2b] font-black uppercase shadow-[4px_4px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 disabled:opacity-50 transition-all"
              >
                {deleteMutation.isPending ? 'Processing...' : 'Confirm'}
              </button>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
