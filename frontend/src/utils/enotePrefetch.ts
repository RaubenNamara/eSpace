import axios from 'axios'

// A student's eNote topic fetched ahead of time - while the book-opening animation on the shelf
// lists the topic's learning outcomes - and handed to the reader when it mounts, so the reader
// opens straight onto the pages instead of fetching them again.
const pending = new Map<number, Promise<any>>()

export function prefetchStudentTopic(id: number): Promise<any> {
  let request = pending.get(id)
  if (!request) {
    request = axios.get(`/api/student/enotes/topics/${id}`)
    request.catch(() => pending.delete(id))
    pending.set(id, request)
  }
  return request
}

/** The prefetched response for this topic, if there is one (used once) */
export function takePrefetchedTopic(id: number): Promise<any> | null {
  const request = pending.get(id) ?? null
  pending.delete(id)
  return request
}
