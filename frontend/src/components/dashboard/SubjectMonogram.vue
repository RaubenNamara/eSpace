<template>
  <!-- A subject's badge, like a book's spine label: its code in serif capitals on deep blue, inside a
       thin gold frame. One style for every subject (the academic look); `color` is still accepted
       from the pages but no longer tints it. -->
  <svg class="w-full h-full block" viewBox="0 0 120 100" preserveAspectRatio="xMidYMid slice" role="img" :aria-label="code">
    <defs>
      <linearGradient :id="`mg-bg-${uid}`" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#1b3fa0" />
        <stop offset="1" stop-color="#14307d" />
      </linearGradient>
    </defs>
    <rect width="120" height="100" :fill="`url(#mg-bg-${uid})`" />
    <rect x="9" y="9" width="102" height="82" rx="4" fill="none" stroke="#d9a520" stroke-width="2" />
    <rect x="14" y="14" width="92" height="72" rx="2" fill="none" stroke="#d9a520" stroke-opacity="0.45" stroke-width="1" />
    <text x="60" y="62" text-anchor="middle" :textLength="code.length > 2 ? 70 : 50" lengthAdjust="spacingAndGlyphs"
      font-family="'Source Serif 4', Georgia, 'Times New Roman', serif" font-weight="600" font-size="30" letter-spacing="2" fill="#fff">{{ code }}</text>
  </svg>
</template>

<script setup lang="ts">
defineProps<{ code: string; color?: string }>()
const uid = Math.random().toString(36).slice(2, 8)
</script>
