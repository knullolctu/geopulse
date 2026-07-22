import { HeadContent, Scripts, createRootRoute, Outlet } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import DevCreditButton from '../components/DevCreditButton'
import { NotificationProvider } from '../components/Notification'

import '../styles.css'

const queryClient = new QueryClient()

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'GeoPulse' },
    ],
  }),
  shellComponent: RootDocument,
  component: RootComponent,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </QueryClientProvider>
        <DevCreditButton />
        <Scripts />
      </body>
    </html>
  )
}

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <Outlet />
      </NotificationProvider>
    </QueryClientProvider>
  )
}
