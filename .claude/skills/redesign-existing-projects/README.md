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
| Alternating light and dark is a mistake | Cream is the base, dark is punctuation | The product is dark, so dark frames product screens |
| All radii from the Tailwind scale | Organic blob and asymmetric panel radii | The most distinctive thing in the visual language |
| Tailwind type scale | The handoff's own sizes | The site uses inline styles, not Tailwind |
| (kept) scroll reveals and nav patterns | Unchanged from upstream | Normal web craft; the client note was not about these |

| `picsum.photos` placeholders | Never | Real character art or nothing |

Added a Words section (Australian English, no dashes, a ban list of machine sounding words) and
a note that privacy claims must match the help centre and the legal change log.

## Using it

Ask for an audit and it reports before changing anything. The brief it works to is the
12 Oct 2026 client feedback, recorded at the top of the Design Values section.
