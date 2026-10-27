#!/usr/bin/env python3
"""Small, explicit changes to the generated round 5 components.

Run by build-v5.sh after generation. Each patch replaces one exact snippet and
fails loudly if the reference has changed underneath it, so a new handoff never
silently drops a fix. Keep patches to hooks (data-m attributes) and tiny
behaviour changes; the phone layouts themselves live in each page's CSS
(src/pages/*.astro), keyed on these hooks.
"""
import os, re, sys

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
    # Home, moments: carousel controls and the cost legend, centred on a phone.
    ("HomePage.tsx",
     "<div style={s(`display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px 28px;margin-top:clamp(36px,4.5vw,56px)`)}>",
     "<div data-m=\"car-ctrl\" style={s(`display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px 28px;margin-top:clamp(36px,4.5vw,56px)`)}>"),
    ("HomePage.tsx",
     "<div style={s(`display:flex;flex-wrap:wrap;gap:12px 28px`)}>",
     "<div data-m=\"car-legend\" style={s(`display:flex;flex-wrap:wrap;gap:12px 28px`)}>"),
    # Home, the cost of it: proportion bar and the three costs, as cards on a phone.
    ("HomePage.tsx",
     "<div aria-hidden=\"true\" style={s(`display:flex;gap:6px;margin-top:44px;height:56px`)}>",
     "<div data-m=\"cost-bar\" aria-hidden=\"true\" style={s(`display:flex;gap:6px;margin-top:44px;height:56px`)}>"),
    ("HomePage.tsx",
     "<div style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));column-gap:clamp(24px,3vw,48px);row-gap:0;margin-top:-8px`)}>",
     "<div data-m=\"cost-grid\" style={s(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));column-gap:clamp(24px,3vw,48px);row-gap:0;margin-top:-8px`)}>"),
    # Home, two sides: the nørma Score dial, which goes behind the stacked cards on a phone.
    ("HomePage.tsx",
     "<svg viewBox=\"0 0 640 338\" aria-hidden=\"true\" style={s(`position:relative;z-index:2;",
     "<svg data-m=\"dial\" viewBox=\"0 0 640 338\" aria-hidden=\"true\" style={s(`position:relative;z-index:2;"),
    # Your people, the check-in steps: centred under their centred phones on a phone.
    ("YourPeople.tsx",
     "<ol style={s(`list-style:none;margin:clamp(48px,6vw,72px) 0 0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));",
     "<ol data-m=\"ci-steps\" style={s(`list-style:none;margin:clamp(48px,6vw,72px) 0 0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));"),
    # Book a demo: the two cards, wider on a phone.
    ("BookDemo.tsx",
     "<div style={s(`min-width:0;position:relative;max-width:820px;width:100%;margin:0 auto;box-sizing:border-box;display:flex;flex-direction:column;gap:18px`)}>",
     "<div data-m=\"bd-cards\" style={s(`min-width:0;position:relative;max-width:820px;width:100%;margin:0 auto;box-sizing:border-box;display:flex;flex-direction:column;gap:18px`)}>"),
    ("BookDemo.tsx",
     "<div ref={V.cardRef} style={s(`position:relative;overflow:hidden;box-sizing:border-box;padding:clamp(26px,3vw,36px);",
     "<div data-m=\"form-card\" ref={V.cardRef} style={s(`position:relative;overflow:hidden;box-sizing:border-box;padding:clamp(26px,3vw,36px);"),
    # (The Home leaders dashboard is a real screenshot since the light-theme round,
    # 27 Oct 2026, so its coded score rows and their delta hooks are gone.)
]

for name, old, new in PATCHES:
    path = os.path.join(OUT, name)
    s = open(path, encoding="utf-8").read()
    m = re.search(r'data-m=\\?"([^"\\]+)\\?"', new)
    if new in s or (m and f'data-m="{m.group(1)}"' in s and f'data-m="{m.group(1)}"' not in old):
        continue  # already applied (a hook counts as applied once its data-m is in the file)
    if old not in s:
        sys.exit(f"patch target not found in {name}: {old[:80]}")
    s = s.replace(old, new, 1)
    open(path, "w", encoding="utf-8").write(s)
    print(f"  patched {name}: {new[:60]}")
