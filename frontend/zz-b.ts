import { createApp, h } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createMemoryHistory, RouterView } from 'vue-router'
import axios from 'axios'
import './src/assets/style.css'
import ENoteBuilder from './src/pages/teacher/ENoteBuilder.vue'
const w = window as any
w.puts = []
const topic = { id: 5, title: 'Forces', subject_id: 1, subject_name: 'Physics', class_id: 1, status: 'draft', cover_design: null, pages: [{ id: 51, topic_id: 5, title: 'Page', content: '<p>Original text.</p>', order_number: 1, is_active: 1, narrations: [], linked_assignment: null }] }
axios.defaults.adapter = async (config: any) => {
  if (config.method === 'put') w.puts.push({ url: config.url, body: JSON.parse(config.data) })
  const data = config.url.includes('/topics/5') && config.method === 'get' ? topic : {}
  return { data: { success: true, data }, status: 200, statusText: 'OK', headers: {}, config }
}
const router = createRouter({ history: createMemoryHistory(), routes: [
  { path: '/teacher/enotes/builder/:id', component: ENoteBuilder },
  { path: '/teacher/enotes/preview/:id', component: { render: () => h('h1', { id: 'preview' }, 'PREVIEW PAGE') } },
  { path: '/:p(.*)*', component: { render: () => null } }
] })
const app = createApp({ render: () => h(RouterView) }).use(createPinia()).use(router)
router.push('/teacher/enotes/builder/5').then(() => app.mount('#app'))
w.router = router
