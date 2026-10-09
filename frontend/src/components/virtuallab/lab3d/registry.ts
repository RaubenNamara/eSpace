import type { Component } from 'vue'
import VirtualLabScenePendulum from '../VirtualLabScenePendulum.vue'
import VirtualLabSceneHookesLaw from '../VirtualLabSceneHookesLaw.vue'
import VirtualLabSceneCircuit from '../VirtualLabSceneCircuit.vue'
import VirtualLabSceneTitration from '../VirtualLabSceneTitration.vue'
import VirtualLabSceneMicroscope from '../VirtualLabSceneMicroscope.vue'
import VirtualLabSceneOptics from '../VirtualLabSceneOptics.vue'
import VirtualLabSceneProjectile from '../VirtualLabSceneProjectile.vue'
import VirtualLabSceneMomentsBalance from '../VirtualLabSceneMomentsBalance.vue'
import VirtualLabSceneConcaveMirror from '../VirtualLabSceneConcaveMirror.vue'
import VirtualLabSceneSilverDensity from '../VirtualLabSceneSilverDensity.vue'
import VirtualLabSceneBulbResistance from '../VirtualLabSceneBulbResistance.vue'

/**
 * Guided 3D experiments, keyed by an experiment's `render_component` slug. Experiments with
 * render_mode '2d' (the stored value predates these being 3D) use this lookup; a slug with no entry,
 * or render_mode '3d', uses the free-layout VirtualLabScene engine instead.
 */
export const GUIDED_EXPERIMENTS: Record<string, Component> = {
  pendulum: VirtualLabScenePendulum,
  // Same pendulum lab, configured (bob prop experiment: 'determine_g') for timing 20 oscillations at six lengths
  pendulum_gravity: VirtualLabScenePendulum,
  hookes_law: VirtualLabSceneHookesLaw,
  circuit: VirtualLabSceneCircuit,
  titration: VirtualLabSceneTitration,
  microscope: VirtualLabSceneMicroscope,
  optics: VirtualLabSceneOptics,
  projectile: VirtualLabSceneProjectile,
  moments_balance: VirtualLabSceneMomentsBalance,
  concave_mirror_focus: VirtualLabSceneConcaveMirror,
  silver_density_spring: VirtualLabSceneSilverDensity,
  bulb_filament_resistance: VirtualLabSceneBulbResistance,
  // Same bench without a bulb: cells, K, ammeter and wire P in series, voltmeter across the battery
  battery_internal_resistance: VirtualLabSceneBulbResistance,
}

export function resolveGuidedExperiment(renderComponent: string | null | undefined): Component | null {
  if (!renderComponent) return null
  return GUIDED_EXPERIMENTS[renderComponent] ?? null
}
