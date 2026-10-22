/**
 * "System on its own" pages: each body system lifted out of the body, with a short guide to how it
 * works. Steps can play an animation on the real model (see effects.ts). Organ keys are checked
 * against the manifest by __tests__/systemGuides.test.ts.
 */
import type { ReproSex, SystemKey, ViewName } from './types'
import type { EffectSpec } from './effects'

export interface GuideStep {
  title: string
  text: string[]
  highlight?: string[]
  /** camera for this step: close up on these organs, from this side */
  focus?: string[]
  view?: ViewName
  effect?: EffectSpec
  /** captions shown as the animation passes each stage (travel / glow / breathe) */
  captions?: string[]
  /** reproductive steps: which organs (female or male) this step shows */
  sex?: ReproSex
  /** systems shown with this step only (e.g. the bladder beside the male organs) */
  extraSystems?: SystemKey[]
  /** labels with textbook names: an organ (group key) or the structures whose names match */
  labels?: { name: string; group?: string; match?: RegExp }[]
  /** trusted outside resources, opened on their own site (never copied into Tusome) */
  links?: { label: string; url: string; note: string }[]
}

export interface SystemGuide {
  key: SystemKey
  /** systems shown with it for context (e.g. the bones the muscles pull on) */
  companions?: SystemKey[]
  overview: string
  /** the main parts, as organ keys, listed for the learner to explore */
  parts: string[]
  steps: GuideStep[]
}

const leftForearm = (s: { name: string; centre: number[]; system: string }) =>
  (s.system === 'skeletal' || s.system === 'muscular') && s.centre[0] > 0.16 && s.centre[1] < 1.1 && s.centre[1] > 0.7

export const GUIDES: SystemGuide[] = [
  {
    key: 'circulatory',
    overview: 'The heart pumps blood round a closed system of tubes. Arteries take blood away from the heart, veins bring it back, and tiny capillaries (too small to show) join them inside every organ.',
    parts: ['circulatory/heart', 'circulatory/aorta', 'circulatory/superior-vena-cava', 'circulatory/inferior-vena-cava', 'circulatory/pulmonary-trunk', 'circulatory/left-common-carotid-artery', 'circulatory/left-femoral-artery', 'circulatory/spleen'],
    steps: [
      { title: 'The heartbeat', highlight: ['circulatory/heart'], focus: ['circulatory/heart'], effect: { type: 'heartbeat', structures: /^(Cavity of|Anterior wall|Inferior wall|Lateral wall|Free wall|Wall of ventricle|.*(valve|cusp|leaflet|papillary|atri|ventric))/i, bpm: 70 },
        text: ['The **heart** is a muscular pump. Each beat has two sounds - "lub-dub" - made by the **valves** closing.', 'At rest it beats about **70 times a minute**.'] },
      { title: 'Blood flowing', effect: { type: 'all', effects: [{ type: 'heartbeat', structures: /^(Cavity of|.*(valve|cusp|leaflet|ventric|atri))/i }, { type: 'flow', kinds: ['artery', 'vein'], origin: 'Cavity of left ventricle' }] },
        text: ['Watch the pulses: in the **arteries** (red) they move **away from the heart**; in the **veins** (blue) blood moves **back towards it**.', 'The lungs are the exception: the **pulmonary arteries** carry deoxygenated blood (blue) to the lungs and the **pulmonary veins** bring oxygenated blood (red) back.'] },
      { title: 'One trip round the body', focus: ['circulatory/heart', 'circulatory/superior-vena-cava'], effect: { type: 'all', effects: [{ type: 'heartbeat', structures: /^(Cavity of|.*(valve|cusp|leaflet|ventric|atri))/i }, { type: 'travel', colour: 0x3462b5, seconds: 16, size: 0.009, path: [
          { at: 'Inferior vena cava', offset: [0, -0.06, 0], stage: 0, colour: 0x3462b5 },
          { at: 'Cavity of right atrium', stage: 1, dwell: 1 },
          { at: 'Cavity of right ventricle', stage: 2, dwell: 1 },
          { at: 'Pulmonary trunk', stage: 3 },
          { at: 'Right pulmonary artery', offset: [-0.05, 0, 0], stage: 3 },
          { pos: [-0.1, 1.3, 0.0], stage: 4, dwell: 2, colour: 0x3462b5 },
          { pos: [-0.08, 1.31, 0.0], stage: 4, colour: 0xc8302d },
          { at: 'Cavity of left atrium', stage: 5, colour: 0xc8302d, dwell: 1 },
          { at: 'Cavity of left ventricle', stage: 6, dwell: 1 },
          { at: 'Ascending aorta', stage: 7 },
          { at: 'Arch of aorta', stage: 7 },
          { at: 'Descending thoracic aorta', stage: 7 },
          { at: 'Abdominal aorta', offset: [0, -0.08, 0], stage: 8 },
          { at: 'Inferior vena cava', offset: [0, -0.06, 0], stage: 8, colour: 0x3462b5 },
        ] }] },
        captions: [
          'Deoxygenated blood from the body returns in the vena cava…',
          '…into the right atrium…',
          '…the right ventricle pumps it…',
          '…along the pulmonary arteries to the lungs.',
          'In the lungs it gives up carbon dioxide and picks up oxygen.',
          'Oxygenated blood returns to the left atrium…',
          '…and the left ventricle, the strongest chamber, pumps it…',
          '…into the aorta, the largest artery…',
          '…out to every organ, then back to the heart through the veins.',
        ],
        text: ['Follow one drop of blood. It passes through the heart **twice** on each trip: once to go to the lungs (**pulmonary circulation**) and once to go round the body (**systemic circulation**).', 'This is called a **double circulation**.'] },
    ],
  },
  {
    key: 'respiratory',
    overview: 'Air is drawn down the airways into the lungs, where oxygen passes into the blood and carbon dioxide passes out. Inside each lung the bronchi branch into a tree of smaller and smaller tubes.',
    parts: ['respiratory/trachea', 'respiratory/left-main-bronchus', 'respiratory/right-main-bronchus', 'respiratory/left-lung', 'respiratory/right-lung', 'respiratory/diaphragm', 'respiratory/thyroid-cartilage', 'respiratory/epiglottis'],
    steps: [
      { title: 'Breathing in and out', effect: { type: 'breathe', lungs: ['respiratory/left-lung', 'respiratory/right-lung'], diaphragm: 'Diaphragm', period: 4.5 },
        captions: ['Breathing in: the diaphragm contracts and moves down, the ribs lift, the lungs fill.', 'Breathing out: the diaphragm relaxes and rises, air is pushed out.'],
        text: ['Breathing in, the **diaphragm** contracts and flattens and the rib muscles lift the chest. The chest gets bigger, the pressure inside falls and air rushes **in**.', 'Breathing out, the muscles relax, the chest gets smaller and air is pushed **out**. We breathe about **12-20 times a minute** at rest.'] },
      { title: 'The path of air', effect: { type: 'all', effects: [{ type: 'breathe', lungs: ['respiratory/left-lung', 'respiratory/right-lung'], diaphragm: 'Diaphragm', period: 6 }, { type: 'travel', colour: 0x60a5fa, seconds: 6, size: 0.008, path: [
          { at: 'Trachea', offset: [0, 0.07, 0], stage: 0 }, { at: 'Trachea', offset: [0, -0.04, 0], stage: 1 }, { at: 'Right main bronchus proper', stage: 2 }, { pos: [-0.09, 1.29, 0], stage: 3, dwell: 2 },
        ] }] },
        captions: ['Air passes the larynx…', '…down the trachea…', '…into a bronchus…', '…and through smaller and smaller tubes to the alveoli, where gas exchange happens.'],
        text: ['Air goes down the **trachea**, which divides into the two **bronchi**. These branch again and again, ending in millions of tiny air sacs, the **alveoli**, wrapped in capillaries.'] },
    ],
  },
  {
    key: 'digestive',
    overview: 'The gut is a long tube where food is broken down into small molecules that can be absorbed into the blood.',
    parts: ['digestive/teeth', 'digestive/tongue', 'digestive/esophagus', 'digestive/stomach', 'digestive/liver', 'digestive/gallbladder', 'digestive/pancreas', 'digestive/small-intestine', 'digestive/large-intestine'],
    steps: [
      { title: 'The journey of food', effect: { type: 'travel', colour: 0xf59e0b, seconds: 24, size: 0.011, path: [
          { at: 'Tongue', stage: 0, dwell: 1 },
          { at: 'Esophagus', offset: [0, 0.13, 0], stage: 1 },
          { at: 'Esophagus', offset: [0, -0.13, 0.01], stage: 1 },
          { at: 'Stomach', stage: 2, dwell: 4 },
          { at: 'Duodenum', stage: 3, dwell: 1 },
          { pos: [0.04, 1.06, 0.05], stage: 4 }, { pos: [-0.04, 1.02, 0.05], stage: 4 }, { pos: [0.05, 0.98, 0.05], stage: 4 }, { pos: [-0.03, 0.96, 0.05], stage: 4, dwell: 1 },
          { at: 'Appendix', offset: [-0.02, 0.02, 0], stage: 5 },
          { at: 'Ascending colon', offset: [0, 0.07, 0], stage: 5 },
          { at: 'Transverse colon', stage: 5 },
          { at: 'Descending colon', offset: [0.04, 0.08, 0], stage: 5 },
          { at: 'Descending colon', offset: [0.03, -0.09, 0], stage: 5 },
          { at: 'Rectum', stage: 6, dwell: 1 },
          { at: 'Rectum', offset: [0, -0.06, 0], stage: 6 },
        ] },
        captions: [
          'Mouth: teeth chew the food, saliva starts digesting starch.',
          'Oesophagus: muscle waves (peristalsis) push the food down.',
          'Stomach: acid and pepsin churn it for 2-4 hours; protein digestion starts.',
          'Duodenum: bile (from the liver) and pancreatic juice are added.',
          'Small intestine: digestion finishes; nutrients are absorbed through the villi into the blood.',
          'Large intestine: water is absorbed back into the body.',
          'Rectum: the remains are stored as faeces and leave the body (egestion).',
        ],
        text: ['Follow a mouthful of food from the **mouth** to the **rectum**. The whole journey takes about **1-3 days**.'] },
      { title: 'The helper organs', highlight: ['digestive/liver', 'digestive/gallbladder', 'digestive/pancreas'],
        effect: { type: 'glow', groups: [['digestive/liver'], ['digestive/gallbladder'], ['digestive/pancreas']], seconds: 2.5 },
        captions: ['The liver makes bile.', 'The gallbladder stores bile and squeezes it into the duodenum.', 'The pancreas makes enzymes for starch, protein and fat.'],
        text: ['Food never passes through the **liver**, **gallbladder** or **pancreas**, but their juices are piped into the **duodenum** to help digestion.'] },
    ],
  },
  {
    key: 'urinary',
    companions: ['skeletal'],
    overview: 'The kidneys clean the blood. They remove urea, extra water and salts as urine, which is stored in the bladder.',
    parts: ['urinary/left-kidney', 'urinary/right-kidney', 'urinary/left-ureter', 'urinary/right-ureter', 'urinary/urinary-bladder', 'urinary/urethra'],
    steps: [
      { title: 'From kidney to bladder', focus: ['urinary/left-kidney', 'urinary/right-kidney', 'urinary/urinary-bladder'], effect: { type: 'all', effects: [{ type: 'fill', structure: 'Urinary bladder', period: 10 }, { type: 'travel', colour: 0xeab308, seconds: 5, size: 0.008, path: [
          { at: 'Left kidney', stage: 0, dwell: 2 }, { at: 'Left ureter', offset: [0, 0.1, 0], stage: 1 }, { at: 'Left ureter', offset: [-0.01, -0.11, 0], stage: 1 }, { at: 'Urinary bladder', stage: 2, dwell: 1 },
        ] }] },
        captions: ['The kidney filters the blood and makes urine.', 'The ureter carries urine down to the bladder.', 'The bladder stretches as it fills, then empties through the urethra.'],
        text: ['Blood is filtered in about a million tiny tubes (**nephrons**) in each **kidney**. Useful things like glucose are taken back; what is left is **urine**.', 'Urine trickles down the **ureters** into the **bladder**, which slowly fills and then empties through the **urethra**.'] },
    ],
  },
  {
    key: 'nervous',
    overview: 'The brain and spinal cord (the central nervous system) receive information from the senses and send out messages along nerves.',
    parts: ['nervous/left-cerebral-hemisphere', 'nervous/right-cerebral-hemisphere', 'nervous/cerebellum', 'nervous/brainstem', 'nervous/left-eyeball', 'nervous/right-eyeball'],
    steps: [
      { title: 'How we see', focus: ['nervous/left-eyeball', 'nervous/left-cerebral-hemisphere'], view: 'left', effect: { type: 'travel', colour: 0xfacc15, seconds: 5, size: 0.006, path: [
          { at: 'Optic part of left retina', stage: 0, dwell: 1 }, { at: 'Left optic nerve', stage: 1 }, { at: 'Optic chiasm', stage: 2 }, { at: 'Left optic tract', stage: 3 }, { at: 'Left lateral geniculate body', stage: 3 }, { at: 'Left occipital lobe', stage: 4, dwell: 2 },
        ] },
        captions: ['Light falls on the retina, which turns it into nerve impulses…', '…that travel along the optic nerve…', '…cross over at the optic chiasm…', '…pass deep into the brain…', '…to the occipital lobe at the back, where the picture is made.'],
        text: ['We "see" with the brain. Impulses from the **retina** travel along the **optic nerve** to the **occipital lobe** at the back of the brain.'] },
      { title: 'Parts of the brain', focus: ['nervous/left-cerebral-hemisphere', 'nervous/cerebellum', 'nervous/brainstem'], view: 'left', effect: { type: 'glow', groups: [['nervous/left-cerebral-hemisphere', 'nervous/right-cerebral-hemisphere'], ['nervous/cerebellum'], ['nervous/brainstem']], seconds: 3, colour: 0xf59e0b },
        captions: ['Cerebrum: thinking, memory, speech, senses and voluntary movement.', 'Cerebellum: balance and smooth, coordinated movement.', 'Brainstem: breathing, heart rate and other automatic actions.'],
        text: ['Each part of the brain has its own jobs. Watch them light up in turn.'] },
    ],
  },
  {
    key: 'skeletal',
    overview: 'The skeleton supports the body, protects organs and, with the muscles, lets it move at joints.',
    parts: ['skeletal/skull', 'skeletal/vertebral-column', 'skeletal/rib-cage', 'skeletal/sternum', 'skeletal/left-humerus', 'skeletal/left-radius', 'skeletal/left-ulna', 'skeletal/left-hip-bone', 'skeletal/left-femur', 'skeletal/left-tibia', 'skeletal/left-fibula', 'skeletal/left-patella'],
    steps: [
      { title: 'A hinge joint', highlight: ['skeletal/left-radius', 'skeletal/left-ulna'], focus: ['skeletal/left-humerus', 'skeletal/left-radius', 'skeletal/left-ulna'], view: 'left', effect: { type: 'hinge', pivotOf: 'Left humerus', pivotEnd: 'bottom', moving: leftForearm, degrees: 110, period: 4 },
        text: ['At the **elbow**, the humerus meets the radius and ulna. It is a **hinge joint**: it bends in one direction only, like a door.', 'The **shoulder** and **hip** are **ball-and-socket joints**, which move in many directions.'] },
      { title: 'Protection', highlight: ['skeletal/skull', 'skeletal/rib-cage', 'skeletal/vertebral-column'],
        effect: { type: 'glow', groups: [['skeletal/skull'], ['skeletal/rib-cage', 'skeletal/sternum'], ['skeletal/vertebral-column']], seconds: 2.5, colour: 0x60a5fa },
        captions: ['The skull protects the brain.', 'The rib cage protects the heart and lungs.', 'The backbone protects the spinal cord.'],
        text: ['Bones form protective cases round the most delicate organs.'] },
    ],
  },
  {
    key: 'muscular',
    companions: ['skeletal'],
    overview: 'Skeletal muscles are joined to bones by tendons. They can only pull, so they work in antagonistic pairs.',
    parts: ['muscular/left-biceps-brachii', 'muscular/left-triceps-brachii', 'muscular/left-deltoid', 'muscular/left-pectoralis-major', 'muscular/left-trapezius', 'muscular/left-gluteus-maximus', 'muscular/left-rectus-femoris', 'muscular/left-gastrocnemius'],
    steps: [
      { title: 'Biceps and triceps', highlight: ['muscular/left-biceps-brachii'], focus: ['muscular/left-biceps-brachii', 'skeletal/left-humerus', 'skeletal/left-radius'], view: 'left',
        effect: { type: 'hinge', pivotOf: 'Left humerus', pivotEnd: 'bottom', moving: leftForearm, degrees: 110, period: 4, contract: /left biceps brachii/i },
        text: ['As the **biceps** contracts it gets **shorter and fatter** and pulls the forearm up - the elbow bends.', 'To straighten the arm the **triceps** (at the back) contracts and the biceps relaxes. Muscles that work against each other like this are an **antagonistic pair**.'] },
    ],
  },
  {
    key: 'endocrine',
    companions: ['skeletal'],
    overview: 'Endocrine glands release hormones into the blood. The blood carries them to the organs they act on.',
    parts: ['endocrine/pituitary-gland', 'endocrine/left-adrenal-gland', 'endocrine/right-adrenal-gland', 'digestive/pancreas'],
    steps: [
      { title: 'Glands and their hormones', effect: { type: 'glow', groups: [['endocrine/pituitary-gland'], ['endocrine/left-adrenal-gland', 'endocrine/right-adrenal-gland'], ['digestive/pancreas']], seconds: 3, colour: 0x2dd4bf },
        captions: ['Pituitary gland: growth hormone, ADH (water balance), and hormones that control other glands.', 'Adrenal glands: adrenaline for "fight or flight".', 'Pancreas: insulin and glucagon control blood sugar.'],
        text: ['Watch each gland light up as its hormones are described. (The thyroid gland is not in this model.)'] },
    ],
  },
  {
    key: 'integumentary',
    overview: 'The skin is the body\'s largest organ, covering about 2 m² in an adult.',
    parts: ['integumentary/skin', 'integumentary/hair-of-head'],
    steps: [
      { title: 'What the skin does', text: ['It **protects** against germs, injury and drying out; it **senses** touch, pain and temperature; it **controls body temperature** by sweating and by widening or narrowing its blood vessels; and it makes **vitamin D** in sunlight.', 'The layers inside the skin are not in this model.'] },
    ],
  },
  {
    key: 'reproductive',
    overview: 'The reproductive organs make sex cells (eggs or sperm) and sex hormones. Use the Female / Male switch to choose which organs are shown.',
    parts: ['reproductive/uterus', 'reproductive/left-ovary', 'reproductive/right-ovary', 'reproductive/left-uterine-tube', 'reproductive/right-uterine-tube',
      'reproductive/left-testis', 'reproductive/right-testis', 'reproductive/prostate', 'reproductive/left-deferent-duct', 'reproductive/right-deferent-duct'],
    steps: [
      { title: 'The female reproductive system', sex: 'female', view: 'front',
        focus: ['reproductive/uterus', 'reproductive/left-ovary', 'reproductive/right-ovary', 'reproductive/left-uterine-tube', 'reproductive/right-uterine-tube'],
        // the uterus cut open from the front, as in a textbook diagram
        effect: { type: 'cut', group: 'reproductive/uterus', axis: 'z', keep: 'below' },
        links: [{ label: 'Contents of the female pelvis (3D) - MSD Manuals', url: 'https://www.msdmanuals.com/home/multimedia/3dmodel/contents-of-the-female-pelvis', note: 'Opens on the MSD Manuals website (© Merck & Co.)' }],
        labels: [
          { name: 'Fallopian tube', match: /^Isthmus of left uterine tube$/ }, { name: 'Fallopian tube', match: /^Isthmus of right uterine tube$/ },
          { name: 'Ovary', group: 'reproductive/left-ovary' }, { name: 'Ovary', group: 'reproductive/right-ovary' },
          { name: 'Uterus', match: /^(Body|Fundus) of uterus$/ }, { name: 'Cervix', match: /^Cervix$/ }, { name: 'Vagina (top)', match: /cervicovaginal/ },
        ],
        text: ['The two **ovaries** make eggs (ova) and the hormones **oestrogen** and **progesterone**. About once a month an egg is released (**ovulation**) and caught by the fringed end (**fimbriae**) of a **uterine tube** (oviduct).', 'If the egg is fertilised in the tube, the embryo moves to the **uterus** (womb) and implants in its lining, where it grows. The narrow lower part of the uterus is the **cervix**, which opens into the **vagina**.', 'These organs come from a female body (Human Reference Atlas) and are placed in this model\'s pelvis, so their position is approximate.'] },
      { title: 'The male reproductive system', sex: 'male', view: 'front', extraSystems: ['urinary'],
        focus: ['reproductive/prostate', 'reproductive/left-testis', 'reproductive/right-testis', 'reproductive/left-seminal-vesicle', 'urinary/urinary-bladder'],
        labels: [
          { name: 'Bladder', group: 'urinary/urinary-bladder' }, { name: 'Seminal vesicle', group: 'reproductive/left-seminal-vesicle' },
          { name: 'Prostate gland', group: 'reproductive/prostate' }, { name: 'Vas deferens', group: 'reproductive/left-deferent-duct' },
          { name: 'Penis', match: /^Corpus cavernosum of penis$/ }, { name: 'Testis', group: 'reproductive/left-testis' }, { name: 'Testis', group: 'reproductive/right-testis' },
          { name: 'Epididymis', group: 'reproductive/left-epididymis' },
        ],
        text: ['The **testes** make sperm and the hormone **testosterone**. Sperm travel along the **sperm ducts**, past the **prostate** and **seminal vesicles**, which add fluid to make semen, and leave through the **urethra**.', 'The testes hang outside the body in the **scrotum** (a pouch of skin, not shown in this model), which keeps them slightly cooler - sperm production needs this.'] },
    ],
  },
]

export const guideFor = (key: string) => GUIDES.find(g => g.key === key) ?? null
