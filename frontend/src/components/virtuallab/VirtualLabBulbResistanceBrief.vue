<template>
  <!-- The practical's written brief - scenario, aim, hypothesis, variables, apparatus, set-up diagram
       and procedure - in the same card style as the apparatus strip below it. -->
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-3.5 mb-4">
    <div class="flex flex-wrap items-center justify-between gap-2" :class="open ? 'mb-3' : ''">
      <p class="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">Practical Brief</p>
      <button type="button" @click="open = !open" class="px-2.5 py-1 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">{{ open ? 'Hide brief' : 'Show brief' }}</button>
    </div>

    <template v-if="open">
      <div class="flex flex-wrap gap-1 mb-3">
        <button
          v-for="t in TABS"
          :key="t.key"
          type="button"
          @click="tab = t.key"
          class="px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors"
          :class="tab === t.key ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/40 hover:bg-gray-100 dark:hover:bg-gray-700'"
        >{{ t.label }}</button>
      </div>

      <div class="text-sm text-gray-700 dark:text-gray-200">
        <div v-if="tab === 'scenario'" class="space-y-2">
          <p v-for="(para, i) in scenarioParas" :key="i">{{ para }}</p>
        </div>

        <div v-else-if="tab === 'aim'" class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 p-3">
            <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-500 dark:text-indigo-400 mb-1">Aim</p>
            <p>{{ aim }}</p>
          </div>
          <div class="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3">
            <p class="text-[11px] font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400 mb-1">Hypothesis</p>
            <p>The resistance of the bulb filament is approximately 1 &Omega;.</p>
            <p class="text-xs text-amber-800 dark:text-amber-200 mt-1.5">This is a prediction to test, not the answer. Your own readings and graph decide the filament's resistance - you will compare your value with this hypothesis in your conclusion.</p>
          </div>
        </div>

        <div v-else-if="tab === 'variables'" class="space-y-2">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div class="rounded-xl bg-gray-50 dark:bg-gray-900/40 p-3"><p class="text-[11px] font-bold uppercase tracking-wide text-gray-400 mb-1">Independent</p><p>Length of constantan wire, <em>x</em></p></div>
            <div class="rounded-xl bg-gray-50 dark:bg-gray-900/40 p-3"><p class="text-[11px] font-bold uppercase tracking-wide text-gray-400 mb-1">Dependent</p><p>Current, <em>I</em>, and voltage, <em>V</em></p></div>
            <div class="rounded-xl bg-gray-50 dark:bg-gray-900/40 p-3"><p class="text-[11px] font-bold uppercase tracking-wide text-gray-400 mb-1">Controlled</p><p>Temperature of the bulb filament</p></div>
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400">A filament's resistance rises as it gets hotter. Open switch K as soon as each pair of readings is taken and let the bulb cool before the next one, so heating doesn't change the very thing you are measuring.</p>
        </div>

        <ol v-else-if="tab === 'apparatus'" class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 list-decimal list-inside">
          <li v-for="a in APPARATUS" :key="a">{{ a }}</li>
        </ol>

        <div v-else-if="tab === 'setup'" class="grid grid-cols-1 lg:grid-cols-5 gap-4 items-start">
          <svg viewBox="0 0 520 270" class="lg:col-span-3 w-full h-auto rounded-xl bg-white border border-gray-200 dark:border-gray-700" role="img" aria-label="Circuit diagram: two cells, switch K, constantan wire P, torch bulb and ammeter in series, voltmeter across the bulb">
            <g stroke="#0f172a" stroke-width="2" fill="none">
              <!-- loop -->
              <path d="M40 50 H112 M128 50 H152 M168 50 H272 M308 50 H480 V180 H452 M268 180 H222 M178 180 H117 M83 180 H40 V50" />
              <!-- two cells -->
              <line x1="112" y1="36" x2="112" y2="64" /><line x1="128" y1="43" x2="128" y2="57" stroke-width="4" />
              <line x1="152" y1="36" x2="152" y2="64" /><line x1="168" y1="43" x2="168" y2="57" stroke-width="4" />
              <!-- switch K (open) -->
              <circle cx="272" cy="50" r="3" fill="#0f172a" /><circle cx="308" cy="50" r="3" fill="#0f172a" />
              <line x1="272" y1="50" x2="304" y2="34" />
              <!-- wire P on the metre rule, crocodile clips at the ends of length x -->
              <line x1="268" y1="180" x2="452" y2="180" stroke-width="2.5" stroke="#64748b" />
              <!-- bulb -->
              <circle cx="200" cy="180" r="22" fill="#fffbeb" /><path d="M184 164 L216 196 M216 164 L184 196" />
              <!-- ammeter -->
              <circle cx="100" cy="180" r="17" fill="#fff" />
              <!-- voltmeter across the bulb -->
              <path d="M165 180 V232 H183 M217 232 H235 V180" />
              <circle cx="200" cy="232" r="17" fill="#fff" />
            </g>
            <rect x="262" y="190" width="200" height="14" rx="2" fill="#f2d39a" stroke="#c8955a" />
            <g stroke="#0f172a" stroke-width="1"><line v-for="i in 21" :key="i" :x1="262 + (i - 1) * 10" y1="190" :x2="262 + (i - 1) * 10" :y2="(i - 1) % 5 === 0 ? 198 : 195" /></g>
            <path d="M262 172 l6 8 l-6 8 M458 172 l-6 8 l6 8" stroke="#dc2626" stroke-width="3" fill="none" />
            <g fill="#dc2626"><path d="M268 220 l8 -4 v8 z M452 220 l-8 -4 v8 z" /></g>
            <line x1="272" y1="220" x2="448" y2="220" stroke="#dc2626" stroke-width="1.5" />
            <g font-family="sans-serif" font-weight="700" fill="#0f172a" text-anchor="middle">
              <text x="140" y="16" font-size="13">two dry cells</text>
              <text x="104" y="38" font-size="13">+</text><text x="177" y="38" font-size="14">&minus;</text>
              <text x="290" y="26" font-size="14">K</text>
              <text x="100" y="185" font-size="15">A</text>
              <text x="200" y="237" font-size="15">V</text>
              <text x="200" y="152" font-size="11" font-weight="600">torch bulb</text>
              <text x="360" y="172" font-size="14">P</text>
              <text x="360" y="238" font-size="13" fill="#dc2626">x</text>
              <text x="360" y="258" font-size="10" font-weight="500" fill="#64748b">metre rule; clips move along P</text>
            </g>
          </svg>
          <ul class="lg:col-span-2 space-y-1.5 text-sm list-disc list-inside">
            <li>Two dry cells in the double-cell holder, switch <strong>K</strong>, the constantan wire <strong>P</strong>, the torch bulb and the ammeter all in <strong>series</strong>.</li>
            <li>The voltmeter connected <strong>across</strong> (in parallel with) the torch bulb.</li>
            <li>Wire P is stretched along the metre rule and held down with two pieces of Sellotape.</li>
            <li>The two crocodile clips connect P into the circuit; the length between them is the effective length <em>x</em>, read off the metre rule.</li>
            <li>Starting length <em>x</em><sub>0</sub> = 1.000 m. Move the clip to change <em>x</em>.</li>
          </ul>
        </div>

        <ol v-else-if="tab === 'procedure'" class="space-y-1 list-decimal list-inside">
          <li v-for="p in PROCEDURE" :key="p">{{ p }}</li>
        </ol>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{ introduction?: string | null; objective?: string | null }>()

const TABS = [
  { key: 'scenario', label: 'Scenario' },
  { key: 'aim', label: 'Aim & Hypothesis' },
  { key: 'variables', label: 'Variables' },
  { key: 'apparatus', label: 'Apparatus' },
  { key: 'setup', label: 'Experimental Setup' },
  { key: 'procedure', label: 'Procedure' },
] as const
const tab = ref<(typeof TABS)[number]['key']>('scenario')
const open = ref(true)

const scenarioParas = computed(() => (props.introduction || '').split(/\n+/).map(p => p.trim()).filter(Boolean))
const aim = computed(() => props.objective || 'To determine the resistance of the filament of a simple torch bulb.')

const APPARATUS = [
  'Two dry cells', 'Ammeter, range 0-1 A', 'Voltmeter, range 0-3 V', 'One torch bulb', 'Constantan wire, SWG 28',
  'Connecting wires', 'One switch (K)', 'One metre rule', 'Two pieces of Sellotape', 'Two crocodile clips', 'Double-cell holder',
]

const PROCEDURE = [
  'Fix the bare constantan wire P along the metre rule using the pieces of Sellotape provided.',
  'Connect the circuit as shown in the experimental setup.',
  'Ensure the ammeter is connected in series with the circuit.',
  'Ensure the voltmeter is connected across the torch bulb.',
  'Set the effective length of constantan wire to x = 0.200 m.',
  'Close switch K.',
  'Allow the readings to stabilise.',
  'Read and record the voltmeter reading V.',
  'Read and record the ammeter reading I.',
  'Open switch K immediately after taking the readings to reduce unnecessary heating and voltage drop.',
  'Allow the bulb to cool where necessary.',
  'Change the wire length to x = 0.300 m and repeat the measurement.',
  'Repeat the procedure for x = 0.400 m, 0.500 m and 0.600 m.',
  'Record all measurements in the results table.',
  'Plot a graph of I against V.',
  'Determine the slope (gradient) of the graph.',
  'Use the gradient to determine the resistance of the bulb filament.',
]
</script>
