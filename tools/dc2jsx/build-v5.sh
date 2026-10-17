#!/bin/sh
# Regenerate the round 5 pages (Oct 2026 handoff) from design_handoff_v5/reference.
#   sh tools/dc2jsx/build-v5.sh
# Copies reference assets to public/assets/v5/, writes one React component per
# page to src/islands/v5/, shrinks oversized images (optimise-v5.py) and applies
# the phone-layout hooks (patches-v5.py). Each component is the reference's own
# markup and logic. From 17 Oct 2026 RoiPage, ForLeaders and BookDemo also carry
# design edits made in code after the handoff; rerunning overwrites them, so diff
# against git and re-apply (or fold them into the next handoff) first.
set -e
cd "$(dirname "$0")/../.."
REF=design_handoff_v5/reference
OUT=src/islands/v5
GEN=$(mktemp -d)
mkdir -p "$OUT" public/assets/v5
rsync -a --delete "$REF/assets/" public/assets/v5/

gen() { # <reference file> <root label> <class prefix> <ComponentName> [imports...]
  ref="$REF/$1.dc.html"; label=$2; prefix=$3; name=$4; shift 4
  python3 tools/dc2jsx/dc2jsx.py "$ref" --select "$label" --prefix "$prefix" --out "$GEN/$name.jsx"
  python3 tools/dc2jsx/assemble.py "$ref" "$GEN/$name.jsx" "$OUT/$name.tsx" "$name" \
    --assets /assets/v5/ --lib ../../lib/s --source "$REF" --imports "$@"
}

gen "Website Phone" "Phone"       ph5 Phone        ""
gen "Home"          "Home"        hm  HomePage     "import Phone from './Phone';"
gen "Your People"   "Your people" yp  YourPeople   ""
gen "For Leaders"   "For leaders" fl  ForLeaders   ""
gen "ROI"           "ROI"         ri  RoiPage      ""
gen "Book a Demo"   "Book a demo" bd  BookDemo     ""
rm -rf "$GEN"
# Images that ship far larger than shown: resize to ~2x shown width, WebP.
python3 tools/dc2jsx/optimise-v5.py .
# Hooks and small fixes for the phone layouts (styles live in src/pages/*.astro).
python3 tools/dc2jsx/patches-v5.py .
