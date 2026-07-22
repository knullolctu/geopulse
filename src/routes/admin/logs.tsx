import React, { useState, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getLogsFn } from '@/lib/queries'
import Card from '@/components/Card'
import { useNotification } from '@/components/Notification'

export const Route = createFileRoute('/admin/logs')({
  component: AdminLogsPage,
})

function AdminLogsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'All' | 'Complete' | 'Partial'>('All')
  const [groupBy, setGroupBy] = useState<'none' | 'user' | 'date' | 'category' | 'geofence'>('none')
  const [groupByOpen, setGroupByOpen] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportStep, setExportStep] = useState(1)
  const [exportSearch, setExportSearch] = useState('')
  const [selectedAttendeeId, setSelectedAttendeeId] = useState<string | null>(null)
  const { showNotif } = useNotification()

  const { data: logs, isLoading } = useQuery({
    queryKey: ['admin-logs'],
    queryFn: () => getLogsFn(),
  })

  const filtered = useMemo(() => {
    if (!logs) return []
    
    let base = logs
    
    // Filter by selected attendee (User History view)
    if (selectedAttendeeId) {
      base = base.filter(l => l.attendeeId === selectedAttendeeId)
    }

    const s = search.toLowerCase().trim()
    const searchTerms = s.split(/\s+/).filter(Boolean)

    return base.filter((log: any) => {
      // Search matches
      const matchesSearch = searchTerms.length === 0 || searchTerms.every(term => {
        const timestampStr = new Date(log.timestamp).toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric', weekday: 'long' }).toLowerCase()
        const timeStr = new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase()
        return (
          log.attendee?.name?.toLowerCase().includes(term) ||
          log.attendee?.email?.toLowerCase().includes(term) ||
          log.geofence?.name?.toLowerCase().includes(term) ||
          log.attendee?.category?.name?.toLowerCase().includes(term) ||
          log.status?.toLowerCase().includes(term) ||
          timestampStr.includes(term) ||
          timeStr.includes(term)
        )
      })

      if (!matchesSearch) return false

      // Status Filter
      const logCount = [log.morningTimeIn, log.morningTimeOut, log.afternoonTimeIn, log.afternoonTimeOut].filter(Boolean).length
      const matchesStatus = statusFilter === 'All' || 
                            (statusFilter === 'Complete' && logCount === 4) ||
                            (statusFilter === 'Partial' && logCount < 4)

      return matchesStatus
    })
  }, [logs, search, statusFilter, selectedAttendeeId])

  const groupedData = useMemo(() => {
    if (selectedAttendeeId) {
      const attendeeName = logs?.find(l => l.attendeeId === selectedAttendeeId)?.attendee?.name || 'User'
      return { [`History: ${attendeeName}`]: filtered }
    }
    
    if (groupBy === 'none') return { 'All Records': filtered }

    const groups: Record<string, any[]> = {}
    filtered.forEach(log => {
      let key = 'Other'
      if (groupBy === 'user') key = log.attendee?.name || 'Unknown'
      else if (groupBy === 'date') key = new Date(log.timestamp).toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })
      else if (groupBy === 'category') key = log.attendee?.category?.name || 'General'
      else if (groupBy === 'geofence') key = log.geofence?.name || 'Unknown Area'

      if (!groups[key]) groups[key] = []
      groups[key].push(log)
    })
    return groups
  }, [filtered, groupBy, selectedAttendeeId, logs])

  const [selectedExportItems, setSelectedExportItems] = useState<string[]>([])
  const [separateFiles, setSeparateFiles] = useState(false)

  const [exportRange, setExportRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  })

  const exportFiltered = useMemo(() => {
    return filtered.filter((log: any) => {
      const logDate = new Date(log.timestamp).toISOString().split('T')[0]
      return logDate >= exportRange.start && logDate <= exportRange.end
    })
  }, [filtered, exportRange])

  const exportGroups = useMemo(() => {
    const activeGroupBy = groupBy === 'none' ? 'user' : groupBy
    const groups: Record<string, any[]> = {}
    exportFiltered.forEach(log => {
      let key = 'Other'
      if (activeGroupBy === 'user') key = log.attendee?.name || 'Unknown'
      else if (activeGroupBy === 'date') key = new Date(log.timestamp).toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })
      else if (activeGroupBy === 'category') key = log.attendee?.category?.name || 'General'
      else if (activeGroupBy === 'geofence') key = log.geofence?.name || 'Unknown Area'

      if (!groups[key]) groups[key] = []
      groups[key].push(log)
    })
    return groups
  }, [exportFiltered, groupBy])

  const handleExportCSV = async () => {
    if (!exportFiltered.length) {
      showNotif('No data to export for this range', 'error')
      return
    }

    const itemsToExport = selectedExportItems.length > 0 ? selectedExportItems : Object.keys(exportGroups)

    try {
      const generateCSV = (data: any[]) => {
        const headers = ['Date', 'Day', 'Attendee', 'Email', 'Category', 'Location', 'AM In', 'AM Out', 'PM In', 'PM Out', 'Status', 'Integrity']
        const rows = data.map((log: any) => [
          new Date(log.timestamp).toLocaleDateString(),
          new Date(log.timestamp).toLocaleDateString([], { weekday: 'long' }),
          log.attendee?.name || 'Unknown',
          log.attendee?.email || '',
          log.attendee?.category?.name || 'General',
          log.geofence?.name || 'Unknown',
          log.morningTimeIn ? new Date(log.morningTimeIn).toLocaleTimeString() : '--',
          log.morningTimeOut ? new Date(log.morningTimeOut).toLocaleTimeString() : '--',
          log.afternoonTimeIn ? new Date(log.afternoonTimeIn).toLocaleTimeString() : '--',
          log.afternoonTimeOut ? new Date(log.afternoonTimeOut).toLocaleTimeString() : '--',
          log.status,
          log.isMock ? 'MOCK' : 'VALID'
        ])
        return [headers.join(','), ...rows.map(row => row.map(val => `"${val}"`).join(','))].join('\n')
      }

      const downloadBlob = (csvContent: string, fileName: string) => {
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', fileName)
        link.click()
      }

      if (separateFiles) {
        for (const key of itemsToExport) {
          const groupData = exportGroups[key]
          if (!groupData) continue
          const csv = generateCSV(groupData)
          downloadBlob(csv, `attendance_${key.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`)
          await new Promise(r => setTimeout(r, 300))
        }
      } else {
        const combinedData = itemsToExport.flatMap(key => exportGroups[key] || [])
        const csv = generateCSV(combinedData)
        downloadBlob(csv, `master_attendance_report_${new Date().toISOString().split('T')[0]}.csv`)
      }

      showNotif(`Exported ${itemsToExport.length} report(s)`, 'success')
      setShowExportModal(false)
      setExportStep(1)
    } catch (err) {
      showNotif('Export failed', 'error')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-60">
        <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 animate-pulse">Loading Attendance Master Registry...</div>
      </div>
    )
  }

  return (
    <>
      <div className="h-[calc(100vh-80px)] flex flex-col bg-white -m-4 md:-m-8">
        {/* 1. TOP HEADER SECTION */}
        <div className="shrink-0 bg-white border-b-4 border-slate-100 px-4 md:px-8 pt-6 pb-4 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 uppercase leading-none">
                {selectedAttendeeId ? 'User History' : 'Attendance Registry'}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <p className="text-slate-500 font-bold uppercase tracking-tight text-[10px]">
                  {selectedAttendeeId ? 'Detailed session history for selected user' : `Monitoring ${filtered.length} records • Master Registry`}
                </p>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <div className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">
                  {statusFilter} Logs
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:flex-none group">
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search name, category, location..."
                  className="w-full lg:min-w-[320px] pl-10 pr-10 py-2.5 bg-white border-3 border-dark-border rounded-2xl text-[10px] font-black uppercase outline-none shadow-[3px_3px_0px_0px_#2b2b2b] focus:shadow-none focus:translate-x-0.5 focus:translate-y-0.5 transition-all"
                />
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</div>
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center bg-slate-100 rounded-lg text-xs">✕</button>
                )}
              </div>
              
              {selectedAttendeeId ? (
                <button 
                  onClick={() => setSelectedAttendeeId(null)}
                  className="px-6 py-2.5 bg-slate-900 text-white rounded-2xl font-black uppercase text-[9px] tracking-widest border-3 border-dark-border shadow-[3px_3px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all whitespace-nowrap"
                >
                  ← Back to List
                </button>
              ) : (
                <button
                  onClick={() => setShowExportModal(true)}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[9px] tracking-widest border-3 border-dark-border shadow-[3px_3px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all whitespace-nowrap"
                >
                  Enhanced Export
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border-2 border-dark-border shadow-[3px_3px_0px_0px_#2b2b2b]">
              {(['All', 'Complete', 'Partial'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`py-1.5 px-4 rounded-lg text-[9px] font-black uppercase transition-all ${
                    statusFilter === s ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {!selectedAttendeeId && (
              <div className="relative group">
                <button
                  onClick={() => setGroupByOpen(!groupByOpen)}
                  className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-2xl border-3 border-dark-border shadow-[3px_3px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all min-w-[220px]"
                >
                  <div className="flex flex-col items-start flex-1">
                    <label className="text-[7px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">Perspective</label>
                    <div className="text-[9px] font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
                      <span>
                        {groupBy === 'none' ? '🚫 Flat List' :
                          groupBy === 'user' ? '👤 Attendee' :
                            groupBy === 'date' ? '📅 Date' :
                              groupBy === 'category' ? '📂 Category' :
                                '📍 Location'}
                      </span>
                    </div>
                  </div>
                  <div className={`text-slate-400 text-[10px] transition-transform duration-300 ${groupByOpen ? 'rotate-180' : ''}`}>▼</div>
                </button>

                {groupByOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setGroupByOpen(false)} />
                    <div className="absolute top-full right-0 mt-3 w-64 bg-white border-4 border-dark-border rounded-2xl shadow-[8px_8px_0px_0px_#2b2b2b] z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                      <div className="p-2 grid gap-1">
                        {[
                          { val: 'none', label: 'Flat List', icon: '🚫' },
                          { val: 'user', label: 'By Attendee', icon: '👤' },
                          { val: 'date', label: 'By Date', icon: '📅' },
                          { val: 'category', label: 'By Category', icon: '📂' },
                          { val: 'geofence', label: 'By Location', icon: '📍' }
                        ].map((opt) => (
                          <button
                            key={opt.val}
                            onClick={() => {
                              setGroupBy(opt.val as any)
                              setGroupByOpen(false)
                            }}
                            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${groupBy === opt.val
                                ? 'bg-indigo-600 text-white'
                                : 'text-slate-600 hover:bg-slate-50'
                              }`}
                          >
                            <span className="text-sm">{opt.icon}</span>
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 2. MAIN DATA SECTION */}
        <div className="flex-1 min-h-0 flex flex-col bg-white overflow-hidden md:border-l-4 md:border-r-4 md:border-t-4 border-dark-border">
          <div className="flex-1 overflow-auto no-scrollbar">
            <table className="w-full text-left border-separate border-spacing-0 relative">
              <thead>
                <tr className="bg-slate-50">
                  <th className="sticky top-0 z-30 bg-slate-50 border-b-4 border-dark-border px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Date & Attendee</th>
                  <th className="sticky top-0 z-30 bg-slate-50 border-b-4 border-dark-border px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Location</th>
                  <th className="sticky top-0 z-30 bg-slate-100/50 border-b-4 border-dark-border px-8 py-5 text-center text-[10px] font-black uppercase tracking-widest text-slate-500">Morning Slots</th>
                  <th className="sticky top-0 z-30 bg-indigo-50/50 border-b-4 border-dark-border px-8 py-5 text-center text-[10px] font-black uppercase tracking-widest text-slate-500">Afternoon Slots</th>
                  <th className="sticky top-0 z-30 bg-slate-50 border-b-4 border-dark-border px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-slate-100">
                {Object.entries(groupedData).map(([groupName, groupLogs]) => (
                  <LogGroupSection 
                    key={groupName} 
                    groupName={groupName} 
                    groupLogs={groupLogs as any[]} 
                    groupBy={groupBy} 
                    onSelectAttendee={setSelectedAttendeeId}
                    isUserHistory={!!selectedAttendeeId}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[1000] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <Card className="w-full max-w-2xl h-[650px] bg-white border-4 border-[#2b2b2b] shadow-[12px_12px_0px_0px_#2b2b2b] rounded-[2rem] overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-8 py-6 border-b-4 border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl border-3 border-[#2b2b2b] flex items-center justify-center text-2xl shadow-[3px_3px_0px_0px_#2b2b2b] transition-colors ${exportStep === 1 ? 'bg-emerald-500' : exportStep === 2 ? 'bg-indigo-500' : 'bg-amber-500'}`}>
                  {exportStep === 1 ? '📅' : exportStep === 2 ? '👥' : '🚀'}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
                    {exportStep === 1 ? 'Report Config' : exportStep === 2 ? 'Select Items' : 'Export Mode'}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    {[1, 2, 3].map(s => (
                      <div key={s} className={`h-1.5 rounded-full transition-all ${s <= exportStep ? 'w-6 bg-slate-900' : 'w-2 bg-slate-200'}`} />
                    ))}
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Step {exportStep} of 3</span>
                  </div>
                </div>
              </div>
              <button onClick={() => { setShowExportModal(false); setExportStep(1); }} className="w-10 h-10 rounded-xl hover:bg-slate-200 flex items-center justify-center text-xl transition-all font-black">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
              {exportStep === 1 && (
                <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-900">📅 Time Range</label>
                    <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border-2 border-slate-100">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Start Date</label>
                        <input type="date" value={exportRange.start} onChange={(e) => setExportRange(prev => ({ ...prev, start: e.target.value }))} className="w-full px-3 py-2 bg-white border-2 border-[#2b2b2b] rounded-xl font-bold text-[11px] outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">End Date</label>
                        <input type="date" value={exportRange.end} onChange={(e) => setExportRange(prev => ({ ...prev, end: e.target.value }))} className="w-full px-3 py-2 bg-white border-2 border-[#2b2b2b] rounded-xl font-bold text-[11px] outline-none" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-900">📂 Grouping Strategy</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { val: 'user', label: 'By Attendee', icon: '👤' },
                        { val: 'date', label: 'By Date', icon: '📅' },
                        { val: 'category', label: 'By Category', icon: '📂' },
                        { val: 'geofence', label: 'By Location', icon: '📍' }
                      ].map(opt => (
                        <button key={opt.val} onClick={() => { setGroupBy(opt.val as any); setSelectedExportItems([]) }} className={`p-2.5 rounded-2xl border-3 transition-all flex items-center gap-3 ${groupBy === opt.val ? 'bg-indigo-600 border-[#2b2b2b] text-white shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-300'}`}>
                          <span className="text-xl">{opt.icon}</span>
                          <span className="text-[9px] font-black uppercase tracking-widest">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {exportStep === 2 && (
                <div className="flex flex-col h-full animate-in slide-in-from-right-4 duration-300">
                  <div className="relative mb-4">
                    <input
                      placeholder={`Search ${groupBy === 'user' ? 'attendees' : 'items'}...`}
                      value={exportSearch}
                      onChange={(e) => setExportSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border-3 border-slate-200 rounded-2xl text-[10px] font-black uppercase outline-none"
                    />
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2">🔍</span>
                  </div>
                  <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {Object.keys(exportGroups)
                      .filter(key => key.toLowerCase().includes(exportSearch.toLowerCase()))
                      .map(key => (
                        <button 
                          key={key} 
                          onClick={() => {
                            if (selectedExportItems.includes(key)) setSelectedExportItems(prev => prev.filter(i => i !== key))
                            else setSelectedExportItems(prev => [...prev, key])
                          }}
                          className={`p-3 rounded-xl border-2 text-left transition-all ${selectedExportItems.includes(key) ? 'bg-indigo-50 border-indigo-600' : 'bg-white border-slate-100 hover:border-slate-300'}`}
                        >
                          <div className="text-[10px] font-black uppercase truncate">{key}</div>
                          <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{exportGroups[key].length} Logs</div>
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {exportStep === 3 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div className="p-6 bg-slate-900 rounded-3xl border-4 border-[#2b2b2b] text-white shadow-[8px_8px_0px_0px_#2b2b2b]">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm font-black uppercase">Separate Files</div>
                      <button onClick={() => setSeparateFiles(!separateFiles)} className={`w-12 h-6 rounded-full transition-all ${separateFiles ? 'bg-indigo-500' : 'bg-slate-700'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${separateFiles ? 'translate-x-7' : 'translate-x-1'}`} />
                      </button>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase leading-relaxed">
                      {separateFiles ? "Generates one CSV file for every selected group." : "Merges all selected records into a single master report."}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-100 text-center space-y-1">
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Items</div>
                      <div className="text-xl font-black text-slate-900">{selectedExportItems.length || Object.keys(exportGroups).length}</div>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-100 text-center space-y-1">
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Logs</div>
                      <div className="text-xl font-black text-slate-900">{exportFiltered.length}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-8 border-t-4 border-slate-100 bg-slate-50/50 grid grid-cols-2 gap-4">
              <button
                onClick={() => exportStep === 1 ? setShowExportModal(false) : setExportStep(prev => prev - 1)}
                className="py-4 bg-white text-slate-600 rounded-2xl font-black uppercase text-[10px] tracking-widest border-3 border-[#2b2b2b] shadow-[4px_4px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all"
              >
                {exportStep === 1 ? 'Cancel' : '⬅️ Back'}
              </button>
              <button
                onClick={() => exportStep < 3 ? setExportStep(prev => prev + 1) : handleExportCSV()}
                className="py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest border-3 border-[#2b2b2b] shadow-[4px_4px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all disabled:opacity-50"
                disabled={exportFiltered.length === 0}
              >
                {exportStep === 3 ? '🚀 Generate Report' : '➡️ Next Step'}
              </button>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}

function LogGroupSection({ groupName, groupLogs, groupBy, onSelectAttendee, isUserHistory }: { groupName: string, groupLogs: any[], groupBy: string, onSelectAttendee: (id: string) => void, isUserHistory: boolean }) {
  const [isOpen, setIsOpen] = useState(groupBy === 'none' || isUserHistory)

  React.useEffect(() => {
    setIsOpen(groupBy === 'none' || isUserHistory)
  }, [groupBy, isUserHistory])

  return (
    <>
      {groupBy !== 'none' && !isUserHistory && (
        <tr
          className="bg-slate-900 cursor-pointer hover:bg-slate-800 transition-all select-none group/header relative border-b-2 border-white/10"
          onClick={() => setIsOpen(!isOpen)}
        >
          <td colSpan={5} className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-xl border-2 border-white/40 flex items-center justify-center text-white transition-all duration-500 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] group-hover/header:border-indigo-400 group-hover/header:text-indigo-400 ${isOpen ? 'rotate-180 bg-white/20' : 'bg-white/5'}`}>
                  <span className="text-[12px] font-bold">▼</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-3">
                    <div className="text-white font-black uppercase text-[11px] tracking-[0.2em] group-hover/header:text-indigo-300 transition-colors drop-shadow-sm">{groupName}</div>
                    <div className="px-2 py-0.5 bg-indigo-500/30 rounded text-[8px] font-black text-white border border-indigo-500/50 uppercase tracking-widest shadow-sm">
                      {groupLogs.length} Records
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-[8px] font-black uppercase tracking-[0.3em] text-indigo-200/80 group-hover/header:text-indigo-400 group-hover/header:translate-x-1 transition-all flex items-center gap-2">
                {isOpen ? 'Click to collapse' : 'Click to expand'}
                <span className="text-sm font-bold">↗</span>
              </div>
            </div>
          </td>
        </tr>
      )}
      {(isOpen || groupBy === 'none') && groupLogs.map((log: any) => {
        const logCount = [log.morningTimeIn, log.morningTimeOut, log.afternoonTimeIn, log.afternoonTimeOut].filter(Boolean).length
        return (
          <tr key={log.id} className="hover:bg-slate-50/60 transition-colors group">
            <td className="px-6 py-4">
              <div className="flex items-center gap-4">
                <div className="text-xs font-black text-slate-400 border-r-2 border-slate-200 pr-4 w-16">
                  {new Date(log.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-sm font-black text-white shrink-0 shadow-[2px_2px_0px_0px_#2b2b2b]">
                    {(log.attendee?.name ?? '?').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <button 
                        onClick={() => onSelectAttendee(log.attendeeId)}
                        className="text-sm font-black text-slate-900 uppercase tracking-tight leading-none hover:text-indigo-600 transition-colors text-left"
                      >
                        {log.attendee?.name ?? 'Unknown'}
                      </button>
                      <div className="px-1.5 py-0.5 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded text-[7px] font-black uppercase tracking-widest">
                        {log.attendee?.category?.name || 'General'}
                      </div>
                    </div>
                    <div className="text-[9px] font-bold text-slate-400 lowercase tracking-widest">{log.attendee?.email ?? ''}</div>
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center border-2 border-indigo-100">📍</span>
                <span className="text-xs font-black text-slate-700 uppercase tracking-tight">{log.geofence?.name ?? 'Unknown Area'}</span>
              </div>
            </td>
            <td className="px-0 py-0 bg-slate-50/30">
              <div className="grid grid-cols-2 divide-x-2 divide-slate-100 h-full">
                <div className="px-4 py-4 text-center">
                  <div className="text-[8px] font-black text-slate-400 uppercase tracking-tighter mb-1">AM In</div>
                  <div className={`text-xs font-black tracking-tighter ${log.morningTimeIn ? 'text-emerald-600' : 'text-slate-200'}`}>
                    {log.morningTimeIn ? new Date(log.morningTimeIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                  </div>
                </div>
                <div className="px-4 py-4 text-center">
                  <div className="text-[8px] font-black text-slate-400 uppercase tracking-tighter mb-1">AM Out</div>
                  <div className={`text-xs font-black tracking-tighter ${log.morningTimeOut ? 'text-rose-600' : 'text-slate-200'}`}>
                    {log.morningTimeOut ? new Date(log.morningTimeOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-0 py-0 bg-indigo-50/20">
              <div className="grid grid-cols-2 divide-x-2 divide-indigo-50/50 h-full">
                <div className="px-4 py-4 text-center">
                  <div className="text-[8px] font-black text-indigo-300 uppercase tracking-tighter mb-1">PM In</div>
                  <div className={`text-xs font-black tracking-tighter ${log.afternoonTimeIn ? 'text-indigo-600' : 'text-slate-200'}`}>
                    {log.afternoonTimeIn ? new Date(log.afternoonTimeIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                  </div>
                </div>
                <div className="px-4 py-4 text-center">
                  <div className="text-[8px] font-black text-indigo-300 uppercase tracking-tighter mb-1">PM Out</div>
                  <div className={`text-xs font-black tracking-tighter ${log.afternoonTimeOut ? 'text-amber-600' : 'text-slate-200'}`}>
                    {log.afternoonTimeOut ? new Date(log.afternoonTimeOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 text-right">
              <div className="flex flex-col items-end gap-2">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider border-2 ${
                  logCount === 4 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${logCount === 4 ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                  {logCount}/4 Sessions
                </div>
                <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${log.status === 'SUCCESS' ? 'text-slate-400 border-slate-100' : 'text-rose-400 border-rose-100 bg-rose-50/50'}`}>
                  {log.status}
                </span>
              </div>
            </td>
          </tr>
        )
      })}
    </>
  )
}
