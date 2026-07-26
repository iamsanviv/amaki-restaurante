#!/usr/bin/env python3
"""Genera preview.html: el sitio completo en un solo archivo.

El sitio real es index.html + assets/. Este script existe solo para poder
compartir la maqueta como archivo único (o publicarla como artefacto),
incrustando CSS, JavaScript, fuentes e imágenes como data URI.

Uso:  python3 build-preview.py
"""

import base64
import io
import pathlib
import re

from PIL import Image

RAIZ = pathlib.Path(__file__).parent
ENTRADA = RAIZ / "index.html"
SALIDA = RAIZ / "preview.html"

MAX_LADO = 1000   # px: suficiente para la vista previa
CALIDAD = 70


# ──────────────────────────── utilidades ────────────────────────────

def data_uri_imagen(ruta: pathlib.Path) -> str:
    if ruta.suffix.lower() == ".png":
        return "data:image/png;base64," + base64.b64encode(ruta.read_bytes()).decode()

    im = Image.open(ruta)
    im.thumbnail((MAX_LADO, MAX_LADO), Image.LANCZOS)
    buf = io.BytesIO()
    im.convert("RGB").save(buf, "JPEG", quality=CALIDAD, optimize=True)
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()


def data_uri_fuente(ruta: pathlib.Path) -> str:
    return "data:font/woff2;base64," + base64.b64encode(ruta.read_bytes()).decode()


def resolver(ruta_rel: str, base: pathlib.Path) -> pathlib.Path:
    """Resuelve rutas relativas al archivo que las declara."""
    return (base / ruta_rel).resolve()


# ──────────────────────────── pasos ────────────────────────────

def incrustar_css() -> str:
    """Une las hojas de estilo en el orden en que las declara el HTML."""
    html = ENTRADA.read_text(encoding="utf-8")
    hojas = re.findall(r'<link rel="stylesheet" href="([^"]+)"', html)
    partes = []

    for hoja in hojas:
        archivo = RAIZ / hoja
        css = archivo.read_text(encoding="utf-8")

        # Las fuentes se incrustan; se descarta el respaldo .otf.
        def fuente(m: re.Match) -> str:
            ruta = resolver(m.group(1), archivo.parent)
            if not ruta.exists():
                return m.group(0)
            return f'url("{data_uri_fuente(ruta)}") format("woff2")'

        css = re.sub(r'url\("([^"]+\.woff2)"\)\s*format\("woff2"\)', fuente, css)
        css = re.sub(r',\s*\n?\s*url\("[^"]+\.otf"\)\s*format\("opentype"\)', '', css)
        partes.append(f"/* ══ {hoja} ══ */\n{css}")

    return "\n\n".join(partes)


def incrustar_js() -> str:
    html = ENTRADA.read_text(encoding="utf-8")
    scripts = re.findall(r'<script src="([^"]+)"', html)
    return "\n\n".join(
        f"/* ══ {s} ══ */\n{(RAIZ / s).read_text(encoding='utf-8')}" for s in scripts
    )


def main() -> None:
    html = ENTRADA.read_text(encoding="utf-8")

    # 1. cuerpo, sin envoltura de documento (el artefacto la añade)
    cuerpo = html.split("<body>", 1)[1].split("</body>", 1)[0]
    cuerpo = re.sub(r'<script src="[^"]+"[^>]*></script>', "", cuerpo).strip()

    # 2. imágenes a data URI
    def imagen(m: re.Match) -> str:
        archivo = RAIZ / m.group(2)
        if not archivo.exists():
            return m.group(0)
        return f'{m.group(1)}="{data_uri_imagen(archivo)}"'

    cuerpo = re.sub(r'(src|data-oscuro)="(assets/img/[^"]+)"', imagen, cuerpo)

    # 3. armado final
    salida = (
        '<meta name="viewport" content="width=device-width, initial-scale=1" />\n'
        "<title>AMAKI — Restaurante Amazónico · Neiva</title>\n\n"
        f"<style>\n{incrustar_css()}\n</style>\n\n"
        f"{cuerpo}\n\n"
        f"<script>\n{incrustar_js()}\n</script>\n"
    )
    SALIDA.write_text(salida, encoding="utf-8")
    print(f"preview.html · {SALIDA.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
