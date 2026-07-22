import React, { useEffect, useState } from 'react'
import { createFileRoute, useNavigate, Link, redirect } from '@tanstack/react-router'
import Card from '../components/Card'
import { clientGetSession } from '../lib/client-auth'
import { getCategoriesByOrgCodeFn, cancelPendingOrgRequestFn } from '../lib/queries'
import { useNotification } from '../components/Notification'
import ProfileButton from '../components/ProfileButton'
import THEME from '../theme'
import { Key, ShieldCheck, UserCheck, X, ArrowRight, ArrowLeft, CheckCircle2, Building2 } from 'lucide-react'

export const Route = createFileRoute('/onboard')({
  beforeLoad: async () => {
    // Proactive check on reload or navigation
    const session = await clientGetSession()
    
    // 1. If not logged in, go to login
    if (!session) {
      throw redirect({ to: '/login' })
    }

    // 2. If already has organization, redirect to appropriate portal
    if (session.orgCode) {
      if (session.role === 'Admin') throw redirect({ to: '/admin' })
      if (session.role === 'Client') throw redirect({ to: '/client/dashboard' })
      if (session.role === 'Attendee') throw redirect({ to: '/attendee/dashboard' })
      
      // Fallback for cases where orgCode exists but role is unassigned/other
      throw redirect({ to: '/' })
    }

    // 3. For Admins hit onboarding accidentally, send them back to system control
    if (session.role === 'Admin') {
      throw redirect({ to: '/admin' })
    }

    return { session }
  },
  component: OnboardPage 
})

// ─── Multi-step Modal ──────────────────────────────────────────────────────────
type ModalStep = 0 | 1 | 2 // 0=closed, 1=details, 2=success

interface OrgModalProps {
  step: ModalStep
  orgName: string
  orgDesc: string
  isCreating: boolean
  onClose: () => void
  onOrgNameChange: (v: string) => void
  onOrgDescChange: (v: string) => void
  onNext: () => void
  onBack: () => void
  onSubmit: () => void
}

function OrgModal({
  step,
  orgName,
  orgDesc,
  isCreating,
  onClose,
  onOrgNameChange,
  onOrgDescChange,
  onNext,
  onBack,
  onSubmit,
}: OrgModalProps) {
  if (step === 0) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="w-full max-w-lg bg-white border-4 border-[#2b2b2b] shadow-[12px_12px_0px_0px_#2b2b2b] rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="relative bg-emerald-600 px-6 py-5 flex items-center justify-between">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="relative z-10">
            <div className="text-[9px] font-black uppercase tracking-[0.25em] text-emerald-100 mb-1">
              Register Organization
            </div>
            <div className="text-white font-black text-lg uppercase tracking-tight leading-none">
              {step === 1 ? 'Organization Details' : 'Request Submitted'}
            </div>
          </div>
          <button
            onClick={onClose}
            className="relative z-10 w-9 h-9 rounded-xl border-2 border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 pt-5 flex items-center gap-3">
          {[1, 2].map((s) => (
            <React.Fragment key={s}>
              <div className={`flex items-center gap-2 ${step >= s ? 'opacity-100' : 'opacity-30'}`}>
                <div className={`w-7 h-7 rounded-full border-2 border-[#2b2b2b] flex items-center justify-center text-xs font-black
                  ${step > s ? 'bg-emerald-600 text-white border-emerald-600' : step === s ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                  {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 hidden sm:block">
                  {s === 1 ? 'Details' : 'Confirm'}
                </span>
              </div>
              {s < 2 && <div className={`flex-1 h-0.5 rounded-full transition-colors ${step > s ? 'bg-emerald-500' : 'bg-slate-200'}`} />}
            </React.Fragment>
          ))}
        </div>

        {/* Modal Body */}
        <div className="px-6 py-6">
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Organization Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="org-name-input"
                  value={orgName}
                  onChange={(e) => onOrgNameChange(e.target.value)}
                  placeholder="e.g. Acme Corporation"
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#2b2b2b] bg-slate-50 font-bold focus:bg-white focus:ring-4 focus:ring-emerald-100 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Short Description <span className="text-slate-400">(Optional)</span>
                </label>
                <textarea
                  id="org-desc-input"
                  value={orgDesc}
                  onChange={(e) => onOrgDescChange(e.target.value)}
                  placeholder="Briefly describe your organization's purpose..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#2b2b2b] bg-slate-50 font-bold focus:bg-white focus:ring-4 focus:ring-emerald-100 transition-all outline-none resize-none"
                />
              </div>
              <div className="p-3 bg-amber-50 border-2 border-amber-200 rounded-xl">
                <p className="text-[10px] font-bold text-amber-700 uppercase tracking-widest leading-relaxed">
                  ⚠ Your request will be reviewed by a system administrator before an organization code is assigned.
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300 text-center py-4">
              <div className="w-20 h-20 rounded-full bg-emerald-100 border-4 border-emerald-500 flex items-center justify-center mx-auto shadow-[4px_4px_0px_0px_#059669]">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <div>
                <div className="text-2xl font-black uppercase tracking-tight text-slate-900">Request Sent!</div>
                <p className="text-sm font-bold text-slate-500 mt-2 leading-relaxed">
                  Your request for <span className="text-emerald-700 font-black">"{orgName}"</span> {orgDesc ? 'with the following details ' : ''}has been submitted.
                </p>
                {orgDesc && (
                  <div className="mt-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-[11px] font-bold text-emerald-700 italic">
                    "{orgDesc}"
                  </div>
                )}
                <p className="text-xs font-bold text-slate-400 mt-2">
                  An admin will review and approve it shortly.
                </p>
              </div>
              <div className="flex flex-col gap-2 text-left p-4 bg-slate-50 rounded-xl border-2 border-slate-200">
                <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">What happens next?</div>
                {['Admin reviews your organization request', 'Your org code gets activated', 'You gain full access to GeoPulse'].map((t, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 text-[9px] font-black shrink-0">{i + 1}</span>
                    {t}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 pb-6 flex gap-3 justify-between">
          {step === 1 ? (
            <>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border-2 border-[#2b2b2b] bg-white text-xs font-black uppercase tracking-widest text-slate-700 hover:bg-slate-50 shadow-[3px_3px_0px_0px_#2b2b2b] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={onSubmit}
                disabled={!orgName || isCreating}
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-widest border-2 border-transparent hover:bg-emerald-700 shadow-[4px_4px_0px_0px_#2b2b2b] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-40 disabled:pointer-events-none"
              >
                {isCreating ? (
                  <>
                    <div className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>Submit Request <ArrowRight className="w-3.5 h-3.5" /></>
                )}
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full px-5 py-2.5 rounded-xl border-2 border-[#2b2b2b] bg-emerald-600 text-white text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_#2b2b2b] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
function OnboardPage() {
  const navigate = useNavigate()
  const { showNotif } = useNotification()
  const { session: initialSession } = Route.useRouteContext() as { session: any }
  const [session, setSession] = useState<any>(initialSession)
  const [loading, setLoading] = useState(!initialSession)

  // Join org state
  const [joinCode, setJoinCode] = useState('')
  const [joinCategory, setJoinCategory] = useState('')
  const [categories, setCategories] = useState<any[]>([])
  const [isJoining, setIsJoining] = useState(false)

  // Create org modal state
  const [modalStep, setModalStep] = useState<ModalStep>(0)
  const [orgName, setOrgName] = useState('')
  const [orgDesc, setOrgDesc] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    // If for some reason beforeLoad data is missing, fetch it
    if (!initialSession) {
      clientGetSession().then(s => {
        setSession(s)
        setLoading(false)
      })
    }
  }, [initialSession])

  useEffect(() => {
    const fetchCats = async () => {
      if (!joinCode) { setCategories([]); setJoinCategory(''); return }
      try {
        const res = await getCategoriesByOrgCodeFn({ data: joinCode })
        setCategories(res || [])
      } catch { setCategories([]) }
    }
    const t = setTimeout(fetchCats, 300)
    return () => clearTimeout(t)
  }, [joinCode])

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!joinCode) return showNotif('Enter organization code', 'error')
    setIsJoining(true)
    try {
      await joinOrgFn({ data: { orgCode: joinCode, categoryId: joinCategory || undefined } })
      showNotif('Successfully joined organization!', 'success')
      const freshSession = await clientGetSession()
      if (freshSession?.role === 'Client') navigate({ to: '/client/dashboard' })
      else navigate({ to: '/attendee/dashboard' })
    } catch (err: any) {
      showNotif(err?.message || 'Failed to join organization', 'error')
    } finally {
      setIsJoining(false)
    }
  }

  const handleSubmitCreate = async () => {
    if (!orgName) return showNotif('Please provide organization name', 'error')
    setIsCreating(true)
    try {
      await createOrgAndJoinFn({ data: { name: orgName, description: orgDesc } })
      setModalStep(2)
      // Refresh session to show pending state on the main page
      const freshSession = await clientGetSession()
      setSession(freshSession)
    } catch (err: any) {
      showNotif(err?.message || 'Failed to request organization', 'error')
    } finally {
      setIsCreating(false)
    }
  }

  const [isCancelling, setIsCancelling] = useState(false)
  const handleCancelRequest = async () => {
    if (!window.confirm('Are you sure you want to cancel your organization request?')) return
    setIsCancelling(true)
    try {
      await cancelPendingOrgRequestFn()
      showNotif('Request cancelled successfully', 'success')
      const s = await clientGetSession()
      setSession(s)
    } catch (err: any) {
      showNotif(err?.message || 'Failed to cancel request', 'error')
    } finally {
      setIsCancelling(false)
    }
  }

  const handleCloseModal = () => {
    setModalStep(0)
    if (!isCreating) { setOrgName(''); setOrgDesc('') }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
          <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 animate-pulse">
            Checking Account...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/30">
      {/* Org Registration Modal */}
      <OrgModal
        step={modalStep}
        orgName={orgName}
        orgDesc={orgDesc}
        isCreating={isCreating}
        onClose={handleCloseModal}
        onOrgNameChange={setOrgName}
        onOrgDescChange={setOrgDesc}
        onNext={() => setModalStep(2)}
        onBack={() => setModalStep(1)}
        onSubmit={handleSubmitCreate}
      />

      {/* Sticky Header Bar */}
      <header
        className="h-20 sticky top-0 z-[990] px-4 md:px-8 flex items-center justify-between gap-4 bg-white"
        style={{ borderBottom: `4px solid ${THEME.colors.darkBorder}` }}
      >
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-[#2b2b2b] shadow-[3px_3px_0px_0px_#2b2b2b] overflow-hidden p-1 shrink-0 transition-transform group-hover:scale-105">
              <img src="/logo.png" alt="GeoPulse" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-base font-black text-slate-900 tracking-tighter leading-none uppercase">
                GeoPulse
              </h1>
              <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest mt-0.5">
                Onboarding Node
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <ProfileButton />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">

        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-[2rem] border-4 border-[#2b2b2b] shadow-[8px_8px_0px_0px_#2b2b2b] bg-slate-900 text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-indigo-500/40 transition-all duration-700 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 group-hover:bg-rose-500/30 transition-all duration-700 pointer-events-none" />

          <div className="relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20 mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-amber-100">Setup Required</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
              Welcome to GeoPulse,<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-rose-400">
                {session?.name?.split(' ')[0] ?? 'User'}
              </span>
            </h2>
            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs md:text-sm mt-4 flex items-center justify-center md:justify-start gap-3">
              <span>Account Type:</span>
              <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-white font-black">
                {session?.role === 'User' ? 'Unassigned' : (session?.role ?? 'Attendee')}
              </span>
            </p>
          </div>

          <div className="relative z-10 hidden md:block shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 relative">
              <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-2 border-4 border-rose-500/30 rounded-full animate-[spin_7s_linear_infinite_reverse]" />
              <div className="absolute inset-0 flex items-center justify-center text-6xl">📡</div>
            </div>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Action Columns */}
          <div className="lg:col-span-2 space-y-8">

            {/* Card 1: Join Existing Org */}
            <Card className="p-6 md:p-8 border-4 border-[#2b2b2b] shadow-[8px_8px_0px_0px_#2b2b2b] bg-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-500" />

              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl border-3 border-[#2b2b2b] bg-indigo-50 flex items-center justify-center text-2xl shadow-[3px_3px_0px_0px_#2b2b2b] shrink-0 font-black">
                  🔑
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tighter text-slate-900 leading-none">Join Existing Organization</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Connect using an invite code</p>
                </div>
              </div>

              <form onSubmit={handleJoin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Organization Code</label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      value={joinCode}
                      onChange={e => setJoinCode(e.target.value)}
                      placeholder="e.g. ORG-XXXXXX"
                      className="flex-1 px-4 py-3 rounded-xl border-2 border-[#2b2b2b] bg-slate-50 font-bold focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                    />
                    <button
                      type="submit"
                      disabled={isJoining || !joinCode}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest border-3 border-transparent hover:bg-white hover:text-indigo-600 hover:border-[#2b2b2b] transition-all shadow-[4px_4px_0px_0px_#2b2b2b] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 active:translate-y-1 active:translate-x-1 whitespace-nowrap disabled:opacity-40 disabled:pointer-events-none"
                    >
                      {isJoining ? 'Joining...' : 'Join Organization'}
                    </button>
                  </div>
                </div>

                {categories.length > 0 && (
                  <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Department / Category (Optional)</label>
                    <select
                      value={joinCategory}
                      onChange={e => setJoinCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#2b2b2b] bg-slate-50 font-bold focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all outline-none appearance-none cursor-pointer"
                    >
                      <option value="">Select Category</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                )}
              </form>
            </Card>

            {/* Card 2: Register New Org */}
            <Card className="p-6 md:p-8 border-4 border-[#2b2b2b] shadow-[8px_8px_0px_0px_#2b2b2b] bg-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-500" />

              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl border-3 border-[#2b2b2b] bg-emerald-50 flex items-center justify-center text-2xl shadow-[3px_3px_0px_0px_#2b2b2b] shrink-0 font-black">🏢</div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tighter text-slate-900 leading-none">Register New Organization</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                    {session?.pendingOrg ? 'Request Processing' : 'Apply to start a new organization node'}
                  </p>
                </div>
              </div>

              {session?.pendingOrg ? (
                <div className="p-5 bg-emerald-50 rounded-2xl border-3 border-emerald-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm">✓</div>
                      <div className="text-sm font-black uppercase tracking-tight text-emerald-900">Application Submitted</div>
                    </div>
                    <button
                      onClick={handleCancelRequest}
                      disabled={isCancelling}
                      className="text-[10px] font-black uppercase tracking-widest text-rose-600 hover:text-rose-800 transition-colors bg-white/50 px-3 py-1.5 rounded-lg border-2 border-rose-100 hover:border-rose-200 disabled:opacity-50"
                    >
                      {isCancelling ? '...' : 'Cancel Request'}
                    </button>
                  </div>
                  <p className="text-[10px] font-bold text-emerald-700 uppercase leading-relaxed">
                    You have requested to register <span className="underline decoration-2">"{session.pendingOrg.name}"</span>. 
                    {session.pendingOrg.description && <span className="block mt-1 italic text-emerald-600/70">"{session.pendingOrg.description}"</span>}
                    <br className="mt-2" />
                    A system administrator is currently reviewing your application. You will be promoted to Client once approved.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-sm font-bold text-slate-500 leading-relaxed mb-6">
                    Don't have an organization yet? Apply to register one. A system administrator will review your request and assign an organization code upon approval.
                  </p>

                  <button
                    id="open-register-org-modal"
                    onClick={() => setModalStep(1)}
                    className="flex items-center gap-3 w-full sm:w-auto px-6 py-3.5 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-widest border-2 border-[#2b2b2b] shadow-[5px_5px_0px_0px_#2b2b2b] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all group"
                  >
                    <Building2 className="w-4 h-4" />
                    Apply for Organization
                    <ArrowRight className="w-4 h-4 ml-auto sm:ml-0 group-hover:translate-x-1 transition-transform" />
                  </button>
                </>
              )}
            </Card>

          </div>

          {/* Sidebar Protocol Column */}
          <div className="space-y-8">
            <Card className="p-8 border-4 border-[#2b2b2b] shadow-[8px_8px_0px_0px_#2b2b2b] bg-indigo-50 relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 text-9xl opacity-[0.03] mix-blend-multiply group-hover:scale-110 transition-transform duration-700 pointer-events-none">⚡</div>
              <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-6 relative z-10 flex items-center gap-2">
                Setup Protocol
              </h3>

              <div className="space-y-6 relative z-10">
                {[
                  {
                    step: '01',
                    title: 'Account Authentication',
                    desc: 'Your active session must be associated with an organization to activate GeoPulse tracking capabilities.',
                    icon: <ShieldCheck className="w-5 h-5 text-indigo-600" />
                  },
                  {
                    step: '02',
                    title: 'Organization Association',
                    desc: "Enter your company's invite code to join instantly, or apply for a new organization and await activation.",
                    icon: <Key className="w-5 h-5 text-indigo-600" />
                  },
                  {
                    step: '03',
                    title: 'System Handshake',
                    desc: 'Once approved, your device synchronizes with coordinates for geofence validation.',
                    icon: <UserCheck className="w-5 h-5 text-indigo-600" />
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start pb-4 border-b border-indigo-200/50 last:border-0 last:pb-0">
                    <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#2b2b2b] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#2b2b2b] font-black text-xs text-indigo-600">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Step {item.step}</div>
                      <div className="text-xs font-black uppercase tracking-tight text-slate-900 mt-0.5">{item.title}</div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1.5 leading-normal">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

        </div>

      </main>
    </div>
  )
}
