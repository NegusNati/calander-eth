const CACHE_VERSION = 'v1.0.0'
const STATIC_CACHE = `static-${CACHE_VERSION}`
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`
const OFFLINE_URL = '/offline'

const PRECACHE_URLS = [
  '/',
  OFFLINE_URL,
  '/fav/manifest.webmanifest',
  '/fav/android-chrome-192x192.png',
  '/fav/android-chrome-512x512.png',
  '/shader_bg.svg',
  '/icon.svg',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== STATIC_CACHE && key !== RUNTIME_CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  const url = new URL(event.request.url)
  const isSameOrigin = url.origin === self.location.origin

  // Offline-first navigation: try network, fall back to cached page or offline shell.
  if (event.request.mode === 'navigate' && isSameOrigin) {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(event.request)
          const cache = await caches.open(RUNTIME_CACHE)
          cache.put(event.request, networkResponse.clone())
          return networkResponse
        } catch {
          const cachedResponse = await caches.match(event.request)
          if (cachedResponse) return cachedResponse
          return caches.match(OFFLINE_URL)
        }
      })(),
    )
    return
  }

  const cacheFirstDestinations = ['style', 'script', 'font', 'image', 'manifest']
  if (cacheFirstDestinations.includes(event.request.destination) && isSameOrigin) {
    event.respondWith(
      (async () => {
        const cachedResponse = await caches.match(event.request)
        if (cachedResponse) return cachedResponse

        try {
          const networkResponse = await fetch(event.request)
          const cache = await caches.open(RUNTIME_CACHE)
          cache.put(event.request, networkResponse.clone())
          return networkResponse
        } catch {
          return cachedResponse
        }
      })(),
    )
  }
})
