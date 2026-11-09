<template>
  <!-- Word processing: Word's ribbon (File, Home, Insert, Design, Layout, References, Mailings,
       Review, View) over a page on the desk. The work is the document as HTML, with its page set-up,
       header, footer, design and mail-merge list in a meta tag; a .docx is made when it is
       downloaded, and a teacher's .docx opens into it. Tools that need desktop Word are shown
       greyed out, as Word itself shows tools that don't apply. -->
  <div class="absolute inset-0 flex flex-col" :data-tick="tick">
    <OfficeRibbon v-if="(!readonly || showTools) && editor" v-model:active="tab" :tabs="TABS" color="bg-[#185abd]" :locked="readonly">
      <!-- File -->
      <template v-if="tab === 'File'">
        <RibbonGroup label="Save">
          <button type="button" class="rb-big" @click="$emit('download')"><RibbonIcon name="download" size="lg" class="text-[#185abd]" />Download<br>as .docx</button>
          <button type="button" class="rb-big" @click="printDoc"><RibbonIcon name="print" size="lg" class="text-[#185abd]" />Print</button>
        </RibbonGroup>
        <RibbonGroup label="Info">
          <div class="px-2 py-1 text-xs text-gray-600 dark:text-gray-300 leading-relaxed">Your work saves by itself as you type.<br>{{ stats.words }} words · {{ pages }} {{ pages === 1 ? 'page' : 'pages' }}</div>
        </RibbonGroup>
      </template>

      <!-- Home -->
      <template v-else-if="tab === 'Home'">
        <RibbonGroup label="Clipboard">
          <button type="button" class="rb-big" title="Paste (Ctrl+V)" @click="paste"><RibbonIcon name="paste" size="lg" class="text-[#185abd]" />Paste</button>
          <div class="flex flex-col">
            <button type="button" class="rb-sm" title="Cut (Ctrl+X)" @click="clip('cut')"><RibbonIcon name="cut" />Cut</button>
            <button type="button" class="rb-sm" title="Copy (Ctrl+C)" @click="clip('copy')"><RibbonIcon name="copy" />Copy</button>
            <button type="button" class="rb-sm" :class="{ 'rb-on': painter }" title="Format Painter: copy the look of the selection, then select the text to give it to" @click="startPainter"><RibbonIcon name="painter" />Format Painter</button>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Font">
          <div class="flex flex-col gap-1">
            <div class="flex items-center gap-0.5">
              <select class="rb-select w-36" title="Font" :value="fontFamily" @change="setFont(($event.target as HTMLSelectElement).value)">
                <option v-for="f in FONTS" :key="f" :value="f" :style="{ fontFamily: f }">{{ f }}</option>
              </select>
              <select class="rb-select w-14" title="Font size" :value="fontSize" @change="setSize(($event.target as HTMLSelectElement).value)">
                <option v-for="s in SIZES" :key="s" :value="s">{{ s }}</option>
              </select>
              <button type="button" class="rb-ic" title="Increase font size" @click="stepSize(1)"><RibbonIcon name="grow" /></button>
              <button type="button" class="rb-ic" title="Decrease font size" @click="stepSize(-1)"><RibbonIcon name="shrink" /></button>
              <select class="rb-select w-12" title="Change case" value="" @change="changeCase($event.target as HTMLSelectElement)">
                <option value="" disabled>Aa</option><option value="sentence">Sentence case.</option><option value="lower">lowercase</option><option value="upper">UPPERCASE</option><option value="title">Capitalise Each Word</option><option value="toggle">tOGGLE cASE</option>
              </select>
              <button type="button" class="rb-ic" title="Clear all formatting" @click="chain().unsetAllMarks().run()"><RibbonIcon name="eraser" /></button>
            </div>
            <div class="flex items-center gap-0.5">
              <button type="button" class="rb-ic font-bold" :class="{ 'rb-on': editor.isActive('bold') }" title="Bold (Ctrl+B)" @click="chain().toggleBold().run()">B</button>
              <button type="button" class="rb-ic italic font-serif" :class="{ 'rb-on': editor.isActive('italic') }" title="Italic (Ctrl+I)" @click="chain().toggleItalic().run()">I</button>
              <button type="button" class="rb-ic underline" :class="{ 'rb-on': editor.isActive('underline') }" title="Underline (Ctrl+U)" @click="chain().toggleUnderline().run()">U</button>
              <button type="button" class="rb-ic line-through text-xs" :class="{ 'rb-on': editor.isActive('strike') }" title="Strikethrough" @click="chain().toggleStrike().run()">abc</button>
              <button type="button" class="rb-ic text-xs" :class="{ 'rb-on': editor.isActive('subscript') }" title="Subscript" @click="chain().toggleSubscript().run()">x<sub>2</sub></button>
              <button type="button" class="rb-ic text-xs" :class="{ 'rb-on': editor.isActive('superscript') }" title="Superscript" @click="chain().toggleSuperscript().run()">x<sup>2</sup></button>
              <span class="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-0.5"></span>
              <label class="rb-ic relative cursor-pointer" title="Text highlight colour">
                <span class="text-xs px-0.5 border-b-[3px]" :style="{ borderColor: highlight }">ab</span>
                <input type="color" class="absolute inset-0 opacity-0 cursor-pointer" :value="highlight" @input="setHighlight(($event.target as HTMLInputElement).value)">
              </label>
              <label class="rb-ic relative cursor-pointer" title="Font colour">
                <span class="font-bold border-b-[3px] leading-none" :style="{ borderColor: textColor }">A</span>
                <input type="color" class="absolute inset-0 opacity-0 cursor-pointer" :value="textColor" @input="setColor(($event.target as HTMLInputElement).value)">
              </label>
            </div>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Paragraph">
          <div class="flex flex-col gap-1">
            <div class="flex items-center gap-0.5">
              <button type="button" class="rb-ic" :class="{ 'rb-on': editor.isActive('bulletList') }" title="Bullets" @click="chain().toggleBulletList().run()"><RibbonIcon name="bullets" /></button>
              <button type="button" class="rb-ic" :class="{ 'rb-on': editor.isActive('orderedList') }" title="Numbering" @click="chain().toggleOrderedList().run()"><RibbonIcon name="numbering" /></button>
              <button type="button" class="rb-ic" title="Decrease indent" @click="indent(-1)"><RibbonIcon name="outdent" /></button>
              <button type="button" class="rb-ic" title="Increase indent" @click="indent(1)"><RibbonIcon name="indent" /></button>
              <button type="button" class="rb-ic" title="Sort the selected paragraphs A to Z" @click="sortParagraphs"><RibbonIcon name="sortAsc" /></button>
              <button type="button" class="rb-ic" :class="{ 'rb-on': showMarks }" title="Show/hide ¶ formatting marks" @click="showMarks = !showMarks"><RibbonIcon name="pilcrow" /></button>
            </div>
            <div class="flex items-center gap-0.5">
              <button v-for="a in ALIGNS" :key="a.v" type="button" class="rb-ic" :class="{ 'rb-on': editor.isActive({ textAlign: a.v }) }" :title="a.t" @click="chain().setTextAlign(a.v).run()"><RibbonIcon :name="a.icon" /></button>
              <select class="rb-select w-14" title="Line and paragraph spacing" :value="para.lineHeight" @change="setPara('lineHeight', ($event.target as HTMLSelectElement).value)">
                <option v-for="l in LINE_HEIGHTS" :key="l" :value="l">{{ l }}</option>
              </select>
              <label class="rb-ic relative cursor-pointer" title="Shading">
                <RibbonIcon name="fill" />
                <input type="color" class="absolute inset-0 opacity-0 cursor-pointer" :value="para.shading || '#ffffff'" @input="setPara('shading', ($event.target as HTMLInputElement).value)">
              </label>
              <select class="rb-select w-[70px]" title="Borders" :value="para.border || ''" @change="setPara('border', ($event.target as HTMLSelectElement).value || null)">
                <option value="">No border</option><option value="box">Box</option><option value="bottom">Bottom</option><option value="top">Top</option>
              </select>
            </div>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Styles">
          <div class="flex items-stretch gap-0.5">
            <button v-for="s in STYLES" :key="s.key" type="button" class="w-[74px] h-[52px] px-1 rounded-sm border bg-white dark:bg-gray-700 text-left overflow-hidden" :class="blockStyle === s.key ? 'border-[#185abd] ring-1 ring-[#185abd]' : 'border-gray-200 dark:border-gray-600 hover:border-gray-400'" @click="applyStyle(s.key)">
              <span class="block truncate leading-tight" :style="s.css">AaBbCc</span>
              <span class="block text-[10px] text-gray-500 dark:text-gray-300 truncate mt-1">{{ s.label }}</span>
            </button>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Editing">
          <div class="flex flex-col">
            <button type="button" class="rb-sm" title="Find (Ctrl+F)" @click="openFind(false)"><RibbonIcon name="find" />Find</button>
            <button type="button" class="rb-sm" title="Replace (Ctrl+H)" @click="openFind(true)"><RibbonIcon name="replace" />Replace</button>
            <button type="button" class="rb-sm" title="Select all (Ctrl+A)" @click="chain().selectAll().run()"><RibbonIcon name="select" />Select</button>
          </div>
        </RibbonGroup>
      </template>

      <!-- Insert -->
      <template v-else-if="tab === 'Insert'">
        <RibbonGroup label="Pages">
          <div class="relative">
            <button type="button" class="rb-big" @click="toggleMenu('cover')"><RibbonIcon name="coverPage" size="lg" class="text-[#185abd]" />Cover<br>Page ▾</button>
            <div v-if="menu === 'cover'" :class="menuCls" class="w-48">
              <button v-for="c in COVERS" :key="c.key" type="button" :class="menuItem" @click="insertCover(c.key)">{{ c.label }}</button>
            </div>
          </div>
          <button type="button" class="rb-big" @click="chain().insertContent([{ type: 'pageBreak' }, { type: 'paragraph' }, { type: 'pageBreak' }]).run()"><RibbonIcon name="blankPage" size="lg" class="text-[#185abd]" />Blank<br>Page</button>
          <button type="button" class="rb-big" @click="chain().insertContent({ type: 'pageBreak' }).run()"><RibbonIcon name="pageBreak" size="lg" class="text-[#185abd]" />Page<br>Break</button>
        </RibbonGroup>
        <RibbonGroup label="Tables">
          <div class="relative">
            <button type="button" class="rb-big" @click="toggleMenu('table')"><RibbonIcon name="table" size="lg" class="text-[#185abd]" />Table ▾</button>
            <div v-if="menu === 'table'" :class="menuCls" class="p-2" @mouseleave="pick = [0, 0]">
              <p class="text-xs mb-1 text-gray-600 dark:text-gray-300">{{ pick[0] ? `${pick[1]} × ${pick[0]} Table` : 'Insert Table' }}</p>
              <div class="grid grid-cols-10 gap-0.5">
                <span v-for="i in 80" :key="i" class="w-4 h-4 border cursor-pointer" :class="Math.ceil(i / 10) <= pick[0] && ((i - 1) % 10) + 1 <= pick[1] ? 'bg-orange-200 border-orange-400' : 'border-gray-300 dark:border-gray-600'" @mouseenter="pick = [Math.ceil(i / 10), ((i - 1) % 10) + 1]" @click="insertTable(Math.ceil(i / 10), ((i - 1) % 10) + 1)"></span>
              </div>
            </div>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Illustrations">
          <label class="rb-big cursor-pointer"><RibbonIcon name="picture" size="lg" class="text-[#185abd]" />Pictures<input type="file" accept="image/*" class="hidden" @change="insertImage"></label>
          <div class="relative">
            <button type="button" class="rb-big" @click="toggleMenu('shapes')"><RibbonIcon name="shapes" size="lg" class="text-[#185abd]" />Shapes ▾</button>
            <div v-if="menu === 'shapes'" :class="menuCls" class="p-2 w-56">
              <div class="grid grid-cols-6 gap-1">
                <button v-for="s in SHAPES" :key="s.key" type="button" class="w-7 h-7 rounded hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center" :title="s.label" @click="insertShape(s.key)">
                  <svg viewBox="0 0 20 20" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.4"><path :d="s.icon" /></svg>
                </button>
              </div>
              <label class="mt-2 flex items-center gap-2 text-xs">Fill <input v-model="shapeColor" type="color" class="w-8 h-5"></label>
            </div>
          </div>
          <button type="button" class="rb-big" disabled title="Needs desktop Word"><RibbonIcon name="smartart" size="lg" />SmartArt</button>
          <button type="button" class="rb-big" @click="openDialog('chart')"><RibbonIcon name="chart" size="lg" class="text-[#185abd]" />Chart</button>
          <button type="button" class="rb-big" disabled title="Needs desktop Word"><RibbonIcon name="screenshot" size="lg" />Screenshot</button>
        </RibbonGroup>
        <RibbonGroup label="Media">
          <button type="button" class="rb-big" disabled title="Needs desktop Word"><RibbonIcon name="video" size="lg" />Online<br>Videos</button>
        </RibbonGroup>
        <RibbonGroup label="Links">
          <button type="button" class="rb-big" @click="addLink"><RibbonIcon name="link" size="lg" class="text-[#185abd]" />Link</button>
          <button type="button" class="rb-big" @click="addBookmark"><RibbonIcon name="bookmark" size="lg" class="text-[#185abd]" />Bookmark</button>
          <button type="button" class="rb-big" disabled title="Needs desktop Word"><RibbonIcon name="crossref" size="lg" />Cross-<br>reference</button>
        </RibbonGroup>
        <RibbonGroup label="Comments">
          <button type="button" class="rb-big" @click="addComment"><RibbonIcon name="newComment" size="lg" class="text-[#185abd]" />Comment</button>
        </RibbonGroup>
        <RibbonGroup label="Header &amp; Footer">
          <button type="button" class="rb-big" @click="editHeader('header')"><RibbonIcon name="header" size="lg" class="text-[#185abd]" />Header</button>
          <button type="button" class="rb-big" @click="editHeader('footer')"><RibbonIcon name="footer" size="lg" class="text-[#185abd]" />Footer</button>
          <div class="relative">
            <button type="button" class="rb-big" @click="toggleMenu('pageno')"><RibbonIcon name="pageNumber" size="lg" class="text-[#185abd]" />Page<br>Number ▾</button>
            <div v-if="menu === 'pageno'" :class="menuCls" class="w-48">
              <button v-for="o in PAGE_NUMBERS" :key="o.v" type="button" :class="menuItem" @click="setPage('pageNumbers', o.v); menu = null">{{ o.label }}<span v-if="page.pageNumbers === o.v"> ✓</span></button>
            </div>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Text">
          <button type="button" class="rb-big" @click="insertTextBox"><RibbonIcon name="textbox" size="lg" class="text-[#185abd]" />Text<br>Box</button>
          <button type="button" class="rb-big" disabled title="Needs desktop Word"><RibbonIcon name="layout" size="lg" />Quick<br>Parts</button>
          <div class="relative">
            <button type="button" class="rb-big" @click="toggleMenu('wordart')"><RibbonIcon name="wordart" size="lg" class="text-[#185abd]" />WordArt ▾</button>
            <div v-if="menu === 'wordart'" :class="menuCls" class="p-2 w-64 grid grid-cols-2 gap-1">
              <button v-for="w in WORDART" :key="w.key" type="button" class="h-12 rounded border border-gray-200 dark:border-gray-600 hover:border-[#185abd] text-xl font-bold" :style="w.css" @click="insertWordArt(w.key)">Aa</button>
            </div>
          </div>
          <button type="button" class="rb-big" :class="{ 'rb-on': blockStyle === 'dropcap' }" title="Drop Cap: a big first letter" @click="toggleDropCap"><RibbonIcon name="dropCap" size="lg" class="text-[#185abd]" />Drop<br>Cap</button>
          <div class="flex flex-col">
            <button type="button" class="rb-sm" @click="insertSignature"><RibbonIcon name="signature" />Signature Line</button>
            <button type="button" class="rb-sm" @click="insertDate"><RibbonIcon name="date" />Date &amp; Time</button>
            <button type="button" class="rb-sm" disabled><RibbonIcon name="object" />Object</button>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Symbols">
          <button type="button" class="rb-big" @click="openDialog('equation')"><span class="text-2xl leading-7 text-[#185abd] font-serif">π</span>Equation</button>
          <div class="relative">
            <button type="button" class="rb-big" @click="toggleMenu('symbol')"><span class="text-2xl leading-7 text-[#185abd]">Ω</span>Symbol ▾</button>
            <div v-if="menu === 'symbol'" :class="menuCls" class="p-1.5 w-56 grid grid-cols-8 gap-0.5 right-0 left-auto">
              <button v-for="c in SYMBOLS" :key="c" type="button" class="h-7 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-base" @click="chain().insertContent(c).run(); menu = null">{{ c }}</button>
            </div>
          </div>
        </RibbonGroup>
        <RibbonGroup v-if="editor.isActive('table')" label="Table Layout">
          <div class="grid grid-cols-3 gap-x-0.5">
            <button v-for="t in TABLE_TOOLS" :key="t.label" type="button" class="rb-sm" @click="(chain() as any)[t.cmd]().run()">{{ t.label }}</button>
          </div>
        </RibbonGroup>
      </template>

      <!-- Design -->
      <template v-else-if="tab === 'Design'">
        <RibbonGroup label="Document Formatting">
          <button v-for="s in STYLE_SETS" :key="s.key" type="button" class="w-[70px] h-[54px] rounded-sm border bg-white dark:bg-gray-700 p-1 text-left overflow-hidden" :class="page.styleSet === s.key ? 'border-[#185abd] ring-1 ring-[#185abd]' : 'border-gray-200 dark:border-gray-600 hover:border-gray-400'" @click="setPage('styleSet', s.key)">
            <span class="block text-[11px] font-semibold truncate" :style="{ fontFamily: s.heading, color: headingColor }">Title</span>
            <span class="block text-[8px] leading-tight text-gray-500" :style="{ fontFamily: s.body }">Heading text body text body text</span>
            <span class="block text-[9px] text-gray-500 mt-0.5">{{ s.label }}</span>
          </button>
          <div class="flex flex-col">
            <select v-model="page.colors" class="rb-select w-24" title="Colours" @change="emit('change')">
              <option v-for="c in COLOR_SETS" :key="c.key" :value="c.key">{{ c.label }}</option>
            </select>
            <select v-model="page.paraSpacing" class="rb-select w-24 mt-1" title="Paragraph Spacing" @change="emit('change')">
              <option value="compact">Compact</option><option value="normal">Default spacing</option><option value="open">Open</option><option value="double">Double</option>
            </select>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Page Background">
          <div class="relative">
            <button type="button" class="rb-big" @click="toggleMenu('watermark')"><RibbonIcon name="watermark" size="lg" class="text-[#185abd]" />Watermark ▾</button>
            <div v-if="menu === 'watermark'" :class="menuCls" class="w-44">
              <button v-for="w in ['', 'DRAFT', 'CONFIDENTIAL', 'SAMPLE', 'DO NOT COPY', 'URGENT']" :key="w" type="button" :class="menuItem" @click="setPage('watermark', w); menu = null">{{ w || 'No watermark' }}</button>
              <button type="button" :class="menuItem" @click="customWatermark">Custom…</button>
            </div>
          </div>
          <label class="rb-big relative cursor-pointer"><RibbonIcon name="pageColor" size="lg" class="text-[#185abd]" />Page<br>Color<input type="color" class="absolute inset-0 opacity-0 cursor-pointer" :value="page.pageColor || '#ffffff'" @input="setPage('pageColor', ($event.target as HTMLInputElement).value)"></label>
          <div class="relative">
            <button type="button" class="rb-big" @click="toggleMenu('border')"><RibbonIcon name="pageBorders" size="lg" class="text-[#185abd]" />Page<br>Borders ▾</button>
            <div v-if="menu === 'border'" :class="menuCls" class="w-44">
              <button v-for="b in PAGE_BORDERS" :key="b.v" type="button" :class="menuItem" @click="setPage('pageBorder', b.v); menu = null">{{ b.label }}</button>
              <label :class="menuItem" class="flex items-center gap-2">Colour <input v-model="page.borderColor" type="color" class="w-8 h-5" @input="emit('change')"></label>
            </div>
          </div>
        </RibbonGroup>
      </template>

      <!-- Layout -->
      <template v-else-if="tab === 'Layout'">
        <RibbonGroup label="Page Setup">
          <div class="relative">
            <button type="button" class="rb-big" @click="toggleMenu('margins')"><RibbonIcon name="margins" size="lg" class="text-[#185abd]" />Margins ▾</button>
            <div v-if="menu === 'margins'" :class="menuCls" class="w-52">
              <button v-for="(m, k) in MARGINS" :key="k" type="button" :class="menuItem" @click="setPage('margins', k); menu = null"><b class="capitalize">{{ k }}</b> <span class="text-gray-500">{{ m.label }}</span></button>
            </div>
          </div>
          <div class="relative">
            <button type="button" class="rb-big" @click="toggleMenu('orient')"><RibbonIcon name="orientation" size="lg" class="text-[#185abd]" />Orientation ▾</button>
            <div v-if="menu === 'orient'" :class="menuCls" class="w-36">
              <button v-for="o in ['portrait', 'landscape']" :key="o" type="button" :class="menuItem" class="capitalize" @click="setPage('orientation', o); menu = null">{{ o }}<span v-if="page.orientation === o"> ✓</span></button>
            </div>
          </div>
          <div class="relative">
            <button type="button" class="rb-big" @click="toggleMenu('size')"><RibbonIcon name="size" size="lg" class="text-[#185abd]" />Size ▾</button>
            <div v-if="menu === 'size'" :class="menuCls" class="w-40">
              <button v-for="s in Object.keys(SIZES_PX)" :key="s" type="button" :class="menuItem" @click="setPage('size', s); menu = null">{{ s }}<span v-if="page.size === s"> ✓</span></button>
            </div>
          </div>
          <div class="relative">
            <button type="button" class="rb-big" @click="toggleMenu('columns')"><RibbonIcon name="columns" size="lg" class="text-[#185abd]" />Columns ▾</button>
            <div v-if="menu === 'columns'" :class="menuCls" class="w-32">
              <button v-for="c in [1, 2, 3]" :key="c" type="button" :class="menuItem" @click="setPage('columns', c); menu = null">{{ ['One', 'Two', 'Three'][c - 1] }}<span v-if="page.columns === c"> ✓</span></button>
            </div>
          </div>
          <div class="flex flex-col">
            <div class="relative">
              <button type="button" class="rb-sm" @click="toggleMenu('breaks')"><RibbonIcon name="breaks" />Breaks ▾</button>
              <div v-if="menu === 'breaks'" :class="menuCls" class="w-40">
                <button type="button" :class="menuItem" @click="chain().insertContent({ type: 'pageBreak' }).run(); menu = null">Page</button>
                <button type="button" :class="menuItem" @click="chain().insertContent({ type: 'columnBreak' }).run(); menu = null">Column</button>
              </div>
            </div>
            <button type="button" class="rb-sm" :class="{ 'rb-on': page.lineNumbers }" @click="setPage('lineNumbers', !page.lineNumbers)"><RibbonIcon name="lineNumbers" />Line Numbers</button>
            <button type="button" class="rb-sm" :class="{ 'rb-on': page.hyphenation }" @click="setPage('hyphenation', !page.hyphenation)"><RibbonIcon name="hyphenation" />Hyphenation</button>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Paragraph">
          <div class="grid grid-cols-[auto_auto] gap-x-3 gap-y-1 text-xs items-center px-1">
            <span class="font-semibold text-gray-600 dark:text-gray-300">Indent</span><span class="font-semibold text-gray-600 dark:text-gray-300">Spacing</span>
            <label class="flex items-center gap-1"><RibbonIcon name="indent" />Left: <input type="number" step="0.1" min="0" class="rb-select w-16" :value="para.indentIn" @change="setPara('indent', Math.round(Number(($event.target as HTMLInputElement).value) * 2))">"</label>
            <label class="flex items-center gap-1"><RibbonIcon name="spacing" />Before: <input type="number" step="6" min="0" class="rb-select w-16" :value="para.before" @change="setPara('spaceBefore', Number(($event.target as HTMLInputElement).value))"> pt</label>
            <label class="flex items-center gap-1"><RibbonIcon name="outdent" />Right: <input type="number" step="0.1" min="0" class="rb-select w-16" :value="para.rightIn" @change="setPara('indentRight', Number(($event.target as HTMLInputElement).value))">"</label>
            <label class="flex items-center gap-1"><RibbonIcon name="spacing" />After: <input type="number" step="6" min="0" class="rb-select w-16" :value="para.after" @change="setPara('spaceAfter', Number(($event.target as HTMLInputElement).value))"> pt</label>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Arrange">
          <div class="relative">
            <button type="button" class="rb-big" :disabled="!imageSelected" @click="toggleMenu('wrap')"><RibbonIcon name="wrap" size="lg" class="text-[#185abd]" />Wrap<br>Text ▾</button>
            <div v-if="menu === 'wrap'" :class="menuCls" class="w-44">
              <button v-for="w in WRAPS" :key="w.v" type="button" :class="menuItem" @click="setImage('wrap', w.v); menu = null">{{ w.label }}</button>
            </div>
          </div>
          <button type="button" class="rb-big" disabled><RibbonIcon name="front" size="lg" />Bring<br>Forward</button>
          <button type="button" class="rb-big" disabled><RibbonIcon name="back" size="lg" />Send<br>Backward</button>
          <div class="flex flex-col">
            <button type="button" class="rb-sm" :disabled="!imageSelected" @click="setImage('wrap', 'center')"><RibbonIcon name="align" />Align centre</button>
            <button type="button" class="rb-sm" disabled><RibbonIcon name="group" />Group</button>
            <button type="button" class="rb-sm" :disabled="!imageSelected" @click="setImage('rotate', ((imageAttrs.rotate || 0) + 90) % 360)"><RibbonIcon name="rotate" />Rotate</button>
          </div>
        </RibbonGroup>
      </template>

      <!-- References -->
      <template v-else-if="tab === 'References'">
        <RibbonGroup label="Table of Contents">
          <button type="button" class="rb-big" @click="insertToc"><RibbonIcon name="toc" size="lg" class="text-[#185abd]" />Table of<br>Contents</button>
          <button type="button" class="rb-sm self-start mt-1" @click="insertToc"><RibbonIcon name="reset" />Update Table</button>
        </RibbonGroup>
        <RibbonGroup label="Footnotes">
          <button type="button" class="rb-big" @click="insertFootnote"><span class="text-lg leading-7 text-[#185abd] font-semibold">ab<sup>1</sup></span>Insert<br>Footnote</button>
          <button type="button" class="rb-sm self-start mt-1" @click="insertFootnote"><RibbonIcon name="footnote" />Insert Endnote</button>
        </RibbonGroup>
        <RibbonGroup label="Citations &amp; Bibliography">
          <button type="button" class="rb-big" disabled><RibbonIcon name="citation" size="lg" />Insert<br>Citation</button>
        </RibbonGroup>
        <RibbonGroup label="Captions">
          <div class="relative">
            <button type="button" class="rb-big" @click="toggleMenu('caption')"><RibbonIcon name="caption" size="lg" class="text-[#185abd]" />Insert<br>Caption ▾</button>
            <div v-if="menu === 'caption'" :class="menuCls" class="w-36">
              <button v-for="c in ['Figure', 'Table', 'Equation']" :key="c" type="button" :class="menuItem" @click="insertCaption(c)">{{ c }}</button>
            </div>
          </div>
        </RibbonGroup>
      </template>

      <!-- Mailings -->
      <template v-else-if="tab === 'Mailings'">
        <RibbonGroup label="Create">
          <button type="button" class="rb-big" @click="insertEnvelope"><RibbonIcon name="envelope" size="lg" class="text-[#185abd]" />Envelopes</button>
          <button type="button" class="rb-big" disabled><RibbonIcon name="labels" size="lg" />Labels</button>
        </RibbonGroup>
        <RibbonGroup label="Start Mail Merge">
          <button type="button" class="rb-big" :class="{ 'rb-on': page.merge.on }" @click="page.merge.on = !page.merge.on; emit('change')"><RibbonIcon name="mailMerge" size="lg" class="text-[#185abd]" />Start Mail<br>Merge</button>
          <button type="button" class="rb-big" @click="openDialog('recipients')"><RibbonIcon name="recipients" size="lg" class="text-[#185abd]" />Select<br>Recipients</button>
          <button type="button" class="rb-big" :disabled="!page.merge.rows.length" @click="openDialog('recipients')"><RibbonIcon name="design" size="lg" class="text-[#185abd]" />Edit<br>Recipient List</button>
        </RibbonGroup>
        <RibbonGroup label="Write &amp; Insert Fields">
          <button type="button" class="rb-big" :class="{ 'rb-on': highlightFields }" :disabled="!page.merge.fields.length" @click="highlightFields = !highlightFields"><RibbonIcon name="mergeField" size="lg" class="text-[#185abd]" />Highlight<br>Merge Fields</button>
          <button type="button" class="rb-big" :disabled="!page.merge.fields.length" @click="insertAddressBlock"><RibbonIcon name="envelope" size="lg" class="text-[#185abd]" />Address<br>Block</button>
          <button type="button" class="rb-big" :disabled="!page.merge.fields.length" @click="insertGreeting"><RibbonIcon name="greeting" size="lg" class="text-[#185abd]" />Greeting<br>Line</button>
          <div class="relative">
            <button type="button" class="rb-big" :disabled="!page.merge.fields.length" @click="toggleMenu('field')"><RibbonIcon name="mergeField" size="lg" class="text-[#185abd]" />Insert Merge<br>Field ▾</button>
            <div v-if="menu === 'field'" :class="menuCls" class="w-40">
              <button v-for="f in page.merge.fields" :key="f" type="button" :class="menuItem" @click="insertField(f)">{{ f }}</button>
            </div>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Preview Results">
          <button type="button" class="rb-big" :class="{ 'rb-on': preview.on }" :disabled="!page.merge.rows.length" @click="preview.on = !preview.on"><RibbonIcon name="preview" size="lg" class="text-[#185abd]" />Preview<br>Results</button>
          <div class="flex flex-col items-center gap-1 pt-1">
            <div class="flex items-center gap-0.5">
              <button type="button" class="rb-ic" :disabled="!preview.on || preview.at === 0" @click="preview.at = 0"><RibbonIcon name="prev" /><RibbonIcon name="prev" /></button>
              <button type="button" class="rb-ic" :disabled="!preview.on || preview.at === 0" @click="preview.at--"><RibbonIcon name="prev" /></button>
              <span class="w-10 h-6 text-center text-xs leading-6 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">{{ preview.on ? preview.at + 1 : '' }}</span>
              <button type="button" class="rb-ic" :disabled="!preview.on || preview.at >= page.merge.rows.length - 1" @click="preview.at++"><RibbonIcon name="next" /></button>
              <button type="button" class="rb-ic" :disabled="!preview.on || preview.at >= page.merge.rows.length - 1" @click="preview.at = page.merge.rows.length - 1"><RibbonIcon name="next" /><RibbonIcon name="next" /></button>
            </div>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Finish">
          <button type="button" class="rb-big" :disabled="!page.merge.rows.length" title="Every recipient's letter, one after another, as a .docx" @click="finishMerge"><RibbonIcon name="finish" size="lg" class="text-[#185abd]" />Finish &amp;<br>Merge</button>
        </RibbonGroup>
      </template>

      <!-- Review -->
      <template v-else-if="tab === 'Review'">
        <RibbonGroup label="Proofing">
          <button type="button" class="rb-big" :class="{ 'rb-on': spellcheck }" title="Underline spelling mistakes" @click="toggleSpellcheck"><RibbonIcon name="spelling" size="lg" class="text-[#185abd]" />Spelling &amp;<br>Grammar</button>
          <button type="button" class="rb-big" @click="openDialog('wordcount')"><RibbonIcon name="wordCount" size="lg" class="text-[#185abd]" />Word<br>Count</button>
        </RibbonGroup>
        <RibbonGroup label="Speech">
          <button type="button" class="rb-big" :class="{ 'rb-on': speaking }" @click="readAloud"><RibbonIcon name="readAloud" size="lg" class="text-[#185abd]" />{{ speaking ? 'Stop' : 'Read' }}<br>Aloud</button>
        </RibbonGroup>
        <RibbonGroup label="Comments">
          <button type="button" class="rb-big" @click="addComment"><RibbonIcon name="newComment" size="lg" class="text-[#185abd]" />New<br>Comment</button>
          <button type="button" class="rb-big" :disabled="!comments.length" @click="deleteComment"><RibbonIcon name="trash" size="lg" class="text-[#185abd]" />Delete</button>
          <div class="flex flex-col">
            <button type="button" class="rb-sm" :disabled="!comments.length" @click="gotoComment(-1)"><RibbonIcon name="prev" />Previous</button>
            <button type="button" class="rb-sm" :disabled="!comments.length" @click="gotoComment(1)"><RibbonIcon name="next" />Next</button>
            <button type="button" class="rb-sm" :class="{ 'rb-on': showComments }" @click="showComments = !showComments"><RibbonIcon name="comment" />Show Comments</button>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Tracking">
          <button type="button" class="rb-big" disabled><RibbonIcon name="track" size="lg" />Track<br>Changes</button>
        </RibbonGroup>
      </template>

      <!-- View -->
      <template v-else-if="tab === 'View'">
        <RibbonGroup label="Views">
          <button type="button" class="rb-big" :class="{ 'rb-on': viewMode === 'read' }" @click="viewMode = 'read'"><RibbonIcon name="readMode" size="lg" class="text-[#185abd]" />Read<br>Mode</button>
          <button type="button" class="rb-big" :class="{ 'rb-on': viewMode === 'print' }" @click="viewMode = 'print'"><RibbonIcon name="printLayout" size="lg" class="text-[#185abd]" />Print<br>Layout</button>
          <button type="button" class="rb-big" :class="{ 'rb-on': viewMode === 'web' }" @click="viewMode = 'web'"><RibbonIcon name="webLayout" size="lg" class="text-[#185abd]" />Web<br>Layout</button>
        </RibbonGroup>
        <RibbonGroup label="Show">
          <div class="flex flex-col">
            <label class="rb-sm cursor-pointer"><input v-model="showRuler" type="checkbox"> Ruler</label>
            <label class="rb-sm cursor-pointer"><input v-model="showNav" type="checkbox"> Navigation Pane</label>
            <label class="rb-sm cursor-pointer"><input v-model="showMarks" type="checkbox"> Formatting Marks</label>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Zoom">
          <button type="button" class="rb-big" @click="openDialog('zoom')"><RibbonIcon name="zoom" size="lg" class="text-[#185abd]" />Zoom</button>
          <button type="button" class="rb-big" @click="zoom = 100"><span class="text-base font-semibold leading-7 text-[#185abd]">100</span>100%</button>
          <div class="flex flex-col">
            <button type="button" class="rb-sm" @click="fitPage"><RibbonIcon name="onePage" />One Page</button>
            <button type="button" class="rb-sm" @click="fitWidth"><RibbonIcon name="pageWidth" />Page Width</button>
          </div>
        </RibbonGroup>
      </template>
    </OfficeRibbon>

    <!-- Find and replace -->
    <div v-if="findOpen" class="flex-shrink-0 flex flex-wrap items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 text-sm">
      <input ref="findInput" v-model="findText" class="h-7 px-2 border rounded w-44 dark:bg-gray-800" placeholder="Find" @keydown.enter.prevent="findNext">
      <template v-if="replaceMode">
        <input v-model="replaceText" class="h-7 px-2 border rounded w-44 dark:bg-gray-800" placeholder="Replace with">
        <button type="button" class="px-2 h-7 rounded border" @click="replaceOne">Replace</button>
        <button type="button" class="px-2 h-7 rounded border" @click="replaceAll">Replace All</button>
      </template>
      <button type="button" class="px-2 h-7 rounded border" @click="findNext">Find Next</button>
      <span class="text-xs text-gray-500">{{ findNote }}</span>
      <button type="button" class="ml-auto px-2 text-gray-500" @click="findOpen = false">✕</button>
    </div>

    <!-- The ruler -->
    <div v-if="showRuler && viewMode === 'print'" class="flex-shrink-0 bg-[#e6e6e6] dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 overflow-hidden">
      <div class="mx-auto h-5 relative bg-white dark:bg-gray-700" :style="{ width: `${pageSize[0] * zoom / 100}px` }">
        <div class="absolute inset-y-0 bg-[#e6e6e6] dark:bg-gray-600 left-0" :style="{ width: `${margin.side * zoom / 100}px` }"></div>
        <div class="absolute inset-y-0 bg-[#e6e6e6] dark:bg-gray-600 right-0" :style="{ width: `${margin.side * zoom / 100}px` }"></div>
        <!-- a mark every half inch from the left margin, numbered each inch -->
        <span v-for="i in Math.floor((pageSize[0] - margin.side * 2) / 48)" :key="i" class="absolute bottom-0 border-l border-gray-500" :class="i % 2 === 0 ? 'h-2.5' : 'h-1.5'" :style="{ left: `${(margin.side + i * 48) * zoom / 100}px` }">
          <span v-if="i % 2 === 0" class="absolute -top-2.5 -left-1 text-[8px] text-gray-600">{{ i / 2 }}</span>
        </span>
      </div>
    </div>

    <div class="flex-1 min-h-0 flex">
      <!-- Navigation pane: the headings -->
      <aside v-if="showNav" class="w-52 flex-shrink-0 overflow-y-auto border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 text-sm">
        <p class="font-semibold text-gray-700 dark:text-gray-200 mb-1">Navigation</p>
        <p v-if="!headings.length" class="text-xs text-gray-500">Use the Heading styles and your headings show here.</p>
        <button v-for="h in headings" :key="h.pos" type="button" class="block w-full text-left truncate rounded px-1.5 py-0.5 hover:bg-blue-50 dark:hover:bg-gray-800" :class="h.level === 2 ? 'pl-4 text-xs' : 'font-medium'" @click="jumpTo(h.pos)">{{ h.text }}</button>
      </aside>

      <div ref="desk" class="flex-1 min-w-0 overflow-auto bg-[#e6e6e6] dark:bg-gray-800 py-6 px-2" :class="{ 'is-painting': painter, 'bg-white dark:bg-gray-900 py-2': viewMode === 'web' }">
        <div
          ref="pageEl"
          class="word-page mx-auto text-gray-900 relative"
          :class="pageClasses"
          :style="pageStyle"
        >
          <!-- Header -->
          <div v-if="page.header || editingHF === 'header'" class="word-hf word-hf-top" :class="{ 'is-editing': editingHF === 'header' }">
            <input v-if="editingHF === 'header'" ref="hfInput" v-model="page.header" class="w-full bg-transparent outline-none text-center" placeholder="Type the header" @change="emit('change')" @blur="editingHF = null" @keydown.enter="editingHF = null">
            <span v-else class="block text-center cursor-text" @dblclick="!readonly && editHeader('header')">{{ page.header }}</span>
          </div>
          <div v-if="page.watermark" class="word-watermark" aria-hidden="true">{{ page.watermark }}</div>
          <EditorContent v-if="editor" :editor="editor" />
          <!-- Footer -->
          <div v-if="page.footer || page.pageNumbers || editingHF === 'footer'" class="word-hf word-hf-bottom" :class="{ 'is-editing': editingHF === 'footer' }">
            <input v-if="editingHF === 'footer'" ref="hfInput" v-model="page.footer" class="w-full bg-transparent outline-none text-center" placeholder="Type the footer" @change="emit('change')" @blur="editingHF = null" @keydown.enter="editingHF = null">
            <span v-else class="flex items-center gap-2 cursor-text" :class="page.pageNumbers === 'right' ? 'justify-between' : 'justify-center'" @dblclick="!readonly && editHeader('footer')">
              <span>{{ page.footer }}</span>
              <span v-if="page.pageNumbers">{{ page.pageNumbers === 'pageof' ? `Page 1 of ${pages}` : '1' }}</span>
            </span>
          </div>
        </div>
      </div>

      <!-- Comments -->
      <aside v-if="showComments && comments.length" class="w-60 flex-shrink-0 overflow-y-auto border-l border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 space-y-2">
        <p class="text-sm font-semibold text-gray-700 dark:text-gray-200">Comments</p>
        <button v-for="(c, i) in comments" :key="i" type="button" class="block w-full text-left rounded border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 p-2 text-xs" @click="jumpTo(c.pos)">
          <span class="block font-semibold text-gray-700 dark:text-gray-200 truncate">“{{ c.quote }}”</span>
          <span class="block text-gray-600 dark:text-gray-300 mt-0.5">{{ c.text }}</span>
        </button>
      </aside>
    </div>

    <footer class="flex-shrink-0 flex items-center gap-4 px-3 py-1 text-[11px] text-white bg-[#185abd]">
      <span>Page 1 of {{ pages }}</span>
      <button type="button" class="hover:underline" @click="openDialog('wordcount')">{{ stats.words }} {{ stats.words === 1 ? 'word' : 'words' }}</button>
      <span v-if="preview.on">Previewing recipient {{ preview.at + 1 }} of {{ page.merge.rows.length }}</span>
      <span class="ml-auto flex items-center gap-2">
        <button type="button" class="px-1" @click="zoom = Math.max(30, zoom - 10)">−</button>
        <input v-model.number="zoom" type="range" min="30" max="200" step="10" class="w-24 accent-white">
        <button type="button" class="px-1" @click="zoom = Math.min(200, zoom + 10)">+</button>
        <span class="w-9 text-right">{{ zoom }}%</span>
      </span>
    </footer>

    <!-- Dialogs -->
    <div v-if="dialog" class="absolute inset-0 z-40 flex items-center justify-center bg-black/30 p-4" @click.self="dialog = null">
      <div class="w-full max-w-lg rounded-lg bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          <p class="text-sm font-semibold">{{ DIALOG_TITLES[dialog] }}</p>
          <button type="button" class="text-gray-500" @click="dialog = null">✕</button>
        </div>
        <div class="p-4 text-sm space-y-3">
          <!-- Word Count -->
          <table v-if="dialog === 'wordcount'" class="w-full">
            <tbody>
              <tr v-for="r in [['Pages', pages], ['Words', stats.words], ['Characters (no spaces)', stats.charsNoSpace], ['Characters (with spaces)', stats.chars], ['Paragraphs', stats.paragraphs]]" :key="r[0]" class="border-b border-gray-100 dark:border-gray-700"><td class="py-1">{{ r[0] }}</td><td class="text-right font-semibold tabular-nums">{{ r[1] }}</td></tr>
            </tbody>
          </table>
          <!-- Zoom -->
          <div v-else-if="dialog === 'zoom'" class="grid grid-cols-3 gap-2">
            <button v-for="z in [50, 75, 100, 125, 150, 200]" :key="z" type="button" class="px-3 py-2 rounded border" :class="zoom === z ? 'border-[#185abd] bg-blue-50 dark:bg-blue-900/30' : 'border-gray-300 dark:border-gray-600'" @click="zoom = z; dialog = null">{{ z }}%</button>
          </div>
          <!-- Chart -->
          <template v-else-if="dialog === 'chart'">
            <div class="flex gap-2">
              <button v-for="t in ['bar', 'line', 'pie']" :key="t" type="button" class="px-3 py-1.5 rounded border capitalize" :class="chartForm.type === t ? 'border-[#185abd] bg-blue-50 dark:bg-blue-900/30' : 'border-gray-300 dark:border-gray-600'" @click="chartForm.type = t">{{ t === 'bar' ? 'Column' : t }}</button>
            </div>
            <label class="block">Chart title <input v-model="chartForm.title" class="mt-1 w-full px-2 py-1 border rounded dark:bg-gray-700"></label>
            <label class="block">Categories (separated by commas) <input v-model="chartForm.labels" class="mt-1 w-full px-2 py-1 border rounded dark:bg-gray-700" placeholder="Term 1, Term 2, Term 3"></label>
            <label class="block">Values (separated by commas) <input v-model="chartForm.values" class="mt-1 w-full px-2 py-1 border rounded dark:bg-gray-700" placeholder="45, 60, 72"></label>
            <div class="flex justify-end"><button type="button" class="px-4 py-1.5 rounded bg-[#185abd] text-white" @click="insertChart">Insert</button></div>
          </template>
          <!-- Equation -->
          <template v-else-if="dialog === 'equation'">
            <div class="flex flex-wrap gap-1">
              <button v-for="e in EQUATION_PARTS" :key="e.label" type="button" class="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 text-xs" @click="eqText += e.tex">{{ e.label }}</button>
            </div>
            <input v-model="eqText" class="w-full px-2 py-1 border rounded font-mono dark:bg-gray-700" placeholder="x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}">
            <div ref="eqPreview" class="min-h-[48px] flex items-center justify-center rounded bg-gray-50 dark:bg-gray-700 p-2 text-lg" v-html="eqHtml"></div>
            <div class="flex justify-end"><button type="button" class="px-4 py-1.5 rounded bg-[#185abd] text-white" :disabled="!eqText.trim()" @click="insertEquation">Insert</button></div>
          </template>
          <!-- Mail merge recipients -->
          <template v-else-if="dialog === 'recipients'">
            <p class="text-xs text-gray-500">Type a New List: one row per person. The columns are the merge fields.</p>
            <div class="overflow-auto max-h-72">
              <table class="text-xs border border-gray-300 dark:border-gray-600">
                <thead>
                  <tr>
                    <th v-for="(_f, fi) in mergeDraft.fields" :key="fi" class="p-0.5 border-r border-gray-200 dark:border-gray-600"><input v-model="mergeDraft.fields[fi]" class="w-24 px-1 py-0.5 font-semibold bg-gray-100 dark:bg-gray-700 rounded"></th>
                    <th><button type="button" class="px-1 text-[#185abd]" title="Add a column" @click="mergeDraft.fields.push(`Field${mergeDraft.fields.length + 1}`)">＋</button></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(r, ri) in mergeDraft.rows" :key="ri" class="border-t border-gray-200 dark:border-gray-600">
                    <td v-for="(_f, fi) in mergeDraft.fields" :key="fi" class="p-0.5"><input v-model="r[fi]" class="w-24 px-1 py-0.5 border border-gray-200 dark:border-gray-600 rounded dark:bg-gray-800"></td>
                    <td><button type="button" class="px-1 text-gray-400 hover:text-rose-600" @click="mergeDraft.rows.splice(ri, 1)">✕</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="flex justify-between">
              <button type="button" class="px-3 py-1.5 rounded border" @click="mergeDraft.rows.push(mergeDraft.fields.map(() => ''))">New Entry</button>
              <button type="button" class="px-4 py-1.5 rounded bg-[#185abd] text-white" @click="saveRecipients">OK</button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, shallowRef, watch } from 'vue'
import { Editor, EditorContent, Extension, Mark, Node, mergeAttributes } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import FontFamily from '@tiptap/extension-font-family'
import Highlight from '@tiptap/extension-highlight'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableHeader from '@tiptap/extension-table-header'
import TableCell from '@tiptap/extension-table-cell'
import { useToastStore } from '@/stores/toast'
import OfficeRibbon from './ribbon/OfficeRibbon.vue'
import RibbonGroup from './ribbon/RibbonGroup.vue'
import RibbonIcon from './ribbon/RibbonIcon.vue'
import { downloadBlob } from './apps'

const props = defineProps<{ initial: ArrayBuffer | null; readonly: boolean; showTools?: boolean; markable?: boolean }>()
const emit = defineEmits<{ change: []; ready: []; download: [] }>()
const toast = useToastStore()

const TABS = ['File', 'Home', 'Insert', 'Design', 'Layout', 'References', 'Mailings', 'Review', 'View']
const tab = ref('Home')
const FONTS = ['Calibri', 'Calibri Light', 'Arial', 'Arial Black', 'Times New Roman', 'Cambria', 'Georgia', 'Garamond', 'Verdana', 'Tahoma', 'Century Gothic', 'Trebuchet MS', 'Courier New', 'Comic Sans MS', 'Impact']
const SIZES = ['8', '9', '10', '10.5', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '36', '48', '72']
const LINE_HEIGHTS = ['1.0', '1.15', '1.5', '2.0', '2.5', '3.0']
const ALIGNS = [
  { v: 'left', t: 'Align Left (Ctrl+L)', icon: 'alignLeft' },
  { v: 'center', t: 'Center (Ctrl+E)', icon: 'alignCenter' },
  { v: 'right', t: 'Align Right (Ctrl+R)', icon: 'alignRight' },
  { v: 'justify', t: 'Justify (Ctrl+J)', icon: 'justify' }
]
const STYLES = [
  { key: 'p', label: 'Normal', css: { fontSize: '12px' } },
  { key: 'nospacing', label: 'No Spacing', css: { fontSize: '12px' } },
  { key: 'h1', label: 'Heading 1', css: { fontSize: '15px', color: '#2f5496' } },
  { key: 'h2', label: 'Heading 2', css: { fontSize: '13px', color: '#2f5496' } },
  { key: 'title', label: 'Title', css: { fontSize: '17px', fontFamily: 'Calibri Light, Calibri' } },
  { key: 'subtitle', label: 'Subtitle', css: { fontSize: '12px', color: '#595959', letterSpacing: '1px' } },
  { key: 'emphasis', label: 'Subtle Emphasis', css: { fontSize: '12px', fontStyle: 'italic', color: '#404040' } },
  { key: 'quote', label: 'Quote', css: { fontSize: '12px', fontStyle: 'italic', color: '#404040' } },
  { key: 'strong', label: 'Strong', css: { fontSize: '12px', fontWeight: 700 } }
]
const TABLE_TOOLS = [
  { label: 'Row above', cmd: 'addRowBefore' }, { label: 'Row below', cmd: 'addRowAfter' }, { label: 'Delete row', cmd: 'deleteRow' },
  { label: 'Column left', cmd: 'addColumnBefore' }, { label: 'Column right', cmd: 'addColumnAfter' }, { label: 'Delete column', cmd: 'deleteColumn' },
  { label: 'Merge cells', cmd: 'mergeCells' }, { label: 'Split cell', cmd: 'splitCell' }, { label: 'Delete table', cmd: 'deleteTable' }
]
const SYMBOLS = ['©', '®', '™', '°', '±', '×', '÷', '≠', '≤', '≥', '≈', '∞', '√', 'π', 'Ω', 'µ', '€', '£', '¥', '¢', '§', '¶', '•', '…', '←', '→', '↑', '↓', '½', '¼', '¾', '²', '³', '✓', '✗', '★', 'α', 'β', 'θ', 'Δ']
const SHAPES = [
  { key: 'rect', label: 'Rectangle', icon: 'M3 5h14v10H3z' },
  { key: 'round', label: 'Rounded Rectangle', icon: 'M6 5h8a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3z' },
  { key: 'oval', label: 'Oval', icon: 'M10 4a7 6 0 1 0 0 12a7 6 0 1 0 0-12z' },
  { key: 'triangle', label: 'Triangle', icon: 'M10 3 18 17H2z' },
  { key: 'arrow', label: 'Right Arrow', icon: 'M2 7h10V3l6 7-6 7v-4H2z' },
  { key: 'star', label: 'Star', icon: 'M10 2l2.4 5.2 5.6.6-4.2 3.8 1.2 5.6L10 14.4 5 17.2l1.2-5.6L2 7.8l5.6-.6z' },
  { key: 'diamond', label: 'Diamond', icon: 'M10 2 18 10 10 18 2 10z' },
  { key: 'line', label: 'Line', icon: 'M2 16 18 4' },
  { key: 'heart', label: 'Heart', icon: 'M10 17s-7-4.4-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 17 8c0 4.6-7 9-7 9z' },
  { key: 'callout', label: 'Callout', icon: 'M3 3h14v10H9l-4 4v-4H3z' },
  { key: 'pentagon', label: 'Pentagon', icon: 'M10 2l8 6-3 10H5L2 8z' },
  { key: 'cross', label: 'Plus', icon: 'M7 2h6v5h5v6h-5v5H7v-5H2V7h5z' }
]
const WORDART = [
  { key: 'wa1', css: { color: '#2f5496', textShadow: '2px 2px 2px rgba(0,0,0,.35)' } },
  { key: 'wa2', css: { color: '#fff', WebkitTextStroke: '1px #c55a11', textShadow: '0 0 1px #c55a11' } },
  { key: 'wa3', css: { background: 'linear-gradient(#ffd54f, #ef6c00)', WebkitBackgroundClip: 'text', color: 'transparent' } },
  { key: 'wa4', css: { color: '#548235', textShadow: '3px 3px 0 #c5e0b4' } }
]
const COVERS = [{ key: 'simple', label: 'Simple' }, { key: 'banded', label: 'Banded' }, { key: 'report', label: 'School report' }]
const PAGE_NUMBERS = [{ v: '', label: 'No page numbers' }, { v: 'center', label: 'Bottom of page, centre' }, { v: 'right', label: 'Bottom of page, right' }, { v: 'pageof', label: 'Page X of Y' }]
const STYLE_SETS = [
  { key: 'default', label: 'Default', heading: 'Calibri Light', body: 'Calibri' },
  { key: 'classic', label: 'Classic', heading: 'Cambria', body: 'Times New Roman' },
  { key: 'modern', label: 'Modern', heading: 'Century Gothic', body: 'Century Gothic' },
  { key: 'elegant', label: 'Elegant', heading: 'Georgia', body: 'Garamond' },
  { key: 'simple', label: 'Simple', heading: 'Arial', body: 'Arial' }
]
const COLOR_SETS = [
  { key: 'blue', label: 'Blue', c: '#2f5496' }, { key: 'green', label: 'Green', c: '#538135' }, { key: 'orange', label: 'Orange', c: '#c55a11' },
  { key: 'red', label: 'Red', c: '#c00000' }, { key: 'purple', label: 'Purple', c: '#7030a0' }, { key: 'grey', label: 'Greyscale', c: '#404040' }
]
const PAGE_BORDERS = [{ v: '', label: 'None' }, { v: 'box', label: 'Box' }, { v: 'double', label: 'Double' }, { v: 'thick', label: 'Thick' }, { v: 'shadow', label: 'Shadow' }]
const MARGINS: Record<string, { top: number; side: number; label: string }> = {
  normal: { top: 96, side: 96, label: '1" all round' },
  narrow: { top: 48, side: 48, label: '0.5" all round' },
  moderate: { top: 96, side: 72, label: '1" top, 0.75" sides' },
  wide: { top: 96, side: 192, label: '1" top, 2" sides' }
}
const SIZES_PX: Record<string, [number, number]> = { A4: [794, 1123], Letter: [816, 1056], A5: [559, 794], Legal: [816, 1344] }
const WRAPS = [{ v: 'inline', label: 'In Line with Text' }, { v: 'left', label: 'Square, left' }, { v: 'right', label: 'Square, right' }, { v: 'center', label: 'Top and Bottom' }]
const EQUATION_PARTS = [
  { label: 'a/b', tex: '\\frac{a}{b}' }, { label: '√x', tex: '\\sqrt{x}' }, { label: 'xⁿ', tex: 'x^{n}' }, { label: 'xₙ', tex: 'x_{n}' },
  { label: '∑', tex: '\\sum_{i=1}^{n}' }, { label: '∫', tex: '\\int_{a}^{b}' }, { label: 'π', tex: '\\pi' }, { label: '±', tex: '\\pm' },
  { label: '×', tex: '\\times' }, { label: '÷', tex: '\\div' }, { label: '≤', tex: '\\le' }, { label: '≥', tex: '\\ge' }, { label: 'θ', tex: '\\theta' }, { label: '°', tex: '^{\\circ}' }
]
const DIALOG_TITLES: Record<string, string> = { wordcount: 'Word Count', zoom: 'Zoom', chart: 'Insert Chart', equation: 'Insert Equation', recipients: 'Mail Merge Recipients' }
const menuCls = 'absolute z-30 top-full left-0 mt-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg py-1 text-left'
const menuItem = 'block w-full text-left px-3 py-1 text-xs hover:bg-blue-50 dark:hover:bg-gray-700'

// ---- Word's extras on top of TipTap ----
const FontSize = Extension.create({
  name: 'fontSize',
  addGlobalAttributes() {
    return [{ types: ['textStyle'], attributes: { fontSize: { default: null, parseHTML: el => (el as HTMLElement).style.fontSize || null, renderHTML: a => (a.fontSize ? { style: `font-size: ${a.fontSize}` } : {}) } } }]
  }
})
// a paragraph's look: line spacing, indents, spacing before/after, shading, borders, and the
// Word styles drawn by class (Title, Subtitle, Text Box, WordArt, Drop Cap, captions, contents ...)
const ParagraphLook = Extension.create({
  name: 'paragraphLook',
  addGlobalAttributes() {
    const num = (el: HTMLElement, prop: string, per = 1) => Math.round((parseFloat((el.style as any)[prop] || '0') || 0) / per * 10) / 10 || null
    return [{
      types: ['paragraph', 'heading'],
      attributes: {
        lineHeight: { default: null, parseHTML: el => (el as HTMLElement).style.lineHeight || null, renderHTML: a => (a.lineHeight ? { style: `line-height: ${a.lineHeight}` } : {}) },
        indent: { default: 0, parseHTML: el => Math.round(parseFloat((el as HTMLElement).style.marginLeft || '0') / 36) || 0, renderHTML: a => (a.indent ? { style: `margin-left: ${a.indent * 36}pt` } : {}) },
        indentRight: { default: null, parseHTML: el => num(el as HTMLElement, 'marginRight', 72), renderHTML: a => (a.indentRight ? { style: `margin-right: ${a.indentRight}in` } : {}) },
        spaceBefore: { default: null, parseHTML: el => num(el as HTMLElement, 'marginTop'), renderHTML: a => (a.spaceBefore !== null && a.spaceBefore !== undefined ? { style: `margin-top: ${a.spaceBefore}pt` } : {}) },
        spaceAfter: { default: null, parseHTML: el => num(el as HTMLElement, 'marginBottom'), renderHTML: a => (a.spaceAfter !== null && a.spaceAfter !== undefined ? { style: `margin-bottom: ${a.spaceAfter}pt` } : {}) },
        shading: { default: null, parseHTML: el => (el as HTMLElement).getAttribute('data-shading'), renderHTML: a => (a.shading ? { 'data-shading': a.shading, style: `background-color: ${a.shading}` } : {}) },
        border: { default: null, parseHTML: el => (el as HTMLElement).getAttribute('data-border'), renderHTML: a => (a.border ? { 'data-border': a.border, style: a.border === 'box' ? 'border: 1px solid #000; padding: 2pt 4pt' : `border-${a.border}: 1px solid #000; padding-${a.border}: 2pt` } : {}) },
        docStyle: { default: null, parseHTML: el => (el as HTMLElement).getAttribute('data-style'), renderHTML: a => (a.docStyle ? { 'data-style': a.docStyle, class: `doc-${a.docStyle}` } : {}) },
        bookmark: { default: null, parseHTML: el => (el as HTMLElement).getAttribute('id'), renderHTML: a => (a.bookmark ? { id: a.bookmark } : {}) }
      }
    }]
  }
})
const PageBreak = Node.create({
  name: 'pageBreak', group: 'block', atom: true,
  parseHTML: () => [{ tag: 'div.page-break' }],
  renderHTML: () => ['div', { class: 'page-break', style: 'page-break-after: always' }]
})
const ColumnBreak = Node.create({
  name: 'columnBreak', group: 'block', atom: true,
  parseHTML: () => [{ tag: 'div.column-break' }],
  renderHTML: () => ['div', { class: 'column-break', style: 'break-after: column' }]
})
// a comment on some text (Review > New Comment)
const Comment = Mark.create({
  name: 'comment',
  addAttributes: () => ({ text: { default: '', parseHTML: el => (el as HTMLElement).getAttribute('data-comment') } }),
  parseHTML: () => [{ tag: 'span.doc-comment' }],
  renderHTML: ({ HTMLAttributes }) => ['span', { class: 'doc-comment', 'data-comment': HTMLAttributes.text, title: HTMLAttributes.text }, 0]
})
// a picture, with Wrap Text and Rotate
const WordImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      wrap: { default: 'inline', parseHTML: el => (el as HTMLElement).getAttribute('data-wrap') || 'inline', renderHTML: a => ({ 'data-wrap': a.wrap }) },
      rotate: { default: 0, parseHTML: el => Number((el as HTMLElement).getAttribute('data-rotate') || 0), renderHTML: a => (a.rotate ? { 'data-rotate': a.rotate, style: `transform: rotate(${a.rotate}deg)` } : {}) },
      width: { default: null, parseHTML: el => (el as HTMLElement).getAttribute('width'), renderHTML: a => (a.width ? { width: a.width } : {}) }
    }
  }
})
// mail merge: «Field», filled in from the recipient being previewed
const preview = reactive({ on: false, at: 0 })
const mergeSpans = new Set<{ el: HTMLElement; name: string }>()
const MergeField = Node.create({
  name: 'mergeField', group: 'inline', inline: true, atom: true,
  addAttributes: () => ({ name: { default: '', parseHTML: el => (el as HTMLElement).getAttribute('data-field') } }),
  parseHTML: () => [{ tag: 'span.merge-field' }],
  renderHTML: ({ node, HTMLAttributes }) => ['span', mergeAttributes(HTMLAttributes, { class: 'merge-field', 'data-field': node.attrs.name }), `«${node.attrs.name}»`],
  addNodeView: () => ({ node }) => {
    const el = document.createElement('span')
    el.className = 'merge-field'
    const entry = { el, name: node.attrs.name as string }
    mergeSpans.add(entry)
    paintField(entry)
    return { dom: el, destroy: () => mergeSpans.delete(entry) }
  }
})

const editor = shallowRef<Editor | null>(null)
const tick = ref(0)
const page = reactive({
  margins: 'normal', orientation: 'portrait', size: 'A4', columns: 1, lineNumbers: false, hyphenation: false,
  header: '', footer: '', pageNumbers: '', watermark: '', pageColor: '', pageBorder: '', borderColor: '#000000',
  styleSet: 'default', colors: 'blue', paraSpacing: 'normal',
  merge: { on: false, fields: [] as string[], rows: [] as string[][] }
})
const zoom = ref(100)
const viewMode = ref<'print' | 'web' | 'read'>('print')
const showMarks = ref(false)
const showRuler = ref(true)
const showNav = ref(false)
const showComments = ref(true)
const highlightFields = ref(true)
const spellcheck = ref(false)
const menu = ref<string | null>(null)
const pick = ref<[number, number]>([0, 0])
const dialog = ref<string | null>(null)
const desk = ref<HTMLElement | null>(null)
const toggleMenu = (m: string) => { menu.value = menu.value === m ? null : m }
const openDialog = (d: string) => {
  menu.value = null
  if (d === 'recipients') {
    mergeDraft.fields = page.merge.fields.length ? [...page.merge.fields] : ['Title', 'First Name', 'Last Name', 'Address', 'City']
    mergeDraft.rows = page.merge.rows.length ? page.merge.rows.map(r => [...r]) : [mergeDraft.fields.map(() => '')]
  }
  dialog.value = d
}
const setPage = (k: string, v: unknown) => { (page as any)[k] = v; emit('change') }

const bodyOf = (html: string) => {
  const m = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)
  return (m ? m[1] : html).trim()
}
const readPage = (html: string) => {
  const m = html.match(/<meta name="tusome-page" content="([^"]*)"/)
  if (!m) return
  try {
    const saved = JSON.parse(m[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&'))
    Object.assign(page, { ...saved, merge: { on: false, fields: [], rows: [], ...(saved.merge || {}) } })
  } catch { /* the defaults */ }
}

onMounted(() => {
  const html = props.initial ? new TextDecoder().decode(props.initial) : ''
  readPage(html)
  editor.value = new Editor({
    editable: !props.readonly,
    content: bodyOf(html) || '<p></p>',
    extensions: [
      StarterKit, Underline, TextStyle, FontSize, ParagraphLook, PageBreak, ColumnBreak, Comment, MergeField, Color, FontFamily,
      Highlight.configure({ multicolor: true }), Subscript, Superscript,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      WordImage.configure({ inline: false, allowBase64: true }),
      Link.configure({ openOnClick: false }),
      Table.configure({ resizable: !props.readonly }), TableRow, TableHeader, TableCell
    ],
    editorProps: { attributes: { spellcheck: 'false' } },
    onUpdate: () => { tick.value++; emit('change') },
    onSelectionUpdate: () => { tick.value++; applyPainter() }
  })
  window.addEventListener('keydown', onKey)
  document.addEventListener('mousedown', closeMenus)
  emit('ready')
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  document.removeEventListener('mousedown', closeMenus)
  if (speaking.value) speechSynthesis.cancel()
  editor.value?.destroy()
})
const closeMenus = (e: MouseEvent) => {
  if (menu.value && !(e.target as HTMLElement).closest('.office-ribbon .relative')) menu.value = null
}

const onKey = (e: KeyboardEvent) => {
  if (!(e.ctrlKey || e.metaKey) || props.readonly) return
  if (e.key === 'f' || e.key === 'h') { e.preventDefault(); openFind(e.key === 'h') }
  else if (['l', 'e', 'r', 'j'].includes(e.key)) {
    if (!editor.value?.isFocused) return
    e.preventDefault()
    editor.value.chain().focus().setTextAlign(({ l: 'left', e: 'center', r: 'right', j: 'justify' } as Record<string, string>)[e.key]).run()
  }
}

// ---- what is selected, for the ribbon ----
const chain = () => editor.value!.chain().focus()
const attr = (k: string) => { void tick.value; return editor.value?.getAttributes('textStyle')[k] as string | undefined }
const fontFamily = computed(() => (attr('fontFamily') || STYLE_SETS.find(s => s.key === page.styleSet)?.body || 'Calibri').replace(/["']/g, ''))
const fontSize = computed(() => String(parseFloat(attr('fontSize') || '11')))
const textColor = computed(() => attr('color') || '#000000')
const highlight = computed(() => { void tick.value; return (editor.value?.getAttributes('highlight').color as string) || '#ffff00' })
const paraAttrs = () => {
  const e = editor.value
  if (!e) return {} as Record<string, any>
  return e.isActive('heading') ? e.getAttributes('heading') : e.getAttributes('paragraph')
}
const para = computed(() => {
  void tick.value
  const a = paraAttrs()
  return {
    lineHeight: a.lineHeight || '1.15', shading: a.shading || null, border: a.border || null,
    indentIn: (Number(a.indent || 0) / 2), rightIn: a.indentRight || 0,
    before: a.spaceBefore ?? 0, after: a.spaceAfter ?? 8
  }
})
const setPara = (k: string, v: unknown) => chain().updateAttributes('paragraph', { [k]: v }).updateAttributes('heading', { [k]: v }).run()
const blockStyle = computed(() => {
  void tick.value
  const e = editor.value
  if (!e) return 'p'
  if (e.isActive('heading', { level: 1 })) return 'h1'
  if (e.isActive('heading', { level: 2 })) return 'h2'
  if (e.isActive('blockquote')) return 'quote'
  return paraAttrs().docStyle || 'p'
})
const imageSelected = computed(() => { void tick.value; return !!editor.value?.isActive('image') })
const imageAttrs = computed(() => { void tick.value; return editor.value?.getAttributes('image') || {} })
const setImage = (k: string, v: unknown) => chain().updateAttributes('image', { [k]: v }).run()

// ---- Home ----
const setFont = (f: string) => chain().setFontFamily(f).run()
const setSize = (s: string) => chain().setMark('textStyle', { fontSize: `${s}pt` }).run()
const stepSize = (d: number) => {
  const cur = parseFloat(fontSize.value)
  const nums = SIZES.map(Number)
  setSize(String(d > 0 ? nums.find(n => n > cur) ?? cur + 4 : [...nums].reverse().find(n => n < cur) ?? Math.max(1, cur - 1)))
}
const setColor = (c: string) => chain().setColor(c).run()
const setHighlight = (c: string) => chain().setHighlight({ color: c }).run()
const indent = (d: number) => {
  if (editor.value!.isActive('listItem')) {
    if (d > 0) chain().sinkListItem('listItem').run()
    else chain().liftListItem('listItem').run()
    return
  }
  setPara('indent', Math.max(0, Math.min(10, Number(paraAttrs().indent || 0) + d)))
}
const applyStyle = (key: string) => {
  if (key === 'strong') { chain().toggleBold().run(); return }
  if (key === 'emphasis') { chain().toggleItalic().run(); return }
  if (key === 'h1' || key === 'h2') { chain().setHeading({ level: key === 'h1' ? 1 : 2 }).run(); return }
  if (key === 'quote') { chain().setParagraph().toggleBlockquote().run(); return }
  chain().setParagraph().run()
  if (editor.value!.isActive('blockquote')) chain().lift('blockquote').run()
  chain().updateAttributes('paragraph', { docStyle: key === 'p' ? null : key }).run()
}
const replaceSelectionText = (fn: (t: string) => string) => {
  const e = editor.value!
  const { from, to } = e.state.selection
  if (from === to) return
  const out = fn(e.state.doc.textBetween(from, to, '\n'))
  e.chain().focus().command(({ tr }) => { tr.insertText(out, from, to); return true }).setTextSelection({ from, to: from + out.length }).run()
}
const changeCase = (sel: HTMLSelectElement) => {
  const how = sel.value
  sel.value = ''
  replaceSelectionText(text => how === 'upper' ? text.toUpperCase()
    : how === 'lower' ? text.toLowerCase()
    : how === 'title' ? text.toLowerCase().replace(/\b\p{L}/gu, c => c.toUpperCase())
    : how === 'toggle' ? [...text].map(c => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase())).join('')
    : text.toLowerCase().replace(/(^\s*\p{L}|[.!?]\s+\p{L})/gu, c => c.toUpperCase()))
}
// Sort: the selected paragraphs, A to Z
const sortParagraphs = () => {
  const e = editor.value!
  const { from, to } = e.state.selection
  const blocks: { pos: number; node: any }[] = []
  e.state.doc.nodesBetween(from, to, (node, pos) => {
    if (node.type.name === 'paragraph') { blocks.push({ pos, node }); return false }
    return true
  })
  if (blocks.length < 2) { toast.info('Select the paragraphs to sort'); return }
  const sorted = [...blocks].sort((a, b) => a.node.textContent.localeCompare(b.node.textContent, undefined, { numeric: true }))
  const start = blocks[0].pos
  const end = blocks[blocks.length - 1].pos + blocks[blocks.length - 1].node.nodeSize
  e.chain().focus().command(({ tr }) => { tr.replaceWith(start, end, sorted.map(b => b.node)); return true }).run()
}
const clip = (what: 'cut' | 'copy') => {
  editor.value?.commands.focus()
  if (!document.execCommand(what)) toast.info(`Use Ctrl+${what === 'cut' ? 'X' : 'C'}`)
}
const paste = async () => {
  try {
    const text = await navigator.clipboard.readText()
    chain().insertContent(text.replace(/\n/g, '<br>')).run()
  } catch {
    toast.info('Press Ctrl+V to paste')
  }
}
const painter = ref<{ marks: { type: string; attrs: Record<string, any> }[] } | null>(null)
const startPainter = () => {
  painter.value = { marks: (editor.value!.state.selection.$from.marks() || []).map(m => ({ type: m.type.name, attrs: { ...m.attrs } })) }
  toast.info('Now select the text to give that look to')
}
const applyPainter = () => {
  const p = painter.value
  const e = editor.value
  if (!p || !e || e.state.selection.empty) return
  painter.value = null
  let c = e.chain().focus().unsetAllMarks()
  for (const m of p.marks) c = c.setMark(m.type, m.attrs)
  c.run()
}

// ---- Find and Replace ----
const findOpen = ref(false)
const replaceMode = ref(false)
const findText = ref('')
const replaceText = ref('')
const findNote = ref('')
const findInput = ref<HTMLInputElement | null>(null)
const openFind = async (replace: boolean) => {
  findOpen.value = true
  replaceMode.value = replace
  findNote.value = ''
  await nextTick()
  findInput.value?.focus()
}
const matches = () => {
  const q = findText.value.toLowerCase()
  const out: { from: number; to: number }[] = []
  if (!q) return out
  editor.value!.state.doc.descendants((node, pos) => {
    if (!node.isText) return
    const t = node.text!.toLowerCase()
    let i = t.indexOf(q)
    while (i >= 0) { out.push({ from: pos + i, to: pos + i + q.length }); i = t.indexOf(q, i + q.length) }
  })
  return out
}
const findNext = () => {
  const all = matches()
  if (!all.length) { findNote.value = 'Not found'; return }
  const after = editor.value!.state.selection.to
  const m = all.find(x => x.from >= after) || all[0]
  editor.value!.chain().setTextSelection(m).scrollIntoView().run()
  findNote.value = `${all.findIndex(x => x.from === m.from) + 1} of ${all.length}`
}
const replaceOne = () => {
  const e = editor.value!
  const { from, to } = e.state.selection
  if (from !== to && e.state.doc.textBetween(from, to).toLowerCase() === findText.value.toLowerCase()) {
    e.chain().command(({ tr }) => { tr.insertText(replaceText.value, from, to); return true }).run()
  }
  findNext()
}
const replaceAll = () => {
  const all = matches()
  if (!all.length) { findNote.value = 'Not found'; return }
  editor.value!.chain().command(({ tr }) => { for (const m of [...all].reverse()) tr.insertText(replaceText.value, m.from, m.to); return true }).run()
  findNote.value = `Replaced ${all.length}`
}

// ---- Insert ----
const insertTable = (rows: number, cols: number) => {
  menu.value = null
  chain().insertTable({ rows, cols, withHeaderRow: false }).run()
}
const insertImageSrc = (src: string, width?: number) => chain().setImage({ src, ...(width ? { width } : {}) } as any).run()
const insertImage = (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => insertImageSrc(String(reader.result))
  reader.readAsDataURL(file)
}
// a shape is drawn as a picture
const shapeColor = ref('#4472c4')
const insertShape = (key: string) => {
  menu.value = null
  const s = SHAPES.find(x => x.key === key)!
  const cv = document.createElement('canvas')
  cv.width = 240; cv.height = 240
  const ctx = cv.getContext('2d')!
  ctx.scale(12, 12)
  const path = new Path2D(s.icon)
  ctx.lineWidth = 0.4
  ctx.strokeStyle = '#1f3864'
  if (key === 'line') { ctx.strokeStyle = shapeColor.value; ctx.lineWidth = 0.6 } else { ctx.fillStyle = shapeColor.value; ctx.fill(path) }
  ctx.stroke(path)
  insertImageSrc(cv.toDataURL('image/png'), 160)
}
// a chart is drawn as a picture
const chartForm = reactive({ type: 'bar', title: 'Chart Title', labels: 'Term 1, Term 2, Term 3', values: '45, 60, 72' })
const insertChart = () => {
  const labels = chartForm.labels.split(',').map(s => s.trim()).filter(Boolean)
  const values = chartForm.values.split(',').map(s => Number(s.trim()) || 0)
  const n = Math.min(labels.length, values.length)
  if (!n) { toast.error('Give at least one category and value'); return }
  const W = 640, H = 400
  const cv = document.createElement('canvas')
  cv.width = W; cv.height = H
  const ctx = cv.getContext('2d')!
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H)
  ctx.fillStyle = '#404040'; ctx.font = 'bold 20px Calibri, Arial'; ctx.textAlign = 'center'
  ctx.fillText(chartForm.title, W / 2, 32)
  const COLORS = ['#4472c4', '#ed7d31', '#a5a5a5', '#ffc000', '#5b9bd5', '#70ad47', '#264478', '#9e480e']
  const max = Math.max(...values.slice(0, n), 1)
  if (chartForm.type === 'pie') {
    const total = values.slice(0, n).reduce((a, b) => a + Math.max(0, b), 0) || 1
    let a = -Math.PI / 2
    for (let i = 0; i < n; i++) {
      const sweep = (Math.max(0, values[i]) / total) * Math.PI * 2
      ctx.beginPath(); ctx.moveTo(230, 215); ctx.arc(230, 215, 150, a, a + sweep); ctx.closePath()
      ctx.fillStyle = COLORS[i % COLORS.length]; ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke()
      a += sweep
      ctx.fillStyle = COLORS[i % COLORS.length]; ctx.fillRect(420, 110 + i * 26, 14, 14)
      ctx.fillStyle = '#404040'; ctx.font = '14px Calibri, Arial'; ctx.textAlign = 'left'
      ctx.fillText(`${labels[i]} (${values[i]})`, 442, 122 + i * 26)
    }
  } else {
    const L = 60, T = 56, R = W - 24, B = H - 50
    ctx.strokeStyle = '#d9d9d9'; ctx.lineWidth = 1; ctx.font = '12px Calibri, Arial'; ctx.fillStyle = '#595959'; ctx.textAlign = 'right'
    for (let g = 0; g <= 5; g++) {
      const y = B - (g / 5) * (B - T)
      ctx.beginPath(); ctx.moveTo(L, y); ctx.lineTo(R, y); ctx.stroke()
      ctx.fillText(String(Math.round((max * g) / 5)), L - 6, y + 4)
    }
    const step = (R - L) / n
    ctx.textAlign = 'center'
    const pts: [number, number][] = []
    for (let i = 0; i < n; i++) {
      const h = (Math.max(0, values[i]) / max) * (B - T)
      const x = L + step * i + step / 2
      if (chartForm.type === 'bar') { ctx.fillStyle = '#4472c4'; ctx.fillRect(x - step * 0.3, B - h, step * 0.6, h) }
      pts.push([x, B - h])
      ctx.fillStyle = '#595959'; ctx.fillText(labels[i], x, B + 18)
    }
    if (chartForm.type === 'line') {
      ctx.strokeStyle = '#4472c4'; ctx.lineWidth = 3; ctx.beginPath()
      pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke()
      ctx.fillStyle = '#4472c4'; pts.forEach(([x, y]) => { ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill() })
    }
  }
  dialog.value = null
  insertImageSrc(cv.toDataURL('image/png'), 480)
}
const addLink = () => {
  const url = window.prompt('Address (https://...)', editor.value?.getAttributes('link').href || 'https://')
  if (url === null) return
  if (!url.trim() || url === 'https://') chain().unsetLink().run()
  else chain().extendMarkRange('link').setLink({ href: url.trim() }).run()
}
const addBookmark = () => {
  const name = (window.prompt('Bookmark name') || '').trim().replace(/[^\w-]/g, '_')
  if (name) setPara('bookmark', name)
}
const insertDate = () => chain().insertContent(new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })).run()
const insertCover = (kind: string) => {
  menu.value = null
  const date = new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })
  const p = (text: string, docStyle: string | null = null, extra: Record<string, unknown> = {}) => ({ type: 'paragraph', attrs: { docStyle, ...extra }, content: text ? [{ type: 'text', text }] : [] })
  const cover = kind === 'banded'
    ? [p('DOCUMENT TITLE', 'cover-band'), p('Document subtitle', 'subtitle', { textAlign: 'center' }), p(''), p(''), p('Your name', null, { textAlign: 'center' }), p(date, null, { textAlign: 'center' })]
    : kind === 'report'
      ? [p('School Name', 'cover-title', { textAlign: 'center' }), p('Report Title', 'title', { textAlign: 'center' }), p('Class · Subject', 'subtitle', { textAlign: 'center' }), p(''), p('Prepared by: Your name', null, { textAlign: 'center' }), p(date, null, { textAlign: 'center' })]
      : [p(''), p(''), p('Document Title', 'cover-title'), p('Document Subtitle', 'subtitle'), p(''), p('Your name'), p(date)]
  editor.value!.chain().focus().insertContentAt(0, [...cover, { type: 'pageBreak' }]).run()
}
const insertTextBox = () => chain().insertContent({ type: 'paragraph', attrs: { docStyle: 'textbox' }, content: [{ type: 'text', text: 'Type text in the box' }] }).run()
const insertWordArt = (key: string) => {
  menu.value = null
  const sel = editor.value!.state.selection
  const text = sel.empty ? 'Your text here' : editor.value!.state.doc.textBetween(sel.from, sel.to, ' ')
  if (!sel.empty) chain().deleteSelection().run()
  chain().insertContent({ type: 'paragraph', attrs: { docStyle: key, textAlign: 'center' }, content: [{ type: 'text', text }] }).run()
}
const toggleDropCap = () => setPara('docStyle', blockStyle.value === 'dropcap' ? null : 'dropcap')
const insertSignature = () => chain().insertContent([{ type: 'paragraph' }, { type: 'paragraph', content: [{ type: 'text', text: 'X ______________________________' }] }, { type: 'paragraph', content: [{ type: 'text', text: 'Signature' }] }]).run()
// Equation: written in LaTeX, shown with KaTeX, put in as a picture
const eqText = ref('')
const eqHtml = ref('')
const eqPreview = ref<HTMLElement | null>(null)
let katexMod: any = null
watch(eqText, async v => {
  if (!katexMod) { katexMod = (await import('katex')).default; await import('katex/dist/katex.min.css') }
  try { eqHtml.value = katexMod.renderToString(v || '\\,', { throwOnError: false, displayMode: true, output: 'html' }) } catch { eqHtml.value = '' }
})
const insertEquation = async () => {
  await nextTick()
  const el = eqPreview.value
  if (!el) return
  // drawn by the browser itself (KaTeX's fonts embedded), so the fraction lines sit right
  const { toPng } = await import('html-to-image')
  const math = (el.querySelector('.katex-html') as HTMLElement) || el
  const box = math.getBoundingClientRect()
  const width = Math.ceil(box.width) + 16
  const png = await toPng(math, { backgroundColor: '#ffffff', pixelRatio: 2, style: { padding: '8px', margin: '0', display: 'inline-block' }, width, height: Math.ceil(box.height) + 16 })
  dialog.value = null
  insertImageSrc(png, width)
  eqText.value = ''
}

// ---- header, footer, page ----
const editingHF = ref<'header' | 'footer' | null>(null)
const hfInput = ref<HTMLInputElement | null>(null)
const editHeader = async (which: 'header' | 'footer') => {
  editingHF.value = which
  await nextTick()
  ;(Array.isArray(hfInput.value) ? hfInput.value[0] : hfInput.value)?.focus()
}
const customWatermark = () => {
  menu.value = null
  const w = (window.prompt('Watermark text', page.watermark || 'DRAFT') || '').trim()
  setPage('watermark', w)
}

// ---- References ----
const insertToc = () => {
  const e = editor.value!
  const json = e.getJSON()
  const content = (json.content || []).filter(n => !String(n.attrs?.docStyle || '').startsWith('toc'))
  const heads = content.filter(n => n.type === 'heading' && (n.attrs?.level === 1 || n.attrs?.level === 2))
  if (!heads.length) { toast.info('Use the Heading 1 and Heading 2 styles first, then insert the contents'); return }
  const toc = [
    { type: 'paragraph', attrs: { docStyle: 'toc-title' }, content: [{ type: 'text', text: 'Contents' }] },
    ...heads.map(h => ({ type: 'paragraph', attrs: { docStyle: h.attrs?.level === 1 ? 'toc1' : 'toc2' }, content: [{ type: 'text', text: (h.content || []).map((c: any) => c.text || '').join('') || ' ' }] }))
  ]
  const firstOld = (json.content || []).findIndex(n => String(n.attrs?.docStyle || '').startsWith('toc'))
  const at = firstOld >= 0 ? firstOld : Math.min(content.length, (json.content || []).findIndex(n => n.type === 'heading') >= 0 ? (json.content || []).findIndex(n => n.type === 'heading') : 0)
  content.splice(Math.max(0, at), 0, ...toc)
  e.commands.setContent({ ...json, content }, true)
  toast.success(firstOld >= 0 ? 'Table of contents updated' : 'Table of contents inserted')
}
const insertFootnote = () => {
  const e = editor.value!
  const n = (e.getJSON().content || []).filter(x => x.attrs?.docStyle === 'footnote').length + 1
  const text = window.prompt(`Footnote ${n}`, '') ?? ''
  if (!text) return
  e.chain().focus().insertContent({ type: 'text', text: String(n), marks: [{ type: 'superscript' }] }).run()
  const end = e.state.doc.content.size
  e.chain().insertContentAt(end, [...(n === 1 ? [{ type: 'horizontalRule' }] : []), { type: 'paragraph', attrs: { docStyle: 'footnote' }, content: [{ type: 'text', text: String(n), marks: [{ type: 'superscript' }] }, { type: 'text', text: ` ${text}` }] }]).run()
}
const insertCaption = (label: string) => {
  menu.value = null
  const n = (editor.value!.getJSON().content || []).filter(x => x.attrs?.docStyle === 'caption' && (x.content?.[0] as any)?.text?.startsWith(label)).length + 1
  chain().insertContent({ type: 'paragraph', attrs: { docStyle: 'caption' }, content: [{ type: 'text', text: `${label} ${n}: ` }] }).run()
}

// ---- Mailings ----
const mergeDraft = reactive({ fields: [] as string[], rows: [] as string[][] })
const saveRecipients = () => {
  const fields = mergeDraft.fields.map(f => f.trim()).filter(Boolean)
  page.merge.fields = fields
  page.merge.rows = mergeDraft.rows.map(r => fields.map((_, i) => r[i] || '')).filter(r => r.some(v => v.trim()))
  page.merge.on = true
  dialog.value = null
  emit('change')
  toast.success(`${page.merge.rows.length} recipients`)
}
const fieldNode = (name: string) => ({ type: 'mergeField', attrs: { name } })
const insertField = (name: string) => { menu.value = null; chain().insertContent(fieldNode(name)).run() }
const has = (f: string) => page.merge.fields.includes(f)
const insertAddressBlock = () => {
  const f = page.merge.fields
  const nameLine = [has('Title') ? 'Title' : null, has('First Name') ? 'First Name' : f[0], has('Last Name') ? 'Last Name' : null].filter(Boolean) as string[]
  const rest = f.filter(x => !nameLine.includes(x))
  const line = (names: string[]) => ({ type: 'paragraph', attrs: { docStyle: 'nospacing' }, content: names.flatMap((n, i) => (i ? [{ type: 'text', text: ' ' }, fieldNode(n)] : [fieldNode(n)])) })
  chain().insertContent([line(nameLine), ...rest.map(r => line([r]))]).run()
}
const insertGreeting = () => {
  const name = has('First Name') ? 'First Name' : page.merge.fields[0]
  chain().insertContent({ type: 'paragraph', content: [{ type: 'text', text: 'Dear ' }, fieldNode(name), { type: 'text', text: ',' }] }).run()
}
const paintField = (entry: { el: HTMLElement; name: string }) => {
  const i = page.merge.fields.indexOf(entry.name)
  const row = page.merge.rows[preview.at]
  entry.el.textContent = preview.on && row && i >= 0 ? (row[i] || '') : `«${entry.name}»`
  entry.el.classList.toggle('is-preview', preview.on)
}
watch(() => [preview.on, preview.at, page.merge.rows.length], () => mergeSpans.forEach(paintField))
const insertEnvelope = () => {
  chain().insertContent([
    { type: 'paragraph', attrs: { docStyle: 'nospacing' }, content: [{ type: 'text', text: 'From: Your name, your address' }] },
    { type: 'paragraph' }, { type: 'paragraph' },
    { type: 'paragraph', attrs: { docStyle: 'nospacing', indent: 6 }, content: [{ type: 'text', text: 'To:' }] },
    ...(page.merge.fields.length ? [] : [{ type: 'paragraph', attrs: { docStyle: 'nospacing', indent: 6 }, content: [{ type: 'text', text: 'Name' }] }, { type: 'paragraph', attrs: { docStyle: 'nospacing', indent: 6 }, content: [{ type: 'text', text: 'Address' }] }])
  ]).run()
  if (page.merge.fields.length) insertAddressBlock()
}
const finishMerge = async () => {
  const html = editor.value!.getHTML()
  const parts = page.merge.rows.map(row => html.replace(/<span[^>]*class="merge-field"[^>]*data-field="([^"]*)"[^>]*>[^<]*<\/span>/g, (_m, name) => {
    const i = page.merge.fields.indexOf(name.replace(/&amp;/g, '&'))
    return i >= 0 ? escapeHtml(row[i] || '') : ''
  }))
  const merged = parts.join('<div class="page-break" style="page-break-after: always"></div>')
  try {
    downloadBlob(await toDocx(merged), 'Merged letters.docx')
  } catch (err) {
    console.error(err)
    toast.error('The merged letters could not be made')
  }
}
const escapeHtml = (s: string) => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' } as Record<string, string>)[c])

// ---- Review ----
const toggleSpellcheck = () => {
  spellcheck.value = !spellcheck.value
  const dom = editor.value?.view.dom as HTMLElement | undefined
  if (dom) { dom.setAttribute('spellcheck', String(spellcheck.value)); dom.blur(); editor.value?.commands.focus() }
}
const speaking = ref(false)
const readAloud = () => {
  if (speaking.value) { speechSynthesis.cancel(); speaking.value = false; return }
  const e = editor.value!
  const { from, to, empty } = e.state.selection
  const text = empty ? e.getText() : e.state.doc.textBetween(from, to, ' ')
  if (!text.trim() || !('speechSynthesis' in window)) return
  const u = new SpeechSynthesisUtterance(text)
  u.onend = () => { speaking.value = false }
  speaking.value = true
  speechSynthesis.speak(u)
}
const comments = computed(() => {
  void tick.value
  const out: { pos: number; text: string; quote: string }[] = []
  editor.value?.state.doc.descendants((node, pos) => {
    const m = node.marks?.find(x => x.type.name === 'comment')
    if (node.isText && m) {
      const last = out[out.length - 1]
      if (last && last.text === m.attrs.text && last.pos + last.quote.length === pos) last.quote += node.text
      else out.push({ pos, text: m.attrs.text, quote: node.text || '' })
    }
  })
  return out
})
const addComment = () => {
  const e = editor.value!
  if (e.state.selection.empty) { toast.info('Select the text to comment on'); return }
  const text = (window.prompt('Comment') || '').trim()
  if (text) { chain().setMark('comment', { text }).run(); showComments.value = true }
}
const deleteComment = () => {
  const e = editor.value!
  if (e.isActive('comment')) chain().extendMarkRange('comment').unsetMark('comment').run()
  else toast.info('Put the cursor in the commented text first')
}
let commentAt = -1
const gotoComment = (d: number) => {
  const list = comments.value
  if (!list.length) return
  commentAt = (commentAt + d + list.length) % list.length
  jumpTo(list[commentAt].pos)
}
const jumpTo = (pos: number) => editor.value?.chain().focus().setTextSelection(pos + 1).scrollIntoView().run()

// ---- View ----
const headings = computed(() => {
  void tick.value
  const out: { pos: number; level: number; text: string }[] = []
  editor.value?.state.doc.descendants((node, pos) => {
    if (node.type.name === 'heading' && node.attrs.level <= 2) out.push({ pos, level: node.attrs.level, text: node.textContent || '(empty heading)' })
  })
  return out
})
const fitWidth = () => { if (desk.value) zoom.value = Math.max(30, Math.min(200, Math.floor(((desk.value.clientWidth - 40) / pageSize.value[0]) * 10) * 10)) }
const fitPage = () => { if (desk.value) zoom.value = Math.max(30, Math.min(200, Math.floor(((desk.value.clientHeight - 40) / pageSize.value[1]) * 10) * 10)) }

// ---- the page ----
const margin = computed(() => MARGINS[page.margins] || MARGINS.normal)
const pageSize = computed<[number, number]>(() => {
  const [w, h] = SIZES_PX[page.size] || SIZES_PX.A4
  return page.orientation === 'landscape' ? [h, w] : [w, h]
})
const headingColor = computed(() => COLOR_SETS.find(c => c.key === page.colors)?.c || '#2f5496')
const styleSet = computed(() => STYLE_SETS.find(s => s.key === page.styleSet) || STYLE_SETS[0])
const PARA_GAP: Record<string, string> = { compact: '2pt', normal: '8pt', open: '12pt', double: '18pt' }
const pageClasses = computed(() => ({
  'is-readonly': props.readonly, 'show-marks': showMarks.value, 'line-numbers': page.lineNumbers, 'hyphenate': page.hyphenation,
  'hide-fields': !highlightFields.value, [`border-${page.pageBorder}`]: !!page.pageBorder,
  'shadow-lg': viewMode.value !== 'web', 'is-web': viewMode.value === 'web', 'is-read': viewMode.value === 'read'
}))
// ---- marking on the document: a layer over whole sheets of paper, so a mark stays where it was put ----
const MAX_MARK_PAGES = 20
const pageEl = ref<HTMLElement | null>(null)
const markPages = ref(1)
let markObserver: ResizeObserver | null = null
const measureMarkPages = () => {
  const body = pageEl.value?.querySelector('.ProseMirror') as HTMLElement | null
  if (!body) return
  const breaks = editor.value?.getJSON().content?.filter(n => n.type === 'pageBreak').length || 0
  const needed = Math.ceil((body.offsetHeight + margin.value.top * 2 - 2) / pageSize.value[1])
  // only ever grows (a picture finishing loading), or marks already made would move
  markPages.value = Math.min(MAX_MARK_PAGES, Math.max(markPages.value, needed, breaks + 1))
}
watch(pageEl, el => {
  markObserver?.disconnect()
  if (!el || !props.markable) return
  markObserver = new ResizeObserver(measureMarkPages)
  const body = el.querySelector('.ProseMirror')
  markObserver.observe(body || el)
  measureMarkPages()
})
onBeforeUnmount(() => markObserver?.disconnect())
const markSurface = computed(() => (props.markable && pageEl.value && viewMode.value !== 'web'
  ? { page: 0, host: pageEl.value, width: pageSize.value[0], height: pageSize.value[1] * markPages.value }
  : null))

const pageStyle = computed(() => {
  const web = viewMode.value === 'web'
  return {
    width: web ? '100%' : `${pageSize.value[0]}px`,
    minHeight: web ? 'auto' : `${pageSize.value[1] * (props.markable ? markPages.value : 1)}px`,
    padding: web ? '24px 32px' : `${margin.value.top}px ${margin.value.side}px`,
    zoom: zoom.value / 100,
    background: page.pageColor || '#ffffff',
    '--doc-heading': headingColor.value,
    '--doc-heading-font': styleSet.value.heading,
    '--doc-body-font': styleSet.value.body,
    '--doc-para-gap': PARA_GAP[page.paraSpacing] || '8pt',
    '--doc-columns': String(page.columns || 1),
    '--doc-border': page.borderColor || '#000'
  } as Record<string, string | number>
})
const pages = computed(() => {
  void tick.value; void zoom.value
  const el = document.querySelector('.word-page') as HTMLElement | null
  const breaks = editor.value?.getJSON().content?.filter(n => n.type === 'pageBreak').length || 0
  return Math.max(1, el ? Math.ceil(el.scrollHeight / pageSize.value[1]) : 1, breaks + 1)
})
const stats = computed(() => {
  void tick.value
  const text = editor.value?.getText() || ''
  const t = text.trim()
  return {
    words: t ? t.split(/\s+/).length : 0,
    chars: text.replace(/\n/g, '').length,
    charsNoSpace: text.replace(/\s/g, '').length,
    paragraphs: (editor.value?.getJSON().content || []).filter(n => (n.content || []).length).length
  }
})
const printDoc = () => {
  const w = window.open('', '_blank')
  if (!w) return
  w.document.write(`<!doctype html><html><head><title>Print</title><style>body{font-family:${styleSet.value.body},Arial,sans-serif;font-size:11pt;margin:${margin.value.top}px ${margin.value.side}px} table{border-collapse:collapse;width:100%} td,th{border:1px solid #000;padding:4px} .page-break{page-break-after:always} h1,h2{color:${headingColor.value}}</style></head><body>${page.header ? `<p style="text-align:center;color:#666">${escapeHtml(page.header)}</p>` : ''}${exportHtml(editor.value?.getHTML() || '')}${page.footer ? `<p style="text-align:center;color:#666">${escapeHtml(page.footer)}</p>` : ''}</body></html>`)
  w.document.close()
  w.focus()
  w.print()
}

// ---- out to .docx: Word's styles as inline styles it understands ----
const STYLE_CSS: Record<string, string> = {
  title: 'font-size:28pt;font-family:Calibri Light', subtitle: 'font-size:13pt;color:#595959', nospacing: 'margin:0',
  'cover-title': 'font-size:36pt;font-weight:bold', 'cover-band': 'font-size:30pt;font-weight:bold;color:#ffffff;background-color:#2f5496;text-align:center;padding:12pt',
  textbox: 'border:1px solid #000;padding:6pt', wa1: 'font-size:36pt;font-weight:bold;color:#2f5496', wa2: 'font-size:36pt;font-weight:bold;color:#c55a11',
  wa3: 'font-size:36pt;font-weight:bold;color:#ef6c00', wa4: 'font-size:36pt;font-weight:bold;color:#548235', dropcap: '',
  caption: 'font-size:9pt;font-style:italic;color:#44546a', footnote: 'font-size:9pt', 'toc-title': 'font-size:16pt;color:#2f5496',
  toc1: 'margin:2pt 0', toc2: 'margin:2pt 0 2pt 18pt', emphasis: 'font-style:italic;color:#404040'
}
const exportHtml = (html: string) => {
  const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html')
  doc.querySelectorAll('[data-style]').forEach(el => {
    const css = STYLE_CSS[el.getAttribute('data-style') || '']
    if (css) el.setAttribute('style', `${el.getAttribute('style') || ''};${css}`)
  })
  doc.querySelectorAll('h1, h2, h3').forEach(el => el.setAttribute('style', `${el.getAttribute('style') || ''};color:${headingColor.value};font-family:${styleSet.value.heading}`))
  doc.querySelectorAll('span.merge-field').forEach(el => { el.textContent = `«${el.getAttribute('data-field')}»` })
  doc.querySelectorAll('img[data-wrap="center"]').forEach(el => el.parentElement?.setAttribute('style', 'text-align:center'))
  return doc.body.firstElementChild!.innerHTML
}
const twip = (px: number) => Math.round(px * 15)
const toDocx = async (html: string) => {
  // the library's browser build still reads Node's `global`, and `Buffer` for pictures
  ;(globalThis as any).global ??= globalThis
  if (!(globalThis as any).Buffer) (globalThis as any).Buffer = (await import('buffer')).Buffer
  const { default: HTMLtoDOCX } = await import('@turbodocx/html-to-docx')
  const [w, h] = pageSize.value
  const m = margin.value
  const footer = [page.footer ? escapeHtml(page.footer) : ''].filter(Boolean).join(' ')
  const out = await HTMLtoDOCX(`<!doctype html><html><body>${exportHtml(html)}</body></html>`,
    page.header ? `<p style="text-align:center">${escapeHtml(page.header)}</p>` : null,
    {
      font: styleSet.value.body, fontSize: 22, orientation: page.orientation, table: { row: { cantSplit: true } },
      pageSize: { width: twip(w), height: twip(h) },
      margins: { top: twip(m.top), bottom: twip(m.top), left: twip(m.side), right: twip(m.side), header: 720, footer: 720 },
      header: !!page.header, footer: !!(footer || page.pageNumbers), pageNumber: !!page.pageNumbers
    } as any,
    footer ? `<p style="text-align:center">${footer}</p>` : null)
  return out instanceof Blob ? out : new Blob([out as ArrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
}

// ---- the editor's side of the workspace (apps.ts PracticalEditorApi) ----
const documentHtml = () => `<!doctype html><html><head><meta charset="utf-8"><meta name="tusome-page" content="${JSON.stringify(page).replace(/&/g, '&amp;').replace(/"/g, '&quot;')}"></head><body>${editor.value?.getHTML() || ''}</body></html>`
watch(() => [page.merge.on], () => emit('change'))

defineExpose({
  markSurface,
  save: async () => new Blob([documentHtml()], { type: 'text/html' }),
  importFile: async (file: File) => {
    const mammoth = await import('mammoth')
    const { value } = await mammoth.convertToHtml({ arrayBuffer: await file.arrayBuffer() })
    editor.value?.commands.setContent(value || '<p></p>', true)
  },
  exportFile: async () => toDocx(editor.value?.getHTML() || '')
})
</script>

<style scoped>
.word-page {
  max-width: 100%;
  font-family: var(--doc-body-font), Calibri, Carlito, Arial, sans-serif;
  font-size: 11pt;
  line-height: 1.15;
  transform-origin: top center;
}
.word-page.is-web { max-width: none; }
.word-page.is-read { font-size: 13pt; line-height: 1.5; }
@media (max-width: 640px) {
  .word-page { padding: 32px 20px !important; min-height: 80vh !important; width: 100% !important; }
}
.word-page.border-box { outline: 1px solid var(--doc-border); outline-offset: -48px; }
.word-page.border-double { outline: 4px double var(--doc-border); outline-offset: -48px; }
.word-page.border-thick { outline: 3px solid var(--doc-border); outline-offset: -48px; }
.word-page.border-shadow { outline: 1px solid var(--doc-border); outline-offset: -48px; box-shadow: inset -52px -52px 0 -48px #9ca3af; }
.word-hf { position: absolute; left: 0; right: 0; padding: 0 96px; color: #6b7280; font-size: 10pt; }
.word-hf-top { top: 36px; }
.word-hf-bottom { bottom: 30px; }
.word-hf.is-editing { outline: 1px dashed #185abd; background: #eff6ff; }
.word-watermark { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; pointer-events: none; font-size: 88px; font-weight: 700; color: rgba(150, 150, 150, 0.18); transform: rotate(-40deg); white-space: nowrap; overflow: hidden; }
.is-painting :deep(.ProseMirror) { cursor: copy; }
.word-page :deep(.ProseMirror) { outline: none; min-height: 800px; column-count: var(--doc-columns); column-gap: 0.5in; position: relative; }
.word-page.is-web :deep(.ProseMirror) { min-height: 60vh; }
.word-page.hyphenate :deep(.ProseMirror) { hyphens: auto; -webkit-hyphens: auto; }
.word-page :deep(p) { margin: 0 0 var(--doc-para-gap); }
.word-page :deep(p.doc-nospacing) { margin: 0; }
.word-page :deep(p.doc-title) { font-family: var(--doc-heading-font), 'Calibri Light', sans-serif; font-size: 28pt; letter-spacing: -0.5px; margin: 0 0 4pt; }
.word-page :deep(p.doc-subtitle) { color: #595959; font-size: 13pt; letter-spacing: 1px; }
.word-page :deep(p.doc-emphasis) { font-style: italic; color: #404040; }
.word-page :deep(p.doc-cover-title) { font-family: var(--doc-heading-font), sans-serif; font-size: 36pt; font-weight: 700; color: var(--doc-heading); }
.word-page :deep(p.doc-cover-band) { font-size: 30pt; font-weight: 700; color: #fff; background: var(--doc-heading); text-align: center; padding: 18pt; }
.word-page :deep(p.doc-textbox) { display: inline-block; min-width: 40%; border: 1px solid #000; padding: 6pt 8pt; }
.word-page :deep(p.doc-wa1), .word-page :deep(p.doc-wa2), .word-page :deep(p.doc-wa3), .word-page :deep(p.doc-wa4) { font-size: 40pt; font-weight: 700; line-height: 1.1; }
.word-page :deep(p.doc-wa1) { color: #2f5496; text-shadow: 2px 2px 3px rgba(0, 0, 0, .35); }
.word-page :deep(p.doc-wa2) { color: #fff; -webkit-text-stroke: 1.5px #c55a11; }
.word-page :deep(p.doc-wa3) { background: linear-gradient(#ffd54f, #ef6c00); -webkit-background-clip: text; background-clip: text; color: transparent; }
.word-page :deep(p.doc-wa4) { color: #548235; text-shadow: 3px 3px 0 #c5e0b4; }
.word-page :deep(p.doc-dropcap::first-letter) { float: left; font-size: 3.4em; line-height: 0.85; padding: 4px 6px 0 0; font-family: var(--doc-heading-font), serif; }
.word-page :deep(p.doc-caption) { font-size: 9pt; font-style: italic; color: #44546a; }
.word-page :deep(p.doc-footnote) { font-size: 9pt; margin: 0 0 2pt; }
.word-page :deep(p.doc-toc-title) { font-size: 16pt; color: var(--doc-heading); font-family: var(--doc-heading-font), sans-serif; }
.word-page :deep(p.doc-toc1) { margin: 2pt 0; border-bottom: 1px dotted #9ca3af; }
.word-page :deep(p.doc-toc2) { margin: 2pt 0 2pt 18pt; border-bottom: 1px dotted #d1d5db; }
.word-page :deep(h1) { font-family: var(--doc-heading-font), sans-serif; font-size: 16pt; color: var(--doc-heading); margin: 12pt 0 4pt; font-weight: 400; }
.word-page :deep(h2) { font-family: var(--doc-heading-font), sans-serif; font-size: 13pt; color: var(--doc-heading); margin: 8pt 0 4pt; font-weight: 400; }
.word-page :deep(h3) { font-size: 12pt; color: var(--doc-heading); margin: 8pt 0 4pt; font-weight: 400; }
.word-page :deep(ul) { list-style: disc; padding-left: 28px; margin: 0 0 8pt; }
.word-page :deep(ol) { list-style: decimal; padding-left: 28px; margin: 0 0 8pt; }
.word-page :deep(blockquote) { margin: 10pt 40px; color: #404040; font-style: italic; text-align: center; }
.word-page :deep(a) { color: #0563c1; text-decoration: underline; }
.word-page :deep(table) { border-collapse: collapse; width: 100%; margin: 4pt 0 8pt; table-layout: fixed; }
.word-page :deep(td), .word-page :deep(th) { border: 1px solid #000; padding: 2px 6px; vertical-align: top; position: relative; }
.word-page :deep(td p), .word-page :deep(th p) { margin: 0; }
.word-page :deep(th) { font-weight: 700; }
.word-page :deep(.selectedCell)::after { content: ''; position: absolute; inset: 0; background: rgba(24, 90, 189, 0.15); pointer-events: none; }
.word-page :deep(.column-resize-handle) { position: absolute; right: -2px; top: 0; bottom: 0; width: 4px; background: #185abd; pointer-events: none; }
.word-page :deep(img) { max-width: 100%; height: auto; display: inline-block; }
.word-page :deep(img[data-wrap='left']) { float: left; margin: 2px 12px 6px 0; }
.word-page :deep(img[data-wrap='right']) { float: right; margin: 2px 0 6px 12px; }
.word-page :deep(img[data-wrap='center']) { display: block; margin: 6px auto; }
.word-page :deep(img.ProseMirror-selectednode) { outline: 2px solid #185abd; }
.word-page :deep(hr) { border: 0; border-top: 1px solid #999; margin: 12px 0; }
.word-page :deep(.page-break) { border-top: 1px dashed #9ca3af; margin: 16px 0; position: relative; height: 0; column-span: all; }
.word-page :deep(.page-break)::after { content: 'Page Break'; position: absolute; left: 50%; top: -8px; transform: translateX(-50%); background: #fff; color: #9ca3af; font-size: 10px; padding: 0 6px; }
.word-page :deep(.column-break) { break-after: column; border-top: 1px dotted #9ca3af; height: 0; }
.word-page :deep(.doc-comment) { background: #fff2cc; border-bottom: 2px solid #f4b183; }
.word-page :deep(.merge-field) { background: #e5e7eb; border-radius: 2px; padding: 0 1px; }
.word-page.hide-fields :deep(.merge-field), .word-page :deep(.merge-field.is-preview) { background: transparent; }
.word-page.line-numbers :deep(.ProseMirror) { counter-reset: line; }
.word-page.line-numbers :deep(.ProseMirror > *) { counter-increment: line; position: relative; }
.word-page.line-numbers :deep(.ProseMirror > *)::before { content: counter(line); position: absolute; left: -40px; width: 28px; text-align: right; font-size: 9pt; color: #9ca3af; font-weight: 400; font-style: normal; }
.word-page.show-marks :deep(p)::after, .word-page.show-marks :deep(h1)::after, .word-page.show-marks :deep(h2)::after, .word-page.show-marks :deep(h3)::after { content: '¶'; color: #6b8fd6; margin-left: 2px; }
</style>
