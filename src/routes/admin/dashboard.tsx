import React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import Card from '../../components/Card'
import { THEME } from '../../theme'
import { useQuery } from '@tanstack/react-query'
import { getDashboardStatsFn, getLogsFn, getOrganizationsFn } from '../../lib/queries'

export const Route = createFileRoute('/admin/dashboard')({ component: DashboardPage })

function DashboardPage() {
  const { data: stats, isLoading: statsLoading, error: statsError } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => getDashboardStatsFn()
  })

  const { data: recentLogs, isLoading: logsLoading, error: logsError } = useQuery({
    queryKey: ['logs'],
    queryFn: () => getLogsFn()
  })

  const { data: orgs, isLoading: orgsLoading } = useQuery({
    queryKey: ['organizations'],
    queryFn: () => getOrganizationsFn()
  })

  if (statsLoading || logsLoading || orgsLoading) return <div className="p-8 font-black uppercase text-slate-400 italic animate-pulse text-center mt-20">Synchronizing Geopulse Command Center...</div>
  
  if (statsError || logsError) {
    return (
        <div className="p-8 space-y-4">
            <div className="p-6 bg-rose-50 border-4 border-dark-border rounded-2xl shadow-[8px_8px_0px_0px_#2b2b2b]">
                <h2 className="text-xl font-black text-rose-600 uppercase mb-2">System Error: Core Offline</h2>
                <p className="text-xs font-bold text-rose-500 uppercase tracking-tight">
                    Unable to establish a secure link to the Geopulse database.
                </p>
                <button 
                    onClick={() => window.location.reload()}
                    className="mt-6 px-6 py-2 bg-rose-600 text-white font-black rounded-xl uppercase text-[10px] border-3 border-dark-border shadow-[4px_4px_0px_0px_#2b2b2b] active:shadow-none transition-all"
                >
                    Retry Handshake
                </button>
            </div>
        </div>
    )
  }

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col bg-white -m-4 md:-m-8">
      {/* 1. TOP HEADER SECTION */}
      <div className="shrink-0 bg-white border-b-4 border-slate-100 px-4 md:px-8 pt-6 pb-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 uppercase leading-none">Command Center</h2>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-[8px] font-black uppercase tracking-widest rounded-lg border-2 border-emerald-200/50">System Live</span>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-tight text-[10px] md:text-xs mt-1">Real-time monitoring of boundary intelligence and personnel synchronization.</p>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-3 px-5 py-3 bg-white border-3 border-dark-border rounded-2xl shadow-[4px_4px_0px_0px_#2b2b2b]">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Secure Admin Link Active</span>
              </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-auto no-scrollbar md:border-l-4 md:border-r-4 md:border-t-4 border-dark-border bg-slate-50/30 p-4 md:p-8 space-y-10">
        
        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard title="Total Check-ins" value={(stats?.checkIns ?? 0).toString()} change="+12.4%" icon="✅" color="#bbf7d0" />
          <StatsCard title="Active Geofences" value={(stats?.activeGeofences ?? 0).toString()} change="Global Zones" icon="📍" color="#c7d2fe" />
          <StatsCard title="Team Members" value={(stats?.userCount ?? 0).toString()} change="Verified" icon="👤" color="#fed7aa" />
          <StatsCard title="Organizations" value={(stats?.orgCount ?? 0).toString()} change="Network Nodes" icon="🏢" color="#fef08a" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* RECENT ACTIVITY */}
          <Card 
            className="lg:col-span-2 p-8" 
            style={{ background: '#fff', border: '4px solid #2b2b2b', boxShadow: '12px 12px 0px 0px #2b2b2b' }}
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">📜</div>
                <div>
                    <h3 className="text-xl font-black uppercase tracking-tighter text-slate-900 leading-none">Pulse Registry</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Live Activity Stream</p>
                </div>
              </div>
              <Link to="/admin/logs" className="px-5 py-2.5 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[9px] tracking-widest border-3 border-dark-border shadow-[4px_4px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all">
                Registry Full View
              </Link>
            </div>
            
            <div className="space-y-3">
              {(recentLogs ?? []).slice(0, 6).map((log) => {
                const isOut = !!log.afternoonTimeOut || (!!log.morningTimeOut && !log.afternoonTimeIn)
                return (
                  <ActivityItem 
                    key={log.id}
                    user={log.attendee?.name || 'Unknown User'} 
                    action={isOut ? 'OUT' : 'IN'}
                    target={log.geofence?.name || 'Unknown Area'}
                    time={new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
                    isMock={log.isMock}
                  />
                )
              })}
              {(recentLogs ?? []).length === 0 && (
                <div className="py-20 text-center border-4 border-dashed border-slate-100 rounded-3xl space-y-4">
                  <div className="text-5xl animate-pulse">📡</div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Listening for network signals...</p>
                </div>
              )}
            </div>
          </Card>

          {/* SIDEBAR: QUICK ACCESS & NODES */}
          <div className="space-y-10">
              <Card 
                className="p-8" 
                style={{ background: '#fff', border: '4px solid #2b2b2b', boxShadow: '12px 12px 0px 0px #2b2b2b' }}
              >
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-xl shadow-[4px_4px_0px_0px_rgba(79,70,229,0.2)]">⚡</div>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tighter text-slate-900 leading-none">Command Links</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Quick Management</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <ActionLink label="New Geofence" icon="➕" to="/admin/geofences" />
                    <ActionLink label="Manage Team" icon="👥" to="/admin/users" />
                    <ActionLink label="Database" icon="🛡️" to="/admin/settings" />
                    <ActionLink label="Pulse Logs" icon="📊" to="/admin/logs" />
                </div>
              </Card>

              <Card 
                className="p-8"
                style={{ background: '#0f172a', border: '4px solid #2b2b2b', boxShadow: '12px 12px 0px 0px #2b2b2b' }}
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Network Nodes</h3>
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-1">Active Organizations</p>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_#10b981]" />
                </div>
                <div className="space-y-5">
                  {(orgs ?? []).slice(0, 4).map(org => (
                    <div key={org.id} className="flex items-center justify-between border-b-2 border-white/5 pb-4 last:border-0 last:pb-0 group">
                      <div className="flex flex-col">
                        <span className="text-xs font-black uppercase tracking-tight text-white group-hover:text-indigo-400 transition-colors">{org.name}</span>
                        <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{org.orgCode}</span>
                      </div>
                      <div className="px-2 py-0.5 rounded-md border border-emerald-500/30 text-[8px] font-black text-emerald-500 uppercase">Online</div>
                    </div>
                  ))}
                  <Link to="/admin/organization" className="block text-center mt-6 py-4 border-2 border-white/10 hover:border-white/30 hover:bg-white/5 rounded-2xl text-[9px] font-black uppercase tracking-widest text-white transition-all">
                    Expand Network Topology →
                  </Link>
                </div>
              </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatsCard({ title, value, change, icon, color }: { title: string, value: string, change: string, icon: string, color: string }) {
  return (
    <Card 
      className="p-8 relative group hover:-translate-x-1 hover:-translate-y-1 transition-all" 
      style={{ background: '#fff', border: '4px solid #2b2b2b', boxShadow: '8px 8px 0px 0px #2b2b2b' }}
    >
      <div className="relative flex flex-col gap-6">
        <div 
            className="w-14 h-14 flex items-center justify-center text-3xl rounded-2xl border-3 border-dark-border shadow-[4px_4px_0px_0px_rgba(43,43,43,0.1)]"
            style={{ background: color }}
        >
            {icon}
        </div>
        <div className="space-y-1">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</div>
          <div className="text-5xl font-black text-slate-900 tracking-tighter leading-none">{value}</div>
          <div className="inline-flex mt-4 px-3 py-1 bg-slate-50 rounded-lg border-2 border-slate-100 text-[9px] font-black text-slate-500 uppercase tracking-tight">
            {change}
          </div>
        </div>
      </div>
    </Card>
  )
}

function ActivityItem({ user, action, target, time, isMock }: { user: string, action: string, target: string, time: string, isMock?: boolean }) {
  return (
    <div className="flex items-center gap-5 p-5 rounded-2xl border-3 border-transparent hover:border-dark-border hover:bg-slate-50 transition-all group">
      <div className="w-12 h-12 rounded-2xl border-3 border-dark-border bg-white flex items-center justify-center text-lg shadow-[3px_3px_0px_0px_#2b2b2b] shrink-0 font-black group-hover:scale-110 transition-transform">
        {user.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-black text-slate-900 uppercase tracking-tight truncate">{user}</p>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-white px-2 py-0.5 rounded-md border-2 border-slate-100">{time}</span>
        </div>
        <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase border-2 ${action === 'IN' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                {action}
            </span>
            <p className="text-[10px] font-bold text-slate-500 uppercase truncate">
                SYNCED <span className="text-indigo-600 font-black">@{target}</span>
            </p>
            {isMock && (
                <span className="px-2 py-0.5 bg-amber-100 text-amber-600 text-[8px] font-black uppercase rounded border border-amber-200">Mocked</span>
            )}
        </div>
      </div>
    </div>
  )
}

function ActionLink({ label, icon, to }: { label: string, icon: string, to: string }) {
  return (
    <Link 
        to={to}
        className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl transition-all group border-3 border-dark-border shadow-[4px_4px_0px_0px_rgba(43,43,43,0.05)] hover:bg-slate-50 hover:shadow-[6px_6px_0px_0px_#2b2b2b] active:translate-x-0.5 active:translate-y-0.5 bg-white"
    >
      <span className="text-3xl group-hover:scale-110 transition-transform">{icon}</span>
      <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest text-center leading-tight">{label}</span>
    </Link>
  )
}
