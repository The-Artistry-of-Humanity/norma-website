# dc2jsx

Converts the Claude Design reference files (`*.dc.html`) into JSX with the
markup and inline styles kept verbatim, the way `support.js` renders them:

- `{{ expr }}` → `V.expr` (loop variables stay bare)
- `<sc-for list as>` → `.map(...)`, `<sc-if value>` → conditional
- `<dc-import name="Website Phone">` → `<Phone />`
- `style="…"` → `style={s(\`…\`)}`, `style-hover="…"` → a generated class with `!important` rules (written to `<out>.css`)

```
python3 tools/dc2jsx/dc2jsx.py "<file>.dc.html" --list
python3 tools/dc2jsx/dc2jsx.py "<file>.dc.html" --script            # the logic block
python3 tools/dc2jsx/dc2jsx.py "<file>.dc.html" --select product --prefix tws --out /tmp/x.jsx
```

Used for the v3 handoff (Phone, HomeHero, TwoSides, Rhythm, Leaders, HelpCentre, LegalDoc).
