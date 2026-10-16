#!/usr/bin/env python3
"""Wrap converted JSX + the reference's logic script into a React component.

assemble.py <dc.html> <jsx file> <out.tsx> <ComponentName> [--assets /assets/] [--lib ../lib/s]
            [--source design_handoff_v5/reference] [--imports "import X from './X';" ...]
"""
import sys, re, subprocess, os

here = os.path.dirname(os.path.abspath(__file__))
src, jsx_path, out, name = sys.argv[1:5]
def opt(flag, default):
    return sys.argv[sys.argv.index(flag) + 1] if flag in sys.argv else default
assets = opt("--assets", "/assets/")
lib = opt("--lib", "../lib/s")
source = opt("--source", "design_handoff_v3/reference")
extra = []
if "--imports" in sys.argv:
    extra = sys.argv[sys.argv.index("--imports") + 1:]

html = open(src, encoding="utf-8").read()
m = re.search(r"<script[^>]*data-dc-script[^>]*>([\s\S]*?)</script>", html)
script = m.group(1).strip() if m else "class Component extends DCLogic { renderVals() { return {}; } }"
jsx = open(jsx_path, encoding="utf-8").read()

# asset paths are relative in the reference; the site serves them from root
jsx = jsx.replace('src="assets/', 'src="' + assets).replace('src="apps/', 'src="/apps/')
script = script.replace("'assets/", "'" + assets).replace('"assets/', '"' + assets).replace("`assets/", "`" + assets)

script = re.sub(r"class\s+Component\s+extends\s+DCLogic", f"class {name} extends React.Component", script)
end = script.rstrip().rfind("}")
render = (
    "\n  render() {\n"
    "    const V = { ...this.props, ...(this.renderVals ? this.renderVals() : {}) };\n"
    "    return (\n      <>\n" + jsx + "\n      </>\n    );\n  }\n"
)
script = script[:end] + render + script[end:]

css_import = ""
if os.path.exists(jsx_path + ".css"):
    css_name = name + ".dc.css"
    dest = os.path.join(os.path.dirname(out), css_name)
    open(dest, "w", encoding="utf-8").write(open(jsx_path + ".css", encoding="utf-8").read())
    css_import = f"import './{css_name}';\n"

header = (
    "// @ts-nocheck\n"
    "/* Generated from the design handoff (" + source + ") by dc2jsx.\n"
    "   Markup and styles are verbatim from the reference; logic is the reference's\n"
    "   own renderVals/state code. Edit the reference and regenerate rather than\n"
    "   hand-tuning values here. */\n"
    "import React from 'react';\n"
    "import { s } from '" + lib + "';\n" + css_import + "\n".join(extra) + ("\n" if extra else "") + "\n"
)
open(out, "w", encoding="utf-8").write(header + script + f"\n\nexport default {name};\n")
print("wrote", out)
