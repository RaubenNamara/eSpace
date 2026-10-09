<template>
  <div class="space-y-5">
    <!-- 1. Results table -->
    <section class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
      <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-1">1. Results table</h3>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Your recorded readings. Correct any you copied down wrongly, then save the row.</p>
      <div class="overflow-x-auto">
        <table class="w-full max-w-md text-sm border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr class="bg-indigo-50 dark:bg-indigo-900/30 text-left text-gray-800 dark:text-gray-100">
              <th class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">x (m)</th>
              <th class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">I (A)</th>
              <th class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">V (V)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in tableRows" :key="r.key" class="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-900/40">
              <td class="border border-gray-300 dark:border-gray-600 px-3 py-1.5 tabular-nums text-gray-800 dark:text-gray-100">{{ r.key }}</td>
              <td class="border border-gray-300 dark:border-gray-600 px-2 py-1">
                <input v-model="edits[r.key].i" type="number" step="0.01" min="0" :disabled="readOnly" @blur="saveRow(r.key)" class="input-field w-24 text-sm py-1 tabular-nums" placeholder="-">
              </td>
              <td class="border border-gray-300 dark:border-gray-600 px-2 py-1">
                <input v-model="edits[r.key].v" type="number" step="0.01" min="0" :disabled="readOnly" @blur="saveRow(r.key)" class="input-field w-24 text-sm py-1 tabular-nums" placeholder="-">
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-if="tableMessage" class="mt-2 text-xs text-amber-700 dark:text-amber-400">{{ tableMessage }}</p>
    </section>

    <!-- 2. Graph -->
    <section class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
      <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-1">2. Graph of current against voltage</h3>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">The practical asks for a graph of <strong>I against V</strong>. Choose which quantity goes on each axis.</p>

      <div class="flex flex-wrap items-end gap-2 mb-3">
        <label class="text-[11px] text-gray-500 dark:text-gray-400">Horizontal (x) axis
          <select v-model="axisX" :disabled="readOnly || state.axes.ok" class="input-field block text-xs py-1 mt-0.5"><option :value="null">Choose...</option><option v-for="q in AXIS_OPTIONS" :key="q.key" :value="q.key">{{ q.label }}</option></select>
        </label>
        <label class="text-[11px] text-gray-500 dark:text-gray-400">Vertical (y) axis
          <select v-model="axisY" :disabled="readOnly || state.axes.ok" class="input-field block text-xs py-1 mt-0.5"><option :value="null">Choose...</option><option v-for="q in AXIS_OPTIONS" :key="q.key" :value="q.key">{{ q.label }}</option></select>
        </label>
        <button v-if="!state.axes.ok" type="button" :disabled="readOnly" @click="setAxes" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">Set axes</button>
        <span v-else class="text-xs font-semibold text-emerald-700 dark:text-emerald-400">✓ Axes set: I (y) against V (x)</span>
      </div>
      <p v-if="axisMessage" class="mb-3 text-xs font-medium text-red-600 dark:text-red-400">{{ axisMessage }}</p>

      <template v-if="state.axes.ok">
        <div class="flex flex-wrap gap-1.5 mb-2">
          <button v-for="m in MODES" :key="m.key" type="button" :disabled="readOnly" @click="mode = m.key"
            class="px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors disabled:opacity-50"
            :class="mode === m.key ? 'bg-indigo-600 text-white shadow-sm' : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'">{{ m.label }}</button>
        </div>
        <p class="text-[11px] text-gray-500 dark:text-gray-400 mb-2">{{ modeHelp }}</p>

        <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div class="xl:col-span-2">
            <svg
              ref="svgEl"
              :viewBox="`0 0 ${GW} ${GH}`"
              class="w-full h-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white touch-none"
              :class="readOnly ? '' : 'cursor-crosshair'"
              @pointerdown="onGraphDown"
              @pointermove="onGraphMove"
              @pointerup="onGraphUp"
              @pointerleave="onGraphUp"
            >
              <!-- graph paper -->
              <line v-for="g in grid.minorX" :key="'mx' + g" :x1="sx(g)" :x2="sx(g)" :y1="PT" :y2="PB" stroke="#fecaca" stroke-width="0.5" />
              <line v-for="g in grid.minorY" :key="'my' + g" :y1="sy(g)" :y2="sy(g)" :x1="PL" :x2="PR" stroke="#fecaca" stroke-width="0.5" />
              <line v-for="g in grid.majorX" :key="'Mx' + g" :x1="sx(g)" :x2="sx(g)" :y1="PT" :y2="PB" stroke="#f87171" stroke-width="0.9" />
              <line v-for="g in grid.majorY" :key="'My' + g" :y1="sy(g)" :y2="sy(g)" :x1="PL" :x2="PR" stroke="#f87171" stroke-width="0.9" />
              <!-- axes and scales -->
              <line :x1="PL" :x2="PR" :y1="PB" :y2="PB" stroke="#0f172a" stroke-width="1.6" />
              <line :x1="PL" :x2="PL" :y1="PT" :y2="PB" stroke="#0f172a" stroke-width="1.6" />
              <text v-for="g in grid.majorX" :key="'lx' + g" :x="sx(g)" :y="PB + 15" text-anchor="middle" font-size="11" fill="#0f172a">{{ fmt(g) }}</text>
              <text v-for="g in grid.majorY" :key="'ly' + g" :x="PL - 6" :y="sy(g) + 4" text-anchor="end" font-size="11" fill="#0f172a">{{ fmt(g) }}</text>
              <text :x="(PL + PR) / 2" :y="GH - 6" text-anchor="middle" font-size="12" font-weight="700" fill="#0f172a">Voltage, V (V)</text>
              <text :x="14" :y="(PT + PB) / 2" text-anchor="middle" font-size="12" font-weight="700" fill="#0f172a" :transform="`rotate(-90 14 ${(PT + PB) / 2})`">Current, I (A)</text>

              <!-- best-fit line, clipped to the paper -->
              <line v-if="lineSegment" :x1="sx(lineSegment[0].V)" :y1="sy(lineSegment[0].I)" :x2="sx(lineSegment[1].V)" :y2="sy(lineSegment[1].I)" stroke="#2563eb" stroke-width="1.6" />
              <!-- gradient triangle -->
              <template v-if="state.picks.length === 2">
                <line :x1="sx(state.picks[0].V)" :y1="sy(state.picks[0].I)" :x2="sx(state.picks[1].V)" :y2="sy(state.picks[0].I)" stroke="#059669" stroke-width="1.3" stroke-dasharray="5 3" />
                <line :x1="sx(state.picks[1].V)" :y1="sy(state.picks[0].I)" :x2="sx(state.picks[1].V)" :y2="sy(state.picks[1].I)" stroke="#059669" stroke-width="1.3" stroke-dasharray="5 3" />
                <text :x="(sx(state.picks[0].V) + sx(state.picks[1].V)) / 2" :y="sy(state.picks[0].I) + 14" text-anchor="middle" font-size="11" font-weight="700" fill="#059669">&Delta;V</text>
                <text :x="sx(state.picks[1].V) + 6" :y="(sy(state.picks[0].I) + sy(state.picks[1].I)) / 2" font-size="11" font-weight="700" fill="#059669">&Delta;I</text>
              </template>
              <circle v-for="(p, i) in state.picks" :key="'pk' + i" :cx="sx(p.V)" :cy="sy(p.I)" r="4.5" fill="#059669" />
              <text v-for="(p, i) in state.picks" :key="'pkl' + i" :x="sx(p.V) - 8" :y="sy(p.I) - 8" font-size="11" font-weight="700" fill="#059669">P{{ i + 1 }}</text>
              <!-- line handles -->
              <template v-if="mode === 'line'">
                <circle v-for="h in lineHandles" :key="h.which" :cx="sx(h.p.V)" :cy="sy(h.p.I)" r="6" fill="#ffffff" stroke="#2563eb" stroke-width="2" class="cursor-move" />
              </template>
              <!-- plotted points as small crosses -->
              <g v-for="(p, i) in state.points" :key="'pt' + i" stroke="#0f172a" stroke-width="1.6">
                <line :x1="sx(p.V) - 4" :y1="sy(p.I) - 4" :x2="sx(p.V) + 4" :y2="sy(p.I) + 4" />
                <line :x1="sx(p.V) - 4" :y1="sy(p.I) + 4" :x2="sx(p.V) + 4" :y2="sy(p.I) - 4" />
              </g>
              <text v-if="cursor" :x="PR - 4" :y="PT + 12" text-anchor="end" font-size="10" fill="#64748b">V = {{ cursor.V.toFixed(3) }} V, I = {{ cursor.I.toFixed(3) }} A</text>
            </svg>
          </div>

          <div class="space-y-3">
            <div class="rounded-xl bg-gray-50 dark:bg-gray-900/40 p-3">
              <p class="text-[11px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5">Plotting checklist</p>
              <ul class="space-y-0.5 text-xs">
                <li v-for="c in plotChecklist" :key="c.key" class="flex justify-between gap-2" :class="c.plotted ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'">
                  <span>x = {{ c.key }} m <span class="text-gray-400">({{ c.label }})</span></span><span class="font-bold">{{ c.plotted ? '✓' : '○' }}</span>
                </li>
              </ul>
              <form v-if="!readOnly" class="mt-2 flex items-end gap-1.5" @submit.prevent="plotTyped">
                <label class="text-[10px] text-gray-500">V (V)<input v-model="typedPV" type="number" step="any" class="input-field w-16 text-xs py-1 block"></label>
                <label class="text-[10px] text-gray-500">I (A)<input v-model="typedPI" type="number" step="any" class="input-field w-16 text-xs py-1 block"></label>
                <button type="submit" class="px-2 py-1.5 text-[11px] font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Plot</button>
              </form>
              <p class="text-[10px] text-gray-400 mt-1">Or click on the graph paper. Click a cross again (in Plot mode) to remove it.</p>
            </div>

            <div class="rounded-xl bg-gray-50 dark:bg-gray-900/40 p-3 space-y-2">
              <p class="text-[11px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500">Line of best fit</p>
              <div class="flex flex-wrap gap-1.5">
                <button type="button" :disabled="readOnly || !hasLine" @click="checkLine" class="px-2.5 py-1.5 text-[11px] font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">Check my line</button>
                <button type="button" :disabled="readOnly || state.points.length < 2" @click="generateLine" class="px-2.5 py-1.5 text-[11px] font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 disabled:opacity-50">Generate line</button>
              </div>
              <p v-if="lineFeedback" class="text-xs" :class="lineFeedback.ok ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'">{{ lineFeedback.text }}</p>
              <p v-if="state.line.generated" class="text-[10px] text-gray-400">Generated by the computer - drawing it yourself earns the full marks for the line.</p>
            </div>
          </div>
        </div>
      </template>
    </section>

    <!-- 3. Gradient -->
    <section v-if="state.axes.ok" class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
      <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-1">3. Gradient of the graph</h3>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Use <strong>Select two points</strong> and click two points on your line of best fit, far apart. Then choose the formula and work out the gradient.</p>
      <div v-if="state.picks.length === 2" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="text-sm space-y-1 text-gray-700 dark:text-gray-200">
          <p>P<sub>1</sub>: V<sub>1</sub> = <strong>{{ f3(state.picks[0].V) }}</strong> V, I<sub>1</sub> = <strong>{{ f3(state.picks[0].I) }}</strong> A</p>
          <p>P<sub>2</sub>: V<sub>2</sub> = <strong>{{ f3(state.picks[1].V) }}</strong> V, I<sub>2</sub> = <strong>{{ f3(state.picks[1].I) }}</strong> A</p>
          <p v-if="picksTooClose" class="text-xs text-amber-700 dark:text-amber-400">These points are close together. Choosing points far apart (a large triangle) gives a more accurate gradient.</p>
          <div class="pt-2">
            <p class="text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1">Formula for the gradient s of this graph:</p>
            <label class="flex items-center gap-2 text-sm"><input v-model="state.formula" type="radio" value="dI/dV" :disabled="readOnly || state.gradientOk"> s = &Delta;I / &Delta;V = (I<sub>2</sub> &minus; I<sub>1</sub>) / (V<sub>2</sub> &minus; V<sub>1</sub>)</label>
            <label class="flex items-center gap-2 text-sm"><input v-model="state.formula" type="radio" value="dV/dI" :disabled="readOnly || state.gradientOk"> s = &Delta;V / &Delta;I = (V<sub>2</sub> &minus; V<sub>1</sub>) / (I<sub>2</sub> &minus; I<sub>1</sub>)</label>
          </div>
        </div>
        <div>
          <form class="flex items-center gap-2" @submit.prevent="checkGradient">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-200">Gradient s =</label>
            <input v-model="state.gradientInput" type="number" step="any" :disabled="readOnly || state.gradientOk" class="input-field w-28 text-sm py-1">
            <span class="text-sm text-gray-500">A/V</span>
            <button v-if="!state.gradientOk" type="submit" :disabled="readOnly" class="ml-auto px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">Check</button>
          </form>
          <p v-if="gradientFeedback" class="mt-2 text-xs" :class="state.gradientOk ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'">{{ gradientFeedback }}</p>
          <div v-if="state.gradientChecks > 0" class="mt-2 rounded-lg bg-gray-50 dark:bg-gray-900/40 p-2.5 text-xs text-gray-600 dark:text-gray-300">
            Automatic calculation: s = (I<sub>2</sub> &minus; I<sub>1</sub>) / (V<sub>2</sub> &minus; V<sub>1</sub>) = ({{ f3(state.picks[1].I) }} &minus; {{ f3(state.picks[0].I) }}) / ({{ f3(state.picks[1].V) }} &minus; {{ f3(state.picks[0].V) }}) = <strong>{{ f3(autoGradient!) }} A/V</strong>
          </div>
        </div>
      </div>
      <p v-else class="text-xs text-gray-400">{{ hasLine ? 'Select two points on your line.' : 'Draw your line of best fit first.' }}</p>
    </section>

    <!-- 4. Resistance -->
    <section v-if="state.gradientOk" class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
      <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">4. Resistance of the filament</h3>
      <div class="rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 p-3 text-sm text-indigo-900 dark:text-indigo-100 mb-3">
        <p>From V = IR, the current is <strong>I = (1/R) V</strong>. So on a graph of I against V the gradient is</p>
        <p class="text-center my-1.5 font-semibold">s = &Delta;I / &Delta;V = 1 / R &nbsp;&nbsp;&rArr;&nbsp;&nbsp; R = 1 / s</p>
        <p class="text-xs">(If you had plotted V against I instead, the gradient &Delta;V/&Delta;I would be R itself - but this practical's graph is I against V.)</p>
      </div>
      <form class="flex flex-wrap items-center gap-2" @submit.prevent="checkResistance">
        <label class="text-sm font-semibold text-gray-700 dark:text-gray-200">R = 1 / s =</label>
        <input v-model="state.resistanceInput" type="number" step="any" :disabled="readOnly || state.resistanceOk" class="input-field w-28 text-sm py-1">
        <span class="text-sm text-gray-500">&Omega;</span>
        <button v-if="!state.resistanceOk" type="submit" :disabled="readOnly" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">Check</button>
      </form>
      <p v-if="resistanceFeedback" class="mt-2 text-xs" :class="state.resistanceOk ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'">{{ resistanceFeedback }}</p>
      <div v-if="state.resistanceOk" class="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-xl">
        <div class="rounded-xl bg-gray-50 dark:bg-gray-900/40 p-2.5"><p class="text-[10px] uppercase font-bold text-gray-400">Gradient</p><p class="text-base font-bold text-gray-900 dark:text-white">{{ f3(studentGradient) }} A/V</p></div>
        <div class="rounded-xl bg-gray-50 dark:bg-gray-900/40 p-2.5"><p class="text-[10px] uppercase font-bold text-gray-400">Resistance R</p><p class="text-base font-bold text-gray-900 dark:text-white">{{ f2(studentR) }} &Omega;</p></div>
        <div class="rounded-xl bg-gray-50 dark:bg-gray-900/40 p-2.5"><p class="text-[10px] uppercase font-bold text-gray-400">Hypothesis</p><p class="text-base font-bold text-gray-900 dark:text-white">&asymp; 1 &Omega;</p></div>
      </div>
    </section>

    <!-- 5. Conclusion -->
    <section v-if="state.resistanceOk" class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
      <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-1">5. Conclusion</h3>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">State the resistance you found (with its unit) and compare it with the hypothesis of about 1 &Omega;. Does your result support the technician's suspicion about the new bulbs?</p>
      <textarea
        :value="conclusion"
        @input="emit('update:conclusion', ($event.target as HTMLTextAreaElement).value)"
        :disabled="readOnly"
        rows="3"
        class="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-xl px-3.5 py-2.5 dark:bg-gray-700 dark:text-white disabled:opacity-70 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="The resistance of the torch-bulb filament was approximately ___ Ω. Compared with the hypothesised value of about 1 Ω, ..."
      ></textarea>
    </section>

    <!-- 6. Assessment and final results -->
    <section class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
        <h3 class="text-sm font-bold text-gray-900 dark:text-white">6. Assessment and final results</h3>
        <button type="button" :disabled="readOnly || !!assessBlocker" @click="runAssessment" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50">{{ state.assessment ? 'Re-mark my practical' : 'Mark my practical' }}</button>
      </div>
      <p v-if="assessBlocker && !state.assessment" class="text-xs text-gray-500 dark:text-gray-400">{{ assessBlocker }}</p>
      <template v-if="state.assessment">
        <div class="flex flex-wrap items-center gap-3 mb-3">
          <div class="rounded-xl bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2.5">
            <p class="text-2xl font-extrabold text-indigo-700 dark:text-indigo-300 leading-none">{{ state.assessment.total }}<span class="text-sm font-medium text-indigo-400"> / {{ state.assessment.max }}</span></p>
            <p class="text-[11px] text-indigo-600 dark:text-indigo-300 mt-0.5">{{ Math.round((state.assessment.total / state.assessment.max) * 100) }}% - {{ gradeWord(state.assessment.total / state.assessment.max) }}</p>
          </div>
          <div class="text-xs text-gray-600 dark:text-gray-300 space-y-0.5">
            <p>Resistance of the filament: <strong>{{ f2(studentR) }} &Omega;</strong> (gradient {{ f3(studentGradient) }} A/V)</p>
            <p>Hypothesis &asymp; 1 &Omega; - your value is <strong>{{ hypothesisDiff }}</strong>.</p>
            <p v-if="trueR">Value from the meters' true readings: {{ f2(trueR) }} &Omega; - yours is within {{ Math.round(Math.abs(studentR - trueR) / trueR * 100) }}%.</p>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-xs border-collapse">
            <thead><tr class="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700"><th class="py-1.5 pr-2 font-semibold">Criterion</th><th class="py-1.5 pr-2 font-semibold whitespace-nowrap">Marks</th><th class="py-1.5 font-semibold">Feedback</th></tr></thead>
            <tbody>
              <tr v-for="item in state.assessment.items" :key="item.key" class="border-b border-gray-100 dark:border-gray-700/60 align-top">
                <td class="py-1.5 pr-2 text-gray-700 dark:text-gray-200">{{ item.label }}</td>
                <td class="py-1.5 pr-2 tabular-nums font-semibold whitespace-nowrap" :class="item.score >= item.max ? 'text-emerald-700 dark:text-emerald-400' : item.score > 0 ? 'text-amber-700 dark:text-amber-400' : 'text-red-600 dark:text-red-400'">{{ item.score }} / {{ item.max }}</td>
                <td class="py-1.5 text-gray-600 dark:text-gray-300">{{ item.feedback }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onBeforeUnmount } from 'vue'
import { linearRegression } from '@/utils/linearRegression'
import { BULB_TARGET_LENGTHS, type BulbTrial, type BulbLabRecord } from './bulbCircuitEngine'
import type { NotebookEntry } from '@/types/virtualLab'

interface Pt { V: number; I: number }
interface AssessmentItem { key: string; label: string; score: number; max: number; feedback: string }
interface AnalysisState {
  axes: { x: string | null; y: string | null; attempts: number; ok: boolean }
  points: Pt[]
  line: { a: Pt | null; b: Pt | null; generated: boolean; checks: number }
  picks: Pt[]
  formula: 'dI/dV' | 'dV/dI' | null
  wrongFormula: number
  gradientInput: string
  gradientChecks: number
  gradientOk: boolean
  resistanceInput: string
  resistanceChecks: number
  resistanceOk: boolean
  errors: string[]
  precautions: Record<string, string | undefined>
  assessment: { total: number; max: number; items: AssessmentItem[] } | null
}

const props = defineProps<{
  rows: NotebookEntry[]
  snapshots: NotebookEntry[]
  labRecord: BulbLabRecord | null
  analysis: NotebookEntry | null
  conclusion: string
  readOnly?: boolean
}>()

const emit = defineEmits<{
  'save-row': [row: { x_m: number; current_a: number; voltage_v: number; replaceId: number | null }]
  'save-analysis': [payload: { extra: AnalysisState & { summary: Record<string, unknown> }; replaceId: number | null }]
  'update:conclusion': [text: string]
  blocker: [message: string | null]
}>()

const f2 = (n: number) => (Number.isFinite(n) ? n.toFixed(2) : '-')
const f3 = (n: number) => (Number.isFinite(n) ? n.toFixed(3) : '-')
const fmt = (n: number) => String(Math.round(n * 1000) / 1000)
const keyOf = (x: number) => x.toFixed(3)

// --- State ------------------------------------------------------------------------------------------
const blank = (): AnalysisState => ({
  axes: { x: null, y: null, attempts: 0, ok: false }, points: [], line: { a: null, b: null, generated: false, checks: 0 }, picks: [],
  formula: null, wrongFormula: 0, gradientInput: '', gradientChecks: 0, gradientOk: false,
  resistanceInput: '', resistanceChecks: 0, resistanceOk: false, errors: [], precautions: {}, assessment: null,
})
const state = reactive<AnalysisState>(blank())
let loadedFromId: number | null = null
let initialised = false
// Restore once from the saved notebook entry; after that this component owns the state
watch(() => props.analysis, (entry) => {
  if (initialised) return
  initialised = true
  if (entry?.extra) {
    const { summary: _summary, ...saved } = entry.extra as AnalysisState & { summary?: unknown }
    Object.assign(state, blank(), saved)
    loadedFromId = entry.id
    axisX.value = state.axes.x
    axisY.value = state.axes.y
  }
}, { immediate: true })
watch(() => props.analysis?.id, (id) => { if (id) loadedFromId = id })

// --- Results table ----------------------------------------------------------------------------------
const rowFor = (key: string) => props.rows.find(r => r.extra && keyOf(Number(r.extra.x_m)) === key) ?? null
const tableRows = computed(() => BULB_TARGET_LENGTHS.map(x => ({ key: keyOf(x), entry: rowFor(keyOf(x)) })))
const edits = reactive<Record<string, { i: string; v: string }>>({})
BULB_TARGET_LENGTHS.forEach((x) => { edits[keyOf(x)] = { i: '', v: '' } })
// Fill the editable cells from the saved rows, without overwriting what the student is typing
watch(() => props.rows.map(r => `${r.id}:${JSON.stringify(r.extra)}`).join('|'), () => {
  BULB_TARGET_LENGTHS.forEach((x) => {
    const k = keyOf(x)
    const r = rowFor(k)
    if (!r?.extra) return
    if (edits[k].i === '') edits[k].i = String(r.extra.current_a)
    if (edits[k].v === '') edits[k].v = String(r.extra.voltage_v)
  })
}, { immediate: true })

const tableMessage = ref<string | null>(null)
const tableValues = computed(() => BULB_TARGET_LENGTHS.map((x) => {
  const e = edits[keyOf(x)]
  const I = e.i === '' ? NaN : Number(e.i)
  const V = e.v === '' ? NaN : Number(e.v)
  return { x, key: keyOf(x), I, V, complete: Number.isFinite(I) && Number.isFinite(V) }
}))
const tableComplete = computed(() => tableValues.value.every(r => r.complete))

function saveRow(key: string) {
  if (props.readOnly) return
  const e = edits[key]
  const existing = rowFor(key)
  if ((e.i === '') !== (e.v === '')) { tableMessage.value = 'Record both the ammeter and voltmeter readings before proceeding.'; return }
  if (e.i === '' && e.v === '') return
  const I = Number(e.i), V = Number(e.v)
  if (!Number.isFinite(I) || !Number.isFinite(V)) return
  if (I > 1 || V > 3) { tableMessage.value = `Check the x = ${key} m row: the ammeter only reads up to 1 A and the voltmeter up to 3 V.`; return }
  tableMessage.value = null
  if (existing?.extra && Number(existing.extra.current_a) === I && Number(existing.extra.voltage_v) === V) return
  emit('save-row', { x_m: Number(key), current_a: I, voltage_v: V, replaceId: existing?.id ?? null })
}

// --- Axes ---------------------------------------------------------------------------------------------
const AXIS_OPTIONS = [
  { key: 'voltage', label: 'Voltage, V (V)' },
  { key: 'current', label: 'Current, I (A)' },
  { key: 'length', label: 'Length, x (m)' },
]
const axisX = ref<string | null>(null)
const axisY = ref<string | null>(null)
const axisMessage = ref<string | null>(null)
function setAxes() {
  if (!axisX.value || !axisY.value) { axisMessage.value = 'Choose a quantity for both axes.'; return }
  state.axes.x = axisX.value
  state.axes.y = axisY.value
  if (axisX.value === 'voltage' && axisY.value === 'current') {
    state.axes.ok = true
    axisMessage.value = null
  } else {
    state.axes.attempts++
    axisMessage.value = 'Check that voltage is on the X-axis and current is on the Y-axis.'
  }
}

// --- Graph paper geometry -----------------------------------------------------------------------------
const GW = 560, GH = 420
const PL = 62, PR = 540, PT = 16, PB = 376
function niceStep(max: number) {
  for (const s of [0.05, 0.1, 0.2, 0.25, 0.5, 1]) if (max / s <= 8) return s
  return 1
}
const dataMax = computed(() => {
  const vs = [...tableValues.value.filter(r => r.complete).map(r => r.V), ...state.points.map(p => p.V)]
  const is = [...tableValues.value.filter(r => r.complete).map(r => r.I), ...state.points.map(p => p.I)]
  return { V: Math.max(0.5, ...vs), I: Math.max(0.5, ...is) }
})
const scale = computed(() => {
  const stepX = niceStep(dataMax.value.V * 1.05)
  const stepY = niceStep(dataMax.value.I * 1.05)
  return { stepX, stepY, maxX: Math.ceil((dataMax.value.V * 1.05) / stepX) * stepX, maxY: Math.ceil((dataMax.value.I * 1.05) / stepY) * stepY }
})
const range = (max: number, step: number) => Array.from({ length: Math.round(max / step) + 1 }, (_, i) => Math.round(i * step * 10000) / 10000)
const grid = computed(() => ({
  majorX: range(scale.value.maxX, scale.value.stepX),
  majorY: range(scale.value.maxY, scale.value.stepY),
  minorX: range(scale.value.maxX, scale.value.stepX / 5),
  minorY: range(scale.value.maxY, scale.value.stepY / 5),
}))
const sx = (V: number) => PL + (V / scale.value.maxX) * (PR - PL)
const sy = (I: number) => PB - (I / scale.value.maxY) * (PB - PT)
const halfMinor = computed(() => ({ V: scale.value.stepX / 10, I: scale.value.stepY / 10 }))

const svgEl = ref<SVGSVGElement | null>(null)
function toData(ev: PointerEvent): Pt | null {
  const svg = svgEl.value
  if (!svg) return null
  const ctm = svg.getScreenCTM()
  if (!ctm) return null
  const p = new DOMPoint(ev.clientX, ev.clientY).matrixTransform(ctm.inverse())
  if (p.x < PL - 4 || p.x > PR + 4 || p.y < PT - 4 || p.y > PB + 4) return null
  return {
    V: Math.round(Math.max(0, ((p.x - PL) / (PR - PL)) * scale.value.maxX) * 1000) / 1000,
    I: Math.round(Math.max(0, ((PB - p.y) / (PB - PT)) * scale.value.maxY) * 1000) / 1000,
  }
}
const pxDist = (a: Pt, b: Pt) => Math.hypot(sx(a.V) - sx(b.V), sy(a.I) - sy(b.I))

// --- Modes: plotting, drawing the line, picking points --------------------------------------------------
type Mode = 'plot' | 'line' | 'pick'
const MODES: { key: Mode; label: string }[] = [
  { key: 'plot', label: 'Plot points' },
  { key: 'line', label: 'Draw best-fit line' },
  { key: 'pick', label: 'Select two points' },
]
const mode = ref<Mode>('plot')
const modeHelp = computed(() => ({
  plot: 'Click the graph paper where each (V, I) point belongs and a cross is plotted there. Plot all five readings.',
  line: 'Click two places to set the ends of your straight line, then drag the round handles until the points are balanced either side of it.',
  pick: 'Click two points on your line, far apart. They snap onto the line.',
}[mode.value]))
const cursor = ref<Pt | null>(null)
let dragging: 'a' | 'b' | null = null

const hasLine = computed(() => !!state.line.a && !!state.line.b && pxDist(state.line.a, state.line.b) > 4)
const lineHandles = computed(() => [state.line.a ? { which: 'a', p: state.line.a } : null, state.line.b ? { which: 'b', p: state.line.b } : null].filter(Boolean) as { which: 'a' | 'b'; p: Pt }[])
const lineSlope = computed(() => (hasLine.value && state.line.a!.V !== state.line.b!.V ? (state.line.b!.I - state.line.a!.I) / (state.line.b!.V - state.line.a!.V) : null))
const lineAt = (V: number) => state.line.a!.I + lineSlope.value! * (V - state.line.a!.V)
/** The drawn line extended across the whole sheet of graph paper. */
const lineSegment = computed<[Pt, Pt] | null>(() => {
  if (!hasLine.value) return null
  if (lineSlope.value === null) return [{ V: state.line.a!.V, I: 0 }, { V: state.line.a!.V, I: scale.value.maxY }]
  const pts: Pt[] = []
  const add = (p: Pt) => { if (p.V >= -1e-9 && p.V <= scale.value.maxX + 1e-9 && p.I >= -1e-9 && p.I <= scale.value.maxY + 1e-9) pts.push(p) }
  add({ V: 0, I: lineAt(0) })
  add({ V: scale.value.maxX, I: lineAt(scale.value.maxX) })
  if (lineSlope.value !== 0) {
    add({ V: state.line.a!.V + (0 - state.line.a!.I) / lineSlope.value, I: 0 })
    add({ V: state.line.a!.V + (scale.value.maxY - state.line.a!.I) / lineSlope.value, I: scale.value.maxY })
  }
  if (pts.length < 2) return null
  pts.sort((p, q) => p.V - q.V)
  return [pts[0], pts[pts.length - 1]]
})

function onGraphDown(ev: PointerEvent) {
  if (props.readOnly) return
  const p = toData(ev)
  if (!p) return
  if (mode.value === 'plot') {
    const near = state.points.findIndex(q => pxDist(q, p) < 7)
    if (near >= 0) state.points.splice(near, 1)
    else if (state.points.length < 8) state.points.push(p)
    resetDownstream('points')
  } else if (mode.value === 'line') {
    const handle = lineHandles.value.find(h => pxDist(h.p, p) < 10)
    if (handle) { dragging = handle.which; (ev.target as Element).setPointerCapture?.(ev.pointerId); return }
    if (!state.line.a || (state.line.a && state.line.b)) { state.line.a = p; state.line.b = null } else state.line.b = p
    state.line.generated = false
    resetDownstream('line')
  } else if (mode.value === 'pick') {
    if (!hasLine.value) return
    const onLine = projectOntoLine(p)
    if (state.picks.length >= 2) state.picks.splice(0, state.picks.length)
    state.picks.push(onLine)
    state.picks.sort((a, b) => a.V - b.V)
    resetDownstream('picks')
  }
}
function onGraphMove(ev: PointerEvent) {
  const p = toData(ev)
  cursor.value = p
  if (!dragging || !p) return
  state.line[dragging] = p
  state.line.generated = false
}
function onGraphUp() {
  if (dragging) resetDownstream('line')
  dragging = null
}
function projectOntoLine(p: Pt): Pt {
  const a = state.line.a!, b = state.line.b!
  // Project in screen space so "nearest point on the line" matches what the student sees
  const ax = sx(a.V), ay = sy(a.I), bx = sx(b.V), by = sy(b.I), px = sx(p.V), py = sy(p.I)
  const t = ((px - ax) * (bx - ax) + (py - ay) * (by - ay)) / ((bx - ax) ** 2 + (by - ay) ** 2)
  const V = a.V + t * (b.V - a.V)
  const I = a.I + t * (b.I - a.I)
  return { V: Math.round(V * 1000) / 1000, I: Math.round(I * 1000) / 1000 }
}
/** Changing the graph invalidates the work built on top of it. */
function resetDownstream(from: 'points' | 'line' | 'picks') {
  lineFeedback.value = null
  if (from === 'points' || from === 'line') state.picks.splice(0, state.picks.length)
  state.gradientOk = false
  state.resistanceOk = false
  gradientFeedback.value = null
  resistanceFeedback.value = null
}

const typedPV = ref('')
const typedPI = ref('')
function plotTyped() {
  const V = Number(typedPV.value), I = Number(typedPI.value)
  if (!Number.isFinite(V) || !Number.isFinite(I) || typedPV.value === '' || typedPI.value === '') return
  if (state.points.length >= 8) return
  state.points.push({ V: Math.round(V * 1000) / 1000, I: Math.round(I * 1000) / 1000 })
  typedPV.value = ''
  typedPI.value = ''
  resetDownstream('points')
}

/** Which table rows have a cross plotted within half a small square of where they belong. */
const plotMatches = computed(() => tableValues.value.map((r) => {
  if (!r.complete) return { key: r.key, plotted: false, label: 'no reading' }
  const hit = state.points.some(p => Math.abs(p.V - r.V) <= halfMinor.value.V + 1e-9 && Math.abs(p.I - r.I) <= halfMinor.value.I + 1e-9)
  return { key: r.key, plotted: hit, label: `V ${r.V}, I ${r.I}` }
}))
const plotChecklist = computed(() => plotMatches.value)

// --- Line of best fit -----------------------------------------------------------------------------------
const fitOfPoints = computed(() => linearRegression(state.points.map(p => ({ x: p.V, y: p.I }))))
const lineFeedback = ref<{ ok: boolean; text: string } | null>(null)
function lineQuality(): { ratio: number; balance: number; mean: number } | null {
  if (!hasLine.value || lineSlope.value === null || !fitOfPoints.value || state.points.length < 2) return null
  const residuals = state.points.map(p => p.I - lineAt(p.V))
  const above = residuals.filter(r => r > halfMinor.value.I / 2).length
  const below = residuals.filter(r => r < -halfMinor.value.I / 2).length
  return { ratio: lineSlope.value / fitOfPoints.value.slope, balance: Math.abs(above - below), mean: residuals.reduce((s, r) => s + r, 0) / residuals.length }
}
function checkLine() {
  state.line.checks++
  const q = lineQuality()
  if (!q) { lineFeedback.value = { ok: false, text: 'Plot your points and draw a straight line first.' }; return }
  if (Math.abs(q.ratio - 1) <= 0.08 && Math.abs(q.mean) <= halfMinor.value.I * 2) {
    lineFeedback.value = { ok: true, text: 'Good line of best fit - the points are spread evenly either side of it.' }
  } else if (q.ratio > 1.08) {
    lineFeedback.value = { ok: false, text: 'Your line is steeper than the trend of the points. Rotate it so the points are balanced either side.' }
  } else if (q.ratio < 0.92) {
    lineFeedback.value = { ok: false, text: 'Your line is less steep than the trend of the points. Rotate it so the points are balanced either side.' }
  } else {
    lineFeedback.value = { ok: false, text: q.mean > 0 ? 'Most points lie above your line - move it up a little.' : 'Most points lie below your line - move it down a little.' }
  }
}
function generateLine() {
  const fit = fitOfPoints.value
  if (!fit) return
  const vs = state.points.map(p => p.V)
  const lo = Math.min(...vs), hi = Math.max(...vs)
  state.line.a = { V: lo, I: fit.intercept + fit.slope * lo }
  state.line.b = { V: hi, I: fit.intercept + fit.slope * hi }
  state.line.generated = true
  resetDownstream('line')
  lineFeedback.value = { ok: true, text: 'Least-squares line of best fit drawn through your points.' }
}

// --- Gradient and resistance ------------------------------------------------------------------------------
const autoGradient = computed(() => {
  if (state.picks.length !== 2) return null
  const [p1, p2] = state.picks
  return p2.V === p1.V ? null : (p2.I - p1.I) / (p2.V - p1.V)
})
const picksTooClose = computed(() => {
  if (state.picks.length !== 2) return false
  const vs = state.points.map(p => p.V)
  const span = vs.length ? Math.max(...vs) - Math.min(...vs) : 0
  return Math.abs(state.picks[1].V - state.picks[0].V) < Math.max(0.05, span * 0.5)
})
const gradientFeedback = ref<string | null>(null)
const resistanceFeedback = ref<string | null>(null)
const FORMULA_MSG = 'Since the graph is I against V, gradient = ΔI/ΔV. Resistance R = 1/gradient.'
const close = (a: number, b: number, rel: number, abs: number) => Math.abs(a - b) <= Math.max(abs, Math.abs(b) * rel)

function checkGradient() {
  const s = autoGradient.value
  if (s === null) return
  if (!state.formula) { gradientFeedback.value = 'Choose the formula for the gradient first.'; return }
  const typed = Number(state.gradientInput)
  if (state.gradientInput === '' || !Number.isFinite(typed)) { gradientFeedback.value = 'Enter your value for the gradient.'; return }
  state.gradientChecks++
  if (state.formula === 'dV/dI' || (s !== 0 && close(typed, 1 / s, 0.02, 0.005) && !close(typed, s, 0.02, 0.005))) {
    state.wrongFormula++
    gradientFeedback.value = FORMULA_MSG
    return
  }
  if (close(typed, s, 0.02, 0.005)) {
    state.gradientOk = true
    gradientFeedback.value = `Correct - the gradient is ${f3(s)} A/V.`
  } else {
    gradientFeedback.value = `Not quite. Work out ΔI = I₂ − I₁ and ΔV = V₂ − V₁ from your two points, then divide ΔI by ΔV.`
  }
}
const studentGradient = computed(() => Number(state.gradientInput))
const studentR = computed(() => Number(state.resistanceInput))
function checkResistance() {
  const typed = Number(state.resistanceInput)
  if (state.resistanceInput === '' || !Number.isFinite(typed)) { resistanceFeedback.value = 'Enter your value for R.'; return }
  state.resistanceChecks++
  const expected = 1 / studentGradient.value
  if (close(typed, expected, 0.02, 0.01)) {
    state.resistanceOk = true
    resistanceFeedback.value = `Correct - R = 1 / ${f3(studentGradient.value)} = ${f2(expected)} Ω.`
  } else if (close(typed, studentGradient.value, 0.02, 0.005)) {
    resistanceFeedback.value = 'That is the gradient itself. For an I against V graph, R = 1 / gradient.'
  } else {
    resistanceFeedback.value = `Not quite. R = 1 / s = 1 / ${f3(studentGradient.value)}.`
  }
}
const hypothesisDiff = computed(() => {
  const d = ((studentR.value - 1) / 1) * 100
  if (Math.abs(d) < 5) return 'very close to it'
  return `${Math.abs(Math.round(d))}% ${d > 0 ? 'higher' : 'lower'}`
})


// --- True value (from what the meters really showed) ---------------------------------------------------------
const trials = computed(() => props.snapshots.map(s => s.extra as BulbTrial | null).filter((t): t is BulbTrial => !!t && Number.isFinite(t.true_current_a)))
const trueR = computed(() => {
  const fit = linearRegression(trials.value.map(t => ({ x: t.true_voltage_v, y: t.true_current_a })))
  return fit && fit.slope > 0 ? 1 / fit.slope : null
})

// --- Assessment ------------------------------------------------------------------------------------------
const assessBlocker = computed<string | null>(() => {
  if (!tableComplete.value) return 'Complete all five rows of the results table first.'
  if (!state.axes.ok) return 'Set the axes of your graph (I against V).'
  if (state.points.length < 5) return 'Plot all five points on your graph.'
  if (!hasLine.value) return 'Draw your line of best fit.'
  if (!state.gradientOk) return 'Work out the gradient of your line.'
  if (!state.resistanceOk) return 'Work out the resistance from the gradient.'
  if (!props.conclusion.trim()) return 'Write your conclusion.'
  return null
})
const half = (n: number) => Math.round(n * 2) / 2
const clampScore = (n: number, max: number) => Math.max(0, Math.min(max, half(n)))
const gradeWord = (f: number) => (f >= 0.8 ? 'Excellent' : f >= 0.65 ? 'Good' : f >= 0.5 ? 'Fair' : 'Needs improvement')

function runAssessment() {
  if (assessBlocker.value) return
  const rec = props.labRecord
  const items: AssessmentItem[] = []
  const add = (key: string, label: string, max: number, score: number, feedback: string) => items.push({ key, label, max, score: clampScore(score, max), feedback })

  const dp = rec?.distractor_picks ?? 0
  add('apparatus', 'Identification of apparatus', 2, 2 - dp, dp === 0 ? 'You took exactly the apparatus the practical needs.' : `You picked up ${dp} item(s) this practical doesn't use.`)

  const wf = rec?.wiring_faults ?? 0
  add('circuit', 'Circuit connection', 2, trials.value.length ? 2 - wf : 0, wf === 0 ? 'Circuit connected correctly as in the set-up diagram.' : `K was closed ${wf} time(s) with a wiring fault - check connections before switching on.`)

  const ar = rec?.ammeter_reversed ?? 0
  add('ammeter', 'Ammeter connection', 2, 2 - ar, ar === 0 ? 'Ammeter in series with + towards the cells\' +.' : 'The ammeter was once connected the wrong way round.')
  const vr = rec?.voltmeter_reversed ?? 0
  add('voltmeter', 'Voltmeter connection', 2, 2 - vr, vr === 0 ? 'Voltmeter connected across the bulb with the right polarity.' : 'The voltmeter was once connected the wrong way round.')

  const misuse = (rec?.left_on ?? 0) + (rec?.warm_starts ?? 0) + (rec?.record_while_open ?? 0) + (rec?.length_change_while_on ?? 0) + (rec?.incomplete_pairs ?? 0)
  const misuseNotes = [
    rec?.left_on ? 'switch left on too long' : '', rec?.warm_starts ? 'closed K before the bulb cooled' : '',
    rec?.record_while_open ? 'tried to read with K open' : '', rec?.length_change_while_on ? 'tried to move the clip with K closed' : '',
    rec?.incomplete_pairs ? 'opened K before recording both readings' : '',
  ].filter(Boolean)
  add('switch', 'Use of the switch', 3, 3 - misuse, misuse === 0 ? 'K closed only to take readings and opened straight afterwards.' : `Take care: ${misuseNotes.join('; ')}.`)

  const lengthsDone = BULB_TARGET_LENGTHS.filter(x => trials.value.some(t => Math.abs(t.x_m - x) < 0.0015)).length
  add('length', 'Selection of wire length', 2, (lengthsDone / 5) * 2, lengthsDone === 5 ? 'All five lengths (0.200-0.600 m) set correctly.' : `Readings taken at ${lengthsDone} of the five required lengths.`)

  const readingOk = tableValues.value.filter((r) => {
    const t = trials.value.find(tr => Math.abs(tr.x_m - r.x) < 0.0015)
    return t && Math.abs(r.I - t.true_current_a) <= 0.021 && Math.abs(r.V - t.true_voltage_v) <= 0.051
  }).length
  add('readings', 'Accuracy of readings', 4, (readingOk / 5) * 4, readingOk === 5 ? 'Every meter reading matches what the meters showed.' : `${readingOk} of 5 rows match the meters to within one scale division.`)

  const plausible = tableValues.value.every(r => r.complete && r.I > 0 && r.I <= 1 && r.V > 0 && r.V <= 3)
  const trendOk = tableValues.value.every((r, i, a) => i === 0 || (r.I <= a[i - 1].I + 0.02 && r.V <= a[i - 1].V + 0.05))
  add('table', 'Results table', 2, (plausible ? 1 : 0) + (trendOk ? 1 : 0), plausible && trendOk ? 'Table complete, with I and V falling as x increases.' : !plausible ? 'Some values are missing or outside the meters\' ranges.' : 'Check the trend: a longer wire means less current and a smaller voltage across the bulb.')

  add('axes', 'Graph axes', 2, state.axes.attempts === 0 ? 2 : 1, state.axes.attempts === 0 ? 'V on the x-axis and I on the y-axis, with units.' : 'Axes corrected after a first attempt with the wrong orientation.')

  const plotted = plotMatches.value.filter(m => m.plotted).length
  add('plotting', 'Plotting of points', 3, (plotted / 5) * 3, plotted === 5 ? 'All five points plotted accurately.' : `${plotted} of 5 points are within half a small square of the right place.`)

  const q = lineQuality()
  let lineScore = 1
  let lineNote = 'Line drawn, but it does not follow the trend of the points well.'
  if (q && Math.abs(q.ratio - 1) <= 0.08 && Math.abs(q.mean) <= halfMinor.value.I * 2) { lineScore = 3; lineNote = 'Well-balanced line of best fit.' } else if (q && Math.abs(q.ratio - 1) <= 0.2) { lineScore = 2; lineNote = 'Line follows the trend but is not quite balanced through the points.' }
  if (state.line.generated) { lineScore = Math.min(lineScore, 2); lineNote = 'Line generated by the computer rather than drawn yourself.' }
  add('bestfit', 'Line of best fit', 3, lineScore, lineNote)

  let gScore = 3
  const gNotes: string[] = []
  if (state.wrongFormula) { gScore -= 1; gNotes.push('used ΔV/ΔI at first') }
  if (picksTooClose.value) { gScore -= 1; gNotes.push('points too close together') }
  if (state.gradientChecks > 1 + state.wrongFormula) { gScore -= 0.5; gNotes.push('needed more than one attempt') }
  add('gradient', 'Gradient', 3, gScore, gNotes.length ? `Correct in the end - ${gNotes.join('; ')}.` : 'Gradient worked out correctly from a large triangle.')

  let rScore = state.resistanceChecks <= 1 ? 3 : 2
  let rNote = state.resistanceChecks <= 1 ? 'R = 1/gradient worked out correctly first time.' : 'R = 1/gradient correct after more than one attempt.'
  if (trueR.value && Math.abs(studentR.value - trueR.value) / trueR.value > 0.15) { rScore -= 1; rNote += ' Your value is more than 15% from what the meters really showed - check your readings and line.' }
  add('resistance', 'Resistance calculation', 3, rScore, rNote)

  const text = props.conclusion
  const nums = (text.match(/\d+(?:\.\d+)?/g) || []).map(Number)
  const statesValue = nums.some(n => Number.isFinite(studentR.value) && Math.abs(n - studentR.value) <= Math.max(0.05, studentR.value * 0.1))
  const hasUnit = /Ω|ohm/i.test(text)
  const compares = /hypothes|expect|predict|compar|close to|higher|lower|greater|less|differ|agree|support|recommend|suspect|1\s*(Ω|ohm)/i.test(text)
  const missing = [statesValue ? '' : 'state the resistance you found', hasUnit ? '' : 'give its unit (Ω)', compares ? '' : 'compare it with the 1 Ω hypothesis'].filter(Boolean)
  add('conclusion', 'Conclusion', 3, 3 - missing.length, missing.length ? `Your conclusion should ${missing.join(', ')}.` : 'Clear conclusion: value, unit and comparison with the hypothesis.')


  const total = half(items.reduce((s, i) => s + i.score, 0))
  state.assessment = { total, max: items.reduce((s, i) => s + i.max, 0), items }
}

// --- Persisting and the submit gate ----------------------------------------------------------------------
const summary = computed(() => ({
  gradient_a_per_v: state.gradientOk ? studentGradient.value : null,
  resistance_ohm: state.resistanceOk ? studentR.value : null,
  true_resistance_ohm: trueR.value ? Math.round(trueR.value * 1000) / 1000 : null,
  score: state.assessment?.total ?? null,
  max_score: state.assessment?.max ?? null,
}))
// Marks belong to the work as it was marked - any later change means marking it again
watch(() => JSON.stringify({ ...state, assessment: null }) + props.conclusion + JSON.stringify(tableValues.value), () => {
  if (state.assessment) state.assessment = null
})

let saveTimer = 0
watch(() => JSON.stringify(state), () => {
  if (props.readOnly) return
  window.clearTimeout(saveTimer)
  saveTimer = window.setTimeout(() => {
    emit('save-analysis', { extra: { ...JSON.parse(JSON.stringify(state)), summary: summary.value }, replaceId: loadedFromId })
  }, 900)
})
onBeforeUnmount(() => window.clearTimeout(saveTimer))

watch(() => (state.assessment ? null : assessBlocker.value ?? 'Click "Mark my practical" to see your assessment before submitting.'), (msg) => emit('blocker', msg), { immediate: true })
</script>
