import type { SceneObjectConfig } from '@/types/virtualLab'

/**
 * The circuit-graph physics ported from VirtualLabScene.vue's (3D engine) inline implementation,
 * as a shared, framework-agnostic module so the new 2D circuit renderer uses the exact same
 * model rather than a second, independent one. The 3D engine's own copy is left untouched (per
 * this round's explicit "do not change the Three.js fallback" instruction) - this is the shared
 * source of truth going forward for any renderer that needs it.
 *
 * Only models a single series loop (one battery, one switch, one resistor, one meter) - enough for
 * Ohm's Law and similar simple-circuit practicals. Ammeter/voltmeter readings are 0 unless the loop
 * is actually closed (all four connected in one component) and the switch is on.
 */

export interface CircuitConnection { from: string; to: string }
export interface CircuitDiagnosisResult { value: number; reason: string | null }

export function connectedComponent(startKey: string, connections: CircuitConnection[]): Set<string> {
  const visited = new Set<string>([startKey])
  const queue = [startKey]
  while (queue.length) {
    const cur = queue.shift()!
    connections.forEach((c) => {
      if (c.from === cur && !visited.has(c.to)) { visited.add(c.to); queue.push(c.to) }
      if (c.to === cur && !visited.has(c.from)) { visited.add(c.from); queue.push(c.from) }
    })
  }
  return visited
}

export function circuitDiagnosis(
  instrumentKey: string,
  sceneObjects: SceneObjectConfig[],
  connections: CircuitConnection[],
  switchStates: Map<string, 'on' | 'off'>,
  batteryVoltages: Map<string, number>,
  mergedProps: (key: string) => Record<string, any>
): CircuitDiagnosisResult {
  const battery = sceneObjects.find(o => o.object_type === 'battery')
  const switchObj = sceneObjects.find(o => o.object_type === 'switch')
  const resistor = sceneObjects.find(o => o.object_type === 'resistor')
  const instrumentCfg = sceneObjects.find(o => o.key === instrumentKey)
  if (!instrumentCfg) return { value: 0, reason: null }
  if (!battery || !switchObj || !resistor) {
    return { value: 0, reason: 'The circuit is incomplete. Check your connections.' }
  }

  const component = connectedComponent(battery.key, connections)
  const hasSwitch = component.has(switchObj.key)
  const hasResistor = component.has(resistor.key)
  const hasInstrument = component.has(instrumentKey)
  const switchOn = switchStates.get(switchObj.key) === 'on'

  if (hasSwitch && switchOn && !hasResistor) {
    return { value: 0, reason: '⚠️ Short circuit! Connect a resistor into the circuit before closing the switch.' }
  }
  if (!hasSwitch || !hasResistor) {
    return { value: 0, reason: 'The circuit is incomplete. Check your connections.' }
  }
  if ((switchStates.get(battery.key) ?? 'on') === 'off') {
    return { value: 0, reason: 'Switch on the power supply.' }
  }
  if (!switchOn) {
    return { value: 0, reason: 'Close the switch before taking the reading.' }
  }
  if (!hasInstrument) {
    if (instrumentCfg.object_type === 'ammeter') {
      return { value: 0, reason: 'The ammeter should be connected in series with the circuit.' }
    }
    if (instrumentCfg.object_type === 'voltmeter') {
      return { value: 0, reason: 'The voltmeter should be connected in parallel across the component being measured.' }
    }
    return { value: 0, reason: 'Check the circuit arrangement.' }
  }

  const voltage = batteryVoltages.get(battery.key) ?? mergedProps(battery.key).voltage ?? 6
  const resistance = mergedProps(resistor.key).resistance_ohm ?? 10
  const current = voltage / resistance

  if (instrumentCfg.object_type === 'ammeter') return { value: Math.round(current * 100) / 100, reason: null }
  if (instrumentCfg.object_type === 'voltmeter') return { value: voltage, reason: null }
  return { value: 0, reason: null }
}
