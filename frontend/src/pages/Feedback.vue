<template>
  <!-- Anonymous feedback about Tusome (/feedback): who you are, then tick-box questions - the
       questions come from the server (FeedbackController::questions), so the form and the super
       admin's analysis always match. Nothing that identifies the person is sent or kept. -->
  <div class="site-plain min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-white overflow-x-clip">
    <SiteHeader on-dark />

    <main>
      <section class="relative overflow-hidden bg-indigo-950 pt-28 sm:pt-36 pb-14 sm:pb-20 text-white">
        <div class="absolute inset-0" aria-hidden="true">
          <div class="absolute -top-48 -right-40 w-[42rem] h-[42rem] rounded-full bg-indigo-600/30 blur-3xl"></div>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.07)_1px,transparent_0)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"></div>
        </div>
        <div class="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <span class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-indigo-100">
            <span class="w-1.5 h-1.5 rounded-full bg-indigo-300"></span>Anonymous · about 2 minutes
          </span>
          <h1 class="mt-5 font-jakarta text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.08]">Tell us about Tusome</h1>
          <p class="mt-5 max-w-2xl text-base sm:text-lg text-white/80 leading-relaxed">What works, what gets in your way, and what we should improve first. Your name, your account and your device are not recorded - even if you are signed in.</p>
        </div>
      </section>

      <section class="py-10 sm:py-14">
        <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div v-if="sent" class="rounded-3xl border border-slate-200 dark:border-white/10 p-8 sm:p-12 text-center">
            <span class="mx-auto w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300 flex items-center justify-center"><AppIcon name="check-circle" class="w-8 h-8" /></span>
            <h2 class="mt-5 font-jakarta text-2xl font-bold">Thank you</h2>
            <p class="mt-2 text-slate-600 dark:text-slate-400">Your answers have reached the Tusome team. We read every one.</p>
            <router-link to="/" class="mt-6 inline-flex px-5 py-2.5 rounded-2xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700">Back to Tusome</router-link>
          </div>

          <p v-else-if="loadError" class="rounded-2xl bg-rose-50 dark:bg-rose-500/10 p-5 text-sm text-rose-700 dark:text-rose-200">{{ loadError }}</p>
          <div v-else-if="!form" class="py-16 text-center text-sm text-slate-500">Loading...</div>

          <form v-else class="space-y-5" novalidate @submit.prevent="send">
            <!-- Who you are -->
            <fieldset :class="CARD">
              <legend class="sr-only">Who you are</legend>
              <p :class="QTEXT">I am a... <span class="text-rose-600">*</span></p>
              <div class="mt-3 flex flex-wrap gap-2">
                <button v-for="(label, key) in form.roles" :key="key" type="button" :class="pill(role === key)" :aria-pressed="role === key" @click="pickRole(String(key))">{{ label }}</button>
              </div>
              <label v-if="role === 'other'" class="mt-3 block">
                <span class="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Please say who you are *</span>
                <input v-model="roleOther" type="text" maxlength="60" placeholder="e.g. Librarian, Old student, Visitor" :class="INPUT">
              </label>
              <div v-if="role === 'student'" class="mt-4">
                <p class="text-xs font-semibold text-slate-600 dark:text-slate-300">Your class (optional)</p>
                <div class="mt-2 flex flex-wrap gap-2">
                  <button v-for="l in form.levels" :key="l" type="button" :class="pill(level === l, true)" :aria-pressed="level === l" @click="level = level === l ? '' : l">{{ l }}</button>
                </div>
              </div>
              <p v-if="errors.role || errors.role_other" class="mt-2 text-xs text-rose-600">{{ errors.role || errors.role_other }}</p>
            </fieldset>

            <!-- The questions -->
            <fieldset v-for="(q, i) in form.questions" :key="q.key" :class="CARD">
              <legend class="sr-only">{{ q.text }}</legend>
              <p :class="QTEXT"><span class="text-slate-400 font-semibold mr-1">{{ i + 1 }}.</span>{{ q.text }}<span v-if="q.required" class="text-rose-600"> *</span></p>

              <div v-if="q.type === 'scale'" class="mt-3 grid grid-cols-5 gap-2">
                <button v-for="(label, key) in q.options" :key="key" type="button" :aria-pressed="answers[q.key] === key"
                  class="flex flex-col items-center gap-1 rounded-2xl border px-1 py-3 text-xs font-semibold transition"
                  :class="answers[q.key] === key ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:border-indigo-400'"
                  @click="answers[q.key] = String(key)">
                  <span class="text-lg font-extrabold">{{ key }}</span><span class="leading-tight text-center">{{ label }}</span>
                </button>
              </div>

              <div v-else-if="q.type === 'single'" class="mt-3 flex flex-wrap gap-2">
                <button v-for="(label, key) in q.options" :key="key" type="button" :class="pill(answers[q.key] === key)" :aria-pressed="answers[q.key] === key" @click="toggleSingle(q.key, String(key))">{{ label }}</button>
              </div>

              <div v-else-if="q.type === 'multi'" class="mt-3 flex flex-wrap gap-2">
                <button v-for="(label, key) in q.options" :key="key" type="button" :class="pill(picked(q.key).includes(String(key)))" :aria-pressed="picked(q.key).includes(String(key))"
                  :disabled="!!q.max && picked(q.key).length >= q.max && !picked(q.key).includes(String(key))"
                  @click="toggleMulti(q, String(key))">
                  <span class="inline-flex items-center gap-1.5"><AppIcon v-if="picked(q.key).includes(String(key))" name="check-circle" class="w-4 h-4" />{{ label }}</span>
                </button>
                <p v-if="q.max" class="w-full text-xs text-slate-500 dark:text-slate-400">{{ picked(q.key).length }} of {{ q.max }} chosen</p>
              </div>

              <div v-else-if="q.type === 'grid'" class="mt-3 divide-y divide-slate-100 dark:divide-white/10">
                <div v-for="(rowLabel, row) in q.rows" :key="row" class="py-2.5 flex flex-col sm:flex-row sm:items-center gap-2">
                  <span class="text-sm font-medium sm:w-48 flex-shrink-0">{{ rowLabel }}</span>
                  <div class="flex flex-wrap gap-1.5">
                    <button v-for="(label, key) in q.options" :key="key" type="button" :class="pill(gridValue(q.key, String(row)) === key, true)" :aria-pressed="gridValue(q.key, String(row)) === key" @click="setGrid(q.key, String(row), String(key))">{{ label }}</button>
                  </div>
                </div>
              </div>
              <p v-if="errors[q.key]" class="mt-2 text-xs text-rose-600">{{ errors[q.key] }}</p>
            </fieldset>

            <fieldset :class="CARD">
              <legend class="sr-only">Anything else</legend>
              <p :class="QTEXT">Anything else you want to tell us? (optional)</p>
              <textarea v-model="comment" rows="4" maxlength="2000" placeholder="Please don't write your name or anyone else's" :class="[INPUT, 'mt-3']"></textarea>
            </fieldset>

            <!-- Never shown: only bots fill it in -->
            <input v-model="website" type="text" name="website" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true">
            <p v-if="error" class="text-sm text-rose-600">{{ error }}</p>
            <div class="flex flex-col sm:flex-row sm:items-center gap-3">
              <button type="submit" :disabled="sending" class="px-7 py-3 rounded-2xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 transition">{{ sending ? 'Sending...' : 'Send feedback' }}</button>
              <p class="text-xs text-slate-500 dark:text-slate-400">Only the starred questions are needed - skip anything you like.</p>
            </div>
          </form>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import AppIcon from '@/components/common/AppIcon.vue'
import SiteHeader from '@/components/site/SiteHeader.vue'
import SiteFooter from '@/components/site/SiteFooter.vue'
import { usePageMeta } from '@/components/site/usePageMeta'
import { useSiteScale } from '@/components/site/useSiteScale'

interface Question {
  key: string
  type: 'single' | 'scale' | 'grid' | 'multi'
  text: string
  required?: boolean
  max?: number
  options: Record<string, string>
  rows?: Record<string, string>
}
interface FormDef { roles: Record<string, string>; levels: string[]; questions: Question[] }

usePageMeta(() => ({
  title: 'Feedback - Tusome',
  description: 'Tell the Tusome team, anonymously, what works and what to improve.',
  path: '/feedback'
}))
useSiteScale()

const CARD = 'rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 sm:p-6'
const QTEXT = 'font-jakarta text-base sm:text-lg font-bold'
const INPUT = 'w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500'
const pill = (on: boolean, small = false) => [
  'rounded-full border font-semibold transition disabled:opacity-40',
  small ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm',
  on ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:border-indigo-400'
]

const form = ref<FormDef | null>(null)
const loadError = ref('')
const role = ref('')
const roleOther = ref('')
const level = ref('')
const answers = ref<Record<string, any>>({})
const comment = ref('')
const website = ref('')
const errors = ref<Record<string, string>>({})
const error = ref('')
const sending = ref(false)
const sent = ref(false)

const pickRole = (key: string) => {
  role.value = key
  if (key !== 'student') level.value = ''
}
const toggleSingle = (key: string, value: string) => {
  answers.value[key] = answers.value[key] === value ? undefined : value
}
const picked = (key: string): string[] => answers.value[key] ?? []
const toggleMulti = (q: Question, value: string) => {
  const list = picked(q.key)
  answers.value[q.key] = list.includes(value) ? list.filter(v => v !== value) : [...list, value]
}
const gridValue = (key: string, row: string) => answers.value[key]?.[row]
const setGrid = (key: string, row: string, value: string) => {
  const rows = { ...(answers.value[key] ?? {}) }
  if (rows[row] === value) delete rows[row]
  else rows[row] = value
  answers.value[key] = rows
}

onMounted(async () => {
  try {
    const res = await axios.get('/api/feedback/form')
    form.value = res.data.data
  } catch {
    loadError.value = 'The form could not be loaded - please check your connection and try again.'
  }
})

const send = async () => {
  errors.value = {}
  error.value = ''
  if (!role.value) errors.value.role = 'Please choose who you are'
  if (role.value === 'other' && !roleOther.value.trim()) errors.value.role_other = 'Please say who you are'
  for (const q of form.value?.questions ?? []) {
    if (q.required && !answers.value[q.key]) errors.value[q.key] = 'Please answer this one'
  }
  if (Object.keys(errors.value).length) {
    error.value = 'Please answer the starred questions.'
    return
  }
  sending.value = true
  try {
    await axios.post('/api/feedback', { role: role.value, role_other: roleOther.value, level: level.value, answers: answers.value, comment: comment.value, website: website.value })
    sent.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (err: any) {
    const e = err.response?.data?.errors
    if (e) errors.value = e
    error.value = err.response?.data?.message || 'Something went wrong - please try again.'
  } finally {
    sending.value = false
  }
}
</script>
