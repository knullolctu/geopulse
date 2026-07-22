import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { THEME } from '../theme'
import Card from './Card'
import { clientGetSession, clientLogout } from '../lib/client-auth'
import { useNotification } from './Notification'

export default function ProfileButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { confirm } = useNotification()

  useEffect(() => {
    async function fetchUser() {
      const sessionUser = await clientGetSession()
      setUser(sessionUser)
    }
    fetchUser()
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    setIsOpen(false)
    const ok = await confirm({
      title: 'Sign Out?',
      message: 'Are you sure you want to log out of your session?',
      confirmText: 'Log Out',
      cancelText: 'Stay',
      type: 'danger'
    })

    if (ok) {
      await clientLogout()
      navigate({ to: '/login' })
    }
  }

  const firstName = user?.name ? user.name.split(' ')[0] : 'Guest'

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-10 md:h-12 px-4 md:px-5 flex items-center justify-center transition-all hover:translate-x-0.5 hover:translate-y-0.5 overflow-hidden group gap-2"
        style={{
          background: user?.role === 'Client' ? '#f0fdf4' : THEME.colors.adminAccent,
          border: `3px solid ${THEME.colors.darkBorder}`,
          borderRadius: '18px',
          boxShadow: isOpen ? 'none' : '2px 2px 0px 0px rgba(43,43,43,0.5)',
          transform: isOpen ? 'translate(1px, 1px)' : 'none'
        }}
      >
        <div className="font-black text-[10px] md:text-xs uppercase tracking-widest group-hover:scale-105 transition-transform text-slate-900">
          {firstName}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-4 w-60 z-[1001] animate-in fade-in zoom-in-95 duration-200 origin-top-right">
          <Card className="p-3 border-4 border-[#2b2b2b] shadow-[8px_8px_0px_0px_#2b2b2b] rounded-2xl bg-white flex flex-col gap-1">
            <div className="px-3 py-2 mb-1 border-b-2 border-slate-100">
              <p className="text-[10px] font-black text-slate-900 uppercase tracking-tight truncate">{user?.name || 'Guest User'}</p>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{user?.role || 'User'}</p>
            </div>

            {(!user?.role || user.role === 'Admin' || user.orgCode) && (
              <Link
                to={user?.role === 'Admin' ? '/admin/profile' : user?.role === 'Client' ? '/client/profile' : '/attendee/profile'}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 border-transparent hover:border-[#2b2b2b] hover:bg-slate-50 transition-all font-black text-[10px] uppercase tracking-widest"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-base">👤</span> Profile
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 border-transparent hover:border-rose-500 hover:bg-rose-50 text-rose-600 transition-all font-black text-[10px] uppercase tracking-widest text-left"
            >
              <span className="text-base">🚪</span> Logout
            </button>
          </Card>
        </div>
      )}
    </div>
  )
}
