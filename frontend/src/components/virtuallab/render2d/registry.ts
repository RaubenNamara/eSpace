import type { Component } from 'vue'
import VirtualLabScenePendulum from '../VirtualLabScenePendulum.vue'
import VirtualLabSceneHookesLaw from '../VirtualLabSceneHookesLaw.vue'
import VirtualLabSceneCircuit from '../VirtualLabSceneCircuit.vue'
import VirtualLabSceneTitration from '../VirtualLabSceneTitration.vue'
import VirtualLabSceneMicroscope from '../VirtualLabSceneMicroscope.vue'
import VirtualLabSceneOptics from '../VirtualLabSceneOptics.vue'
import VirtualLabSceneProjectile from '../VirtualLabSceneProjectile.vue'

/**
 * Maps an experiment's `render_component` slug to the 2D renderer that draws it. Adding a new 2D
 * experiment is just registering it here - VirtualLabExperiment.vue never needs to know the list
 * of slugs, only how to look one up. A slug with no entry (or render_mode !== '2d') falls back to
 * the original Three.js engine.
 */
export const RENDER_2D_REGISTRY: Record<string, Component> = {
  pendulum: VirtualLabScenePendulum,
  hookes_law: VirtualLabSceneHookesLaw,
  circuit: VirtualLabSceneCircuit,
  titration: VirtualLabSceneTitration,
  microscope: VirtualLabSceneMicroscope,
  optics: VirtualLabSceneOptics,
  projectile: VirtualLabSceneProjectile,
}

export function resolve2DRenderer(renderComponent: string | null | undefined): Component | null {
  if (!renderComponent) return null
  return RENDER_2D_REGISTRY[renderComponent] ?? null
}
