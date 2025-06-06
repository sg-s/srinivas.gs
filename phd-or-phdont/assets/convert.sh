#!/bin/bash

# Set quality (adjust as needed)
QUALITY=80

# Loop through all .jpg and .jpeg files in the current directory
for file in *.jpg *.jpeg; do
  # Skip if no matches
  [[ -e "$file" ]] || continue

  # Get filename without extension
  base="${file%.*}"

  # Convert to WebP
  cwebp -q $QUALITY "$file" -o "${base}.webp"

  echo "Converted: $file → ${base}.webp"
done