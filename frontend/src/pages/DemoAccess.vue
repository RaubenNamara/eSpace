<template>
  <!-- A school's private demo link (/demo/{token}), sent from Admin > Demo requests after the school
       asked for a demo. While the link works (7 days) it opens the demo school (DemoSchool) as a
       learner, a teacher, the head teacher or a parent, in one tap. -->
  <div class="site-plain min-h-screen bg-cream-100 font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-white">
    <header class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/10">
      <div class="mx-auto max-w-5xl px-4 py-3 flex items-center gap-3">
        <router-link to="/" aria-label="Tusome home"><Wordmark size="sm" /></router-link>
        <span class="flex-1"></span>
        <span v-if="link" class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Open until {{ until }}</span>
      </div>
    </header>

    <main class="mx-auto max-w-5xl px-4 py-8 sm:py-14">
      <div v-if="loading" class="py-24 text-center text-slate-400">Opening your demo…</div>

      <div v-else-if="!link" class="py-16 text-center">
        <span class="mx-auto w-14 h-14 rounded-2xl bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-500"><AppIcon name="clock" class="w-7 h-7" /></span>
        <h1 class="font-heading mt-4 text-2xl font-semibold">This demo link has ended</h1>
        <p class="mt-2 text-slate-600 dark:text-slate-400 max-w-md mx-auto">Demo links work for 7 days. Ask us again and we'll send you a fresh one.</p>
        <router-link :to="{ path: '/', hash: '#demo' }" class="mt-6 inline-flex px-5 py-2.5 rounded-xl text-sm font-semibold text-indigo-950 bg-gold-400 hover:bg-gold-300">Request a demo</router-link>
      </div>

      <div v-else class="relative overflow-hidden rounded-[2rem] bg-indigo-950 text-white p-6 sm:p-10 ring-1 ring-gold-400/30 shadow-2xl shadow-indigo-950/30">
        <div class="absolute -left-20 -bottom-24 w-80 h-80 rounded-full bg-gold-400/10 blur-3xl" aria-hidden="true"></div>
        <div class="absolute right-0 top-0 h-1.5 w-1/3 bg-gold-400" aria-hidden="true"></div>
        <div class="relative max-w-2xl">
          <span class="inline-flex items-center rounded-full bg-gold-400 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-950">Your demo &middot; {{ link.school_name }}</span>
          <h1 class="mt-4 font-heading text-3xl sm:text-5xl font-semibold tracking-tight">Welcome{{ firstName ? `, ${firstName}` : '' }}</h1>
          <p class="mt-3 text-white/80 leading-relaxed sm:text-lg">This is our demo school - real notes and assessments, made-up learners and teachers. Open it as anyone, in one tap, and change what you like. Your link works until {{ until }}; what you change is wiped after the week.</p>
        </div>
        <div class="relative mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            v-for="d in DOORS"
            :key="d.as"
            type="button"
            class="group text-left rounded-2xl bg-cream-100 text-slate-900 p-5 ring-2 ring-transparent hover:ring-gold-400 hover:-translate-y-1 hover:shadow-xl transition disabled:opacity-60 disabled:cursor-wait"
            :disabled="!!busy || !link.open"
            @click="enter(d.as)"
          >
            <span class="w-11 h-11 rounded-xl bg-indigo-900 text-white flex items-center justify-center"><AppIcon :name="d.icon" class="w-5 h-5" /></span>
            <span class="mt-4 block font-heading text-lg font-semibold text-slate-900">{{ d.title }}</span>
            <span class="mt-1 block text-sm text-slate-600 leading-relaxed">{{ d.text }}</span>
            <span class="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-indigo-900 px-3 py-1.5 text-sm font-semibold text-white group-hover:bg-indigo-800">
              {{ busy === d.as ? 'Opening…' : 'Open' }}
              <svg class="w-4 h-4 group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </span>
          </button>
        </div>
        <p v-if="!link.open" class="relative mt-4 text-sm text-gold-200">The demo school is being prepared - please try again in a few minutes.</p>
        <p v-if="error" class="relative mt-4 text-sm text-gold-200">{{ error }}</p>
      </div>

      <p v-if="link" class="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">This link is for {{ link.school_name }} - please keep it to your school. Questions? Write to {{ support }}.</p>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import Wordmark from '@/components/brand/Wordmark.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { useAuthStore } from '@/stores/auth'

type Door = 'learner' | 'teacher' | 'head' | 'parent'
const DOORS: { as: Door; title: string; text: string; icon: string }[] = [
  { as: 'learner', title: 'As a learner', text: 'Aisha in S.2: her notes, assessments to answer, Learning Map and report card.', icon: 'book' },
  { as: 'teacher', title: 'As a teacher', text: 'Ms Nakato: set and mark work, write eNotes, see who needs help in her class.', icon: 'teacher' },
  { as: 'head', title: 'As the head teacher', text: 'The whole school: report cards, the monthly impact report, staff and learners.', icon: 'chart' },
  { as: 'parent', title: 'As a parent', text: 'Aisha\'s weekly update and her report card - what parents see, with no login.', icon: 'star' }
]
const HOME: Record<string, string> = { student: '/student/dashboard', teacher: '/teacher/dashboard', admin: '/admin/dashboard', super_admin: '/admin/dashboard' }
const support = 'support@tusome.ug'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const token = String(route.params.token || '')
const link = ref<{ school_name: string; contact_name: string; expires_at: string; open: boolean } | null>(null)
const loading = ref(true)
const busy = ref<Door | ''>('')
const error = ref('')

const firstName = computed(() => (link.value?.contact_name || '').trim().split(/\s+/)[0] || '')
const until = computed(() => (link.value ? new Date(link.value.expires_at.replace(' ', 'T')).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }) : ''))

const enter = async (as: Door) => {
  busy.value = as
  error.value = ''
  try {
    if (as === 'parent') {
      const res = await axios.post('/api/demo/enter', { as, token })
      await router.push(res.data.data.parent_url)
      return
    }
    const r = await auth.enterDemo(as, token)
    if (!r.success) {
      error.value = r.message || 'The demo school could not be opened just now.'
      return
    }
    await router.push(HOME[r.user!.role] || '/')
  } catch (e: any) {
    error.value = e.response?.data?.message || 'The demo school could not be opened just now.'
  } finally {
    busy.value = ''
  }
}

onMounted(async () => {
  document.title = 'Your Tusome demo'
  let meta = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')
  if (!meta) { meta = document.createElement('meta'); meta.name = 'robots'; document.head.appendChild(meta) }
  meta.content = 'noindex, nofollow'
  try {
    const res = await axios.get(`/api/demo/link/${encodeURIComponent(token)}`)
    link.value = res.data.data
    // remembered for the demo banner's "Back to the demo" while the link works
    try { localStorage.setItem('tusome_demo_link', token) } catch { /* private window */ }
  } catch {
    link.value = null
  } finally {
    loading.value = false
  }
})
</script>
