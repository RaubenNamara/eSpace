<template>
  <!-- School / Teacher / Student: whose side of Tusome the site shows (see useAudience) -->
  <div
    class="inline-flex items-center gap-0.5 p-1 rounded-full transition-colors"
    :class="light ? 'bg-white/10 ring-1 ring-white/15 backdrop-blur' : 'bg-slate-100 ring-1 ring-slate-200 dark:bg-white/5 dark:ring-white/10'"
    role="radiogroup"
    aria-label="Show Tusome for"
  >
    <span v-if="label" class="pl-2.5 pr-1 text-xs font-semibold" :class="light ? 'text-white/70' : 'text-slate-500 dark:text-slate-400'">I'm a</span>
    <button
      v-for="a in AUDIENCES"
      :key="a.key"
      type="button"
      role="radio"
      :aria-checked="audience === a.key"
      class="px-3.5 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition"
      :class="audience === a.key
        ? (light ? 'bg-white text-indigo-950 shadow' : 'bg-indigo-600 text-white shadow-sm')
        : (light ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white')"
      @click="setAudience(a.key)"
    >{{ a.label }}</button>
  </div>
</template>

<script setup lang="ts">
import { AUDIENCES, useAudience } from './useAudience'

defineProps<{ light?: boolean; label?: boolean }>()
const { audience, setAudience } = useAudience()
</script>
