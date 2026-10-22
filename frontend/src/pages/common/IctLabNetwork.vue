<template>
  <!-- Build a network: a classroom floor plan. Drag devices from the tray to their places, tap two
       devices to run a cable between them, then test with Ping, Print and Open a website - a packet
       travels along the cables, or stops where something is wrong. Five missions; each finished one
       is saved for students (activity_key network-m1 ... network-m5). -->
  <div>
    <div class="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
      <button v-if="mission" type="button" class="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Back to the missions" @click="mission = null">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <RouterLink v-else :to="`/${role}/ict-lab`" class="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Back to the ICT Lab">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </RouterLink>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">ICT Lab · Computer networks</p>
        <h1 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight">{{ mission ? `Mission ${missionIndex + 1}: ${mission.title}` : 'Build a network' }}</h1>
      </div>
    </div>

    <!-- ===================== The missions ===================== -->
    <div v-if="!mission" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
      <button
        v-for="(m, i) in MISSIONS"
        :key="m.id"
        type="button"
        class="text-left rounded-2xl border p-4 transition-all disabled:cursor-not-allowed"
        :class="locked(i) ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 opacity-70' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-400 hover:shadow-sm'"
        :disabled="locked(i)"
        @click="open(m)"
      >
        <div class="flex items-start gap-3">
          <span class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-base font-bold" :class="bestOf(m) !== null ? 'bg-indigo-600 text-white' : locked(i) ? 'bg-gray-200 text-gray-500 dark:bg-gray-700' : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200'">
            <template v-if="bestOf(m) !== null">✓</template><template v-else>{{ i + 1 }}</template>
          </span>
          <div class="min-w-0 flex-1">
            <p class="text-base font-bold text-gray-900 dark:text-white leading-snug">{{ m.title }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-300">{{ m.short }}</p>
            <p class="mt-1.5 text-xs font-semibold" :class="bestOf(m) !== null ? 'text-emerald-600 dark:text-emerald-300' : locked(i) ? 'text-gray-400' : 'text-indigo-600 dark:text-indigo-300'">
              {{ bestOf(m) !== null ? `Done · best ${bestOf(m)}%` : locked(i) ? 'Finish the mission before' : 'Start' }}
            </p>
          </div>
        </div>
      </button>
    </div>

    <!-- ===================== A mission ===================== -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_21rem] gap-4 items-start">
      <section class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 sm:p-3">
        <!-- what to tap now -->
        <div v-if="prompt" class="mb-2 px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-2" :class="prompt.tone === 'bad' ? 'bg-rose-50 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200' : prompt.tone === 'good' ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200' : 'bg-indigo-50 text-indigo-900 dark:bg-indigo-900/30 dark:text-indigo-100'">
          <span class="flex-1">{{ prompt.text }}</span>
          <button v-if="mode !== 'idle' || selected" type="button" class="px-2 py-0.5 rounded-lg bg-white/70 dark:bg-gray-800 text-xs font-semibold" @click="cancel">Cancel</button>
        </div>

        <!-- on a phone the plan is drawn wider than the screen and scrolls sideways, so things are big enough to tap -->
        <div class="relative overflow-x-auto sm:overflow-visible -mx-2 px-2 sm:mx-0 sm:px-0">
          <svg
            ref="svg"
            :viewBox="`0 0 ${VIEW_W} ${VIEW_H}`"
            class="w-full min-w-[640px] sm:min-w-0 h-auto select-none rounded-xl bg-slate-100 dark:bg-slate-900 touch-pan-x sm:touch-none"
            @pointerdown.self="cancel"
          >
            <defs>
              <pattern id="tiles" width="40" height="40" patternUnits="userSpaceOnUse">
                <rect width="40" height="40" fill="#f8fafc" />
                <path d="M40 0H0V40" fill="none" stroke="#e2e8f0" stroke-width="1" />
              </pattern>
              <linearGradient id="screenOn" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0f5b33" /><stop offset="1" stop-color="#22c55e" /></linearGradient>
              <linearGradient id="screenLan" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1e3a8a" /><stop offset="1" stop-color="#3b82f6" /></linearGradient>
            </defs>

            <!-- the room: floor, walls, window, door -->
            <rect x="20" y="20" width="860" height="560" fill="url(#tiles)" />
            <path d="M20 20H880V580H150 M90 580H20V20" fill="none" stroke="#475569" stroke-width="10" stroke-linejoin="round" />
            <path d="M260 20H480" stroke="#93c5fd" stroke-width="10" />
            <path d="M90 580 A60 60 0 0 1 150 520" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5 4" />
            <text x="120" y="596" text-anchor="middle" font-size="12" fill="#64748b">door</text>
            <text x="370" y="12" text-anchor="middle" font-size="12" fill="#64748b">window</text>

            <!-- furniture: desks, the network cabinet -->
            <g v-for="s in SLOTS.filter(x => x.kind === 'desk')" :key="'desk-' + s.id">
              <rect :x="s.x - 62" :y="s.y - 46" width="124" height="92" rx="8" fill="#e9d5b5" stroke="#c8a97e" stroke-width="2" />
            </g>
            <rect x="690" y="110" width="110" height="380" rx="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2" />
            <text x="745" y="104" text-anchor="middle" font-size="13" font-weight="600" fill="#475569">Network cabinet</text>
            <line v-for="y in [235, 365]" :key="'shelf' + y" x1="694" :y1="y" x2="796" :y2="y" stroke="#94a3b8" stroke-width="2" />

            <!-- empty places (lit while dragging something that fits) -->
            <g v-for="s in SLOTS" :key="'slot-' + s.id">
              <rect
                v-if="!occupant(s.id) && (s.kind !== 'ceiling' || mission.id === 'm5')"
                :x="s.x - (s.kind === 'ceiling' ? 34 : 46)"
                :y="s.y - 30"
                :width="s.kind === 'ceiling' ? 68 : 92"
                height="60"
                rx="10"
                fill="none"
                :stroke="dragFits(s) ? '#15874a' : '#94a3b8'"
                :stroke-width="dragFits(s) ? 3 : 1.5"
                stroke-dasharray="6 5"
                :class="dragFits(s) ? 'slot-pulse' : ''"
              />
              <text v-if="!occupant(s.id) && (s.kind !== 'ceiling' || mission.id === 'm5')" :x="s.x" :y="s.y + 5" text-anchor="middle" font-size="11" :fill="dragFits(s) ? '#15874a' : '#94a3b8'">{{ s.kind === 'desk' ? s.label : s.kind === 'ceiling' ? 'Ceiling' : 'Shelf' }}</text>
            </g>

            <!-- the internet: outside, joined to the line in the wall -->
            <path :d="`M905 120 Q 950 100 955 62`" fill="none" stroke="#64748b" stroke-width="3" stroke-dasharray="8 6" />

            <!-- cables (a wide invisible line on each makes it easy to tap) -->
            <g v-for="c in cables" :key="c.id">
              <path :d="cablePath(c)" fill="none" :stroke="selectedCable === c.id ? '#f59e0b' : cableColor(c)" stroke-width="5" stroke-linecap="round" />
              <path :d="cablePath(c)" fill="none" stroke="transparent" stroke-width="22" class="cursor-pointer" @pointerdown.stop @click.stop="tapCable(c)" />
            </g>
            <!-- Wi-Fi links -->
            <line v-for="l in wifiLinks" :key="'w' + l.a" :x1="pos(l.a).x" :y1="pos(l.a).y" :x2="pos(l.b).x" :y2="pos(l.b).y" stroke="#15874a" stroke-width="3" stroke-dasharray="3 9" stroke-linecap="round" class="wifi-flow" />

            <!-- devices -->
            <g
              v-for="d in shown"
              :key="d.id"
              :transform="`translate(${pos(d.id).x} ${pos(d.id).y})`"
              class="cursor-pointer"
              :class="{ 'dev-sel': selected === d.id, 'dev-from': toolFrom === d.id }"
              @pointerdown.stop="downOnDevice($event, d)"
            >
              <rect v-if="selected === d.id || toolFrom === d.id" x="-52" y="-42" width="104" height="96" rx="12" fill="none" :stroke="toolFrom === d.id ? '#2563eb' : '#f59e0b'" stroke-width="3" />
              <DeviceArt :type="d.type" :state="screenState(d.id)" :leds="ledCount(d.id)" :blink="blinkId === d.id" :ap-on="apOnline" />
              <text v-if="d.type !== 'cloud'" y="47" text-anchor="middle" font-size="13" font-weight="700" fill="#1f2937" class="lbl">{{ d.name }}</text>
              <text v-if="d.ip" y="60" text-anchor="middle" font-size="10.5" fill="#475569" class="lbl">{{ d.ip }}</text>
            </g>

            <!-- the Wi-Fi name and key, on a sticker by the access point -->
            <g v-if="mission.id === 'm5' && apPlaced" :transform="`translate(${pos('ap').x + 48} ${pos('ap').y - 34})`">
              <rect width="118" height="36" rx="5" fill="#fef9c3" stroke="#eab308" />
              <text x="7" y="15" font-size="10" fill="#713f12">Wi-Fi: Tusome-Lab</text>
              <text x="7" y="29" font-size="10" fill="#713f12">Key: Lab2026!</text>
            </g>

            <!-- the packet on its way -->
            <g v-if="packet" :transform="`translate(${packet.x} ${packet.y})`" pointer-events="none">
              <circle r="14" :fill="packet.color" opacity="0.25" class="pk-halo" />
              <rect x="-11" y="-8" width="22" height="16" rx="3" :fill="packet.color" stroke="#fff" stroke-width="2" />
              <path d="M-9 -6 L0 2 L9 -6" fill="none" stroke="#fff" stroke-width="1.6" />
            </g>
            <g v-if="failMark" :transform="`translate(${failMark.x} ${failMark.y})`" pointer-events="none">
              <circle r="15" fill="#e11d48" stroke="#fff" stroke-width="3" />
              <path d="M-6 -6L6 6M6 -6L-6 6" stroke="#fff" stroke-width="3.5" stroke-linecap="round" />
            </g>
            <!-- a printed page sliding out -->
            <g v-if="pageOut" :transform="`translate(${pos('prn').x} ${pos('prn').y + 12 + pageOut * 18})`" pointer-events="none">
              <rect x="-15" y="-4" width="30" height="22" fill="#fff" stroke="#cbd5e1" />
              <line v-for="k in 3" :key="k" x1="-10" :x2="8" :y1="k * 5" :y2="k * 5" stroke="#94a3b8" />
            </g>

            <!-- a device being dragged -->
            <g v-if="drag && drag.moved" :transform="`translate(${drag.x} ${drag.y})`" opacity="0.85" pointer-events="none">
              <DeviceArt :type="devById(drag.id)!.type" state="off" :leds="0" :blink="false" :ap-on="false" />
            </g>
          </svg>

          <!-- the cable tester / remove menu -->
          <div v-if="cableMenu" class="absolute z-10 w-64 rounded-xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 p-3 text-sm" :style="cableMenu.style">
            <p class="font-bold text-gray-900 dark:text-white">Cable: {{ devById(cableMenu.cable.a)?.name }} ↔ {{ devById(cableMenu.cable.b)?.name }}</p>
            <p v-if="cableMenu.result" class="mt-1" :class="cableMenu.cable.broken ? 'text-rose-700 dark:text-rose-300' : 'text-emerald-700 dark:text-emerald-300'">{{ cableMenu.result }}</p>
            <!-- the tester's 8 lights -->
            <div v-if="cableMenu.result" class="mt-1.5 flex gap-1">
              <span v-for="n in 8" :key="n" class="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white" :class="cableMenu.cable.broken && (n === 3 || n === 6) ? 'bg-gray-400' : 'bg-emerald-500'">{{ n }}</span>
            </div>
            <div class="mt-2 flex flex-wrap gap-1.5">
              <button v-if="!cableMenu.result" type="button" class="btn-primary !py-1 !text-xs" @click="testCable">Test the cable</button>
              <button v-if="cableMenu.result && cableMenu.cable.broken" type="button" class="btn-primary !py-1 !text-xs" @click="replaceCable">Replace it</button>
              <button type="button" class="btn-secondary !py-1 !text-xs" @click="removeCable">Unplug it</button>
              <button type="button" class="btn-secondary !py-1 !text-xs" @click="closeCableMenu">Close</button>
            </div>
          </div>

          <!-- Wi-Fi: choose a network, then the password -->
          <div v-if="wifi" class="absolute inset-0 z-20 bg-gray-900/40 rounded-xl flex items-center justify-center p-3">
            <div class="w-full max-w-xs rounded-2xl bg-white dark:bg-gray-800 shadow-xl p-4">
              <p class="text-sm font-bold text-gray-900 dark:text-white">{{ devById(wifi.dev)?.name }}: Wi-Fi networks</p>
              <template v-if="!wifi.ssid">
                <p v-if="!labWifiOn" class="mt-1 text-xs text-amber-700 dark:text-amber-300">The lab network is not showing - is the access point on the ceiling and plugged into the switch?</p>
                <div class="mt-2 space-y-1.5">
                  <button v-for="n in wifiChoices" :key="n.ssid" type="button" class="w-full text-left rounded-xl border border-gray-200 dark:border-gray-600 px-3 py-2 hover:border-indigo-400" @click="pickWifi(n.ssid)">
                    <span class="font-semibold text-sm text-gray-900 dark:text-white">{{ n.secure ? '🔒' : '🔓' }} {{ n.ssid }}</span>
                    <span v-if="n.note" class="block text-[11px] text-gray-500">{{ n.note }}</span>
                  </button>
                </div>
              </template>
              <template v-else>
                <p class="mt-1 text-xs text-gray-600 dark:text-gray-300">Password for <b>{{ wifi.ssid }}</b> - it is on the sticker by the access point:</p>
                <div class="mt-2 grid grid-cols-1 gap-1.5">
                  <button v-for="p in WIFI_PASSWORDS" :key="p" type="button" class="rounded-xl border border-gray-200 dark:border-gray-600 px-3 py-2 font-mono text-sm hover:border-indigo-400" @click="pickPassword(p)">{{ p }}</button>
                </div>
              </template>
              <p v-if="wifi.msg" class="mt-2 text-xs font-semibold text-rose-700 dark:text-rose-300">{{ wifi.msg }}</p>
              <button type="button" class="mt-3 btn-secondary !py-1 !text-xs" @click="wifi = null">Close</button>
            </div>
          </div>
        </div>

        <!-- the tray: devices still to place -->
        <div class="mt-2 flex items-center gap-2 min-h-[3.5rem] px-1">
          <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 flex-shrink-0">{{ tray.length ? 'Drag into the room:' : 'Everything is in place.' }}</span>
          <div class="flex gap-2 overflow-x-auto pb-1">
            <div
              v-for="d in tray"
              :key="d.id"
              class="flex-shrink-0 flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-xl border-2 border-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 cursor-grab touch-none active:cursor-grabbing"
              @pointerdown.prevent="downOnTray($event, d)"
            >
              <svg viewBox="-50 -42 100 84" class="w-12 h-10"><DeviceArt :type="d.type" state="off" :leds="0" :blink="false" :ap-on="false" /></svg>
              <span class="text-sm font-semibold text-gray-800 dark:text-gray-100">{{ d.name }}</span>
            </div>
          </div>
        </div>
      </section>

      <aside class="space-y-3 lg:sticky lg:top-20">
        <!-- finished -->
        <div v-if="complete" class="rounded-2xl border-2 border-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-800 p-4 text-center">
          <p class="text-3xl">🎉</p>
          <p class="text-base font-bold text-gray-900 dark:text-white">Mission complete!</p>
          <p class="mt-1 text-sm text-gray-700 dark:text-gray-200">{{ mission.done }}</p>
          <p class="mt-1 text-xs text-gray-500">{{ mistakes }} wrong cable{{ mistakes === 1 ? '' : 's' }} tried · score {{ missionScore }}%</p>
          <div class="mt-3 flex justify-center gap-2">
            <button type="button" class="btn-secondary !py-1.5 !text-sm" @click="open(mission)">Do it again</button>
            <button v-if="MISSIONS[missionIndex + 1]" type="button" class="btn-primary !py-1.5 !text-sm" @click="open(MISSIONS[missionIndex + 1])">Next mission</button>
            <button v-else type="button" class="btn-primary !py-1.5 !text-sm" @click="mission = null">All missions</button>
          </div>
        </div>

        <!-- the goals -->
        <div class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
          <p class="text-sm text-gray-700 dark:text-gray-200">{{ mission.intro }}</p>
          <ul class="mt-3 space-y-1.5">
            <li v-for="(g, i) in mission.goals" :key="i" class="flex items-start gap-2 text-sm" :class="goalDone[i] ? 'text-gray-500 dark:text-gray-400' : i === nextGoal ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-600 dark:text-gray-300'">
              <span class="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold" :class="goalDone[i] ? 'bg-emerald-600 text-white' : i === nextGoal ? 'border-2 border-indigo-600 text-indigo-700' : 'border-2 border-gray-300 dark:border-gray-600'">{{ goalDone[i] ? '✓' : '' }}</span>
              <span :class="goalDone[i] ? 'line-through' : ''">{{ g.text }}</span>
            </li>
          </ul>
        </div>

        <!-- tests -->
        <div class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
          <p class="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2">Test the network</p>
          <div class="flex flex-wrap gap-1.5">
            <button v-for="t in mission.tools" :key="t" type="button" class="px-3 py-1.5 rounded-xl text-sm font-semibold border-2 transition-colors disabled:opacity-50" :class="tool === t && mode !== 'idle' ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-indigo-200 dark:border-indigo-800 text-indigo-800 dark:text-indigo-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'" :disabled="!!packet" @click="startTool(t)">
              {{ t === 'ping' ? 'Ping' : t === 'print' ? 'Print' : 'Open a website' }}
            </button>
          </div>
          <!-- the console -->
          <div ref="consoleBox" class="mt-2 h-28 overflow-y-auto rounded-lg bg-gray-950 px-2.5 py-2 font-mono text-[11px] leading-relaxed">
            <p v-if="!log.length" class="text-gray-500">Results show here.</p>
            <p v-for="(l, i) in log" :key="i" :class="l.tone === 'good' ? 'text-emerald-400' : l.tone === 'bad' ? 'text-rose-400' : 'text-gray-300'">{{ l.text }}</p>
          </div>
        </div>

        <!-- the device picked, and words to know -->
        <div class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
          <template v-if="selected && devById(selected)">
            <p class="text-xs font-bold text-indigo-600 dark:text-indigo-300">{{ TYPE_NAME[devById(selected)!.type] }}</p>
            <p class="text-sm text-gray-700 dark:text-gray-200">{{ TYPE_INFO[devById(selected)!.type] }}</p>
          </template>
          <template v-else>
            <p class="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">Words to know</p>
            <dl class="space-y-1.5">
              <div v-for="t in mission.terms" :key="t.term" class="text-sm"><dt class="inline font-bold text-gray-900 dark:text-white">{{ t.term }}:</dt> <dd class="inline text-gray-600 dark:text-gray-300">{{ t.means }}</dd></div>
            </dl>
          </template>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onBeforeUnmount, onMounted, shallowRef, defineComponent, h } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { labRoleOf, type IctProgress } from '@/components/ictlab/types'
import {
  MISSIONS, SLOTS, SLOT_FOR, TYPE_NAME, TYPE_INFO, VIEW_W, VIEW_H, WIFI_LIST, WIFI_PASSWORDS, WIFI_KEY,
  cableProblem, findPath, reachable, brokenOn, slotById, links,
  type Mission, type Dev, type Cable, type Slot, type DevType
} from '@/components/ictlab/network'

const route = useRoute()
const role = computed(() => labRoleOf(route.path))

// ------------------------------------------------------------ drawings of the devices
const DeviceArt = defineComponent({
  props: { type: { type: String, required: true }, state: { type: String, default: 'off' }, leds: { type: Number, default: 0 }, blink: Boolean, apOn: Boolean },
  setup(p) {
    const screen = () => (p.state === 'online' ? 'url(#screenOn)' : p.state === 'lan' ? 'url(#screenLan)' : '#475569')
    return () => {
      const t = p.type as DevType
      if (t === 'pc') return h('g', [
        h('rect', { x: -30, y: -32, width: 54, height: 38, rx: 4, fill: '#1f2937' }),
        h('rect', { x: -27, y: -29, width: 48, height: 30, rx: 2, fill: screen() }),
        h('rect', { x: -6, y: 6, width: 8, height: 7, fill: '#374151' }),
        h('rect', { x: -15, y: 12, width: 26, height: 4, rx: 2, fill: '#374151' }),
        h('rect', { x: 28, y: -26, width: 15, height: 42, rx: 2, fill: '#374151' }),
        h('circle', { cx: 35.5, cy: -18, r: 2, fill: p.state === 'off' ? '#64748b' : '#22c55e' }),
        h('rect', { x: -26, y: 22, width: 46, height: 8, rx: 2, fill: '#cbd5e1', stroke: '#94a3b8' })
      ])
      if (t === 'printer') return h('g', [
        h('rect', { x: -20, y: -30, width: 40, height: 14, fill: '#fff', stroke: '#cbd5e1' }),
        h('rect', { x: -32, y: -18, width: 64, height: 32, rx: 5, fill: '#e5e7eb', stroke: '#9ca3af', 'stroke-width': 2 }),
        h('rect', { x: -24, y: 10, width: 48, height: 6, rx: 2, fill: '#9ca3af' }),
        h('circle', { cx: 22, cy: -8, r: 3, fill: p.state === 'off' ? '#94a3b8' : '#22c55e' })
      ])
      if (t === 'switch') return h('g', [
        h('rect', { x: -44, y: -12, width: 88, height: 24, rx: 4, fill: '#1f2937' }),
        ...Array.from({ length: 8 }, (_, i) => h('rect', { x: -38 + i * 9.6, y: -3, width: 7, height: 8, rx: 1, fill: '#0b0f14', stroke: '#475569' })),
        ...Array.from({ length: 8 }, (_, i) => h('circle', { cx: -34.5 + i * 9.6, cy: -7.5, r: 1.8, fill: i < p.leds ? (p.blink ? '#fde047' : '#22c55e') : '#334155' }))
      ])
      if (t === 'router') return h('g', [
        h('line', { x1: -24, y1: -10, x2: -32, y2: -36, stroke: '#111827', 'stroke-width': 4, 'stroke-linecap': 'round' }),
        h('line', { x1: 24, y1: -10, x2: 32, y2: -36, stroke: '#111827', 'stroke-width': 4, 'stroke-linecap': 'round' }),
        h('rect', { x: -36, y: -12, width: 72, height: 26, rx: 6, fill: '#111827' }),
        ...Array.from({ length: 5 }, (_, i) => h('circle', { cx: -22 + i * 11, cy: 1, r: 2.2, fill: i < p.leds ? (p.blink ? '#fde047' : '#22c55e') : '#334155' }))
      ])
      if (t === 'modem') return h('g', [
        h('rect', { x: -24, y: -20, width: 48, height: 40, rx: 6, fill: '#f8fafc', stroke: '#94a3b8', 'stroke-width': 2 }),
        h('text', { x: 0, y: 14, 'text-anchor': 'middle', 'font-size': 9, 'font-weight': 700, fill: '#475569' }, 'MODEM'),
        ...Array.from({ length: 3 }, (_, i) => h('circle', { cx: -10 + i * 10, cy: -6, r: 2.5, fill: i < p.leds + 1 ? (p.blink ? '#fde047' : '#22c55e') : '#cbd5e1' }))
      ])
      if (t === 'ap') return h('g', [
        ...(p.apOn ? [18, 28, 38].map(r => h('path', { d: `M${-r * 0.7} ${-r * 0.7 - 6} A${r} ${r} 0 0 1 ${r * 0.7} ${-r * 0.7 - 6}`, fill: 'none', stroke: '#15874a', 'stroke-width': 3, 'stroke-linecap': 'round', class: 'wifi-wave' })) : []),
        h('circle', { r: 22, fill: '#f8fafc', stroke: '#94a3b8', 'stroke-width': 2 }),
        h('circle', { r: 5, fill: p.apOn ? '#22c55e' : '#cbd5e1' })
      ])
      if (t === 'laptop') return h('g', [
        h('rect', { x: -28, y: -30, width: 56, height: 36, rx: 4, fill: '#9ca3af' }),
        h('rect', { x: -25, y: -27, width: 50, height: 30, rx: 2, fill: screen() }),
        h('path', { d: 'M-36 8 H36 L30 16 H-30 Z', fill: '#cbd5e1', stroke: '#94a3b8' })
      ])
      if (t === 'tablet') return h('g', [
        h('rect', { x: -20, y: -28, width: 40, height: 56, rx: 6, fill: '#1f2937' }),
        h('rect', { x: -16, y: -23, width: 32, height: 44, rx: 2, fill: screen() })
      ])
      if (t === 'wall') return h('g', [
        h('rect', { x: -16, y: -18, width: 32, height: 36, rx: 4, fill: '#fff', stroke: '#64748b', 'stroke-width': 2 }),
        h('rect', { x: -7, y: -6, width: 14, height: 12, rx: 1, fill: '#1f2937' }),
        h('text', { x: 0, y: -24, 'text-anchor': 'middle', 'font-size': 10, fill: '#64748b' }, 'from the ISP')
      ])
      if (t === 'cloud') return h('g', [
        h('path', { d: 'M-34 12 a14 14 0 0 1 4 -27 a20 20 0 0 1 37 -6 a16 16 0 0 1 25 14 a13 13 0 0 1 -4 19 z', fill: '#dbeafe', stroke: '#60a5fa', 'stroke-width': 2 }),
        h('text', { x: 0, y: 6, 'text-anchor': 'middle', 'font-size': 11, 'font-weight': 700, fill: '#1e40af' }, 'Internet')
      ])
      return h('g')
    }
  }
})

// ------------------------------------------------------------ missions and progress
const progress = ref<IctProgress[]>([])
onMounted(async () => {
  if (role.value !== 'student') return
  try {
    const res = await axios.get('/api/student/ict-lab')
    progress.value = res.data.data.progress || []
  } catch {
    // missions still work
  }
})
const bestOf = (m: Mission) => progress.value.find(p => p.activity_key === `network-${m.id}`)?.best ?? null
const locked = (i: number) => role.value === 'student' && i > 0 && bestOf(MISSIONS[i - 1]) === null

const mission = shallowRef<Mission | null>(null)
const missionIndex = computed(() => Math.max(0, MISSIONS.findIndex(m => m.id === mission.value?.id)))
const devs = ref<Dev[]>([])
const cables = ref<Cable[]>([])
const pinged = ref(false)
const printed = ref(false)
const browsed = ref(new Set<string>())
const mistakes = ref(0)
const saved = ref(false)
const log = ref<{ text: string; tone?: 'good' | 'bad' }[]>([])
const consoleBox = ref<HTMLElement | null>(null)

function open(m: Mission) {
  const s = m.setup()
  devs.value = s.devs
  cables.value = s.cables
  pinged.value = false
  printed.value = false
  browsed.value = new Set()
  mistakes.value = 0
  saved.value = false
  log.value = []
  cancel()
  stopPacket()
  wifi.value = null
  mission.value = m
  say(m.id === 'm4' ? 'Something is wrong. Test first: try Ping, Print and Open a website.' : tray.value.length ? 'Drag a device from the tray into the room.' : 'Tap two devices to join them with a cable.')
}

const state = computed(() => ({ devs: devs.value, cables: cables.value, pinged: pinged.value, printed: printed.value, browsed: browsed.value }))
const goalDone = computed(() => (mission.value ? mission.value.goals.map(g => g.done(state.value)) : []))
const nextGoal = computed(() => goalDone.value.findIndex(d => !d))
const complete = computed(() => !!mission.value && goalDone.value.length > 0 && goalDone.value.every(Boolean))
const missionScore = computed(() => Math.max(0, 100 - mistakes.value * 5))
watch(complete, async c => {
  if (!c || saved.value || !mission.value) return
  saved.value = true
  say('Mission complete!', 'good')
  if (role.value !== 'student') return
  try {
    await axios.post('/api/student/ict-lab/attempts', {
      activity_key: `network-${mission.value.id}`, level: 'simple', steps_total: mission.value.goals.length, mistakes: mistakes.value, hints_used: 0, duration_seconds: 0
    })
    const res = await axios.get('/api/student/ict-lab')
    progress.value = res.data.data.progress || []
  } catch {
    // shown anyway
  }
})

// ------------------------------------------------------------ the room
const devById = (id: string) => devs.value.find(d => d.id === id) || null
const occupant = (slotId: string) => devs.value.find(d => d.slot === slotId) || null
const shown = computed(() => devs.value.filter(d => d.slot || d.fixed))
const tray = computed(() => devs.value.filter(d => !d.slot && !d.fixed))
function pos(id: string) {
  const d = devById(id)
  if (!d) return { x: 0, y: 0 }
  if (d.fixed) return d.fixed
  const s = slotById(d.slot)
  return s ? { x: s.x, y: s.y } : { x: 0, y: 0 }
}
// a cable drapes down between its two ends
function cableGeom(c: Cable) {
  const a = pos(c.a)
  const b = pos(c.b)
  const sag = Math.min(70, 20 + Math.hypot(b.x - a.x, b.y - a.y) * 0.12)
  return { a, b, c1: { x: a.x, y: a.y + sag }, c2: { x: b.x, y: b.y + sag } }
}
function cablePath(c: Cable) {
  const g = cableGeom(c)
  return `M${g.a.x} ${g.a.y + 20} C${g.c1.x} ${g.c1.y + 20} ${g.c2.x} ${g.c2.y + 20} ${g.b.x} ${g.b.y + 20}`
}
const CABLE_COLORS = ['#2563eb', '#0891b2', '#7c3aed', '#ca8a04', '#dc2626', '#15803d', '#db2777', '#ea580c']
const cableColor = (c: Cable) => CABLE_COLORS[Number(c.id.replace(/\D/g, '')) % CABLE_COLORS.length]
const apPlaced = computed(() => !!devById('ap')?.slot)
const labWifiOn = computed(() => apPlaced.value && cables.value.some(c => (c.a === 'ap' || c.b === 'ap') && (c.a === 'sw' || c.b === 'sw')))
const apOnline = computed(() => labWifiOn.value)
const wifiLinks = computed(() => links(devs.value, cables.value).filter(l => l.wifi))
const ledCount = (id: string) => cables.value.filter(c => c.a === id || c.b === id).length
// a screen is green when it reaches the internet, blue when only on the LAN, grey with no network
function screenState(id: string) {
  const d = devById(id)
  if (!d || !['pc', 'laptop', 'tablet', 'printer'].includes(d.type)) return 'on'
  const on = reachable(devs.value, cables.value, id)
  if (on.has('cloud')) {
    const p = findPath(devs.value, cables.value, id, 'cloud')
    if (p && !brokenOn(cables.value, p)) return 'online'
  }
  return on.size > 1 ? 'lan' : 'off'
}

// ------------------------------------------------------------ talking to the student
const prompt = ref<{ text: string; tone?: 'good' | 'bad' } | null>(null)
function say(text: string, tone?: 'good' | 'bad') {
  prompt.value = { text, tone }
}
function write(text: string, tone?: 'good' | 'bad') {
  log.value.push({ text, tone })
  nextTick(() => consoleBox.value?.scrollTo({ top: 99999 }))
}

// ------------------------------------------------------------ dragging and tapping
const svg = ref<SVGSVGElement | null>(null)
const drag = ref<{ id: string; x: number; y: number; moved: boolean; sx: number; sy: number; fromTray: boolean } | null>(null)
const selected = ref<string | null>(null)
const mode = ref<'idle' | 'from' | 'to'>('idle')
const tool = ref<'ping' | 'print' | 'web' | null>(null)
const toolFrom = ref<string | null>(null)

function toSvg(clientX: number, clientY: number) {
  const el = svg.value
  if (!el) return { x: 0, y: 0 }
  const p = new DOMPoint(clientX, clientY).matrixTransform(el.getScreenCTM()!.inverse())
  return { x: p.x, y: p.y }
}
const dragFits = (s: Slot) => {
  if (!drag.value?.moved) return false
  const d = devById(drag.value.id)
  return !!d && SLOT_FOR[d.type] === s.kind && (!occupant(s.id) || occupant(s.id)!.id === d.id)
}

function downOnDevice(e: PointerEvent, d: Dev) {
  if (packet.value) return
  const p = toSvg(e.clientX, e.clientY)
  drag.value = { id: d.id, x: p.x, y: p.y, moved: false, sx: e.clientX, sy: e.clientY, fromTray: false }
  window.addEventListener('pointermove', onMove)
  window.addEventListener('pointerup', onUp, { once: true })
}
function downOnTray(e: PointerEvent, d: Dev) {
  if (packet.value) return
  const p = toSvg(e.clientX, e.clientY)
  drag.value = { id: d.id, x: p.x, y: p.y, moved: false, sx: e.clientX, sy: e.clientY, fromTray: true }
  cancel()
  say(`Drop the ${d.name.toLowerCase()} where it belongs - the places that fit light up.`)
  window.addEventListener('pointermove', onMove)
  window.addEventListener('pointerup', onUp, { once: true })
}
function onMove(e: PointerEvent) {
  const dr = drag.value
  if (!dr) return
  const d = devById(dr.id)
  if (!dr.moved && Math.hypot(e.clientX - dr.sx, e.clientY - dr.sy) > 6 && d && !d.fixed) {
    dr.moved = true
    closeCableMenu()
  }
  if (dr.moved) Object.assign(dr, toSvg(e.clientX, e.clientY))
}
function onUp() {
  window.removeEventListener('pointermove', onMove)
  const dr = drag.value
  drag.value = null
  if (!dr) return
  const d = devById(dr.id)
  if (!d) return
  if (!dr.moved) {
    if (!dr.fromTray) tapDevice(d)
    return
  }
  // dropped: onto the nearest place that fits, if it is close
  const near = SLOTS.map(s => ({ s, dist: Math.hypot(s.x - dr.x, s.y - dr.y) })).sort((a, b) => a.dist - b.dist)[0]
  const outside = dr.y > VIEW_H - 5 || dr.y < 0 || dr.x < 0 || dr.x > VIEW_W
  if (outside && !dr.fromTray) {
    // back to the tray, unplugged
    cables.value = cables.value.filter(c => c.a !== d.id && c.b !== d.id)
    d.slot = null
    say(`${d.name} is back in the tray.`)
    return
  }
  if (!near || near.dist > 80) {
    if (dr.fromTray) say(`Drop it on one of the lit places.`)
    return
  }
  const want = SLOT_FOR[d.type]
  if (near.s.kind !== want) {
    say(want === 'desk' ? `The ${d.name.toLowerCase()} goes on a desk.` : want === 'cabinet' ? `The ${d.name.toLowerCase()} goes in the network cabinet, with the other network boxes.` : 'The access point goes on the ceiling, in the middle of the room, so its signal reaches every corner.', 'bad')
    return
  }
  if (d.type === 'printer' && near.s.id !== 'd5') {
    say('The printer goes on the printer table.', 'bad')
    return
  }
  if (d.type === 'pc' && near.s.id === 'd5') {
    say('Keep the printer table for the printer.', 'bad')
    return
  }
  const there = occupant(near.s.id)
  if (there && there.id !== d.id) {
    say(`${there.name} is already there.`, 'bad')
    return
  }
  d.slot = near.s.id
  say(tray.value.length ? 'Good. Drag the next one in.' : 'All in place. Now tap two devices to join them with a cable.', 'good')
}

function tapDevice(d: Dev) {
  closeCableMenu()
  // using a test tool
  if (mode.value === 'from') {
    const ok = tool.value === 'print' ? ['pc', 'laptop'].includes(d.type) : ['pc', 'laptop', 'tablet'].includes(d.type)
    if (!ok) return say(tool.value === 'print' ? 'Tap a computer to print from.' : 'Tap a computer (or the laptop or tablet) to start from.', 'bad')
    toolFrom.value = d.id
    if (tool.value === 'ping') {
      mode.value = 'to'
      return say(`Now tap the device ${d.name} should ping.`)
    }
    return runTool(d.id)
  }
  if (mode.value === 'to') {
    if (d.id === toolFrom.value || d.type === 'cloud') return say('Tap a different device.', 'bad')
    return runTool(toolFrom.value!, d.id)
  }
  // wireless devices join the Wi-Fi
  if ((d.type === 'laptop' || d.type === 'tablet') && !d.joined) {
    wifi.value = { dev: d.id, ssid: null, msg: '' }
    return
  }
  if (d.type === 'cloud') return
  // running a cable
  if (!selected.value) {
    selected.value = d.id
    return say(`${d.name} picked. Now tap the device to join it to.`)
  }
  if (selected.value === d.id) {
    selected.value = null
    return say('Tap two devices to join them with a cable.')
  }
  const a = devById(selected.value)!
  const problem = cableProblem(a, d, cables.value, devs.value)
  selected.value = null
  if (problem) {
    mistakes.value++
    return say(problem, 'bad')
  }
  cables.value.push({ id: `k${Date.now() % 100000}${cables.value.length}`, a: a.id, b: d.id })
  const wan = (a.type === 'router' && d.type === 'modem') || (d.type === 'router' && a.type === 'modem')
  say(wan ? 'Cable in: router (its WAN port, for the internet side) ↔ modem.' : `Cable in: ${a.name} ↔ ${d.name}.`, 'good')
}
function cancel() {
  selected.value = null
  mode.value = 'idle'
  tool.value = null
  toolFrom.value = null
  closeCableMenu()
}

// ------------------------------------------------------------ the cable tester
const selectedCable = ref<string | null>(null)
const cableMenu = ref<{ cable: Cable; result: string; style: Record<string, string> } | null>(null)
function tapCable(c: Cable) {
  if (packet.value || mode.value !== 'idle') return
  selected.value = null
  selectedCable.value = c.id
  const g = cableGeom(c)
  // the menu sits by the middle of the cable
  const mx = (g.a.x + g.b.x) / 2
  const my = (g.a.y + g.b.y) / 2 + 40
  const left = Math.min(70, Math.max(0, (mx / VIEW_W) * 100 - 12))
  const top = Math.min(70, Math.max(0, (my / VIEW_H) * 100))
  cableMenu.value = { cable: c, result: '', style: { left: `${left}%`, top: `${top}%` } }
}
function testCable() {
  const m = cableMenu.value
  if (!m) return
  m.result = m.cable.broken ? 'Wires 3 and 6 do not connect - this cable is broken. Replace it.' : 'All 8 wires connect - this cable is fine.'
  write(`Cable test ${devById(m.cable.a)?.name} ↔ ${devById(m.cable.b)?.name}: ${m.cable.broken ? 'FAIL (wires 3, 6)' : 'pass'}`, m.cable.broken ? 'bad' : 'good')
}
function replaceCable() {
  const m = cableMenu.value
  if (!m) return
  const c = cables.value.find(k => k.id === m.cable.id)
  if (c) c.broken = false
  write('Cable replaced with a new one.', 'good')
  say('New cable in. Test again to be sure it works.', 'good')
  closeCableMenu()
}
function removeCable() {
  const m = cableMenu.value
  if (!m) return
  cables.value = cables.value.filter(k => k.id !== m.cable.id)
  say('Cable unplugged.')
  closeCableMenu()
}
function closeCableMenu() {
  cableMenu.value = null
  selectedCable.value = null
}

// ------------------------------------------------------------ Wi-Fi
const wifi = ref<{ dev: string; ssid: string | null; msg: string } | null>(null)
const wifiChoices = computed(() => WIFI_LIST.filter(n => n.ssid !== 'Tusome-Lab' || labWifiOn.value))
function pickWifi(ssid: string) {
  if (!wifi.value) return
  if (ssid === 'FREE_WiFi_FAST') {
    mistakes.value++
    wifi.value.msg = 'Careful! An open network nobody in school set up could be a stranger watching everything you send. Join the lab network.'
    return
  }
  if (ssid === 'Neighbour-5G') {
    mistakes.value++
    wifi.value.msg = 'That is someone else\'s network - not yours to use. Join the lab network.'
    return
  }
  wifi.value.ssid = ssid
  wifi.value.msg = ''
}
function pickPassword(p: string) {
  if (!wifi.value) return
  if (p !== WIFI_KEY) {
    mistakes.value++
    wifi.value.msg = 'Wrong password. Look at the sticker by the access point.'
    return
  }
  const d = devById(wifi.value.dev)
  if (d) d.joined = true
  write(`${d?.name} joined Tusome-Lab. IP address ${d?.ip}`, 'good')
  say(`${d?.name} is on the Wi-Fi. Open a website on it to test.`, 'good')
  wifi.value = null
}

// ------------------------------------------------------------ tests: ping, print, open a website
function startTool(t: 'ping' | 'print' | 'web') {
  cancel()
  if (t === 'print' && !devById('prn')?.slot) return say('Put the printer in the room first.', 'bad')
  tool.value = t
  mode.value = 'from'
  say(t === 'ping' ? 'Ping: tap the device to send from.' : t === 'print' ? 'Print: tap the computer to print from.' : 'Open a website: tap the computer (or laptop or tablet) to use.')
}

const packet = ref<{ x: number; y: number; color: string } | null>(null)
const failMark = ref<{ x: number; y: number } | null>(null)
const pageOut = ref(0)
const blinkId = ref<string | null>(null)
let raf = 0

// points along the link between two devices, in order
function linkPoints(a: string, b: string): { x: number; y: number }[] {
  const c = cables.value.find(k => (k.a === a && k.b === b) || (k.a === b && k.b === a))
  const out: { x: number; y: number }[] = []
  if (c) {
    const g = cableGeom(c)
    const fwd = c.a === a
    for (let i = 0; i <= 24; i++) {
      const t = fwd ? i / 24 : 1 - i / 24
      const u = 1 - t
      const x = u ** 3 * g.a.x + 3 * u * u * t * g.c1.x + 3 * u * t * t * g.c2.x + t ** 3 * g.b.x
      const y = u ** 3 * (g.a.y + 20) + 3 * u * u * t * (g.c1.y + 20) + 3 * u * t * t * (g.c2.y + 20) + t ** 3 * (g.b.y + 20)
      out.push({ x, y })
    }
    return out
  }
  const pa = pos(a)
  const pb = pos(b)
  for (let i = 0; i <= 12; i++) out.push({ x: pa.x + ((pb.x - pa.x) * i) / 12, y: pa.y + ((pb.y - pa.y) * i) / 12 })
  return out
}
// move the packet along a route of devices; stop part way along link `stopAt` when it fails
function travel(route: string[], color: string, stopAt = -1): Promise<boolean> {
  const pts: { x: number; y: number; dev?: string }[] = []
  for (let i = 0; i + 1 < route.length; i++) {
    let seg = linkPoints(route[i], route[i + 1])
    if (i === stopAt) seg = seg.slice(0, Math.ceil(seg.length / 2))
    pts.push(...seg.map((p, k) => (k === seg.length - 1 && i !== stopAt ? { ...p, dev: route[i + 1] } : p)))
    if (i === stopAt) break
  }
  if (pts.length < 2) return Promise.resolve(stopAt < 0)
  const lens = [0]
  for (let i = 1; i < pts.length; i++) lens.push(lens[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y))
  const total = lens[lens.length - 1]
  const speed = 520
  const t0 = performance.now()
  return new Promise(done => {
    const step = () => {
      const dist = ((performance.now() - t0) / 1000) * speed
      let i = lens.findIndex(l => l >= dist)
      if (i < 0) i = pts.length - 1
      const p = pts[i]
      packet.value = { x: p.x, y: p.y, color }
      // the switch and router lights flicker as it passes
      const near = pts.slice(Math.max(0, i - 2), i + 1).find(q => q.dev)
      blinkId.value = near?.dev ?? null
      if (dist < total) raf = requestAnimationFrame(step)
      else {
        blinkId.value = null
        done(stopAt < 0)
      }
    }
    raf = requestAnimationFrame(step)
  })
}
function stopPacket() {
  cancelAnimationFrame(raf)
  packet.value = null
  failMark.value = null
  pageOut.value = 0
}

// The way from a to b, or where it stops: {route, stopAt (link index), reason}
function plan(from: string, to: string) {
  const path = findPath(devs.value, cables.value, from, to)
  if (path) {
    const br = brokenOn(cables.value, path)
    if (br) return { route: path, stopAt: br.at, reason: `the cable between ${devById(path[br.at])?.name} and ${devById(path[br.at + 1])?.name} is not carrying data` }
    return { route: path, stopAt: -1, reason: '' }
  }
  // no way through: go as far as possible towards the target
  const seen = reachable(devs.value, cables.value, from)
  const target = pos(to)
  let best = from
  let bestD = Infinity
  for (const id of seen) {
    const p = pos(id)
    const dd = Math.hypot(p.x - target.x, p.y - target.y)
    if (dd < bestD) { bestD = dd; best = id }
  }
  const part = best === from ? [from] : findPath(devs.value, cables.value, from, best)!
  const where = devById(best)?.name
  const targetAlone = reachable(devs.value, cables.value, to).size === 1
  const reason = seen.size === 1
    ? `${devById(from)?.name} has no cable to the network`
    : targetAlone
      ? `${devById(to)?.name} has no cable to the network`
      : `there is no cable from ${where} towards ${devById(to)?.name}`
  return { route: part, stopAt: -2, reason }
}

async function runTool(from: string, to?: string) {
  const t = tool.value
  cancel()
  stopPacket()
  const src = devById(from)!
  if (t === 'ping' && to) {
    const dst = devById(to)!
    write(`> ping ${dst.ip || dst.name} (from ${src.name})`)
    say(`Pinging ${dst.name}...`)
    const p = plan(from, to)
    const ok = await travel(p.route, '#2563eb', p.stopAt >= 0 ? p.stopAt : -1)
    if (ok && p.stopAt === -1) {
      await travel([...p.route].reverse(), '#16a34a')
      packet.value = null
      write(`Reply from ${dst.ip || dst.name}: bytes=32 time=${2 + p.route.length}ms`, 'good')
      say(`${dst.name} replied - they are connected.`, 'good')
      pinged.value = true
    } else fail(p.reason, 'Request timed out.', from)
  } else if (t === 'print') {
    write(`> print "My work.docx" from ${src.name}`)
    const p = plan(from, 'prn')
    const ok = await travel(p.route, '#7c3aed', p.stopAt >= 0 ? p.stopAt : -1)
    if (ok && p.stopAt === -1) {
      packet.value = null
      for (let k = 1; k <= 20; k++) {
        pageOut.value = k / 20
        await new Promise(r => setTimeout(r, 40))
      }
      write('Printer: 1 page printed.', 'good')
      say('The page printed!', 'good')
      printed.value = true
      setTimeout(() => (pageOut.value = 0), 2500)
    } else fail(p.reason, 'Printer not found.', from)
  } else if (t === 'web') {
    write(`> open https://tusome.ug on ${src.name}`)
    say('Opening the website...')
    const p = plan(from, 'cloud')
    const ok = await travel(p.route, '#ea580c', p.stopAt >= 0 ? p.stopAt : -1)
    if (ok && p.stopAt === -1) {
      await travel([...p.route].reverse(), '#16a34a')
      packet.value = null
      write(`${src.name}: tusome.ug loaded.`, 'good')
      say(`The website opened on ${src.name}.`, 'good')
      browsed.value = new Set([...browsed.value, from])
    } else fail(p.reason, 'This site can\'t be reached.', from)
  }
}
function fail(reason: string, headline: string, from: string) {
  // the red cross goes where the packet stopped (or on the device itself, if it never left)
  failMark.value = packet.value ? { x: packet.value.x, y: packet.value.y } : { ...pos(from) }
  packet.value = null
  write(headline, 'bad')
  write(`Why: ${reason}.`, 'bad')
  say(`It did not get through: ${reason}.`, 'bad')
  setTimeout(() => (failMark.value = null), 3500)
}

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('pointermove', onMove)
})
</script>

<style scoped>
.lbl {
  paint-order: stroke;
  stroke: #ffffff;
  stroke-width: 4px;
  stroke-linejoin: round;
}
.slot-pulse {
  animation: slot-pulse 1s ease-in-out infinite;
}
@keyframes slot-pulse {
  50% { stroke-opacity: 0.35; }
}
.dev-sel {
  filter: drop-shadow(0 0 6px rgba(245, 158, 11, 0.6));
}
.pk-halo {
  animation: halo 0.6s ease-in-out infinite alternate;
}
@keyframes halo {
  to { transform: scale(1.4); }
}
.wifi-flow {
  animation: flow 1s linear infinite;
}
@keyframes flow {
  to { stroke-dashoffset: -24; }
}
:deep(.wifi-wave) {
  animation: wave 1.6s ease-in-out infinite;
}
@keyframes wave {
  50% { opacity: 0.35; }
}
</style>
