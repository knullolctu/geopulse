import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  base: '/geopulse/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 3000,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '.ngrok-free.dev',
      'unrayed-brusquely-enid.ngrok-free.dev'
    ]
  },
  plugins: [
    tailwindcss(),
    tanstackStart({ routeFileIgnorePattern: "/api/" }),
    viteReact(),
  ],
})
