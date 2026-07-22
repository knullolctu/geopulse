import React, { useState, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getAttendeeLogsFn } from '@/lib/queries'
import Card from '@/components/Card'
import { useNotification } from '@/components/Notification'

export const Route = createFileRoute('/attendee/logs')({
  component: AttendeeLogsPage,
})

function AttendeeLogsPage() {
  const { user } = Route.useRouteContext() as any
  const isVerified = user?.isVerified
  const [search, setSearch] = useState('')
  const [groupBy, setGroupBy] = useState<'none' | 'date' | 'geofence'>('none')
  const [groupByOpen, setGroupByOpen] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const { showNotif } = useNotification()

  const { data: logs, isLoading } = useQuery({
    queryKey: ['attendee-logs'],
    queryFn: () => getAttendeeLogsFn(),
    enabled: isVerified
  })

  const filteredLogs = useMemo(() => {
    if (!logs) return []
    const s = search.toLowerCase().trim()
    if (!s) return logs

    return logs.filter((log: any) => {
      const locationMatch = log.geofence?.name?.toLowerCase().includes(s)
      const dateStr = new Date(log.timestamp).toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric', weekday: 'long' }).toLowerCase()
      const dateMatch = dateStr.includes(s)
      const statusMatch = log.status?.toLowerCase().includes(s)
      const actionMatch = log.action?.toLowerCase().includes(s)
      
      return locationMatch || dateMatch || statusMatch || actionMatch
    })
  }, [logs, search])

  const groupedData = useMemo(() => {
    if (groupBy === 'none') return { 'All Records': filteredLogs }

    const groups: Record<string, any[]> = {}
    filteredLogs.forEach(log => {
      let key = 'Other'
      if (groupBy === 'date') key = new Date(log.timestamp).toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })
      else if (groupBy === 'geofence') key = log.geofence?.name || 'Unknown Area'

      if (!groups[key]) groups[key] = []
      groups[key].push(log)
    })
    return groups
  }, [filteredLogs, groupBy])

  const [exportRange, setExportRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 30)).toLocaleDateString('en-CA'),
    end: new Date().toLocaleDateString('en-CA')
  })

  const exportFilteredLogs = useMemo(() => {
    return filteredLogs.filter((log: any) => {
        const logDate = new Date(log.timestamp).toISOString().split('T')[0]
        return logDate >= exportRange.start && logDate <= exportRange.end
    })
  }, [filteredLogs, exportRange])

  const [exportGroupBy, setExportGroupBy] = useState<'none' | 'geofence'>('none')

  const handleExportCSV = () => {
    if (!exportFilteredLogs.length) {
        showNotif('No data to export for this range', 'error')
        return
    }

    try {
        let logsToExport = [...exportFilteredLogs]
        if (exportGroupBy === 'geofence') {
            logsToExport.sort((a, b) => (a.geofence?.name || '').localeCompare(b.geofence?.name || ''))
        } else {
            logsToExport.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        }

        const headers = ['Date', 'Day', 'Location', 'AM In', 'AM Out', 'PM In', 'PM Out', 'Status']
        const rows = logsToExport.map((log: any) => {
            const filledSlots = [log.morningTimeIn, log.morningTimeOut, log.afternoonTimeIn, log.afternoonTimeOut].filter(Boolean).length
            const status = filledSlots === 4 ? 'SUCCESS' : `${filledSlots}/4 COMPLETED`
            
            return [
                new Date(log.timestamp).toLocaleDateString(),
                new Date(log.timestamp).toLocaleDateString([], { weekday: 'long' }),
                log.geofence?.name || 'Unknown',
                log.morningTimeIn ? new Date(log.morningTimeIn).toLocaleTimeString() : '--',
                log.morningTimeOut ? new Date(log.morningTimeOut).toLocaleTimeString() : '--',
                log.afternoonTimeIn ? new Date(log.afternoonTimeIn).toLocaleTimeString() : '--',
                log.afternoonTimeOut ? new Date(log.afternoonTimeOut).toLocaleTimeString() : '--',
                status
            ]
        })

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', `attendance_${exportGroupBy}_${exportRange.start}_to_${exportRange.end}.csv`)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        showNotif(`Exported ${exportFilteredLogs.length} records`, 'success')
        setShowExportModal(false)
    } catch (err) {
        showNotif('Failed to export CSV', 'error')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-60">
        <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 animate-pulse">Retrieving History...</div>
      </div>
    )
  }

  if (!isVerified) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="p-12 md:p-20 border-4 border-[#2b2b2b] rounded-[2.5rem] shadow-[12px_12px_0px_0px_#2b2b2b] bg-white flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-slate-900 rounded-3xl border-4 border-indigo-500 flex items-center justify-center text-5xl mb-8 shadow-[6px_6px_0px_0px_#4f46e5]">
                🔒
            </div>
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">Verification Required</h2>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest max-w-md mx-auto leading-relaxed">
                Attendance logs and reporting history are locked until your account has been verified by an administrator.
            </p>
            <div className="mt-10 px-6 py-3 bg-indigo-50 text-indigo-600 rounded-xl border-2 border-indigo-100 text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
                Pending Approval Scope
            </div>
        </div>
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
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 uppercase leading-none">My History</h2>
              <p className="text-slate-500 font-bold uppercase tracking-tight text-[10px] mt-2">
                Tracking {filteredLogs.length} sessions across authorized zones
              </p>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:flex-none group">
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search logs..."
                  className="w-full lg:min-w-[320px] pl-10 pr-10 py-2.5 bg-white border-3 border-dark-border rounded-2xl text-[10px] font-black uppercase outline-none shadow-[3px_3px_0px_0px_#2b2b2b] transition-all"
                />
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</div>
              </div>
              <button
                onClick={() => setShowExportModal(true)}
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[9px] tracking-widest border-3 border-dark-border shadow-[3px_3px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 transition-all whitespace-nowrap"
              >
                Export Report
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="relative group">
              <button
                onClick={() => setGroupByOpen(!groupByOpen)}
                className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-2xl border-3 border-dark-border shadow-[3px_3px_0px_0px_#2b2b2b] transition-all min-w-[200px]"
              >
                <div className="flex flex-col items-start flex-1">
                  <label className="text-[7px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">Perspective</label>
                  <div className="text-[9px] font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
                    <span>{groupBy === 'none' ? '🚫 Flat List' : '📍 Location'}</span>
                  </div>
                </div>
                <div className={`text-slate-400 text-[10px] transition-transform duration-300 ${groupByOpen ? 'rotate-180' : ''}`}>▼</div>
              </button>

              {groupByOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setGroupByOpen(false)} />
                  <div className="absolute top-full right-0 mt-3 w-56 bg-white border-4 border-dark-border rounded-2xl shadow-[8px_8px_0px_0px_#2b2b2b] z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                    <div className="p-2 grid gap-1">
                      {[
                        { val: 'none', label: 'Flat List', icon: '🚫' },
                        { val: 'geofence', label: 'By Location', icon: '📍' }
                      ].map((opt) => (
                        <button
                          key={opt.val}
                          onClick={() => {
                            setGroupBy(opt.val as any)
                            setGroupByOpen(false)
                          }}
                          className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${groupBy === opt.val ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
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

        {/* 2. MAIN DATA SECTION (Scrollable Table) */}
        <div className="flex-1 min-h-0 flex flex-col bg-white overflow-hidden md:border-l-4 md:border-r-4 md:border-t-4 border-dark-border">
          <div className="flex-1 overflow-auto no-scrollbar">
            <table className="w-full text-left border-separate border-spacing-0 relative">
              <thead>
                <tr className="bg-slate-50">
                  <th className="sticky top-0 z-30 bg-slate-50 border-b-4 border-dark-border px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Date & Info</th>
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

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[1000] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <Card className="w-full max-w-lg p-8 md:p-10 bg-white border-4 border-[#2b2b2b] shadow-[12px_12px_0px_0px_#2b2b2b] rounded-[2rem]">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl border-3 border-indigo-200 flex items-center justify-center text-3xl mx-auto mb-4">📊</div>
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Export Configuration</h3>
            </div>
            <div className="space-y-6 mb-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 px-1">Start Date</label>
                  <input type="date" value={exportRange.start} onChange={(e) => setExportRange(prev => ({ ...prev, start: e.target.value }))} className="w-full px-4 py-3 bg-slate-50 border-2 border-[#2b2b2b] rounded-xl font-bold text-xs outline-none focus:bg-white transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 px-1">End Date</label>
                  <input type="date" value={exportRange.end} onChange={(e) => setExportRange(prev => ({ ...prev, end: e.target.value }))} className="w-full px-4 py-3 bg-slate-50 border-2 border-[#2b2b2b] rounded-xl font-bold text-xs outline-none focus:bg-white transition-all" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 px-1">Report Perspective</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: 'none', label: 'Flat List', icon: '🚫' },
                    { val: 'geofence', label: 'By Location', icon: '📍' }
                  ].map(opt => (
                    <button
                      key={opt.val}
                      onClick={() => setExportGroupBy(opt.val as any)}
                      className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-black uppercase text-[9px] tracking-widest transition-all ${exportGroupBy === opt.val ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-slate-200'}`}
                    >
                      <span>{opt.icon}</span>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-5 bg-indigo-50/50 rounded-2xl border-2 border-indigo-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-black uppercase text-indigo-400 tracking-wider">Matching Records</div>
                  <div className="text-2xl font-black text-slate-900 mt-0.5">{exportFilteredLogs.length}</div>
                </div>
                <div className="text-3xl grayscale opacity-50">📁</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setShowExportModal(false)} className="py-4 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase text-[10px] tracking-widest border-3 border-[#2b2b2b] hover:bg-slate-200 transition-colors">Cancel</button>
              <button onClick={handleExportCSV} className="py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest border-3 border-[#2b2b2b] shadow-[4px_4px_0px_0px_#065f46] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all disabled:opacity-50" disabled={exportFilteredLogs.length === 0}>Download CSV</button>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}

function LogGroupSection({ groupName, groupLogs, groupBy }: { groupName: string, groupLogs: any[], groupBy: string }) {
  const [isOpen, setIsOpen] = useState(groupBy === 'none')
  React.useEffect(() => { setIsOpen(groupBy === 'none') }, [groupBy])

  return (
    <>
      {groupBy !== 'none' && (
        <tr className="bg-slate-900 cursor-pointer hover:bg-slate-800 transition-all select-none group/header relative border-b-2 border-white/10" onClick={() => setIsOpen(!isOpen)}>
          <td colSpan={5} className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-xl border-2 border-white/40 flex items-center justify-center text-white transition-all duration-500 ${isOpen ? 'rotate-180 bg-white/20' : 'bg-white/5'}`}>
                  <span className="text-[12px] font-bold">▼</span>
                </div>
                <div className="text-white font-black uppercase text-[11px] tracking-[0.2em]">{groupName} ({groupLogs.length})</div>
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
              <div>
                <div className="text-sm font-black text-slate-900 uppercase tracking-tight">{new Date(log.timestamp).toLocaleDateString([], { weekday: 'long' })}</div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Session Log</div>
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
             <div className="flex flex-col items-end gap-1">
                {(() => {
                  const filledSlots = [log.morningTimeIn, log.morningTimeOut, log.afternoonTimeIn, log.afternoonTimeOut].filter(Boolean).length
                  const isComplete = filledSlots === 4
                  
                  return (
                    <>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider ${isComplete ? 'bg-emerald-50 text-emerald-700 border-2 border-emerald-200' : 'bg-slate-50 text-slate-500 border-2 border-slate-200'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isComplete ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                        {isComplete ? 'SUCCESS' : `${filledSlots}/4 COMPLETED`}
                      </span>
                      <span className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">
                        {isComplete ? 'Daily Target Met' : 'Session In Progress'}
                      </span>
                    </>
                  )
                })()}
             </div>
          </td>
        </tr>
      ))}
    </>
  )
}
