import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import './assets/style.css'

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
