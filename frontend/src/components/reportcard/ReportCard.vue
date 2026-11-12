<template>
  <div ref="rootEl" :data-pdf-title="pdfTitle" class="report-card relative bg-white dark:bg-gray-800 rounded-2xl shadow-md border-2 border-gray-300 dark:border-gray-700 overflow-hidden">
    <!-- Accent bar -->
    <div class="h-2.5 bg-indigo-600 print-color-exact"></div>

    <!-- Watermark -->
    <div v-if="report.school?.logo_path && !logoFailed" class="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden z-0">
      <img :src="resolveAssetUrl(report.school.logo_path)" alt="" class="w-2/3 max-w-sm opacity-[0.07] dark:opacity-[0.05]">
    </div>

    <div class="relative z-10 p-5 sm:p-8">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row items-start justify-between gap-4 pb-5 mb-1 border-b-4 border-indigo-600 dark:border-indigo-500">
        <div class="flex items-center gap-4 min-w-0">
          <img v-if="report.school?.logo_path && !logoFailed" :src="resolveAssetUrl(report.school.logo_path)" alt="School logo" @error="logoFailed = true" class="w-20 h-20 object-contain flex-shrink-0 rounded-lg bg-white ring-2 ring-gray-200 dark:ring-gray-600 p-1">
          <span v-else class="school-mark flex-shrink-0 bg-indigo-600 text-white font-bold print-color-exact" aria-hidden="true">{{ schoolInitials }}</span>
          <div class="min-w-0 leading-normal">
            <h1 class="text-xl sm:text-3xl font-extrabold text-gray-900 dark:text-white uppercase tracking-wide" style="line-height: 1.35; padding-top: 2px; padding-bottom: 2px;">
              {{ report.school?.school_name || 'School' }}
            </h1>
            <p v-if="report.school?.address" class="text-xs sm:text-sm text-gray-500 dark:text-gray-400" style="line-height: 1.6;">{{ report.school.address }}</p>
          </div>
        </div>
        <div class="flex items-start gap-3 flex-shrink-0 sm:border-l-2 border-gray-200 dark:border-gray-700 sm:pl-4">
          <div class="flex flex-col items-center flex-shrink-0">
            <div class="qr-frame">
              <img v-if="qrCodeDataUrl" :src="qrCodeDataUrl" alt="Scan to visit the system online" class="block w-full h-full">
            </div>
            <span class="mt-1 text-[9px] leading-tight text-gray-500 dark:text-gray-400 text-center">Open on<br><b class="text-gray-700 dark:text-gray-200">Tusome</b></span>
          </div>
          <div class="sm:text-right text-xs sm:text-sm text-gray-600 dark:text-gray-400 space-y-1 leading-relaxed">
            <p v-if="report.school?.box_number"><span class="font-semibold text-gray-500 dark:text-gray-500">Box:</span> {{ report.school.box_number }}</p>
            <p v-if="report.school?.website"><span class="font-semibold text-gray-500 dark:text-gray-500">Web:</span> {{ report.school.website }}</p>
            <p v-if="report.school?.email"><span class="font-semibold text-gray-500 dark:text-gray-500">Email:</span> {{ report.school.email }}</p>
            <p v-if="report.school?.phone"><span class="font-semibold text-gray-500 dark:text-gray-500">Tel:</span> {{ report.school.phone }}</p>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-5">
        <span class="inline-block px-4 py-1.5 rounded-full bg-indigo-600 text-white font-semibold text-xs sm:text-sm uppercase tracking-wide print-color-exact">
          Learner's Summative Assessment Report &middot; {{ report.term.name }}{{ report.term.academic_year ? ` - ${report.term.academic_year}` : '' }}
        </span>
      </div>

      <p v-if="report.status === 'provisional'" class="mt-3 mx-auto max-w-2xl text-center text-[11px] sm:text-xs rounded-lg border border-amber-300 bg-amber-50 text-amber-900 dark:bg-amber-900/20 dark:border-amber-700/60 dark:text-amber-200 px-3 py-1.5 print-color-exact">
        <b>Provisional</b> &middot; the school has not finalised this report yet. Grades use the marked work returned so far, as at {{ asAt }}; subjects without a mark show as not yet assessed.
      </p>

      <!-- Student info -->
      <div class="pdf-keep grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
        <div class="sm:col-span-2 bg-gray-50 dark:bg-gray-900/40 border-2 border-gray-300 dark:border-gray-700 rounded-xl p-4 flex items-center gap-4 text-sm">
          <img v-if="report.student.profile_photo" :src="resolveAssetUrl(report.student.profile_photo)" alt="" class="w-16 h-16 rounded-lg object-cover flex-shrink-0 ring-2 ring-gray-200 dark:ring-gray-600">
          <div v-else class="student-photo-fallback w-16 h-16 rounded-lg flex-shrink-0 bg-indigo-600 text-white font-bold text-lg print-color-exact">
            {{ studentInitials }}
          </div>
          <div class="flex flex-wrap gap-x-6 gap-y-1.5">
            <p><span class="block text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-500">Admission No</span><span class="font-medium text-gray-900 dark:text-white">{{ report.student.admission_number }}</span></p>
            <p><span class="block text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-500">Name</span><span class="font-semibold text-gray-900 dark:text-white">{{ report.student.first_name }} {{ report.student.last_name }}</span></p>
            <p><span class="block text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-500">Class / Stream</span><span class="font-medium text-gray-900 dark:text-white">{{ report.class_name || '-' }}{{ report.stream_name ? ' / ' + report.stream_name : '' }}</span></p>
          </div>
        </div>
        <div class="border-2 border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden self-start bg-gray-50 dark:bg-gray-900/40">
          <div class="bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white print-color-exact">Activity</div>
          <table class="w-full text-xs">
            <tbody>
              <tr>
                <td class="px-3 py-1.5 text-gray-500 dark:text-gray-400">Logins This Term</td>
                <td class="px-3 py-1.5 text-right font-medium text-gray-900 dark:text-white">{{ report.login_count }}</td>
              </tr>
              <tr v-if="report.activity">
                <td class="px-3 py-1.5 text-gray-500 dark:text-gray-400">Days Active on Tusome</td>
                <td class="px-3 py-1.5 text-right font-medium text-gray-900 dark:text-white">{{ report.activity.days_active }}</td>
              </tr>
              <tr v-if="report.activity">
                <td class="px-3 py-1.5 text-gray-500 dark:text-gray-400">Days of Revision</td>
                <td class="px-3 py-1.5 text-right font-medium text-gray-900 dark:text-white">{{ report.activity.revision_days }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Subjects table -->
      <p class="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mt-6 mb-1.5">
        Assessed Items &mdash; Score / Weight per Construct (C1, C2, ...)
      </p>
      <div class="rounded-xl border-2 border-gray-400 dark:border-gray-700 overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-xs sm:text-sm border-collapse">
            <thead>
              <tr class="bg-indigo-600 text-white print-color-exact">
                <th class="border border-indigo-700 px-3 py-2 text-left whitespace-nowrap">Subject</th>
                <th v-for="n in maxConstructs" :key="n" class="border border-indigo-700 px-2 py-2 text-center font-semibold">C{{ n }}</th>
                <th class="border border-indigo-700 px-2 py-2 text-center whitespace-nowrap">Av. Weight (/{{ report.max_weight }})</th>
                <th class="border border-indigo-700 px-2 py-2 text-center">Grade</th>
                <th class="border border-indigo-700 px-3 py-2 text-left min-w-[220px]">Descriptor / Remark</th>
                <th class="border border-indigo-700 px-2 py-2 text-center">Tr</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(subject, idx) in report.subjects" :key="subject.subject_id" :class="idx % 2 === 1 ? 'bg-gray-50 dark:bg-gray-900/30' : ''">
                <td class="border border-gray-400 dark:border-gray-700 px-3 py-2 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  {{ subject.subject_name }}
                </td>
                <td v-if="subject.assessed === false" :colspan="maxConstructs + 3" class="border border-gray-400 dark:border-gray-700 px-3 py-2 text-center italic text-gray-500 dark:text-gray-400">
                  Not yet assessed this term
                </td>
                <template v-else>
                <td v-for="n in maxConstructs" :key="n" class="border border-gray-400 dark:border-gray-700 px-1 py-2 text-center text-gray-700 dark:text-gray-300">
                  <template v-if="subject.constructs[n - 1]">
                    {{ subject.constructs[n - 1].score_obtained }}/{{ subject.constructs[n - 1].score_total }}
                    <div class="text-[10px] text-gray-500 dark:text-gray-500">
                      w{{ subject.constructs[n - 1].weight }}
                      <span v-if="subject.constructs[n - 1].source_type === 'physical'" class="text-amber-600 dark:text-amber-500 font-semibold">&middot; Physical</span>
                    </div>
                  </template>
                  <template v-else>-</template>
                </td>
                <td class="border border-gray-400 dark:border-gray-700 px-2 py-2 text-center font-semibold text-gray-900 dark:text-white">
                  {{ subject.avg_weight }}
                </td>
                <td class="border border-gray-400 dark:border-gray-700 px-2 py-2 text-center">
                  <span class="grade-badge font-bold text-white shadow-sm print-color-exact" :class="gradeBg(subject.grade)">
                    {{ subject.grade || '-' }}
                  </span>
                </td>
                <td class="border border-gray-400 dark:border-gray-700 px-3 py-2 text-gray-600 dark:text-gray-300">
                  {{ subject.descriptor_text || (report.status === 'provisional' ? 'Remark comes when the report is finalised.' : (subject.assignments_included_count ? 'Descriptor pending - try regenerating.' : '-')) }}
                </td>
                </template>
                <td class="border border-gray-400 dark:border-gray-700 px-2 py-2 text-center text-gray-500 dark:text-gray-400" :title="subject.teacher_name || undefined">
                  {{ subject.teacher_initials || '-' }}
                </td>
              </tr>
              <tr v-if="report.subjects.length === 0">
                <td :colspan="maxConstructs + 5" class="border border-gray-400 dark:border-gray-700 px-3 py-8 text-center text-gray-400">
                  No subjects on record for this term yet.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Competency Report (LOA / AOI / EOC) -->
      <template v-if="subjectsWithCompetencies.length > 0">
        <p class="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mt-6 mb-1.5">
          Competency Report &mdash; Learning Outcomes (LOA) &middot; Areas of Integration (AOI) &middot; End of Cycle (EOC)
        </p>
        <div class="rounded-xl border-2 border-gray-400 dark:border-gray-700 overflow-hidden shadow-sm">
          <div class="overflow-x-auto">
            <table class="w-full text-xs sm:text-sm border-collapse">
              <thead>
                <tr class="bg-indigo-600 text-white print-color-exact">
                  <th class="border border-indigo-700 px-3 py-2 text-left whitespace-nowrap">Subject / Report</th>
                  <th class="border border-indigo-700 px-2 py-2 text-center whitespace-nowrap">Average %</th>
                  <th class="border border-indigo-700 px-2 py-2 text-center">Status</th>
                  <th class="border border-indigo-700 px-3 py-2 text-left min-w-[260px]">Descriptor</th>
                  <th class="border border-indigo-700 px-2 py-2 text-center whitespace-nowrap">Weight (/{{ report.max_weight }})</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="subject in subjectsWithCompetencies" :key="subject.subject_id">
                  <tr v-for="(c, ci) in subject.competencies" :key="subject.subject_id + '-' + c.category" :class="ci % 2 === 1 ? 'bg-gray-50 dark:bg-gray-900/30' : ''">
                    <td class="border border-gray-400 dark:border-gray-700 px-3 py-2 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      <template v-if="ci === 0">{{ subject.subject_name }}</template>
                      <span class="block text-[11px] font-normal text-gray-500 dark:text-gray-400">{{ categoryLabel(c.category) }}</span>
                    </td>
                    <td class="border border-gray-400 dark:border-gray-700 px-2 py-2 text-center font-semibold text-gray-900 dark:text-white">
                      {{ c.percentage }}%
                    </td>
                    <td class="border border-gray-400 dark:border-gray-700 px-2 py-2 text-center">
                      <span class="grade-badge font-bold text-white shadow-sm print-color-exact" :class="gradeBg(c.status)">
                        {{ c.status }}
                      </span>
                      <div class="text-[10px] text-gray-500 dark:text-gray-500 mt-0.5">{{ c.performance_descriptor }}</div>
                    </td>
                    <td class="border border-gray-400 dark:border-gray-700 px-3 py-2 text-gray-600 dark:text-gray-300">
                      {{ c.descriptor_text }}
                    </td>
                    <td class="border border-gray-400 dark:border-gray-700 px-2 py-2 text-center font-semibold text-gray-900 dark:text-white">
                      {{ c.weight }}
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </template>

      <!-- Totals bar -->
      <div class="totals-bar mt-4 print-color-exact text-white text-xs sm:text-sm rounded-xl px-5 py-3 flex flex-wrap items-center gap-x-8 gap-y-2 shadow-sm">
        <div v-if="report.class_level !== 'O Level'"><span class="block text-[10px] uppercase tracking-wide text-blue-200">Total Points</span><span class="font-bold text-base">{{ report.total_points }}</span></div>
        <div :class="{ 'border-l border-blue-300/40 pl-8': report.class_level !== 'O Level' }"><span class="block text-[10px] uppercase tracking-wide text-blue-200">Overall Av. Weight</span><span class="font-bold text-base">{{ report.overall_avg_weight }} / {{ report.max_weight }}</span></div>
        <div class="border-l border-blue-300/40 pl-8"><span class="block text-[10px] uppercase tracking-wide text-blue-200">Performance Level</span><span class="font-bold text-base">{{ report.performance_level || '-' }}</span></div>
        <div class="border-l border-blue-300/40 pl-8"><span class="block text-[10px] uppercase tracking-wide text-blue-200">Result</span><span class="font-bold text-base">{{ report.result_category ?? '-' }}</span></div>
      </div>

      <!-- ===================== The learning record on Tusome ===================== -->
      <template v-if="report.activity">
        <div class="record-head mt-7 print-color-exact">
          <span>Learning record on Tusome &middot; {{ report.term.name }}</span>
          <span class="record-sub">from the learner's work on the platform this term</span>
        </div>

        <!-- At a glance -->
        <div class="glance mt-2">
          <div v-for="g in glance" :key="g.label" class="glance-cell" :class="g.tone">
            <span class="glance-num">{{ g.value }}</span>
            <span class="glance-label">{{ g.label }}</span>
            <span v-if="g.note" class="glance-note">{{ g.note }}</span>
            <span v-if="g.bar !== undefined" class="glance-bar"><i :style="{ width: `${g.bar}%` }"></i></span>
          </div>
        </div>

        <!-- Subject by subject -->
        <p class="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mt-5 mb-1.5">
          Subject by subject &mdash; assessments, results by type, notes read and live classes
        </p>
        <div class="rounded-xl border-2 border-gray-400 dark:border-gray-700 overflow-hidden shadow-sm">
          <div class="overflow-x-auto">
            <table class="w-full text-xs sm:text-sm border-collapse">
              <thead>
                <tr class="bg-indigo-600 text-white print-color-exact">
                  <th class="border border-indigo-700 px-3 py-1"></th>
                  <th colspan="4" class="border border-indigo-700 px-2 py-1 text-center">Assessments</th>
                  <th colspan="3" class="border border-indigo-700 px-2 py-1 text-center">Average by type</th>
                  <th colspan="2" class="border border-indigo-700 px-2 py-1 text-center">On Tusome</th>
                </tr>
                <tr class="bg-indigo-700 text-white text-[11px] print-color-exact">
                  <th class="border border-indigo-800 px-3 py-1 text-left font-semibold">Subject</th>
                  <th class="border border-indigo-800 px-2 py-1 text-center font-semibold">Done</th>
                  <th class="border border-indigo-800 px-2 py-1 text-center font-semibold">Passed</th>
                  <th class="border border-indigo-800 px-2 py-1 text-center font-semibold">Failed</th>
                  <th class="border border-indigo-800 px-2 py-1 text-center font-semibold">On time</th>
                  <th class="border border-indigo-800 px-2 py-1 text-center font-semibold" title="Learning Outcome Assessments">LOA</th>
                  <th class="border border-indigo-800 px-2 py-1 text-center font-semibold" title="Activities of Integration">AOI</th>
                  <th class="border border-indigo-800 px-2 py-1 text-center font-semibold" title="End of Cycle">EOC</th>
                  <th class="border border-indigo-800 px-2 py-1 text-center font-semibold whitespace-nowrap min-w-[7.5rem]">Notes read</th>
                  <th class="border border-indigo-800 px-2 py-1 text-center font-semibold whitespace-nowrap">Live classes</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, idx) in activityRows" :key="row.subject_id" :class="idx % 2 === 1 ? 'bg-gray-50 dark:bg-gray-900/30' : ''">
                  <td class="border border-gray-400 dark:border-gray-700 px-3 py-1.5 font-medium text-gray-900 dark:text-white whitespace-nowrap">{{ row.name }}</td>
                  <td class="border border-gray-400 dark:border-gray-700 px-2 py-1.5 text-center text-gray-700 dark:text-gray-300 tabular-nums">{{ row.set ? `${row.handed_in} of ${row.set}` : '-' }}</td>
                  <td class="border border-gray-400 dark:border-gray-700 px-2 py-1.5 text-center tabular-nums" :class="row.passed ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-400'">{{ row.passed || '-' }}</td>
                  <td class="border border-gray-400 dark:border-gray-700 px-2 py-1.5 text-center tabular-nums" :class="row.failed ? 'font-semibold text-rose-700 dark:text-rose-300' : 'text-gray-400'">{{ row.failed || '-' }}</td>
                  <td class="border border-gray-400 dark:border-gray-700 px-2 py-1.5 text-center text-gray-700 dark:text-gray-300 tabular-nums">{{ row.handed_in ? `${Math.round((row.on_time / row.handed_in) * 100)}%` : '-' }}</td>
                  <td v-for="k in (['loa', 'aoi', 'eoc'] as const)" :key="k" class="border border-gray-400 dark:border-gray-700 px-2 py-1.5 text-center tabular-nums" :class="scoreClass(row[k])">{{ row[k] !== null ? `${row[k]}%` : '-' }}</td>
                  <td class="border border-gray-400 dark:border-gray-700 px-2 py-1.5">
                    <span v-if="row.notes_topics" class="flex items-center gap-1.5">
                      <span class="meter flex-1"><i :style="{ width: `${row.notes_percent ?? 0}%` }"></i></span>
                      <span class="w-9 text-right text-[11px] tabular-nums text-gray-700 dark:text-gray-300">{{ row.notes_percent ?? 0 }}%</span>
                    </span>
                    <span v-else class="block text-center text-gray-400">no notes yet</span>
                  </td>
                  <td class="border border-gray-400 dark:border-gray-700 px-2 py-1.5 text-center text-gray-700 dark:text-gray-300 tabular-nums">{{ row.live_attended || '-' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p class="mt-1 text-[10px] text-gray-500 dark:text-gray-400">Passed: {{ report.activity.pass_from }}% or more on marked work. Notes read: how much of every eNote topic open to the learner has been read (unopened topics count as 0%).</p>

        <!-- Strengths and where to improve -->
        <div class="pdf-keep grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          <div class="focus-box focus-weak print-color-exact">
            <p class="focus-title">Needs attention</p>
            <ul v-if="weakPoints.length" class="focus-list">
              <li v-for="(w, i) in weakPoints" :key="i">
                <span class="focus-pct">{{ w.pct }}%</span>
                <span><b>{{ w.subject }}</b> &middot; <span class="focus-kind">{{ w.kind }}</span> {{ w.text }}</span>
              </li>
            </ul>
            <p v-else class="focus-empty">{{ hasMarks ? 'Nothing below the mark in the work marked so far.' : 'Fills in as marked work comes back.' }}</p>
          </div>
          <div class="focus-box focus-strong print-color-exact">
            <p class="focus-title">Doing well</p>
            <ul v-if="strongPoints.length" class="focus-list">
              <li v-for="(w, i) in strongPoints" :key="i">
                <span class="focus-pct">{{ w.pct }}%</span>
                <span><b>{{ w.subject }}</b> &middot; <span class="focus-kind">{{ w.kind }}</span> {{ w.text }}</span>
              </li>
            </ul>
            <p v-else class="focus-empty">{{ hasMarks ? 'No standout results yet this term.' : 'Fills in as marked work comes back.' }}</p>
          </div>
        </div>

        <!-- Every marked assessment of the term -->
        <template v-if="report.activity.record?.length">
          <p class="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mt-5 mb-1.5">
            Assessment record &mdash; every marked assessment this term ({{ report.activity.record.length }})
          </p>
          <div class="rounded-xl border-2 border-gray-400 dark:border-gray-700 overflow-hidden shadow-sm">
            <div class="overflow-x-auto">
              <table class="w-full text-xs sm:text-sm border-collapse">
                <thead>
                  <tr class="bg-indigo-600 text-white print-color-exact">
                    <th class="border border-indigo-700 px-2 py-1.5 text-left whitespace-nowrap">Date</th>
                    <th class="border border-indigo-700 px-2 py-1.5 text-left whitespace-nowrap">Subject</th>
                    <th class="border border-indigo-700 px-2 py-1.5 text-left">Assessment</th>
                    <th class="border border-indigo-700 px-2 py-1.5 text-center whitespace-nowrap">Type</th>
                    <th class="border border-indigo-700 px-2 py-1.5 text-center whitespace-nowrap">Score</th>
                    <th class="border border-indigo-700 px-2 py-1.5 text-center whitespace-nowrap">%</th>
                    <th class="border border-indigo-700 px-2 py-1.5 text-center whitespace-nowrap">Result</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(r, idx) in report.activity.record" :key="idx" :class="idx % 2 === 1 ? 'bg-gray-50 dark:bg-gray-900/30' : ''">
                    <td class="border border-gray-400 dark:border-gray-700 px-2 py-1 whitespace-nowrap text-gray-600 dark:text-gray-400 tabular-nums">{{ shortDate(r.date) }}</td>
                    <td class="border border-gray-400 dark:border-gray-700 px-2 py-1 whitespace-nowrap font-medium text-gray-900 dark:text-white">{{ subjectName(r.subject_id) }}</td>
                    <td class="border border-gray-400 dark:border-gray-700 px-2 py-1 text-gray-800 dark:text-gray-200">{{ r.title }}</td>
                    <td class="border border-gray-400 dark:border-gray-700 px-2 py-1 text-center whitespace-nowrap text-gray-600 dark:text-gray-400">{{ r.kind }}</td>
                    <td class="border border-gray-400 dark:border-gray-700 px-2 py-1 text-center whitespace-nowrap tabular-nums text-gray-700 dark:text-gray-300">{{ r.score !== null && r.out_of ? `${+r.score.toFixed(1)}/${+r.out_of.toFixed(1)}` : '-' }}</td>
                    <td class="border border-gray-400 dark:border-gray-700 px-2 py-1 text-center tabular-nums" :class="scoreClass(r.percentage)">{{ r.percentage }}%</td>
                    <td class="border border-gray-400 dark:border-gray-700 px-2 py-1 text-center whitespace-nowrap font-semibold" :class="r.percentage >= report.activity.pass_from ? 'text-gray-900 dark:text-white' : 'text-rose-700 dark:text-rose-300'">{{ r.percentage >= report.activity.pass_from ? 'Passed' : 'Failed' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </template>
      </template>

      <!-- Awards & Achievements -->
      <div v-if="report.awards && report.awards.length > 0" class="mt-5">
        <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">Awards &amp; Achievements</p>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="award in report.awards"
            :key="award.id"
            class="award-pill px-3 py-1.5 rounded-full text-xs font-medium text-white print-color-exact"
            :class="awardColor(award.badge_type)"
          >
            <span class="award-pill-icon"><BadgeIcon :type="award.badge_type" class="w-4 h-4" /></span>
            <span>{{ award.award_title }}</span>
            <span v-if="award.average !== null" class="opacity-80">&middot; {{ award.average }}%</span>
            <span v-else-if="award.score !== null" class="opacity-80">&middot; {{ award.score }}%</span>
            <span v-if="award.subject_name" class="opacity-80">&middot; {{ award.subject_name }}</span>
          </span>
        </div>
      </div>

      <!-- Virtual Lab Performance -->
      <div v-if="report.virtual_lab && report.virtual_lab.length > 0" class="mt-5">
        <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">Virtual Lab Performance</p>
        <div class="rounded-xl border-2 border-gray-300 dark:border-gray-700 overflow-hidden">
          <table class="w-full text-xs sm:text-sm border-collapse">
            <thead>
              <tr class="bg-indigo-600 text-white print-color-exact">
                <th class="border border-indigo-700 px-3 py-2 text-left">Practical</th>
                <th class="border border-indigo-700 px-2 py-2 text-center">Score</th>
                <th class="border border-indigo-700 px-2 py-2 text-center">Status</th>
                <th class="border border-indigo-700 px-3 py-2 text-left">Teacher Comment</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="lab in report.virtual_lab" :key="lab.id" class="odd:bg-gray-50 dark:odd:bg-gray-900/30">
                <td class="border border-gray-300 dark:border-gray-700 px-3 py-2 text-gray-800 dark:text-gray-200">
                  <span><AppIcon :name="({ physics: 'bolt', chemistry: 'beaker', biology: 'leaf', agriculture: 'sprout' } as Record<string, string>)[lab.category] || 'beaker'" class="w-4 h-4" /></span>
                  {{ lab.subject_name ? lab.subject_name + ' Practical: ' : '' }}{{ lab.experiment_title }}
                </td>
                <td class="border border-gray-300 dark:border-gray-700 px-2 py-2 text-center font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                  {{ lab.score }}/{{ lab.max_marks }}
                </td>
                <td class="border border-gray-300 dark:border-gray-700 px-2 py-2 text-center text-gray-600 dark:text-gray-300">Completed</td>
                <td class="border border-gray-300 dark:border-gray-700 px-3 py-2 text-gray-600 dark:text-gray-300 italic">{{ lab.teacher_comment || '-' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Definitions & Result Key -->
      <div class="pdf-keep grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 text-[11px] sm:text-xs">
        <div class="border-2 border-gray-300 dark:border-gray-700 rounded-xl p-4 space-y-2 text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/40">
          <p class="text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wide mb-1">Definitions</p>
          <p><strong class="text-gray-800 dark:text-gray-200">Construct:</strong> an assessed item (assignment) contributing to a subject's grade.</p>
          <p><strong class="text-gray-800 dark:text-gray-200">Weight:</strong> a 1-{{ report.max_weight }} competency rating derived from the score on that item{{ report.class_level ? ` (${report.class_level} scale)` : '' }}.</p>
          <p><strong class="text-gray-800 dark:text-gray-200">Av. Weight:</strong> the average of a subject's construct weights.</p>
        </div>
        <div class="border-2 border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden self-start">
          <table class="w-full text-[11px] sm:text-xs border-collapse">
            <thead>
              <tr class="bg-indigo-600 text-white print-color-exact">
                <th class="border border-indigo-700 px-2 py-1.5 text-left">Weight Range</th>
                <th class="border border-indigo-700 px-2 py-1.5 text-left">Level</th>
                <th class="border border-indigo-700 px-2 py-1.5 text-center">Grade</th>
                <th v-if="report.class_level !== 'O Level'" class="border border-indigo-700 px-2 py-1.5 text-center">Points</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in resultKey" :key="row.grade" :class="idx % 2 === 1 ? 'bg-gray-50 dark:bg-gray-900/30' : ''">
                <td class="border border-gray-300 dark:border-gray-700 px-2 py-1.5 text-gray-600 dark:text-gray-300">{{ row.range }}</td>
                <td class="border border-gray-300 dark:border-gray-700 px-2 py-1.5 text-gray-600 dark:text-gray-300">{{ row.level }}</td>
                <td class="border border-gray-300 dark:border-gray-700 px-2 py-1.5 text-center font-semibold text-gray-900 dark:text-white">{{ row.grade }}</td>
                <td v-if="report.class_level !== 'O Level'" class="border border-gray-300 dark:border-gray-700 px-2 py-1.5 text-center text-gray-600 dark:text-gray-300">{{ row.points }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Comments -->
      <div class="pdf-keep grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
        <div class="border-2 border-indigo-300 dark:border-indigo-800/60 bg-indigo-50/60 dark:bg-indigo-900/20 rounded-xl p-4">
          <div class="flex items-center gap-2 mb-2">
            <span class="initials-badge bg-indigo-600 text-white text-[10px] font-bold flex-shrink-0 print-color-exact">CT</span>
            <p class="text-xs font-semibold text-gray-700 dark:text-gray-200">Class Teacher's Comment</p>
          </div>
          <textarea
            v-if="editableClassTeacherComment"
            v-model="classTeacherCommentDraft"
            rows="3"
            class="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 dark:bg-gray-700 dark:text-white"
          ></textarea>
          <p v-else class="text-sm italic text-gray-700 dark:text-gray-300">{{ report.class_teacher_comment || 'No comment yet.' }}</p>
          <button
            v-if="editableClassTeacherComment"
            @click="$emit('save-class-teacher-comment', classTeacherCommentDraft)"
            class="mt-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Save Comment
          </button>
        </div>
        <div class="border-2 border-amber-300 dark:border-amber-800/60 bg-amber-50/60 dark:bg-amber-900/20 rounded-xl p-4">
          <div class="flex items-center gap-2 mb-2">
            <span class="initials-badge bg-amber-600 text-white text-[10px] font-bold flex-shrink-0 print-color-exact">HT</span>
            <p class="text-xs font-semibold text-gray-700 dark:text-gray-200">Head Teacher's Comment</p>
          </div>
          <textarea
            v-if="editableHeadTeacherComment"
            v-model="headTeacherCommentDraft"
            rows="3"
            class="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 dark:bg-gray-700 dark:text-white"
          ></textarea>
          <p v-else class="text-sm italic text-gray-700 dark:text-gray-300">{{ report.head_teacher_comment || 'No comment yet.' }}</p>
          <button
            v-if="editableHeadTeacherComment"
            @click="$emit('save-head-teacher-comment', headTeacherCommentDraft)"
            class="mt-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Save Comment
          </button>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex flex-wrap items-center justify-between gap-2 mt-6 pt-3 border-t-2 border-dashed border-gray-300 dark:border-gray-600 text-[11px] text-gray-500 dark:text-gray-500">
        <span>{{ report.status === 'provisional' ? `Provisional · as at ${asAt}` : `Generated ${formatDate(report.generated_at)}` }}</span>
        <span class="tusome-sign">Prepared on <b>Tusome<span class="tusome-dot">.</span></b> &middot; {{ report.platform?.tagline || 'Online learning platform' }}</span>
        <span v-if="report.school?.motto" class="italic">Motto: '{{ report.school.motto }}'</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gradeBg } from '@/utils/grades'
import BadgeIcon from '@/components/common/BadgeIcon.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { computed, ref, watch, onMounted } from 'vue'
import QRCode from 'qrcode'
import type { ReportCard } from '@/types/reportCard'
import { resolveAssetUrl } from '@/utils/url'

const props = defineProps<{
  report: ReportCard
  editableClassTeacherComment?: boolean
  editableHeadTeacherComment?: boolean
}>()

defineEmits<{
  'save-class-teacher-comment': [string]
  'save-head-teacher-comment': [string]
}>()

const rootEl = ref<HTMLElement | null>(null)
defineExpose({ rootEl })

// Encodes the app's own origin, not any per-report data, so it's generated once on mount rather
// than re-derived per report - scanning it just takes whoever printed/holds this report to the
// system online (matches wherever this build is actually being served from, dev or production).
const qrCodeDataUrl = ref<string | null>(null)

onMounted(async () => {
  try {
    qrCodeDataUrl.value = await QRCode.toDataURL(window.location.origin, {
      width: 160,
      margin: 1,
      errorCorrectionLevel: 'M',
      color: { dark: '#1e1b4b', light: '#ffffff' },
    })
  } catch (e) {
    qrCodeDataUrl.value = null
  }
})

const maxConstructs = computed(() => {
  const max = Math.max(0, ...props.report.subjects.map(s => s.constructs.length))
  return Math.max(max, 1)
})

const studentInitials = computed(() => {
  const { first_name, last_name } = props.report.student
  return `${first_name?.[0] || ''}${last_name?.[0] || ''}`.toUpperCase()
})

// Mirrors ReportCardGradingService::GRADE_BANDS exactly - the A-Level (5) table is the reference
// bands as-is; the O-Level (3) table is that same service's proportional 3/5 scaling of them.
const RESULT_KEYS: Record<number, { range: string; level: string; grade: string; points: number }[]> = {
  5: [
    { range: '4.6-5.0', level: 'Exceptional', grade: 'A', points: 5 },
    { range: '3.7-4.5', level: 'Outstanding', grade: 'B', points: 4 },
    { range: '2.8-3.6', level: 'Satisfactory', grade: 'C', points: 3 },
    { range: '1.9-2.7', level: 'Basic', grade: 'D', points: 2 },
    { range: '1.0-1.8', level: 'Elementary', grade: 'E', points: 1 },
  ],
  3: [
    { range: '2.8-3.0', level: 'Exceptional', grade: 'A', points: 3 },
    { range: '2.2-2.7', level: 'Outstanding', grade: 'B', points: 2 },
    { range: '1.7-2.1', level: 'Satisfactory', grade: 'C', points: 2 },
    { range: '1.1-1.6', level: 'Basic', grade: 'D', points: 1 },
    { range: '0.0-1.0', level: 'Elementary', grade: 'E', points: 1 },
  ],
}

const resultKey = computed(() => RESULT_KEYS[props.report.max_weight] || RESULT_KEYS[5])


// Only subjects with at least one LOA/AOI/EOC-tagged assessment get a competency row - subjects
// with only legacy/untagged assignments keep showing solely in the constructs table above.
const subjectsWithCompetencies = computed(() => props.report.subjects.filter(s => s.competencies.length > 0))

const categoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    LOA: 'LOA — Learning Outcome',
    AOI: 'AOI — Area of Integration',
    EOC: 'EOC — End of Cycle',
  }
  return labels[category] || category
}

const awardColor = (badgeType: string) => {
  const colors: Record<string, string> = {
    platinum: 'bg-cyan-600',
    gold: 'bg-amber-600',
    silver: 'bg-gray-500',
    bronze: 'bg-orange-600',
    special: 'bg-purple-600',
  }
  return colors[badgeType] || 'bg-gray-500'
}

const formatDate = (dateString: string | null) => (dateString ? new Date(dateString.replace(' ', 'T')).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '-')
const logoFailed = ref(false)
const shortDate = (d: string) => (d ? new Date(`${d}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : '-')
// the running line on every PDF page
const pdfTitle = computed(() => `${props.report.student.first_name} ${props.report.student.last_name} · ${props.report.term.name}${props.report.term.academic_year ? ` ${props.report.term.academic_year}` : ''} · ${props.report.school?.school_name || ''}`)
const asAt = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

const schoolInitials = computed(() => (props.report.school?.school_name || 'School')
  .split(/\s+/).filter(w => /^[A-Za-z]/.test(w) && !/^(of|the|and)$/i.test(w)).slice(0, 2).map(w => w[0].toUpperCase()).join(''))

// Subject by subject on Tusome, in the same order as the grades table; every subject keeps its row
const activityRows = computed(() => {
  const by = new Map((props.report.activity?.subjects ?? []).map(a => [a.subject_id, a]))
  const blank = { set: 0, handed_in: 0, on_time: 0, returned: 0, average: null as number | null, topics_read: 0, topics_finished: 0, reading_minutes: 0, live_attended: 0, passed: 0, failed: 0, loa: null as number | null, aoi: null as number | null, eoc: null as number | null, notes_topics: 0, notes_percent: null as number | null }
  return props.report.subjects.map(s => ({ ...blank, ...by.get(s.subject_id), subject_id: s.subject_id, name: s.subject_name }))
})

const subjectName = (id: number) => props.report.subjects.find(s => s.subject_id === id)?.subject_name || 'Subject'
const scoreClass = (v: number | null) => (v === null ? 'text-gray-400' : v < 50 ? 'font-semibold text-rose-700 dark:text-rose-300' : v >= 75 ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300')

// The figures a parent asks first: sign-ins, work done, passed and failed, notes read
const glance = computed(() => {
  const a = props.report.activity
  if (!a) return []
  const t = a.totals
  const out: { label: string; value: string | number; note?: string; bar?: number; tone?: string }[] = [
    { label: 'Sign-ins', value: props.report.login_count, note: `on ${a.days_active} day${a.days_active === 1 ? '' : 's'}` },
    { label: 'Assessments done', value: t.set ? `${t.handed_in}/${t.set}` : '0', note: t.handed_in ? `${Math.round((t.on_time / t.handed_in) * 100)}% on time` : 'none handed in yet' },
    { label: 'Passed', value: t.passed, note: `${a.pass_from}% or more`, tone: t.passed ? 'tone-good' : '' },
    { label: 'Failed', value: t.failed, note: `below ${a.pass_from}%`, tone: t.failed ? 'tone-bad' : '' },
    { label: 'Notes read', value: a.notes_percent !== null ? `${a.notes_percent}%` : '-', note: t.notes_topics ? `of ${t.notes_topics} topic${t.notes_topics === 1 ? '' : 's'}` : 'no notes yet', bar: a.notes_percent ?? 0 },
    { label: 'Live classes', value: t.live_attended, note: 'joined' },
    { label: 'Revision', value: a.revision_days, note: 'days' }
  ]
  return out
})

const hasMarks = computed(() => (props.report.activity?.totals.returned ?? 0) > 0)
type Point = { subject: string; kind: string; text: string; pct: number }
// Weakest first: learning outcomes not yet achieved, AOI tasks below the pass mark, and subjects
// whose LOA / AOI / EOC average is below it
const weakPoints = computed<Point[]>(() => {
  const a = props.report.activity
  if (!a) return []
  const pass = a.pass_from
  const pts: Point[] = [
    ...a.outcomes.filter(o => !o.achieved).map(o => ({ subject: subjectName(o.subject_id), kind: 'Learning outcome:', text: o.outcome, pct: o.percentage })),
    ...a.aoi_tasks.filter(x => x.percentage < pass).map(x => ({ subject: subjectName(x.subject_id), kind: 'AOI:', text: x.title, pct: x.percentage })),
    ...a.subjects.flatMap(sub => (['loa', 'aoi', 'eoc'] as const).filter(k => sub[k] !== null && (sub[k] as number) < pass)
      .map(k => ({ subject: subjectName(sub.subject_id), kind: `${k.toUpperCase()} average`, text: '', pct: sub[k] as number })))
  ]
  return pts.sort((x, y) => x.pct - y.pct).slice(0, 6)
})
const strongPoints = computed<Point[]>(() => {
  const a = props.report.activity
  if (!a) return []
  const pts: Point[] = [
    ...a.outcomes.filter(o => o.percentage >= 75).map(o => ({ subject: subjectName(o.subject_id), kind: 'Learning outcome:', text: o.outcome, pct: o.percentage })),
    ...a.aoi_tasks.filter(x => x.percentage >= 75).map(x => ({ subject: subjectName(x.subject_id), kind: 'AOI:', text: x.title, pct: x.percentage }))
  ]
  if (!pts.length) {
    for (const sub of a.subjects) if (sub.average !== null && sub.average >= 75) pts.push({ subject: subjectName(sub.subject_id), kind: 'Marked work', text: 'average', pct: sub.average })
  }
  return pts.sort((x, y) => y.pct - x.pct).slice(0, 5)
})

const classTeacherCommentDraft = ref(props.report.class_teacher_comment || '')
const headTeacherCommentDraft = ref(props.report.head_teacher_comment || '')

watch(() => props.report, (r) => {
  classTeacherCommentDraft.value = r.class_teacher_comment || ''
  headTeacherCommentDraft.value = r.head_teacher_comment || ''
})
</script>

<style scoped>
/*
 * html2canvas can't reliably read @font-face rules from the cross-origin Google Fonts
 * stylesheet used app-wide (Inter/Poppins), so it silently substitutes a fallback font whose
 * metrics don't match the ones Tailwind's classes were tuned for - this clips glyph tops/bottoms
 * in the exported PDF. Pin the report card to a font stack that's always synchronously
 * available, on screen and in the capture alike, so what's exported matches what's shown.
 */
.report-card {
  font-family: Arial, Helvetica, sans-serif;
}

.print-color-exact {
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* Pure navy, not a gray/black gradient - kept as one flat color in both light and dark mode. */
.totals-bar {
  background-color: #001f4d;
}

.school-mark {
  display: inline-block;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  border-radius: 12px;
  font-size: 28px;
  letter-spacing: 1px;
}

.tusome-sign b {
  font-family: Georgia, 'Times New Roman', serif;
  color: #1b3fa0;
  font-size: 12px;
}
.record-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 2px 12px;
  padding: 7px 14px;
  border-radius: 10px;
  background-color: #001f4d;
  color: #fff;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.02em;
  border-left: 5px solid #d9a520;
}
.record-sub {
  font-weight: 400;
  font-size: 11px;
  color: #bfd0f5;
}
.glance {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(88px, 1fr));
  gap: 6px;
}
.glance-cell {
  display: block;
  padding: 8px 10px;
  border: 2px solid #d1d5db;
  border-radius: 10px;
  background: #f9fafb;
}
.dark .glance-cell {
  border-color: #374151;
  background: rgb(17 24 39 / 0.4);
}
.glance-num {
  display: block;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.2;
  color: #111827;
  font-family: Georgia, 'Times New Roman', serif;
}
.dark .glance-num {
  color: #fff;
}
.glance-label {
  display: block;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #4b5563;
}
.dark .glance-label {
  color: #9ca3af;
}
.glance-note {
  display: block;
  font-size: 10px;
  color: #6b7280;
}
.glance-bar,
.meter {
  display: block;
  height: 5px;
  margin-top: 4px;
  border-radius: 999px;
  background: #e5e7eb;
  overflow: hidden;
}
.meter {
  margin-top: 0;
}
.glance-bar i,
.meter i {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: #1b3fa0;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.tone-good {
  border-color: #a7b8e8;
}
.tone-bad {
  border-color: #f2a7b3;
}
.tone-bad .glance-num {
  color: #be123c;
}
.focus-box {
  border: 2px solid;
  border-radius: 12px;
  padding: 10px 12px;
}
.focus-weak {
  border-color: #f5c2c9;
  background: #fff7f8;
}
.focus-strong {
  border-color: #c7d2fe;
  background: #f5f7ff;
}
.dark .focus-weak {
  border-color: rgb(190 18 60 / 0.4);
  background: rgb(190 18 60 / 0.08);
}
.dark .focus-strong {
  border-color: rgb(99 102 241 / 0.4);
  background: rgb(99 102 241 / 0.08);
}
.focus-title {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
}
.focus-weak .focus-title {
  color: #9f1239;
}
.focus-strong .focus-title {
  color: #1b3fa0;
}
.dark .focus-weak .focus-title {
  color: #fda4af;
}
.dark .focus-strong .focus-title {
  color: #c7d2fe;
}
.focus-list li {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  font-size: 12px;
  line-height: 1.4;
  padding: 3px 0;
  color: #374151;
}
.dark .focus-list li {
  color: #d1d5db;
}
.focus-pct {
  flex-shrink: 0;
  width: 38px;
  text-align: right;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
.focus-weak .focus-pct {
  color: #be123c;
}
.focus-strong .focus-pct {
  color: #1b3fa0;
}
.dark .focus-strong .focus-pct {
  color: #c7d2fe;
}
.focus-kind {
  color: #6b7280;
}
.focus-empty {
  font-size: 12px;
  font-style: italic;
  color: #6b7280;
}

.tusome-dot {
  color: #d9a520;
}
.dark .tusome-sign b {
  color: #c7d2fe;
}

.qr-frame {
  width: 56px;
  height: 56px;
  padding: 4px;
  background-color: #ffffff;
  border: 2px solid #4338ca;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

/*
 * html2canvas doesn't reliably resolve flexbox vertical centering (items-center/justify-center)
 * on these small badges - the captured PDF shows the letter/initials sitting off-center, poking
 * past the circle's edge instead of sitting in the middle. Line-height-based centering (no flex
 * involved at all) renders identically on screen and is what html2canvas actually gets right.
 */
.grade-badge,
.initials-badge {
  display: inline-block;
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  border-radius: 9999px;
}

.student-photo-fallback {
  display: inline-block;
  line-height: 64px;
  text-align: center;
}

.award-pill {
  display: inline-block;
  line-height: 1.6;
  vertical-align: middle;
  white-space: nowrap;
}

.award-pill > span {
  display: inline;
  vertical-align: middle;
}

.award-pill > span + span {
  margin-left: 4px;
}

@media print {
  .report-card {
    box-shadow: none !important;
    border: none !important;
  }
}
</style>
