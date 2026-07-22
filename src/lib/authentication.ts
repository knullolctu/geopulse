import { createServerFn } from '@tanstack/react-start'
import { db } from './services'
import type { LoginPayload, LoginResult } from './types'

function getClientToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('geopulse_session') || document.cookie.match(/geopulse_session=([^;]+)/)?.[1] || null
  }
  return null
}

function setClientToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('geopulse_session', token)
    document.cookie = `geopulse_session=${token}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`
  }
}

function removeClientToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('geopulse_session')
    document.cookie = 'geopulse_session=; path=/; max-age=0'
  }
}

export const getSessionFn = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    let token: string | null = null
    try {
      const { getCookie } = await import('@tanstack/react-start/server')
      token = getCookie('geopulse_session') || null
    } catch {
      token = getClientToken()
    }

    if (!token) token = getClientToken()
    if (!token) return null

    const user = await db.getSession(token)
    if (!user) return null

    return user
  } catch (err) {
    console.error('[getSessionFn] Error:', err)
    return null
  }
})

export const loginFn = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => data as LoginPayload)
  .handler(async (ctx): Promise<LoginResult> => {
    const { email, password } = (ctx.data as LoginPayload) || {}

    if (!email || !password) {
      return { success: false, message: 'Email and password are required.' }
    }

    const normalized = String(email).trim().toLowerCase()

    try {
      const user = await db.login(normalized, String(password))
      if (!user) {
        return { success: false, message: 'Invalid email or password.' }
      }

      const token = await db.createSession(user.id, user.role)
      setClientToken(token)

      try {
        const { setCookie } = await import('@tanstack/react-start/server')
        setCookie('geopulse_session', token, {
          path: '/',
          httpOnly: false,
          sameSite: 'lax',
          maxAge: 30 * 24 * 60 * 60,
        })
      } catch {
        // Fallback for static client execution
      }

      return { success: true, user }
    } catch (err) {
      console.error('LOGIN ERROR:', err)
      return { success: false, message: 'Login failed.' }
    }
  })

export const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
  let token: string | null = getClientToken()
  try {
    const { getCookie, deleteCookie } = await import('@tanstack/react-start/server')
    if (!token) token = getCookie('geopulse_session') || null
    deleteCookie('geopulse_session', { path: '/' })
  } catch {
    // Static client fallback
  }

  if (token) {
    await db.deleteSession(token)
  }

  removeClientToken()
  return { success: true }
})

export const registerFn = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => data as Record<string, unknown>)
  .handler(async (ctx) => {
    try {
      const user = await db.registerAttendee(ctx.data as any)
      return { success: true, user }
    } catch (err: any) {
      throw new Error(err?.message || 'Email already in use or invalid organization code')
    }
  })

export const verifyIdentityFn = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => data as any)
  .handler(async (ctx) => {
    const { email, birthDate } = ctx.data as any
    try {
      const isValid = await db.verifyIdentity(email, birthDate)
      return { success: isValid }
    } catch (err: any) {
      throw new Error(err?.message || 'Verification failed. Please check your details.')
    }
  })

export const resetPasswordFn = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => data as any)
  .handler(async (ctx) => {
    const { email, birthDate, newPassword } = ctx.data as any
    try {
      const result = await db.resetPassword(email, birthDate, newPassword)
      return { success: true, message: result }
    } catch (err: any) {
      throw new Error(err?.message || 'Verification failed. Please check your details.')
    }
  })

export const joinOrgFn = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => data as any)
  .handler(async (ctx) => {
    const { orgCode, categoryId } = ctx.data as any
    const token = getClientToken()
    if (!token) throw new Error('Not authenticated')
    const session = await db.getSession(token)
    if (!session) throw new Error('Session not found')

    const updateData: any = { orgCode }
    if (categoryId) updateData.categoryId = categoryId
    return db.updateUser(session.id, session.role, updateData)
  })

export const createOrgAndJoinFn = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => data as any)
  .handler(async (ctx) => {
    const rawData = ctx.data as any
    const data = rawData.data || rawData
    const { name, description, orgCode } = data
    const token = getClientToken()
    if (!token) throw new Error('Not authenticated')
    const session = await db.getSession(token)
    if (!session) throw new Error('Session not found')

    const org = await db.createOrganization({ 
      name, 
      description,
      orgCode, 
      isActive: false,
      requestedById: session.id
    })

    await db.updateUser(session.id, session.role, { orgCode: org.orgCode })
    return { success: true, org, message: 'Organization created and pending admin approval' }
  })
