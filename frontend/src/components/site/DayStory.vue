<template>
  <!-- A day on Tusome, told as you scroll - a learner's or a teacher's: the moments go by on the
       left while the phone on the right stays put and changes to match (on a phone, each moment
       has its own phone). -->
  <div>
    <div v-if="!only" class="mb-4 inline-flex rounded-2xl bg-white/10 p-1 ring-1 ring-white/10" role="tablist" aria-label="Whose day">
      <button
        v-for="p in PEOPLE"
        :key="p.key"
        type="button"
        role="tab"
        :aria-selected="who === p.key"
        class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition"
        :class="who === p.key ? 'bg-white text-indigo-900 shadow' : 'text-white/80 hover:text-white'"
        @click="setWho(p.key)"
      >
        <span class="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold" :class="who === p.key ? 'bg-indigo-600 text-white' : 'bg-white/15'">{{ p.initials }}</span>
        {{ p.label }}
      </button>
    </div>

    <div class="grid lg:grid-cols-[minmax(0,1fr)_22rem] gap-10 lg:gap-16">
      <Transition name="day" mode="out-in">
        <ol :key="who">
          <li
            v-for="(m, i) in moments"
            :key="m.time"
            :ref="el => (steps[i] = el as HTMLElement)"
            :data-i="i"
            class="lg:min-h-[78vh] flex items-center py-8 lg:py-0"
          >
            <div class="w-full">
              <div class="flex items-center gap-3">
                <span class="font-jakarta text-4xl sm:text-5xl font-extrabold tabular-nums transition-colors duration-500" :class="active === i ? 'text-indigo-300' : 'text-white/25'">{{ m.time }}</span>
                <span class="h-px flex-1 transition-colors duration-500" :class="active === i ? 'bg-indigo-300/60' : 'bg-white/10'"></span>
              </div>
              <h3 class="mt-4 font-jakarta text-2xl sm:text-3xl font-extrabold tracking-tight transition-opacity duration-500" :class="active === i ? 'opacity-100' : 'lg:opacity-40'">{{ m.title }}</h3>
              <p class="mt-3 max-w-lg text-white/75 leading-relaxed transition-opacity duration-500" :class="active === i ? 'opacity-100' : 'lg:opacity-40'">{{ m.text }}</p>
              <p class="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-indigo-100 ring-1 ring-white/10">
                <AppIcon :name="m.icon" class="w-3.5 h-3.5" />{{ m.module }}
              </p>
              <div class="mt-8 lg:hidden"><PhoneMock :screen="m.screen" :clock="m.time" /></div>
            </div>
          </li>
        </ol>
      </Transition>
      <div class="hidden lg:block">
        <div class="sticky top-[calc(50vh-16.5rem)]">
          <PhoneMock :screen="moments[active]?.screen ?? moments[0].screen" :clock="moments[active]?.time ?? moments[0].time" />
          <div class="mt-5 flex justify-center gap-2" aria-hidden="true">
            <span v-for="(m, i) in moments" :key="m.time" class="h-1.5 rounded-full transition-all duration-500" :class="active === i ? 'w-8 bg-indigo-300' : 'w-1.5 bg-white/25'"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'
import PhoneMock from './PhoneMock.vue'

type Who = 'student' | 'teacher'
// only: tell just this person's day, with no switch (the site is showing a student's or a teacher's side)
const props = defineProps<{ only?: Who }>()
const PEOPLE: { key: Who; label: string; initials: string }[] = [
  { key: 'student', label: "Ashley's day (student)", initials: 'AN' },
  { key: 'teacher', label: "Mr Okello's day (teacher)", initials: 'MO' }
]

const DAYS = {
  student: [
    { time: '7:30', screen: 'read' as const, icon: 'document', module: 'eNotes · offline',
      title: 'Reading on the way to school', text: 'Ashley opens the next pages of her Physics eNotes on her phone and listens to the narration. She saved them last night, so they cost no data.' },
    { time: '11:00', screen: 'live' as const, icon: 'video', module: 'Live Classes',
      title: 'A live Biology lesson, one tap away', text: 'A red banner on her dashboard: Mr Okello has started the Photosynthesis Q&A. She joins in one tap, answers in the chat, and raises her hand.' },
    { time: '4:00', screen: 'assess' as const, icon: 'pencil', module: 'Assessments · LOA',
      title: 'Hands in her assessment', text: 'The measurements check closes at five. She answers each question, sketches her working, and hands it in - from the same phone.' },
    { time: '8:00', screen: 'map' as const, icon: 'map', module: 'Learning Map',
      title: 'Marked - and an outcome turns green', text: 'Her teacher has marked it on screen. "Reads a vernier caliper accurately" turns green on her Learning Map, and her teacher sees the class\'s map change too.' }
  ],
  teacher: [
    { time: '7:00', screen: 'tdash' as const, icon: 'sparkles', module: 'Dashboard',
      title: 'The day, before the first bell', text: 'Mr Okello\'s dashboard: 11 scripts waiting, a live class at eleven, and three learners who have gone quiet. No registers to dig through.' },
    { time: '10:00', screen: 'tmark' as const, icon: 'check-circle', module: 'Marking',
      title: 'Marks on screen, between lessons', text: 'He opens the next script, ticks and circles right on the learner\'s working, adds "Well done!" and returns it. The marks land on the Learning Map by themselves.' },
    { time: '2:00', screen: 'tmap' as const, icon: 'map', module: 'Class Learning Map',
      title: 'Sees exactly what to reteach', text: 'The class map shows one outcome red across the room - 12 learners can\'t convert units yet. One tap makes a support group with revision for just them.' },
    { time: '5:00', screen: 'tmsg' as const, icon: 'chat', module: 'Chats',
      title: 'A nudge to the three who haven\'t started', text: 'Tusome knows who hasn\'t opened the notes. He sends the three of them one friendly message - and the replies come in before supper.' }
  ]
}

const who = ref<Who>(props.only ?? 'student')
const moments = computed(() => DAYS[who.value])
const active = ref(0)
let steps: HTMLElement[] = []
let observer: IntersectionObserver | null = null

const observe = () => {
  observer?.disconnect()
  if (!('IntersectionObserver' in window)) return
  // the moment in the middle of the screen is the one the phone shows
  observer = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (e.isIntersecting) active.value = Number((e.target as HTMLElement).dataset.i)
    }
  }, { rootMargin: '-45% 0px -45% 0px' })
  steps.forEach(el => el && observer?.observe(el))
}

const setWho = async (w: Who) => {
  if (w === who.value) return
  who.value = w
  active.value = 0
  steps = []
  await nextTick()
  // the list changes with a fade - observe the new moments once they're in
  setTimeout(observe, 450)
}

watch(() => props.only, w => { if (w) setWho(w) })

onMounted(observe)
onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
.day-enter-active, .day-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.day-enter-from { opacity: 0; transform: translateY(12px); }
.day-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
