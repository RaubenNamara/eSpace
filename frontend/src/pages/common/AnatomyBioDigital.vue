<template>
  <div class="flex flex-col h-[calc(100vh-7rem)] min-h-[420px]">
    <div class="flex items-center gap-3 mb-3">
      <RouterLink :to="{ path: `/${role}/anatomy/modules`, query: { category: 'biodigital' } }" class="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Back to modules">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </RouterLink>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">BioDigital Human · licensed</p>
        <h1 class="text-lg font-bold text-gray-900 dark:text-white leading-tight truncate">{{ title }}</h1>
      </div>
    </div>
    <div class="flex-1 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800">
      <p v-if="state === 'loading'" class="p-6 text-sm text-gray-500" role="status">Loading…</p>
      <AnatomyErrorState v-else-if="state === 'off'" class="h-full" title="BioDigital is not set up" message="The school has not added a BioDigital licence key, so BioDigital modules cannot be shown. The eSpace anatomy modules are available without one." />
      <AnatomyErrorState v-else-if="state === 'bad'" class="h-full" title="Not a BioDigital module" message="This link is not a BioDigital module id or human.biodigital.com link." />
      <iframe
        v-else
        :src="src!"
        :title="`BioDigital Human: ${title}`"
        class="w-full h-full border-0"
        allow="fullscreen; autoplay"
        allowfullscreen
        referrerpolicy="strict-origin-when-cross-origin"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      ></iframe>
    </div>
    <p class="mt-2 text-[11px] text-gray-500">Content © BioDigital, Inc., shown under the school's BioDigital licence.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { labRoleOf } from '@/components/ictlab/types'
import { bioDigitalViewerUrl, type BioDigitalRef } from '@/anatomy/biodigital'
import AnatomyErrorState from '@/components/anatomy/AnatomyErrorState.vue'

const route = useRoute()
const role = computed(() => labRoleOf(route.path))
const title = computed(() => String(route.query.title || route.query.id || 'BioDigital module'))
const state = ref<'loading' | 'off' | 'bad' | 'ready'>('loading')
const src = ref<string | null>(null)

onMounted(async () => {
  const id = typeof route.query.id === 'string' ? route.query.id : null
  const be = typeof route.query.be === 'string' ? route.query.be : null
  const ref_: BioDigitalRef | null = id && /^[A-Za-z0-9_-]+(\/[A-Za-z0-9_.-]+)+$/.test(id) ? { kind: 'id', value: id }
    : be && /^[A-Za-z0-9_-]{2,40}$/.test(be) ? { kind: 'be', value: be } : null
  if (!ref_) { state.value = 'bad'; return }
  try {
    const res = await axios.get('/api/anatomy/config')
    const key = res.data?.data?.biodigital?.developer_key as string | null
    if (!key) { state.value = 'off'; return }
    src.value = bioDigitalViewerUrl(ref_, key)
    state.value = 'ready'
  } catch {
    state.value = 'off'
  }
})
</script>
