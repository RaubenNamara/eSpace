<template>
  <!-- Flowers falling from the top of the screen, swaying as they drop, for a few seconds after a
       learner hands in their work. Nothing can be clicked on them, and nothing falls for anyone who
       asked their device for less motion. -->
  <Teleport to="body">
    <div v-if="showing" class="flower-shower" aria-hidden="true">
      <span
        v-for="f in flowers"
        :key="f.id"
        class="flower-fall"
        :style="{ left: `${f.left}%`, animationDuration: `${f.duration}s`, animationDelay: `${f.delay}s` }"
      >
        <span class="flower-sway" :style="{ animationDuration: `${f.sway}s` }">
          <svg :width="f.size" :height="f.size" viewBox="0 0 40 40" :style="{ transform: `rotate(${f.turn}deg)` }">
            <g :fill="f.petal">
              <ellipse cx="20" cy="9" rx="6.5" ry="9" />
              <ellipse cx="20" cy="9" rx="6.5" ry="9" transform="rotate(72 20 20)" />
              <ellipse cx="20" cy="9" rx="6.5" ry="9" transform="rotate(144 20 20)" />
              <ellipse cx="20" cy="9" rx="6.5" ry="9" transform="rotate(216 20 20)" />
              <ellipse cx="20" cy="9" rx="6.5" ry="9" transform="rotate(288 20 20)" />
            </g>
            <circle cx="20" cy="20" r="5" :fill="f.centre" />
          </svg>
        </span>
      </span>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{ count?: number; seconds?: number }>(), { count: 42, seconds: 6.5 })

const PETALS = ['#f472b6', '#fb7185', '#f9a8d4', '#fbbf24', '#a78bfa', '#60a5fa', '#34d399', '#fda4af']
const CENTRES = ['#fde047', '#f59e0b', '#fff7ed']
const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)]

const flowers = Array.from({ length: props.count }, (_, id) => ({
  id,
  left: Math.random() * 100,
  size: 18 + Math.random() * 22,
  duration: 3.6 + Math.random() * 2.6,
  delay: Math.random() * 1.8,
  sway: 1.6 + Math.random() * 1.4,
  turn: Math.random() * 360,
  petal: pick(PETALS),
  centre: pick(CENTRES),
}))

const showing = ref(false)
let timer: number | undefined
onMounted(() => {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
  showing.value = true
  timer = window.setTimeout(() => { showing.value = false }, props.seconds * 1000)
})
onBeforeUnmount(() => window.clearTimeout(timer))
</script>

<style>
.flower-shower { position: fixed; inset: 0; z-index: 80; pointer-events: none; overflow: hidden; }
.flower-fall { position: absolute; top: -12vh; animation-name: flower-fall; animation-timing-function: cubic-bezier(0.35, 0.1, 0.55, 1); animation-fill-mode: both; }
.flower-sway { display: block; animation-name: flower-sway; animation-timing-function: ease-in-out; animation-iteration-count: infinite; animation-direction: alternate; }
.flower-sway svg { filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.12)); }
@keyframes flower-fall {
  0% { transform: translateY(0) rotate(0deg); opacity: 0; }
  8% { opacity: 1; }
  85% { opacity: 1; }
  100% { transform: translateY(118vh) rotate(320deg); opacity: 0; }
}
@keyframes flower-sway {
  from { transform: translateX(-22px) rotate(-12deg); }
  to { transform: translateX(22px) rotate(12deg); }
}
@media (prefers-reduced-motion: reduce) { .flower-shower { display: none; } }
</style>
