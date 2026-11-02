<template>
  <!-- A Word, Excel or PowerPoint file shown inside Tusome, exactly as Office shows it (fonts,
       styles, layout, tables, formulas), through Microsoft's Office viewer - so an ICT teacher
       marks the work without downloading it. Microsoft fetches the file from its address to
       display it (see the privacy policy). Other files (Publisher, Access) can't be shown in a
       browser: they download. -->
  <div class="office-viewer">
    <div class="flex flex-wrap items-center gap-2 mb-2">
      <span class="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">{{ ext }}</span>
      <span class="flex-1 min-w-0 truncate text-sm font-medium text-gray-800 dark:text-gray-100">{{ name }}</span>
      <a v-if="viewable && !local" :href="fullUrl" target="_blank" rel="noopener" class="px-2.5 py-1 rounded-lg text-xs font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">Open full screen</a>
      <a :href="url" :download="name" class="px-2.5 py-1 rounded-lg text-xs font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">Download</a>
    </div>

    <iframe
      v-if="viewable && !local"
      :src="embedUrl"
      :title="`${name} - Office viewer`"
      class="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white"
      :style="{ height }"
      allowfullscreen
    ></iframe>
    <p v-else-if="viewable" class="rounded-lg bg-amber-50 dark:bg-amber-900/20 p-3 text-sm text-amber-900 dark:text-amber-100">
      The Office view works on the live site (tusome.ug) - Microsoft's viewer can't reach a file on this computer. Download it to look at it here.
    </p>
    <p v-else class="rounded-lg bg-gray-50 dark:bg-gray-800 p-3 text-sm text-gray-600 dark:text-gray-300">
      {{ ext === 'pub' ? 'Publisher' : ext === 'mdb' || ext === 'accdb' ? 'Access' : 'This kind of' }} files can't be shown in a browser - download it and open it in {{ ext === 'pub' ? 'Publisher' : ext === 'mdb' || ext === 'accdb' ? 'Access' : 'its program' }}.
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ url: string; name: string; height?: string }>(), { height: '75vh' })

// What Microsoft's viewer opens
const VIEWABLE = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx']
const ext = computed(() => (props.name.split('.').pop() || props.url.split('.').pop() || '').toLowerCase().split(/[?#]/)[0])
const viewable = computed(() => VIEWABLE.includes(ext.value))
// The viewer needs the file's full public address
const absolute = computed(() => new URL(props.url, window.location.origin).href)
const local = computed(() => /^(localhost|127\.|10\.|192\.168\.)/.test(new URL(absolute.value).hostname))
const embedUrl = computed(() => `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(absolute.value)}`)
const fullUrl = computed(() => `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(absolute.value)}`)
</script>
