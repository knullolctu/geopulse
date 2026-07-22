import React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import Header from '../components/Header'
import { THEME } from '../theme'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      {
        title: 'GeoPulse - Advanced Geofence Attendance',
      },
    ],
  }),
  component: Home,
})

function Home() {
  return (
    <div className="min-h-screen text-slate-900 overflow-x-hidden relative" style={{ background: THEME.colors.comicBg }}>
      {/* BACKGROUND TOPOGRAPHY PATTERN */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 100 C 20 80, 40 80, 60 100 S 100 120, 120 100 S 160 80, 180 100 S 200 120, 220 100' fill='none' stroke='%23000' stroke-width='2'/%3E%3Cpath d='M0 150 C 20 130, 40 130, 60 150 S 100 170, 120 150 S 160 130, 180 150 S 200 170, 220 150' fill='none' stroke='%23000' stroke-width='2'/%3E%3Cpath d='M0 50 C 20 30, 40 30, 60 50 S 100 70, 120 50 S 160 30, 180 50 S 200 70, 220 50' fill='none' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E")` }} />

      <Header />

      <main className="relative z-10">
        {/* 1. HERO SECTION - COMIC PANEL STYLE */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-4 border-dark-border shadow-[4px_4px_0px_0px_#2b2b2b] rounded-xl mb-8 -rotate-2">
                  <div className="relative w-3 h-3">
                    <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
                    <span className="relative block w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[12px] font-black uppercase tracking-widest text-slate-900">Status: Operational</span>
                </div>

                <h1 className="text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-slate-900 mb-10 drop-shadow-[6px_6px_0px_#fff]">
                  Location-Based <br />
                  <span className="text-amber-500 underline decoration-8 underline-offset-8">Verification</span>
                </h1>

                <p className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight leading-none max-w-xl mb-12">
                  High-precision geofence tracking. <br />
                  <span className="bg-white px-2 py-1 border-2 border-dark-border inline-block mt-2 rotate-1 italic">Eliminate manual attendance errors.</span>
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <Link
                    to="/register"
                    className="w-full sm:w-auto px-12 py-6 bg-amber-400 text-slate-900 rounded-2xl font-black uppercase text-lg tracking-[0.2em] border-4 border-dark-border shadow-[10px_10px_0px_0px_#2b2b2b] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-center"
                  >
                    Get Started
                  </Link>
                </div>

              </div>

              <div className="relative">
                {/* Massive Circular Beating Logo */}
                <div className="relative z-10 flex items-center justify-center py-24">
                  <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes heartbeat {
                      0% { transform: scale(1); }
                      10% { transform: scale(1.08); }
                      20% { transform: scale(1); }
                      30% { transform: scale(1.08); }
                      40% { transform: scale(1); }
                      100% { transform: scale(1); }
                    }
                    @keyframes ping-ripple-1 {
                      0% { transform: scale(1); opacity: 0.2; }
                      15% { transform: scale(1.4); opacity: 0; }
                      16% { transform: scale(1); opacity: 0; }
                      20% { transform: scale(1); opacity: 0.2; }
                      35% { transform: scale(1.4); opacity: 0; }
                      36%, 100% { transform: scale(1); opacity: 0; }
                    }
                    @keyframes ping-ripple-2 {
                      0%, 4% { transform: scale(1); opacity: 0; }
                      5% { transform: scale(1); opacity: 0.15; }
                      20% { transform: scale(1.6); opacity: 0; }
                      21%, 24% { transform: scale(1); opacity: 0; }
                      25% { transform: scale(1); opacity: 0.15; }
                      40% { transform: scale(1.6); opacity: 0; }
                      41%, 100% { transform: scale(1); opacity: 0; }
                    }
                    .animate-heartbeat {
                      animation: heartbeat 4s infinite;
                    }
                    .animate-ripple-1 {
                      animation: ping-ripple-1 4s infinite;
                    }
                    .animate-ripple-2 {
                      animation: ping-ripple-2 4s infinite;
                    }
                  `}} />

                  {/* Perfectly Centered Circular Pulse Rings - Propagating Wave */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center -z-10">
                    <div className="w-[120%] aspect-square border-4 border-dark-border rounded-full animate-ripple-1 absolute" />
                    <div className="w-[150%] aspect-square border-4 border-dark-border rounded-full animate-ripple-2 absolute" />
                  </div>

                  <div className="relative w-72 h-72 lg:w-96 lg:h-96 flex items-center justify-center transition-all duration-500 hover:scale-105 animate-heartbeat">
                    {/* The Border Ring (Behind) */}
                    <div className="absolute inset-8 rounded-full border-[12px] border-dark-border bg-white shadow-[24px_24px_0px_0px_#2b2b2b]" />

                    {/* The Logo (In Front) */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none p-4">
                      <img
                        src="/logo.png"
                        alt="GeoPulse Logo"
                        className="w-full h-full object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.3)]"
                      />
                    </div>

                    {/* Blocky Neobrutalist Verified Mark - Fixed Shadow */}
                    <div className="absolute bottom-4 right-4 z-30 pointer-events-auto group/v animate-bounce">
                      <svg viewBox="0 0 24 24" className="w-24 h-24 text-indigo-600 fill-current drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] stroke-slate-900 stroke-[1px]">
                        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                      </svg>
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg opacity-0 group-hover/v:opacity-100 transition-opacity whitespace-nowrap border-2 border-dark-border shadow-lg">
                        Identity Authenticated
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. LIVE PULSE BAR - HIGH CONTRAST DARK */}
        <div className="bg-slate-900 py-8 border-y-8 border-dark-border shadow-[0_12px_0px_0px_rgba(0,0,0,0.1)] overflow-hidden relative">
          {/* WAVE DECORATION */}
          <div className="absolute inset-0 opacity-10 flex items-center">
            <svg width="100%" height="40" viewBox="0 0 1000 40" preserveAspectRatio="none">
              <path d="M0,20 Q25,0 50,20 T100,20 T150,20 T200,20 T250,20 T300,20 T350,20 T400,20 T450,20 T500,20 T550,20 T600,20 T650,20 T700,20 T750,20 T800,20 T850,20 T900,20 T950,20 T1000,20" fill="none" stroke="white" strokeWidth="4" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-6 whitespace-nowrap relative z-10">
            <div className="flex animate-marquee items-center gap-16">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-16">
                  {['Location Auditing', 'Boundary Control', 'Secure Protocols', 'Offline Reliability'].map((s, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-4 h-4 bg-amber-400 rotate-45 animate-pulse" />
                      <div className="text-2xl font-black uppercase tracking-tighter text-white">
                        {s}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. CAPABILITIES - GRID LAYOUT */}
        <section id="capabilities" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <div>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-slate-900 leading-none">Capabilities</h2>
                <div className="h-4 w-48 bg-amber-400 mt-4 border-2 border-dark-border" />
              </div>
              <p className="text-xl font-black uppercase text-slate-500 max-w-sm leading-tight">
                Reliable tracking. <br />
                <span className="text-slate-900">Audit-ready verification.</span>
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <FeatureCard
                icon="📍"
                title="Geofencing"
                desc="Map-level boundary enforcement with 3D coordinate verification."
                color="bg-amber-400"
              />
              <FeatureCard
                icon="📶"
                title="Data Integrity"
                desc="Proprietary protocols ensure high-availability data consistency."
                color="bg-emerald-400"
              />
              <FeatureCard
                icon="📡"
                title="Live Monitoring"
                desc="Comprehensive visibility of active personnel across all geofenced zones."
                color="bg-slate-900 text-white"
              />
            </div>
          </div>
        </section>

        {/* 4. FINAL CTA - COMIC SPLASH */}
        <section className="py-32 px-6 bg-white border-t-8 border-dark-border">
          <div className="max-w-5xl mx-auto text-center relative">
            <div className="absolute -top-10 left-10 text-6xl opacity-10">🌍</div>
            <div className="absolute -bottom-10 right-10 text-6xl opacity-10">📡</div>

            <h2 className="text-6xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.8] mb-12 text-slate-900">
              Get <br />
              <span className="text-amber-500 underline decoration-[12px] underline-offset-8">Started</span>
            </h2>
            <Link
              to="/register"
              className="inline-flex items-center gap-6 px-16 py-8 bg-amber-400 text-slate-900 rounded-[2.5rem] font-black uppercase text-2xl tracking-[0.2em] border-6 border-dark-border shadow-[16px_16px_0px_0px_#2b2b2b] hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all"
            >
              Get Started Now 🚀
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 py-16 px-6 border-t-[12px] border-dark-border">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <div className="text-4xl font-black text-white uppercase tracking-tighter mb-4">GeoPulse</div>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest max-w-xs">
              Next-gen attendance software. <br />
              The global standard for location verification.
            </p>
          </div>
          <div className="md:text-right">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              © 2026 GeoPulse. All rights reserved. <br />
              <span className="text-white">Developed by Knull</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, desc, color }: { icon: string; title: string; desc: string; color: string }) {
  return (
    <div className="relative group">
      <div className={`p-10 bg-white border-6 border-dark-border rounded-[3rem] shadow-[12px_12px_0px_0px_#2b2b2b] group-hover:translate-x-2 group-hover:translate-y-2 group-hover:shadow-none transition-all h-full`}>
        <div className={`w-20 h-20 rounded-2xl ${color} border-4 border-dark-border flex items-center justify-center text-4xl mb-8 -rotate-6 group-hover:rotate-0 transition-all shadow-[6px_6px_0px_0px_#2b2b2b]`}>
          {icon}
        </div>
        <h3 className="text-3xl font-black uppercase tracking-tight text-slate-900 mb-4">{title}</h3>
        <p className="text-slate-900 font-bold text-lg leading-snug uppercase tracking-tight opacity-70">{desc}</p>
      </div>
    </div>
  )
}
