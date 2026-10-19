# Anatomy models: source and licence

The files in this folder (`*.glb`, `manifest.json`) are derived from **BodyParts3D 4.0**.

> BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International

- Source: https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html
  (the `isa_BP3D_4.0_obj_99.zip` and `partof_BP3D_4.0_obj_99.zip` archives, plus their `*_element_parts.txt` tables)
- Licence: Creative Commons Attribution 4.0 International, https://creativecommons.org/licenses/by/4.0/

## What CC BY 4.0 allows
Commercial use, modification, redistribution and embedding are all allowed, provided that:
1. the attribution above is shown where the models are used (the Anatomy Explorer shows it under the viewer);
2. the licence is named and linked;
3. changes are indicated (see below).

## Changes made
`scripts/anatomy/build-bodyparts3d.mjs` did the following:
- converted the OBJ files to glTF binary;
- re-oriented the meshes to y up and metres, with the feet at y = 0;
- grouped the meshes into one file per body system, using the dataset's own part-of and is-a tables;
- simplified the meshes (gltfpack) and compressed them (meshopt).

The skin over the external genitalia was split into a separate structure. A smoothed copy of that patch
(marked `cover: true` in the manifest) is shown when reproductive content is switched off. That copy is
not anatomy.

## Licence note
The current BodyParts3D release notes (README_e.html in the LATEST folder of the archive) give the
licence as CC BY 4.0. The header comment inside each OBJ file still carries the older notice,
"Creative Commons Attribution-Share Alike 2.1 Japan". These assets follow the archive's current licence
statement, CC BY 4.0. If you need certainty for a particular use, confirm with DBCLS.

## Rebuilding
```
node scripts/anatomy/build-bodyparts3d.mjs <isa-obj-dir> <isa_element_parts.txt> <partof_element_parts.txt>
```

## Lung lobes (BodyParts3D 3.0)
Release 4.0 has no lung tissue, only the bronchial tree. The five lung lobes (structures `V3FMA7333`,
`V3FMA7383`, `V3FMA7337`, `V3FMA7370`, `V3FMA7371` in `respiratory.glb`) come from **BodyParts3D 3.0**
(2011) of the same body:

> BodyParts3D, © The Database Center for Life Science licensed under CC Attribution-Share Alike 2.1 Japan

- Licence: https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en. These lung meshes, as adapted
  here, may be shared only under the same licence, with this credit.
- Changes: release 3.0 sits 18–32 mm higher than 4.0, so the lobes were moved by the difference between
  the two releases' tracheas (0.4, 4.5, −17.8 mm). They were then converted and compressed as above.
- Rebuild with `--lungs <folder with FMA7333/7383/7337/7370/7371/7394.obj from BodyParts3D_3.0_obj_99.zip>`.

## Female reproductive organs (Human Reference Atlas)
BodyParts3D is one male body. The female organs in `reproductive.glb` (structures `HRAF01`–`HRAF19`:
uterus with cervix and the top of the vagina, both ovaries, both uterine tubes) come from the
**Human Reference Atlas 3D reference organs** (HuBMAP, NIH): uterus-female v1.2, ovary-female-left/right v1.3,
fallopian-tube-female-left/right v1.2, by Kristen Browne and Heidi Schlehlein, created from the Visible Human
Dataset (National Library of Medicine; Spitzer and Whitlock 2002).

- Licence: Creative Commons Attribution 4.0 International, https://creativecommons.org/licenses/by/4.0/
- Source: https://humanatlas.io/3d-reference-library (files from https://cdn.humanatlas.io/digital-objects/ref-organ/)
- Changes: only the regional parts of the uterus were used (its separate front- and back-wall meshes overlap them).
  The organs were moved so the female and male bladders coincide (0.014, 0.884, 0.020 m); their position is
  approximate. They were then converted and compressed as above.
- Rebuild with `--female <folder with uterus-female.glb, ovary-female-left/right.glb, fallopian-tube-female-left/right.glb, urinary-bladder-female.glb>`.
