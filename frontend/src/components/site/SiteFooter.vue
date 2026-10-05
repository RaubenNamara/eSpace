<template>
  <!-- The public site's footer - shared by the landing page, the /for/* pages and the guide -->
  <footer class="border-t border-slate-200 dark:border-white/10 print:hidden">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 lg:grid-cols-5 gap-8">
      <div class="col-span-2">
        <Wordmark size="lg" />
        <p class="mt-3 max-w-sm text-sm text-slate-600 dark:text-slate-400">The digital school - learning, assessment and insight for competency-based education.</p>
        <router-link to="/#demo" class="mt-5 inline-flex px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition">Request a demo</router-link>
      </div>
      <div v-for="col in COLUMNS" :key="col.title">
        <p class="text-sm font-bold">{{ col.title }}</p>
        <ul class="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <li v-for="l in col.links" :key="l.to"><router-link :to="l.to" class="hover:text-slate-900 dark:hover:text-white">{{ l.label }}</router-link></li>
        </ul>
      </div>
    </div>
    <div class="border-t border-slate-200 dark:border-white/10">
      <p class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 text-xs text-slate-500 dark:text-slate-400">&copy; {{ year }} eSpace. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import Wordmark from '@/components/brand/Wordmark.vue'
import { AUDIENCE_LINKS } from '@/data/site'

const year = new Date().getFullYear()

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { to: '/#modules', label: 'Modules' },
      { to: '/#tour', label: 'Product tour' },
      { to: '/#try', label: 'Try a lesson' },
      { to: '/#pricing', label: 'Pricing' },
      { to: '/#trust', label: 'Your data' },
      { to: '/#new', label: "What's new" },
      { to: '/#faq', label: 'Questions' }
    ]
  },
  { title: "Who it's for", links: AUDIENCE_LINKS.map(a => ({ to: a.to, label: a.label })) },
  {
    title: 'Get started',
    links: [
      { to: '/guide', label: 'User guide' },
      { to: '/login', label: 'Sign in' },
      { to: '/#demo', label: 'Request a demo' },
      { to: '/#team', label: 'The team' }
    ]
  }
]
</script>
