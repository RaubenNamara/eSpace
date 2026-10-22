<template>
  <div>
    <div class="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
      <RouterLink :to="`/${role}/anatomy`" class="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Back to the Anatomy Explorer">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </RouterLink>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Anatomy Explorer</p>
        <h1 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight">Modules</h1>
      </div>
      <div class="relative w-full sm:w-72">
        <label for="module-search" class="sr-only">Search modules</label>
        <input id="module-search" v-model="query" type="search" placeholder="Search modules: heart, quiz, section…" class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500" />
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-[15rem_minmax(0,1fr)] gap-4 items-start">
      <!-- Categories -->
      <nav class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 flex lg:flex-col gap-1 overflow-x-auto" aria-label="Module categories">
        <button
          v-for="c in CATS"
          :key="c.key"
          type="button"
          class="flex-shrink-0 text-left px-3 py-2 rounded-lg text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          :class="category === c.key ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50'"
          :aria-current="category === c.key ? 'page' : undefined"
          @click="category = c.key"
        >{{ c.label }} <span class="text-xs text-gray-400">{{ c.count }}</span></button>
        <div class="hidden lg:block border-t border-gray-200 dark:border-gray-700 my-1"></div>
        <p class="hidden lg:block px-3 pt-1 text-[11px] font-bold uppercase tracking-wide text-gray-400">By system</p>
        <button
          v-for="s in SYSTEM_FILTERS"
          :key="s.key"
          type="button"
          class="hidden lg:flex items-center gap-2 text-left px-3 py-1.5 rounded-lg text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          :class="system === s.key ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'"
          :aria-pressed="system === s.key"
          @click="system = system === s.key ? null : s.key"
        ><span class="w-2.5 h-2.5 rounded-sm" :style="{ background: s.colour }" aria-hidden="true"></span>{{ s.name }}</button>
      </nav>

      <!-- BioDigital (licensed) -->
      <section v-if="category === 'biodigital'" class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-5">
        <h2 class="text-base font-bold text-gray-900 dark:text-white">BioDigital Human modules</h2>
        <p v-if="bioLoading" class="mt-2 text-sm text-gray-500" role="status">Checking the school's BioDigital licence…</p>
        <template v-else-if="!bio?.enabled">
          <p class="mt-2 text-sm text-gray-700 dark:text-gray-200">
            BioDigital Human is a paid 3D anatomy service. Its models and modules can be shown here once the school has a BioDigital licence - they are not copied into Tusome.
          </p>
          <ol class="mt-3 list-decimal pl-5 text-sm text-gray-700 dark:text-gray-200 space-y-1">
            <li>The school subscribes at <a href="https://www.biodigital.com" target="_blank" rel="noopener" class="underline text-indigo-700 dark:text-indigo-300">biodigital.com</a> and creates a developer account at <a href="https://developer.biodigital.com" target="_blank" rel="noopener" class="underline text-indigo-700 dark:text-indigo-300">developer.biodigital.com</a>.</li>
            <li>It registers the Tusome web address there and gets a <span class="font-semibold">developer key</span>.</li>
            <li>The administrator puts the key in the server settings (<code class="text-xs">BIODIGITAL_DEVELOPER_KEY</code> in <code class="text-xs">backend/.env</code>), optionally with a list of modules (<code class="text-xs">BIODIGITAL_MODULES</code>).</li>
          </ol>
          <p class="mt-3 text-sm text-gray-600 dark:text-gray-300">Until then, use the Tusome modules - they work on the free BodyParts3D model.</p>
        </template>
        <template v-else>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">Licensed by the school. These open in BioDigital's own viewer inside Tusome.</p>
          <ul v-if="bio.modules.length" class="mt-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            <li v-for="m in bio.modules" :key="m.id">
              <RouterLink :to="{ path: `/${role}/anatomy/biodigital`, query: { id: m.id, title: m.title } }" class="block rounded-xl border border-gray-200 dark:border-gray-700 p-3 hover:border-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ m.title }}</p>
                <p class="text-[11px] text-gray-500 break-all">{{ m.id }}</p>
              </RouterLink>
            </li>
          </ul>
          <form class="mt-4 flex flex-col sm:flex-row gap-2" @submit.prevent="openBio">
            <label for="bio-id" class="sr-only">BioDigital module id or link</label>
            <input id="bio-id" v-model="bioInput" type="text" placeholder="Module id (production/maleAdult/…) or a human.biodigital.com link" class="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm" />
            <button type="submit" class="px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700">Open</button>
          </form>
          <p v-if="bioError" class="mt-1 text-xs text-red-600" role="alert">{{ bioError }}</p>
        </template>
      </section>

      <!-- Tusome modules -->
      <section v-else aria-live="polite">
        <p v-if="!shown.length" class="text-sm text-gray-500 p-6 text-center">No modules match.</p>
        <ul class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          <li v-for="m in shown" :key="m.id">
            <RouterLink
              :to="`/${role}/anatomy/modules/${m.id}`"
              class="group block h-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden hover:border-indigo-400 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <div class="h-24 relative" :style="{ background: cardBackground(m) }" aria-hidden="true">
                <span class="absolute left-3 bottom-2 px-2 py-0.5 rounded-md bg-white/90 text-[11px] font-bold text-gray-800">{{ CATEGORY_NAMES[m.category] }}</span>
                <span v-if="m.level === 'advanced'" class="absolute right-3 bottom-2 px-2 py-0.5 rounded-md bg-gray-900/80 text-[11px] font-bold text-white">Advanced</span>
              </div>
              <div class="p-3">
                <p class="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-300">{{ m.title }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-300 mt-0.5">{{ m.summary }}</p>
                <p class="text-[11px] text-gray-500 mt-1.5">
                  {{ m.quiz ? `${m.quiz.length} questions` : `${m.steps?.length} steps` }} · about {{ m.minutes }} min
                </p>
              </div>
            </RouterLink>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { labRoleOf } from '@/components/ictlab/types'
import { MODULES, CATEGORY_NAMES, type AnatomyModule, type ModuleCategory } from '@/anatomy/modules'
import { SYSTEMS, SYSTEM_BY_KEY } from '@/anatomy/systems'
import { parseBioDigitalInput, type BioDigitalConfig } from '@/anatomy/biodigital'
import type { SystemKey } from '@/anatomy/types'

const route = useRoute()
const router = useRouter()
const role = computed(() => labRoleOf(route.path))

type Cat = 'all' | ModuleCategory | 'biodigital'
const category = ref<Cat>((route.query.category as Cat) || 'all')
const system = ref<SystemKey | null>(null)
const query = ref('')
watch(category, c => router.replace({ query: { ...route.query, category: c } }).catch(() => {}))

const CATS = computed(() => [
  { key: 'all' as Cat, label: 'All modules', count: MODULES.length },
  ...(Object.keys(CATEGORY_NAMES) as ModuleCategory[]).map(k => ({ key: k as Cat, label: CATEGORY_NAMES[k], count: MODULES.filter(m => m.category === k).length })),
  { key: 'biodigital' as Cat, label: 'BioDigital (licensed)', count: '' as string | number },
])
const SYSTEM_FILTERS = SYSTEMS.filter(s => MODULES.some(m => m.topics.includes(s.key)))

const shown = computed(() => {
  const q = query.value.trim().toLowerCase()
  return MODULES.filter(m =>
    (category.value === 'all' || m.category === category.value) &&
    (!system.value || m.topics.includes(system.value)) &&
    (!q || `${m.title} ${m.summary} ${CATEGORY_NAMES[m.category]} ${m.topics.join(' ')} ${m.curriculum.join(' ')}`.toLowerCase().includes(q)))
})

function cardBackground(m: AnatomyModule) {
  const cols = m.topics.map(t => SYSTEM_BY_KEY[t].colour)
  const a = cols[0] ?? '#cbd5e1', b = cols[1] ?? cols[0] ?? '#e2e8f0'
  return `linear-gradient(135deg, ${a}cc, ${b}55), repeating-linear-gradient(45deg, #ffffff22 0 6px, transparent 6px 14px)`
}

// --- BioDigital: settings come from the server, never from this code ---
const bio = ref<BioDigitalConfig | null>(null)
const bioLoading = ref(false)
const bioInput = ref('')
const bioError = ref<string | null>(null)
watch(category, async (c) => {
  if (c !== 'biodigital' || bio.value) return
  bioLoading.value = true
  try {
    const res = await axios.get('/api/anatomy/config')
    bio.value = res.data?.data?.biodigital ?? { enabled: false, developer_key: null, modules: [] }
  } catch {
    bio.value = { enabled: false, developer_key: null, modules: [] }
  } finally {
    bioLoading.value = false
  }
}, { immediate: true })
function openBio() {
  bioError.value = null
  const id = parseBioDigitalInput(bioInput.value)
  if (!id) { bioError.value = 'Enter a BioDigital module id (like production/maleAdult/heart) or a human.biodigital.com link.'; return }
  router.push({ path: `/${role.value}/anatomy/biodigital`, query: id.kind === 'id' ? { id: id.value } : { be: id.value } })
}
</script>
