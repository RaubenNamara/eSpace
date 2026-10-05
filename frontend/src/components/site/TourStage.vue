<template>
  <!-- One tour screen inside its browser frame -->
  <ScaledFrame :url="`espace / ${screen.label.toLowerCase()}`">
    <component :is="SCREENS[screen.key]" />
  </ScaledFrame>
</template>

<script setup lang="ts">
import ScaledFrame from './ScaledFrame.vue'
import ScreenENotes from './screens/ScreenENotes.vue'
import ScreenMap from './screens/ScreenMap.vue'
import ScreenMarking from './screens/ScreenMarking.vue'
import ScreenCoverage from './screens/ScreenCoverage.vue'
import ScreenDashboard from './screens/ScreenDashboard.vue'
import type { TOUR } from '@/data/site'

defineProps<{ screen: (typeof TOUR)[number] }>()

const SCREENS = { enotes: ScreenENotes, map: ScreenMap, marking: ScreenMarking, coverage: ScreenCoverage, dashboard: ScreenDashboard }
</script>
