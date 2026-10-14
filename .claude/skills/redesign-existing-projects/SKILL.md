---
name: redesign-existing-projects
description: "Audits and upgrades existing websites and apps to premium quality. Diagnoses generic AI design patterns, weak states, and sloppy code, then applies targeted fixes without breaking functionality. Use this skill whenever the user wants to improve, polish, upgrade, refine, audit, fix, or redesign an EXISTING site, page, app, or component, even when they only say it looks bad, cheap, generic, or AI made. Works with any CSS framework or vanilla CSS."
---

# Redesign Existing Projects

This skill is a **diagnostic**. It finds what is wrong with an existing interface and fixes it in place.

## Design values

All concrete values (fonts, background colors, spacing, radius, icon sets, motion timing) live in the **Design Values** section at the bottom of this file. That section is the single source of truth. The audit below tells you *what to look for*; Design Values tells you *what to replace it with*.

Never invent a font, hex value, spacing number, radius, or easing curve that is not in Design Values. If a situation is not covered there, ask rather than guessing.

To adapt this skill to a different design system, edit only the Design Values section. The entire audit follows it automatically.

## How this works

1. **Scan** — Read the codebase. Identify the framework, styling method (Tailwind, vanilla CSS, styled-components, CSS modules), and the current design patterns.
2. **Diagnose** — Run the full audit below. List every generic pattern, weak point, and missing state you find. Report before fixing.
3. **Fix** — Apply targeted upgrades inside the existing stack, in the Fix Priority order. Do not rewrite from scratch. Improve what is there.

---

# Design audit

## Typography

- **Browser default fonts, or Inter / Roboto / Arial / Open Sans / Helvetica.** Replace with an approved font from the Design Values section. On this site the three DM faces are the brand and do not change.
- **Two typefaces on one site.** Consolidate to one, unless the project brief explicitly calls for a pair.
- **Italic type anywhere.** Remove it. Use weight, size, or color for emphasis instead.
- **Ultra bold weights (800, 900, black).** Cap at semibold or bold.
- **Only Regular (400) and Bold (700) in use.** Introduce Medium (500) and SemiBold (600) for finer hierarchy.
- **Headlines lack presence.** Increase display size and tighten letter spacing so headlines feel heavy and intentional. Adjust tracking only within the line height the type scale already provides.
- **Body text too wide.** Cap paragraph measure at roughly 65 characters.
- **Numbers in a proportional font.** Enable `font-variant-numeric: tabular-nums` for data heavy interfaces.
- **Missing letter spacing adjustments.** Negative tracking on large headers, positive tracking on small labels and caps.
- **All caps subheaders everywhere.** Switch to sentence case or small caps. Do not switch to italics.
- **Orphaned words.** A single word alone on the last line. Fix with `text-wrap: balance` on headings and `text-wrap: pretty` on body.
- **Hyphens inside copy.** Do not use `-` in headings, body text, or labels. Rewrite the phrase.
- **Arbitrary or off scale font sizes.** Resolve every size to the Tailwind type scale. Never leave `text-[19px]`, `font-size: 22px`, or `1.4rem` in place. If a size does not land on a step, snap to the closest step below and take its paired line height. Do not combine this with independently set custom line heights from the two fixes above; adjust only within the matched step's value so the rules do not fight.
- **Buttons with off scale type.** Main buttons `text-base` semibold. Header buttons `text-sm` semibold.

## Color and surfaces

- **Background colors outside the approved palette.** Snap every dark surface to the approved dark values. Do not substitute `#0a0a0a`, `#121212`, or a tinted navy.
- **Gradient backgrounds of any kind.** On this site, see Gradients in Design Values: the hero and device panel gradients stay, everything else goes. Never a purple or blue gradient, never a mesh gradient, never a glow added to fill an empty section.
- **Hero heading with flat text color.** Apply the approved left to right text gradient for the active theme.
- **The purple and blue "AI gradient" aesthetic.** The single most common AI fingerprint. Replace with a flat neutral base and one considered accent.
- **Oversaturated accent colors.** Keep saturation under 80% so accents sit with the neutrals instead of screaming.
- **More than one accent color.** Pick one. Remove the rest.
- **Mixing warm and cool grays.** Commit to one gray family and tint consistently.
- **Generic `box-shadow`.** Tint shadows toward the background hue instead of pure black at low opacity.
- **Flat surfaces with zero texture.** Add subtle noise or grain overlays. Do not reach for a gradient to solve flatness.
- **Inconsistent lighting direction.** Audit every shadow so they imply one light source.
- **A dark section inside a light page, or the reverse, with no reason behind it.** On this site light and dark alternate deliberately: cream for what a person gets, dark for what a leader sees. Check the switch carries that meaning. A switch that does not is a copy paste accident and should go.
- **Empty sections with no depth.** Add the nørma character art, a real photograph, the grain overlay, or simply more whitespace. Never a placeholder image service, and never an ambient gradient.

## Layout

- **Everything centered and symmetrical.** Break symmetry with offset margins, mixed aspect ratios, or a left aligned header over centered content.
- **Three equal card columns as the feature row.** The most generic AI layout. Three to five benefits is correct as *content*; the *layout* should be a two column zig zag, an asymmetric grid, horizontal scroll, or masonry.
- **`height: 100vh` on full screen sections.** Replace with `min-height: 100dvh` to stop layout jump on iOS Safari.
- **Complex flexbox percentage math.** Replace with CSS Grid.
- **No max width container.** Add a constraint around 1200 to 1440px with auto margins. Hero heading and subheading cap at 680px.
- **Cards forced to equal height by flexbox.** Allow variable heights, or use masonry when content length varies.
- **Radius chosen by feel.** Every radius comes from Tailwind's scale. When a shape sits inside another and the gap is under 32px, the inner radius equals the outer radius minus the gap, applied only when the result exceeds 2.
- **Spacing values invented ad hoc.** Every margin, padding, and gap resolves to the approved spacing scale.
- **No overlap or depth.** Elements sitting flat beside each other. Use negative margins to layer.
- **Symmetrical vertical padding.** Adjust optically. Bottom padding usually needs slightly more.
- **Dashboard always has a left sidebar.** Try top navigation, a floating command menu, or a collapsible panel.
- **Missing whitespace.** Step up one level on the spacing scale and let it breathe. Dense layouts suit data dashboards, not marketing pages.
- **Buttons not bottom aligned in card groups.** Pin CTAs to the bottom of each card so they form one clean horizontal line.
- **Feature lists starting at different vertical positions.** In pricing and comparison columns, lists must start at the same Y position. Use fixed height title and price blocks.
- **Inconsistent vertical rhythm across side by side elements.** Align titles, descriptions, prices, and buttons across all items. Misaligned baselines read as broken.
- **Mathematical alignment that looks optically wrong.** Icons beside text, play buttons in circles, and text in buttons often need one or two pixels of optical correction.

## Interactivity and states

- **Default or instant transitions.** Every transition uses a custom cubic bezier with real weight, not `ease` or `linear`. Baseline: `transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]`. Micro interactions such as color shifts may run shorter, but never below 200ms and never on a default curve.
- **Elements appearing statically on scroll.** Content entering the viewport fades up heavily: `translate-y-16 blur-md opacity-0` resolving to `translate-y-0 blur-0 opacity-100` over 800ms or longer.
- **`window.addEventListener('scroll')` for reveals.** Replace with `IntersectionObserver` or Framer Motion `whileInView`. Scroll listeners cause continuous reflow and destroy mobile performance.
- **Standard docked navbar.** Replace with the floating island pattern: a detached glass pill, `mt-6 mx-auto w-max rounded-full`.
- **Hamburger icon that swaps or disappears.** The lines must rotate and translate into a true X using `rotate-45` and `-rotate-45` with absolute positioning.
- **Mobile menu as a dropdown.** Open a screen filling overlay with `backdrop-blur-3xl` over `bg-black/80` or `bg-white/80`, with links staggered in from `translate-y-12 opacity-0` using incremental delays.
- **No hover states on buttons.** Add a background shift, slight scale, or translate.
- **No active or pressed feedback.** Add `scale(0.98)` or `translateY(1px)` on press.
- **Missing focus ring.** Visible focus indicators are an accessibility requirement, not a style choice.
- **No loading states.** Replace circular spinners with skeleton loaders shaped like the real layout.
- **No empty states.** Design a composed "getting started" view instead of a blank panel.
- **No error states.** Inline, specific form errors. Never `window.alert()`.
- **Dead links.** Buttons pointing at `#`. Link them or visually disable them.
- **No current page indicator in navigation.** Style the active link distinctly.
- **Scroll jumping.** Add `scroll-behavior: smooth` for anchor navigation.
- **Animating `top`, `left`, `width`, or `height`.** Switch to `transform` and `opacity` for GPU acceleration.

## Content

- **Generic names like "John Doe".** Use diverse, realistic names.
- **Fake round numbers like `99.99%`, `50%`, `$100.00`.** Use organic data: `47.2%`, `$99.00`, `+1 (312) 847-1928`.
- **Placeholder companies like "Acme Corp", "Nexus", "SmartFlow".** Invent contextual, believable brand names.
- **AI copywriting cliches.** Never "Elevate", "Seamless", "Unleash", "Next Gen", "Game changer", "Delve", "Tapestry", or "In the world of". Write plain, specific language.
- **Vague value propositions.** "Streamline" and "optimize" say nothing. Replace with a measurable outcome: "Cut weekly reporting from 4 hours to 15 minutes".
- **Features listed with no outcome.** Every feature line should state what it means for the user.
- **Weak CTAs.** Never "Learn more" or "Submit". Use a verb plus what they get: "Start free trial", "Book a demo".
- **Competing CTAs above the fold.** One primary action per page.
- **Proof buried at the bottom.** Move testimonials, logos, and numbers next to the claims they support.
- **No risk reversal.** Add at least one of free trial, free plan, no credit card, cancel anytime, money back guarantee.
- **Exclamation marks in success messages.** Remove them. Be confident, not loud.
- **"Oops!" error messages.** Be direct: "Connection failed. Please try again."
- **Passive voice.** "We could not save your changes", not "Mistakes were made".
- **Identical blog post dates.** Randomize them.
- **The same avatar for multiple users.** Unique asset per person.
- **Lorem Ipsum.** Never. Write real draft copy.
- **Title Case On Every Header.** Sentence case instead.

## Component patterns

- **Generic card look: border plus shadow plus white background.** Drop to background color alone, or spacing alone. Cards should exist only where elevation communicates hierarchy.
- **Border on a single side of a card.** Never. Borders go all the way around or not at all.
- **Always one filled button plus one ghost button.** Introduce text links or tertiary styles to cut visual noise.
- **Pill shaped "New" and "Beta" badges.** Try square badges, flags, or plain text labels.
- **Accordion FAQ.** The FAQ section itself should stay, six to twelve questions. Change the pattern: a side by side list, searchable help, or inline progressive disclosure reads better than a stack of chevrons.
- **Three card carousel testimonials with dots.** Replace with a masonry wall, embedded social posts, or one rotating quote.
- **Pricing table with three towers.** Emphasize the recommended tier with color and weight, not extra height.
- **Modals for everything.** Use inline editing, slide over panels, or expandable sections for simple actions.
- **Avatar circles exclusively.** Try squircles or rounded squares.
- **Light and dark toggle as a sun and moon switch.** Use a dropdown, system preference detection, or a settings entry.
- **Four column footer link farm.** Simplify to main paths plus legally required links.

## Iconography and imagery

- **Lucide, Feather, Material Icons, or Material Symbols.** These are the default AI choices. Replace with an approved set from the Design Values section.
- **Rocketship for "Launch", shield for "Security".** Replace cliche metaphors with bolt, fingerprint, spark, vault.
- **Inconsistent stroke widths.** Standardize every icon to one stroke weight.
- **Missing favicon.** Always ship a branded one.
- **Stock "diverse team" photos.** Use real photos, candid shots, or one consistent illustration style.

## Code quality

- **Div soup.** Use `<nav>`, `<main>`, `<article>`, `<aside>`, `<section>`.
- **Inline styles mixed with classes.** Move everything into the project's styling system.
- **Hardcoded pixel widths.** Use `%`, `rem`, `em`, and `max-width`.
- **Missing alt text.** Describe the content. Never leave `alt="image"` on a meaningful image.
- **Arbitrary z index like `9999`.** Establish a scale in the theme.
- **Commented out dead code.** Remove all debug artifacts.
- **Import hallucinations.** Verify every import exists in the project dependencies.
- **Missing meta tags.** Add `<title>`, description, `og:image`, and social sharing tags.

## Strategic omissions

What AI builds typically forget entirely:

- **No legal links.** Privacy policy and terms in the footer.
- **No back navigation.** Every page needs a way out.
- **No custom 404.** Design a branded, helpful one.
- **No form validation.** Client side checks for email format and required fields.
- **No skip to content link.** Essential for keyboard users.
- **No cookie consent.** Add a compliant banner where the jurisdiction requires it.
- **Landing page indexing not considered.** Ad only and time bound offers should be `noindex`. Evergreen pages need a real title, meta description, internal links, and a plain question and answer FAQ for AEO.

---

# Upgrade techniques

High impact replacements to pull from once the audit fixes are in.

**Typography**
- Variable font animation, interpolating weight or width on scroll or hover
- Outlined to filled text transitions on scroll entry
- Text mask reveals, with large type acting as a window onto video or imagery

**Layout**
- Broken grid and deliberate asymmetry, with elements overlapping or bleeding off screen
- Whitespace maximization to force focus onto one element
- Parallax card stacks that stick and pile during scroll
- Split screen scroll with halves moving in opposite directions

**Motion**
- Smooth scroll with inertia, decoupled from browser defaults
- Staggered entry, never mounting everything at once
- Spring physics on all interactive elements
- Scroll driven reveals through expanding masks, wipes, or draw on SVG paths

**Surfaces**
- True glassmorphism: `backdrop-filter` plus a 1px inner border and a subtle inner shadow to simulate edge refraction
- Spotlight borders that illuminate under the cursor
- Fixed, `pointer-events: none` grain overlays to break digital flatness
- Colored, tinted shadows carrying the background hue

Note: none of these may reintroduce a background gradient. Depth comes from noise, imagery, shadow, and layering.

---

# Fix priority

Maximum visual impact, minimum risk, in this order:

1. **Font swap** — biggest instant improvement, lowest risk
2. **Color and surface cleanup** — snap to the approved palette, remove background gradients
3. **Hover, active, and focus states** — makes the interface feel alive
4. **Layout and spacing** — grid, max width, spacing scale, nested radius formula
5. **Motion pass** — custom easing curves, scroll reveals via IntersectionObserver, island nav
6. **Replace generic components** — swap cliche patterns for the alternatives above
7. **Loading, empty, and error states** — makes it feel finished
8. **Copy pass** — remove cliches, add specificity, fix CTAs
9. **Type scale polish** — the premium final touch

---

# Rules

- Work with the existing tech stack. Do not migrate frameworks or styling libraries.
- Do not break existing functionality. Test after every change.
- Report the diagnosis before applying fixes. Let the user veto items.
- Check the project's dependency file before importing any new library.
- If the project uses Tailwind, check the version, v3 or v4, before touching config.
- If there is no framework, use vanilla CSS.
- Keep changes reviewable and focused. Small targeted improvements over big rewrites.
- Never invent a design value. If it is not in Design Values, ask.

---

---

# Design values

**This section is nørma's, not the original skill author's.** Adapted 14 Oct 2026 from
elayadesign/redesign-skill (MIT). The audit above says what to look for; this section is the
only source of truth for what to replace it with. Never invent a font, hex, spacing number or
radius that is not here.

## The brief this site is working to

Feedback from Paul Shmukler via Ian (12 Oct 2026): the site "presents too agentically", the
palette is "very dark", the content is "a little overwhelming", and there is no clear enough
message as to why nørma. What he liked: "the bits in lighter tones when you talk to the bite
sized, animated content" (the cream Growth Journeys section with the character illustrations).
Ian agrees and wants "Why us?" at the top and the meditation and breath work surfaced.

So the goal is warmer and more human, not a different brand. The fonts, the logo, the lime and
the character art all stay. What changes is how much dark there is, how much is on one page,
and how specific the words are.

## Fonts

Do not change these. They are the brand.

- **DM Serif Display** — headlines and display numbers. Regular 400 only.
- **DM Sans** — body, UI and buttons. 400, 500, 600.
- **DM Mono** — eyebrow labels, metrics, table figures. 400, 500.

Two typefaces plus a mono is deliberate here, so the "consolidate to one typeface" rule in the
audit does not apply. No italics, nothing above 600.

Caution, and the reason this file exists: mono uppercase eyebrow labels with wide letter
spacing above every section are themselves one of the patterns that reads as AI generated.
Keep DM Mono for figures and labels inside product UI. Use fewer of them as section eyebrows.

## Colour

Dark surfaces: `#0A130D` base · `#0D1B12` section · `#060B07` deepest · `#0F2015` and `#17301F`
for the hero and panel gradients.

Light surfaces: `#F6F4E9` and `#F4F2E6` cream. Text on cream is `#14231A`.

Accent, one only: lime `#D9EA6E`, hover `#EAF79B`, label `#DCEC85`, button gradient `#E9F693`
to `#D3E45F`. Text on lime is `#152213`.

Muted text on dark: `rgba(244,242,230,.86)` body, `rgba(201,212,194,.8)` secondary. Hairlines
and borders: `rgba(228,240,214,.06)` to `rgba(228,240,214,.14)`.

Pillar tints, used only for the five pillars: health `#A9DDB4` · internal `#C4BEEE` · love
`#F0BDB5` · social `#F2DAAC` · flow `#AAD7E3`. Status: needs care `#E6C77E`, attention
`#E78E71`.

**Cream is the base. Dark is punctuation.** The original skill calls a dark section inside a
light page a copy paste accident. That rule does not apply here, on one condition: dark has to
earn its place rather than set a mood.

The product itself is dark, both the app and the dashboard, so dark belongs to the product.
Cream is the page the product sits on. A dark section is how a product screen, a privacy
promise or a leader's view is framed, and it should feel like looking into the app. Everything
else, including all explanation and story, is cream.

Decided 14 Oct 2026: do not map cream to employees and dark to leaders. The app is
dark for everyone, so that split would contradict the product.

Before this change the live site was 24 of 25 phone screens dark. Flat dark everywhere is what
"too dark" and "too agentic" mean in practice, and it leaves the real product screens nothing
to stand out against.

## Gradients

The original skill bans background gradients outright. Here they are allowed but rationed,
because they are part of the handoff design and because they are also the single easiest way to
drift back into the AI look.

Allowed: the hero and device panel gradients (`linear-gradient(165deg,#0F2015,#17301F)` and the
help centre header), and the lime button gradient.

Not allowed: a new radial glow behind every section, a gradient used to stop a section looking
empty, any purple or blue gradient, any mesh gradient. If a section feels flat, the answer is
the character art, a photograph, real whitespace or the grain overlay, never another glow.

## Shape and radius

nørma's radii are organic and asymmetric on purpose. This is distinctive and it stays, so the
"every radius from the Tailwind scale" rule does not apply.

- Soft blob, for icon chips and avatars: `52% 48% 50% 50% / 50% 54% 46% 50%` and its siblings.
- Panel, asymmetric: `30px 20px 32px 22px / 20px 30px 22px 32px` and its siblings.
- Pills and buttons: `999px`.
- Plain boxes inside product UI: 12px, 14px, 18px, 22px.

The nested radius formula still applies where a plain box sits inside another: inner equals
outer minus the gap, when the result is above 2.

## Spacing

4, 6, 8, 10, 12, 14, 18, 20, 22, 26, 28, 32, 40, 48, 56, 72, 96, 110px. Section vertical
padding is 110px desktop, 72px at 560px and below. Page gutter is 40px desktop, 20px mobile.
Content max width 1180px, help centre 1320px, prose measure about 65 characters.

## Motion

`transition: all .2s ease` for colour and border changes, `.3s ease` for anything that moves.
Existing keyframes: `breathe`, `nrmBreathe`, `nrmWave`, `nrmSpin`, `nrmFloat`.

Scroll reveals and the other craft techniques in the audit above stay available. They are
normal web craft and the client feedback that prompted this fork was not about them. Use
`IntersectionObserver`, never a scroll listener, keep reveals off the critical first paint on
mobile, and respect `prefers-reduced-motion`.

## Imagery

Use the nørma character and the illustrated journey chapters. They are the most distinctive
thing the brand owns and they are the part the client singled out as good.

Never use `picsum.photos` or any other placeholder image service on this site. If there is no
real asset, leave the space or ask.

## Type scale

The site uses inline styles from the Claude Design handoff, not Tailwind, so there is no
Tailwind scale to snap to. Match the sizes already in use rather than introducing new ones:

| Use | Style |
|---|---|
| Hero headline | `400 clamp(42px,5.4vw,66px)/1.04 'DM Serif Display'`, tracking `-.9px` |
| Section headline | `400 clamp(30px,3.4vw,40px)/1.1 'DM Serif Display'`, tracking `-.5px` |
| Card headline | `400 30px/1.12 'DM Serif Display'` |
| Sub headline | `400 26px/1.2 'DM Serif Display'` |
| Lede | `400 19px/1.5 'DM Sans'` |
| Body | `400 16px/1.65 'DM Sans'` |
| Small body | `400 15px/1.55 'DM Sans'` |
| UI label | `500 14px 'DM Sans'` |
| Eyebrow | `600 11px 'DM Sans'`, tracking 1.8 to 2.4px, or `500 11px 'DM Mono'` |

## Words

Australian English. No em dashes or en dashes anywhere, in copy or in code comments.

Ban list, because these are the words that make a page sound machine written: empower,
elevate, seamless, unlock, transform, journey (except the product feature Growth Journeys),
robust, leverage, cutting edge, holistic, revolutionise, supercharge, "in today's fast paced".

"Empower your people to thrive" was the live hero headline when this feedback came in. Treat
that sentence as the worked example of what not to write.

Prefer a specific, checkable claim over a benefit adjective. The site already contains a good
example in its own problem section: "Most people who are struggling never say so. Until they
resign or go on leave." That is the register to aim for.

Never claim something the product does not do. Privacy claims in particular must match
`design_handoff_v3/legal-changes-2026-10-13.md` and the help centre: group figures only, a
minimum of five that counts group members rather than respondents, and a leader's own answers
counted in their team's figures.
