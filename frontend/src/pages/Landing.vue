<template>
  <!-- The public Tusome website, told for one person at a time - a school (the default), a
       teacher or a student, picked with the switch in the header (useAudience). Each sees their
       own hero, reasons, day, modules and questions; the team and the demo form are for
       schools. Tusome is the product; schools (St Mark's first) are clients. -->
  <div class="site-plain min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-white overflow-x-clip">
    <SiteHeader on-dark />

    <main id="top">
      <!-- ===== Hero: deep green, students at work, the app around them, live numbers ===== -->
      <section class="relative overflow-hidden bg-indigo-950 pt-28 sm:pt-36 pb-12 sm:pb-16 text-white">
        <div class="absolute inset-0" aria-hidden="true">
          <div class="absolute -top-48 -right-40 w-[42rem] h-[42rem] rounded-full bg-indigo-600/30 blur-3xl"></div>
          <div class="absolute -bottom-48 -left-40 w-[34rem] h-[34rem] rounded-full bg-emerald-400/10 blur-3xl"></div>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.07)_1px,transparent_0)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"></div>
        </div>

        <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-10 items-center">
          <div class="reveal">
            <!-- Phones and tablets: the switch lives here (the header has it on wide screens) -->
            <AudienceSwitch light label class="lg:hidden mb-6" />
            <Transition name="fade" mode="out-in">
            <div :key="audience">
            <span class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-indigo-100 backdrop-blur">
              <span class="w-1.5 h-1.5 rounded-full bg-indigo-300"></span>
              {{ hero.eyebrow }}
            </span>
            <h1 class="mt-5 font-jakarta text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]" :aria-label="`${hero.lines.join(' ')} ${hero.words.join(', ')}`">
              {{ hero.lines[0] }}<br>{{ hero.lines[1] }}<br>
              <span class="relative inline-block min-w-[6ch] text-indigo-300" aria-hidden="true">
                <Transition name="word" mode="out-in"><span :key="heroWord" class="inline-block">{{ heroWord }}.</span></Transition>
              </span>
            </h1>
            <p class="mt-5 max-w-xl text-base sm:text-lg text-white/80 leading-relaxed">{{ hero.text }}</p>
            <div class="mt-8 flex flex-wrap gap-3">
              <component
                :is="hero.primary.to.startsWith('#') ? 'a' : 'router-link'"
                v-bind="hero.primary.to.startsWith('#') ? { href: hero.primary.to } : { to: hero.primary.to }"
                class="group inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-indigo-900 bg-white hover:bg-indigo-50 shadow-lg shadow-black/20 transition"
              >
                {{ hero.primary.label }}
                <svg class="w-4 h-4 group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
              </component>
              <router-link v-if="audience === 'student'" to="/login" class="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-bold text-white border border-white/25 hover:bg-white/10 transition">Login</router-link>
              <button v-else type="button" class="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-bold text-white border border-white/25 hover:bg-white/10 transition" @click="watchTour(0)">
                <span class="w-6 h-6 rounded-full bg-white text-indigo-900 flex items-center justify-center"><svg class="w-3 h-3 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span>
                Watch the 30-second tour
              </button>
            </div>
            </div>
            </Transition>
            <!-- A client -->
            <div class="mt-10 flex items-center gap-3">
              <img src="/images/stmark-logo.jpg" alt="" width="40" height="40" class="w-10 h-10 rounded-xl object-contain bg-white p-0.5 shadow ring-1 ring-black/5">
              <p class="text-sm text-white/70 leading-snug">Trusted by <span class="font-semibold text-white">St Mark's College Namagoma</span><br class="hidden sm:block"> - every class, every subject.</p>
            </div>
          </div>

          <!-- Students at work, with pieces of Tusome floating around them (they drift with the pointer) -->
          <div class="reveal relative mx-auto w-full max-w-xl lg:max-w-none" @mousemove="onHeroPointer" @mouseleave="heroPointer = { x: 0, y: 0 }">
            <div class="relative rounded-[2rem] overflow-hidden ring-1 ring-white/15 shadow-2xl shadow-black/40 transition-transform duration-300 ease-out" :style="drift(0.4)">
              <picture>
                <source srcset="/images/login-students.webp" type="image/webp">
                <img src="/images/login-students.jpg" alt="Students learning on Tusome in their classroom" width="1536" height="1024" fetchpriority="high" class="w-full aspect-[4/3] object-cover object-[30%_center]">
              </picture>
              <div class="absolute inset-0 bg-gradient-to-t from-indigo-950/60 via-transparent to-transparent"></div>
            </div>
            <Transition name="fade" mode="out-in">
            <div :key="audience">
            <div class="hidden sm:block absolute -left-6 lg:-left-10 top-6 w-60 transition-transform duration-300 ease-out" :style="drift(1.2)" aria-hidden="true">
              <div class="rounded-2xl bg-white text-slate-900 shadow-xl p-4 float-a">
                <p class="text-[11px] font-medium text-slate-400">{{ cards.a.hello }}</p>
                <p class="font-jakarta font-bold">{{ cards.a.name }}</p>
                <div class="mt-3 flex items-center gap-2.5 rounded-xl bg-indigo-600 p-2.5 text-white">
                  <span class="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center"><AppIcon :name="cards.a.icon" class="w-4 h-4" /></span>
                  <span class="flex-1 min-w-0">
                    <span class="block text-[9px] font-bold uppercase tracking-wider text-indigo-100">{{ cards.a.tag }}</span>
                    <span class="block text-xs font-bold truncate">{{ cards.a.title }}</span>
                    <span v-if="cards.a.progress !== null" class="mt-1 block h-1 rounded-full bg-white/25"><span class="block h-1 rounded-full bg-white" :style="{ width: `${cards.a.progress * 100}%` }"></span></span>
                  </span>
                </div>
              </div>
            </div>
            <div class="absolute -right-2 lg:-right-8 top-1/3 w-48 transition-transform duration-300 ease-out" :style="drift(1.6)" aria-hidden="true">
              <div class="rounded-2xl bg-white text-slate-900 shadow-xl p-3.5 float-c">
                <p class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500"><span class="w-2 h-2 rounded-full" :class="cards.b.live ? 'bg-red-500 animate-pulse' : 'bg-amber-400'"></span>{{ cards.b.label }}</p>
                <p class="mt-1 text-sm font-bold">{{ cards.b.title }}</p>
                <p class="text-[11px] text-slate-500">{{ cards.b.sub }}</p>
                <span class="mt-2 inline-flex px-3 py-1 rounded-lg bg-indigo-600 text-white text-xs font-bold">{{ cards.b.button }}</span>
              </div>
            </div>
            <div class="hidden sm:block absolute left-8 -bottom-8 w-48 transition-transform duration-300 ease-out" :style="drift(1)" aria-hidden="true">
              <div class="rounded-2xl bg-white text-slate-900 shadow-xl p-3.5 float-b">
                <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">{{ cards.c.label }}</p>
                <div class="flex items-center gap-3">
                  <svg class="w-12 h-12 -rotate-90" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15.5" fill="none" stroke-width="4" class="stroke-slate-100" /><circle cx="18" cy="18" r="15.5" fill="none" stroke-width="4" stroke-linecap="round" stroke="#22a45d" :stroke-dasharray="`${cards.c.pct * 0.974} 97.4`" /></svg>
                  <div>
                    <p class="font-jakarta text-lg font-extrabold">{{ cards.c.pct }}%</p>
                    <p class="text-[10px] text-slate-500">{{ cards.c.caption }}</p>
                  </div>
                </div>
              </div>
            </div>
            </div>
            </Transition>
          </div>
        </div>

        <!-- The numbers: live totals from Tusome where they're big enough, then what's built in -->
        <div class="reveal relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden bg-white/10 ring-1 ring-white/10">
            <div v-for="n in heroNumbers" :key="n.label" class="bg-indigo-950/70 backdrop-blur px-5 py-5">
              <p class="font-jakarta text-2xl sm:text-3xl font-extrabold tabular-nums whitespace-nowrap">{{ n.value }}</p>
              <p class="mt-0.5 text-xs sm:text-sm text-white/70">{{ n.label }}</p>
            </div>
          </div>
          <p v-if="liveStats.length" class="mt-2 text-[11px] text-white/50">Live totals from Tusome.</p>
        </div>
      </section>

      <!-- ===== Why, as a bento - and how a school gets going ===== -->
      <section id="features" class="py-20 sm:py-28 scroll-mt-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="reveal max-w-2xl">
            <p :class="EYEBROW">{{ why.eyebrow }}</p>
            <h2 :class="H2">{{ why.title }}</h2>
          </div>
          <div class="mt-12 grid lg:grid-cols-2 gap-5">
            <!-- Learn anywhere: the big green tile, with narration playing -->
            <div class="reveal lg:row-span-2 relative overflow-hidden rounded-3xl bg-indigo-600 text-white p-7 sm:p-9 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-900/20 transition">
              <div class="absolute -right-20 -bottom-20 w-72 h-72 rounded-full bg-white/10" aria-hidden="true"></div>
              <span class="relative w-12 h-12 rounded-2xl flex items-center justify-center bg-white/15"><AppIcon :name="PILLARS[0].icon" class="w-6 h-6" /></span>
              <h3 class="relative mt-5 font-jakarta text-2xl sm:text-3xl font-extrabold">{{ PILLARS[0].title }}</h3>
              <p class="relative mt-2 text-white/85 leading-relaxed max-w-md">{{ PILLARS[0].text }}</p>
              <ul class="relative mt-5 space-y-2">
                <li v-for="b in PILLARS[0].points" :key="b" class="flex items-start gap-2 text-sm"><AppIcon name="check-circle" class="w-4 h-4 mt-0.5 flex-shrink-0 text-indigo-200" />{{ b }}</li>
              </ul>
              <div class="relative mt-8 rounded-2xl bg-indigo-950/40 ring-1 ring-white/10 p-4 max-w-sm" aria-hidden="true">
                <p class="text-[10px] font-bold uppercase tracking-widest text-indigo-200">{{ audience === 'teacher' ? 'Your eNote · read aloud' : 'Narration · Page 3 of 12' }}</p>
                <div class="mt-3 flex items-end gap-1 h-10">
                  <span v-for="i in 22" :key="i" class="wave flex-1 rounded-full bg-white/80" :style="{ animationDelay: `${(i % 7) * 0.12}s`, height: `${30 + ((i * 37) % 60)}%` }"></span>
                </div>
                <p class="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold"><AppIcon name="download" class="w-3.5 h-3.5" />{{ audience === 'teacher' ? 'Read by 38 of 41' : 'Saved for offline' }}</p>
              </div>
            </div>
            <!-- Teach with insight: a class's outcomes, coloured in -->
            <div class="reveal rounded-3xl bg-indigo-50 dark:bg-indigo-500/10 p-7 sm:p-8 hover:-translate-y-1 hover:shadow-xl transition">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <span class="w-12 h-12 rounded-2xl flex items-center justify-center bg-white text-indigo-600 dark:bg-white/10 dark:text-indigo-300"><AppIcon :name="PILLARS[1].icon" class="w-6 h-6" /></span>
                  <h3 class="mt-5 font-jakarta text-xl font-bold">{{ PILLARS[1].title }}</h3>
                </div>
                <div class="grid grid-cols-6 gap-1 mt-1" aria-hidden="true">
                  <span v-for="i in 24" :key="i" class="w-3.5 h-3.5 rounded" :class="MAP_DOTS[i % MAP_DOTS.length]"></span>
                </div>
              </div>
              <p class="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{{ PILLARS[1].text }}</p>
              <ul class="mt-4 flex flex-wrap gap-2">
                <li v-for="b in PILLARS[1].points" :key="b" class="rounded-full bg-white dark:bg-white/10 px-3 py-1 text-xs font-semibold text-indigo-800 dark:text-indigo-200">{{ b }}</li>
              </ul>
            </div>
            <!-- Lead with clarity: coverage bars -->
            <div class="reveal rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-7 sm:p-8 hover:-translate-y-1 hover:shadow-xl transition">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <span class="w-12 h-12 rounded-2xl flex items-center justify-center bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300"><AppIcon :name="PILLARS[2].icon" class="w-6 h-6" /></span>
                  <h3 class="mt-5 font-jakarta text-xl font-bold">{{ PILLARS[2].title }}</h3>
                </div>
                <div class="flex items-end gap-1.5 h-16" aria-hidden="true">
                  <span v-for="(h, i) in [55, 80, 40, 95, 70]" :key="i" class="w-4 rounded-t-md bg-indigo-500" :style="{ height: `${h}%`, opacity: 0.45 + i * 0.12 }"></span>
                </div>
              </div>
              <p class="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{{ PILLARS[2].text }}</p>
              <ul class="mt-4 flex flex-wrap gap-2">
                <li v-for="b in PILLARS[2].points" :key="b" class="rounded-full bg-indigo-50 dark:bg-white/10 px-3 py-1 text-xs font-semibold text-indigo-800 dark:text-indigo-200">{{ b }}</li>
              </ul>
            </div>
          </div>

          <!-- How it works -->
          <div id="how" class="reveal mt-20 scroll-mt-24">
            <h3 class="font-jakarta text-2xl sm:text-3xl font-extrabold tracking-tight">{{ why.stepsTitle }}</h3>
            <ol class="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <li v-for="(st, i) in STEPS" :key="st.title" class="relative">
                <div class="flex items-center gap-3">
                  <span class="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-jakarta font-extrabold">{{ i + 1 }}</span>
                  <span v-if="i < STEPS.length - 1" class="hidden lg:block flex-1 h-px bg-gradient-to-r from-indigo-300 to-transparent" aria-hidden="true"></span>
                </div>
                <h4 class="mt-4 font-jakarta text-lg font-bold">{{ st.title }}</h4>
                <p class="mt-1.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{{ st.text }}</p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <!-- ===== A day with Tusome: told as you scroll ===== -->
      <section v-if="audience !== 'school'" id="day" class="relative py-20 sm:py-28 bg-indigo-950 text-white scroll-mt-20">
        <div class="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div class="absolute top-1/3 -right-40 w-[36rem] h-[36rem] rounded-full bg-indigo-600/25 blur-3xl"></div>
        </div>
        <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="reveal max-w-2xl">
            <p class="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-indigo-200 ring-1 ring-white/10">A day with Tusome</p>
            <h2 class="mt-3 font-jakarta text-3xl sm:text-4xl font-extrabold tracking-tight">{{ day.title }}</h2>
            <p class="mt-3 text-white/70">{{ day.text }}</p>
          </div>
          <DayStory class="mt-6" :only="audience" />
        </div>
      </section>

      <!-- ===== Before and after: drag to compare ===== -->
      <section v-if="audience !== 'student'" id="compare" class="py-20 sm:py-28 scroll-mt-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="reveal max-w-2xl">
            <p :class="EYEBROW">Before and after</p>
            <h2 :class="H2">The same school week - on paper, and on Tusome.</h2>
            <p class="mt-3 text-slate-600 dark:text-slate-400">Drag the handle across. Everything on the left still happens in most schools; everything on the right happens by itself.</p>
          </div>
          <BeforeAfter class="reveal mt-10" />
        </div>
      </section>

      <!-- ===== Curriculum + try the Learning Map ===== -->
      <section v-if="audience !== 'student'" id="learning-map" class="py-20 sm:py-28 bg-indigo-950 text-white scroll-mt-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="reveal">
              <p class="text-sm font-bold uppercase tracking-widest text-indigo-300">Competency-based, by design</p>
              <h2 class="mt-3 font-jakarta text-3xl sm:text-4xl font-extrabold tracking-tight">From one learning outcome to the end-of-term report.</h2>
              <p class="mt-4 text-slate-300 leading-relaxed">Teachers link each assessment to the curriculum. Tusome does the rest: every marked answer updates the learner's Learning Map, shows the class what to reteach, and feeds straight into the report card.</p>
            </div>
            <div class="reveal grid gap-3">
              <div v-for="(c, i) in CBC" :key="c.code" class="flex items-start gap-4 rounded-2xl bg-white/5 border border-white/10 p-4" :style="{ marginLeft: `${i * 1.25}rem` }">
                <span class="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-jakarta text-sm font-extrabold bg-white/10 text-white">{{ c.code }}</span>
                <span>
                  <span class="block font-semibold">{{ c.name }}</span>
                  <span class="block text-sm text-slate-400">{{ c.text }}</span>
                </span>
              </div>
            </div>
          </div>
          <div class="reveal mt-16">
            <div class="flex flex-wrap items-end justify-between gap-2 mb-4">
              <p class="font-jakarta text-xl font-bold">Try it: mark a class</p>
              <p class="text-sm text-slate-400">Press "Mark" and watch the Learning Map fill in. Sample learners.</p>
            </div>
            <LearningMapDemo />
          </div>
        </div>
      </section>

      <!-- ===== Tour ===== -->
      <section v-if="audience === 'teacher'" id="tour" class="py-20 sm:py-28 scroll-mt-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="reveal text-center max-w-2xl mx-auto mb-10">
            <p :class="EYEBROW">See it in action</p>
            <h2 :class="H2">A look inside Tusome</h2>
          </div>
          <ProductTour class="reveal" @watch="watchTour" />
        </div>
      </section>

      <!-- ===== Try a lesson ===== -->
      <section v-if="audience === 'student'" id="try" class="py-20 sm:py-28 scroll-mt-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="reveal max-w-2xl mb-10">
            <p :class="EYEBROW">Try it yourself</p>
            <h2 :class="H2">Read a lesson like a student.</h2>
            <p class="mt-3 text-slate-600 dark:text-slate-400">Turn the pages, listen to the narration, then hand in the quick check - and watch your outcomes fill in, the way they do on a learner's Learning Map.</p>
          </div>
          <ENoteSample class="reveal" />
        </div>
      </section>

      <!-- ===== Modules: an explorer ===== -->
      <section id="modules" class="py-20 sm:py-28 bg-indigo-50/60 dark:bg-indigo-950/20 scroll-mt-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="reveal max-w-2xl">
            <p :class="EYEBROW">The modules</p>
            <h2 :class="H2">{{ shownModules.length }} modules{{ audience === 'student' ? ' for learners' : audience === 'teacher' ? ' for teachers' : '' }}. One sign-in.</h2>
            <p class="mt-3 text-slate-600 dark:text-slate-400">{{ modulesText }}</p>
          </div>
          <ModuleExplorer class="reveal mt-10" :role="moduleRole" @open="openModule" />
        </div>
      </section>

      <!-- ===== Learn by doing: the lab, in 3D ===== -->
      <section id="lab" class="py-20 sm:py-28 scroll-mt-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 lg:gap-14 items-center">
          <div class="reveal">
            <p :class="EYEBROW">Virtual Lab</p>
            <h2 :class="H2">Learn by doing - in 3D.</h2>
            <p class="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">{{ labText }}</p>
            <ul class="mt-6 grid sm:grid-cols-2 gap-2">
              <li v-for="a in LAB_ITEMS" :key="a.label" class="flex items-center gap-2.5 rounded-xl bg-indigo-50/70 dark:bg-white/5 px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
                <span class="w-8 h-8 flex-shrink-0 rounded-lg bg-indigo-600 text-white flex items-center justify-center"><AppIcon :name="a.icon" class="w-4 h-4" /></span>{{ a.label }}
              </li>
            </ul>
          </div>
          <div ref="labSlot" class="reveal min-w-0">
            <LabTeaser v-if="labReady" />
            <div v-else class="h-[25rem] sm:h-[31rem] rounded-3xl bg-gradient-to-br from-indigo-50 to-white ring-1 ring-slate-200 dark:from-white/5 dark:to-transparent dark:ring-white/10 flex items-center justify-center text-sm text-slate-400">Loading the lab…</div>
          </div>
        </div>
      </section>

      <!-- ===== Client, with live totals ===== -->
      <section id="proof" class="pb-20 sm:pb-28 scroll-mt-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="reveal relative overflow-hidden rounded-3xl bg-slate-900">
            <picture>
              <source srcset="/images/stmark-campus.webp" type="image/webp">
              <img src="/images/stmark-campus.jpg" alt="St Mark's College Namagoma campus" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover">
            </picture>
            <div class="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40"></div>
            <div class="relative p-8 sm:p-12 lg:p-16 text-white">
              <div class="max-w-2xl">
                <div class="flex items-center gap-3">
                  <img src="/images/stmark-logo.jpg" alt="" width="48" height="48" loading="lazy" class="w-12 h-12 rounded-xl object-contain bg-white p-0.5">
                  <div>
                    <p class="font-bold">St Mark's College Namagoma</p>
                    <p class="text-xs text-slate-300">Running on Tusome</p>
                  </div>
                </div>
                <p class="mt-6 font-jakarta text-2xl sm:text-3xl font-bold leading-snug">Every class, every subject - on one platform.</p>
                <p class="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">At St Mark's, students read their notes, revise from the library, join live lessons and hand in their assessments on Tusome - and teachers follow each class, outcome by outcome, through to the end-of-term report card.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== Students: signing in, or getting your school on Tusome ===== -->
      <section v-if="audience === 'student'" id="start" class="pb-20 sm:pb-28 scroll-mt-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-5">
          <div class="reveal relative overflow-hidden rounded-3xl bg-indigo-600 text-white p-7 sm:p-9">
            <div class="absolute -right-16 -bottom-16 w-56 h-56 rounded-full bg-white/10" aria-hidden="true"></div>
            <p class="relative text-xs font-bold uppercase tracking-widest text-indigo-100">Your school is on Tusome</p>
            <h2 class="relative mt-3 font-jakarta text-2xl sm:text-3xl font-extrabold">Log in and pick up where you stopped.</h2>
            <p class="relative mt-2 text-white/85 leading-relaxed">Use the username and password your school gave you - on any phone or computer. Add Tusome to your home screen and it opens like an app.</p>
            <div class="relative mt-6 flex flex-wrap items-center gap-3">
              <router-link to="/login" class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-indigo-900 bg-white hover:bg-indigo-50 transition">Login</router-link>
              <router-link to="/guide#student" class="inline-flex items-center px-5 py-3 rounded-2xl text-sm font-bold text-white ring-1 ring-white/30 hover:bg-white/10 transition">How to use it</router-link>
            </div>
          </div>
          <div class="reveal rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-7 sm:p-9">
            <p class="text-xs font-bold uppercase tracking-widest text-slate-400">Not on Tusome yet?</p>
            <h2 class="mt-3 font-jakarta text-2xl sm:text-3xl font-extrabold">Tell your school about it.</h2>
            <p class="mt-2 text-slate-600 dark:text-slate-400 leading-relaxed">Show this page to your teacher or head teacher. They can ask us for a demo, and we set up the whole school - every class and subject.</p>
            <button type="button" class="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition" @click="shareWithSchool">
              <AppIcon name="send" class="w-4 h-4" />{{ shared ? 'Link copied' : 'Share with my school' }}
            </button>
          </div>
        </div>
      </section>

      <!-- ===== Your data, your school ===== -->
      <section v-if="audience === 'school'" id="trust" class="py-20 sm:py-28 bg-indigo-50/60 dark:bg-indigo-950/20 scroll-mt-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="reveal">
            <p :class="EYEBROW">Your data</p>
            <h2 class="mt-3 font-jakarta text-3xl sm:text-4xl font-extrabold tracking-tight max-w-2xl">Safe, private - and built for the phones and connections learners really have.</h2>
            <div class="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-for="t in TRUST" :key="t.title" class="flex gap-4 rounded-2xl bg-white dark:bg-white/[0.03] p-5 ring-1 ring-indigo-100 dark:ring-white/10">
                <span class="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center bg-indigo-600 text-white"><AppIcon :name="t.icon" class="w-5 h-5" /></span>
                <div>
                  <h4 class="font-jakarta text-base font-bold">{{ t.title }}</h4>
                  <p class="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{{ t.text }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== What's new ===== -->
      <section v-if="audience !== 'student'" id="new" class="pb-20 sm:pb-28 scroll-mt-20" :class="{ 'pt-20 sm:pt-28': audience === 'school' }">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="reveal flex flex-wrap items-end justify-between gap-4">
            <div class="max-w-2xl">
              <p :class="EYEBROW">What's new</p>
              <h2 :class="H2">Tusome gets better every week.</h2>
            </div>
            <p class="text-sm text-slate-500 dark:text-slate-400">Every school gets each improvement the day it ships.</p>
          </div>
          <div v-if="!allChanges" class="mt-10 grid md:grid-cols-3 gap-5">
            <article v-for="c in CHANGELOG.slice(0, 3)" :key="c.date + c.title" class="reveal flex flex-col rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6 hover:-translate-y-1 hover:shadow-xl hover:border-indigo-200 transition">
              <div class="flex items-center justify-between gap-2">
                <span class="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-indigo-700 dark:text-indigo-300"><AppIcon :name="c.icon" class="w-3.5 h-3.5" />{{ c.area }}</span>
                <time :datetime="c.date" class="text-xs text-slate-500 dark:text-slate-400">{{ niceDate(c.date) }}</time>
              </div>
              <h3 class="mt-4 font-jakarta text-lg font-bold leading-snug">{{ c.title }}</h3>
              <p class="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-4">{{ c.text }}</p>
            </article>
          </div>
          <ol v-else class="mt-10 relative border-l-2 border-slate-200 dark:border-white/10 ml-2 sm:ml-3 space-y-8">
            <li v-for="c in shownChanges" :key="c.date + c.title" class="reveal relative pl-7 sm:pl-9">
              <span class="absolute -left-[0.6875rem] top-0.5 w-5 h-5 rounded-full bg-white dark:bg-slate-950 border-2 border-indigo-500 flex items-center justify-center"><span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span></span>
              <div class="grid sm:grid-cols-[9rem_1fr] gap-x-6 gap-y-1">
                <p class="text-sm text-slate-500 dark:text-slate-400"><time :datetime="c.date">{{ niceDate(c.date) }}</time></p>
                <div>
                  <p class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-300"><AppIcon :name="c.icon" class="w-3.5 h-3.5" />{{ c.area }}</p>
                  <h3 class="mt-1 font-jakarta text-lg font-bold">{{ c.title }}</h3>
                  <p class="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">{{ c.text }}</p>
                </div>
              </div>
            </li>
          </ol>
          <div v-if="CHANGELOG.length > 3" class="mt-8">
            <button type="button" class="text-sm font-semibold text-indigo-600 dark:text-indigo-300 hover:underline" @click="allChanges = !allChanges">{{ allChanges ? 'Show less' : `Show all ${CHANGELOG.length} updates` }}</button>
          </div>
        </div>
      </section>

      <!-- ===== Team ===== -->
      <section v-if="audience === 'school'" id="team" class="py-20 sm:py-28 bg-indigo-50/60 dark:bg-indigo-950/20 scroll-mt-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">
            <div class="reveal lg:sticky lg:top-28">
              <p :class="EYEBROW">Meet the team</p>
              <h2 :class="H2">Four people. One mission.</h2>
              <p class="mt-3 text-slate-600 dark:text-slate-400">An executive director and a product and technology team who build Tusome and stay close to the schools that use it - you talk to the people who make it.</p>
              <div class="mt-8 rounded-2xl border-l-4 border-indigo-500 bg-white dark:bg-white/5 p-5">
                <p class="font-jakarta font-bold">{{ STORY.title }}</p>
                <p v-for="p in STORY.paragraphs" :key="p" class="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{{ p }}</p>
              </div>
            </div>
            <div>
              <!-- The executive director leads, in a larger card -->
              <div v-if="teamLead" class="reveal rounded-3xl bg-indigo-950 text-white dark:bg-white/5 dark:border dark:border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                <div class="flex-shrink-0 w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1 bg-white/15">
                  <img v-if="teamLead.photo" :src="teamLead.photo" :alt="teamLead.name" width="136" height="136" loading="lazy" class="w-full h-full rounded-full object-cover border-4 border-slate-900">
                  <span v-else class="w-full h-full rounded-full bg-slate-800 flex items-center justify-center font-jakarta text-4xl font-extrabold text-white">{{ initials(teamLead.name) }}</span>
                </div>
                <div class="min-w-0">
                  <span class="inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-white/10 text-indigo-200">{{ teamLead.role }}</span>
                  <h3 class="mt-3 font-jakarta text-2xl sm:text-3xl font-extrabold">{{ teamLead.name }}</h3>
                  <p class="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">{{ teamLead.bio }}</p>
                </div>
              </div>

              <!-- Then the rest of the team -->
              <p class="reveal mt-8 mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">Product &amp; technology</p>
              <div class="grid sm:grid-cols-3 gap-4">
                <div v-for="m in teamStakeholders" :key="m.name" class="reveal rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-5 text-center">
                  <div class="mx-auto w-16 h-16 rounded-full p-0.5 bg-slate-200 dark:bg-white/10">
                    <img v-if="m.photo" :src="m.photo" :alt="m.name" width="60" height="60" loading="lazy" class="w-full h-full rounded-full object-cover border-2 border-white dark:border-slate-900">
                    <span v-else class="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center font-jakarta text-lg font-extrabold text-slate-700 dark:text-slate-200">{{ initials(m.name) }}</span>
                  </div>
                  <h3 class="mt-3 font-jakarta text-base font-bold">{{ m.name }}</h3>
                  <p class="text-xs font-semibold text-indigo-600 dark:text-indigo-300">{{ m.role }}</p>
                  <p class="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{{ m.bio }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== FAQ ===== -->
      <section id="faq" class="py-20 sm:py-28 scroll-mt-20">
        <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div class="reveal text-center">
            <p :class="EYEBROW">Questions</p>
            <h2 :class="H2">{{ faqTitle }}</h2>
          </div>
          <div class="mt-10 divide-y divide-slate-200 dark:divide-white/10 border-y border-slate-200 dark:border-white/10">
            <div v-for="(f, i) in faq" :key="f.q">
              <button type="button" class="w-full flex items-center justify-between gap-4 py-5 text-left" :aria-expanded="openFaq === i" @click="openFaq = openFaq === i ? -1 : i">
                <span class="font-semibold text-slate-900 dark:text-white">{{ f.q }}</span>
                <span class="w-7 h-7 flex-shrink-0 rounded-full border border-slate-300 dark:border-white/20 flex items-center justify-center transition" :class="openFaq === i ? 'rotate-45 bg-indigo-600 text-white border-indigo-600' : ''">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 5v14m7-7H5"></path></svg>
                </span>
              </button>
              <p v-if="openFaq === i" class="pb-5 -mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{{ f.a }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== Request a demo ===== -->
      <section v-if="audience !== 'student'" id="demo" class="pb-20 sm:pb-28 scroll-mt-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <DemoForm class="reveal" />
        </div>
      </section>
    </main>

    <SiteFooter />
    <TourPlayer :open="tourOpen" :start="tourStart" @close="tourOpen = false" />
    <ModuleSheet :module="openedModule" :list="shownModules" @close="openedModule = null" @step="stepModule" />
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import AppIcon from '@/components/common/AppIcon.vue'
import SiteHeader from '@/components/site/SiteHeader.vue'
import SiteFooter from '@/components/site/SiteFooter.vue'
import ProductTour from '@/components/site/ProductTour.vue'
import TourPlayer from '@/components/site/TourPlayer.vue'
import ModuleSheet from '@/components/site/ModuleSheet.vue'
import ENoteSample from '@/components/site/ENoteSample.vue'
import LearningMapDemo from '@/components/site/LearningMapDemo.vue'
import DemoForm from '@/components/site/DemoForm.vue'
import ModuleExplorer from '@/components/site/ModuleExplorer.vue'
import DayStory from '@/components/site/DayStory.vue'
import BeforeAfter from '@/components/site/BeforeAfter.vue'
import AudienceSwitch from '@/components/site/AudienceSwitch.vue'
import { useAudience, type Audience } from '@/components/site/useAudience'
import { audienceByKey } from '@/data/audiences'
// three.js is big - the 3D lab loads in its own file, only when scrolled to
const LabTeaser = defineAsyncComponent(() => import('@/components/site/LabTeaser.vue'))
import { useReveal } from '@/components/site/useReveal'
import { useSiteScale } from '@/components/site/useSiteScale'
import { MODULES, type EModule } from '@/data/modules'
import { CHANGELOG } from '@/data/changelog'
import { teamLead, teamStakeholders } from '@/data/team'
import { TRUST, STORY, STAT_LABELS } from '@/data/site'

const EYEBROW = 'inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-indigo-800 dark:bg-indigo-500/15 dark:text-indigo-200'
const H2 = 'mt-3 font-jakarta text-3xl sm:text-4xl font-extrabold tracking-tight'

const NUMBERS = [
  { value: `${MODULES.length}`, label: 'modules in one sign-in' },
  { value: 'Offline', label: 'notes and books work without internet' },
  { value: 'LOA·AOI·EOC', label: 'competency-based assessment built in' },
  { value: '4', label: 'roles: students, teachers, HODs, admins' }
]

// Whose side of Tusome the page tells (School / Teacher / Student - the switch in the header)
const route = useRoute()
const { audience, fromLink } = useAudience()
fromLink()
watch(() => route.query.for, fromLink)

// The hero, for each: the last word of the headline changes every few seconds
const HEROES: Record<Audience, { eyebrow: string; lines: [string, string]; words: string[]; text: string; primary: { label: string; to: string } }> = {
  school: {
    eyebrow: 'Built for the competency-based curriculum',
    lines: ['One space', 'for every'],
    words: ['lesson', 'learner', 'teacher', 'school'],
    text: 'Tusome is a complete digital school: notes, books, videos and live lessons for students; LOA, AOI and EOC assessment and marking for teachers; and a live Learning Map that shows everyone exactly where each learner stands.',
    primary: { label: 'Request a demo', to: '#demo' }
  },
  teacher: {
    eyebrow: 'For teachers and heads of department',
    lines: ['Less paper.', 'More'],
    words: ['teaching', 'feedback', 'insight', 'time'],
    text: 'Write your notes once and every stream reads them. Set LOA, AOI and EOC work, mark it on screen between lessons, and see straight away which outcomes your class still needs - Tusome keeps track of who has read, watched and handed in.',
    primary: { label: 'See a teacher\'s day', to: '#day' }
  },
  student: {
    eyebrow: 'For students',
    lines: ['Learn', 'anywhere,'],
    words: ['anytime', 'offline', 'your way'],
    text: 'Your notes, books, videos and live lessons on any phone - even with no data. Hand in your work from the same phone, and watch your Learning Map turn green as your teachers mark it.',
    primary: { label: 'Try a lesson', to: '#try' }
  }
}
const hero = computed(() => HEROES[audience.value])
const heroWord = ref(hero.value.words[0])
watch(audience, () => { heroWord.value = hero.value.words[0] })

// The pieces of the app floating around the photo, for each
const CARDS: Record<Audience, {
  a: { hello: string; name: string; icon: string; tag: string; title: string; progress: number | null }
  b: { live: boolean; label: string; title: string; sub: string; button: string }
  c: { label: string; pct: number; caption: string }
}> = {
  school: {
    a: { hello: 'Good morning,', name: 'Head teacher', icon: 'chart', tag: 'End of term', title: 'Report cards: 9 of 12 classes', progress: 0.75 },
    b: { live: false, label: 'Follow up', title: '3 teachers', sub: 'missed this week\'s marking', button: 'Print report' },
    c: { label: 'Curriculum coverage', pct: 82, caption: 'topics assessed' }
  },
  teacher: {
    a: { hello: 'Good morning,', name: 'Mr Okello', icon: 'check-circle', tag: 'To mark', title: '11 scripts · S.2 LOA', progress: 0.35 },
    b: { live: false, label: 'Reteach next', title: 'Converting units', sub: '12 learners not yet', button: 'Make a group' },
    c: { label: 'Class Learning Map', pct: 64, caption: 'outcomes achieved' }
  },
  student: {
    a: { hello: 'Good morning,', name: 'Ashley', icon: 'book', tag: 'Continue reading', title: 'Measurements in Physics', progress: 0.66 },
    b: { live: true, label: 'Live now', title: 'Photosynthesis Q&A', sub: 'Biology · S.2', button: 'Join now' },
    c: { label: 'Learning Map', pct: 70, caption: 'outcomes achieved' }
  }
}
const cards = computed(() => CARDS[audience.value])
let wordTimer = 0
// The floating pieces drift a little with the pointer (depth = how far)
const heroPointer = ref({ x: 0, y: 0 })
const onHeroPointer = (e: MouseEvent) => {
  const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
  heroPointer.value = { x: ((e.clientX - r.left) / r.width - 0.5) * 2, y: ((e.clientY - r.top) / r.height - 0.5) * 2 }
}
const drift = (depth: number) => ({ transform: `translate3d(${heroPointer.value.x * depth * 8}px, ${heroPointer.value.y * depth * 8}px, 0)` })
// Live totals first (the big ones), then what's built in - four in all
const heroNumbers = computed(() => [
  ...liveStats.value.slice(0, 2).map(s => ({ value: s.shown.toLocaleString(), label: s.label })),
  ...NUMBERS
].slice(0, 4))
// A class's outcomes on the "Teach with insight" tile
const MAP_DOTS = ['bg-indigo-500', 'bg-indigo-500', 'bg-amber-400', 'bg-indigo-500', 'bg-rose-400', 'bg-indigo-300', 'bg-indigo-500', 'bg-amber-400']

// Why, for each: three tiles (the big green one first) and how to get going
const WHY: Record<Audience, { eyebrow: string; title: string; stepsTitle: string; pillars: { title: string; icon: string; text: string; points: string[] }[]; steps: { title: string; text: string }[] }> = {
  school: {
    eyebrow: 'Why schools choose Tusome',
    title: 'Teaching, learning and leading - finally in one place.',
    stepsTitle: 'Your school, live in weeks - not terms',
    pillars: [
      { title: 'Learn anywhere', icon: 'book', text: 'Notes, textbooks, past papers and videos that students open on any phone or computer - even offline.', points: ['Read page by page, with narration', 'Save for offline, sync later', 'Continue where you stopped'] },
      { title: 'Teach with insight', icon: 'map', text: 'Set competency-based work, mark it on screen, and see straight away which outcomes the class still needs.', points: ['LOA, AOI and EOC assessments', 'Mark typed, drawn or uploaded work', 'Reteach the outcomes that need it'] },
      { title: 'Lead with clarity', icon: 'chart', text: 'Heads of department and administrators see coverage, engagement and results across every class, as it happens.', points: ['Curriculum coverage by topic', 'Engagement and quiet learners', 'Report cards in a few clicks'] }
    ],
    steps: [
      { title: 'We set up your school', text: 'Classes, streams, subjects, terms and accounts - imported and ready, with your crest on every report.' },
      { title: 'Teachers add content', text: 'eNotes, books, videos and assessments, linked to the curriculum. We train every teacher.' },
      { title: 'Students learn anywhere', text: 'On any phone or computer, in school or at home - and offline when the internet drops.' },
      { title: 'Everyone sees progress', text: 'Learning Maps, coverage and engagement update as work is marked - right through to report cards.' }
    ]
  },
  teacher: {
    eyebrow: 'Why teachers like it',
    title: 'Everything you do for a class - in one place.',
    stepsTitle: 'Getting going as a teacher',
    pillars: [
      { title: 'Write once, every stream reads', icon: 'document', text: 'Turn your notes into eNotes read aloud page by page, or upload the books, slides and videos you already have. Every stream you teach opens them on their phones.', points: ['Reuse your notes and past papers', 'Narration, without recording yourself', 'See who has read each topic'] },
      { title: 'Mark on screen', icon: 'check-circle', text: 'Typed, drawn and uploaded answers in one place - tick, comment and mark each question; the auto-marked ones are done for you.', points: ['LOA, AOI and EOC', 'Ink, comments and voice notes', 'Marks reach the report card'] },
      { title: 'Know who needs you', icon: 'chart', text: 'Your class Learning Map shows which outcomes the class has and has not got yet - and who has gone quiet.', points: ['Reteach next, by outcome', 'Support groups in one tap', 'Message the quiet ones'] }
    ],
    steps: [
      { title: 'We train you', text: 'Module by module, at your school, in a few short sessions - and the user guide is always one tap away.' },
      { title: 'Bring your notes', text: 'Upload what you have - notes, slides, past papers - or write eNotes in the builder. Your department shares its work.' },
      { title: 'Set and mark', text: 'Build an LOA in minutes, mark on screen between lessons, and return it with feedback.' },
      { title: 'Watch the map', text: 'Every returned script updates your class Learning Map, and the marks go straight to the report card.' }
    ]
  },
  student: {
    eyebrow: 'Why learners love it',
    title: 'Your school day - on your phone.',
    stepsTitle: 'Getting started',
    pillars: [
      { title: 'Learn anywhere', icon: 'book', text: 'Your notes, textbooks, past papers and videos on any phone or computer - even with no data.', points: ['Listen to any page read aloud', 'Save for offline, read at home', 'Continue where you stopped'] },
      { title: 'See where you stand', icon: 'map', text: 'Your Learning Map turns green outcome by outcome as your teachers mark your work - so you know exactly what to revise.', points: ['Your marks and feedback', 'What to revise next', 'Badges for improving'] },
      { title: 'Never miss work', icon: 'clipboard', text: 'A new assessment comes with a notification and a red number on your menu - with the deadline, and a Start button.', points: ['Hand in from your phone', 'Join live classes in one tap', 'Ask your teacher in Chats'] }
    ],
    steps: [
      { title: 'Get your account', text: 'Your school gives you a username and a password.' },
      { title: 'Log in on any phone', text: 'In the browser - then add Tusome to your home screen and it opens like an app.' },
      { title: 'Save for offline', text: 'Save notes and books at school, and read them at home with no data.' },
      { title: 'Watch your map fill', text: 'Every marked assessment turns outcomes green on your Learning Map.' }
    ]
  }
}
const why = computed(() => WHY[audience.value])
const PILLARS = computed(() => why.value.pillars)
const STEPS = computed(() => why.value.steps)

const DAYS: Record<Audience, { title: string; text: string }> = {
  school: { title: 'One learner, one phone, a whole school day.', text: 'Scroll through Ashley\'s day - from reading on the way in to an outcome turning green that evening. Or switch to Mr Okello\'s.' },
  teacher: { title: 'A teaching day, without the paper chase.', text: 'Scroll through Mr Okello\'s day - from his dashboard before the first bell to the replies before supper.' },
  student: { title: 'Your school day, on one phone.', text: 'Scroll through Ashley\'s day - from reading on the way in to an outcome turning green that evening.' }
}
const day = computed(() => DAYS[audience.value])

// Modules: a student or a teacher sees the ones they use
const moduleRole = computed(() => (audience.value === 'school' ? undefined : audience.value))
const modulesText = computed(() => ({
  school: 'Every part of school life that happens on a screen - built to work together, so what a student reads, attempts and achieves all lands on the same Learning Map. Pick one to see it.',
  teacher: 'What you teach with, set work in, mark and follow your classes with - all in one sign-in. Pick one to see it.',
  student: 'Everything you read, watch, attempt and practise - all in one sign-in. Pick one to see it.'
})[audience.value])
const labText = computed(() => audience.value === 'student'
  ? 'Practicals you can\'t always do at school: open a real computer and name its parts, repair a laptop, run science experiments, explore the human body. Try it - this is the ICT Lab\'s own computer.'
  : 'Practicals a school can\'t always run for every learner: open a real computer and name its parts, repair a laptop, run science experiments, explore the human body. Try it - this is the ICT Lab\'s own computer.')

// The product tour, full screen
const tourOpen = ref(false)
const tourStart = ref(0)
const watchTour = (i: number) => { tourStart.value = i; tourOpen.value = true }

// A module card opens its detail sheet; the arrows step through the modules being shown
const openedModule = ref<EModule | null>(null)
const openModule = (m: EModule) => { openedModule.value = m }
const stepModule = (d: number) => {
  const list = shownModules.value
  const i = list.findIndex(m => m.key === openedModule.value?.key)
  openedModule.value = list[(i + d + list.length) % list.length]
}

// What's new: the latest four, the rest on request
const allChanges = ref(false)
const shownChanges = computed(() => CHANGELOG)
const niceDate = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

// The Virtual Lab: what it covers, and the 3D computer - mounted once its place is near the screen
const LAB_ITEMS = [
  { label: 'Computer lab rules', icon: 'check-circle' },
  { label: 'Parts of a computer, in HD 3D', icon: 'keyboard' },
  { label: 'Assembling a computer', icon: 'wrench' },
  { label: 'Laptop repair, start to finish', icon: 'wrench' },
  { label: 'Spot the hazard', icon: 'warning' },
  { label: 'Science practicals', icon: 'beaker' },
  { label: 'Anatomy Explorer', icon: 'beaker' }
]
const labSlot = ref<HTMLElement | null>(null)
const labReady = ref(false)
let labObserver: IntersectionObserver | null = null

// The module sheet steps through the modules being shown
const shownModules = computed(() => (moduleRole.value ? MODULES.filter(m => m.roles.includes(moduleRole.value!)) : MODULES))

const CBC = [
  { code: 'LOA', name: 'Learning Outcome Assessment', text: 'Short checks on single outcomes - each one updates the learner\'s map.' },
  { code: 'AOI', name: 'Activity of Integration', text: 'Real-life tasks that show a topic\'s competency in action.' },
  { code: 'EOC', name: 'Elements of Construct', text: 'End-of-chapter work against the assessment objectives.' },
  { code: 'RC', name: 'Report card', text: 'Generated from all of the above - nothing typed in twice.' }
]

// First and last name only, so a long name still makes two letters
const initials = (name: string) => {
  const w = name.split(/\s+/).filter(Boolean)
  return ((w[0]?.[0] || '') + (w.length > 1 ? w[w.length - 1][0] : '')).toUpperCase()
}

const FAQ = [
  { q: 'Do students need a computer?', a: 'No. Tusome works on any smartphone, tablet or computer with a browser. Notes and books can be saved to the device to read without internet, and anything done offline is sent when the device reconnects.' },
  { q: 'Does it follow the competency-based curriculum?', a: 'Yes - it\'s built around it. Assessments are tagged as LOA, AOI or EOC and linked to learning outcomes, topics and constructs, and every marked result feeds the Learning Map and the report card.' },
  { q: 'How long does it take to get started?', a: 'Usually a few weeks. We set up your classes, subjects and accounts, then train teachers module by module. Your school can start with eNotes and assessments and grow from there.' },
  { q: 'Who owns our school\'s content and data?', a: 'Your school does. Your notes, books, assessments and results belong to you, are only visible to your own staff and students, and can be exported.' },
  { q: 'Can parents or the school leadership see progress?', a: 'School leadership - heads of department and administrators - have their own views of coverage, engagement and results. Report cards can be printed for parents at the end of every term.' }
]

// Questions, for each
const faq = computed(() => audience.value === 'school'
  ? FAQ
  : audience.value === 'teacher'
    ? [...(audienceByKey('teachers')?.faq ?? []), FAQ.find(f => f.q.startsWith('Does it follow'))!, { q: 'Who sees my classes\' results?', a: 'You see the classes you teach. Your head of department sees your department\'s classes, and the school\'s administrators see the whole school. Learners see only their own work.' }]
    : [...(audienceByKey('students')?.faq ?? []), { q: 'Can my parents see my results?', a: 'Your school prints your report card for your parents at the end of every term. Your marks, feedback and Learning Map are in your own account.' }])
const faqTitle = computed(() => ({ school: 'Asked by schools like yours', teacher: 'Asked by teachers', student: 'Asked by students' })[audience.value])
const openFaq = ref(0)
watch(audience, () => { openFaq.value = 0 })

// A student sends this page (the school's side of it) to their teacher or head teacher
const shared = ref(false)
const shareWithSchool = async () => {
  const url = `${window.location.origin}/`
  try {
    if (navigator.share) {
      await navigator.share({ title: 'Tusome - the digital school', url })
      return
    }
    await navigator.clipboard.writeText(url)
    shared.value = true
    setTimeout(() => { shared.value = false }, 2500)
  } catch {
    // Shared nothing - the button stays as it was
  }
}

// Live totals, counted up when they come into view
const stats = ref<Record<string, number>>({})
const countUp = ref(0)
const liveStats = computed(() => STAT_LABELS
  .filter(s => (stats.value[s.key] ?? 0) >= s.min)
  .slice(0, 4)
  .map(s => ({ ...s, shown: Math.round((stats.value[s.key] ?? 0) * countUp.value) })))

const runCountUp = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { countUp.value = 1; return }
  const start = performance.now()
  const frame = (t: number) => {
    const p = Math.min(1, (t - start) / 1400)
    countUp.value = 1 - Math.pow(1 - p, 3)
    if (p < 1) requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}

onMounted(async () => {
  try {
    const { data } = await axios.get('/api/public/stats')
    stats.value = data?.data ?? {}
  } catch {
    // No totals - the section reads fine without them
  }
  // the totals are in the hero, so they count up straight away
  runCountUp()
  if (labSlot.value && 'IntersectionObserver' in window) {
    labObserver = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { labReady.value = true; labObserver?.disconnect() }
    }, { rootMargin: '300px 0px' })
    labObserver.observe(labSlot.value)
  } else {
    labReady.value = true
  }
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    wordTimer = window.setInterval(() => {
      const words = hero.value.words
      heroWord.value = words[(words.indexOf(heroWord.value) + 1) % words.length]
    }, 2600)
  }
})
onBeforeUnmount(() => { clearInterval(wordTimer); labObserver?.disconnect() })

// switching audience brings in new sections - fade them in too
useReveal(() => audience.value)

useSiteScale()
</script>

<style scoped>
@keyframes floaty { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
.float-a { animation: floaty 7s ease-in-out infinite; }
.float-b { animation: floaty 6s ease-in-out infinite 0.8s; }
.float-c { animation: floaty 6.5s ease-in-out infinite 1.6s; }
@media (prefers-reduced-motion: reduce) {
  .float-a, .float-b, .float-c { animation: none; }
}

.mod-enter-active, .mod-leave-active { transition: all 0.3s ease; }
.mod-enter-from, .mod-leave-to { opacity: 0; transform: scale(0.96); }
.mod-leave-active { position: absolute; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.word-enter-active, .word-leave-active { transition: opacity 0.35s ease, transform 0.35s ease; }
.word-enter-from { opacity: 0; transform: translateY(0.4em); }
.word-leave-to { opacity: 0; transform: translateY(-0.4em); }
@keyframes wave { 0%, 100% { transform: scaleY(0.45); } 50% { transform: scaleY(1); } }
.wave { transform-origin: bottom; animation: wave 1.1s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) { .wave { animation: none; } }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
