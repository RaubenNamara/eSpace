<template>
  <!-- A browser window holding a drawing of an eSpace screen. The screen is laid out at a fixed
       55 x 32.5rem (880 x 520 at normal size) and scaled to whatever width the frame has, so it
       looks the same on a phone and on a large monitor. Screens use rem only, never px, so the
       whole drawing grows together when the site scales up on big screens. -->
  <div class="rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-2xl shadow-slate-900/10 overflow-hidden">
    <div class="flex items-center gap-1.5 px-3 sm:px-4 h-8 sm:h-10 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03]">
      <span class="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-white/20"></span>
      <span class="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-white/20"></span>
      <span class="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-white/20"></span>
      <span class="ml-3 flex-1 max-w-xs truncate rounded-md bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-2 py-0.5 text-[10px] sm:text-[11px] text-slate-400">{{ url }}</span>
    </div>
    <div ref="box" class="relative overflow-hidden" :style="{ height: `${H * rem * scale}px` }">
      <div class="absolute left-0 top-0 origin-top-left" :style="{ width: `${W}rem`, height: `${H}rem`, transform: `scale(${scale})` }">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineProps<{ url: string }>()

const W = 55
const H = 32.5
const box = ref<HTMLElement | null>(null)
const scale = ref(1)
// Size of 1rem in px right now (16, or more when the public site scales up on a big screen)
const rem = ref(16)
let ro: ResizeObserver | null = null
const fit = () => {
  rem.value = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
  if (box.value) scale.value = box.value.clientWidth / (W * rem.value)
}
onMounted(() => {
  fit()
  ro = new ResizeObserver(fit)
  if (box.value) ro.observe(box.value)
})
onBeforeUnmount(() => ro?.disconnect())
</script>
