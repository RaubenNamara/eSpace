<template>
  <!-- Student Voice: shown when the school has switched it on (Admin > Settings). Opens the school's
       anonymous feedback polls in a new tab, already signed in with this learner's Tusome account. -->
  <section v-if="enabled" class="mb-4 flex flex-col gap-3 rounded-2xl bg-gradient-to-r from-[#1c1b6c] to-[#2e3299] p-4 text-white shadow-md sm:flex-row sm:items-center">
    <span class="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white/15">
      <AppIcon name="chat" class="h-6 w-6" />
    </span>
    <div class="min-w-0 flex-1">
      <p class="font-brand text-base font-semibold">Student Voice is open</p>
      <p class="text-sm text-blue-100">Tell the school how teaching and learning is going. Anonymous - nobody sees who said what.</p>
      <p v-if="problem" class="mt-1 text-sm font-semibold text-amber-200">{{ problem }}</p>
    </div>
    <button
      type="button"
      class="flex-shrink-0 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-bold text-[#0f0d3c] transition hover:bg-amber-300 disabled:opacity-60"
      :disabled="opening"
      @click="openVoice"
    >
      {{ opening ? 'Opening…' : 'Have your say →' }}
    </button>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import AppIcon from '@/components/common/AppIcon.vue'

const enabled = ref(false)
const opening = ref(false)
const problem = ref('')

onMounted(() => {
  axios.get('/api/student/student-voice').then((r) => { enabled.value = !!r.data?.data?.enabled }).catch(() => {})
})

/**
 * Opens the tab straight away (so the browser doesn't treat it as a pop-up), then sends it to the
 * signed one-use link once Tusome has made it. If the tab was blocked, this page goes there instead.
 */
async function openVoice() {
  problem.value = ''
  opening.value = true
  const tab = window.open('', '_blank')
  try {
    const r = await axios.post('/api/student/student-voice/link')
    const url = r.data?.data?.url as string
    if (tab) tab.location.href = url
    else window.location.href = url
  } catch (e: any) {
    tab?.close()
    problem.value = e?.response?.data?.message || 'Could not open Student Voice. Try again.'
  } finally {
    opening.value = false
  }
}
</script>
