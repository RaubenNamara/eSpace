<template>
  <div class="text-format-toolbar">
    <button
      type="button"
      class="tf-btn tf-btn--bold"
      :class="{ active: styleSnapshot.bold }"
      title="Bold"
      @click="$emit('toggle', 'bold')"
    >B</button>
    <button
      type="button"
      class="tf-btn tf-btn--italic"
      :class="{ active: styleSnapshot.italic }"
      title="Italic"
      @click="$emit('toggle', 'italic')"
    >I</button>
    <button
      type="button"
      class="tf-btn tf-btn--underline"
      :class="{ active: styleSnapshot.underline }"
      title="Underline"
      @click="$emit('toggle', 'underline')"
    >U</button>

    <span class="tf-divider"></span>

    <select
      class="tf-select tf-select--font"
      title="Font family"
      :value="styleSnapshot.fontFamily"
      @change="$emit('set-font-family', ($event.target as HTMLSelectElement).value)"
    >
      <option v-for="f in FONT_FAMILIES" :key="f.value" :value="f.value">{{ f.label }}</option>
    </select>

    <select
      class="tf-select tf-select--size"
      title="Font size"
      :value="styleSnapshot.fontSize"
      @change="$emit('set-font-size', Number(($event.target as HTMLSelectElement).value))"
    >
      <option v-for="s in FONT_SIZES" :key="s" :value="s">{{ s }}</option>
    </select>

    <input
      type="color"
      class="tf-color"
      title="Text colour"
      :value="styleSnapshot.color"
      @input="$emit('set-color', ($event.target as HTMLInputElement).value)"
    >

    <span class="tf-divider"></span>

    <button
      v-for="a in ALIGN_OPTIONS"
      :key="a.value"
      type="button"
      class="tf-btn"
      :class="{ active: styleSnapshot.align === a.value }"
      :title="a.label"
      @click="$emit('set-align', a.value)"
    >{{ a.icon }}</button>

    <span class="tf-divider"></span>

    <select
      class="tf-select tf-select--spacing"
      title="Line spacing"
      :value="styleSnapshot.lineHeight"
      @change="$emit('set-line-height', Number(($event.target as HTMLSelectElement).value))"
    >
      <option v-for="lh in LINE_HEIGHTS" :key="lh" :value="lh">{{ lh }}x</option>
    </select>

    <label class="tf-width" title="Text box width">
      <span>W</span>
      <input
        type="number"
        min="60"
        max="1000"
        step="10"
        :value="styleSnapshot.width"
        @change="$emit('set-width', Number(($event.target as HTMLInputElement).value))"
      >
    </label>
  </div>
</template>

<script setup lang="ts">
export interface TextStyleSnapshot {
  bold: boolean
  italic: boolean
  underline: boolean
  fontFamily: string
  fontSize: number
  color: string
  align: string
  lineHeight: number
  width: number
}

defineProps<{ styleSnapshot: TextStyleSnapshot }>()

defineEmits<{
  (e: 'toggle', key: 'bold' | 'italic' | 'underline'): void
  (e: 'set-font-family', value: string): void
  (e: 'set-font-size', value: number): void
  (e: 'set-color', value: string): void
  (e: 'set-align', value: string): void
  (e: 'set-line-height', value: number): void
  (e: 'set-width', value: number): void
}>()

const FONT_FAMILIES = [
  { value: 'Arial, Helvetica, sans-serif', label: 'Arial' },
  { value: '"Times New Roman", Times, serif', label: 'Times New Roman' },
  { value: '"Courier New", Courier, monospace', label: 'Courier New' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'Verdana, sans-serif', label: 'Verdana' }
]

const FONT_SIZES = [10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48]
const LINE_HEIGHTS = [1, 1.15, 1.3, 1.5, 2]
const ALIGN_OPTIONS = [
  { value: 'left', label: 'Align left', icon: '⯇' },
  { value: 'center', label: 'Align center', icon: '≡' },
  { value: 'right', label: 'Align right', icon: '⯈' },
  { value: 'justify', label: 'Justify', icon: '☰' }
]
</script>

<style scoped>
.text-format-toolbar {
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
  justify-content: flex-end;
  max-width: calc(100% - 12px);
  padding: 5px 6px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 6px 16px -4px rgba(0, 0, 0, 0.2);
}

:global(.dark) .text-format-toolbar {
  background-color: #1f2937;
  border-color: #374151;
}

.tf-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  font-size: 13px;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
  color: #374151;
}

:global(.dark) .tf-btn {
  background-color: #111827;
  border-color: #374151;
  color: #e5e7eb;
}

.tf-btn--bold { font-weight: 700; }
.tf-btn--italic { font-style: italic; }
.tf-btn--underline { text-decoration: underline; }

.tf-btn.active {
  background-color: #e0e7ff;
  border-color: #6366f1;
  color: #4338ca;
}

:global(.dark) .tf-btn.active {
  background-color: rgba(99, 102, 241, 0.25);
  color: #c7d2fe;
}

.tf-divider {
  width: 1px;
  height: 20px;
  background-color: #e5e7eb;
  margin: 0 2px;
}

:global(.dark) .tf-divider {
  background-color: #374151;
}

.tf-select {
  height: 26px;
  font-size: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  background-color: white;
  color: #374151;
}

:global(.dark) .tf-select {
  background-color: #111827;
  border-color: #374151;
  color: #e5e7eb;
}

.tf-select--font { max-width: 110px; }
.tf-select--size { width: 52px; }
.tf-select--spacing { width: 58px; }

.tf-color {
  width: 26px;
  height: 26px;
  padding: 0;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  background: none;
  cursor: pointer;
}

.tf-width {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 11px;
  color: #6b7280;
}

:global(.dark) .tf-width {
  color: #9ca3af;
}

.tf-width input {
  width: 52px;
  height: 26px;
  font-size: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  background-color: white;
  color: #374151;
  padding: 0 4px;
}

:global(.dark) .tf-width input {
  background-color: #111827;
  border-color: #374151;
  color: #e5e7eb;
}

@media (max-width: 640px) {
  .text-format-toolbar {
    gap: 3px;
    padding: 4px;
  }

  .tf-select--font { max-width: 84px; }
}
</style>
