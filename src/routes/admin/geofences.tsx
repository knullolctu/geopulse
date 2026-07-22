import React, { useMemo, useEffect, useState, Suspense, lazy } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import Card from '../../components/Card'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getGeofencesFn, getOrganizationsFn, createGeofenceFn, deleteGeofenceFn, toggleGeofenceStatusFn } from '../../lib/queries'
import { useNotification } from '../../components/Notification'

// Lazy load Map component to prevent SSR issues
const Map = lazy(() => import('../../components/Map'))

export const Route = createFileRoute('/admin/geofences')({ component: GeofencesPage })

function GeofencesPage() {
  const [search, setSearch] = useState('')
  const [expandedOrgId, setExpandedOrgId] = useState<string | null>(null)
  const [selectedGeofence, setSelectedGeofence] = useState<any>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [isSelectMode, setIsSelectMode] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [newGeofence, setNewGeofence] = useState({
    name: '',
    latitude: '',
    longitude: '',
    radius: '50',
    orgId: ''
  })

  const queryClient = useQueryClient()
  const { showNotif, confirm } = useNotification()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const { data: geofences, isLoading: geofencesLoading } = useQuery({
    queryKey: ['geofences'],
    queryFn: () => getGeofencesFn()
  })

  const { data: orgs, isLoading: orgsLoading } = useQuery({
    queryKey: ['organizations'],
    queryFn: () => getOrganizationsFn()
  })

  const createMutation = useMutation({
    mutationFn: (data: any) => createGeofenceFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['geofences'] })
      showNotif('Geofence created successfully!', 'success')
      setIsCreateModalOpen(false)
      setNewGeofence({ name: '', latitude: '', longitude: '', radius: '50', orgId: '' })
    },
    onError: (error: any) => {
      showNotif(`Failed to create geofence: ${error.message}`, 'error')
    }
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteGeofenceFn({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['geofences'] })
      showNotif('Geofence deleted successfully!', 'success')
      setSelectedGeofence(null)
    },
    onError: (error: any) => {
      showNotif(`Failed to delete geofence: ${error.message}`, 'error')
    }
  })

  const toggleMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      toggleGeofenceStatusFn({ data: { id, isActive } }),
    onSuccess: (updated: any) => {
      queryClient.invalidateQueries({ queryKey: ['geofences'] })
      if (selectedGeofence?.id === updated?.id) {
        setSelectedGeofence(updated)
      }
      showNotif(`Geofence ${updated?.isActive ? 'activated' : 'deactivated'}.`, 'success')
    },
    onError: (err: any) => showNotif(`Toggle failed: ${err.message}`, 'error'),
  })

  const bulkDeleteMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      await Promise.all(ids.map(id => deleteGeofenceFn({ data: { id } })))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['geofences'] })
      showNotif(`${selectedIds.size} geofences deleted successfully!`, 'success')
      setSelectedIds(new Set())
    },
    onError: (error: any) => {
      showNotif(`Bulk delete failed: ${error.message}`, 'error')
    }
  })

  const toggleSelection = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedIds(next)
  }

  const selectAllInOrg = (org: any) => {
    const next = new Set(selectedIds)
    const orgIds = org.geofences.map((s: any) => s.id)
    const allSelected = orgIds.every((id: string) => next.has(id))
    
    if (allSelected) {
      orgIds.forEach((id: string) => next.delete(id))
    } else {
      orgIds.forEach((id: string) => next.add(id))
    }
    setSelectedIds(next)
  }

  const handleManualRefresh = () => {
    setRefreshKey(prev => prev + 1)
    showNotif('Recalibrating satellite imagery...', 'success')
  }

  const groupedData = useMemo(() => {
    if (!orgs || !geofences) return []
    const searchLower = search.toLowerCase()
    
    return orgs.map(org => {
      const filteredGeofences = geofences.filter((s: any) => {
        if (s.orgId !== org.id) return false
        if (!search) return true
        return (
          s.name.toLowerCase().includes(searchLower) ||
          org.name.toLowerCase().includes(searchLower)
        )
      })
      
      return {
        ...org,
        geofences: filteredGeofences
      }
    }).filter(org => org.geofences.length > 0 || !search)
  }, [orgs, geofences, search])

  if (geofencesLoading || orgsLoading) {
    return (
      <div className="flex items-center justify-center h-60">
        <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 animate-pulse">Scanning Global Perimeter Zones...</div>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 -m-4 md:-m-8">
      {/* ── Top bar (shrink-0) ─────────────────────────────────────────────── */}
      <div className="shrink-0 px-4 md:px-8 pt-4 md:pt-6 pb-4 border-b-4 border-slate-100 bg-white space-y-4">
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 uppercase leading-none">Global Geofences</h2>
            <p className="text-slate-500 font-bold uppercase tracking-tight text-xs mt-1">
              Admin Control • Monitoring {geofences?.length ?? 0} active zones across all organizations
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <input 
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search zones or orgs..."
                className="w-full sm:min-w-[280px] pl-11 pr-6 py-2.5 bg-white border-3 border-[#2b2b2b] rounded-2xl text-xs font-black uppercase outline-none shadow-[4px_4px_0px_0px_#2b2b2b] focus:shadow-none transition-all"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</div>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-7 py-2.5 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest border-3 border-[#2b2b2b] shadow-[4px_4px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all whitespace-nowrap"
            >
              + Create Geofence
            </button>
          </div>
        </div>

        {/* Global selection toolbar */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-2 flex-wrap">
             {[
              { label: 'Total', value: geofences?.length ?? 0, color: 'bg-slate-900 text-white' },
              { label: 'Active', value: geofences?.filter((g: any) => g.isActive).length ?? 0, color: 'bg-emerald-600 text-white' },
              { label: 'Orgs', value: orgs?.length ?? 0, color: 'bg-indigo-600 text-white' },
            ].map(s => (
              <div key={s.label} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-[#2b2b2b] shadow-[2px_2px_0px_0px_#2b2b2b] ${s.color}`}>
                <span className="text-base font-black tracking-tighter">{s.value}</span>
                <span className="text-[8px] font-black uppercase tracking-widest opacity-75">{s.label}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => { setIsSelectMode(!isSelectMode); setSelectedIds(new Set()) }}
            className={`px-4 py-1.5 rounded-xl border-2 border-[#2b2b2b] font-black uppercase text-[9px] tracking-widest shadow-[2px_2px_0px_0px_#2b2b2b] active:shadow-none transition-all ${isSelectMode ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600'}`}
          >
            {isSelectMode ? 'Exit Selection Mode' : 'Bulk Selection'}
          </button>
        </div>
      </div>

      {/* ── Body grid (flex-1, fills remaining height) ───────────────────────── */}
      <div className="flex-1 min-h-0 grid grid-cols-1 xl:grid-cols-5 gap-0">
        {/* Geofence List Side */}
        <div className="xl:col-span-2 flex flex-col border-r-0 xl:border-r-4 border-b-4 xl:border-b-0 border-[#2b2b2b] overflow-hidden bg-slate-50">
          <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
            {groupedData.map((org) => (
              <div key={org.id} className="space-y-2">
                {/* Organization Accordion Header */}
                <button 
                  onClick={() => setExpandedOrgId(expandedOrgId === org.id ? null : org.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl border-3 border-[#2b2b2b] transition-all text-left shadow-[3px_3px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none ${
                    expandedOrgId === org.id ? 'bg-indigo-50 border-indigo-500' : 'bg-white'
                  }`}
                >
                  <div className="w-9 h-9 bg-slate-900 text-white rounded-lg flex items-center justify-center text-lg border-2 border-slate-900 font-black shrink-0">
                    🏢
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight truncate leading-none">{org.name}</h3>
                    <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest mt-1">Code: {org.orgCode}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[8px] font-black uppercase px-2 py-0.5 bg-slate-900 text-white rounded-md border border-[#2b2b2b]">
                      {org.geofences.length}
                    </span>
                    <div className={`transition-transform duration-300 ${expandedOrgId === org.id ? 'rotate-180' : ''}`}>
                      <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>

                {/* Expanded Geofences for Org */}
                {expandedOrgId === org.id && (
                  <div className="space-y-2 pl-4 border-l-4 border-indigo-200 py-1 animate-in slide-in-from-top-2 duration-300">
                    {/* Local Selection Controls if expanded and selection mode */}
                    {isSelectMode && org.geofences.length > 0 && (
                      <div className="flex items-center gap-2 mb-2">
                        <button
                          onClick={() => selectAllInOrg(org)}
                          className="text-[8px] font-black uppercase px-2 py-1 bg-white border-2 border-[#2b2b2b] rounded-lg shadow-[1px_1px_0px_0px_#2b2b2b] active:shadow-none"
                        >
                          {org.geofences.every((s: any) => selectedIds.has(s.id)) ? 'Deselect All Org' : 'Select All Org'}
                        </button>
                        {org.geofences.some((s: any) => selectedIds.has(s.id)) && (
                          <button
                            onClick={async () => {
                              const orgIds = org.geofences.map((s: any) => s.id)
                              const selectedInOrg = orgIds.filter((id: string) => selectedIds.has(id))
                              const ok = await confirm({
                                title: `Delete ${selectedInOrg.length} Geofences?`,
                                message: `Permanent deletion in ${org.name}.`,
                                type: 'danger',
                                confirmText: 'Delete'
                              })
                              if (ok) bulkDeleteMutation.mutate(selectedInOrg)
                            }}
                            className="text-[8px] font-black uppercase px-2 py-1 bg-rose-500 text-white border-2 border-[#2b2b2b] rounded-lg shadow-[1px_1px_0px_0px_#2b2b2b] active:shadow-none"
                          >
                            🗑 Delete Selected ({org.geofences.filter((s: any) => selectedIds.has(s.id)).length})
                          </button>
                        )}
                      </div>
                    )}

                    {org.geofences.map((g: any) => (
                      <div
                        key={g.id}
                        onClick={() => !isSelectMode && setSelectedGeofence(g)}
                        className={`w-full text-left p-3 rounded-xl border-2 transition-all shadow-[2px_2px_0px_0px_#2b2b2b] cursor-pointer group ${
                          selectedGeofence?.id === g.id
                            ? 'bg-indigo-600 border-slate-900 text-white'
                            : 'bg-white border-[#2b2b2b]/20 text-slate-900 hover:border-[#2b2b2b]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {isSelectMode && (
                            <div 
                              onClick={(e) => toggleSelection(g.id, e)}
                              className={`w-5 h-5 rounded-md border-2 border-slate-900 flex items-center justify-center shrink-0 transition-all ${selectedIds.has(g.id) ? 'bg-indigo-500' : 'bg-white'}`}
                            >
                              {selectedIds.has(g.id) && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          )}
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm border shrink-0 ${
                            selectedGeofence?.id === g.id ? 'bg-white/20 border-white/30' : 'bg-indigo-50 border-indigo-100'
                          }`}>
                            📍
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[11px] font-black uppercase tracking-tight truncate leading-tight">{g.name}</div>
                            <div className={`text-[8px] font-bold uppercase tracking-wider mt-0.5 ${selectedGeofence?.id === g.id ? 'text-indigo-200' : 'text-slate-400'}`}>
                              R: {g.radius}m • {g.latitude.toFixed(4)}, {g.longitude.toFixed(4)}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleMutation.mutate({ id: g.id, isActive: !g.isActive })
                              }}
                              disabled={toggleMutation.isPending}
                              className={`relative w-8 h-4 rounded-full border transition-all shrink-0 ${
                                g.isActive
                                  ? 'bg-emerald-500 border-emerald-600'
                                  : selectedGeofence?.id === g.id
                                  ? 'bg-white/20 border-white/30'
                                  : 'bg-slate-200 border-slate-300'
                              }`}
                            >
                              <span className={`absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white transition-all ${
                                g.isActive ? 'left-[18px]' : 'left-0.5'
                              }`} />
                            </button>
                            {!isSelectMode && (
                              <button
                                onClick={async (e) => {
                                  e.stopPropagation()
                                  const ok = await confirm({
                                    title: 'Delete Geofence?',
                                    message: `Delete "${g.name}" from ${org.name}?`,
                                    type: 'danger',
                                    confirmText: 'Delete'
                                  })
                                  if (ok) deleteMutation.mutate(g.id)
                                }}
                                className={`p-1 rounded-lg transition-all opacity-0 group-hover:opacity-100 ${
                                  selectedGeofence?.id === g.id ? 'hover:bg-white/20 text-white' : 'hover:bg-rose-50 text-rose-500'
                                }`}
                              >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Map Panel Side ────────────────────────────────────────────────── */}
        <div className="xl:col-span-3 flex flex-col overflow-hidden border-4 border-[#2b2b2b]">
          <div className="bg-slate-900 px-5 py-3 border-b-4 border-[#2b2b2b] flex items-center justify-between shrink-0">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Admin Live Visualizer</span>
            <div className="flex items-center gap-4">
              <button 
                onClick={handleManualRefresh}
                className="text-[9px] font-black text-indigo-400 hover:text-indigo-300 uppercase tracking-widest transition-colors flex items-center gap-2"
              >
                <span className="text-xs">🌍</span> Render Map
              </button>
              {selectedGeofence && (
                <button onClick={() => setSelectedGeofence(null)} className="text-[9px] font-black text-slate-400 hover:text-white uppercase tracking-widest transition-colors">
                  Reset View ✕
                </button>
              )}
            </div>
          </div>
          
          <div className="flex-1 relative bg-slate-800 p-3">
            <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white/10 relative">
              {isMounted ? (
                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center bg-slate-900">
                    <p className="text-[10px] font-black text-slate-500 uppercase animate-pulse">Scanning Satellite Network...</p>
                  </div>
                }>
                  <Map key={refreshKey} selectedGeofence={selectedGeofence} geofences={geofences} showSearch={false} refreshKey={refreshKey} />
                </Suspense>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-900">
                  <p className="text-xs font-black text-slate-700 uppercase animate-pulse">Initializing Map System...</p>
                </div>
              )}

              {!selectedGeofence && (
                <div className="absolute inset-0 z-[450] flex items-center justify-center pointer-events-auto">
                  <div className="bg-slate-900/60 backdrop-blur-[2px] w-full h-full flex flex-col items-center justify-center gap-6">
                    <div className="text-center">
                      <div className="text-5xl mb-4 grayscale opacity-40">🌍</div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Select a zone to monitor</p>
                    </div>
                    
                    <button 
                      onClick={handleManualRefresh}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest border-3 border-dark-border shadow-[4px_4px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all"
                    >
                      Render All Zones
                    </button>
                  </div>
                </div>
              )}

              {selectedGeofence && (
                <div className="absolute top-3 right-3 z-[1000] animate-in slide-in-from-right-4 duration-500">
                  <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border-2 border-indigo-400/40 shadow-lg">
                    <div className="text-[9px] font-black text-slate-900 uppercase tracking-tight">{selectedGeofence.name}</div>
                    <div className="text-[7px] font-bold text-indigo-600 uppercase tracking-widest mt-0.5">R: {selectedGeofence.radius}m</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Detail Bar */}
          {selectedGeofence && (
            <div className="shrink-0 p-4 pr-28 border-t-4 border-[#2b2b2b] bg-slate-50 flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleMutation.mutate({ id: selectedGeofence.id, isActive: !selectedGeofence.isActive })}
                  disabled={toggleMutation.isPending}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 font-black uppercase text-[9px] tracking-widest transition-all shadow-[2px_2px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none ${
                    selectedGeofence.isActive
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-400'
                      : 'bg-slate-100 text-slate-600 border-slate-300'
                  }`}
                >
                  <span className={`w-8 h-4 rounded-full relative border transition-all ${
                    selectedGeofence.isActive ? 'bg-emerald-500 border-emerald-600' : 'bg-slate-300 border-slate-400'
                  }`}>
                    <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-all ${
                      selectedGeofence.isActive ? 'left-[17px]' : 'left-0.5'
                    }`} />
                  </span>
                  {selectedGeofence.isActive ? 'Active' : 'Inactive'}
                </button>
                <button
                  onClick={async () => {
                    const ok = await confirm({
                      title: 'Delete Geofence?',
                      message: `Remove "${selectedGeofence.name}"?`,
                      type: 'danger',
                      confirmText: 'Delete'
                    })
                    if (ok) deleteMutation.mutate(selectedGeofence.id)
                  }}
                  className="px-4 py-2 bg-rose-500 text-white rounded-xl font-black uppercase text-[9px] tracking-widest border-2 border-rose-700 shadow-[2px_2px_0px_0px_#9f1239] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
                >
                  🗑 Remove
                </button>
              </div>
              <div className="min-w-0">
                <div className="text-sm font-black text-slate-900 uppercase truncate">{selectedGeofence.name}</div>
                <div className="text-[9px] font-black text-indigo-600 uppercase tracking-widest mt-0.5">
                  Org: {orgs?.find((o: any) => o.id === selectedGeofence.orgId)?.name ?? 'Unknown'}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CREATE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[2000] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <Card className="w-full max-w-5xl p-0 bg-white border-4 border-slate-900 shadow-[12px_12px_0px_0px_#2b2b2b] animate-in zoom-in-95 duration-300 overflow-hidden">
            <div className="flex h-[620px]">
              <div className="w-3/5 bg-slate-100 border-r-4 border-slate-900 relative">
                <Suspense fallback={<div className="w-full h-full flex items-center justify-center font-black uppercase text-xs text-slate-400 animate-pulse">Loading Map...</div>}>
                  <Map 
                    onMapClick={(lat, lng) => setNewGeofence(prev => ({ ...prev, latitude: lat.toFixed(6), longitude: lng.toFixed(6) }))}
                    onRadiusChange={(radius) => setNewGeofence(prev => ({ ...prev, radius: radius.toString() }))}
                    showSelectionBadge={true}
                    previewCircle={newGeofence.latitude && newGeofence.longitude ? {
                      lat: parseFloat(newGeofence.latitude),
                      lng: parseFloat(newGeofence.longitude),
                      radius: parseInt(newGeofence.radius) || 50
                    } : undefined}
                  />
                </Suspense>
              </div>

              <div className="w-2/5 p-8 overflow-y-auto bg-white flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">New Geofence</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Global Deployment</p>
                  </div>
                  <button onClick={() => setIsCreateModalOpen(false)} className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center text-2xl transition-all">✕</button>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault()
                  if (!newGeofence.orgId) return showNotif('Select Organization', 'error')
                  createMutation.mutate(newGeofence)
                }} className="space-y-5 flex-1 flex flex-col">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Zone Name</label>
                    <input required value={newGeofence.name} onChange={e => setNewGeofence(prev => ({ ...prev, name: e.target.value }))} placeholder="Main Gate" className="w-full px-4 py-3 bg-slate-50 rounded-xl border-3 border-[#2b2b2b] text-xs font-black uppercase outline-none" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Latitude</label>
                      <input required value={newGeofence.latitude} onChange={e => setNewGeofence(prev => ({ ...prev, latitude: e.target.value }))} className="w-full px-4 py-3 bg-slate-100 rounded-xl border-3 border-[#2b2b2b] text-xs font-black" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Longitude</label>
                      <input required value={newGeofence.longitude} onChange={e => setNewGeofence(prev => ({ ...prev, longitude: e.target.value }))} className="w-full px-4 py-3 bg-slate-100 rounded-xl border-3 border-[#2b2b2b] text-xs font-black" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Radius (m)</label>
                    <input type="number" min="10" required value={newGeofence.radius} onChange={e => setNewGeofence(prev => ({ ...prev, radius: e.target.value }))} className="w-full px-4 py-3 bg-slate-50 rounded-xl border-3 border-[#2b2b2b] text-xs font-black focus:bg-white transition-all outline-none" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Assign Organization</label>
                    <select required value={newGeofence.orgId} onChange={e => setNewGeofence(prev => ({ ...prev, orgId: e.target.value }))} className="w-full px-4 py-3 bg-slate-50 rounded-xl border-3 border-[#2b2b2b] text-xs font-black uppercase outline-none appearance-none">
                      <option value="">Select Org</option>
                      {orgs?.map((o: any) => <option key={o.id} value={o.id}>{o.name}</option>)}
                    </select>
                  </div>

                  <div className="pt-4 mt-auto">
                    <button type="submit" disabled={createMutation.isPending} className="w-full py-4 bg-slate-900 text-white rounded-xl font-black uppercase text-xs tracking-widest shadow-[6px_6px_0px_0px_rgba(0,0,0,0.25)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50">
                      {createMutation.isPending ? 'Deploying...' : 'Deploy Global Geofence'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
