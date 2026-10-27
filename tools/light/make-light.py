#!/usr/bin/env python3
"""Light-theme product screenshots for the round 5 pages.

Source: design_handoff_shots/ (the "website-shots" folder from the Oct 2026
screenshot handoff: app/ phones 1170x2532 and crops, dashboard/ full screens
2560 wide, e- crops 2000 wide, m- phone cards 792 wide). Writes WebP to
public/assets/v5/light/, resized to about twice their largest on-screen size,
keeping transparency. Crops are in source pixels. Rerun after a new handoff:
    python3 tools/light/make-light.py
"""
import os
from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
SRC = os.path.join(ROOT, 'design_handoff_shots')
OUT = os.path.join(ROOT, 'public', 'assets', 'v5', 'light')
os.makedirs(OUT, exist_ok=True)

def load(p):
    return Image.open(os.path.join(SRC, p + '.png'))

def flat(im):
    """Fill transparent rounded corners with the image's own ground colour, for
    screenshots shown edge to edge inside a frame (no dark slivers in the corners)."""
    rgba = im.convert('RGBA')
    ground = Image.new('RGBA', rgba.size, rgba.getpixel((12, rgba.height // 2))[:3] + (255,))
    ground.alpha_composite(rgba)
    return ground.convert('RGB')

def save(im, name, width):
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=86, method=6)
    print(f'  {name:28} {im.size[0]}x{im.size[1]}  {os.path.getsize(os.path.join(OUT, name + ".webp")) // 1024} KB')

def pad_to(im, ratio):
    """Pad top and bottom to reach width/height = ratio, extending the image's own
    top row upwards and bottom row downwards so the seam can't be seen."""
    h = round(im.width / ratio)
    if h <= im.height:
        return im
    rgba = im.convert('RGBA'); top = (h - im.height) // 2
    canvas = Image.new('RGBA', (im.width, h))
    canvas.paste(rgba.crop((0, 0, im.width, 1)).resize((im.width, top)), (0, 0))
    canvas.paste(rgba.crop((0, im.height - 1, im.width, im.height)).resize((im.width, h - top - im.height)), (0, top + im.height))
    canvas.paste(rgba, (0, top), rgba)
    return canvas

def stack(parts, gap=0):
    w = max(p.width for p in parts)
    h = sum(p.height for p in parts) + gap * (len(parts) - 1)
    edge = parts[0].convert('RGBA').getpixel((parts[0].width // 2, 2))
    out = Image.new('RGBA', (w, h), edge); y = 0
    for p in parts:
        p = p.convert('RGBA'); out.paste(p, (0, y), p); y += p.height + gap
    return out

# Phones: Home carousel phone, Your people hero and feature phones (390x844 frames).
PHONES = {
    'app-home': 'app/01-the-app/01-home',
    'app-film': 'app/06-journeys/03-start-chapter',
    'app-reflect': 'app/07-reflect/02-speaking',
    'app-reset': 'app/09-reset/01-hub',
    'app-gratitude': 'app/10-gratitude/04-page',
    'app-breathing': 'app/09-reset/04-breathing',
    'app-gratitude-entry': 'app/10-gratitude/02-three-written',
    'app-question': 'app/03-check-in/03-question',
    'app-where-you-stand': 'app/03-check-in/04-where-you-stand',
    'app-entry': 'app/07-reflect/03-entry',
    'app-emotion': 'app/08-name-the-emotion/01-core',
    'app-habits': 'app/04-habits/01-habits',
}
for name, src in PHONES.items():
    save(load(src), name, 780)

home = load('dashboard/01-dashboard/01-home')
# Home hero: the dashboard behind the phone, a 560x408 window on its top left.
save(flat(home.crop((0, 0, 2560, round(2560 * 408 / 560)))), 'dash-hero', 1120)
# Home, "the culture they walk into": a 1280x940 window on the dashboard home.
save(flat(home.crop((0, 0, 2560, 1880))), 'dash-window', 2000)
# For leaders hero and the scroll-through tour: the whole page.
save(flat(home), 'dash-home-full', 1600)

# Home, three steps (1200x978 frames).
R = 1200 / 978
save(flat(load('dashboard/01-dashboard/e-by-department').crop((0, 0, 2000, round(2000 / R)))), 'step-see', 1200)
save(flat(load('dashboard/03-department/01-department').crop((520, 140, 2560, 140 + round(2040 / R)))), 'step-act', 1200)
save(flat(pad_to(flat(load('dashboard/01-dashboard/e-fulfilment-by-month')), R)), 'step-moved', 1200)

# For leaders: desktop crops.
for name, src in {'score-cards': '01-dashboard/e-score-cards', 'focus-area': '01-dashboard/e-focus-area',
                  'putting-in-the-work': '05-day-to-day/e-putting-in-the-work', 'how-people-feel': '05-day-to-day/e-how-people-feel'}.items():
    save(load('dashboard/' + src), name, 2000)
cards = load('dashboard/02-departments/e-department-cards')
save(cards.crop((0, 30, 2000, 630)), 'department-cards', 2000)
q = load('dashboard/04-check-ins/e-questions-answered')
save(stack([q.crop((0, 395, 2000, 505)), q.crop((0, 2575, 2000, 3075))]), 'questions-answered', 2000)
save(load('dashboard/03-department/e-department-fulfilment').crop((40, 40, 560, 765)), 'department-pentagon', 640)

# For leaders: phone-width cards (396 wide on screen).
for name, src in {'m-score-card': '01-dashboard/m-score-card', 'm-culture-card': '01-dashboard/m-culture-card',
                  'm-fulfilment-card': '01-dashboard/m-fulfilment-card', 'm-department-card': '02-departments/m-department-card'}.items():
    save(load('dashboard/' + src), name, 792)
save(load('dashboard/04-check-ins/e-read-by-norma').crop((40, 40, 1960, 720)), 'm-read-by-norma', 1100)
save(load('dashboard/05-day-to-day/e-putting-in-the-work').crop((0, 0, 1010, 752)), 'm-putting-in-the-work', 800)
feel = load('dashboard/05-day-to-day/e-how-people-feel')
save(stack([feel.crop((30, 20, 900, 150)), feel.crop((30, 225, 900, 1060))]), 'm-how-people-feel', 800)
save(cards.crop((0, 1855, 1320, 2440)), 'm-fewer-than-five', 900)
