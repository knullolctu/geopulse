import React, { useEffect, useRef, useState } from 'react'

export default function DevCreditButton() {
  const [open, setOpen] = useState(false)
  const bubbleRef = useRef<HTMLDivElement | null>(null)
  const btnRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node
      if (
        open &&
        bubbleRef.current &&
        btnRef.current &&
        !bubbleRef.current.contains(target) &&
        !btnRef.current.contains(target)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [open])

  return (
    <>
      {open && (
        <div
          ref={bubbleRef}
          className="dev-credit-bubble"
          style={{
            position: 'fixed',
            right: 16,
            bottom: 80,
            zIndex: 10000,
            maxWidth: 340,
            transformOrigin: 'bottom right',
            animation: 'pop 160ms ease-out',
          }}
        >
          <div
            style={{
              position: 'relative',
              background: '#fff8c4',
              border: '3px solid #2b2b2b',
              borderRadius: 12,
              padding: '12px 14px',
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.18)',
              fontFamily: '"Comic Sans MS", "Comic Neue", sans-serif',
              color: '#0b1220',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ background: '#fff', border: '2px solid #2b2b2b', borderRadius: '50%', width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '2px 2px 0px #2b2b2b', overflow: 'hidden', padding: 2 }}>
                <img src="/logo.png" alt="GeoPulse Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} />
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.02em', lineHeight: 1 }}>GeoPulse</div>
                <div style={{ fontSize: 11, opacity: 0.7, fontWeight: 800, marginTop: 4, textTransform: 'uppercase' }}>Attendance Platform</div>
              </div>
            </div>

            <div style={{ fontSize: 13, lineHeight: 1.5, marginBottom: 16, fontWeight: 600, color: '#333' }}>
              A precision geofencing attendance app designed to make tracking seamless and reliable.
            </div>

            <div style={{ borderTop: '3px dashed #2b2b2b', paddingTop: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, background: '#2b2b2b', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, boxShadow: '2px 2px 0px rgba(0,0,0,0.2)' }}>
                  💻
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 800, color: '#666', textTransform: 'uppercase' }}>Developed by</div>
                  <div style={{ fontSize: 14, fontWeight: 900 }}>Knull | kevingesmanlibrea@gmail.com</div>
                </div>
              </div>

              <div style={{ marginTop: 14 }}>
                <a
                  href="mailto:kevingesmanlibrea@gmail.com"
                  className="contact-btn"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    background: '#0ea5e9',
                    color: '#fff',
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '3px solid #2b2b2b',
                    textDecoration: 'none',
                    fontWeight: 800,
                    fontSize: 13,
                    boxShadow: '3px 3px 0px #2b2b2b',
                    transition: 'all 0.15s ease'
                  }}
                >
                  ✉️ Let's Connect
                </a>
              </div>
            </div>

            {/* speech tail */}
            <svg
              width="36"
              height="26"
              viewBox="0 0 36 26"
              style={{ position: 'absolute', right: 10, bottom: -18 }}
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path d="M0 26 C12 6 24 6 36 26 L18 18 Z" fill="#fff8c4" stroke="#2b2b2b" strokeWidth="3" />
            </svg>
          </div>
        </div>
      )}

      <button
        ref={btnRef}
        onClick={() => setOpen((s) => !s)}
        title="App credits"
        aria-label="Open credits"
        className={open ? 'dev-credit-btn open' : 'dev-credit-btn'}
        style={{
          position: 'fixed',
          right: 16,
          bottom: 16,
          zIndex: 9999,
          background: '#fff8c4',
          color: '#0b1220',
          padding: '8px 14px',
          borderRadius: 9999,
          border: '3px solid #2b2b2b',
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.18)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          textDecoration: 'none',
          fontSize: 13,
          lineHeight: '1',
          cursor: 'pointer',
          fontFamily: '"Comic Sans MS", "Comic Neue", sans-serif',
          fontWeight: 800,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <circle cx="18" cy="18" r="14" stroke="#2b2b2b" strokeWidth="3" fill="#fff8c4" />
          <path className="arrow" d="M18 12v6" stroke="#2b2b2b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ fontWeight: 800 }}>Knull</span>
      </button>

      <style>{`
        .dev-credit-btn { transition: transform 160ms ease, box-shadow 160ms ease; animation: floatBtn 3s ease-in-out infinite; }
        .dev-credit-btn:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 14px 36px rgba(15,23,42,0.22); animation-play-state: paused; }
        .dev-credit-btn.open { animation: none; }
        .dev-credit-btn svg .arrow { transition: transform 220ms ease; transform-origin: center; }
        .dev-credit-btn.open svg .arrow { transform: translateY(-3px) rotate(-20deg); }
        .contact-btn:hover { transform: translate(-2px, -2px); box-shadow: 5px 5px 0px #2b2b2b !important; }
        .contact-btn:active { transform: translate(1px, 1px); box-shadow: 1px 1px 0px #2b2b2b !important; }
      `}</style>

      <style>{`
        @media (max-width: 640px) {
          .dev-credit-btn { padding: 12px 16px !important; right: 12px !important; bottom: 12px !important; }
          .dev-credit-bubble { right: 8px !important; bottom: 84px !important; max-width: 300px !important; }
        }
      `}</style>

      <style>{`
        @keyframes pop { from { transform: scale(0.96) translateY(6px); opacity: 0 } to { transform: scale(1) translateY(0); opacity: 1 } }
        @keyframes floatBtn {
          0% { transform: translateY(0px); box-shadow: 0 10px 30px rgba(15, 23, 42, 0.18); }
          50% { transform: translateY(-6px); box-shadow: 0 15px 35px rgba(15, 23, 42, 0.22); }
          100% { transform: translateY(0px); box-shadow: 0 10px 30px rgba(15, 23, 42, 0.18); }
        }
      `}</style>
    </>
  )
}
