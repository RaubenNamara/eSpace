<template>
  <!-- Spreadsheet: Excel's ribbon (File, Home, Insert, Page Layout, Formulas, Data, Review, View)
       over Univer's grid, formula bar and sheet tabs. The ribbon drives Univer through its API. The
       work is the workbook's snapshot; an .xlsx is made when it is downloaded, and a teacher's .xlsx
       opens into it (excelConvert.ts). Tools that need desktop Excel are greyed out. -->
  <div class="absolute inset-0 flex flex-col bg-white">
    <OfficeRibbon v-if="!readonly" v-model:active="tab" :tabs="TABS" color="bg-[#107c41]">
      <!-- File -->
      <template v-if="tab === 'File'">
        <RibbonGroup label="Save">
          <button type="button" class="rb-big" @click="$emit('download')"><RibbonIcon name="download" size="lg" class="text-[#107c41]" />Download<br>as .xlsx</button>
          <button type="button" class="rb-big" @click="printSheet"><RibbonIcon name="print" size="lg" class="text-[#107c41]" />Print</button>
        </RibbonGroup>
        <RibbonGroup label="Info">
          <div class="px-2 py-1 text-xs text-gray-600 dark:text-gray-300 leading-relaxed">Your workbook saves by itself as you work.</div>
        </RibbonGroup>
      </template>

      <!-- Home -->
      <template v-else-if="tab === 'Home'">
        <RibbonGroup label="Clipboard">
          <button type="button" class="rb-big" @click="cmd('univer.command.paste')"><RibbonIcon name="paste" size="lg" class="text-[#107c41]" />Paste</button>
          <div class="flex flex-col">
            <button type="button" class="rb-sm" @click="cmd('univer.command.cut')"><RibbonIcon name="cut" />Cut</button>
            <button type="button" class="rb-sm" @click="cmd('univer.command.copy')"><RibbonIcon name="copy" />Copy</button>
            <button type="button" class="rb-sm" @click="cmd('sheet.command.set-once-format-painter')"><RibbonIcon name="painter" />Format Painter</button>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Font">
          <div class="flex flex-col gap-1">
            <div class="flex items-center gap-0.5">
              <select class="rb-select w-32" title="Font" :value="sel.font" @change="on(r => r.setFontFamily(($event.target as HTMLSelectElement).value))">
                <option v-for="f in FONTS" :key="f" :value="f" :style="{ fontFamily: f }">{{ f }}</option>
              </select>
              <select class="rb-select w-14" title="Font size" :value="sel.size" @change="on(r => r.setFontSize(Number(($event.target as HTMLSelectElement).value)))">
                <option v-for="s in SIZES" :key="s" :value="s">{{ s }}</option>
              </select>
              <button type="button" class="rb-ic" title="Increase font size" @click="stepSize(1)"><RibbonIcon name="grow" /></button>
              <button type="button" class="rb-ic" title="Decrease font size" @click="stepSize(-1)"><RibbonIcon name="shrink" /></button>
            </div>
            <div class="flex items-center gap-0.5">
              <button type="button" class="rb-ic font-bold" :class="{ 'rb-on': sel.bold }" title="Bold (Ctrl+B)" @click="on(r => r.setFontWeight(sel.bold ? 'normal' : 'bold'))">B</button>
              <button type="button" class="rb-ic italic font-serif" :class="{ 'rb-on': sel.italic }" title="Italic (Ctrl+I)" @click="on(r => r.setFontStyle(sel.italic ? 'normal' : 'italic'))">I</button>
              <button type="button" class="rb-ic underline" :class="{ 'rb-on': sel.underline }" title="Underline (Ctrl+U)" @click="on(r => r.setFontLine(sel.underline ? 'none' : 'underline'))">U</button>
              <button type="button" class="rb-ic line-through text-xs" :class="{ 'rb-on': sel.strike }" title="Strikethrough" @click="on(r => r.setFontLine(sel.strike ? 'none' : 'line-through'))">abc</button>
              <div class="relative">
                <button type="button" class="rb-ic" title="Borders" @click="toggleMenu('borders')"><RibbonIcon name="table" /> ▾</button>
                <div v-if="menu === 'borders'" :class="menuCls" class="w-44">
                  <button v-for="b in BORDERS" :key="b.label" type="button" :class="menuItem" @click="setBorder(b.type, b.style)">{{ b.label }}</button>
                </div>
              </div>
              <label class="rb-ic relative cursor-pointer" title="Fill colour">
                <span class="px-0.5 border-b-[3px]" :style="{ borderColor: fill }"><RibbonIcon name="fill" /></span>
                <input type="color" class="absolute inset-0 opacity-0 cursor-pointer" :value="fill" @input="fill = ($event.target as HTMLInputElement).value; on(r => r.setBackgroundColor(fill))">
              </label>
              <label class="rb-ic relative cursor-pointer" title="Font colour">
                <span class="font-bold border-b-[3px] leading-none" :style="{ borderColor: fontColor }">A</span>
                <input type="color" class="absolute inset-0 opacity-0 cursor-pointer" :value="fontColor" @input="fontColor = ($event.target as HTMLInputElement).value; on(r => r.setFontColor(fontColor))">
              </label>
            </div>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Alignment">
          <div class="flex flex-col gap-1">
            <div class="flex items-center gap-0.5">
              <button type="button" class="rb-ic" title="Top Align" @click="on(r => r.setVerticalAlignment('top'))"><span class="block w-3.5 border-t-2 border-current h-3"></span></button>
              <button type="button" class="rb-ic" title="Middle Align" @click="on(r => r.setVerticalAlignment('middle'))"><span class="block w-3.5 h-0.5 bg-current"></span></button>
              <button type="button" class="rb-ic" title="Bottom Align" @click="on(r => r.setVerticalAlignment('bottom'))"><span class="block w-3.5 border-b-2 border-current h-3"></span></button>
              <select class="rb-select w-[72px]" title="Orientation" value="" @change="rotate($event.target as HTMLSelectElement)">
                <option value="" disabled>ab ↗</option><option value="45">Angle up</option><option value="-45">Angle down</option><option value="90">Rotate up</option><option value="-90">Rotate down</option><option value="0">None</option>
              </select>
              <button type="button" class="rb-sm" title="Wrap Text" @click="on(r => r.setWrap(true))">⤶ Wrap Text</button>
            </div>
            <div class="flex items-center gap-0.5">
              <button type="button" class="rb-ic" title="Align Left" @click="on(r => r.setHorizontalAlignment('left'))"><RibbonIcon name="alignLeft" /></button>
              <button type="button" class="rb-ic" title="Center" @click="on(r => r.setHorizontalAlignment('center'))"><RibbonIcon name="alignCenter" /></button>
              <button type="button" class="rb-ic" title="Align Right" @click="on(r => r.setHorizontalAlignment('right'))"><RibbonIcon name="alignRight" /></button>
              <div class="relative">
                <button type="button" class="rb-sm" @click="toggleMenu('merge')"><RibbonIcon name="layout" />Merge &amp; Center ▾</button>
                <div v-if="menu === 'merge'" :class="menuCls" class="w-40">
                  <button type="button" :class="menuItem" @click="on(r => r.merge().setHorizontalAlignment('center'))">Merge &amp; Center</button>
                  <button type="button" :class="menuItem" @click="on(r => r.mergeAcross())">Merge Across</button>
                  <button type="button" :class="menuItem" @click="on(r => r.merge())">Merge Cells</button>
                  <button type="button" :class="menuItem" @click="on(r => r.breakApart())">Unmerge Cells</button>
                </div>
              </div>
            </div>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Number">
          <div class="flex flex-col gap-1">
            <select class="rb-select w-32" title="Number Format" value="" @change="numFmt($event.target as HTMLSelectElement)">
              <option value="" disabled>General ▾</option>
              <option v-for="n in NUMBER_FORMATS" :key="n.label" :value="n.pattern">{{ n.label }}</option>
            </select>
            <div class="flex items-center gap-0.5">
              <button type="button" class="rb-sm text-[10px] font-semibold" title="Accounting (UGX)" @click="on(r => r.setNumberFormat(UGX))">UGX</button>
              <button type="button" class="rb-ic" title="Percent Style" @click="on(r => r.setNumberFormat('0%'))">%</button>
              <button type="button" class="rb-ic font-bold" title="Comma Style" @click="on(r => r.setNumberFormat('#,##0.00'))">,</button>
              <button type="button" class="rb-sm text-[10px] tracking-tighter" title="Increase Decimal" @click="cmd('sheet.command.numfmt.add.decimal.command')">.0<sub>→</sub>.00</button>
              <button type="button" class="rb-sm text-[10px] tracking-tighter" title="Decrease Decimal" @click="cmd('sheet.command.numfmt.subtract.decimal.command')">.00<sub>→</sub>.0</button>
            </div>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Styles">
          <div class="relative">
            <button type="button" class="rb-big" @click="toggleMenu('cf')"><RibbonIcon name="chart" size="lg" class="text-[#107c41]" />Conditional<br>Formatting ▾</button>
            <div v-if="menu === 'cf'" :class="menuCls" class="w-52">
              <button v-for="c in CF_RULES" :key="c.key" type="button" :class="menuItem" @click="conditional(c.key)">{{ c.label }}</button>
            </div>
          </div>
          <button type="button" class="rb-big" @click="formatAsTable"><RibbonIcon name="table" size="lg" class="text-[#107c41]" />Format as<br>Table</button>
          <div class="grid grid-cols-4 gap-0.5 self-center">
            <button v-for="c in CELL_STYLES" :key="c.label" type="button" class="w-[70px] h-[22px] px-1 text-[11px] text-left truncate border" :style="c.css" @click="cellStyle(c)">{{ c.label }}</button>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Cells">
          <div v-for="g in CELL_MENUS" :key="g.key" class="relative">
            <button type="button" class="rb-big" @click="toggleMenu(g.key)"><RibbonIcon :name="g.icon" size="lg" class="text-[#107c41]" />{{ g.label }} ▾</button>
            <div v-if="menu === g.key" :class="menuCls" class="w-48">
              <button v-for="it in g.items" :key="it.label" type="button" :class="menuItem" @click="cellAction(it.act)">{{ it.label }}</button>
            </div>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Editing">
          <div class="flex flex-col">
            <div class="relative">
              <button type="button" class="rb-sm" @click="toggleMenu('autosum')">Σ AutoSum ▾</button>
              <div v-if="menu === 'autosum'" :class="menuCls" class="w-40">
                <button v-for="f in AUTOSUM" :key="f.fn" type="button" :class="menuItem" @click="insertFunction(f.fn)">{{ f.label }}</button>
              </div>
            </div>
            <div class="relative">
              <button type="button" class="rb-sm" @click="toggleMenu('clear')"><RibbonIcon name="eraser" />Clear ▾</button>
              <div v-if="menu === 'clear'" :class="menuCls" class="w-36">
                <button type="button" :class="menuItem" @click="on(r => r.clear())">Clear All</button>
                <button type="button" :class="menuItem" @click="on(r => r.clearFormat())">Clear Formats</button>
                <button type="button" :class="menuItem" @click="on(r => r.clearContent())">Clear Contents</button>
                <button type="button" :class="menuItem" @click="on(r => r.deleteNote?.())">Clear Comments</button>
              </div>
            </div>
          </div>
          <div class="relative">
            <button type="button" class="rb-big" @click="toggleMenu('sortfilter')"><RibbonIcon name="sortAsc" size="lg" class="text-[#107c41]" />Sort &amp;<br>Filter ▾</button>
            <div v-if="menu === 'sortfilter'" :class="menuCls" class="w-40">
              <button type="button" :class="menuItem" @click="sort(true)">Sort A to Z</button>
              <button type="button" :class="menuItem" @click="sort(false)">Sort Z to A</button>
              <button type="button" :class="menuItem" @click="toggleFilter">Filter</button>
            </div>
          </div>
          <div class="relative">
            <button type="button" class="rb-big" @click="toggleMenu('find')"><RibbonIcon name="find" size="lg" class="text-[#107c41]" />Find &amp;<br>Select ▾</button>
            <div v-if="menu === 'find'" :class="menuCls" class="w-36 right-0 left-auto">
              <button type="button" :class="menuItem" @click="cmd('ui.operation.open-find-dialog')">Find…</button>
              <button type="button" :class="menuItem" @click="cmd('ui.operation.open-replace-dialog')">Replace…</button>
            </div>
          </div>
        </RibbonGroup>
      </template>

      <!-- Insert -->
      <template v-else-if="tab === 'Insert'">
        <RibbonGroup label="Tables">
          <button type="button" class="rb-big" disabled><RibbonIcon name="datasheet" size="lg" />PivotTable</button>
          <button type="button" class="rb-big" @click="formatAsTable"><RibbonIcon name="table" size="lg" class="text-[#107c41]" />Table</button>
        </RibbonGroup>
        <RibbonGroup label="Illustrations">
          <label class="rb-big cursor-pointer"><RibbonIcon name="picture" size="lg" class="text-[#107c41]" />Pictures<input type="file" accept="image/*" class="hidden" @change="insertPicture"></label>
          <div class="relative">
            <button type="button" class="rb-big" @click="toggleMenu('shapes')"><RibbonIcon name="shapes" size="lg" class="text-[#107c41]" />Shapes ▾</button>
            <div v-if="menu === 'shapes'" :class="menuCls" class="p-2 w-48 grid grid-cols-6 gap-1">
              <button v-for="s in SHAPES" :key="s.key" type="button" class="w-6 h-6 rounded hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center" :title="s.label" @click="insertShape(s)">
                <svg viewBox="0 0 20 20" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.4"><path :d="s.icon" /></svg>
              </button>
            </div>
          </div>
          <div class="flex flex-col">
            <button type="button" class="rb-sm" disabled><RibbonIcon name="smartart" />SmartArt</button>
            <button type="button" class="rb-sm" disabled><RibbonIcon name="screenshot" />Screenshot</button>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Charts">
          <button type="button" class="rb-big" title="A column chart of the selected cells" @click="insertChart('bar')"><RibbonIcon name="chart" size="lg" class="text-[#107c41]" />Recommended<br>Charts</button>
          <div class="grid grid-cols-3 gap-0.5 self-center">
            <button v-for="c in CHARTS" :key="c.type" type="button" class="rb-sm" :title="`${c.label} chart of the selected cells`" @click="insertChart(c.type)">{{ c.label }}</button>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Sparklines">
          <button type="button" class="rb-big" disabled><RibbonIcon name="line" size="lg" />Line</button>
          <button type="button" class="rb-big" disabled><RibbonIcon name="chart" size="lg" />Column</button>
        </RibbonGroup>
        <RibbonGroup label="Filters">
          <button type="button" class="rb-big" disabled><RibbonIcon name="sortDesc" size="lg" />Slicer</button>
        </RibbonGroup>
        <RibbonGroup label="Links">
          <button type="button" class="rb-big" @click="addLink"><RibbonIcon name="link" size="lg" class="text-[#107c41]" />Link</button>
        </RibbonGroup>
        <RibbonGroup label="Text">
          <button type="button" class="rb-big" disabled><RibbonIcon name="textbox" size="lg" />Text<br>Box</button>
          <button type="button" class="rb-big" @click="dialog = 'hf'"><RibbonIcon name="header" size="lg" class="text-[#107c41]" />Header<br>&amp; Footer</button>
          <button type="button" class="rb-big" disabled><RibbonIcon name="wordart" size="lg" />WordArt</button>
        </RibbonGroup>
        <RibbonGroup label="Symbols">
          <button type="button" class="rb-big" disabled><span class="text-2xl leading-7 font-serif">π</span>Equation</button>
          <div class="relative">
            <button type="button" class="rb-big" @click="toggleMenu('symbol')"><span class="text-2xl leading-7 text-[#107c41]">Ω</span>Symbol ▾</button>
            <div v-if="menu === 'symbol'" :class="menuCls" class="p-1.5 w-52 grid grid-cols-8 gap-0.5 right-0 left-auto">
              <button v-for="c in SYMBOLS" :key="c" type="button" class="h-7 rounded hover:bg-gray-100 dark:hover:bg-gray-700" @click="insertSymbol(c)">{{ c }}</button>
            </div>
          </div>
        </RibbonGroup>
      </template>

      <!-- Page Layout -->
      <template v-else-if="tab === 'Page Layout'">
        <RibbonGroup label="Themes">
          <button type="button" class="rb-big" disabled><RibbonIcon name="theme" size="lg" />Themes</button>
          <div class="flex flex-col">
            <button type="button" class="rb-sm" disabled><RibbonIcon name="colors" />Colors</button>
            <select class="rb-select w-28" title="Fonts" value="" @change="sheetFont($event.target as HTMLSelectElement)">
              <option value="" disabled>A Fonts ▾</option>
              <option v-for="f in FONTS" :key="f" :value="f">{{ f }}</option>
            </select>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Page Setup">
          <div v-for="p in PAGE_MENUS" :key="p.key" class="relative">
            <button type="button" class="rb-big" @click="toggleMenu(p.key)"><RibbonIcon :name="p.icon" size="lg" class="text-[#107c41]" />{{ p.label }} ▾</button>
            <div v-if="menu === p.key" :class="menuCls" class="w-40">
              <button v-for="o in p.options" :key="o" type="button" :class="menuItem" @click="setPage(p.key, o)">{{ o }}<span v-if="(page as any)[p.key] === o"> ✓</span></button>
            </div>
          </div>
          <button type="button" class="rb-big" @click="setPrintArea"><RibbonIcon name="printLayout" size="lg" class="text-[#107c41]" />Print<br>Area</button>
          <button type="button" class="rb-big" disabled><RibbonIcon name="breaks" size="lg" />Breaks</button>
          <button type="button" class="rb-big" disabled><RibbonIcon name="background" size="lg" />Background</button>
        </RibbonGroup>
        <RibbonGroup label="Scale to Fit">
          <label class="flex items-center gap-1 text-xs px-1 self-center">Scale: <input v-model.number="page.scale" type="number" min="10" max="400" step="5" class="rb-select w-16" @change="emit('change')">%</label>
        </RibbonGroup>
        <RibbonGroup label="Sheet Options">
          <div class="grid grid-cols-2 gap-x-3 text-xs px-1 self-center">
            <span class="font-semibold">Gridlines</span><span class="font-semibold">Headings</span>
            <label class="flex items-center gap-1"><input type="checkbox" :checked="gridlines" @change="toggleGridlines"> View</label>
            <label class="flex items-center gap-1 opacity-50"><input type="checkbox" checked disabled> View</label>
            <label class="flex items-center gap-1"><input v-model="page.printGridlines" type="checkbox" @change="emit('change')"> Print</label>
            <label class="flex items-center gap-1"><input v-model="page.printHeadings" type="checkbox" @change="emit('change')"> Print</label>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Arrange">
          <button type="button" class="rb-big" disabled><RibbonIcon name="front" size="lg" />Bring<br>Forward</button>
          <button type="button" class="rb-big" disabled><RibbonIcon name="back" size="lg" />Send<br>Backward</button>
          <button type="button" class="rb-big" disabled><RibbonIcon name="selectionPane" size="lg" />Selection<br>Pane</button>
        </RibbonGroup>
      </template>

      <!-- Formulas -->
      <template v-else-if="tab === 'Formulas'">
        <RibbonGroup label="Function Library">
          <button type="button" class="rb-big" @click="cmd('formula-ui.operation.more-functions')"><span class="text-2xl leading-7 italic font-serif text-[#107c41]">fx</span>Insert<br>Function</button>
          <div v-for="g in FUNCTION_GROUPS" :key="g.label" class="relative">
            <button type="button" class="rb-big" @click="toggleMenu(`fn-${g.label}`)"><span class="text-xl leading-7" :class="g.color">{{ g.mark }}</span>{{ g.label }} ▾</button>
            <div v-if="menu === `fn-${g.label}`" :class="menuCls" class="w-40 max-h-72 overflow-y-auto">
              <button v-for="f in g.fns" :key="f" type="button" :class="menuItem" class="font-mono" @click="insertFunction(f)">{{ f }}</button>
            </div>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Defined Names">
          <div class="flex flex-col">
            <button type="button" class="rb-sm" @click="defineName"><RibbonIcon name="bookmark" />Define Name</button>
            <button type="button" class="rb-sm" @click="openDialog('names')"><RibbonIcon name="design" />Name Manager</button>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Formula Auditing">
          <div class="flex flex-col">
            <button type="button" class="rb-sm" disabled><RibbonIcon name="crossref" />Trace Precedents</button>
            <button type="button" class="rb-sm" disabled><RibbonIcon name="crossref" />Trace Dependents</button>
            <button type="button" class="rb-sm" @click="openDialog('formulas')"><RibbonIcon name="find" />Show Formulas</button>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Calculation">
          <button type="button" class="rb-big" disabled title="Calculation is always automatic here"><RibbonIcon name="wordCount" size="lg" />Calculation<br>Options</button>
        </RibbonGroup>
      </template>

      <!-- Data -->
      <template v-else-if="tab === 'Data'">
        <RibbonGroup label="Get External Data">
          <label class="rb-big cursor-pointer"><RibbonIcon name="importFile" size="lg" class="text-[#107c41]" />From<br>Text/CSV<input type="file" accept=".csv,text/csv" class="hidden" @change="importCsv"></label>
          <button type="button" class="rb-big" disabled><RibbonIcon name="webLayout" size="lg" />From<br>Web</button>
        </RibbonGroup>
        <RibbonGroup label="Sort &amp; Filter">
          <div class="flex flex-col">
            <button type="button" class="rb-sm" @click="sort(true)"><RibbonIcon name="sortAsc" />A→Z</button>
            <button type="button" class="rb-sm" @click="sort(false)"><RibbonIcon name="sortDesc" />Z→A</button>
          </div>
          <button type="button" class="rb-big" @click="openDialog('sort')"><RibbonIcon name="sortAsc" size="lg" class="text-[#107c41]" />Sort</button>
          <button type="button" class="rb-big" @click="toggleFilter"><RibbonIcon name="sortDesc" size="lg" class="text-[#107c41]" />Filter</button>
        </RibbonGroup>
        <RibbonGroup label="Data Tools">
          <button type="button" class="rb-big" @click="textToColumns"><RibbonIcon name="columns" size="lg" class="text-[#107c41]" />Text to<br>Columns</button>
          <button type="button" class="rb-big" disabled><RibbonIcon name="hyphenation" size="lg" />Flash<br>Fill</button>
          <button type="button" class="rb-big" @click="removeDuplicates"><RibbonIcon name="deleteRecord" size="lg" class="text-[#107c41]" />Remove<br>Duplicates</button>
          <button type="button" class="rb-big" @click="openDialog('validation')"><RibbonIcon name="tick" size="lg" class="text-[#107c41]" />Data<br>Validation</button>
        </RibbonGroup>
        <RibbonGroup label="Outline">
          <button type="button" class="rb-big" disabled><RibbonIcon name="group" size="lg" />Group</button>
          <button type="button" class="rb-big" disabled><RibbonIcon name="group" size="lg" />Ungroup</button>
          <button type="button" class="rb-big" disabled><RibbonIcon name="wordCount" size="lg" />Subtotal</button>
        </RibbonGroup>
      </template>

      <!-- Review -->
      <template v-else-if="tab === 'Review'">
        <RibbonGroup label="Proofing">
          <button type="button" class="rb-big" disabled><RibbonIcon name="spelling" size="lg" />Spelling</button>
          <button type="button" class="rb-big" @click="openDialog('stats')"><RibbonIcon name="wordCount" size="lg" class="text-[#107c41]" />Workbook<br>Statistics</button>
        </RibbonGroup>
        <RibbonGroup label="Comments">
          <button type="button" class="rb-big" @click="addComment"><RibbonIcon name="newComment" size="lg" class="text-[#107c41]" />New<br>Comment</button>
          <button type="button" class="rb-big" @click="on(r => r.deleteNote?.())"><RibbonIcon name="trash" size="lg" class="text-[#107c41]" />Delete</button>
        </RibbonGroup>
        <RibbonGroup label="Protect">
          <button type="button" class="rb-big" disabled><RibbonIcon name="outline" size="lg" />Protect<br>Sheet</button>
          <button type="button" class="rb-big" disabled><RibbonIcon name="outline" size="lg" />Protect<br>Workbook</button>
        </RibbonGroup>
      </template>

      <!-- View -->
      <template v-else-if="tab === 'View'">
        <RibbonGroup label="Workbook Views">
          <button type="button" class="rb-big rb-on"><RibbonIcon name="datasheet" size="lg" class="text-[#107c41]" />Normal</button>
          <button type="button" class="rb-big" disabled><RibbonIcon name="breaks" size="lg" />Page Break<br>Preview</button>
          <button type="button" class="rb-big" disabled><RibbonIcon name="printLayout" size="lg" />Page<br>Layout</button>
        </RibbonGroup>
        <RibbonGroup label="Show">
          <label class="rb-sm cursor-pointer self-center"><input type="checkbox" :checked="gridlines" @change="toggleGridlines"> Gridlines</label>
        </RibbonGroup>
        <RibbonGroup label="Zoom">
          <div class="relative">
            <button type="button" class="rb-big" @click="toggleMenu('zoom')"><RibbonIcon name="zoom" size="lg" class="text-[#107c41]" />Zoom ▾</button>
            <div v-if="menu === 'zoom'" :class="menuCls" class="w-24">
              <button v-for="z in [50, 75, 100, 125, 150, 200]" :key="z" type="button" :class="menuItem" @click="setZoom(z)">{{ z }}%</button>
            </div>
          </div>
          <button type="button" class="rb-big" @click="setZoom(100)"><span class="text-base font-semibold leading-7 text-[#107c41]">100</span>100%</button>
        </RibbonGroup>
        <RibbonGroup label="Window">
          <div class="relative">
            <button type="button" class="rb-big" @click="toggleMenu('freeze')"><RibbonIcon name="layout" size="lg" class="text-[#107c41]" />Freeze<br>Panes ▾</button>
            <div v-if="menu === 'freeze'" :class="menuCls" class="w-44">
              <button type="button" :class="menuItem" @click="freeze('panes')">Freeze Panes</button>
              <button type="button" :class="menuItem" @click="freeze('row')">Freeze Top Row</button>
              <button type="button" :class="menuItem" @click="freeze('col')">Freeze First Column</button>
              <button type="button" :class="menuItem" @click="freeze('none')">Unfreeze Panes</button>
            </div>
          </div>
          <button type="button" class="rb-big" disabled><RibbonIcon name="columns" size="lg" />Split</button>
          <button type="button" class="rb-big" disabled><RibbonIcon name="webLayout" size="lg" />New<br>Window</button>
        </RibbonGroup>
      </template>
    </OfficeRibbon>

    <div ref="host" class="flex-1 min-h-0 relative"></div>

    <!-- Dialogs -->
    <div v-if="dialog" class="absolute inset-0 z-40 flex items-center justify-center bg-black/30 p-4" @click.self="dialog = null">
      <div class="w-full max-w-md rounded-lg bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700 text-sm">
        <div class="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          <p class="font-semibold">{{ DIALOG_TITLES[dialog] }}</p>
          <button type="button" class="text-gray-500" @click="dialog = null">✕</button>
        </div>
        <div class="p-4 space-y-3">
          <template v-if="dialog === 'sort'">
            <label class="block">Sort by column
              <select v-model="sortForm.column" class="mt-1 w-full px-2 py-1 border rounded dark:bg-gray-700">
                <option v-for="c in selectedColumns" :key="c.index" :value="c.index">Column {{ c.letter }}</option>
              </select>
            </label>
            <label class="block">Order
              <select v-model="sortForm.ascending" class="mt-1 w-full px-2 py-1 border rounded dark:bg-gray-700"><option :value="true">Smallest to Largest (A to Z)</option><option :value="false">Largest to Smallest (Z to A)</option></select>
            </label>
            <label class="flex items-center gap-2"><input v-model="sortForm.header" type="checkbox"> My data has headers</label>
            <div class="flex justify-end"><button type="button" class="px-4 py-1.5 rounded bg-[#107c41] text-white" @click="runSort">OK</button></div>
          </template>
          <template v-else-if="dialog === 'validation'">
            <label class="block">Allow
              <select v-model="validForm.kind" class="mt-1 w-full px-2 py-1 border rounded dark:bg-gray-700">
                <option value="list">List</option><option value="between">Whole number between</option><option value="checkbox">Checkbox</option>
              </select>
            </label>
            <label v-if="validForm.kind === 'list'" class="block">Source (separated by commas)<input v-model="validForm.list" class="mt-1 w-full px-2 py-1 border rounded dark:bg-gray-700" placeholder="Pass, Fail"></label>
            <div v-if="validForm.kind === 'between'" class="flex gap-2">
              <label class="flex-1">Minimum<input v-model.number="validForm.min" type="number" class="mt-1 w-full px-2 py-1 border rounded dark:bg-gray-700"></label>
              <label class="flex-1">Maximum<input v-model.number="validForm.max" type="number" class="mt-1 w-full px-2 py-1 border rounded dark:bg-gray-700"></label>
            </div>
            <div class="flex justify-end"><button type="button" class="px-4 py-1.5 rounded bg-[#107c41] text-white" @click="applyValidation">OK</button></div>
          </template>
          <template v-else-if="dialog === 'names'">
            <p v-if="!names.length" class="text-gray-500">No names yet. Select cells, then Define Name.</p>
            <div v-for="n in names" :key="n.name" class="flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 py-1">
              <span class="font-semibold flex-1">{{ n.name }}</span><span class="font-mono text-xs text-gray-500">{{ n.ref }}</span>
              <button type="button" class="text-rose-600 text-xs" @click="deleteName(n.name)">Delete</button>
            </div>
          </template>
          <template v-else-if="dialog === 'formulas'">
            <p v-if="!formulaList.length" class="text-gray-500">No formulas on this sheet yet.</p>
            <div class="max-h-72 overflow-y-auto">
              <div v-for="f in formulaList" :key="f.cell" class="flex gap-3 border-b border-gray-100 dark:border-gray-700 py-1 font-mono text-xs"><span class="w-12 font-semibold">{{ f.cell }}</span><span class="flex-1 break-all">{{ f.formula }}</span></div>
            </div>
          </template>
          <template v-else-if="dialog === 'stats'">
            <table class="w-full"><tbody>
              <tr v-for="r in stats" :key="r[0]" class="border-b border-gray-100 dark:border-gray-700"><td class="py-1">{{ r[0] }}</td><td class="text-right font-semibold tabular-nums">{{ r[1] }}</td></tr>
            </tbody></table>
          </template>
          <template v-else-if="dialog === 'hf'">
            <label class="block">Header<input v-model="page.header" class="mt-1 w-full px-2 py-1 border rounded dark:bg-gray-700"></label>
            <label class="block">Footer<input v-model="page.footer" class="mt-1 w-full px-2 py-1 border rounded dark:bg-gray-700"></label>
            <p class="text-xs text-gray-500">Shown when the sheet is printed.</p>
            <div class="flex justify-end"><button type="button" class="px-4 py-1.5 rounded bg-[#107c41] text-white" @click="dialog = null; emit('change')">OK</button></div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { createUniver, LocaleType, mergeLocales } from '@univerjs/presets'
import { UniverSheetsCorePreset } from '@univerjs/preset-sheets-core'
import UniverPresetSheetsCoreEnUS from '@univerjs/preset-sheets-core/locales/en-US'
import '@univerjs/preset-sheets-core/lib/index.css'
import { UniverSheetsSortPreset } from '@univerjs/preset-sheets-sort'
import SheetsSortEnUS from '@univerjs/preset-sheets-sort/locales/en-US'
import '@univerjs/preset-sheets-sort/lib/index.css'
import { UniverSheetsFilterPreset } from '@univerjs/preset-sheets-filter'
import SheetsFilterEnUS from '@univerjs/preset-sheets-filter/locales/en-US'
import '@univerjs/preset-sheets-filter/lib/index.css'
import { UniverSheetsConditionalFormattingPreset } from '@univerjs/preset-sheets-conditional-formatting'
import SheetsConditionalFormattingEnUS from '@univerjs/preset-sheets-conditional-formatting/locales/en-US'
import '@univerjs/preset-sheets-conditional-formatting/lib/index.css'
import { UniverSheetsDataValidationPreset } from '@univerjs/preset-sheets-data-validation'
import SheetsDataValidationEnUS from '@univerjs/preset-sheets-data-validation/locales/en-US'
import '@univerjs/preset-sheets-data-validation/lib/index.css'
import { UniverSheetsFindReplacePreset } from '@univerjs/preset-sheets-find-replace'
import SheetsFindReplaceEnUS from '@univerjs/preset-sheets-find-replace/locales/en-US'
import '@univerjs/preset-sheets-find-replace/lib/index.css'
import { UniverSheetsHyperLinkPreset } from '@univerjs/preset-sheets-hyper-link'
import SheetsHyperLinkEnUS from '@univerjs/preset-sheets-hyper-link/locales/en-US'
import '@univerjs/preset-sheets-hyper-link/lib/index.css'
import { UniverSheetsNotePreset } from '@univerjs/preset-sheets-note'
import SheetsNoteEnUS from '@univerjs/preset-sheets-note/locales/en-US'
import '@univerjs/preset-sheets-note/lib/index.css'
import { UniverSheetsDrawingPreset } from '@univerjs/preset-sheets-drawing'
import SheetsDrawingEnUS from '@univerjs/preset-sheets-drawing/locales/en-US'
import '@univerjs/preset-sheets-drawing/lib/index.css'
import { useToastStore } from '@/stores/toast'
import { blankWorkbook, workbookToXlsx, xlsxToWorkbook } from './excelConvert'
import OfficeRibbon from './ribbon/OfficeRibbon.vue'
import RibbonGroup from './ribbon/RibbonGroup.vue'
import RibbonIcon from './ribbon/RibbonIcon.vue'

const props = defineProps<{ initial: ArrayBuffer | null; readonly: boolean }>()
const emit = defineEmits<{ change: []; ready: []; download: [] }>()
const toast = useToastStore()

const TABS = ['File', 'Home', 'Insert', 'Page Layout', 'Formulas', 'Data', 'Review', 'View']
const tab = ref('Home')
const UGX = '"UGX "#,##0'
const FONTS = ['Calibri', 'Arial', 'Times New Roman', 'Cambria', 'Georgia', 'Verdana', 'Tahoma', 'Century Gothic', 'Courier New', 'Comic Sans MS']
const SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72]
const BORDERS = [
  { type: 'bottom', style: 1, label: 'Bottom Border' }, { type: 'top', style: 1, label: 'Top Border' },
  { type: 'left', style: 1, label: 'Left Border' }, { type: 'right', style: 1, label: 'Right Border' },
  { type: 'none', style: 1, label: 'No Border' }, { type: 'all', style: 1, label: 'All Borders' },
  { type: 'outside', style: 1, label: 'Outside Borders' }, { type: 'outside', style: 13, label: 'Thick Outside Borders' },
  { type: 'bottom', style: 7, label: 'Bottom Double Border' }
]
const NUMBER_FORMATS = [
  { label: 'General', pattern: 'General' }, { label: 'Number', pattern: '0.00' }, { label: 'Currency (UGX)', pattern: UGX },
  { label: 'Currency ($)', pattern: '$#,##0.00' }, { label: 'Short Date', pattern: 'dd/mm/yyyy' }, { label: 'Long Date', pattern: 'dddd, d mmmm yyyy' },
  { label: 'Time', pattern: 'h:mm:ss AM/PM' }, { label: 'Percentage', pattern: '0.00%' }, { label: 'Fraction', pattern: '# ?/?' },
  { label: 'Scientific', pattern: '0.00E+00' }, { label: 'Text', pattern: '@' }
]
const CF_RULES = [
  { key: 'gt', label: 'Greater Than…' }, { key: 'lt', label: 'Less Than…' }, { key: 'between', label: 'Between…' },
  { key: 'eq', label: 'Equal To…' }, { key: 'text', label: 'Text that Contains…' }, { key: 'dup', label: 'Duplicate Values' },
  { key: 'bars', label: 'Data Bars' }, { key: 'scale', label: 'Color Scales' }, { key: 'clear', label: 'Clear Rules' }
]
const CELL_STYLES: { label: string; css: Record<string, string | number>; style: { bg?: string; fc?: string; bold?: boolean; italic?: boolean; border?: boolean } | null }[] = [
  { label: 'Normal', css: { background: '#fff', color: '#000', borderColor: '#d1d5db' }, style: null },
  { label: 'Bad', css: { background: '#ffc7ce', color: '#9c0006', borderColor: '#ffc7ce' }, style: { bg: '#ffc7ce', fc: '#9c0006' } },
  { label: 'Good', css: { background: '#c6efce', color: '#006100', borderColor: '#c6efce' }, style: { bg: '#c6efce', fc: '#006100' } },
  { label: 'Neutral', css: { background: '#ffeb9c', color: '#9c5700', borderColor: '#ffeb9c' }, style: { bg: '#ffeb9c', fc: '#9c5700' } },
  { label: 'Calculation', css: { background: '#f2f2f2', color: '#fa7d00', fontWeight: 700, borderColor: '#7f7f7f' }, style: { bg: '#f2f2f2', fc: '#fa7d00', bold: true, border: true } },
  { label: 'Check Cell', css: { background: '#a5a5a5', color: '#fff', fontWeight: 700, borderColor: '#3f3f3f' }, style: { bg: '#a5a5a5', fc: '#ffffff', bold: true, border: true } },
  { label: 'Explanatory', css: { background: '#fff', color: '#7f7f7f', fontStyle: 'italic', borderColor: '#d1d5db' }, style: { fc: '#7f7f7f', italic: true } },
  { label: 'Input', css: { background: '#ffcc99', color: '#3f3f76', borderColor: '#7f7f7f' }, style: { bg: '#ffcc99', fc: '#3f3f76', border: true } }
]
const CELL_MENUS = [
  { key: 'insert', label: 'Insert', icon: 'newRecord', items: [{ label: 'Insert Sheet Rows', act: 'rowAbove' }, { label: 'Insert Sheet Columns', act: 'colLeft' }, { label: 'Insert Sheet', act: 'sheet' }] },
  { key: 'delete', label: 'Delete', icon: 'deleteRecord', items: [{ label: 'Delete Sheet Rows', act: 'delRows' }, { label: 'Delete Sheet Columns', act: 'delCols' }, { label: 'Delete Sheet', act: 'delSheet' }] },
  { key: 'format', label: 'Format', icon: 'design', items: [
    { label: 'Row Height…', act: 'rowHeight' }, { label: 'AutoFit Row Height', act: 'autoRow' }, { label: 'Column Width…', act: 'colWidth' },
    { label: 'Hide Rows', act: 'hideRows' }, { label: 'Hide Columns', act: 'hideCols' }, { label: 'Unhide Rows', act: 'showRows' }, { label: 'Unhide Columns', act: 'showCols' },
    { label: 'Rename Sheet', act: 'rename' }, { label: 'Tab Color…', act: 'tabColor' }] }
]
const AUTOSUM = [{ fn: 'SUM', label: 'Sum' }, { fn: 'AVERAGE', label: 'Average' }, { fn: 'COUNT', label: 'Count Numbers' }, { fn: 'MAX', label: 'Max' }, { fn: 'MIN', label: 'Min' }]
const FUNCTION_GROUPS = [
  { label: 'AutoSum', mark: 'Σ', color: 'text-gray-700', fns: ['SUM', 'AVERAGE', 'COUNT', 'MAX', 'MIN'] },
  { label: 'Financial', mark: '$', color: 'text-[#107c41]', fns: ['PMT', 'FV', 'PV', 'NPV', 'IRR', 'RATE', 'NPER', 'SLN'] },
  { label: 'Logical', mark: '?', color: 'text-purple-600', fns: ['IF', 'IFS', 'AND', 'OR', 'NOT', 'IFERROR', 'TRUE', 'FALSE', 'SWITCH'] },
  { label: 'Text', mark: 'A', color: 'text-amber-500', fns: ['CONCAT', 'CONCATENATE', 'LEFT', 'RIGHT', 'MID', 'LEN', 'UPPER', 'LOWER', 'PROPER', 'TRIM', 'TEXT', 'FIND', 'SUBSTITUTE'] },
  { label: 'Date & Time', mark: '◷', color: 'text-rose-600', fns: ['TODAY', 'NOW', 'DATE', 'DAY', 'MONTH', 'YEAR', 'WEEKDAY', 'DATEDIF', 'NETWORKDAYS'] },
  { label: 'Lookup & Reference', mark: '⌕', color: 'text-blue-600', fns: ['VLOOKUP', 'HLOOKUP', 'XLOOKUP', 'INDEX', 'MATCH', 'CHOOSE', 'ROW', 'COLUMN'] },
  { label: 'Math & Trig', mark: 'θ', color: 'text-teal-600', fns: ['SUM', 'SUMIF', 'SUMIFS', 'ROUND', 'ROUNDUP', 'ROUNDDOWN', 'INT', 'ABS', 'SQRT', 'POWER', 'PRODUCT', 'MOD', 'PI'] },
  { label: 'More Functions', mark: '⋯', color: 'text-orange-500', fns: ['COUNTIF', 'COUNTIFS', 'COUNTA', 'COUNTBLANK', 'AVERAGEIF', 'MEDIAN', 'MODE', 'RANK', 'LARGE', 'SMALL', 'STDEV'] }
]
const CHARTS = [{ type: 'bar', label: 'Column' }, { type: 'hbar', label: 'Bar' }, { type: 'line', label: 'Line' }, { type: 'pie', label: 'Pie' }, { type: 'area', label: 'Area' }, { type: 'doughnut', label: 'Doughnut' }]
const SHAPES = [
  { key: 'rect', label: 'Rectangle', icon: 'M3 5h14v10H3z' }, { key: 'oval', label: 'Oval', icon: 'M10 4a7 6 0 1 0 0 12a7 6 0 1 0 0-12z' },
  { key: 'triangle', label: 'Triangle', icon: 'M10 3 18 17H2z' }, { key: 'arrow', label: 'Right Arrow', icon: 'M2 7h10V3l6 7-6 7v-4H2z' },
  { key: 'star', label: 'Star', icon: 'M10 2l2.4 5.2 5.6.6-4.2 3.8 1.2 5.6L10 14.4 5 17.2l1.2-5.6L2 7.8l5.6-.6z' }, { key: 'callout', label: 'Callout', icon: 'M3 3h14v10H9l-4 4v-4H3z' }
]
const SYMBOLS = ['©', '®', '™', '°', '±', '×', '÷', '≠', '≤', '≥', '√', 'π', 'Ω', 'µ', '€', '£', '¥', '¢', '½', '¼', '¾', '²', '³', '✓', '✗', '★', '→', '←', '↑', '↓', 'α', 'β']
const PAGE_MENUS = [
  { key: 'margins', label: 'Margins', icon: 'margins', options: ['Normal', 'Wide', 'Narrow'] },
  { key: 'orientation', label: 'Orientation', icon: 'orientation', options: ['Portrait', 'Landscape'] },
  { key: 'size', label: 'Size', icon: 'size', options: ['A4', 'Letter', 'A3', 'Legal'] }
]
const DIALOG_TITLES: Record<string, string> = { sort: 'Sort', validation: 'Data Validation', names: 'Name Manager', formulas: 'Formulas on this sheet', stats: 'Workbook Statistics', hf: 'Header & Footer' }
const menuCls = 'absolute z-30 top-full left-0 mt-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg py-1 text-left'
const menuItem = 'block w-full text-left px-3 py-1 text-xs hover:bg-green-50 dark:hover:bg-gray-700'

const host = ref<HTMLElement | null>(null)
let univer: ReturnType<typeof createUniver>['univer'] | null = null
let api: any = null
let quiet = true // no "change" while a workbook is being put up

const menu = ref<string | null>(null)
const dialog = ref<string | null>(null)
const toggleMenu = (m: string) => { menu.value = menu.value === m ? null : m }
const openDialog = (d: string) => {
  menu.value = null
  if (d === 'sort') sortForm.column = selectedColumns.value[0]?.index ?? 0
  if (d === 'names') loadNames()
  if (d === 'formulas') loadFormulas()
  if (d === 'stats') loadStats()
  dialog.value = d
}
const closeMenus = (e: MouseEvent) => {
  if (menu.value && !(e.target as HTMLElement).closest('.office-ribbon .relative')) menu.value = null
}

// ---- the workbook, the sheet, the selection ----
const wb = () => api.getActiveWorkbook()
const ws = () => wb().getActiveSheet()
const rng = () => ws().getActiveRange?.() || wb().getActiveRange?.() || ws().getRange(0, 0)
const cmd = (id: string, params?: object) => { menu.value = null; return api?.executeCommand(id, params).catch((err: unknown) => console.error(id, err)) }
const on = (fn: (r: any) => unknown) => {
  menu.value = null
  try { fn(rng()) } catch (err) { console.error(err); toast.error('That could not be done here') }
}
const colLetter = (c: number) => { let s = ''; c++; while (c > 0) { const m = (c - 1) % 26; s = String.fromCharCode(65 + m) + s; c = Math.floor((c - m) / 26) } return s }
const a1 = (r: any) => {
  const g = r.getRange()
  return `${colLetter(g.startColumn)}${g.startRow + 1}:${colLetter(g.endColumn)}${g.endRow + 1}`
}

// what the ribbon shows for the selection
const sel = reactive({ font: 'Arial', size: 11, bold: false, italic: false, underline: false, strike: false })
const fill = ref('#ffff00')
const fontColor = ref('#c00000')
const selectedColumns = ref<{ index: number; letter: string }[]>([])
const readSelection = () => {
  try {
    const s = rng().getCellStyleData?.() || {}
    sel.font = s.ff || 'Arial'
    sel.size = s.fs || 11
    sel.bold = s.bl === 1
    sel.italic = s.it === 1
    sel.underline = s.ul?.s === 1
    sel.strike = s.st?.s === 1
    const g = rng().getRange()
    selectedColumns.value = Array.from({ length: g.endColumn - g.startColumn + 1 }, (_, i) => ({ index: g.startColumn + i, letter: colLetter(g.startColumn + i) }))
  } catch { /* nothing selected yet */ }
}

// ---- Home ----
const stepSize = (d: number) => {
  const next = d > 0 ? SIZES.find(n => n > sel.size) ?? sel.size + 4 : [...SIZES].reverse().find(n => n < sel.size) ?? Math.max(1, sel.size - 1)
  on(r => r.setFontSize(next))
  sel.size = next
}
const setBorder = (type: string, style: number) => on(r => r.setBorder(type, style, '#000000'))
const rotate = (el: HTMLSelectElement) => { const v = Number(el.value); el.value = ''; on(r => r.setTextRotation(v)) }
const numFmt = (el: HTMLSelectElement) => { const v = el.value; el.value = ''; on(r => r.setNumberFormat(v)) }
const cellStyle = (c: (typeof CELL_STYLES)[number]) => on(r => {
  const s = c.style
  if (!s) { r.clearFormat(); return }
  if (s.bg) r.setBackgroundColor(s.bg)
  if (s.fc) r.setFontColor(s.fc)
  r.setFontWeight(s.bold ? 'bold' : 'normal')
  r.setFontStyle(s.italic ? 'italic' : 'normal')
  if (s.border) r.setBorder('all', 1, '#7f7f7f')
})
const conditional = (key: string) => {
  menu.value = null
  const sheet = ws()
  const range = rng().getRange()
  try {
    if (key === 'clear') { sheet.clearConditionalFormatRules?.(); return }
    let b = sheet.newConditionalFormattingRule()
    // the range goes on last: Univer's builder only takes it once the kind of rule is chosen
    const add = (x: any) => sheet.addConditionalFormattingRule(x.setRanges([range]).build())
    if (key === 'gt' || key === 'lt' || key === 'eq') {
      const v = window.prompt(key === 'gt' ? 'Format cells that are GREATER THAN:' : key === 'lt' ? 'Format cells that are LESS THAN:' : 'Format cells that are EQUAL TO:')
      if (v === null || v === '') return
      b = key === 'gt' ? b.whenNumberGreaterThan(Number(v)) : key === 'lt' ? b.whenNumberLessThan(Number(v)) : b.whenNumberEqualTo(Number(v))
    } else if (key === 'between') {
      const lo = window.prompt('Between (lowest):'); if (lo === null) return
      const hi = window.prompt('And (highest):'); if (hi === null) return
      b = b.whenNumberBetween(Number(lo), Number(hi))
    } else if (key === 'text') {
      const t = window.prompt('Format cells that contain the text:'); if (!t) return
      b = b.whenTextContains(t)
    } else if (key === 'dup') {
      b = b.setDuplicateValues()
    } else if (key === 'bars') {
      add(b.setDataBar({ min: { type: 'min' }, max: { type: 'max' }, positiveColor: '#638ec6', nativeColor: '#ff0000', isGradient: true }))
      return
    } else if (key === 'scale') {
      add(b.setColorScale([{ index: 0, color: '#f8696b', value: { type: 'min' } }, { index: 1, color: '#ffeb84', value: { type: 'percent', value: 50 } }, { index: 2, color: '#63be7b', value: { type: 'max' } }]))
      return
    }
    add(b.setBackground('#ffc7ce').setFontColor('#9c0006'))
  } catch (err) {
    console.error(err)
    toast.error('That rule could not be added')
  }
}
// Format as Table: a blue header row, banded rows, borders and a filter
const formatAsTable = () => on(r => {
  const g = r.getRange()
  const sheet = ws()
  if (g.startRow === g.endRow) { toast.info('Select the table first, with its header row'); return }
  const width = g.endColumn - g.startColumn + 1
  sheet.getRange(g.startRow, g.startColumn, 1, width).setBackgroundColor('#4472c4').setFontColor('#ffffff').setFontWeight('bold')
  for (let row = g.startRow + 1; row <= g.endRow; row++) {
    sheet.getRange(row, g.startColumn, 1, width).setBackgroundColor((row - g.startRow) % 2 ? '#d9e1f2' : '#ffffff')
  }
  r.setBorder('all', 1, '#8ea9db')
  if (!sheet.getFilter?.()) r.createFilter?.()
})
const cellAction = (act: string) => {
  menu.value = null
  const sheet = ws()
  const g = rng().getRange()
  const rows = g.endRow - g.startRow + 1
  const cols = g.endColumn - g.startColumn + 1
  const num = (q: string, d: number) => { const v = window.prompt(q, String(d)); return v === null ? null : Number(v) }
  try {
    switch (act) {
      case 'rowAbove': sheet.insertRowsBefore(g.startRow, rows); break
      case 'colLeft': sheet.insertColumnsBefore(g.startColumn, cols); break
      case 'sheet': wb().insertSheet(); break
      case 'delRows': sheet.deleteRows(g.startRow, rows); break
      case 'delCols': sheet.deleteColumns(g.startColumn, cols); break
      case 'delSheet': if (wb().getSheets().length > 1 && window.confirm('Delete this sheet?')) wb().deleteActiveSheet(); break
      case 'rowHeight': { const h = num('Row height (pixels)', sheet.getRowHeight(g.startRow)); if (h) sheet.setRowHeights(g.startRow, rows, h); break }
      case 'autoRow': sheet.autoFitRow?.(g.startRow); break
      case 'colWidth': { const w = num('Column width (pixels)', sheet.getColumnWidth(g.startColumn)); if (w) sheet.setColumnWidths(g.startColumn, cols, w); break }
      case 'hideRows': sheet.hideRows(g.startRow, rows); break
      case 'hideCols': sheet.hideColumns(g.startColumn, cols); break
      case 'showRows': sheet.showRows(Math.max(0, g.startRow - 1), rows + 2); break
      case 'showCols': sheet.showColumns(Math.max(0, g.startColumn - 1), cols + 2); break
      case 'rename': { const n = window.prompt('Sheet name', sheet.getSheetName()); if (n) sheet.setName(n.slice(0, 31)); break }
      case 'tabColor': { const c = window.prompt('Tab colour (for example #ff0000)', '#107c41'); if (c) sheet.setTabColor(c); break }
    }
  } catch (err) {
    console.error(err)
    toast.error('That could not be done here')
  }
}
const insertFunction = (fn: string) => cmd('formula-ui.operation.insert-function', { value: fn })
const sort = (ascending: boolean) => on(r => r.sort({ column: r.getRange().startColumn, ascending }))
const toggleFilter = () => on(r => {
  const f = ws().getFilter?.()
  if (f) f.remove()
  else r.createFilter()
})

// ---- Insert: pictures, shapes and charts float over the cells, beside the selection ----
const placeImage = async (dataUrl: string) => {
  const g = rng().getRange()
  const ok = await ws().insertImage(dataUrl, g.endColumn + 1, g.startRow)
  if (!ok) toast.error('The picture could not be put in')
}
const insertPicture = (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => placeImage(String(reader.result))
  reader.readAsDataURL(file)
}
const insertShape = (s: (typeof SHAPES)[number]) => {
  menu.value = null
  const cv = document.createElement('canvas')
  cv.width = 200; cv.height = 200
  const ctx = cv.getContext('2d')!
  ctx.scale(10, 10)
  const path = new Path2D(s.icon)
  ctx.fillStyle = '#4472c4'; ctx.fill(path)
  ctx.lineWidth = 0.4; ctx.strokeStyle = '#2f528f'; ctx.stroke(path)
  placeImage(cv.toDataURL('image/png'))
}
// a chart of the selected cells: the first column names the categories, the first row the series
const insertChart = async (type: string) => {
  menu.value = null
  const values: any[][] = rng().getValues()
  if (values.length < 2 && (values[0]?.length || 0) < 2) { toast.info('Select the data for the chart first: names in the first column, numbers beside them'); return }
  const headerRow = values.length > 1 && values[0].slice(1).some(v => typeof v === 'string' && v !== '')
  const body = headerRow ? values.slice(1) : values
  const labels = body.map(r => String(r[0] ?? ''))
  const names = headerRow ? values[0].slice(1).map(v => String(v ?? '')) : values[0].slice(1).map((_, i) => `Series ${i + 1}`)
  const COLORS = ['#4472c4', '#ed7d31', '#a5a5a5', '#ffc000', '#5b9bd5', '#70ad47', '#264478', '#9e480e']
  const round = type === 'pie' || type === 'doughnut'
  const datasets = names.map((n, i) => ({
    label: n,
    data: body.map(r => Number(r[i + 1]) || 0),
    backgroundColor: round ? body.map((_, j) => COLORS[j % COLORS.length]) : (type === 'area' ? `${COLORS[i % COLORS.length]}66` : COLORS[i % COLORS.length]),
    borderColor: type === 'line' || type === 'area' ? COLORS[i % COLORS.length] : '#ffffff',
    fill: type === 'area', tension: 0.2
  }))
  const { Chart, registerables } = await import('chart.js')
  Chart.register(...registerables)
  const cv = document.createElement('canvas')
  cv.width = 640; cv.height = 400
  const chart = new Chart(cv, {
    type: (type === 'hbar' ? 'bar' : type === 'area' ? 'line' : type) as any,
    data: { labels, datasets },
    options: { animation: false, responsive: false, indexAxis: type === 'hbar' ? 'y' : 'x', plugins: { title: { display: true, text: names.length === 1 ? names[0] : 'Chart Title', font: { size: 18 } }, legend: { display: names.length > 1 || round, position: 'bottom' } } } as any,
    plugins: [{ id: 'white', beforeDraw: (c: any) => { c.ctx.save(); c.ctx.fillStyle = '#fff'; c.ctx.fillRect(0, 0, c.width, c.height); c.ctx.restore() } }]
  })
  const url = cv.toDataURL('image/png')
  chart.destroy()
  placeImage(url)
}
const addLink = async () => {
  const url = window.prompt('Address (https://...)', 'https://')
  if (!url || url === 'https://') return
  const label = window.prompt('Text to display', url) || url
  try { await rng().setHyperLink(url, label) } catch (err) { console.error(err); toast.error('The link could not be added') }
}
const insertSymbol = (c: string) => on(r => {
  const v = r.getValue()
  r.setValue(`${v ?? ''}${c}`)
})

// ---- Page Layout (used when printing) ----
const page = reactive({ margins: 'Normal', orientation: 'Portrait', size: 'A4', scale: 100, printGridlines: false, printHeadings: false, printArea: '', header: '', footer: '' })
const setPage = (k: string, v: string) => { (page as any)[k] = v; menu.value = null; emit('change') }
const setPrintArea = () => { page.printArea = a1(rng()); toast.success(`Print area: ${page.printArea}`); emit('change') }
const gridlines = ref(true)
const toggleGridlines = () => { gridlines.value = !gridlines.value; try { ws().setHiddenGridlines(!gridlines.value) } catch (err) { console.error(err) } }
const sheetFont = (el: HTMLSelectElement) => {
  const f = el.value
  el.value = ''
  try {
    const sheet = ws()
    sheet.getRange(0, 0, Math.max(1, sheet.getLastRow() + 1), Math.max(1, sheet.getLastColumn() + 1)).setFontFamily(f)
  } catch (err) { console.error(err) }
}
const printSheet = () => {
  const sheet = ws()
  const last = { r: sheet.getLastRow(), c: sheet.getLastColumn() }
  if (last.r < 0 || last.c < 0) { toast.info('The sheet is empty'); return }
  const area = page.printArea ? sheet.getRange(page.printArea) : sheet.getRange(0, 0, last.r + 1, last.c + 1)
  const vals: any[][] = area.getDisplayValues ? area.getDisplayValues() : area.getValues()
  const g = area.getRange()
  const esc = (v: unknown) => String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;')
  const head = page.printHeadings ? `<tr><th></th>${vals[0].map((_: any, i: number) => `<th>${colLetter(g.startColumn + i)}</th>`).join('')}</tr>` : ''
  const rows = vals.map((r, i) => `<tr>${page.printHeadings ? `<th>${g.startRow + i + 1}</th>` : ''}${r.map(v => `<td>${esc(v)}</td>`).join('')}</tr>`).join('')
  const w = window.open('', '_blank')
  if (!w) return
  const margin = page.margins === 'Wide' ? '1in' : page.margins === 'Narrow' ? '0.25in' : '0.75in'
  w.document.write(`<!doctype html><html><head><title>Print</title><style>@page{size:${page.size} ${page.orientation.toLowerCase()};margin:${margin}} body{font-family:Calibri,Arial,sans-serif;font-size:11pt;zoom:${page.scale / 100}} table{border-collapse:collapse} td,th{padding:2px 6px;${page.printGridlines ? 'border:1px solid #bbb;' : ''}} th{background:#f2f2f2;color:#555}</style></head><body>${page.header ? `<p style="text-align:center">${esc(page.header)}</p>` : ''}<table>${head}${rows}</table>${page.footer ? `<p style="text-align:center">${esc(page.footer)}</p>` : ''}</body></html>`)
  w.document.close()
  w.focus()
  w.print()
}

// ---- Formulas ----
const names = ref<{ name: string; ref: string }[]>([])
const loadNames = () => {
  try { names.value = wb().getDefinedNames().map((n: any) => ({ name: n.getName(), ref: n.getFormulaOrRefString() })) } catch { names.value = [] }
}
const defineName = () => {
  const n = (window.prompt('Name for the selected cells (no spaces)') || '').trim().replace(/\s+/g, '_')
  if (!n) return
  try {
    wb().insertDefinedName(n, `=${ws().getSheetName()}!${a1(rng()).replace(/([A-Z]+)(\d+)/g, '$$$1$$$2')}`)
    toast.success(`Name ${n} defined`)
  } catch (err) { console.error(err); toast.error('That name could not be defined') }
}
const deleteName = (n: string) => { try { wb().deleteDefinedName(n); loadNames() } catch (err) { console.error(err) } }
const formulaList = ref<{ cell: string; formula: string }[]>([])
const loadFormulas = () => {
  const out: { cell: string; formula: string }[] = []
  const data = wb().save().sheets[ws().getSheetId()]?.cellData || {}
  for (const r of Object.keys(data)) for (const c of Object.keys(data[r] || {})) if (data[r][c]?.f) out.push({ cell: `${colLetter(Number(c))}${Number(r) + 1}`, formula: data[r][c].f })
  formulaList.value = out
}

// ---- Data ----
const sortForm = reactive({ column: 0, ascending: true, header: true })
const runSort = () => {
  dialog.value = null
  on(r => {
    const g = r.getRange()
    const target = sortForm.header && g.endRow > g.startRow ? ws().getRange(g.startRow + 1, g.startColumn, g.endRow - g.startRow, g.endColumn - g.startColumn + 1) : r
    target.sort({ column: sortForm.column, ascending: sortForm.ascending })
  })
}
const textToColumns = () => on(r => {
  const d = window.prompt('Split the text at (comma, space, ; ...)', ',')
  if (d === null) return
  r.splitTextToColumns(false, d === ' ' ? 2 : d === ',' ? 1 : d === ';' ? 3 : d === '\t' ? 0 : 4, d)
})
const removeDuplicates = () => on(r => {
  const vals: any[][] = r.getValues()
  const seen = new Set<string>()
  const keep = vals.filter(row => { const k = JSON.stringify(row); if (seen.has(k)) return false; seen.add(k); return true })
  const removed = vals.length - keep.length
  const blank = vals[0].map(() => null)
  r.setValues([...keep, ...Array.from({ length: removed }, () => blank)])
  toast.success(removed ? `${removed} duplicate row${removed === 1 ? '' : 's'} removed; ${keep.length} unique left` : 'No duplicates found')
})
const validForm = reactive({ kind: 'list', list: 'Pass, Fail', min: 0, max: 100 })
const applyValidation = () => {
  dialog.value = null
  on(r => {
    let b = api.newDataValidation()
    if (validForm.kind === 'list') b = b.requireValueInList(validForm.list.split(',').map(s => s.trim()).filter(Boolean))
    else if (validForm.kind === 'between') b = b.requireNumberBetween(validForm.min, validForm.max, true)
    else b = b.requireCheckbox()
    r.setDataValidation(b.build())
  })
}
const importCsv = async (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return
  const XLSX = await import('xlsx')
  const book = XLSX.read(await file.text(), { type: 'string' })
  const rows = XLSX.utils.sheet_to_json<any[]>(book.Sheets[book.SheetNames[0]], { header: 1, defval: null })
  if (!rows.length) return
  const sheet = wb().insertSheet(file.name.replace(/\.\w+$/, '').slice(0, 31))
  const width = Math.max(...rows.map(r => r.length))
  sheet.getRange(0, 0, rows.length, width).setValues(rows.map(r => Array.from({ length: width }, (_, i) => (r[i] === undefined ? null : r[i]))))
  toast.success(`${file.name} imported`)
}

// ---- Review ----
const addComment = () => on(r => {
  const t = window.prompt('Comment')
  if (t) r.createOrUpdateNote({ note: t, width: 180, height: 80 })
})
const stats = ref<[string, string | number][]>([])
const loadStats = () => {
  const snap = wb().save()
  let cells = 0, formulas = 0
  for (const id of snap.sheetOrder) {
    const data = snap.sheets[id]?.cellData || {}
    for (const r of Object.keys(data)) for (const c of Object.keys(data[r] || {})) {
      const cd = data[r][c]
      if (cd && ((cd.v !== undefined && cd.v !== null && cd.v !== '') || cd.f)) cells++
      if (cd?.f) formulas++
    }
  }
  const sheet = ws()
  stats.value = [['Sheets', snap.sheetOrder.length], ['Cells with data', cells], ['Formulas', formulas], ['End of this sheet', sheet.getLastRow() >= 0 ? `${colLetter(sheet.getLastColumn())}${sheet.getLastRow() + 1}` : '-']]
}

// ---- View ----
const setZoom = (z: number) => { menu.value = null; try { ws().zoom(z / 100) } catch (err) { console.error(err) } }
const freeze = (how: string) => {
  menu.value = null
  const sheet = ws()
  const g = rng().getRange()
  try {
    if (how === 'none') sheet.cancelFreeze()
    else if (how === 'row') sheet.setFrozenRows(1)
    else if (how === 'col') sheet.setFrozenColumns(1)
    else sheet.setFreeze({ startRow: g.startRow, startColumn: g.startColumn, xSplit: g.startColumn, ySplit: g.startRow })
  } catch (err) { console.error(err) }
}

// ---- open ----
const open = (snapshot: Record<string, any>) => {
  if (!api) return
  quiet = true
  const current = api.getActiveWorkbook()
  if (current) api.disposeUnit(current.getId())
  if (snapshot.custom?.tusomePage) Object.assign(page, snapshot.custom.tusomePage)
  const book = api.createWorkbook(snapshot)
  if (props.readonly) book.setEditable(false)
  setTimeout(() => { quiet = false }, 300)
}

onMounted(() => {
  const made = createUniver({
    locale: LocaleType.EN_US,
    locales: { [LocaleType.EN_US]: mergeLocales(UniverPresetSheetsCoreEnUS, SheetsSortEnUS, SheetsFilterEnUS, SheetsConditionalFormattingEnUS, SheetsDataValidationEnUS, SheetsFindReplaceEnUS, SheetsHyperLinkEnUS, SheetsNoteEnUS, SheetsDrawingEnUS) },
    // Univer's grid, formula bar, menus and sheet tabs; the ribbon above is Tusome's own. View
    // only keeps the formula bar, so a teacher marking sees the formula behind each answer.
    presets: [
      UniverSheetsCorePreset({ container: host.value!, header: true, toolbar: false, formulaBar: true, contextMenu: !props.readonly } as any),
      UniverSheetsSortPreset(), UniverSheetsFilterPreset(), UniverSheetsConditionalFormattingPreset(), UniverSheetsDataValidationPreset(),
      UniverSheetsFindReplacePreset(), UniverSheetsHyperLinkPreset(), UniverSheetsNotePreset(), UniverSheetsDrawingPreset()
    ]
  })
  univer = made.univer
  api = made.univerAPI

  let snapshot: Record<string, any> | null = null
  if (props.initial && props.initial.byteLength) {
    try { snapshot = JSON.parse(new TextDecoder().decode(props.initial)) } catch { snapshot = null }
  }
  open(snapshot || blankWorkbook())

  // every change to the workbook (a mutation) is something to save
  api.addEvent(api.Event.CommandExecuted, (e: any) => {
    if (!quiet && e?.type === 2) emit('change')
  })
  if (api.Event.SelectionChanged) api.addEvent(api.Event.SelectionChanged, readSelection)
  document.addEventListener('mousedown', closeMenus)
  emit('ready')
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', closeMenus)
  univer?.dispose()
  univer = null
  api = null
})

const snapshotNow = () => {
  const snap = api?.getActiveWorkbook()?.save() as Record<string, any> | undefined
  if (snap) snap.custom = { ...(snap.custom || {}), tusomePage: { ...page } }
  return snap
}

defineExpose({
  save: async () => new Blob([JSON.stringify(snapshotNow() || blankWorkbook())], { type: 'application/json' }),
  importFile: async (file: File) => {
    open(await xlsxToWorkbook(await file.arrayBuffer(), file.name.replace(/\.\w+$/, '')))
  },
  exportFile: async () => workbookToXlsx(snapshotNow() || blankWorkbook())
})
</script>
