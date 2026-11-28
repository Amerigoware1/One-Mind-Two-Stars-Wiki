#!/usr/bin/env python3
"""Create identity sheets for characters that do not have one yet.

Reads every file in _characters/*.md, works out which books actually have
portrait art in assets/images/, pulls the phenotype baseline out of
_data/master_phenotypes.csv (an export of the "Master Phenotypes" tab of the
Character Bible workbook), merges any hand-written copy from
tools/identity_overrides.json, and writes _characters/identities/<slug>.md.

Usage:
    python3 tools/generate_identity_sheets.py            # create what is missing
    python3 tools/generate_identity_sheets.py --check    # report only, write nothing
    python3 tools/generate_identity_sheets.py --force aditi   # regenerate one file

No third-party packages required.
"""

import argparse
import csv
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHARS = os.path.join(ROOT, "_characters")
IDS = os.path.join(CHARS, "identities")
IMAGES = os.path.join(ROOT, "assets", "images")
PHENOTYPES = os.path.join(ROOT, "_data", "master_phenotypes.csv")
OVERRIDES = os.path.join(ROOT, "tools", "identity_overrides.json")

BOOK_KEY = re.compile(r"^portrait-book(\d+)$")


def front_matter(path):
    """Return the YAML front matter of a markdown file, unparsed but line-split."""
    with open(path, encoding="utf-8") as handle:
        text = handle.read()
    if not text.startswith("---"):
        return []
    return text.split("---", 2)[1].splitlines()


def top_level(lines):
    """Map top-level scalar keys to their raw values (lists are ignored)."""
    found = {}
    for line in lines:
        if not line or line[0] in " \t-":
            continue
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        found[key.strip()] = value.strip().strip('"').strip("'")
    return found


def image_prefix(meta, slug):
    """The stem the portrait files use (dee_cruiz -> dee, zaraha -> zahara)."""
    portrait = meta.get("portrait", "")
    name = os.path.basename(portrait)
    if name.endswith(".webp"):
        name = name[: -len(".webp")]
    if "-book" in name:
        name = name.split("-book")[0]
    return name or slug


def books_with_art(prefix):
    found = []
    for number in range(1, 10):
        if os.path.exists(os.path.join(IMAGES, "%s-book%d.webp" % (prefix, number))):
            found.append(number)
    return found


def book_range(meta, books):
    """Follow the character page's declared range; fall back to the art on disk.

    Missing art inside the declared range renders as a placeholder rather than a
    broken image, so the sheet still shows every book the character appears in.
    """
    promised = sorted(int(m.group(1)) for m in (BOOK_KEY.match(k) for k in meta) if m)
    if promised:
        return promised[0], promised[-1], books or promised
    if books:
        return books[0], books[-1], books
    return 1, 9, list(range(1, 10))


def load_phenotypes():
    table = {}
    if not os.path.exists(PHENOTYPES):
        return table
    with open(PHENOTYPES, encoding="utf-8") as handle:
        for row in csv.DictReader(handle):
            key = (row.get("ID") or "").strip().lower()
            if key:
                table[key] = row
    return table


def load_overrides():
    if not os.path.exists(OVERRIDES):
        return {}
    with open(OVERRIDES, encoding="utf-8") as handle:
        return json.load(handle)


def q(value):
    """YAML-safe double-quoted scalar."""
    return '"' + str(value).replace("\\", "\\\\").replace('"', '\\"') + '"'


def derived(meta, row, slug):
    """Fallback copy built from the phenotype row, for characters with no overrides."""
    name = meta.get("title") or slug

    def field(key):
        return (row.get(key) or "").strip()

    colour = field("HAIR COLOUR") or "TBD"
    light = field("LIGHT 0-10") or field("LIGHT 0–10") or "TBD"
    skin = field("SKIN 1–10") or field("SKIN 1-10") or "TBD"
    skin_notes = field("SKIN NOTES")
    hair_notes = field("HAIR NOTES")
    distinguishing = field("DISTINGUISHING")

    return {
        "insignia": "bridge",
        "hair": [
            "Default: %s, %s" % (colour, hair_notes or "verify against portrait"),
            "Alternate: practical, day-to-day styling",
            "Color: %s" % colour,
        ],
        "colors": [
            "Skin tone: %s / 10, %s — %s" % (skin, field("UNDER TONE") or "neutral", skin_notes or "verify against portrait"),
            "Hair tone: %s (lightness %s / 10, %s, %s)" % (colour, light, field("TEXTURE") or "TBD", field("DENSITY") or "TBD"),
            "Clothing: neutral colony wear, %s build" % (field("BUILD") or "TBD"),
        ],
        "outfits": [
            "Everyday: colony-standard practical wear",
            "Formal: duty attire for %s" % name,
            "Cultural: off-duty layers",
        ],
        "props": [
            distinguishing or "Signature personal item — verify against portrait",
            "Field notebook",
            "Personal kit",
        ],
        "scene": [
            "Home: family dwelling, New Eden",
            "Workplace: %s" % (field("NOTES") or "verify against character page"),
            "Cultural: colony common spaces",
        ],
        "expressions": [
            "Neutral: %s" % (field("REGISTER") or "observant"),
            "Happy: unguarded warmth",
            "Angry: controlled",
            "Afraid: guarded",
            "Determined: steady",
        ],
    }


def render(slug, meta, row, spec, first, last):
    title = meta.get("title") or slug
    lines = [
        "---",
        "layout: identity",
        "title: %s" % q("%s Identity Sheet" % title),
        "character: %s" % spec.get("character", slug),
        "insignia: %s" % spec.get("insignia", "bridge"),
        "first_book: %d" % first,
        "last_book: %d" % last,
        "",
    ]
    for key in ("hair", "colors", "outfits", "props", "scene", "expressions"):
        lines.append("%s:" % key)
        for item in spec.get(key, []):
            lines.append("  - %s" % q(item))
        lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("- {% include identity-grid.html %}")
    lines.append("")
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="report only, write nothing")
    parser.add_argument("--force", nargs="*", default=[], help="slugs to regenerate")
    args = parser.parse_args()

    phenotypes = load_phenotypes()
    overrides = load_overrides()

    characters = {}
    for name in sorted(os.listdir(CHARS)):
        if name.endswith(".md"):
            characters[name[:-3]] = os.path.join(CHARS, name)

    identities = {}
    for name in sorted(os.listdir(IDS)):
        if name.endswith(".md"):
            identities[name[:-3]] = os.path.join(IDS, name)

    created, skipped = [], []
    for slug, path in characters.items():
        meta = top_level(front_matter(path))
        prefix = image_prefix(meta, slug)
        books = books_with_art(prefix)
        first, last, every = book_range(meta, books)

        target = os.path.join(IDS, slug + ".md")
        if os.path.exists(target) and slug not in args.force:
            skipped.append(slug)
            continue

        row = phenotypes.get(slug) or {}
        spec = overrides.get(slug)
        if spec is None:
            spec = derived(meta, row, slug)
        spec.setdefault("character", prefix if prefix != slug else slug)

        text = render(slug, meta, row, spec, first, last)
        if args.check:
            print("would create  %-14s books %d-%d  art %s" % (slug, first, last, every))
        else:
            with open(target, "w", encoding="utf-8") as handle:
                handle.write(text)
            print("created       %-14s books %d-%d  art %s" % (slug, first, last, every))
        created.append(slug)

    orphans = [slug for slug in identities if slug not in characters]
    for slug in orphans:
        print("orphan file   %-14s no matching _characters/%s.md" % (slug, slug))

    print("\n%d created · %d already present · %d orphaned" % (len(created), len(skipped), len(orphans)))
    return 0


if __name__ == "__main__":
    sys.exit(main())
