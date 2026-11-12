<template>
  <!-- A dashboard's top banner: the sky for the time of day (sun by day, moon at night) behind
       whatever the page puts in it - the greeting, its badges and the like. -->
  <section class="sky-header sd-hero relative overflow-hidden rounded-[1.25rem] shadow-sm mb-4 min-h-[104px] sm:min-h-[112px] flex flex-col justify-center" :class="`sd-hero-${period}`">
    <!-- the sun or moon sits left of the badges on the right -->
    <DaySky :period="period" :narrow="narrow" :sun-x="1090" />
    <div class="relative px-4 sm:px-6 py-3.5 sm:py-4">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import DaySky, { type DayPeriod } from '@/components/dashboard/DaySky.vue'

defineProps<{ period: DayPeriod; narrow?: boolean }>()
</script>
