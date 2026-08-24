<template>
  <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
    <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-1.5">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-14 0m7 7v3m-3 0h6M12 15a3 3 0 003-3V6a3 3 0 00-6 0v6a3 3 0 003 3z"></path>
      </svg>
      AI Narration
    </h4>

    <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Voice (applies to every page in this topic)</label>
    <select
      v-model="selectedVoice"
      @change="saveVoice"
      :disabled="savingVoice"
      class="w-full px-2.5 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white mb-3"
    >
      <option value="">Select a voice...</option>
      <option v-for="v in AI_VOICES" :key="v.value" :value="v.value">{{ v.label }}</option>
    </select>

    <div v-if="!selectedVoice" class="text-xs text-gray-400 dark:text-gray-500">
      Pick a voice above to enable narration for this topic.
    </div>

    <template v-else>
      <div v-if="currentNarration" class="space-y-2">
        <audio :src="resolveAssetUrl(currentNarration.audio_path)" controls class="w-full h-9"></audio>
        <div class="flex items-center justify-between gap-2">
          <p class="text-[11px] text-gray-400 dark:text-gray-500">
            Generated {{ formatDate(currentNarration.generated_at) }}
          </p>
          <button
            @click="generate"
            :disabled="generating"
            class="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline disabled:opacity-50"
          >
            {{ generating ? 'Regenerating...' : 'Regenerate' }}
          </button>
        </div>
        <p v-if="currentNarration.is_stale" class="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
          <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Page content changed since this was generated
        </p>
      </div>

      <button
        v-else
        @click="generate"
        :disabled="generating"
        class="w-full px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
      >
        {{ generating ? 'Generating...' : 'Generate Narration' }}
      </button>
    </template>

    <p v-if="error" class="text-xs text-red-500 mt-2">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import axios from 'axios'
import { AI_VOICES } from '@/types/enotes'
import type { ENotePageNarration } from '@/types/enotes'
import { resolveAssetUrl } from '@/utils/url'

const props = defineProps<{
  topicId: number
  pageId: number
  narrationVoice: string | null
  narrations: ENotePageNarration[]
}>()

const emit = defineEmits<{
  'voice-changed': [string]
  'narration-generated': [ENotePageNarration]
}>()

const selectedVoice = ref(props.narrationVoice || '')
const savingVoice = ref(false)
const generating = ref(false)
const error = ref('')

watch(() => props.narrationVoice, (v) => { selectedVoice.value = v || '' })

const currentNarration = computed(() => props.narrations.find(n => n.voice === selectedVoice.value) || null)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}

const saveVoice = async () => {
  if (!selectedVoice.value) return
  savingVoice.value = true
  error.value = ''
  try {
    await axios.put(`/api/teacher/enotes/topics/${props.topicId}/narration-voice`, { voice: selectedVoice.value })
    emit('voice-changed', selectedVoice.value)
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to save voice'
  } finally {
    savingVoice.value = false
  }
}

const generate = async () => {
  if (!selectedVoice.value) return
  generating.value = true
  error.value = ''
  try {
    const response = await axios.post(`/api/teacher/enotes/pages/${props.pageId}/narration`, { voice: selectedVoice.value })
    if (response.data.success) {
      emit('narration-generated', response.data.data)
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to generate narration'
  } finally {
    generating.value = false
  }
}
</script>
