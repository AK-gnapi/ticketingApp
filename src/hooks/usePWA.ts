import { useEffect, useState } from 'react'

export function usePWA() {
  const [isInstalled, setIsInstalled] = useState(false)
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    // Check if app is installed
    const checkIfInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true)
      }
    }

    // Handle online/offline status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    // Handle service worker updates
    const handleSWUpdate = () => {
      window.dispatchEvent(new CustomEvent('sw-update'))
    }

    checkIfInstalled()

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    window.addEventListener('sw-update', handleSWUpdate)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('sw-update', handleSWUpdate)
    }
  }, [])

  return {
    isInstalled,
    isOnline
  }
} 