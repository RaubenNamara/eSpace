import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import App from './App.vue'
import router from './router'
import './assets/style.css'

// Actively checks for a new deployment every 60s (rather than only whenever the browser
// happens to check on its own, which can be as rarely as once per navigation per day) and
// reloads as soon as one's found - registerType: 'autoUpdate' in vite.config.ts handles the
// new service worker taking over, but a tab already open still needs this to actually pick it
// up. See vite.config.ts's injectRegister: false for why this replaces the default script.
const { updateServiceWorker } = useRegisterSW({
  immediate: true,
  onRegisteredSW(_swScriptUrl, registration) {
    if (!registration) return
    setInterval(() => {
      registration.update().catch(() => {
        // Offline or a transient network error - the next interval will just try again.
      })
    }, 60 * 1000)
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

// Create Vue app
const app = createApp(App)

// Use Pinia for state management
app.use(createPinia())

// Use Vue Router
app.use(router)

// Mount app
app.mount('#app')
