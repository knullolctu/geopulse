/**
 * Client-side authentication for static GitHub Pages deployment.
 * Calls Supabase REST API directly from the browser — no server functions needed.
 */
import { supabase } from './supabase'

const SESSION_KEY = 'geopulse_session'

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(SESSION_KEY) || null
}

export function storeToken(token: string) {
  if (typeof window === 'undefined') return
  localStorage.setItem(SESSION_KEY, token)
  document.cookie = `${SESSION_KEY}=${token}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`
}

export function clearToken() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(SESSION_KEY)
  document.cookie = `${SESSION_KEY}=; path=/; max-age=0`
}

/** Simple hash for password verification (SHA-256 → hex) */
async function sha256(str: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

/** 
 * Register a new attendee directly via Supabase.
 * Uses SHA-256 hash (browser-native) — no bcryptjs needed.
 */
export async function clientRegister(data: {
  name: string
  email: string
  password: string
  birthDate?: string
  orgCode?: string
}): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if email already exists
    const { data: existing } = await supabase
      .from('attendee')
      .select('id')
      .eq('email', data.email.toLowerCase().trim())
      .maybeSingle()

    if (existing) {
      return { success: false, error: 'Email is already registered.' }
    }

    // Check org code if provided
    if (data.orgCode) {
      const { data: org } = await supabase
        .from('organization')
        .select('id')
        .eq('orgCode', data.orgCode)
        .maybeSingle()
      if (!org) return { success: false, error: 'Invalid organization code.' }
    }

    const passwordHash = await sha256(data.password)

    const payload = {
      id: crypto.randomUUID(),
      email: data.email.toLowerCase().trim(),
      name: data.name.trim(),
      passwordHash,
      birthDate: data.birthDate ? new Date(data.birthDate).toISOString() : null,
      orgCode: data.orgCode || null,
      categoryId: null,
      isVerified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const { error } = await supabase.from('attendee').insert([payload])
    if (error) throw new Error(error.message)

    return { success: true }
  } catch (err: any) {
    return { success: false, error: err?.message || 'Registration failed.' }
  }
}

/**
 * Login directly via Supabase — checks attendee, client, and admin tables.
 * Falls back to SHA-256 for passwords set via clientRegister.
 */
export async function clientLogin(email: string, password: string): Promise<{
  success: boolean
  user?: any
  token?: string
  error?: string
}> {
  try {
    const normalized = email.toLowerCase().trim()
    const sha = await sha256(password)

    // Try Attendee
    const { data: attendee } = await supabase
      .from('attendee')
      .select('*')
      .eq('email', normalized)
      .maybeSingle()

    if (attendee) {
      const match = attendee.passwordHash === sha
      if (!match) return { success: false, error: 'Invalid email or password.' }

      const token = crypto.randomUUID()
      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      await supabase.from('attendeesession').insert([{
        id: crypto.randomUUID(),
        attendeeId: attendee.id,
        token,
        expiresAt,
        createdAt: new Date().toISOString(),
      }])
      storeToken(token)
      return { success: true, user: { ...attendee, role: attendee.orgCode ? 'Attendee' : 'User' }, token }
    }

    // Try Client
    const { data: client } = await supabase
      .from('client')
      .select('*')
      .eq('email', normalized)
      .maybeSingle()

    if (client) {
      const match = client.passwordHash === sha
      if (!match) return { success: false, error: 'Invalid email or password.' }

      const token = crypto.randomUUID()
      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      await supabase.from('clientsession').insert([{
        id: crypto.randomUUID(),
        clientId: client.id,
        token,
        expiresAt,
        createdAt: new Date().toISOString(),
      }])
      storeToken(token)
      return { success: true, user: { ...client, role: 'Client' }, token }
    }

    // Try Admin
    const { data: admin } = await supabase
      .from('admin')
      .select('*')
      .eq('email', normalized)
      .maybeSingle()

    if (admin) {
      const match = admin.passwordHash === sha
      if (!match) return { success: false, error: 'Invalid email or password.' }

      const token = crypto.randomUUID()
      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      await supabase.from('adminsession').insert([{
        id: crypto.randomUUID(),
        adminId: admin.id,
        token,
        expiresAt,
        createdAt: new Date().toISOString(),
      }])
      storeToken(token)
      return { success: true, user: { ...admin, role: 'Admin' }, token }
    }

    return { success: false, error: 'Invalid email or password.' }
  } catch (err: any) {
    return { success: false, error: err?.message || 'Login failed.' }
  }
}

/**
 * Get the current session from Supabase using the stored token.
 */
export async function clientGetSession(): Promise<any | null> {
  const token = getStoredToken()
  if (!token) return null

  try {
    const now = new Date().toISOString()

    const { data: attendeeSess } = await supabase
      .from('attendeesession')
      .select('*, attendee(*)')
      .eq('token', token)
      .gt('expiresAt', now)
      .maybeSingle()
    if (attendeeSess?.attendee) {
      const a = attendeeSess.attendee
      return { ...a, role: a.orgCode ? 'Attendee' : 'User' }
    }

    const { data: clientSess } = await supabase
      .from('clientsession')
      .select('*, client(*)')
      .eq('token', token)
      .gt('expiresAt', now)
      .maybeSingle()
    if (clientSess?.client) return { ...clientSess.client, role: 'Client' }

    const { data: adminSess } = await supabase
      .from('adminsession')
      .select('*, admin(*)')
      .eq('token', token)
      .gt('expiresAt', now)
      .maybeSingle()
    if (adminSess?.admin) return { ...adminSess.admin, role: 'Admin' }

    clearToken()
    return null
  } catch {
    return null
  }
}

/**
 * Logout — delete session from Supabase and clear local token.
 */
export async function clientLogout(): Promise<void> {
  const token = getStoredToken()
  if (token) {
    await Promise.allSettled([
      supabase.from('attendeesession').delete().eq('token', token),
      supabase.from('clientsession').delete().eq('token', token),
      supabase.from('adminsession').delete().eq('token', token),
    ])
  }
  clearToken()
}
