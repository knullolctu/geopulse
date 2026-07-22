import { defineConfig } from '@tanstack/react-start/config'

export default defineConfig({
  tsr: {
    appDirectory: 'src',
    routesDirectory: 'src/routes',
    generatedRouteTree: 'src/routeTree.gen.ts',
  },
  vite: {
    server: {
      allowedHosts: true
    },
    plugins: [
        // @ts-ignore
        (await import('@tailwindcss/vite')).default()
    ]
  }
})
