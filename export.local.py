# Bundle /draft/ into one self-contained HTML file (CSS and images inlined).
import re, base64, mimetypes, os, io, sys
from PIL import Image
out = sys.argv[1]
src = open('dist/draft/index.html').read()
src = re.sub(r'<link rel="stylesheet" href="(/_astro/[^"]+\.css)"[^>]*>', lambda m: '<style>' + open('dist' + m.group(1)).read() + '</style>', src)
cache = {}
def datauri(path):
    if path in cache: return cache[path]
    p = 'dist' + path if os.path.exists('dist' + path) else 'public' + path
    if path.endswith('norma-logo.png'):  # the source logo is 3 MB; 120px is plenty here
        im = Image.open(p); im.thumbnail((120, 120)); b = io.BytesIO(); im.save(b, 'PNG', optimize=True); data, mt = b.getvalue(), 'image/png'
    else:
        data, mt = open(p, 'rb').read(), mimetypes.guess_type(p)[0] or 'application/octet-stream'
    cache[path] = 'data:%s;base64,%s' % (mt, base64.b64encode(data).decode()); return cache[path]
src = re.sub(r'(src|href)="(/assets/[^"]+\.(?:png|jpg|jpeg|svg|webp))"', lambda m: '%s="%s"' % (m.group(1), datauri(m.group(2))), src)
src = re.sub(r'url\((/assets/[^)]+)\)', lambda m: 'url(%s)' % datauri(m.group(1)), src)
open(out, 'w').write(src); print(out, round(len(src) / 1024), 'KB')
