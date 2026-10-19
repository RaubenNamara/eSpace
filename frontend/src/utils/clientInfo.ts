/**
 * What the browser reports about itself, sent with the login so the admin dashboard can show the
 * real device each person signed in on (backend/app/Services/DeviceInfo.php). Uses User-Agent
 * Client Hints where the browser has them (Chrome, Edge, Opera, Samsung Internet, Brave): the real
 * Windows 10/11, macOS and Android versions and the phone model, which the User-Agent string no
 * longer gives. Safari and Firefox have no Client Hints; the server reads their User-Agent instead.
 * Never delays the login by more than a moment, and never throws.
 */
export interface ClientInfo {
  platform?: string
  platformVersion?: string
  model?: string
  mobile?: boolean
  brands?: { brand: string; version: string }[]
  fullVersionList?: { brand: string; version: string }[]
  brave?: boolean
}

interface UAData {
  platform?: string
  mobile?: boolean
  brands?: { brand: string; version: string }[]
  getHighEntropyValues?: (hints: string[]) => Promise<Record<string, unknown>>
}

export async function collectClientInfo(timeoutMs = 600): Promise<ClientInfo | undefined> {
  try {
    const nav = navigator as Navigator & { userAgentData?: UAData; brave?: { isBrave?: () => Promise<boolean> } }
    const uad = nav.userAgentData
    const brave = nav.brave?.isBrave ? await withTimeout(nav.brave.isBrave(), timeoutMs).catch(() => false) : false
    if (!uad) return brave ? { brave: true } : undefined
    const info: ClientInfo = { platform: uad.platform, mobile: uad.mobile, brands: uad.brands, brave: !!brave }
    if (uad.getHighEntropyValues) {
      const high = await withTimeout(uad.getHighEntropyValues(['platformVersion', 'model', 'fullVersionList']), timeoutMs).catch(() => null)
      if (high) {
        if (typeof high.platformVersion === 'string') info.platformVersion = high.platformVersion
        if (typeof high.model === 'string' && high.model) info.model = high.model
        if (Array.isArray(high.fullVersionList)) info.fullVersionList = high.fullVersionList as ClientInfo['fullVersionList']
      }
    }
    return info
  } catch {
    return undefined
  }
}

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('timeout')), ms)
    p.then(v => { clearTimeout(t); resolve(v) }, e => { clearTimeout(t); reject(e) })
  })
}
