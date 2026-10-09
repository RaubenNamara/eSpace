<template>
  <VirtualLabPracticalBrief
    :introduction="introduction"
    :aim="objective || 'To determine the focal length of a concave mirror.'"
    hypothesis="For every object distance u and image distance v, uv = f(u + v), so a graph of uv against (u + v) is a straight line through the origin whose gradient is the focal length f."
    hypothesis-note="This is a prediction to test. Your own readings and graph decide whether the points lie on a straight line, and what f is."
    :variables="{
      independent: 'Object distance, u (cross-wire to mirror)',
      dependent: 'Image distance, v (screen to mirror)',
      controlled: 'The same concave mirror, the same illuminated cross-wire, and the same sharpness test for the image',
      note: 'Measure both distances to the pole (centre) of the mirror, and keep the cross-wire, mirror and screen in line, all at the same height.',
    }"
    :apparatus="APPARATUS"
    :setup-points="SETUP_POINTS"
    :procedure="PROCEDURE"
  >
    <template #diagram>
      <svg viewBox="0 0 520 260" class="w-full h-auto rounded-xl bg-white border border-gray-200 dark:border-gray-700" role="img" aria-label="Set-up: illuminated cross-wire, screen and concave mirror along a metre rule, with u measured from the cross-wire and v from the screen to the mirror">
        <!-- bench axis -->
        <line x1="20" y1="130" x2="470" y2="130" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="6 4" />
        <!-- lamp box, bulb and cross-wire (the object O) -->
        <rect x="30" y="100" width="44" height="60" rx="5" fill="#1f2937" />
        <rect x="74" y="122" width="10" height="16" fill="#d4a84b" />
        <circle cx="92" cy="130" r="9" fill="#fde68a" stroke="#f59e0b" stroke-width="1.5" />
        <circle cx="110" cy="130" r="12" fill="none" stroke="#b45309" stroke-width="3" />
        <path d="M110 118 V142 M98 130 H122" stroke="#111827" stroke-width="2" />
        <line x1="110" y1="142" x2="110" y2="168" stroke="#b45309" stroke-width="3" />
        <!-- light from the lamp to the mirror -->
        <path d="M118 126 L428 100 L428 160 L118 134 Z" fill="#fde68a" opacity="0.35" />
        <!-- screen, beside the object line -->
        <rect x="236" y="74" width="8" height="46" fill="#e8c9a0" stroke="#a16207" stroke-width="1.5" />
        <line x1="240" y1="120" x2="240" y2="168" stroke="#64748b" stroke-width="3" />
        <!-- concave mirror facing the object -->
        <path d="M444 88 Q420 130 444 172" fill="none" stroke="#475569" stroke-width="7" stroke-linecap="round" />
        <path d="M439 92 Q417 130 439 168" fill="none" stroke="#cbd5e1" stroke-width="2.5" />
        <line x1="448" y1="130" x2="448" y2="168" stroke="#64748b" stroke-width="3" />
        <!-- reflected rays meeting on the screen -->
        <path d="M428 104 L244 97 M428 156 L244 97" stroke="#dc2626" stroke-width="1.4" fill="none" />
        <!-- metre rule -->
        <rect x="104" y="174" width="350" height="16" rx="2" fill="#f2d39a" stroke="#c8955a" />
        <g stroke="#1f2937" stroke-width="1"><line v-for="i in 36" :key="i" :x1="110 + (i - 1) * 9.6" y1="174" :x2="110 + (i - 1) * 9.6" :y2="(i - 1) % 5 === 0 ? 184 : 180" /></g>
        <!-- u and v -->
        <g fill="#2563eb"><path d="M110 212 l8 -4 v8 z M430 212 l-8 -4 v8 z" /></g>
        <line x1="114" y1="212" x2="426" y2="212" stroke="#2563eb" stroke-width="1.5" />
        <g fill="#16a34a"><path d="M240 232 l8 -4 v8 z M430 232 l-8 -4 v8 z" /></g>
        <line x1="244" y1="232" x2="426" y2="232" stroke="#16a34a" stroke-width="1.5" />
        <g font-family="sans-serif" font-weight="700" text-anchor="middle">
          <text x="150" y="207" font-size="13" fill="#2563eb">u</text>
          <text x="335" y="250" font-size="13" fill="#16a34a">v</text>
          <text x="52" y="92" font-size="11" fill="#0f172a">lamp</text>
          <text x="110" y="110" font-size="11" fill="#0f172a">O</text>
          <text x="240" y="66" font-size="11" fill="#0f172a">screen</text>
          <text x="444" y="78" font-size="11" fill="#0f172a">concave mirror</text>
          <text x="280" y="202" font-size="9" font-weight="500" fill="#64748b">metre rule (0 cm at the cross-wire)</text>
        </g>
      </svg>
    </template>
  </VirtualLabPracticalBrief>
</template>

<script setup lang="ts">
import VirtualLabPracticalBrief from './VirtualLabPracticalBrief.vue'

defineProps<{ introduction?: string | null; objective?: string | null }>()

const APPARATUS = [
  'Two dry cells in a double-cell holder', 'Torch bulb in a bulb holder', 'Switch and connecting wires',
  'Cross-wire (wire gauze) in front of the bulb - the illuminated object', 'Concave mirror in a holder', 'White screen', 'Metre rule',
]
const SETUP_POINTS = [
  'The lamp lights the cross-wire, which is the object O.',
  'The concave mirror faces the cross-wire along the metre rule, at the same height.',
  'The screen stands beside the line between the cross-wire and the mirror, so it does not block the light, and catches the image reflected back by the mirror.',
  'u is measured from the cross-wire to the pole of the mirror; v from the screen to the pole of the mirror.',
  'The screen must be in front of the mirror - nothing reaches a screen behind it.',
]
const PROCEDURE = [
  'Connect the bulb, cells and switch, and switch on so the cross-wire is lit.',
  'Place the concave mirror facing the cross-wire so that u = 15 cm, measured from the cross-wire to the pole of the mirror.',
  'Move the screen backwards and forwards in front of the mirror until a sharp image of the cross-wire forms on it.',
  'Measure the image distance v, from the screen to the pole of the mirror.',
  'Repeat for u = 20, 25, 30, 35 and 40 cm, finding the sharp image each time.',
  'Record u and v in a table, and work out uv and (u + v) for each pair.',
  'Plot a graph of uv (y-axis) against (u + v) (x-axis) and draw the line of best fit.',
  'Find the gradient of the line - it is the focal length f of the mirror.',
]
</script>
