<template>
  <!-- The public site's top bar: see-through over the hero, solid once you scroll. Shared by the
       landing page and the /for/* pages. -->
  <header class="fixed inset-x-0 top-0 z-50 transition-all duration-300" :class="solid ? 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200/70 dark:border-white/10' : 'bg-transparent'">
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
      <router-link to="/" class="flex-shrink-0" aria-label="eSpace home"><Wordmark size="md" /></router-link>

      <nav class="hidden xl:flex items-center gap-6 whitespace-nowrap" aria-label="Main">
        <router-link v-for="l in SITE_NAV" :key="l.to" :to="l.to" class="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition">{{ l.label }}</router-link>
        <!-- Who it's for -->
        <div class="relative" @mouseenter="forOpen = true" @mouseleave="forOpen = false">
          <button type="button" class="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition" :aria-expanded="forOpen" @click="forOpen = !forOpen">
            Who it's for
            <svg class="w-3.5 h-3.5 transition" :class="forOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          <Transition name="drop">
            <div v-if="forOpen" class="absolute left-1/2 -translate-x-1/2 top-full pt-3">
              <div class="w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl p-2">
                <router-link v-for="a in AUDIENCE_LINKS" :key="a.to" :to="a.to" class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5" @click="forOpen = false">
                  <span class="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300"><AppIcon :name="a.icon" class="w-4 h-4" /></span>
                  <span class="text-sm font-semibold text-slate-800 dark:text-slate-100">{{ a.label }}</span>
                </router-link>
              </div>
            </div>
          </Transition>
        </div>
        <router-link to="/guide" class="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition">User guide</router-link>
      </nav>

      <div class="flex items-center gap-1 sm:gap-2">
        <button type="button" class="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10" :aria-label="theme.isDarkMode ? 'Light mode' : 'Dark mode'" @click="theme.toggleTheme()">
          <svg v-if="theme.isDarkMode" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
        </button>
        <router-link to="/login" class="hidden sm:inline-flex whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10">Sign in</router-link>
        <router-link to="/#demo" class="inline-flex whitespace-nowrap px-3.5 sm:px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition"><span class="min-[400px]:hidden">Demo</span><span class="hidden min-[400px]:inline">Request a demo</span></router-link>
        <button type="button" class="xl:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10" aria-label="Menu" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"></path></svg>
        </button>
      </div>
    </div>

    <!-- Phone menu -->
    <div v-if="menuOpen" class="xl:hidden border-t border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 px-4 py-3 max-h-[calc(100dvh-4rem)] overflow-y-auto">
      <router-link v-for="l in SITE_NAV" :key="l.to" :to="l.to" class="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10" @click="menuOpen = false">{{ l.label }}</router-link>
      <p class="px-3 pt-3 pb-1 text-[11px] font-bold uppercase tracking-widest text-slate-400">Who it's for</p>
      <router-link v-for="a in AUDIENCE_LINKS" :key="a.to" :to="a.to" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10" @click="menuOpen = false">
        <AppIcon :name="a.icon" class="w-4 h-4 text-indigo-500" />{{ a.label }}
      </router-link>
      <div class="mt-2 pt-2 border-t border-slate-200 dark:border-white/10">
        <router-link to="/guide" class="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10" @click="menuOpen = false">User guide</router-link>
        <router-link to="/login" class="block px-3 py-2 rounded-lg text-sm font-semibold text-indigo-700 dark:text-indigo-300">Sign in</router-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Wordmark from '@/components/brand/Wordmark.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { useThemeStore } from '@/stores/theme'
import { SITE_NAV, AUDIENCE_LINKS } from '@/data/site'

const theme = useThemeStore()
const route = useRoute()
const menuOpen = ref(false)
const forOpen = ref(false)

const scrolled = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 12 }
const solid = computed(() => scrolled.value || menuOpen.value)

// Close the menus whenever the page (or #section) changes
watch(() => route.fullPath, () => { menuOpen.value = false; forOpen.value = false })

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.drop-enter-active, .drop-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.drop-enter-from, .drop-leave-to { opacity: 0; transform: translate(-50%, -4px); }
</style>
