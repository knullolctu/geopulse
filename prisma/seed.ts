import { PrismaClient } from '../src/generated/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

const dbUrl = process.env.DATABASE_URL || "mysql://root@127.0.0.1:3306/geopulse"
const adapter = new PrismaMariaDb(dbUrl)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data in reverse order of dependencies
  await prisma.attendancelog.deleteMany()
  await prisma.enrollment.deleteMany()
  await prisma.geofence.deleteMany()
  await prisma.adminsession.deleteMany()
  await prisma.admin.deleteMany()
  await prisma.attendeesession.deleteMany()
  await prisma.attendee.deleteMany()
  await prisma.clientsession.deleteMany()
  await prisma.client.deleteMany()
  await prisma.category.deleteMany()
  await prisma.organization.deleteMany()

  const bcrypt = await import('bcryptjs')
  const adminHash = await bcrypt.default.hash('admin12345', 10)
  const passwordHash = await bcrypt.default.hash('password123', 10)

  // 1. Create System Admin
  await prisma.admin.create({
    data: {
      id: 'knullol-112822',
      email: 'knull.admin@geopulse.io',
      name: 'Knull Admin',
      passwordHash: adminHash,
      updatedAt: new Date()
    },
  })

  const orgs = [
    { id: 'org-1', name: 'Acme Geopulse Corp', orgCode: 'ACME123' },
    { id: 'org-2', name: 'Global Tech Solutions', orgCode: 'GTS456' },
    { id: 'org-3', name: 'Infinite Logistics', orgCode: 'LOGI789' },
  ]

  for (const orgData of orgs) {
    console.log(`  Creating organization: ${orgData.name}...`)
    const org = await prisma.organization.create({
      data: {
        id: orgData.id,
        name: orgData.name,
        orgCode: orgData.orgCode,
        updatedAt: new Date()
      },
    })

    // Create a category for each org
    const cat = await prisma.category.create({
      data: {
        id: `cat-${orgData.id}`,
        name: 'General Personnel',
        orgId: org.id,
        updatedAt: new Date()
      }
    })

    // 2. Create 2 Clients per Org
    for (let i = 1; i <= 2; i++) {
      const clientId = `client-${orgData.id}-${i}`
      await prisma.client.create({
        data: {
          id: clientId,
          email: `client${i}@${orgData.orgCode.toLowerCase()}.com`,
          name: `${orgData.name} Client ${i}`,
          passwordHash: passwordHash,
          orgCode: org.orgCode,
          isVerified: true,
          updatedAt: new Date()
        }
      })

      // Create a geofence for the first client of each org
      if (i === 1) {
        await prisma.geofence.create({
          data: {
            id: `geo-${orgData.id}`,
            name: `${orgData.name} HQ`,
            latitude: 14.5995 + (Math.random() * 0.1),
            longitude: 120.9842 + (Math.random() * 0.1),
            radius: 150,
            orgId: org.id,
            createdByClientId: clientId,
            updatedAt: new Date()
          },
        })
      }
    }

    // 3. Create 10 Attendees per Org
    for (let i = 1; i <= 10; i++) {
      const attendeeId = `att-${orgData.id}-${i}`
      await prisma.attendee.create({
        data: {
          id: attendeeId,
          email: `user${i}@${orgData.orgCode.toLowerCase()}.io`,
          name: `${orgData.name} Employee ${i}`,
          passwordHash,
          orgCode: org.orgCode,
          categoryId: cat.id,
          isVerified: i <= 8, // 8 verified, 2 pending
          updatedAt: new Date()
        }
      })
    }
  }

  console.log('✅ Database seeding complete')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
