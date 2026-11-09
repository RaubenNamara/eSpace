<template>
  <!-- Database: the navigation pane of tables and queries, and the open object - a table in
       Datasheet or Design view, or a query in Design, SQL or Datasheet (results) view. The work is
       the database itself (SQLite, sql.js); Access field types and saved queries are kept in two
       hidden tables (__tusome_fields, __tusome_queries). -->
  <div class="absolute inset-0 flex flex-col bg-white dark:bg-gray-900 text-sm">
    <!-- Access's ribbon (File, Home, Create, External Data; Query Design while a query is open) -->
    <OfficeRibbon v-model:active="tab" :tabs="tabs" color="bg-[#a4373a]">
      <template v-if="tab === 'File'">
        <RibbonGroup label="Save">
          <button type="button" class="rb-big" @click="$emit('download')"><RibbonIcon name="download" size="lg" />Download<br>database</button>
        </RibbonGroup>
        <RibbonGroup label="Info">
          <div class="px-2 py-1 text-xs text-gray-600 dark:text-gray-300 leading-relaxed">The database saves by itself as you work.<br>{{ tables.length }} tables · {{ queries.length }} queries</div>
        </RibbonGroup>
      </template>
      <template v-else-if="tab === 'Home'">
        <RibbonGroup label="Views">
          <button type="button" class="rb-big" :class="{ 'rb-on': open?.view === 'data' }" :disabled="!open" @click="open?.kind === 'query' ? runQuery() : setView('data')"><RibbonIcon name="datasheet" size="lg" />Datasheet<br>View</button>
          <button type="button" class="rb-big" :class="{ 'rb-on': open?.view === 'design' }" :disabled="!open" @click="setView('design')"><RibbonIcon name="design" size="lg" />Design<br>View</button>
          <button v-if="open?.kind === 'query'" type="button" class="rb-big" :class="{ 'rb-on': open?.view === 'sql' }" @click="setView('sql')"><RibbonIcon name="query" size="lg" />SQL<br>View</button>
        </RibbonGroup>
        <RibbonGroup label="Records">
          <div class="flex flex-col">
            <button type="button" class="rb-sm" :disabled="!editable" @click="focusNewRecord"><RibbonIcon name="newRecord" />New</button>
            <button type="button" class="rb-sm" :disabled="!editable || pickedRow === null" @click="pickedRow !== null && deleteRecord(pickedRow)"><RibbonIcon name="deleteRecord" />Delete</button>
            <button type="button" class="rb-sm" :disabled="!open" @click="open?.kind === 'query' ? runQuery() : open && loadGrid(open.name)"><RibbonIcon name="reset" />Refresh All</button>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Sort &amp; Filter">
          <div class="flex flex-col">
            <button type="button" class="rb-sm" :disabled="!grid || pickedCol === null" @click="sortGrid(1)"><RibbonIcon name="sortAsc" />Ascending</button>
            <button type="button" class="rb-sm" :disabled="!grid || pickedCol === null" @click="sortGrid(-1)"><RibbonIcon name="sortDesc" />Descending</button>
            <input v-model="gridFilter" class="rb-select w-32" placeholder="Filter rows" :disabled="!grid" data-ribbon-allow-focus>
          </div>
        </RibbonGroup>
      </template>
      <template v-else-if="tab === 'Create'">
        <RibbonGroup label="Tables">
          <button type="button" class="rb-big" :disabled="readonly" @click="newTable"><RibbonIcon name="table" size="lg" />Table</button>
          <button type="button" class="rb-big" :disabled="readonly" @click="newTable"><RibbonIcon name="design" size="lg" />Table<br>Design</button>
        </RibbonGroup>
        <RibbonGroup label="Queries">
          <button type="button" class="rb-big" :disabled="readonly || !tables.length" @click="newQuery"><RibbonIcon name="query" size="lg" />Query<br>Design</button>
        </RibbonGroup>
      </template>
      <template v-else-if="tab === 'External Data'">
        <RibbonGroup label="Import">
          <label class="rb-big cursor-pointer" :aria-disabled="readonly"><RibbonIcon name="importFile" size="lg" />Text File<br>(CSV)<input type="file" accept=".csv,text/csv" class="hidden" @change="onCsv"></label>
        </RibbonGroup>
        <RibbonGroup label="Export">
          <button type="button" class="rb-big" :disabled="!grid" title="The rows shown, as an Excel file" @click="exportGrid"><RibbonIcon name="excel" size="lg" />Excel</button>
        </RibbonGroup>
      </template>
      <template v-else-if="tab === 'Query Design'">
        <RibbonGroup label="Results">
          <button type="button" class="rb-big" @click="setView('design')"><RibbonIcon name="design" size="lg" />View</button>
          <button type="button" class="rb-big text-[#a4373a] font-semibold" @click="runQuery"><span class="text-2xl font-black leading-7">!</span>Run</button>
        </RibbonGroup>
        <RibbonGroup label="Show/Hide">
          <button type="button" class="rb-big" :class="{ 'rb-on': query.totals }" :disabled="readonly" @click="query.totals = !query.totals"><span class="text-2xl leading-7">Σ</span>Totals</button>
          <button type="button" class="rb-big" @click="setView('sql')"><RibbonIcon name="query" size="lg" />SQL</button>
        </RibbonGroup>
        <RibbonGroup label="Save">
          <button type="button" class="rb-big" :disabled="readonly" @click="saveQuery"><RibbonIcon name="save" size="lg" />Save<br>Query</button>
        </RibbonGroup>
      </template>
    </OfficeRibbon>

    <div class="flex-1 min-h-0 flex">
      <!-- Navigation pane -->
      <aside class="w-40 sm:w-56 flex-shrink-0 overflow-y-auto border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-2">
        <p class="px-1 text-[11px] font-bold uppercase tracking-wider text-gray-500">Tables</p>
        <p v-if="!tables.length" class="px-1 py-1 text-xs text-gray-400">None yet</p>
        <div v-for="t in tables" :key="t" class="group flex items-center">
          <button type="button" class="flex-1 min-w-0 truncate text-left px-2 py-1 rounded" :class="open?.kind === 'table' && open.name === t ? 'bg-rose-100 text-[#a4373a] dark:bg-rose-900/30 dark:text-rose-200 font-semibold' : 'hover:bg-gray-200/70 dark:hover:bg-gray-800'" @click="openTable(t)">▦ {{ t }}</button>
          <button v-if="!readonly" type="button" class="opacity-0 group-hover:opacity-100 px-1 text-gray-400 hover:text-rose-600" :title="`Delete table ${t}`" @click="dropTable(t)">✕</button>
        </div>
        <p class="mt-3 px-1 text-[11px] font-bold uppercase tracking-wider text-gray-500">Queries</p>
        <p v-if="!queries.length" class="px-1 py-1 text-xs text-gray-400">None yet</p>
        <div v-for="qq in queries" :key="qq.name" class="group flex items-center">
          <button type="button" class="flex-1 min-w-0 truncate text-left px-2 py-1 rounded" :class="open?.kind === 'query' && open.name === qq.name ? 'bg-rose-100 text-[#a4373a] dark:bg-rose-900/30 dark:text-rose-200 font-semibold' : 'hover:bg-gray-200/70 dark:hover:bg-gray-800'" @click="openQuery(qq.name)">❓ {{ qq.name }}</button>
          <button v-if="!readonly" type="button" class="opacity-0 group-hover:opacity-100 px-1 text-gray-400 hover:text-rose-600" :title="`Delete query ${qq.name}`" @click="dropQuery(qq.name)">✕</button>
        </div>
      </aside>

      <main class="flex-1 min-w-0 overflow-auto p-3">
        <div :class="markable ? 'relative w-max min-w-full min-h-full' : 'contents'">
        <p v-if="error" class="mb-2 rounded border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-800 dark:border-rose-800 dark:bg-rose-900/20 dark:text-rose-200">{{ error }}</p>
        <p v-if="notice" class="mb-2 rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200">{{ notice }}</p>

        <div v-if="!open" class="h-full flex items-center justify-center text-center text-gray-500 dark:text-gray-400">
          <p>{{ tables.length ? 'Open a table or query from the left.' : readonly ? 'This database has no tables.' : 'Start with New table.' }}</p>
        </div>

        <!-- Table: Design view -->
        <template v-else-if="open.kind === 'table' && open.view === 'design'">
          <div class="mb-2 flex items-center gap-2">
            <label class="text-xs font-semibold text-gray-600 dark:text-gray-300">Table name</label>
            <input v-model="design.name" :disabled="readonly" class="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 w-56">
          </div>
          <table class="w-full max-w-3xl border border-gray-300 dark:border-gray-700 text-sm">
            <thead class="bg-gray-100 dark:bg-gray-800 text-left text-xs">
              <tr><th class="w-8 p-1.5">Key</th><th class="p-1.5">Field name</th><th class="p-1.5 w-40">Data type</th><th class="p-1.5 w-20">Required</th><th v-if="!readonly" class="w-8"></th></tr>
            </thead>
            <tbody>
              <tr v-for="(f, i) in design.fields" :key="i" class="border-t border-gray-200 dark:border-gray-700">
                <td class="p-1 text-center"><button type="button" :disabled="readonly" class="text-base" :class="f.pk ? 'opacity-100' : 'opacity-25 hover:opacity-60'" title="Primary key" @click="togglePk(i)">🔑</button></td>
                <td class="p-1"><input v-model="f.name" :disabled="readonly" class="w-full px-2 py-1 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800" placeholder="Field name"></td>
                <td class="p-1">
                  <select v-model="f.type" :disabled="readonly" class="w-full px-1 py-1 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
                    <option v-for="t in TYPES" :key="t" :value="t">{{ t }}</option>
                  </select>
                </td>
                <td class="p-1 text-center"><input v-model="f.required" type="checkbox" :disabled="readonly || f.type === 'AutoNumber'"></td>
                <td v-if="!readonly" class="p-1 text-center"><button type="button" class="text-gray-400 hover:text-rose-600" title="Delete field" @click="design.fields.splice(i, 1)">✕</button></td>
              </tr>
            </tbody>
          </table>
          <div v-if="!readonly" class="mt-2 flex gap-2">
            <button type="button" :class="btn()" class="border border-gray-300 dark:border-gray-600" @click="design.fields.push({ name: '', type: 'Short Text', pk: false, required: false, orig: null })">＋ Add field</button>
            <button type="button" class="px-3 py-1.5 rounded bg-[#a4373a] text-white font-semibold" @click="saveDesign">Save table</button>
          </div>
        </template>

        <!-- Query: Design view (the grid) -->
        <template v-else-if="open.kind === 'query' && open.view === 'design'">
          <div class="mb-2 flex flex-wrap items-center gap-2">
            <span class="text-xs font-semibold text-gray-600 dark:text-gray-300">Tables:</span>
            <label v-for="t in tables" :key="t" class="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-gray-300 dark:border-gray-600 text-xs cursor-pointer">
              <input type="checkbox" :checked="query.tables.includes(t)" :disabled="readonly" @change="toggleQueryTable(t)"> {{ t }}
            </label>
            <label class="ml-3 inline-flex items-center gap-1 text-xs cursor-pointer"><input v-model="query.totals" type="checkbox" :disabled="readonly"> Σ Totals</label>
          </div>
          <p v-if="query.tables.length > 1" class="mb-2 text-[11px] text-gray-500">Tables are joined on a field with the same name (like StudentID).</p>
          <datalist id="tusome-fields"><option v-for="f in fieldChoices" :key="f" :value="f" /></datalist>
          <div class="overflow-x-auto">
            <table class="border border-gray-300 dark:border-gray-700 text-xs">
              <tbody>
                <tr v-for="row in QBE_ROWS" :key="row.key" v-show="row.key !== 'total' || query.totals" class="border-t border-gray-200 dark:border-gray-700">
                  <th class="bg-gray-100 dark:bg-gray-800 px-2 py-1 text-left whitespace-nowrap w-20">{{ row.label }}</th>
                  <td v-for="(c, i) in query.columns" :key="i" class="p-0.5 border-l border-gray-200 dark:border-gray-700 min-w-[9rem]">
                    <input v-if="row.key === 'field'" v-model="c.field" list="tusome-fields" :disabled="readonly" class="w-full px-1.5 py-1 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800" placeholder="Table.Field">
                    <select v-else-if="row.key === 'total'" v-model="c.total" :disabled="readonly" class="w-full px-1 py-1 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
                      <option v-for="t in TOTALS" :key="t">{{ t }}</option>
                    </select>
                    <select v-else-if="row.key === 'sort'" v-model="c.sort" :disabled="readonly" class="w-full px-1 py-1 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
                      <option value="">(not sorted)</option><option>Ascending</option><option>Descending</option>
                    </select>
                    <div v-else-if="row.key === 'show'" class="text-center py-1"><input v-model="c.show" type="checkbox" :disabled="readonly"></div>
                    <input v-else v-model="(c as any)[row.key]" :disabled="readonly" class="w-full px-1.5 py-1 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="!readonly" class="mt-2 flex gap-2">
            <button type="button" :class="btn()" class="border border-gray-300 dark:border-gray-600" @click="query.columns.push(blankColumn())">＋ Column</button>
            <button type="button" :class="btn()" class="border border-gray-300 dark:border-gray-600" :disabled="query.columns.length < 2" @click="query.columns.pop()">− Column</button>
          </div>
          <p class="mt-3 text-[11px] text-gray-500">Criteria as in Access: <code>&gt;50</code> · <code>"Kampala"</code> · <code>Like "A*"</code> · <code>Between 10 And 20</code> · <code>Is Null</code> · <code>#01/02/2026#</code>. A calculated field: <code>Total: [Price]*[Quantity]</code>.</p>
        </template>

        <!-- Query: SQL view -->
        <template v-else-if="open.kind === 'query' && open.view === 'sql'">
          <textarea v-model="sqlText" :readonly="readonly" rows="10" spellcheck="false" class="w-full max-w-4xl font-mono text-xs p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"></textarea>
          <p class="mt-1 text-[11px] text-gray-500">Run shows the rows. Changing the design grid writes this again.</p>
        </template>

        <!-- Datasheet: a table's records, or a query's results -->
        <div v-if="open && open.view === 'data' && grid" class="overflow-auto">
          <table class="border border-gray-300 dark:border-gray-700 text-sm">
            <thead class="bg-gray-100 dark:bg-gray-800 sticky top-0">
              <tr>
                <th class="w-6"></th>
                <th v-for="(c, ci) in grid.columns" :key="c" class="px-2 py-1 text-left font-semibold border-l border-gray-200 dark:border-gray-700 whitespace-nowrap cursor-pointer" :class="{ 'bg-rose-100 dark:bg-rose-900/40': pickedCol === ci }" title="Pick the column, then sort it" @click="pickedCol = ci">{{ c }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ri in shownRows" :key="ri" class="border-t border-gray-200 dark:border-gray-700" :class="{ 'bg-rose-50 dark:bg-rose-900/20': pickedRow === ri }" @click="pickedRow = ri">
                <td class="text-center text-[10px] text-gray-400">
                  <button v-if="editable" type="button" class="hover:text-rose-600" title="Delete record" @click="deleteRecord(ri)">✕</button>
                </td>
                <td v-for="(c, ci) in grid.columns" :key="c" class="border-l border-gray-200 dark:border-gray-700 p-0" @click="pickedCol = ci">
                  <template v-if="editable && !isAuto(c)">
                    <input v-if="typeOf(c) === 'Yes/No'" type="checkbox" class="mx-2" :checked="!!Number(grid.rows[ri][ci])" @change="updateCell(ri, c, ($event.target as HTMLInputElement).checked ? 1 : 0)">
                    <input v-else :type="inputType(c)" :value="grid.rows[ri][ci] ?? ''" class="w-full min-w-[7rem] px-2 py-1 bg-transparent focus:bg-rose-50 dark:focus:bg-gray-800 outline-none" @change="updateCell(ri, c, ($event.target as HTMLInputElement).value)">
                  </template>
                  <span v-else class="block px-2 py-1 whitespace-nowrap" :class="typeOf(c) === 'Number' || typeOf(c) === 'Currency' || typeof grid.rows[ri][ci] === 'number' ? 'text-right tabular-nums' : ''">{{ show(c, grid.rows[ri][ci]) }}</span>
                </td>
              </tr>
              <!-- the new record -->
              <tr v-if="editable" class="border-t border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50">
                <td class="text-center text-xs text-gray-400">*</td>
                <td v-for="c in grid.columns" :key="c" class="border-l border-gray-200 dark:border-gray-700 p-0">
                  <span v-if="isAuto(c)" class="block px-2 py-1 text-gray-400 text-xs">(New)</span>
                  <input v-else-if="typeOf(c) === 'Yes/No'" v-model="draft[c]" type="checkbox" class="mx-2">
                  <input v-else v-model="draft[c]" :type="inputType(c)" class="new-record w-full min-w-[7rem] px-2 py-1 bg-transparent outline-none" @keydown.enter="addRecord">
                </td>
              </tr>
            </tbody>
          </table>
          <div class="mt-2 flex items-center gap-3 text-xs text-gray-500">
            <span>Record: {{ pickedRow === null ? '-' : shownRows.indexOf(pickedRow) + 1 }} of {{ shownRows.length }}<template v-if="shownRows.length !== grid.rows.length"> (filtered from {{ grid.rows.length }})</template></span>
            <button v-if="editable" type="button" class="px-3 py-1 rounded bg-[#a4373a] text-white font-semibold" @click="addRecord">Add record</button>
          </div>
        </div>
        <!-- a teacher's pen marks, scrolling with what is open under them -->
        <div v-if="markable" class="absolute inset-0 overflow-hidden pointer-events-none">
          <div ref="markHost" class="absolute left-0 top-0" :style="{ width: `${MARK_W}px`, height: `${MARK_H}px` }"></div>
        </div>
        </div>
      </main>
    </div>
    <footer class="flex-shrink-0 flex items-center gap-4 px-3 py-1 text-[11px] text-white bg-[#a4373a]">
      <span>{{ open ? `${open.kind === 'table' ? 'Table' : 'Query'}: ${open.name} · ${VIEW_NAMES[open.view]}` : 'Ready' }}</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import initSqlJs, { type Database } from 'sql.js'
import wasmUrl from 'sql.js/dist/sql-wasm.wasm?url'
import * as XLSX from 'xlsx'
import { blankColumn, designToSql, q, type QueryDesign } from './accessQuery'
import OfficeRibbon from './ribbon/OfficeRibbon.vue'
import RibbonGroup from './ribbon/RibbonGroup.vue'
import RibbonIcon from './ribbon/RibbonIcon.vue'

const props = defineProps<{ initial: ArrayBuffer | null; readonly: boolean; showTools?: boolean; markable?: boolean }>()
const emit = defineEmits<{ change: []; ready: []; download: [] }>()

const TYPES = ['AutoNumber', 'Short Text', 'Long Text', 'Number', 'Currency', 'Date/Time', 'Yes/No'] as const
type FieldType = (typeof TYPES)[number]
const SQL_TYPE: Record<FieldType, string> = { AutoNumber: 'INTEGER', 'Short Text': 'TEXT', 'Long Text': 'TEXT', Number: 'REAL', Currency: 'REAL', 'Date/Time': 'TEXT', 'Yes/No': 'INTEGER' }
const TOTALS = ['Group By', 'Sum', 'Avg', 'Count', 'Min', 'Max', 'Where']
const QBE_ROWS = [
  { key: 'field', label: 'Field' }, { key: 'total', label: 'Total' }, { key: 'sort', label: 'Sort' },
  { key: 'show', label: 'Show' }, { key: 'criteria', label: 'Criteria' }, { key: 'or', label: 'or' }
]
const VIEW_NAMES = { data: 'Datasheet view', design: 'Design view', sql: 'SQL view' }
const btn = (on = false) => ['h-8 px-2 rounded inline-flex items-center gap-1 disabled:opacity-40', on ? 'bg-rose-100 text-[#a4373a] dark:bg-rose-900/40 dark:text-rose-200' : 'hover:bg-gray-100 dark:hover:bg-gray-800']

const tab = ref('Home')

let db: Database
const tables = ref<string[]>([])
const queries = ref<{ name: string; design: QueryDesign | null; sql: string }[]>([])
const fieldTypes = ref<Record<string, Record<string, FieldType>>>({})
const error = ref('')
const notice = ref('')
const say = (msg: string, bad = false) => { error.value = bad ? msg : ''; notice.value = bad ? '' : msg }

const changed = () => emit('change')
const run = (sql: string, params: unknown[] = []) => db.run(sql, params as any)
// one statement's rows, with its column names even when there are no rows
const all = (sql: string, params: unknown[] = []) => {
  const stmt = db.prepare(sql)
  try {
    stmt.bind(params as any)
    const columns = stmt.getColumnNames()
    const rows: unknown[][] = []
    while (stmt.step()) rows.push(stmt.get())
    return { columns, rows }
  } finally {
    stmt.free()
  }
}

const ensureMeta = () => {
  run('CREATE TABLE IF NOT EXISTS __tusome_fields (tbl TEXT NOT NULL, name TEXT NOT NULL, type TEXT NOT NULL, pos INTEGER, PRIMARY KEY (tbl, name))')
  run('CREATE TABLE IF NOT EXISTS __tusome_queries (name TEXT PRIMARY KEY, design TEXT, sql TEXT)')
}
const columnsOf = (t: string) => all(`PRAGMA table_info(${q(t)})`).rows.map(r => ({ name: String(r[1]), type: String(r[2]), notnull: !!r[3], pk: !!r[5] }))
const refresh = () => {
  tables.value = all("SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '__tusome_%' ORDER BY name").rows.map(r => String(r[0]))
  const types: Record<string, Record<string, FieldType>> = {}
  for (const t of tables.value) {
    types[t] = {}
    const meta = Object.fromEntries(all('SELECT name, type FROM __tusome_fields WHERE tbl = ?', [t]).rows.map(r => [String(r[0]), String(r[1]) as FieldType]))
    for (const c of columnsOf(t)) {
      const sqlType = c.type.toUpperCase()
      types[t][c.name] = meta[c.name] || (c.pk && sqlType === 'INTEGER' ? 'AutoNumber' : /INT|REAL|NUM|DEC|FLOA|DOUB/.test(sqlType) ? 'Number' : 'Short Text')
    }
  }
  fieldTypes.value = types
  queries.value = all('SELECT name, design, sql FROM __tusome_queries ORDER BY name').rows.map(r => {
    let design: QueryDesign | null = null
    try { design = r[1] ? JSON.parse(String(r[1])) : null } catch { design = null }
    return { name: String(r[0]), design, sql: String(r[2] || '') }
  })
}

// ---- what is open ----
type Open = { kind: 'table' | 'query'; name: string; view: 'data' | 'design' | 'sql'; isNew?: boolean }
const open = ref<Open | null>(null)
const grid = ref<{ columns: string[]; rows: unknown[][]; rowids: number[] | null; table: string | null } | null>(null)
const editable = computed(() => !props.readonly && !!grid.value?.table && open.value?.kind === 'table')
const typeOf = (c: string): FieldType | null => (grid.value?.table ? fieldTypes.value[grid.value.table]?.[c] || null : null)
const isAuto = (c: string) => typeOf(c) === 'AutoNumber'
const inputType = (c: string) => ({ Number: 'number', Currency: 'number', 'Date/Time': 'date' } as Record<string, string>)[typeOf(c) || ''] || 'text'
const show = (c: string, v: unknown) => {
  const t = typeOf(c)
  if (v === null || v === undefined) return ''
  if (t === 'Yes/No') return Number(v) ? 'Yes' : 'No'
  if (t === 'Currency') return Number(v).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return String(v)
}
const draft = reactive<Record<string, any>>({})
const tabs = computed(() => ['File', 'Home', 'Create', 'External Data', ...(open.value?.kind === 'query' ? ['Query Design'] : [])])
const pickedRow = ref<number | null>(null)
const pickedCol = ref<number | null>(null)
const gridFilter = ref('')
const shownRows = computed(() => {
  const g = grid.value
  if (!g) return [] as number[]
  const f = gridFilter.value.trim().toLowerCase()
  return g.rows.map((_, i) => i).filter(i => !f || g.rows[i].some(v => String(v ?? '').toLowerCase().includes(f)))
})
const sortGrid = (dir: 1 | -1) => {
  const g = grid.value
  const c = pickedCol.value
  if (!g || c === null) return
  const order = g.rows.map((r, i) => ({ r, id: g.rowids?.[i] })).sort((a, b) => {
    const x = a.r[c], y = b.r[c]
    if (x === y) return 0
    if (x === null || x === undefined) return 1
    if (y === null || y === undefined) return -1
    return (typeof x === 'number' && typeof y === 'number' ? x - y : String(x).localeCompare(String(y), undefined, { numeric: true })) * dir
  })
  g.rows = order.map(o => o.r)
  if (g.rowids) g.rowids = order.map(o => o.id as number)
  pickedRow.value = null
}
const focusNewRecord = () => (document.querySelector('.new-record') as HTMLInputElement | null)?.focus()
const onCsv = async (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return
  importCsv(file.name.replace(/\.\w+$/, ''), await file.text())
  changed()
}

const loadGrid = (t: string) => {
  const res = all(`SELECT rowid AS __rowid, * FROM ${q(t)} LIMIT 2000`)
  grid.value = { columns: res.columns.slice(1), rows: res.rows.map(r => r.slice(1)), rowids: res.rows.map(r => Number(r[0])), table: t }
  pickedRow.value = null
  for (const k of Object.keys(draft)) delete draft[k]
}
const openTable = (t: string) => {
  say('')
  open.value = { kind: 'table', name: t, view: 'data' }
  loadGrid(t)
}
const setView = (v: Open['view']) => {
  if (!open.value) return
  say('')
  if (open.value.kind === 'table') {
    if (v === 'design') loadDesign(open.value.name)
    else if (!open.value.isNew) loadGrid(open.value.name)
    else return say('Save the table first.', true)
  }
  if (open.value.kind === 'query' && v === 'sql' && open.value.view === 'design') {
    try { sqlText.value = designToSql(query, t => Object.keys(fieldTypes.value[t] || {})) } catch (e: any) { say(e.message, true) }
  }
  open.value.view = v
}

// ---- tables: design ----
interface DesignField { name: string; type: FieldType; pk: boolean; required: boolean; orig: string | null }
const design = reactive<{ name: string; fields: DesignField[] }>({ name: '', fields: [] })
const loadDesign = (t: string) => {
  design.name = t
  design.fields = columnsOf(t).map(c => ({ name: c.name, type: fieldTypes.value[t]?.[c.name] || 'Short Text', pk: c.pk, required: c.notnull, orig: c.name }))
}
const newTable = () => {
  let n = 1
  while (tables.value.includes(`Table${n}`)) n++
  design.name = `Table${n}`
  design.fields = [{ name: 'ID', type: 'AutoNumber', pk: true, required: true, orig: null }, { name: '', type: 'Short Text', pk: false, required: false, orig: null }]
  open.value = { kind: 'table', name: design.name, view: 'design', isNew: true }
  grid.value = null
  say('')
}
const togglePk = (i: number) => design.fields.forEach((f, j) => { f.pk = j === i ? !f.pk : f.pk && design.fields[i].type !== 'AutoNumber' && f.type !== 'AutoNumber' })
const saveDesign = () => {
  const name = design.name.trim()
  const fields = design.fields.filter(f => f.name.trim())
  if (!name) return say('Give the table a name.', true)
  if (!fields.length) return say('Add at least one field.', true)
  const names = fields.map(f => f.name.trim().toLowerCase())
  if (new Set(names).size !== names.length) return say('Two fields have the same name.', true)
  if (fields.filter(f => f.type === 'AutoNumber').length > 1) return say('A table can have only one AutoNumber field.', true)
  const isNew = !!open.value?.isNew
  const old = open.value?.name || name
  if ((isNew || name.toLowerCase() !== old.toLowerCase()) && tables.value.some(t => t.toLowerCase() === name.toLowerCase())) return say(`There is already a table called ${name}.`, true)
  const pks = fields.filter(f => f.pk && f.type !== 'AutoNumber')
  const cols = fields.map(f => {
    const n = q(f.name.trim())
    if (f.type === 'AutoNumber') return `${n} INTEGER PRIMARY KEY AUTOINCREMENT`
    return `${n} ${SQL_TYPE[f.type]}${f.required ? ' NOT NULL' : ''}`
  })
  if (pks.length && !fields.some(f => f.type === 'AutoNumber')) cols.push(`PRIMARY KEY (${pks.map(f => q(f.name.trim())).join(', ')})`)
  try {
    run('BEGIN')
    if (isNew) {
      run(`CREATE TABLE ${q(name)} (${cols.join(', ')})`)
    } else {
      // SQLite can't change a column's type in place: the table is made again and its records copied
      const tmp = `__tusome_new_${Date.now()}`
      run(`CREATE TABLE ${q(tmp)} (${cols.join(', ')})`)
      const keep = fields.filter(f => f.orig && columnsOf(old).some(c => c.name === f.orig))
      if (keep.length) run(`INSERT INTO ${q(tmp)} (${keep.map(f => q(f.name.trim())).join(', ')}) SELECT ${keep.map(f => q(f.orig!)).join(', ')} FROM ${q(old)}`)
      run(`DROP TABLE ${q(old)}`)
      run(`ALTER TABLE ${q(tmp)} RENAME TO ${q(name)}`)
      run('DELETE FROM __tusome_fields WHERE tbl = ?', [old])
    }
    fields.forEach((f, i) => run('INSERT OR REPLACE INTO __tusome_fields (tbl, name, type, pos) VALUES (?, ?, ?, ?)', [name, f.name.trim(), f.type, i]))
    run('COMMIT')
  } catch (e: any) {
    try { run('ROLLBACK') } catch { /* nothing open */ }
    return say(`The table could not be saved: ${e.message}`, true)
  }
  refresh()
  open.value = { kind: 'table', name, view: 'data' }
  loadGrid(name)
  say(`Table ${name} saved.`)
  changed()
}
const dropTable = (t: string) => {
  if (!window.confirm(`Delete the table ${t} and all its records?`)) return
  run(`DROP TABLE ${q(t)}`)
  run('DELETE FROM __tusome_fields WHERE tbl = ?', [t])
  if (open.value?.name === t) { open.value = null; grid.value = null }
  refresh()
  changed()
}

// ---- tables: records ----
const cast = (c: string, v: unknown) => {
  const t = typeOf(c)
  if (v === '' || v === undefined) return null
  if (t === 'Number' || t === 'Currency') return Number(v)
  if (t === 'Yes/No') return v ? 1 : 0
  return v
}
const updateCell = (ri: number, c: string, v: unknown) => {
  const g = grid.value
  if (!g?.table || !g.rowids) return
  try {
    run(`UPDATE ${q(g.table)} SET ${q(c)} = ? WHERE rowid = ?`, [cast(c, v), g.rowids[ri]])
    g.rows[ri][g.columns.indexOf(c)] = cast(c, v)
    say('')
    changed()
  } catch (e: any) {
    say(`That value can't be saved: ${e.message}`, true)
    loadGrid(g.table)
  }
}
const addRecord = () => {
  const g = grid.value
  if (!g?.table) return
  const cols = g.columns.filter(c => !isAuto(c) && draft[c] !== undefined && draft[c] !== '')
  if (!cols.length) return say('Type something in the new record first.', true)
  try {
    run(`INSERT INTO ${q(g.table)} (${cols.map(q).join(', ')}) VALUES (${cols.map(() => '?').join(', ')})`, cols.map(c => cast(c, draft[c])))
    loadGrid(g.table)
    say('')
    changed()
  } catch (e: any) {
    say(`The record can't be added: ${e.message}`, true)
  }
}
const deleteRecord = (ri: number) => {
  const g = grid.value
  if (!g?.table || !g.rowids || !window.confirm('Delete this record?')) return
  run(`DELETE FROM ${q(g.table)} WHERE rowid = ?`, [g.rowids[ri]])
  loadGrid(g.table)
  changed()
}

// ---- queries ----
const query = reactive<QueryDesign>({ tables: [], columns: [], totals: false })
const sqlText = ref('')
const fieldChoices = computed(() => query.tables.flatMap(t => [`${t}.*`, ...Object.keys(fieldTypes.value[t] || {}).map(f => `${t}.${f}`)]))
const toggleQueryTable = (t: string) => {
  const i = query.tables.indexOf(t)
  if (i >= 0) query.tables.splice(i, 1)
  else query.tables.push(t)
}
const newQuery = () => {
  query.tables = tables.value.slice(0, 1)
  query.columns = [blankColumn(), blankColumn(), blankColumn(), blankColumn()]
  query.totals = false
  sqlText.value = ''
  open.value = { kind: 'query', name: 'Query' + (queries.value.length + 1), view: 'design', isNew: true }
  tab.value = 'Query Design'
  grid.value = null
  say('')
}
const openQuery = (name: string) => {
  const sq = queries.value.find(x => x.name === name)
  if (!sq) return
  if (sq.design) Object.assign(query, JSON.parse(JSON.stringify(sq.design)))
  else Object.assign(query, { tables: [], columns: [blankColumn()], totals: false })
  sqlText.value = sq.sql
  open.value = { kind: 'query', name, view: sq.design ? 'design' : 'sql' }
  runQuery()
}
const currentSql = () => (open.value?.view === 'sql' || !query.tables.length ? sqlText.value : designToSql(query, t => Object.keys(fieldTypes.value[t] || {})))
const runQuery = () => {
  if (!open.value) return
  try {
    const sql = currentSql()
    if (!sql.trim()) return say('Write the query first.', true)
    if (/__tusome_|sqlite_master/i.test(sql)) return say('That table is not part of the database.', true)
    sqlText.value = sql
    const isSelect = /^\s*(select|with)\b/i.test(sql)
    if (!isSelect && props.readonly) return say('This database is view only.', true)
    if (!isSelect) {
      // an action query (UPDATE, DELETE, INSERT ...), then what it left
      db.exec(sql)
      refresh()
      changed()
      say(`Done: ${db.getRowsModified()} record(s) changed.`)
      grid.value = null
      return
    }
    const res = all(sql.replace(/;\s*$/, ''))
    say('')
    grid.value = { columns: res.columns, rows: res.rows, rowids: null, table: null }
    open.value.view = 'data'
  } catch (e: any) {
    say(`The query did not run: ${e.message}`, true)
  }
}
const saveQuery = () => {
  if (!open.value) return
  const name = (window.prompt('Query name', open.value.name) || '').trim()
  if (!name) return
  try {
    const sql = currentSql()
    const viaGrid = open.value.view !== 'sql' && query.tables.length > 0
    run('INSERT OR REPLACE INTO __tusome_queries (name, design, sql) VALUES (?, ?, ?)', [name, viaGrid ? JSON.stringify(query) : null, sql])
    if (open.value.name !== name && !open.value.isNew) run('DELETE FROM __tusome_queries WHERE name = ?', [open.value.name])
    open.value = { ...open.value, name, isNew: false }
    refresh()
    say(`Query ${name} saved.`)
    changed()
  } catch (e: any) {
    say(e.message, true)
  }
}
const dropQuery = (name: string) => {
  if (!window.confirm(`Delete the query ${name}?`)) return
  run('DELETE FROM __tusome_queries WHERE name = ?', [name])
  if (open.value?.kind === 'query' && open.value.name === name) { open.value = null; grid.value = null }
  refresh()
  changed()
}

// ---- out to Excel ----
const exportGrid = () => {
  const g = grid.value
  if (!g) return
  const ws = XLSX.utils.aoa_to_sheet([g.columns, ...g.rows.map(r => r.map(v => (v === null ? '' : v)))])
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, (open.value?.name || 'Data').slice(0, 31))
  XLSX.writeFile(wb, `${open.value?.name || 'Data'}.xlsx`)
}

// ---- a CSV the teacher opens becomes a table ----
const importCsv = (name: string, text: string) => {
  const wb = XLSX.read(text, { type: 'string' })
  const rows = XLSX.utils.sheet_to_json<unknown[]>(wb.Sheets[wb.SheetNames[0]], { header: 1, defval: null })
  const head = (rows[0] || []).map((h, i) => String(h ?? '').trim() || `Field${i + 1}`)
  const body = rows.slice(1).filter(r => r.some(v => v !== null && v !== ''))
  const numeric = head.map((_, i) => body.length > 0 && body.every(r => r[i] === null || r[i] === '' || !isNaN(Number(r[i]))))
  let t = name.replace(/[^\w ]+/g, '').trim() || 'Imported'
  while (tables.value.includes(t)) t += '1'
  run(`CREATE TABLE ${q(t)} (${head.map((h, i) => `${q(h)} ${numeric[i] ? 'REAL' : 'TEXT'}`).join(', ')})`)
  head.forEach((h, i) => run('INSERT OR REPLACE INTO __tusome_fields (tbl, name, type, pos) VALUES (?, ?, ?, ?)', [t, h, numeric[i] ? 'Number' : 'Short Text', i]))
  for (const r of body) run(`INSERT INTO ${q(t)} VALUES (${head.map(() => '?').join(', ')})`, head.map((_, i) => (r[i] === '' ? null : numeric[i] && r[i] !== null ? Number(r[i]) : r[i])))
  refresh()
  openTable(t)
}

let SQL: Awaited<ReturnType<typeof initSqlJs>>
onMounted(async () => {
  SQL = await initSqlJs({ locateFile: () => wasmUrl })
  db = props.initial && props.initial.byteLength ? new SQL.Database(new Uint8Array(props.initial)) : new SQL.Database()
  ensureMeta()
  refresh()
  if (tables.value.length) openTable(tables.value[0])
  emit('ready')
})

// marking on what is open: each table or query, in each view, has its own layer
const MARK_W = 1800
const MARK_H = 1600
const markHost = ref<HTMLElement | null>(null)
const markSurface = computed(() => {
  if (!props.markable || !markHost.value || !open.value) return null
  const o = open.value
  const at = o.kind === 'table' ? tables.value.indexOf(o.name) : 500 + queries.value.findIndex(x => x.name === o.name)
  return { page: at * 10 + (['data', 'design', 'sql'].indexOf(o.view)), host: markHost.value, width: MARK_W, height: MARK_H }
})

defineExpose({
  markSurface,
  save: async () => new Blob([db.export() as BlobPart], { type: 'application/x-sqlite3' }),
  importFile: async (file: File) => {
    if (/\.csv$/i.test(file.name)) return importCsv(file.name.replace(/\.\w+$/, ''), await file.text())
    db = new SQL.Database(new Uint8Array(await file.arrayBuffer()))
    ensureMeta()
    refresh()
    open.value = null
    grid.value = null
    if (tables.value.length) openTable(tables.value[0])
  },
  exportFile: async () => new Blob([db.export() as BlobPart], { type: 'application/x-sqlite3' })
})
</script>
