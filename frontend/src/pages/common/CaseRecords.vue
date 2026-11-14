<template>
  <!-- Cases for HODs and admins (the DOS included): every learner with a discipline case, the
       record of each, and the disciplinary report - for a learner, a stream, a class or the whole
       school - to print and take to the committee. Admins resolve cases and note decisions; only
       the super admin deletes. Teachers record cases on their own Cases page. -->
  <div class="cases-page w-full">
    <PageHeader title="Cases" description="Learners' discipline cases reported by staff, with evidence - and the disciplinary report for the committee." icon="document" accent="indigo" class="print:hidden">
      <StatStrip v-if="totals" :items="figureItems" />
    </PageHeader>

    <div class="print:hidden mb-4 inline-flex rounded-xl bg-white dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700 p-1" role="tablist">
      <button v-for="t in TABS" :key="t.key" type="button" role="tab" :aria-selected="tab === t.key" class="px-4 py-1.5 rounded-lg text-sm font-semibold transition" :class="tab === t.key ? 'bg-indigo-800 text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40'" @click="tab = t.key">{{ t.label }}</button>
    </div>

    <!-- ============================== Learners ============================== -->
    <div v-if="tab === 'learners'" class="grid lg:grid-cols-[23rem_minmax(0,1fr)] gap-4 items-start">
      <aside class="print:hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden" :class="active ? 'hidden lg:block' : ''">
        <div class="p-3 border-b border-gray-100 dark:border-gray-700 space-y-2">
          <input v-model="q" type="search" placeholder="Search a learner…" class="inp">
          <div class="flex gap-1.5 text-xs">
            <button v-for="f in FILTERS" :key="f.key" type="button" class="px-2.5 py-1 rounded-full font-medium border transition" :class="filter === f.key ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300'" @click="filter = f.key">{{ f.label }}</button>
          </div>
        </div>
        <div v-if="loading" class="p-3 space-y-2"><div v-for="i in 5" :key="i" class="h-16 rounded-xl bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div></div>
        <p v-else-if="!shownLearners.length" class="p-6 text-center text-sm text-gray-500">{{ q || filter !== 'all' ? 'No learner matches.' : 'No cases reported yet. When staff record one, the learner appears here.' }}</p>
        <ul v-else class="max-h-[72vh] overflow-y-auto p-2 space-y-1.5">
          <li v-for="l in shownLearners" :key="l.id">
            <button type="button" class="learner-row" :class="active?.student.id === l.id ? 'is-on' : ''" @click="open(l.id)">
              <span class="avatar" :class="sev(l.worst).avatar">{{ initials(l.name) }}</span>
              <span class="flex-1 min-w-0">
                <span class="flex items-center gap-1.5">
                  <span class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ l.name }}</span>
                  <span v-if="l.cases >= 2" class="repeat" :class="l.cases >= 3 ? 'repeat-hot' : ''">Repeat</span>
                </span>
                <span class="block text-xs text-gray-500 dark:text-gray-400 truncate">{{ l.class_label || l.admission_number }} &middot; last {{ day(l.last_on) }}</span>
              </span>
              <span class="count" :class="l.cases >= 3 ? 'count-hot' : l.cases === 2 ? 'count-warm' : ''" :title="`${l.cases} case${l.cases === 1 ? '' : 's'}`">
                <span class="count-n">{{ l.cases }}</span>
                <span class="count-l">{{ l.cases === 1 ? 'case' : 'cases' }}</span>
              </span>
            </button>
            <p v-if="l.open_cases" class="pl-14 -mt-0.5 pb-1 text-[10px] font-semibold text-amber-700 dark:text-amber-300">{{ l.open_cases }} open</p>
          </li>
        </ul>
      </aside>

      <!-- one learner's record -->
      <section v-if="active" class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
        <header class="record-head print-color-exact">
          <button type="button" class="lg:hidden print:hidden text-sm font-semibold text-gold-300 mb-2" @click="active = null">&larr; All learners</button>
          <div class="flex flex-wrap items-center gap-4">
            <span class="w-14 h-14 rounded-2xl bg-white/10 ring-1 ring-white/20 text-white text-lg font-semibold flex items-center justify-center">{{ initials(active.student.name) }}</span>
            <div class="flex-1 min-w-0">
              <p class="text-[11px] uppercase tracking-widest text-gold-300 font-semibold">Discipline record</p>
              <h2 class="text-xl sm:text-2xl font-semibold text-white truncate">{{ active.student.name }}</h2>
              <p class="text-sm text-white/75">{{ active.student.admission_number }}<template v-if="active.student.class_label"> &middot; {{ active.student.class_label }}</template></p>
            </div>
            <div class="big-count print-color-exact" :class="active.cases.length >= 3 ? 'big-count-hot' : ''">
              <span class="block text-3xl font-semibold leading-none">{{ active.cases.length }}</span>
              <span class="block text-[11px] uppercase tracking-wide mt-1">{{ active.cases.length === 1 ? 'case' : 'cases' }}</span>
            </div>
          </div>
          <div class="mt-4 flex flex-wrap gap-2 text-xs">
            <span v-for="s in sevSummary" :key="s.key" class="px-2.5 py-1 rounded-full font-semibold" :class="s.chip">{{ s.n }} {{ s.label.toLowerCase() }}</span>
            <span v-if="openCount" class="px-2.5 py-1 rounded-full font-semibold bg-amber-400 text-amber-950">{{ openCount }} open</span>
            <span class="flex-1"></span>
            <button type="button" class="print:hidden px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold" @click="reportFor(active.student.id)">Disciplinary report</button>
          </div>
        </header>

        <ol class="p-4 sm:p-6 space-y-4">
          <li v-for="(c, i) in active.cases" :key="c.id" class="case-card" :class="sev(c.severity).edge">
            <div class="flex flex-wrap items-center gap-2">
              <span class="case-no">Case {{ active.cases.length - i }} of {{ active.cases.length }}</span>
              <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ day(c.occurred_on) }}</span>
              <span class="chip" :class="sev(c.severity).chip">{{ sev(c.severity).label }}</span>
              <span class="chip bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200">{{ c.category }}</span>
              <span class="flex-1"></span>
              <span class="chip" :class="c.status === 'resolved' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200'">{{ c.status === 'resolved' ? 'Resolved' : 'Open' }}</span>
            </div>
            <p class="mt-2 text-base font-semibold text-gray-900 dark:text-white">{{ c.title }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">Reported by <b class="text-gray-700 dark:text-gray-200">{{ c.reporter_name }}</b> ({{ c.reporter_role === 'hod' ? 'HOD' : c.reporter_role === 'super_admin' ? 'Super admin' : 'teacher' }}) &middot; recorded {{ when(c.created_at) }}</p>
            <p class="mt-2 text-sm text-gray-700 dark:text-gray-200 whitespace-pre-line">{{ c.description }}</p>
            <p v-if="c.action_taken" class="mt-1.5 text-sm text-gray-700 dark:text-gray-200"><b>Action taken:</b> {{ c.action_taken }}</p>
            <div v-if="c.files.length" class="mt-3 flex flex-wrap gap-2"><CaseFile v-for="f in c.files" :key="f.id" :file="f" /></div>

            <div class="mt-3 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 p-3">
              <p class="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Committee note / decision</p>
              <template v-if="can.manage">
                <textarea v-model="notes[c.id]" rows="2" maxlength="3000" placeholder="e.g. Seen by the committee on 14 Nov: warned, parents informed." class="inp print:hidden"></textarea>
                <p class="hidden print:block text-sm">{{ c.admin_note || '-' }}</p>
              </template>
              <p v-else class="text-sm text-gray-700 dark:text-gray-200">{{ c.admin_note || 'No note yet.' }}</p>
              <div v-if="can.manage || can.delete" class="print:hidden mt-2 flex flex-wrap gap-2">
                <template v-if="can.manage">
                  <button type="button" class="btn-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700" :disabled="busy === c.id || (notes[c.id] || '') === (c.admin_note || '')" @click="save(c, { admin_note: notes[c.id] || '' })">Save note</button>
                  <button type="button" class="btn-sm" :class="c.status === 'resolved' ? 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200' : 'bg-indigo-600 text-white hover:bg-indigo-700'" :disabled="busy === c.id" @click="save(c, { status: c.status === 'resolved' ? 'open' : 'resolved' })">{{ c.status === 'resolved' ? 'Reopen' : 'Mark resolved' }}</button>
                </template>
                <span class="flex-1"></span>
                <button v-if="can.delete" type="button" class="btn-sm text-rose-700 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/30" :disabled="busy === c.id" @click="remove(c)">Delete case</button>
              </div>
            </div>
          </li>
        </ol>
      </section>
      <section v-else class="hidden lg:flex flex-col rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-10 items-center justify-center text-center text-sm text-gray-500 dark:text-gray-400 min-h-[18rem]">
        <AppIcon name="clipboard" class="w-8 h-8 text-gray-300 dark:text-gray-600" />
        <p class="mt-2">Choose a learner to see their cases.</p>
      </section>
    </div>

    <!-- ============================== The disciplinary report ============================== -->
    <div v-else>
      <section class="print:hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 mb-4">
        <div class="flex flex-wrap items-end gap-3">
          <div>
            <span class="lbl">Report for</span>
            <div class="inline-flex rounded-xl border border-gray-300 dark:border-gray-600 p-1 gap-1">
              <button v-for="s in SCOPES" :key="s.key" type="button" class="px-3 py-1.5 rounded-lg text-sm font-medium transition" :class="scope === s.key ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'" @click="scope = s.key">{{ s.label }}</button>
            </div>
          </div>
          <div v-if="scope === 'class'">
            <label class="lbl" for="r-class">Class</label>
            <select id="r-class" v-model="value" class="inp min-w-[9rem]"><option value="" disabled>Choose…</option><option v-for="c in scopes.classes" :key="c" :value="c">{{ c }}</option></select>
          </div>
          <div v-else-if="scope === 'stream'">
            <label class="lbl" for="r-stream">Stream</label>
            <select id="r-stream" v-model="value" class="inp min-w-[9rem]"><option value="" disabled>Choose…</option><option v-for="s in scopes.streams" :key="s.id" :value="String(s.id)">{{ s.label }}</option></select>
          </div>
          <div v-else-if="scope === 'student'">
            <label class="lbl" for="r-learner">Learner</label>
            <select id="r-learner" v-model="value" class="inp min-w-[14rem]"><option value="" disabled>Choose…</option><option v-for="l in learners" :key="l.id" :value="String(l.id)">{{ l.name }} ({{ l.cases }})</option></select>
          </div>
          <div>
            <label class="lbl" for="r-from">From</label>
            <input id="r-from" v-model="from" type="date" class="inp">
          </div>
          <div>
            <label class="lbl" for="r-to">To</label>
            <input id="r-to" v-model="to" type="date" class="inp">
          </div>
          <div class="flex gap-1.5">
            <button v-for="p in PERIODS" :key="p.label" type="button" class="px-2.5 py-2 rounded-lg text-xs font-medium border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700" @click="setPeriod(p.days)">{{ p.label }}</button>
          </div>
          <span class="flex-1"></span>
          <button type="button" class="btn-primary" :disabled="reportLoading || (scope !== 'school' && !value)" @click="loadReport">{{ reportLoading ? 'Making…' : 'Make report' }}</button>
          <button v-if="report" type="button" class="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-sm font-semibold text-gray-700 dark:text-gray-200" @click="print">Print</button>
        </div>
      </section>

      <p v-if="!report && !reportLoading" class="print:hidden rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-10 text-center text-sm text-gray-500">Choose who the report is for and the period, then <b>Make report</b>.</p>

      <article v-if="report" class="sheet">
        <header class="sheet-head print-color-exact">
          <img v-if="report.school.logo_path && !logoFailed" :src="resolveAssetUrl(report.school.logo_path)" alt="" class="w-16 h-16 rounded-lg bg-white object-contain p-1 flex-shrink-0" @error="logoFailed = true">
          <div class="min-w-0 flex-1 text-center">
            <p class="text-xl sm:text-2xl font-semibold uppercase tracking-wide">{{ report.school.school_name || 'School' }}</p>
            <p v-if="report.school.address || report.school.box_number" class="text-xs text-white/75">{{ [report.school.box_number, report.school.address].filter(Boolean).join(' · ') }}</p>
            <p class="mt-2 inline-block px-3 py-1 rounded-full bg-gold-400 text-indigo-950 text-xs font-semibold uppercase tracking-widest">Disciplinary report</p>
            <p class="mt-2 text-base font-semibold">{{ report.label }}</p>
            <p class="text-xs text-white/75">{{ day(report.from) }} &ndash; {{ day(report.to) }} &middot; printed {{ day(todayIso) }}</p>
          </div>
          <span class="w-16 flex-shrink-0 hidden sm:block" aria-hidden="true"></span>
        </header>

        <div class="p-5 sm:p-7 space-y-6">
          <p v-if="!report.totals.cases" class="text-center text-sm text-gray-500 py-6">No cases were recorded for {{ report.label.toLowerCase() }} in this period.</p>
          <template v-else>
            <!-- the figures -->
            <div class="figs">
              <div v-for="f in reportFigures" :key="f.label" class="fig" :class="f.tone">
                <span class="fig-n">{{ f.value }}</span>
                <span class="fig-l">{{ f.label }}</span>
              </div>
            </div>

            <!-- the story in a few lines -->
            <ul class="story">
              <li v-for="(line, i) in story" :key="i">{{ line }}</li>
            </ul>

            <div class="grid md:grid-cols-2 gap-5">
              <section class="panel">
                <h3 class="panel-title">Most committed offences</h3>
                <ul class="bars">
                  <li v-for="o in report.offences" :key="o.category">
                    <span class="bar-label">{{ o.category }}</span>
                    <span class="bar-track"><i :style="{ width: `${pct(o.cases, report.offences[0].cases)}%` }"></i></span>
                    <span class="bar-n">{{ o.cases }}</span>
                  </li>
                </ul>
              </section>
              <section class="panel">
                <h3 class="panel-title">How serious</h3>
                <ul class="bars">
                  <li v-for="s in severityRows" :key="s.key">
                    <span class="bar-label">{{ s.label }}</span>
                    <span class="bar-track"><i :class="s.bar" :style="{ width: `${pct(s.n, report.totals.cases)}%` }"></i></span>
                    <span class="bar-n">{{ s.n }}</span>
                  </li>
                </ul>
                <h3 class="panel-title panel-title-next">Month by month</h3>
                <ul class="bars">
                  <li v-for="m in report.months" :key="m.month">
                    <span class="bar-label">{{ monthName(m.month) }}</span>
                    <span class="bar-track"><i :style="{ width: `${pct(m.cases, maxMonth)}%` }"></i></span>
                    <span class="bar-n">{{ m.cases }}</span>
                  </li>
                </ul>
              </section>
            </div>

            <section v-if="report.scope !== 'student'" class="panel">
              <h3 class="panel-title">Learners with the most cases</h3>
              <table class="tbl">
                <thead><tr><th class="w-8">#</th><th class="text-left">Learner</th><th class="text-left">Class</th><th>Cases</th><th>Major</th><th>Open</th><th class="text-left">Offences</th></tr></thead>
                <tbody>
                  <tr v-for="(l, i) in report.learners" :key="l.id">
                    <td>{{ i + 1 }}</td>
                    <td class="text-left font-semibold">{{ l.name }}<span v-if="l.cases >= 2" class="repeat ml-1.5" :class="l.cases >= 3 ? 'repeat-hot' : ''">Repeat</span></td>
                    <td class="text-left">{{ l.class_label || '-' }}</td>
                    <td class="font-semibold">{{ l.cases }}</td>
                    <td :class="l.major ? 'text-rose-700 font-semibold' : 'text-gray-400'">{{ l.major || '-' }}</td>
                    <td>{{ l.open || '-' }}</td>
                    <td class="text-left text-xs">{{ l.offences }}</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <div v-if="report.scope === 'school' || report.scope === 'class'" class="grid md:grid-cols-2 gap-5">
              <section class="panel">
                <h3 class="panel-title">Streams</h3>
                <table class="tbl"><thead><tr><th class="text-left">Stream</th><th>Cases</th><th>Learners</th></tr></thead>
                  <tbody><tr v-for="s in report.streams" :key="s.label"><td class="text-left font-semibold">{{ s.label }}</td><td>{{ s.cases }}</td><td>{{ s.learners }}</td></tr></tbody>
                </table>
              </section>
              <section v-if="report.scope === 'school'" class="panel">
                <h3 class="panel-title">Classes</h3>
                <table class="tbl"><thead><tr><th class="text-left">Class</th><th>Cases</th><th>Learners</th></tr></thead>
                  <tbody><tr v-for="c in report.classes" :key="c.label"><td class="text-left font-semibold">{{ c.label }}</td><td>{{ c.cases }}</td><td>{{ c.learners }}</td></tr></tbody>
                </table>
              </section>
            </div>

            <section class="panel">
              <h3 class="panel-title">The cases ({{ report.cases.length }})</h3>
              <table class="tbl tbl-cases">
                <colgroup>
                  <col class="w-[15%]"><col v-if="report.scope !== 'student'" class="w-[15%]"><col class="w-[12%]"><col class="w-[10%]"><col><col class="w-[11%]"><col class="w-[12%]">
                </colgroup>
                <thead><tr><th class="text-left">Date</th><th v-if="report.scope !== 'student'" class="text-left">Learner</th><th class="text-left">Offence</th><th>Level</th><th class="text-left">What happened</th><th>Status</th><th class="text-left">Reported by</th></tr></thead>
                <tbody>
                  <tr v-for="c in report.cases" :key="c.id">
                    <td class="text-left whitespace-nowrap">{{ day(c.occurred_on) }}</td>
                    <td v-if="report.scope !== 'student'" class="text-left"><b>{{ c.student }}</b><span class="block text-[11px] text-gray-500">{{ c.class_label }}</span></td>
                    <td class="text-left">{{ c.category }}</td>
                    <td><span class="chip" :class="sev(c.severity).chip">{{ sev(c.severity).label }}</span></td>
                    <td class="text-left text-xs"><b>{{ c.title }}</b> - {{ c.description }}<template v-if="c.action_taken"><br><i>Action: {{ c.action_taken }}</i></template><template v-if="c.admin_note"><br><i>Committee: {{ c.admin_note }}</i></template></td>
                    <td><span class="chip" :class="c.status === 'resolved' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200'">{{ c.status === 'resolved' ? 'Resolved' : 'Open' }}</span></td>
                    <td class="text-left text-xs">{{ c.reporter_name }}<span v-if="c.reporter_role === 'super_admin' && !c.reporter_name.startsWith('Super admin')" class="block text-[10px] text-indigo-700">Super admin</span></td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section class="panel">
              <h3 class="panel-title">Reported by</h3>
              <p class="panel-body text-sm text-gray-700 dark:text-gray-200">{{ report.reporters.map(r => `${r.name} (${r.cases})`).join(' · ') }}</p>
            </section>
          </template>

          <!-- for the committee to sign -->
          <div class="signatures">
            <div><span></span>Discipline master / DOS</div>
            <div><span></span>Head teacher</div>
            <div><span></span>Date</div>
          </div>
          <p class="text-[11px] text-gray-400 text-right">Prepared on <b class="brand">Tusome<span>.</span></b> &middot; confidential - for the discipline committee</p>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import CaseFile from '@/components/cases/CaseFile.vue'
import { resolveAssetUrl } from '@/utils/url'
import { useToastStore } from '@/stores/toast'

interface LearnerRow { id: number; name: string; admission_number: string; class_label: string | null; cases: number; open_cases: number; last_on: string; worst: string }
interface CaseItem {
  id: number; occurred_on: string; category: string; severity: string; title: string; description: string; action_taken: string | null
  status: 'open' | 'resolved'; admin_note: string | null; reporter_name: string; reporter_role: string; created_at: string
  files: { id: number; name: string; mime: string; size: number }[]
}
interface Report {
  scope: string; value: string; label: string; from: string; to: string
  school: { school_name?: string; logo_path?: string | null; address?: string; box_number?: string }
  totals: Record<string, number>
  offences: { category: string; cases: number; learners: number }[]
  learners: { id: number; name: string; class_label: string | null; cases: number; major: number; open: number; offences: string }[]
  streams: { label: string; cases: number; learners: number }[]
  classes: { label: string; cases: number; learners: number }[]
  months: { month: string; cases: number }[]
  reporters: { name: string; cases: number }[]
  cases: { id: number; occurred_on: string; category: string; severity: string; title: string; description: string; action_taken: string | null; status: string; admin_note: string | null; reporter_name: string; reporter_role?: string; student: string; class_label: string | null }[]
}

const TABS = [{ key: 'learners', label: 'Learners' }, { key: 'report', label: 'Disciplinary report' }] as const
const FILTERS = [{ key: 'all', label: 'All' }, { key: 'repeat', label: 'Repeat (2+)' }, { key: 'open', label: 'Open' }, { key: 'major', label: 'Major' }] as const
const SCOPES = [{ key: 'school', label: 'Whole school' }, { key: 'class', label: 'Class' }, { key: 'stream', label: 'Stream' }, { key: 'student', label: 'Learner' }] as const
const PERIODS = [{ label: '30 days', days: 30 }, { label: '3 months', days: 91 }, { label: 'This year', days: -1 }]
const SEV: Record<string, { label: string; chip: string; avatar: string; edge: string; bar: string }> = {
  minor: { label: 'Minor', chip: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200', avatar: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200', edge: 'edge-minor', bar: 'bar-minor' },
  serious: { label: 'Serious', chip: 'bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200', avatar: 'bg-amber-400 text-amber-950', edge: 'edge-serious', bar: 'bar-serious' },
  major: { label: 'Major', chip: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200', avatar: 'bg-rose-600 text-white', edge: 'edge-major', bar: 'bar-major' }
}
const sev = (k: string) => SEV[k] || SEV.minor

const toast = useToastStore()
const todayIso = new Date().toISOString().slice(0, 10)
const tab = ref<'learners' | 'report'>('learners')
const learners = ref<LearnerRow[]>([])
const totals = ref<{ cases: number; open_cases: number; learners: number; last_30: number } | null>(null)
const can = ref({ manage: false, delete: false })
const loading = ref(true)
const q = ref('')
const filter = ref<(typeof FILTERS)[number]['key']>('all')
const active = ref<{ student: { id: number; name: string; admission_number: string; class_label: string | null }; cases: CaseItem[] } | null>(null)
const notes = ref<Record<number, string>>({})
const busy = ref<number | null>(null)

const initials = (n: string) => n.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase()
const day = (d: string) => new Date(`${d.slice(0, 10)}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
const when = (d: string) => new Date(d.replace(' ', 'T')).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
const monthName = (m: string) => new Date(`${m}-15T12:00:00`).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
const pct = (a: number, b: number) => (b ? Math.max(4, Math.round((a / b) * 100)) : 0)

const shownLearners = computed(() => learners.value.filter(l =>
  filter.value === 'all' || (filter.value === 'repeat' && l.cases >= 2) || (filter.value === 'open' && l.open_cases > 0) || (filter.value === 'major' && l.worst === 'major')))
const openCount = computed(() => active.value?.cases.filter(c => c.status === 'open').length ?? 0)
const sevSummary = computed(() => (['major', 'serious', 'minor'] as const)
  .map(k => ({ key: k, label: SEV[k].label, chip: k === 'major' ? 'bg-rose-600 text-white' : k === 'serious' ? 'bg-amber-400 text-amber-950' : 'bg-white/15 text-white', n: active.value?.cases.filter(c => c.severity === k).length ?? 0 }))
  .filter(s => s.n))
const figureItems = computed<StatItem[]>(() => [
  { label: 'Learners with cases', value: totals.value?.learners ?? 0, tone: 'indigo' },
  { label: 'Cases', value: totals.value?.cases ?? 0, tone: 'violet' },
  { label: 'Open', value: totals.value?.open_cases ?? 0, tone: 'amber' },
  { label: 'Last 30 days', value: totals.value?.last_30 ?? 0, tone: 'sky' }
])

const load = async () => {
  loading.value = true
  try {
    const res = await axios.get('/api/case-records', { params: q.value.trim() ? { q: q.value.trim() } : {} })
    learners.value = res.data.data.learners
    totals.value = res.data.data.totals
    can.value = res.data.data.can
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not load cases')
  } finally {
    loading.value = false
  }
}

const open = async (id: number) => {
  try {
    const res = await axios.get(`/api/case-records/students/${id}`)
    active.value = res.data.data
    can.value = res.data.data.can
    notes.value = Object.fromEntries(active.value!.cases.map(c => [c.id, c.admin_note || '']))
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not open the record')
  }
}

const save = async (c: CaseItem, change: { status?: string; admin_note?: string }) => {
  busy.value = c.id
  try {
    const res = await axios.put(`/api/case-records/${c.id}`, change)
    Object.assign(c, res.data.data.case)
    notes.value[c.id] = c.admin_note || ''
    toast.success(change.status ? (change.status === 'resolved' ? 'Case resolved' : 'Case reopened') : 'Note saved')
    load()
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not save')
  } finally {
    busy.value = null
  }
}

const remove = async (c: CaseItem) => {
  if (!confirm(`Delete "${c.title}" from ${active.value?.student.name}'s record? This takes it off every list and report.`)) return
  busy.value = c.id
  try {
    await axios.delete(`/api/case-records/${c.id}`)
    toast.success('Case deleted')
    const id = active.value!.student.id
    await load()
    if (learners.value.some(l => l.id === id)) await open(id)
    else active.value = null
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not delete')
  } finally {
    busy.value = null
  }
}

// ---- the disciplinary report
const scopes = ref<{ classes: string[]; streams: { id: number; label: string }[] }>({ classes: [], streams: [] })
const scope = ref<(typeof SCOPES)[number]['key']>('school')
const value = ref('')
const from = ref(`${todayIso.slice(0, 4)}-01-01`)
const to = ref(todayIso)
const report = ref<Report | null>(null)
const reportLoading = ref(false)
const logoFailed = ref(false)
watch(scope, () => { value.value = '' })
const setPeriod = (days: number) => {
  to.value = todayIso
  from.value = days < 0 ? `${todayIso.slice(0, 4)}-01-01` : new Date(Date.now() - days * 86400000).toISOString().slice(0, 10)
}
const loadReport = async () => {
  reportLoading.value = true
  try {
    const res = await axios.get('/api/case-records/report', { params: { scope: scope.value, value: value.value, from: from.value, to: to.value } })
    report.value = res.data.data
  } catch (err: any) {
    toast.error(err.response?.data?.errors?.value || err.response?.data?.message || 'Could not make the report')
  } finally {
    reportLoading.value = false
  }
}
const reportFor = (studentId: number) => {
  tab.value = 'report'
  scope.value = 'student'
  setTimeout(() => { value.value = String(studentId); from.value = '2000-01-01'; loadReport() })
}
const maxMonth = computed(() => Math.max(1, ...(report.value?.months ?? []).map(m => m.cases)))
const severityRows = computed(() => (['major', 'serious', 'minor'] as const).map(k => ({ key: k, label: SEV[k].label, bar: SEV[k].bar, n: report.value?.totals[k] ?? 0 })))
const reportFigures = computed(() => {
  const t = report.value?.totals ?? {}
  return [
    { label: 'Cases', value: t.cases ?? 0, tone: '' },
    { label: 'Learners involved', value: t.learners ?? 0, tone: '' },
    { label: 'Repeat offenders', value: t.repeat_learners ?? 0, tone: (t.repeat_learners ?? 0) ? 'fig-warm' : '' },
    { label: 'Major cases', value: t.major ?? 0, tone: (t.major ?? 0) ? 'fig-hot' : '' },
    { label: 'Open', value: t.open_cases ?? 0, tone: '' },
    { label: 'Resolved', value: t.resolved ?? 0, tone: '' }
  ]
})
// what a committee member reads first
const story = computed(() => {
  const r = report.value
  if (!r || !r.totals.cases) return []
  const t = r.totals
  const lines = [`${t.cases} case${t.cases === 1 ? '' : 's'} involving ${t.learners} learner${t.learners === 1 ? '' : 's'} were recorded by ${t.reporters} member${t.reporters === 1 ? '' : 's'} of staff between ${day(r.from)} and ${day(r.to)}.`]
  if (r.offences[0]) lines.push(`The most committed offence was ${r.offences[0].category.toLowerCase()} (${r.offences[0].cases} case${r.offences[0].cases === 1 ? '' : 's'})${r.offences[1] ? `, then ${r.offences[1].category.toLowerCase()} (${r.offences[1].cases})` : ''}.`)
  if (r.scope !== 'student' && r.learners[0] && r.learners[0].cases > 1) lines.push(`The learner appearing most is ${r.learners[0].name}${r.learners[0].class_label ? ` (${r.learners[0].class_label})` : ''} with ${r.learners[0].cases} cases; ${t.repeat_learners} learner${t.repeat_learners === 1 ? ' has' : 's have'} more than one case.`)
  if (r.scope === 'school' && r.classes[0]) lines.push(`By class, ${r.classes[0].label} has the most cases (${r.classes[0].cases})${r.streams[0] ? `; by stream, ${r.streams[0].label} (${r.streams[0].cases})` : ''}.`)
  else if (r.scope === 'class' && r.streams[0]) lines.push(`Within the class, stream ${r.streams[0].label} has the most cases (${r.streams[0].cases}).`)
  lines.push(`${t.major} major and ${t.serious} serious case${t.serious === 1 ? '' : 's'}; ${t.open_cases} still open.`)
  return lines
})
const print = () => window.print()

onMounted(async () => {
  await load()
  try {
    const res = await axios.get('/api/case-records/scopes')
    scopes.value = res.data.data
  } catch { /* the class and stream lists stay empty */ }
})
let timer: ReturnType<typeof setTimeout> | undefined
watch(q, () => { clearTimeout(timer); timer = setTimeout(load, 300) })
</script>

<style scoped>
.inp { @apply w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white; }
.lbl { @apply block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1; }
.chip { @apply px-2 py-0.5 rounded-full text-[11px] font-semibold; }
.btn-sm { @apply px-3 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-50; }

.learner-row { @apply w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-left transition border border-transparent hover:bg-gray-50 dark:hover:bg-gray-700/40; }
.learner-row.is-on { @apply bg-indigo-50 border-indigo-200 dark:bg-indigo-900/30 dark:border-indigo-700; }
.avatar { @apply w-10 h-10 rounded-full text-[11px] font-semibold flex items-center justify-center flex-shrink-0; }
.repeat { @apply px-1.5 py-px rounded text-[9px] font-semibold uppercase tracking-wide bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200; }
.repeat-hot { @apply bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-200; }
.count { @apply flex-shrink-0 w-12 rounded-xl py-1 text-center bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200; }
.count-warm { @apply bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100; }
.count-hot { @apply bg-rose-600 text-white; }
.count-n { @apply block text-base font-semibold leading-tight tabular-nums; }
.count-l { @apply block text-[9px] uppercase tracking-wide opacity-80; }

.record-head { @apply px-4 sm:px-6 py-5; background: linear-gradient(120deg, #14307d, #1b3fa0); border-bottom: 3px solid #d9a520; }
.big-count { @apply rounded-2xl px-4 py-2.5 text-center bg-white/10 text-white ring-1 ring-white/20; }
.big-count-hot { @apply bg-rose-600 ring-rose-300/50; }
.case-card { @apply relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 pl-5; break-inside: avoid; }
.case-card::before { content: ''; position: absolute; left: 0; top: 12px; bottom: 12px; width: 4px; border-radius: 0 4px 4px 0; }
.edge-minor::before { background: #8fa8e6; }
.edge-serious::before { background: #e5b836; }
.edge-major::before { background: #e11d48; }
.case-no { @apply px-2 py-0.5 rounded-md text-[11px] font-semibold bg-indigo-900 text-white; }

.sheet { @apply bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden; }
.sheet-head { @apply flex items-center gap-4 px-5 sm:px-7 py-5 text-white; background: linear-gradient(120deg, #14307d, #1b3fa0); border-bottom: 4px solid #d9a520; }
.figs { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 8px; }
.fig { @apply rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 px-3 py-2.5; break-inside: avoid; }
.fig-n { @apply block text-2xl font-semibold text-gray-900 dark:text-white tabular-nums leading-tight; font-family: 'Source Serif 4', Georgia, serif; }
.fig-l { @apply block text-[11px] uppercase tracking-wide font-semibold text-gray-500 dark:text-gray-400; }
.fig-warm { @apply border-amber-300 bg-amber-50 dark:bg-amber-900/20; }
.fig-hot { @apply border-rose-300 bg-rose-50 dark:bg-rose-900/20; }
.fig-hot .fig-n { @apply text-rose-700 dark:text-rose-300; }
.story { @apply space-y-1.5 text-sm text-gray-800 dark:text-gray-100; }
.story li { padding-left: 14px; position: relative; }
.story li::before { content: ''; position: absolute; left: 0; top: 0.55em; width: 6px; height: 6px; border-radius: 999px; background: #1b3fa0; }
/* each part of the report: a framed panel with a heading band */
.panel { @apply rounded-xl border border-indigo-100 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800; break-inside: avoid; }
.panel-title {
  @apply block text-[13px] font-semibold uppercase tracking-wide text-indigo-900 dark:text-indigo-100 px-3.5 py-2;
  background: #eef2fc;
  border-bottom: 2px solid #d9a520;
}
.dark .panel-title { background: rgb(27 63 160 / 0.25); }
.panel-title { break-after: avoid; page-break-after: avoid; }
.panel-title-next { border-top: 1px solid #dce4f8; }
.panel-body { @apply px-3.5 py-3; }
.bars { @apply space-y-2 px-3.5 py-3; }
.bars li { @apply grid items-center gap-3 text-sm; grid-template-columns: 9.5rem 1fr 2.5rem; }
.bar-label { @apply text-gray-800 dark:text-gray-100 truncate font-medium; }
.bar-track { @apply block h-3.5 rounded-md bg-indigo-50 dark:bg-gray-700 overflow-hidden; box-shadow: inset 0 0 0 1px #dce4f8; }
.bar-track i { @apply block h-full rounded-md; background: #1b3fa0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.bar-track i.bar-serious { background: #e5b836; }
.bar-track i.bar-major { background: #e11d48; }
.bar-track i.bar-minor { background: #8fa8e6; }
.bar-n { @apply text-right font-semibold tabular-nums text-gray-900 dark:text-white; }

/* tables: a blue header row, every cell ruled, every other row shaded */
.tbl { @apply w-full text-sm; border-collapse: collapse; table-layout: auto; }
.tbl-cases { table-layout: fixed; }
.tbl th {
  @apply text-[11px] uppercase tracking-wide font-semibold text-white py-2 px-2.5 text-center;
  background: #1b3fa0;
  border: 1px solid #18398f;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.tbl td {
  @apply py-2 px-2.5 text-center tabular-nums text-gray-800 dark:text-gray-200 align-top;
  border: 1px solid #dbe1f0;
}
.tbl tbody tr:nth-child(even) td { background: #f6f8fd; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.dark .tbl td { border-color: rgb(55 65 81); }
.dark .tbl tbody tr:nth-child(even) td { background: rgb(17 24 39 / 0.35); }
.tbl .text-left { text-align: left; }
.tbl tr { break-inside: avoid; }
.tbl-cases td { font-size: 12.5px; }
.tbl-cases td:nth-last-child(3) { overflow-wrap: anywhere; }
.tbl .chip { white-space: nowrap; }
.tbl-cases td:first-child { white-space: nowrap; }
.signatures { @apply grid grid-cols-3 gap-6 pt-10; break-inside: avoid; }
.signatures div { @apply text-xs text-gray-600 dark:text-gray-300 text-center; }
.signatures span { @apply block border-b border-gray-400 mb-1.5 h-8; }
.brand { font-family: Georgia, serif; color: #1b3fa0; }
.brand span { color: #d9a520; }
.print-color-exact { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
@media print {
  @page { size: A4; margin: 12mm; }
  .sheet { border: none; border-radius: 0; }
  .cases-page section { break-inside: auto; }
}
</style>
