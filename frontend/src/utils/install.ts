import { ref } from 'vue'

/**
 * Installing eSpace as an app (it is a PWA - see vite.config.ts's manifest).
 *  - Android / Chrome / Edge: the browser fires `beforeinstallprompt`; it is kept here (captured
 *    from main.ts before the app mounts, since it can fire very early) so an "Install" button can
 *    show the browser's own install dialog.
 *  - iPhone / iPad: there is no install API - the student adds it from Safari's Share menu, so
 *    the app shows those steps instead.
 */

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const deferredPrompt = ref<BeforeInstallPromptEvent | null>(null)
export const installed = ref(false)

/** Running as the installed app (home-screen / standalone window) rather than in a browser tab. */
export const isStandalone = (): boolean =>
  window.matchMedia?.('(display-mode: standalone)').matches || (navigator as any).standalone === true

/** iPhone, iPod or iPad (iPadOS reports itself as a Mac, but has touch). */
export const isIos = (): boolean =>
  /iphone|ipad|ipod/i.test(navigator.userAgent) || (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1)

export const isIpad = (): boolean =>
  /ipad/i.test(navigator.userAgent) || (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1)

/** Called once from main.ts. */
export const captureInstallPrompt = () => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt.value = e as BeforeInstallPromptEvent
  })
  window.addEventListener('appinstalled', () => {
    installed.value = true
    deferredPrompt.value = null
  })
}

/** The browser can show its own install dialog right now (Android / Chrome / Edge). */
export const canPromptInstall = () => !!deferredPrompt.value

/** Shows the browser's install dialog; true if the student accepted. */
export const promptInstall = async (): Promise<boolean> => {
  const e = deferredPrompt.value
  if (!e) return false
  deferredPrompt.value = null
  await e.prompt()
  const { outcome } = await e.userChoice
  if (outcome === 'accepted') installed.value = true
  return outcome === 'accepted'
}

export const installPromptAvailable = deferredPrompt
