<template>
  <div>
    <PageHeader
      title="ICT Lab"
      :description="role === 'teacher'
        ? 'Hands-on computer activities, step by step. Open one to try it, and link its steps to your eNotes.'
        : 'Hands-on computer activities, step by step - at a Simple, Intermediate or Advanced level.'"
      icon="keyboard"
      accent="indigo"
    />

    <!-- The parts showroom: every major part in 3D, on its own -->
    <RouterLink
      :to="`/${role}/ict-lab/showroom`"
      class="mb-4 flex items-center gap-4 rounded-2xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-900/20 p-4 hover:shadow-md transition-shadow"
    >
      <span class="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm"><AppIcon name="photo" class="w-6 h-6" /></span>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Start here</p>
        <p class="text-lg font-bold text-gray-900 dark:text-white leading-snug">Parts showroom</p>
        <p class="text-sm text-gray-600 dark:text-gray-300">Every major part of a computer in 3D - turn it round, see where it goes, what it does and how it fails.</p>
      </div>
      <svg class="w-5 h-5 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
    </RouterLink>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <article
        v-for="a in ACTIVITIES"
        :key="a.key"
        class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 flex flex-col"
      >
        <div class="flex items-start gap-3">
          <span class="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <AppIcon :name="a.icon" class="w-6 h-6" />
          </span>
          <div class="min-w-0 flex-1">
            <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">{{ a.topic }}</p>
            <h2 class="text-lg font-bold text-gray-900 dark:text-white leading-snug">{{ a.title }}</h2>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-0.5">{{ a.summary }}</p>
          </div>
        </div>

        <div class="mt-4 grid grid-cols-3 gap-2">
          <RouterLink
            v-for="l in LEVELS"
            :key="l.key"
            :to="{ path: `/${role}/ict-lab/${a.key}`, query: { level: l.key } }"
            class="group rounded-xl border border-gray-200 dark:border-gray-700 px-3 py-2.5 hover:border-indigo-400 hover:bg-indigo-50/60 dark:hover:bg-indigo-900/20 transition-colors"
            :title="l.blurb"
          >
            <p class="text-sm font-bold text-gray-900 dark:text-white">{{ l.label }}</p>
            <p class="text-[11px] text-gray-500 dark:text-gray-400">{{ a.levels[l.key].steps.length }} steps</p>
            <p v-if="best(a.key, l.key) !== null" class="mt-1 text-[11px] font-bold" :class="(best(a.key, l.key) ?? 0) >= 80 ? 'text-emerald-600 dark:text-emerald-300' : 'text-amber-600 dark:text-amber-300'">
              Best {{ best(a.key, l.key) }}%
            </p>
            <p v-else-if="role === 'student'" class="mt-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-300 group-hover:underline">Start</p>
            <p v-else class="mt-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-300 group-hover:underline">Try it</p>
          </RouterLink>
        </div>

        <p v-if="role === 'teacher' && linkCount(a.key)" class="mt-3 text-xs text-gray-500 dark:text-gray-400">
          <AppIcon name="document" class="w-3.5 h-3.5 inline -mt-0.5" /> {{ linkCount(a.key) }} step{{ linkCount(a.key) === 1 ? '' : 's' }} linked to your eNotes
        </p>
      </article>
    </div>

    <h2 v-if="COMING.length" class="mt-8 mb-2 text-sm font-bold text-gray-900 dark:text-white">Coming next</h2>
    <div v-if="COMING.length" class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div v-for="c in COMING" :key="c.title" class="rounded-2xl border border-dashed border-gray-300 dark:border-gray-600 p-4">
        <div class="flex items-center gap-2">
          <span class="w-8 h-8 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 flex items-center justify-center"><AppIcon :name="c.icon" class="w-4 h-4" /></span>
          <p class="font-semibold text-gray-800 dark:text-gray-100">{{ c.title }}</p>
        </div>
        <p class="mt-1.5 text-xs text-gray-500 dark:text-gray-400">{{ c.summary }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { ACTIVITIES, COMING, LEVELS, type IctLevel } from '@/components/ictlab/activities'
import { labRoleOf, type IctLink, type IctProgress } from '@/components/ictlab/types'

const route = useRoute()
const role = computed(() => labRoleOf(route.path))

const progress = ref<IctProgress[]>([])
const links = ref<IctLink[]>([])

onMounted(async () => {
  if (role.value !== 'student' && role.value !== 'teacher') return
  try {
    const res = await axios.get(`/api/${role.value}/ict-lab`)
    progress.value = res.data.data.progress || []
    links.value = res.data.data.links || []
  } catch {
    // the activities still work without scores and links
  }
})

const best = (activity: string, level: IctLevel) => progress.value.find(p => p.activity_key === activity && p.level === level)?.best ?? null
const linkCount = (activity: string) => links.value.filter(l => l.activity_key === activity).length
</script>
