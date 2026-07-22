import { getPrisma, prisma } from '../database'

export interface DBAdapter {
  getGeofences(): Promise<any[]>
  getLogs(): Promise<any[]>
  getUsers(): Promise<any[]>
  getOrganizations(): Promise<any[]>
  getDashboardStats(): Promise<any>
  createOrganization(data: any): Promise<any>
  updateOrganization(id: string, data: any): Promise<any>
  deleteOrganization(id: string): Promise<any>
  createGeofence(data: any): Promise<any>
  updateGeofence(id: string, data: any): Promise<any>
  deleteGeofence(id: string): Promise<any>
  login(email: string, pass: string): Promise<any>
  createSession(userId: string, role: string): Promise<string>
  getSession(token: string): Promise<any>
  deleteSession(token: string): Promise<void>
  registerAttendee(data: any): Promise<any>
  getUsersByOrgCode(orgCode: string): Promise<any[]>
  updateUser(id: string, role: string, data: any): Promise<any>
  createUser(data: any): Promise<any>
  deleteUser(id: string, role: string): Promise<any>
  getCategoriesByOrgCode(orgCode: string): Promise<any[]>
  createCategory(data: any): Promise<any>
  updateCategory(id: string, data: any): Promise<any>
  deleteCategory(id: string): Promise<any>
  verifyIdentity(email: string, birthDate: string): Promise<boolean>
  resetPassword(email: string, birthDate: string, newPassword: string): Promise<string>
  enrollAttendee(attendeeId: string, geofenceIds: string[]): Promise<void>
}

// Ensure Prisma is initialized before any call
async function ensureDb() {
  if (typeof window === 'undefined') {
    await getPrisma()
  }
}

// Real Prisma adapter implementation
const baseDb: DBAdapter = {
  getGeofences: async () => {
    return prisma.geofence.findMany({
      orderBy: { createdAt: 'desc' },
      include: { organization_geofence_orgIdToorganization: true }
    })
  },
  getLogs: async () => {
    return prisma.attendancelog.findMany({
      orderBy: { timestamp: 'desc' },
      include: { 
        attendee: true,
        geofence: true
      }
    })
  },
  getUsers: async () => {
    const [attendees, clients] = await Promise.all([
      prisma.attendee.findMany({ include: { organization: true, category: true } }),
      prisma.client.findMany({ include: { organization: true } })
    ])
    return [
      ...attendees.map(a => ({ ...a, role: 'Attendee' })),
      ...clients.map(c => ({ ...c, role: 'Client' }))
    ]
  },
  getOrganizations: async () => {
    return prisma.organization.findMany({
      orderBy: { name: 'asc' }
    })
  },
  getDashboardStats: async () => {
    const [orgs, geofences, logs, attendees, clients] = await Promise.all([
      prisma.organization.count(),
      prisma.geofence.count(),
      prisma.attendancelog.count(),
      prisma.attendee.count(),
      prisma.client.count()
    ])
    return { 
      orgCount: orgs, 
      activeGeofences: geofences, 
      checkIns: logs, 
      userCount: attendees + clients 
    }
  },
  createOrganization: async (data) => {
    return prisma.organization.create({
      data: {
        id: crypto.randomUUID(),
        name: data.name,
        description: data.description,
        orgCode: data.orgCode,
        isActive: data.isActive !== undefined ? data.isActive : true,
        requestedById: data.requestedById,
        updatedAt: new Date()
      }
    })
  },
  updateOrganization: async (id, data) => {
    console.log(`[db.updateOrganization] Start - ID: ${id}`, data)
    if (!id) {
      throw new Error('Organization ID is required for update')
    }
    // If orgCode is changing, we need to update children too because 
    // the relation uses orgCode as the reference.
    if (data.orgCode) {
      const org = await prisma.organization.findUnique({ where: { id } })
      if (!org) {
        console.error(`[db.updateOrganization] Org not found with ID: ${id}`)
        throw new Error(`Organization with ID ${id} not found`)
      }
      if (org.orgCode && org.orgCode !== data.orgCode) {
        return prisma.$transaction(async (tx) => {
          // 1. Update all attendees pointing to the old code
          await tx.attendee.updateMany({
            where: { orgCode: org.orgCode },
            data: { orgCode: data.orgCode }
          })
          // 2. Update all clients pointing to the old code
          await tx.client.updateMany({
            where: { orgCode: org.orgCode },
            data: { orgCode: data.orgCode }
          })
          // 3. Finally update the organization itself
          return tx.organization.update({
            where: { id },
            data: { ...data, updatedAt: new Date() }
          })
        })
      }
    }

    try {
      return await prisma.organization.update({
        where: { id },
        data: { ...data, updatedAt: new Date() }
      })
    } catch (err: any) {
      console.error(`[db.updateOrganization] Update failed for ID: ${id}`, err)
      if (err.code === 'P2025') {
        throw new Error(`Organization with ID ${id} not found`)
      }
      throw err
    }
  },
  deleteOrganization: async (id) => {
    // We need the orgCode to delete attendees and clients
    const org = await prisma.organization.findUnique({ where: { id } })
    if (!org) throw new Error('Organization not found')

    return prisma.$transaction(async (tx) => {
      // 1. Delete all geofences (logs and enrollments will cascade from geofence)
      await tx.geofence.deleteMany({ where: { orgId: id } })

      // 2. Delete all categories (will cascade from category if set, but we handle it)
      await tx.category.deleteMany({ where: { orgId: id } })

      if (org.orgCode) {
        // 3. Delete all attendees (logs and sessions will cascade)
        await tx.attendee.deleteMany({ where: { orgCode: org.orgCode } })

        // 4. Delete all clients (geofences are already gone, sessions will cascade)
        await tx.client.deleteMany({ where: { orgCode: org.orgCode } })
      }

      // 5. Finally delete the organization
      return tx.organization.delete({ where: { id } })
    })
  },
  createGeofence: async (data) => {
    return prisma.geofence.create({
      data: {
        id: crypto.randomUUID(),
        name: data.name,
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
        radius: parseInt(data.radius),
        orgId: data.orgId,
        createdByClientId: data.createdByClientId,
        isActive: true,
        updatedAt: new Date()
      }
    })
  },
  updateGeofence: async (id, data) => {
    return prisma.geofence.update({
      where: { id },
      data: {
        ...data,
        latitude: data.latitude ? parseFloat(data.latitude) : undefined,
        longitude: data.longitude ? parseFloat(data.longitude) : undefined,
        radius: data.radius ? parseInt(data.radius) : undefined,
        updatedAt: new Date()
      }
    })
  },
  deleteGeofence: async (id) => {
    return prisma.geofence.delete({ where: { id } })
  },
  login: async (email, pass) => {
    // Try admin
    const admin = await prisma.admin.findUnique({ where: { email } })
    if (admin) {
      try {
        const bcrypt = await import('bcryptjs')
        const match = await bcrypt.default.compare(pass, admin.passwordHash)
        if (match) return { ...admin, role: 'Admin' }
      } catch (e) {
        // Fallback to plain comparison if bcrypt unavailable or hash is plain
        if (admin.passwordHash === pass) return { ...admin, role: 'Admin' }
      }
    }
    // Try client
    const client = await prisma.client.findUnique({ where: { email } })
    if (client) {
      try {
        const bcrypt = await import('bcryptjs')
        const match = await bcrypt.default.compare(pass, client.passwordHash)
        if (match) return { ...client, role: 'Client' }
      } catch (e) {
        if (client.passwordHash === pass) return { ...client, role: 'Client' }
      }
    }
    // Try attendee
    const attendee = await prisma.attendee.findUnique({ where: { email } })
    if (attendee) {
      try {
        const bcrypt = await import('bcryptjs')
        const match = await bcrypt.default.compare(pass, attendee.passwordHash)
        if (match) return { ...attendee, role: attendee.orgCode ? 'Attendee' : 'User' }
      } catch (e) {
        if (attendee.passwordHash === pass) return { ...attendee, role: attendee.orgCode ? 'Attendee' : 'User' }
      }
    }
    return null
  },
  createSession: async (userId, role) => {
    const token = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    
    if (role === 'Admin') {
      await prisma.adminsession.create({ data: { id: crypto.randomUUID(), adminId: userId, token, expiresAt } })
    } else if (role === 'Client') {
      await prisma.clientsession.create({ data: { id: crypto.randomUUID(), clientId: userId, token, expiresAt } })
    } else {
      // Both Attendee and User roles go to attendeesession
      await prisma.attendeesession.create({ data: { id: crypto.randomUUID(), attendeeId: userId, token, expiresAt } })
    }
    return token
  },
  getSession: async (token) => {
    const adminSession = await prisma.adminsession.findUnique({ where: { token }, include: { admin: true } })
    if (adminSession && adminSession.expiresAt > new Date()) {
      return { ...adminSession.admin, role: 'Admin' }
    }
    const clientSession = await prisma.clientsession.findUnique({ where: { token }, include: { client: true } })
    if (clientSession && clientSession.expiresAt > new Date()) {
      return { ...clientSession.client, role: 'Client' }
    }
    const attendeeSession = await prisma.attendeesession.findUnique({ where: { token }, include: { attendee: { include: { category: true } } } })
    if (attendeeSession && attendeeSession.expiresAt > new Date()) {
      const attendee = attendeeSession.attendee
      return { ...attendee, role: attendee.orgCode ? 'Attendee' : 'User' }
    }
    return null
  },
  deleteSession: async (token) => {
    try { await prisma.adminsession.delete({ where: { token } }) } catch {}
    try { await prisma.clientsession.delete({ where: { token } }) } catch {}
    try { await prisma.attendeesession.delete({ where: { token } }) } catch {}
  },
  registerAttendee: async (data) => {
    // Allow registration without an organization code. If an orgCode is provided, validate it.
    if (data.orgCode) {
      const org = await prisma.organization.findUnique({ where: { orgCode: data.orgCode } })
      if (!org) throw new Error('Invalid organization code')
    }

    const bcrypt = await import('bcryptjs')
    const hashed = await bcrypt.default.hash(data.password, 10)

    return prisma.attendee.create({
      data: {
        id: crypto.randomUUID(),
        email: data.email,
        name: data.name,
        passwordHash: hashed,
        birthDate: data.birthDate ? new Date(data.birthDate) : null,
        orgCode: data.orgCode || null,
        categoryId: data.categoryId || null,
        isVerified: false,
        updatedAt: new Date()
      }
    })
  },
  getUsersByOrgCode: async (orgCode) => {
    const [attendees, clients] = await Promise.all([
      prisma.attendee.findMany({
        where: { orgCode },
        orderBy: { createdAt: 'desc' },
        include: { 
          category: true,
          enrollment: {
            include: { geofence: true }
          }
        }
      }),
      prisma.client.findMany({
        where: { orgCode },
        orderBy: { createdAt: 'desc' }
      })
    ])

    return [
      ...attendees.map(a => ({ ...a, role: 'Attendee' })),
      ...clients.map(c => ({ ...c, role: 'Client' }))
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  },
  createUser: async (data) => {
    const { role } = data
    const id = crypto.randomUUID()
    const rawPass = data.password || 'password123'
    const name = data.name || data.email.split('@')[0]
    const email = data.email
    const orgCode = data.orgCode
    const birthDate = data.birthDate ? new Date(data.birthDate) : null
    
    const bcrypt = await import('bcryptjs')
    const passwordHash = await bcrypt.default.hash(rawPass, 10)
    
    if (role === 'Client') {
      return prisma.client.create({
        data: { id, name, email, passwordHash, birthDate, orgCode, isVerified: true, updatedAt: new Date() }
      })
    } else {
      return prisma.attendee.create({
        data: { 
          id, 
          name, 
          email, 
          passwordHash, 
          birthDate,
          orgCode, 
          isVerified: true, 
          categoryId: data.categoryId || null,
          updatedAt: new Date() 
        }
      })
    }
  },
  deleteUser: async (id, role) => {
    console.log(`[db.deleteUser] Attempting to delete ${role} with ID: ${id}`)
    const normalizedRole = String(role).trim().toLowerCase()
    try {
      if (normalizedRole === 'client') {
        const result = await prisma.client.delete({ where: { id } })
        console.log(`[db.deleteUser] Client deleted successfully: ${id}`)
        return result
      } else if (normalizedRole === 'attendee') {
        const result = await prisma.attendee.delete({ where: { id } })
        console.log(`[db.deleteUser] Attendee deleted successfully: ${id}`)
        return result
      } else if (normalizedRole === 'admin') {
        const result = await prisma.admin.delete({ where: { id } })
        console.log(`[db.deleteUser] Admin deleted successfully: ${id}`)
        return result
      }
      throw new Error(`Invalid role for deletion: ${role}`)
    } catch (err) {
      console.error(`[db.deleteUser] Error during deletion of ${role} ${id}:`, err)
      throw err
    }
  },
  updateUser: async (id, targetRole, data) => {
    console.log(`[db.updateUser] Updating to ${targetRole} ID: ${id}`, data)
    const updateData: any = { ...data, updatedAt: new Date() }
    
    // Normalize targetRole
    const role = targetRole === 'User' ? 'Attendee' : targetRole
    
    // Remove sensitive or non-scalar fields
    delete updateData.role
    delete updateData.category

    if (updateData.password) {
      const bcrypt = await import('bcryptjs')
      updateData.passwordHash = await bcrypt.default.hash(updateData.password, 10)
      delete updateData.password
    }

    try {
      // First, determine the user's current role by checking which table they exist in
      let currentUser = null
      let currentRole = null

      // Try to find in each role
      if (!currentUser) {
        currentUser = await prisma.attendee.findUnique({ where: { id } }).catch(() => null)
        if (currentUser) currentRole = 'Attendee'
      }
      if (!currentUser) {
        currentUser = await prisma.client.findUnique({ where: { id } }).catch(() => null)
        if (currentUser) currentRole = 'Client'
      }
      if (!currentUser) {
        currentUser = await prisma.admin.findUnique({ where: { id } }).catch(() => null)
        if (currentUser) currentRole = 'Admin'
      }

      if (!currentUser) {
        throw new Error(`User with ID ${id} not found`)
      }

      // If role hasn't changed (or it's User <-> Attendee), just update normally
      if (currentRole === role) {
        if (role === 'Client') {
          return await prisma.client.update({
            where: { id },
            data: updateData
          })
        } else if (role === 'Attendee') {
          return await prisma.attendee.update({
            where: { id },
            data: updateData
          })
        } else if (role === 'Admin') {
          return await prisma.admin.update({
            where: { id },
            data: updateData
          })
        }
      }

      // If role HAS changed, we need to migrate the user
      return await prisma.$transaction(async (tx) => {
        // Delete from old table
        if (currentRole === 'Attendee') {
          await tx.attendee.delete({ where: { id } })
        } else if (currentRole === 'Client') {
          await tx.client.delete({ where: { id } })
        } else if (currentRole === 'Admin') {
          await tx.admin.delete({ where: { id } })
        }

        // Create in new table with only common fields
        const commonFields = {
          id,
          email: updateData.email || currentUser.email,
          name: updateData.name || currentUser.name,
          passwordHash: updateData.passwordHash || currentUser.passwordHash,
          birthDate: updateData.birthDate || currentUser.birthDate,
          orgCode: updateData.orgCode || currentUser.orgCode,
          isVerified: updateData.isVerified !== undefined ? updateData.isVerified : currentUser.isVerified,
          createdAt: currentUser.createdAt,
          updatedAt: new Date()
        }

        if (role === 'Client') {
          return await tx.client.create({ data: commonFields })
        } else if (role === 'Attendee') {
          return await tx.attendee.create({ data: commonFields })
        } else if (role === 'Admin') {
          return await tx.admin.create({ data: commonFields })
        }

        throw new Error(`Invalid role for update: ${role}`)
      })
    } catch (err) {
      console.error(`[db.updateUser] Error updating ${role} ${id}:`, err)
      throw err
    }
  },
  getCategoriesByOrgCode: async (orgCode) => {
    const org = await prisma.organization.findUnique({ where: { orgCode } })
    if (!org) return []
    return prisma.category.findMany({
      where: { orgId: org.id },
      orderBy: { name: 'asc' }
    })
  },
  createCategory: async (data) => {
    return prisma.category.create({
      data: {
        id: crypto.randomUUID(),
        name: data.name,
        orgId: data.orgId,
        updatedAt: new Date()
      }
    })
  },
  updateCategory: async (id, data) => {
    return prisma.category.update({
      where: { id },
      data: { ...data, updatedAt: new Date() }
    })
  },
  deleteCategory: async (id) => {
    return prisma.category.delete({ where: { id } })
  },
  resetPassword: async (email, birthDate, newPassword) => {
    const normalized = email.toLowerCase().trim()
    const bDate = new Date(birthDate)

    // Check Admin
    const admin = await prisma.admin.findUnique({ where: { email: normalized } })
    if (admin) {
        throw new Error('Administrative accounts cannot be reset via this flow.')
    }

    // Check Client
    const client = await prisma.client.findUnique({ where: { email: normalized } })
    if (client) {
        if (!client.birthDate) throw new Error('Verification data missing for this account.')
        const clientBday = new Date(client.birthDate)
        if (clientBday.toDateString() !== bDate.toDateString()) {
            throw new Error('Verification failed. Information does not match.')
        }

        const bcrypt = await import('bcryptjs')
        const passwordHash = await bcrypt.default.hash(newPassword, 10)
        await prisma.client.update({ where: { id: client.id }, data: { passwordHash, updatedAt: new Date() } })
        return 'Password reset successful.'
    }

    // Check Attendee
    const attendee = await prisma.attendee.findUnique({ where: { email: normalized } })
    if (attendee) {
        if (!attendee.birthDate) throw new Error('Verification data missing for this account.')
        const attendeeBday = new Date(attendee.birthDate)
        if (attendeeBday.toDateString() !== bDate.toDateString()) {
            throw new Error('Verification failed. Information does not match.')
        }

        const bcrypt = await import('bcryptjs')
        const passwordHash = await bcrypt.default.hash(newPassword, 10)
        await prisma.attendee.update({ where: { id: attendee.id }, data: { passwordHash, updatedAt: new Date() } })
        return 'Password reset successful.'
    }

    throw new Error('Account not found.')
  },
  verifyIdentity: async (email, birthDate) => {
    const normalized = email.toLowerCase().trim()
    const bDate = new Date(birthDate)

    const client = await prisma.client.findUnique({ where: { email: normalized } })
    if (client) {
        if (!client.birthDate) return false
        const clientBday = new Date(client.birthDate)
        return clientBday.toDateString() === bDate.toDateString()
    }

    const attendee = await prisma.attendee.findUnique({ where: { email: normalized } })
    if (attendee) {
        if (!attendee.birthDate) return false
        const attendeeBday = new Date(attendee.birthDate)
        return attendeeBday.toDateString() === bDate.toDateString()
    }

    return false
  },
  enrollAttendee: async (attendeeId, geofenceIds) => {
    // Delete existing enrollments first to sync with new selection
    await prisma.enrollment.deleteMany({ where: { attendeeId } })

    // Create new enrollments
    if (geofenceIds.length > 0) {
      await prisma.enrollment.createMany({
        data: geofenceIds.map(geofenceId => ({
          id: crypto.randomUUID(),
          attendeeId,
          geofenceId
        }))
      })
    }
  }
}

// Wrap the db object in a Proxy that automatically calls ensureDb() before any method
export const db = new Proxy(baseDb, {
  get: (target: any, prop: string) => {
    const original = target[prop]
    if (typeof original === 'function') {
      return async (...args: any[]) => {
        await ensureDb()
        return original.apply(target, args)
      }
    }
    return original
  }
})
