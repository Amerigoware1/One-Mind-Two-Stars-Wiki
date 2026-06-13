#!/usr/bin/env python3
from pathlib import Path
import argparse
import re

EXCLUDE_DIRS = ["_includes", "_layouts", "assets"]

FRONT_MATTER_PATTERN = re.compile(r"(?s)^(?P<prefix>\s*)---\n(?P<body>.*?)(\n)?---\n", re.MULTILINE)


def should_exclude(path: Path) -> bool:
    for d in EXCLUDE_DIRS:
        if d in path.parts:
            return True
    return False


def ensure_layout_in_fm(text: str) -> tuple[str, bool]:
    m = FRONT_MATTER_PATTERN.search(text)
    if not m:
        # No front-matter at all: add one
        fm = "---\nlayout: default\n---\n\n"
        return fm + text.lstrip('\n'), True

    fm_body = m.group('body') or ""
    if re.search(r"^\s*layout\s*:\s*", fm_body, re.MULTILINE):
        return text, False

    # Insert layout at top of fm body
    new_body = "layout: default\n" + fm_body.lstrip('\n')
    new_fm = m.group('prefix') + "---\n" + new_body + "\n---\n"
    new_text = FRONT_MATTER_PATTERN.sub(new_fm, text, count=1)
    return new_text, True


def process_file(path: Path, dry_run: bool = True) -> bool:
    text = path.read_text(encoding='utf-8')
    new_text, changed = ensure_layout_in_fm(text)
    if changed:
        if dry_run:
            print(f"Would update front-matter layout: {path}")
            return True
        path.write_text(new_text, encoding='utf-8')
        print(f"Updated layout in: {path}")
        return True
    return False


def main():
    parser = argparse.ArgumentParser(description='Add layout: default to front-matter of HTML files')
    parser.add_argument('root', nargs='?', default='.', help='root dir')
    parser.add_argument('--apply', action='store_true')
    args = parser.parse_args()

    root = Path(args.root).resolve()
    changed = 0
    for p in root.rglob('*.html'):
        if p.is_file() and not should_exclude(p):
            if process_file(p, dry_run=not args.apply):
                changed += 1
    print(f"Done. Files updated: {changed}")

if __name__ == '__main__':
    main()
