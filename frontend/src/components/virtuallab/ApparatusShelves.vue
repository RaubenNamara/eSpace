<template>
  <!-- A wooden apparatus cabinet: one shelf per subject, each folded away or opened from the
       button on the left of its name plate. Clicking an item asks the page to put it on the bench. -->
  <div class="cabinet flex flex-col min-h-0">
    <div class="px-3 pt-3 pb-2 flex items-center gap-2">
      <div class="relative flex-1 min-w-0">
        <svg class="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-amber-900/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input
          :value="search"
          @input="emit('update:search', ($event.target as HTMLInputElement).value)"
          type="text"
          placeholder="Find apparatus..."
          class="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-lg border-0 bg-amber-50/90 text-amber-950 placeholder-amber-900/40 focus:ring-2 focus:ring-amber-400"
        >
      </div>
      <button
        v-if="shelves.length > 1"
        type="button"
        @click="toggleAll"
        class="flex-shrink-0 px-2 py-1.5 text-[10px] font-bold uppercase tracking-wide rounded-lg bg-amber-950/30 text-amber-100 hover:bg-amber-950/50"
        :title="allCollapsed ? 'Open every shelf' : 'Fold every shelf away'"
      >{{ allCollapsed ? 'Open all' : 'Fold all' }}</button>
    </div>

    <div class="flex-1 min-h-0 overflow-y-auto px-3 pb-4 space-y-3">
      <p v-if="loading" class="text-center text-xs text-amber-100/80 py-8">Loading apparatus...</p>
      <p v-else-if="shelves.length === 0" class="text-center text-xs text-amber-100/80 py-8">
        {{ search ? `No apparatus matches "${search}".` : 'No apparatus here.' }}
      </p>

      <section v-for="shelf in shelves" :key="shelf.key">
        <!-- Name plate with the fold / open button on its left -->
        <div class="flex items-center gap-1.5" :class="isCollapsed(shelf.key) ? '' : '-mb-1 relative z-10'">
          <button
            type="button"
            @click="toggle(shelf.key)"
            class="fold-btn"
            :aria-expanded="!isCollapsed(shelf.key)"
            :aria-label="`${isCollapsed(shelf.key) ? 'Open' : 'Fold away'} the ${shelf.label} shelf`"
            :title="isCollapsed(shelf.key) ? `Open the ${shelf.label} shelf` : `Fold away the ${shelf.label} shelf`"
          >
            <svg class="w-3.5 h-3.5 transition-transform duration-200" :class="isCollapsed(shelf.key) ? '-rotate-90' : ''" fill="none" stroke="currentColor" stroke-width="2.6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" /></svg>
          </button>
          <button type="button" @click="toggle(shelf.key)" class="plate flex-1 min-w-0 justify-between">
            <span class="truncate">{{ shelf.label }}</span>
            <span class="plate-count">{{ shelf.items.length }}</span>
          </button>
        </div>

        <div v-show="!isCollapsed(shelf.key)" class="shelf">
          <div class="grid gap-x-1.5 gap-y-0" :class="gridClass">
            <button
              v-for="obj in shelf.items"
              :key="obj.object_type"
              type="button"
              @click="emit('pick', obj)"
              class="shelf-item"
              :title="`Put ${obj.display_name} on the bench`"
            >
              <span class="shelf-icon">{{ obj.icon || '🔬' }}</span>
              <span class="shelf-name">{{ obj.display_name }}</span>
              <span v-if="counts[obj.object_type]" class="shelf-badge">{{ counts[obj.object_type] }}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { LabObjectDef } from '@/types/virtualLab'

const props = withDefaults(defineProps<{
  shelves: { key: string; label: string; items: LabObjectDef[] }[]
  /** How many of each object type are already on the bench */
  counts: Record<string, number>
  /** Shelf keys that are folded away (shared so every view of the cabinet agrees) */
  collapsed: string[]
  search: string
  loading?: boolean
  gridClass?: string
}>(), { loading: false, gridClass: 'grid-cols-3' })

const emit = defineEmits<{
  pick: [obj: LabObjectDef]
  'update:collapsed': [keys: string[]]
  'update:search': [value: string]
}>()

const isCollapsed = (key: string) => props.collapsed.includes(key)
const toggle = (key: string) =>
  emit('update:collapsed', isCollapsed(key) ? props.collapsed.filter(k => k !== key) : [...props.collapsed, key])
const allCollapsed = computed(() => props.shelves.length > 0 && props.shelves.every(s => isCollapsed(s.key)))
const toggleAll = () => emit('update:collapsed', allCollapsed.value ? [] : props.shelves.map(s => s.key))
</script>

<style scoped>
.cabinet {
  background:
    repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.035) 0 2px, transparent 2px 9px),
    linear-gradient(180deg, #7a4a24, #5e3518);
}
.shelf {
  border-radius: 10px;
  padding: 14px 8px 0;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.18), transparent 30px),
    #a8743f;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.35);
}
/* Every item stands on its own plank */
.shelf-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 2px;
  padding: 6px 2px 9px;
  min-height: 84px;
  min-width: 0;
  border-bottom: 9px solid #6b3f1d;
  box-shadow: 0 7px 0 -2px #4a2a12;
  margin-bottom: 10px;
  transition: transform 0.15s ease;
}
.shelf-item:hover,
.shelf-item:focus-visible {
  transform: translateY(-4px);
  outline: none;
}
.shelf-icon {
  font-size: 30px;
  line-height: 1;
  filter: drop-shadow(0 3px 2px rgba(0, 0, 0, 0.35));
}
.shelf-name {
  max-width: 100%;
  font-size: 10px;
  font-weight: 600;
  line-height: 1.15;
  color: #fff7ed;
  text-align: center;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.shelf-item:hover .shelf-name,
.shelf-item:focus-visible .shelf-name {
  color: #fde68a;
}
.shelf-badge {
  position: absolute;
  top: 2px;
  right: 6px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 9999px;
  background: #4f46e5;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  line-height: 16px;
}
/* Brass name plate */
.plate {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 6px;
  background: linear-gradient(180deg, #f6d98b, #c9962f);
  border: 1px solid #8a6416;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  color: #3b2606;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.plate-count {
  flex-shrink: 0;
  padding: 0 6px;
  border-radius: 9999px;
  background: rgba(59, 38, 6, 0.18);
  font-size: 10px;
}
/* The fold / open button on the left of the name plate */
.fold-btn {
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: linear-gradient(180deg, #f6d98b, #c9962f);
  border: 1px solid #8a6416;
  color: #3b2606;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.35);
}
.fold-btn:hover {
  filter: brightness(1.08);
}
</style>
