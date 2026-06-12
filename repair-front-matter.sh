#!/bin/bash

CHAR_DIR="_characters"

echo "Fixing front matter delimiters in $CHAR_DIR..."

for file in $CHAR_DIR/*.md; do
    # Read first and last lines
    first_line=$(head -n 1 "$file")
    last_line=$(tail -n 1 "$file")

    # Create temp file
    tmp="$file.tmp"

    # Fix first line if needed
    if [[ "$first_line" == "-" ]]; then
        echo "---" > "$tmp"
        tail -n +2 "$file" >> "$tmp"
        mv "$tmp" "$file"
        echo "Fixed first delimiter in $file"
    fi

    # Re-read last line (file may have changed)
    last_line=$(tail -n 1 "$file")

    # Fix last line if needed
    if [[ "$last_line" == "-" ]]; then
        # Remove last line and append ---
        head -n -1 "$file" > "$tmp"
        echo "---" >> "$tmp"
        mv "$tmp" "$file"
        echo "Fixed last delimiter in $file"
    fi
done

echo "Front matter delimiter repair complete."
