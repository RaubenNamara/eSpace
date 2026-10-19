import * as THREE from 'three'
import type { Structure, StructureKind } from './types'
import { disposeMaterial } from './dispose'

/** Conventional anatomy-atlas colours (arteries red, veins blue, nerves yellow ...) */
export const KIND_COLOUR: Record<StructureKind, number> = {
  skin: 0xd9a988,
  bone: 0xe4d3ad,
  cartilage: 0xbfd6dc,
  muscle: 0xb3473e,
  tendon: 0xe6dccb,
  artery: 0xc8302d,
  vein: 0x3462b5,
  heart: 0xb5403b,
  brain: 0xe8c3b5,
  nerve: 0xe8c54a,
  eye: 0xf2f0ea,
  organ: 0xc9806a,
  duct: 0x7cae4a,
  gland: 0x9b7fbd,
  tooth: 0xf6f2e4,
}

/** Organ colours that differ from the generic "organ" pink-brown */
const NAMED: [RegExp, number][] = [
  // reproductive organs in textbook colours (checked first: "uterine tube" must not match other rules)
  [/ovary/i, 0xf1cbbf],
  [/uter|cervi|vagina|fimbria|infundibulum|ampulla|isthmus of|cornua/i, 0xd9707c],
  [/testis/i, 0xc6a2cf],
  [/epididym/i, 0xa77fb6],
  [/prostate/i, 0xe9a35b],
  [/seminal vesicle/i, 0xb4699c],
  [/deferent duct/i, 0xe7d0a4],
  [/penis|corpus cavernosum|corpus spongiosum|glans/i, 0xd8897f],
  [/hepatovenous segment|lobe of liver/i, 0x8c3a2b],
  [/lung|bronchopulmonary|bronch/i, 0xe39aa0],
  [/kidney/i, 0x8e3b33],
  [/spleen/i, 0x7a2d4a],
  [/stomach|esophagus|duodenum/i, 0xd7907c],
  [/jejunum|ileum|small intestine/i, 0xe0a487],
  [/colon|cecum|rectum|appendix|large intestine/i, 0xc58b6a],
  [/pancrea/i, 0xe2b77a],
  [/gallbladder/i, 0x5c8a3a],
  [/bladder|ureter|urethra/i, 0xd8a24a],
  [/trachea|larynx|nasal|alar cartilage|cricoid|thyroid cartilage/i, 0xc9c0b0],
  [/tongue|gingiva|lip/i, 0xc96a6a],
  [/hair|eyebrow/i, 0x2b2420],
  [/thymus/i, 0xd7a07e],
  [/cavity of/i, 0x9e2a2a],
  [/iris/i, 0x5a3b22],
  [/lens|cornea|vitreous/i, 0xdfe9ef],
]

export function colourOf(s: Pick<Structure, 'name' | 'kind'>): number {
  const n = s.name
  // the pulmonary arteries carry deoxygenated blood and the pulmonary veins oxygenated blood: atlases colour them that way
  if (s.kind === 'artery' && /pulmonary|segmental artery|lobar artery/i.test(n)) return KIND_COLOUR.vein
  if (s.kind === 'vein' && /pulmonary|segmental vein|lobar vein/i.test(n)) return KIND_COLOUR.artery
  for (const [re, c] of NAMED) if (re.test(n)) return c
  return KIND_COLOUR[s.kind] ?? KIND_COLOUR.organ
}

/** One shared material per colour, plus the shared highlight looks. Disposed together. */
export class MaterialLibrary {
  private solid = new Map<number, THREE.MeshStandardMaterial>()
  private ghost = new Map<number, THREE.MeshStandardMaterial>()
  readonly skinSolid: THREE.MeshPhysicalMaterial
  readonly skinSeeThrough: THREE.MeshPhysicalMaterial
  /** drawn over everything for the selection, so it shows through what is in front of it */
  readonly selectedXray: THREE.MeshBasicMaterial
  readonly selected: THREE.MeshStandardMaterial
  readonly hovered: THREE.MeshStandardMaterial

  constructor() {
    this.skinSolid = new THREE.MeshPhysicalMaterial({ color: KIND_COLOUR.skin, roughness: 0.62, sheen: 0.25, sheenColor: new THREE.Color(0xffe2d0), clearcoat: 0.05 })
    // see-through skin as an outline: almost clear where it faces you, visible towards the edges, so it shows the
    // body's shape without fogging the organs inside
    this.skinSeeThrough = new THREE.MeshPhysicalMaterial({ color: 0xc58f6e, roughness: 0.5, transparent: true, opacity: 1, depthWrite: false, side: THREE.FrontSide })
    this.skinSeeThrough.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace('#include <opaque_fragment>', `
        float rim = 1.0 - abs(dot(normalize(normal), normalize(vViewPosition)));
        diffuseColor.a = mix(0.025, 0.55, pow(rim, 2.2));
        #include <opaque_fragment>`)
    }
    this.selectedXray = new THREE.MeshBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0.22, depthTest: false, depthWrite: false })
    this.selected = new THREE.MeshStandardMaterial({ color: 0x22c55e, emissive: 0x15874a, emissiveIntensity: 0.55, roughness: 0.45 })
    this.hovered = new THREE.MeshStandardMaterial({ color: 0xfacc15, emissive: 0x6b5a00, emissiveIntensity: 0.4, roughness: 0.5 })
  }

  solidFor(colour: number) {
    let m = this.solid.get(colour)
    if (!m) {
      m = new THREE.MeshStandardMaterial({ color: colour, roughness: 0.48, metalness: 0, side: this.doubleSided ? THREE.DoubleSide : THREE.FrontSide })
      this.solid.set(colour, m)
    }
    return m
  }

  /** faded version used for everything except the selection when "isolate" is on */
  ghostFor(colour: number) {
    let m = this.ghost.get(colour)
    if (!m) {
      m = new THREE.MeshStandardMaterial({ color: colour, roughness: 0.6, transparent: true, opacity: 0.12, depthWrite: false })
      this.ghost.set(colour, m)
    }
    return m
  }

  /** In a cross-section the cut organs are open; drawing back faces shows their inside instead of a hole */
  private doubleSided = false
  setDoubleSided(on: boolean) {
    this.doubleSided = on
    for (const m of [...this.solid.values(), this.selected, this.hovered, this.skinSolid]) {
      m.side = on ? THREE.DoubleSide : THREE.FrontSide
      m.needsUpdate = true
    }
  }

  all(): THREE.Material[] {
    return [...this.solid.values(), ...this.ghost.values(), this.skinSolid, this.skinSeeThrough, this.selectedXray, this.selected, this.hovered]
  }

  dispose() {
    for (const m of this.all()) disposeMaterial(m)
    this.solid.clear()
    this.ghost.clear()
  }
}
