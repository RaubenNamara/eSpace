<template>
  <!-- The public eSpace website: what eSpace is, a tour, every module, who it's for, pricing, the
       team, and a way for a school to ask for a demo. eSpace is the product; schools (St Mark's
       first) are clients. Words for most sections live in data/site.ts. -->
  <div class="site-plain min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-white overflow-x-hidden">
    <SiteHeader />

    <main id="top">
      <!-- ===== Hero ===== -->
      <section class="relative pt-28 sm:pt-36 pb-16 sm:pb-24">
        <div class="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(100,116,139,0.15)_1px,transparent_0)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]"></div>
        </div>

        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div class="reveal">
            <span class="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/70 px-3 py-1 text-xs font-semibold text-indigo-700 shadow-sm dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-200">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Built for the competency-based curriculum
            </span>
            <h1 class="mt-5 font-jakarta text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
              Every lesson,<br>every learner,<br>
              <span class="text-indigo-600 dark:text-indigo-400">one space.</span>
            </h1>
            <p class="mt-5 max-w-xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              eSpace is a complete digital school: notes, books, videos and live lessons for students; LOA, AOI and EOC assessment and marking for teachers; and a live Learning Map that shows everyone exactly where each learner stands.
            </p>
            <div class="mt-8 flex flex-wrap gap-3">
              <a href="#demo" class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition">
                Request a demo
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
              </a>
              <button type="button" class="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-bold text-slate-800 bg-white border border-slate-200 shadow-sm hover:border-slate-300 dark:bg-white/5 dark:text-white dark:border-white/15 transition" @click="watchTour(0)">
                <span class="w-6 h-6 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 flex items-center justify-center"><svg class="w-3 h-3 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span>
                Watch the 30-second tour
              </button>
            </div>
            <!-- A client -->
            <div class="mt-10 flex items-center gap-3">
              <img src="/images/stmark-logo.jpg" alt="" width="40" height="40" class="w-10 h-10 rounded-xl object-contain bg-white p-0.5 shadow ring-1 ring-black/5">
              <p class="text-sm text-slate-500 dark:text-slate-400 leading-snug">Trusted by <span class="font-semibold text-slate-800 dark:text-slate-100">St Mark's College Namagoma</span><br class="hidden sm:block"> - every class, every subject.</p>
            </div>
          </div>

          <!-- Product preview: a few eSpace pieces, floating -->
          <div class="reveal relative mx-auto w-full max-w-lg lg:max-w-none h-[31rem] sm:h-[30rem]" aria-hidden="true">
            <div class="absolute inset-x-4 sm:inset-x-10 top-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 shadow-xl shadow-slate-900/5 backdrop-blur p-5 float-a">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-[11px] font-medium text-slate-400">Good morning,</p>
                  <p class="font-jakarta text-lg font-bold">Ashley</p>
                </div>
                <span class="px-2 py-1 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300">5-day streak</span>
              </div>
              <div class="mt-4 grid grid-cols-4 gap-2">
                <div v-for="q in HERO_TILES" :key="q.label" class="rounded-xl bg-slate-50 dark:bg-white/5 p-2 text-center">
                  <span class="mx-auto mb-1 w-7 h-7 rounded-lg flex items-center justify-center bg-white text-slate-600 dark:bg-white/10 dark:text-slate-300"><AppIcon :name="q.icon" class="w-4 h-4" /></span>
                  <span class="text-[10px] font-semibold text-slate-600 dark:text-slate-300">{{ q.label }}</span>
                </div>
              </div>
              <div class="mt-4 flex items-center gap-3 rounded-2xl bg-indigo-600 p-3 text-white">
                <span class="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center"><AppIcon name="book" class="w-5 h-5" /></span>
                <span class="flex-1 min-w-0">
                  <span class="block text-[10px] font-bold uppercase tracking-wider text-indigo-100">Continue reading</span>
                  <span class="block text-sm font-bold truncate">Measurements in Physics</span>
                  <span class="mt-1 block h-1 rounded-full bg-white/25"><span class="block h-1 w-2/3 rounded-full bg-white"></span></span>
                </span>
              </div>
            </div>
            <div class="absolute left-0 bottom-2 sm:bottom-6 w-44 sm:w-48 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl p-4 float-b">
              <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Learning Map</p>
              <div class="flex items-center gap-3">
                <svg class="w-14 h-14 -rotate-90" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15.5" fill="none" stroke-width="4" class="stroke-slate-100 dark:stroke-white/10" /><circle cx="18" cy="18" r="15.5" fill="none" stroke-width="4" stroke-linecap="round" stroke="#10b981" stroke-dasharray="68 97.4" /></svg>
                <div>
                  <p class="font-jakarta text-xl font-extrabold">70%</p>
                  <p class="text-[10px] text-slate-500">outcomes achieved</p>
                </div>
              </div>
            </div>
            <div class="absolute right-0 sm:-right-2 bottom-[8.5rem] sm:bottom-16 w-52 sm:w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl p-4 float-c">
              <p class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400"><span class="w-2 h-2 rounded-full bg-red-500"></span>Live now</p>
              <p class="mt-1 text-sm font-bold">Photosynthesis Q&amp;A</p>
              <p class="text-[11px] text-slate-500 dark:text-slate-400">Biology · S.2</p>
              <span class="mt-3 inline-flex px-3 py-1 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold">Join now</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== Numbers ===== -->
      <section class="border-y border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.02]">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="n in NUMBERS" :key="n.label" class="reveal text-center lg:text-left">
            <p class="font-jakarta text-xl sm:text-3xl xl:text-4xl font-extrabold whitespace-nowrap text-slate-900 dark:text-white">{{ n.value }}</p>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">{{ n.label }}</p>
          </div>
        </div>
      </section>

      <!-- ===== Why ===== -->
      <section id="features" class="py-20 sm:py-28 scroll-mt-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="reveal max-w-2xl">
            <p :class="EYEBROW">Why schools choose eSpace</p>
            <h2 :class="H2">Teaching, learning and leading - finally in one place.</h2>
          </div>
          <div class="mt-12 grid lg:grid-cols-3 gap-5">
            <div v-for="p in PILLARS" :key="p.title" class="reveal group rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6 sm:p-7 hover:-translate-y-1 hover:shadow-lg transition">
              <span class="w-12 h-12 rounded-2xl flex items-center justify-center bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300"><AppIcon :name="p.icon" class="w-6 h-6" /></span>
              <h3 class="mt-5 font-jakarta text-xl font-bold">{{ p.title }}</h3>
              <p class="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{{ p.text }}</p>
              <ul class="mt-4 space-y-2">
                <li v-for="b in p.points" :key="b" class="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <AppIcon name="check-circle" class="w-4 h-4 mt-0.5 flex-shrink-0 text-indigo-500" />{{ b }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== Tour ===== -->
      <section id="tour" class="py-20 sm:py-28 bg-slate-50 dark:bg-white/[0.02] border-y border-slate-200 dark:border-white/10 scroll-mt-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="reveal text-center max-w-2xl mx-auto mb-10">
            <p :class="EYEBROW">See it in action</p>
            <h2 :class="H2">A look inside eSpace</h2>
          </div>
          <ProductTour class="reveal" @watch="watchTour" />
        </div>
      </section>

      <!-- ===== Try a lesson ===== -->
      <section id="try" class="py-20 sm:py-28 scroll-mt-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="reveal max-w-2xl mb-10">
            <p :class="EYEBROW">Try it yourself</p>
            <h2 :class="H2">Read a lesson like a student.</h2>
            <p class="mt-3 text-slate-600 dark:text-slate-400">Turn the pages, listen to the narration, then hand in the quick check - and watch your outcomes fill in, the way they do on a learner's Learning Map.</p>
          </div>
          <ENoteSample class="reveal" />
        </div>
      </section>

      <!-- ===== Modules ===== -->
      <section id="modules" class="py-20 sm:py-28 bg-slate-50 dark:bg-white/[0.02] border-y border-slate-200 dark:border-white/10 scroll-mt-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="reveal flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div class="max-w-2xl">
              <p :class="EYEBROW">The modules</p>
              <h2 :class="H2">{{ MODULES.length }} modules. One sign-in.</h2>
              <p class="mt-3 text-slate-600 dark:text-slate-400">Every part of school life that happens on a screen - built to work together, so what a student reads, attempts and achieves all lands on the same Learning Map.</p>
            </div>
            <div class="flex gap-1.5 overflow-x-auto [scrollbar-width:none] -mx-4 px-4 lg:mx-0 lg:px-0" role="tablist" aria-label="Module groups">
              <button
                v-for="c in [{ key: 'all', label: 'All' }, ...CATEGORIES]"
                :key="c.key"
                type="button"
                role="tab"
                :aria-selected="moduleFilter === c.key"
                class="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition"
                :class="moduleFilter === c.key ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 dark:bg-white/5 dark:text-slate-300 dark:border-white/10'"
                @click="moduleFilter = c.key"
              >{{ c.label }}</button>
            </div>
          </div>

          <TransitionGroup tag="div" name="mod" class="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button v-for="m in visibleModules" :key="m.key" type="button" class="group flex flex-col text-left rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-5 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 hover:border-indigo-200 dark:hover:border-indigo-400/30 focus-visible:ring-2 focus-visible:ring-indigo-500 transition" :aria-label="`${m.name} - more about this module`" @click="openModule(m)">
              <span class="w-11 h-11 rounded-xl flex items-center justify-center bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300"><AppIcon :name="m.icon" class="w-5 h-5" /></span>
              <h3 class="mt-4 font-jakarta text-base font-bold">{{ m.name }}</h3>
              <p class="mt-1.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{{ m.short }}</p>
              <p class="mt-3 flex flex-wrap gap-1">
                <span v-for="r in m.roles" :key="r" class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300">{{ ROLE_LABEL[r] }}</span>
              </p>
              <span class="mt-auto pt-4 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-300">
                More about {{ m.name }}
                <svg class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
              </span>
            </button>
          </TransitionGroup>
          <!-- Phones see the first six, then the rest on request -->
          <div v-if="visibleModules.length < shownModules.length" class="mt-6 text-center sm:hidden">
            <button type="button" class="px-5 py-2.5 rounded-xl text-sm font-semibold bg-white border border-slate-200 text-slate-700 dark:bg-white/5 dark:border-white/10 dark:text-slate-200" @click="allModules = true">Show all {{ shownModules.length }} modules</button>
          </div>
        </div>
      </section>

      <!-- ===== Who it's for ===== -->
      <section id="roles" class="py-20 sm:py-28 scroll-mt-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="reveal text-center max-w-2xl mx-auto">
            <p :class="EYEBROW">Who it's for</p>
            <h2 :class="H2">A space for everyone in the school</h2>
          </div>
          <div class="reveal mt-10 flex justify-center">
            <div class="inline-flex gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-white/5 overflow-x-auto max-w-full [scrollbar-width:none]" role="tablist">
              <button v-for="r in ROLES" :key="r.key" type="button" role="tab" :aria-selected="roleTab === r.key" class="flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition" :class="roleTab === r.key ? 'bg-white text-slate-900 shadow dark:bg-slate-800 dark:text-white' : 'text-slate-500 dark:text-slate-400'" @click="roleTab = r.key">{{ r.label }}</button>
            </div>
          </div>
          <Transition name="fade" mode="out-in">
            <div :key="activeRole.key" class="mt-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h3 class="font-jakarta text-2xl sm:text-3xl font-extrabold tracking-tight">{{ activeRole.headline }}</h3>
                <p class="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">{{ activeRole.text }}</p>
                <ul class="mt-6 grid sm:grid-cols-2 gap-3">
                  <li v-for="p in activeRole.points" :key="p" class="flex items-start gap-2.5 rounded-xl bg-slate-50 dark:bg-white/5 p-3 text-sm text-slate-700 dark:text-slate-200">
                    <AppIcon name="check-circle" class="w-4 h-4 mt-0.5 flex-shrink-0 text-indigo-500" />{{ p }}
                  </li>
                </ul>
                <div class="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  <router-link :to="activeRole.page" class="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">
                    eSpace for {{ activeRole.label.toLowerCase() }}
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                  </router-link>
                  <router-link :to="`/guide#${activeRole.key}`" class="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:underline">Read the guide</router-link>
                </div>
              </div>
              <div class="rounded-3xl p-6 sm:p-8 bg-slate-900 text-white dark:bg-white/5 dark:border dark:border-white/10">
                <p class="text-xs font-bold uppercase tracking-widest opacity-80">A day with eSpace</p>
                <ol class="mt-5 space-y-4">
                  <li v-for="(s, i) in activeRole.day" :key="s.time" class="flex gap-4">
                    <span class="flex-shrink-0 w-14 text-sm font-bold opacity-90">{{ s.time }}</span>
                    <span class="flex-1 pb-4" :class="i < activeRole.day.length - 1 ? 'border-b border-white/20' : ''">
                      <span class="block text-sm font-semibold">{{ s.what }}</span>
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          </Transition>
        </div>
      </section>

      <!-- ===== Curriculum + try the Learning Map ===== -->
      <section id="learning-map" class="py-20 sm:py-28 bg-slate-900 text-white scroll-mt-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="reveal">
              <p class="text-sm font-bold uppercase tracking-widest text-indigo-300">Competency-based, by design</p>
              <h2 class="mt-3 font-jakarta text-3xl sm:text-4xl font-extrabold tracking-tight">From one learning outcome to the end-of-term report.</h2>
              <p class="mt-4 text-slate-300 leading-relaxed">Teachers link each assessment to the curriculum. eSpace does the rest: every marked answer updates the learner's Learning Map, shows the class what to reteach, and feeds straight into the report card.</p>
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

      <!-- ===== How it works ===== -->
      <section id="how" class="py-20 sm:py-28 scroll-mt-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="reveal text-center max-w-2xl mx-auto">
            <p :class="EYEBROW">How it works</p>
            <h2 :class="H2">Your school, live in weeks - not terms</h2>
          </div>
          <div class="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div v-for="(s, i) in STEPS" :key="s.title" class="reveal relative rounded-3xl border border-slate-200 dark:border-white/10 p-6">
              <span class="font-jakarta text-5xl font-extrabold text-slate-100 dark:text-white/10 absolute top-4 right-5">{{ i + 1 }}</span>
              <span class="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300 flex items-center justify-center"><AppIcon :name="s.icon" class="w-5 h-5" /></span>
              <h3 class="mt-4 font-jakarta text-lg font-bold">{{ s.title }}</h3>
              <p class="mt-1.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{{ s.text }}</p>
            </div>
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
                    <p class="text-xs text-slate-300">Running on eSpace</p>
                  </div>
                </div>
                <p class="mt-6 font-jakarta text-2xl sm:text-3xl font-bold leading-snug">Every class, every subject - on one platform.</p>
                <p class="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">At St Mark's, students read their notes, revise from the library, join live lessons and hand in their assessments on eSpace - and teachers follow each class, outcome by outcome, through to the end-of-term report card.</p>
              </div>
              <!-- Live from eSpace - only figures big enough to mean something -->
              <div v-if="liveStats.length" class="mt-10 flex flex-wrap gap-px rounded-2xl overflow-hidden bg-white/10 max-w-4xl">
                <div v-for="s in liveStats" :key="s.key" class="flex-1 basis-[45%] sm:basis-0 bg-slate-950/70 backdrop-blur px-4 py-4 sm:px-5">
                  <p class="font-jakarta text-2xl sm:text-3xl font-extrabold tabular-nums">{{ s.shown.toLocaleString() }}</p>
                  <p class="text-xs sm:text-sm text-slate-300">{{ s.label }}</p>
                </div>
              </div>
              <p v-if="liveStats.length" class="mt-3 text-[11px] text-slate-400">Live totals from eSpace.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== Your data ===== -->
      <section id="trust" class="py-20 sm:py-28 bg-slate-50 dark:bg-white/[0.02] border-y border-slate-200 dark:border-white/10 scroll-mt-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="reveal max-w-2xl">
            <p :class="EYEBROW">Your data, your school</p>
            <h2 :class="H2">Safe, private - and built for the phones and connections learners really have.</h2>
          </div>
          <div class="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
            <div v-for="t in TRUST" :key="t.title" class="reveal flex gap-4">
              <span class="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center bg-white border border-slate-200 text-indigo-600 dark:bg-white/5 dark:border-white/10 dark:text-indigo-300"><AppIcon :name="t.icon" class="w-5 h-5" /></span>
              <div>
                <h3 class="font-jakarta text-base font-bold">{{ t.title }}</h3>
                <p class="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{{ t.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== Pricing ===== -->
      <section id="pricing" class="py-20 sm:py-28 scroll-mt-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="reveal text-center max-w-2xl mx-auto">
            <p :class="EYEBROW">Pricing</p>
            <h2 :class="H2">Simple, per learner, everything included</h2>
          </div>
          <div class="reveal mt-12 grid lg:grid-cols-[1.1fr_1fr] rounded-3xl border border-slate-200 dark:border-white/10 overflow-hidden">
            <div class="p-8 sm:p-10">
              <p class="font-jakarta text-2xl sm:text-3xl font-extrabold">{{ PRICING.model }}</p>
              <p class="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">{{ PRICING.note }}</p>
              <ul class="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-3">
                <li v-for="i in PRICING.included" :key="i" class="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-200">
                  <AppIcon name="check-circle" class="w-4 h-4 mt-0.5 flex-shrink-0 text-indigo-500" />{{ i }}
                </li>
              </ul>
              <a href="#demo" class="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition">Get a quote for your school</a>
            </div>
            <div class="p-8 sm:p-10 bg-slate-50 dark:bg-white/[0.03] border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-white/10">
              <p class="text-sm font-bold uppercase tracking-widest text-slate-400">How it goes</p>
              <ol class="mt-6 space-y-6">
                <li v-for="(s, i) in PRICING.steps" :key="s.title" class="flex gap-4">
                  <span class="flex-shrink-0 w-8 h-8 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 flex items-center justify-center text-sm font-bold">{{ i + 1 }}</span>
                  <span>
                    <span class="block font-semibold">{{ s.title }}</span>
                    <span class="block text-sm text-slate-600 dark:text-slate-400">{{ s.text }}</span>
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== What's new ===== -->
      <section id="new" class="pb-20 sm:pb-28 scroll-mt-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="reveal flex flex-wrap items-end justify-between gap-4">
            <div class="max-w-2xl">
              <p :class="EYEBROW">What's new</p>
              <h2 :class="H2">eSpace gets better every week.</h2>
            </div>
            <p class="text-sm text-slate-500 dark:text-slate-400">Every school gets each improvement the day it ships.</p>
          </div>
          <ol class="mt-10 relative border-l-2 border-slate-200 dark:border-white/10 ml-2 sm:ml-3 space-y-8">
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
          <div v-if="CHANGELOG.length > 4" class="mt-8 ml-9 sm:ml-12">
            <button type="button" class="text-sm font-semibold text-indigo-600 dark:text-indigo-300 hover:underline" @click="allChanges = !allChanges">{{ allChanges ? 'Show less' : `Show all ${CHANGELOG.length} updates` }}</button>
          </div>
        </div>
      </section>

      <!-- ===== Team ===== -->
      <section id="team" class="py-20 sm:py-28 bg-slate-50 dark:bg-white/[0.02] border-y border-slate-200 dark:border-white/10 scroll-mt-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">
            <div class="reveal lg:sticky lg:top-28">
              <p :class="EYEBROW">Meet the team</p>
              <h2 :class="H2">Four people. One mission.</h2>
              <p class="mt-3 text-slate-600 dark:text-slate-400">An executive director and three stakeholders who build eSpace and stay close to the schools that use it - you talk to the people who make it.</p>
              <div class="mt-8 rounded-2xl border-l-4 border-indigo-500 bg-white dark:bg-white/5 p-5">
                <p class="font-jakarta font-bold">{{ STORY.title }}</p>
                <p v-for="p in STORY.paragraphs" :key="p" class="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{{ p }}</p>
              </div>
            </div>
            <div>
              <!-- The executive director leads, in a larger card -->
              <div v-if="teamLead" class="reveal rounded-3xl bg-slate-900 text-white dark:bg-white/5 dark:border dark:border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
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

              <!-- Then the stakeholders -->
              <p class="reveal mt-8 mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">Stakeholders</p>
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
            <h2 :class="H2">Asked by schools like yours</h2>
          </div>
          <div class="mt-10 divide-y divide-slate-200 dark:divide-white/10 border-y border-slate-200 dark:border-white/10">
            <div v-for="(f, i) in FAQ" :key="f.q">
              <button type="button" class="w-full flex items-center justify-between gap-4 py-5 text-left" :aria-expanded="openFaq === i" @click="openFaq = openFaq === i ? -1 : i">
                <span class="font-semibold text-slate-900 dark:text-white">{{ f.q }}</span>
                <span class="w-7 h-7 flex-shrink-0 rounded-full border border-slate-300 dark:border-white/20 flex items-center justify-center transition" :class="openFaq === i ? 'rotate-45 bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900' : ''">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 5v14m7-7H5"></path></svg>
                </span>
              </button>
              <p v-if="openFaq === i" class="pb-5 -mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{{ f.a }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== Request a demo ===== -->
      <section id="demo" class="pb-20 sm:pb-28 scroll-mt-20">
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
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
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
import { useReveal } from '@/components/site/useReveal'
import { useSiteScale } from '@/components/site/useSiteScale'
import { MODULES, CATEGORIES, ROLE_LABEL, type ModuleCategory, type EModule } from '@/data/modules'
import { CHANGELOG } from '@/data/changelog'
import { teamLead, teamStakeholders } from '@/data/team'
import { PRICING, TRUST, STORY, STAT_LABELS } from '@/data/site'

const EYEBROW = 'text-sm font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-300'
const H2 = 'mt-3 font-jakarta text-3xl sm:text-4xl font-extrabold tracking-tight'

const HERO_TILES = [
  { label: 'eNotes', icon: 'document' },
  { label: 'Library', icon: 'book' },
  { label: 'Videos', icon: 'video' },
  { label: 'Tests', icon: 'pencil' }
]

const NUMBERS = [
  { value: `${MODULES.length}`, label: 'modules in one sign-in' },
  { value: '4', label: 'roles: students, teachers, HODs, admins' },
  { value: 'Offline', label: 'notes and books work without internet' },
  { value: 'LOA·AOI·EOC', label: 'competency-based assessment built in' }
]

const PILLARS = [
  { title: 'Learn anywhere', icon: 'book', text: 'Notes, textbooks, past papers and videos that students open on any phone or computer - even offline.', points: ['Read page by page, with narration', 'Save for offline, sync later', 'Continue where you stopped'] },
  { title: 'Teach with insight', icon: 'map', text: 'Set competency-based work, mark it on screen, and see straight away which outcomes the class still needs.', points: ['LOA, AOI and EOC assessments', 'Mark typed, drawn or uploaded work', 'Reteach the outcomes that need it'] },
  { title: 'Lead with clarity', icon: 'chart', text: 'Heads of department and administrators see coverage, engagement and results across every class, as it happens.', points: ['Curriculum coverage by topic', 'Engagement and quiet learners', 'Report cards in a few clicks'] }
]

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
const shownChanges = computed(() => (allChanges.value ? CHANGELOG : CHANGELOG.slice(0, 4)))
const niceDate = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

const moduleFilter = ref<ModuleCategory | 'all'>('all')
const shownModules = computed(() => moduleFilter.value === 'all' ? MODULES : MODULES.filter(m => m.category === moduleFilter.value))
// On a phone the full list is long - six to start with
const isPhone = ref(false)
const allModules = ref(false)
const visibleModules = computed(() => (isPhone.value && !allModules.value ? shownModules.value.slice(0, 6) : shownModules.value))

const ROLES = [
  {
    key: 'student', label: 'Students', page: '/for/students',
    headline: 'Everything for your classes, in your pocket.',
    text: 'Your notes, books, videos and assessments in one place - with a Learning Map that shows exactly what you can already do and what to work on next.',
    points: ['Continue reading where you stopped', 'Join live classes in one tap', 'Attempt and hand in assessments', 'See your marks and Learning Map', 'Save notes to read offline', 'Earn badges for improving'],
    day: [{ time: '7:30', what: 'Reads the next pages of Physics eNotes on the way in' }, { time: '11:00', what: 'Joins the live Biology Q&A from the dashboard' }, { time: '4:00', what: 'Hands in the LOA on measurements before the deadline' }, { time: '8:00', what: 'Sees it marked - and a new outcome turns green' }]
  },
  {
    key: 'teacher', label: 'Teachers', page: '/for/teachers',
    headline: 'Spend your time teaching - not chasing paper.',
    text: 'Write eNotes, share books and videos, set competency-based assessments and mark them on screen. eSpace keeps track of who has read, watched and handed in.',
    points: ['Write interactive eNotes', 'Build LOA / AOI / EOC assessments', 'Mark on screen, with annotations', 'See who needs support, by outcome', 'Run live classes with attendance', 'Message any student directly'],
    day: [{ time: '7:00', what: 'Dashboard: 11 scripts to mark, 1 live class today' }, { time: '10:00', what: 'Marks the S.1 LOA on screen between lessons' }, { time: '2:00', what: 'Learning Map flags one outcome - creates a support group' }, { time: '5:00', what: 'Messages the three students who haven\'t opened the notes' }]
  },
  {
    key: 'hod', label: 'HODs', page: '/for/teachers',
    headline: 'Your whole department, at a glance.',
    text: 'See curriculum coverage, engagement and results across every teacher and class in your department - and approve what goes out to students.',
    points: ['Department-wide dashboards', 'Approve shared content', 'Curriculum coverage by topic', 'Marksheets for any class', 'Engagement across classes', 'Teach your own classes too'],
    day: [{ time: '8:00', what: 'Checks coverage: two topics still have no AOI' }, { time: '12:00', what: 'Approves new eLibrary books for S.3' }, { time: '3:00', what: 'Compares marksheets across all streams' }]
  },
  {
    key: 'admin', label: 'Admins', page: '/for/schools',
    headline: 'Run the school\'s digital space with ease.',
    text: 'Set up classes, streams, subjects and terms, manage every account, generate report cards and keep an eye on the whole school.',
    points: ['Classes, streams, subjects, terms', 'Students, teachers and HODs', 'Promotion between years', 'Report cards and settings', 'School-wide analytics', 'System logs and backups'],
    day: [{ time: 'Start of term', what: 'Opens the new term and promotes students in one go' }, { time: 'Weekly', what: 'Reviews engagement across the school' }, { time: 'End of term', what: 'Generates and publishes report cards' }]
  }
] as const
const roleTab = ref<(typeof ROLES)[number]['key']>('student')
const activeRole = computed(() => ROLES.find(r => r.key === roleTab.value) ?? ROLES[0])

const CBC = [
  { code: 'LOA', name: 'Learning Outcome Assessment', text: 'Short checks on single outcomes - each one updates the learner\'s map.' },
  { code: 'AOI', name: 'Activity of Integration', text: 'Real-life tasks that show a topic\'s competency in action.' },
  { code: 'EOC', name: 'Elements of Construct', text: 'End-of-chapter work against the assessment objectives.' },
  { code: 'RC', name: 'Report card', text: 'Generated from all of the above - nothing typed in twice.' }
]

const STEPS = [
  { title: 'We set up your school', icon: 'wrench', text: 'Classes, streams, subjects, terms and accounts - imported and ready, with your crest on every report.' },
  { title: 'Teachers add content', icon: 'upload', text: 'eNotes, books, videos and assessments, linked to the curriculum. We train every teacher.' },
  { title: 'Students learn anywhere', icon: 'book', text: 'On any phone or computer, in school or at home - and offline when the internet drops.' },
  { title: 'Everyone sees progress', icon: 'chart', text: 'Learning Maps, coverage and engagement update as work is marked - right through to report cards.' }
]

const initials = (name: string) => name.split(/\s+/).filter(Boolean).map(w => w[0]).slice(0, 2).join('').toUpperCase()

const FAQ = [
  { q: 'Do students need a computer?', a: 'No. eSpace works on any smartphone, tablet or computer with a browser. Notes and books can be saved to the device to read without internet, and anything done offline is sent when the device reconnects.' },
  { q: 'How much does it cost?', a: 'One price per learner, per term, depending on the size of your school - with every module, setup, training and support included. Request a demo and we will send a quote with a plan for your first term.' },
  { q: 'Does it follow the competency-based curriculum?', a: 'Yes - it\'s built around it. Assessments are tagged as LOA, AOI or EOC and linked to learning outcomes, topics and constructs, and every marked result feeds the Learning Map and the report card.' },
  { q: 'How long does it take to get started?', a: 'Usually a few weeks. We set up your classes, subjects and accounts, then train teachers module by module. Your school can start with eNotes and assessments and grow from there.' },
  { q: 'Who owns our school\'s content and data?', a: 'Your school does. Your notes, books, assessments and results belong to you, are only visible to your own staff and students, and can be exported.' },
  { q: 'Can parents or the school leadership see progress?', a: 'School leadership - heads of department and administrators - have their own views of coverage, engagement and results. Report cards can be printed for parents at the end of every term.' }
]

const openFaq = ref(0)

// Live totals, counted up when they come into view
const stats = ref<Record<string, number>>({})
const countUp = ref(0)
const liveStats = computed(() => STAT_LABELS
  .filter(s => (stats.value[s.key] ?? 0) >= s.min)
  .slice(0, 4)
  .map(s => ({ ...s, shown: Math.round((stats.value[s.key] ?? 0) * countUp.value) })))

let statObserver: IntersectionObserver | null = null
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
  isPhone.value = window.matchMedia('(max-width: 639px)').matches
  try {
    const { data } = await axios.get('/api/public/stats')
    stats.value = data?.data ?? {}
  } catch {
    // No totals - the section reads fine without them
  }
  const el = document.getElementById('proof')
  if (el && 'IntersectionObserver' in window) {
    statObserver = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { runCountUp(); statObserver?.disconnect() }
    }, { threshold: 0.3 })
    statObserver.observe(el)
  } else {
    countUp.value = 1
  }
})
onBeforeUnmount(() => statObserver?.disconnect())

useReveal()

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
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
