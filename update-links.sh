#!/bin/bash

# Update internal links after renaming files to lowercase-with-dashes

echo "Updating internal links..."

# Process all Markdown and HTML files
find . -type f \( -name "*.md" -o -name "*.html" \) | while IFS= read -r file; do
    echo "Processing $file"

    # Create a temp file
    tmp="$file.tmp"

    # Transform links
    sed -E '
        # Convert spaces to dashes inside links
        s/\(([^) ]*) ([^)]+)\)/(\1-\2)/g;

        # Lowercase everything inside parentheses (links)
        s/\(([^)]+)\)/\L(\1)/g;

        # Normalize multiple dashes
        s/--+/-/g;

        # Fix accidental "././" or ".././"
        s/\.\//\//g;
    ' "$file" > "$tmp"

    # Replace original file
    mv "$tmp" "$file"
done

echo "Link update complete."