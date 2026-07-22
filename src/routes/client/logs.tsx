import React, { useState, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getLogsByOrgFn, getCategoriesByOrgCodeFn } from '@/lib/queries'
import Card from '@/components/Card'
import { useNotification } from '@/components/Notification'

export const Route = createFileRoute('/client/logs')({
  component: ClientLogsPage,
})

function ClientLogsPage() {
  const { user } = Route.useRouteContext() as any
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [groupBy, setGroupBy] = useState<'none' | 'user' | 'date' | 'category' | 'geofence'>('none')
  const [groupByOpen, setGroupByOpen] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportStep, setExportStep] = useState(1)
  const [exportSearch, setExportSearch] = useState('')
  const { showNotif } = useNotification()

  const { data: categories } = useQuery({
    queryKey: ['org-categories', user?.orgCode],
    queryFn: () => getCategoriesByOrgCodeFn(user?.orgCode || ''),
    enabled: !!user?.orgCode
  })

  const { data: logs, isLoading } = useQuery({
    queryKey: ['client-logs'],
    queryFn: () => getLogsByOrgFn(),
  })

  const logsWithCategory = useMemo(() => {
    if (!logs) return []
    return logs.map((log: any) => {
      const categoryName = log.attendee?.category?.name ||
        categories?.find((c: any) => String(c.id) === String(log.attendee?.categoryId))?.name ||
        'Unassigned'
      return {
        ...log,
        computedCategoryName: categoryName
      }
    })
  }, [logs, categories])

  const filtered = useMemo(() => {
    if (!logsWithCategory) return []
    const s = search.toLowerCase().trim()
    if (!s) return logsWithCategory.filter((log: any) => categoryFilter === 'All' || log.computedCategoryName === categoryFilter)

    const searchTerms = s.split(/\s+/).filter(Boolean)

    return logsWithCategory.filter((log: any) => {
      const matchesCategory = categoryFilter === 'All' || log.computedCategoryName === categoryFilter
      if (!matchesCategory) return false

      // Check if ALL search terms match at least one field in this log
      return searchTerms.every(term => {
        const timestampStr = new Date(log.timestamp).toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric', weekday: 'long' }).toLowerCase()
        const timeStr = new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase()

        return (
          log.attendee?.name?.toLowerCase().includes(term) ||
          log.attendee?.email?.toLowerCase().includes(term) ||
          log.geofence?.name?.toLowerCase().includes(term) ||
          log.computedCategoryName?.toLowerCase().includes(term) ||
          log.status?.toLowerCase().includes(term) ||
          timestampStr.includes(term) ||
          timeStr.includes(term)
        )
      })
    })
  }, [logsWithCategory, search, categoryFilter])

  const groupedData = useMemo(() => {
    if (groupBy === 'none') return { 'All Records': filtered }

    const groups: Record<string, any[]> = {}
    filtered.forEach(log => {
      let key = 'Other'
      if (groupBy === 'user') key = log.attendee?.name || 'Unknown'
      else if (groupBy === 'date') key = new Date(log.timestamp).toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })
      else if (groupBy === 'category') key = log.computedCategoryName
      else if (groupBy === 'geofence') key = log.geofence?.name || 'Unknown Area'

      if (!groups[key]) groups[key] = []
      groups[key].push(log)
    })
    return groups
  }, [filtered, groupBy])

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
    if (groupBy === 'none') return { 'All Records': exportFiltered }

    const groups: Record<string, any[]> = {}
    exportFiltered.forEach(log => {
      let key = 'Other'
      if (groupBy === 'user') key = log.attendee?.name || 'Unknown'
      else if (groupBy === 'date') key = new Date(log.timestamp).toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })
      else if (groupBy === 'category') key = log.computedCategoryName
      else if (groupBy === 'geofence') key = log.geofence?.name || 'Unknown Area'

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

    const itemsToExport = groupBy === 'none'
      ? ['All Records']
      : (selectedExportItems.length > 0 ? selectedExportItems : Object.keys(exportGroups))

    try {
      const generateCSV = (data: any[]) => {
        const headers = ['Date', 'Day', 'Attendee', 'Email', 'Category', 'Location', 'AM In', 'AM Out', 'PM In', 'PM Out', 'Status', 'Integrity']
        const rows = data.map((log: any) => [
          new Date(log.timestamp).toLocaleDateString(),
          new Date(log.timestamp).toLocaleDateString([], { weekday: 'long' }),
          log.attendee?.name || 'Unknown',
          log.attendee?.email || '',
          log.computedCategoryName,
          log.geofence?.name || 'Unknown',
          log.morningTimeIn ? new Date(log.morningTimeIn).toLocaleTimeString() : '--',
          log.morningTimeOut ? new Date(log.morningTimeOut).toLocaleTimeString() : '--',
          log.afternoonTimeIn ? new Date(log.afternoonTimeIn).toLocaleTimeString() : '--',
          log.afternoonTimeOut ? new Date(log.afternoonTimeOut).toLocaleTimeString() : '--',
          log.status,
          log.isMock ? 'MOCK' : 'VALID'
        ])
        return [headers.join(','), ...rows.map(row => row.join(','))].join('\n')
      }

      const downloadBlob = (csvContent: string, fileName: string) => {
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', fileName)
        link.click()
      }

      if (separateFiles && groupBy !== 'none') {
        for (const key of itemsToExport) {
          const groupData = exportGroups[key]
          if (!groupData) continue
          const csv = generateCSV(groupData)
          downloadBlob(csv, `export_${groupBy}_${key.replace(/\s+/g, '_')}.csv`)
          // Small delay to prevent browser blocking multiple downloads
          await new Promise(r => setTimeout(r, 300))
        }
      } else {
        const combinedData = itemsToExport.flatMap(key => exportGroups[key] || [])
        const csv = generateCSV(combinedData)
        downloadBlob(csv, `org_attendance_report.csv`)
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
        <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 animate-pulse">Loading Attendance Records...</div>
      </div>
    )
  }

  return (
    <>
      <div className="h-[calc(100vh-80px)] flex flex-col bg-white -m-4 md:-m-8">
        {/* 1. TOP HEADER SECTION (Static) */}
        <div className="shrink-0 bg-white border-b-4 border-slate-100 px-4 md:px-8 pt-6 pb-4 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 uppercase leading-none">Attendance Logs</h2>
              <div className="flex items-center gap-2 mt-2">
                <p className="text-slate-500 font-bold uppercase tracking-tight text-[10px]">
                  Monitoring {filtered.length} records • Real-time tracking
                </p>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <div className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">
                  {categoryFilter} View
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:flex-none group">
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search logs..."
                  className="w-full lg:min-w-[320px] pl-10 pr-10 py-2.5 bg-white border-3 border-dark-border rounded-2xl text-[10px] font-black uppercase outline-none shadow-[3px_3px_0px_0px_#2b2b2b] focus:shadow-none focus:translate-x-0.5 focus:translate-y-0.5 transition-all"
                />
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</div>
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center bg-slate-100 rounded-lg text-xs">✕</button>
                )}
              </div>
              <button
                onClick={() => setShowExportModal(true)}
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[9px] tracking-widest border-3 border-dark-border shadow-[3px_3px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all whitespace-nowrap"
              >
                Export Report
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-end gap-4">
            <div className="flex items-center gap-4">
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
            </div>
          </div>
        </div>

        {/* 2. MAIN DATA SECTION (Scrollable) */}
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
                  <LogGroupSection key={groupName} groupName={groupName} groupLogs={groupLogs as any[]} groupBy={groupBy} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Step 1: Configuration Modal */}
      {/* Enhanced 3-Step Export Wizard */}
      {showExportModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[1000] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <Card className="w-full max-w-2xl h-[650px] bg-white border-4 border-[#2b2b2b] shadow-[12px_12px_0px_0px_#2b2b2b] rounded-[2rem] overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="px-8 py-6 border-b-4 border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl border-3 border-[#2b2b2b] flex items-center justify-center text-2xl shadow-[3px_3px_0px_0px_#2b2b2b] transition-colors ${exportStep === 1 ? 'bg-emerald-500' : exportStep === 2 ? 'bg-indigo-500' : 'bg-amber-500'
                  }`}>
                  {exportStep === 1 ? '📅' : exportStep === 2 ? '👤' : '🚀'}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
                    {exportStep === 1 ? 'Report Config' : exportStep === 2 ? 'Select Items' : 'Export Mode'}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    {groupBy === 'none' ? (
                      <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Quick Export Available</span>
                    ) : (
                      <>
                        {[1, 2, 3].map(s => (
                          <div key={s} className={`h-1.5 rounded-full transition-all ${s <= exportStep ? 'w-6 bg-slate-900' : 'w-2 bg-slate-200'}`} />
                        ))}
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Step {exportStep} of 3</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <button onClick={() => { setShowExportModal(false); setExportStep(1); }} className="w-10 h-10 rounded-xl hover:bg-slate-200 flex items-center justify-center text-xl transition-all font-black">✕</button>
            </div>

            {/* Step Content */}
            <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
              {exportStep === 1 && (
                <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">📅 Time Range</label>
                      <div className="flex gap-2">
                        {[7, 30, 90].map(days => (
                          <button
                            key={days}
                            onClick={() => {
                              const today = new Date();
                              const formatDate = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                              setExportRange({
                                start: formatDate(new Date(new Date().setDate(today.getDate() - days))),
                                end: formatDate(today)
                              })
                            }}
                            className="px-4 py-2 bg-white border-2 border-slate-200 rounded-xl text-[10px] font-black text-slate-700 hover:border-indigo-600 hover:bg-indigo-50 transition-all uppercase shadow-sm"
                          >
                            {days}D
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border-2 border-slate-100">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Start Date</label>
                        <input type="date" value={exportRange.start} onChange={(e) => setExportRange(prev => ({ ...prev, start: e.target.value }))} className="w-full px-3 py-2 bg-white border-2 border-[#2b2b2b] rounded-xl font-bold text-[11px] outline-none focus:ring-4 focus:ring-indigo-100 transition-all" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">End Date</label>
                        <input type="date" value={exportRange.end} onChange={(e) => setExportRange(prev => ({ ...prev, end: e.target.value }))} className="w-full px-3 py-2 bg-white border-2 border-[#2b2b2b] rounded-xl font-bold text-[11px] outline-none focus:ring-4 focus:ring-indigo-100 transition-all" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">📂 Report Grouping</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { val: 'none', label: 'None', icon: '🚫' },
                        { val: 'user', label: 'Attendee', icon: '👤' },
                        { val: 'date', label: 'Date', icon: '📅' },
                        { val: 'category', label: 'Category', icon: '📂' }
                      ].map(opt => (
                        <button key={opt.val} onClick={() => { setGroupBy(opt.val as any); setSelectedExportItems([]) }} className={`p-2.5 rounded-2xl border-3 transition-all flex items-center gap-3 ${groupBy === opt.val ? 'bg-indigo-600 border-[#2b2b2b] text-white shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-300'}`}>
                          <span className="text-xl">{opt.icon}</span>
                          <span className="text-[9px] font-black uppercase tracking-widest">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {groupBy === 'none' && (
                    <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="text-center space-y-0.5">
                        <div className="text-[8px] font-black uppercase text-indigo-400 tracking-widest">Logs Found</div>
                        <div className="text-lg font-black text-slate-900">{exportFiltered.length}</div>
                      </div>
                      <div className="text-center border-x-2 border-slate-200 space-y-0.5">
                        <div className="text-[8px] font-black uppercase text-amber-400 tracking-widest">Columns</div>
                        <div className="text-lg font-black text-slate-900">11</div>
                      </div>
                      <div className="text-center space-y-0.5">
                        <div className="text-[8px] font-black uppercase text-rose-400 tracking-widest">Format</div>
                        <div className="text-lg font-black text-slate-900">CSV</div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {exportStep === 2 && (
                <div className="flex flex-col h-full animate-in slide-in-from-right-4 duration-300 -mt-2">
                  <div className="sticky top-0 bg-white z-10 pb-4 pt-2 space-y-4">
                    <div className="relative group">
                      <input
                        autoFocus
                        placeholder={`Search ${groupBy === 'user' ? 'attendees' : 'items'}...`}
                        value={exportSearch}
                        onChange={(e) => setExportSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-3 border-slate-200 rounded-2xl text-xs font-black uppercase outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-sm"
                      />
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl opacity-40">🔍</span>
                    </div>

                    <div className="flex items-center justify-between px-1">
                      <label className="text-[11px] font-black uppercase tracking-widest text-slate-900">
                        Results ({Object.keys(exportGroups).filter(k => k.toLowerCase().includes(exportSearch.toLowerCase())).length})
                      </label>
                      <button
                        onClick={() => {
                          const visible = Object.keys(exportGroups).filter(k => k.toLowerCase().includes(exportSearch.toLowerCase()))
                          if (visible.every(v => selectedExportItems.includes(v))) {
                            setSelectedExportItems(prev => prev.filter(p => !visible.includes(p)))
                          } else {
                            setSelectedExportItems(prev => Array.from(new Set([...prev, ...visible])))
                          }
                        }}
                        className="text-[9px] font-black uppercase text-indigo-600 hover:underline"
                      >
                        Toggle All Visible
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 content-start">
                      {Object.keys(exportGroups)
                        .filter(key => key.toLowerCase().includes(exportSearch.toLowerCase()))
                        .map(key => (
                          <label key={key} className={`flex items-center gap-3 p-2.5 rounded-xl border-2 cursor-pointer transition-all ${selectedExportItems.includes(key) ? 'bg-indigo-50 border-indigo-600 shadow-sm' : 'bg-white border-slate-100 hover:border-slate-300'}`}>
                            <input type="checkbox" checked={selectedExportItems.includes(key)} onChange={() => {
                              if (selectedExportItems.includes(key)) setSelectedExportItems(prev => prev.filter(i => i !== key))
                              else setSelectedExportItems(prev => [...prev, key])
                            }} className="hidden" />
                            <div className={`w-5 h-5 rounded-lg flex items-center justify-center border-2 transition-all ${selectedExportItems.includes(key) ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-200'}`}>
                              {selectedExportItems.includes(key) && <span className="text-white font-bold text-xs">✓</span>}
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] font-black uppercase tracking-tight truncate block leading-none mb-0.5">{key}</span>
                              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none">{exportGroups[key].length} Logs</span>
                            </div>
                          </label>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              {exportStep === 3 && (
                <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                  <div className="p-6 bg-slate-900 rounded-3xl border-4 border-[#2b2b2b] text-white shadow-[8px_8px_0px_0px_#2b2b2b]">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl">📁</div>
                        <div>
                          <div className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] mb-1">Export Mode</div>
                          <div className="text-lg font-black">{separateFiles ? 'Generate Separate Files' : 'Single Combined Report'}</div>
                        </div>
                      </div>
                      <button onClick={() => setSeparateFiles(!separateFiles)} className={`w-14 h-7 rounded-full p-1 transition-all duration-300 ${separateFiles ? 'bg-indigo-500' : 'bg-slate-700'}`}>
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${separateFiles ? 'translate-x-7' : 'translate-x-0'}`} />
                      </button>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase leading-relaxed">
                      {separateFiles
                        ? `A separate CSV will be created for each of the ${selectedExportItems.length || Object.keys(exportGroups).length} selected items.`
                        : "All selected records will be merged into one master CSV file."}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-100 text-center space-y-2">
                      <div className="text-[9px] font-black uppercase text-indigo-400 tracking-widest">Files</div>
                      <div className="text-xl font-black text-slate-900">{separateFiles ? (selectedExportItems.length || Object.keys(exportGroups).length) : 1}</div>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-100 text-center space-y-2">
                      <div className="text-[9px] font-black uppercase text-amber-400 tracking-widest">Total Logs</div>
                      <div className="text-xl font-black text-slate-900">{(selectedExportItems.length > 0 ? selectedExportItems : Object.keys(exportGroups)).reduce((acc, key) => acc + (exportGroups[key]?.length || 0), 0)}</div>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-100 text-center space-y-2">
                      <div className="text-[9px] font-black uppercase text-emerald-400 tracking-widest">Format</div>
                      <div className="text-xl font-black text-slate-900">CSV</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-8 border-t-4 border-slate-100 bg-slate-50/50 grid grid-cols-2 gap-4">
              <button
                onClick={() => exportStep === 1 ? setShowExportModal(false) : setExportStep(prev => prev - 1)}
                className="py-4 bg-white text-slate-600 rounded-2xl font-black uppercase text-[10px] tracking-widest border-3 border-[#2b2b2b] shadow-[4px_4px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all"
              >
                {exportStep === 1 ? 'Cancel' : '⬅️ Back'}
              </button>
              <button
                onClick={() => {
                  if (exportStep === 1 && groupBy === 'none') handleExportCSV()
                  else if (exportStep < 3) setExportStep(prev => prev + 1)
                  else handleExportCSV()
                }}
                className="py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest border-3 border-[#2b2b2b] shadow-[4px_4px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                disabled={exportFiltered.length === 0}
              >
                <span>
                  {exportStep === 1 && groupBy === 'none' ? '🚀 Generate Report' :
                    exportStep < 3 ? '➡️ Continue' : '🎯 Finalize & Export'}
                </span>
              </button>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}

function LogGroupSection({ groupName, groupLogs, groupBy }: { groupName: string, groupLogs: any[], groupBy: string }) {
  const [isOpen, setIsOpen] = useState(groupBy === 'none')

  React.useEffect(() => {
    setIsOpen(groupBy === 'none')
  }, [groupBy])

  return (
    <>
      {groupBy !== 'none' && (
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
      {(isOpen || groupBy === 'none') && groupLogs.map((log: any) => (
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
                    <div className="text-sm font-black text-slate-900 uppercase tracking-tight leading-none">{log.attendee?.name ?? 'Unknown'}</div>
                    <div className="px-1.5 py-0.5 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded text-[7px] font-black uppercase tracking-widest">
                      {log.computedCategoryName}
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
              {log.isMock ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider bg-rose-50 text-rose-700 border-2 border-rose-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  Mock Attendance
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border-2 border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Valid Entry
                </span>
              )}
              <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${log.status === 'SUCCESS' ? 'text-slate-400 border-slate-100' : 'text-rose-400 border-rose-100 bg-rose-50/50'}`}>
                Status: {log.status}
              </span>
            </div>
          </td>
        </tr>
      ))}
    </>
  )
}
