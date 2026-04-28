#!/bin/bash
# Miss Utah Decor — HEIC → JPG batch converter
# Double-click this file to run. It converts every .heic in _pending-conversion/
# into a JPG at <=1600px on the long edge, dropping the result in
# _pending-conversion/converted/ with the same relative path.
#
# Originals are not deleted. Re-runnable: rerun anytime to pick up new HEICs.

set -e

# Always run from the script's own directory regardless of where it's launched
cd "$(dirname "$0")"

SRC="_pending-conversion"
DST="_pending-conversion/converted"

if [[ ! -d "$SRC" ]]; then
  echo "No _pending-conversion/ folder found at $(pwd)"
  echo "Nothing to do."
  read -p "Press Return to close…"
  exit 0
fi

mkdir -p "$DST"

count=0
skipped=0

# -print0 + read -d '' handles spaces in folder names safely
while IFS= read -r -d '' heic; do
  rel="${heic#$SRC/}"                          # strip leading _pending-conversion/
  out_dir="$DST/$(dirname "$rel")"
  out_file="$out_dir/$(basename "${rel%.*}").jpg"

  mkdir -p "$out_dir"

  if [[ -f "$out_file" ]]; then
    skipped=$((skipped+1))
    continue
  fi

  echo "→ $rel"
  sips -s format jpeg \
       -s formatOptions 82 \
       --resampleHeightWidthMax 1600 \
       "$heic" --out "$out_file" >/dev/null
  count=$((count+1))
done < <(find "$SRC" -type f \( -iname '*.heic' -o -iname '*.HEIC' \) ! -path "*/converted/*" -print0)

echo ""
echo "Done. Converted: $count   Already present (skipped): $skipped"
echo "Output → $DST"
echo ""
read -p "Press Return to close…"
