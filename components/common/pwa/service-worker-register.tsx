'use client'

import { useEffect } from 'react'

const SW_PATH = '/service-worker.js'

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return

    const disabled = process.env.NEXT_PUBLIC_DISABLE_SW === 'true'
    const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname)
    const isEnabledEnv = process.env.NODE_ENV === 'production' || isLocal
    if (disabled || !isEnabledEnv) return

    let mounted = true

    const register = async () => {
      try {
        const registration = await navigator.serviceWorker.register(SW_PATH, {
          scope: '/',
        })

        if (!mounted) return

        // Ensure waiting workers become active without manual refresh.
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (!newWorker) return
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && registration.waiting) {
              registration.waiting.postMessage({ type: 'SKIP_WAITING' })
            }
          })
        })
      } catch (error) {
        console.error('Service worker registration failed', error)
      }
    }

    register()

    return () => {
      mounted = false
    }
  }, [])

  return null
}

export default ServiceWorkerRegister
