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
// `/api/...` (relative to the domain root) rather than going through a shared instance - a
// root-relative '/api/...' would miss the backend entirely since the app is served under
// /eSpace/ in both dev and production. Setting the default instance's baseURL here covers every
// one of those call sites at once: axios's own URL-combining already strips/rejoins slashes
// correctly, so '/api/foo' becomes '/eSpace/api/foo'. import.meta.env.BASE_URL is '/eSpace/' in
// both dev (Vite's dev server proxies /eSpace/api itself, see vite.config.ts) and the production
// build (see vite.config.ts's `base`), so this needs no separate env var of its own.
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
