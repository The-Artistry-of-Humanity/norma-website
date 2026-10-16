#!/usr/bin/env python3
"""Shrink the round 5 images that ship far larger than they are ever shown.

Run by build-v5.sh after the assets are copied and the components generated.
Each image is resized to about twice its largest on-screen width (sharp on
retina screens), saved as WebP with its transparency kept, the original is
removed, and references in the generated components are pointed at the WebP.
The reference handoff keeps the originals. Widths were measured on the built
pages at 1440px, where every image is at its largest.
"""
import os, re, sys, glob
from PIL import Image

ROOT = sys.argv[1] if len(sys.argv) > 1 else "."
ASSETS = os.path.join(ROOT, "public/assets/v5")
OUT = os.path.join(ROOT, "src/islands/v5")

# file in public/assets/v5 -> target width in px (largest shown width x ~2)
TARGETS = {
    "app-home.png": 640, "app-film.png": 640, "app-reflect.png": 640, "app-reset.png": 640, "app-gratitude.png": 640,
    "norma-world-day.png": 640,
    "dash-home.png": 1000,
    "step-01.png": 720, "step-02.png": 720, "step-03.png": 720,
}

renamed = {}
for name, width in TARGETS.items():
    src = os.path.join(ASSETS, name)
    if not os.path.exists(src):
        continue
    im = Image.open(src)
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    dst = os.path.splitext(src)[0] + ".webp"
    im.save(dst, "WEBP", quality=86, method=6)
    before, after = os.path.getsize(src), os.path.getsize(dst)
    os.remove(src)
    renamed[name] = os.path.basename(dst)
    print(f"  {name:22} {before / 1e3:7.0f} KB -> {renamed[name]:23} {after / 1e3:6.0f} KB")

for path in glob.glob(os.path.join(OUT, "*.tsx")):
    s = open(path, encoding="utf-8").read()
    t = s
    for old, new in renamed.items():
        t = re.sub(r"/assets/v5/" + re.escape(old), "/assets/v5/" + new, t)
    if t != s:
        open(path, "w", encoding="utf-8").write(t)
