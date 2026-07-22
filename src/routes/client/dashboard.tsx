import React, { useMemo, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import Card from '../../components/Card'
import { useQuery } from '@tanstack/react-query'
import { getClientDashboardStatsFn, getLogsByOrgFn } from '../../lib/queries'

export const Route = createFileRoute('/client/dashboard')({
  component: ClientDashboard,
})

function ClientDashboard() {
  const { user } = Route.useRouteContext() as any

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['client-dashboard-stats'],
    queryFn: () => getClientDashboardStatsFn(),
  })

  const { data: logs, isLoading: logsLoading } = useQuery({
    queryKey: ['client-logs'],
    queryFn: () => getLogsByOrgFn(),
  })

  const [heatmapFilter, setHeatmapFilter] = useState<'today' | '7d' | '30d'>('today')

  const heatmapData = useMemo(() => {
    if (!logs || logs.length === 0) return Array(10).fill({ count: 0, height: 5, label: '' })
    
    const now = new Date()
    const filterDate = new Date()
    if (heatmapFilter === '7d') filterDate.setDate(now.getDate() - 7)
    else if (heatmapFilter === '30d') filterDate.setDate(now.getDate() - 30)
    else filterDate.setHours(0, 0, 0, 0)

    const filteredLogs = logs.filter((log: any) => new Date(log.timestamp) >= filterDate)

    if (heatmapFilter === 'today') {
      const counts = Array(24).fill(0)
      filteredLogs.forEach((log: any) => {
        const hour = new Date(log.timestamp).getHours()
        if (hour >= 0 && hour < 24) counts[hour]++
      })
      const max = Math.max(...counts, 1)
      return counts.map((count, i) => ({
        count,
        height: Math.max((count / max) * 100, 5),
        label: `${String(i).padStart(2, '0')}:00`
      }))
    } else {
      // Group by day
      const days = heatmapFilter === '7d' ? 7 : 30
      const buckets = Array(days).fill(0).map((_, i) => {
        const d = new Date()
        d.setDate(now.getDate() - (days - 1 - i))
        return { count: 0, date: d }
      })

      filteredLogs.forEach((log: any) => {
        const logDate = new Date(log.timestamp)
        const diff = Math.floor((now.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24))
        if (diff >= 0 && diff < days) {
          buckets[(days - 1) - diff].count++
        }
      })

      const max = Math.max(...buckets.map(b => b.count), 1)
      return buckets.map((b) => ({
        count: b.count,
        height: Math.max((b.count / max) * 100, 5),
        label: b.date.toLocaleDateString([], { month: 'short', day: 'numeric' })
      }))
    }
  }, [logs, heatmapFilter])

  const recentLogs = useMemo(() => (logs ?? []).slice(0, 5), [logs])

  if (statsLoading || logsLoading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
            <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 animate-pulse">Synchronizing Data...</div>
        </div>
      </div>
    )
  }

  const statCards = [
    { label: 'Active Geofences', value: stats?.geofenceCount ?? 0, icon: '📍', color: 'bg-indigo-500 text-white', shadow: 'shadow-[4px_4px_0px_0px_#4f46e5]' },
    { label: 'Total Check-ins', value: stats?.checkIns ?? 0, icon: '✅', color: 'bg-emerald-500 text-white', shadow: 'shadow-[4px_4px_0px_0px_#059669]' },
    { label: 'Verified Attendees', value: stats?.memberCount ?? 0, icon: '👥', color: 'bg-amber-500 text-white', shadow: 'shadow-[4px_4px_0px_0px_#d97706]' },
    { label: 'Pending Approvals', value: stats?.pendingCount ?? 0, icon: '⏳', color: 'bg-rose-500 text-white', shadow: 'shadow-[4px_4px_0px_0px_#e11d48]' },
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12 max-w-7xl mx-auto">
      
      {/* Dynamic Welcome Banner */}
      <div className="relative overflow-hidden rounded-[2rem] border-4 border-[#2b2b2b] shadow-[8px_8px_0px_0px_#2b2b2b] bg-slate-900 text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-indigo-500/40 transition-all duration-700" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 group-hover:bg-rose-500/30 transition-all duration-700" />
        
        <div className="relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20 mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-100">System Online</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
            Welcome back,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-rose-400">
              {user?.name?.split(' ')[0] ?? 'Client'}
            </span>
          </h2>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs md:text-sm mt-4 flex items-center justify-center md:justify-start gap-3">
            <span>Org Code:</span> 
            <button 
              onClick={() => {
                navigator.clipboard.writeText(user?.orgCode ?? '')
                const btn = document.getElementById('copy-org-code')
                if (btn) {
                  const original = btn.innerHTML
                  btn.innerHTML = 'COPIED!'
                  btn.classList.add('text-emerald-400')
                  setTimeout(() => {
                    btn.innerHTML = original
                    btn.classList.remove('text-emerald-400')
                  }, 2000)
                }
              }}
              className="px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-black transition-all flex items-center gap-2 group/copy active:scale-95"
            >
              <span id="copy-org-code" className="transition-all">{user?.orgCode ?? '—'}</span>
              <span className="text-[10px] opacity-40 group-hover/copy:opacity-100 transition-opacity">📋</span>
            </button>
          </p>
        </div>

        {/* Decorative Graphic */}
        <div className="relative z-10 hidden md:block">
           <div className="w-32 h-32 md:w-40 md:h-40 relative">
             <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
             <div className="absolute inset-2 border-4 border-rose-500/30 rounded-full animate-[spin_7s_linear_infinite_reverse]" />
             <div className="absolute inset-0 flex items-center justify-center text-6xl">🏢</div>
           </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div
            key={i}
            className={`group p-6 bg-white rounded-[1.5rem] border-4 border-[#2b2b2b] shadow-[6px_6px_0px_0px_#2b2b2b] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#2b2b2b] transition-all duration-300 relative overflow-hidden`}
          >
            <div className={`w-14 h-14 rounded-2xl border-4 border-[#2b2b2b] flex items-center justify-center text-2xl mb-6 shadow-[4px_4px_0px_0px_#2b2b2b] relative z-10 ${stat.color}`}>
              {stat.icon}
            </div>
            
            <div className="relative z-10">
                <div className="text-5xl font-black tracking-tighter text-slate-900 leading-none">{stat.value}</div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mt-2">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Area - Logs Timeline */}
        <div className="lg:col-span-2 space-y-8">
            <Card className="p-6 md:p-8 border-4 border-[#2b2b2b] shadow-[8px_8px_0px_0px_#2b2b2b] bg-white relative overflow-hidden min-h-[500px]">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-rose-500 to-amber-500" />
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
                    <div>
                        <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900">Live Activity Feed</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Real-time attendance events</p>
                    </div>
                    <Link
                        to="/client/logs"
                        className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest border-3 border-transparent hover:bg-white hover:text-slate-900 hover:border-[#2b2b2b] transition-all shadow-[4px_4px_0px_0px_#2b2b2b] hover:shadow-none hover:translate-x-1 hover:translate-y-1 whitespace-nowrap"
                    >
                        View Archive →
                    </Link>
                </div>

                <div className="relative">
                    {recentLogs.length === 0 ? (
                    <div className="py-16 text-center">
                        <div className="text-5xl mb-4 grayscale opacity-30">📡</div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-400">No Signal Detected</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Waiting for initial check-ins...</p>
                    </div>
                    ) : (
                    <div className="space-y-8 relative">
                        {/* Timeline vertical line */}
                        <div className="absolute top-0 bottom-0 left-6 md:left-1/2 w-1 -translate-x-1/2 bg-gradient-to-b from-indigo-200 via-slate-200 to-transparent rounded-full" />
                        
                        {recentLogs.map((log: any, idx: number) => {
                            const isTimeIn = log.action?.toLowerCase().includes('in')
                            const badgeColor = isTimeIn ? 'bg-emerald-500' : 'bg-rose-500'
                            
                            return (
                                <div key={log.id} className={`relative flex items-center justify-between md:justify-center gap-4 md:gap-8 group ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                    
                                    {/* Desktop spacer */}
                                    <div className="hidden md:block w-1/2" />
                                    
                                    {/* Timeline dot */}
                                    <div className={`absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-white ${badgeColor} shadow-[0_0_0_4px_#f8fafc] z-10 group-hover:scale-110 group-hover:shadow-[0_0_0_4px_#e2e8f0] transition-all`}>
                                        <span className="text-white text-sm md:text-lg">{isTimeIn ? '👋' : '🏃'}</span>
                                    </div>
                                    
                                    {/* Content Card */}
                                    <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 md:p-5 rounded-2xl border-3 border-[#2b2b2b] bg-white shadow-[4px_4px_0px_0px_#2b2b2b] group-hover:-translate-y-1 group-hover:shadow-[6px_6px_0px_0px_#2b2b2b] transition-all relative z-20 ml-auto md:ml-0 ${idx % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                                                {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                            <span className={`px-2.5 py-1 rounded-md text-[8px] font-black uppercase tracking-widest text-white ${badgeColor} shadow-sm`}>
                                                {log.action}
                                            </span>
                                        </div>
                                        <h4 className="text-base md:text-lg font-black uppercase tracking-tighter text-slate-900 truncate">
                                            {log.attendee?.name ?? 'Unknown User'}
                                        </h4>
                                        <div className="flex items-center gap-1.5 mt-2">
                                            <span className="text-xs">📍</span>
                                            <p className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest truncate">
                                                Zone: <span className="text-indigo-600 font-black">{log.geofence?.name ?? 'Unknown Area'}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    )}
                </div>
            </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
            <Card className="p-8 border-4 border-[#2b2b2b] shadow-[8px_8px_0px_0px_#2b2b2b] bg-indigo-50 relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 text-9xl opacity-[0.03] mix-blend-multiply group-hover:scale-110 transition-transform duration-700">⚡</div>
                <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-6 relative z-10 flex items-center gap-2">
                    Command Center
                </h3>
                
                <div className="space-y-4 relative z-10">
                    {[
                        { to: '/client/users', icon: '👥', label: 'Users', desc: 'Manage your attendees' },
                        { to: '/client/geofences', icon: '📍', label: 'Geofences', desc: 'Define boundaries' },
                        { to: '/client/categories', icon: '🏷️', label: 'Categories', desc: 'Configure departments' },
                        { to: '/client/logs', icon: '📜', label: 'Attendance Logs', desc: 'Export & view history' },
                    ].map((action, i) => (
                        <Link
                            key={i}
                            to={action.to}
                            className="flex items-center gap-4 p-4 bg-white border-3 border-[#2b2b2b] rounded-2xl shadow-[4px_4px_0px_0px_#2b2b2b] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all group/link"
                        >
                            <div className="w-12 h-12 rounded-[1rem] bg-slate-50 border-2 border-[#2b2b2b] flex items-center justify-center text-xl group-hover/link:bg-indigo-100 group-hover/link:rotate-3 transition-all shrink-0">
                                {action.icon}
                            </div>
                            <div>
                                <div className="text-xs font-black uppercase tracking-widest text-slate-900">{action.label}</div>
                                <div className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mt-1">{action.desc}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </Card>
        </div>
      </div>

      {/* Full Width Bottom Chart */}
      <Card className="p-8 border-4 border-[#2b2b2b] shadow-[8px_8px_0px_0px_#2b2b2b] bg-white group">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center w-4 h-4">
                      <div className="w-3 h-3 rounded-full bg-indigo-500 animate-ping absolute" />
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 relative z-10" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Organization Activity Trend</h3>
              </div>
              <div className="flex bg-slate-100 p-1 rounded-xl border-2 border-slate-200">
                  {(['today', '7d', '30d'] as const).map(f => (
                      <button
                          key={f}
                          onClick={() => setHeatmapFilter(f)}
                          className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${heatmapFilter === f ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                          {f}
                      </button>
                  ))}
              </div>
          </div>
          
          {/* Dynamic Chart - Now much wider */}
          <div className="flex items-end justify-between h-48 gap-2 px-1">
              {heatmapData.map((data, i) => (
                  <div 
                      key={i} 
                      className={`w-full border-2 border-transparent rounded-t-xl transition-all relative group/bar duration-500 ${
                          data.count > 0 
                              ? 'bg-gradient-to-t from-indigo-500 to-indigo-400 hover:from-indigo-600 hover:to-indigo-500 shadow-sm' 
                              : 'bg-slate-50'
                      }`}
                      style={{ height: `${data.height}%` }}
                  >
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white p-2 rounded-xl opacity-0 group-hover/bar:opacity-100 group-hover/bar:-translate-y-2 transition-all whitespace-nowrap pointer-events-none shadow-xl z-30 border border-white/20 backdrop-blur-md">
                          <div className="text-[10px] font-black leading-none">{data.count} Check-ins</div>
                          <div className="text-[7px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                              {data.label}
                          </div>
                          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-900" />
                      </div>
                  </div>
              ))}
          </div>
          <div className="flex justify-between mt-6 pt-6 border-t-2 border-slate-100 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              {heatmapFilter === 'today' ? (
                  <>
                      <span>00:00</span>
                      <span>06:00</span>
                      <span>12:00</span>
                      <span>18:00</span>
                      <span>23:59</span>
                  </>
              ) : (
                  <>
                      <span>{heatmapData[0]?.label}</span>
                      <span className="text-indigo-500">Activity Over Time</span>
                      <span>{heatmapData[heatmapData.length - 1]?.label}</span>
                  </>
              )}
          </div>
      </Card>
    </div>
  )
}
