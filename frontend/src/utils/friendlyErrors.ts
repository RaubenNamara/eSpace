import axios, { type AxiosInstance } from 'axios'

// Error messages people can act on. Every page shows `err.response?.data?.message`, falling back
// to its own "Failed to ..." - which is all a student saw when the internet dropped, and a
// failing query could show them raw database text. So, for every request:
//   - no answer at all (no internet, the server down): a reply saying so, in plain words
//   - the server or a gateway failing: a plain sentence instead of technical detail
// Offline copies (utils/offline/adapter.ts) are served before this runs, so they are unaffected,
// and a 401 still signs the user out as before.

const TECHNICAL = /SQLSTATE|PDO|Exception|Stack trace|Uncaught|on line \d+|syntax error|Undefined (index|array key|variable)|Call to/i

const sentence = {
  offline: 'No internet connection - check your data or Wi-Fi, then try again.',
  unreachable: 'Tusome could not be reached - check your connection and try again.',
  busy: 'Tusome is busy or restarting - please try again in a minute.',
  broken: 'Something went wrong on Tusome\'s side. Please try again - if it keeps happening, tell your school\'s administrator.'
}

export function installFriendlyErrors(instance: AxiosInstance = axios): void {
  instance.interceptors.response.use(
    response => response,
    error => {
      if (axios.isCancel(error)) return Promise.reject(error)
      if (!error.response) {
        // no reply at all: give the page one to show
        error.response = {
          status: 0,
          statusText: 'No connection',
          headers: {},
          config: error.config,
          data: { success: false, message: navigator.onLine === false ? sentence.offline : sentence.unreachable }
        }
        return Promise.reject(error)
      }
      const { status } = error.response
      const data = error.response.data
      if ([502, 503, 504].includes(status)) {
        error.response.data = { ...(typeof data === 'object' && data ? data : {}), success: false, message: sentence.busy }
      } else if (status >= 500) {
        const message = typeof data === 'object' && data ? String(data.message ?? '') : ''
        if (!message || TECHNICAL.test(message)) {
          if (message) console.error('Server error:', message)
          error.response.data = { ...(typeof data === 'object' && data ? data : {}), success: false, message: sentence.broken }
        }
      }
      return Promise.reject(error)
    }
  )
}
