import { useState, useEffect } from 'react'
import './App.css'
import { PWAUpdatePrompt } from './components/PWAUpdatePrompt'
import { OfflinePage } from './components/OfflinePage'

function App() {
  const [count, setCount] = useState(0)
  const [pwaStatus, setPwaStatus] = useState<string>('Checking...')

  useEffect(() => {
    // Check PWA status
    const checkPWAStatus = () => {
      const status = []
      
      // Check if service worker is supported
      if ('serviceWorker' in navigator) {
        status.push('✅ Service Worker supported')
      } else {
        status.push('❌ Service Worker not supported')
      }

      // Check if manifest is loaded
      const manifestLink = document.querySelector('link[rel="manifest"]')
      if (manifestLink) {
        status.push('✅ Manifest link found')
      } else {
        status.push('❌ Manifest link not found')
      }

      // Check if HTTPS
      if (window.location.protocol === 'https:') {
        status.push('✅ HTTPS enabled')
      } else {
        status.push('❌ Not HTTPS')
      }

      setPwaStatus(status.join('\n'))
    }

    checkPWAStatus()
  }, [])

  return (
    <>
      <div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        
        {/* PWA Status Debug */}
        <div style={{ 
          background: '#f0f0f0', 
          padding: '10px', 
          margin: '10px 0', 
          borderRadius: '5px',
          fontSize: '12px',
          whiteSpace: 'pre-line'
        }}>
          <strong>PWA Status:</strong>
          <br />
          {pwaStatus}
        </div>
      </div>
      <PWAUpdatePrompt />
      <OfflinePage />
    </>
  )
}

export default App
