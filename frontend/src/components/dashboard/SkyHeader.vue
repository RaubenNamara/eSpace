<template>
  <!-- A dashboard's top banner: the sky for the time of day (sun by day, moon at night) behind
       whatever the page puts in it - the greeting, its badges and the like. -->
  <section class="sky-header sd-hero relative overflow-hidden rounded-[1.25rem] shadow-sm mb-4 min-h-[104px] sm:min-h-[112px] flex flex-col justify-center" :class="`sd-hero-${period}`">
    <!-- the sun or moon sits left of the badges on the right -->
    <DaySky :period="period" :narrow="narrow" :sun-x="1090" no-label />
    <!-- the weather in words, a small chip in the top corner (the sky's own words would run under
         the banner's badges and cards); not on a phone, where the greeting needs the room -->
    <span
      v-if="label && !narrow"
      class="absolute top-2.5 right-4 sm:right-6 z-[1] px-2.5 py-0.5 rounded-full text-xs font-semibold backdrop-blur-sm ring-1"
      :class="period === 'night' ? 'bg-white/15 text-indigo-50 ring-white/20' : 'bg-white/70 text-indigo-950 ring-white/60 dark:bg-gray-900/40 dark:text-indigo-50 dark:ring-white/10'"
    >{{ label }}</span>
    <div class="relative px-4 sm:px-6 py-3.5 sm:py-4">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import DaySky, { type DayPeriod } from '@/components/dashboard/DaySky.vue'
import { useWeather } from '@/composables/useWeather'

defineProps<{ period: DayPeriod; narrow?: boolean }>()
const { label } = useWeather()
</script>
