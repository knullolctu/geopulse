import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from '@tanstack/react-router'
import { THEME } from '../theme'

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-[1000] bg-white border-b-4 border-dark-border shadow-[0_4px_0_0_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Text-Only Branding */}
          <Link to="/" className="flex flex-col group">
            <div className="text-4xl font-black uppercase tracking-tighter text-slate-900 leading-none drop-shadow-[4px_4px_0px_#fff]">GeoPulse</div>
            <div className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-500 mt-2 bg-slate-900 text-white px-3 py-1 inline-block rounded-sm self-start shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
              Geofence Based Attendance
            </div>
          </Link>

          {/* Desktop Nav - Removed */}
          <nav className="hidden md:flex items-center gap-10">
          </nav>

          {/* Auth Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="px-6 py-2.5 text-[12px] font-black uppercase tracking-widest text-slate-900 hover:opacity-70 transition-all font-bold"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-8 py-4 bg-amber-400 text-slate-900 rounded-2xl font-black uppercase text-[12px] tracking-widest border-4 border-dark-border shadow-[6px_6px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}

function MobileMenu() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = 'auto' }
    }
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-12 h-12 flex flex-col items-center justify-center gap-1.5 bg-white rounded-xl border-4 border-dark-border shadow-[4px_4px_0px_0px_#2b2b2b]"
      >
        <span className="w-6 h-1 bg-slate-900 rounded-full" />
        <span className="w-6 h-1 bg-slate-900 rounded-full" />
        <span className="w-6 h-1 bg-slate-900 rounded-full" />
      </button>

      {open && typeof document !== 'undefined' &&
        createPortal(
          <div className="fixed inset-0 z-[2000] animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-slate-900/60" onClick={() => setOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-[320px] bg-white border-l-8 border-dark-border p-8 animate-in slide-in-from-right duration-500">
              <div className="flex items-center justify-between mb-12">
                <div className="text-3xl font-black uppercase tracking-tighter">GeoPulse</div>
                <button onClick={() => setOpen(false)} className="text-2xl font-black p-3 border-4 border-dark-border rounded-xl shadow-[4px_4px_0px_0px_#2b2b2b]">✕</button>
              </div>

              <nav className="grid gap-8">
              </nav>

              <div className="mt-auto absolute bottom-8 left-8 right-8 grid gap-4">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="w-full py-5 text-center border-4 border-dark-border rounded-2xl text-lg font-black uppercase tracking-widest"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="w-full py-5 text-center bg-amber-400 text-slate-900 rounded-2xl border-4 border-dark-border text-lg font-black uppercase tracking-widest shadow-[8px_8px_0px_0px_#2b2b2b]"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
