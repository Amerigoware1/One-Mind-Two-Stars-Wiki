#!/usr/bin/env python3
from __future__ import annotations

import re
from pathlib import Path
import argparse

REMOVE_PATTERNS = [
    # Comment + button + script block (broken HTML comment variants)
    re.compile(r"(?is)<!--+\s*Back to Top Button\s*[-\s]*>.*?</script>\s*"),
    re.compile(r"(?is)<!-+\s*Back to Top Button\s*[-\s]*>.*?</script>\s*"),
    # Button + script without comment
    re.compile(r"(?is)<button[^>]*id=[\"']toTopBtn[\"'][\s\S]*?</script>\s*"),
    # Script blocks referencing totopbtn/toTopBtn
    re.compile(r"(?is)<script[^>]*>.*?totopbtn.*?</script>\s*"),
]

FRONT_MATTER = "---\n---\n\n"

EXCLUDE_DIRS = ["_includes", "_layouts", "assets"]


def should_exclude(path: Path) -> bool:
    for d in EXCLUDE_DIRS:
        if d in path.parts:
            return True
    return False


def process_file(path: Path, dry_run: bool = True) -> bool:
    text = path.read_text(encoding="utf-8")
    orig = text
    new = text

    for pat in REMOVE_PATTERNS:
        new = pat.sub("", new)

    # Normalize multiple blank lines to two
    new = re.sub(r"\n{3,}", "\n\n", new)

    # Add front-matter if file doesn't start with it
    if not new.lstrip().startswith("---"):
        new = FRONT_MATTER + new.lstrip('\n')

    if new != orig:
        if dry_run:
            print(f"Would modify: {path}")
            return True
        path.write_text(new, encoding="utf-8")
        print(f"Modified: {path}")
        return True
    return False


def main() -> int:
    parser = argparse.ArgumentParser(description="Remove broken back-to-top button/script blocks and add minimal front-matter to HTML files.")
    parser.add_argument("root", nargs="?", default=".", help="Root directory to scan")
    parser.add_argument("--apply", action="store_true", help="Apply changes instead of dry-run")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    changed = 0
    for path in root.rglob("*.html"):
        if path.is_file() and not should_exclude(path):
            if process_file(path, dry_run=not args.apply):
                changed += 1

    print(f"Done. Files changed: {changed}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
