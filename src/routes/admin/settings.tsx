import { useState, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import Card from '../../components/Card'
import { THEME } from '../../theme'
import { useNotification } from '../../components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getOrganizationsFn } from '../../lib/queries'

export const Route = createFileRoute('/admin/settings')({ component: SettingsPage })

function SettingsPage() {
  const { showNotif, confirm } = useNotification()
  const queryClient = useQueryClient()
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [selectedOrgId, setSelectedOrgId] = useState<string>('')

  // --- DATA FETCHING ---
  const { data: orgs } = useQuery({
    queryKey: ['organizations'],
    queryFn: () => getOrganizationsFn()
  })

  const selectedOrg = useMemo(() => {
    return orgs?.find((o: any) => o.id === selectedOrgId)
  }, [orgs, selectedOrgId])

  // --- MUTATIONS ---
  const purgeMutation = (type: string, scope?: string) => useMutation({
    mutationFn: async () => {
      // Mocking the purge for now
      return new Promise((resolve) => setTimeout(resolve, 2000))
    },
    onSuccess: () => {
      queryClient.invalidateQueries()
      showNotif(`${type} ${scope ? `for ${scope} ` : ''}purged successfully.`, 'success')
    },
    onError: () => {
      showNotif(`Failed to purge ${type}.`, 'error')
    }
  })

  const purgeLogs = purgeMutation('Attendance logs')
  const purgeOrgs = purgeMutation('Organizations')
  const purgeGeofences = purgeMutation('Geofences')
  const purgeUsers = purgeMutation('Users')

  // Scoped mutations
  const purgeOrgData = purgeMutation('Full Organization Data', selectedOrg?.name)
  const purgeOrgGeofences = purgeMutation('Geofences', selectedOrg?.name)
  const purgeOrgUsers = purgeMutation('Users', selectedOrg?.name)

  const syncNodesMutation = useMutation({
    mutationFn: async () => {
      return new Promise((resolve) => setTimeout(resolve, 1500))
    },
    onSuccess: () => {
      showNotif('Network nodes synchronized.', 'success')
    }
  })

  // --- HANDLERS ---
  const handlePurge = async (title: string, message: string, mutation: any) => {
    const isConfirmed = await confirm({
      title,
      message: `${message} This action is irreversible and will affect all reports and dependencies.`,
      type: 'danger',
      confirmText: 'Execute Purge'
    })
    
    if (isConfirmed) {
      mutation.mutate()
    }
  }

  return (
    <div className="max-w-5xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* HEADER */}
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">System Maintenance</h2>
        <p className="text-slate-500 font-bold uppercase tracking-tight text-xs mt-1">Manage core database operations and network synchronization.</p>
      </div>

      {/* DATABASE STATUS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatusCard title="Database Health" value="Healthy" icon="🛡️" status="success" />
        <StatusCard title="Schema Version" value="v2.4.0-STABLE" icon="📂" />
        <StatusCard title="Maintenance Mode" value={maintenanceMode ? 'ACTIVE' : 'INACTIVE'} icon="🛠️" status={maintenanceMode ? 'warning' : 'neutral'} />
      </div>

      {/* GLOBAL CONTROLS */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 text-slate-400">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap">Global Infrastructure Purge</span>
          <div className="h-1 flex-1 bg-slate-100 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MiniPurgeCard 
            title="All Logs" 
            icon="🔥" 
            isLoading={purgeLogs.isPending}
            onPurge={() => handlePurge('Purge All Logs?', 'This will permanently delete ALL attendance logs system-wide.', purgeLogs)}
          />
          <MiniPurgeCard 
            title="All Orgs" 
            icon="🏢" 
            isLoading={purgeOrgs.isPending}
            onPurge={() => handlePurge('Purge All Orgs?', 'This will permanently delete ALL organizations.', purgeOrgs)}
          />
          <MiniPurgeCard 
            title="All Geofences" 
            icon="🌐" 
            isLoading={purgeGeofences.isPending}
            onPurge={() => handlePurge('Purge All Geofences?', 'This will permanently delete ALL geofences.', purgeGeofences)}
          />
          <MiniPurgeCard 
            title="All Users" 
            icon="👥" 
            isLoading={purgeUsers.isPending}
            onPurge={() => handlePurge('Purge All Users?', 'This will permanently delete ALL non-admin users.', purgeUsers)}
          />
        </div>
      </section>

      {/* GRANULAR CONTROLS */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-slate-400 flex-1">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap">Granular Node Maintenance</span>
            <div className="h-1 flex-1 bg-slate-100 rounded-full" />
          </div>
          
          <select 
            value={selectedOrgId} 
            onChange={(e) => setSelectedOrgId(e.target.value)}
            className="bg-white border-3 border-dark-border px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-[3px_3px_0px_0px_#2b2b2b] outline-none min-w-[240px]"
          >
            <option value="">Select Organization...</option>
            {orgs?.map((o: any) => (
              <option key={o.id} value={o.id}>{o.name}</option>
            ))}
          </select>
        </div>

        {!selectedOrgId ? (
          <div className="p-12 border-4 border-dashed border-slate-100 rounded-3xl text-center">
            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Select an organization above to access node-specific maintenance.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in zoom-in-95 duration-300">
            <PurgeCard 
              title="Purge Org Entity" 
              description={`Completely decommission ${selectedOrg?.name} and all its related assets.`}
              icon="🏢" 
              isLoading={purgeOrgData.isPending}
              onPurge={() => handlePurge(`Purge ${selectedOrg?.name}?`, `This will delete EVERYTHING related to ${selectedOrg?.name}.`, purgeOrgData)}
            />
            <PurgeCard 
              title="Purge Org Geofences" 
              description={`Wipe all geofence definitions assigned to ${selectedOrg?.name}.`}
              icon="🌐" 
              isLoading={purgeOrgGeofences.isPending}
              onPurge={() => handlePurge(`Purge Geofences?`, `This will delete all geofences for ${selectedOrg?.name}.`, purgeOrgGeofences)}
            />
            <PurgeCard 
              title="Purge Org Users" 
              description={`Remove all personnel currently assigned to ${selectedOrg?.name}.`}
              icon="👥" 
              isLoading={purgeOrgUsers.isPending}
              onPurge={() => handlePurge(`Purge Users?`, `This will delete all personnel for ${selectedOrg?.name}.`, purgeOrgUsers)}
            />
          </div>
        )}
      </section>

      {/* NETWORK OPERATIONS */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 text-slate-400">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap">Network Operations</span>
          <div className="h-1 flex-1 bg-slate-100 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8 border-4 border-slate-900 shadow-[8px_8px_0px_0px_#2b2b2b] bg-white flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl border-3 border-indigo-500 flex items-center justify-center text-2xl mb-6 shadow-[3px_3px_0px_0px_rgba(79,70,229,0.2)]">
                🔄
              </div>
              <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">Synchronize Network</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase mt-2 leading-relaxed">
                Force a full synchronization between organization nodes and geofence definitions.
              </p>
            </div>
            <button 
              onClick={() => syncNodesMutation.mutate()}
              disabled={syncNodesMutation.isPending}
              className="mt-8 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest border-3 border-dark-border shadow-[4px_4px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all disabled:opacity-50"
            >
              {syncNodesMutation.isPending ? 'Synchronizing...' : 'Trigger Sync'}
            </button>
          </Card>

          <div className="grid grid-cols-1 gap-6">
            <ActionCard 
              title="Maintenance Mode" 
              description="Prevent non-admin access during core updates." 
              icon={maintenanceMode ? '🔓' : '🔒'} 
              actionText={maintenanceMode ? 'Disable Mode' : 'Enable Mode'}
              onAction={() => setMaintenanceMode(!maintenanceMode)}
              theme={maintenanceMode ? 'warning' : 'neutral'}
            />
            <ActionCard 
              title="Reset Analytics" 
              description="Recalculate all dashboard stats from raw data." 
              icon="📊" 
              actionText="Refresh Stats"
              onAction={() => showNotif('Analytics cache cleared.', 'success')}
            />
          </div>
        </div>
      </section>

      {/* FOOTER INFO */}
      <div className="pt-10 border-t-4 border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">
            Geopulse Infrastructure v2.4.0-stable • Connection: Prisma/MySQL
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-black uppercase text-emerald-600 tracking-tighter">Database Streaming Active</span>
        </div>
      </div>
    </div>
  )
}

function StatusCard({ title, value, icon, status }: { title: string, value: string, icon: string, status?: 'success' | 'warning' | 'neutral' }) {
  const statusColors = {
    success: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    warning: 'bg-amber-50 text-amber-600 border-amber-200',
    neutral: 'bg-slate-50 text-slate-500 border-slate-200'
  }
  
  return (
    <Card className="p-6 border-4 border-slate-900 shadow-[5px_5px_0px_0px_#2b2b2b] bg-white">
      <div className="flex items-center gap-4">
        <div className="text-2xl">{icon}</div>
        <div>
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{title}</h4>
          <div className={`text-xs font-black uppercase tracking-tight inline-flex px-2 py-0.5 rounded-lg border-2 ${status ? statusColors[status] : 'text-slate-900 border-transparent'}`}>
            {value}
          </div>
        </div>
      </div>
    </Card>
  )
}

function MiniPurgeCard({ title, icon, isLoading, onPurge }: { title: string, icon: string, isLoading: boolean, onPurge: () => void }) {
  return (
    <Card className="p-6 border-4 border-slate-900 shadow-[5px_5px_0px_0px_#2b2b2b] bg-white flex flex-col items-center gap-4 group">
      <div className="w-10 h-10 bg-rose-50 rounded-xl border-2 border-rose-500 flex items-center justify-center text-xl shadow-[2px_2px_0px_0px_rgba(244,63,94,0.2)] group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-tight text-center">{title}</h4>
      <button 
        onClick={onPurge}
        disabled={isLoading}
        className="w-full py-2 bg-rose-500 text-white rounded-xl font-black uppercase text-[8px] tracking-widest border-2 border-dark-border shadow-[3px_3px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all disabled:opacity-50"
      >
        {isLoading ? '...' : 'Purge'}
      </button>
    </Card>
  )
}

function PurgeCard({ title, description, icon, isLoading, onPurge }: { title: string, description: string, icon: string, isLoading: boolean, onPurge: () => void }) {
  return (
    <Card className="p-8 border-4 border-slate-900 shadow-[8px_8px_0px_0px_#2b2b2b] bg-white flex flex-col justify-between group h-full">
      <div>
        <div className="w-12 h-12 bg-rose-50 rounded-2xl border-3 border-rose-500 flex items-center justify-center text-2xl mb-6 shadow-[3px_3px_0px_0px_rgba(244,63,94,0.2)] group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">{title}</h4>
        <p className="text-[10px] font-bold text-slate-400 uppercase mt-2 leading-relaxed">
          {description}
        </p>
      </div>
      <button 
        onClick={onPurge}
        disabled={isLoading}
        className="mt-8 py-4 bg-rose-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest border-3 border-dark-border shadow-[4px_4px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all disabled:opacity-50"
      >
        {isLoading ? 'Purging...' : 'Execute Purge'}
      </button>
    </Card>
  )
}

function ActionCard({ title, description, icon, actionText, onAction, theme = 'neutral' }: { title: string, description: string, icon: string, actionText: string, onAction: () => void, theme?: 'warning' | 'neutral' }) {
  return (
    <Card className="p-6 border-4 border-slate-900 shadow-[5px_5px_0px_0px_#2b2b2b] bg-white flex flex-col justify-between h-full group">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="text-xl group-hover:scale-110 transition-transform">{icon}</div>
          <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-tight">{title}</h4>
        </div>
        <p className="text-[8px] font-bold text-slate-500 uppercase leading-relaxed mb-6">{description}</p>
      </div>
      <button 
        onClick={onAction}
        className={`w-full py-2.5 rounded-xl border-3 border-dark-border text-[9px] font-black uppercase tracking-widest shadow-[3px_3px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all ${theme === 'warning' ? 'bg-amber-500 text-white' : 'bg-white text-slate-900 hover:bg-slate-50'}`}
      >
        {actionText}
      </button>
    </Card>
  )
}
