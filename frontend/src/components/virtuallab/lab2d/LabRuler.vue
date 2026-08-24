<!--
  A fixed measuring scale (like a real ruler, it never resizes itself to whatever it's measuring)
  used by every 2D apparatus that needs a real cm readout. Must be placed inside a parent <svg>.
-->
<template>
  <g class="lab-ruler" :class="{ 'cursor-pointer': clickable }" @click="$emit('click')">
    <rect
      :x="orientation === 'vertical' ? x - thickness / 2 : x"
      :y="orientation === 'vertical' ? y : y - thickness / 2"
      :width="orientation === 'vertical' ? thickness : maxValue * pxPerUnit"
      :height="orientation === 'vertical' ? maxValue * pxPerUnit : thickness"
      rx="3" fill="#fdf6e3" stroke="#cbb892" stroke-width="1.5"
      :class="armed ? 'lab-ruler-armed' : ''"
    />
    <g v-for="t in ticks" :key="t.v">
      <line
        v-if="orientation === 'vertical'"
        :x1="x - thickness / 2" :y1="y + t.px"
        :x2="x - thickness / 2 + (t.major ? 10 : 6)" :y2="y + t.px"
        stroke="#1e293b" stroke-width="1"
      />
      <line
        v-else
        :x1="x + t.px" :y1="y - thickness / 2"
        :x2="x + t.px" :y2="y - thickness / 2 + (t.major ? 10 : 6)"
        stroke="#1e293b" stroke-width="1"
      />
      <text
        v-if="t.major && orientation === 'vertical'"
        :x="x - thickness / 2 + 15" :y="y + t.px + 3"
        class="fill-slate-700 text-[9px] font-semibold"
      >{{ t.v }}</text>
      <text
        v-if="t.major && orientation === 'horizontal'"
        :x="x + t.px" :y="y - thickness / 2 + 22" text-anchor="middle"
        class="fill-slate-700 text-[9px] font-semibold"
      >{{ t.v }}</text>
    </g>
  </g>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** Anchor point: for vertical, the top-centre; for horizontal, the left-centre. */
  x: number
  y: number
  maxValue: number
  pxPerUnit: number
  orientation?: 'vertical' | 'horizontal'
  thickness?: number
  majorEvery?: number
  armed?: boolean
  clickable?: boolean
}>(), { orientation: 'vertical', thickness: 22, majorEvery: 5 })

defineEmits<{ click: [] }>()

const ticks = computed(() => {
  const list: { v: number; px: number; major: boolean }[] = []
  for (let v = 0; v <= props.maxValue; v++) {
    list.push({ v, px: v * props.pxPerUnit, major: v % props.majorEvery === 0 })
  }
  return list
})
</script>

<style scoped>
.lab-ruler-armed {
  filter: drop-shadow(0 0 6px #6366f1);
}
</style>
