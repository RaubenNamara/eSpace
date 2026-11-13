<template>
  <!-- One piece of evidence on a case: a photo shows as a thumbnail, a PDF as a chip. Both open in a
       new tab. Fetched through /api/cases/files/{id}, which only the reporter and the super admin
       may open - so it never sits in a public folder or a plain link. -->
  <button type="button" class="group inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1.5 pr-3 text-left hover:border-indigo-400 transition max-w-[16rem]" :title="file.name" @click="open">
    <span v-if="isImage" class="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden flex-shrink-0 flex items-center justify-center">
      <img v-if="url" :src="url" alt="" class="w-full h-full object-cover">
      <AppIcon v-else name="photo" class="w-5 h-5 text-gray-400" />
    </span>
    <span v-else class="w-12 h-12 rounded-lg bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 flex-shrink-0 flex items-center justify-center text-[11px] font-semibold">PDF</span>
    <span class="min-w-0">
      <span class="block text-xs font-medium text-gray-800 dark:text-gray-100 truncate">{{ file.name }}</span>
      <span class="block text-[11px] text-gray-500 dark:text-gray-400">{{ size }} &middot; open</span>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import axios from 'axios'
import AppIcon from '@/components/common/AppIcon.vue'

const props = defineProps<{ file: { id: number; name: string; mime: string; size: number } }>()
const url = ref('')
const isImage = computed(() => props.file.mime.startsWith('image/'))
const size = computed(() => (props.file.size >= 1048576 ? `${(props.file.size / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(props.file.size / 1024))} KB`))

const fetchBlob = async () => {
  if (url.value) return url.value
  const res = await axios.get(`/api/cases/files/${props.file.id}`, { responseType: 'blob' })
  url.value = URL.createObjectURL(res.data)
  return url.value
}
const open = async () => {
  try {
    window.open(await fetchBlob(), '_blank', 'noopener')
  } catch { /* not allowed, or gone */ }
}
onMounted(() => { if (isImage.value) fetchBlob().catch(() => {}) })
onBeforeUnmount(() => { if (url.value) URL.revokeObjectURL(url.value) })
</script>
