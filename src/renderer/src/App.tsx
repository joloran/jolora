import './styles/global.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Routes } from '../routes'
import { TitleBar } from './components/TitleBar'
import { AlertUpdater } from './components/ui/alert-updater'
import { Toaster } from './components/ui/sonner'
import { queryClient } from './lib/react-query'

export function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = window.api.jumpList.onUserSelected((user) => {
      if (user.id) {
        navigate(`/user/${user.id}`)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [navigate])

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-screen h-screen flex flex-col">
        <TitleBar />
        <Routes />
      </div>
      <AlertUpdater />
      <Toaster position="top-right" />
    </QueryClientProvider>
  )
}
