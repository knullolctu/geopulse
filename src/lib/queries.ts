import { createServerFn } from '@tanstack/react-start'
import { db } from './services'
import { prisma, getPrisma } from '../database'

// Helper to get the current session user on the server
async function getServerSession() {
  try {
    await getPrisma()
    const { getCookie } = await import('@tanstack/react-start/server')
    const token = getCookie('geopulse_session')
    if (!token) return null
    return await db.getSession(token)
  } catch (err) {
    console.error('[getServerSession] Error:', err)
    return null
  }
}

export const getGeofencesFn = createServerFn({ method: 'GET' })
  .handler(async () => {
    await getPrisma()
    return db.getGeofences()
  })

export const cancelPendingOrgRequestFn = createServerFn({ method: 'POST' })
  .handler(async () => {
    await getPrisma()
    const user = await getServerSession()
    if (!user) throw new Error('Not authenticated')

    const pendingOrg = await prisma.organization.findFirst({
      where: {
        requestedById: user.id,
        isActive: false
      }
    })

    if (!pendingOrg) throw new Error('No pending organization request found')

    // Completely delete the pending organization
    await db.deleteOrganization(pendingOrg.id)

    return { success: true }
  })

export const getLogsFn = createServerFn({ method: 'GET' })
  .handler(async () => {
    return db.getLogs()
  })

export const getUsersFn = createServerFn({ method: 'GET' })
  .handler(async () => {
    return db.getUsers()
  })

export const getOrganizationsFn = createServerFn({ method: 'GET' })
  .handler(async () => {
    return db.getOrganizations()
  })

export const getPendingOrganizationsFn = createServerFn({ method: 'GET' })
  .handler(async () => {
    await getPrisma()
    const user = await getServerSession()
    if (!user || user.role !== 'Admin') throw new Error('Unauthorized')
    return prisma.organization.findMany({ 
      where: { isActive: false }, 
      orderBy: { createdAt: 'desc' } 
    })
  })

export const getDashboardStatsFn = createServerFn({ method: 'GET' })
  .handler(async () => {
    return db.getDashboardStats()
  })

export const createOrganizationFn = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => data as Record<string, unknown>)
  .handler(async (ctx) => {
    return db.createOrganization(ctx.data as any)
  })

export const updateOrganizationFn = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => data as { orgId: string; updateData: Record<string, unknown> })
  .handler(async (ctx) => {
    try {
      const data = ctx.data as any
      const orgId = data?.orgId || data?.id
      const updateData = data?.updateData
      if (!orgId) throw new Error('Organization ID missing')
      if (!updateData) throw new Error('Update data missing')
      const result = await db.updateOrganization(orgId, updateData)
      return { success: true, id: result.id }
    } catch (error: any) {
      console.error('Update Organization Error:', error)
      throw new Error(error.message)
    }
  })

export const approveOrganizationFn = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => data as { orgId: string; orgCode?: string })
  .handler(async (ctx) => {
    const user = await getServerSession()
    if (!user || user.role !== 'Admin') throw new Error('Unauthorized')
    const data = ctx.data as any
    const orgId = data?.orgId || data?.id
    const orgCode = data?.orgCode
    if (!orgId) throw new Error('Organization ID missing')
    const updateData: Record<string, unknown> = { isActive: true }
    if (typeof orgCode === 'string' && orgCode.trim()) {
      updateData.orgCode = orgCode.trim().toUpperCase()
    }
    const res = await db.updateOrganization(orgId, updateData)

    // If there's a requester, promote them to Client/Manager of this organization
    if (res.requestedById) {
      console.log(`[approveOrganizationFn] Promoting requester ${res.requestedById} to Client for org ${res.orgCode}`)
      try {
        await db.updateUser(res.requestedById, 'Client', { orgCode: res.orgCode })
      } catch (error) {
        console.error('[approveOrganizationFn] Failed to promote requester:', error)
      }
    }

    return { success: true, id: res.id }
  })

export const deleteOrganizationFn = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => data as { id: string })
  .handler(async (ctx) => {
    try {
      const data = ctx.data as { id: string }
      const id = typeof data === 'string' ? data : data?.id
      if (!id) throw new Error('Organization ID missing')
      const result = await db.deleteOrganization(id)
      return { success: true, id: result.id }
    } catch (error: any) {
      console.error('Delete Organization Error:', error)
      throw new Error(error.message)
    }
  })

export const createGeofenceFn = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => data as Record<string, unknown>)
  .handler(async (ctx) => {
    try {
      return db.createGeofence(ctx.data as any)
    } catch (error: any) {
      console.error('Create Geofence Error:', error)
      throw new Error(error.message)
    }
  })

export const updateGeofenceFn = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => data as { id: string; updateData: Record<string, unknown> })
  .handler(async (ctx) => {
    try {
      const { id, updateData } = ctx.data as { id: string; updateData: Record<string, unknown> }
      if (!id) throw new Error('Geofence ID missing')
      return db.updateGeofence(id, updateData)
    } catch (error: any) {
      console.error('Update Geofence Error:', error)
      throw new Error(error.message)
    }
  })

export const getGeofencesByOrgFn = createServerFn({ method: 'GET' }).handler(async () => {
  const user = await getServerSession()
  if (!user || user.role !== 'Client') throw new Error('Unauthorized')

  const org = await prisma.organization.findUnique({ where: { orgCode: user.orgCode } })
  if (!org) return []

  return prisma.geofence.findMany({
    where: { orgId: org.id },
    orderBy: { name: 'asc' }
  })
})

export const deleteGeofenceFn = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => data as { id: string })
  .handler(async (ctx) => {
    try {
      const data = ctx.data as { id: string }
      const id = typeof data === 'string' ? data : data?.id
      if (!id) throw new Error('Geofence ID missing')
      return db.deleteGeofence(id)
    } catch (error: any) {
      console.error('Delete Geofence Error:', error)
      throw new Error(error.message)
    }
  })

export const createUserFn = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => data as Record<string, unknown>)
  .handler(async (ctx) => {
    try {
      const data = ctx.data as Record<string, unknown>
      const user = await getServerSession()
      if (!user || (user.role !== 'Client' && user.role !== 'Admin')) {
        throw new Error('Unauthorized')
      }

      // If client, force their orgCode
      const userData = {
        ...data,
        orgCode: user.role === 'Client' ? user.orgCode : data.orgCode,
        role: user.role === 'Client' ? 'Attendee' : data.role,
      }

      return db.createUser(userData)
    } catch (error: any) {
      console.error('Create User Error:', error)
      throw new Error(error.message)
    }
  })

export const deleteUserFn = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => data as { id: string; role?: string })
  .handler(async (ctx) => {
    try {
      const { id, role: rawRole } = ctx.data as { id: string; role?: string }
      let role = rawRole?.trim()
      console.log(`[queries.deleteUserFn] Processing ID: ${id}, Role: ${role}`)

      // If client omitted role in the payload, attempt to infer it from the DB
      if ((!role || role === 'undefined') && id) {
        try {
          const att = await prisma.attendee.findUnique({ where: { id } })
          if (att) {
            role = 'Attendee'
          } else {
            const cli = await prisma.client.findUnique({ where: { id } })
            if (cli) {
              role = 'Client'
            } else {
              const adm = await prisma.admin.findUnique({ where: { id } })
              if (adm) role = 'Admin'
            }
          }
        } catch (e) {
          console.warn('[queries.deleteUserFn] Role inference failed:', e)
        }
        console.log(`[queries.deleteUserFn] Inferred Role: ${role}`)
      }

      const user = await getServerSession()
      if (!user || (user.role !== 'Client' && user.role !== 'Admin')) {
        console.warn('[queries.deleteUserFn] Unauthorized requester:', user?.role)
        throw new Error('Unauthorized')
      }

      // Clients can only delete attendees in their org
      if (user.role === 'Client') {
        const normalizedRole = String(role).toLowerCase()
        if (normalizedRole !== 'attendee') {
          console.warn('[queries.deleteUserFn] Denied: Client attempted to delete role:', role)
          throw new Error('Unauthorized to delete non-attendee users')
        }
        const attendees = await db.getUsersByOrgCode(user.orgCode)
        if (!attendees.some((u: any) => u.id === id)) {
          throw new Error('Unauthorized to delete this user')
        }
      }

      if (!id || !role) throw new Error('User ID or Role missing')
      await db.deleteUser(id, role)
      return { success: true }
    } catch (error: any) {
      console.error('Delete User Error:', error)
      throw new Error(error.message)
    }
  })

export const updateUserFn = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => data as { id: string; role: string; data: Record<string, unknown> })
  .handler(async (ctx) => {
    try {
      const { id, role, data: updateData } = ctx.data as { id: string; role: string; data: Record<string, unknown> }

      const user = await getServerSession()
      if (!user || (user.role !== 'Client' && user.role !== 'Admin')) {
        throw new Error('Unauthorized')
      }

      // Clients can only update attendees in their org
      if (user.role === 'Client') {
        if (role !== 'Attendee') {
          throw new Error('Unauthorized to update non-attendee users')
        }
        const target = await prisma.attendee.findUnique({ where: { id } })
        console.log('[updateUserFn] Client Auth Check:', {
          clientId: user.id,
          clientOrg: user.orgCode,
          targetId: id,
          targetOrg: target?.orgCode
        })

        if (!target || !target.orgCode || !user.orgCode || target.orgCode.trim().toLowerCase() !== user.orgCode.trim().toLowerCase()) {
          throw new Error(`Unauthorized to update this user. (Org mismatch: ${user.orgCode} vs ${target?.orgCode})`)
        }
        delete (updateData as any).orgCode
      }

      if (!id || !role) throw new Error('User ID or Role missing')
      return db.updateUser(id, role, updateData)
    } catch (error: any) {
      console.error('Update User Error:', error)
      throw new Error(error.message)
    }
  })

export const getAttendeesFn = createServerFn({ method: 'GET' }).handler(async () => {
  const user = await getServerSession()
  if (!user || (user.role !== 'Client' && user.role !== 'Admin')) {
    throw new Error('Unauthorized')
  }

  if (user.role === 'Admin') {
    return db.getUsers()
  }

  const allUsers = await db.getUsersByOrgCode(user.orgCode)
  return allUsers.filter((u: any) => u.isVerified === true)
})

export const getCategoriesFn = createServerFn({ method: 'GET' }).handler(async () => {
  const user = await getServerSession()
  if (!user || user.role !== 'Client') {
    throw new Error('Unauthorized')
  }
  return db.getCategoriesByOrgCode(user.orgCode)
})

export const getUnverifiedUsersFn = createServerFn({ method: 'GET' }).handler(async () => {
  const user = await getServerSession()
  if (!user || (user.role !== 'Client' && user.role !== 'Admin')) {
    throw new Error('Unauthorized')
  }

  if (user.role === 'Admin') {
    const allUsers = await db.getUsers()
    return allUsers.filter((u: any) => u.isVerified !== true)
  }

  const allUsers = await db.getUsersByOrgCode(user.orgCode)
  return allUsers.filter((u: any) => u.isVerified !== true)
})

export const verifyUserFn = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => data as { id: string; role?: string; geofenceIds?: string[] })
  .handler(async (ctx) => {
    const data = ctx.data as { id: string; role?: string }
    const user = await getServerSession()
    if (!user || (user.role !== 'Client' && user.role !== 'Admin')) {
      throw new Error('Unauthorized')
    }

    if (user.role === 'Client') {
      // Ensure user belongs to org
      const unverified = await db.getUsersByOrgCode(user.orgCode)
      if (!unverified.some((u: any) => u.id === data.id)) {
        throw new Error('User not found or unauthorized')
      }
    }

    await db.updateUser(data.id, data.role || 'Attendee', { isVerified: true })

    // If geofenceIds provided, enroll the attendee
    if (data.geofenceIds) {
      await db.enrollAttendee(data.id, data.geofenceIds)
    }

    return { success: true }
  })

export const bulkEnrollFn = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => data as { 
    type: 'all' | 'category' | 'selective', 
    targetId?: string, 
    userIds?: string[], 
    geofenceIds: string[] 
  })
  .handler(async (ctx) => {
    const data = ctx.data
    const user = await getServerSession()
    if (!user || user.role !== 'Client') throw new Error('Unauthorized')

    let targetUserIds: string[] = []

    if (data.type === 'all') {
      const attendees = await prisma.attendee.findMany({ where: { orgCode: user.orgCode } })
      targetUserIds = attendees.map(a => a.id)
    } else if (data.type === 'category') {
      if (!data.targetId) throw new Error('Category ID missing')
      const attendees = await prisma.attendee.findMany({ 
        where: { orgCode: user.orgCode, categoryId: data.targetId } 
      })
      targetUserIds = attendees.map(a => a.id)
    } else if (data.type === 'selective') {
      targetUserIds = data.userIds || []
    }

    if (targetUserIds.length === 0) return { success: true, count: 0 }

    // Use a transaction for safety
    await prisma.$transaction(
      targetUserIds.map(userId => 
        prisma.enrollment.deleteMany({ where: { attendeeId: userId } })
      )
    )

    await prisma.enrollment.createMany({
      data: targetUserIds.flatMap(userId => 
        data.geofenceIds.map(geofenceId => ({
          id: crypto.randomUUID(),
          attendeeId: userId,
          geofenceId
        }))
      )
    })

    return { success: true, count: targetUserIds.length }
  })

export const getCategoriesByOrgCodeFn = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) => data as { orgCode: string } | string)
  .handler(async (ctx) => {
    const data = ctx.data as { orgCode: string } | string
    const orgCode = typeof data === 'string' ? data : (data as any)?.orgCode
    if (!orgCode) return []
    return db.getCategoriesByOrgCode(orgCode)
  })

// ─── Category CRUD (client-scoped) ────────────────────────────────────────────

export const createCategoryFn = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => data as { name: string })
  .handler(async (ctx) => {
    const user = await getServerSession()
    if (!user || user.role !== 'Client') throw new Error('Unauthorized')
    const org = await prisma.organization.findUnique({ where: { orgCode: user.orgCode } })
    if (!org) throw new Error('Organization not found')
    return db.createCategory({ name: (ctx.data as any).name, orgId: org.id })
  })

export const updateCategoryFn = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => data as { id: string; name: string })
  .handler(async (ctx) => {
    const user = await getServerSession()
    if (!user || user.role !== 'Client') throw new Error('Unauthorized')
    const { id, name } = ctx.data as { id: string; name: string }
    return db.updateCategory(id, { name })
  })

export const deleteCategoryFn = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => data as { id: string })
  .handler(async (ctx) => {
    const user = await getServerSession()
    if (!user || user.role !== 'Client') throw new Error('Unauthorized')
    return db.deleteCategory((ctx.data as any).id)
  })

export const deleteCategoriesFn = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => data as { ids: string[] })
  .handler(async (ctx) => {
    const user = await getServerSession()
    if (!user || user.role !== 'Client') throw new Error('Unauthorized')
    const { ids } = ctx.data as { ids: string[] }
    await Promise.all(ids.map(id => db.deleteCategory(id)))
    return { success: true }
  })

// ─── Client-scoped Logs ───────────────────────────────────────────────────────

export const getLogsByOrgFn = createServerFn({ method: 'GET' }).handler(async () => {
  const user = await getServerSession()
  if (!user || user.role !== 'Client') throw new Error('Unauthorized')
  const org = await prisma.organization.findUnique({ where: { orgCode: user.orgCode } })
  if (!org) return []
  return prisma.attendancelog.findMany({
    where: { geofence: { orgId: org.id } },
    orderBy: { timestamp: 'desc' },
    include: { 
      attendee: {
        include: { category: true }
      }, 
      geofence: true 
    },
    take: 200,
  })
})

// ─── Client Dashboard Stats ───────────────────────────────────────────────────

export const getClientDashboardStatsFn = createServerFn({ method: 'GET' }).handler(async () => {
  const user = await getServerSession()
  if (!user || user.role !== 'Client') throw new Error('Unauthorized')
  const org = await prisma.organization.findUnique({ where: { orgCode: user.orgCode } })
  if (!org) return { geofenceCount: 0, checkIns: 0, memberCount: 0, pendingCount: 0 }

  const [geofenceCount, checkIns, allMembers] = await Promise.all([
    prisma.geofence.count({ where: { orgId: org.id } }),
    prisma.attendancelog.count({ where: { geofence: { orgId: org.id } } }),
    prisma.attendee.findMany({ where: { orgCode: user.orgCode }, select: { isVerified: true } }),
  ])

  return {
    geofenceCount,
    checkIns,
    memberCount: allMembers.filter((m) => m.isVerified).length,
    pendingCount: allMembers.filter((m) => !m.isVerified).length,
  }
})

// ─── Profile Update ───────────────────────────────────────────────────────────

export const updateProfileFn = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => data as { name?: string; currentPassword?: string; newPassword?: string })
  .handler(async (ctx) => {
    const user = await getServerSession()
    if (!user) throw new Error('Unauthorized')
    const { name, currentPassword, newPassword } = ctx.data as any

    // Password change validation
    if (newPassword) {
      const bcrypt = await import('bcryptjs')
      const match = await bcrypt.default.compare(currentPassword || '', user.passwordHash || '')
      // fallback: plain comparison for seeded accounts
      if (!match && currentPassword !== user.passwordHash) {
        throw new Error('Current password is incorrect')
      }
      const hashed = await bcrypt.default.hash(newPassword, 10)
      await db.updateUser(user.id, user.role, { name, passwordHash: hashed })
    } else {
      await db.updateUser(user.id, user.role, { name })
    }

    return { success: true }
  })

// ─── Client Geofence Management ───────────────────────────────────────────────

export const createGeofenceByClientFn = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => data as { name: string; latitude: string; longitude: string; radius: string })
  .handler(async (ctx) => {
    const user = await getServerSession()
    if (!user || user.role !== 'Client') throw new Error('Unauthorized')

    const org = await prisma.organization.findUnique({ where: { orgCode: user.orgCode } })
    if (!org) throw new Error('Organization not found')

    const { name, latitude, longitude, radius } = ctx.data as any
    return db.createGeofence({
      name,
      latitude,
      longitude,
      radius,
      orgId: org.id,
      createdByClientId: user.id,
    })
  })

export const deleteGeofenceByClientFn = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => data as { id: string })
  .handler(async (ctx) => {
    const user = await getServerSession()
    if (!user || user.role !== 'Client') throw new Error('Unauthorized')

    const org = await prisma.organization.findUnique({ where: { orgCode: user.orgCode } })
    if (!org) throw new Error('Organization not found')

    const geofence = await prisma.geofence.findUnique({ where: { id: (ctx.data as any).id } })
    if (!geofence || geofence.orgId !== org.id) throw new Error('Unauthorized to delete this geofence')

    return db.deleteGeofence((ctx.data as any).id)
  })

export const toggleGeofenceStatusFn = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => data as { id: string; isActive: boolean })
  .handler(async (ctx) => {
    const user = await getServerSession()
    if (!user || user.role !== 'Client') throw new Error('Unauthorized')

    const org = await prisma.organization.findUnique({ where: { orgCode: user.orgCode } })
    if (!org) throw new Error('Organization not found')

    const { id, isActive } = ctx.data as { id: string; isActive: boolean }
    const geofence = await prisma.geofence.findUnique({ where: { id } })
    if (!geofence || geofence.orgId !== org.id) throw new Error('Unauthorized to modify this geofence')

    return prisma.geofence.update({
      where: { id },
      data: { isActive, updatedAt: new Date() },
    })
  })

// ─── Attendee Specific Functions ─────────────────────────────────────────────

export const getAttendeeProfileFn = createServerFn({ method: 'GET' }).handler(async () => {
  const user = await getServerSession()
  if (!user || user.role !== 'Attendee') throw new Error('Unauthorized')
  
  return prisma.attendee.findUnique({
    where: { id: user.id },
    include: { category: true }
  })
})

export const getAttendeeDashboardStatsFn = createServerFn({ method: 'GET' }).handler(async () => {
  const user = await getServerSession()
  if (!user || user.role !== 'Attendee') throw new Error('Unauthorized')

  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  const [todayLogs, totalLogsCount] = await Promise.all([
    prisma.attendancelog.findMany({
      where: {
        attendeeId: user.id,
        timestamp: { gte: startOfToday },
      },
      orderBy: { timestamp: 'desc' },
      include: { geofence: true }
    }),
    prisma.attendancelog.count({
      where: { attendeeId: user.id },
    }),
  ])

  // Get the most recent log to determine current status
  const latestLog = todayLogs[0]
  
  // Calculate status: ON-DUTY if they have an active IN slot without an OUT slot
  const isCurrentlyIn = latestLog ? (
    (latestLog.afternoonTimeIn && !latestLog.afternoonTimeOut) ||
    (latestLog.morningTimeIn && !latestLog.morningTimeOut && !latestLog.afternoonTimeIn)
  ) : false
  const status = isCurrentlyIn ? 'ON-DUTY' : 'OFF-DUTY'

  return {
    todayLogs,
    totalLogs: totalLogsCount,
    status,
    // Detailed slots for the latest today's log
    slots: latestLog ? {
      morningIn: latestLog.morningTimeIn,
      morningOut: latestLog.morningTimeOut,
      afternoonIn: latestLog.afternoonTimeIn,
      afternoonOut: latestLog.afternoonTimeOut,
    } : null
  }
})

export const getAttendeeLogsFn = createServerFn({ method: 'GET' }).handler(async () => {
  const user = await getServerSession()
  if (!user || user.role !== 'Attendee') throw new Error('Unauthorized')

  return prisma.attendancelog.findMany({
    where: { attendeeId: user.id },
    orderBy: { timestamp: 'desc' },
    include: { geofence: true },
    take: 50,
  })
})

export const getAttendeeGeofencesFn = createServerFn({ method: 'GET' }).handler(async () => {
  const user = await getServerSession()
  if (!user || user.role !== 'Attendee') throw new Error('Unauthorized')

  const org = await prisma.organization.findUnique({ where: { orgCode: user.orgCode } })
  if (!org) return []

  return prisma.geofence.findMany({
    where: { orgId: org.id, isActive: true },
  })
})

export const checkInFn = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => data as { latitude: number; longitude: number; slot: 'morningIn' | 'morningOut' | 'afternoonIn' | 'afternoonOut'; isMock?: boolean })
  .handler(async (ctx) => {
    const user = await getServerSession()
    if (!user || user.role !== 'Attendee') throw new Error('Unauthorized')

    const { latitude, longitude, slot, isMock = false } = ctx.data as { latitude: number; longitude: number; slot: string; isMock?: boolean }

    // Find geofences user is enrolled in
    const enrollments = await prisma.enrollment.findMany({
      where: { attendeeId: user.id },
      include: { geofence: true }
    })

    const geofences = enrollments.map(e => e.geofence).filter(gf => gf.isActive)

    // Find which geofence user is in
    let targetGeofence = null
    for (const gf of geofences) {
      const dist = calculateDistance(latitude, longitude, gf.latitude, gf.longitude)
      if (dist <= gf.radius) {
        targetGeofence = gf
        break
      }
    }

    // Security check: If location is mocked, mark as SUSPICIOUS
    const logStatus = isMock ? 'SUSPICIOUS' : 'SUCCESS'

    if (!targetGeofence) {
      throw new Error('You are outside any authorized geofence zones.')
    }

    const now = new Date()
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    // Find today's log for this geofence
    let log = await prisma.attendancelog.findFirst({
      where: {
        attendeeId: user.id,
        geofenceId: targetGeofence.id,
        timestamp: { gte: startOfToday }
      }
    })

    const isTimeIn = slot === 'morningIn' || slot === 'afternoonIn'

    if (!log) {
      log = await prisma.attendancelog.create({
        data: {
          id: crypto.randomUUID(),
          attendeeId: user.id,
          geofenceId: targetGeofence.id,
          deviceLat: latitude,
          deviceLng: longitude,
          isMock,
          status: logStatus,
          morningTimeIn: slot === 'morningIn' ? now : null,
          morningTimeOut: slot === 'morningOut' ? now : null,
          afternoonTimeIn: slot === 'afternoonIn' ? now : null,
          afternoonTimeOut: slot === 'afternoonOut' ? now : null,
          timestamp: now
        }
      })
    } else {
      let updateData: any = { 
        timestamp: now,
        deviceLat: latitude,
        deviceLng: longitude,
        isMock,
        status: logStatus
      }
      
      if (slot === 'morningIn') updateData.morningTimeIn = now
      if (slot === 'morningOut') updateData.morningTimeOut = now
      if (slot === 'afternoonIn') updateData.afternoonTimeIn = now
      if (slot === 'afternoonOut') updateData.afternoonTimeOut = now
 
      log = await prisma.attendancelog.update({
        where: { id: log.id },
        data: updateData
      })
    }

    return { log, geofenceName: targetGeofence.name, slotLabel: slot.replace(/([A-Z])/g, ' $1').trim() }
  })

// Simple Haversine distance helper (meters)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3 // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180
  const Δφ = ((lat2 - lat1) * Math.PI) / 180
  const Δλ = ((lon2 - lon1) * Math.PI) / 180

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}
