<template>
  <!-- The open system unit (side panel off) shared by the ICT Lab's computer activities: the case
       and drive bays, and each part drawn in place. `show` picks which parts are in the case (all
       of them when left out); `attrs` lets the activity make a part tappable, glow and so on.
       Anything an activity adds on top - outlines of empty places, cables, ticks - goes in the
       default slot, in the same coordinates (480 x 520). -->
  <svg viewBox="0 0 480 520" class="w-full max-h-[62vh] select-none" role="group" aria-label="Inside a computer system unit">
    <defs>
      <pattern id="pc-grille" width="8" height="8" patternUnits="userSpaceOnUse">
        <circle cx="4" cy="4" r="1.6" fill="#0f172a" />
      </pattern>
      <pattern id="pc-fins" width="6" height="10" patternUnits="userSpaceOnUse">
        <rect width="3" height="10" fill="#cbd5e1" /><rect x="3" width="3" height="10" fill="#94a3b8" />
      </pattern>
      <pattern id="pc-traces" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M0 6h10v12h14M6 0v4M18 24v-6" stroke="#22c55e" stroke-opacity=".25" fill="none" stroke-width="1" />
      </pattern>
    </defs>

    <!-- The case -->
    <rect x="6" y="6" width="468" height="508" rx="18" fill="#0f172a" />
    <rect x="18" y="18" width="444" height="484" rx="10" fill="#1e293b" />
    <text x="28" y="496" fill="#64748b" font-size="11" font-weight="600">FRONT</text>
    <text x="452" y="496" fill="#64748b" font-size="11" font-weight="600" text-anchor="end">BACK</text>

    <!-- Drive bays (front) -->
    <rect x="28" y="28" width="134" height="330" rx="6" fill="#334155" />

    <g v-if="has('optical')" v-bind="attrsOf('optical')" @click="emit('tap', 'optical')" @keydown.enter="emit('tap', 'optical')">
      <rect x="36" y="40" width="118" height="38" rx="4" fill="#0b1220" />
      <rect x="46" y="57" width="80" height="4" rx="2" fill="#475569" />
      <circle cx="140" cy="59" r="4" fill="#475569" />
    </g>

    <g v-if="has('hdd')" v-bind="attrsOf('hdd')" @click="emit('tap', 'hdd')" @keydown.enter="emit('tap', 'hdd')">
      <rect x="36" y="196" width="118" height="74" rx="5" fill="#9ca3af" />
      <rect x="44" y="204" width="102" height="58" rx="3" fill="#cbd5e1" />
      <circle cx="95" cy="233" r="20" fill="#94a3b8" /><circle cx="95" cy="233" r="5" fill="#64748b" />
      <text x="50" y="258" font-size="8" fill="#475569" font-weight="700">HDD 1TB</text>
    </g>

    <g v-if="has('ssd')" v-bind="attrsOf('ssd')" @click="emit('tap', 'ssd')" @keydown.enter="emit('tap', 'ssd')">
      <rect x="46" y="292" width="98" height="40" rx="4" fill="#1e3a8a" />
      <text x="95" y="316" font-size="10" fill="#bfdbfe" font-weight="700" text-anchor="middle">SSD</text>
    </g>

    <!-- Power supply (top) -->
    <g v-if="has('psu')" v-bind="attrsOf('psu')" @click="emit('tap', 'psu')" @keydown.enter="emit('tap', 'psu')">
      <rect x="176" y="28" width="276" height="88" rx="6" fill="#4b5563" />
      <circle cx="396" cy="72" r="32" fill="url(#pc-grille)" stroke="#374151" stroke-width="3" />
      <rect x="190" y="44" width="120" height="16" rx="3" fill="#374151" />
      <text x="198" y="56" font-size="9" fill="#e5e7eb" font-weight="700">ATX 500W</text>
      <path d="M198 80h90M198 92h70" stroke="#6b7280" stroke-width="3" stroke-linecap="round" />
    </g>

    <!-- Motherboard -->
    <g v-if="has('motherboard')" v-bind="attrsOf('motherboard')" @click="emit('tap', 'motherboard')" @keydown.enter="emit('tap', 'motherboard')">
      <rect x="176" y="126" width="222" height="340" rx="5" fill="#14532d" />
      <rect x="176" y="126" width="222" height="340" rx="5" fill="url(#pc-traces)" />
      <rect x="318" y="398" width="34" height="34" rx="3" fill="#0f172a" />
      <rect x="190" y="440" width="70" height="10" rx="2" fill="#0f172a" />
      <rect x="196" y="262" width="22" height="12" rx="2" fill="#0f172a" />
    </g>

    <!-- Processor in its socket -->
    <g v-if="has('cpu')" v-bind="attrsOf('cpu')" @click="emit('tap', 'cpu')" @keydown.enter="emit('tap', 'cpu')">
      <rect x="194" y="146" width="62" height="62" rx="4" fill="#e2e8f0" />
      <rect x="204" y="156" width="42" height="42" rx="3" fill="#a16207" />
      <rect x="210" y="162" width="30" height="30" rx="2" fill="#ca8a04" />
      <path d="M204 198v-7l7 7z" fill="#fde68a" />
      <text x="225" y="181" font-size="8" fill="#fef3c7" font-weight="800" text-anchor="middle">CPU</text>
    </g>

    <!-- CPU cooler beside it (lifted off for the lesson) -->
    <g v-if="has('cooler')" v-bind="attrsOf('cooler')" @click="emit('tap', 'cooler')" @keydown.enter="emit('tap', 'cooler')">
      <rect x="264" y="140" width="76" height="76" rx="5" fill="url(#pc-fins)" />
      <circle cx="302" cy="178" r="30" fill="#0f172a" />
      <g :class="{ 'pc-fan-blades': spinning }">
        <path d="M302 178l0 -24a12 12 0 0 1 10 14zM302 178l24 0a12 12 0 0 1 -14 10zM302 178l0 24a12 12 0 0 1 -10 -14zM302 178l-24 0a12 12 0 0 1 14 -10z" fill="#475569" />
      </g>
      <circle cx="302" cy="178" r="6" fill="#94a3b8" />
    </g>

    <!-- Memory sticks -->
    <g v-if="has('ram')" v-bind="attrsOf('ram')" @click="emit('tap', 'ram')" @keydown.enter="emit('tap', 'ram')">
      <rect x="350" y="136" width="13" height="128" rx="2" fill="#1d4ed8" />
      <rect x="368" y="136" width="13" height="128" rx="2" fill="#1d4ed8" />
      <rect v-for="i in 5" :key="'r' + i" x="352" :y="142 + (i - 1) * 24" width="9" height="16" rx="1" fill="#0f172a" />
      <rect v-for="i in 5" :key="'s' + i" x="370" :y="142 + (i - 1) * 24" width="9" height="16" rx="1" fill="#0f172a" />
    </g>

    <!-- Graphics card -->
    <g v-if="has('gpu')" v-bind="attrsOf('gpu')" @click="emit('tap', 'gpu')" @keydown.enter="emit('tap', 'gpu')">
      <rect x="186" y="300" width="214" height="50" rx="6" fill="#0b1220" />
      <circle cx="244" cy="325" r="19" fill="#1f2937" stroke="#334155" stroke-width="2" />
      <circle cx="336" cy="325" r="19" fill="#1f2937" stroke="#334155" stroke-width="2" />
      <circle cx="244" cy="325" r="5" fill="#475569" /><circle cx="336" cy="325" r="5" fill="#475569" />
      <rect x="186" y="350" width="120" height="6" fill="#ca8a04" />
    </g>

    <!-- CMOS battery -->
    <g v-if="has('cmos')" v-bind="attrsOf('cmos')" @click="emit('tap', 'cmos')" @keydown.enter="emit('tap', 'cmos')">
      <circle cx="222" cy="404" r="15" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2" />
      <text x="222" y="408" font-size="9" fill="#475569" font-weight="800" text-anchor="middle">3V</text>
    </g>

    <!-- SATA data cables from the drives -->
    <g v-if="has('sata')" v-bind="attrsOf('sata')" @click="emit('tap', 'sata')" @keydown.enter="emit('tap', 'sata')">
      <path d="M154 238 C 176 238, 176 268, 200 268" stroke="#dc2626" stroke-width="6" fill="none" stroke-linecap="round" />
      <path v-if="has('ssd')" d="M144 312 C 178 312, 172 272, 204 270" stroke="#dc2626" stroke-width="6" fill="none" stroke-linecap="round" />
      <path d="M154 238 C 176 238, 176 268, 200 268M144 312 C 178 312, 172 272, 204 270" stroke="transparent" stroke-width="18" fill="none" />
    </g>

    <!-- Back-panel ports -->
    <g v-if="has('ports')" v-bind="attrsOf('ports')" @click="emit('tap', 'ports')" @keydown.enter="emit('tap', 'ports')">
      <rect x="404" y="128" width="44" height="122" rx="4" fill="#475569" />
      <rect x="412" y="138" width="28" height="10" rx="2" fill="#1e293b" />
      <rect x="412" y="154" width="28" height="10" rx="2" fill="#1e293b" />
      <rect x="414" y="172" width="24" height="22" rx="2" fill="#0f172a" />
      <rect x="420" y="190" width="12" height="4" fill="#facc15" />
      <circle cx="418" cy="214" r="5" fill="#22c55e" /><circle cx="434" cy="214" r="5" fill="#ec4899" />
      <rect x="412" y="228" width="28" height="12" rx="2" fill="#1d4ed8" />
    </g>

    <!-- Rear case fan -->
    <g v-if="has('casefan')" v-bind="attrsOf('casefan')" @click="emit('tap', 'casefan')" @keydown.enter="emit('tap', 'casefan')">
      <rect x="406" y="270" width="48" height="88" rx="6" fill="#0f172a" />
      <circle cx="430" cy="314" r="20" fill="#1f2937" />
      <g :class="{ 'pc-fan-blades pc-fan-slow': spinning }">
        <path d="M430 314l0 -16a8 8 0 0 1 7 9zM430 314l16 0a8 8 0 0 1 -9 7zM430 314l0 16a8 8 0 0 1 -7 -9zM430 314l-16 0a8 8 0 0 1 9 -7z" fill="#64748b" />
      </g>
    </g>

    <slot />
  </svg>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  // The parts in the case; every part when left out
  show?: string[] | null
  // Extra attributes for a part (classes, role, tabindex, aria-label)
  attrs?: ((key: string) => Record<string, unknown>) | null
  // Fans turning
  spinning?: boolean
}>(), { show: null, attrs: null, spinning: true })
const emit = defineEmits<{ tap: [key: string] }>()

const has = (key: string) => !props.show || props.show.includes(key)
const attrsOf = (key: string) => (props.attrs ? props.attrs(key) : {})
</script>

<style scoped>
/* Parts an activity makes tappable, and the one a step asks for */
.pc-part {
  cursor: pointer;
  transition: filter 0.2s ease;
  outline: none;
}
.pc-part:hover,
.pc-part:focus-visible {
  filter: brightness(1.25) drop-shadow(0 0 4px rgba(250, 204, 21, 0.6));
}
.pc-glow {
  animation: pc-glow 1.4s ease-in-out infinite;
}
@keyframes pc-glow {
  0%, 100% { filter: drop-shadow(0 0 2px rgba(250, 204, 21, 0.6)) brightness(1.05); }
  50% { filter: drop-shadow(0 0 12px rgba(250, 204, 21, 1)) brightness(1.35); }
}
.pc-fan-blades {
  transform-box: fill-box;
  transform-origin: center;
  animation: pc-spin 0.9s linear infinite;
}
.pc-fan-slow {
  animation-duration: 1.6s;
}
@keyframes pc-spin {
  to { transform: rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  .pc-fan-blades, .pc-glow { animation: none; }
  .pc-glow { filter: drop-shadow(0 0 8px rgba(250, 204, 21, 1)); }
}
</style>
