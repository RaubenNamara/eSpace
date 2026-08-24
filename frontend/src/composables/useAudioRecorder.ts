import { ref } from 'vue'

/**
 * Thin wrapper around MediaRecorder for recording WhatsApp-style voice notes in the browser.
 * No server-side transcoding - whatever container the browser records in (webm/opus in
 * Chrome/Firefox) is uploaded as-is and played back with a native &lt;audio&gt; element.
 */
export function useAudioRecorder() {
  const isRecording = ref(false)
  const seconds = ref(0)
  const error = ref('')

  let mediaRecorder: MediaRecorder | null = null
  let chunks: Blob[] = []
  let stream: MediaStream | null = null
  let timer: number | null = null

  const cleanup = () => {
    isRecording.value = false
    if (timer !== null) {
      window.clearInterval(timer)
      timer = null
    }
    stream?.getTracks().forEach(t => t.stop())
    stream = null
    mediaRecorder = null
  }

  const start = async (): Promise<boolean> => {
    error.value = ''
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch (err) {
      error.value = 'Microphone access was denied'
      return false
    }

    chunks = []
    const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus' : ''
    mediaRecorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined)
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data)
    }
    mediaRecorder.start()

    isRecording.value = true
    seconds.value = 0
    timer = window.setInterval(() => { seconds.value++ }, 1000)
    return true
  }

  const stop = (): Promise<Blob | null> => {
    return new Promise((resolve) => {
      if (!mediaRecorder || mediaRecorder.state === 'inactive') {
        cleanup()
        resolve(null)
        return
      }
      const recorder = mediaRecorder
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' })
        cleanup()
        resolve(blob.size > 0 ? blob : null)
      }
      recorder.stop()
    })
  }

  const cancel = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.onstop = null
      mediaRecorder.stop()
    }
    cleanup()
  }

  return { isRecording, seconds, error, start, stop, cancel }
}
