"""Arma index.html juntando la base de la Etapa 4 con las partes de cada etapa.

Uso: python3 src/build.py
"""
import re, os, base64
os.chdir(os.path.dirname(os.path.abspath(__file__)))
s = open('base-etapa4.html').read()
css = open('parts/e2.css').read()
html = open('parts/e2.html').read().replace('@@LOGO@@', base64.b64encode(open('../assets/fi-logo.png','rb').read()).decode())
js = open('parts/e2.js').read()
lab_line = [l for l in js.split('\n') if "const lab=$('#laboratorio" in l]
for l in lab_line:
    js = js.replace(l + '\n', '')
js += "\n$$('[data-go]').forEach(b=>b.addEventListener('click',()=>go(slides.indexOf(document.getElementById(b.dataset.go)))));\n"


def rep(a, b):
    global s
    assert a in s, a[:80]
    s = s.replace(a, b, 1)


rep('<title>El QR que se cura solo · corta</title>', '<title>Grupo 29 · Proyecto integrador</title>')
rep('<span class="brand">El QR que se cura solo</span>', '<span class="brand">Grupo 29</span>')
i = s.index('</style>')
s = s[:i] + css + s[i:]
rep('<section class="slide inv" id="inicio" data-title="Portada">', '<section class="slide inv" id="inicio" data-title="Etapa 4">')
rep('<div class="inst-lock r"><span class="mark" id="logoMark">FI</span><span style="text-align:left">Universidad Nacional de Jujuy<b>Facultad de Ingeniería</b></span></div>',
    '<p class="eyebrow r">Etapa 4 · Códigos de grupo y aritmética modular</p>')
s, n = re.subn(r'\n\s*<div class="names r">.*?</div>\n\s*<p class="meta r">.*?</p>', '', s, count=1, flags=re.S)
assert n == 1
e1h = open('parts/e1.html').read()
html = html.replace('<!-- ================= ETAPA 2 · SEPARADOR ================= -->', e1h + '\n<!-- ================= ETAPA 2 · SEPARADOR ================= -->', 1)
html = html.replace('<div class="stg soon"><span class="n">Etapa 1</span><span class="t">Se suma después</span><span class="tm">≈ 3 min</span></div>',
                    '<button class="stg" data-go="etapa1"><span class="n">Etapa 1</span><span class="t">Modelos en un aula virtual</span><span class="s">Grafos, dígrafos y árboles</span><span class="tm">≈ 3 min</span></button>', 1)
assert 'data-go="etapa1"' in html
html = html + '\n' + open('parts/e3.html').read()
o3 = '<div class="stg soon"><span class="n">Etapa 3</span><span class="t">Se suma después</span><span class="tm">≈ 3 min 30 s</span></div>'
assert o3 in html
html = html.replace(o3, '<button class="stg" data-go="etapa3"><span class="n">Etapa 3</span><span class="t">Turnos rotativos en una sala</span><span class="s">Grupos cíclicos y ℤ₄</span><span class="tm">≈ 3 min 30 s</span></button>', 1)
js = js + '\n' + open('parts/e3.js').read()
i2 = s.index('</style>')
s = s[:i2] + open('parts/e1.css').read() + open('parts/e3.css').read() + s[i2:]
js = open('parts/e1.js').read() + js
rep('<main>\n', '<main>\n' + html + '\n')
for sid in ['contexto', 'elegido', 'mod11b', 'matG', 'subgrupo', 'sindrome', 'entrelazado', 'laboratorio']:
    s, n = re.subn(r'(<section class="slide[^"]*" id="%s" data-title=")' % sid, r'\1E4 · ', s, count=1)
    assert n == 1, sid
rep('/* ================= Navegación ================= */', js + '\n/* ================= Navegación ================= */')
rep("const ON_ENTER={\n", "const ON_ENTER={\n  'e1-s4':()=>E1.s4(),'e1-s5':()=>E1.s5(),'e2-datos':s=>E2.datos(s),'e2-grafo':()=>E2.grafo(),'e2-pares':()=>E2.pares(),'e2-conclusion':()=>E2.conclusion(),'e3-ciclico':()=>E3.ciclo(),\n")
rep("  if(!ST_OK||REDUCED){Object.values(ON_ENTER);return;}", "  if(!ST_OK||REDUCED){E2.all();return;}")
rep("wrapOps();setupReveal();hero();", "wrapOps();setupReveal();setupCine();hero();")
open('../index.html', 'w').write(s)
print(len(s), re.findall(r'<section class="slide[^"]*" id="([^"]+)"', s))
