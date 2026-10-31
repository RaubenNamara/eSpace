<template>
  <!-- The public site's top bar: see-through over the hero, solid once you scroll. Shared by the
       landing page and the /for/* pages. The switch picks whose side of Tusome the site shows. -->
  <!-- onDark: the page starts on a dark hero, so until it turns solid the bar is white on green -->
  <header class="fixed inset-x-0 top-0 z-50 transition-all duration-300" :class="[solid ? 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200/70 dark:border-white/10' : 'bg-transparent', { 'hdr-light': light }]">
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
      <router-link to="/" class="flex-shrink-0" aria-label="Tusome home"><Wordmark size="md" :light="light" /></router-link>

      <!-- Whose side of Tusome to show -->
      <AudienceSwitch class="hidden lg:inline-flex" :light="light" />

      <nav class="hidden xl:flex items-center gap-6 whitespace-nowrap" aria-label="Main">
        <router-link v-for="l in nav" :key="l.to" :to="l.to" class="hdr-text text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition">{{ l.label }}</router-link>
      </nav>

      <div class="flex items-center gap-1 sm:gap-2">
        <button type="button" class="hdr-text p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10" :aria-label="theme.isDarkMode ? 'Light mode' : 'Dark mode'" @click="theme.toggleTheme()">
          <svg v-if="theme.isDarkMode" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
        </button>
        <InstallAppButton variant="header" :light="light" />
        <!-- A student signs in; a school or a teacher asks for a demo -->
        <template v-if="audience === 'student'">
          <router-link to="/login" class="inline-flex whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition">Login</router-link>
        </template>
        <template v-else>
          <router-link to="/login" class="hdr-text hidden sm:inline-flex whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10">Login</router-link>
          <router-link :to="{ path: '/', query: route.query, hash: '#demo' }" class="inline-flex whitespace-nowrap px-3.5 sm:px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition"><span class="min-[400px]:hidden">Demo</span><span class="hidden min-[400px]:inline">Request a demo</span></router-link>
        </template>
        <button type="button" class="hdr-text xl:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10" aria-label="Menu" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"></path></svg>
        </button>
      </div>
    </div>

    <!-- Phone menu -->
    <div v-if="menuOpen" class="xl:hidden border-t border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 px-4 py-3 max-h-[calc(100dvh-4rem)] overflow-y-auto">
      <AudienceSwitch class="lg:hidden mb-3" label />
      <router-link v-for="l in nav" :key="l.to" :to="l.to" class="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10" @click="menuOpen = false">{{ l.label }}</router-link>
      <div class="mt-2 pt-2 border-t border-slate-200 dark:border-white/10">
        <router-link to="/login" class="block px-3 py-2 rounded-lg text-sm font-semibold text-indigo-700 dark:text-indigo-300">Login</router-link>
        <InstallAppButton variant="menu" />
      </div>
    </div>

    <!-- Phones: the header has no room for "Login", so it floats in the corner, always in reach.
         Teleported to <body> so the header's blur doesn't trap the fixed position. -->
    <Teleport to="body">
      <router-link
        v-if="!menuOpen && audience !== 'student'"
        to="/login"
        class="sm:hidden fixed z-50 right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] inline-flex items-center gap-2 pl-4 pr-5 py-3 rounded-full text-sm font-bold text-white bg-indigo-600 shadow-lg shadow-indigo-600/40 ring-4 ring-white/70 dark:ring-slate-950/70 active:scale-95 transition"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" transform="matrix(-1 0 0 1 24 0)" /></svg>
        Login
      </router-link>
      <!-- Feedback, one tap away on every public page (bottom left, across from Login) -->
      <router-link
        v-if="!menuOpen && route.path !== '/feedback'"
        to="/feedback"
        class="fixed z-50 left-4 bottom-[max(1rem,env(safe-area-inset-bottom))] inline-flex items-center gap-2 pl-3.5 pr-4 py-3 rounded-full text-sm font-bold text-indigo-900 bg-white shadow-lg shadow-slate-900/15 ring-1 ring-slate-200 hover:bg-indigo-50 dark:bg-slate-800 dark:text-white dark:ring-white/15 dark:hover:bg-slate-700 active:scale-95 transition"
        aria-label="Give feedback - anonymous"
      >
        <svg class="w-4 h-4 text-indigo-600 dark:text-indigo-300" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        Feedback
      </router-link>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Wordmark from '@/components/brand/Wordmark.vue'
import AudienceSwitch from './AudienceSwitch.vue'
import { useAudience } from './useAudience'
import InstallAppButton from './InstallAppButton.vue'
import { useThemeStore } from '@/stores/theme'
import { SITE_NAV } from '@/data/site'

const theme = useThemeStore()
const route = useRoute()
const menuOpen = ref(false)
const { audience } = useAudience()
const nav = computed(() => SITE_NAV[audience.value])

const scrolled = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 12 }
const solid = computed(() => scrolled.value || menuOpen.value)
const props = defineProps<{ onDark?: boolean }>()
const light = computed(() => !!props.onDark && !solid.value)

// Close the menus whenever the page (or #section) changes
watch(() => route.fullPath, () => { menuOpen.value = false })

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.hdr-light .hdr-text { color: rgb(255 255 255 / 0.88); }
.hdr-light .hdr-text:hover { color: #fff; background-color: rgb(255 255 255 / 0.1); }
</style>
