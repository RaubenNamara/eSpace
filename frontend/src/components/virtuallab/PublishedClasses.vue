<template>
  <div class="flex items-start gap-1.5 flex-wrap">
    <span class="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-500 dark:text-gray-400 py-0.5">
      <AppIcon name="users" class="w-3.5 h-3.5" /> {{ classes?.length ? 'Published to:' : 'Not published to any class yet' }}
    </span>
    <span
      v-for="(label, i) in classes || []"
      :key="i"
      class="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
    >{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'

defineProps<{ classes?: string[] }>()
</script>
