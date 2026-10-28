<template>
  <!-- A "Who it's for" page: /for/schools, /for/teachers, /for/students. Words are in
       data/audiences.ts; the layout is the same for all three. -->
  <div v-if="a" class="site-plain min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-white overflow-x-clip">
    <SiteHeader on-dark />

    <main :key="a.key">
      <!-- Hero, deep green like the home page -->
      <section class="relative overflow-hidden bg-indigo-950 pt-28 sm:pt-36 pb-16 sm:pb-24 text-white">
        <div class="absolute inset-0" aria-hidden="true">
          <div class="absolute -top-48 -right-40 w-[42rem] h-[42rem] rounded-full bg-indigo-600/30 blur-3xl"></div>
          <div class="absolute -bottom-48 -left-40 w-[34rem] h-[34rem] rounded-full bg-emerald-400/10 blur-3xl"></div>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.07)_1px,transparent_0)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"></div>
        </div>
        <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
          <div class="reveal">
            <span class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-indigo-100 backdrop-blur">
              <span class="w-1.5 h-1.5 rounded-full bg-indigo-300"></span>{{ a.eyebrow }}
            </span>
            <h1 class="mt-5 font-jakarta text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.08]">{{ a.title }}</h1>
            <p class="mt-5 max-w-xl text-base sm:text-lg text-white/80 leading-relaxed">{{ a.intro }}</p>
            <div class="mt-8 flex flex-wrap gap-3">
              <a href="#demo" class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-indigo-950 bg-white hover:bg-indigo-50 transition">
                Request a demo
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
              </a>
              <router-link :to="a.guide" class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-white ring-1 ring-white/25 hover:bg-white/10 transition">Read the guide</router-link>
            </div>
          </div>
          <div class="reveal">
            <TourStage :screen="screen" />
          </div>
        </div>
      </section>

      <!-- Before / with Tusome -->
      <section class="py-20 sm:py-24 bg-indigo-50/60 dark:bg-indigo-950/20">
        <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div class="reveal text-center">
            <p :class="EYEBROW">Before and after</p>
            <h2 :class="H2">What changes</h2>
          </div>
          <div class="mt-10 space-y-3">
            <div v-for="s in a.shifts" :key="s.before" class="reveal grid sm:grid-cols-[1fr_auto_1fr] rounded-2xl overflow-hidden ring-1 ring-indigo-100 dark:ring-white/10 shadow-sm">
              <p class="flex items-center gap-2.5 p-4 sm:p-5 text-sm bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400">
                <span class="w-6 h-6 flex-shrink-0 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-400" aria-hidden="true">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                </span>
                <span class="line-through decoration-slate-300 dark:decoration-slate-600">{{ s.before }}</span>
              </p>
              <span class="hidden sm:flex items-center bg-indigo-600 text-white px-2" aria-hidden="true">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
              </span>
              <p class="flex items-center gap-2.5 p-4 sm:p-5 text-sm font-semibold bg-indigo-600 text-white">
                <AppIcon name="check-circle" class="w-5 h-5 flex-shrink-0 text-indigo-200" />{{ s.after }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- What you get -->
      <section class="py-20 sm:py-28">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="reveal max-w-2xl">
            <p :class="EYEBROW">What you get</p>
            <h2 :class="H2">Everything you need, in one place</h2>
          </div>
          <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div
              v-for="(b, i) in a.benefits"
              :key="b.title"
              class="reveal rounded-3xl p-6 transition hover:-translate-y-1"
              :class="i === 0 ? 'bg-indigo-600 text-white hover:shadow-2xl hover:shadow-indigo-900/20' : 'border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-900/5 dark:hover:border-indigo-400/40'"
            >
              <span class="w-11 h-11 rounded-xl flex items-center justify-center" :class="i === 0 ? 'bg-white/15 text-white' : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300'"><AppIcon :name="b.icon" class="w-5 h-5" /></span>
              <h3 class="mt-4 font-jakarta text-lg font-bold">{{ b.title }}</h3>
              <p class="mt-1.5 text-sm leading-relaxed" :class="i === 0 ? 'text-white/85' : 'text-slate-600 dark:text-slate-400'">{{ b.text }}</p>
            </div>
          </div>

          <div class="reveal mt-14 rounded-3xl bg-indigo-950 text-white p-6 sm:p-8 dark:bg-white/5 dark:ring-1 dark:ring-white/10">
            <p class="text-xs font-bold uppercase tracking-widest text-indigo-300">Modules you will use</p>
            <div class="mt-4 flex flex-wrap gap-2">
              <span v-for="m in modules" :key="m.key" class="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 ring-1 ring-white/10 text-sm font-semibold text-white">
                <AppIcon :name="m.icon" class="w-4 h-4 text-indigo-300" />{{ m.name }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Questions -->
      <section class="py-20 sm:py-24 bg-indigo-50/60 dark:bg-indigo-950/20">
        <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div class="reveal text-center">
            <p :class="EYEBROW">Questions</p>
            <h2 :class="H2">What people ask us</h2>
          </div>
          <div class="mt-10 divide-y divide-slate-200 dark:divide-white/10 border-y border-slate-200 dark:border-white/10">
            <div v-for="(f, i) in a.faq" :key="f.q">
              <button type="button" class="w-full flex items-center justify-between gap-4 py-5 text-left" :aria-expanded="openFaq === i" @click="openFaq = openFaq === i ? -1 : i">
                <span class="font-semibold text-slate-900 dark:text-white">{{ f.q }}</span>
                <span class="w-7 h-7 flex-shrink-0 rounded-full border border-slate-300 dark:border-white/20 flex items-center justify-center transition" :class="openFaq === i ? 'rotate-45 bg-indigo-600 text-white border-indigo-600' : ''">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 5v14m7-7H5"></path></svg>
                </span>
              </button>
              <p v-if="openFaq === i" class="pb-5 -mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{{ f.a }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Other audiences -->
      <section class="py-16 sm:py-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p class="reveal text-xs font-bold uppercase tracking-widest text-slate-400">Tusome is also for</p>
          <div class="mt-4 grid sm:grid-cols-2 gap-4">
            <router-link v-for="o in others" :key="o.to" :to="o.to" class="reveal group flex items-center gap-4 rounded-2xl bg-indigo-950 text-white p-5 ring-1 ring-transparent hover:ring-indigo-400/50 hover:-translate-y-0.5 transition dark:bg-white/5 dark:ring-white/10">
              <span class="w-11 h-11 rounded-xl flex items-center justify-center bg-indigo-600 text-white"><AppIcon :name="o.icon" class="w-5 h-5" /></span>
              <span class="flex-1"><span class="block text-xs text-indigo-200">Tusome for</span><span class="block font-bold">{{ o.label }}</span></span>
              <svg class="w-5 h-5 text-indigo-300 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </router-link>
          </div>
        </div>
      </section>

      <section id="demo" class="pb-20 sm:pb-28 scroll-mt-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p class="reveal mb-6 text-center font-jakarta text-lg font-bold text-slate-700 dark:text-slate-200">{{ a.cta }}</p>
          <DemoForm class="reveal" />
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
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

// Same look as the home page (Landing.vue)
const EYEBROW = 'inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-indigo-800 dark:bg-indigo-500/15 dark:text-indigo-200'
const H2 = 'mt-3 font-jakarta text-3xl sm:text-4xl font-extrabold tracking-tight'
const openFaq = ref(0)
watch(() => route.path, () => { openFaq.value = 0 })

const screen = computed(() => TOUR.find(t => t.key === a.value?.screen) ?? TOUR[0])
const modules = computed(() => MODULES.filter(m => m.roles.some(r => a.value?.roles.includes(r))))
const others = computed(() => AUDIENCE_LINKS.filter(l => l.to !== `/for/${a.value?.key}`))

usePageMeta(() => ({
  title: a.value?.metaTitle ?? 'Tusome',
  description: a.value?.metaDescription ?? '',
  path: route.path
}))
useReveal(() => route.path)

useSiteScale()
</script>
