#!/usr/bin/env python3
"""Convert a dc.html design reference (dc-runtime template) into JSX.

Usage:
  dc2jsx.py <file.dc.html> --list                  # top-level anchors
  dc2jsx.py <file.dc.html> --script                # print logic script body
  dc2jsx.py <file.dc.html> [--select ID] --out X   # write JSX (+ X.css for pseudo styles)

Semantics mirror support.js:
  {{ expr }}       -> V.<path> (loop vars stay bare)
  sc-for list/as   -> .map with Fragment keyed by $index
  sc-if value      -> conditional
  dc-import        -> <Phone .../> (component name derived from name attr)
  style="..."      -> style={s(`...`)}
  style-<pseudo>   -> generated class with !important rules (like createPseudoSheet)
"""
import sys, re, json, hashlib
from html.parser import HTMLParser

VOID = {"img", "input", "br", "hr", "meta", "link", "source", "area", "col", "wbr"}
SVG_TAGS = {t.lower(): t for t in ["linearGradient", "radialGradient", "clipPath", "foreignObject", "textPath",
            "feGaussianBlur", "feMerge", "feMergeNode", "feOffset", "feFlood", "feComposite", "feColorMatrix",
            "feTurbulence", "feBlend", "animateTransform", "feDropShadow"]}
ATTR_MAP = {"class": "className", "for": "htmlFor", "viewbox": "viewBox", "preserveaspectratio": "preserveAspectRatio",
            "gradientunits": "gradientUnits", "gradienttransform": "gradientTransform", "patternunits": "patternUnits",
            "stddeviation": "stdDeviation", "basefrequency": "baseFrequency", "numoctaves": "numOctaves",
            "stitchtiles": "stitchTiles", "tabindex": "tabIndex", "readonly": "readOnly", "maxlength": "maxLength",
            "autocomplete": "autoComplete", "colspan": "colSpan", "rowspan": "rowSpan", "crossorigin": "crossOrigin",
            "srcset": "srcSet", "autofocus": "autoFocus", "spellcheck": "spellCheck", "enterkeyhint": "enterKeyHint",
            "inputmode": "inputMode", "xmlns:xlink": "xmlnsXlink", "xlink:href": "xlinkHref"}
EVENTS = {"onclick": "onClick", "onchange": "onChange", "oninput": "onInput", "onkeydown": "onKeyDown",
          "onkeyup": "onKeyUp", "onfocus": "onFocus", "onblur": "onBlur", "onmouseenter": "onMouseEnter",
          "onmouseleave": "onMouseLeave", "onsubmit": "onSubmit", "onscroll": "onScroll", "onpointerdown": "onPointerDown"}
INLINE = {"span", "a", "strong", "em", "b", "i", "code", "svg", "img", "small", "sup", "sub", "button", "input", "label", "br", "mark", "u", "s", "kbd"}
LITERALS = {"true", "false", "null", "undefined"}
HOLE = re.compile(r"\{\{([\s\S]+?)\}\}")


class Node:
    def __init__(self, tag, attrs, parent=None):
        self.tag, self.attrs, self.parent, self.kids = tag, attrs, parent, []


class Builder(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node("#root", [])
        self.cur = self.root

    def handle_starttag(self, tag, attrs):
        n = Node(tag, attrs, self.cur)
        self.cur.kids.append(n)
        if tag not in VOID:
            self.cur = n

    def handle_startendtag(self, tag, attrs):
        self.cur.kids.append(Node(tag, attrs, self.cur))

    def handle_endtag(self, tag):
        n = self.cur
        while n is not None and n.tag != tag:
            n = n.parent
        if n is not None and n.parent is not None:
            self.cur = n.parent

    def handle_data(self, data):
        self.cur.kids.append(data)

    def handle_comment(self, data):
        pass


def parse(html):
    b = Builder()
    b.feed(html)
    return b.root


def find(node, pred):
    if isinstance(node, Node):
        if pred(node):
            return node
        for k in node.kids:
            r = find(k, pred)
            if r:
                return r
    return None


def attr(node, name):
    for k, v in node.attrs:
        if k == name:
            return v
    return None


class Conv:
    def __init__(self, comp_prefix="dc"):
        self.css = {}  # class -> rule
        self.prefix = comp_prefix
        self.warn = []
        self.renames = {}

    # ---------- expressions ----------
    def expr(self, src, scope):
        e = src.strip()
        out, i = [], 0
        # tokenise respecting string literals
        for m in re.finditer(r"('(?:[^'\\]|\\.)*'|\"(?:[^\"\\]|\\.)*\")|([A-Za-z_$][\w$]*)|(\S)", e):
            if m.group(1):
                out.append(m.group(1))
            elif m.group(2):
                ident = m.group(2)
                prev = "".join(out).rstrip()
                if prev.endswith("."):
                    out.append(ident)
                elif ident in LITERALS or ident in scope or ident == "$index":
                    out.append(ident)
                else:
                    out.append("V." + ident)
            else:
                out.append(m.group(3))
            # re-insert spacing roughly
        # rebuild with spacing from original: simpler to substitute in place
        return self._subst(e, scope)

    def _subst(self, e, scope):
        res, pos = [], 0
        pattern = re.compile(r"('(?:[^'\\]|\\.)*'|\"(?:[^\"\\]|\\.)*\")|([A-Za-z_$][\w$]*)")
        for m in pattern.finditer(e):
            res.append(e[pos:m.start()])
            if m.group(1):
                res.append(m.group(1))
            else:
                ident = m.group(2)
                before = e[:m.start()].rstrip()
                if not before.endswith(".") and ident in self.renames and self.renames[ident] in scope:
                    res.append(self.renames[ident])
                elif before.endswith(".") or ident in LITERALS or ident in scope or ident == "$index" or re.match(r"^\d", ident):
                    res.append(ident)
                else:
                    res.append("V." + ident)
            pos = m.end()
        res.append(e[pos:])
        return "".join(res)

    def value(self, raw, scope, as_template=False):
        """Return a JSX attribute value expression."""
        if raw is None:
            return None
        holes = list(HOLE.finditer(raw))
        if not holes:
            return json.dumps(raw, ensure_ascii=False)
        if len(holes) == 1 and holes[0].start() == 0 and holes[0].end() == len(raw):
            return "{" + self.expr(holes[0].group(1), scope) + "}"
        parts = HOLE.split(raw)
        tl = []
        for i, p in enumerate(parts):
            if i % 2:
                tl.append("${" + self.expr(p, scope) + " ?? ''}")
            else:
                tl.append(p.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${"))
        return "{`" + "".join(tl) + "`}"

    def style(self, raw, scope):
        parts = HOLE.split(raw)
        tl = []
        for i, p in enumerate(parts):
            if i % 2:
                tl.append("${" + self.expr(p, scope) + " ?? ''}")
            else:
                tl.append(p.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${"))
        return "{s(`" + "".join(tl) + "`)}"

    def pseudo(self, pseudo, css):
        if "{{" in css:
            self.warn.append("template hole inside style-" + pseudo + ": " + css)
        k = pseudo + "|" + css
        h = hashlib.md5(k.encode()).hexdigest()[:6]
        cls = f"{self.prefix}-{pseudo[:2]}{h}"
        decls = []
        for d in split_decls(css):
            d = d.strip()
            if not d:
                continue
            decls.append(d if "!important" in d else d + "!important")
        sel = f".{cls}::{pseudo}" if pseudo in ("before", "after") else f".{cls}:{pseudo}"
        self.css[cls] = sel + "{" + ";".join(decls) + "}"
        return cls

    # ---------- nodes ----------
    def node(self, n, scope, depth):
        ind = "  " * depth
        if isinstance(n, str):
            return None  # handled by children()
        tag = n.tag
        if tag in ("x-dc", "#root"):
            return self.children(n, scope, depth)
        if tag in ("helmet", "script", "template", "style"):
            return ""
        if tag == "sc-for":
            lst = attr(n, "list") or ""
            asn = attr(n, "as") or "item"
            if asn in ("s", "V", "React", "Phone"):
                self.renames[asn] = asn + "_"
                asn = asn + "_"
            m = HOLE.fullmatch(lst.strip())
            le = self.expr(m.group(1), scope) if m else "[]"
            inner = self.children(n, scope | {asn}, depth + 2)
            return (f"{ind}{{({le} || []).map(({asn}, $index) => (\n"
                    f"{ind}  <React.Fragment key={{$index}}>\n{inner}\n{ind}  </React.Fragment>\n{ind}))}}")
        if tag == "sc-if":
            v = attr(n, "value") or ""
            m = HOLE.fullmatch(v.strip())
            ve = self.expr(m.group(1), scope) if m else "false"
            inner = self.children(n, scope, depth + 2)
            return f"{ind}{{({ve}) ? (\n{ind}  <>\n{inner}\n{ind}  </>\n{ind}) : null}}"
        if tag == "sc-else":
            self.warn.append("sc-else encountered: handle manually")
        if tag == "dc-import":
            name = attr(n, "name") or "Unknown"
            comp = re.sub(r"[^A-Za-z0-9]", "", name.replace("Website ", ""))
            props = []
            for k, v in n.attrs:
                if k in ("name", "hint-size") or k.startswith("style"):
                    continue
                props.append(f"{camel(k)}={self.value(v, scope)}")
            st = attr(n, "style")
            el = f"<{comp} {' '.join(props)} />"
            if st:
                return f"{ind}<div style={self.style(st, scope)}>{el}</div>"
            return f"{ind}{el}"
        jtag = SVG_TAGS.get(tag, tag)
        props, classes = [], []
        for k, v in n.attrs:
            if k == "style":
                if v and v.strip():
                    props.append("style=" + self.style(v, scope))
                continue
            if k.startswith("style-"):
                classes.append(self.pseudo(k[6:], v or ""))
                continue
            if k in ("data-screen-label", "hint-placeholder-val", "hint-size", "hint-placeholder-count"):
                continue
            if k in EVENTS:
                props.append(EVENTS[k] + "=" + (self.value(v, scope) or "{undefined}"))
                continue
            key = ATTR_MAP.get(k)
            if key is None:
                if k.startswith("data-") or k.startswith("aria-"):
                    key = k
                elif "-" in k:
                    key = camel(k)
                else:
                    key = k
            if key == "className" and v:
                classes.insert(0, v)
                continue
            if v is None:
                props.append(key)
            else:
                props.append(f"{key}={self.value(v, scope)}")
        if classes:
            props.append(f'className="{" ".join(classes)}"')
        open_ = f"<{jtag}" + ("" if not props else " " + " ".join(props))
        if tag in VOID:
            return f"{ind}{open_} />"
        inner = self.children(n, scope, depth + 1)
        if not inner.strip():
            return f"{ind}{open_}></{jtag}>"
        if "\n" not in inner.strip() and len(inner.strip()) < 120:
            return f"{ind}{open_}>{inner.strip()}</{jtag}>"
        return f"{ind}{open_}>\n{inner}\n{ind}</{jtag}>"

    def children(self, n, scope, depth):
        ind = "  " * depth
        parts = []
        kids = n.kids
        pstyle = (attr(n, "style") or "") if isinstance(n, Node) else ""
        flexy = bool(re.search(r"display:\s*(inline-)?(flex|grid)", pstyle))
        for idx, k in enumerate(kids):
            if isinstance(k, str):
                txt = k
                if not txt:
                    continue
                prev_k = kids[idx - 1] if idx > 0 else None
                next_k = kids[idx + 1] if idx + 1 < len(kids) else None
                is_inline = lambda x: isinstance(x, Node) and x.tag in INLINE
                if not txt.strip():
                    # pure whitespace
                    if "\n" in txt:
                        if not flexy and is_inline(prev_k) and is_inline(next_k):
                            parts.append(ind + "{' '}")
                    else:
                        if not flexy and prev_k is not None and next_k is not None:
                            parts.append(ind + "{' '}")
                    continue
                lead = txt[: len(txt) - len(txt.lstrip())]
                trail = txt[len(txt.rstrip()):]
                body = re.sub(r"\s+", " ", txt.strip())
                segs = []
                if lead and prev_k is not None and not flexy:
                    segs.append("{' '}")
                segs.append(self.text(body, scope))
                if trail and next_k is not None and not flexy:
                    segs.append("{' '}")
                parts.append(ind + "".join(segs))
            else:
                r = self.node(k, scope, depth)
                if r:
                    parts.append(r)
        return "\n".join(parts)

    def text(self, body, scope):
        out = []
        pos = 0
        for m in HOLE.finditer(body):
            out.append(esc_text(body[pos:m.start()]))
            out.append("{" + self.expr(m.group(1), scope) + "}")
            pos = m.end()
        out.append(esc_text(body[pos:]))
        return "".join(out)


def esc_text(t):
    if not t:
        return ""
    if re.search(r"[{}<>]", t):
        return "{" + json.dumps(t, ensure_ascii=False) + "}"
    # leading/trailing spaces in JSX text lines are kept only within a line; protect them
    if t != t.strip():
        return "{" + json.dumps(t, ensure_ascii=False) + "}"
    return t


def camel(k):
    return re.sub(r"-([a-z])", lambda m: m.group(1).upper(), k)


def split_decls(css):
    out, depth, q, cur = [], 0, None, ""
    for ch in css:
        if q:
            cur += ch
            if ch == q:
                q = None
            continue
        if ch in "'\"":
            q = ch
        elif ch == "(":
            depth += 1
        elif ch == ")":
            depth -= 1
        elif ch == ";" and depth == 0:
            out.append(cur)
            cur = ""
            continue
        cur += ch
    out.append(cur)
    return out


def script_body(html):
    m = re.search(r"<script[^>]*data-dc-script[^>]*>([\s\S]*?)</script>", html)
    return m.group(1) if m else ""


def main():
    path = sys.argv[1]
    html = open(path, encoding="utf-8").read()
    args = sys.argv[2:]
    if "--script" in args:
        print(script_body(html))
        return
    body = re.sub(r"<script[^>]*data-dc-script[^>]*>[\s\S]*?</script>", "", html)
    root = parse(body)
    xdc = find(root, lambda n: n.tag == "x-dc") or root
    if "--list" in args:
        def walk(n, d):
            for k in n.kids:
                if isinstance(k, Node):
                    i, lab = attr(k, "id"), attr(k, "data-screen-label")
                    if i or lab:
                        print("  " * d + f"<{k.tag}> id={i} label={lab}")
                    walk(k, d + 1)
        walk(xdc, 0)
        return
    target = xdc
    if "--select" in args:
        sel = args[args.index("--select") + 1]
        target = find(xdc, lambda n: attr(n, "id") == sel or attr(n, "data-screen-label") == sel)
        if not target:
            sys.exit("not found: " + sel)
        wrap = Node("#root", [], None)
        wrap.kids = [target]
        target = wrap
    prefix = "dc"
    if "--prefix" in args:
        prefix = args[args.index("--prefix") + 1]
    c = Conv(prefix)
    jsx = c.node(target, set(), 2)
    out = args[args.index("--out") + 1]
    open(out, "w", encoding="utf-8").write(jsx)
    if c.css:
        open(out + ".css", "w", encoding="utf-8").write("\n".join(c.css.values()) + "\n")
    for w in c.warn:
        print("WARN", w, file=sys.stderr)
    print(f"wrote {out} ({len(jsx)} chars, {len(c.css)} pseudo classes)")


if __name__ == "__main__":
    main()
