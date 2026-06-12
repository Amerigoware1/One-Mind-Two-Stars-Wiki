#!/bin/bash
set -euo pipefail

echo "Fixing front matter delimiters and removing stray '-' lines in Markdown files..."

find . -type f -name '*.md' | while IFS= read -r file; do
    tmp="$file.tmp"

    awk '
    function trim(s) { gsub(/^[[:space:]]+|[[:space:]]+$/, "", s); return s }
    {
        line = $0
        if (NR == 1 && trim(line) == "-") {
            print "---"
            next
        }

        if (NR == 1) {
            if (line == "---") {
                state = "yaml"
                print line
                next
            }
            state = "body"
            print line
            next
        }

        if (state == "yaml") {
            if (line == "---") {
                state = "body"
                print line
                next
            }
            if (trim(line) == "-") {
                state = "body"
                print "---"
                next
            }
            print line
            next
        }

        if (trim(line) == "-") {
            next
        }

        print line
    }
    ' "$file" > "$tmp"

    if ! cmp -s "$file" "$tmp"; then
        mv "$tmp" "$file"
        echo "Repaired $file"
    else
        rm "$tmp"
    fi
 done

echo "Front matter repair complete."
