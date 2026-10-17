#!/usr/bin/env python3
"""Small, explicit changes to the generated round 5 components.

Run by build-v5.sh after generation. Each patch replaces one exact snippet and
fails loudly if the reference has changed underneath it, so a new handoff never
silently drops a fix. Keep patches to hooks (data-m attributes) and tiny
behaviour changes; the phone layouts themselves live in each page's CSS
(src/pages/*.astro), keyed on these hooks.
"""
import os, sys

ROOT = sys.argv[1] if len(sys.argv) > 1 else "."
OUT = os.path.join(ROOT, "src/islands/v5")

PATCHES = [
    # For leaders, Act on it: hooks so the chart can be made readable on a phone.
    ("ForLeaders.tsx",
     '<svg viewBox="0 0 1000 320" aria-hidden="true"',
     '<svg data-m="act-chart" viewBox="0 0 1000 320" aria-hidden="true"'),
    ("ForLeaders.tsx",
     "<span style={s(`position:absolute;left:64.17%;top:10.63%;",
     "<span data-m=\"act-label\" style={s(`position:absolute;left:64.17%;top:10.63%;"),
    # Book a demo: the slot button in the dark card wraps to two lines on a phone.
    ("BookDemo.tsx",
     '<a href="https://calendar.app.google/P14aVTpPNqgrVAbHA" target="_blank" rel="noopener" style={s(`display:inline-flex;align-items:center;gap:8px;height:54px;padding:0 26px;',
     '<a data-m="slot-btn" href="https://calendar.app.google/P14aVTpPNqgrVAbHA" target="_blank" rel="noopener" style={s(`display:inline-flex;align-items:center;gap:8px;height:54px;padding:0 26px;'),
    # ...and nørma beside it crowds the copy into a narrow column and meets the button.
    ("BookDemo.tsx",
     '<img src="/assets/v5/norma-point.png" alt="" width="150" height="202" style={s(`position:absolute;right:clamp(-10px,1vw,18px);bottom:-26px',
     '<img data-m="slot-norma" src="/assets/v5/norma-point.png" alt="" width="150" height="202" style={s(`position:absolute;right:clamp(-10px,1vw,18px);bottom:-26px'),
    ("BookDemo.tsx",
     '<div style={s(`position:relative;padding-right:clamp(120px,18vw,180px)`)}>',
     '<div data-m="slot-text" style={s(`position:relative;padding-right:clamp(120px,18vw,180px)`)}>'),
    # ROI, human case: the four tier cards become compact rows on a phone.
    ("RoiPage.tsx",
     "<div style={s(`margin-top:clamp(44px,5.5vw,72px);display:grid;grid-template-columns:repeat(",
     "<div data-m=\"tiers\" style={s(`margin-top:clamp(44px,5.5vw,72px);display:grid;grid-template-columns:repeat("),
    # Your people, team signal: when the column count changes (window crosses
    # 700/1000px) cards are reused with new roles, so a faded neighbour could
    # become Laura and stay faded. Re-apply whenever a card's role changes, and
    # give each role a complete style.
    ("YourPeople.tsx",
     "if (onlyNew && el.__ppl) return; el.__ppl = true;",
     "if (onlyNew && el.__ppl === el.dataset.role) return; el.__ppl = el.dataset.role;"),
    ("YourPeople.tsx",
     "if (L) { el.style.zIndex = '2'; el.style.translate = fin ? '0 0' : '0 -90px'; el.style.scale = fin ? '1' : '1.18'; }\n      else { el.style.opacity = fin ? '1' : '.16'; el.style.scale = fin ? '1' : '.95'; }",
     "if (L) { el.style.zIndex = '2'; el.style.opacity = '1'; el.style.translate = fin ? '0 0' : '0 -90px'; el.style.scale = fin ? '1' : '1.18'; }\n      else { el.style.zIndex = ''; el.style.translate = '0 0'; el.style.opacity = fin ? '1' : '.16'; el.style.scale = fin ? '1' : '.95'; }"),
    # Home, leaders dashboard: the score deltas break onto two lines once stacked.
    ("HomePage.tsx",
     "<span style={s(`font:500 13px 'DM Mono',monospace;color:#10B981`)}>↑ 2 since Sep",
     "<span data-m=\"delta\" style={s(`font:500 13px 'DM Mono',monospace;color:#10B981`)}>↑ 2 since Sep"),
    ("HomePage.tsx",
     "<span style={s(`font:500 13px 'DM Mono',monospace;color:#EF4444`)}>↓ 3 since Sep",
     "<span data-m=\"delta\" style={s(`font:500 13px 'DM Mono',monospace;color:#EF4444`)}>↓ 3 since Sep"),
]

for name, old, new in PATCHES:
    path = os.path.join(OUT, name)
    s = open(path, encoding="utf-8").read()
    if new in s:
        continue  # already applied
    if old not in s:
        sys.exit(f"patch target not found in {name}: {old[:80]}")
    s = s.replace(old, new, 1)
    open(path, "w", encoding="utf-8").write(s)
    print(f"  patched {name}: {new[:60]}")
