import axios from 'axios'

/**
 * An uploaded file's full address with a signature on it, good for an hour without signing in -
 * for Microsoft's Office viewer, which fetches the file itself and has none of the user's cookies.
 */
export async function signedFileUrl(path: string): Promise<string> {
  const res = await axios.get('/api/files/link', { params: { path: new URL(path, window.location.origin).pathname } })
  return window.location.origin + res.data.data.url
}
