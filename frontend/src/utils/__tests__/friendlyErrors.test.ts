import { describe, it, expect } from 'vitest'
import axios, { type AxiosAdapter } from 'axios'
import { installFriendlyErrors } from '../friendlyErrors'

// An axios instance whose "server" answers however the test says
const instanceReplying = (adapter: AxiosAdapter) => {
  const api = axios.create({ adapter })
  installFriendlyErrors(api)
  return api
}
const messageOf = async (p: Promise<unknown>) => {
  try {
    await p
    return 'no error'
  } catch (err: any) {
    return { status: err.response?.status, message: err.response?.data?.message }
  }
}
const failWith = (status: number, data: unknown): AxiosAdapter => async config => {
  const err: any = new Error('Request failed')
  err.config = config
  err.response = { status, statusText: '', headers: {}, config, data }
  throw err
}

describe('friendly error messages', () => {
  it('no reply at all: says the connection is the problem', async () => {
    const api = instanceReplying(async config => {
      const err: any = new Error('Network Error')
      err.config = config
      throw err
    })
    const r: any = await messageOf(api.get('/x'))
    expect(r.status).toBe(0)
    expect(r.message).toMatch(/internet connection|could not be reached/)
  })

  it('a database error never reaches the screen', async () => {
    const api = instanceReplying(failWith(500, { success: false, message: 'Failed to fetch assignments: SQLSTATE[42S22]: Column not found' }))
    const r: any = await messageOf(api.get('/x'))
    expect(r.message).toMatch(/Something went wrong on Tusome/)
    expect(r.message).not.toMatch(/SQLSTATE/)
  })

  it('a plain message from the server is kept', async () => {
    const api = instanceReplying(failWith(500, { success: false, message: 'Late submissions are not allowed for this assignment' }))
    const r: any = await messageOf(api.get('/x'))
    expect(r.message).toBe('Late submissions are not allowed for this assignment')
  })

  it('a busy server: try again in a minute', async () => {
    const api = instanceReplying(failWith(503, '<html>Service Unavailable</html>'))
    const r: any = await messageOf(api.get('/x'))
    expect(r.message).toMatch(/busy or restarting/)
  })

  it('a refused login (401) is left exactly as it was', async () => {
    const api = instanceReplying(failWith(401, { success: false, message: 'Authentication required' }))
    const r: any = await messageOf(api.get('/x'))
    expect(r).toEqual({ status: 401, message: 'Authentication required' })
  })
})
