<template>
  <div class="pdf-marker-container">
    <!-- Toolbar -->
    <div class="marker-toolbar">
      <div class="toolbar-section">
        <button
          @click="setTool('pen')"
          :class="['tool-btn', { active: currentTool === 'pen' }]"
          title="Pen"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
          </svg>
        </button>
        <button
          @click="setTool('highlighter')"
          :class="['tool-btn', { active: currentTool === 'highlighter' }]"
          title="Highlighter"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
          </svg>
        </button>
        <button
          @click="setTool('eraser')"
          :class="['tool-btn', { active: currentTool === 'eraser' }]"
          title="Eraser"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </button>
        <button
          @click="setTool('rectangle')"
          :class="['tool-btn', { active: currentTool === 'rectangle' }]"
          title="Rectangle"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"></path>
          </svg>
        </button>
        <button
          @click="setTool('circle')"
          :class="['tool-btn', { active: currentTool === 'circle' }]"
          title="Circle"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" stroke-width="2"></circle>
          </svg>
        </button>
        <button
          @click="setTool('arrow')"
          :class="['tool-btn', { active: currentTool === 'arrow' }]"
          title="Arrow"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
        <button
          @click="setTool('comment')"
          :class="['tool-btn', { active: currentTool === 'comment' }]"
          title="Add Comment"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
          </svg>
        </button>
      </div>

      <div class="toolbar-section">
        <div class="color-picker">
          <button
            v-for="color in colors"
            :key="color"
            @click="setColor(color)"
            :class="['color-btn', { active: currentColor === color }]"
            :style="{ backgroundColor: color }"
            :title="color"
          ></button>
        </div>
      </div>

      <div class="toolbar-section">
        <label class="tool-label">
          <span class="label-text">Size:</span>
          <input
            type="range"
            v-model.number="brushSize"
            min="1"
            max="20"
            class="size-slider"
          >
          <span class="size-value">{{ brushSize }}px</span>
        </label>
      </div>

      <div class="toolbar-section">
        <button @click="undo" class="tool-btn" title="Undo">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path>
          </svg>
        </button>
        <button @click="redo" class="tool-btn" title="Redo">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6"></path>
          </svg>
        </button>
        <button @click="clearCanvas" class="tool-btn text-red-600" title="Clear All">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </button>
        <button @click="saveAnnotations" class="tool-btn text-green-600" title="Save">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- PDF Canvas Container -->
    <div class="pdf-canvas-wrapper" ref="canvasWrapper">
      <div v-if="loading" class="loading-overlay">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-400">Loading PDF...</p>
      </div>
      <div v-if="error" class="error-overlay">
        <svg class="w-12 h-12 text-red-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-red-600 dark:text-red-400">{{ error }}</p>
      </div>
      <canvas ref="pdfCanvas" class="pdf-canvas"></canvas>
      <canvas ref="drawingCanvas" class="drawing-canvas"></canvas>
    </div>

    <!-- Page Navigation -->
    <div class="page-navigation">
      <button @click="prevPage" :disabled="currentPage <= 1" class="nav-btn">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage >= totalPages" class="nav-btn">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>

    <!-- Comments Panel -->
    <div v-if="comments.length > 0" class="comments-panel">
      <h3 class="comments-title">Comments ({{ comments.length }})</h3>
      <div class="comments-list">
        <div v-for="(comment, index) in comments" :key="index" class="comment-item">
          <div class="comment-header">
            <span class="comment-page">Page {{ comment.page }}</span>
            <button @click="deleteComment(index)" class="delete-comment">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <p class="comment-text">{{ comment.text }}</p>
        </div>
      </div>
    </div>

    <!-- Comment Modal -->
    <div v-if="showCommentModal" class="modal-overlay" @click="closeCommentModal">
      <div class="modal-content" @click.stop>
        <h3 class="modal-title">Add Comment</h3>
        <textarea
          v-model="newComment"
          class="comment-textarea"
          placeholder="Enter your comment..."
          rows="4"
        ></textarea>
        <div class="modal-actions">
          <button @click="closeCommentModal" class="btn-cancel">Cancel</button>
          <button @click="addComment" class="btn-primary">Add Comment</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as pdfjsLib from 'pdfjs-dist'

interface Props {
  pdfUrl: string
  initialAnnotations?: any
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'annotations-change', annotations: any): void
}>()

// Canvas refs
const pdfCanvas = ref<HTMLCanvasElement | null>(null)
const drawingCanvas = ref<HTMLCanvasElement | null>(null)

// PDF state
const loading = ref(false)
const error = ref<string | null>(null)
const pdfDoc = ref<any>(null)
const currentPage = ref(1)
const totalPages = ref(0)
const pdfScale = ref(1.5)

// Drawing state
const currentTool = ref<'pen' | 'highlighter' | 'eraser' | 'rectangle' | 'circle' | 'arrow' | 'comment'>('pen')
const currentColor = ref('#ff0000')
const brushSize = ref(3)
const isDrawing = ref(false)
const startX = ref(0)
const startY = ref(0)

// Colors
const colors = [
  '#ff0000', // Red
  '#00ff00', // Green
  '#0000ff', // Blue
  '#ffff00', // Yellow
  '#ff00ff', // Magenta
  '#00ffff', // Cyan
  '#000000', // Black
  '#ffffff', // White
]

// History for undo/redo
const history = ref<any[]>([])
const historyIndex = ref(-1)

// Comments
const comments = ref<any[]>([])
const showCommentModal = ref(false)
const newComment = ref('')
const commentPosition = ref({ x: 0, y: 0 })

// Annotation storage (per page)
const annotations = ref<Map<number, any>>(new Map())

const ctx = ref<CanvasRenderingContext2D | null>(null)

const loadPDF = async () => {
  loading.value = true
  error.value = null
  
  try {
    // Set worker
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
    
    const response = await fetch(props.pdfUrl)
    const arrayBuffer = await response.arrayBuffer()
    const loadingTask = pdfjsLib.getDocument(arrayBuffer)
    pdfDoc.value = await loadingTask.promise
    totalPages.value = pdfDoc.value.numPages
    
    await renderPage(currentPage.value)
  } catch (err: any) {
    error.value = err.message || 'Failed to load PDF'
  } finally {
    loading.value = false
  }
}

const renderPage = async (pageNum: number) => {
  if (!pdfDoc.value || !pdfCanvas.value) return
  
  const page = await pdfDoc.value.getPage(pageNum)
  const viewport = page.getViewport({ scale: pdfScale.value })
  
  const canvas = pdfCanvas.value
  const context = canvas.getContext('2d')
  
  canvas.height = viewport.height
  canvas.width = viewport.width
  
  const renderContext = {
    canvasContext: context,
    viewport: viewport
  }
  
  await page.render(renderContext).promise
  
  // Setup drawing canvas
  if (drawingCanvas.value) {
    drawingCanvas.value.height = viewport.height
    drawingCanvas.value.width = viewport.width
    ctx.value = drawingCanvas.value.getContext('2d')
    
    // Restore annotations for this page
    restoreAnnotations(pageNum)
  }
}

const restoreAnnotations = (pageNum: number) => {
  if (!ctx.value) return
  
  const pageAnnotations = annotations.value.get(pageNum)
  if (pageAnnotations) {
    ctx.value.putImageData(pageAnnotations, 0, 0)
  } else {
    ctx.value.clearRect(0, 0, drawingCanvas.value!.width, drawingCanvas.value!.height)
  }
}

const saveCurrentAnnotations = () => {
  if (!ctx.value || !drawingCanvas.value) return
  
  const imageData = ctx.value.getImageData(0, 0, drawingCanvas.value.width, drawingCanvas.value.height)
  annotations.value.set(currentPage.value, imageData)
}

const setTool = (tool: typeof currentTool.value) => {
  currentTool.value = tool
}

const setColor = (color: string) => {
  currentColor.value = color
}

const getCanvasCoordinates = (e: MouseEvent) => {
  if (!drawingCanvas.value) return { x: 0, y: 0 }
  
  const rect = drawingCanvas.value.getBoundingClientRect()
  const scaleX = drawingCanvas.value.width / rect.width
  const scaleY = drawingCanvas.value.height / rect.height
  
  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY
  }
}

const startDrawing = (e: MouseEvent) => {
  if (currentTool.value === 'comment') {
    const coords = getCanvasCoordinates(e)
    commentPosition.value = coords
    showCommentModal.value = true
    return
  }
  
  isDrawing.value = true
  const coords = getCanvasCoordinates(e)
  startX.value = coords.x
  startY.value = coords.y
  
  if (!ctx.value) return
  
  ctx.value.beginPath()
  ctx.value.moveTo(startX.value, startY.value)
  
  // Set drawing properties
  if (currentTool.value === 'eraser') {
    ctx.value.globalCompositeOperation = 'destination-out'
    ctx.value.lineWidth = brushSize.value * 3
  } else if (currentTool.value === 'highlighter') {
    ctx.value.globalCompositeOperation = 'multiply'
    ctx.value.strokeStyle = currentColor.value
    ctx.value.lineWidth = brushSize.value * 5
    ctx.value.globalAlpha = 0.3
  } else {
    ctx.value.globalCompositeOperation = 'source-over'
    ctx.value.strokeStyle = currentColor.value
    ctx.value.lineWidth = brushSize.value
    ctx.value.globalAlpha = 1
  }
  
  ctx.value.lineCap = 'round'
  ctx.value.lineJoin = 'round'
}

const draw = (e: MouseEvent) => {
  if (!isDrawing.value || !ctx.value) return
  
  const coords = getCanvasCoordinates(e)
  
  if (currentTool.value === 'pen' || currentTool.value === 'highlighter' || currentTool.value === 'eraser') {
    ctx.value.lineTo(coords.x, coords.y)
    ctx.value.stroke()
  }
}

const stopDrawing = (e: MouseEvent) => {
  if (!isDrawing.value || !ctx.value) return
  
  const coords = getCanvasCoordinates(e)
  
  if (currentTool.value === 'rectangle') {
    ctx.value.globalCompositeOperation = 'source-over'
    ctx.value.strokeStyle = currentColor.value
    ctx.value.lineWidth = brushSize.value
    ctx.value.globalAlpha = 1
    ctx.value.strokeRect(startX.value, startY.value, coords.x - startX.value, coords.y - startY.value)
  } else if (currentTool.value === 'circle') {
    ctx.value.globalCompositeOperation = 'source-over'
    ctx.value.strokeStyle = currentColor.value
    ctx.value.lineWidth = brushSize.value
    ctx.value.globalAlpha = 1
    const radius = Math.sqrt(Math.pow(coords.x - startX.value, 2) + Math.pow(coords.y - startY.value, 2))
    ctx.value.beginPath()
    ctx.value.arc(startX.value, startY.value, radius, 0, 2 * Math.PI)
    ctx.value.stroke()
  } else if (currentTool.value === 'arrow') {
    ctx.value.globalCompositeOperation = 'source-over'
    ctx.value.strokeStyle = currentColor.value
    ctx.value.lineWidth = brushSize.value
    ctx.value.globalAlpha = 1
    drawArrow(ctx.value, startX.value, startY.value, coords.x, coords.y)
  }
  
  isDrawing.value = false
  ctx.value.closePath()
  
  // Save to history
  saveToHistory()
  saveCurrentAnnotations()
}

const drawArrow = (context: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number) => {
  const headLength = 15
  const angle = Math.atan2(toY - fromY, toX - fromX)
  
  context.beginPath()
  context.moveTo(fromX, fromY)
  context.lineTo(toX, toY)
  context.stroke()
  
  context.beginPath()
  context.moveTo(toX, toY)
  context.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6))
  context.moveTo(toX, toY)
  context.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6))
  context.stroke()
}

const saveToHistory = () => {
  if (!ctx.value || !drawingCanvas.value) return
  
  // Remove any future history
  history.value = history.value.slice(0, historyIndex.value + 1)
  
  // Add current state
  const imageData = ctx.value.getImageData(0, 0, drawingCanvas.value.width, drawingCanvas.value.height)
  history.value.push(imageData)
  historyIndex.value++
  
  // Limit history size
  if (history.value.length > 50) {
    history.value.shift()
    historyIndex.value--
  }
}

const undo = () => {
  if (historyIndex.value > 0) {
    historyIndex.value--
    const imageData = history.value[historyIndex.value]
    if (ctx.value) {
      ctx.value.putImageData(imageData, 0, 0)
      saveCurrentAnnotations()
    }
  }
}

const redo = () => {
  if (historyIndex.value < history.value.length - 1) {
    historyIndex.value++
    const imageData = history.value[historyIndex.value]
    if (ctx.value) {
      ctx.value.putImageData(imageData, 0, 0)
      saveCurrentAnnotations()
    }
  }
}

const clearCanvas = () => {
  if (!ctx.value || !drawingCanvas.value) return
  
  ctx.value.clearRect(0, 0, drawingCanvas.value.width, drawingCanvas.value.height)
  saveCurrentAnnotations()
  saveToHistory()
}

const addComment = () => {
  if (!newComment.value.trim()) return
  
  comments.value.push({
    text: newComment.value,
    page: currentPage.value,
    x: commentPosition.value.x,
    y: commentPosition.value.y,
    timestamp: new Date().toISOString()
  })
  
  newComment.value = ''
  showCommentModal.value = false
  
  // Draw comment marker on canvas
  if (ctx.value) {
    ctx.value.globalCompositeOperation = 'source-over'
    ctx.value.fillStyle = '#ff0000'
    ctx.value.beginPath()
    ctx.value.arc(commentPosition.value.x, commentPosition.value.y, 8, 0, 2 * Math.PI)
    ctx.value.fill()
    ctx.value.fillStyle = '#ffffff'
    ctx.value.font = 'bold 12px Arial'
    ctx.value.textAlign = 'center'
    ctx.value.textBaseline = 'middle'
    ctx.value.fillText(comments.value.length.toString(), commentPosition.value.x, commentPosition.value.y)
    
    saveCurrentAnnotations()
    saveToHistory()
  }
}

const deleteComment = (index: number) => {
  comments.value.splice(index, 1)
}

const closeCommentModal = () => {
  showCommentModal.value = false
  newComment.value = ''
}

const prevPage = async () => {
  if (currentPage.value > 1) {
    saveCurrentAnnotations()
    currentPage.value--
    await renderPage(currentPage.value)
  }
}

const nextPage = async () => {
  if (currentPage.value < totalPages.value) {
    saveCurrentAnnotations()
    currentPage.value++
    await renderPage(currentPage.value)
  }
}

const saveAnnotations = () => {
  const allAnnotations = {
    drawings: Object.fromEntries(annotations.value),
    comments: comments.value
  }
  emit('annotations-change', allAnnotations)
}

onMounted(() => {
  loadPDF()
  
  // Setup drawing event listeners
  if (drawingCanvas.value) {
    drawingCanvas.value.addEventListener('mousedown', startDrawing)
    drawingCanvas.value.addEventListener('mousemove', draw)
    drawingCanvas.value.addEventListener('mouseup', stopDrawing)
    drawingCanvas.value.addEventListener('mouseleave', stopDrawing)
  }
})

onBeforeUnmount(() => {
  if (drawingCanvas.value) {
    drawingCanvas.value.removeEventListener('mousedown', startDrawing)
    drawingCanvas.value.removeEventListener('mousemove', draw)
    drawingCanvas.value.removeEventListener('mouseup', stopDrawing)
    drawingCanvas.value.removeEventListener('mouseleave', stopDrawing)
  }
})

watch(() => props.pdfUrl, () => {
  loadPDF()
})
</script>

<style scoped>
.pdf-marker-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f3f4f6;
}

.marker-toolbar {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  flex-wrap: wrap;
}

.toolbar-section {
  display: flex;
  align-items: center;
  gap: 4px;
  padding-right: 16px;
  border-right: 1px solid #e5e7eb;
}

.toolbar-section:last-child {
  border-right: none;
}

.tool-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 8px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: white;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}

.tool-btn:hover:not(:disabled) {
  background-color: #f9fafb;
  border-color: #d1d5db;
}

.tool-btn.active {
  background-color: #e0e7ff;
  border-color: #6366f1;
  color: #4f46e5;
}

.tool-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.color-picker {
  display: flex;
  gap: 4px;
}

.color-btn {
  width: 28px;
  height: 28px;
  border: 2px solid #e5e7eb;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}

.color-btn:hover {
  transform: scale(1.1);
}

.color-btn.active {
  border-color: #6366f1;
  box-shadow: 0 0 0 2px #e0e7ff;
}

.tool-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
}

.size-slider {
  width: 80px;
  cursor: pointer;
}

.size-value {
  font-size: 12px;
  color: #6b7280;
  min-width: 32px;
}

.pdf-canvas-wrapper {
  flex: 1;
  position: relative;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  background-color: #9ca3af;
}

.pdf-canvas {
  display: block;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.drawing-canvas {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  cursor: crosshair;
}

.loading-overlay,
.error-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 10;
}

.page-navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 12px;
  background-color: white;
  border-top: 1px solid #e5e7eb;
}

.nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 8px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: white;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-btn:hover:not(:disabled) {
  background-color: #f9fafb;
  border-color: #d1d5db;
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  font-size: 14px;
  color: #374151;
}

.comments-panel {
  max-height: 200px;
  overflow-y: auto;
  padding: 12px;
  background-color: white;
  border-top: 1px solid #e5e7eb;
}

.comments-title {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.comment-item {
  padding: 8px;
  background-color: #f9fafb;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.comment-page {
  font-size: 12px;
  color: #6b7280;
}

.delete-comment {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 2px;
  border: none;
  background: none;
  color: #ef4444;
  cursor: pointer;
  border-radius: 4px;
}

.delete-comment:hover {
  background-color: #fee2e2;
}

.comment-text {
  font-size: 13px;
  color: #374151;
  line-height: 1.4;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
}

.modal-content {
  width: 90%;
  max-width: 500px;
  padding: 24px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 16px;
}

.comment-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
  margin-bottom: 16px;
}

.comment-textarea:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.btn-cancel {
  padding: 8px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: white;
  color: #374151;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel:hover {
  background-color: #f9fafb;
}

.btn-primary {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background-color: #6366f1;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  background-color: #4f46e5;
}
</style>
