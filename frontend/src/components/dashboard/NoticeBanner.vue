<template>
  <!-- Dashboard: the newest unread notice, linking to the noticeboard. Hidden when all are read. -->
  <RouterLink v-if="latest" :to="`/${role}/notices`" class="mb-5 flex items-center gap-3 rounded-2xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-900/20 px-4 py-3 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition">
    <span class="w-9 h-9 flex-shrink-0 rounded-xl bg-indigo-600 text-white flex items-center justify-center"><AppIcon name="speaker" class="w-4 h-4" /></span>
    <span class="min-w-0 flex-1">
      <span class="block text-sm font-semibold text-gray-900 dark:text-white truncate">{{ latest.title }}</span>
      <span class="block text-xs text-gray-600 dark:text-gray-300 truncate">{{ niceName(latest.author_name) }} · {{ latest.body }}</span>
    </span>
    <span class="flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-600 text-white">{{ unread === 1 ? 'New notice' : `${unread} new` }}</span>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
import AppIcon from '@/components/common/AppIcon.vue'
import { niceName } from '@/components/dashboard/teacher/time'

const props = defineProps<{ role: 'student' | 'teacher' | 'hod' | 'admin' }>()

const notices = ref<{ title: string; body: string; author_name: string; is_read: boolean; mine: boolean }[]>([])
const unread = computed(() => notices.value.filter(n => !n.is_read && !n.mine).length)
const latest = computed(() => notices.value.find(n => !n.is_read && !n.mine) ?? null)

onMounted(async () => {
  try {
    const res = await axios.get(`/api/${props.role}/notices`)
    notices.value = res.data.data.notices || []
  } catch { /* no banner */ }
})
</script>
