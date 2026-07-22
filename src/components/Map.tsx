import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Circle, useMap, useMapEvents, Marker } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons in Leaflet
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
})
L.Marker.prototype.options.icon = DefaultIcon

const userLocationIcon = L.divIcon({
  className: 'user-location-icon',
  html: '<div style="position: relative; width: 24px; height: 24px;"><div style="position: absolute; inset: 0; background: #6366f1; border-radius: 50%; opacity: 0.3; animation: ping 1.5s infinite;"></div><div style="position: absolute; inset: 6px; background: #6366f1; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);"></div></div>',
  iconSize: [24, 24],
  iconAnchor: [12, 12]
})
 
const radiusIcon = L.divIcon({
  className: 'radius-handle-icon',
  html: '<div style="width: 22px; height: 22px; background: white; border: 4px solid #f43f5e; border-radius: 50%; box-shadow: 0 4px 8px rgba(0,0,0,0.4); cursor: pointer; display: flex; items-center; justify-center;"><div style="width: 6px; height: 6px; background: #f43f5e; border-radius: 50%;"></div></div>',
  iconSize: [22, 22],
  iconAnchor: [11, 11]
})

// Helper to update map view
function MapUpdater({ center, geofenceId }: { center: [number, number], geofenceId?: string }) {
  const map = useMap()
  const lastGeofenceId = React.useRef<string | null>(null)

  useEffect(() => {
    if (geofenceId && geofenceId !== lastGeofenceId.current) {
      map.flyTo(center, 18, { duration: 1.5 })
      lastGeofenceId.current = geofenceId
    }
  }, [center, map, geofenceId])
  return null
}

// Helper to handle map clicks and zoom
function MapEvents({ onClick, onZoom }: { onClick?: (lat: number, lng: number) => void, onZoom?: (zoom: number) => void }) {
  const map = useMapEvents({
    click(e) {
      onClick?.(e.latlng.lat, e.latlng.lng)
    },
    zoom() {
      onZoom?.(map.getZoom())
    }
  })
  return null
}

interface MapProps {
  selectedGeofence?: any
  geofences?: any[]
  userLocation?: { lat: number, lng: number } | null
  onMapClick?: (lat: number, lng: number) => void
  onRadiusChange?: (radius: number) => void
  previewCircle?: { lat: number, lng: number, radius: number }
  showSearch?: boolean
  showSelectionBadge?: boolean
  center?: [number, number]
  zoom?: number
  refreshKey?: number
}

export default function Map({ 
  selectedGeofence, 
  geofences = [], 
  userLocation, 
  onMapClick, 
  onRadiusChange, 
  previewCircle, 
  showSearch = true, 
  showSelectionBadge = false,
  center = [10.3157, 123.8854],
  zoom: initialZoom = 13,
  refreshKey = 0
}: MapProps) {
  const [zoom, setZoom] = React.useState(initialZoom)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [suggestions, setSuggestions] = React.useState<any[]>([])
  const [isSearching, setIsSearching] = React.useState(false)
  const [handleAngle, setHandleAngle] = React.useState(0) // Angle in radians
  const mapRef = React.useRef<L.Map | null>(null)
  const searchTimeout = React.useRef<any>(null)
  const searchContainerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (searchContainerRef.current) {
      L.DomEvent.disableClickPropagation(searchContainerRef.current)
      L.DomEvent.disableScrollPropagation(searchContainerRef.current)
    }
  }, [showSearch])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    
    if (searchTimeout.current) clearTimeout(searchTimeout.current)
    
    if (query.length < 3) {
      setSuggestions([])
      return
    }

    searchTimeout.current = setTimeout(async () => {
      try {
        setIsSearching(true)
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`)
        const data = await res.json()
        setSuggestions(data)
      } catch (err) {
        console.error('Suggestions fetch failed:', err)
      } finally {
        setIsSearching(false)
      }
    }, 500)
  }

  const selectSuggestion = (suggestion: any) => {
    const { lat, lon } = suggestion
    mapRef.current?.flyTo([parseFloat(lat), parseFloat(lon)], 16)
    setSearchQuery(suggestion.display_name)
    setSuggestions([])
  }

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (suggestions.length > 0) {
      selectSuggestion(suggestions[0])
    }
  }

  // Calculate position for the radius handle (marker on the edge)
  const getRadiusHandlePos = () => {
    if (!previewCircle) return null
    
    const earthRadius = 6378137
    const offset = previewCircle.radius / earthRadius
    const latRad = previewCircle.lat * Math.PI / 180
    
    // Use handleAngle to place it anywhere on the circumference
    return {
      lat: previewCircle.lat + (offset * 180 / Math.PI) * Math.sin(handleAngle),
      lng: previewCircle.lng + ((offset * 180 / Math.PI) / Math.cos(latRad)) * Math.cos(handleAngle)
    }
  }

  const handlePos = getRadiusHandlePos()

  return (
    <div className="w-full h-full relative">
      <MapContainer 
        key={refreshKey}
        center={center} 
        zoom={initialZoom} 
        maxZoom={22}
        zoomSnap={0}
        zoomDelta={0.5}
        style={{ height: '100%', width: '100%', background: '#f1f5f9' }}
        zoomControl={false}
        attributionControl={false}
        ref={(m) => { if (m) mapRef.current = m }}
      >
        <MapEvents onClick={onMapClick} onZoom={setZoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxNativeZoom={19}
          maxZoom={22}
        />

        {/* Preview circle when creating */}
        {previewCircle && (
          <>
            <Circle
              center={[previewCircle.lat, previewCircle.lng]}
              radius={previewCircle.radius}
              pathOptions={{
                color: '#f43f5e',
                fillColor: '#f43f5e',
                fillOpacity: 0.2,
                weight: 2,
                dashArray: '5, 10'
              }}
            />
            <Marker position={[previewCircle.lat, previewCircle.lng]} />
            {handlePos && (
              <Marker 
                position={[handlePos.lat, handlePos.lng]}
                draggable={true}
                icon={radiusIcon}
                eventHandlers={{
                  drag: (e) => {
                    const marker = e.target
                    const pos = marker.getLatLng()
                    const center = L.latLng(previewCircle.lat, previewCircle.lng)
                    
                    // Update radius
                    const newRadius = center.distanceTo(pos)
                    onRadiusChange?.(Math.round(newRadius))
                    
                    // Update angle
                    const dy = pos.lat - previewCircle.lat
                    const dx = (pos.lng - previewCircle.lng) * Math.cos(previewCircle.lat * Math.PI / 180)
                    setHandleAngle(Math.atan2(dy, dx))
                  }
                }}
              />
            )}
          </>
        )}

        {selectedGeofence && (
          <>
            <MapUpdater center={[parseFloat(String(selectedGeofence.latitude)), parseFloat(String(selectedGeofence.longitude))]} geofenceId={selectedGeofence.id} />
            <Circle
              center={[parseFloat(String(selectedGeofence.latitude)), parseFloat(String(selectedGeofence.longitude))]}
              radius={Number(selectedGeofence.radius)}
              pathOptions={{
                color: '#6366f1',
                fillColor: '#6366f1',
                fillOpacity: 0.2,
                weight: 2,
                dashArray: '5, 10'
              }}
            />
            <Marker position={[parseFloat(String(selectedGeofence.latitude)), parseFloat(String(selectedGeofence.longitude))]} />
          </>
        )}

        {/* Display multiple geofences (Attendee view) */}
        {geofences.map((gf: any) => (
          <React.Fragment key={gf.id}>
            <Circle
              center={[parseFloat(String(gf.latitude)), parseFloat(String(gf.longitude))]}
              radius={Number(gf.radius)}
              pathOptions={{
                color: gf.id === selectedGeofence?.id ? '#6366f1' : '#2b2b2b',
                fillColor: gf.id === selectedGeofence?.id ? '#6366f1' : '#2b2b2b',
                fillOpacity: 0.1,
                weight: 2,
                opacity: 0.4
              }}
            />
          </React.Fragment>
        ))}

        {/* User Location Marker */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userLocationIcon} />
        )}
      </MapContainer>
      
      {/* Search Bar Overlay - Moved outside MapContainer to prevent event bubbling */}
      {showSearch && (
        <div 
          ref={searchContainerRef}
          className="absolute top-4 left-1/2 -translate-x-1/2 z-[2000] w-3/4 max-w-lg"
        >
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="flex gap-2">
              <div className="relative flex-1 group">
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search map location..."
                  className="w-full bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border-3 border-slate-900 shadow-[4px_4px_0px_0px_#2b2b2b] text-[10px] font-black uppercase outline-none focus:translate-x-0.5 focus:translate-y-0.5 focus:shadow-none transition-all"
                />
                {isSearching && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <div className="w-3 h-3 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
              <button type="submit" className="px-5 py-3 bg-slate-900 text-white rounded-2xl border-3 border-slate-900 shadow-[4px_4px_0px_0px_#2b2b2b] hover:bg-slate-800 transition-all active:shadow-none shrink-0">
                🔍
              </button>
            </div>

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-white border-3 border-slate-900 rounded-2xl shadow-[8px_8px_0px_0px_#2b2b2b] overflow-hidden animate-in slide-in-from-top-2 duration-300">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => selectSuggestion(s)}
                    className="w-full text-left px-4 py-3 hover:bg-indigo-50 border-b-2 border-slate-100 last:border-0 transition-colors group"
                  >
                    <p className="text-[10px] font-black text-slate-900 uppercase leading-tight line-clamp-1 group-hover:text-indigo-600">
                      {s.display_name}
                    </p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                      {s.type} • {s.class}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </form>
        </div>
      )}

      {/* Zoom Level Indicator */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md border border-[#2b2b2b]/20 shadow-sm">
        <p className="text-[8px] font-black uppercase tracking-[0.1em] text-slate-500">ZOOM: {zoom.toFixed(1)}x</p>
      </div>
      
      {showSelectionBadge && !selectedGeofence && (
        <div className="absolute bottom-4 right-4 z-[1000] bg-indigo-600 text-white px-4 py-2 rounded-xl border-3 border-slate-900 shadow-[4px_4px_0px_0px_#2b2b2b] text-[10px] font-black uppercase tracking-widest pointer-events-none animate-pulse">
          📍 Select Location on Map
        </div>
      )}

      {/* Focus User Button */}
      {userLocation && (
        <button
          onClick={() => mapRef.current?.flyTo([userLocation.lat, userLocation.lng], 18)}
          className="absolute top-4 right-4 z-[2000] p-1.5 md:px-2.5 md:py-2 bg-white flex items-center gap-2 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all active:bg-indigo-50 group"
        >
          <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center text-white text-[10px] shadow-[1.5px_1.5px_0px_0px_#2b2b2b] shrink-0">
            👤
          </div>
          <span className="hidden md:block text-[8px] font-black uppercase tracking-widest text-slate-900">Locate Me</span>
        </button>
      )}
    </div>
  )
}
