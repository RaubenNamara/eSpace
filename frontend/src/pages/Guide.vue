<template>
  <!-- The public eSpace user guide: one part per role, searchable, every topic linkable
       (/guide#teacher, /guide#t-marking). Content lives in data/guide.ts. -->
  <div class="site-plain min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-white">
    <header class="sticky top-0 z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 print:hidden">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
        <!-- Back to the website -->
        <router-link to="/" class="flex-shrink-0 inline-flex items-center gap-1.5 -ml-1.5 px-2 py-1.5 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10" title="Back to the eSpace home page">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          <span class="hidden md:inline">eSpace home</span>
        </router-link>
        <router-link to="/" aria-label="eSpace home" class="flex-shrink-0"><Wordmark size="sm" /></router-link>
        <span class="hidden sm:inline text-slate-300 dark:text-slate-600">/</span>
        <span class="hidden sm:inline text-sm font-semibold text-slate-600 dark:text-slate-300">User guide</span>
        <div class="flex-1"></div>
        <div class="relative w-40 sm:w-64">
          <svg class="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"></path></svg>
          <input v-model="search" type="search" placeholder="Search the guide" class="w-full pl-8 pr-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500">
        </div>
        <button type="button" class="hidden sm:inline-flex p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10" title="Print this guide" @click="printGuide">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
        </button>
        <button type="button" class="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10" :aria-label="theme.isDarkMode ? 'Light mode' : 'Dark mode'" @click="theme.toggleTheme()">
          <svg v-if="theme.isDarkMode" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
        </button>
        <router-link :to="account.to" class="hidden sm:inline-flex whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700">{{ account.label }}</router-link>
      </div>
    </header>

    <!-- Hero -->
    <section class="relative overflow-hidden border-b border-slate-200 dark:border-white/10 print:border-0">
      <div class="absolute inset-0 -z-10 bg-slate-50 dark:bg-white/[0.02]" aria-hidden="true"></div>
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <p class="text-sm font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-300">User guide</p>
        <h1 class="mt-2 font-jakarta text-3xl sm:text-5xl font-extrabold tracking-tight">How to use eSpace</h1>
        <p class="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">Short, step-by-step help for students, teachers, heads of department and administrators. Pick your role, or search for what you want to do.</p>
        <div class="mt-6 flex flex-wrap gap-2 print:hidden">
          <a v-for="p in GUIDE" :key="p.key" :href="`#${p.key}`" class="px-4 py-2 rounded-xl text-sm font-semibold bg-white border border-slate-200 text-slate-700 hover:border-indigo-300 hover:text-indigo-700 dark:bg-white/5 dark:border-white/10 dark:text-slate-200 dark:hover:text-white" @click="search = ''">{{ p.label }}</a>
        </div>
      </div>
    </section>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid lg:grid-cols-[16rem_1fr] gap-10">
      <!-- Contents -->
      <aside class="hidden lg:block print:hidden">
        <nav class="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2 text-sm" aria-label="Guide contents">
          <div v-for="p in GUIDE" :key="p.key" class="mb-5">
            <a :href="`#${p.key}`" class="block font-bold text-slate-900 dark:text-white mb-1.5" @click="search = ''">{{ p.label }}</a>
            <a v-for="t in p.topics" :key="t.id" :href="`#${t.id}`" class="block py-1 pl-3 border-l-2 transition" :class="activeId === t.id ? 'border-indigo-500 text-indigo-700 dark:text-indigo-300 font-semibold' : 'border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'" @click="search = ''">{{ t.title }}</a>
          </div>
        </nav>
      </aside>

      <main class="min-w-0">
        <p v-if="search && !matchCount" class="py-16 text-center text-slate-500 dark:text-slate-400">Nothing in the guide matches "{{ search }}". Try another word.</p>
        <p v-else-if="search" class="mb-6 text-sm text-slate-500 dark:text-slate-400">{{ matchCount }} {{ matchCount === 1 ? 'topic matches' : 'topics match' }} "{{ search }}"</p>

        <section v-for="p in shownParts" :id="p.key" :key="p.key" class="mb-14 scroll-mt-24">
          <div class="mb-6 pb-3 border-b border-slate-200 dark:border-white/10">
            <h2 class="font-jakarta text-2xl sm:text-3xl font-extrabold tracking-tight">{{ p.label }}</h2>
            <p class="mt-1 text-slate-600 dark:text-slate-400">{{ p.blurb }}</p>
          </div>
          <div class="grid gap-5">
            <article v-for="t in p.topics" :id="t.id" :key="t.id" class="topic scroll-mt-24 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5 sm:p-6 break-inside-avoid" :data-topic="t.id">
              <div class="flex items-start gap-3">
                <span class="w-10 h-10 flex-shrink-0 rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300 flex items-center justify-center"><AppIcon :name="t.icon" class="w-5 h-5" /></span>
                <div class="min-w-0 flex-1">
                  <h3 class="font-jakarta text-lg font-bold">
                    <a :href="`#${t.id}`" class="hover:underline">{{ t.title }}</a>
                  </h3>
                  <p v-if="t.intro" class="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{{ t.intro }}</p>
                </div>
              </div>
              <ol v-if="t.steps?.length" class="mt-4 space-y-2.5">
                <li v-for="(s, i) in t.steps" :key="i" class="flex gap-3 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  <span class="w-6 h-6 flex-shrink-0 rounded-full bg-slate-100 dark:bg-white/10 text-xs font-bold flex items-center justify-center text-slate-600 dark:text-slate-300">{{ i + 1 }}</span>
                  <span class="pt-0.5">{{ s }}</span>
                </li>
              </ol>
              <div v-if="t.tips?.length" class="mt-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200/70 dark:border-amber-500/20 p-3">
                <p v-for="(tip, i) in t.tips" :key="i" class="flex gap-2 text-sm text-amber-900 dark:text-amber-100"><AppIcon name="bulb" class="w-4 h-4 mt-0.5 flex-shrink-0" />{{ tip }}</p>
              </div>
            </article>
          </div>
        </section>

        <div class="mt-4 rounded-3xl bg-slate-900 dark:bg-white/5 dark:border dark:border-white/10 p-6 sm:p-8 text-white print:hidden">
          <h2 class="font-jakarta text-xl font-bold">Still stuck?</h2>
          <p class="mt-1 text-sm text-slate-300">Ask a teacher or your school's eSpace administrator - or, if your school isn't on eSpace yet, request a demo.</p>
          <div class="mt-4 flex flex-wrap gap-2">
            <router-link :to="account.to" class="px-4 py-2 rounded-xl text-sm font-semibold bg-white text-slate-900">{{ account.label }}</router-link>
            <router-link to="/" class="px-4 py-2 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/20">eSpace home</router-link>
            <router-link :to="{ path: '/', hash: '#demo' }" class="px-4 py-2 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/20">Request a demo</router-link>
          </div>
        </div>
      </main>
    </div>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Wordmark from '@/components/brand/Wordmark.vue'
import SiteFooter from '@/components/site/SiteFooter.vue'
import { usePageMeta } from '@/components/site/usePageMeta'
import { useSiteScale } from '@/components/site/useSiteScale'
import AppIcon from '@/components/common/AppIcon.vue'
import { useThemeStore } from '@/stores/theme'
import { useAuthStore } from '@/stores/auth'
import { GUIDE, type GuideTopic } from '@/data/guide'

const theme = useThemeStore()
const route = useRoute()
const search = ref('')

// Signed in: a way back to your own dashboard; otherwise, sign in
const auth = useAuthStore()
const account = computed(() => {
  if (!auth.isAuthenticated) return { to: '/login', label: 'Sign in' }
  const role = auth.userRole === 'super_admin' ? 'admin' : auth.userRole
  return { to: `/${role}/dashboard`, label: 'My dashboard' }
})

usePageMeta(() => ({
  title: 'eSpace user guide - step-by-step help for students, teachers, HODs and admins',
  description: 'How to use eSpace: reading eNotes, handing in assessments, marking on screen, the Learning Map, coverage, report cards and setting up a school - step by step.',
  path: '/guide'
}))

const words = computed(() => search.value.trim().toLowerCase().split(/\s+/).filter(Boolean))
const matches = (t: GuideTopic) => {
  if (!words.value.length) return true
  const text = [t.title, t.intro, ...(t.steps ?? []), ...(t.tips ?? [])].join(' ').toLowerCase()
  return words.value.every(w => text.includes(w))
}
const shownParts = computed(() => GUIDE.map(p => ({ ...p, topics: p.topics.filter(matches) })).filter(p => p.topics.length))
const matchCount = computed(() => shownParts.value.reduce((n, p) => n + p.topics.length, 0))

// The topic in view, highlighted in the contents
const activeId = ref('')
let observer: IntersectionObserver | null = null
const watchTopics = async () => {
  observer?.disconnect()
  await nextTick()
  observer = new IntersectionObserver(entries => {
    const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
    if (visible[0]) activeId.value = (visible[0].target as HTMLElement).dataset.topic || ''
  }, { rootMargin: '-90px 0px -60% 0px' })
  document.querySelectorAll('.topic').forEach(el => observer!.observe(el))
}
watch(shownParts, watchTopics)

const printGuide = () => {
  search.value = ''
  nextTick(() => window.print())
}

onMounted(async () => {
  await watchTopics()
  // Arriving on /guide#teacher (e.g. from the landing page) - go to that part
  if (route.hash) {
    await nextTick()
    document.querySelector(route.hash)?.scrollIntoView()
  }
})
onBeforeUnmount(() => observer?.disconnect())

useSiteScale()
</script>
