<template>
  <nav class="flex items-center gap-1.5 mb-6 text-sm flex-wrap" aria-label="Breadcrumb">
    <template v-for="(item, index) in items" :key="index">
      <span v-if="index > 0" class="text-gray-300 dark:text-gray-600 flex-shrink-0">/</span>

      <span v-if="index === items.length - 1" class="font-semibold text-gray-900 dark:text-white">
        {{ item.label }}
      </span>
      <RouterLink
        v-else-if="item.to"
        :to="item.to"
        class="font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        {{ item.label }}
      </RouterLink>
      <button
        v-else
        type="button"
        @click="item.onClick?.()"
        class="font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        {{ item.label }}
      </button>
    </template>
  </nav>
</template>

<script setup lang="ts">
export interface BreadcrumbItem {
  label: string
  /** Navigates here via RouterLink. Omit for a step that only clears local drill-down state. */
  to?: string
  /** Called when clicked, for steps that reset in-page state instead of navigating. */
  onClick?: () => void
}

// The last item is always rendered as the current (non-interactive) page, regardless of
// whether it was given a `to` or `onClick` - callers can pass the full trail including "here"
// without special-casing it themselves.
defineProps<{ items: BreadcrumbItem[] }>()
</script>
