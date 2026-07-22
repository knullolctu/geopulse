import { createRequire } from 'node:module'
import type { PrismaClient } from './generated/client'

const FALLBACK_URL = "mysql://root@127.0.0.1:3306/geopulse"
const require = createRequire(import.meta.url)

function createMariaDbConfig(databaseUrl: string) {
  const url = new URL(databaseUrl)
  const database = url.pathname.replace(/^\//, '')
  const connectionLimit = Number(url.searchParams.get('connection_limit') ?? '10')
  const minimumIdle = Number(url.searchParams.get('minimum_idle') ?? '1')
  const idleTimeout = Number(url.searchParams.get('idle_timeout') ?? '30')

  return {
    host: url.hostname,
    port: url.port ? Number(url.port) : undefined,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database,
    connectionLimit: Number.isFinite(connectionLimit) && connectionLimit > 0 ? connectionLimit : 10,
    minimumIdle: Number.isFinite(minimumIdle) && minimumIdle >= 0 ? minimumIdle : 1,
    idleTimeout: Number.isFinite(idleTimeout) && idleTimeout > 0 ? idleTimeout : 30,
  }
}

declare global {
  var prismaGlobal: undefined | PrismaClient
  var prismaInitPromise: Promise<PrismaClient> | undefined
  var isPrismaInitializing: boolean | undefined
}

async function getPrisma(): Promise<PrismaClient> {
  if (typeof window !== 'undefined') {
    throw new Error('Prisma cannot be accessed on the client')
  }

  if (globalThis.prismaGlobal) {
    return globalThis.prismaGlobal
  }

  if (globalThis.prismaInitPromise) {
    return globalThis.prismaInitPromise
  }

  console.log('[database] Initializing new Prisma Client (v2)...')
  globalThis.prismaInitPromise = (async () => {
    // Force a fresh require of the generated client
    const { PrismaClient: PrismaClientClass } = require('./generated/client/index.js')
    const { PrismaMariaDb } = await import('@prisma/adapter-mariadb')
    const dbUrl = process.env.DATABASE_URL || FALLBACK_URL
    const adapter = new PrismaMariaDb(createMariaDbConfig(dbUrl))

    // Explicitly using our generated client
    const client = new PrismaClientClass({ adapter })

    globalThis.prismaGlobal = client
    return client
  })()

  return globalThis.prismaInitPromise.catch((error) => {
    globalThis.prismaInitPromise = undefined
    throw error
  })
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    void globalThis.prismaGlobal?.$disconnect()
    globalThis.prismaGlobal = undefined
    globalThis.prismaInitPromise = undefined
  })

}

export { getPrisma }

export const prisma = new Proxy({} as PrismaClient, {
  get: (_target, prop) => {
    if (typeof window !== 'undefined') {
      // In the browser, we return a harmless dummy or throw a more descriptive error
      // But we shouldn't even be getting here if tree-shaking works.
      console.warn(`Prisma property ${String(prop)} accessed on the client.`)
      return undefined
    }
    
    if (!globalThis.prismaGlobal) {
        throw new Error('Prisma not initialized. Call getPrisma() first or ensure server-only execution.')
    }
    return (globalThis.prismaGlobal as any)[prop]
  }
})
