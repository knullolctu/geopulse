import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'

type NotificationType = 'success' | 'error' | 'info'

interface Notification {
  id: string
  message: string
  type: NotificationType
}

interface ConfirmOptions {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  type?: 'danger' | 'primary'
}

interface NotificationContextType {
  showNotif: (message: string, type: NotificationType) => void
  confirm: (options: ConfirmOptions) => Promise<boolean>
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifs, setNotifs] = useState<Notification[]>([])
  const [confirmState, setConfirmState] = useState<{
    options: ConfirmOptions
    resolve: (value: boolean) => void
  } | null>(null)

  const showNotif = useCallback((message: string, type: NotificationType) => {
    const id = Math.random().toString(36).substring(2, 9)
    setNotifs(prev => [...prev, { id, message, type }])
    
    setTimeout(() => {
      setNotifs(prev => prev.filter(n => n.id !== id))
    }, 5000)
  }, [])

  const removeNotif = (id: string) => {
    setNotifs(prev => prev.filter(n => n.id !== id))
  }

  const confirm = useCallback((options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setConfirmState({ options, resolve })
    })
  }, [])

  const handleConfirm = (value: boolean) => {
    if (confirmState) {
      confirmState.resolve(value)
      setConfirmState(null)
    }
  }

  return (
    <NotificationContext.Provider value={{ showNotif, confirm }}>
      {children}
      
      {/* NOTIFICATION CONTAINER */}
      <div className="fixed bottom-2 left-2 right-2 md:bottom-6 md:right-6 md:left-auto z-[9999] flex flex-col-reverse gap-2 md:gap-4 w-auto md:w-full md:max-w-[380px] pointer-events-none">
        {notifs.map((n, index) => (
          <div 
            key={n.id}
            className="pointer-events-auto group relative overflow-hidden mx-auto md:mx-0 w-full md:w-auto"
            style={{ 
              animation: window.innerWidth < 768 ? 'toast-in-mobile 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards' : 'toast-in-desktop 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
              zIndex: 1000 + index 
            }}
          >
            <div className={`
              relative p-2.5 md:p-4 rounded-[1rem] md:rounded-2xl border-2 md:border-4 border-[#2b2b2b] shadow-[4px_4px_0px_0px_#2b2b2b] md:shadow-[8px_8px_0px_0px_#2b2b2b] flex items-center md:items-start gap-3 md:gap-4 transition-transform hover:-translate-y-1
              ${n.type === 'success' ? 'bg-emerald-400' : n.type === 'error' ? 'bg-rose-400' : 'bg-sky-400'}
            `}>
              {/* ICON CIRCLE */}
              <div className="flex-shrink-0 w-7 h-7 md:w-12 md:h-12 bg-white rounded-lg md:rounded-xl border-2 md:border-3 border-[#2b2b2b] flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_#2b2b2b] md:shadow-[3px_3px_0px_0px_#2b2b2b]">
                {n.type === 'success' && <CheckCircle className="w-3.5 h-3.5 md:w-6 md:h-6 text-emerald-600 stroke-[3]" />}
                {n.type === 'error' && <AlertCircle className="w-3.5 h-3.5 md:w-6 md:h-6 text-rose-600 stroke-[3]" />}
                {n.type === 'info' && <Info className="w-3.5 h-3.5 md:w-6 md:h-6 text-sky-600 stroke-[3]" />}
              </div>

              {/* CONTENT */}
              <div className="flex-1 pr-5">
                <div className="hidden md:block text-[10px] font-black uppercase opacity-60 tracking-wider mb-0.5">
                  {n.type === 'success' ? 'System Success' : n.type === 'error' ? 'System Error' : 'Notification'}
                </div>
                <div className="text-[10px] md:text-[13px] font-black uppercase tracking-tight text-slate-900 leading-[1.1] md:leading-[1.3]">
                  {n.message}
                </div>
              </div>

              {/* CLOSE BUTTON */}
              <button 
                onClick={() => removeNotif(n.id)}
                className="absolute top-1.5 md:top-3 right-1.5 md:right-3 p-1 rounded-lg hover:bg-black/10 transition-colors pointer-events-auto"
              >
                <X className="w-3 h-3 md:w-4 md:h-4 text-[#2b2b2b] stroke-[4]" />
              </button>

              {/* PROGRESS BAR */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 md:h-1.5 bg-black/10">
                <div 
                    className="h-full bg-black/20"
                    style={{ 
                        animation: 'progress 5s linear forwards',
                        transformOrigin: 'left'
                    }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* REUSABLE CONFIRM MODAL */}
      {confirmState && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[10000] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="w-full max-w-sm p-8 md:p-10 bg-white border-4 md:border-6 border-slate-900 shadow-[10px_10px_0px_0px_#2b2b2b] md:shadow-[16px_16px_0px_0px_#2b2b2b] animate-in zoom-in-95 duration-500 rounded-3xl">
            <div className="text-center">
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl border-3 md:border-4 border-slate-900 shadow-[4px_4px_0px_0px_#2b2b2b] md:shadow-[6px_6px_0px_0px_#2b2b2b] flex items-center justify-center text-3xl md:text-4xl mx-auto mb-6 md:mb-8 ${
                confirmState.options.type === 'danger' ? 'bg-rose-100 text-rose-600' : 'bg-indigo-100 text-indigo-600'
              }`}>
                {confirmState.options.type === 'danger' ? '!' : '?'}
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tighter mb-3 leading-none">
                {confirmState.options.title}
              </h3>
              <p className="text-[11px] md:text-[13px] font-bold text-slate-500 uppercase tracking-tight mb-8 md:mb-10 leading-relaxed">
                {confirmState.options.message}
              </p>
              
              <div className="grid grid-cols-2 gap-4 md:gap-5">
                <button 
                  onClick={() => handleConfirm(false)}
                  className="py-3.5 md:py-4 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-widest border-2 md:border-3 border-slate-900 shadow-[4px_4px_0px_0px_#2b2b2b] md:shadow-[6px_6px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all"
                >
                  {confirmState.options.cancelText || 'Cancel'}
                </button>
                <button 
                  onClick={() => handleConfirm(true)}
                  className={`py-3.5 md:py-4 text-white rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-widest border-2 md:border-3 border-slate-900 shadow-[4px_4px_0px_0px_#2b2b2b] md:shadow-[6px_6px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all ${
                    confirmState.options.type === 'danger' ? 'bg-rose-500' : 'bg-indigo-600'
                  }`}
                >
                  {confirmState.options.confirmText || 'Confirm'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes toast-in-desktop {
          from { transform: translateX(100%) scale(0.8); opacity: 0; filter: blur(4px); }
          to { transform: translateX(0) scale(1); opacity: 1; filter: blur(0); }
        }
        @keyframes toast-in-mobile {
          from { transform: translateY(100%) scale(0.9); opacity: 0; filter: blur(4px); }
          to { transform: translateY(0) scale(1); opacity: 1; filter: blur(0); }
        }
        @keyframes progress {
          from { transform: scaleX(1); }
          to { transform: scaleX(0); }
        }
      `}</style>
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}
