import './styles/global.css'

import { QueryClientProvider } from '@tanstack/react-query'

import { Routes } from '../routes'
import { TitleBar } from './components/TitleBar'
import { Toaster } from './components/ui/sonner'
import { queryClient } from './lib/react-query'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-screen h-screen flex flex-col">
        <TitleBar />
        <Routes />
      </div>
      <Toaster position="top-right" />
    </QueryClientProvider>
  )
}
