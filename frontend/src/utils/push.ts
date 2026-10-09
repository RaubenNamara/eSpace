import axios from 'axios'

/**
 * Browser (Web Push) notifications for this device. Turning them on asks the browser's permission
 * once, subscribes through the app's service worker, and registers the subscription for the
 * signed-in user (backend PushController / WebPushService). Every in-app notification is then
 * also delivered as a system notification, even when eSpace isn't open.
 */

export const pushSupported = (): boolean =>
  typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window

export const pushPermission = (): NotificationPermission | 'unsupported' =>
  pushSupported() ? Notification.permission : 'unsupported'

/** The app's service worker registration, or null if there isn't one (e.g. the dev server). */
const registration = async (): Promise<ServiceWorkerRegistration | null> => {
  if (!pushSupported()) return null
  const reg = await navigator.serviceWorker.getRegistration()
  if (!reg) return null
  // Wait (briefly) for it to be active - pushManager needs an active worker
  return Promise.race([
    navigator.serviceWorker.ready,
    new Promise<null>(resolve => setTimeout(() => resolve(null), 5000)),
  ])
}

export const pushAvailable = async (): Promise<boolean> => !!(await registration())

const keyBytes = (base64url: string): Uint8Array => {
  const padded = (base64url + '='.repeat((4 - (base64url.length % 4)) % 4)).replace(/-/g, '+').replace(/_/g, '/')
  const raw = atob(padded)
  return Uint8Array.from(raw, c => c.charCodeAt(0))
}

/** Subscribes this browser (if needed) and registers it for the signed-in user. */
const subscribeAndRegister = async (reg: ServiceWorkerRegistration): Promise<boolean> => {
  const res = await axios.get('/api/push/public-key')
  const serverKey = keyBytes(res.data.data.public_key)
  let sub = await reg.pushManager.getSubscription()
  // A subscription made for a different server key can't receive our pushes - replace it
  const current = sub?.options?.applicationServerKey
  if (sub && current && !sameKey(new Uint8Array(current as ArrayBuffer), serverKey)) {
    await sub.unsubscribe()
    sub = null
  }
  if (!sub) {
    sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: serverKey as BufferSource })
  }
  await axios.post('/api/push/subscribe', sub.toJSON())
  return true
}

const sameKey = (a: Uint8Array, b: Uint8Array) => a.length === b.length && a.every((v, i) => v === b[i])

/** Asks permission (if not yet decided) and turns notifications on. Returns whether they're on. */
export const enablePush = async (): Promise<boolean> => {
  const reg = await registration()
  if (!reg) return false
  const permission = Notification.permission === 'default' ? await Notification.requestPermission() : Notification.permission
  if (permission !== 'granted') return false
  return subscribeAndRegister(reg)
}

/**
 * After sign-in: if this browser already allowed notifications, make sure its subscription is
 * registered for whoever is signed in now. Never prompts.
 */
let syncing: Promise<void> | null = null
export const syncPush = (): Promise<void> => {
  if (pushPermission() !== 'granted') return Promise.resolve()
  syncing = (async () => {
    try {
      const reg = await registration()
      if (reg) await subscribeAndRegister(reg)
    } catch {
      // Best-effort - the in-app bell still works
    }
  })()
  return syncing
}

/** Before sign-out: stop this browser receiving the signed-in user's notifications. */
export const detachPush = async (): Promise<void> => {
  // A registration still in flight (signing out right after signing in) must not land after this
  if (syncing) await syncing
  try {
    if (!pushSupported()) return
    const reg = await navigator.serviceWorker.getRegistration()
    const sub = reg ? await reg.pushManager.getSubscription() : null
    if (sub) await axios.post('/api/push/unsubscribe', { endpoint: sub.endpoint }, { timeout: 4000 })
  } catch {
    // Best-effort
  }
}
