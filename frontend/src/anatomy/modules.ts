/**
 * Anatomy modules: guided tours, regions, cross-sections and quizzes built on the BodyParts3D model.
 * Every organ key ("circulatory/heart") must exist in public/anatomy/bodyparts3d/manifest.json -
 * __tests__/modules.test.ts checks this, so a module can never point at something that is not there.
 */
import type { ClipSpec, SystemKey, ViewName } from './types'

export type ModuleCategory = 'system' | 'region' | 'section' | 'quiz'

export interface ModuleStep {
  title: string
  /** paragraphs; **bold** marks key words */
  text: string[]
  systems: SystemKey[]
  /** organs selected (highlighted) in this step */
  highlight?: string[]
  /** organs given labels (the highlighted ones are labelled anyway) */
  labels?: string[]
  /** camera: a preset view, or close up on these organs */
  view?: ViewName
  focus?: string[]
  isolate?: boolean
  seeThrough?: boolean
  clip?: ClipSpec | null
}

export interface QuizQuestion {
  /** "Select the ..." */
  prompt: string
  /** organ keys that count as correct */
  answer: string[]
  explain: string
  systems: SystemKey[]
  view?: ViewName
  clip?: ClipSpec | null
}

export interface AnatomyModule {
  id: string
  title: string
  summary: string
  category: ModuleCategory
  /** systems this module is about - for browsing */
  topics: SystemKey[]
  level: 'school' | 'advanced'
  minutes: number
  curriculum: string[]
  steps?: ModuleStep[]
  quiz?: QuizQuestion[]
}

export const CATEGORY_NAMES: Record<ModuleCategory, string> = {
  system: 'Anatomy by system',
  region: 'Anatomy by region',
  section: 'Cross-sections',
  quiz: 'Anatomy quizzes',
}

const ORGANS: SystemKey[] = ['skeletal', 'respiratory', 'circulatory', 'digestive', 'urinary']

export const MODULES: AnatomyModule[] = [
  // ---------------- by system ----------------
  {
    id: 'skeleton', title: 'The skeleton', category: 'system', topics: ['skeletal'], level: 'school', minutes: 6,
    summary: 'The bones that support, protect and move the body.', curriculum: ['Skeleton', 'Support and movement'],
    steps: [
      { title: 'The skeleton', systems: ['skeletal'], view: 'front', text: ['The adult skeleton has about **206 bones**. It **supports** the body, **protects** soft organs, lets the body **move** (with muscles), stores **calcium** and makes **blood cells** in the bone marrow.', 'The **axial skeleton** is the skull, backbone and rib cage. The **appendicular skeleton** is the limbs and the girdles that join them to the body.'] },
      { title: 'The skull', systems: ['skeletal'], highlight: ['skeletal/skull'], focus: ['skeletal/skull'], text: ['The **skull** protects the **brain** and the sense organs of the head. Its bones are locked together at joints called **sutures** - only the lower jaw moves.'] },
      { title: 'The backbone', systems: ['skeletal'], highlight: ['skeletal/vertebral-column'], view: 'back', text: ['The **vertebral column** is a chain of **vertebrae** with **discs of cartilage** between them. It holds the body up, lets the back bend and protects the **spinal cord** running through it.', 'From the top: 7 cervical (neck), 12 thoracic (chest), 5 lumbar (lower back), then the sacrum and coccyx.'] },
      { title: 'The rib cage', systems: ['skeletal'], highlight: ['skeletal/rib-cage', 'skeletal/sternum'], focus: ['skeletal/rib-cage'], text: ['Twelve pairs of **ribs**, the **sternum** (breastbone) and the thoracic vertebrae form the **rib cage**. It protects the **heart and lungs** and moves up and out when we breathe in.'] },
      { title: 'The arm', systems: ['skeletal'], highlight: ['skeletal/left-humerus', 'skeletal/left-radius', 'skeletal/left-ulna', 'skeletal/left-clavicle', 'skeletal/left-scapula'], focus: ['skeletal/left-humerus', 'skeletal/left-radius'], text: ['The upper arm has one bone, the **humerus**. The forearm has two: the **radius** (thumb side) and the **ulna**. The **clavicle** and **scapula** form the shoulder girdle.', 'The shoulder is a **ball-and-socket joint**; the elbow is a **hinge joint**.'] },
      { title: 'The leg', systems: ['skeletal'], highlight: ['skeletal/left-hip-bone', 'skeletal/left-femur', 'skeletal/left-patella', 'skeletal/left-tibia', 'skeletal/left-fibula'], focus: ['skeletal/left-femur', 'skeletal/left-tibia'], text: ['The **hip bone** joins the leg to the backbone. The **femur** (thigh bone) is the longest, strongest bone. Below the knee are the **tibia** (shin bone) and the thin **fibula**; the **patella** is the kneecap.'] },
    ],
  },
  {
    id: 'muscles', title: 'Muscles and movement', category: 'system', topics: ['muscular'], level: 'school', minutes: 5,
    summary: 'How skeletal muscles pull on bones, working in antagonistic pairs.', curriculum: ['Antagonistic muscles', 'Support and movement'],
    steps: [
      { title: 'The muscular system', systems: ['skeletal', 'muscular'], view: 'front', text: ['**Skeletal muscles** are joined to bones by **tendons**. A muscle can only **pull** (contract); it cannot push.', 'So muscles work in **antagonistic pairs**: when one contracts, its partner relaxes.'] },
      { title: 'Biceps and triceps', systems: ['skeletal', 'muscular'], highlight: ['muscular/left-biceps-brachii', 'muscular/left-triceps-brachii'], focus: ['skeletal/left-humerus'], text: ['The **biceps** (front of the upper arm) contracts to **bend** the elbow.', 'The **triceps** (back of the upper arm) contracts to **straighten** it. They are the classic antagonistic pair.'] },
      { title: 'Shoulder and chest', systems: ['skeletal', 'muscular'], highlight: ['muscular/left-deltoid', 'muscular/left-pectoralis-major', 'muscular/left-trapezius'], focus: ['muscular/left-deltoid', 'muscular/left-pectoralis-major'], text: ['The **deltoid** lifts the arm sideways. The **pectoralis major** pulls the arm forward and across the chest. The **trapezius** moves the shoulder blade and supports the neck.'] },
      { title: 'The leg', systems: ['skeletal', 'muscular'], highlight: ['muscular/left-gluteus-maximus', 'muscular/left-rectus-femoris', 'muscular/left-biceps-femoris', 'muscular/left-gastrocnemius'], view: 'left', text: ['The **gluteus maximus** straightens the hip. At the front of the thigh, the **quadriceps** (including **rectus femoris**) straightens the knee; at the back, the **hamstrings** (including **biceps femoris**) bend it - another antagonistic pair.', 'The **gastrocnemius** (calf) lifts the heel when you walk or jump.'] },
    ],
  },
  {
    id: 'heart', title: 'The heart and circulation', category: 'system', topics: ['circulatory'], level: 'school', minutes: 7,
    summary: 'The heart, the great vessels and the double circulation.', curriculum: ['Transport in humans', 'Circulatory system'],
    steps: [
      { title: 'The circulatory system', systems: ['circulatory'], view: 'front', text: ['The **heart** pumps blood through **arteries** (away from the heart) and **veins** (back to the heart). Atlases colour oxygenated blood **red** and deoxygenated blood **blue**.', 'Blood carries oxygen, digested food, hormones and heat, and takes away carbon dioxide and other wastes.'] },
      { title: 'The heart', systems: ['circulatory', 'respiratory', 'skeletal'], highlight: ['circulatory/heart'], focus: ['circulatory/heart'], isolate: true, text: ['The heart sits in the chest **between the lungs**, a little to the left, behind the **sternum**.', 'It has four chambers: two **atria** that receive blood and two **ventricles** that pump it out. **Valves** keep the blood flowing one way.'] },
      { title: 'The great vessels', systems: ['circulatory'], highlight: ['circulatory/aorta', 'circulatory/superior-vena-cava', 'circulatory/inferior-vena-cava', 'circulatory/pulmonary-trunk'], focus: ['circulatory/heart', 'circulatory/aorta'], text: ['The **venae cavae** bring deoxygenated blood from the body to the right atrium.', 'The **pulmonary trunk** carries it from the right ventricle to the lungs. Oxygenated blood returns to the left side and leaves through the **aorta**, the largest artery.'] },
      { title: 'A double circulation', systems: ['circulatory', 'respiratory'], highlight: ['circulatory/heart', 'respiratory/left-lung', 'respiratory/right-lung'], focus: ['circulatory/heart', 'respiratory/left-lung'], text: ['Blood passes through the heart **twice** on each trip round the body: heart → lungs → heart (the **pulmonary circulation**), then heart → body → heart (the **systemic circulation**).', 'This keeps the pressure high enough to reach every organ quickly.'] },
      { title: 'Arteries to the head and limbs', systems: ['circulatory', 'skeletal'], highlight: ['circulatory/left-common-carotid-artery', 'circulatory/left-subclavian-artery', 'circulatory/left-femoral-artery'], view: 'front', text: ['The **carotid arteries** supply the head and brain, the **subclavian arteries** the arms, and the **femoral arteries** the legs. You can feel a pulse where an artery runs near the skin, as in the neck.'] },
    ],
  },
  {
    id: 'breathing', title: 'The respiratory system', category: 'system', topics: ['respiratory'], level: 'school', minutes: 5,
    summary: 'The airways, the lungs and the muscles of breathing.', curriculum: ['Gas exchange', 'Breathing mechanism'],
    steps: [
      { title: 'The airways', systems: ['respiratory', 'skeletal'], highlight: ['respiratory/trachea', 'respiratory/left-main-bronchus', 'respiratory/right-main-bronchus'], focus: ['respiratory/trachea'], text: ['Air enters through the nose and mouth, passes the **larynx** (voice box) and goes down the **trachea** (windpipe), held open by rings of cartilage.', 'The trachea divides into the right and left **main bronchi**, one to each lung.'] },
      { title: 'The lungs', systems: ['respiratory', 'skeletal'], highlight: ['respiratory/left-lung', 'respiratory/right-lung'], focus: ['respiratory/left-lung', 'respiratory/right-lung'], text: ['The **lungs** fill most of the chest, protected by the ribs. The **right lung has three lobes**, the **left lung two** - leaving room for the heart.', 'Inside, the bronchi branch into tiny tubes ending in **alveoli**, where oxygen enters the blood and carbon dioxide leaves it.'] },
      { title: 'Breathing in and out', systems: ['respiratory', 'skeletal'], highlight: ['respiratory/diaphragm', 'skeletal/rib-cage'], focus: ['respiratory/diaphragm'], text: ['Breathing in: the **diaphragm** contracts and flattens, and the **intercostal muscles** lift the ribs up and out. The chest gets bigger, the pressure inside falls and air rushes in.', 'Breathing out: the muscles relax, the chest gets smaller and air is pushed out.'] },
      { title: 'The larynx', systems: ['respiratory'], highlight: ['respiratory/thyroid-cartilage', 'respiratory/epiglottis', 'respiratory/cricoid-cartilage'], focus: ['respiratory/thyroid-cartilage'], text: ['The **larynx** is made of cartilages; the largest, the **thyroid cartilage**, makes the "Adam\'s apple".', 'The **epiglottis** is a flap that covers the airway when you swallow, so food goes down the oesophagus and not into the lungs.'] },
    ],
  },
  {
    id: 'digestion', title: 'The digestive system', category: 'system', topics: ['digestive'], level: 'school', minutes: 7,
    summary: 'The journey of food from the mouth to the large intestine.', curriculum: ['Digestion', 'Absorption'],
    steps: [
      { title: 'The alimentary canal', systems: ['digestive', 'skeletal'], view: 'front', text: ['Food travels through the **alimentary canal**: mouth → oesophagus → stomach → small intestine → large intestine.', 'The **liver**, **gallbladder** and **pancreas** help digestion but food does not pass through them.'] },
      { title: 'Mouth and oesophagus', systems: ['digestive', 'skeletal'], highlight: ['digestive/teeth', 'digestive/tongue', 'digestive/esophagus'], focus: ['digestive/esophagus'], text: ['**Teeth** cut and grind food; saliva starts digesting starch. The **tongue** rolls food into a ball (bolus) to swallow.', 'The **oesophagus** carries it to the stomach by waves of muscle contraction called **peristalsis**.'] },
      { title: 'The stomach', systems: ['digestive', 'skeletal'], highlight: ['digestive/stomach'], focus: ['digestive/stomach'], isolate: true, text: ['The **stomach** churns food with **acid** and the enzyme **pepsin**, which starts digesting protein. The acid also kills most bacteria.'] },
      { title: 'Liver, gallbladder and pancreas', systems: ['digestive', 'skeletal'], highlight: ['digestive/liver', 'digestive/gallbladder', 'digestive/pancreas'], focus: ['digestive/liver', 'digestive/pancreas'], text: ['The **liver** makes **bile**, which is stored in the **gallbladder** and breaks fat into small droplets.', 'The **pancreas** makes enzymes for carbohydrate, protein and fat, and the hormones insulin and glucagon.'] },
      { title: 'The intestines', systems: ['digestive', 'skeletal'], highlight: ['digestive/small-intestine', 'digestive/large-intestine'], focus: ['digestive/small-intestine'], text: ['In the **small intestine** digestion is finished and the products are **absorbed** through millions of **villi** into the blood.', 'The **large intestine** absorbs **water**, and what is left leaves the body as faeces.'] },
    ],
  },
  {
    id: 'urinary', title: 'The kidneys and urinary system', category: 'system', topics: ['urinary'], level: 'school', minutes: 4,
    summary: 'How the kidneys clean the blood and make urine.', curriculum: ['Excretion', 'Homeostasis'],
    steps: [
      { title: 'The urinary system', systems: ['urinary', 'skeletal', 'circulatory'], highlight: ['urinary/left-kidney', 'urinary/right-kidney', 'urinary/left-ureter', 'urinary/right-ureter', 'urinary/urinary-bladder', 'urinary/urethra'], view: 'back', text: ['The two **kidneys** lie at the back of the abdomen on either side of the backbone. They **filter the blood**, removing **urea**, extra water and salts to make **urine**.', 'Urine flows down the **ureters** to the **bladder**, and leaves through the **urethra**.'] },
      { title: 'Blood supply', systems: ['urinary', 'circulatory'], highlight: ['urinary/left-kidney', 'urinary/right-kidney', 'circulatory/aorta', 'circulatory/inferior-vena-cava'], focus: ['urinary/left-kidney', 'urinary/right-kidney'], text: ['Each kidney gets blood from the **aorta** through a **renal artery**; cleaned blood returns through a **renal vein** to the **inferior vena cava**.'] },
    ],
  },
  {
    id: 'brain', title: 'The brain and eye', category: 'system', topics: ['nervous'], level: 'school', minutes: 5,
    summary: 'The parts of the brain and the eye.', curriculum: ['Coordination and response', 'Sense organs: the eye'],
    steps: [
      { title: 'The brain', systems: ['nervous', 'skeletal'], highlight: ['nervous/left-cerebral-hemisphere', 'nervous/right-cerebral-hemisphere'], focus: ['skeletal/skull'], seeThrough: true, text: ['The brain sits inside the **skull**. The largest part, the **cerebrum**, has two **cerebral hemispheres**: they handle thinking, memory, speech, the senses and voluntary movement.'] },
      { title: 'Cerebellum and brainstem', systems: ['nervous'], highlight: ['nervous/cerebellum', 'nervous/brainstem'], focus: ['nervous/cerebellum', 'nervous/brainstem'], view: 'left', text: ['The **cerebellum** coordinates movement and balance.', 'The **brainstem** joins the brain to the spinal cord and controls automatic actions: **breathing, heart rate, swallowing**.'] },
      { title: 'The eyes', systems: ['nervous', 'skeletal'], highlight: ['nervous/left-eyeball', 'nervous/right-eyeball'], focus: ['nervous/left-eyeball', 'nervous/right-eyeball'], text: ['Each **eyeball** sits in its bony socket (orbit). The cornea and lens focus light on the **retina**, which sends impulses along the **optic nerve** to the brain.'] },
    ],
  },
  {
    id: 'glands', title: 'Endocrine glands', category: 'system', topics: ['endocrine'], level: 'school', minutes: 4,
    summary: 'Glands that release hormones into the blood.', curriculum: ['Hormones'],
    steps: [
      { title: 'Hormones', systems: ['endocrine', 'skeletal'], highlight: ['endocrine/pituitary-gland', 'endocrine/left-adrenal-gland', 'endocrine/right-adrenal-gland', 'digestive/pancreas'], view: 'front', text: ['**Endocrine glands** release **hormones** straight into the blood, which carries them to their target organs. Hormone responses are slower but last longer than nerve impulses.', 'The thyroid gland is not in this model.'] },
      { title: 'The pituitary', systems: ['endocrine', 'nervous', 'skeletal'], highlight: ['endocrine/pituitary-gland'], focus: ['endocrine/pituitary-gland'], seeThrough: true, text: ['The pea-sized **pituitary gland** under the brain is the "master gland": its hormones control growth, water balance (ADH) and other glands.'] },
      { title: 'Adrenals and pancreas', systems: ['endocrine', 'urinary', 'digestive'], highlight: ['endocrine/left-adrenal-gland', 'endocrine/right-adrenal-gland', 'digestive/pancreas'], focus: ['endocrine/left-adrenal-gland', 'digestive/pancreas'], text: ['The **adrenal glands** on top of the kidneys release **adrenaline** for "fight or flight".', 'The **pancreas** releases **insulin** (lowers blood sugar) and **glucagon** (raises it).'] },
    ],
  },
  {
    id: 'skin', title: 'The skin', category: 'system', topics: ['integumentary'], level: 'school', minutes: 3,
    summary: 'The largest organ and what it does.', curriculum: ['Homeostasis: temperature control', 'Skin'],
    steps: [
      { title: 'The skin', systems: ['integumentary'], view: 'front', text: ['The **skin** is the body\'s largest organ. It **protects** against germs and drying out, **senses** touch, pain and temperature, **controls body temperature** by sweating and by changing blood flow, and makes **vitamin D** in sunlight.'] },
      { title: 'What is underneath', systems: ['integumentary', 'skeletal', 'muscular'], seeThrough: true, view: 'front', text: ['Below the skin lie the **muscles**, attached to the **skeleton**. Here the skin is made see-through so you can see them.'] },
    ],
  },

  // ---------------- by region ----------------
  {
    id: 'thorax', title: 'The thorax (chest)', category: 'region', topics: ['respiratory', 'circulatory', 'skeletal'], level: 'school', minutes: 4,
    summary: 'What the rib cage holds and protects.', curriculum: ['Gas exchange', 'Transport in humans'],
    steps: [
      { title: 'The chest wall', systems: ['skeletal', 'muscular'], highlight: ['skeletal/rib-cage', 'skeletal/sternum'], focus: ['skeletal/rib-cage'], text: ['The **thorax** is enclosed by the **rib cage**, the **intercostal muscles** between the ribs, and the **diaphragm** below.'] },
      { title: 'Inside the thorax', systems: ['skeletal', 'respiratory', 'circulatory'], highlight: ['circulatory/heart', 'respiratory/left-lung', 'respiratory/right-lung', 'respiratory/trachea'], focus: ['skeletal/rib-cage'], text: ['The thorax holds the **lungs**, the **heart** between them, the **trachea** and **oesophagus**, and the great blood vessels.'] },
    ],
  },
  {
    id: 'abdomen', title: 'The abdomen', category: 'region', topics: ['digestive', 'urinary'], level: 'school', minutes: 4,
    summary: 'The organs below the diaphragm.', curriculum: ['Digestion', 'Excretion'],
    steps: [
      { title: 'Upper abdomen', systems: ['digestive', 'skeletal'], highlight: ['digestive/liver', 'digestive/stomach'], focus: ['digestive/liver', 'digestive/stomach'], text: ['Under the diaphragm, the **liver** fills the upper right, the **stomach** the upper left.'] },
      { title: 'Lower abdomen', systems: ['digestive', 'skeletal'], highlight: ['digestive/small-intestine', 'digestive/large-intestine'], focus: ['digestive/small-intestine'], text: ['Below them, the coils of the **small intestine** are framed by the **large intestine**.'] },
      { title: 'At the back', systems: ['urinary', 'skeletal', 'endocrine'], highlight: ['urinary/left-kidney', 'urinary/right-kidney', 'endocrine/left-adrenal-gland', 'endocrine/right-adrenal-gland'], view: 'back', text: ['The **kidneys** and **adrenal glands** lie against the back wall of the abdomen, beside the backbone.'] },
    ],
  },
  {
    id: 'head', title: 'Head and neck', category: 'region', topics: ['nervous', 'respiratory', 'skeletal'], level: 'school', minutes: 4,
    summary: 'Skull, brain, eyes and the airway in the neck.', curriculum: ['Coordination and response', 'Gas exchange'],
    steps: [
      { title: 'Skull and brain', systems: ['skeletal', 'nervous'], highlight: ['skeletal/skull'], focus: ['skeletal/skull'], text: ['The **skull** encloses the **brain** and holds the **eyes** in their orbits.'] },
      { title: 'The neck', systems: ['skeletal', 'respiratory', 'circulatory', 'digestive'], highlight: ['respiratory/trachea', 'respiratory/thyroid-cartilage', 'digestive/esophagus', 'circulatory/left-common-carotid-artery', 'circulatory/left-internal-jugular-vein'], focus: ['respiratory/thyroid-cartilage'], text: ['In the neck, the **larynx** and **trachea** lie in front of the **oesophagus**. On each side run the **carotid artery** (to the head) and the **jugular vein** (from it).'] },
    ],
  },
  {
    id: 'limbs', title: 'Arm and leg', category: 'region', topics: ['skeletal', 'muscular'], level: 'school', minutes: 4,
    summary: 'Bones and muscles of the limbs.', curriculum: ['Skeleton', 'Antagonistic muscles'],
    steps: [
      { title: 'The arm', systems: ['skeletal', 'muscular'], highlight: ['skeletal/left-humerus', 'muscular/left-biceps-brachii', 'muscular/left-triceps-brachii'], focus: ['skeletal/left-humerus'], text: ['The **humerus** with the **biceps** in front and the **triceps** behind.'] },
      { title: 'The leg', systems: ['skeletal', 'muscular'], highlight: ['skeletal/left-femur', 'skeletal/left-tibia', 'muscular/left-rectus-femoris', 'muscular/left-gastrocnemius'], focus: ['skeletal/left-femur', 'skeletal/left-tibia'], text: ['The **femur** and **tibia** meet at the knee. The **quadriceps** straightens the knee; the **gastrocnemius** lifts the heel.'] },
    ],
  },

  // ---------------- cross-sections ----------------
  {
    id: 'section-thorax', title: 'Transverse section: thorax', category: 'section', topics: ['respiratory', 'circulatory'], level: 'school', minutes: 3,
    summary: 'A horizontal cut through the chest at the level of the heart.', curriculum: ['Gas exchange', 'Transport in humans'],
    steps: [
      { title: 'Cut across the chest', systems: ORGANS, clip: { axis: 'y', position: 1.3, keep: 'below' }, view: 'top', focus: ['respiratory/left-lung', 'respiratory/right-lung'], highlight: ['circulatory/heart'], labels: ['respiratory/left-lung', 'respiratory/right-lung', 'skeletal/vertebral-column', 'skeletal/sternum'], text: ['Looking down on a **transverse section** at the level of the heart: the **heart** lies between the two **lungs**, the **sternum** in front and the **vertebra** behind.', 'Notice how much of the chest the lungs fill.'] },
      { title: 'From below', systems: ORGANS, clip: { axis: 'y', position: 1.3, keep: 'above' }, view: 'front', focus: ['respiratory/left-lung', 'respiratory/right-lung'], highlight: ['respiratory/left-lung', 'respiratory/right-lung'], text: ['The same cut, looking at the upper half: the lungs wrap round the heart on both sides.'] },
    ],
  },
  {
    id: 'section-abdomen', title: 'Transverse section: abdomen', category: 'section', topics: ['digestive', 'urinary'], level: 'school', minutes: 3,
    summary: 'A horizontal cut at the level of the kidneys.', curriculum: ['Digestion', 'Excretion'],
    steps: [
      { title: 'Cut at the kidneys', systems: ORGANS, clip: { axis: 'y', position: 1.12, keep: 'below' }, view: 'top', focus: ['urinary/left-kidney', 'urinary/right-kidney', 'digestive/liver'], labels: ['urinary/left-kidney', 'urinary/right-kidney', 'digestive/liver', 'circulatory/aorta', 'circulatory/inferior-vena-cava'], text: ['At this level the **kidneys** lie at the back on either side of the vertebra, with the **aorta** and **inferior vena cava** in front of the backbone. The **liver** fills the right side.'] },
    ],
  },
  {
    id: 'section-sagittal', title: 'Sagittal section: the midline', category: 'section', topics: ['nervous', 'respiratory', 'digestive'], level: 'advanced', minutes: 3,
    summary: 'The body cut down the middle from head to pelvis.', curriculum: ['Coordination and response', 'Gas exchange'],
    steps: [
      { title: 'Cut down the middle', systems: ['skeletal', 'nervous', 'respiratory', 'digestive', 'circulatory'], clip: { axis: 'x', position: 0.004, keep: 'below' }, view: 'left', focus: ['skeletal/skull', 'circulatory/heart'], labels: ['nervous/brainstem', 'nervous/cerebellum', 'respiratory/trachea', 'digestive/esophagus', 'circulatory/heart', 'skeletal/vertebral-column'], text: ['A **sagittal section** divides the body into left and right. Here you see the brain above the **brainstem** and **cerebellum**, the **trachea** in front of the **oesophagus**, and the **vertebral column** behind everything.'] },
    ],
  },
  {
    id: 'section-frontal', title: 'Frontal section: the trunk', category: 'section', topics: ['respiratory', 'digestive'], level: 'advanced', minutes: 3,
    summary: 'The trunk cut from side to side, seen from the front.', curriculum: ['Gas exchange', 'Digestion'],
    steps: [
      { title: 'Cut from side to side', systems: ORGANS, clip: { axis: 'z', position: 0.02, keep: 'below' }, view: 'front', focus: ['respiratory/left-lung', 'digestive/liver', 'urinary/left-kidney'], labels: ['respiratory/left-lung', 'respiratory/right-lung', 'digestive/liver', 'digestive/stomach', 'urinary/left-kidney'], text: ['A **frontal (coronal) section** removes the front of the body. The lungs, liver, stomach and kidneys are seen as if the front wall had been lifted away.'] },
    ],
  },

  // ---------------- quizzes ----------------
  {
    id: 'quiz-bones', title: 'Quiz: name the bones', category: 'quiz', topics: ['skeletal'], level: 'school', minutes: 4,
    summary: 'Find six bones on the skeleton.', curriculum: ['Skeleton'],
    quiz: [
      { prompt: 'Select the femur (thigh bone).', answer: ['skeletal/left-femur', 'skeletal/right-femur'], explain: 'The femur runs from the hip to the knee.', systems: ['skeletal'], view: 'front' },
      { prompt: 'Select the humerus.', answer: ['skeletal/left-humerus', 'skeletal/right-humerus'], explain: 'The humerus is the bone of the upper arm.', systems: ['skeletal'], view: 'front' },
      { prompt: 'Select the skull.', answer: ['skeletal/skull'], explain: 'The skull protects the brain.', systems: ['skeletal'], view: 'front' },
      { prompt: 'Select the sternum (breastbone).', answer: ['skeletal/sternum'], explain: 'The sternum is in the middle of the front of the chest.', systems: ['skeletal'], view: 'front' },
      { prompt: 'Select the tibia (shin bone).', answer: ['skeletal/left-tibia', 'skeletal/right-tibia'], explain: 'The tibia is the larger bone of the lower leg, on the inner side.', systems: ['skeletal'], view: 'front' },
      { prompt: 'Select a scapula (shoulder blade).', answer: ['skeletal/left-scapula', 'skeletal/right-scapula'], explain: 'The scapula is at the top of the back.', systems: ['skeletal'], view: 'back' },
    ],
  },
  {
    id: 'quiz-organs', title: 'Quiz: find the organs', category: 'quiz', topics: ['digestive', 'respiratory', 'circulatory', 'urinary'], level: 'school', minutes: 4,
    summary: 'Find the main organs of the trunk.', curriculum: ['Digestion', 'Gas exchange', 'Excretion'],
    quiz: [
      { prompt: 'Select the heart.', answer: ['circulatory/heart'], explain: 'The heart lies between the lungs, a little to the left.', systems: ['circulatory', 'respiratory'], view: 'front' },
      { prompt: 'Select the liver.', answer: ['digestive/liver'], explain: 'The liver is in the upper right of the abdomen.', systems: ['digestive'], view: 'front' },
      { prompt: 'Select the stomach.', answer: ['digestive/stomach'], explain: 'The stomach is in the upper left of the abdomen.', systems: ['digestive'], view: 'front' },
      { prompt: 'Select a lung.', answer: ['respiratory/left-lung', 'respiratory/right-lung'], explain: 'The lungs fill most of the chest.', systems: ['respiratory'], view: 'front' },
      { prompt: 'Select a kidney.', answer: ['urinary/left-kidney', 'urinary/right-kidney'], explain: 'The kidneys are at the back of the abdomen.', systems: ['urinary', 'skeletal'], view: 'back' },
      { prompt: 'Select the small intestine.', answer: ['digestive/small-intestine'], explain: 'The coiled small intestine fills the middle of the abdomen.', systems: ['digestive'], view: 'front' },
    ],
  },
  {
    id: 'quiz-muscles', title: 'Quiz: muscles', category: 'quiz', topics: ['muscular'], level: 'school', minutes: 3,
    summary: 'Find five muscles.', curriculum: ['Antagonistic muscles'],
    quiz: [
      { prompt: 'Select the biceps.', answer: ['muscular/left-biceps-brachii', 'muscular/right-biceps-brachii'], explain: 'The biceps is at the front of the upper arm.', systems: ['skeletal', 'muscular'], view: 'front' },
      { prompt: 'Select the triceps.', answer: ['muscular/left-triceps-brachii', 'muscular/right-triceps-brachii'], explain: 'The triceps is at the back of the upper arm.', systems: ['skeletal', 'muscular'], view: 'back' },
      { prompt: 'Select the deltoid.', answer: ['muscular/left-deltoid', 'muscular/right-deltoid'], explain: 'The deltoid is the rounded muscle of the shoulder.', systems: ['skeletal', 'muscular'], view: 'front' },
      { prompt: 'Select the gastrocnemius (calf muscle).', answer: ['muscular/left-gastrocnemius', 'muscular/right-gastrocnemius'], explain: 'The calf muscle is at the back of the lower leg.', systems: ['skeletal', 'muscular'], view: 'back' },
      { prompt: 'Select the gluteus maximus.', answer: ['muscular/left-gluteus-maximus', 'muscular/right-gluteus-maximus'], explain: 'The gluteus maximus is the large muscle of the buttock.', systems: ['skeletal', 'muscular'], view: 'back' },
    ],
  },
]

export const moduleById = (id: string) => MODULES.find(m => m.id === id) ?? null
