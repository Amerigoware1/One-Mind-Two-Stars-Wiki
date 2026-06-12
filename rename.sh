#!/bin/bash

# Rename all files to lowercase-with-dashes
find . -depth -type f | while IFS= read -r file; do
    dir=$(dirname "$file")
    base=$(basename "$file")

    # Convert to lowercase
    lower=$(echo "$base" | tr '[:upper:]' '[:lower:]')

    # Replace spaces with dashes
    clean=${lower// /-}

    # Remove accidental double dashes
    clean=$(echo "$clean" | sed 's/--*/-/g')

    # Skip if unchanged
    if [[ "$base" == "$clean" ]]; then
        continue
    fi

    # Rename
    mv "$file" "$dir/$clean"
    echo "Renamed: $file → $dir/$clean"
done

# Rename directories too
find . -depth -type d ! -path "./.git*" | while IFS= read -r dir; do
    parent=$(dirname "$dir")
    base=$(basename "$dir")

    lower=$(echo "$base" | tr '[:upper:]' '[:lower:]')
    clean=${lower// /-}
    clean=$(echo "$clean" | sed 's/--*/-/g')

    if [[ "$base" == "$clean" ]]; then
        continue
    fi

    mv "$dir" "$parent/$clean"
    echo "Renamed directory: $dir → $parent/$clean"
done
