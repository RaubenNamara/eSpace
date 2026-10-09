import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import App from './App.vue'
import router from './router'
import { installOfflineSupport } from './utils/offline/adapter'
import { captureInstallPrompt } from './utils/install'
import './assets/style.css'

// Android/Chrome can fire its install offer before the app mounts - keep it for the Install button
captureInstallPrompt()

// Actively checks for a new deployment every 60s (rather than only whenever the browser
// happens to check on its own, which can be as rarely as once per navigation per day) and
// reloads as soon as one's found - registerType: 'autoUpdate' in vite.config.ts handles the
// new service worker taking over, but a tab already open still needs this to actually pick it
// up. See vite.config.ts's injectRegister: false for why this replaces the default script.
const { updateServiceWorker } = useRegisterSW({
  immediate: true,
  onRegisteredSW(_swScriptUrl, registration) {
    if (!registration) return
    const check = () => {
      registration.update().catch(() => {
        // Offline or a transient network error - the next check will just try again.
      })
    }
    setInterval(check, 60 * 1000)
    // An installed app on a phone/iPad sits suspended in the background, where timers don't run -
    // so also check the moment it comes back to the screen or back online, and the newest
    // deployment is what the student sees as soon as they open it.
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') check()
    })
    window.addEventListener('online', check)
  },
  onNeedRefresh() {
    updateServiceWorker(true)
  }
})

// Every page in this app calls the default `axios` import directly with paths hardcoded like
// `/api/...`. import.meta.env.BASE_URL is '/' in both dev and production (see vite.config.ts's
// `base`), so baseUrl is '' here and this is a no-op - kept in case a future deployment ever
// needs a subpath prefix again, in which case every one of those `/api/...` call sites would
// pick it up automatically through axios's default baseURL.
const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '')
if (baseUrl) {
  axios.defaults.baseURL = baseUrl
}

// Downloaded eNotes keep working without a network (see utils/offline)
installOfflineSupport()

// Create Vue app
const app = createApp(App)

// Use Pinia for state management
app.use(createPinia())

// Use Vue Router
app.use(router)

// Mount app
app.mount('#app')
