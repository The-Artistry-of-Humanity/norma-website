# redesign-existing-projects (nørma fork)

Design audit skill for this site. Forked from
[elayadesign/redesign-skill](https://github.com/elayadesign/redesign-skill) (MIT, 264 stars,
read at commit of 20 Jul 2026) on 14 Oct 2026.

`UPSTREAM-ORIGINAL.md` is the unmodified upstream file, kept so the fork can be diffed and
re-merged later.

## What changed, and why

The upstream audit is a good diagnostic, but its Design Values are its author's taste and
several of its rules would have fought nørma's brand. Changed:

| Upstream rule | Here | Why |
|---|---|---|
| Approved fonts: Geist, Manrope, Poppins | DM Serif Display, DM Sans, DM Mono | Those are the brand |
| One typeface per site | Two plus a mono | The handoff pairs them deliberately |
| Fixed dark palette, `#000000` to `#313131` | nørma greens and creams | Brand |
| Remove all background gradients | Hero and panel gradients stay, rationed | They are in the handoff; everything else goes |
| Alternating light and dark is a mistake | Alternating is the point, when it carries meaning | Cream for what a person gets, dark for what a leader sees |
| All radii from the Tailwind scale | Organic blob and asymmetric panel radii | The most distinctive thing in the visual language |
| Tailwind type scale | The handoff's own sizes | The site uses inline styles, not Tailwind |
| 700 to 800ms blur and fade up scroll reveals | Short motion, reduced-motion respected | Heavy reveals are part of the look being fixed |
| Floating glass pill navbar | Existing sticky header | Same reason |
| `picsum.photos` placeholders | Never | Real character art or nothing |

Added a Words section (Australian English, no dashes, a ban list of machine sounding words) and
a note that privacy claims must match the help centre and the legal change log.

## Using it

Ask for an audit and it reports before changing anything. The brief it works to is the
12 Oct 2026 client feedback, recorded at the top of the Design Values section.
