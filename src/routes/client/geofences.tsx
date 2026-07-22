import React, { useState, useMemo, useEffect, Suspense, lazy } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getGeofencesByOrgFn, createGeofenceByClientFn, deleteGeofenceByClientFn, toggleGeofenceStatusFn } from '../../lib/queries'
import { useNotification } from '../../components/Notification'
import Card from '../../components/Card'

const Map = lazy(() => import('../../components/Map'))

export const Route = createFileRoute('/client/geofences')({
  component: ClientGeofencesPage,
})

function ClientGeofencesPage() {
  const queryClient = useQueryClient()
  const { showNotif, confirm } = useNotification()

  const [search, setSearch] = useState('')
  const [selectedGeofence, setSelectedGeofence] = useState<any>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isSelectMode, setIsSelectMode] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [newGeofence, setNewGeofence] = useState({
    name: '',
    latitude: '',
    longitude: '',
    radius: '50',
  })

  useEffect(() => { setIsMounted(true) }, [])

  const { data: geofences, isLoading } = useQuery({
    queryKey: ['client-geofences'],
    queryFn: () => getGeofencesByOrgFn(),
  })

  const createMutation = useMutation({
    mutationFn: (data: any) => createGeofenceByClientFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client-geofences'] })
      queryClient.invalidateQueries({ queryKey: ['client-dashboard-stats'] })
      showNotif('Geofence deployed successfully!', 'success')
      setIsCreateModalOpen(false)
      setNewGeofence({ name: '', latitude: '', longitude: '', radius: '50' })
    },
    onError: (err: any) => showNotif(`Failed: ${err.message}`, 'error'),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteGeofenceByClientFn({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client-geofences'] })
      queryClient.invalidateQueries({ queryKey: ['client-dashboard-stats'] })
      showNotif('Geofence removed.', 'success')
      setSelectedGeofence(null)
    },
    onError: (err: any) => showNotif(`Delete failed: ${err.message}`, 'error'),
  })

  const toggleMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      toggleGeofenceStatusFn({ data: { id, isActive } }),
    onSuccess: (updated: any) => {
      queryClient.invalidateQueries({ queryKey: ['client-geofences'] })
      queryClient.invalidateQueries({ queryKey: ['client-dashboard-stats'] })
      // Keep selected geofence in sync
      if (selectedGeofence?.id === updated?.id) {
        setSelectedGeofence(updated)
      }
      showNotif(`Geofence ${updated?.isActive ? 'activated' : 'deactivated'}.`, 'success')
    },
    onError: (err: any) => showNotif(`Toggle failed: ${err.message}`, 'error'),
  })

  const bulkDeleteMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      await Promise.all(ids.map(id => deleteGeofenceByClientFn({ data: { id } })))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client-geofences'] })
      showNotif(`${selectedIds.size} geofences removed.`, 'success')
      setSelectedIds(new Set())
      setIsSelectMode(false)
    },
    onError: (err: any) => showNotif(`Bulk delete failed: ${err.message}`, 'error'),
  })

  const toggleSelection = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    const next = new Set(selectedIds)
    next.has(id) ? next.delete(id) : next.add(id)
    setSelectedIds(next)
  }

  const selectAll = () => {
    const allIds = (geofences as any[])?.map(g => g.id) ?? []
    setSelectedIds(selectedIds.size === allIds.length ? new Set() : new Set(allIds))
  }

  const filtered = useMemo(() => {
    if (!geofences) return []
    return (geofences as any[]).filter(g =>
      !search || g.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [geofences, search])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-60">
        <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 animate-pulse">Scanning Perimeter Zones...</div>
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
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 uppercase leading-none">Geofences</h2>
            <p className="text-slate-500 font-bold uppercase tracking-tight text-xs mt-1">
              {filtered.length} zone{filtered.length !== 1 ? 's' : ''} • Your organization's perimeter boundaries
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search zones..."
                className="w-full sm:min-w-[240px] pl-11 pr-6 py-2.5 bg-white border-3 border-[#2b2b2b] rounded-2xl text-xs font-black uppercase outline-none shadow-[4px_4px_0px_0px_#2b2b2b] focus:shadow-none transition-all"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</div>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-7 py-2.5 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest border-3 border-[#2b2b2b] shadow-[4px_4px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all whitespace-nowrap"
            >
              + Deploy Geofence
            </button>
          </div>
        </div>

        {/* Stat chips + selection toolbar row */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-2 flex-wrap">
            {[
              { label: 'Total', value: (geofences as any[])?.length ?? 0, color: 'bg-slate-900 text-white' },
              { label: 'Active', value: (geofences as any[])?.filter((g: any) => g.isActive).length ?? 0, color: 'bg-emerald-600 text-white' },
              { label: 'Inactive', value: (geofences as any[])?.filter((g: any) => !g.isActive).length ?? 0, color: 'bg-slate-200 text-slate-700' },
            ].map(s => (
              <div key={s.label} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-[#2b2b2b] shadow-[2px_2px_0px_0px_#2b2b2b] ${s.color}`}>
                <span className="text-base font-black tracking-tighter">{s.value}</span>
                <span className="text-[8px] font-black uppercase tracking-widest opacity-75">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Selection toolbar */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => { setIsSelectMode(!isSelectMode); setSelectedIds(new Set()) }}
              className={`px-4 py-1.5 rounded-xl border-2 border-[#2b2b2b] font-black uppercase text-[9px] tracking-widest shadow-[2px_2px_0px_0px_#2b2b2b] active:shadow-none transition-all ${isSelectMode ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600'}`}
            >
              {isSelectMode ? 'Exit Select' : 'Select'}
            </button>
            {isSelectMode && (
              <>
                <button
                  onClick={selectAll}
                  className="px-4 py-1.5 rounded-xl border-2 border-[#2b2b2b] bg-white font-black uppercase text-[9px] tracking-widest shadow-[2px_2px_0px_0px_#2b2b2b] active:shadow-none transition-all"
                >
                  {selectedIds.size === filtered.length && filtered.length > 0 ? 'Deselect All' : 'Select All'}
                </button>
                {selectedIds.size > 0 && (
                  <button
                    onClick={async () => {
                      const ok = await confirm({
                        title: `Delete ${selectedIds.size} Geofences?`,
                        message: 'This action is permanent and cannot be undone.',
                        type: 'danger',
                        confirmText: 'Delete All',
                      })
                      if (ok) bulkDeleteMutation.mutate([...selectedIds])
                    }}
                    className="px-4 py-1.5 rounded-xl border-2 border-rose-700 bg-rose-500 text-white font-black uppercase text-[9px] tracking-widest shadow-[2px_2px_0px_0px_#9f1239] active:shadow-none transition-all"
                  >
                    🗑 Delete ({selectedIds.size})
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Body grid (flex-1, fills remaining height) ───────────────────────── */}
      <div className="flex-1 min-h-0 grid grid-cols-1 xl:grid-cols-5 gap-0">
        {/* Geofence List — only this scrolls */}
        <div className="xl:col-span-2 flex flex-col border-r-0 xl:border-r-4 border-b-4 xl:border-b-0 border-[#2b2b2b] overflow-hidden">
          {/* Scrollable list — only this scrolls */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-2">
            {filtered.length === 0 ? (
              <div className="p-14 border-4 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center text-center opacity-40 grayscale">
                <div className="text-5xl mb-3">🔭</div>
                <p className="text-[10px] font-black uppercase tracking-widest">No geofences found</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">Click "Deploy Geofence" to get started</p>
              </div>
            ) : filtered.map((g: any) => (
              <div
                key={g.id}
                onClick={() => !isSelectMode && setSelectedGeofence(g)}
                className={`w-full text-left p-4 rounded-2xl border-3 transition-all shadow-[3px_3px_0px_0px_#2b2b2b] cursor-pointer group ${
                  selectedGeofence?.id === g.id
                    ? 'bg-indigo-600 border-slate-900 text-white translate-x-0.5 translate-y-0.5 shadow-none'
                    : 'bg-white border-[#2b2b2b] text-slate-900 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none'
                }`}
              >
                <div className="flex items-center gap-3">
                  {isSelectMode && (
                    <div
                      onClick={e => toggleSelection(g.id, e)}
                      className={`w-6 h-6 rounded-lg border-3 border-slate-900 flex items-center justify-center shrink-0 transition-all ${selectedIds.has(g.id) ? 'bg-indigo-500' : 'bg-white'}`}
                    >
                      {selectedIds.has(g.id) && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  )}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl border-2 shrink-0 ${
                    selectedGeofence?.id === g.id ? 'bg-white/20 border-white/30' : 'bg-indigo-50 border-indigo-100'
                  }`}>
                    📍
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-black uppercase tracking-tight truncate">{g.name}</div>
                    <div className={`text-[9px] font-bold uppercase tracking-wider mt-0.5 ${selectedGeofence?.id === g.id ? 'text-indigo-200' : 'text-slate-400'}`}>
                      {g.latitude?.toFixed(4)}, {g.longitude?.toFixed(4)} • R: {g.radius}m
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Active toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleMutation.mutate({ id: g.id, isActive: !g.isActive })
                      }}
                      disabled={toggleMutation.isPending}
                      title={g.isActive ? 'Deactivate' : 'Activate'}
                      className={`relative w-10 h-5 rounded-full border-2 transition-all shrink-0 ${
                        g.isActive
                          ? 'bg-emerald-500 border-emerald-600'
                          : selectedGeofence?.id === g.id
                          ? 'bg-white/20 border-white/30'
                          : 'bg-slate-200 border-slate-300'
                      }`}
                    >
                      <span className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white shadow transition-all ${
                        g.isActive ? 'left-[18px]' : 'left-0.5'
                      }`} />
                    </button>
                    {!isSelectMode && (
                      <button
                        onClick={async (e) => {
                          e.stopPropagation()
                          const ok = await confirm({
                            title: 'Delete Geofence?',
                            message: `Remove "${g.name}"? This is permanent.`,
                            type: 'danger',
                            confirmText: 'Delete',
                          })
                          if (ok) deleteMutation.mutate(g.id)
                        }}
                        className={`p-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100 ${
                          selectedGeofence?.id === g.id ? 'hover:bg-white/20 text-white/70 hover:text-white' : 'hover:bg-rose-50 text-slate-400 hover:text-rose-500'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Map panel ───────────────────────────────────────────────────── */}
        <div className="xl:col-span-3 flex flex-col overflow-hidden border-4 border-[#2b2b2b]">
          <div className="bg-slate-900 px-5 py-3 border-b-4 border-[#2b2b2b] flex items-center justify-between shrink-0">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Visualizer</span>
            {selectedGeofence && (
              <button
                onClick={() => setSelectedGeofence(null)}
                className="text-[9px] font-black text-slate-400 hover:text-white uppercase tracking-widest transition-colors"
              >
                Reset ✕
              </button>
            )}
          </div>
          <div className="flex-1 relative bg-slate-800 p-3">
            <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white/10 relative">
            {isMounted ? (
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center bg-slate-900">
                  <p className="text-[10px] font-black text-slate-500 uppercase animate-pulse">Synchronizing Satellites...</p>
                </div>
              }>
                <Map selectedGeofence={selectedGeofence} showSearch={false} />
              </Suspense>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-900">
                <p className="text-xs font-black text-slate-500 uppercase animate-pulse">Loading Map...</p>
              </div>
            )}

            {!selectedGeofence && (
              <div className="absolute inset-0 z-[450] pointer-events-none flex items-center justify-center">
                <div className="bg-slate-900/60 backdrop-blur-sm w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-3 opacity-40">🗺️</div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Select a geofence to preview</p>
                  </div>
                </div>
              </div>
            )}

            {selectedGeofence && (
              <div className="absolute top-3 right-3 z-[1000]">
                <div className="bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl border-2 border-indigo-400/40 shadow-lg">
                  <div className="text-[9px] font-black text-slate-900 uppercase tracking-tight">{selectedGeofence.name}</div>
                  <div className="text-[7px] font-bold text-indigo-600 uppercase tracking-widest mt-0.5">R: {selectedGeofence.radius}m</div>
                </div>
              </div>
            )}
            </div>
          </div>
          {selectedGeofence && (
            <div className="shrink-0 p-4 pr-28 border-t-4 border-[#2b2b2b] bg-slate-50 flex items-center gap-4 flex-wrap">
              {/* Buttons — left side */}
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
                      confirmText: 'Delete',
                    })
                    if (ok) deleteMutation.mutate(selectedGeofence.id)
                  }}
                  className="px-4 py-2 bg-rose-500 text-white rounded-xl font-black uppercase text-[9px] tracking-widest border-2 border-rose-700 shadow-[2px_2px_0px_0px_#9f1239] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
                >
                  🗑 Remove
                </button>
              </div>
              {/* Name + coords — right of buttons */}
              <div className="min-w-0">
                <div className="text-sm font-black text-slate-900 uppercase truncate">{selectedGeofence.name}</div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                  {selectedGeofence.latitude?.toFixed(5)}, {selectedGeofence.longitude?.toFixed(5)}
                </div>
              </div>
            </div>

          )}
        </div>
      </div>

      {/* ─── Create Modal ─────────────────────────────────────────────────────── */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[2000] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <Card className="w-full max-w-5xl p-0 bg-white border-4 border-slate-900 shadow-[12px_12px_0px_0px_#2b2b2b] animate-in zoom-in-95 duration-300 overflow-hidden">
            <div className="flex h-[620px]">
              {/* Map picker */}
              <div className="w-3/5 bg-slate-100 border-r-4 border-slate-900 relative">
                {isMounted ? (
                  <Suspense fallback={<div className="w-full h-full flex items-center justify-center font-black uppercase text-xs text-slate-400 animate-pulse">Loading Map...</div>}>
                    <Map
                      onMapClick={(lat, lng) => setNewGeofence(prev => ({ ...prev, latitude: lat.toFixed(6), longitude: lng.toFixed(6) }))}
                      onRadiusChange={(radius) => setNewGeofence(prev => ({ ...prev, radius: radius.toString() }))}
                      showSelectionBadge={true}
                      previewCircle={newGeofence.latitude && newGeofence.longitude ? {
                        lat: parseFloat(newGeofence.latitude),
                        lng: parseFloat(newGeofence.longitude),
                        radius: parseInt(newGeofence.radius) || 50,
                      } : undefined}
                    />
                  </Suspense>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-100">
                    <p className="text-xs font-black text-slate-400 animate-pulse uppercase">Loading Map...</p>
                  </div>
                )}
              </div>

              {/* Form */}
              <div className="w-2/5 p-8 overflow-y-auto bg-white flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Deploy Geofence</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Click the map to set location</p>
                  </div>
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center text-2xl transition-all"
                  >
                    ✕
                  </button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (!newGeofence.latitude || !newGeofence.longitude) {
                      return showNotif('Click on the map to select a location first.', 'error')
                    }
                    createMutation.mutate(newGeofence)
                  }}
                  className="space-y-5 flex-1 flex flex-col"
                >
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Zone Name</label>
                    <input
                      required
                      value={newGeofence.name}
                      onChange={e => setNewGeofence(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Main Office Gate"
                      className="w-full px-4 py-3 bg-slate-50 rounded-xl border-3 border-[#2b2b2b] text-xs font-black uppercase focus:bg-white transition-all outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Latitude</label>
                      <input
                        required
                        value={newGeofence.latitude}
                        onChange={e => setNewGeofence(prev => ({ ...prev, latitude: e.target.value }))}
                        placeholder="Auto from map"
                        className="w-full px-4 py-3 bg-slate-100 rounded-xl border-3 border-[#2b2b2b] text-xs font-black focus:bg-white transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Longitude</label>
                      <input
                        required
                        value={newGeofence.longitude}
                        onChange={e => setNewGeofence(prev => ({ ...prev, longitude: e.target.value }))}
                        placeholder="Auto from map"
                        className="w-full px-4 py-3 bg-slate-100 rounded-xl border-3 border-[#2b2b2b] text-xs font-black focus:bg-white transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Radius (meters)</label>
                    <input
                      type="number"
                      min="10"
                      required
                      value={newGeofence.radius}
                      onChange={e => setNewGeofence(prev => ({ ...prev, radius: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-50 rounded-xl border-3 border-[#2b2b2b] text-xs font-black focus:bg-white transition-all outline-none"
                    />
                  </div>

                  {/* Location preview */}
                  {newGeofence.latitude && newGeofence.longitude && (
                    <div className="p-3 bg-indigo-50 rounded-xl border-2 border-indigo-200 text-center animate-in fade-in duration-300">
                      <div className="text-lg mb-1">📍</div>
                      <div className="text-[9px] font-black text-indigo-700 uppercase tracking-wider">
                        {parseFloat(newGeofence.latitude).toFixed(5)}, {parseFloat(newGeofence.longitude).toFixed(5)}
                      </div>
                      <div className="text-[8px] font-bold text-indigo-400 uppercase mt-0.5">Location locked • drag handle to resize</div>
                    </div>
                  )}

                  <div className="pt-2 mt-auto">
                    <button
                      type="submit"
                      disabled={createMutation.isPending}
                      className="w-full py-4 bg-slate-900 text-white rounded-xl font-black uppercase text-xs tracking-[0.2em] shadow-[6px_6px_0px_0px_rgba(0,0,0,0.25)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
                    >
                      {createMutation.isPending ? 'Deploying...' : '🚀 Deploy Geofence'}
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
