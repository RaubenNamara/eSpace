import { computed, onUnmounted, ref } from 'vue'
import api from '@/services/api'

/**
 * The weather now where the user is, for the dashboards' sky (DaySky). The browser is asked for
 * the location once (it remembers the answer); the position is rounded to 0.1 degree (about 11 km)
 * before it leaves the device, and kept on this device for a few hours so the location isn't
 * looked up on every page. Anyone who refuses gets the school's place (WEATHER_LAT/LON on the
 * server). The server caches each place for 15 minutes; this refreshes every 15 minutes while open.
 * One shared state, so every banner on screen shows the same sky.
 */
export type WeatherCondition = 'clear' | 'partly_cloudy' | 'cloudy' | 'fog' | 'drizzle' | 'rain' | 'heavy_rain' | 'thunderstorm'
export interface Weather {
  condition: WeatherCondition
  rain_soon: boolean
  is_day: boolean
  temp_c: number | null
  rain_chance: number
  description: string
  source: string
  updated_at: string
}

const REFRESH_MS = 15 * 60_000
const PLACE_KEY = 'tusome.weatherPlace'
const PLACE_HOURS = 6

const weather = ref<Weather | null>(null)
/** The weather in words for a banner, e.g. "24° · Partly cloudy" ('' while there is none) */
const label = computed(() => {
  const w = weather.value
  if (!w) return ''
  const t = w.temp_c !== null ? `${w.temp_c}°` : ''
  const words = w.rain_soon ? 'Rain likely soon' : w.description
  return [t, words].filter(Boolean).join(' · ')
})
let lastFetch = 0
let inFlight: Promise<void> | null = null
let users = 0
let timer: number | undefined

type Place = { lat: number; lon: number } | null

function savedPlace(): Place | undefined {
  try {
    const p = JSON.parse(localStorage.getItem(PLACE_KEY) || 'null')
    if (p && Date.now() - p.at < PLACE_HOURS * 3600_000) return p.denied ? null : { lat: p.lat, lon: p.lon }
  } catch { /* none, or storage blocked */ }
  return undefined
}

function remember(place: Place) {
  try {
    localStorage.setItem(PLACE_KEY, JSON.stringify(place ? { ...place, at: Date.now() } : { denied: true, at: Date.now() }))
  } catch { /* private window */ }
}

/** The user's place, rounded; null when refused or unavailable (the server then uses the school's) */
function findPlace(): Promise<Place> {
  const saved = savedPlace()
  if (saved !== undefined) return Promise.resolve(saved)
  if (!('geolocation' in navigator)) return Promise.resolve(null)
  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const place = { lat: Math.round(pos.coords.latitude * 10) / 10, lon: Math.round(pos.coords.longitude * 10) / 10 }
        remember(place)
        resolve(place)
      },
      err => {
        // refused: don't ask again for a while; a timeout or no fix is just tried again next time
        if (err.code === err.PERMISSION_DENIED) remember(null)
        resolve(null)
      },
      { enableHighAccuracy: false, timeout: 10_000, maximumAge: PLACE_HOURS * 3600_000 }
    )
  })
}

async function load(force = false) {
  if (!force && Date.now() - lastFetch < REFRESH_MS && weather.value) return
  if (inFlight) return inFlight
  inFlight = (async () => {
    try {
      const place = await findPlace()
      const res = await api.get('/weather', { params: place ?? {} })
      weather.value = (res.data?.data?.weather as Weather | null) ?? null
      lastFetch = Date.now()
    } catch {
      // no weather: the sky just follows the clock
    } finally {
      inFlight = null
    }
  })()
  return inFlight
}

export function useWeather() {
  users++
  void load()
  if (!timer) timer = window.setInterval(() => void load(true), REFRESH_MS)
  onUnmounted(() => {
    users--
    if (users === 0 && timer) {
      window.clearInterval(timer)
      timer = undefined
    }
  })
  return { weather, label }
}
