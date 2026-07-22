import React from 'react'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import AdminSidebar from '../components/AdminSidebar'
import ProfileButton from '../components/ProfileButton'
import NotificationBell from '../components/NotificationBell'
import { THEME } from '../theme'
import { getSessionFn } from '../lib/authentication'

export const Route = createFileRoute('/admin')({
  beforeLoad: async () => {
    const user = await getSessionFn()
    if (!user || user.role !== 'Admin') {
      throw redirect({ to: '/login' })
    }
    return { user }
  },
  head: () => ({
    meta: [
      {
        title: 'GeoPulse - Admin',
      },
    ],
  }),
  component: AdminLayout,
})

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

  return (
    <div className="flex min-h-screen bg-white">
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        <header 
          className="h-20 sticky top-0 z-[990] px-4 md:px-8 flex items-center justify-between gap-4"
          style={{ background: '#fff', borderBottom: `4px solid ${THEME.colors.darkBorder}` }}
        >
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden w-11 h-11 flex items-center justify-center bg-white border-3 border-[#2b2b2b] rounded-xl shadow-[3px_3px_0px_0px_#2b2b2b] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all shrink-0"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center gap-3">
              {/* MOBILE BRANDING (Visible only when Sidebar is hidden) */}
              <div className="flex lg:hidden items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-[#2b2b2b] shadow-[3px_3px_0px_0px_#2b2b2b] overflow-hidden p-1 shrink-0">
                  <img src="/logo.png" alt="GeoPulse" className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-sm font-black text-slate-900 tracking-tighter leading-none uppercase">
                    GeoPulse
                  </h1>
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
                    Admin Portal
                  </span>
                </div>
              </div>

              {/* DESKTOP CONTEXT (Visible when Sidebar is showing) */}
              <div className="hidden lg:flex flex-col">
                <h1 className="text-xl font-black text-slate-900 tracking-tighter leading-none uppercase">
                  Administration
                </h1>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1.5">
                  System Control Center
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <NotificationBell />
            <ProfileButton />
          </div>
        </header>
        <main className="p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
