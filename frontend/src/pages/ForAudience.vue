<template>
  <!-- A "Who it's for" page: /for/schools, /for/teachers, /for/students. Words are in
       data/audiences.ts; the layout is the same for all three. -->
  <div v-if="a" class="site-plain min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-white overflow-x-hidden">
    <SiteHeader />

    <main :key="a.key">
      <!-- Hero -->
      <section class="relative pt-28 sm:pt-36 pb-14 sm:pb-20">
        <div class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_1px_1px,rgba(100,116,139,0.15)_1px,transparent_0)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" aria-hidden="true"></div>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
          <div class="reveal">
            <p class="text-sm font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-300">{{ a.eyebrow }}</p>
            <h1 class="mt-4 font-jakarta text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.08]">{{ a.title }}</h1>
            <p class="mt-5 max-w-xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">{{ a.intro }}</p>
            <div class="mt-8 flex flex-wrap gap-3">
              <a href="#demo" class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition">Request a demo</a>
              <router-link :to="a.guide" class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-slate-800 bg-white border border-slate-200 hover:border-slate-300 dark:bg-white/5 dark:text-white dark:border-white/15 transition">Read the guide</router-link>
            </div>
          </div>
          <div class="reveal">
            <TourStage :screen="screen" />
          </div>
        </div>
      </section>

      <!-- Before / with eSpace -->
      <section class="py-16 sm:py-24 bg-slate-50 dark:bg-white/[0.02] border-y border-slate-200 dark:border-white/10">
        <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 class="reveal text-center font-jakarta text-3xl sm:text-4xl font-extrabold tracking-tight">What changes</h2>
          <div class="mt-10 space-y-3">
            <div v-for="s in a.shifts" :key="s.before" class="reveal grid sm:grid-cols-[1fr_auto_1fr] gap-2 sm:gap-4 items-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-4 sm:p-5">
              <p class="text-sm text-slate-500 dark:text-slate-400 line-through decoration-slate-300 dark:decoration-slate-600">{{ s.before }}</p>
              <svg class="hidden sm:block w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
              <p class="flex items-start gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100"><AppIcon name="check-circle" class="w-4 h-4 mt-0.5 flex-shrink-0 text-indigo-500" />{{ s.after }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- What you get -->
      <section class="py-16 sm:py-24">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 class="reveal font-jakarta text-3xl sm:text-4xl font-extrabold tracking-tight">What you get</h2>
          <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div v-for="b in a.benefits" :key="b.title" class="reveal rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6">
              <span class="w-11 h-11 rounded-xl flex items-center justify-center bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300"><AppIcon :name="b.icon" class="w-5 h-5" /></span>
              <h3 class="mt-4 font-jakarta text-lg font-bold">{{ b.title }}</h3>
              <p class="mt-1.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{{ b.text }}</p>
            </div>
          </div>

          <div class="reveal mt-14">
            <p class="text-sm font-bold uppercase tracking-widest text-slate-400">Modules you will use</p>
            <div class="mt-4 flex flex-wrap gap-2">
              <span v-for="m in modules" :key="m.key" class="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <AppIcon :name="m.icon" class="w-4 h-4 text-indigo-500" />{{ m.name }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Questions -->
      <section class="pb-16 sm:pb-24">
        <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 class="reveal text-center font-jakarta text-3xl font-extrabold tracking-tight">Questions</h2>
          <dl class="mt-8 divide-y divide-slate-200 dark:divide-white/10 border-y border-slate-200 dark:border-white/10">
            <div v-for="f in a.faq" :key="f.q" class="py-5">
              <dt class="font-semibold">{{ f.q }}</dt>
              <dd class="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{{ f.a }}</dd>
            </div>
          </dl>
        </div>
      </section>

      <!-- Other audiences -->
      <section class="pb-16 sm:pb-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 gap-4">
          <router-link v-for="o in others" :key="o.to" :to="o.to" class="group flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-white/10 p-5 hover:border-indigo-300 dark:hover:border-indigo-400/40 transition">
            <span class="w-11 h-11 rounded-xl flex items-center justify-center bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-300"><AppIcon :name="o.icon" class="w-5 h-5" /></span>
            <span class="flex-1"><span class="block text-xs text-slate-500">eSpace for</span><span class="block font-bold">{{ o.label }}</span></span>
            <svg class="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </router-link>
        </div>
      </section>

      <section id="demo" class="pb-20 sm:pb-28 scroll-mt-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p class="reveal mb-6 text-center text-slate-600 dark:text-slate-400">{{ a.cta }}</p>
          <DemoForm class="reveal" />
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppIcon from '@/components/common/AppIcon.vue'
import SiteHeader from '@/components/site/SiteHeader.vue'
import SiteFooter from '@/components/site/SiteFooter.vue'
import TourStage from '@/components/site/TourStage.vue'
import DemoForm from '@/components/site/DemoForm.vue'
import { useReveal } from '@/components/site/useReveal'
import { usePageMeta } from '@/components/site/usePageMeta'
import { useSiteScale } from '@/components/site/useSiteScale'
import { audienceByKey } from '@/data/audiences'
import { MODULES } from '@/data/modules'
import { AUDIENCE_LINKS, TOUR } from '@/data/site'

const route = useRoute()
const router = useRouter()

const a = computed(() => audienceByKey(String(route.params.who)))
// An unknown /for/... goes to the home page
watch(a, v => { if (!v) router.replace('/') }, { immediate: true })

const screen = computed(() => TOUR.find(t => t.key === a.value?.screen) ?? TOUR[0])
const modules = computed(() => MODULES.filter(m => m.roles.some(r => a.value?.roles.includes(r))))
const others = computed(() => AUDIENCE_LINKS.filter(l => l.to !== `/for/${a.value?.key}`))

usePageMeta(() => ({
  title: a.value?.metaTitle ?? 'eSpace',
  description: a.value?.metaDescription ?? '',
  path: route.path
}))
useReveal(() => route.path)

useSiteScale()
</script>
