<template>
  <VirtualLabPracticalBrief
    :introduction="introduction"
    :aim="objective || 'To examine the external features of a frog, dissect it to expose the organs in its body cavity, and identify them and their positions.'"
    task="Examine the outside of the frog, then open its body cavity without damaging the organs, identify each organ and note where it lies. Use your observations to answer the questions below the lab."
    hypothesis-label="What to expect"
    hypothesis="The frog's organs are arranged in the same basic plan as those of other vertebrates: the heart and lungs at the front of the body cavity, the liver just behind them, the stomach and coiled intestines behind that, and the kidneys against the back wall."
    hypothesis-note="Check each organ against this plan as you find it."
    :theory="THEORY"
    :apparatus="APPARATUS"
    :setup-points="SETUP_POINTS"
    :procedure="PROCEDURE"
  >
    <template #diagram>
      <svg viewBox="0 0 520 300" class="w-full h-auto rounded-xl bg-white border border-gray-200 dark:border-gray-700" role="img" aria-label="Set-up: a frog pinned on its back in a wax dissecting tray, with the cut lines up the middle of the belly">
        <!-- tray -->
        <rect x="120" y="10" width="280" height="280" rx="10" fill="#cbd5e1" />
        <rect x="130" y="20" width="260" height="260" rx="6" fill="#1f2937" />
        <!-- frog, belly up, head at the top -->
        <g fill="#e9dfb8" stroke="#a3986a" stroke-width="1.5">
          <path d="M 260 50 C 230 50 222 70 222 90 C 210 110 212 160 222 190 C 228 215 245 228 260 228 C 275 228 292 215 298 190 C 308 160 310 110 298 90 C 298 70 290 50 260 50 Z" />
          <!-- fore limbs -->
          <path d="M 226 112 L 196 118 L 182 98" fill="none" stroke-width="7" stroke-linecap="round" />
          <path d="M 294 112 L 324 118 L 338 98" fill="none" stroke-width="7" stroke-linecap="round" />
          <!-- hind limbs -->
          <path d="M 232 214 L 186 238 L 210 262 L 186 280" fill="none" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 288 214 L 334 238 L 310 262 L 334 280" fill="none" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <!-- pins -->
        <g fill="#dc2626"><circle cx="180" cy="96" r="5" /><circle cx="340" cy="96" r="5" /><circle cx="184" cy="280" r="5" /><circle cx="336" cy="280" r="5" /></g>
        <!-- cut lines -->
        <line x1="260" y1="205" x2="260" y2="85" stroke="#dc2626" stroke-width="2" stroke-dasharray="6 4" />
        <text x="266" y="150" font-size="12" fill="#dc2626" font-weight="700">cut</text>
        <circle cx="260" cy="205" r="5" fill="none" stroke="#22c55e" stroke-width="2" />
        <!-- labels -->
        <g font-size="12" fill="#0f172a">
          <text x="408" y="60">head (anterior)</text>
          <line x1="404" y1="56" x2="292" y2="62" stroke="#64748b" />
          <text x="408" y="150">belly skin</text>
          <line x1="404" y1="146" x2="300" y2="150" stroke="#64748b" />
          <text x="408" y="250">hind legs</text>
          <line x1="404" y1="246" x2="336" y2="240" stroke="#64748b" />
          <text x="12" y="96">pin through</text>
          <text x="12" y="110">each foot</text>
          <line x1="80" y1="100" x2="174" y2="96" stroke="#64748b" />
          <text x="12" y="210">start the cut</text>
          <text x="12" y="224">here (green ring)</text>
          <line x1="110" y1="212" x2="254" y2="205" stroke="#64748b" />
          <text x="12" y="290">wax tray</text>
          <line x1="64" y1="286" x2="132" y2="276" stroke="#64748b" />
        </g>
      </svg>
    </template>
  </VirtualLabPracticalBrief>
</template>

<script setup lang="ts">
import VirtualLabPracticalBrief from './VirtualLabPracticalBrief.vue'

defineProps<{ introduction?: string | null; objective?: string | null }>()

const THEORY = [
  'The frog is an amphibian: its larva (tadpole) lives in water, while the adult lives on land and in water. Its external features suit both: webbed hind feet for swimming, long strong hind legs for jumping, eyes and nostrils on top of the head, and a moist skin through which it can also breathe.',
  'The body cavity (coelom) holds the organs. The heart has three chambers - two atria and one ventricle. The lungs are thin, spongy sacs. The liver is the largest organ; the gall bladder lies among its lobes. Food passes from the stomach to the long, coiled small intestine, then the short, wide large intestine, which opens into the cloaca.',
  'The kidneys lie flat against the back (dorsal) wall of the body cavity, under the gut.',
]
const APPARATUS = ['Preserved frog', 'Dissecting pins', 'Forceps', 'Fine dissecting scissors', 'Hand lens', 'Rubber gloves']
const SETUP_POINTS = [
  'Wear gloves throughout. Scissors and pins are sharp: cut away from yourself and keep your fingers clear.',
  'For the dissection the frog lies on its back (ventral side up) with its head away from you, pinned through each foot.',
  'Always lift the skin and muscle with forceps before cutting, and cut with the points of the scissors raised, so the organs underneath are not damaged.',
  'The muscle wall is cut just to one side of the midline to avoid the abdominal vein.',
]
const PROCEDURE = [
  'Frog anatomy (external): turn the frog round and find its eyes, nostrils, mouth, external ears (tympanic membranes), skin, vocal sac and legs.',
  'Frog anatomy (internal): look through the skin and find the fat bodies, stomach, liver, lungs, heart and kidneys. Watch the heart beat and the lungs breathe.',
  'Equipment: put on gloves and take the pins, forceps, scissors and hand lens.',
  'Lay the frog on its back and pin each foot down.',
  'Lift the skin of the lower belly with forceps and cut along the midline, from just in front of the hind legs up to the chest. Fold back each flap of skin and pin it.',
  'Lift the muscle wall with forceps and cut it in the same way, just to one side of the abdominal vein. Pin back the flaps of muscle.',
  'Watch the heart through the hand lens and count its chambers. Click each organ to read what it does in the living frog.',
  'Deep dissection: lift each organ out with forceps and put it in its labelled box. This uncovers the kidneys and testes, spleen, pancreas and bladder underneath.',
  'Answer the questions, then wash your hands and dispose of the specimen as your teacher directs.',
]
</script>
