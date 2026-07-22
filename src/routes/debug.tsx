import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/debug')({
  component: () => <div className="p-20 font-black text-4xl">SYSTEM ONLINE</div>
})
