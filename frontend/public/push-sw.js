/*
 * Web Push handling, loaded into the app's service worker (vite.config.ts workbox.importScripts).
 * The server (backend WebPushService) sends { title, body, url, tag } for every in-app
 * notification; this shows it as a system notification, and tapping it opens or focuses eSpace
 * at that notification's page.
 */
self.addEventListener('push', (event) => {
  let data = {}
  try {
    data = event.data ? event.data.json() : {}
  } catch (e) {
    data = { body: event.data ? event.data.text() : '' }
  }
  const title = data.title || 'eSpace'
  event.waitUntil(
    self.registration.showNotification(title, {
      body: data.body || '',
      icon: '/pwa-192x192.png',
      badge: '/pwa-192x192.png',
      // Same kind + same page replaces the earlier one instead of stacking duplicates
      tag: data.tag ? `${data.tag}:${data.url || ''}` : undefined,
      data: { url: data.url || '/' },
    })
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = new URL((event.notification.data && event.notification.data.url) || '/', self.location.origin).href
  event.waitUntil((async () => {
    const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true })
    const open = windows.find((w) => new URL(w.url).origin === self.location.origin)
    if (open) {
      // An eSpace tab is already open: bring it forward and let the app route there
      await open.focus()
      open.postMessage({ type: 'espace-open-url', url })
      return
    }
    await self.clients.openWindow(url)
  })())
})
