<template>
  <VirtualLabPracticalBrief
    :introduction="introduction"
    :aim="objective || 'To verify the laws of reflection, and to investigate the relationship between the object distance and the image distance in a plane mirror.'"
    task="As a learner of physics, carry out a scientific investigation to show the relationship between the object distance and the distance of its image from the plane mirror."
    hypothesis="The laws of reflection hold: at T the angle of incidence i equals the angle of reflection r, and the incident ray, the reflected ray and the normal lie in one plane. Because of this, the image is as far behind the mirror as the object is in front: x = y, so a graph of x against y is a straight line through the origin with a gradient of 1."
    hypothesis-note="This is a prediction to test. Your own pins, angles and graph decide whether i equals r and whether x equals y."
    :theory="[
      'Laws of reflection: the incident ray, the reflected ray and the normal all lie in the same plane, and the angle of incidence i equals the angle of reflection r.',
      'Reflected rays from the object pin seem to come from a point behind the mirror - the image I. Producing a reflected ray backwards locates I.',
      'No parallax: when P3, P2 and the image of P1 are exactly in line from the eye, they stay in line as the eye moves slightly - the line P3P2 then passes through the image.',
    ]"
    :variables="{
      independent: 'Object distance, y (P1 to the mirror)',
      dependent: 'Image distance, x (I to the mirror), and the angles i and r at T',
      controlled: 'The same plane mirror standing on ML, P1 always on the normal RS, pins upright',
      note: 'Measure both distances along RS from the line ML (the reflecting surface of the mirror).',
    }"
    :apparatus="APPARATUS"
    :setup-points="SETUP_POINTS"
    :procedure="PROCEDURE"
  >
    <template #diagram>
      <svg viewBox="0 0 520 300" class="w-full h-auto rounded-xl bg-white border border-gray-200 dark:border-gray-700" role="img" aria-label="Set-up: plane mirror on line ML, object pin P1 at O on the normal RS a distance y in front, pins P2 and P3 on the reflected ray towards the eye at A, and the ray produced behind the mirror to meet RS at the image I, a distance x behind">
        <!-- mirror on ML -->
        <line x1="40" y1="130" x2="490" y2="130" stroke="#111827" stroke-width="1.5" />
        <g stroke="#475569" stroke-width="1"><line v-for="k in 44" :key="k" :x1="40 + k * 10" y1="130" :x2="34 + k * 10" y2="122" /></g>
        <text x="26" y="134" font-size="13" font-weight="700" fill="#111827">M</text>
        <text x="496" y="134" font-size="13" font-weight="700" fill="#111827">L</text>
        <!-- normal RS -->
        <line x1="90" y1="20" x2="90" y2="285" stroke="#111827" stroke-width="1" stroke-dasharray="5 4" />
        <text x="76" y="28" font-size="13" font-weight="700" fill="#111827">R</text>
        <text x="76" y="290" font-size="13" font-weight="700" fill="#111827">S</text>
        <!-- object O (P1) and image I -->
        <circle cx="90" cy="230" r="5" fill="#dc2626" /><text x="100" y="244" font-size="12" font-weight="700" fill="#111827">P1 (O)</text>
        <circle cx="90" cy="30" r="5" fill="#64748b" /><text x="100" y="36" font-size="12" font-weight="700" fill="#111827">I</text>
        <!-- incident ray O -> T, reflected ray T -> eye, produced ray T -> I -->
        <line x1="90" y1="230" x2="260" y2="130" stroke="#dc2626" stroke-width="1.6" />
        <line x1="260" y1="130" x2="460" y2="248" stroke="#dc2626" stroke-width="1.6" />
        <line x1="260" y1="130" x2="90" y2="30" stroke="#dc2626" stroke-width="1.4" stroke-dasharray="6 4" />
        <text x="252" y="118" font-size="12" font-weight="700" fill="#111827">T</text>
        <!-- normal at T, angles i and r -->
        <line x1="260" y1="130" x2="260" y2="250" stroke="#64748b" stroke-width="1" stroke-dasharray="4 3" /><text x="250" y="264" font-size="12" fill="#475569">N</text>
        <text x="236" y="168" font-size="12" fill="#2563eb">i</text><text x="272" y="168" font-size="12" fill="#2563eb">r</text>
        <!-- pins P2, P3 and the eye -->
        <circle cx="330" cy="171" r="5" fill="#2563eb" /><text x="334" y="160" font-size="12" font-weight="700" fill="#111827">P2</text>
        <circle cx="410" cy="218" r="5" fill="#16a34a" /><text x="414" y="207" font-size="12" font-weight="700" fill="#111827">P3</text>
        <ellipse cx="472" cy="256" rx="14" ry="8" fill="#fff" stroke="#111827" stroke-width="1.5" /><circle cx="472" cy="256" r="4" fill="#1d4ed8" />
        <text x="446" y="282" font-size="12" fill="#111827">eye (A)</text>
        <!-- y and x along RS -->
        <g fill="#16a34a"><path d="M60 230 l-4 -8 h8 z M60 130 l-4 8 h8 z" /></g>
        <line x1="60" y1="134" x2="60" y2="226" stroke="#16a34a" stroke-width="1.5" /><text x="44" y="186" font-size="14" font-weight="700" fill="#16a34a">y</text>
        <g fill="#7c3aed"><path d="M60 30 l-4 8 h8 z M60 130 l-4 -8 h8 z" /></g>
        <line x1="60" y1="34" x2="60" y2="126" stroke="#7c3aed" stroke-width="1.5" /><text x="44" y="86" font-size="14" font-weight="700" fill="#7c3aed">x</text>
      </svg>
    </template>
  </VirtualLabPracticalBrief>
</template>

<script setup lang="ts">
import VirtualLabPracticalBrief from './VirtualLabPracticalBrief.vue'

defineProps<{ introduction?: string | null; objective?: string | null }>()

const APPARATUS = ['1 plane mirror', '1 white sheet of paper', '1 soft board', '4 optical pins', '4 drawing pins', '1 complete geometry set (ruler and protractor)']
const SETUP_POINTS = [
  'The white sheet is fixed to the soft board with the drawing pins. A line ML is drawn across it, and the normal RS at right angles to ML.',
  'The plane mirror stands upright on ML, its reflecting surface facing the pins.',
  'The object pin P1 is stuck on RS at O, a distance y in front of the mirror.',
  'Looking into the mirror from A, pins P2 and P3 are stuck in line with the image of P1.',
  'The line through P3 and P2 is produced behind ML to meet RS at the image I, a distance x behind the mirror.',
  'At T, where the rays meet the mirror line, the normal TN is drawn at right angles to ML. i is the angle between the incident ray OT and TN; r is the angle between the reflected ray and TN.',
]
const PROCEDURE = [
  'Fix the white sheet on the soft board with the drawing pins. Draw a line ML across it and the normal RS at right angles to ML.',
  'Stand the plane mirror upright on ML.',
  'Stick the object pin P1 upright on RS at O, 2.0 cm in front of the mirror (y = 2.0 cm).',
  'Looking into the mirror from position A, find the image of P1. Stick P2 and then P3 so that P3, P2 and the image of P1 are in one straight line (no parallax).',
  'Remove the mirror and the pins P2 and P3. Draw the line through the positions of P3 and P2 to meet ML at T, and produce it behind ML to meet RS at I.',
  'At T, draw the normal TN at right angles to ML. With the protractor, measure the angle of incidence i (between OT and TN) and the angle of reflection r (between the reflected ray and TN).',
  'Measure the image distance x from ML to I.',
  'Repeat with y = 4.0, 6.0, 8.0 and 10.0 cm.',
  'Record y, x, i and r in a table. Compare i and r in each trial.',
  'Plot a graph of x (y-axis) against y (x-axis).',
  'Find the gradient of the graph. State whether i = r (the laws of reflection) and the relationship between x and y.',
]
</script>
