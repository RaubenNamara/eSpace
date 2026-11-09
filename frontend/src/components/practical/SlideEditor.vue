<template>
  <!-- Presentation: PowerPoint's ribbon (File, Home, Insert, Design, Transitions, Animations, Slide
       Show, Record, Review, View), the slides down the side, the slide being made with its notes,
       panes on the right (comments, animations, selection, accessibility, spelling, background),
       and PowerPoint's status bar. The work is the slides as JSON; a .pptx is made when it is
       downloaded. Placeholders ("Click to add title") are drawn dashed while being made and left
       out of the slide show and the .pptx until typed in. Transitions and animations play in the
       slide show (slides/SlideShow.vue). -->
  <div class="absolute inset-0 flex flex-col bg-[#e6e6e6] dark:bg-gray-900" :data-tick="tick" @mousedown="closeMenus">
    <OfficeRibbon v-if="!readonly || showTools" v-model:active="tab" :tabs="TABS" color="bg-[#b7472a]" :locked="readonly">
      <!-- File -->
      <template v-if="tab === 'File'">
        <RibbonGroup label="Save">
          <button type="button" class="rb-big" @click="$emit('download')"><RibbonIcon name="download" size="lg" />Download<br>as .pptx</button>
        </RibbonGroup>
        <RibbonGroup label="Info">
          <div class="px-2 py-1 text-xs text-gray-600 dark:text-gray-300 leading-relaxed">Your slides save by themselves as you work.<br>{{ slides.length }} {{ slides.length === 1 ? 'slide' : 'slides' }} · {{ size === '4x3' ? 'Standard (4:3)' : 'Widescreen (16:9)' }}</div>
        </RibbonGroup>
      </template>

      <!-- Home -->
      <template v-else-if="tab === 'Home'">
        <RibbonGroup label="Clipboard">
          <button type="button" class="rb-big" :disabled="!clipboard" title="Paste (Ctrl+V)" @click="pasteObject"><RibbonIcon name="paste" size="lg" />Paste</button>
          <div class="flex flex-col">
            <button type="button" class="rb-sm" :disabled="!sel.any" title="Cut (Ctrl+X)" @click="copyObject(true)"><RibbonIcon name="cut" />Cut</button>
            <button type="button" class="rb-sm" :disabled="!sel.any" title="Copy (Ctrl+C)" @click="copyObject(false)"><RibbonIcon name="copy" />Copy</button>
            <button type="button" class="rb-sm" :class="{ 'rb-on': painter }" :disabled="!sel.any" title="Format Painter" @click="startPainter"><RibbonIcon name="painter" />Format Painter</button>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Slides">
          <div class="relative" data-menu>
            <button type="button" class="rb-big" @click="toggleMenu('new')"><RibbonIcon name="newSlide" size="lg" />New<br>Slide ▾</button>
            <div v-if="menu === 'new'" class="rb-menu w-64 p-1.5 grid grid-cols-2 gap-1">
              <button v-for="l in LAYOUTS" :key="l.key" type="button" class="text-left rounded border border-gray-200 dark:border-gray-600 hover:border-[#b7472a] p-1" @click="addSlide(l.key)">
                <span class="block aspect-video bg-gray-50 dark:bg-gray-700 rounded-sm mb-0.5 text-[8px] text-gray-400 flex items-center justify-center">{{ l.label }}</span>
                <span class="block text-[11px]">{{ l.label }}</span>
              </button>
            </div>
          </div>
          <div class="flex flex-col">
            <div class="relative" data-menu>
              <button type="button" class="rb-sm" @click="toggleMenu('layout')"><RibbonIcon name="layout" />Layout ▾</button>
              <div v-if="menu === 'layout'" class="rb-menu w-44 py-1">
                <button v-for="l in LAYOUTS" :key="l.key" type="button" class="rb-item" :class="{ 'font-semibold': current?.layout === l.key }" @click="applyLayout(l.key)">{{ l.label }}</button>
              </div>
            </div>
            <button type="button" class="rb-sm" title="Put the placeholders back where the layout has them" @click="applyLayout(current?.layout || 'blank')"><RibbonIcon name="reset" />Reset</button>
            <div class="relative" data-menu>
              <button type="button" class="rb-sm" @click="toggleMenu('section')"><RibbonIcon name="section" />Section ▾</button>
              <div v-if="menu === 'section'" class="rb-menu w-48 py-1">
                <button type="button" class="rb-item" @click="addSection">Add Section</button>
                <button type="button" class="rb-item" :disabled="!sectionOf(index)" @click="renameSection">Rename Section</button>
                <button type="button" class="rb-item" :disabled="!current?.section" @click="removeSection(false)">Remove Section</button>
                <button type="button" class="rb-item" :disabled="!slides.some(s => s.section)" @click="removeSection(true)">Remove All Sections</button>
              </div>
            </div>
          </div>
          <div class="flex flex-col">
            <button type="button" class="rb-sm" @click="duplicateSlide"><RibbonIcon name="duplicate" />Duplicate</button>
            <button type="button" class="rb-sm" :disabled="slides.length < 2" @click="deleteSlide"><RibbonIcon name="trash" />Delete</button>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Font">
          <div class="flex flex-col gap-1">
            <div class="flex items-center gap-0.5">
              <select class="rb-select w-32" :disabled="!sel.text" :value="sel.fontFamily" @change="setProp('fontFamily', ($event.target as HTMLSelectElement).value)">
                <option v-for="f in FONTS" :key="f" :value="f">{{ f }}</option>
              </select>
              <select class="rb-select w-14" :disabled="!sel.text" :value="sel.fontSize" @change="setProp('fontSize', Number(($event.target as HTMLSelectElement).value))">
                <option v-for="s in SIZES" :key="s" :value="s">{{ s }}</option>
              </select>
              <button type="button" class="rb-ic" :disabled="!sel.text" title="Increase Font Size" @click="stepSize(1)"><RibbonIcon name="grow" /></button>
              <button type="button" class="rb-ic" :disabled="!sel.text" title="Decrease Font Size" @click="stepSize(-1)"><RibbonIcon name="shrink" /></button>
              <button type="button" class="rb-ic" :disabled="!sel.text" title="Clear All Formatting" @click="clearText"><RibbonIcon name="eraser" /></button>
            </div>
            <div class="flex items-center gap-0.5">
              <button type="button" class="rb-ic font-bold" :class="{ 'rb-on': sel.bold }" :disabled="!sel.text" title="Bold" @click="setProp('fontWeight', sel.bold ? 'normal' : 'bold')">B</button>
              <button type="button" class="rb-ic italic font-serif" :class="{ 'rb-on': sel.italic }" :disabled="!sel.text" title="Italic" @click="setProp('fontStyle', sel.italic ? 'normal' : 'italic')">I</button>
              <button type="button" class="rb-ic underline" :class="{ 'rb-on': sel.underline }" :disabled="!sel.text" title="Underline" @click="setProp('underline', !sel.underline)">U</button>
              <button type="button" class="rb-ic text-xs font-bold" :class="{ 'rb-on': sel.shadow }" :disabled="!sel.text" title="Text Shadow" @click="toggleShadow">S</button>
              <button type="button" class="rb-ic line-through text-xs" :class="{ 'rb-on': sel.strike }" :disabled="!sel.text" title="Strikethrough" @click="setProp('linethrough', !sel.strike)">abc</button>
              <div class="relative" data-menu>
                <button type="button" class="rb-ic text-[11px]" :disabled="!sel.text" title="Character Spacing" @click="toggleMenu('spacing')">AV▾</button>
                <div v-if="menu === 'spacing'" class="rb-menu w-36 py-1">
                  <button v-for="c in CHAR_SPACING" :key="c.v" type="button" class="rb-item" :class="{ 'font-semibold': sel.charSpacing === c.v }" @click="setProp('charSpacing', c.v); menu = null">{{ c.label }}</button>
                </div>
              </div>
              <div class="relative" data-menu>
                <button type="button" class="rb-ic text-[11px]" :disabled="!sel.text" title="Change Case" @click="toggleMenu('case')">Aa▾</button>
                <div v-if="menu === 'case'" class="rb-menu w-44 py-1">
                  <button v-for="c in CASES" :key="c.key" type="button" class="rb-item" @click="changeCase(c.key)">{{ c.label }}</button>
                </div>
              </div>
              <label class="rb-ic relative cursor-pointer" :aria-disabled="!sel.text" title="Text Highlight Colour">
                <span class="text-[11px] font-bold px-0.5" :style="{ background: sel.highlight || '#ffff00' }">ab</span>
                <input type="color" class="absolute inset-0 opacity-0 cursor-pointer" :value="sel.highlight || '#ffff00'" @input="setProp('textBackgroundColor', ($event.target as HTMLInputElement).value)">
              </label>
              <label class="rb-ic relative cursor-pointer" :aria-disabled="!sel.text" title="Font Colour">
                <span class="font-bold border-b-[3px] leading-none" :style="{ borderColor: sel.color }">A</span>
                <input type="color" class="absolute inset-0 opacity-0 cursor-pointer" :value="sel.color" @input="setProp('fill', ($event.target as HTMLInputElement).value)">
              </label>
            </div>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Paragraph">
          <div class="flex flex-col gap-1">
            <div class="flex items-center gap-0.5">
              <button type="button" class="rb-ic" :disabled="!sel.text" title="Bullets" @click="toggleList('bullet')"><RibbonIcon name="bullets" /></button>
              <button type="button" class="rb-ic" :disabled="!sel.text" title="Numbering" @click="toggleList('number')"><RibbonIcon name="numbering" /></button>
              <button type="button" class="rb-ic" :disabled="!sel.text" title="Decrease List Level" @click="listLevel(-1)"><RibbonIcon name="outdent" /></button>
              <button type="button" class="rb-ic" :disabled="!sel.text" title="Increase List Level" @click="listLevel(1)"><RibbonIcon name="indent" /></button>
              <select class="rb-select w-14" :disabled="!sel.text" title="Line Spacing" :value="sel.lineHeight" @change="setProp('lineHeight', Number(($event.target as HTMLSelectElement).value))">
                <option v-for="l in [1, 1.15, 1.5, 2, 2.5, 3]" :key="l" :value="l">{{ l.toFixed(1) }}</option>
              </select>
            </div>
            <div class="flex items-center gap-0.5">
              <button v-for="a in ALIGNS" :key="a.v" type="button" class="rb-ic" :class="{ 'rb-on': sel.text && sel.align === a.v }" :disabled="!sel.text" :title="a.t" @click="setProp('textAlign', a.v)"><RibbonIcon :name="a.icon" /></button>
              <div class="relative" data-menu>
                <button type="button" class="rb-sm" :disabled="!sel.any" title="Text Direction" @click="toggleMenu('textDir')"><RibbonIcon name="textDir" />Text Direction ▾</button>
                <div v-if="menu === 'textDir'" class="rb-menu w-44 py-1">
                  <button v-for="d in [{ a: 0, l: 'Horizontal' }, { a: 90, l: 'Rotate all text 90°' }, { a: 270, l: 'Rotate all text 270°' }]" :key="d.a" type="button" class="rb-item" @click="setProp('angle', d.a); menu = null">{{ d.l }}</button>
                </div>
              </div>
            </div>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Drawing">
          <div class="grid grid-cols-6 gap-0.5 p-0.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-sm h-fit">
            <button v-for="s in SHAPES.slice(0, 18)" :key="s.key" type="button" class="w-6 h-6 rounded hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center justify-center" :title="s.label" @click="addShape(s.key)">
              <svg viewBox="0 0 20 20" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.4"><path :d="s.icon" /></svg>
            </button>
          </div>
          <div class="relative" data-menu>
            <button type="button" class="rb-big" :disabled="!sel.any" @click="toggleMenu('arrange')"><RibbonIcon name="front" size="lg" />Arrange ▾</button>
            <div v-if="menu === 'arrange'" class="rb-menu w-48 py-1">
              <p class="rb-head">Order Objects</p>
              <button v-for="a in ARRANGE_ORDER" :key="a.key" type="button" class="rb-item" @click="arrange(a.key)">{{ a.label }}</button>
              <p class="rb-head">Group Objects</p>
              <button type="button" class="rb-item" :disabled="!sel.multi" @click="groupSelected">Group</button>
              <button type="button" class="rb-item" :disabled="!sel.group" @click="ungroupSelected">Ungroup</button>
              <p class="rb-head">Position Objects</p>
              <button v-for="a in ARRANGE_ALIGN" :key="a.key" type="button" class="rb-item" @click="arrange(a.key)">{{ a.label }}</button>
              <button v-for="a in ARRANGE_ROTATE" :key="a.key" type="button" class="rb-item" @click="arrange(a.key)">{{ a.label }}</button>
              <button type="button" class="rb-item" @click="openPane('selection')">Selection Pane…</button>
            </div>
          </div>
          <div class="relative" data-menu>
            <button type="button" class="rb-big" :disabled="!sel.shape" @click="toggleMenu('quick')"><RibbonIcon name="quickStyles" size="lg" />Quick<br>Styles ▾</button>
            <div v-if="menu === 'quick'" class="rb-menu w-56 p-1.5 grid grid-cols-4 gap-1">
              <button v-for="(q, qi) in quickStyles" :key="qi" type="button" class="h-9 rounded-sm border text-xs font-semibold" :style="{ background: q.fill, borderColor: q.stroke || 'transparent', borderWidth: `${q.strokeWidth || 0}px`, color: q.text, boxShadow: q.shadow ? '2px 2px 4px rgba(0,0,0,.4)' : 'none' }" @click="applyQuickStyle(q)">Abc</button>
            </div>
          </div>
          <div class="flex flex-col">
            <label class="rb-sm relative cursor-pointer" :aria-disabled="!sel.shape"><RibbonIcon name="fill" />Shape Fill <span class="w-3 h-3 border" :style="{ background: sel.fill }"></span><input type="color" class="absolute inset-0 opacity-0 cursor-pointer" :value="sel.fill" @input="setProp('fill', ($event.target as HTMLInputElement).value)"></label>
            <div class="relative" data-menu>
              <button type="button" class="rb-sm" :disabled="!sel.any" @click="toggleMenu('outline')"><RibbonIcon name="outline" />Shape Outline <span class="w-3 h-3 border-2" :style="{ borderColor: sel.stroke }"></span> ▾</button>
              <div v-if="menu === 'outline'" class="rb-menu w-44 py-1">
                <label class="rb-item relative cursor-pointer">Colour… <input type="color" class="absolute inset-0 opacity-0 cursor-pointer" :value="sel.stroke" @input="setOutline(($event.target as HTMLInputElement).value)"></label>
                <button type="button" class="rb-item" @click="setProp('strokeWidth', 0); menu = null">No Outline</button>
                <p class="rb-head">Weight</p>
                <button v-for="w in [1, 2, 3, 4.5, 6]" :key="w" type="button" class="rb-item" :class="{ 'font-semibold': sel.strokeWidth === w }" @click="setOutlineWeight(w)">{{ w }} pt</button>
                <p class="rb-head">Dashes</p>
                <button v-for="d in DASHES" :key="d.label" type="button" class="rb-item" @click="setProp('strokeDashArray', d.v); menu = null">{{ d.label }}</button>
              </div>
            </div>
            <div class="relative" data-menu>
              <button type="button" class="rb-sm" :disabled="!sel.any" @click="toggleMenu('effects')"><RibbonIcon name="effects" />Shape Effects ▾</button>
              <div v-if="menu === 'effects'" class="rb-menu w-40 py-1">
                <button v-for="e in SHAPE_EFFECTS" :key="e.key" type="button" class="rb-item" @click="applyEffect(e.key)">{{ e.label }}</button>
              </div>
            </div>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Editing">
          <div class="flex flex-col">
            <button type="button" class="rb-sm" @click="openDialog('find')"><RibbonIcon name="find" />Find</button>
            <button type="button" class="rb-sm" @click="openDialog('replace')"><RibbonIcon name="replace" />Replace</button>
            <div class="relative" data-menu>
              <button type="button" class="rb-sm" @click="toggleMenu('select')"><RibbonIcon name="select" />Select ▾</button>
              <div v-if="menu === 'select'" class="rb-menu w-40 py-1">
                <button type="button" class="rb-item" @click="selectAll(); menu = null">Select All</button>
                <button type="button" class="rb-item" @click="openPane('selection')">Selection Pane…</button>
              </div>
            </div>
          </div>
        </RibbonGroup>
      </template>

      <!-- Insert -->
      <template v-else-if="tab === 'Insert'">
        <RibbonGroup label="Slides">
          <div class="relative" data-menu>
            <button type="button" class="rb-big" @click="toggleMenu('new')"><RibbonIcon name="newSlide" size="lg" />New<br>Slide ▾</button>
            <div v-if="menu === 'new'" class="rb-menu w-64 p-1.5 grid grid-cols-2 gap-1">
              <button v-for="l in LAYOUTS" :key="l.key" type="button" class="text-left rounded border border-gray-200 dark:border-gray-600 hover:border-[#b7472a] p-1" @click="addSlide(l.key)">
                <span class="block aspect-video bg-gray-50 dark:bg-gray-700 rounded-sm mb-0.5 text-[8px] text-gray-400 flex items-center justify-center">{{ l.label }}</span>
                <span class="block text-[11px]">{{ l.label }}</span>
              </button>
            </div>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Tables">
          <div class="relative" data-menu>
            <button type="button" class="rb-big" @click="toggleMenu('table')"><RibbonIcon name="table" size="lg" />Table ▾</button>
            <div v-if="menu === 'table'" class="rb-menu p-2">
              <p class="text-[11px] mb-1">{{ tableHover.r && tableHover.c ? `${tableHover.c}x${tableHover.r} Table` : 'Insert Table' }}</p>
              <div class="grid grid-cols-8 gap-0.5" @mouseleave="tableHover = { r: 0, c: 0 }">
                <template v-for="r in 6" :key="r">
                  <button v-for="c in 8" :key="c" type="button" class="w-4 h-4 border" :class="r <= tableHover.r && c <= tableHover.c ? 'bg-orange-200 border-[#b7472a]' : 'border-gray-300 dark:border-gray-500'" @mouseenter="tableHover = { r, c }" @click="insertTable(r, c)"></button>
                </template>
              </div>
            </div>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Images">
          <label class="rb-big cursor-pointer"><RibbonIcon name="picture" size="lg" />Pictures<input type="file" accept="image/*" class="hidden" @change="addPicture"></label>
          <button type="button" class="rb-big" @click="takeScreenshot"><RibbonIcon name="screenshot" size="lg" />Screenshot</button>
          <label class="rb-big cursor-pointer"><RibbonIcon name="album" size="lg" />Photo<br>Album<input type="file" accept="image/*" multiple class="hidden" @change="photoAlbum"></label>
        </RibbonGroup>
        <RibbonGroup label="Illustrations">
          <div class="relative" data-menu>
            <button type="button" class="rb-big" @click="toggleMenu('shapes')"><RibbonIcon name="shapes" size="lg" />Shapes ▾</button>
            <div v-if="menu === 'shapes'" class="rb-menu w-56 p-1.5 grid grid-cols-8 gap-0.5">
              <button v-for="s in SHAPES" :key="s.key" type="button" class="w-6 h-6 rounded hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center justify-center" :title="s.label" @click="addShape(s.key); menu = null">
                <svg viewBox="0 0 20 20" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.4"><path :d="s.icon" /></svg>
              </button>
            </div>
          </div>
          <button type="button" class="rb-big" @click="openDialog('smartart')"><RibbonIcon name="smartart" size="lg" />SmartArt</button>
          <button type="button" class="rb-big" @click="openDialog('chart')"><RibbonIcon name="chart" size="lg" />Chart</button>
        </RibbonGroup>
        <RibbonGroup label="Links">
          <button type="button" class="rb-big" :disabled="!sel.any || sel.multi" @click="openDialog('link')"><RibbonIcon name="link2" size="lg" />Link</button>
        </RibbonGroup>
        <RibbonGroup label="Comments">
          <button type="button" class="rb-big" @click="newComment"><RibbonIcon name="newComment" size="lg" />Comment</button>
        </RibbonGroup>
        <RibbonGroup label="Text">
          <button type="button" class="rb-big" @click="addText()"><RibbonIcon name="textbox" size="lg" />Text<br>Box</button>
          <button type="button" class="rb-big" @click="openDialog('hf')"><RibbonIcon name="headerFooter" size="lg" />Header<br>&amp; Footer</button>
          <div class="relative" data-menu>
            <button type="button" class="rb-big" @click="toggleMenu('wordart')"><RibbonIcon name="wordart" size="lg" />WordArt ▾</button>
            <div v-if="menu === 'wordart'" class="rb-menu w-60 p-1.5 grid grid-cols-3 gap-1">
              <button v-for="(w, wi) in wordArts" :key="wi" type="button" class="h-12 rounded border border-gray-200 dark:border-gray-600 hover:border-[#b7472a] text-2xl font-black" :style="{ color: w.fill === 'transparent' ? 'transparent' : w.fill, WebkitTextStroke: w.stroke ? `1px ${w.stroke}` : undefined, textShadow: w.shadow ? '2px 2px 3px rgba(0,0,0,.45)' : 'none', fontFamily: 'Impact, sans-serif' }" @click="insertWordArt(w)">A</button>
            </div>
          </div>
          <button type="button" class="rb-big" @click="addText(new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' }), { fontSize: 18 })"><RibbonIcon name="date" size="lg" />Date &amp;<br>Time</button>
          <button type="button" class="rb-big" @click="setHf(current, { ...(current?.hf || {}), number: true }); refreshHf()"><RibbonIcon name="pageNumber" size="lg" />Slide<br>Number</button>
        </RibbonGroup>
        <RibbonGroup label="Symbols">
          <button type="button" class="rb-big" @click="openDialog('equation')"><RibbonIcon name="equation" size="lg" />Equation</button>
          <div class="relative" data-menu>
            <button type="button" class="rb-big" @click="toggleMenu('symbol')"><RibbonIcon name="symbol" size="lg" />Symbol ▾</button>
            <div v-if="menu === 'symbol'" class="rb-menu right-0 left-auto w-64 p-1.5 grid grid-cols-8 gap-0.5">
              <button v-for="c in SYMBOLS" :key="c" type="button" class="h-7 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-base" @click="insertSymbol(c)">{{ c }}</button>
            </div>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Media">
          <label class="rb-big cursor-pointer"><RibbonIcon name="video" size="lg" />Video<input type="file" accept="video/*" class="hidden" @change="addMediaFile($event, 'video')"></label>
          <label class="rb-big cursor-pointer"><RibbonIcon name="audio" size="lg" />Audio<input type="file" accept="audio/*" class="hidden" @change="addMediaFile($event, 'audio')"></label>
          <button type="button" class="rb-big" :disabled="!!recorder" @click="recordScreen"><RibbonIcon name="screenRec" size="lg" />Screen<br>Recording</button>
        </RibbonGroup>
      </template>

      <!-- Design -->
      <template v-else-if="tab === 'Design'">
        <RibbonGroup label="Themes">
          <div class="flex gap-1">
            <button v-for="t in THEMES" :key="t.name" type="button" class="w-[78px] h-[52px] rounded-sm border-2 overflow-hidden relative flex-shrink-0" :class="theme.name === t.name ? 'border-[#b7472a]' : 'border-gray-300 dark:border-gray-600 hover:border-gray-500'" :style="{ background: t.grad ? `linear-gradient(135deg, ${t.bg}, ${t.grad})` : t.bg }" :title="t.name" @click="applyTheme(t)">
              <span class="absolute left-2 top-1.5 text-base font-semibold" :style="{ color: t.text, fontFamily: t.font }">Aa</span>
              <span class="absolute left-2 bottom-1.5 flex gap-0.5"><span v-for="(c, ci) in [t.accent, t.accent2, t.text, t.accent]" :key="ci" class="w-2.5 h-1.5" :style="{ background: c }"></span></span>
            </button>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Variants">
          <div class="flex gap-1">
            <button v-for="(v, vi) in variants" :key="vi" type="button" class="w-[70px] h-[52px] rounded-sm border-2 overflow-hidden relative" :class="current?.background === v.bg ? 'border-[#b7472a]' : 'border-gray-300 dark:border-gray-600 hover:border-gray-500'" :style="{ background: v.bg }" @click="applyVariant(v)">
              <span class="absolute left-2 bottom-1.5 flex gap-0.5"><span v-for="(c, ci) in [v.accent, v.accent2, v.text]" :key="ci" class="w-2.5 h-1.5" :style="{ background: c }"></span></span>
            </button>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Customize">
          <div class="relative" data-menu>
            <button type="button" class="rb-big" @click="toggleMenu('size')"><RibbonIcon name="slideSize" size="lg" />Slide<br>Size ▾</button>
            <div v-if="menu === 'size'" class="rb-menu w-48 py-1">
              <button type="button" class="rb-item" :class="{ 'font-semibold': size === '4x3' }" @click="setSlideSize('4x3')">Standard (4:3)</button>
              <button type="button" class="rb-item" :class="{ 'font-semibold': size === '16x9' }" @click="setSlideSize('16x9')">Widescreen (16:9)</button>
            </div>
          </div>
          <button type="button" class="rb-big" @click="openPane('background')"><RibbonIcon name="background" size="lg" />Format<br>Background</button>
        </RibbonGroup>
      </template>

      <!-- Transitions -->
      <template v-else-if="tab === 'Transitions'">
        <RibbonGroup label="Preview">
          <button type="button" class="rb-big" :disabled="!current?.transition || current.transition.type === 'none'" @click="previewTransition"><RibbonIcon name="play" size="lg" />Preview</button>
        </RibbonGroup>
        <RibbonGroup label="Transition to This Slide">
          <div class="flex gap-0.5">
            <button v-for="t in TRANSITIONS" :key="t.key" type="button" class="rb-big w-[62px]" :class="{ 'rb-on': (current?.transition?.type || 'none') === t.key }" @click="setTransition(t.key)">
              <span class="w-9 h-7 rounded-sm border border-gray-300 dark:border-gray-500 bg-gradient-to-br from-sky-100 to-sky-400 dark:from-sky-800 dark:to-sky-500 flex items-center justify-center"><RibbonIcon :name="t.key === 'none' ? 'cross' : 'transition'" /></span>
              {{ t.label }}
            </button>
          </div>
          <div class="relative" data-menu>
            <button type="button" class="rb-big" :disabled="!transitionDirs.length" @click="toggleMenu('transDir')"><RibbonIcon name="effects" size="lg" />Effect<br>Options ▾</button>
            <div v-if="menu === 'transDir'" class="rb-menu right-0 left-auto w-36 py-1">
              <button v-for="d in transitionDirs" :key="d" type="button" class="rb-item" :class="{ 'font-semibold': current?.transition?.dir === d }" @click="setTransitionProp('dir', d)">{{ DIR_LABEL[d] }}</button>
            </div>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Timing">
          <div class="flex flex-col gap-1 text-xs">
            <label class="flex items-center gap-1"><RibbonIcon name="clock" />Duration: <input type="number" min="0.1" max="20" step="0.25" class="rb-select w-16" :value="current?.transition?.duration ?? 1" @change="setTransitionProp('duration', Number(($event.target as HTMLInputElement).value) || 1)"></label>
            <button type="button" class="rb-sm" @click="applyTransitionToAll"><RibbonIcon name="theme" />Apply To All</button>
          </div>
          <div class="flex flex-col gap-1 text-xs pl-2">
            <span class="font-semibold text-[11px]">Advance Slide</span>
            <label class="flex items-center gap-1"><input type="checkbox" :checked="current?.advance?.click !== false" @change="setAdvance('click', ($event.target as HTMLInputElement).checked)"> On Mouse Click</label>
            <label class="flex items-center gap-1"><input type="checkbox" :checked="current?.advance?.after != null" @change="setAdvance('after', ($event.target as HTMLInputElement).checked ? 5 : null)"> After: <input type="number" min="0" step="1" class="rb-select w-14" :disabled="current?.advance?.after == null" :value="current?.advance?.after ?? 0" @change="setAdvance('after', Number(($event.target as HTMLInputElement).value) || 0)"> s</label>
          </div>
        </RibbonGroup>
      </template>

      <!-- Animations -->
      <template v-else-if="tab === 'Animations'">
        <RibbonGroup label="Preview">
          <button type="button" class="rb-big" :disabled="!animatedHere.length" @click="previewAnimations"><RibbonIcon name="play" size="lg" />Preview</button>
        </RibbonGroup>
        <RibbonGroup label="Animation">
          <div class="flex gap-0.5">
            <button type="button" class="rb-big w-[54px]" :class="{ 'rb-on': sel.any && !sel.anim }" :disabled="!sel.single" @click="setAnimation(null)"><span class="w-7 h-7 flex items-center justify-center text-gray-400"><RibbonIcon name="animate" size="lg" /></span>None</button>
            <button v-for="a in ANIMATIONS" :key="a.key" type="button" class="rb-big w-[58px]" :class="{ 'rb-on': sel.anim?.effect === a.key }" :disabled="!sel.single" @click="setAnimation(a.key)">
              <span class="w-7 h-7 flex items-center justify-center" :class="a.kind === 'entrance' ? 'text-emerald-600' : 'text-amber-500'"><RibbonIcon name="animate" size="lg" /></span>{{ a.label }}
            </button>
          </div>
          <div class="relative" data-menu>
            <button type="button" class="rb-big" :disabled="!animDirs.length" @click="toggleMenu('animDir')"><RibbonIcon name="effects" size="lg" />Effect<br>Options ▾</button>
            <div v-if="menu === 'animDir'" class="rb-menu right-0 left-auto w-36 py-1">
              <button v-for="d in animDirs" :key="d" type="button" class="rb-item" :class="{ 'font-semibold': sel.anim?.dir === d }" @click="setAnimProp('dir', d)">{{ DIR_LABEL[d] }}</button>
            </div>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Advanced Animation">
          <div class="flex flex-col">
            <button type="button" class="rb-sm" :class="{ 'rb-on': pane === 'animation' }" @click="openPane('animation')"><RibbonIcon name="pane" />Animation Pane</button>
            <button type="button" class="rb-sm" :class="{ 'rb-on': animPainter }" :disabled="!sel.anim" @click="startAnimPainter"><RibbonIcon name="painterAnim" />Animation Painter</button>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Timing">
          <div class="flex flex-col gap-1 text-xs">
            <label class="flex items-center gap-1 justify-between">Start: <select class="rb-select w-32" :disabled="!sel.anim" :value="sel.anim?.start || 'click'" @change="setAnimProp('start', ($event.target as HTMLSelectElement).value)"><option value="click">On Click</option><option value="with">With Previous</option><option value="after">After Previous</option></select></label>
            <label class="flex items-center gap-1 justify-between">Duration: <input type="number" min="0.1" max="20" step="0.25" class="rb-select w-20" :disabled="!sel.anim" :value="sel.anim?.duration ?? 0.5" @change="setAnimProp('duration', Number(($event.target as HTMLInputElement).value) || 0.5)"></label>
            <label class="flex items-center gap-1 justify-between">Delay: <input type="number" min="0" max="60" step="0.25" class="rb-select w-20" :disabled="!sel.anim" :value="sel.anim?.delay ?? 0" @change="setAnimProp('delay', Number(($event.target as HTMLInputElement).value) || 0)"></label>
          </div>
          <div class="flex flex-col text-xs pl-1">
            <span class="font-semibold text-[11px] px-1">Reorder Animation</span>
            <button type="button" class="rb-sm" :disabled="!sel.anim" @click="moveAnim(-1)"><RibbonIcon name="earlier" />Move Earlier</button>
            <button type="button" class="rb-sm" :disabled="!sel.anim" @click="moveAnim(1)"><RibbonIcon name="later" />Move Later</button>
          </div>
        </RibbonGroup>
      </template>

      <!-- Slide Show -->
      <template v-else-if="tab === 'Slide Show'">
        <RibbonGroup label="Start Slide Show">
          <button type="button" class="rb-big" @click="startShow(0)"><RibbonIcon name="play" size="lg" />From<br>Beginning</button>
          <button type="button" class="rb-big" @click="startShow(index)"><RibbonIcon name="playFrom" size="lg" />From Current<br>Slide</button>
        </RibbonGroup>
        <RibbonGroup label="Set Up">
          <button type="button" class="rb-big" @click="openDialog('setup')"><RibbonIcon name="setupShow" size="lg" />Set Up<br>Slide Show</button>
          <button type="button" class="rb-big" :class="{ 'rb-on': current?.hidden }" @click="toggleHidden"><RibbonIcon name="hideSlide" size="lg" />Hide<br>Slide</button>
          <button type="button" class="rb-big" @click="startShow(0, 'rehearse')"><RibbonIcon name="rehearse" size="lg" />Rehearse<br>Timings</button>
          <div class="relative" data-menu>
            <button type="button" class="rb-big" :disabled="!!recorder" @click="toggleMenu('record')"><RibbonIcon name="record" size="lg" />Record ▾</button>
            <div v-if="menu === 'record'" class="rb-menu w-56 py-1">
              <button type="button" class="rb-item" @click="recordNarration">Record narration for this slide</button>
              <button type="button" class="rb-item" :disabled="!current?.narration" @click="clearNarration(false)">Clear narration on this slide</button>
              <button type="button" class="rb-item" :disabled="!slides.some(s => s.narration)" @click="clearNarration(true)">Clear narration on all slides</button>
              <button type="button" class="rb-item" :disabled="!slides.some(s => s.advance?.after != null)" @click="clearTimings">Clear timings on all slides</button>
            </div>
          </div>
          <div class="flex flex-col text-xs gap-0.5 pl-1">
            <label class="flex items-center gap-1"><input v-model="setup.narrations" type="checkbox" @change="$emit('change')"> Play Narrations</label>
            <label class="flex items-center gap-1"><input v-model="setup.timings" type="checkbox" @change="$emit('change')"> Use Timings</label>
            <label class="flex items-center gap-1"><input v-model="setup.mediaControls" type="checkbox" @change="$emit('change')"> Show Media Controls</label>
          </div>
        </RibbonGroup>
      </template>

      <!-- Record -->
      <template v-else-if="tab === 'Record'">
        <RibbonGroup label="Record">
          <div class="relative" data-menu>
            <button type="button" class="rb-big" :disabled="!!recorder" @click="toggleMenu('record')"><RibbonIcon name="record" size="lg" />Record ▾</button>
            <div v-if="menu === 'record'" class="rb-menu w-56 py-1">
              <button type="button" class="rb-item" @click="recordNarration">Record narration for this slide</button>
              <button type="button" class="rb-item" :disabled="!current?.narration" @click="clearNarration(false)">Clear narration on this slide</button>
              <button type="button" class="rb-item" :disabled="!slides.some(s => s.narration)" @click="clearNarration(true)">Clear narration on all slides</button>
            </div>
          </div>
        </RibbonGroup>
        <RibbonGroup label="Content">
          <button type="button" class="rb-big" @click="takeScreenshot"><RibbonIcon name="screenshot" size="lg" />Screenshot</button>
        </RibbonGroup>
        <RibbonGroup label="Auto-play Media">
          <button type="button" class="rb-big" :disabled="!!recorder" @click="recordScreen"><RibbonIcon name="screenRec" size="lg" />Screen<br>Recording</button>
          <label class="rb-big cursor-pointer"><RibbonIcon name="video" size="lg" />Video<input type="file" accept="video/*" class="hidden" @change="addMediaFile($event, 'video')"></label>
          <label class="rb-big cursor-pointer"><RibbonIcon name="audio" size="lg" />Audio<input type="file" accept="audio/*" class="hidden" @change="addMediaFile($event, 'audio')"></label>
        </RibbonGroup>
        <RibbonGroup label="Save">
          <button type="button" class="rb-big" @click="$emit('download')"><RibbonIcon name="download" size="lg" />Download<br>as .pptx</button>
        </RibbonGroup>
      </template>

      <!-- Review -->
      <template v-else-if="tab === 'Review'">
        <RibbonGroup label="Proofing">
          <button type="button" class="rb-big" :class="{ 'rb-on': pane === 'spelling' }" @click="openPane('spelling')"><RibbonIcon name="spelling" size="lg" />Spelling</button>
          <button type="button" class="rb-big" disabled><RibbonIcon name="thesaurus" size="lg" />Thesaurus</button>
        </RibbonGroup>
        <RibbonGroup label="Accessibility">
          <button type="button" class="rb-big" :class="{ 'rb-on': pane === 'accessibility' }" @click="openPane('accessibility')"><RibbonIcon name="accessibility" size="lg" />Check<br>Accessibility</button>
        </RibbonGroup>
        <RibbonGroup label="Comments">
          <button type="button" class="rb-big" @click="newComment"><RibbonIcon name="newComment" size="lg" />New<br>Comment</button>
          <button type="button" class="rb-big" :disabled="!current?.comments?.length" @click="deleteComment(current!.comments!.length - 1)"><RibbonIcon name="trash" size="lg" />Delete</button>
          <button type="button" class="rb-big" :disabled="!hasCommentsElsewhere" @click="commentStep(-1)"><RibbonIcon name="prev" size="lg" />Previous</button>
          <button type="button" class="rb-big" :disabled="!hasCommentsElsewhere" @click="commentStep(1)"><RibbonIcon name="next" size="lg" />Next</button>
          <button type="button" class="rb-big" :class="{ 'rb-on': pane === 'comments' }" @click="openPane('comments')"><RibbonIcon name="comment" size="lg" />Show<br>Comments</button>
        </RibbonGroup>
      </template>

      <!-- View -->
      <template v-else-if="tab === 'View'">
        <RibbonGroup label="Presentation Views">
          <button type="button" class="rb-big" :class="{ 'rb-on': view === 'normal' }" @click="setView('normal')"><RibbonIcon name="normalView" size="lg" />Normal</button>
          <button type="button" class="rb-big" :class="{ 'rb-on': view === 'outline' }" @click="setView('outline')"><RibbonIcon name="outlineView" size="lg" />Outline<br>View</button>
          <button type="button" class="rb-big" :class="{ 'rb-on': view === 'sorter' }" @click="setView('sorter')"><RibbonIcon name="sorter" size="lg" />Slide<br>Sorter</button>
          <button type="button" class="rb-big" :class="{ 'rb-on': view === 'notes' }" @click="setView('notes')"><RibbonIcon name="notesPage" size="lg" />Notes<br>Page</button>
          <button type="button" class="rb-big" @click="startShow(index, 'reading')"><RibbonIcon name="readMode" size="lg" />Reading<br>View</button>
        </RibbonGroup>
        <RibbonGroup label="Show">
          <div class="flex flex-col text-xs gap-0.5">
            <label class="flex items-center gap-1"><input v-model="ruler" type="checkbox"> Ruler</label>
            <label class="flex items-center gap-1"><input v-model="gridlines" type="checkbox" @change="canvas?.requestRenderAll()"> Gridlines</label>
            <label class="flex items-center gap-1"><input v-model="guides" type="checkbox" @change="canvas?.requestRenderAll()"> Guides</label>
          </div>
          <button type="button" class="rb-big" :class="{ 'rb-on': showNotes }" @click="showNotes = !showNotes"><RibbonIcon name="notes" size="lg" />Notes</button>
        </RibbonGroup>
        <RibbonGroup label="Zoom">
          <button type="button" class="rb-big" @click="openDialog('zoom')"><RibbonIcon name="zoom" size="lg" />Zoom</button>
          <button type="button" class="rb-big" @click="setZoom(null)"><RibbonIcon name="pageWidth" size="lg" />Fit to<br>Window</button>
        </RibbonGroup>
        <RibbonGroup label="Color/Grayscale">
          <div class="flex flex-col text-xs">
            <button v-for="m in COLOR_MODES" :key="m.key" type="button" class="rb-sm" :class="{ 'rb-on': colorMode === m.key }" @click="colorMode = m.key"><span class="w-3 h-3 border border-gray-500" :style="{ background: m.swatch }"></span>{{ m.label }}</button>
          </div>
        </RibbonGroup>
      </template>
    </OfficeRibbon>

    <div class="flex-1 min-h-0 flex">
      <!-- The slides (thumbnails), or the outline -->
      <aside v-if="view === 'normal' || view === 'outline'" class="w-28 sm:w-48 flex-shrink-0 overflow-y-auto bg-[#e6e6e6] dark:bg-gray-900 p-2 border-r border-gray-300 dark:border-gray-700" :class="view === 'outline' ? 'sm:w-64 bg-white dark:bg-gray-800' : ''">
        <template v-if="view === 'normal'">
          <div v-for="(s, i) in slides" :key="s.id">
            <p v-if="s.section" class="text-[11px] font-semibold text-gray-700 dark:text-gray-200 mt-2 mb-1 truncate">▾ {{ s.section }}</p>
            <div class="flex items-start gap-1 mb-3">
              <span class="w-5 text-[11px] text-right pt-1 flex flex-col items-end gap-0.5" :class="i === index ? 'text-[#b7472a] font-semibold' : 'text-gray-600 dark:text-gray-400'">
                <span :class="{ 'line-through opacity-60': s.hidden }">{{ i + 1 }}</span>
                <span v-if="s.transition && s.transition.type !== 'none'" class="text-[9px]" title="Has a transition">✦</span>
                <span v-if="s.comments?.length" class="text-[9px]" title="Has comments">💬</span>
              </span>
              <button type="button" class="flex-1 overflow-hidden bg-white border-2" :class="[i === index ? 'border-[#b7472a]' : 'border-transparent hover:border-gray-400', { 'opacity-50': s.hidden }]" :style="{ aspectRatio: `${W} / ${H}` }" @click="goTo(i)">
                <img v-if="thumbs[s.id]" :src="thumbs[s.id]" alt="" class="w-full h-full object-cover">
              </button>
            </div>
          </div>
          <div v-if="!readonly" class="flex justify-center gap-1 pt-1">
            <button type="button" class="px-2 py-0.5 rounded text-xs hover:bg-white/60 dark:hover:bg-gray-800" :disabled="index === 0" title="Move slide up" @click="moveSlide(-1)">▲</button>
            <button type="button" class="px-2 py-0.5 rounded text-xs hover:bg-white/60 dark:hover:bg-gray-800" :disabled="index === slides.length - 1" title="Move slide down" @click="moveSlide(1)">▼</button>
          </div>
        </template>
        <ol v-else class="space-y-2 text-xs">
          <li v-for="(o, i) in outline" :key="slides[i].id" class="cursor-pointer rounded px-1 py-1" :class="i === index ? 'bg-orange-50 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'" @click="goTo(i)">
            <p class="font-semibold text-gray-900 dark:text-white flex gap-1"><span class="text-gray-500 w-4 text-right">{{ i + 1 }}</span><span class="w-3 h-2.5 mt-0.5 border border-gray-400"></span>{{ o.title || '(No title)' }}</p>
            <p v-for="(b, bi) in o.body" :key="bi" class="pl-9 text-gray-700 dark:text-gray-300 break-words">{{ b }}</p>
          </li>
        </ol>
      </aside>

      <div class="flex-1 min-w-0 flex flex-col">
        <!-- Slide Sorter -->
        <div v-if="view === 'sorter'" class="flex-1 min-h-0 overflow-y-auto p-6">
          <template v-for="(s, i) in slides" :key="s.id">
            <p v-if="s.section || i === 0" class="w-full text-xs font-semibold text-gray-700 dark:text-gray-200 mb-2" :class="{ 'mt-4': i > 0 }">{{ s.section || (slides.some(x => x.section) ? 'Default Section' : '') }}</p>
            <div class="inline-flex flex-col items-start mr-5 mb-5 align-top">
              <button type="button" class="w-48 bg-white border-[3px] overflow-hidden" :class="[i === index ? 'border-[#b7472a]' : 'border-transparent hover:border-gray-400', { 'opacity-50': s.hidden }]" :style="{ aspectRatio: `${W} / ${H}` }" @click="goTo(i)" @dblclick="goTo(i); setView('normal')">
                <img v-if="thumbs[s.id]" :src="thumbs[s.id]" alt="" class="w-full h-full object-cover">
              </button>
              <span class="mt-1 text-[11px] text-gray-600 dark:text-gray-300 flex gap-2"><span :class="{ 'line-through': s.hidden }">{{ i + 1 }}</span><span v-if="s.transition && s.transition.type !== 'none'">✦</span><span v-if="s.advance?.after != null">{{ clock(s.advance.after) }}</span></span>
            </div>
          </template>
        </div>

        <!-- Notes Page -->
        <div v-else-if="view === 'notes'" class="flex-1 min-h-0 overflow-y-auto p-6 flex justify-center">
          <div class="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-md p-8 h-fit">
            <img v-if="thumbs[current?.id || '']" :src="thumbs[current!.id]" alt="" class="w-full border border-gray-300" :style="{ aspectRatio: `${W} / ${H}` }">
            <textarea :value="current?.notes || ''" :readonly="readonly" rows="10" class="mt-6 w-full p-2 text-sm bg-transparent border border-dashed border-gray-300 dark:border-gray-600 resize-y outline-none text-gray-800 dark:text-gray-100" :placeholder="readonly ? '' : 'Click to add text'" @input="setNotes(($event.target as HTMLTextAreaElement).value)"></textarea>
          </div>
        </div>

        <!-- The slide (always there, so the drawing surface keeps its work) -->
        <div v-show="view === 'normal' || view === 'outline'" class="flex-1 min-h-0 flex flex-col">
          <div v-if="ruler" class="flex-shrink-0 h-4 ml-4 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600 overflow-hidden flex justify-center">
            <div class="h-full" :style="{ width: `${W * scale}px`, backgroundImage: rulerTicks('x'), backgroundSize: `${(W * scale) / 20}px 100%` }"></div>
          </div>
          <div class="flex-1 min-h-0 flex">
            <div v-if="ruler" class="flex-shrink-0 w-4 bg-white dark:bg-gray-800 border-r border-gray-300 dark:border-gray-600 overflow-hidden flex items-center">
              <div class="w-full" :style="{ height: `${H * scale}px`, backgroundImage: rulerTicks('y'), backgroundSize: `100% ${(H * scale) / 12}px` }"></div>
            </div>
            <div ref="stage" class="relative flex-1 min-w-0 flex p-3 sm:p-6" :class="zoomPct === null ? 'items-center justify-center overflow-hidden' : 'overflow-auto'">
              <div ref="slideEl" class="shadow-md relative m-auto flex-shrink-0" :style="{ width: `${W * scale}px`, height: `${H * scale}px`, filter: COLOR_MODES.find(m => m.key === colorMode)?.filter }">
                <canvas ref="canvasEl"></canvas>
                <button v-if="current?.comments?.length" type="button" class="absolute -left-2 -top-2 z-10 px-1.5 py-0.5 rounded bg-amber-300 text-[10px] font-bold text-gray-900 shadow" :title="`${current.comments.length} comment(s)`" @click="openPane('comments')">💬 {{ current.comments.length }}</button>
              </div>
              <SlideShow
                v-if="show && show.mode === 'preview'"
                :slides="show.slides"
                :start="show.start"
                :preview-from="show.from"
                mode="preview"
                :aspect="W / H"
                :play-narrations="false"
                :use-timings="false"
                @close="show = null"
              />
            </div>
          </div>
          <!-- Its notes -->
          <div v-if="showNotes" class="flex-shrink-0 border-t border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
            <textarea
              :value="current?.notes || ''"
              :readonly="readonly"
              rows="2"
              class="w-full px-4 py-2 text-sm bg-transparent resize-none outline-none text-gray-800 dark:text-gray-100"
              :placeholder="readonly ? '' : 'Click to add notes'"
              @input="setNotes(($event.target as HTMLTextAreaElement).value)"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Panes on the right -->
      <aside v-if="pane" class="w-64 sm:w-72 flex-shrink-0 border-l border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col text-sm">
        <div class="flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-gray-700">
          <p class="font-semibold text-gray-900 dark:text-white">{{ PANE_TITLES[pane] }}</p>
          <button type="button" class="text-gray-500 hover:text-gray-800 dark:hover:text-white" title="Close" @click="pane = null">✕</button>
        </div>
        <div class="flex-1 min-h-0 overflow-y-auto p-3 space-y-3">
          <!-- Comments -->
          <template v-if="pane === 'comments'">
            <p v-if="!current?.comments?.length" class="text-xs text-gray-500">No comments on this slide yet.</p>
            <div v-for="(cm, ci) in current?.comments || []" :key="cm.id" class="rounded border border-gray-200 dark:border-gray-700 p-2">
              <p class="text-[11px] text-gray-500 flex justify-between">{{ when(cm.at) }}<button v-if="!readonly" type="button" class="hover:text-rose-600" title="Delete comment" @click="deleteComment(ci)">✕</button></p>
              <p class="mt-1 text-gray-800 dark:text-gray-100 whitespace-pre-line break-words">{{ cm.text }}</p>
            </div>
            <div v-if="!readonly" class="space-y-1.5">
              <textarea ref="commentBox" v-model="commentDraft" rows="3" class="w-full px-2 py-1.5 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" placeholder="Type your comment"></textarea>
              <button type="button" class="px-3 py-1 rounded text-xs font-semibold text-white bg-[#b7472a] disabled:opacity-50" :disabled="!commentDraft.trim()" @click="postComment">Post</button>
            </div>
            <div class="flex gap-2 text-xs">
              <button type="button" class="px-2 py-1 rounded border border-gray-300 dark:border-gray-600" :disabled="!hasCommentsElsewhere" @click="commentStep(-1)">◀ Previous</button>
              <button type="button" class="px-2 py-1 rounded border border-gray-300 dark:border-gray-600" :disabled="!hasCommentsElsewhere" @click="commentStep(1)">Next ▶</button>
            </div>
          </template>

          <!-- Animation Pane -->
          <template v-else-if="pane === 'animation'">
            <button type="button" class="px-3 py-1 rounded text-xs font-semibold border border-gray-300 dark:border-gray-600" :disabled="!animatedHere.length" @click="previewAnimations">▶ Play All</button>
            <p v-if="!animatedHere.length" class="text-xs text-gray-500">Nothing on this slide is animated. Select something, then pick an animation on the Animations tab.</p>
            <ol class="space-y-1">
              <li v-for="a in animatedHere" :key="a.order" class="flex items-center gap-1.5 rounded px-1.5 py-1 cursor-pointer text-xs" :class="a.obj === activeObj ? 'bg-orange-50 dark:bg-gray-700 ring-1 ring-[#b7472a]' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'" @click="selectObj(a.obj)">
                <span class="w-5 text-right text-gray-500">{{ a.start === 'click' ? a.group : '' }}</span>
                <span :class="a.kind === 'entrance' ? 'text-emerald-600' : 'text-amber-500'">★</span>
                <span class="flex-1 min-w-0 truncate">{{ a.label }} · {{ objName(a.obj) }}</span>
                <span class="text-[10px] text-gray-400">{{ a.start === 'click' ? '' : a.start === 'with' ? 'with' : 'after' }}</span>
                <button type="button" class="px-1 hover:text-rose-600" title="Remove" @click.stop="selectObj(a.obj); setAnimation(null)">✕</button>
              </li>
            </ol>
            <div v-if="sel.anim" class="flex gap-2 text-xs">
              <button type="button" class="px-2 py-1 rounded border border-gray-300 dark:border-gray-600" @click="moveAnim(-1)">▲ Earlier</button>
              <button type="button" class="px-2 py-1 rounded border border-gray-300 dark:border-gray-600" @click="moveAnim(1)">▼ Later</button>
            </div>
          </template>

          <!-- Selection Pane -->
          <template v-else-if="pane === 'selection'">
            <p class="text-[11px] text-gray-500">Top of the list is in front. Click to select, the eye to hide or show.</p>
            <ul class="space-y-0.5">
              <li v-for="(o, oi) in layers" :key="oi" class="flex items-center gap-1.5 rounded px-1.5 py-1 cursor-pointer text-xs" :class="o === activeObj ? 'bg-orange-50 dark:bg-gray-700 ring-1 ring-[#b7472a]' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'" @click="selectObj(o)">
                <span class="flex-1 min-w-0 truncate" :class="{ 'opacity-40': !o.visible }">{{ objName(o) }}</span>
                <button type="button" class="px-1" :title="o.visible ? 'Hide' : 'Show'" @click.stop="o.set({ visible: !o.visible }); canvas!.requestRenderAll(); changed()">{{ o.visible ? '👁' : '—' }}</button>
              </li>
            </ul>
            <div class="flex gap-2 text-xs">
              <button type="button" class="px-2 py-1 rounded border border-gray-300 dark:border-gray-600" :disabled="!sel.any" @click="arrange('forward')">▲ Forward</button>
              <button type="button" class="px-2 py-1 rounded border border-gray-300 dark:border-gray-600" :disabled="!sel.any" @click="arrange('backward')">▼ Backward</button>
            </div>
          </template>

          <!-- Accessibility -->
          <template v-else-if="pane === 'accessibility'">
            <p v-if="!accIssues.length" class="text-xs text-emerald-700 dark:text-emerald-300 font-semibold">✓ No accessibility issues found. Good to go.</p>
            <template v-else>
              <p class="text-[11px] font-semibold uppercase tracking-wide text-gray-500">Errors and warnings</p>
              <button v-for="(iss, ii) in accIssues" :key="ii" type="button" class="w-full text-left rounded px-2 py-1.5 text-xs hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-gray-200 dark:border-gray-700" @click="goIssue(iss)">
                <span class="font-semibold">{{ iss.label }}</span><br><span class="text-gray-500">Slide {{ iss.slide + 1 }}<template v-if="iss.what"> · {{ iss.what }}</template></span>
              </button>
            </template>
            <div v-if="sel.image" class="space-y-1 pt-2 border-t border-gray-200 dark:border-gray-700">
              <label class="block text-xs font-semibold">Alt Text for the selected picture</label>
              <textarea rows="2" class="w-full px-2 py-1 text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" :value="sel.alt" placeholder="Describe the picture for someone who can't see it" @change="setProp('tusomeAlt', ($event.target as HTMLTextAreaElement).value)"></textarea>
            </div>
          </template>

          <!-- Spelling -->
          <template v-else-if="pane === 'spelling'">
            <p class="text-[11px] text-gray-500">Words the browser doesn't know are underlined. Right-click one for suggestions; changes go straight onto the slide.</p>
            <label class="flex items-center gap-1 text-xs">Language <select v-model="spellLang" class="rb-select border rounded px-1 py-0.5 text-xs bg-white dark:bg-gray-700"><option value="en-GB">English (UK)</option><option value="en-US">English (US)</option><option value="fr">French</option><option value="sw">Swahili</option></select></label>
            <p v-if="!spellTexts.length" class="text-xs text-gray-500">There is no text on this slide.</p>
            <textarea v-for="(t, ti) in spellTexts" :key="ti" :value="(t as any).text" spellcheck="true" :lang="spellLang" rows="3" class="w-full px-2 py-1 text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" @input="setText(t, ($event.target as HTMLTextAreaElement).value)"></textarea>
          </template>

          <!-- Format Background -->
          <template v-else-if="pane === 'background' && current">
            <input ref="bgPictureInput" type="file" accept="image/*" class="hidden" @change="setBgPicture">
            <div class="space-y-1.5 text-xs">
              <label class="flex items-center gap-1.5"><input type="radio" :checked="bgMode === 'solid'" @change="setBgMode('solid')"> Solid fill</label>
              <label class="flex items-center gap-1.5"><input type="radio" :checked="bgMode === 'gradient'" @change="setBgMode('gradient')"> Gradient fill</label>
              <label class="flex items-center gap-1.5"><input type="radio" :checked="bgMode === 'picture'" @change="setBgMode('picture')"> Picture fill</label>
            </div>
            <div v-if="bgMode === 'solid'" class="text-xs">
              <label class="flex items-center justify-between">Colour <input type="color" :value="current.background" @input="setBackground({ background: ($event.target as HTMLInputElement).value, bgGradient: null, bgImage: null })"></label>
            </div>
            <div v-else-if="bgMode === 'gradient'" class="text-xs space-y-1.5">
              <label class="flex items-center justify-between">From <input type="color" :value="current.bgGradient?.from || current.background" @input="setGradient('from', ($event.target as HTMLInputElement).value)"></label>
              <label class="flex items-center justify-between">To <input type="color" :value="current.bgGradient?.to || theme.accent" @input="setGradient('to', ($event.target as HTMLInputElement).value)"></label>
              <label class="flex items-center justify-between">Angle <select class="border rounded px-1 py-0.5 bg-white dark:bg-gray-700" :value="current.bgGradient?.angle ?? 90" @change="setGradient('angle', Number(($event.target as HTMLSelectElement).value))"><option v-for="a in [0, 45, 90, 135, 180, 270]" :key="a" :value="a">{{ a }}°</option></select></label>
            </div>
            <div v-else class="text-xs space-y-1.5">
              <button type="button" class="inline-flex px-2 py-1 rounded border border-gray-300 dark:border-gray-600" @click="bgPictureInput?.click()">Insert picture…</button>
              <img v-if="current.bgImage" :src="current.bgImage" alt="" class="w-full rounded border">
            </div>
            <div class="flex gap-2 pt-2 border-t border-gray-200 dark:border-gray-700 text-xs">
              <button type="button" class="px-2 py-1 rounded border border-gray-300 dark:border-gray-600" @click="applyBackgroundToAll">Apply to All</button>
              <button type="button" class="px-2 py-1 rounded border border-gray-300 dark:border-gray-600" @click="setBackground({ background: theme.bg, bgGradient: theme.grad ? { from: theme.bg, to: theme.grad, angle: 135 } : null, bgImage: null })">Reset Background</button>
            </div>
          </template>
        </div>
      </aside>
    </div>

    <!-- Status bar, as in PowerPoint -->
    <footer class="flex-shrink-0 flex items-center gap-3 px-3 py-0.5 text-[11px] text-gray-700 dark:text-gray-300 bg-[#f3f3f3] dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700">
      <span>Slide {{ index + 1 }} of {{ slides.length }}</span>
      <button type="button" class="hidden sm:inline-flex items-center gap-1 hover:underline" @click="openPane('accessibility')"><RibbonIcon name="accessibility" />Accessibility: {{ accIssues.length ? 'Investigate' : 'Good to go' }}</button>
      <span class="ml-auto"></span>
      <button type="button" class="inline-flex items-center gap-1 px-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700" :class="{ 'bg-gray-200 dark:bg-gray-700': showNotes }" @click="showNotes = !showNotes"><RibbonIcon name="notes" />Notes</button>
      <button type="button" class="inline-flex items-center gap-1 px-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700" :class="{ 'bg-gray-200 dark:bg-gray-700': pane === 'comments' }" @click="pane = pane === 'comments' ? null : 'comments'"><RibbonIcon name="comment" />Comments</button>
      <span class="flex items-center gap-0.5">
        <button type="button" class="p-0.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700" :class="{ 'bg-gray-300 dark:bg-gray-600': view === 'normal' }" title="Normal" @click="setView('normal')"><RibbonIcon name="normalView" /></button>
        <button type="button" class="p-0.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700" :class="{ 'bg-gray-300 dark:bg-gray-600': view === 'sorter' }" title="Slide Sorter" @click="setView('sorter')"><RibbonIcon name="sorter" /></button>
        <button type="button" class="p-0.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700" title="Reading View" @click="startShow(index, 'reading')"><RibbonIcon name="readMode" /></button>
        <button type="button" class="p-0.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700" title="Slide Show" @click="startShow(index)"><RibbonIcon name="show" /></button>
      </span>
      <span class="hidden sm:flex items-center gap-1">
        <button type="button" class="px-1" title="Zoom Out" @click="setZoom(Math.max(10, Math.round(scale * 100) - 10))">−</button>
        <input type="range" min="10" max="300" class="w-24 accent-[#b7472a]" :value="Math.round(scale * 100)" title="Zoom" @input="setZoom(Number(($event.target as HTMLInputElement).value))">
        <button type="button" class="px-1" title="Zoom In" @click="setZoom(Math.min(300, Math.round(scale * 100) + 10))">+</button>
        <button type="button" class="w-10 text-right hover:underline" @click="openDialog('zoom')">{{ Math.round(scale * 100) }}%</button>
        <button type="button" class="p-0.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700" title="Fit slide to current window" @click="setZoom(null)"><RibbonIcon name="pageWidth" /></button>
      </span>
    </footer>

    <!-- Recording -->
    <div v-if="recorder" class="absolute top-2 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2 rounded-full bg-gray-900 text-white text-xs shadow-lg">
      <span class="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
      <span>{{ recorder.kind === 'narration' ? `Recording narration for slide ${index + 1}` : 'Recording the screen' }} · <span class="tabular-nums">{{ clock(recordSeconds) }}</span></span>
      <button type="button" class="px-3 py-1 rounded-full bg-white text-gray-900 font-semibold" @click="stopRecording">Stop</button>
    </div>

    <!-- Dialogs -->
    <div v-if="dialog" class="absolute inset-0 z-40 flex items-center justify-center bg-black/30 p-4" @click.self="dialog = null">
      <div class="w-full max-w-lg rounded-lg bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          <p class="text-sm font-semibold">{{ DIALOG_TITLES[dialog] }}</p>
          <button type="button" class="text-gray-500" @click="dialog = null">✕</button>
        </div>
        <div class="p-4 text-sm space-y-3">
          <!-- Find / Replace -->
          <template v-if="dialog === 'find' || dialog === 'replace'">
            <label class="block">Find what <input v-model="findForm.find" class="mt-1 w-full px-2 py-1 border rounded dark:bg-gray-700" @keydown.enter="findNext"></label>
            <label v-if="dialog === 'replace'" class="block">Replace with <input v-model="findForm.replace" class="mt-1 w-full px-2 py-1 border rounded dark:bg-gray-700"></label>
            <label class="flex items-center gap-1.5 text-xs"><input v-model="findForm.matchCase" type="checkbox"> Match case</label>
            <p v-if="findForm.message" class="text-xs text-gray-500">{{ findForm.message }}</p>
            <div class="flex justify-end gap-2">
              <button type="button" class="px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600" :disabled="!findForm.find" @click="findNext">Find Next</button>
              <template v-if="dialog === 'replace'">
                <button type="button" class="px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600" :disabled="!findForm.find" @click="replaceOne">Replace</button>
                <button type="button" class="px-3 py-1.5 rounded bg-[#b7472a] text-white" :disabled="!findForm.find" @click="replaceAll">Replace All</button>
              </template>
            </div>
          </template>
          <!-- Header & Footer -->
          <template v-else-if="dialog === 'hf'">
            <label class="flex items-center gap-2"><input v-model="hfForm.date" type="checkbox"> Date and time</label>
            <div v-if="hfForm.date" class="pl-6 space-y-1 text-xs">
              <label class="flex items-center gap-1.5"><input v-model="hfForm.dateAuto" type="radio" :value="true"> Update automatically</label>
              <label class="flex items-center gap-1.5"><input v-model="hfForm.dateAuto" type="radio" :value="false"> Fixed <input v-model="hfForm.dateText" :disabled="hfForm.dateAuto" class="ml-1 px-1.5 py-0.5 border rounded dark:bg-gray-700"></label>
            </div>
            <label class="flex items-center gap-2"><input v-model="hfForm.number" type="checkbox"> Slide number</label>
            <label class="flex items-center gap-2"><input v-model="hfForm.footer" type="checkbox"> Footer</label>
            <input v-if="hfForm.footer" v-model="hfForm.footerText" class="ml-6 w-[calc(100%-1.5rem)] px-2 py-1 border rounded dark:bg-gray-700" placeholder="Footer text">
            <label class="flex items-center gap-2"><input v-model="hfForm.notOnTitle" type="checkbox"> Don't show on title slide</label>
            <div class="flex justify-end gap-2">
              <button type="button" class="px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600" @click="applyHf(false)">Apply</button>
              <button type="button" class="px-3 py-1.5 rounded bg-[#b7472a] text-white" @click="applyHf(true)">Apply to All</button>
            </div>
          </template>
          <!-- Link -->
          <template v-else-if="dialog === 'link'">
            <label class="block">Address <input v-model="linkForm.url" class="mt-1 w-full px-2 py-1 border rounded dark:bg-gray-700" placeholder="https://"></label>
            <p class="text-xs text-gray-500">In the slide show, clicking the selected object opens this address.</p>
            <div class="flex justify-end gap-2">
              <button v-if="sel.link" type="button" class="px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600" @click="setProp('tusomeLink', null); dialog = null">Remove Link</button>
              <button type="button" class="px-3 py-1.5 rounded bg-[#b7472a] text-white" :disabled="!/^https?:\/\/\S+\.\S+/.test(linkForm.url)" @click="setProp('tusomeLink', linkForm.url.trim()); dialog = null">OK</button>
            </div>
          </template>
          <!-- Chart -->
          <template v-else-if="dialog === 'chart'">
            <div class="flex flex-wrap gap-2">
              <button v-for="t in CHART_TYPES" :key="t.key" type="button" class="px-3 py-1.5 rounded border" :class="chartForm.type === t.key ? 'border-[#b7472a] bg-orange-50 dark:bg-orange-900/30' : 'border-gray-300 dark:border-gray-600'" @click="chartForm.type = t.key">{{ t.label }}</button>
            </div>
            <label class="block">Chart title <input v-model="chartForm.title" class="mt-1 w-full px-2 py-1 border rounded dark:bg-gray-700"></label>
            <label class="block">Categories (separated by commas) <input v-model="chartForm.labels" class="mt-1 w-full px-2 py-1 border rounded dark:bg-gray-700" placeholder="Term 1, Term 2, Term 3"></label>
            <label class="block">Series, one a line (Name: values) <textarea v-model="chartForm.series" rows="3" class="mt-1 w-full px-2 py-1 border rounded font-mono text-xs dark:bg-gray-700" placeholder="Boys: 45, 60, 72&#10;Girls: 50, 58, 80"></textarea></label>
            <div class="flex justify-end"><button type="button" class="px-4 py-1.5 rounded bg-[#b7472a] text-white" @click="insertChart">Insert</button></div>
          </template>
          <!-- SmartArt -->
          <template v-else-if="dialog === 'smartart'">
            <div class="grid grid-cols-4 gap-2">
              <button v-for="g in SMARTART" :key="g.key" type="button" class="rounded border p-2 text-xs" :class="smartForm.kind === g.key ? 'border-[#b7472a] bg-orange-50 dark:bg-orange-900/30' : 'border-gray-300 dark:border-gray-600'" @click="smartForm.kind = g.key">
                <svg viewBox="0 0 40 24" class="w-full h-8 mb-1" fill="none" stroke="currentColor" stroke-width="1.2"><path :d="g.icon" /></svg>{{ g.label }}
              </button>
            </div>
            <label class="block">Text, one item a line <textarea v-model="smartForm.items" rows="4" class="mt-1 w-full px-2 py-1 border rounded dark:bg-gray-700"></textarea></label>
            <div class="flex justify-end"><button type="button" class="px-4 py-1.5 rounded bg-[#b7472a] text-white" :disabled="!smartForm.items.trim()" @click="insertSmartArt">Insert</button></div>
          </template>
          <!-- Equation -->
          <template v-else-if="dialog === 'equation'">
            <div class="flex flex-wrap gap-1">
              <button v-for="e in EQUATION_PARTS" :key="e.label" type="button" class="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 text-xs" @click="eqText += e.tex">{{ e.label }}</button>
            </div>
            <input v-model="eqText" class="w-full px-2 py-1 border rounded font-mono dark:bg-gray-700" placeholder="x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}">
            <div ref="eqPreview" class="min-h-[48px] flex items-center justify-center rounded bg-gray-50 dark:bg-gray-700 p-2 text-lg" v-html="eqHtml"></div>
            <div class="flex justify-end"><button type="button" class="px-4 py-1.5 rounded bg-[#b7472a] text-white" :disabled="!eqText.trim()" @click="insertEquation">Insert</button></div>
          </template>
          <!-- Set Up Slide Show -->
          <template v-else-if="dialog === 'setup'">
            <p class="text-xs font-semibold">Show options</p>
            <label class="flex items-center gap-2"><input v-model="setup.loop" type="checkbox"> Loop continuously until 'Esc'</label>
            <label class="flex items-center gap-2"><input type="checkbox" :checked="!setup.narrations" @change="setup.narrations = !($event.target as HTMLInputElement).checked"> Show without narration</label>
            <label class="flex items-center gap-2"><input v-model="setup.noAnimation" type="checkbox"> Show without animation</label>
            <p class="text-xs font-semibold pt-1">Advance slides</p>
            <label class="flex items-center gap-2"><input type="radio" :checked="!setup.timings" @change="setup.timings = false"> Manually</label>
            <label class="flex items-center gap-2"><input type="radio" :checked="setup.timings" @change="setup.timings = true"> Using timings, if present</label>
            <div class="flex justify-end"><button type="button" class="px-4 py-1.5 rounded bg-[#b7472a] text-white" @click="dialog = null; $emit('change')">OK</button></div>
          </template>
          <!-- Zoom -->
          <div v-else-if="dialog === 'zoom'" class="grid grid-cols-4 gap-2">
            <button v-for="z in [33, 50, 66, 75, 100, 150, 200, 300]" :key="z" type="button" class="px-3 py-2 rounded border" :class="Math.round(scale * 100) === z ? 'border-[#b7472a] bg-orange-50 dark:bg-orange-900/30' : 'border-gray-300 dark:border-gray-600'" @click="setZoom(z); dialog = null">{{ z }}%</button>
            <button type="button" class="col-span-4 px-3 py-2 rounded border border-gray-300 dark:border-gray-600" @click="setZoom(null); dialog = null">Fit</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Slide show, Reading View, Rehearse Timings -->
    <SlideShow
      v-if="show && show.mode !== 'preview'"
      :slides="show.slides"
      :start="show.start"
      :mode="show.mode"
      :aspect="W / H"
      :play-narrations="setup.narrations"
      :use-timings="setup.timings"
      :show-media-controls="setup.mediaControls"
      :loop="setup.loop"
      @close="onShowClose"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, shallowRef, watch } from 'vue'
import { ActiveSelection, Canvas, Ellipse, FabricImage, Gradient, Group, Line, Polygon, Rect, Shadow, StaticCanvas, Textbox, Triangle, util, type FabricObject } from 'fabric'
import OfficeRibbon from './ribbon/OfficeRibbon.vue'
import RibbonGroup from './ribbon/RibbonGroup.vue'
import RibbonIcon from './ribbon/RibbonIcon.vue'
import SlideShow, { type Box, type ShowSlide } from './slides/SlideShow.vue'
import { ANIMATIONS, DIR_LABEL, TRANSITIONS, animDef, transitionDef, type Dir, type ObjectAnim, type SlideAdvance, type SlideTransition } from './slides/effects'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'

const props = defineProps<{ initial: ArrayBuffer | null; readonly: boolean; showTools?: boolean; markable?: boolean }>()
const emit = defineEmits<{ change: []; ready: []; download: [] }>()
const toast = useToastStore()
const confirmDialog = useConfirmStore()

const TABS = ['File', 'Home', 'Insert', 'Design', 'Transitions', 'Animations', 'Slide Show', 'Record', 'Review', 'View']
const tab = ref('Home')
// what the slides keep beyond fabric's own properties
const EXTRA = ['tusomePh', 'tusomeShape', 'tusomeAnim', 'tusomeMedia', 'tusomeLink', 'tusomeAlt', 'tusomeTable', 'tusomeName']
const FONTS = ['Calibri', 'Calibri Light', 'Arial', 'Arial Black', 'Cambria', 'Candara', 'Century Gothic', 'Comic Sans MS', 'Consolas', 'Courier New', 'Franklin Gothic Medium', 'Garamond', 'Georgia', 'Impact', 'Lucida Sans', 'Palatino Linotype', 'Segoe UI', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana']
const SIZES = [8, 9, 10, 10.5, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 44, 48, 54, 60, 66, 72, 80, 88, 96]
const LAYOUTS = [
  { key: 'title', label: 'Title Slide' },
  { key: 'content', label: 'Title and Content' },
  { key: 'section', label: 'Section Header' },
  { key: 'two', label: 'Two Content' },
  { key: 'comparison', label: 'Comparison' },
  { key: 'titleonly', label: 'Title Only' },
  { key: 'caption', label: 'Content with Caption' },
  { key: 'blank', label: 'Blank' }
]
interface Theme { name: string; bg: string; grad?: string; text: string; accent: string; accent2: string; font: string }
const THEMES: Theme[] = [
  { name: 'Office Theme', bg: '#ffffff', text: '#262626', accent: '#4472c4', accent2: '#ed7d31', font: 'Calibri' },
  { name: 'Facet', bg: '#ffffff', text: '#2c3c43', accent: '#90c226', accent2: '#54a021', font: 'Trebuchet MS' },
  { name: 'Integral', bg: '#ffffff', text: '#1e2a35', accent: '#1cade4', accent2: '#2683c6', font: 'Tw Cen MT' },
  { name: 'Ion Boardroom', bg: '#1e5155', text: '#ffffff', accent: '#b01513', accent2: '#ea6312', font: 'Century Gothic' },
  { name: 'Organic', bg: '#f7f3ea', text: '#3b3b3b', accent: '#83992a', accent2: '#3c9770', font: 'Garamond' },
  { name: 'Retrospect', bg: '#ffffff', text: '#323232', accent: '#e48312', accent2: '#bd582c', font: 'Calibri Light' },
  { name: 'Slice', bg: '#146194', grad: '#0b3a5a', text: '#ffffff', accent: '#3b8ed1', accent2: '#ffc000', font: 'Century Gothic' },
  { name: 'Wisp', bg: '#f5f2e6', text: '#4b3a2a', accent: '#a53010', accent2: '#de7e18', font: 'Century Gothic' },
  { name: 'Berlin', bg: '#3a3a3a', text: '#f2f2f2', accent: '#f09415', accent2: '#c1b56b', font: 'Trebuchet MS' },
  { name: 'Celestial', bg: '#1b1f3a', grad: '#3a2d63', text: '#ffffff', accent: '#ac3ec1', accent2: '#477bd1', font: 'Calibri Light' },
  { name: 'Dividend', bg: '#ffffff', text: '#2a2a2a', accent: '#4d1434', accent2: '#903163', font: 'Gill Sans MT' },
  { name: 'Savon', bg: '#e9f3f5', text: '#163b45', accent: '#1cade4', accent2: '#42ba97', font: 'Garamond' },
  { name: 'Green', bg: '#e2f0d9', text: '#1e3d14', accent: '#548235', accent2: '#a9d18e', font: 'Georgia' }
]
const ALIGNS = [
  { v: 'left', t: 'Align Left', icon: 'alignLeft' },
  { v: 'center', t: 'Center', icon: 'alignCenter' },
  { v: 'right', t: 'Align Right', icon: 'alignRight' },
  { v: 'justify', t: 'Justify', icon: 'justify' }
]
const CHAR_SPACING = [{ v: -150, label: 'Very Tight' }, { v: -75, label: 'Tight' }, { v: 0, label: 'Normal' }, { v: 150, label: 'Loose' }, { v: 300, label: 'Very Loose' }]
const CASES = [{ key: 'sentence', label: 'Sentence case.' }, { key: 'lower', label: 'lowercase' }, { key: 'upper', label: 'UPPERCASE' }, { key: 'title', label: 'Capitalize Each Word' }, { key: 'toggle', label: 'tOGGLE cASE' }]
const DASHES = [{ label: 'Solid', v: null }, { label: 'Dash', v: [10, 6] }, { label: 'Round Dot', v: [2, 4] }, { label: 'Long Dash', v: [18, 6] }]
const SHAPE_EFFECTS = [{ key: 'none', label: 'No Effect' }, { key: 'shadow', label: 'Shadow' }, { key: 'glow', label: 'Glow' }, { key: 'soft', label: 'Soft Shadow' }]
const COLOR_MODES = [
  { key: 'color', label: 'Color', swatch: 'linear-gradient(90deg,#c43e1c,#4472c4,#70ad47)', filter: 'none' },
  { key: 'gray', label: 'Grayscale', swatch: 'linear-gradient(90deg,#222,#ddd)', filter: 'grayscale(1)' },
  { key: 'bw', label: 'Black and White', swatch: 'linear-gradient(90deg,#000 50%,#fff 50%)', filter: 'grayscale(1) contrast(4)' }
]
const SHAPES = [
  { key: 'textbox', label: 'Text Box', icon: 'M3 4h14v12H3z M7 8h6 M10 8v6' },
  { key: 'line', label: 'Line', icon: 'M3 17 17 3' },
  { key: 'arrowLine', label: 'Line Arrow', icon: 'M3 17 17 3 M11 3h6v6' },
  { key: 'rect', label: 'Rectangle', icon: 'M3 5h14v10H3z' },
  { key: 'round', label: 'Rounded Rectangle', icon: 'M6 5h8a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3z' },
  { key: 'ellipse', label: 'Oval', icon: 'M10 4a7 6 0 1 0 0 12a7 6 0 1 0 0-12z' },
  { key: 'triangle', label: 'Isosceles Triangle', icon: 'M10 3 18 17H2z' },
  { key: 'rtriangle', label: 'Right Triangle', icon: 'M3 3v14h14z' },
  { key: 'diamond', label: 'Diamond', icon: 'M10 2 18 10 10 18 2 10z' },
  { key: 'pentagon', label: 'Pentagon', icon: 'M10 2 18 8 15 18H5L2 8z' },
  { key: 'hexagon', label: 'Hexagon', icon: 'M6 3h8l4 7-4 7H6l-4-7z' },
  { key: 'arrow', label: 'Arrow: Right', icon: 'M2 7h10V3l6 7-6 7v-4H2z' },
  { key: 'leftArrow', label: 'Arrow: Left', icon: 'M18 7H8V3l-6 7 6 7v-4h10z' },
  { key: 'upArrow', label: 'Arrow: Up', icon: 'M7 18V8H3l7-6 7 6h-4v10z' },
  { key: 'downArrow', label: 'Arrow: Down', icon: 'M7 2v10H3l7 6 7-6h-4V2z' },
  { key: 'chevron', label: 'Arrow: Chevron', icon: 'M2 4h11l5 6-5 6H2l5-6z' },
  { key: 'star', label: 'Star: 5 Points', icon: 'M10 2l2.4 5.2 5.6.6-4.2 3.8 1.2 5.6L10 14.4 5 17.2l1.2-5.6L2 7.8l5.6-.6z' },
  { key: 'heart', label: 'Heart', icon: 'M10 17S2 12 2 7a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 5-8 10-8 10z' },
  { key: 'callout', label: 'Speech Bubble', icon: 'M3 3h14v10H9l-4 4v-4H3z' },
  { key: 'plus', label: 'Cross', icon: 'M7 2h6v5h5v6h-5v5H7v-5H2V7h5z' },
  { key: 'parallelogram', label: 'Parallelogram', icon: 'M6 4h12l-4 12H2z' },
  { key: 'trapezoid', label: 'Trapezoid', icon: 'M5 4h10l3 12H2z' },
  { key: 'braceL', label: 'Left Brace', icon: 'M13 2c-3 0-3 2-3 4s0 3-3 4c3 1 3 2 3 4s0 4 3 4' },
  { key: 'braceR', label: 'Right Brace', icon: 'M7 2c3 0 3 2 3 4s0 3 3 4c-3 1-3 2-3 4s0 4-3 4' }
]
const ARRANGE_ORDER = [{ key: 'front', label: 'Bring to Front' }, { key: 'forward', label: 'Bring Forward' }, { key: 'backward', label: 'Send Backward' }, { key: 'back', label: 'Send to Back' }]
const ARRANGE_ALIGN = [{ key: 'alignLeft', label: 'Align Left' }, { key: 'centerH', label: 'Align Center' }, { key: 'alignRight', label: 'Align Right' }, { key: 'alignTop', label: 'Align Top' }, { key: 'middle', label: 'Align Middle' }, { key: 'alignBottom', label: 'Align Bottom' }]
const ARRANGE_ROTATE = [{ key: 'rotR', label: 'Rotate Right 90°' }, { key: 'rotL', label: 'Rotate Left 90°' }, { key: 'flipH', label: 'Flip Horizontal' }, { key: 'flipV', label: 'Flip Vertical' }]
const SYMBOLS = ['©', '®', '™', '°', '±', '×', '÷', '≠', '≤', '≥', '≈', '∞', '√', 'π', 'Σ', 'Ω', 'α', 'β', 'γ', 'δ', 'θ', 'λ', 'μ', 'σ', '€', '£', '¥', '¢', '§', '¶', '•', '…', '←', '→', '↑', '↓', '↔', '⇒', '✓', '✗', '★', '☆', '♥', '♦', '♣', '♠', '½', '¼']
const CHART_TYPES = [{ key: 'bar', label: 'Column' }, { key: 'hbar', label: 'Bar' }, { key: 'line', label: 'Line' }, { key: 'pie', label: 'Pie' }, { key: 'doughnut', label: 'Doughnut' }]
const SMARTART = [
  { key: 'process', label: 'Basic Process', icon: 'M2 8h9v8H2z M15 8h9v8h-9z M28 8h10v8H28z M11.5 12h3 M24.5 12h3' },
  { key: 'list', label: 'Basic List', icon: 'M4 2h32v6H4z M4 9h32v6H4z M4 16h32v6H4z' },
  { key: 'cycle', label: 'Basic Cycle', icon: 'M20 2a3 3 0 1 0 0 6a3 3 0 1 0 0-6z M30 14a3 3 0 1 0 0 6a3 3 0 1 0 0-6z M10 14a3 3 0 1 0 0 6a3 3 0 1 0 0-6z' },
  { key: 'hierarchy', label: 'Hierarchy', icon: 'M15 2h10v6H15z M3 16h10v6H3z M15 16h10v6H15z M27 16h10v6H27z M20 8v4 M8 12h24 M8 12v4 M20 12v4 M32 12v4' }
]
const EQUATION_PARTS = [
  { label: 'Fraction', tex: '\\frac{a}{b}' }, { label: 'Square root', tex: '\\sqrt{x}' }, { label: 'Power', tex: 'x^{2}' }, { label: 'Subscript', tex: 'x_{1}' },
  { label: 'Sum', tex: '\\sum_{i=1}^{n}' }, { label: 'Integral', tex: '\\int_{a}^{b}' }, { label: 'π', tex: '\\pi' }, { label: '±', tex: '\\pm' }, { label: '≤', tex: '\\le' }, { label: '≥', tex: '\\ge' }, { label: '×', tex: '\\times' }, { label: '÷', tex: '\\div' }
]
const PANE_TITLES: Record<string, string> = { comments: 'Comments', animation: 'Animation Pane', selection: 'Selection', accessibility: 'Accessibility', spelling: 'Spelling', background: 'Format Background' }
const DIALOG_TITLES: Record<string, string> = { find: 'Find', replace: 'Replace', hf: 'Header and Footer', link: 'Insert Hyperlink', chart: 'Insert Chart', smartart: 'Choose a SmartArt Graphic', equation: 'Equation', setup: 'Set Up Show', zoom: 'Zoom' }
const MAX_MEDIA = 8 * 1024 * 1024

interface Comment { id: string; text: string; at: string }
interface HeaderFooter { date?: string | null; number?: boolean; footer?: string | null; notOnTitle?: boolean }
interface Slide {
  id: string; background: string; bgGradient?: { from: string; to: string; angle: number } | null; bgImage?: string | null
  json: Record<string, any> | null; notes?: string; layout?: string; section?: string | null; hidden?: boolean
  transition?: SlideTransition | null; advance?: SlideAdvance; comments?: Comment[]; narration?: string | null; hf?: HeaderFooter | null
}
const uid = () => Math.random().toString(36).slice(2, 10)
const slides = ref<Slide[]>([])
const index = ref(0)
const current = computed(() => slides.value[index.value])
const thumbs = reactive<Record<string, string>>({})
const menu = ref<string | null>(null)
const showNotes = ref(true)
const view = ref<'normal' | 'outline' | 'sorter' | 'notes'>('normal')
const pane = ref<string | null>(null)
const dialog = ref<string | null>(null)
const ruler = ref(false)
const gridlines = ref(false)
const guides = ref(false)
const colorMode = ref('color')
const setup = reactive({ loop: false, narrations: true, timings: true, mediaControls: true, noAnimation: false })

// the slide's size: widescreen 960 x 540 or standard 720 x 540
const size = ref<'16x9' | '4x3'>('16x9')
const W = computed(() => (size.value === '4x3' ? 720 : 960))
const H = 540

const canvasEl = ref<HTMLCanvasElement | null>(null)
const stage = ref<HTMLElement | null>(null)
const canvas = shallowRef<Canvas | null>(null)
const scale = ref(0.8)
const zoomPct = ref<number | null>(null)
let loading = false

const toggleMenu = (m: string) => { menu.value = menu.value === m ? null : m }
const closeMenus = (e: MouseEvent) => { if (menu.value && !(e.target as HTMLElement).closest('[data-menu]')) menu.value = null }
const openPane = (p: string) => { menu.value = null; pane.value = p; tick.value++ }
const openDialog = (d: string) => {
  menu.value = null
  if (d === 'link') linkForm.url = sel.value.link || 'https://'
  if (d === 'hf') {
    const hf = current.value?.hf || {}
    Object.assign(hfForm, { date: !!hf.date, dateAuto: !hf.date || hf.date === 'auto', dateText: hf.date && hf.date !== 'auto' ? hf.date : today(), number: !!hf.number, footer: !!hf.footer, footerText: hf.footer || '', notOnTitle: !!hf.notOnTitle })
  }
  if (d === 'find' || d === 'replace') findForm.message = ''
  dialog.value = d
}
const clock = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s) % 60).padStart(2, '0')}`
const when = (d: string) => new Date(d).toLocaleString(undefined, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
const today = () => new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })

// ---- placeholders ----
const PH_TEXT: Record<string, string> = { title: 'Click to add title', subtitle: 'Click to add subtitle', body: 'Click to add text' }
const isEmptyPh = (o: any) => !!o?.tusomePh && (!o.text || o.text === PH_TEXT[o.tusomePh])

// ---- what is selected, for the ribbon ----
const tick = ref(0)
const activeObj = computed<any>(() => { void tick.value; return canvas.value?.getActiveObject() || null })
const sel = computed(() => {
  const o: any = activeObj.value
  const text = !!o && (o.type === 'textbox' || o.type === 'i-text')
  const multi = !!o && o.type === 'activeselection'
  return {
    any: !!o, single: !!o && !multi, multi, group: !!o && o.type === 'group', text, image: !!o && o.type === 'image' && !o.tusomeMedia,
    shape: !!o && !text && !multi && o.type !== 'image' && o.type !== 'line',
    fontFamily: o?.fontFamily || 'Calibri', fontSize: Math.round(o?.fontSize || 24), charSpacing: o?.charSpacing || 0,
    bold: o?.fontWeight === 'bold' || Number(o?.fontWeight) >= 600, italic: o?.fontStyle === 'italic', underline: !!o?.underline, strike: !!o?.linethrough, shadow: !!o?.shadow,
    color: typeof o?.fill === 'string' ? o.fill : '#000000', highlight: o?.textBackgroundColor || '', align: o?.textAlign || 'left', lineHeight: o?.lineHeight || 1.15,
    fill: typeof o?.fill === 'string' ? o.fill : '#ffffff', stroke: typeof o?.stroke === 'string' ? o.stroke : '#000000', strokeWidth: o?.strokeWidth || 0,
    anim: (!multi && o?.tusomeAnim) as ObjectAnim | null, link: (o?.tusomeLink as string) || '', alt: (o?.tusomeAlt as string) || ''
  }
})

const changed = () => {
  if (loading) return
  tick.value++
  emit('change')
  refreshThumb()
}
const slideChanged = () => { tick.value++; emit('change') }

let thumbTimer: number | null = null
const thumbOf = (c: Canvas) => {
  // placeholders not yet typed in don't show on the thumbnail (as in PowerPoint)
  const hidden = c.getObjects().filter(o => isEmptyPh(o) && o.visible)
  hidden.forEach(o => o.set({ visible: false }))
  const url = c.toDataURL({ format: 'png', multiplier: 220 / (W.value * c.getZoom()) })
  hidden.forEach(o => o.set({ visible: true }))
  c.requestRenderAll()
  return url
}
const refreshThumb = () => {
  if (thumbTimer) clearTimeout(thumbTimer)
  thumbTimer = window.setTimeout(() => {
    const c = canvas.value
    const s = current.value
    if (c && s) thumbs[s.id] = thumbOf(c)
  }, 400)
}

const fit = () => {
  const el = stage.value
  const c = canvas.value
  if (!el || !c) return
  if (zoomPct.value === null) {
    const pad = window.innerWidth < 640 ? 24 : 48
    scale.value = Math.max(0.1, Math.min((el.clientWidth - pad) / W.value, (el.clientHeight - pad) / H))
  } else {
    scale.value = zoomPct.value / 100
  }
  c.setDimensions({ width: W.value * scale.value, height: H * scale.value })
  c.setZoom(scale.value)
  c.requestRenderAll()
}
const setZoom = (pct: number | null) => { zoomPct.value = pct; fit() }
const rulerTicks = (axis: 'x' | 'y') => axis === 'x'
  ? 'linear-gradient(90deg, #9ca3af 1px, transparent 1px)'
  : 'linear-gradient(180deg, #9ca3af 1px, transparent 1px)'

const lock = (o: FabricObject) => { if (props.readonly) o.set({ selectable: false, evented: false }) }

// ---- background ----
const gradientFor = (g: { from: string; to: string; angle: number }, w: number, h: number) => {
  const a = (g.angle * Math.PI) / 180
  const cx = w / 2, cy = h / 2, r = Math.abs(w * Math.cos(a)) / 2 + Math.abs(h * Math.sin(a)) / 2
  return new Gradient({ type: 'linear', gradientUnits: 'pixels', coords: { x1: cx - Math.cos(a) * r, y1: cy - Math.sin(a) * r, x2: cx + Math.cos(a) * r, y2: cy + Math.sin(a) * r }, colorStops: [{ offset: 0, color: g.from }, { offset: 1, color: g.to }] })
}
const paintBackground = async (c: StaticCanvas, s: Slide) => {
  c.backgroundColor = s.bgGradient ? gradientFor(s.bgGradient, W.value, H) as any : s.background
  if (s.bgImage) {
    const img = await FabricImage.fromURL(s.bgImage)
    const k = Math.max(W.value / img.width!, H / img.height!)
    img.set({ originX: 'left', originY: 'top', scaleX: k, scaleY: k, left: (W.value - img.width! * k) / 2, top: (H - img.height! * k) / 2 })
    c.backgroundImage = img
  } else {
    c.backgroundImage = undefined
  }
}

// ---- header and footer (drawn on every showing, never saved into the slide) ----
const hfObjects = (s: Slide, i: number): FabricObject[] => {
  const hf = s.hf
  if (!hf || (hf.notOnTitle && s.layout === 'title')) return []
  const base = { originX: 'left' as const, originY: 'top' as const, top: H - 34, fontSize: 12, fontFamily: theme.value.font, fill: '#7f7f7f', selectable: false, evented: false, excludeFromExport: true }
  const out: FabricObject[] = []
  if (hf.date) out.push(new Textbox(hf.date === 'auto' ? today() : hf.date, { ...base, left: 40, width: 220 }))
  if (hf.footer) out.push(new Textbox(hf.footer, { ...base, left: (W.value - 360) / 2, width: 360, textAlign: 'center' }))
  if (hf.number) out.push(new Textbox(String(i + 1), { ...base, left: W.value - 140, width: 100, textAlign: 'right' }))
  out.forEach(o => ((o as any).tusomeHF = true))
  return out
}
const setHf = (s: Slide | undefined, hf: HeaderFooter | null) => { if (s) { s.hf = hf && (hf.date || hf.number || hf.footer) ? hf : null; slideChanged() } }
const refreshHf = () => {
  const c = canvas.value
  const s = current.value
  if (!c || !s) return
  c.getObjects().filter((o: any) => o.tusomeHF).forEach(o => c.remove(o))
  hfObjects(s, index.value).forEach(o => c.add(o))
  c.requestRenderAll()
  refreshThumb()
}

const storeCurrent = () => {
  const c = canvas.value
  const s = current.value
  if (!c || !s) return
  const json = (c as any).toObject(EXTRA)
  delete json.backgroundImage
  json.background = s.background
  s.json = json
  if (thumbTimer) { clearTimeout(thumbTimer); thumbTimer = null }
  thumbs[s.id] = thumbOf(c)
}
const show_ = async (i: number) => {
  const c = canvas.value
  const s = slides.value[i]
  if (!c || !s) return
  loading = true
  c.discardActiveObject()
  c.clear()
  if (s.json) {
    await c.loadFromJSON(s.json)
    c.getObjects().forEach(o => {
      lock(o)
      // an untyped placeholder stays out of a viewer's way
      if (props.readonly && isEmptyPh(o)) o.set({ visible: false })
    })
  }
  await paintBackground(c, s)
  hfObjects(s, i).forEach(o => c.add(o))
  c.requestRenderAll()
  loading = false
  tick.value++
  refreshThumb()
}
const goTo = async (i: number) => {
  if (i === index.value || i < 0 || i >= slides.value.length) return
  storeCurrent()
  index.value = i
  await show_(i)
}

// ---- making slides ----
const theme = ref<Theme>(THEMES[0])
const textbox = (text: string, opts: Record<string, any>) => new Textbox(text, {
  originX: 'left', originY: 'top', fontFamily: theme.value.font, fill: theme.value.text, lineHeight: 1.15, ...opts
})
const ph = (kind: 'title' | 'subtitle' | 'body', opts: Record<string, any>) => {
  const t = textbox(PH_TEXT[kind], opts)
  ;(t as any).tusomePh = kind
  return t
}
const layoutObjects = (key: string): FabricObject[] => {
  const t = theme.value
  const w = W.value
  const m = 60
  switch (key) {
    case 'title': return [
      ph('title', { left: 80, top: 150, width: w - 160, fontSize: 54, textAlign: 'center' }),
      ph('subtitle', { left: 120, top: 300, width: w - 240, fontSize: 26, textAlign: 'center' })
    ]
    case 'content': return [
      ph('title', { left: m, top: 30, width: w - 2 * m, fontSize: 40 }),
      ph('body', { left: m, top: 130, width: w - 2 * m, fontSize: 26, lineHeight: 1.3 })
    ]
    case 'section': return [
      ph('title', { left: 80, top: 210, width: w - 160, fontSize: 48 }),
      new Rect({ originX: 'left', originY: 'top', left: 80, top: 290, width: 220, height: 6, fill: t.accent, strokeWidth: 0 }),
      ph('body', { left: 80, top: 310, width: w - 160, fontSize: 22 })
    ]
    case 'two': return [
      ph('title', { left: m, top: 30, width: w - 2 * m, fontSize: 40 }),
      ph('body', { left: m, top: 130, width: (w - 3 * m) / 2, fontSize: 24, lineHeight: 1.3 }),
      ph('body', { left: m * 2 + (w - 3 * m) / 2, top: 130, width: (w - 3 * m) / 2, fontSize: 24, lineHeight: 1.3 })
    ]
    case 'comparison': return [
      ph('title', { left: m, top: 30, width: w - 2 * m, fontSize: 40 }),
      ph('subtitle', { left: m, top: 120, width: (w - 3 * m) / 2, fontSize: 24, fontWeight: 'bold' }),
      ph('subtitle', { left: m * 2 + (w - 3 * m) / 2, top: 120, width: (w - 3 * m) / 2, fontSize: 24, fontWeight: 'bold' }),
      ph('body', { left: m, top: 170, width: (w - 3 * m) / 2, fontSize: 22, lineHeight: 1.3 }),
      ph('body', { left: m * 2 + (w - 3 * m) / 2, top: 170, width: (w - 3 * m) / 2, fontSize: 22, lineHeight: 1.3 })
    ]
    case 'titleonly': return [ph('title', { left: m, top: 30, width: w - 2 * m, fontSize: 40 })]
    case 'caption': return [
      ph('title', { left: m, top: 50, width: w * 0.32, fontSize: 30, fontWeight: 'bold' }),
      ph('subtitle', { left: m, top: 160, width: w * 0.32, fontSize: 18 }),
      ph('body', { left: m + w * 0.38, top: 50, width: w * 0.55 - m, fontSize: 24, lineHeight: 1.3 })
    ]
    default: return []
  }
}
const slideJson = (objects: FabricObject[], background: string) => {
  const sc = new StaticCanvas(undefined as any, { width: W.value, height: H })
  objects.forEach(o => sc.add(o))
  const json = (sc as any).toObject(EXTRA)
  json.background = background
  sc.dispose()
  return json
}
const newSlide = (key: string, from?: Slide): Slide => {
  const bg = from?.background || theme.value.bg
  return { id: uid(), background: bg, bgGradient: from?.bgGradient || null, bgImage: from?.bgImage || null, json: slideJson(layoutObjects(key), bg), notes: '', layout: key, hf: from?.hf ? { ...from.hf } : null, transition: from?.transition ? { ...from.transition } : null }
}
const addSlide = async (key: string) => {
  menu.value = null
  storeCurrent()
  slides.value.splice(index.value + 1, 0, newSlide(key, current.value))
  index.value++
  await show_(index.value)
  changed()
}
// a layout given to the slide being made: its placeholders replace the empty ones it had
const applyLayout = (key: string) => {
  menu.value = null
  const c = canvas.value
  if (!c || !current.value) return
  c.getObjects().filter(isEmptyPh).forEach(o => c.remove(o))
  layoutObjects(key).forEach(o => c.add(o))
  current.value.layout = key
  c.requestRenderAll()
  changed()
}
const duplicateSlide = async () => {
  storeCurrent()
  const s = current.value
  slides.value.splice(index.value + 1, 0, { ...JSON.parse(JSON.stringify(s)), id: uid(), section: null, comments: [] })
  index.value++
  await show_(index.value)
  changed()
}
const deleteSlide = async () => {
  if (slides.value.length < 2) return
  const gone = current.value
  delete thumbs[gone.id]
  slides.value.splice(index.value, 1)
  // a section that started on the deleted slide carries on with the next one
  if (gone.section && slides.value[index.value] && !slides.value[index.value].section) slides.value[index.value].section = gone.section
  index.value = Math.min(index.value, slides.value.length - 1)
  await show_(index.value)
  changed()
}
const moveSlide = async (d: number) => {
  const j = index.value + d
  if (j < 0 || j >= slides.value.length) return
  storeCurrent()
  const [s] = slides.value.splice(index.value, 1)
  slides.value.splice(j, 0, s)
  index.value = j
  await show_(j)
  changed()
}
const setNotes = (v: string) => {
  if (!current.value) return
  current.value.notes = v
  emit('change')
}

// ---- sections ----
const sectionOf = (i: number) => { for (let k = i; k >= 0; k--) if (slides.value[k]?.section) return slides.value[k].section; return null }
const addSection = async () => {
  menu.value = null
  const name = await confirmDialog.ask({ title: 'Add Section', message: 'Section name', value: 'Untitled Section', confirmLabel: 'Rename' })
  if (!name || !current.value) return
  current.value.section = name.trim()
  slideChanged()
}
const renameSection = async () => {
  menu.value = null
  let k = index.value
  while (k > 0 && !slides.value[k].section) k--
  const s = slides.value[k]
  if (!s?.section) return
  const name = await confirmDialog.ask({ title: 'Rename Section', message: 'Section name', value: s.section, confirmLabel: 'Rename' })
  if (name) { s.section = name.trim(); slideChanged() }
}
const removeSection = (all: boolean) => {
  menu.value = null
  if (all) slides.value.forEach(s => (s.section = null))
  else if (current.value) current.value.section = null
  slideChanged()
}

// ---- putting things on the slide ----
const place = (o: FabricObject) => {
  const c = canvas.value!
  c.add(o)
  c.setActiveObject(o)
  c.requestRenderAll()
  changed()
}
const addText = (text = 'Type here', opts: Record<string, any> = {}) => place(textbox(text, { left: (W.value - 360) / 2, top: 230, width: 360, fontSize: 28, ...opts }))
const polygon = (points: [number, number][], kind: string, base: Record<string, any>) => {
  const p = new Polygon(points.map(([x, y]) => ({ x, y })), base)
  ;(p as any).tusomeShape = kind
  return p
}
const SHAPE_POINTS: Record<string, [number, number][]> = {
  arrow: [[0, 40], [140, 40], [140, 0], [220, 70], [140, 140], [140, 100], [0, 100]],
  leftArrow: [[220, 40], [80, 40], [80, 0], [0, 70], [80, 140], [80, 100], [220, 100]],
  upArrow: [[40, 220], [40, 80], [0, 80], [70, 0], [140, 80], [100, 80], [100, 220]],
  downArrow: [[40, 0], [40, 140], [0, 140], [70, 220], [140, 140], [100, 140], [100, 0]],
  chevron: [[0, 0], [150, 0], [210, 70], [150, 140], [0, 140], [60, 70]],
  diamond: [[90, 0], [180, 90], [90, 180], [0, 90]],
  pentagon: [[90, 0], [180, 66], [146, 172], [34, 172], [0, 66]],
  hexagon: [[45, 0], [155, 0], [200, 80], [155, 160], [45, 160], [0, 80]],
  rtriangle: [[0, 0], [0, 160], [180, 160]],
  callout: [[0, 0], [220, 0], [220, 120], [90, 120], [40, 170], [50, 120], [0, 120]],
  plus: [[60, 0], [120, 0], [120, 60], [180, 60], [180, 120], [120, 120], [120, 180], [60, 180], [60, 120], [0, 120], [0, 60], [60, 60]],
  parallelogram: [[50, 0], [230, 0], [180, 140], [0, 140]],
  trapezoid: [[50, 0], [170, 0], [220, 140], [0, 140]],
  heart: Array.from({ length: 40 }, (_, i) => {
    const t = (i / 40) * Math.PI * 2
    return [100 + 6 * 16 * Math.sin(t) ** 3, 90 - 6 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))] as [number, number]
  }),
  star: Array.from({ length: 10 }, (_, i) => {
    const r = i % 2 ? 40 : 95
    const a = -Math.PI / 2 + (i * Math.PI) / 5
    return [95 + r * Math.cos(a), 95 + r * Math.sin(a)] as [number, number]
  })
}
const shapeObject = (kind: string, base: Record<string, any>): FabricObject | null => {
  const t = theme.value
  if (kind === 'rect') return new Rect({ ...base, width: 200, height: 140 })
  if (kind === 'round') return new Rect({ ...base, width: 200, height: 140, rx: 18, ry: 18 })
  if (kind === 'ellipse') return new Ellipse({ ...base, rx: 100, ry: 70 })
  if (kind === 'triangle') return new Triangle({ ...base, width: 180, height: 150 })
  if (kind === 'line' || kind === 'arrowLine') {
    const l = new Line([0, 0, 200, 0], { originX: 'left', originY: 'top', left: base.left, top: base.top + 70, stroke: t.text, strokeWidth: 3 })
    if (kind === 'arrowLine') return new Group([l, new Triangle({ originX: 'center', originY: 'center', left: base.left + 200, top: base.top + 71.5, width: 16, height: 16, angle: 90, fill: t.text })])
    return l
  }
  if (kind === 'braceL' || kind === 'braceR') {
    const pts = (kind === 'braceL' ? [[60, 0], [30, 10], [30, 70], [0, 90], [30, 110], [30, 170], [60, 180]] : [[0, 0], [30, 10], [30, 70], [60, 90], [30, 110], [30, 170], [0, 180]]) as [number, number][]
    const p = polygon(pts, kind, { ...base, fill: '', stroke: t.text, strokeWidth: 3 })
    return p
  }
  if (SHAPE_POINTS[kind]) return polygon(SHAPE_POINTS[kind], kind, base)
  return null
}
const addShape = (kind: string) => {
  if (kind === 'textbox') return addText()
  const t = theme.value
  const o = shapeObject(kind, { originX: 'left' as const, originY: 'top' as const, left: W.value / 2 - 100, top: 190, fill: t.accent, stroke: '#000000', strokeWidth: 0 })
  if (o) place(o)
}
const fileToDataUrl = (file: Blob) => new Promise<string>((resolve, reject) => {
  const r = new FileReader()
  r.onload = () => resolve(String(r.result))
  r.onerror = () => reject(r.error)
  r.readAsDataURL(file)
})
/** a picture, kept no bigger than the slide needs */
const shrinkImage = (src: string, type = 'image/jpeg') => new Promise<string>((resolve, reject) => {
  const img = new Image()
  img.onload = () => {
    const k = Math.min(1, 1600 / Math.max(img.width, img.height))
    const cv = document.createElement('canvas')
    cv.width = Math.round(img.width * k); cv.height = Math.round(img.height * k)
    cv.getContext('2d')!.drawImage(img, 0, 0, cv.width, cv.height)
    resolve(cv.toDataURL(type === 'image/png' ? 'image/png' : 'image/jpeg', 0.85))
  }
  img.onerror = reject
  img.src = src
})
const placeImage = async (url: string, opts: { maxW?: number; maxH?: number; extra?: Record<string, any>; add?: boolean } = {}) => {
  const fimg = await FabricImage.fromURL(url)
  const k = Math.min(1, (opts.maxW || 480) / fimg.width!, (opts.maxH || 360) / fimg.height!)
  fimg.set({ originX: 'left', originY: 'top', left: (W.value - fimg.width! * k) / 2, top: (H - fimg.height! * k) / 2, scaleX: k, scaleY: k, ...(opts.extra || {}) })
  if (opts.add !== false) place(fimg)
  return fimg
}
const addPicture = async (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return
  const url = URL.createObjectURL(file)
  try { await placeImage(await shrinkImage(url, file.type)) } finally { URL.revokeObjectURL(url) }
}
const photoAlbum = async (e: Event) => {
  const input = e.target as HTMLInputElement
  const files = [...(input.files || [])]
  input.value = ''
  if (!files.length) return
  storeCurrent()
  let at = index.value
  for (const f of files) {
    const url = URL.createObjectURL(f)
    try {
      const src = await shrinkImage(url, f.type)
      const img = await FabricImage.fromURL(src)
      const k = Math.min((W.value - 80) / img.width!, (H - 80) / img.height!)
      img.set({ originX: 'left', originY: 'top', left: (W.value - img.width! * k) / 2, top: (H - img.height! * k) / 2, scaleX: k, scaleY: k })
      const s = newSlide('blank', current.value)
      s.json = slideJson([img], s.background)
      slides.value.splice(++at, 0, s)
    } finally { URL.revokeObjectURL(url) }
  }
  index.value = at
  await show_(at)
  for (const s of slides.value) if (!thumbs[s.id]) thumbs[s.id] = await renderSlide(s, slides.value.indexOf(s), 0.23)
  changed()
}
const takeScreenshot = async () => {
  if (!navigator.mediaDevices?.getDisplayMedia) return toast.error('This browser cannot take a screenshot')
  let stream: MediaStream | null = null
  try {
    stream = await navigator.mediaDevices.getDisplayMedia({ video: true })
    const v = document.createElement('video')
    v.srcObject = stream
    v.muted = true
    await v.play()
    await new Promise(r => setTimeout(r, 300))
    const cv = document.createElement('canvas')
    cv.width = v.videoWidth; cv.height = v.videoHeight
    cv.getContext('2d')!.drawImage(v, 0, 0)
    await placeImage(await shrinkImage(cv.toDataURL('image/png'), 'image/png'), { extra: { tusomeName: 'Screenshot' } })
  } catch { /* cancelled */ } finally { stream?.getTracks().forEach(t => t.stop()) }
}

// ---- media: video and audio, played in the slide show ----
const posterFor = async (kind: 'video' | 'audio', src: string) => {
  const cv = document.createElement('canvas')
  if (kind === 'video') {
    const v = document.createElement('video')
    v.muted = true
    v.src = src
    await new Promise<void>((resolve) => { v.onloadeddata = () => resolve(); v.onerror = () => resolve() })
    try { v.currentTime = Math.min(0.5, (v.duration || 1) / 3); await new Promise(r => { v.onseeked = r; setTimeout(r, 1500) }) } catch { /* */ }
    cv.width = v.videoWidth || 640; cv.height = v.videoHeight || 360
    const ctx = cv.getContext('2d')!
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, cv.width, cv.height)
    try { ctx.drawImage(v, 0, 0, cv.width, cv.height) } catch { /* */ }
    const r = Math.min(cv.width, cv.height) / 8
    ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.beginPath(); ctx.arc(cv.width / 2, cv.height / 2, r, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(cv.width / 2 - r / 3, cv.height / 2 - r / 2); ctx.lineTo(cv.width / 2 + r / 2, cv.height / 2); ctx.lineTo(cv.width / 2 - r / 3, cv.height / 2 + r / 2); ctx.fill()
    return shrinkImage(cv.toDataURL('image/jpeg', 0.85))
  }
  cv.width = 120; cv.height = 120
  const ctx = cv.getContext('2d')!
  ctx.fillStyle = '#b7472a'; ctx.beginPath(); ctx.arc(60, 60, 56, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(34, 48); ctx.lineTo(50, 48); ctx.lineTo(70, 30); ctx.lineTo(70, 90); ctx.lineTo(50, 72); ctx.lineTo(34, 72); ctx.fill()
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(72, 60, 18, -0.8, 0.8); ctx.stroke()
  return cv.toDataURL('image/png')
}
const insertMedia = async (kind: 'video' | 'audio', blob: Blob, name: string) => {
  if (blob.size > MAX_MEDIA) return toast.error(`That ${kind} is too big to keep in the slides (8 MB at most). Try a shorter one.`)
  const src = await fileToDataUrl(blob)
  const poster = await posterFor(kind, src)
  await placeImage(poster, kind === 'video' ? { maxW: 560, maxH: 320 } : { maxW: 96, maxH: 96, extra: { left: W.value - 150, top: H - 150 } })
  const o: any = canvas.value?.getActiveObject()
  if (o) { o.tusomeMedia = { kind, src, name }; o.tusomeName = `${kind === 'video' ? 'Video' : 'Audio'}: ${name}`; changed() }
}
const addMediaFile = async (e: Event, kind: 'video' | 'audio') => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (file) await insertMedia(kind, file, file.name)
}

// recording: a narration for the slide, or the screen
const recorder = shallowRef<{ kind: 'narration' | 'screen'; rec: MediaRecorder; stream: MediaStream; started: number } | null>(null)
const recordSeconds = ref(0)
let recordTimer: number | null = null
const startRecorder = (kind: 'narration' | 'screen', stream: MediaStream, done: (blob: Blob) => void) => {
  const chunks: Blob[] = []
  const rec = new MediaRecorder(stream)
  rec.ondataavailable = e => { if (e.data.size) chunks.push(e.data) }
  rec.onstop = () => {
    stream.getTracks().forEach(t => t.stop())
    if (recordTimer) clearInterval(recordTimer)
    recorder.value = null
    if (chunks.length) done(new Blob(chunks, { type: rec.mimeType || (kind === 'narration' ? 'audio/webm' : 'video/webm') }))
  }
  // the screen share's own "Stop sharing" ends it too
  stream.getVideoTracks()[0]?.addEventListener('ended', () => { if (rec.state !== 'inactive') rec.stop() })
  rec.start(1000)
  recorder.value = { kind, rec, stream, started: Date.now() }
  recordSeconds.value = 0
  recordTimer = window.setInterval(() => { recordSeconds.value = (Date.now() - (recorder.value?.started || Date.now())) / 1000 }, 250)
}
const stopRecording = () => { const r = recorder.value; if (r && r.rec.state !== 'inactive') r.rec.stop() }
const recordNarration = async () => {
  menu.value = null
  if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') return toast.error('This browser cannot record sound')
  const s = current.value
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    startRecorder('narration', stream, async blob => {
      if (blob.size > MAX_MEDIA) return toast.error('That narration is too long to keep (8 MB at most).')
      s.narration = await fileToDataUrl(blob)
      slideChanged()
      toast.success(`Narration recorded for slide ${slides.value.indexOf(s) + 1}`)
    })
  } catch { toast.error('The microphone could not be used') }
}
const clearNarration = (all: boolean) => {
  menu.value = null
  if (all) slides.value.forEach(s => (s.narration = null))
  else if (current.value) current.value.narration = null
  slideChanged()
}
const clearTimings = () => { menu.value = null; slides.value.forEach(s => { if (s.advance) s.advance.after = null }); slideChanged() }
const recordScreen = async () => {
  if (!navigator.mediaDevices?.getDisplayMedia || typeof MediaRecorder === 'undefined') return toast.error('This browser cannot record the screen')
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
    startRecorder('screen', stream, blob => insertMedia('video', blob, 'Screen Recording.webm'))
  } catch { /* cancelled */ }
}

// ---- tables, SmartArt, charts, WordArt, equations, symbols ----
const tableHover = ref({ r: 0, c: 0 })
const insertTable = (rows: number, cols: number) => {
  menu.value = null
  const c = canvas.value!
  const t = theme.value
  const id = uid()
  const width = Math.min(W.value - 120, cols * 140), cw = width / cols, rh = 40
  const left0 = (W.value - width) / 2, top0 = 150
  const added: FabricObject[] = []
  for (let r = 0; r < rows; r++) {
    for (let k = 0; k < cols; k++) {
      const rect: any = new Rect({ originX: 'left', originY: 'top', left: left0 + k * cw, top: top0 + r * rh, width: cw, height: rh, fill: r === 0 ? t.accent : r % 2 ? '#e9ebf5' : '#cfd5ea', stroke: '#ffffff', strokeWidth: 1.5 })
      rect.tusomeTable = { id, r, c: k, cell: true }
      rect.tusomeName = 'Table cell'
      const tb: any = textbox(r === 0 ? `Heading ${k + 1}` : '', { left: left0 + k * cw + 6, top: top0 + r * rh + 10, width: cw - 12, fontSize: 16, fill: r === 0 ? '#ffffff' : '#262626', fontWeight: r === 0 ? 'bold' : 'normal' })
      tb.tusomeTable = { id, r, c: k }
      tb.tusomeName = 'Table text'
      added.push(rect, tb)
    }
  }
  loading = true
  added.forEach(o => c.add(o))
  loading = false
  c.setActiveObject(added[1])
  c.requestRenderAll()
  changed()
}
const smartForm = reactive({ kind: 'process', items: 'Plan\nDo\nReview' })
const insertSmartArt = () => {
  const c = canvas.value!
  const t = theme.value
  const items = smartForm.items.split('\n').map(s => s.trim()).filter(Boolean).slice(0, 8)
  if (!items.length) return
  const out: FabricObject[] = []
  const box = (x: number, y: number, w: number, h: number, text: string, round = true, fill = t.accent) => {
    const r: any = round ? new Rect({ originX: 'left', originY: 'top', left: x, top: y, width: w, height: h, rx: 10, ry: 10, fill, strokeWidth: 0 }) : new Ellipse({ originX: 'left', originY: 'top', left: x, top: y, rx: w / 2, ry: h / 2, fill, strokeWidth: 0 })
    r.tusomeName = 'SmartArt shape'
    const tb: any = textbox(text, { left: x + 8, top: y + h / 2 - 14, width: w - 16, fontSize: Math.min(22, Math.max(12, 200 / text.length)), fill: '#ffffff', textAlign: 'center' })
    tb.tusomeName = 'SmartArt text'
    out.push(r, tb)
  }
  const w = W.value
  if (smartForm.kind === 'process') {
    const n = items.length, gap = 40, bw = Math.min(200, (w - 120 - gap * (n - 1)) / n), total = n * bw + gap * (n - 1), x0 = (w - total) / 2
    items.forEach((it, i) => {
      box(x0 + i * (bw + gap), 210, bw, 110, it)
      if (i < n - 1) out.push(polygon([[0, 8], [14, 8], [14, 0], [28, 14], [14, 28], [14, 20], [0, 20]], 'arrow', { originX: 'left', originY: 'top', left: x0 + i * (bw + gap) + bw + 6, top: 251, fill: t.accent2, strokeWidth: 0 }))
    })
  } else if (smartForm.kind === 'list') {
    const n = items.length, bh = Math.min(70, (H - 200) / n - 10)
    items.forEach((it, i) => box(w * 0.2, 140 + i * (bh + 10), w * 0.6, bh, it, true, i % 2 ? t.accent2 : t.accent))
  } else if (smartForm.kind === 'cycle') {
    const n = items.length, R = 150, cx = w / 2, cy = 300, d = 110
    items.forEach((it, i) => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / n
      box(cx + R * Math.cos(a) - d / 2, cy + R * Math.sin(a) - d / 2, d, d, it, false, i % 2 ? t.accent2 : t.accent)
    })
  } else {
    const [top, ...rest] = items
    const n = Math.max(1, rest.length), bw = Math.min(180, (w - 120) / n - 20), total = n * bw + (n - 1) * 20, x0 = (w - total) / 2
    box((w - 200) / 2, 140, 200, 80, top)
    rest.forEach((it, i) => {
      const x = x0 + i * (bw + 20)
      out.push(new Line([w / 2, 220, x + bw / 2, 300], { stroke: t.text, strokeWidth: 2 }))
      box(x, 300, bw, 80, it, true, t.accent2)
    })
  }
  loading = true
  out.forEach(o => c.add(o))
  loading = false
  dialog.value = null
  c.requestRenderAll()
  changed()
}
const chartForm = reactive({ type: 'bar', title: 'Chart Title', labels: 'Term 1, Term 2, Term 3', series: 'Marks: 45, 60, 72' })
const insertChart = async () => {
  const labels = chartForm.labels.split(',').map(s => s.trim()).filter(Boolean)
  const series = chartForm.series.split('\n').map(l => l.trim()).filter(Boolean).map((l, i) => {
    const [name, vals] = l.includes(':') ? [l.slice(0, l.indexOf(':')), l.slice(l.indexOf(':') + 1)] : [`Series ${i + 1}`, l]
    return { name: name.trim(), data: vals.split(',').map(v => Number(v.trim()) || 0) }
  })
  if (!labels.length || !series.length) return toast.error('Give the categories and at least one series of values')
  const COLORS = [theme.value.accent, theme.value.accent2, '#a5a5a5', '#ffc000', '#5b9bd5', '#70ad47']
  const round = chartForm.type === 'pie' || chartForm.type === 'doughnut'
  const { Chart, registerables } = await import('chart.js')
  Chart.register(...registerables)
  const cv = document.createElement('canvas')
  cv.width = 800; cv.height = 480
  const chart = new Chart(cv, {
    type: (chartForm.type === 'hbar' ? 'bar' : chartForm.type) as any,
    data: { labels, datasets: series.map((s, i) => ({ label: s.name, data: s.data, backgroundColor: round ? labels.map((_, j) => COLORS[j % COLORS.length]) : COLORS[i % COLORS.length], borderColor: chartForm.type === 'line' ? COLORS[i % COLORS.length] : '#ffffff', tension: 0.2 })) },
    options: { animation: false, responsive: false, indexAxis: chartForm.type === 'hbar' ? 'y' : 'x', plugins: { title: { display: !!chartForm.title, text: chartForm.title, font: { size: 20 } }, legend: { display: series.length > 1 || round, position: 'bottom' } } } as any,
    plugins: [{ id: 'white', beforeDraw: (ch: any) => { ch.ctx.save(); ch.ctx.fillStyle = '#fff'; ch.ctx.fillRect(0, 0, ch.width, ch.height); ch.ctx.restore() } }]
  })
  const url = cv.toDataURL('image/png')
  chart.destroy()
  dialog.value = null
  await placeImage(url, { maxW: 560, maxH: 340, extra: { tusomeName: 'Chart', tusomeAlt: `${chartForm.type} chart: ${chartForm.title}` } })
}
const wordArts = computed(() => {
  const t = theme.value
  return [
    { fill: t.accent, stroke: '', shadow: true },
    { fill: '#ffffff', stroke: t.accent, shadow: false },
    { fill: t.text, stroke: '', shadow: true },
    { fill: 'transparent', stroke: t.text, shadow: false },
    { fill: '#ffc000', stroke: '#c55a11', shadow: true },
    { fill: t.accent2, stroke: '#ffffff', shadow: true }
  ]
})
const insertWordArt = (w: { fill: string; stroke: string; shadow: boolean }) => {
  menu.value = null
  const o: any = textbox('Your text here', { left: (W.value - 600) / 2, top: 220, width: 600, fontSize: 60, fontWeight: 'bold', fontFamily: 'Impact', textAlign: 'center', fill: w.fill === 'transparent' ? '' : w.fill, stroke: w.stroke || null, strokeWidth: w.stroke ? 1.5 : 0, shadow: w.shadow ? new Shadow({ color: 'rgba(0,0,0,0.45)', blur: 5, offsetX: 3, offsetY: 3 }) : null })
  o.tusomeName = 'WordArt'
  place(o)
}
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
  const { toPng } = await import('html-to-image')
  const math = (el.querySelector('.katex-html') as HTMLElement) || el
  const box = math.getBoundingClientRect()
  const png = await toPng(math, { pixelRatio: 3, style: { padding: '8px', margin: '0', display: 'inline-block', color: theme.value.text }, width: Math.ceil(box.width) + 16, height: Math.ceil(box.height) + 16 })
  dialog.value = null
  await placeImage(png, { maxW: 600, maxH: 200, extra: { tusomeName: 'Equation', tusomeAlt: eqText.value } })
  eqText.value = ''
}
const insertSymbol = (ch: string) => {
  menu.value = null
  const o: any = canvas.value?.getActiveObject()
  if (o?.isEditing) {
    const s0 = o.selectionStart ?? 0, s1 = o.selectionEnd ?? s0
    o.set({ text: String(o.text).slice(0, s0) + ch + String(o.text).slice(s1) })
    o.selectionStart = o.selectionEnd = s0 + ch.length
    if (o.hiddenTextarea) { o.hiddenTextarea.value = o.text; o.hiddenTextarea.selectionStart = o.hiddenTextarea.selectionEnd = s0 + ch.length }
    canvas.value!.requestRenderAll()
    changed()
  } else if (o && sel.value.text) {
    o.set({ text: `${o.text || ''}${ch}` })
    canvas.value!.requestRenderAll()
    changed()
  } else {
    addText(ch, { fontSize: 48, width: 80, left: W.value / 2 - 40 })
  }
}

// ---- formatting ----
const setProp = (k: string, v: unknown) => {
  const c = canvas.value
  const o = c?.getActiveObject()
  if (!o) return
  const targets = o.type === 'activeselection' ? (o as any).getObjects() : [o]
  for (const t of targets) t.set(k as any, v as any)
  c!.requestRenderAll()
  changed()
}
const setOutline = (color: string) => {
  const o: any = canvas.value?.getActiveObject()
  if (!o) return
  o.set({ stroke: color, strokeWidth: o.strokeWidth || 2 })
  canvas.value!.requestRenderAll()
  changed()
}
const setOutlineWeight = (w: number) => {
  const o: any = canvas.value?.getActiveObject()
  if (!o) return
  menu.value = null
  o.set({ strokeWidth: w, stroke: typeof o.stroke === 'string' && o.stroke ? o.stroke : '#000000' })
  canvas.value!.requestRenderAll()
  changed()
}
const stepSize = (d: number) => {
  const cur = sel.value.fontSize
  setProp('fontSize', d > 0 ? SIZES.find(n => n > cur) ?? cur + 8 : [...SIZES].reverse().find(n => n < cur) ?? Math.max(6, cur - 2))
}
const clearText = () => {
  const o: any = canvas.value?.getActiveObject()
  if (!o) return
  o.set({ fontWeight: 'normal', fontStyle: 'normal', underline: false, linethrough: false, shadow: null, fill: theme.value.text, textBackgroundColor: '', charSpacing: 0 })
  canvas.value!.requestRenderAll()
  changed()
}
const toggleShadow = () => setProp('shadow', sel.value.shadow ? null : new Shadow({ color: 'rgba(0,0,0,0.45)', blur: 4, offsetX: 2, offsetY: 2 }))
const changeCase = (key: string) => {
  menu.value = null
  const o: any = canvas.value?.getActiveObject()
  if (!o || !sel.value.text) return
  const conv = (s: string) => key === 'upper' ? s.toUpperCase() : key === 'lower' ? s.toLowerCase()
    : key === 'title' ? s.toLowerCase().replace(/\b\p{L}/gu, m => m.toUpperCase())
      : key === 'toggle' ? [...s].map(ch => (ch === ch.toUpperCase() ? ch.toLowerCase() : ch.toUpperCase())).join('')
        : s.toLowerCase().replace(/(^\s*\p{L}|[.!?]\s+\p{L})/gu, m => m.toUpperCase())
  const text = String(o.text || '')
  const s0 = o.isEditing ? o.selectionStart : 0, s1 = o.isEditing && o.selectionEnd > o.selectionStart ? o.selectionEnd : text.length
  o.set({ text: text.slice(0, s0) + conv(text.slice(s0, s1)) + text.slice(s1) })
  canvas.value!.requestRenderAll()
  changed()
}
const toggleList = (kind: 'bullet' | 'number') => {
  const o: any = canvas.value?.getActiveObject()
  if (!o || !sel.value.text) return
  const lines: string[] = String(o.text || '').split('\n')
  const strip = (l: string) => l.replace(/^(\s*)(• |\d+\. )/, '$1')
  const isBullet = lines.every(l => /^\s*• /.test(l))
  const isNumber = lines.every(l => /^\s*\d+\. /.test(l))
  const out = kind === 'bullet'
    ? (isBullet ? lines.map(strip) : lines.map(l => strip(l).replace(/^(\s*)/, '$1• ')))
    : (isNumber ? lines.map(strip) : lines.map((l, i) => strip(l).replace(/^(\s*)/, `$1${i + 1}. `)))
  o.set({ text: out.join('\n') })
  canvas.value!.requestRenderAll()
  changed()
}
const listLevel = (d: number) => {
  const o: any = canvas.value?.getActiveObject()
  if (!o || !sel.value.text) return
  const lines: string[] = String(o.text || '').split('\n')
  // the line being typed in, or every line
  let only = -1
  if (o.isEditing) only = String(o.text).slice(0, o.selectionStart).split('\n').length - 1
  o.set({ text: lines.map((l, i) => (only >= 0 && i !== only ? l : d > 0 ? `    ${l}` : l.replace(/^ {1,4}/, ''))).join('\n') })
  canvas.value!.requestRenderAll()
  changed()
}
const quickStyles = computed(() => {
  const t = theme.value
  return [
    { fill: t.accent, stroke: '', strokeWidth: 0, text: '#fff', shadow: false },
    { fill: t.accent2, stroke: '', strokeWidth: 0, text: '#fff', shadow: false },
    { fill: '#ffffff', stroke: t.accent, strokeWidth: 2, text: t.accent, shadow: false },
    { fill: '#ffffff', stroke: t.accent2, strokeWidth: 2, text: t.accent2, shadow: false },
    { fill: `${t.accent}33`, stroke: t.accent, strokeWidth: 1, text: t.text, shadow: false },
    { fill: t.text, stroke: '', strokeWidth: 0, text: '#fff', shadow: true },
    { fill: t.accent, stroke: '#ffffff', strokeWidth: 3, text: '#fff', shadow: true },
    { fill: t.accent2, stroke: '', strokeWidth: 0, text: '#fff', shadow: true }
  ]
})
const applyQuickStyle = (q: { fill: string; stroke: string; strokeWidth: number; shadow: boolean }) => {
  menu.value = null
  const o: any = canvas.value?.getActiveObject()
  if (!o) return
  o.set({ fill: q.fill, stroke: q.stroke || null, strokeWidth: q.strokeWidth, shadow: q.shadow ? new Shadow({ color: 'rgba(0,0,0,0.4)', blur: 6, offsetX: 3, offsetY: 3 }) : null })
  canvas.value!.requestRenderAll()
  changed()
}
const applyEffect = (key: string) => {
  menu.value = null
  const shadow = key === 'shadow' ? new Shadow({ color: 'rgba(0,0,0,0.45)', blur: 6, offsetX: 4, offsetY: 4 })
    : key === 'glow' ? new Shadow({ color: theme.value.accent, blur: 22, offsetX: 0, offsetY: 0 })
      : key === 'soft' ? new Shadow({ color: 'rgba(0,0,0,0.25)', blur: 18, offsetX: 0, offsetY: 6 }) : null
  setProp('shadow', shadow)
}
const arrange = (where: string) => {
  menu.value = null
  const c = canvas.value
  const o = c?.getActiveObject()
  if (!o) return
  const w = o.getScaledWidth(), h = o.getScaledHeight()
  const cx = o.originX === 'center' ? w / 2 : 0, cy = o.originY === 'center' ? h / 2 : 0
  if (where === 'front') c!.bringObjectToFront(o)
  else if (where === 'back') c!.sendObjectToBack(o)
  else if (where === 'forward') c!.bringObjectForward(o)
  else if (where === 'backward') c!.sendObjectBackwards(o)
  else if (where === 'alignLeft') o.set({ left: cx })
  else if (where === 'centerH') o.set({ left: (W.value - w) / 2 + cx })
  else if (where === 'alignRight') o.set({ left: W.value - w + cx })
  else if (where === 'alignTop') o.set({ top: cy })
  else if (where === 'middle') o.set({ top: (H - h) / 2 + cy })
  else if (where === 'alignBottom') o.set({ top: H - h + cy })
  else if (where === 'rotR' || where === 'rotL') o.rotate(((o.angle || 0) + (where === 'rotR' ? 90 : -90) + 360) % 360)
  else if (where === 'flipH') o.set({ flipX: !o.flipX })
  else if (where === 'flipV') o.set({ flipY: !o.flipY })
  o.setCoords()
  c!.requestRenderAll()
  changed()
}
const groupSelected = () => {
  menu.value = null
  const c = canvas.value
  const o: any = c?.getActiveObject()
  if (!c || o?.type !== 'activeselection') return
  const objs = o.getObjects() as FabricObject[]
  c.discardActiveObject()
  loading = true
  objs.forEach(x => c.remove(x))
  const g: any = new Group(objs)
  c.add(g)
  loading = false
  c.setActiveObject(g)
  changed()
}
const ungroupSelected = () => {
  menu.value = null
  const c = canvas.value
  const g: any = c?.getActiveObject()
  if (!c || g?.type !== 'group') return
  loading = true
  const items = g.removeAll() as FabricObject[]
  c.remove(g)
  items.forEach(x => c.add(x))
  loading = false
  c.setActiveObject(new ActiveSelection(items, { canvas: c }))
  c.requestRenderAll()
  changed()
}
const removeSelected = () => {
  const c = canvas.value
  if (!c) return
  c.getActiveObjects().forEach(o => c.remove(o))
  c.discardActiveObject()
  changed()
}
const selectAll = () => {
  const c = canvas.value
  if (!c) return
  const objs = c.getObjects().filter((o: any) => !o.tusomeHF && o.visible)
  if (!objs.length) return
  c.discardActiveObject()
  c.setActiveObject(objs.length === 1 ? objs[0] : new ActiveSelection(objs, { canvas: c }))
  c.requestRenderAll()
  tick.value++
}
const selectObj = (o: FabricObject) => {
  const c = canvas.value
  if (!c || props.readonly) return
  c.setActiveObject(o)
  c.requestRenderAll()
  tick.value++
}
const setText = (o: any, text: string) => { o.set({ text }); canvas.value?.requestRenderAll(); changed() }
const TYPE_NAMES: Record<string, string> = { textbox: 'TextBox', rect: 'Rectangle', ellipse: 'Oval', triangle: 'Triangle', polygon: 'Shape', line: 'Straight Connector', image: 'Picture', group: 'Group' }
const objName = (o: any) => o.tusomeName || (o.tusomePh ? `${o.tusomePh[0].toUpperCase()}${o.tusomePh.slice(1)} Placeholder` : o.type === 'textbox' && o.text ? `TextBox: ${String(o.text).slice(0, 24)}` : TYPE_NAMES[o.type] || o.type)
const layers = computed(() => { void tick.value; return (canvas.value?.getObjects() || []).filter((o: any) => !o.tusomeHF).slice().reverse() as any[] })

// clipboard and Format Painter, for slide objects
const clipboard = shallowRef<FabricObject | null>(null)
const copyObject = async (cut: boolean) => {
  const o = canvas.value?.getActiveObject()
  if (!o) return
  clipboard.value = await o.clone(EXTRA)
  if (cut) removeSelected()
}
const pasteObject = async () => {
  if (!clipboard.value) return
  const o = await clipboard.value.clone(EXTRA)
  o.set({ left: (o.left || 0) + 20, top: (o.top || 0) + 20 })
  if (o.type === 'activeselection') {
    const c = canvas.value!
    ;(o as any).canvas = c
    ;(o as any).forEachObject((x: FabricObject) => c.add(x))
    o.setCoords()
    c.setActiveObject(o)
    changed()
  } else {
    place(o)
  }
}
const STYLE_KEYS = ['fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'underline', 'linethrough', 'fill', 'stroke', 'strokeWidth', 'textAlign', 'shadow', 'charSpacing', 'textBackgroundColor']
const painter = ref<Record<string, unknown> | null>(null)
const startPainter = () => {
  const o: any = canvas.value?.getActiveObject()
  if (!o) return
  painter.value = Object.fromEntries(STYLE_KEYS.filter(k => o[k] !== undefined).map(k => [k, o[k]]))
}
const animPainter = ref<ObjectAnim | null>(null)
const startAnimPainter = () => { if (sel.value.anim) animPainter.value = { ...sel.value.anim } }
const applyPainter = () => {
  const o: any = canvas.value?.getActiveObject()
  if (!o) return
  if (animPainter.value) {
    o.tusomeAnim = { ...animPainter.value, order: nextAnimOrder() }
    animPainter.value = null
    canvas.value!.requestRenderAll()
    changed()
    return
  }
  if (!painter.value) return
  const style = painter.value
  painter.value = null
  for (const [k, v] of Object.entries(style)) {
    if (o.type !== 'textbox' && ['fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'underline', 'linethrough', 'textAlign', 'charSpacing', 'textBackgroundColor'].includes(k)) continue
    o.set(k, v)
  }
  canvas.value!.requestRenderAll()
  changed()
}

// ---- Find and Replace ----
const findForm = reactive({ find: '', replace: '', matchCase: false, message: '', from: { slide: 0, obj: -1 } })
const norm = (s: string) => (findForm.matchCase ? s : s.toLowerCase())
const findNext = async () => {
  storeCurrent()
  const needle = norm(findForm.find)
  if (!needle) return
  const total = slides.value.length
  const start = { ...findForm.from }
  for (let step = 0; step <= total; step++) {
    const si = (start.slide + step) % total
    const objs: any[] = slides.value[si].json?.objects || []
    for (let oi = step === 0 ? start.obj + 1 : 0; oi < objs.length; oi++) {
      const o = objs[oi]
      if (o.type?.toLowerCase() === 'textbox' && !isEmptyPh(o) && norm(String(o.text || '')).includes(needle)) {
        findForm.from = { slide: si, obj: oi }
        findForm.message = `Found on slide ${si + 1}`
        if (si !== index.value) { index.value = si; await show_(si) }
        const live = canvas.value!.getObjects().filter((x: any) => !x.tusomeHF)[oi]
        if (live) selectObj(live)
        return
      }
    }
  }
  findForm.from = { slide: 0, obj: -1 }
  findForm.message = 'PowerPoint has finished searching the presentation. The search item wasn\'t found again.'.replace('PowerPoint', 'Tusome')
}
const replaceIn = (text: string) => {
  const flags = findForm.matchCase ? 'g' : 'gi'
  return text.replace(new RegExp(findForm.find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags), findForm.replace)
}
const replaceOne = async () => {
  const o: any = canvas.value?.getActiveObject()
  if (o && sel.value.text && norm(String(o.text || '')).includes(norm(findForm.find))) setText(o, replaceIn(String(o.text)))
  await findNext()
}
const replaceAll = async () => {
  storeCurrent()
  let n = 0
  for (const s of slides.value) {
    for (const o of (s.json?.objects || []) as any[]) {
      if (o.type?.toLowerCase() !== 'textbox' || isEmptyPh(o)) continue
      const next = replaceIn(String(o.text || ''))
      if (next !== o.text) { n += (String(o.text).match(new RegExp(findForm.find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), findForm.matchCase ? 'g' : 'gi')) || []).length; o.text = next }
    }
  }
  await show_(index.value)
  for (const s of slides.value) thumbs[s.id] = await renderSlide(s, slides.value.indexOf(s), 0.23)
  findForm.message = n ? `${n} replacement${n === 1 ? '' : 's'} made.` : 'Nothing to replace.'
  emit('change')
}

// ---- Header & Footer, links, comments ----
const hfForm = reactive({ date: false, dateAuto: true, dateText: '', number: false, footer: false, footerText: '', notOnTitle: false })
const applyHf = (all: boolean) => {
  const hf: HeaderFooter = { date: hfForm.date ? (hfForm.dateAuto ? 'auto' : hfForm.dateText) : null, number: hfForm.number, footer: hfForm.footer ? hfForm.footerText : null, notOnTitle: hfForm.notOnTitle }
  storeCurrent()
  for (const s of all ? slides.value : [current.value]) setHf(s, { ...hf })
  dialog.value = null
  refreshHf()
  if (all) slides.value.forEach(async (s, i) => { if (s !== current.value) thumbs[s.id] = await renderSlide(s, i, 0.23) })
}
const linkForm = reactive({ url: '' })
const commentDraft = ref('')
const commentBox = ref<HTMLTextAreaElement | null>(null)
const newComment = async () => {
  openPane('comments')
  await nextTick()
  commentBox.value?.focus()
}
const postComment = () => {
  const s = current.value
  if (!s || !commentDraft.value.trim()) return
  s.comments = [...(s.comments || []), { id: uid(), text: commentDraft.value.trim(), at: new Date().toISOString() }]
  commentDraft.value = ''
  slideChanged()
}
const deleteComment = (i: number) => {
  const s = current.value
  if (!s?.comments) return
  s.comments.splice(i, 1)
  slideChanged()
}
const hasCommentsElsewhere = computed(() => slides.value.some((s, i) => i !== index.value && s.comments?.length))
const commentStep = (d: number) => {
  const n = slides.value.length
  for (let k = 1; k < n; k++) {
    const i = (index.value + d * k + n * k) % n
    if (slides.value[i].comments?.length) { goTo(i); openPane('comments'); return }
  }
}

// ---- Design: themes, variants, size, background ----
const variants = computed(() => {
  const t = theme.value
  return [
    { bg: t.bg, text: t.text, accent: t.accent, accent2: t.accent2 },
    { bg: '#ffffff', text: '#262626', accent: t.accent2, accent2: t.accent },
    { bg: '#262626', text: '#f2f2f2', accent: t.accent, accent2: t.accent2 },
    { bg: t.accent, text: '#ffffff', accent: '#ffffff', accent2: t.accent2 }
  ]
})
const recolor = (s: Slide, text: string, font?: string) => {
  for (const o of s.json?.objects || []) if (o.type?.toLowerCase() === 'textbox' && !o.tusomeTable && !o.tusomeName) { o.fill = text; if (font) o.fontFamily = font }
}
const applyTheme = async (t: Theme) => {
  theme.value = t
  storeCurrent()
  for (const s of slides.value) {
    s.background = t.bg
    s.bgGradient = t.grad ? { from: t.bg, to: t.grad, angle: 135 } : null
    s.bgImage = null
    recolor(s, t.text, t.font)
    if (s.json) s.json.background = t.bg
  }
  await show_(index.value)
  for (const s of slides.value) thumbs[s.id] = await renderSlide(s, slides.value.indexOf(s), 0.23)
  changed()
}
const applyVariant = async (v: { bg: string; text: string; accent: string; accent2: string }) => {
  theme.value = { ...theme.value, accent: v.accent, accent2: v.accent2, text: v.text, bg: v.bg, grad: undefined }
  storeCurrent()
  for (const s of slides.value) { s.background = v.bg; s.bgGradient = null; s.bgImage = null; recolor(s, v.text); if (s.json) s.json.background = v.bg }
  await show_(index.value)
  for (const s of slides.value) thumbs[s.id] = await renderSlide(s, slides.value.indexOf(s), 0.23)
  changed()
}
const setSlideSize = async (to: '16x9' | '4x3') => {
  menu.value = null
  if (to === size.value) return
  storeCurrent()
  const oldW = W.value
  size.value = to
  const newW = W.value
  // Ensure Fit: everything shrinks to fit, centred
  const k = Math.min(newW / oldW, 1), dx = (newW - oldW * k) / 2, dy = (H - H * k) / 2
  for (const s of slides.value) {
    for (const o of (s.json?.objects || []) as any[]) {
      o.left = (o.left || 0) * k + dx
      o.top = (o.top || 0) * k + dy
      o.scaleX = (o.scaleX || 1) * k
      o.scaleY = (o.scaleY || 1) * k
    }
  }
  fit()
  await show_(index.value)
  for (const s of slides.value) thumbs[s.id] = await renderSlide(s, slides.value.indexOf(s), 0.23)
  changed()
}
const bgPictureInput = ref<HTMLInputElement | null>(null)
const bgMode = computed(() => (current.value?.bgImage ? 'picture' : current.value?.bgGradient ? 'gradient' : 'solid'))
const setBackground = async (patch: Partial<Slide>) => {
  const s = current.value
  const c = canvas.value
  if (!s || !c) return
  Object.assign(s, patch)
  await paintBackground(c, s)
  c.requestRenderAll()
  changed()
}
const setBgMode = (m: 'solid' | 'gradient' | 'picture') => {
  const s = current.value
  if (!s) return
  if (m === 'solid') setBackground({ bgGradient: null, bgImage: null })
  else if (m === 'gradient') setBackground({ bgImage: null, bgGradient: s.bgGradient || { from: s.background, to: theme.value.accent, angle: 90 } })
  else if (!s.bgImage) bgPictureInput.value?.click()
}
const setGradient = (k: 'from' | 'to' | 'angle', v: string | number) => {
  const s = current.value
  if (!s) return
  setBackground({ bgImage: null, bgGradient: { ...(s.bgGradient || { from: s.background, to: theme.value.accent, angle: 90 }), [k]: v } as any })
}
const setBgPicture = async (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return
  const url = URL.createObjectURL(file)
  try { await setBackground({ bgImage: await shrinkImage(url, file.type) }) } finally { URL.revokeObjectURL(url) }
}
const applyBackgroundToAll = async () => {
  storeCurrent()
  const s0 = current.value
  for (const s of slides.value) {
    s.background = s0.background
    s.bgGradient = s0.bgGradient ? { ...s0.bgGradient } : null
    s.bgImage = s0.bgImage || null
    if (s.json) s.json.background = s0.background
  }
  for (const s of slides.value) thumbs[s.id] = await renderSlide(s, slides.value.indexOf(s), 0.23)
  changed()
}

// ---- Transitions ----
const transitionDirs = computed(() => transitionDef(current.value?.transition?.type)?.dirs || [])
const setTransition = (type: string) => {
  const s = current.value
  if (!s) return
  const def = transitionDef(type)
  s.transition = type === 'none' ? null : { type, dir: def?.dirs?.[0], duration: s.transition?.duration ?? (type === 'cut' ? 0.1 : 1) }
  slideChanged()
  if (type !== 'none' && type !== 'cut') previewTransition()
}
const setTransitionProp = (k: 'dir' | 'duration', v: any) => {
  menu.value = null
  const s = current.value
  if (!s?.transition) return
  s.transition = { ...s.transition, [k]: v }
  slideChanged()
  if (k === 'dir') previewTransition()
}
const applyTransitionToAll = () => {
  const t = current.value?.transition || null
  const adv = current.value?.advance
  for (const s of slides.value) { s.transition = t ? { ...t } : null; if (adv) s.advance = { ...adv } }
  slideChanged()
  toast.success('The transition is on every slide')
}
const setAdvance = (k: 'click' | 'after', v: any) => {
  const s = current.value
  if (!s) return
  s.advance = { click: s.advance?.click ?? true, after: s.advance?.after ?? null, [k]: v }
  slideChanged()
}
const toggleHidden = () => { if (current.value) { current.value.hidden = !current.value.hidden; slideChanged() } }

// ---- Animations ----
const animDirs = computed(() => animDef(sel.value.anim?.effect)?.dirs || [])
const nextAnimOrder = () => Math.max(0, ...(canvas.value?.getObjects() || []).map((o: any) => o.tusomeAnim?.order || 0)) + 1
const animatedHere = computed(() => {
  void tick.value
  const objs = (canvas.value?.getObjects() || []).filter((o: any) => o.tusomeAnim) as any[]
  objs.sort((a, b) => a.tusomeAnim.order - b.tusomeAnim.order)
  let group = 0
  return objs.map((o, i) => {
    const a = o.tusomeAnim as ObjectAnim
    if (a.start === 'click' || i === 0) group += a.start === 'click' ? 1 : 0
    const def = animDef(a.effect)
    return { obj: o, order: a.order, group, start: a.start, label: def?.label || a.effect, kind: def?.kind || 'entrance' }
  })
})
const setAnimation = (key: string | null) => {
  const o: any = canvas.value?.getActiveObject()
  if (!o || o.type === 'activeselection') return
  if (!key) delete o.tusomeAnim
  else {
    const def = animDef(key)
    const prev = o.tusomeAnim as ObjectAnim | undefined
    o.tusomeAnim = { effect: key, dir: def?.dirs?.includes(prev?.dir as Dir) ? prev!.dir : def?.dirs?.[0], start: prev?.start || 'click', duration: prev?.duration ?? (key === 'appear' ? 0 : 0.5), delay: prev?.delay ?? 0, order: prev?.order ?? nextAnimOrder() }
  }
  canvas.value!.requestRenderAll()
  changed()
  if (key) previewAnimations()
}
const setAnimProp = (k: keyof ObjectAnim, v: any) => {
  menu.value = null
  const o: any = canvas.value?.getActiveObject()
  if (!o?.tusomeAnim) return
  o.tusomeAnim = { ...o.tusomeAnim, [k]: v }
  canvas.value!.requestRenderAll()
  changed()
}
const moveAnim = (d: number) => {
  const list = animatedHere.value
  const i = list.findIndex(a => a.obj === activeObj.value)
  const j = i + d
  if (i < 0 || j < 0 || j >= list.length) return
  const a = list[i].obj.tusomeAnim, b = list[j].obj.tusomeAnim
  ;[a.order, b.order] = [b.order, a.order]
  canvas.value!.requestRenderAll()
  changed()
}

// ---- Accessibility ----
const luminance = (hex: string) => {
  const m = /^#?([0-9a-f]{6})/i.exec(hex || '')
  if (!m) return null
  const n = parseInt(m[1], 16)
  const ch = [n >> 16, (n >> 8) & 255, n & 255].map(v => { const c = v / 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4 })
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2]
}
const contrast = (a: string, b: string) => {
  const la = luminance(a), lb = luminance(b)
  if (la === null || lb === null) return 21
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}
interface Issue { label: string; slide: number; what?: string; obj?: number }
const accIssues = computed<Issue[]>(() => {
  void tick.value
  const out: Issue[] = []
  slides.value.forEach((s, si) => {
    const objs: any[] = si === index.value && canvas.value ? (canvas.value.getObjects() as any[]).filter(o => !o.tusomeHF) : (s.json?.objects || [])
    const texts = objs.filter(o => String(o.type).toLowerCase() === 'textbox' && !isEmptyPh(o) && String(o.text || '').trim())
    const hasTitle = texts.some(o => o.tusomePh === 'title' || (o.fontSize || 0) * (o.scaleY || 1) >= 32)
    if (!hasTitle) out.push({ label: 'Missing slide title', slide: si })
    objs.forEach((o, oi) => {
      if (String(o.type).toLowerCase() === 'image' && !o.tusomeAlt && !o.tusomeMedia) out.push({ label: 'Missing alternative text', slide: si, what: o.tusomeName || 'Picture', obj: oi })
      if (o.tusomeMedia && !o.tusomeAlt) out.push({ label: 'Media without a description', slide: si, what: o.tusomeName, obj: oi })
    })
    if (!s.bgImage && !s.bgGradient) {
      for (const [oi, o] of objs.entries()) {
        // text sitting on its own shape (a table cell, SmartArt) is read against that, not the slide
        if (String(o.type).toLowerCase() === 'textbox' && !o.tusomeTable && !String(o.tusomeName || '').startsWith('SmartArt') && typeof o.fill === 'string' && !o.textBackgroundColor && !isEmptyPh(o) && String(o.text || '').trim() && contrast(o.fill, s.background) < 3) {
          out.push({ label: 'Hard-to-read text contrast', slide: si, what: String(o.text).slice(0, 30), obj: oi })
          break
        }
      }
    }
  })
  return out
})
const goIssue = async (iss: Issue) => {
  await goTo(iss.slide)
  if (iss.obj !== undefined) {
    const live = canvas.value!.getObjects().filter((x: any) => !x.tusomeHF)[iss.obj]
    if (live) selectObj(live)
  }
}

// ---- Spelling ----
const spellLang = ref('en-GB')
const spellTexts = computed(() => { void tick.value; return (canvas.value?.getObjects() || []).filter((o: any) => o.type === 'textbox' && !o.tusomeHF && !isEmptyPh(o)) })

// ---- Outline ----
const outline = computed(() => {
  void tick.value
  return slides.value.map((s, si) => {
    const objs: any[] = si === index.value && canvas.value ? (canvas.value.getObjects() as any[]).filter(o => !o.tusomeHF) : (s.json?.objects || [])
    const texts = objs.filter(o => String(o.type).toLowerCase() === 'textbox' && !isEmptyPh(o) && String(o.text || '').trim())
    const title = texts.find(o => o.tusomePh === 'title') || texts[0]
    return { title: title ? String(title.text).split('\n')[0] : '', body: texts.filter(o => o !== title).flatMap(o => String(o.text).split('\n')).slice(0, 8) }
  })
})
const setView = async (v: typeof view.value) => {
  storeCurrent()
  view.value = v
  await nextTick()
  if (v === 'normal' || v === 'outline') fit()
}

const onKey = (e: KeyboardEvent) => {
  const c = canvas.value
  const o: any = c?.getActiveObject()
  if (props.readonly || o?.isEditing || show.value) return
  const tag = (e.target as HTMLElement)?.tagName
  if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return
  if ((e.ctrlKey || e.metaKey) && e.key === 'c' && o) { e.preventDefault(); copyObject(false) }
  else if ((e.ctrlKey || e.metaKey) && e.key === 'x' && o) { e.preventDefault(); copyObject(true) }
  else if ((e.ctrlKey || e.metaKey) && e.key === 'v' && clipboard.value) { e.preventDefault(); pasteObject() }
  else if ((e.ctrlKey || e.metaKey) && e.key === 'a') { e.preventDefault(); selectAll() }
  else if ((e.ctrlKey || e.metaKey) && (e.key === 'f' || e.key === 'h')) { e.preventDefault(); openDialog(e.key === 'f' ? 'find' : 'replace') }
  else if ((e.ctrlKey || e.metaKey) && e.key === 'm') { e.preventDefault(); addSlide('content') }
  else if (e.key === 'F5') { e.preventDefault(); startShow(e.shiftKey ? index.value : 0) }
  else if (o && (e.key === 'Delete' || e.key === 'Backspace')) { e.preventDefault(); removeSelected() }
  else if (!o && (e.key === 'PageDown' || e.key === 'PageUp')) { e.preventDefault(); goTo(index.value + (e.key === 'PageDown' ? 1 : -1)) }
}

// ---- the slide show: each slide as a picture of what stays still, plus a picture per animated object ----
const renderSlide = async (s: Slide, i: number, multiplier = 1) => {
  const sc = new StaticCanvas(undefined as any, { width: W.value, height: H })
  if (s.json) await sc.loadFromJSON(s.json)
  sc.getObjects().filter(isEmptyPh).forEach(o => sc.remove(o))
  await paintBackground(sc, s)
  hfObjects(s, i).forEach(o => sc.add(o))
  sc.renderAll()
  const url = sc.toDataURL({ format: 'png', multiplier })
  sc.dispose()
  return url
}
const boxOf = (o: FabricObject, pad = 0): Box => {
  const r = o.getBoundingRect()
  return { l: (r.left - pad) / W.value, t: (r.top - pad) / H, w: (r.width + 2 * pad) / W.value, h: (r.height + 2 * pad) / H }
}
const prepareSlide = async (s: Slide, i: number, animate = !setup.noAnimation): Promise<ShowSlide> => {
  const sc = new StaticCanvas(undefined as any, { width: W.value, height: H })
  if (s.json) await sc.loadFromJSON(s.json)
  sc.getObjects().filter(o => isEmptyPh(o) || !o.visible).forEach(o => sc.remove(o))
  hfObjects(s, i).forEach(o => sc.add(o))
  const objs = sc.getObjects() as any[]
  const animated = animate ? objs.filter(o => o.tusomeAnim) : []
  const out: ShowSlide = { base: '', layers: [], media: [], links: [], transition: s.transition || null, advance: s.advance || null, narration: s.narration || null }
  for (const o of objs) {
    if (o.tusomeMedia) out.media.push({ kind: o.tusomeMedia.kind, src: o.tusomeMedia.src, box: boxOf(o) })
    if (o.tusomeLink) out.links.push({ url: o.tusomeLink, box: boxOf(o) })
  }
  // each animated object on its own (no background - loading the slide put its colour back), cropped to itself
  sc.backgroundColor = ''
  sc.backgroundImage = undefined
  const pad = 12
  for (const o of animated) {
    const r = o.getBoundingRect()
    const url = sc.toDataURL({ format: 'png', multiplier: 2, left: r.left - pad, top: r.top - pad, width: r.width + 2 * pad, height: r.height + 2 * pad, filter: (x: any) => x === o })
    out.layers.push({ id: `${s.id}-${o.tusomeAnim.order}-${out.layers.length}`, url, box: boxOf(o, pad), anim: o.tusomeAnim })
  }
  await paintBackground(sc, s)
  sc.renderAll()
  out.base = sc.toDataURL({ format: 'png', multiplier: Math.min(2, Math.max(1, (window.screen.width * (window.devicePixelRatio || 1)) / W.value)), filter: (x: any) => !animated.includes(x) })
  sc.dispose()
  return out
}
const show = shallowRef<{ slides: ShowSlide[]; start: number; mode: 'full' | 'reading' | 'preview' | 'rehearse'; from: number | null; order: number[] } | null>(null)
const startShow = async (from: number, mode: 'full' | 'reading' | 'rehearse' = 'full') => {
  storeCurrent()
  const order = slides.value.map((_, i) => i).filter(i => !slides.value[i].hidden || (mode !== 'full' && mode !== 'rehearse') || i === from)
  const list: ShowSlide[] = []
  for (const i of order) list.push(await prepareSlide(slides.value[i], i))
  show.value = { slides: list, start: Math.max(0, order.indexOf(from)), mode, from: null, order }
}
const blankSlide = (): ShowSlide => {
  const cv = document.createElement('canvas')
  cv.width = 16; cv.height = 9
  const ctx = cv.getContext('2d')!
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, 16, 9)
  return { base: cv.toDataURL(), layers: [], media: [], links: [] }
}
const previewTransition = async () => {
  storeCurrent()
  const prev = index.value > 0 ? await prepareSlide(slides.value[index.value - 1], index.value - 1, false) : blankSlide()
  const cur = await prepareSlide(current.value, index.value, false)
  show.value = { slides: [prev, cur], start: 1, mode: 'preview', from: 0, order: [] }
}
const previewAnimations = async () => {
  storeCurrent()
  const cur = await prepareSlide(current.value, index.value, true)
  cur.transition = null
  show.value = { slides: [cur], start: 0, mode: 'preview', from: null, order: [] }
}
const onShowClose = async (timings: number[] | null) => {
  const s = show.value
  show.value = null
  if (s?.mode === 'reading' && s.order.length) { /* stay on the slide being read */ }
  if (s?.mode === 'rehearse' && timings) {
    const total = timings.reduce((a, b) => a + b, 0)
    if (await confirmDialog.open({ title: 'Rehearse Timings', message: `The time for the slide show was ${clock(total)}. Keep the new slide timings?`, confirmLabel: 'Yes', cancelLabel: 'No' })) {
      s.order.forEach((si, k) => { const sl = slides.value[si]; sl.advance = { click: sl.advance?.click ?? true, after: timings[k] ?? 0 } })
      setup.timings = true
      slideChanged()
    }
  }
}

// ---- open ----
const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => fit()) : null
onMounted(async () => {
  const c = new Canvas(canvasEl.value!, { width: W.value, height: H, preserveObjectStacking: true, selection: !props.readonly })
  canvas.value = c
  let deck: any = null
  if (props.initial && props.initial.byteLength) {
    try { deck = JSON.parse(new TextDecoder().decode(props.initial)) } catch { deck = null }
  }
  if (deck?.size === '4x3' || deck?.width === 720) size.value = '4x3'
  if (deck?.theme) theme.value = deck.themeColors || THEMES.find(t => t.name === deck.theme) || THEMES[0]
  if (deck?.setup) Object.assign(setup, deck.setup)
  slides.value = deck?.slides?.length
    ? deck.slides.map((s: any) => ({
      id: s.id || uid(), background: s.background || '#ffffff', bgGradient: s.bgGradient || null, bgImage: s.bgImage || null, json: s.json || null, notes: s.notes || '',
      layout: s.layout || 'blank', section: s.section || null, hidden: !!s.hidden, transition: s.transition || null, advance: s.advance || undefined,
      comments: s.comments || [], narration: s.narration || null, hf: s.hf || null
    }))
    : [{ id: uid(), background: '#ffffff', json: slideJson(layoutObjects('title'), '#ffffff'), notes: '', layout: 'title' }]
  if (!props.readonly) {
    for (const ev of ['object:modified', 'object:added', 'object:removed', 'text:changed'] as const) c.on(ev as any, (e: any) => { if (!e?.target?.tusomeHF) changed() })
    c.on('selection:created', () => { tick.value++; applyPainter() })
    c.on('selection:updated', () => { tick.value++; applyPainter() })
    c.on('selection:cleared', () => tick.value++)
    // a placeholder's prompt goes as soon as it is typed into, and comes back if it is left empty
    c.on('text:editing:entered', (e: any) => {
      const t: any = e.target
      if (!isEmptyPh(t)) return
      t.set({ text: '' })
      if (t.hiddenTextarea) t.hiddenTextarea.value = ''
      t.selectionStart = t.selectionEnd = 0
      c.requestRenderAll()
    })
    c.on('text:editing:exited', (e: any) => {
      const t: any = e.target
      if (t?.tusomePh && !String(t.text || '').trim()) { t.set({ text: PH_TEXT[t.tusomePh] }); c.requestRenderAll() }
    })
    window.addEventListener('keydown', onKey)
  }
  document.querySelector('.office-ribbon > div:last-child')?.addEventListener('scroll', closeOnScroll)
  // while the slide is being made: placeholders dashed, gridlines and guides, the animation order,
  // and a mark on media
  c.on('after:render', () => {
    const ctx = (c as any).contextContainer as CanvasRenderingContext2D
    const z = c.getZoom()
    ctx.save()
    if (gridlines.value) {
      ctx.strokeStyle = 'rgba(0,0,0,0.12)'
      ctx.lineWidth = 1
      for (let x = 40; x < W.value; x += 40) { ctx.beginPath(); ctx.moveTo(x * z, 0); ctx.lineTo(x * z, H * z); ctx.stroke() }
      for (let y = 40; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y * z); ctx.lineTo(W.value * z, y * z); ctx.stroke() }
    }
    if (guides.value) {
      ctx.setLineDash([6, 4])
      ctx.strokeStyle = 'rgba(80,80,80,0.6)'
      ctx.beginPath(); ctx.moveTo((W.value / 2) * z, 0); ctx.lineTo((W.value / 2) * z, H * z); ctx.moveTo(0, (H / 2) * z); ctx.lineTo(W.value * z, (H / 2) * z); ctx.stroke()
      ctx.setLineDash([])
    }
    if (!props.readonly) {
      ctx.setLineDash([5, 4])
      ctx.strokeStyle = '#9ca3af'
      ctx.lineWidth = 1
      for (const o of c.getObjects() as any[]) {
        if (!o.tusomePh || !o.visible) continue
        const r = o.getBoundingRect()
        ctx.strokeRect(r.left * z - 4, r.top * z - 4, r.width * z + 8, r.height * z + 8)
      }
      ctx.setLineDash([])
      if (tab.value === 'Animations' || pane.value === 'animation') {
        for (const a of animatedHere.value) {
          const r = a.obj.getBoundingRect()
          const label = String(a.start === 'click' ? a.group : a.group || 0)
          ctx.fillStyle = '#f2f2f2'; ctx.strokeStyle = '#7f7f7f'
          ctx.fillRect(r.left * z - 18, r.top * z, 16, 16); ctx.strokeRect(r.left * z - 18, r.top * z, 16, 16)
          ctx.fillStyle = '#262626'; ctx.font = '11px Segoe UI, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
          ctx.fillText(label, r.left * z - 10, r.top * z + 8)
        }
      }
    }
    ctx.restore()
  })
  fit()
  if (stage.value) ro?.observe(stage.value)
  await show_(0)
  // thumbnails for every slide
  for (const [i, s] of slides.value.entries()) thumbs[s.id] = await renderSlide(s, i, 0.23)
  emit('ready')
})
watch([tab, pane], () => canvas.value?.requestRenderAll())
const closeOnScroll = () => { menu.value = null }
onBeforeUnmount(() => {
  ro?.disconnect()
  window.removeEventListener('keydown', onKey)
  stopRecording()
  if (recordTimer) clearInterval(recordTimer)
  canvas.value?.dispose()
})

const deckJson = () => {
  storeCurrent()
  return {
    version: 3, width: W.value, height: H, size: size.value, theme: theme.value.name, themeColors: theme.value, setup: { ...setup },
    slides: slides.value.map(s => ({
      id: s.id, background: s.background, bgGradient: s.bgGradient || null, bgImage: s.bgImage || null, json: s.json, notes: s.notes || '', layout: s.layout || 'blank',
      section: s.section || null, hidden: !!s.hidden, transition: s.transition || null, advance: s.advance || null, comments: s.comments || [], narration: s.narration || null, hf: s.hf || null
    }))
  }
}

// ---- .pptx ----
const exportPptx = async (): Promise<Blob> => {
  const deck = deckJson()
  const PptxGenJS = ((await import('pptxgenjs')) as any).default
  const pptx = new PptxGenJS()
  pptx.layout = size.value === '4x3' ? 'LAYOUT_4x3' : 'LAYOUT_16x9' // 10 in wide: 96 or 72 px an inch
  const IN = W.value / 10
  const hex = (c: unknown) => (typeof c === 'string' && c.startsWith('#') ? c.slice(1, 7) : undefined)
  for (const [si, s] of deck.slides.entries()) {
    const slide = pptx.addSlide()
    if (s.hidden) slide.hidden = true
    slide.background = s.bgImage ? { data: s.bgImage } : { color: hex(s.bgGradient?.from || s.background) || 'FFFFFF' }
    if (s.notes) slide.addNotes(s.notes)
    const objects: FabricObject[] = s.json?.objects?.length ? await util.enlivenObjects(s.json.objects) as FabricObject[] : []
    const tables: Record<string, { r: number; c: number; text: string; fill?: string; color?: string; bold?: boolean; box?: any }[]> = {}
    const boxOfObj = (o: any) => {
      const w = o.getScaledWidth(), h = o.getScaledHeight()
      const ctr = o.getCenterPoint()
      return { x: (ctr.x - w / 2) / IN, y: (ctr.y - h / 2) / IN, w: w / IN, h: h / IN, rotate: o.angle || 0 }
    }
    for (const o of objects as any[]) {
      if (isEmptyPh(o)) continue
      try {
        if (o.tusomeTable) {
          const t = o.tusomeTable
          const cell = ((tables[t.id] ||= []).find(x => x.r === t.r && x.c === t.c)) || (tables[t.id].push({ r: t.r, c: t.c, text: '' }), tables[t.id][tables[t.id].length - 1])
          if (t.cell) { cell.fill = hex(o.fill); cell.box = o.getBoundingRect() } else { cell.text = o.text || ''; cell.color = hex(o.fill); cell.bold = o.fontWeight === 'bold' }
          continue
        }
        const box = boxOfObj(o)
        const type = String(o.type).toLowerCase()
        const line = o.strokeWidth && o.stroke ? { color: hex(o.stroke) || '000000', width: o.strokeWidth * 0.75, dashType: o.strokeDashArray ? 'dash' : 'solid' } : undefined
        const hyperlink = o.tusomeLink ? { url: o.tusomeLink } : undefined
        if (type === 'textbox') {
          slide.addText(o.text || '', {
            ...box, margin: 0, valign: 'top', fontFace: o.fontFamily, fontSize: (o.fontSize * (o.scaleY || 1)) * 0.75,
            bold: o.fontWeight === 'bold' || Number(o.fontWeight) >= 600, italic: o.fontStyle === 'italic', underline: o.underline ? { style: 'sng' } : undefined,
            strike: o.linethrough ? 'sngStrike' : undefined, shadow: o.shadow ? { type: 'outer', blur: 3, offset: 2, angle: 45, opacity: 0.45, color: '000000' } : undefined,
            color: hex(o.fill), align: o.textAlign, lineSpacingMultiple: o.lineHeight || 1, charSpacing: o.charSpacing ? (o.charSpacing / 1000) * o.fontSize * 0.75 : undefined,
            highlight: hex(o.textBackgroundColor), outline: o.stroke && o.strokeWidth ? { color: hex(o.stroke), size: o.strokeWidth * 0.75 } : undefined, hyperlink
          })
        } else if (type === 'image') {
          const m = o.tusomeMedia
          if (m?.src) {
            try { slide.addMedia({ ...box, type: m.kind, data: m.src, cover: o.getSrc() }) } catch { slide.addImage({ ...box, data: o.getSrc() }) }
          } else {
            slide.addImage({ ...box, data: o.getSrc(), altText: o.tusomeAlt || undefined, hyperlink, flipH: !!o.flipX, flipV: !!o.flipY })
          }
        } else if (type === 'line') {
          slide.addShape(pptx.ShapeType.line, { ...box, h: Math.max(box.h, 0.01), line: { color: hex(o.stroke) || '000000', width: (o.strokeWidth || 1) * 0.75 } })
        } else if (type === 'group') {
          // a group is kept as a picture of itself
          const sc = new StaticCanvas(undefined as any, { width: W.value, height: H })
          sc.add(o)
          const r = o.getBoundingRect()
          slide.addImage({ x: r.left / IN, y: r.top / IN, w: r.width / IN, h: r.height / IN, data: sc.toDataURL({ format: 'png', multiplier: 2, left: r.left, top: r.top, width: r.width, height: r.height }) })
          sc.dispose()
        } else {
          const ST = pptx.ShapeType
          const SHAPE_TYPES: Record<string, any> = { arrow: ST.rightArrow, leftArrow: ST.leftArrow, upArrow: ST.upArrow, downArrow: ST.downArrow, chevron: ST.chevron, diamond: ST.diamond, star: ST.star5, pentagon: ST.pentagon, hexagon: ST.hexagon, rtriangle: ST.rtTriangle, callout: ST.wedgeRectCallout, plus: ST.plus, parallelogram: ST.parallelogram, trapezoid: ST.trapezoid, heart: ST.heart, braceL: ST.leftBrace, braceR: ST.rightBrace }
          const shape = SHAPE_TYPES[o.tusomeShape] || (type === 'ellipse' ? ST.ellipse : type === 'triangle' ? ST.triangle : (o.rx ? ST.roundRect : ST.rect))
          slide.addShape(shape, { ...box, fill: hex(o.fill) ? { color: hex(o.fill) } : { type: 'none' }, line, hyperlink, flipH: !!o.flipX, flipV: !!o.flipY })
        }
      } catch (err) {
        console.error('pptx export: skipped an object', err)
      }
    }
    // tables as real tables
    for (const cells of Object.values(tables)) {
      const rows = Math.max(...cells.map(c => c.r)) + 1, cols = Math.max(...cells.map(c => c.c)) + 1
      const boxes = cells.filter(c => c.box).map(c => c.box)
      if (!boxes.length) continue
      const x = Math.min(...boxes.map(b => b.left)), y = Math.min(...boxes.map(b => b.top))
      const w = Math.max(...boxes.map(b => b.left + b.width)) - x
      const data = Array.from({ length: rows }, (_, r) => Array.from({ length: cols }, (_, k) => {
        const c = cells.find(z => z.r === r && z.c === k)
        return { text: c?.text || '', options: { fill: c?.fill ? { color: c.fill } : undefined, color: c?.color, bold: c?.bold } }
      }))
      slide.addTable(data, { x: x / IN, y: y / IN, w: w / IN, colW: Array(cols).fill(w / IN / cols), fontSize: 12, border: { type: 'solid', color: 'FFFFFF', pt: 1 } })
    }
    // header and footer
    for (const o of hfObjects(s as Slide, si) as any[]) slide.addText(o.text, { x: o.left / IN, y: o.top / IN, w: o.width / IN, h: 0.3, fontSize: 9, color: '7F7F7F', align: o.textAlign, fontFace: o.fontFamily, margin: 0 })
    if (s.narration) {
      try { slide.addMedia({ type: 'audio', data: s.narration, x: W.value / IN - 0.6, y: H / IN - 0.6, w: 0.4, h: 0.4 }) } catch { /* not kept */ }
    }
  }
  return pptx.write({ outputType: 'blob' }) as Promise<Blob>
}

// marking on a slide: each slide has its own layer, drawn at the slide's size
const slideEl = ref<HTMLElement | null>(null)
const markSurface = computed(() => (props.markable && slideEl.value && (view.value === 'normal' || view.value === 'outline')
  ? { page: index.value, host: slideEl.value, width: W.value, height: H, fill: true }
  : null))

defineExpose({
  markSurface,
  save: async () => new Blob([JSON.stringify(deckJson())], { type: 'application/json' }),
  exportFile: exportPptx
})
</script>

<style>
.office-ribbon .rb-menu { position: fixed; z-index: 60; border-radius: 4px; border: 1px solid #d1d5db; background: #fff; box-shadow: 0 8px 20px rgba(0,0,0,.15); font-size: 12px; max-height: 70vh; overflow-y: auto; }
.dark .office-ribbon .rb-menu { background: #1f2937; border-color: #4b5563; }
.office-ribbon .rb-item { display: block; width: 100%; text-align: left; padding: 4px 12px; white-space: nowrap; }
.office-ribbon .rb-item:hover { background: #f3f4f6; }
.dark .office-ribbon .rb-item:hover { background: #374151; }
.office-ribbon .rb-head { padding: 4px 12px 2px; font-size: 11px; font-weight: 600; color: #6b7280; background: #f9fafb; }
.dark .office-ribbon .rb-head { background: #111827; color: #9ca3af; }
</style>
