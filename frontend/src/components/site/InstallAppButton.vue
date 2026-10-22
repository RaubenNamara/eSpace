<template>
  <!-- "Download the app": installs Tusome (a PWA - see utils/install.ts) on a phone or computer.
       Where the browser can install it, its own dialog opens; otherwise (iPhone/iPad, Safari on a
       Mac, Firefox, or before the browser is ready) the steps for that device are shown. -->
  <button v-if="variant === 'hero'" type="button" :class="heroClass" @click="start">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v11m0 0l-4-4m4 4l4-4M5 19h14" /></svg>
    Download the app
  </button>
  <button v-else-if="variant === 'header'" type="button" class="hidden lg:inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10" @click="start">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v11m0 0l-4-4m4 4l4-4M5 19h14" /></svg>
    Get the app
  </button>
  <button v-else type="button" class="flex w-full items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-semibold text-indigo-700 hover:bg-slate-100 dark:text-indigo-300 dark:hover:bg-white/10" @click="start">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v11m0 0l-4-4m4 4l4-4M5 19h14" /></svg>
    Download the Tusome app
  </button>

  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-slate-900/60 p-4" @click.self="open = false">
        <div role="dialog" aria-modal="true" aria-labelledby="install-title" class="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl p-6 text-left">
          <div class="flex items-start gap-4">
            <img src="/pwa-192x192.png" alt="" width="56" height="56" class="w-14 h-14 rounded-2xl shadow ring-1 ring-black/5 flex-shrink-0">
            <div class="min-w-0">
              <h2 id="install-title" class="font-jakarta text-lg font-extrabold text-slate-900 dark:text-white">{{ title }}</h2>
              <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">{{ intro }}</p>
            </div>
          </div>

          <ol v-if="steps.length" class="mt-5 space-y-3">
            <li v-for="(s, i) in steps" :key="i" class="flex gap-3">
              <span class="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{{ i + 1 }}</span>
              <span class="text-sm text-slate-700 dark:text-slate-200 leading-relaxed" v-html="s"></span>
            </li>
          </ol>

          <p v-if="note" class="mt-4 text-xs text-slate-500 dark:text-slate-400">{{ note }}</p>

          <div class="mt-6 flex justify-end">
            <button type="button" class="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700" @click="open = false">Got it</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { isIos, isStandalone, installed, installPromptAvailable, promptInstall } from '@/utils/install'

withDefaults(defineProps<{ variant?: 'hero' | 'header' | 'menu' }>(), { variant: 'hero' })

const heroClass = 'inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-200 dark:border-indigo-500/30 dark:hover:bg-indigo-500/20 transition'

const open = ref(false)
const title = ref('')
const intro = ref('')
const steps = ref<string[]>([])
const note = ref('')

const show = (t: string, i: string, s: string[] = [], n = '') => {
  title.value = t; intro.value = i; steps.value = s; note.value = n; open.value = true
}

// Icons drawn inline in the steps, so they look like what the person sees on screen
const SHARE = '<svg class="inline w-4 h-4 -mt-0.5 mx-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v12m0-12L8 7m4-4l4 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/></svg>'
const DOTS = '<b>&#8942;</b>'
const b = (s: string) => `<b>${s}</b>`

const start = async () => {
  if (installed.value || isStandalone()) {
    show('Tusome is installed', 'You are already using the Tusome app on this device - open it from your home screen, Start menu or dock.')
    return
  }

  // Android, and Chrome / Edge on a computer: the browser's own install dialog
  if (installPromptAvailable.value) {
    if (await promptInstall()) {
      show('Tusome is installed', 'Open it any time from your home screen, Start menu or dock - it opens straight into Tusome, like any other app.')
    }
    return
  }

  const ua = navigator.userAgent
  const android = /android/i.test(ua)
  const edge = /Edg\//.test(ua)
  const firefox = /Firefox|FxiOS/i.test(ua)
  const chromium = /Chrome|CriOS|Edg\//.test(ua)
  const macSafari = /Macintosh/.test(ua) && /Safari/.test(ua) && !chromium && !isIos()

  if (isIos()) {
    show('Add Tusome to your Home Screen', 'On iPhone and iPad, Tusome installs from the browser\'s Share menu:', [
      `Tap the ${b('Share')} button ${SHARE} - at the bottom of Safari (or top right on iPad).`,
      `Scroll down and tap ${b('Add to Home Screen')}.`,
      `Tap ${b('Add')}. Tusome now opens from its own icon, like any other app.`
    ], 'Using Chrome on iPhone? The Share button is in the address bar - the same steps work.')
  } else if (android) {
    show('Install Tusome on your phone', 'Install it from your browser menu:', [
      `Tap the menu ${DOTS} at the top right of the browser.`,
      `Tap ${b('Install app')} or ${b('Add to Home screen')}.`,
      `Tap ${b('Install')}. Tusome appears with your other apps.`
    ], firefox ? 'In Firefox the option is called "Install". If you don\'t see it, open this page in Chrome.' : '')
  } else if (macSafari) {
    show('Add Tusome to your Dock', 'Safari on a Mac installs Tusome as an app:', [
      `In the menu bar, click ${b('File')}.`,
      `Click ${b('Add to Dock')}, then ${b('Add')}.`
    ], 'Needs macOS Sonoma or newer. On older Macs, open this page in Chrome or Edge instead.')
  } else if (firefox) {
    show('Install Tusome on your computer', 'Firefox on a computer can\'t install apps. Open this page in Google Chrome or Microsoft Edge, then:', [
      `Click ${b('Download the app')} again - the install window opens.`,
      `Click ${b('Install')}. Tusome gets its own window and Start menu / desktop icon.`
    ])
  } else if (edge) {
    show('Install Tusome on your computer', 'In Microsoft Edge:', [
      `Click the menu ${b('&middot;&middot;&middot;')} at the top right.`,
      `Click ${b('Apps')} &rarr; ${b('Install this site as an app')}.`,
      `Click ${b('Install')}. Tusome gets its own window and Start menu icon.`
    ], 'Or click the install icon at the right end of the address bar.')
  } else {
    show('Install Tusome on your computer', 'In Google Chrome:', [
      `Click the install icon at the right end of the address bar, or the menu ${DOTS} at the top right.`,
      `Choose ${b('Cast, save and share')} &rarr; ${b('Install page as app')}.`,
      `Click ${b('Install')}. Tusome gets its own window and a desktop / Start menu icon.`
    ])
  }
}

</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
