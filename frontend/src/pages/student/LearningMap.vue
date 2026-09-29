<template>
  <div>
    <!-- Header -->
    <div class="flex items-center gap-2 mb-1">
      <div class="hidden sm:flex w-7 h-7 rounded-lg bg-emerald-600 items-center justify-center flex-shrink-0">
        <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
        </svg>
      </div>
      <h1 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight">My Learning Map</h1>
    </div>
    <p class="text-xs text-gray-500 dark:text-gray-400 mb-5">
      <template v-if="view === 'outcomes'">Every learning outcome for your class<template v-if="data?.year"> in {{ data.year }}</template>, and where you stand on each</template>
      <template v-else-if="view === 'competencies'">The competency at the end of every topic<template v-if="data?.year"> in {{ data.year }}</template>, and the level your Activity of Integration shows you've reached</template>
      <template v-else>The Elements of Construct - what you must achieve across several topics - and the level your End of Chapter assessments show you've reached</template>
      - it fills in as your teachers return your assessments.
    </p>

    <!-- Loading -->
    <div v-if="loading" class="space-y-4 animate-pulse">
      <div class="h-28 rounded-2xl bg-gray-200 dark:bg-gray-700"></div>
      <div class="flex gap-3">
        <div v-for="i in 4" :key="i" class="h-24 w-40 rounded-xl bg-gray-200 dark:bg-gray-700"></div>
      </div>
      <div class="h-64 rounded-2xl bg-gray-200 dark:bg-gray-700"></div>
    </div>

    <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-5 text-sm text-red-800 dark:text-red-200">{{ error }}</div>

    <div v-else-if="!data || !data.subjects.length" class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <p class="text-lg font-medium text-gray-900 dark:text-white mb-1">Your map is on its way</p>
      <p class="text-sm text-gray-500 dark:text-gray-400">Your school hasn't set up this year's curriculum for your class yet.</p>
    </div>

    <template v-else>
      <!-- Three views of the same map, each built on the one before: the learning outcomes, the
           competency at the end of each topic (its Activity of Integration), and the Elements of
           Construct that group topics (End of Chapter). Picking one switches everything below. -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
        <button
          v-for="card in viewCards"
          :key="card.key"
          type="button"
          class="text-left bg-white dark:bg-gray-800 rounded-2xl border p-4 flex items-center gap-4 transition-all hover:-translate-y-0.5"
          :class="view === card.key ? card.selected : 'border-gray-200 dark:border-gray-700'"
          :aria-pressed="view === card.key"
          @click="setView(card.key)"
        >
          <ProgressRing :percent="card.percent" :size="76" :stroke="8" :color="card.color">
            <span class="text-base font-bold text-gray-900 dark:text-white"><CountUp :value="`${card.percent}%`" /></span>
          </ProgressRing>
          <div class="min-w-0 flex-1">
            <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ card.title }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400"><CountUp :value="card.achieved" /> of {{ card.total }} {{ card.noun }}</p>
            <p class="text-[11px] mt-1" :class="view === card.key ? card.accent : 'text-gray-400 dark:text-gray-500'">{{ view === card.key ? 'Showing below' : 'Tap to see them' }}</p>
          </div>
        </button>
      </div>

      <!-- What the colours mean in this view -->
      <div class="flex flex-wrap gap-2 mb-5">
        <span v-for="s in legend" :key="s.key" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium" :class="s.chip">
          <span class="w-2 h-2 rounded-full" :class="s.dot"></span>{{ s.label }} <span class="font-bold">{{ s.count }}</span>
        </span>
      </div>

      <!-- Subjects: when they don't all fit, they drift slowly to the right on their own, looping
           round (a second copy follows the first); resting a pointer or finger on them pauses the
           drift so a card is easy to pick -->
      <div
        ref="subjectsViewport"
        class="subjects-viewport mb-4 -mx-1"
        :class="drifting ? 'is-drifting' : 'overflow-x-auto'"
      >
        <div
          ref="subjectsTrack"
          class="subjects-track flex w-max py-1.5"
          :style="drifting ? { animationDuration: `${driftSeconds}s` } : undefined"
        >
          <div
            v-for="copy in (drifting ? 2 : 1)"
            :key="copy"
            class="flex gap-3 px-1.5"
            :aria-hidden="copy === 2 ? 'true' : undefined"
          >
            <button
              v-for="subject in data.subjects"
              :key="`${copy}-${subject.id}`"
              type="button"
              :tabindex="copy === 2 ? -1 : undefined"
              class="flex-shrink-0 w-44 text-left bg-white dark:bg-gray-800 rounded-xl border p-3 transition-all hover:-translate-y-0.5"
              :class="subject.id === activeSubjectId ? VIEW_SELECTED[view] : 'border-gray-200 dark:border-gray-700'"
              @click="selectSubject(subject.id)"
            >
              <div class="flex items-center gap-3">
                <ProgressRing :percent="subjectView(subject).percent" :size="46" :stroke="5" :color="viewColor">
                  <span class="text-[11px] font-bold text-gray-800 dark:text-gray-100">{{ subjectView(subject).percent }}%</span>
                </ProgressRing>
                <div class="min-w-0">
                  <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ subject.name }}</p>
                  <p class="text-[11px] text-gray-500 dark:text-gray-400">{{ subjectView(subject).achieved }}/{{ subjectView(subject).total }} {{ VIEW_UNIT[view] }}</p>
                  <p v-if="subjectView(subject).toDo" class="text-[11px] font-semibold text-indigo-600 dark:text-indigo-300">{{ subjectView(subject).toDo }} to do</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Selected subject -->
      <div v-if="activeSubject" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
        <div class="flex flex-wrap items-center gap-2 mb-4">
          <h2 class="text-base font-bold text-gray-900 dark:text-white mr-auto">{{ activeSubject.name }}</h2>
          <div v-if="view !== 'constructs'" class="flex gap-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-900/50">
            <button
              v-for="term in termTabs"
              :key="term.key"
              type="button"
              class="px-2.5 py-1 rounded-md text-xs font-medium transition-colors"
              :class="activeTerm === term.key ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800'"
              @click="activeTerm = term.key"
            >
              {{ term.label }}<span v-if="term.current" class="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 align-middle" title="This term"></span>
            </button>
          </div>
          <label class="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300 cursor-pointer select-none">
            <input v-model="onlyToDo" type="checkbox" class="w-3.5 h-3.5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500">
            Only what needs attention
          </label>
        </div>

        <div v-if="view !== 'constructs' && !shownTopics.length" class="text-center py-10 text-sm text-gray-500 dark:text-gray-400">
          {{ onlyToDo ? 'Nothing needs your attention here - well done.' : 'No topics for this term yet.' }}
        </div>
        <div v-else-if="view === 'constructs' && !shownConstructs.length" class="text-center py-10 text-sm text-gray-500 dark:text-gray-400">
          {{ onlyToDo ? 'Nothing needs your attention here - well done.' : 'No Elements of Construct have been set for this subject yet.' }}
        </div>

        <!-- The path: one stop per topic - its outcomes... -->
        <ol v-else-if="view === 'outcomes'" class="relative">
          <li v-for="(topic, i) in shownTopics" :key="topic.id" :data-topic="topic.id" class="relative pl-12 sm:pl-14 pb-5 last:pb-0">
            <span v-if="i < shownTopics.length - 1" class="absolute left-[21px] sm:left-[25px] top-11 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden="true"></span>
            <div class="absolute left-0 top-0">
              <ProgressRing :percent="topicPercent(topic)" :size="44" :stroke="5" :color="topicColor(topic)">
                <svg v-if="topicPercent(topic) === 100" class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                <span v-else class="text-[10px] font-bold text-gray-700 dark:text-gray-200">{{ topicPercent(topic) }}%</span>
              </ProgressRing>
            </div>

            <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-900/30">
              <button type="button" class="w-full text-left p-3 sm:p-4 flex items-start gap-3" @click="toggle(topic.id)">
                <div class="min-w-0 flex-1">
                  <p v-if="topic.theme" class="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 truncate">{{ topic.theme }}<template v-if="activeTerm === 'all' && topic.term_name"> · {{ topic.term_name }}</template></p>
                  <p class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-snug">{{ topic.topic }}</p>
                  <!-- Outcomes at a glance -->
                  <div class="flex gap-1 mt-2" :title="`${topic.summary.achieved} of ${topic.summary.outcomes} outcomes achieved`">
                    <span v-for="o in topic.outcomes" :key="o.id" class="h-1.5 flex-1 max-w-[42px] rounded-full" :class="statusStyle(o.status).bar"></span>
                  </div>
                  <div class="flex flex-wrap items-center gap-1.5 mt-2">
                    <span class="text-[11px] text-gray-500 dark:text-gray-400">{{ topic.summary.achieved }}/{{ topic.summary.outcomes }} outcomes</span>
                    <span v-if="topic.aoi" class="px-1.5 py-0.5 rounded text-[10px] font-semibold" :class="statusStyle(topic.aoi.status).chip">
                      Activity of Integration: {{ topic.aoi.level ? `${topic.aoi.level} · ${topic.aoi.percentage}%` : statusStyle(topic.aoi.status).label }}
                    </span>
                    <span v-if="topic.eoc" class="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">End of chapter: {{ topic.eoc.level }} · {{ topic.eoc.percentage }}%</span>
                    <span v-if="topic.enote" class="px-1.5 py-0.5 rounded text-[10px] font-semibold" :class="topic.enote.opened ? 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'">
                      {{ topic.enote.opened ? 'Notes read' : 'Notes available' }}
                    </span>
                  </div>
                </div>
                <svg class="w-4 h-4 mt-1 text-gray-400 flex-shrink-0 transition-transform" :class="{ 'rotate-180': open[topic.id] }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>

              <div v-if="open[topic.id]" class="px-3 sm:px-4 pb-3 sm:pb-4">
                <p v-if="topic.competence" class="text-xs text-gray-600 dark:text-gray-300 mb-3 p-2.5 rounded-lg bg-white/70 dark:bg-gray-800/60 border border-dashed border-gray-200 dark:border-gray-700">
                  <span class="font-semibold">Competency:</span> {{ topic.competence }}
                </p>
                <ul class="space-y-2">
                  <li v-for="o in topic.outcomes" :key="o.id" class="flex flex-wrap sm:flex-nowrap items-start gap-x-2.5 gap-y-1.5">
                    <span class="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" :class="statusStyle(o.status).icon">
                      <svg v-if="o.status === 'achieved'" class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                      <svg v-else-if="o.status === 'awaiting'" class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3"></path></svg>
                      <span v-else-if="o.status !== 'not_assessed'" class="w-1.5 h-1.5 rounded-full bg-current"></span>
                    </span>
                    <div class="min-w-0 flex-1 basis-[calc(100%-30px)] sm:basis-auto">
                      <p class="text-sm text-gray-800 dark:text-gray-100 leading-snug">{{ o.text }}</p>
                      <p class="text-[11px] mt-0.5" :class="statusStyle(o.status).text">
                        {{ o.level ? `${o.level} · ${o.percentage}%` : statusStyle(o.status).label }}
                      </p>
                      <!-- Not there yet: go back to the page it's taught on, and practise it -->
                      <div v-if="(o.status === 'needs_support' || o.status === 'developing') && (o.revise || topic.practice.length)" class="flex flex-wrap gap-1.5 mt-1.5">
                        <RouterLink v-if="o.revise" :to="`/student/enotes/${o.revise.topic_id}?resumePage=${o.revise.page_id}`" class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-violet-50 text-violet-700 border border-violet-200 hover:bg-violet-100 dark:bg-violet-900/30 dark:text-violet-200 dark:border-violet-800">Revise the page it's taught on</RouterLink>
                        <RouterLink v-for="item in topic.practice.slice(0, 2)" :key="item.id" :to="`/student/itembank?open=${item.id}`" class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-800">Practise: {{ item.title }}</RouterLink>
                      </div>
                    </div>
                    <template v-for="action in [outcomeAction(o)]" :key="'a' + o.id">
                      <RouterLink
                        v-if="action"
                        :to="action.to"
                        class="flex-shrink-0 ml-[30px] sm:ml-0 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors"
                        :class="action.primary ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600'"
                      >{{ action.label }}</RouterLink>
                    </template>
                  </li>
                </ul>
                <div v-if="topic.enote || (topic.aoi && topicAction(topic)) || topic.practice.length" class="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <RouterLink v-if="topic.enote" :to="`/student/enotes/${topic.enote.id}`" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-violet-600 text-white hover:bg-violet-700">
                    {{ topic.enote.opened ? 'Read the notes again' : 'Read the notes' }}
                  </RouterLink>
                  <RouterLink v-if="topic.aoi && topicAction(topic)" :to="topicAction(topic)!.to" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700">
                    {{ topicAction(topic)!.label }} the Activity of Integration
                  </RouterLink>
                  <RouterLink v-for="item in topic.practice" :key="'p' + item.id" :to="`/student/itembank?open=${item.id}`" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-800">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
                    Practise: {{ item.title }}
                  </RouterLink>
                </div>
              </div>
            </div>
          </li>
        </ol>

        <!-- ...or its competency: the level the Activity of Integration shows, on the report card's
             five-step scale, built on the topic's learning outcomes -->
        <ol v-else-if="view === 'competencies'" class="relative">
          <li v-for="(topic, i) in shownTopics" :key="topic.id" :data-competency="topic.id" class="relative pl-12 sm:pl-14 pb-5 last:pb-0">
            <span v-if="i < shownTopics.length - 1" class="absolute left-[21px] sm:left-[25px] top-11 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden="true"></span>
            <div class="absolute left-0 top-0">
              <ProgressRing :percent="topic.competency.percentage ?? 0" :size="44" :stroke="5" :color="gradeStyle(topic.competency.grade)?.color ?? '#9ca3af'">
                <span v-if="topic.competency.grade" class="text-sm font-extrabold" :style="{ color: gradeStyle(topic.competency.grade)!.color }">{{ topic.competency.grade }}</span>
                <svg v-else-if="topic.competency.status === 'awaiting'" class="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span v-else class="text-[10px] font-bold text-gray-400">&ndash;</span>
              </ProgressRing>
            </div>

            <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-900/30">
              <button type="button" class="w-full text-left p-3 sm:p-4 flex items-start gap-3" @click="toggle(topic.id)">
                <div class="min-w-0 flex-1">
                  <p v-if="topic.theme" class="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 truncate">{{ topic.theme }}<template v-if="activeTerm === 'all' && topic.term_name"> · {{ topic.term_name }}</template></p>
                  <p class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-snug">{{ topic.topic }}</p>
                  <p class="text-xs text-gray-600 dark:text-gray-300 mt-1 italic leading-snug">
                    {{ topic.competency.text ? `“${topic.competency.text}”` : 'The competency for this topic hasn\'t been written yet' }}
                  </p>

                  <!-- The five levels, Elementary to Exceptional, lit up to the one reached -->
                  <div class="mt-2.5" :title="topic.competency.level ? `${topic.competency.level} (${topic.competency.grade}) · ${topic.competency.percentage}%` : statusStyle(topic.competency.status).label">
                    <div class="flex gap-1">
                      <span
                        v-for="g in LADDER"
                        :key="g"
                        class="h-2 flex-1 max-w-[56px] rounded-full transition-colors"
                        :style="reached(topic, g) ? { background: gradeStyle(topic.competency.grade)!.color } : undefined"
                        :class="reached(topic, g) ? '' : 'bg-gray-200 dark:bg-gray-700'"
                      ></span>
                    </div>
                    <div class="flex gap-1 mt-0.5" aria-hidden="true">
                      <span v-for="g in LADDER" :key="g" class="flex-1 max-w-[56px] text-center text-[9px] font-bold" :class="topic.competency.grade === g ? '' : 'text-gray-300 dark:text-gray-600'" :style="topic.competency.grade === g ? { color: gradeStyle(g)!.color } : undefined">{{ g }}</span>
                    </div>
                    <div class="flex flex-wrap items-center gap-1.5 mt-2">
                      <span v-if="topic.competency.grade" class="px-1.5 py-0.5 rounded text-[10px] font-bold" :class="gradeStyle(topic.competency.grade)!.chip">
                        {{ topic.competency.level }} · {{ topic.competency.grade }} · {{ topic.competency.percentage }}%
                      </span>
                      <span v-else class="px-1.5 py-0.5 rounded text-[10px] font-semibold" :class="statusStyle(topic.competency.status).chip">
                        {{ competencyStatusLabel(topic.competency.status) }}
                      </span>
                      <span class="text-[11px] text-gray-500 dark:text-gray-400">Built on {{ topic.competency.building_blocks.achieved }}/{{ topic.competency.building_blocks.outcomes }} outcomes</span>
                      <span v-if="topic.evidence.confirmed" class="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-200">{{ topic.evidence.confirmed }} evidence confirmed</span>
                      <span v-else-if="topic.evidence.pending" class="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-200">Evidence with your teacher</span>
                    </div>
                  </div>
                </div>
                <svg class="w-4 h-4 mt-1 text-gray-400 flex-shrink-0 transition-transform" :class="{ 'rotate-180': open[topic.id] }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>

              <div v-if="open[topic.id]" class="px-3 sm:px-4 pb-3 sm:pb-4 space-y-3">
                <!-- What the level means -->
                <p v-if="topic.competency.grade" class="text-xs p-2.5 rounded-lg border" :class="gradeStyle(topic.competency.grade)!.note">
                  You demonstrate <span class="font-semibold">{{ topic.competency.level!.toLowerCase() }}</span> competence<template v-if="topic.competency.text"> in {{ asGerund(topic.competency.text) }}</template>.
                  <template v-if="gradeUp(topic.competency.grade)"> Next level: <span class="font-semibold">{{ gradeUp(topic.competency.grade) }}</span>.</template>
                </p>

                <!-- The Activity of Integration(s) that assess it -->
                <div>
                  <p class="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Activity of Integration</p>
                  <p v-if="!topic.competency.assessments.length" class="text-xs text-gray-500 dark:text-gray-400">Your teacher hasn't set one for this topic yet.</p>
                  <ul v-else class="space-y-1.5">
                    <li v-for="a in topic.competency.assessments" :key="a.id" class="flex flex-wrap sm:flex-nowrap items-center gap-2">
                      <span class="text-sm text-gray-800 dark:text-gray-100 flex-1 min-w-0 truncate">{{ a.title }}</span>
                      <span class="text-[11px]" :class="a.percentage !== null ? 'font-semibold text-gray-700 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400'">
                        {{ a.percentage !== null ? `${a.percentage}%` : ASSESSMENT_STATE[a.state] }}
                      </span>
                      <RouterLink
                        v-if="actionFor(a)"
                        :to="actionFor(a)!.to"
                        class="px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors"
                        :class="actionFor(a)!.primary ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600'"
                      >{{ actionFor(a)!.label }}</RouterLink>
                    </li>
                  </ul>
                </div>

                <!-- Evidence the student has of this competency -->
                <EvidencePanel :topic-id="topic.id" @changed="refreshEvidence(topic)" />

                <!-- Its building blocks: the topic's learning outcomes -->
                <div v-if="topic.outcomes.length">
                  <p class="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Built on these learning outcomes</p>
                  <div class="flex gap-1 mb-1.5">
                    <span v-for="o in topic.outcomes" :key="o.id" class="h-1.5 flex-1 max-w-[42px] rounded-full" :class="statusStyle(o.status).bar" :title="o.text"></span>
                  </div>
                  <button type="button" class="text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:underline" @click="showOutcomesOf(topic.id)">
                    See the {{ topic.outcomes.length }} {{ topic.outcomes.length === 1 ? 'outcome' : 'outcomes' }} ({{ topic.summary.achieved }} achieved) &rarr;
                  </button>
                </div>

                <div v-if="topic.enote || topic.practice.length" class="flex flex-wrap gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <RouterLink v-if="topic.enote" :to="`/student/enotes/${topic.enote.id}`" class="inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold bg-violet-600 text-white hover:bg-violet-700">
                    {{ topic.enote.opened ? 'Read the notes again' : 'Read the notes' }}
                  </RouterLink>
                  <RouterLink v-for="item in topic.practice" :key="'p' + item.id" :to="`/student/itembank?open=${item.id}`" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-800">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
                    Practise: {{ item.title }}
                  </RouterLink>
                </div>
              </div>
            </div>
          </li>
        </ol>

        <!-- ...or the Elements of Construct: what must be achieved across several topics, the level
             the End of Chapter assessments show, and the topics (with their competencies) it's
             built on -->
        <ol v-else class="relative">
          <li v-for="(c, i) in shownConstructs" :key="c.id" class="relative pl-12 sm:pl-14 pb-5 last:pb-0">
            <span v-if="i < shownConstructs.length - 1" class="absolute left-[21px] sm:left-[25px] top-11 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden="true"></span>
            <div class="absolute left-0 top-0">
              <ProgressRing :percent="c.percentage ?? 0" :size="44" :stroke="5" :color="gradeStyle(c.grade)?.color ?? '#9ca3af'">
                <span v-if="c.grade" class="text-sm font-extrabold" :style="{ color: gradeStyle(c.grade)!.color }">{{ c.grade }}</span>
                <svg v-else-if="c.status === 'awaiting'" class="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span v-else class="text-[10px] font-bold text-gray-400">&ndash;</span>
              </ProgressRing>
            </div>

            <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-900/30">
              <button type="button" class="w-full text-left p-3 sm:p-4 flex items-start gap-3" @click="toggleConstruct(c.id)">
                <div class="min-w-0 flex-1">
                  <div class="flex flex-wrap items-center gap-1.5 mb-1">
                    <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">{{ c.assessment_objective }}</span>
                    <span class="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{{ c.level_name }} · Element of Construct</span>
                  </div>
                  <p class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-snug">{{ c.name }}</p>
                  <p v-if="c.description" class="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-snug">
                    <span class="font-semibold not-italic">You must:</span> <span class="italic">{{ c.description }}</span>
                  </p>

                  <div class="mt-2.5" :title="c.level ? `${c.level} (${c.grade}) · ${c.percentage}%` : statusStyle(c.status).label">
                    <div class="flex gap-1">
                      <span
                        v-for="g in LADDER"
                        :key="g"
                        class="h-2 flex-1 max-w-[56px] rounded-full transition-colors"
                        :style="c.grade && LADDER.indexOf(g) <= LADDER.indexOf(c.grade as Grade) ? { background: gradeStyle(c.grade)!.color } : undefined"
                        :class="c.grade && LADDER.indexOf(g) <= LADDER.indexOf(c.grade as Grade) ? '' : 'bg-gray-200 dark:bg-gray-700'"
                      ></span>
                    </div>
                    <div class="flex gap-1 mt-0.5" aria-hidden="true">
                      <span v-for="g in LADDER" :key="g" class="flex-1 max-w-[56px] text-center text-[9px] font-bold" :class="c.grade === g ? '' : 'text-gray-300 dark:text-gray-600'" :style="c.grade === g ? { color: gradeStyle(g)!.color } : undefined">{{ g }}</span>
                    </div>
                    <div class="flex flex-wrap items-center gap-1.5 mt-2">
                      <span v-if="c.grade" class="px-1.5 py-0.5 rounded text-[10px] font-bold" :class="gradeStyle(c.grade)!.chip">
                        {{ c.level }} · {{ c.grade }} · {{ c.percentage }}%
                      </span>
                      <span v-else class="px-1.5 py-0.5 rounded text-[10px] font-semibold" :class="statusStyle(c.status).chip">
                        {{ c.status === 'available' ? 'End of Chapter ready to attempt' : statusStyle(c.status).label }}
                      </span>
                      <span class="text-[11px] text-gray-500 dark:text-gray-400">
                        Built on {{ c.building_blocks.topics.length + c.building_blocks.later.length }} {{ c.building_blocks.topics.length + c.building_blocks.later.length === 1 ? 'topic' : 'topics' }}<template v-if="c.building_blocks.topics.length"> · {{ c.building_blocks.competencies_achieved }}/{{ c.building_blocks.topics.length }} competencies this year</template>
                      </span>
                    </div>
                  </div>
                </div>
                <svg class="w-4 h-4 mt-1 text-gray-400 flex-shrink-0 transition-transform" :class="{ 'rotate-180': openConstructs[c.id] }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>

              <div v-if="openConstructs[c.id]" class="px-3 sm:px-4 pb-3 sm:pb-4 space-y-3">
                <p v-if="c.grade" class="text-xs p-2.5 rounded-lg border" :class="gradeStyle(c.grade)!.note">
                  You demonstrate <span class="font-semibold">{{ EOC_CLAUSE[c.grade as Grade] }}</span> {{ c.name.toLowerCase() }}.
                  <template v-if="gradeUp(c.grade)"> Next level: <span class="font-semibold">{{ gradeUp(c.grade) }}</span>.</template>
                </p>

                <div>
                  <p class="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">End of Chapter</p>
                  <p v-if="!c.assessments.length" class="text-xs text-gray-500 dark:text-gray-400">Your teacher hasn't set one for this yet.</p>
                  <ul v-else class="space-y-1.5">
                    <li v-for="a in c.assessments" :key="a.id" class="flex flex-wrap sm:flex-nowrap items-center gap-2">
                      <span class="text-sm text-gray-800 dark:text-gray-100 flex-1 min-w-0 truncate">{{ a.title }}</span>
                      <span class="text-[11px]" :class="a.percentage !== null ? 'font-semibold text-gray-700 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400'">
                        {{ a.percentage !== null ? `${a.percentage}%` : ASSESSMENT_STATE[a.state] }}
                      </span>
                      <RouterLink
                        v-if="actionFor(a)"
                        :to="actionFor(a)!.to"
                        class="px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors"
                        :class="actionFor(a)!.primary ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600'"
                      >{{ actionFor(a)!.label }}</RouterLink>
                    </li>
                  </ul>
                </div>

                <!-- Its building blocks: the topics it groups, each with its competency -->
                <div>
                  <p class="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Built on these topics</p>
                  <ul class="space-y-1">
                    <li v-for="b in c.building_blocks.topics" :key="b.id">
                      <button type="button" class="w-full flex items-center gap-2 text-left rounded-lg px-1.5 py-1 hover:bg-white dark:hover:bg-gray-800 transition-colors" @click="showCompetencyOf(b.id)">
                        <span
                          class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold flex-shrink-0 border-2"
                          :style="b.grade ? { borderColor: gradeStyle(b.grade)!.color, color: gradeStyle(b.grade)!.color } : undefined"
                          :class="b.grade ? '' : 'border-gray-300 text-gray-400 dark:border-gray-600'"
                        >{{ b.grade ?? '–' }}</span>
                        <span class="text-sm text-gray-800 dark:text-gray-100 flex-1 min-w-0 leading-snug">{{ b.topic }}</span>
                        <span class="text-[11px] text-gray-500 dark:text-gray-400 flex-shrink-0">{{ b.achieved }}/{{ b.outcomes }} outcomes</span>
                      </button>
                    </li>
                    <li v-for="l in c.building_blocks.later" :key="l.topic" class="flex items-center gap-2 px-1.5 py-1 opacity-70">
                      <span class="w-6 h-6 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 flex-shrink-0"></span>
                      <span class="text-sm text-gray-600 dark:text-gray-300 flex-1 min-w-0 leading-snug">{{ l.topic }}</span>
                      <span class="text-[11px] text-gray-400 dark:text-gray-500 flex-shrink-0">Still to come<template v-if="l.class_name"> · {{ l.class_name }}</template></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch, h, defineComponent } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import CountUp from '@/components/common/CountUp.vue'
import EvidencePanel from '@/components/evidence/EvidencePanel.vue'

type Status = 'achieved' | 'developing' | 'needs_support' | 'awaiting' | 'available' | 'not_assessed'
interface Assessment { id: number; title: string; category: string | null; state: 'marked' | 'awaiting' | 'started' | 'available'; percentage: number | null; submission_id: number | null }
interface Standing { status: Status; percentage: number | null; level: string | null; grade: string | null; assessments: Assessment[] }
interface Outcome extends Standing { id: number; text: string; revise: { topic_id: number; page_id: number } | null }
interface Totals { outcomes: number; achieved: number; developing: number; needs_support: number; awaiting: number; available: number; not_assessed: number; percent?: number }
interface Topic {
  id: number
  term_id: number | null
  term_name: string | null
  theme: string | null
  topic: string
  competence: string | null
  outcomes: Outcome[]
  summary: Totals
  aoi: Standing | null
  competency: Competency
  eoc: { percentage: number; level: string; grade: string } | null
  enote: { id: number; title: string; opened: boolean; pages_read: number; total_pages: number } | null
  // Item Bank resources tagged with this topic
  practice: { id: number; title: string }[]
  // The student's evidence of the topic's competency, by status
  evidence: { confirmed: number; pending: number; returned: number }
}
type Grade = 'A' | 'B' | 'C' | 'D' | 'E'
interface Competency extends Standing { text: string | null; building_blocks: { achieved: number; outcomes: number } }
interface CompetencyTotals { competencies: number; achieved: number; A: number; B: number; C: number; D: number; E: number; awaiting: number; available: number; not_assessed: number; percent: number }
interface ConstructTotals extends Omit<CompetencyTotals, 'competencies'> { constructs: number }
interface ConstructBlock { id: number; topic: string; grade: string | null; status: Status; achieved: number; outcomes: number }
interface Construct {
  id: number
  name: string
  level_name: string
  assessment_objective: string
  description: string | null
  status: Status
  percentage: number | null
  level: string | null
  grade: string | null
  assessments: Assessment[]
  building_blocks: { topics: ConstructBlock[]; competencies_achieved: number; later: { topic: string; class_name: string | null }[] }
}
interface Subject { id: number; name: string; code: string | null; topics: Topic[]; totals: Totals & { percent: number }; competency_totals: CompetencyTotals; constructs: Construct[]; construct_totals: ConstructTotals }
interface MasteryData { year: string | null; current_term_id: number | null; subjects: Subject[]; overall: Totals & { percent: number }; competencies: CompetencyTotals; constructs: ConstructTotals }

// A ring that fills to `percent`, with whatever's inside it in the middle
const ProgressRing = defineComponent({
  props: { percent: { type: Number, required: true }, size: { type: Number, default: 48 }, stroke: { type: Number, default: 5 }, color: { type: String, default: '#059669' } },
  setup(props, { slots }) {
    return () => {
      const r = (props.size - props.stroke) / 2
      const c = 2 * Math.PI * r
      const filled = Math.max(0, Math.min(100, props.percent)) / 100 * c
      return h('div', { class: 'relative flex items-center justify-center flex-shrink-0', style: { width: `${props.size}px`, height: `${props.size}px` } }, [
        h('svg', { width: props.size, height: props.size, class: '-rotate-90 absolute inset-0' }, [
          h('circle', { cx: props.size / 2, cy: props.size / 2, r, fill: 'none', 'stroke-width': props.stroke, class: 'stroke-gray-200 dark:stroke-gray-700' }),
          h('circle', { cx: props.size / 2, cy: props.size / 2, r, fill: 'none', stroke: props.color, 'stroke-width': props.stroke, 'stroke-linecap': 'round', 'stroke-dasharray': `${filled} ${c}`, style: { transition: 'stroke-dasharray 1s ease' } })
        ]),
        h('div', { class: 'relative flex items-center justify-center' }, slots.default?.())
      ])
    }
  }
})

const STATUS: Record<Status, { label: string; chip: string; dot: string; bar: string; icon: string; text: string }> = {
  achieved: { label: 'Achieved', chip: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300', dot: 'bg-emerald-500', bar: 'bg-emerald-500', icon: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300', text: 'text-emerald-700 dark:text-emerald-300 font-semibold' },
  developing: { label: 'Developing', chip: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300', dot: 'bg-amber-500', bar: 'bg-amber-400', icon: 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-300', text: 'text-amber-700 dark:text-amber-300 font-semibold' },
  needs_support: { label: 'Needs support', chip: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300', dot: 'bg-rose-500', bar: 'bg-rose-400', icon: 'bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-300', text: 'text-rose-700 dark:text-rose-300 font-semibold' },
  awaiting: { label: 'Awaiting marking', chip: 'bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300', dot: 'bg-sky-500', bar: 'bg-sky-300', icon: 'bg-sky-100 text-sky-600 dark:bg-sky-900/50 dark:text-sky-300', text: 'text-sky-700 dark:text-sky-300' },
  available: { label: 'Assessment ready to attempt', chip: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300', dot: 'bg-indigo-500', bar: 'bg-indigo-300', icon: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300', text: 'text-indigo-700 dark:text-indigo-300' },
  not_assessed: { label: 'Not yet assessed', chip: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300', dot: 'bg-gray-400', bar: 'bg-gray-200 dark:bg-gray-700', icon: 'border-2 border-gray-300 dark:border-gray-600', text: 'text-gray-500 dark:text-gray-400' }
}
const statusStyle = (s: Status) => STATUS[s] ?? STATUS.not_assessed
const legendOrder: Status[] = ['achieved', 'developing', 'needs_support', 'awaiting', 'available']

// The report card's five levels of competence (ReportCardGradingService bands), highest first
const GRADE: Record<Grade, { label: string; color: string; chip: string; dot: string; note: string }> = {
  A: { label: 'Exceptional', color: '#047857', chip: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200', dot: 'bg-emerald-700', note: 'bg-emerald-50/70 border-emerald-200 text-emerald-900 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-100' },
  B: { label: 'Outstanding', color: '#0d9488', chip: 'bg-teal-50 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200', dot: 'bg-teal-600', note: 'bg-teal-50/70 border-teal-200 text-teal-900 dark:bg-teal-900/20 dark:border-teal-800 dark:text-teal-100' },
  C: { label: 'Satisfactory', color: '#0284c7', chip: 'bg-sky-50 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200', dot: 'bg-sky-600', note: 'bg-sky-50/70 border-sky-200 text-sky-900 dark:bg-sky-900/20 dark:border-sky-800 dark:text-sky-100' },
  D: { label: 'Basic', color: '#d97706', chip: 'bg-amber-50 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200', dot: 'bg-amber-500', note: 'bg-amber-50/70 border-amber-200 text-amber-900 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-100' },
  E: { label: 'Elementary', color: '#e11d48', chip: 'bg-rose-50 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200', dot: 'bg-rose-500', note: 'bg-rose-50/70 border-rose-200 text-rose-900 dark:bg-rose-900/20 dark:border-rose-800 dark:text-rose-100' }
}
const gradeStyle = (g: string | null) => (g && g in GRADE ? GRADE[g as Grade] : null)
// Left to right on the ladder: Elementary up to Exceptional
const LADDER: Grade[] = ['E', 'D', 'C', 'B', 'A']
const reached = (t: Topic, g: Grade) => !!t.competency.grade && LADDER.indexOf(g) <= LADDER.indexOf(t.competency.grade as Grade)
const gradeUp = (g: string | null) => {
  const i = g ? LADDER.indexOf(g as Grade) : -1
  return i >= 0 && i < LADDER.length - 1 ? `${GRADE[LADDER[i + 1]].label} (${LADDER[i + 1]})` : null
}
const competencyStatusLabel = (s: Status) => s === 'available' ? 'Activity of Integration ready to attempt' : statusStyle(s).label
const ASSESSMENT_STATE: Record<Assessment['state'], string> = { marked: 'Marked', awaiting: 'Awaiting marking', started: 'Started', available: 'Not attempted' }
// "Understand the concept..." -> "understanding the concept..." to follow "competence in", the way
// the report card words it (CompetencyReportService::toGerundPhrase)
const asGerund = (text: string) => {
  const [verb, ...rest] = text.trim().replace(/[.\s]+$/, '').split(' ')
  const lower = verb.charAt(0).toLowerCase() + verb.slice(1)
  const gerund = /e$/i.test(lower) && !/(ee|oe)$/i.test(lower) ? lower.slice(0, -1) + 'ing' : lower + 'ing'
  return [gerund, ...rest].join(' ')
}

// Which view of the map: learning outcomes, or the competencies they build up to (kept in the
// address, so the dashboard or a shared link can open straight onto either)
const route = useRoute()
const router = useRouter()
type View = 'outcomes' | 'competencies' | 'constructs'
const view = ref<View>(route.query.view === 'competencies' || route.query.view === 'constructs' ? route.query.view : 'outcomes')
const setView = (v: View) => {
  view.value = v
  router.replace({ query: { ...route.query, view: v === 'outcomes' ? undefined : v } })
}
const VIEW_COLOR: Record<View, string> = { outcomes: '#059669', competencies: '#7c3aed', constructs: '#d97706' }
const VIEW_SELECTED: Record<View, string> = {
  outcomes: 'border-emerald-400 ring-2 ring-emerald-200 dark:ring-emerald-900',
  competencies: 'border-violet-400 ring-2 ring-violet-200 dark:ring-violet-900',
  constructs: 'border-amber-400 ring-2 ring-amber-200 dark:ring-amber-900'
}
const VIEW_UNIT: Record<View, string> = { outcomes: 'outcomes', competencies: 'competencies', constructs: 'constructs' }
const viewColor = computed(() => VIEW_COLOR[view.value])

// EOC's "demonstrates {…}" wording on the report card (CompetencyReportService::EOC_CLAUSE_WORD)
const EOC_CLAUSE: Record<Grade, string> = {
  A: 'exceptional understanding of',
  B: 'outstanding performance in',
  C: 'satisfactory competence in',
  D: 'basic understanding of',
  E: 'elementary understanding of'
}

const viewCards = computed(() => {
  const d = data.value
  if (!d) return []
  return [
    { key: 'outcomes' as View, title: 'Outcomes achieved', noun: 'learning outcomes', percent: d.overall.percent, achieved: d.overall.achieved, total: d.overall.outcomes, color: '#059669', accent: 'text-emerald-700 dark:text-emerald-300 font-semibold', selected: 'border-emerald-400 ring-2 ring-emerald-200 dark:ring-emerald-900' },
    { key: 'competencies' as View, title: 'Competencies achieved', noun: 'topic competencies', percent: d.competencies.percent, achieved: d.competencies.achieved, total: d.competencies.competencies, color: '#7c3aed', accent: 'text-violet-700 dark:text-violet-300 font-semibold', selected: VIEW_SELECTED.competencies },
    { key: 'constructs' as View, title: 'Constructs achieved', noun: 'Elements of Construct', percent: d.constructs.percent, achieved: d.constructs.achieved, total: d.constructs.constructs, color: '#d97706', accent: 'text-amber-700 dark:text-amber-300 font-semibold', selected: VIEW_SELECTED.constructs }
  ]
})

const legend = computed(() => {
  const d = data.value
  if (!d) return []
  if (view.value === 'outcomes') {
    return legendOrder.map(key => ({ key, ...STATUS[key], count: d.overall[key] })).filter(s => s.count > 0)
  }
  // All five levels always show - they're the scale - then what's still to come
  const totals = view.value === 'competencies' ? d.competencies : d.constructs
  return [
    ...(['A', 'B', 'C', 'D', 'E'] as Grade[]).map(g => ({ key: g, label: `${GRADE[g].label} (${g})`, chip: GRADE[g].chip, dot: GRADE[g].dot, count: totals[g] })),
    ...(['awaiting', 'available'] as const).map(key => ({ key, label: key === 'available' ? 'Ready to attempt' : STATUS[key].label, chip: STATUS[key].chip, dot: STATUS[key].dot, count: totals[key] })).filter(s => s.count > 0)
  ]
})

const data = ref<MasteryData | null>(null)
const loading = ref(true)
const error = ref('')
const activeSubjectId = ref<number | null>(null)
const activeTerm = ref<'all' | number>('all')
const onlyToDo = ref(false)
const open = ref<Record<number, boolean>>({})

const activeSubject = computed(() => data.value?.subjects.find(s => s.id === activeSubjectId.value) ?? null)

const termTabs = computed(() => {
  const seen = new Map<number, string>()
  activeSubject.value?.topics.forEach(t => { if (t.term_id !== null && !seen.has(t.term_id)) seen.set(t.term_id, t.term_name || `Term ${t.term_id}`) })
  const tabs: { key: 'all' | number; label: string; current: boolean }[] = [{ key: 'all', label: 'All', current: false }]
  Array.from(seen.entries()).sort((a, b) => a[0] - b[0]).forEach(([id, name]) => tabs.push({ key: id, label: name, current: id === data.value?.current_term_id }))
  return tabs
})

const needsAttention = (t: Topic) => view.value === 'outcomes'
  ? t.outcomes.some(o => ['available', 'developing', 'needs_support'].includes(o.status)) || (t.aoi && ['available', 'developing', 'needs_support'].includes(t.aoi.status))
  : ['available', 'developing', 'needs_support'].includes(t.competency.status)

const shownTopics = computed(() => (activeSubject.value?.topics ?? [])
  .filter(t => activeTerm.value === 'all' || t.term_id === activeTerm.value)
  .filter(t => !onlyToDo.value || needsAttention(t)))

const attentionCount = (t: Totals) => t.available + t.developing + t.needs_support
const competencyToDo = (t: CompetencyTotals) => t.available + t.D + t.E
// A subject card's numbers in the current view
const subjectView = (s: Subject) => {
  if (view.value === 'outcomes') return { percent: s.totals.percent, achieved: s.totals.achieved, total: s.totals.outcomes, toDo: attentionCount(s.totals) }
  if (view.value === 'competencies') return { percent: s.competency_totals.percent, achieved: s.competency_totals.achieved, total: s.competency_totals.competencies, toDo: competencyToDo(s.competency_totals) }
  const c = s.construct_totals
  return { percent: c.percent, achieved: c.achieved, total: c.constructs, toDo: c.available + c.D + c.E }
}

const openConstructs = ref<Record<number, boolean>>({})
const toggleConstruct = (id: number) => { openConstructs.value = { ...openConstructs.value, [id]: !openConstructs.value[id] } }
const shownConstructs = computed(() => (activeSubject.value?.constructs ?? [])
  .filter(c => !onlyToDo.value || ['available', 'developing', 'needs_support'].includes(c.status)))

// From a construct to one of its topics: the competencies view, with that topic open
const showCompetencyOf = async (topicId: number) => {
  setView('competencies')
  activeTerm.value = 'all'
  open.value = { ...open.value, [topicId]: true }
  await nextTick()
  document.querySelector(`[data-competency="${topicId}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

// From a competency to the outcomes it's built on: the outcomes view, with that topic open
const showOutcomesOf = async (topicId: number) => {
  setView('outcomes')
  activeTerm.value = 'all'
  open.value = { ...open.value, [topicId]: true }
  await nextTick()
  document.querySelector(`[data-topic="${topicId}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const topicPercent = (t: Topic) => t.summary.outcomes ? Math.round(t.summary.achieved / t.summary.outcomes * 100) : 0
const topicColor = (t: Topic) => {
  if (t.summary.needs_support) return '#e11d48'
  if (t.summary.developing) return '#d97706'
  return '#059669'
}

function actionFor(a: Assessment | undefined) {
  if (!a) return null
  if (a.state === 'available') return { label: 'Attempt', to: `/student/assignments/${a.id}/answer`, primary: true }
  if (a.state === 'started') return { label: 'Continue', to: `/student/assignments/${a.id}/answer`, primary: true }
  if (a.state === 'marked' && a.submission_id) return { label: 'View results', to: `/student/assignments/${a.id}/result/${a.submission_id}`, primary: false }
  return null
}
// The most useful thing to do next for an outcome: finish/attempt an assessment, else see results
const outcomeAction = (o: Outcome) =>
  actionFor(o.assessments.find(a => a.state === 'started') ?? o.assessments.find(a => a.state === 'available') ?? o.assessments.find(a => a.state === 'marked'))
const topicAction = (t: Topic) => (t.aoi ? actionFor(t.aoi.assessments.find(a => a.state === 'started') ?? t.aoi.assessments.find(a => a.state === 'available')) : null)

// After evidence is added or removed, update the topic's counts
const refreshEvidence = async (topic: Topic) => {
  try {
    const response = await axios.get('/api/student/evidence', { params: { topic_id: topic.id } })
    const counts = { confirmed: 0, pending: 0, returned: 0 }
    for (const e of response.data.data.evidence || []) counts[e.status as keyof typeof counts]++
    topic.evidence = counts
  } catch { /* keep the old counts */ }
}

const toggle = (id: number) => { open.value = { ...open.value, [id]: !open.value[id] } }

// ---- Drifting subject cards ----
// Only when the cards don't all fit across; speed is fixed in pixels per second so a long row of
// subjects drifts at the same gentle pace as a short one
const DRIFT_SPEED = 26
const reducedMotion = typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
const subjectsViewport = ref<HTMLElement | null>(null)
const subjectsTrack = ref<HTMLElement | null>(null)
const drifting = ref(false)
const driftSeconds = ref(40)
let viewportObserver: ResizeObserver | null = null

async function checkDrift() {
  if (reducedMotion) return
  // Measure a single copy of the row
  drifting.value = false
  await nextTick()
  const viewport = subjectsViewport.value
  const oneCopy = subjectsTrack.value?.firstElementChild as HTMLElement | null
  if (!viewport || !oneCopy) return
  const width = oneCopy.scrollWidth
  if (width > viewport.clientWidth + 4) {
    driftSeconds.value = Math.max(20, Math.round(width / DRIFT_SPEED))
    drifting.value = true
  }
}

watch(() => data.value?.subjects.length, () => checkDrift())

onMounted(() => {
  viewportObserver = new ResizeObserver(() => {
    const viewport = subjectsViewport.value
    const oneCopy = subjectsTrack.value?.firstElementChild as HTMLElement | null
    if (!viewport || !oneCopy) return
    const fits = oneCopy.scrollWidth <= viewport.clientWidth + 4
    if (fits === drifting.value) checkDrift()
  })
})

watch(subjectsViewport, (el) => {
  viewportObserver?.disconnect()
  if (el) viewportObserver?.observe(el)
})

onBeforeUnmount(() => viewportObserver?.disconnect())

function selectSubject(id: number) {
  activeSubjectId.value = id
  const subject = data.value?.subjects.find(s => s.id === id)
  // Start on this term when the subject has topics in it
  const current = data.value?.current_term_id
  activeTerm.value = current && subject?.topics.some(t => t.term_id === current) ? current : 'all'
}

onMounted(async () => {
  try {
    const response = await axios.get('/api/student/mastery')
    if (response.data.success) {
      data.value = response.data.data
      const subjects = data.value?.subjects ?? []
      // Open on the subject with the most to do (else the first)
      const first = [...subjects].sort((a, b) => subjectView(b).toDo - subjectView(a).toDo)[0]
      if (first) selectSubject(first.id)
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Could not load your learning map'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* Subject cards drifting to the right: two copies of the row side by side, the pair sliding by one
   copy's width and looping, with the edges softly faded so cards glide in and out */
.subjects-viewport.is-drifting {
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
}

.is-drifting .subjects-track {
  animation-name: subjects-drift;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  will-change: transform;
}

/* Resting on the row (pointer, finger or keyboard focus) holds it still */
.is-drifting:hover .subjects-track,
.is-drifting:active .subjects-track,
.is-drifting:focus-within .subjects-track {
  animation-play-state: paused;
}

@keyframes subjects-drift {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
