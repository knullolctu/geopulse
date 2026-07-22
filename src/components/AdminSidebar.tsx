import React from 'react'
import { Link } from '@tanstack/react-router'
import { THEME } from '../theme'

const navItems = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: '📊' },
  { label: 'Geofences', to: '/admin/geofences', icon: '📍' },
  { label: 'Attendance Logs', to: '/admin/logs', icon: '📜' },
  { label: 'Users', to: '/admin/users', icon: '👥' },
  { label: 'Organization', to: '/admin/organization', icon: '🏢' },

  { label: 'Settings', to: '/admin/settings', icon: '⚙️' },
]

interface AdminSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[1100] lg:hidden backdrop-blur-sm transition-opacity animate-in fade-in"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 lg:sticky lg:top-0 z-[1200]
          w-72 h-screen flex flex-col shadow-xl overflow-hidden 
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{ background: THEME.colors.adminAccent, borderRight: `4px solid ${THEME.colors.darkBorder}` }}
      >
        <div className="p-6 flex items-center justify-between">
          <Link to="/admin/dashboard" className="flex items-center gap-3 group">
            <div
              className="w-12 h-12 flex items-center justify-center shadow-[4px_4px_0px_0px_#2b2b2b] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all overflow-hidden"
              style={{ background: '#fff', border: `3px solid ${THEME.colors.darkBorder}`, borderRadius: '50%' }}
            >
              <img src="/logo.png" alt="GeoPulse Logo" className="w-10 h-10 object-contain" />
            </div>
            <span className="font-black text-2xl tracking-tighter" style={{ color: THEME.colors.text }}>GEOPULSE</span>
          </Link>

          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden w-10 h-10 flex items-center justify-center font-bold text-xl rounded-xl border-3 border-[#2b2b2b] bg-white shadow-[2px_2px_0px_0px_#2b2b2b]"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-3 overflow-y-auto">
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-3 mb-2">System</div>
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => {
                if (window.innerWidth < 1024) onClose()
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-bold border-[3px]"
              style={{
                background: 'rgba(255, 255, 255, 0.4)',
                borderColor: THEME.colors.darkBorder,
                boxShadow: '4px 4px 0px 0px #2b2b2b'
              }}
              activeProps={{
                style: {
                  background: '#fff',
                  borderColor: THEME.colors.darkBorder,
                  boxShadow: 'none',
                  transform: 'translate(4px, 4px)'
                },
              }}
              inactiveProps={{
                className: "hover:bg-white hover:border-[#2b2b2b] hover:shadow-[5px_5px_0px_0px_rgba(43,43,43,0.5)] hover:-translate-x-0.5 hover:-translate-y-0.5"
              }}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="tracking-tight">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center px-4">
            v1.0.4 • Beta
          </div>
        </div>
      </aside>
    </>
  )
}
