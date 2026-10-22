/**
 * BioDigital Human embed (licensed service). Tusome never copies BioDigital content: it shows
 * BioDigital's own viewer in an iframe, using the school's developer key, which BioDigital only
 * honours on the domains the school registered. The key comes from the server (/api/anatomy/config).
 */
export interface BioDigitalConfig {
  enabled: boolean
  developer_key: string | null
  modules: { id: string; title: string }[]
}

export const BIODIGITAL_HOST = 'human.biodigital.com'
const MODULE_ID = /^[A-Za-z0-9_-]+(\/[A-Za-z0-9_.-]+)+$/
const SHARE_CODE = /^[A-Za-z0-9_-]{2,40}$/

export type BioDigitalRef = { kind: 'id'; value: string } | { kind: 'be'; value: string }

/**
 * Accepts a module id ("production/maleAdult/heart") or a human.biodigital.com link
 * (…/view?id=…, …/viewer/?id=…, …/widget/?be=…). Anything else - other hosts included - is refused.
 */
export function parseBioDigitalInput(input: string): BioDigitalRef | null {
  const s = input.trim()
  if (!s) return null
  if (MODULE_ID.test(s)) return { kind: 'id', value: s }
  let url: URL
  try { url = new URL(s) } catch { return null }
  if (url.protocol !== 'https:' || url.hostname !== BIODIGITAL_HOST) return null
  const id = url.searchParams.get('id')
  if (id && MODULE_ID.test(id)) return { kind: 'id', value: id }
  const be = url.searchParams.get('be')
  if (be && SHARE_CODE.test(be)) return { kind: 'be', value: be }
  return null
}

/** The viewer URL for the iframe */
export function bioDigitalViewerUrl(ref: BioDigitalRef, developerKey: string): string {
  const u = new URL(ref.kind === 'id' ? `https://${BIODIGITAL_HOST}/viewer/` : `https://${BIODIGITAL_HOST}/widget/`)
  u.searchParams.set(ref.kind, ref.value)
  u.searchParams.set('dk', developerKey)
  return u.toString()
}
