#!/usr/bin/env python3
from pathlib import Path
import re
import argparse

EXCLUDE_DIRS = ["_includes", "_layouts", "assets"]

BANNER_PAT = re.compile(r"(?is)\n?\s*<div\s+class=[\"']top-banner[\"'][^>]*>.*?</div>\s*\n?", re.MULTILINE)


def should_exclude(path: Path) -> bool:
    for d in EXCLUDE_DIRS:
        if d in path.parts:
            return True
    return False


def process_file(path: Path, dry_run: bool = True) -> bool:
    text = path.read_text(encoding='utf-8')
    new = BANNER_PAT.sub('\n', text)
    # collapse multiple blank lines
    new = re.sub(r"\n{3,}", "\n\n", new)
    if new != text:
        if dry_run:
            print(f"Would remove top-banner from: {path}")
            return True
        path.write_text(new, encoding='utf-8')
        print(f"Removed top-banner from: {path}")
        return True
    return False


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('root', nargs='?', default='.')
    parser.add_argument('--apply', action='store_true')
    args = parser.parse_args()

    root = Path(args.root).resolve()
    changed = 0
    for p in root.rglob('*.html'):
        if p.is_file() and not should_exclude(p):
            if process_file(p, dry_run=not args.apply):
                changed += 1
    print(f"Done. Files affected: {changed}")

if __name__ == '__main__':
    main()
