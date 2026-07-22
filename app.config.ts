import { defineConfig } from '@tanstack/react-start/config'

export default defineConfig({
  tsr: {
    appDirectory: 'src',
    routesDirectory: 'src/routes',
    generatedRouteTree: 'src/routeTree.gen.ts',
  },
  routers: {
    client: {
      base: '/geopulse',
    },
    ssr: {
      base: '/geopulse',
    }
  },
  server: {
    preset: 'static',
  },
  vite: {
    base: '/geopulse/',
    server: {
      allowedHosts: true,
    },
    plugins: [
      // @ts-ignore
      (await import('@tailwindcss/vite')).default()
    ]
  }
})
