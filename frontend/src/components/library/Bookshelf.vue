<template>
  <section class="bookshelf" :class="{ 'is-spines': spines, 'is-empty': !!empty }">
    <div class="flex items-center justify-between gap-3 mb-2 px-1">
      <!-- Brass name plate, like the label on a library shelf -->
      <div class="shelf-plate min-w-0">
        <span class="truncate">{{ title }}</span>
        <span v-if="count !== undefined" class="shelf-plate-count">{{ count }}</span>
      </div>
      <slot name="actions" />
    </div>

    <div class="shelf-cabinet">
      <div class="shelf-scroller">
        <div class="shelf-track">
          <!-- The boards are drawn under every row of books (see .shelf-track's background), so a
               shelf that wraps onto a second or third row gets a board under each. -->
          <!-- An enrolled subject with nothing on it yet still gets its shelf, just empty -->
          <p v-if="empty" class="shelf-empty">{{ empty }}</p>
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  count?: number | string
  // Books stand spine-out (see ShelfSlot), packed tightly side by side
  spines?: boolean
  // Message shown resting on an empty shelf (e.g. "No books yet")
  empty?: string
}>()
</script>

<style scoped>
/* Elastic: a shelf is as wide as the books on it (an empty one is just its name plate and a short
   board), grows wider as books are added up to the full width of the page, then wraps onto more
   boards - taller instead of scrolling sideways. Pages lay shelves out in a wrapping row, so
   small shelves share a line. */
.bookshelf {
  flex: 0 1 auto;
  width: fit-content;
  max-width: 100%;
  min-width: 0;
}

.bookshelf {
  /* Must match ShelfBook.vue's --book-h at each breakpoint */
  --shelf-book-h: 140px;
  --shelf-pad-top: 22px;
  --plank-h: 14px;
}

@media (min-width: 640px) {
  .bookshelf {
    --shelf-book-h: 164px;
  }
}

.shelf-plate {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #3b2a10;
  background: linear-gradient(180deg, #f1dea6, #cfa95a 55%, #b8913f);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.6),
    inset 0 -1px 0 rgba(0, 0, 0, 0.2),
    0 1px 3px rgba(0, 0, 0, 0.25);
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.4);
  max-width: 100%;
}

.shelf-plate-count {
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 700;
  padding: 0 6px;
  border-radius: 999px;
  background: rgba(59, 42, 16, 0.15);
}

/* Back wall of the bookcase */
.shelf-cabinet {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  background:
    linear-gradient(to bottom, rgba(0, 0, 0, 0.08), transparent 30%),
    linear-gradient(180deg, #f4ede1, #e8dcc7);
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(120, 85, 40, 0.18);
}

.dark .shelf-cabinet {
  background:
    linear-gradient(to bottom, rgba(0, 0, 0, 0.3), transparent 30%),
    linear-gradient(180deg, #2b2620, #221e19);
  border-color: rgba(0, 0, 0, 0.4);
}

.shelf-scroller {
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: thin;
  scroll-snap-type: x proximity;
  /* Without this, snapping to the first book scrolls the track's own left padding away */
  scroll-padding-inline: 20px;
  -webkit-overflow-scrolling: touch;
}

@media (min-width: 640px) {
  .shelf-scroller {
    scroll-padding-inline: 28px;
  }
}

.shelf-track {
  position: relative;
  display: flex;
  /* Phones: one board that swipes sideways (still only as wide as its books) - wrapping would stack
     a big subject into a tall column of half-empty boards. Wider screens wrap onto more boards. */
  flex-wrap: nowrap;
  width: max-content;
  max-width: none;
  align-items: flex-start;
  gap: 18px;
  /* A row's books sit on a board; the next row needs the board plus the room a pulled-out book
     rises into */
  row-gap: calc(var(--plank-h) + var(--shelf-pad-top));
  padding: var(--shelf-pad-top) 20px var(--plank-h);
  /* One board per row: its top is right under the books' feet, and the pattern repeats every row */
  --plank-top: calc(var(--shelf-pad-top) + var(--shelf-book-h));
  --row-pitch: calc(var(--shelf-book-h) + var(--plank-h) + var(--shelf-pad-top));
  background-image: repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent var(--plank-top),
    #d19a5f var(--plank-top),
    #b27a43 calc(var(--plank-top) + 3px),
    #8a5a2b calc(var(--plank-top) + 9px),
    #6e4520 calc(var(--plank-top) + var(--plank-h)),
    rgba(0, 0, 0, 0.22) calc(var(--plank-top) + var(--plank-h)),
    transparent calc(var(--plank-top) + var(--plank-h) + 7px),
    transparent var(--row-pitch)
  );
}

@media (min-width: 640px) {
  .shelf-track {
    flex-wrap: wrap;
    width: auto;
    column-gap: 26px;
    padding-left: 28px;
    padding-right: 28px;
  }
}

/* ShelfSlot manages its own stacking (it must rise above its neighbours when pulled out) */
.shelf-track > :deep(*:not(.shelf-slot)) {
  position: relative;
  z-index: 1;
  scroll-snap-align: start;
}

/* ---- Spines mode: books packed spine-out, room above for a pulled-out book to rise into and
   below the plank for its details card ---- */
.bookshelf.is-spines {
  --shelf-pad-top: 36px;
}

.is-spines .shelf-track {
  column-gap: 3px;
  /* a book at the end of a row swings its full cover out to the right */
  padding-right: 110px;
}

/* Empty shelf: a short shelf with a quiet note on it, instead of a book's height of bare wood */
.bookshelf.is-empty {
  --shelf-book-h: 34px;
  --shelf-pad-top: 10px;
}

.shelf-empty {
  height: var(--shelf-book-h);
  display: flex;
  align-items: flex-end;
  padding-bottom: 10px;
  font-size: 12px;
  font-style: italic;
  color: rgba(90, 60, 25, 0.55);
  white-space: nowrap;
}

.dark .shelf-empty {
  color: rgba(246, 223, 168, 0.45);
}

.dark .shelf-track {
  background-image: repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent var(--plank-top),
    #8f6139 var(--plank-top),
    #7a5230 calc(var(--plank-top) + 3px),
    #5a3b20 calc(var(--plank-top) + 9px),
    #452c17 calc(var(--plank-top) + var(--plank-h)),
    rgba(0, 0, 0, 0.35) calc(var(--plank-top) + var(--plank-h)),
    transparent calc(var(--plank-top) + var(--plank-h) + 7px),
    transparent var(--row-pitch)
  );
}
</style>
