#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
import argparse
import sys


def is_triple_dash(line: str) -> bool:
    return line.strip() == "---"


def is_single_dash(line: str) -> bool:
    return line.strip() == "-"


def fix_front_matter(lines: list[str]) -> list[str]:
    if not lines:
        return lines

    fixed = list(lines)
    changed = False

    if is_single_dash(fixed[0]):
        fixed[0] = "---"
        changed = True

    yaml_end = None
    if is_triple_dash(fixed[0]):
        for i in range(1, len(fixed)):
            if is_triple_dash(fixed[i]):
                yaml_end = i
                break

        if yaml_end is None:
            for i in range(1, len(fixed)):
                if is_single_dash(fixed[i]):
                    fixed[i] = "---"
                    yaml_end = i
                    changed = True
                    break

    output: list[str] = []
    for i, line in enumerate(fixed):
        if is_single_dash(line) and i != 0 and i != yaml_end:
            continue
        if i == yaml_end and not is_triple_dash(line):
            output.append("---")
            changed = True
            continue
        output.append(line)

    if changed:
        return output
    return lines


def process_file(path: Path, dry_run: bool = False) -> bool:
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()
    new_lines = fix_front_matter(lines)
    if new_lines != lines:
        if dry_run:
            print(f"Would repair: {path}")
            return True
        path.write_text("\n".join(new_lines) + ("\n" if text.endswith("\n") or new_lines else ""), encoding="utf-8")
        print(f"Repaired: {path}")
        return True
    return False


def main() -> int:
    parser = argparse.ArgumentParser(description="Repair Markdown front-matter and remove stray single '-' lines.")
    parser.add_argument("root", nargs="?", default=".", help="Root directory to scan")
    parser.add_argument("--dry-run", action="store_true", help="List files that would be changed without modifying them")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    if not root.exists():
        print(f"Error: root path does not exist: {root}", file=sys.stderr)
        return 1

    repaired = 0
    for path in root.rglob("*.md"):
        if path.is_file():
            if process_file(path, dry_run=args.dry_run):
                repaired += 1

    print(f"Completed. Files repaired: {repaired}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
