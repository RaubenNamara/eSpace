<template>
  <div class="space-y-4">
    <div>
      <p class="text-sm text-gray-700 dark:text-gray-200">The real heart from the model, lifted out of the body with the roots of its great vessels. Click any part to find out what it does.</p>
      <ul class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 dark:text-gray-300" aria-label="Colour key">
        <li class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full" :style="{ background: hex(RICH) }" aria-hidden="true"></span>Oxygen-rich blood</li>
        <li class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full" :style="{ background: hex(POOR) }" aria-hidden="true"></span>Oxygen-poor blood</li>
      </ul>
    </div>

    <!-- outside / inside -->
    <div class="grid grid-cols-2 gap-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-900/60" role="radiogroup" aria-label="Heart view">
      <button v-for="o in VIEWS" :key="o.k" type="button" role="radio" :aria-checked="view === o.k"
        class="py-1.5 rounded-md text-xs font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        :class="view === o.k ? 'bg-white dark:bg-gray-700 text-indigo-700 dark:text-indigo-200 shadow-sm' : 'text-gray-600 dark:text-gray-300'"
        @click="emit('view', o.k)">{{ o.l }}</button>
    </div>
    <p class="text-[11px] text-gray-500 dark:text-gray-400 -mt-2">{{ view === 'internal' ? 'Cut along the four-chamber plane, the plane of both AV valves and the apex. The valves are cut with it; select the pulmonary or aortic valve to see it whole.' : 'The outside of the heart with its coronary vessels and great vessels.' }}</p>

    <!-- the cardiac cycle -->
    <section>
      <h2 class="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">One heartbeat</h2>
      <ol class="mt-2 space-y-1" aria-label="Stages of the heartbeat">
        <li v-for="(p, i) in PHASES" :key="p.key">
          <button type="button"
            class="w-full text-left flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            :class="p.key === phase ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-gray-900 dark:text-white font-semibold' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-indigo-300'"
            :aria-current="p.key === phase ? 'step' : undefined"
            :title="playing ? 'Pause to look at this stage' : 'Show this stage'"
            @click="emit('phase', p.key)">
            <span class="w-4 h-4 rounded-full text-[10px] flex items-center justify-center flex-shrink-0" :class="p.key === phase ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700'">{{ i + 1 }}</span>
            {{ p.name }}
          </button>
        </li>
      </ol>
      <div class="mt-2 flex items-center gap-2 text-xs">
        <span class="text-gray-500 dark:text-gray-400">Speed</span>
        <div class="flex gap-1" role="radiogroup" aria-label="Heart rate">
          <button v-for="s in SPEEDS" :key="s.bpm" type="button" role="radio" :aria-checked="speed === s.bpm"
            class="px-2 py-1 rounded-md border font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            :class="speed === s.bpm ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200'"
            @click="emit('speed', s.bpm)">{{ s.l }}</button>
        </div>
      </div>
    </section>

    <!-- selected part -->
    <section v-if="part" class="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/60 dark:bg-indigo-900/20 px-3 py-2.5" aria-live="polite">
      <div class="flex items-start gap-2">
        <h2 class="text-sm font-bold text-gray-900 dark:text-white flex-1">{{ part.name }}</h2>
        <span v-if="part.blood !== 'none'" class="text-[10px] font-semibold px-1.5 py-0.5 rounded-full text-white" :style="{ background: hex(part.blood === 'rich' ? RICH : POOR) }">{{ part.blood === 'rich' ? 'Oxygen-rich' : 'Oxygen-poor' }}</span>
      </div>
      <p class="text-sm text-gray-700 dark:text-gray-200 mt-1">{{ part.summary }}</p>
      <p class="text-sm text-gray-800 dark:text-gray-100 mt-1.5"><strong>Job:</strong> {{ part.fn }}</p>
      <ul class="mt-1.5 space-y-1 list-disc pl-4 text-sm text-gray-700 dark:text-gray-200">
        <li v-for="(e, i) in part.explain" :key="i"><template v-for="(seg, k) in boldSegments(e)" :key="k"><strong v-if="seg.bold" class="text-gray-900 dark:text-white">{{ seg.text }}</strong><template v-else>{{ seg.text }}</template></template></li>
      </ul>
      <p v-if="part.watch" class="mt-1.5 text-xs text-indigo-800 dark:text-indigo-200"><strong>Watch:</strong> {{ part.watch }}</p>
      <div class="mt-2 flex gap-1.5">
        <button type="button" class="px-2 py-1 rounded-md border border-indigo-300 dark:border-indigo-700 text-xs font-semibold text-indigo-700 dark:text-indigo-200 hover:bg-white dark:hover:bg-gray-800" @click="emit('zoom', part.key)">Zoom to it</button>
        <button type="button" class="px-2 py-1 rounded-md border border-gray-300 dark:border-gray-600 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800" @click="emit('select', null)">Clear</button>
      </div>
    </section>

    <!-- every part -->
    <section v-for="g in HEART_PART_GROUPS" :key="g.title">
      <h2 class="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">{{ g.title }}</h2>
      <ul class="mt-1.5 flex flex-wrap gap-1.5">
        <li v-for="k in g.keys" :key="k">
          <button type="button" class="px-2 py-1 rounded-md border text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            :class="k === selected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-indigo-400'"
            :aria-pressed="k === selected" @click="emit('select', k === selected ? null : k)">
            <span v-if="HEART_PART_BY_KEY[k].blood !== 'none'" class="inline-block w-2 h-2 rounded-full mr-1 align-middle" :style="{ background: hex(HEART_PART_BY_KEY[k].blood === 'rich' ? RICH : POOR) }" aria-hidden="true"></span>{{ HEART_PART_BY_KEY[k].name }}
          </button>
        </li>
      </ul>
    </section>

    <p class="text-[11px] text-gray-500 dark:text-gray-400">From BodyParts3D. The chordae tendineae ("heart strings"), the conducting system and the pericardium are not in the model. The septa are found from the shape of the walls. The motion follows the textbook cardiac cycle; it is not a recording of a real heart.</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PHASES, type CyclePhase } from '@/anatomy/heart/heartCycle'
import { HEART_PART_BY_KEY, boldSegments } from '@/anatomy/heart/heartParts'
import { HEART_PART_GROUPS, RICH, POOR, type HeartView } from '@/anatomy/heart/heartMode'

const props = defineProps<{ view: HeartView; phase: CyclePhase | null; playing: boolean; speed: number; selected: string | null }>()
const emit = defineEmits<{ view: [HeartView]; phase: [CyclePhase]; speed: [number]; select: [string | null]; zoom: [string] }>()

const VIEWS = [{ k: 'external', l: 'Outside' }, { k: 'internal', l: 'Inside (cut open)' }] as const
const SPEEDS = [{ bpm: 8, l: 'Very slow' }, { bpm: 20, l: 'Slow' }, { bpm: 72, l: 'Real speed' }]
const part = computed(() => props.selected ? HEART_PART_BY_KEY[props.selected] ?? null : null)
const hex = (n: number) => `#${n.toString(16).padStart(6, '0')}`
</script>
