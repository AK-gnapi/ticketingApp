import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export function PWAUpdatePrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false)

  useEffect(() => {
    // Handle install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowInstallPrompt(true)
    }

    // Handle app installed
    const handleAppInstalled = () => {
      setShowInstallPrompt(false)
      setDeferredPrompt(null)
      console.log('PWA was installed')
    }

    // Handle service worker updates
    const handleSWUpdate = () => {
      setShowUpdatePrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)
    window.addEventListener('sw-update', handleSWUpdate)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
      window.removeEventListener('sw-update', handleSWUpdate)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    } else {
      console.log('User dismissed the install prompt')
    }

    setDeferredPrompt(null)
    setShowInstallPrompt(false)
  }

  const handleUpdateClick = () => {
    window.location.reload()
  }

  if (!showInstallPrompt && !showUpdatePrompt) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {showInstallPrompt && (
        <div className="bg-blue-600 text-white p-4 rounded-lg shadow-lg max-w-sm">
          <h3 className="font-semibold mb-2">Install Ticketing App</h3>
          <p className="text-sm mb-3">Install this app for a better experience</p>
          <div className="flex gap-2">
            <button
              onClick={handleInstallClick}
              className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium"
            >
              Install
            </button>
            <button
              onClick={() => setShowInstallPrompt(false)}
              className="text-blue-100 px-3 py-1 rounded text-sm"
            >
              Later
            </button>
          </div>
        </div>
      )}

      {showUpdatePrompt && (
        <div className="bg-green-600 text-white p-4 rounded-lg shadow-lg max-w-sm">
          <h3 className="font-semibold mb-2">Update Available</h3>
          <p className="text-sm mb-3">A new version is available</p>
          <div className="flex gap-2">
            <button
              onClick={handleUpdateClick}
              className="bg-white text-green-600 px-3 py-1 rounded text-sm font-medium"
            >
              Update
            </button>
            <button
              onClick={() => setShowUpdatePrompt(false)}
              className="text-green-100 px-3 py-1 rounded text-sm"
            >
              Later
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 