import { supabase } from './supabase'

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

// Check if Prisma database server is reachable
async function isPrismaAvailable(): Promise<boolean> {
  if (typeof window !== 'undefined') return false
  try {
    const { getPrisma } = await import('../database')
    await getPrisma()
    return true
  } catch {
    return false
  }
}

// Supabase REST Adapter (for static GitHub Pages & cloud deployment)
const supabaseDb: DBAdapter = {
  getGeofences: async () => {
    const { data, error } = await supabase.from('geofence').select('*, organization:orgId(*)').order('createdAt', { ascending: false })
    if (error) throw error
    return data || []
  },
  getLogs: async () => {
    const { data, error } = await supabase.from('attendancelog').select('*, attendee:attendeeId(*), geofence:geofenceId(*)').order('timestamp', { ascending: false })
    if (error) throw error
    return data || []
  },
  getUsers: async () => {
    const [attendeesRes, clientsRes] = await Promise.all([
      supabase.from('attendee').select('*, organization:orgCode(*), category:categoryId(*)'),
      supabase.from('client').select('*, organization:orgCode(*)')
    ])
    const attendees = (attendeesRes.data || []).map(a => ({ ...a, role: 'Attendee' }))
    const clients = (clientsRes.data || []).map(c => ({ ...c, role: 'Client' }))
    return [...attendees, ...clients]
  },
  getOrganizations: async () => {
    const { data, error } = await supabase.from('organization').select('*').order('name', { ascending: true })
    if (error) throw error
    return data || []
  },
  getDashboardStats: async () => {
    const [orgs, geofences, logs, attendees, clients] = await Promise.all([
      supabase.from('organization').select('id', { count: 'exact' }),
      supabase.from('geofence').select('id', { count: 'exact' }),
      supabase.from('attendancelog').select('id', { count: 'exact' }),
      supabase.from('attendee').select('id', { count: 'exact' }),
      supabase.from('client').select('id', { count: 'exact' })
    ])
    return {
      orgCount: orgs.count || 0,
      activeGeofences: geofences.count || 0,
      checkIns: logs.count || 0,
      userCount: (attendees.count || 0) + (clients.count || 0)
    }
  },
  createOrganization: async (data) => {
    const id = crypto.randomUUID()
    const payload = {
      id,
      name: data.name,
      description: data.description || null,
      orgCode: data.orgCode,
      isActive: data.isActive !== undefined ? data.isActive : true,
      requestedById: data.requestedById || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    const { data: res, error } = await supabase.from('organization').insert([payload]).select().single()
    if (error) throw error
    return res
  },
  updateOrganization: async (id, data) => {
    const payload = { ...data, updatedAt: new Date().toISOString() }
    const { data: res, error } = await supabase.from('organization').update(payload).eq('id', id).select().single()
    if (error) throw error
    return res
  },
  deleteOrganization: async (id) => {
    const { error } = await supabase.from('organization').delete().eq('id', id)
    if (error) throw error
    return { success: true }
  },
  createGeofence: async (data) => {
    const id = crypto.randomUUID()
    const payload = {
      id,
      name: data.name,
      latitude: parseFloat(data.latitude),
      longitude: parseFloat(data.longitude),
      radius: parseInt(data.radius),
      orgId: data.orgId,
      createdByClientId: data.createdByClientId || null,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    const { data: res, error } = await supabase.from('geofence').insert([payload]).select().single()
    if (error) throw error
    return res
  },
  updateGeofence: async (id, data) => {
    const payload = {
      ...data,
      latitude: data.latitude ? parseFloat(data.latitude) : undefined,
      longitude: data.longitude ? parseFloat(data.longitude) : undefined,
      radius: data.radius ? parseInt(data.radius) : undefined,
      updatedAt: new Date().toISOString()
    }
    const { data: res, error } = await supabase.from('geofence').update(payload).eq('id', id).select().single()
    if (error) throw error
    return res
  },
  deleteGeofence: async (id) => {
    const { error } = await supabase.from('geofence').delete().eq('id', id)
    if (error) throw error
    return { success: true }
  },
  login: async (email, pass) => {
    const bcrypt = await import('bcryptjs')
    
    // Check Admin
    const { data: admin } = await supabase.from('admin').select('*').eq('email', email).maybeSingle()
    if (admin) {
      const match = admin.passwordHash ? await bcrypt.default.compare(pass, admin.passwordHash).catch(() => admin.passwordHash === pass) : admin.passwordHash === pass
      if (match) return { ...admin, role: 'Admin' }
    }

    // Check Client
    const { data: client } = await supabase.from('client').select('*').eq('email', email).maybeSingle()
    if (client) {
      const match = client.passwordHash ? await bcrypt.default.compare(pass, client.passwordHash).catch(() => client.passwordHash === pass) : client.passwordHash === pass
      if (match) return { ...client, role: 'Client' }
    }

    // Check Attendee
    const { data: attendee } = await supabase.from('attendee').select('*').eq('email', email).maybeSingle()
    if (attendee) {
      const match = attendee.passwordHash ? await bcrypt.default.compare(pass, attendee.passwordHash).catch(() => attendee.passwordHash === pass) : attendee.passwordHash === pass
      if (match) return { ...attendee, role: attendee.orgCode ? 'Attendee' : 'User' }
    }

    return null
  },
  createSession: async (userId, role) => {
    const token = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    const id = crypto.randomUUID()

    if (role === 'Admin') {
      await supabase.from('adminsession').insert([{ id, adminId: userId, token, expiresAt }])
    } else if (role === 'Client') {
      await supabase.from('clientsession').insert([{ id, clientId: userId, token, expiresAt }])
    } else {
      await supabase.from('attendeesession').insert([{ id, attendeeId: userId, token, expiresAt }])
    }
    return token
  },
  getSession: async (token) => {
    // Check Admin
    const { data: adminSess } = await supabase.from('adminsession').select('*, admin(*)').eq('token', token).maybeSingle()
    if (adminSess && new Date(adminSess.expiresAt) > new Date()) {
      return { ...adminSess.admin, role: 'Admin' }
    }

    // Check Client
    const { data: clientSess } = await supabase.from('clientsession').select('*, client(*)').eq('token', token).maybeSingle()
    if (clientSess && new Date(clientSess.expiresAt) > new Date()) {
      return { ...clientSess.client, role: 'Client' }
    }

    // Check Attendee
    const { data: attendeeSess } = await supabase.from('attendeesession').select('*, attendee(*, category(*))').eq('token', token).maybeSingle()
    if (attendeeSess && new Date(attendeeSess.expiresAt) > new Date()) {
      const attendee = attendeeSess.attendee
      return { ...attendee, role: attendee?.orgCode ? 'Attendee' : 'User' }
    }

    return null
  },
  deleteSession: async (token) => {
    await Promise.all([
      supabase.from('adminsession').delete().eq('token', token),
      supabase.from('clientsession').delete().eq('token', token),
      supabase.from('attendeesession').delete().eq('token', token)
    ])
  },
  registerAttendee: async (data) => {
    if (data.orgCode) {
      const { data: org } = await supabase.from('organization').select('*').eq('orgCode', data.orgCode).maybeSingle()
      if (!org) throw new Error('Invalid organization code')
    }

    const bcrypt = await import('bcryptjs')
    const hashed = await bcrypt.default.hash(data.password, 10)
    const id = crypto.randomUUID()

    const payload = {
      id,
      email: data.email,
      name: data.name,
      passwordHash: hashed,
      birthDate: data.birthDate ? new Date(data.birthDate).toISOString() : null,
      orgCode: data.orgCode || null,
      categoryId: data.categoryId || null,
      isVerified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const { data: res, error } = await supabase.from('attendee').insert([payload]).select().single()
    if (error) throw error
    return res
  },
  getUsersByOrgCode: async (orgCode) => {
    const [attendeesRes, clientsRes] = await Promise.all([
      supabase.from('attendee').select('*, category(*), enrollment(*, geofence(*))').eq('orgCode', orgCode).order('createdAt', { ascending: false }),
      supabase.from('client').select('*').eq('orgCode', orgCode).order('createdAt', { ascending: false })
    ])
    const attendees = (attendeesRes.data || []).map(a => ({ ...a, role: 'Attendee' }))
    const clients = (clientsRes.data || []).map(c => ({ ...c, role: 'Client' }))
    return [...attendees, ...clients]
  },
  createUser: async (data) => {
    const { role } = data
    const id = crypto.randomUUID()
    const rawPass = data.password || 'password123'
    const name = data.name || data.email.split('@')[0]
    const email = data.email
    const orgCode = data.orgCode
    const birthDate = data.birthDate ? new Date(data.birthDate).toISOString() : null
    
    const bcrypt = await import('bcryptjs')
    const passwordHash = await bcrypt.default.hash(rawPass, 10)
    
    const payload = {
      id,
      name,
      email,
      passwordHash,
      birthDate,
      orgCode: orgCode || null,
      isVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    if (role === 'Client') {
      const { data: res, error } = await supabase.from('client').insert([payload]).select().single()
      if (error) throw error
      return res
    } else {
      const { data: res, error } = await supabase.from('attendee').insert([{ ...payload, categoryId: data.categoryId || null }]).select().single()
      if (error) throw error
      return res
    }
  },
  deleteUser: async (id, role) => {
    const normalizedRole = String(role).trim().toLowerCase()
    if (normalizedRole === 'client') {
      await supabase.from('client').delete().eq('id', id)
    } else if (normalizedRole === 'attendee') {
      await supabase.from('attendee').delete().eq('id', id)
    } else if (normalizedRole === 'admin') {
      await supabase.from('admin').delete().eq('id', id)
    }
    return { success: true }
  },
  updateUser: async (id, targetRole, data) => {
    const updateData: any = { ...data, updatedAt: new Date().toISOString() }
    delete updateData.role
    delete updateData.category

    if (updateData.password) {
      const bcrypt = await import('bcryptjs')
      updateData.passwordHash = await bcrypt.default.hash(updateData.password, 10)
      delete updateData.password
    }

    const role = targetRole === 'User' ? 'Attendee' : targetRole
    if (role === 'Client') {
      const { data: res } = await supabase.from('client').update(updateData).eq('id', id).select().single()
      return res
    } else {
      const { data: res } = await supabase.from('attendee').update(updateData).eq('id', id).select().single()
      return res
    }
  },
  getCategoriesByOrgCode: async (orgCode) => {
    const { data: org } = await supabase.from('organization').select('id').eq('orgCode', orgCode).maybeSingle()
    if (!org) return []
    const { data } = await supabase.from('category').select('*').eq('orgId', org.id).order('name', { ascending: true })
    return data || []
  },
  createCategory: async (data) => {
    const id = crypto.randomUUID()
    const payload = {
      id,
      name: data.name,
      orgId: data.orgId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    const { data: res, error } = await supabase.from('category').insert([payload]).select().single()
    if (error) throw error
    return res
  },
  updateCategory: async (id, data) => {
    const payload = { ...data, updatedAt: new Date().toISOString() }
    const { data: res, error } = await supabase.from('category').update(payload).eq('id', id).select().single()
    if (error) throw error
    return res
  },
  deleteCategory: async (id) => {
    const { error } = await supabase.from('category').delete().eq('id', id)
    if (error) throw error
    return { success: true }
  },
  resetPassword: async (email, birthDate, newPassword) => {
    const normalized = email.toLowerCase().trim()
    const bcrypt = await import('bcryptjs')
    const passwordHash = await bcrypt.default.hash(newPassword, 10)

    const { data: client } = await supabase.from('client').select('*').eq('email', normalized).maybeSingle()
    if (client) {
      await supabase.from('client').update({ passwordHash, updatedAt: new Date().toISOString() }).eq('id', client.id)
      return 'Password reset successful.'
    }

    const { data: attendee } = await supabase.from('attendee').select('*').eq('email', normalized).maybeSingle()
    if (attendee) {
      await supabase.from('attendee').update({ passwordHash, updatedAt: new Date().toISOString() }).eq('id', attendee.id)
      return 'Password reset successful.'
    }

    throw new Error('Account not found.')
  },
  verifyIdentity: async (email, birthDate) => {
    const normalized = email.toLowerCase().trim()
    const { data: client } = await supabase.from('client').select('birthDate').eq('email', normalized).maybeSingle()
    if (client) return true
    const { data: attendee } = await supabase.from('attendee').select('birthDate').eq('email', normalized).maybeSingle()
    if (attendee) return true
    return false
  },
  enrollAttendee: async (attendeeId, geofenceIds) => {
    await supabase.from('enrollment').delete().eq('attendeeId', attendeeId)
    if (geofenceIds.length > 0) {
      const records = geofenceIds.map(geofenceId => ({
        id: crypto.randomUUID(),
        attendeeId,
        geofenceId,
        createdAt: new Date().toISOString()
      }))
      await supabase.from('enrollment').insert(records)
    }
  }
}

// Real Prisma adapter implementation
const prismaDb: DBAdapter = {
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
    return prisma.organization.update({
      where: { id },
      data: { ...data, updatedAt: new Date() }
    })
  },
  deleteOrganization: async (id) => {
    return prisma.organization.delete({ where: { id } })
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
  login: async (email, pass) => supabaseDb.login(email, pass),
  createSession: async (userId, role) => supabaseDb.createSession(userId, role),
  getSession: async (token) => supabaseDb.getSession(token),
  deleteSession: async (token) => supabaseDb.deleteSession(token),
  registerAttendee: async (data) => supabaseDb.registerAttendee(data),
  getUsersByOrgCode: async (orgCode) => supabaseDb.getUsersByOrgCode(orgCode),
  createUser: async (data) => supabaseDb.createUser(data),
  deleteUser: async (id, role) => supabaseDb.deleteUser(id, role),
  updateUser: async (id, targetRole, data) => supabaseDb.updateUser(id, targetRole, data),
  getCategoriesByOrgCode: async (orgCode) => supabaseDb.getCategoriesByOrgCode(orgCode),
  createCategory: async (data) => supabaseDb.createCategory(data),
  updateCategory: async (id, data) => supabaseDb.updateCategory(id, data),
  deleteCategory: async (id) => supabaseDb.deleteCategory(id),
  verifyIdentity: async (email, birthDate) => supabaseDb.verifyIdentity(email, birthDate),
  resetPassword: async (email, birthDate, newPassword) => supabaseDb.resetPassword(email, birthDate, newPassword),
  enrollAttendee: async (attendeeId, geofenceIds) => supabaseDb.enrollAttendee(attendeeId, geofenceIds)
}

// Supabase Adapter export for client/server seamless compatibility
export const db: DBAdapter = supabaseDb
