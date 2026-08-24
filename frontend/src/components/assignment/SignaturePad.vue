<template>
  <div class="signature-pad__overlay" @click.self="$emit('close')">
    <div class="signature-pad">
      <h3 class="signature-pad__title">Signature</h3>
      <p class="signature-pad__hint">Draw your signature below, then insert it.</p>

      <canvas
        ref="canvasRef"
        class="signature-pad__canvas"
        width="360"
        height="150"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointerleave="onPointerUp"
      ></canvas>

      <div class="signature-pad__actions">
        <button type="button" class="signature-pad__btn" @click="clear">Clear</button>
        <div class="signature-pad__actions-right">
          <button type="button" class="signature-pad__btn" @click="$emit('close')">Cancel</button>
          <button type="button" class="signature-pad__btn signature-pad__btn--primary" :disabled="isEmpty" @click="onInsert">Insert</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const emit = defineEmits<{
  (e: 'insert', payload: { dataUrl: string; width: number; height: number }): void
  (e: 'close'): void
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const isEmpty = ref(true)
let ctx: CanvasRenderingContext2D | null = null
let drawing = false
let lastPoint: { x: number; y: number } | null = null

function getPoint(e: PointerEvent) {
  const canvas = canvasRef.value!
  const rect = canvas.getBoundingClientRect()
  return {
    x: (e.clientX - rect.left) * (canvas.width / rect.width),
    y: (e.clientY - rect.top) * (canvas.height / rect.height)
  }
}

function onPointerDown(e: PointerEvent) {
  drawing = true
  lastPoint = getPoint(e)
}

function onPointerMove(e: PointerEvent) {
  if (!drawing || !ctx || !lastPoint) return
  const point = getPoint(e)
  ctx.beginPath()
  ctx.moveTo(lastPoint.x, lastPoint.y)
  ctx.lineTo(point.x, point.y)
  ctx.stroke()
  lastPoint = point
  isEmpty.value = false
}

function onPointerUp() {
  drawing = false
  lastPoint = null
}

function clear() {
  const canvas = canvasRef.value
  if (!canvas || !ctx) return
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  isEmpty.value = true
}

function onInsert() {
  const canvas = canvasRef.value
  if (!canvas || isEmpty.value) return
  emit('insert', { dataUrl: canvas.toDataURL('image/png'), width: canvas.width, height: canvas.height })
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.strokeStyle = '#000000'
  ctx.lineWidth = 2
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
})
</script>

<style scoped>
.signature-pad__overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 60;
}

.signature-pad {
  padding: 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

:global(.dark) .signature-pad {
  background-color: #1f2937;
}

.signature-pad__title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 4px;
}

:global(.dark) .signature-pad__title {
  color: #f3f4f6;
}

.signature-pad__hint {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 10px;
}

:global(.dark) .signature-pad__hint {
  color: #9ca3af;
}

.signature-pad__canvas {
  display: block;
  width: 360px;
  height: 150px;
  background-color: #f9fafb;
  border: 1px dashed #d1d5db;
  border-radius: 8px;
  cursor: crosshair;
  touch-action: none;
}

:global(.dark) .signature-pad__canvas {
  background-color: #111827;
  border-color: #374151;
}

.signature-pad__actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

.signature-pad__actions-right {
  display: flex;
  gap: 8px;
}

.signature-pad__btn {
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background-color: white;
  font-size: 14px;
  cursor: pointer;
}

:global(.dark) .signature-pad__btn {
  background-color: #111827;
  border-color: #374151;
  color: #e5e7eb;
}

.signature-pad__btn--primary {
  background-color: #6366f1;
  border-color: #6366f1;
  color: white;
}

.signature-pad__btn--primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
