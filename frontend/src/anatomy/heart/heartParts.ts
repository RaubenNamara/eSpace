/**
 * The heart close-up: which BodyParts3D structures are shown, and the parts a learner can select
 * (chambers, septa, valves, vessels) with what they do. Structure names are the dataset's own and are
 * checked against the manifest by __tests__/heartParts.test.ts.
 *
 * The septa are not separate meshes in BodyParts3D: the interventricular septum is part of "Wall of
 * ventricle" and the interatrial septum is where the two atrial walls meet. They are found from the
 * real geometry (the wall between both cavities) - see heartMode.ts.
 */

/** parts of a wall mesh found from the geometry */
export type RegionKey = 'ivs' | 'ias' | 'lv-wall' | 'rv-wall'

export type HeartPartKind = 'chamber' | 'septum' | 'valve' | 'muscle' | 'vessel'

export interface HeartPart {
  key: string
  name: string
  kind: HeartPartKind
  /** the blood it holds or carries: oxygen-rich, oxygen-poor, or none (muscle, valves) */
  blood: 'rich' | 'poor' | 'none'
  /** the dataset structures that make it up */
  match: RegExp
  /** wall regions that also belong to it */
  regions?: RegionKey[]
  /** hidden inside the heart: selecting it opens the inside view */
  inside?: boolean
  summary: string
  fn: string
  explain: string[]
  /** what to watch for in the animation */
  watch?: string
}

export const HEART_PARTS: HeartPart[] = [
  // --- chambers ---
  { key: 'right-atrium', name: 'Right atrium', kind: 'chamber', blood: 'poor', match: /^(Wall|Cavity) of right atrium$/,
    summary: 'The upper right chamber.',
    fn: 'Collects oxygen-poor blood returning from the body and passes it to the right ventricle.',
    explain: ['Blood enters from the **superior vena cava** (head, neck and arms), the **inferior vena cava** (everything below the diaphragm) and the **coronary sinus** (the heart muscle itself).', 'It leaves through the **tricuspid valve** into the right ventricle.', 'Its wall holds the **sinoatrial (SA) node**, the natural pacemaker that starts every heartbeat.'],
    watch: 'It swells while the tricuspid valve is shut, then squeezes at the start of each beat.' },
  { key: 'right-ventricle', name: 'Right ventricle', kind: 'chamber', blood: 'poor', match: /^Cavity of right ventricle$/, regions: ['rv-wall'],
    summary: 'The lower right chamber.',
    fn: 'Pumps oxygen-poor blood through the pulmonary valve to the lungs.',
    explain: ['Its wall is **thinner than the left ventricle\'s**: the lungs are close by and need only low pressure, which protects their delicate capillaries.', 'Seen in cross-section it is crescent-shaped, wrapped round the left ventricle.'],
    watch: 'When it contracts the tricuspid valve shuts and the pulmonary valve opens.' },
  { key: 'left-atrium', name: 'Left atrium', kind: 'chamber', blood: 'rich', match: /^(Wall|Cavity) of left atrium$/,
    summary: 'The upper left chamber, at the back of the heart.',
    fn: 'Collects oxygen-rich blood from the lungs and passes it to the left ventricle.',
    explain: ['Blood arrives through the **four pulmonary veins**, two from each lung.', 'It leaves through the **mitral (bicuspid) valve** into the left ventricle.'],
    watch: 'Red, oxygen-rich blood gathers here while the mitral valve is shut.' },
  { key: 'left-ventricle', name: 'Left ventricle', kind: 'chamber', blood: 'rich', match: /^Cavity of left ventricle$/, regions: ['lv-wall'],
    summary: 'The lower left chamber and the strongest part of the heart.',
    fn: 'Pumps oxygen-rich blood through the aortic valve into the aorta and round the whole body.',
    explain: ['Its wall is about **three times thicker** than the right ventricle\'s, because it must make enough pressure to push blood to the head and toes.', 'It forms the **apex** (tip) of the heart, where the heartbeat can be felt on the chest.'],
    watch: 'It shortens, narrows and slightly twists as it squeezes - the "wringing" motion of a real heart.' },
  { key: 'interventricular-septum', name: 'Interventricular septum', kind: 'septum', blood: 'none', match: /^$/, regions: ['ivs'], inside: true,
    summary: 'The thick muscular wall between the two ventricles.',
    fn: 'Keeps oxygen-rich and oxygen-poor blood apart, and contracts with the ventricles.',
    explain: ['Because of the septum the heart works as **two pumps side by side**: the right side to the lungs, the left side to the body (the double circulation).', 'It carries the **bundle of His**, which spreads the electrical signal to both ventricles.', 'A hole here (a ventricular septal defect) lets blood leak from left to right.'],
    watch: 'In the inside view it thickens as the ventricles contract.' },
  { key: 'interatrial-septum', name: 'Interatrial septum', kind: 'septum', blood: 'none', match: /^$/, regions: ['ias'], inside: true,
    summary: 'The thin wall between the two atria.',
    fn: 'Separates the oxygen-poor blood of the right atrium from the oxygen-rich blood of the left.',
    explain: ['Before birth it has an opening, the **foramen ovale**, so blood can bypass the lungs, which are not yet used.', 'The opening normally closes soon after birth, leaving a shallow dip called the **fossa ovalis**.'] },

  // --- valves ---
  { key: 'tricuspid-valve', name: 'Tricuspid valve', kind: 'valve', blood: 'none', match: /leaflet of tricuspid valve$/, inside: true,
    summary: 'The valve between the right atrium and the right ventricle, with three leaflets (anterior, posterior, septal).',
    fn: 'Lets blood flow from the right atrium into the right ventricle, and shuts so it cannot flow back when the ventricle contracts.',
    explain: ['It is an **atrioventricular (AV) valve**.', 'Its leaflets are held by tendons (chordae tendineae, too fine to be in this model) tied to the **papillary muscles**, so they cannot be pushed back into the atrium.', 'Its closing, with the mitral valve, makes the first heart sound, **"lub"**.'],
    watch: 'Open while the heart fills; snaps shut as the ventricles start to contract.' },
  { key: 'mitral-valve', name: 'Mitral (bicuspid) valve', kind: 'valve', blood: 'none', match: /leaflet of mitral valve$/, inside: true,
    summary: 'The valve between the left atrium and the left ventricle, with two leaflets.',
    fn: 'Lets oxygen-rich blood into the left ventricle and stops it flowing back into the left atrium.',
    explain: ['Also called the **bicuspid valve** because it has two leaflets (anterior and posterior).', 'It works at the highest pressure of the AV valves, so it is the one most often damaged by disease.', 'It closes with the tricuspid valve: **"lub"**.'],
    watch: 'Shut through the whole of ventricular contraction.' },
  { key: 'pulmonary-valve', name: 'Pulmonary valve', kind: 'valve', blood: 'none', match: /cusp of pulmonary valve$/, inside: true,
    summary: 'A semilunar ("half-moon") valve between the right ventricle and the pulmonary trunk, with three cusps.',
    fn: 'Opens to let blood out to the lungs and shuts to stop it falling back into the right ventricle.',
    explain: ['Its cusps are pockets: blood falling back fills them and presses them together.', 'Its closing, with the aortic valve, makes the second heart sound, **"dub"**.'],
    watch: 'Open only while the ventricles eject.' },
  { key: 'aortic-valve', name: 'Aortic valve', kind: 'valve', blood: 'none', match: /cusp of aortic valve$/, inside: true,
    summary: 'A semilunar valve between the left ventricle and the aorta, with three cusps.',
    fn: 'Opens to let oxygen-rich blood into the aorta and shuts to stop it flowing back into the left ventricle.',
    explain: ['The **coronary arteries** start just above two of its cusps, so the heart muscle is the first organ to be supplied.', 'It closes with the pulmonary valve: **"dub"**.'],
    watch: 'Open only while the ventricles eject.' },
  { key: 'papillary-muscles', name: 'Papillary muscles', kind: 'muscle', blood: 'none', match: /papillary muscle/, inside: true,
    summary: 'Small cone-shaped muscles rising from the inner walls of the ventricles.',
    fn: 'Contract with the ventricles and pull on the chordae tendineae, so the tricuspid and mitral leaflets cannot turn inside out.',
    explain: ['There are three in the right ventricle (anterior, posterior, septal) and two main ones in the left (here labelled lateral).', 'The chordae tendineae ("heart strings") that join them to the leaflets are too fine to be in this model.'] },

  // --- vessels ---
  { key: 'superior-vena-cava', name: 'Superior vena cava', kind: 'vessel', blood: 'poor', match: /^Superior vena cava$/,
    summary: 'The large vein from the upper body.',
    fn: 'Brings oxygen-poor blood from the head, neck and arms into the right atrium.',
    explain: ['Like other large veins near the heart it has **no valve** where it enters the atrium.'] },
  { key: 'inferior-vena-cava', name: 'Inferior vena cava', kind: 'vessel', blood: 'poor', match: /^Inferior vena cava$/,
    summary: 'The largest vein in the body.',
    fn: 'Brings oxygen-poor blood from below the diaphragm (legs, abdomen) into the right atrium.',
    explain: ['It passes through the diaphragm just before it reaches the heart.'] },
  { key: 'pulmonary-trunk', name: 'Pulmonary trunk', kind: 'vessel', blood: 'poor', match: /^Pulmonary trunk$/,
    summary: 'The large artery leaving the right ventricle.',
    fn: 'Carries oxygen-poor blood away from the heart towards the lungs, then divides into the left and right pulmonary arteries.',
    explain: ['It is an **artery** because it carries blood **away from the heart** - even though the blood is oxygen-poor.'] },
  { key: 'pulmonary-arteries', name: 'Pulmonary arteries', kind: 'vessel', blood: 'poor', match: /^(Left|Right) pulmonary artery$/,
    summary: 'The right and left branches of the pulmonary trunk.',
    fn: 'Carry oxygen-poor blood to the right and left lungs to pick up oxygen.',
    explain: ['They are the only arteries in an adult that carry **oxygen-poor** blood, so atlases colour them blue.'] },
  { key: 'pulmonary-veins', name: 'Pulmonary veins', kind: 'vessel', blood: 'rich', match: /^(Left|Right) (superior|inferior) pulmonary vein$/,
    summary: 'Four veins, two from each lung.',
    fn: 'Bring oxygen-rich blood from the lungs into the left atrium.',
    explain: ['They are the only veins in an adult that carry **oxygen-rich** blood, so atlases colour them red.'] },
  { key: 'aorta', name: 'Aorta', kind: 'vessel', blood: 'rich', match: /^(Ascending aorta|Arch of aorta|Descending thoracic aorta)$/,
    summary: 'The largest artery, leaving the left ventricle.',
    fn: 'Carries oxygen-rich blood from the left ventricle to every part of the body.',
    explain: ['It rises (ascending aorta), arches over to the left (arch of aorta, which gives branches to the head and arms) and runs down in front of the backbone (descending aorta).', 'Its thick elastic wall stretches with each beat and recoils between beats, keeping blood moving: that stretch is the **pulse**.'] },
  { key: 'coronary-arteries', name: 'Coronary arteries', kind: 'vessel', blood: 'rich', match: /coronary artery|interventricular (branch|artery)|conus (branch|artery)|diagonal branch|ventricular branch of right coronary|marginal branch of right coronary|septal branch of/i,
    summary: 'The heart\'s own blood supply, running over its surface.',
    fn: 'Carry oxygen-rich blood from the aorta to the heart muscle.',
    explain: ['The **left coronary artery** divides into the anterior interventricular (left anterior descending) and circumflex branches; the **right coronary artery** runs round the right side to the back.', 'They fill mostly while the heart **relaxes**, because the contracting muscle squeezes them shut.', 'If one is blocked, the muscle it supplies dies: a **heart attack** (myocardial infarction).'] },
  { key: 'cardiac-veins', name: 'Cardiac veins', kind: 'vessel', blood: 'poor', match: /^(Coronary sinus|Great cardiac vein|Middle cardiac vein|Small cardiac vein|Anterior cardiac vein|Anterior interventricular vein|Posterior vein of left ventricle|Left marginal vein|Right marginal vein)$/,
    summary: 'Veins that drain the heart muscle.',
    fn: 'Collect oxygen-poor blood from the heart muscle and return it, mostly through the coronary sinus, to the right atrium.',
    explain: ['The **coronary sinus** is a wide channel in the groove at the back of the heart, between the left atrium and ventricle.'] },
]

export const HEART_PART_BY_KEY: Record<string, HeartPart> = Object.fromEntries(HEART_PARTS.map(p => [p.key, p]))

/** the region (if any) a wall mesh is split into */
export const WALL_OF_VENTRICLE = 'Wall of ventricle'

/** Named structures that frame the heart in the close-up */
export const ANCHORS = {
  raCavity: 'Cavity of right atrium', rvCavity: 'Cavity of right ventricle',
  laCavity: 'Cavity of left atrium', lvCavity: 'Cavity of left ventricle',
  raWall: 'Wall of right atrium', laWall: 'Wall of left atrium', ventricleWall: WALL_OF_VENTRICLE,
  svc: 'Superior vena cava', ivc: 'Inferior vena cava', trunk: 'Pulmonary trunk',
  rpa: 'Right pulmonary artery', lpa: 'Left pulmonary artery',
  ascending: 'Ascending aorta', arch: 'Arch of aorta', descending: 'Descending thoracic aorta',
  pulmonaryVeins: ['Right superior pulmonary vein', 'Right inferior pulmonary vein', 'Left superior pulmonary vein', 'Left inferior pulmonary vein'],
} as const

/** the part a structure belongs to, by name (regions of the ventricle wall are decided from the click point) */
export function partForName(name: string): HeartPart | null {
  return HEART_PARTS.find(p => p.match.test(name)) ?? null
}

/** **bold** markup in the explanations, split for rendering */
export function boldSegments(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map(t => t.startsWith('**') ? { text: t.slice(2, -2), bold: true } : { text: t, bold: false })
}
