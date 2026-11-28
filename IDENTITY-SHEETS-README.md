# Identity sheets — batch apply notes

Everything in this bundle is additive except the five renames and one include file.
Unzip at the repo root, then commit.

## 1. Apply

```bash
cd One-Mind-Two-Stars-Wiki

# five identity files were saved under a slug the character page no longer uses
git mv _characters/identities/dee.md    _characters/identities/dee_cruiz.md
git mv _characters/identities/oxi.md    _characters/identities/oxion.md
git mv _characters/identities/terry.md  _characters/identities/fairchild.md
git mv _characters/identities/mia.md    _characters/identities/sora.md
git mv _characters/identities/zahara.md _characters/identities/zaraha.md

unzip -o identity-sheets.zip -d .
git add -A
git commit -m "Add missing identity sheets and placeholder fallback"
git push
```

Result: 73 character pages, 73 identity sheets, 0 missing, 0 orphaned.

## 2. What the bundle contains

| Path | Why |
|---|---|
| `_characters/identities/{aditi,jia,kalea,indigo,nia,saoirse,tara}.md` | New sheets, one per character page that had none |
| `_characters/identities/{dee_cruiz,oxion,fairchild,sora,zaraha}.md` | The five existing sheets, under the slug their character page links to (content unchanged) |
| `_includes/identity-grid.html` | Portrait `onerror` → `portrait-placeholder.png`, and a missing insignia hides instead of showing a broken badge |
| `_data/master_phenotypes.csv` | Master Phenotypes tab, 61 rows, so the generator needs no Google Sheets access |
| `tools/generate_identity_sheets.py` | Regenerates any sheet that goes missing; stdlib only |
| `tools/identity_overrides.json` | Hand-written hair / colours / outfits / props / scene / expressions for the seven new sheets |

## 3. Regenerating later

```bash
python3 tools/generate_identity_sheets.py            # create what is missing
python3 tools/generate_identity_sheets.py --check    # report only
python3 tools/generate_identity_sheets.py --force aditi
```

Add a character page, drop the art in `assets/images/`, run the script: a new sheet
appears. Copy for a character with no entry in `identity_overrides.json` is derived
from the phenotype row and marked `verify against portrait` — worth a human pass.

## 4. Three inconsistencies worth knowing

1. **Portraits are missing for later books on ~40 characters.** 234 `portrait-bookN`
   keys point at files that do not exist yet. The include now shows the placeholder
   tile instead of a broken image, so the grids stay readable while the art catches up.
2. **`zaraha` vs `zahara`.** `_characters/zaraha.md` points at `zaraha-book6..9.webp`
   (missing) and has a duplicated `portrait-book2` key — book 1 never renders and
   `portrait` is book 3. The art on disk is `zahara-book1..5.webp`. One consistent
   spelling would fix the page; the identity sheet keeps `character: zahara` so its
   grid still resolves.
3. **`amerigo.md` uses an unused schema.** It is the only identity sheet with a
   nested `phenotype:` block; `identity-grid.html` only reads the flat `hair / colors /
   outfits / props / scene / expressions` keys, so that page renders empty. Either
   flatten it or teach the include to read the nested block.

## 5. What was verified

- YAML front matter of all 73 identity files parses and carries the six list keys
  (amerigo's nested schema excepted, as above).
- Every `character:` value matches an image stem on disk.
- Each sheet's `first_book … last_book` matches the range declared on its character
  page; missing tiles inside that range are listed below and render as placeholders.

| Sheet | Books | Art present | Placeholder tiles |
|---|---|---|---|
| aditi | 5–9 | 5,6,7,8,9 | — |
| jia | 4–9 | 4,5,7,8,9 | 6 |
| kalea | 5–9 | 5,6,7,8 | 9 |
| indigo | 5–9 | 5,6,7,8 | 9 |
| nia | 6–9 | 7,8,9 | 6 (unborn) |
| saoirse | 5–9 | 5,6,7,8 | 9 |
| tara | 3–9 | 4,5,6,7,8,9 | 3 (gestating) |
| dee_cruiz | 1–9 | 1,2,3,4,5 | 6–9 |
| oxion | 4–9 | 4,5 | 6–9 |
| fairchild | 1–5 | 1,2,3,4,5 | — |
| sora | 6–9 | 6,7,8,9 | — |
| zaraha | 1–9 | 1,2,3,4,5 | 6–9 |
