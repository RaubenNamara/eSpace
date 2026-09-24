<template>
  <!-- .stop keeps StPageFlip (eNotes reader) from treating a tap here as the start of a page drag -->
  <div class="flex items-center gap-1" role="radiogroup" aria-label="My summary colour" @mousedown.stop @touchstart.stop>
    <button
      v-for="c in SUMMARY_COLORS"
      :key="c.value"
      type="button"
      role="radio"
      :aria-checked="modelValue === c.value"
      :title="c.label"
      @click="emit('update:modelValue', c.value)"
      class="w-4 h-4 rounded-full border border-black/10 dark:border-white/20 transition-transform"
      :class="[c.swatch, modelValue === c.value ? 'ring-2 ring-offset-1 ring-gray-500 dark:ring-gray-300 dark:ring-offset-gray-800 scale-110' : 'hover:scale-110']"
    ></button>
  </div>
</template>

<script setup lang="ts">
import { SUMMARY_COLORS, type SummaryColor } from '@/composables/useSummaryColor'

defineProps<{ modelValue: SummaryColor }>()
const emit = defineEmits<{ 'update:modelValue': [SummaryColor] }>()
</script>
