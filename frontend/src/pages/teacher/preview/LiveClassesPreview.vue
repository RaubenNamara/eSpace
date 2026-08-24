<template>
  <div>
    <PreviewBanner module-label="Live Classes" />

    <div class="mb-6">
      <RouterLink to="/teacher/preview" class="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
        Back to Preview
      </RouterLink>
    </div>

    <div v-if="loading" class="text-center py-16">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
    </div>

    <div v-else-if="classes.length === 0" class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <p class="text-gray-500 dark:text-gray-400">No live classes for this class yet.</p>
    </div>

    <template v-else>
      <div v-if="liveNow.length > 0" class="mb-8">
        <h2 class="flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide mb-4">
          <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Live Now
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="cls in liveNow" :key="cls.id" class="rounded-2xl p-5 bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/20">
            <h3 class="text-lg font-bold leading-tight mb-1">{{ cls.title }}</h3>
            <p class="text-sm text-white/80">{{ cls.subject_name }} · {{ teacherName(cls) }}</p>
          </div>
        </div>
      </div>

      <div v-if="upcoming.length > 0" class="mb-8">
        <h2 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">Upcoming</h2>
        <div class="space-y-3">
          <div v-for="cls in upcoming" :key="cls.id" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 flex items-center justify-between gap-4">
            <div class="min-w-0">
              <h3 class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ cls.title }}</h3>
              <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ cls.subject_name }} · {{ teacherName(cls) }}</p>
            </div>
            <p class="text-sm font-medium text-gray-700 dark:text-gray-300 flex-shrink-0">{{ formatSchedule(cls.scheduled_start) }}</p>
          </div>
        </div>
      </div>

      <div v-if="past.length > 0">
        <h2 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">Past Sessions</h2>
        <div class="space-y-3">
          <div v-for="cls in past" :key="cls.id" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 flex items-center justify-between gap-4">
            <div class="min-w-0">
              <h3 class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ cls.title }}</h3>
              <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ cls.subject_name }} · {{ teacherName(cls) }} · {{ formatSchedule(cls.scheduled_start) }}</p>
            </div>
            <span class="px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0" :class="cls.status === 'cancelled' ? 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'">
              {{ cls.status === 'cancelled' ? 'Cancelled' : 'Ended' }}
            </span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import PreviewBanner from '@/components/preview/PreviewBanner.vue'
import type { LiveClass } from '@/types/liveclass'

const route = useRoute()
const classes = ref<LiveClass[]>([])
const loading = ref(false)

const liveNow = computed(() => classes.value.filter(c => c.status === 'started'))
const upcoming = computed(() =>
  classes.value.filter(c => c.status === 'scheduled').sort((a, b) => new Date(a.scheduled_start).getTime() - new Date(b.scheduled_start).getTime())
)
const past = computed(() =>
  classes.value.filter(c => c.status === 'ended' || c.status === 'cancelled').sort((a, b) => new Date(b.scheduled_start).getTime() - new Date(a.scheduled_start).getTime())
)

const teacherName = (cls: LiveClass) => {
  if (!cls.teacher_first_name) return ''
  return `${cls.teacher_first_name} ${cls.teacher_last_name || ''}`.trim()
}

const formatSchedule = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()
  const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return isToday ? `Today, ${time}` : `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${time}`
}

const loadClasses = async () => {
  loading.value = true
  try {
    const response = await axios.get('/api/teacher/live-classes/preview', { params: { class_id: route.params.classId } })
    if (response.data.success) {
      classes.value = response.data.data.classes || []
    }
  } catch (error) {
    console.error('Failed to load live classes preview:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadClasses()
})
</script>
