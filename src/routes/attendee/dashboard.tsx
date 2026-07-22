import React, { useState, useEffect, Suspense, lazy, useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAttendeeDashboardStatsFn, checkInFn, getAttendeeGeofencesFn } from '@/lib/queries'
import { useNotification } from '@/components/Notification'
import Card from '@/components/Card'

const Map = lazy(() => import('@/components/Map'))

export const Route = createFileRoute('/attendee/dashboard')({
  component: AttendeeDashboardPage,
})

function AttendeeDashboardPage() {
  const queryClient = useQueryClient()
  const { user } = Route.useRouteContext() as any
  const { showNotif } = useNotification()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [mapHeight, setMapHeight] = useState(400)
  const isResizing = useRef(false)
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [isMock, setIsMock] = useState(false)
  const [isLocating, setIsLocating] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<'morningIn' | 'morningOut' | 'afternoonIn' | 'afternoonOut'>('morningIn')

  const isVerified = user?.isVerified

  // Auto-refresh clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Get stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['attendee-stats'],
    queryFn: () => getAttendeeDashboardStatsFn(),
    refetchInterval: 30000,
    enabled: isVerified
  })

  // Get geofences for map
  const { data: geofences } = useQuery({
    queryKey: ['attendee-geofences'],
    queryFn: () => getAttendeeGeofencesFn(),
    enabled: isVerified
  })

  // Location tracking
  const requestLocation = (onSuccess?: (pos: GeolocationPosition) => void) => {
    if (!isVerified) return
    if (!navigator.geolocation) {
      showNotif('Geolocation is not supported by your browser', 'error')
      return
    }
    setIsLocating(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        
        // Mock detection heuristics
        const accuracyCheck = pos.coords.accuracy === 0 || pos.coords.accuracy === 1
        const metaCheck = pos.coords.heading === null && pos.coords.speed === null
        const isSuspicious = accuracyCheck && metaCheck
        setIsMock(isSuspicious)
        
        setIsLocating(false)
        if (onSuccess) onSuccess(pos)
      },
      (err) => {
        showNotif('Failed to get location. Please enable GPS and allow access.', 'error')
        setIsLocating(false)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    )
  }

  // Initial location
  useEffect(() => {
    if (isVerified) requestLocation()
  }, [isVerified])

  const checkInMutation = useMutation({
    mutationFn: (data: { latitude: number; longitude: number; slot: string; isMock: boolean }) => checkInFn({ data }),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: ['attendee-stats'] })
      showNotif(`${res.slotLabel} successful at ${res.geofenceName}`, 'success')
    },
    onError: (err: any) => showNotif(err.message, 'error'),
  })

  const handleAction = () => {
    if (!isVerified) {
      showNotif('Your account is pending verification.', 'warning')
      return
    }

    const confirmMsg = `This will record your current GPS location for the ${isTimeIn ? 'TIME IN' : 'TIME OUT'} log. Do you want to proceed?`
    if (!window.confirm(confirmMsg)) return

    showNotif('Verifying fresh GPS signal...', 'info')
    requestLocation((pos) => {
      checkInMutation.mutate({ 
        latitude: pos.coords.latitude, 
        longitude: pos.coords.longitude, 
        slot: selectedSlot, 
        isMock: (pos.coords.accuracy === 0 || pos.coords.accuracy === 1) && pos.coords.heading === null && pos.coords.speed === null
      })
    })
  }

  const isPresent = stats?.status === 'ON-DUTY'
  const isTimeIn = selectedSlot === 'morningIn' || selectedSlot === 'afternoonIn'

  // Detect active geofence client-side
  const activeGeofence = geofences?.find((gf: any) => {
    if (!coords) return false
    const dist = calculateDistance(coords.lat, coords.lng, gf.latitude, gf.longitude)
    return dist <= gf.radius
  })

  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return
      const mapContainer = document.getElementById('map-container')
      if (mapContainer) {
        const newHeight = Math.max(300, Math.min(1000, e.clientY - mapContainer.getBoundingClientRect().top))
        setMapHeight(newHeight)
      }
    }

    const handleMouseUp = () => {
      isResizing.current = false
      document.body.style.cursor = 'default'
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371e3
    const φ1 = (lat1 * Math.PI) / 180
    const φ2 = (lat2 * Math.PI) / 180
    const Δφ = ((lat2 - lat1) * Math.PI) / 180
    const Δλ = ((lon2 - lon1) * Math.PI) / 180
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* ── Insecure Origin Warning ── */}
      {typeof window !== 'undefined' && window.location.protocol === 'http:' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1' && (
        <div className="bg-rose-50 border-4 border-[#2b2b2b] p-6 rounded-2xl shadow-[6px_6px_0px_0px_#2b2b2b] flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 bg-white rounded-xl border-3 border-[#2b2b2b] flex items-center justify-center text-3xl shadow-[4px_4px_0px_0px_#2b2b2b] shrink-0">
            🔒
          </div>
          <div className="text-center md:text-left flex-1">
            <h4 className="text-lg font-black text-rose-900 uppercase tracking-tight">Insecure Connection Detected</h4>
            <p className="text-[10px] font-bold text-rose-600 uppercase tracking-widest mt-1 leading-relaxed">
              Browsers block GPS access on non-secure connections. <br/>
              Please use the <span className="text-rose-900 underline">HTTPS Tunnel URL</span> from your GeoPulse Launcher to enable location services on this device.
            </p>
          </div>
        </div>
      )}

      {/* ── Verification Warning ── */}
      {!isVerified && (
        <div className="bg-amber-50 border-4 border-[#2b2b2b] p-6 rounded-2xl shadow-[6px_6px_0px_0px_#2b2b2b] flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 bg-white rounded-xl border-3 border-[#2b2b2b] flex items-center justify-center text-3xl shadow-[4px_4px_0px_0px_#2b2b2b] shrink-0">
            ⏳
          </div>
          <div className="text-center md:text-left flex-1">
            <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">Pending Verification</h4>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
              Your organization administrator needs to verify your identity before you can record attendance.
            </p>
          </div>
          <div className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-[0.2em] animate-pulse">
            Awaiting Approval
          </div>
        </div>
      )}

      {/* ── Welcome Header ────────────────────────────────────────────────── */}
      <div className={`flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border-4 border-[#2b2b2b] shadow-[8px_8px_0px_0px_#2b2b2b] text-white overflow-hidden relative group transition-all duration-700 ${isVerified ? 'bg-slate-900' : 'bg-slate-700'}`}>
        <div className="absolute top-0 right-0 p-12 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/10 transition-all duration-700" />

        <div className="relative z-10 text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase leading-tight">
            {!isVerified ? 'Access Restricted' : (isPresent ? 'Currently Present' : 'Awaiting Check-in')}
          </h2>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px] md:text-[10px] mt-1 md:mt-2">
            Local Time: {isMounted ? currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '--:--:--'}
          </p>
        </div>

        <div className="relative z-10 flex flex-col items-center md:items-end">
          <div className="text-3xl md:text-5xl font-black tracking-tighter leading-none">
            {isMounted ? currentTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }) : '--- --, ----'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* ── Action Card (Main Column) ────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 md:p-10 flex flex-col items-center justify-center text-center bg-white border-4 border-[#2b2b2b] shadow-[8px_8px_0px_0px_#2b2b2b]">
            <div className="mb-6 md:mb-10 relative">
              <div className={`w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center text-4xl md:text-5xl border-8 border-[#2b2b2b] shadow-[6px_6px_0px_0px_#2b2b2b] transition-all duration-500 ${isPresent ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white'
                }`}>
                {isPresent ? '📍' : '👋'}
              </div>
              {isLocating && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-36 h-36 md:w-48 md:h-48 rounded-full border-4 border-indigo-400 border-t-transparent animate-spin" />
                </div>
              )}
            </div>

            <div className="space-y-3 mb-8 md:mb-10">
              <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                {isTimeIn ? 'Ready to Time In?' : 'Ending Session?'}
              </h3>
              <div className="flex flex-col items-center gap-1.5">
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[9px] md:text-[10px]">
                  {coords
                    ? `Signal Locked: ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`
                    : 'Acquiring GPS Signal...'}
                </p>
                {isVerified && activeGeofence && (
                  <div className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-100 text-[8px] md:text-[9px] font-black uppercase tracking-widest animate-pulse">
                    📍 Detected: {activeGeofence?.name}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleAction}
              disabled={checkInMutation.isPending || isLocating || !!stats?.slots?.[selectedSlot]}
              className={`
                group relative w-full md:w-auto px-10 md:px-12 py-5 md:py-6 rounded-2xl font-black uppercase text-base md:text-lg tracking-[0.2em] transition-all duration-300
                border-4 border-[#2b2b2b] active:translate-x-1 active:translate-y-1 active:shadow-none
                ${isTimeIn
                  ? 'bg-emerald-500 text-white shadow-[6px_6px_0px_0px_#065f46] md:shadow-[8px_8px_0px_0px_#065f46]'
                  : 'bg-rose-500 text-white shadow-[6px_6px_0px_0px_#9f1239] md:shadow-[8px_8px_0px_0px_#9f1239]'}
                disabled:opacity-40 disabled:grayscale disabled:translate-y-0 disabled:shadow-none
              `}
            >
              <span className="relative z-10">
                {checkInMutation.isPending ? 'Processing...' : (stats?.slots?.[selectedSlot] ? 'Logged' : (isTimeIn ? 'Time In' : 'Time Out'))}
              </span>
            </button>

            {coords && activeGeofence && (
              <div className="mt-6 md:mt-8 flex items-center gap-2 px-3 md:px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl border-2 border-emerald-200">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">Zone Connection Stable</span>
              </div>
            )}
          </Card>
        </div>

        {/* ── Sidebar Column ────────────────────────────────────────────────── */}
        <div className="space-y-6 md:space-y-8">
          {/* Daily Slots Summary */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Session Slots</h3>
              <div className="h-0.5 flex-1 bg-slate-100 ml-4 rounded-full" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Morning In', key: 'morningIn' },
                { label: 'Morning Out', key: 'morningOut' },
                { label: 'Afternoon In', key: 'afternoonIn' },
                { label: 'Afternoon Out', key: 'afternoonOut' },
              ].map((slot, index, array) => {
                const time = stats?.slots?.[slot.key]
                const isSelected = selectedSlot === slot.key
                const isPreviousFilled = index === 0 || !!stats?.slots?.[array[index - 1].key]
                const isLocked = !isPreviousFilled && !time

                return (
                  <button
                    key={slot.key}
                    disabled={isLocked}
                    onClick={() => setSelectedSlot(slot.key as any)}
                    className={`p-4 bg-white border-3 rounded-xl flex flex-col items-center text-center gap-1 group transition-all relative ${isSelected
                        ? 'border-indigo-600 shadow-[4px_4px_0px_0px_#4f46e5] -translate-x-1 -translate-y-1 z-10'
                        : isLocked
                          ? 'border-slate-200 bg-slate-50 cursor-not-allowed border-dashed'
                          : 'border-[#2b2b2b] shadow-[3px_3px_0px_0px_#2b2b2b] hover:border-slate-400'
                      }`}
                  >
                    <div className={`relative z-10 text-[10px] font-black uppercase tracking-widest transition-colors ${isSelected ? 'text-indigo-600' : isLocked ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                      {slot.key.includes('In') ? 'TIME IN' : 'TIME OUT'}
                    </div>
                    <div className={`relative z-10 text-lg font-black tracking-tighter ${time ? 'text-slate-900' : isLocked ? 'text-slate-300' : 'text-slate-200'}`}>
                      {isLocked ? '🔒' : time ? new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                    </div>

                    {isSelected && (
                      <div className="absolute -top-3 -right-3 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-2 border-dark-border animate-bounce z-20">
                        ✓
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Stats Chips */}
          <div className="grid grid-cols-1 gap-4">
            {[
              { label: 'Activity Today', value: stats?.todayLogs?.length ?? 0, icon: '📅', color: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
              { label: 'Total Logs', value: stats?.totalLogs ?? 0, icon: '📊', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
            ].map(s => (
              <div key={s.label} className={`p-6 rounded-2xl border-3 border-[#2b2b2b] shadow-[4px_4px_0px_0px_#2b2b2b] flex items-center gap-4 ${s.color}`}>
                <div className="text-2xl">{s.icon}</div>
                <div>
                  <div className="text-xl font-black tracking-tighter leading-none">{s.value}</div>
                  <div className="text-[8px] font-black uppercase tracking-[0.2em] opacity-70 mt-1">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Map ───────────────────────────────────────────────────────────── */}
      <Card 
        id="map-container"
        style={{ height: `${mapHeight}px` }}
        className="w-full p-2 bg-slate-900 border-4 border-[#2b2b2b] shadow-[6px_6px_0px_0px_#2b2b2b] md:shadow-[8px_8px_0px_0px_#2b2b2b] overflow-hidden relative group"
      >
        <div className="absolute top-3 left-3 z-[2000] px-2 py-1 bg-white/90 backdrop-blur rounded-lg border-2 border-slate-900 shadow-md">
          <span className="text-[8px] font-black uppercase tracking-widest text-slate-900">Coverage Map</span>
        </div>

        {/* Drag Handle */}
        <div 
          onMouseDown={(e) => {
            isResizing.current = true
            document.body.style.cursor = 'row-resize'
            e.preventDefault()
          }}
          className="absolute bottom-0 left-0 right-0 h-4 bg-slate-800/50 hover:bg-indigo-600/50 cursor-row-resize z-[2001] flex items-center justify-center transition-colors group/handle"
        >
          <div className="w-12 h-1 bg-white/20 group-hover/handle:bg-white/60 rounded-full" />
        </div>
        <div className="w-full h-full rounded-xl overflow-hidden transition-all duration-500">
          {isMounted ? (
            <Suspense fallback={<div className="w-full h-full bg-slate-800 animate-pulse" />}>
              <Map 
                center={coords ? [coords.lat, coords.lng] : [14.5995, 120.9842]}
                zoom={16}
                userLocation={coords}
                geofences={geofences}
                showSearch={false}
              />
            </Suspense>
          ) : (
            <div className="w-full h-full bg-slate-800 animate-pulse" />
          )}
        </div>
        {isMounted && !coords && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-[1500]">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4" />
            <p className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-4">Awaiting Satellite Lock...</p>
            <button 
              onClick={() => requestLocation()}
              className="px-6 py-3 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] active:translate-y-1 active:shadow-none transition-all"
            >
              Retry GPS Access
            </button>
          </div>
        )}
      </Card>
    </div>
  )
}