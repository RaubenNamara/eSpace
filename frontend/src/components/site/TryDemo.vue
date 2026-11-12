<template>
  <!-- "Try Tusome now": four doors into the live demo school (DemoSchool) - no sign-up, no
       password. Always shown; while the demo school is closed, a door says so and points to the
       demo request form below. -->
  <div class="rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 p-6 sm:p-10">
    <div class="max-w-2xl">
      <span class="inline-flex items-center rounded-full bg-gold-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-indigo-900 dark:bg-gold-400/15 dark:text-gold-300">No sign-up</span>
      <h2 class="mt-3 font-heading text-3xl sm:text-4xl font-extrabold tracking-tight">Try Tusome now</h2>
      <p class="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed">Walk into our demo school - real notes and assessments, made-up learners and teachers. Open it as anyone. Change what you like: it is all put back every night.</p>
    </div>
    <div class="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <button
        v-for="d in DOORS"
        :key="d.as"
        type="button"
        class="group text-left rounded-2xl border border-slate-200 dark:border-white/10 bg-cream-100/60 dark:bg-white/5 p-5 hover:border-indigo-400 hover:bg-white dark:hover:bg-white/10 hover:shadow-lg transition disabled:opacity-60 disabled:cursor-wait"
        :disabled="!!busy"
        @click="enter(d.as)"
      >
        <span class="w-11 h-11 rounded-xl bg-indigo-900 text-white flex items-center justify-center"><AppIcon :name="d.icon" class="w-5 h-5" /></span>
        <span class="mt-4 block font-heading text-lg font-bold text-slate-900 dark:text-white">{{ d.title }}</span>
        <span class="mt-1 block text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{{ d.text }}</span>
        <span class="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-indigo-800 dark:text-indigo-300">
          {{ busy === d.as ? 'Opening…' : 'Open' }}
          <svg class="w-4 h-4 group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
        </span>
      </button>
    </div>
    <p v-if="error" class="mt-4 text-sm text-rose-600">{{ error }} <a href="#demo" class="font-semibold underline">Ask us for a demo instead</a>.</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
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

const router = useRouter()
const auth = useAuthStore()
const open = ref(false)
const busy = ref<Door | ''>('')
const error = ref('')

const enter = async (as: Door) => {
  if (!open.value) {
    error.value = 'The demo school opens soon.'
    return
  }
  busy.value = as
  error.value = ''
  try {
    if (as === 'parent') {
      const res = await axios.post('/api/demo/enter', { as })
      await router.push(res.data.data.parent_url)
      return
    }
    const r = await auth.enterDemo(as)
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
  try {
    const res = await axios.get('/api/demo')
    open.value = !!res.data?.data?.open
  } catch {
    open.value = false
  }
})
</script>
