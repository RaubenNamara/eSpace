<template>
  <!-- A learner's ICT practical, for whoever looks at it after it is handed in - the teacher
       marking it, a HOD or admin previewing, or the learner with their result. All the files they
       made (one per app) sit in one card under their name; each opens in the app it was made in,
       view only, and can be downloaded as a real Office file. -->
  <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
    <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
      <span v-if="studentName" class="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200 flex-shrink-0" aria-hidden="true">{{ initials }}</span>
      <div class="min-w-0 flex-1">
        <p class="text-sm font-bold text-gray-900 dark:text-white truncate">{{ studentName ? `${studentName}'s practical work` : `${who} practical work` }}</p>
        <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">
          {{ list.length ? `${list.length} ${list.length === 1 ? 'file' : 'files'} · ${list.map(f => PRACTICAL_APPS[f.app].short).join(', ')}` : 'Nothing was done in this practical.' }}
        </p>
      </div>
    </div>
    <ul v-if="list.length" class="divide-y divide-gray-100 dark:divide-gray-700">
      <li v-for="f in list" :key="f.app" class="px-4 py-3 flex items-center gap-3">
        <span class="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-black flex-shrink-0" :class="PRACTICAL_APPS[f.app].badge" aria-hidden="true">{{ PRACTICAL_APPS[f.app].letter }}</span>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">
            {{ PRACTICAL_APPS[f.app].label }}
            <span v-if="f.app === mainApp && list.length > 1" class="ml-1 align-middle px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">Set by the teacher</span>
          </p>
          <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ f.handed_in_at ? `Handed in on its own · ${when(f.handed_in_at)}` : 'Handed in with the assessment' }}</p>
        </div>
        <button type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold text-white flex-shrink-0" :class="PRACTICAL_APPS[f.app].bar" @click="openApp = f.app">{{ marking ? 'Open and mark' : 'Open' }}</button>
      </li>
    </ul>
    <Teleport to="body">
      <PracticalWorkspace
        v-if="openFile"
        :key="openFile.app"
        :app="openFile.app"
        :title="title"
        :subtitle="[studentName, subtitle].filter(Boolean).join(' · ')"
        :instructions="instructions || null"
        :src="openFile.path"
        readonly
        done-label="Close"
        :file-name="fileName || title"
        :marking="marking"
        :markup-layers="markupLayers"
        @close="openApp = null"
      />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import PracticalWorkspace from './PracticalWorkspace.vue'
import { PRACTICAL_APPS, type PracticalApp } from './apps'

interface WorkFile { app: string; path: string; handed_in_at?: string | null }

const props = withDefaults(defineProps<{
  /** the teacher's app */
  app: string
  /** every file the learner made, one per app */
  files?: WorkFile[] | null
  /** work saved before learners could use more than one app */
  path?: string | null
  title: string
  subtitle?: string
  studentName?: string | null
  instructions?: string | null
  /** "The learner's" / "Your" */
  who?: string
  fileName?: string
  /** a teacher marking it (PracticalWorkspace's marking) - one mark for the whole practical */
  marking?: InstanceType<typeof PracticalWorkspace>['$props']['marking']
  /** the teacher's pen marks, for the learner to see with the result */
  markupLayers?: Record<number, any> | null
}>(), { files: null, path: null, subtitle: '', studentName: null, instructions: null, who: "The learner's", fileName: '', marking: null, markupLayers: null })

const mainApp = computed(() => (props.app in PRACTICAL_APPS ? props.app : 'word') as PracticalApp)
const list = computed(() => {
  const given = (props.files || []).filter(f => f.app in PRACTICAL_APPS && f.path) as (WorkFile & { app: PracticalApp })[]
  if (!given.length && props.path) return [{ app: mainApp.value, path: props.path, handed_in_at: null }]
  return given
})
const openApp = ref<PracticalApp | null>(null)
const openFile = computed(() => list.value.find(f => f.app === openApp.value) || null)
const initials = computed(() => (props.studentName || '').split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]!.toUpperCase()).join(''))
const when = (d: string) => new Date(d.replace(' ', 'T')).toLocaleString(undefined, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
</script>
