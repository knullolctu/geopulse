import { createServerFn } from '@tanstack/react-start'
import { db } from './services'
import { prisma, getPrisma } from '../database'
import type { LoginPayload, LoginResult } from './types'

export const getSessionFn = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    await getPrisma()
    const { getCookie } = await import('@tanstack/react-start/server')
    const token = getCookie('geopulse_session')
    if (!token) return null
    const user = await db.getSession(token)
    if (!user) return null

    // Check if user has a pending organization request
    const pendingOrg = await prisma.organization.findFirst({
      where: {
        requestedById: user.id,
        isActive: false
      }
    })

    return { ...user, pendingOrg }
  } catch (err) {
    console.error('[getSessionFn] Error:', err)
    return null
  }
})

export const loginFn = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => data as LoginPayload)
  .handler(async (ctx): Promise<LoginResult> => {
    await getPrisma()
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

      const { setCookie } = await import('@tanstack/react-start/server')
      setCookie('geopulse_session', token, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60,
      })

      return { success: true, user }
    } catch (err) {
      console.error('LOGIN ERROR:', err)
      return { success: false, message: 'Login failed due to server error.' }
    }
  })

export const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
  const { getCookie, deleteCookie } = await import('@tanstack/react-start/server')
  const token = getCookie('geopulse_session')

  if (token) {
    await db.deleteSession(token)
  }

  deleteCookie('geopulse_session', { path: '/' })
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
    await getPrisma()
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
    await getPrisma()
    const { orgCode, categoryId } = ctx.data as any
    const { getCookie } = await import('@tanstack/react-start/server')
    const token = getCookie('geopulse_session')
    if (!token) throw new Error('Not authenticated')
    const session = await db.getSession(token)
    if (!session) throw new Error('Session not found')

    // validate org exists
    const org = await prisma.organization.findUnique({ where: { orgCode } })
    if (!org) throw new Error('Organization not found')

    // update user with orgCode (and optional categoryId)
    const updateData: any = { orgCode }
    if (categoryId) updateData.categoryId = categoryId
    return db.updateUser(session.id, session.role, updateData)
  })

export const createOrgAndJoinFn = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => data as any)
  .handler(async (ctx) => {
    await getPrisma()
    const rawData = ctx.data as any
    const data = rawData.data || rawData
    const { name, description, orgCode } = data
    const { getCookie } = await import('@tanstack/react-start/server')
    const token = getCookie('geopulse_session')
    if (!token) throw new Error('Not authenticated')
    const session = await db.getSession(token)
    if (!session) throw new Error('Session not found')

    // create organization as pending (requires admin approval)
    const org = await db.createOrganization({ 
      name, 
      description,
      orgCode, 
      isActive: false,
      requestedById: session.id
    })

    // join creator to new (pending) org
    await db.updateUser(session.id, session.role, { orgCode: org.orgCode })
    return { success: true, org, message: 'Organization created and pending admin approval' }
  })
