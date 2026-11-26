<template>
  <!-- A dashboard's masthead: a plain, formal band (a gold rule along the top, the school's own crest
       faint on the right) holding whatever the page puts in it - the date and term, the greeting and
       its badges. It used to be a sky for the time of day; the name is kept so the pages need no change. -->
  <section class="sky-header academic-mast relative overflow-hidden mb-4">
    <img v-if="identity?.logo" :src="resolveAssetUrl(identity.logo)" alt="" class="mast-crest" aria-hidden="true">
    <div class="relative px-4 sm:px-6 py-3.5 sm:py-4">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { DayPeriod } from '@/components/dashboard/DaySky.vue'
import { useSchoolIdentity } from '@/composables/useSchoolIdentity'
import { resolveAssetUrl } from '@/utils/url'

// period / narrow are still passed by the dashboards (the greeting uses the time of day)
defineProps<{ period?: DayPeriod; narrow?: boolean }>()
const { identity } = useSchoolIdentity()
</script>
