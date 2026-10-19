import type { AnatomyManifest, Structure } from '../types'

const S = (id: string, name: string, system: Structure['system'], group: string, groupName: string, extra: Partial<Structure> = {}): Structure => ({
  id, name, fma: `FMA${id.replace(/\D/g, '')}`, system, also: [], kind: 'organ', group, groupName,
  centre: [0, 1.2, 0.02], size: [0.1, 0.1, 0.1], ...extra,
})

/** A small manifest shaped like the real one (public/anatomy/bodyparts3d/manifest.json) */
export function fixtureManifest(): AnatomyManifest {
  return {
    version: 1,
    source: {
      name: 'BodyParts3D', version: '4.0', holder: 'DBCLS', licence: 'CC BY 4.0',
      licenceUrl: 'https://creativecommons.org/licenses/by/4.0/', attribution: 'BodyParts3D, © DBCLS, CC BY 4.0',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html', changes: 'Converted.',
    },
    units: 'm',
    height: 1.72,
    systems: {
      integumentary: { file: 'integumentary.glb', count: 2, bytes: 100 },
      skeletal: { file: 'skeletal.glb', count: 2, bytes: 100 },
      circulatory: { file: 'circulatory.glb', count: 3, bytes: 100 },
      respiratory: { file: 'respiratory.glb', count: 2, bytes: 100 },
      digestive: { file: 'digestive.glb', count: 3, bytes: 100 },
      endocrine: { file: 'endocrine.glb', count: 1, bytes: 100 },
      reproductive: { file: 'reproductive.glb', count: 1, bytes: 100 },
      muscular: { file: null, count: 0, bytes: 0 },
    },
    structures: [
      S('FJ1', 'Skin', 'integumentary', 'skin', 'Skin', { kind: 'skin', centre: [0, 0.86, 0], size: [0.66, 1.72, 0.3] }),
      S('FJ1C', 'Skin', 'integumentary', 'skin', 'Skin', { kind: 'skin', cover: true }),
      S('FJ2', 'Left femur', 'skeletal', 'left-femur', 'Left femur', { kind: 'bone', centre: [0.1, 0.65, 0], size: [0.05, 0.45, 0.05] }),
      S('FJ3', 'Right femur', 'skeletal', 'right-femur', 'Right femur', { kind: 'bone', centre: [-0.1, 0.65, 0], size: [0.05, 0.45, 0.05] }),
      S('FJ4', 'Anterior leaflet of mitral valve', 'circulatory', 'heart', 'Heart', { kind: 'heart', centre: [0.02, 1.25, 0.04] }),
      S('FJ5', 'Cavity of left ventricle', 'circulatory', 'heart', 'Heart', { kind: 'heart', centre: [0.03, 1.24, 0.03] }),
      S('FJ6', 'Arch of aorta', 'circulatory', 'aorta', 'Aorta', { kind: 'artery' }),
      S('FJ7', 'Right superior bronchopulmonary segment', 'respiratory', 'right-lung', 'Right lung', { centre: [-0.08, 1.3, 0] }),
      S('FJ8', 'Right posterior basal bronchopulmonary segment', 'respiratory', 'right-lung', 'Right lung', { centre: [-0.09, 1.22, -0.02] }),
      S('FJ9', 'Hepatovenous segment II', 'digestive', 'liver', 'Liver', { centre: [-0.05, 1.08, 0.03] }),
      S('FJ10', 'Esophagus', 'digestive', 'esophagus', 'Esophagus'),
      S('FJ11', 'Pancreas', 'digestive', 'pancreas', 'Pancreas', { also: ['endocrine'] }),
      S('FJ12', 'Pituitary gland', 'endocrine', 'pituitary-gland', 'Pituitary gland', { kind: 'gland', centre: [0, 1.6, 0.01] }),
      S('FJ13', 'Right testis', 'reproductive', 'right-testis', 'Right testis', { also: ['endocrine'] }),
    ],
  }
}
