<template>
  <!-- An award badge as an outline icon (gem / medal / star) - tinted just enough to tell platinum,
       gold, silver and bronze apart, in place of the coloured badge emojis -->
  <AppIcon :name="BADGE_ICONS[type] ?? 'star'" :class="plain ? '' : (TINT[type] ?? TINT.special)" />
</template>

<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import { BADGE_ICONS, type BadgeType } from '@/types/reward'

// plain: no tint - on a coloured badge pill the icon takes the pill's text colour
defineProps<{ type: BadgeType; plain?: boolean }>()

const TINT: Record<BadgeType, string> = {
  platinum: 'text-slate-500 dark:text-slate-300',
  gold: 'text-amber-600 dark:text-amber-400',
  silver: 'text-gray-400 dark:text-gray-300',
  bronze: 'text-orange-700 dark:text-orange-400',
  special: 'text-indigo-500 dark:text-indigo-300'
}
</script>
