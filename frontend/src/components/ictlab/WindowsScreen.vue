<template>
  <!-- One screen of making the Windows installer USB or installing Windows, drawn the way it
       looks on a real computer: a browser, the Media Creation Tool, the laptop's boot menu,
       Windows Setup, first-time setup, Settings and the desktop. The choices are on the screen
       itself; tapping one emits `choose`. A progress screen fills by itself (`progress` 0-1). -->
  <div class="rounded-2xl bg-gray-900 p-2.5 sm:p-3 shadow-lg">
    <div class="relative aspect-[16/10] rounded-md overflow-hidden text-[11px] sm:text-[13px] select-none" :class="family === 'bios' || family === 'black' ? 'bg-black' : 'bg-white'">

      <!-- ===== browser ===== -->
      <div v-if="family === 'browser'" class="absolute inset-0 flex flex-col bg-white text-gray-900">
        <div class="flex items-center gap-2 px-3 py-2 bg-gray-100 border-b border-gray-200">
          <span class="flex gap-1"><span class="w-2.5 h-2.5 rounded-full bg-rose-400"></span><span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span><span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span></span>
          <span class="flex-1 rounded-full bg-white border border-gray-200 px-3 py-1 text-gray-600 font-mono">search: download windows 11 media creation tool</span>
        </div>
        <div class="p-3 sm:p-5 space-y-3 overflow-y-auto">
          <button v-for="(c, i) in screen.choices" :key="i" type="button" class="block w-full text-left rounded-lg p-2 hover:bg-gray-50" :class="ring(i)" @click="emit('choose', i)">
            <span class="block text-[10px] sm:text-xs text-gray-500 font-mono">{{ c.label }}</span>
            <span class="block text-sm sm:text-base text-blue-700 font-semibold underline">{{ i === 0 ? 'Download Windows 11 - Microsoft' : i === 1 ? 'FREE Windows 11 Pro ACTIVATED full version 100% working' : 'Windows 11 ISO fast download - no waiting' }}</span>
            <span class="block text-[10px] sm:text-xs text-gray-600">{{ i === 0 ? 'Create Windows 11 installation media - Media Creation Tool.' : i === 1 ? 'Crack + keygen included. Disable your antivirus before running!' : 'Mirror links. Click the green DOWNLOAD button.' }}</span>
          </button>
        </div>
      </div>

      <!-- ===== the Media Creation Tool ===== -->
      <div v-else-if="family === 'mct'" class="absolute inset-0 flex items-center justify-center bg-[#1f4e79]/90 p-3">
        <div class="w-full max-w-lg bg-white text-gray-900 shadow-2xl">
          <div class="flex items-center justify-between px-3 py-1.5 border-b border-gray-200 text-xs text-gray-700"><span>Windows 11 Setup</span><span>✕</span></div>
          <div class="p-4 sm:p-6 min-h-[11rem]">
            <p class="text-base sm:text-xl text-[#1f4e79] font-light mb-3">{{ MCT_HEAD[screen.view] || screen.title }}</p>
            <template v-if="screen.view === 'mct-progress'">
              <p class="text-gray-700">{{ progress < 0.6 ? 'Downloading Windows 11' : 'Creating Windows 11 media' }}</p>
              <p class="text-gray-500 text-xs mt-1">You can keep using your PC.</p>
              <p class="mt-3 text-gray-800">Progress: {{ Math.round(progress * 100) }}%</p>
              <div class="mt-1 h-2 bg-gray-200"><div class="h-full bg-[#0067b8] transition-all" :style="{ width: `${progress * 100}%` }"></div></div>
            </template>
            <template v-else-if="screen.view === 'mct-license'">
              <div class="h-16 sm:h-20 overflow-hidden border border-gray-200 p-2 text-[10px] text-gray-500 leading-snug">MICROSOFT SOFTWARE LICENSE TERMS · WINDOWS OPERATING SYSTEM · IF YOU LIVE IN (OR ARE A BUSINESS WITH A PRINCIPAL PLACE OF BUSINESS IN) THE UNITED STATES, PLEASE READ THE "BINDING ARBITRATION AND CLASS ACTION WAIVER" SECTION BELOW...</div>
              <div class="mt-4 flex justify-end gap-2">
                <button v-for="(c, i) in screen.choices" :key="i" type="button" class="px-5 py-1.5 border text-sm" :class="[i === 0 ? 'bg-[#0067b8] text-white border-[#0067b8]' : 'border-gray-400', ring(i)]" @click="emit('choose', i)">{{ c.label }}</button>
              </div>
            </template>
            <template v-else-if="screen.view === 'mct-ready'">
              <p class="text-gray-700">Your USB flash drive is ready</p>
              <p class="text-gray-500 text-xs mt-1">E: (SANDISK)</p>
              <div class="mt-6 flex justify-end"><button type="button" class="px-6 py-1.5 bg-[#0067b8] text-white text-sm" :class="ring(0)" @click="emit('choose', 0)">Finish</button></div>
            </template>
            <template v-else>
              <div class="space-y-1.5">
                <button v-for="(c, i) in screen.choices" :key="i" type="button" class="w-full flex items-start gap-2 text-left px-2 py-1.5 hover:bg-blue-50" :class="ring(i)" @click="emit('choose', i)">
                  <span class="mt-0.5 w-3.5 h-3.5 rounded-full border-2 border-gray-500 flex-shrink-0" :class="picked === i ? 'border-[#0067b8] bg-[#0067b8]' : ''"></span>
                  <span>{{ c.label }}</span>
                </button>
              </div>
              <div class="mt-4 flex justify-end"><span class="px-5 py-1.5 border border-gray-300 text-sm text-gray-400">Next</span></div>
            </template>
          </div>
        </div>
      </div>

      <!-- ===== the laptop at start-up, and its boot menu ===== -->
      <div v-else-if="family === 'bios'" class="absolute inset-0 p-4 sm:p-6 font-mono text-gray-200">
        <template v-if="screen.view === 'laptop-off'">
          <p class="text-center text-2xl sm:text-4xl font-bold tracking-widest text-white mt-[12%]">TUSOME</p>
          <p class="text-center text-gray-400 mt-2">F2: Setup · F12: Boot Menu</p>
          <div class="mt-6 sm:mt-10 flex flex-wrap justify-center gap-2 font-sans">
            <button v-for="(c, i) in screen.choices" :key="i" type="button" class="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm" :class="ring(i)" @click="emit('choose', i)">{{ c.label }}</button>
          </div>
        </template>
        <template v-else>
          <div class="mx-auto max-w-md border-2 border-gray-300 bg-[#00007a] p-0.5">
            <p class="bg-gray-300 text-[#00007a] text-center font-bold py-0.5">Boot Menu</p>
            <div class="p-2 space-y-1">
              <button v-for="(c, i) in screen.choices" :key="i" type="button" class="block w-full text-left px-2 py-1 text-white hover:bg-gray-300 hover:text-[#00007a]" :class="ring(i)" @click="emit('choose', i)">{{ i + 1 }}. {{ c.label }}</button>
            </div>
            <p class="text-gray-300 text-[10px] text-center pb-1">↑↓ to move · Enter to select · Esc to exit</p>
          </div>
        </template>
      </div>

      <!-- ===== Windows Setup ===== -->
      <div v-else-if="family === 'setup'" class="absolute inset-0 flex items-center justify-center p-3" style="background: linear-gradient(135deg, #3b1d6e, #1d3a8a 60%, #0f5b9a)">
        <div class="w-full max-w-xl bg-white text-gray-900 shadow-2xl">
          <div class="flex items-center gap-2 px-3 py-1.5 border-b border-gray-200 text-xs text-gray-700"><span class="w-3 h-3 grid grid-cols-2 gap-px"><i class="bg-sky-500"></i><i class="bg-sky-500"></i><i class="bg-sky-500"></i><i class="bg-sky-500"></i></span>Windows Setup</div>
          <div class="p-4 sm:p-6 min-h-[12rem]">
            <template v-if="screen.view === 'setup-progress'">
              <p class="text-base sm:text-xl text-[#1d3a8a] font-light mb-3">Installing Windows</p>
              <ul class="space-y-1">
                <li v-for="(s, i) in INSTALL_STAGES" :key="s" :class="installAt >= i + 1 ? 'text-emerald-700' : installAt > i ? 'font-semibold' : 'text-gray-400'">
                  {{ installAt >= i + 1 ? '✓' : '·' }} {{ s }}<template v-if="installAt > i && installAt < i + 1"> ({{ Math.round((installAt - i) * 100) }}%)</template>
                </li>
              </ul>
            </template>
            <template v-else-if="screen.view === 'setup-where'">
              <p class="text-base sm:text-lg text-[#1d3a8a] font-light mb-2">Where do you want to install Windows?</p>
              <div class="border border-gray-300">
                <div class="grid grid-cols-[1fr_auto_auto] gap-x-3 px-2 py-1 bg-gray-100 text-[10px] sm:text-xs text-gray-600"><span>Name</span><span>Total size</span><span>Type</span></div>
                <button v-for="(c, i) in screen.choices" :key="i" type="button" class="w-full grid grid-cols-[1fr_auto_auto] gap-x-3 px-2 py-1.5 text-left hover:bg-blue-50" :class="[picked === i ? 'bg-blue-100' : '', ring(i)]" @click="emit('choose', i)">
                  <span>💽 {{ c.label.split(' - ')[0] }}</span><span>{{ (c.label.split(' - ')[1] || '').replace(' → Next', '') }}</span><span>{{ i === 0 ? '' : 'Primary' }}</span>
                </button>
              </div>
              <p class="mt-2 text-[10px] sm:text-xs text-blue-700">Refresh · Delete · Format · New · Load driver</p>
            </template>
            <template v-else>
              <p class="text-base sm:text-lg text-[#1d3a8a] font-light mb-3">{{ SETUP_HEAD[screen.view] || screen.title }}</p>
              <div v-if="screen.view === 'setup-install'" class="flex flex-col items-center gap-3 py-2">
                <button v-for="(c, i) in screen.choices" :key="i" type="button" :class="[i === 0 ? 'px-8 py-2 border-2 border-gray-400 text-base hover:bg-gray-50' : 'text-xs text-blue-700 underline', ring(i)]" @click="emit('choose', i)">{{ c.label }}</button>
              </div>
              <div v-else class="space-y-1.5">
                <button v-for="(c, i) in screen.choices" :key="i" type="button" class="w-full text-left px-3 py-2 border border-gray-200 hover:bg-blue-50" :class="ring(i)" @click="emit('choose', i)">{{ c.label }}</button>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- ===== restarting ===== -->
      <div v-else-if="family === 'black'" class="absolute inset-0 flex flex-col items-center justify-center text-white">
        <div class="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        <p class="mt-3 text-sm">Restarting</p>
        <div class="mt-6 flex flex-wrap justify-center gap-2 px-4">
          <button v-for="(c, i) in screen.choices" :key="i" type="button" class="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs sm:text-sm" :class="ring(i)" @click="emit('choose', i)">{{ c.label }}</button>
        </div>
      </div>

      <!-- ===== first-time setup (OOBE) ===== -->
      <div v-else-if="family === 'oobe'" class="absolute inset-0 grid grid-cols-[2fr_3fr] text-white" style="background: linear-gradient(135deg, #0b2a5b, #1450a3)">
        <div class="flex items-center justify-center p-4"><div class="w-20 h-20 sm:w-28 sm:h-28 rounded-3xl bg-white/15 flex items-center justify-center text-4xl">🌍</div></div>
        <div class="p-4 sm:p-6 flex flex-col justify-center">
          <p class="text-lg sm:text-2xl font-semibold">Is this the right country or region?</p>
          <div class="mt-3 rounded bg-white/10 divide-y divide-white/10 text-sm">
            <p class="px-3 py-1.5 bg-white/20">Uganda</p><p class="px-3 py-1.5 opacity-70">Ukraine</p><p class="px-3 py-1.5 opacity-70">United Arab Emirates</p>
          </div>
          <button v-for="(c, i) in screen.choices" :key="i" type="button" class="mt-3 self-end px-4 py-1.5 rounded bg-[#0067b8] text-xs sm:text-sm" :class="ring(i)" @click="emit('choose', i)">{{ c.label }}</button>
        </div>
      </div>

      <!-- ===== Settings > Windows Update ===== -->
      <div v-else-if="family === 'settings'" class="absolute inset-0 flex bg-[#f3f3f3] text-gray-900">
        <div class="w-1/4 p-3 text-xs space-y-1.5 text-gray-600"><p class="font-semibold text-gray-900">Settings</p><p>System</p><p>Bluetooth & devices</p><p>Network & internet</p><p>Apps</p><p class="bg-white rounded px-1 font-semibold text-gray-900">Windows Update</p></div>
        <div class="flex-1 p-3 sm:p-5">
          <p class="text-lg sm:text-2xl font-semibold">Windows Update</p>
          <div class="mt-3 rounded-lg bg-white p-3 flex items-center gap-3"><span class="text-2xl">🔄</span><span class="flex-1"><b>Updates available</b><br><span class="text-xs text-gray-600">2024-10 Cumulative Update · Intel Wi-Fi driver · Realtek audio driver</span></span></div>
          <div class="mt-3 flex flex-wrap gap-2">
            <button v-for="(c, i) in screen.choices" :key="i" type="button" class="px-3 py-1.5 rounded text-xs sm:text-sm" :class="[i === 0 ? 'bg-[#0067b8] text-white' : 'bg-white border border-gray-300', ring(i)]" @click="emit('choose', i)">{{ c.label }}</button>
          </div>
        </div>
      </div>

      <!-- ===== the desktop ===== -->
      <div v-else class="absolute inset-0" style="background: radial-gradient(circle at 60% 40%, #6fb1ff, #1f5fbf 45%, #0b2a6b)">
        <div class="absolute inset-x-[12%] top-[14%] rounded-lg bg-white/95 text-gray-900 p-3 sm:p-4 shadow-xl">
          <p class="font-semibold">Settings › System › Activation</p>
          <p class="mt-1 text-xs sm:text-sm">Windows 11 Home</p>
          <p class="mt-1 text-xs sm:text-sm text-emerald-700 font-semibold">✓ Windows is activated with a digital licence</p>
          <button v-for="(c, i) in screen.choices" :key="i" type="button" class="mt-3 px-3 py-1.5 rounded bg-[#0067b8] text-white text-xs sm:text-sm" :class="ring(i)" @click="emit('choose', i)">{{ c.label }}</button>
        </div>
        <div class="absolute bottom-0 inset-x-0 h-8 bg-white/70 backdrop-blur flex items-center justify-center gap-2">
          <span v-for="n in 6" :key="n" class="w-5 h-5 rounded" :class="n === 1 ? 'bg-sky-500' : 'bg-gray-500/60'"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FlowScreen } from './laptopRepair'

const props = defineProps<{ screen: FlowScreen; picked: number | null; progress: number; showRight: boolean }>()
const emit = defineEmits<{ choose: [index: number] }>()

const family = computed(() => {
  const v = props.screen.view
  if (v === 'browser') return 'browser'
  if (v.startsWith('mct')) return 'mct'
  if (v === 'laptop-off' || v === 'boot-menu') return 'bios'
  if (v.startsWith('setup-restart')) return 'black'
  if (v.startsWith('setup')) return 'setup'
  if (v === 'oobe') return 'oobe'
  if (v === 'settings-update') return 'settings'
  return 'desktop'
})
const MCT_HEAD: Record<string, string> = {
  'mct-license': 'Applicable notices and license terms',
  'mct-what': 'What do you want to do?',
  'mct-lang': 'Select language, architecture, and edition',
  'mct-media': 'Choose which media to use',
  'mct-drive': 'Select a USB flash drive',
  'mct-progress': 'Downloading Windows 11',
  'mct-ready': 'Your USB flash drive is ready'
}
const SETUP_HEAD: Record<string, string> = {
  'setup-language': 'Language to install: English (United Kingdom) · Time and currency format: Uganda · Keyboard: US',
  'setup-install': 'Windows 11',
  'setup-key': 'Activate Windows',
  'setup-edition': 'Select the operating system you want to install',
  'setup-terms': 'Applicable notices and license terms',
  'setup-type': 'Which type of installation do you want?'
}
const INSTALL_STAGES = ['Copying Windows files', 'Getting files ready for installation', 'Installing features', 'Installing updates', 'Finishing up']
const installAt = computed(() => Math.min(1, props.progress) * INSTALL_STAGES.length)

/** After a choice: the right one green, a wrong pick red */
const ring = (i: number) => {
  if (props.picked === null) return ''
  const right = props.screen.choices?.[i]?.right
  if (i === props.picked) return right ? 'ring-4 ring-emerald-400' : 'ring-4 ring-rose-400'
  return props.showRight && right ? 'ring-4 ring-emerald-400' : ''
}
</script>
