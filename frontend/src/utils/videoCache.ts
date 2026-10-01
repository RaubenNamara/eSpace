const CACHE_NAME = 'espace-videos'
const MAX_CACHED_VIDEOS = 10

// Downloads a video once into Cache Storage and returns a blob: URL to play from it. Phone
// recordings often keep the MP4 index at the end of the file, so streaming them straight off the
// server buffers until nearly the whole file has arrived; playing from a local copy avoids that
// and makes every later view instant. Uploaded file names are unique, so a cached copy never goes stale.
export async function loadCachedVideo(
  url: string,
  onProgress: (percent: number) => void,
  signal: AbortSignal
): Promise<string> {
  const key = new URL(url, location.origin).href
  const cache = await caches.open(CACHE_NAME)
  let cached = await cache.match(key)

  if (!cached) {
    const response = await fetch(key, { signal })
    if (!response.ok || !response.body) throw new Error(`Video download failed (HTTP ${response.status})`)

    const total = Number(response.headers.get('Content-Length')) || 0
    let loaded = 0
    const counter = new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        loaded += chunk.byteLength
        if (total) onProgress(Math.min(100, Math.round((loaded * 100) / total)))
        controller.enqueue(chunk)
      }
    })

    // Streamed straight into the cache (disk) rather than buffered in JS memory - videos can be 300MB.
    await cache.put(key, new Response(response.body.pipeThrough(counter), {
      headers: { 'Content-Type': response.headers.get('Content-Type') || 'video/mp4' }
    }))

    const keys = await cache.keys()
    for (const old of keys.slice(0, Math.max(0, keys.length - MAX_CACHED_VIDEOS))) {
      await cache.delete(old)
    }

    cached = await cache.match(key)
    if (!cached) throw new Error('Video could not be cached')
  }

  onProgress(100)
  return URL.createObjectURL(await cached.blob())
}
