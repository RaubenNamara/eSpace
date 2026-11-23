<template>
  <LabUnsupported v-if="unsupported" />
  <div v-else class="relative w-full h-full rounded-xl overflow-hidden bg-slate-200 select-none">
    <div ref="labHost" class="absolute inset-0" @pointerdown.capture="onPointerDown"></div>

    <div class="absolute right-2 top-2 sm:right-3 sm:top-3 w-[17.5rem] max-w-[calc(100%-1rem)] max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 space-y-2.5 text-xs">
      <div class="flex flex-wrap gap-1">
        <button v-for="f in funnelKeys" :key="f" type="button" @click="tab = f" class="px-2 py-1 rounded-lg font-semibold border" :class="tab === f ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600'">Funnel {{ funnelNo(f) }}</button>
        <button v-if="airEnabled" type="button" @click="tab = 'air'" class="px-2 py-1 rounded-lg font-semibold border" :class="tab === 'air' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600'">Air in soil</button>
        <button v-if="phEnabled" type="button" @click="tab = 'ph'" class="px-2 py-1 rounded-lg font-semibold border" :class="tab === 'ph' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600'">Soil pH</button>
      </div>

      <div class="flex gap-1 items-center">
        <span class="text-gray-500">Soil</span>
        <select v-model="soilChoice" class="flex-1 min-w-0 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-1.5 py-1">
          <option v-for="s in soils" :key="s.key" :value="s.key">{{ s.label }}</option>
        </select>
      </div>

      <!-- Drainage / water retention: funnel with filter paper on a measuring cylinder -->
      <template v-if="funnelKeys.includes(tab)">
        <p class="font-bold text-gray-800 dark:text-gray-100">Funnel {{ funnelNo(tab) }} <span class="font-normal text-gray-400">· {{ funnelState(tab).soil ? soilLabel(funnelState(tab).soil!) : 'filter paper, no soil yet' }}</span></p>
        <div class="flex flex-wrap gap-1">
          <LabButton size="sm" :disabled="readOnly || !!funnelState(tab).soil" @click="fillFunnel(tab)">Put soil in (half way)</LabButton>
          <LabButton size="sm" :disabled="readOnly || !funnelState(tab).soil || funnelState(tab).pouredAt !== null" @click="pourWater(tab)">Pour {{ waterCm3 }} cm³ water</LabButton>
          <LabButton size="sm" variant="ghost" :disabled="readOnly" @click="emptyFunnel(tab)">Empty</LabButton>
        </div>
        <div class="rounded-lg border border-gray-200 dark:border-gray-700 p-2 space-y-1">
          <p>Water in the cylinder: <b>{{ live(tab).vol }} cm³</b></p>
          <p>Time since pouring: <b>{{ live(tab).t }} s</b> <span v-if="live(tab).dripping" class="text-sky-600">· still dripping</span><span v-else-if="funnelState(tab).pouredAt !== null" class="text-emerald-600">· stopped dripping</span></p>
          <div class="flex flex-wrap gap-1 pt-1">
            <LabButton size="sm" variant="success" :disabled="readOnly || funnelState(tab).pouredAt === null" @click="readVolume(tab)">Read volume collected</LabButton>
            <LabButton size="sm" variant="success" :disabled="readOnly || live(tab).dripping || funnelState(tab).pouredAt === null" @click="readTime(tab)">Read time it stopped</LabButton>
          </div>
          <p class="text-[10px] text-gray-400">Time is speeded up: draining that takes about 40 minutes in a real lab takes under a minute here.</p>
        </div>
      </template>

      <!-- Air in soil: a + b - c -->
      <template v-else-if="tab === 'air'">
        <p class="font-bold text-gray-800 dark:text-gray-100">Volume of air in a soil</p>
        <div class="flex flex-wrap gap-1">
          <LabButton size="sm" :disabled="readOnly || !!air.soil" @click="airSoil">Soil to {{ airSoilCm3 }} cm³ &amp; tap</LabButton>
          <LabButton size="sm" :disabled="readOnly || air.water" @click="airWater">{{ airSoilCm3 }} cm³ water in 2nd cylinder</LabButton>
          <LabButton size="sm" :disabled="readOnly || !air.soil || !air.water || air.mixedAt !== null" @click="airMix">Pour water on soil &amp; stir</LabButton>
          <LabButton size="sm" variant="ghost" :disabled="readOnly" @click="airReset">Empty</LabButton>
        </div>
        <div class="rounded-lg border border-gray-200 dark:border-gray-700 p-2 space-y-1">
          <p v-if="air.mixedAt !== null && airBubbling" class="text-sky-600">Air bubbles are escaping from the soil...</p>
          <div class="flex flex-wrap gap-1">
            <LabButton size="sm" variant="success" :disabled="readOnly || !air.soil" @click="readAir('soil')">Read soil volume (a)</LabButton>
            <LabButton size="sm" variant="success" :disabled="readOnly || !air.water || air.mixedAt !== null" @click="readAir('water')">Read water volume (b)</LabButton>
            <LabButton size="sm" variant="success" :disabled="readOnly || air.mixedAt === null || airBubbling" @click="readAir('mix')">Read mixture volume (c)</LabButton>
          </div>
          <p class="text-[10px] text-gray-400">Volume of air = (a + b) - c</p>
        </div>
      </template>

      <!-- Soil pH with universal indicator -->
      <template v-else-if="tab === 'ph'">
        <p class="font-bold text-gray-800 dark:text-gray-100">Soil pH <span class="font-normal text-gray-400">· petri dish</span></p>
        <div class="flex flex-wrap gap-1">
          <LabButton size="sm" :disabled="readOnly || !!ph.soil" @click="phSoil">Put about 3 g of soil</LabButton>
          <LabButton size="sm" :disabled="readOnly || !ph.soil || ph.soakedAt !== null" @click="phSoak">Soak with universal indicator</LabButton>
          <LabButton size="sm" variant="ghost" :disabled="readOnly" @click="phReset">Clean dish</LabButton>
        </div>
        <div v-if="ph.soakedAt !== null" class="rounded-lg border border-gray-200 dark:border-gray-700 p-2 space-y-1.5">
          <p v-if="phWaiting" class="text-amber-700">Leave it for about 2 minutes...</p>
          <template v-else>
            <p>Tilt the dish so the indicator drains out. Which colour on the chart does it match?</p>
            <div class="flex flex-wrap gap-1">
              <button v-for="c in PH_CHART" :key="c.ph" type="button" :disabled="readOnly" @click="readPh(c.ph)" class="w-7 h-9 rounded-md border border-black/10 text-[10px] font-bold text-white/90 flex items-end justify-center pb-0.5" :style="{ background: c.color }" :title="`pH ${c.ph} (${c.name})`">{{ c.ph }}</button>
            </div>
          </template>
        </div>
      </template>
    </div>

    <button @click="room?.resetView()" class="absolute left-2 bottom-2 sm:left-3 sm:bottom-3 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/95 dark:bg-gray-800/95 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Reset View</button>
    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1" leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0">
      <div v-if="hint" class="absolute left-1/2 -translate-x-1/2 top-2 sm:top-3 bg-amber-500 text-white text-xs font-medium px-4 py-2 rounded-2xl shadow-lg text-center max-w-[min(26rem,calc(100%-20rem))]">{{ hint }}</div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import * as THREE from 'three'
import { canvasTexture } from './lab3d/labRoom'
import { useLabScene } from './lab3d/useLabScene'
import LabUnsupported from './lab3d/LabUnsupported.vue'
import LabButton from './ui/LabButton.vue'
import { SOILS, collected, stopsDrainingAt, airTest, indicatorColor, PH_CHART, type SoilType } from './soilEngine'
import type { SceneObjectConfig, LabObjectDef, LabAction } from '@/types/virtualLab'
import type { CameraView } from './VirtualLabScene.vue'

/**
 * Soil practicals on a real-looking bench (soilEngine.ts has the science).
 *
 * scene_objects it reads:
 *  - soil_sample props: { label, soil: 'sand'|'loam'|'clay', ph } - the soil samples
 *  - filter_funnel (keys funnel1..): funnel + filter paper on a measuring cylinder (drainage/retention)
 *  - measuring_cylinder props { air_test: true }: shows the air-in-soil test (props soil_cm3, default 50)
 *  - petri_dish props { ph_test: true }: shows the pH test
 *  - water_container props { cm3 }: water poured on each funnel (default 30)
 */
const props = defineProps<{
  sceneObjects: SceneObjectConfig[]
  objectCatalog: LabObjectDef[]
  connections?: { from: string; to: string }[]
  readOnly?: boolean
}>()
const emit = defineEmits<{
  action: [{ objectKey: string | null; action: LabAction; value: string | null; unit?: string | null; label?: string | null; targetObjectKey?: string | null }]
}>()

const soils = computed(() => props.sceneObjects.filter(o => o.object_type === 'soil_sample').map(o => ({
  key: o.key, label: o.props?.label ?? 'Soil sample', soil: (o.props?.soil ?? 'loam') as SoilType, ph: Number(o.props?.ph ?? 6.5),
})))
const funnelKeys = computed(() => props.sceneObjects.filter(o => o.object_type === 'filter_funnel').map(o => o.key))
const airCfg = computed(() => props.sceneObjects.find(o => o.object_type === 'measuring_cylinder' && o.props?.air_test))
const phCfg = computed(() => props.sceneObjects.find(o => o.object_type === 'petri_dish' && o.props?.ph_test))
const airEnabled = computed(() => !!airCfg.value)
const phEnabled = computed(() => !!phCfg.value)
const waterCm3 = computed(() => Number(props.sceneObjects.find(o => o.object_type === 'water_container')?.props?.cm3 ?? 30))
const airSoilCm3 = computed(() => Number(airCfg.value?.props?.soil_cm3 ?? 50))
const funnelNo = (k: string) => k.replace(/^funnel/i, '')
const soilOf = (key: string) => soils.value.find(s => s.key === key)
const soilLabel = (key: string) => soilOf(key)?.label ?? key

const tab = ref<string>('')
const soilChoice = ref('')
const hint = ref<string | null>(null)
function flash(text: string, ms = 4000) { hint.value = text; setTimeout(() => { if (hint.value === text) hint.value = null }, ms) }

// Real time drives draining, bubbling and the indicator soaking; `now` re-renders the panel a few times a second
const now = ref(0)
let clock = 0

// --- Drainage / retention --------------------------------------------------------------------------
const funnels = reactive<Record<string, { soil: string | null; pouredAt: number | null }>>({})
const funnelState = (k: string) => (funnels[k] ??= { soil: null, pouredAt: null })
function live(k: string) {
  void now.value
  const f = funnelState(k)
  const s = f.soil ? soilOf(f.soil) : null
  if (!s || f.pouredAt === null) return { vol: 0, t: 0, dripping: false }
  const t = clock - f.pouredAt
  return { vol: collected(s.soil, waterCm3.value, t), t: Math.round(t), dripping: t < stopsDrainingAt(s.soil, waterCm3.value) }
}
function fillFunnel(k: string) {
  if (!soilChoice.value) return
  funnelState(k).soil = soilChoice.value
  emit('action', { objectKey: k, action: 'pour', value: soilChoice.value })
}
function pourWater(k: string) {
  funnelState(k).pouredAt = clock
  emit('action', { objectKey: k, action: 'pour', value: 'water' })
}
function emptyFunnel(k: string) { funnels[k] = { soil: null, pouredAt: null } }
function readVolume(k: string) {
  const f = funnelState(k)
  emit('action', { objectKey: k, action: 'measure', value: String(live(k).vol), unit: 'cm³', label: `Water collected - ${soilLabel(f.soil!)}`, targetObjectKey: f.soil })
}
function readTime(k: string) {
  const f = funnelState(k)
  const s = soilOf(f.soil!)!
  emit('action', { objectKey: k, action: 'measure', value: String(stopsDrainingAt(s.soil, waterCm3.value)), unit: 's', label: `Time to stop draining - ${s.label}`, targetObjectKey: f.soil })
}

// --- Air in soil --------------------------------------------------------------------------------------
const AIR_KEY = computed(() => airCfg.value?.key ?? 'cylinder1')
const air = reactive<{ soil: string | null; water: boolean; mixedAt: number | null }>({ soil: null, water: false, mixedAt: null })
const airBubbling = computed(() => { void now.value; return air.mixedAt !== null && clock - air.mixedAt < 6 })
function airSoil() { if (!soilChoice.value) return; air.soil = soilChoice.value; emit('action', { objectKey: AIR_KEY.value, action: 'pour', value: soilChoice.value }) }
function airWater() { air.water = true; emit('action', { objectKey: AIR_KEY.value, action: 'pour', value: 'water' }) }
function airMix() { air.mixedAt = clock; emit('action', { objectKey: AIR_KEY.value, action: 'pour', value: 'water_onto_soil' }) }
function airReset() { air.soil = null; air.water = false; air.mixedAt = null }
function readAir(which: 'soil' | 'water' | 'mix') {
  const s = soilOf(air.soil ?? '')
  const a = airSoilCm3.value, b = airSoilCm3.value
  const value = which === 'soil' ? a : which === 'water' ? b : airTest(s!.soil, a, b).c
  const label = which === 'soil' ? `Volume of soil (a) - ${s?.label ?? ''}` : which === 'water' ? 'Volume of water (b)' : `Volume of mixture (c) - ${s!.label}`
  emit('action', { objectKey: AIR_KEY.value, action: 'measure', value: String(value), unit: 'cm³', label, targetObjectKey: air.soil })
}

// --- Soil pH ------------------------------------------------------------------------------------------
const PH_KEY = computed(() => phCfg.value?.key ?? 'dish1')
const ph = reactive<{ soil: string | null; soakedAt: number | null }>({ soil: null, soakedAt: null })
const phWaiting = computed(() => { void now.value; return ph.soakedAt !== null && clock - ph.soakedAt < 4 })
function phSoil() { if (!soilChoice.value) return; ph.soil = soilChoice.value; emit('action', { objectKey: PH_KEY.value, action: 'pour', value: soilChoice.value }) }
function phSoak() { ph.soakedAt = clock; emit('action', { objectKey: PH_KEY.value, action: 'pour', value: 'universal' }) }
function phReset() { ph.soil = null; ph.soakedAt = null }
function readPh(value: number) {
  const s = soilOf(ph.soil ?? '')
  emit('action', { objectKey: PH_KEY.value, action: 'measure', value: String(value), unit: '', label: `pH of ${s?.label ?? 'soil'} (universal indicator)`, targetObjectKey: ph.soil })
}

// --- 3D bench (metres, bench top y = 0) ---------------------------------------------------------------
function glass(opacity = 0.22) {
  return new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity, roughness: 0.05, depthWrite: false, side: THREE.DoubleSide })
}
function tag(text: string, w = 0.06, h = 0.016) {
  const tex = canvasTexture(256, 72, (ctx, cw, ch) => {
    ctx.fillStyle = '#fffbeb'; ctx.fillRect(0, 0, cw, ch)
    ctx.fillStyle = '#111827'; ctx.font = 'bold 30px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText(text, cw / 2, ch / 2)
  })
  return new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, transparent: true }))
}
/** A 100 cm³ measuring cylinder: 0.2 m tall, water shown by `setLevel(cm3)` */
function cylinder() {
  const g = new THREE.Group()
  const R = 0.016, H = 0.2
  const wall = new THREE.Mesh(new THREE.CylinderGeometry(R, R, H, 24, 1, true), glass()); wall.position.y = H / 2 + 0.006
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.028, 0.006, 6), glass(0.5)); base.position.y = 0.003
  const ticks = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.01, R * 1.01, H * 0.9, 24, 1, true, -0.5, 1), new THREE.MeshBasicMaterial({
    map: canvasTexture(64, 512, (ctx, w, h) => {
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#1f2937'
      for (let i = 0; i <= 50; i++) { const y = h - (i / 50) * h; ctx.fillRect(0, y - 1, i % 5 === 0 ? 34 : 18, 2) }
    }), transparent: true, depthWrite: false,
  }))
  ticks.position.y = H * 0.45 + 0.006
  const water = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.93, R * 0.93, 1, 24), new THREE.MeshStandardMaterial({ color: 0x9fd3ec, transparent: true, opacity: 0.6 }))
  water.visible = false
  g.add(wall, base, ticks, water)
  const perCm3 = (H * 0.9) / 100
  return {
    group: g,
    setLevel(cm3: number, color = 0x9fd3ec) {
      const h = Math.max(0, cm3 * perCm3)
      water.visible = h > 0.0005
      water.scale.y = Math.max(h, 0.0001)
      water.position.y = 0.006 + h / 2
      ;(water.material as THREE.MeshStandardMaterial).color.set(color)
    },
  }
}
interface FunnelMesh { soil: THREE.Mesh; drip: THREE.Mesh; cyl: ReturnType<typeof cylinder>; water: THREE.Mesh }
const funnelMeshes = new Map<string, FunnelMesh>()
let airSoilCyl: ReturnType<typeof cylinder> | null = null
let airWaterCyl: ReturnType<typeof cylinder> | null = null
let airSoilFill: THREE.Mesh | null = null
let airBubbles: THREE.Group | null = null
let dishSoil: THREE.Mesh | null = null
let dishLiquid: THREE.Mesh | null = null

function buildBench(scene: THREE.Object3D) {
  // Drainage set-ups: funnel + filter paper cone, standing in a measuring cylinder
  funnelKeys.value.forEach((k, i) => {
    const x = -0.28 + i * 0.12
    const cyl = cylinder()
    cyl.group.position.set(x, 0, 0)
    scene.add(cyl.group)
    const funnel = new THREE.Group()
    const cone = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.006, 0.05, 32, 1, true), glass(0.3)); cone.position.y = 0.025
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.003, 0.04, 12, 1, true), glass(0.3)); stem.position.y = -0.02
    const paper = new THREE.Mesh(new THREE.ConeGeometry(0.034, 0.042, 32, 1, true), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95, side: THREE.DoubleSide }))
    paper.rotation.x = Math.PI; paper.position.y = 0.028
    const soil = new THREE.Mesh(new THREE.ConeGeometry(0.026, 0.024, 32), new THREE.MeshStandardMaterial({ color: 0x5b4127, roughness: 1 }))
    soil.rotation.x = Math.PI; soil.position.y = 0.022; soil.visible = false
    const water = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.004, 24), new THREE.MeshStandardMaterial({ color: 0x7cb5d6, transparent: true, opacity: 0.65 }))
    water.position.y = 0.038; water.visible = false
    const drip = new THREE.Mesh(new THREE.SphereGeometry(0.002, 8, 8), new THREE.MeshStandardMaterial({ color: 0x9fd3ec, transparent: true, opacity: 0.8 }))
    drip.visible = false
    funnel.add(cone, stem, paper, soil, water, drip)
    funnel.position.set(x, 0.24, 0)
    scene.add(funnel)
    const t = tag(`Funnel ${funnelNo(k)}`, 0.05, 0.014); t.position.set(x, 0.3, 0.03); scene.add(t)
    funnelMeshes.set(k, { soil, drip, cyl, water })
  })

  // Air-in-soil cylinders
  if (airEnabled.value) {
    airSoilCyl = cylinder(); airSoilCyl.group.position.set(0.14, 0, 0.02); scene.add(airSoilCyl.group)
    airWaterCyl = cylinder(); airWaterCyl.group.position.set(0.2, 0, 0.02); scene.add(airWaterCyl.group)
    airSoilFill = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 1, 24), new THREE.MeshStandardMaterial({ color: 0x5b4127, roughness: 1 }))
    airSoilFill.visible = false
    airSoilCyl.group.add(airSoilFill)
    airBubbles = new THREE.Group()
    for (let i = 0; i < 18; i++) {
      const b = new THREE.Mesh(new THREE.SphereGeometry(0.0016, 8, 6), new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 }))
      b.position.set((Math.random() - 0.5) * 0.02, Math.random() * 0.1, (Math.random() - 0.5) * 0.02)
      b.userData.v = 0.03 + Math.random() * 0.04
      airBubbles.add(b)
    }
    airBubbles.visible = false
    airSoilCyl.group.add(airBubbles)
    const t = tag('Air in soil', 0.06, 0.014); t.position.set(0.17, 0.23, 0.04); scene.add(t)
  }

  // pH: petri dish and the indicator colour chart
  if (phEnabled.value) {
    const dish = new THREE.Group()
    const bottom = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.012, 40, 1, true), glass(0.3)); bottom.position.y = 0.006
    const floor = new THREE.Mesh(new THREE.CircleGeometry(0.045, 40), glass(0.3)); floor.rotation.x = -Math.PI / 2; floor.position.y = 0.001
    dishSoil = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.032, 0.006, 32), new THREE.MeshStandardMaterial({ color: 0x5b4127, roughness: 1 }))
    dishSoil.position.y = 0.004; dishSoil.visible = false
    dishLiquid = new THREE.Mesh(new THREE.CylinderGeometry(0.043, 0.043, 0.004, 40), new THREE.MeshStandardMaterial({ color: 0x22c55e, transparent: true, opacity: 0.55 }))
    dishLiquid.position.y = 0.006; dishLiquid.visible = false
    dish.add(bottom, floor, dishSoil, dishLiquid)
    dish.position.set(0.3, 0, 0.12)
    scene.add(dish)
    const chart = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.035), new THREE.MeshBasicMaterial({
      map: canvasTexture(512, 112, (ctx, w, h) => {
        ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, w, h)
        PH_CHART.forEach((c, i) => {
          const cw = w / PH_CHART.length
          ctx.fillStyle = c.color; ctx.fillRect(i * cw + 3, 6, cw - 6, h * 0.6)
          ctx.fillStyle = '#111827'; ctx.font = 'bold 24px Arial'; ctx.textAlign = 'center'; ctx.fillText(String(c.ph), i * cw + cw / 2, h - 12)
        })
      }),
    }))
    chart.rotation.x = -Math.PI / 2.4
    chart.position.set(0.3, 0.02, 0.22)
    scene.add(chart)
  }

  // Soil sample pots on the left
  soils.value.forEach((s, i) => {
    const pot = new THREE.Group()
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.026, 0.04, 28, 1, true), new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4, side: THREE.DoubleSide }))
    cup.position.y = 0.02
    const fill = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.026, 0.03, 28), new THREE.MeshStandardMaterial({ color: SOILS[s.soil].color, roughness: 1 }))
    fill.position.y = 0.016
    pot.add(cup, fill)
    pot.position.set(-0.46, 0, -0.06 + i * 0.075)
    scene.add(pot)
    const t = tag(s.label, 0.05, 0.014); t.position.set(-0.46, 0.055, -0.03 + i * 0.075); scene.add(t)
  })
}

function frame(dt: number) {
  clock += dt
  now.value = Math.floor(clock * 4)
  funnelMeshes.forEach((m, k) => {
    const f = funnelState(k)
    const s = f.soil ? soilOf(f.soil) : null
    m.soil.visible = !!s
    if (s) (m.soil.material as THREE.MeshStandardMaterial).color.set(SOILS[s.soil].color)
    const l = live(k)
    m.cyl.setLevel(l.vol)
    // Water sitting on top of the soil while it soaks in, a drip falling from the stem while it drains
    m.water.visible = !!s && f.pouredAt !== null && l.t < (s ? SOILS[s.soil].tau * 1.2 : 0)
    m.drip.visible = l.dripping
    if (l.dripping) {
      const p = ((clock * (s && s.soil === 'clay' ? 0.8 : 2.5)) % 1)
      m.drip.position.set(0, -0.045 - p * 0.04, 0)
    }
  })
  if (airSoilCyl && airWaterCyl && airSoilFill && airBubbles) {
    const a = airSoilCm3.value
    const s = air.soil ? soilOf(air.soil) : null
    const perCm3 = (0.2 * 0.9) / 100
    airSoilFill.visible = !!s
    if (s) {
      airSoilFill.scale.y = a * perCm3
      airSoilFill.position.y = 0.006 + (a * perCm3) / 2
      ;(airSoilFill.material as THREE.MeshStandardMaterial).color.set(SOILS[s.soil].color)
    }
    if (air.mixedAt === null) {
      airWaterCyl.setLevel(air.water ? a : 0)
      airSoilCyl.setLevel(0)
    } else {
      airWaterCyl.setLevel(0)
      const res = s ? airTest(s.soil, a, a) : { c: a * 2 }
      const f = Math.min(1, (clock - air.mixedAt) / 6)
      airSoilCyl.setLevel(2 * a - (2 * a - res.c) * f, 0x6b5640)
    }
    airBubbles.visible = airBubbling.value
    airBubbles.children.forEach((b) => { b.position.y += b.userData.v * dt; if (b.position.y > 0.17) b.position.y = 0.01 })
  }
  if (dishSoil && dishLiquid) {
    const s = ph.soil ? soilOf(ph.soil) : null
    dishSoil.visible = !!s
    if (s) (dishSoil.material as THREE.MeshStandardMaterial).color.set(SOILS[s.soil].color)
    dishLiquid.visible = !!s && ph.soakedAt !== null
    if (s && ph.soakedAt !== null) {
      // Green at first, turning to the soil's colour as the indicator soaks in
      const f = Math.min(1, (clock - ph.soakedAt) / 4)
      ;(dishLiquid.material as THREE.MeshStandardMaterial).color.set(indicatorColor(7)).lerp(new THREE.Color(indicatorColor(s.ph)), f)
    }
  }
}

function onPointerDown(ev: PointerEvent) { handleFurnitureClick(ev) }

const HOME_POS: THREE.Vector3Tuple = [0.02, 0.55, 1.15]
const HOME_TARGET: THREE.Vector3Tuple = [0.04, 0.1, 0.0]
const { room, unsupported, handleFurnitureClick } = useLabScene(
  { cameraPosition: HOME_POS, target: HOME_TARGET, minDistance: 0.2, maxDistance: 12, cupboard: true, wallCabinets: true, shelfCatalog: () => props.objectCatalog, benchLength: 3 },
  (r) => {
    buildBench(r.scene)
    r.onFrame(frame)
    tab.value = funnelKeys.value[0] ?? (airEnabled.value ? 'air' : 'ph')
    soilChoice.value = soils.value[0]?.key ?? ''
    if (!props.readOnly) flash('Choose a soil, then follow the steps: fill, pour, wait, read.')
  },
)

function setObjectState() {}
function goToView(view: CameraView) {
  const r = room.value
  if (!r) return
  if (view === 'bench') r.flyTo(new THREE.Vector3(...HOME_POS), new THREE.Vector3(...HOME_TARGET))
  else if (view === 'entrance') r.flyTo(new THREE.Vector3(2.4, 0.95, 2.4), new THREE.Vector3(0, 0.25, 7))
  else if (view === 'left') r.flyTo(new THREE.Vector3(-1.2, 1.0, 1.6), new THREE.Vector3(-7, 0.45, 1.6))
  else r.flyTo(new THREE.Vector3(1.2, 1.0, 1.6), new THREE.Vector3(7, 0.45, 1.6))
}
defineExpose({ setObjectState, goToView })
</script>
