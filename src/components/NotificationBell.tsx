import React, { useEffect, useState, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Card from './Card'
import { getSessionFn } from '../lib/authentication'
import { getUnverifiedUsersFn, verifyUserFn, getPendingOrganizationsFn, approveOrganizationFn, deleteOrganizationFn, getGeofencesByOrgFn } from '../lib/queries'
import { useNotification } from './Notification'

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const queryClient = useQueryClient()
  const { showNotif, confirm } = useNotification()

  useEffect(() => {
    let mounted = true
    getSessionFn().then((s: any) => { if (mounted) setUser(s) }).catch(() => {})
    return () => { mounted = false }
  }, [])

  const { data: pendingOrgs } = useQuery({ 
    queryKey: ['pending-orgs'], 
    queryFn: () => getPendingOrganizationsFn(), 
    enabled: user?.role === 'Admin' 
  })
  const { data: unverified } = useQuery({ 
    queryKey: ['unverified-users'], 
    queryFn: () => getUnverifiedUsersFn(), 
    enabled: user?.role === 'Admin' || user?.role === 'Client' 
  })

  // Only show the pending organizations section if the user is an Admin
  const showPendingOrgs = user?.role === 'Admin' && pendingOrgs && pendingOrgs.length > 0
  const showUnverified = unverified && unverified.length > 0

  const verifyMutation = useMutation({ mutationFn: (args: any) => verifyUserFn({ data: args }), onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['unverified-users'] }); showNotif('User approved', 'success') }, onError: (e: any) => showNotif(e?.message || 'Approve failed', 'error') })
  const approveOrgMutation = useMutation({ 
    mutationFn: (args: any) => approveOrganizationFn({ data: args }), 
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ['pending-orgs'] }); 
      showNotif('Organization approved', 'success');
      setTimeout(() => window.location.reload(), 1000);
    }, 
    onError: (e: any) => showNotif(e?.message || 'Approve failed', 'error') 
  })

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const badgeCount = (user?.role === 'Admin' ? (pendingOrgs?.length || 0) : 0) + (unverified?.length || 0)

  const handleApproveOrg = (o: any) => {
    // If it's a request (usually doesn't have a code yet), we should probably open the approve modal or 
    // just use a generated code for quick approval from notification. 
    // To keep it consistent, we'll prompt for confirmation if No Code, or just approve if it has one.
    const code = o.orgCode || `ORG-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    approveOrgMutation.mutate({ orgId: o.id, orgCode: code })
  }

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(v => !v)} 
        className={`h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl border-3 border-dark-border flex items-center justify-center transition-all bg-white relative shadow-[3px_3px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none ${isOpen ? 'bg-slate-50 translate-x-0.5 translate-y-0.5 shadow-none' : ''}`}
      >
        <span className="text-xl">🔔</span>
        {badgeCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-indigo-600 text-white text-[10px] font-black rounded-lg border-2 border-dark-border flex items-center justify-center shadow-[2px_2px_0px_0px_#2b2b2b]">
            {badgeCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-4 w-[calc(100vw-32px)] sm:w-96 z-[1000] animate-in fade-in slide-in-from-top-2 duration-200">
          <Card className="p-0 bg-white border-4 border-dark-border shadow-[8px_8px_0px_0px_#2b2b2b] overflow-hidden">
            <div className="p-4 border-b-3 border-slate-100 bg-slate-50/50">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Incoming Core Updates</div>
            </div>
            
            <div className="max-h-[70vh] overflow-y-auto no-scrollbar">
              <div className="p-4 space-y-6">
                {showPendingOrgs && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <div className="text-[9px] font-black uppercase tracking-widest text-slate-500">Node Requests ({pendingOrgs.length})</div>
                    </div>
                    <div className="space-y-2">
                      {pendingOrgs.map((o: any) => (
                        <div key={o.id} className="group p-3 bg-slate-50 hover:bg-amber-50 rounded-xl border-2 border-dark-border/10 hover:border-amber-200 transition-all">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="text-xs font-black uppercase tracking-tight text-slate-900 group-hover:text-amber-900">{o.name}</div>
                              {o.description && (
                                <div className="text-[9px] font-bold text-slate-500 mt-0.5 line-clamp-1 opacity-70">
                                  {o.description}
                                </div>
                              )}
                              <div className="text-[10px] font-bold text-slate-400 uppercase group-hover:text-amber-600/60 mt-2">
                                New Node Identity
                              </div>
                            </div>
                            <div className="text-[8px] px-1.5 py-0.5 bg-amber-100 text-amber-600 font-black rounded-md border-2 border-amber-200/50">PENDING</div>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleApproveOrg(o)}
                              disabled={approveOrgMutation.isPending}
                              className="flex-1 py-1.5 bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest rounded-lg border-2 border-dark-border shadow-[2px_2px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all disabled:opacity-50"
                            >
                              {approveOrgMutation.isPending ? 'Wait...' : 'Approve'}
                            </button>
                            <button 
                              onClick={() => {
                                if (confirm('Reject organization request?')) {
                                  deleteOrganizationFn({ data: { id: o.id } }).then(() => {
                                    queryClient.invalidateQueries({ queryKey: ['pending-orgs'] });
                                    showNotif('Request rejected', 'success');
                                    setTimeout(() => window.location.reload(), 1000);
                                  })
                                }
                              }}
                              className="px-3 py-1.5 bg-white text-rose-500 text-[9px] font-black uppercase tracking-widest rounded-lg border-2 border-dark-border shadow-[2px_2px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {showUnverified && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      <div className="text-[9px] font-black uppercase tracking-widest text-slate-500">Unverified Personnel ({unverified.length})</div>
                    </div>
                    <div className="space-y-2">
                      {unverified.map((u: any) => (
                        <div key={u.id} className="group p-3 bg-slate-50 hover:bg-indigo-50 rounded-xl border-2 border-dark-border/10 hover:border-indigo-200 transition-all">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <div className="text-xs font-black uppercase tracking-tight text-slate-900 group-hover:text-indigo-900">{u.name}</div>
                              <div className="text-[9px] font-bold text-slate-400 uppercase truncate max-w-[180px]">{u.email}</div>
                            </div>
                            <div className="text-[8px] px-1.5 py-0.5 bg-indigo-100 text-indigo-600 font-black rounded-md border-2 border-indigo-200/50">VERIFY</div>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => verifyMutation.mutate({ id: u.id, role: u.role || 'Attendee', geofenceIds: [] })}
                              disabled={verifyMutation.isPending}
                              className="flex-1 py-1.5 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded-lg border-2 border-dark-border shadow-[2px_2px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all disabled:opacity-50"
                            >
                              Verify Account
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!showPendingOrgs && !showUnverified && (
                  <div className="py-14 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-2xl border-3 border-dark-border bg-slate-50 flex items-center justify-center text-2xl shadow-[4px_4px_0px_0px_#2b2b2b] mb-6">
                      ✨
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-black uppercase tracking-tighter text-slate-900">All Caught Up</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Everything is syncronized</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
