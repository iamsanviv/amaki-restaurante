#!/usr/bin/env python3
"""Genera preview.html: una copia de index.html con las imágenes incrustadas
como data URI, para poder previsualizar el sitio en un archivo único.

El sitio real que se publica es index.html + la carpeta assets/.
"""
import base64, io, mimetypes, pathlib, re
from PIL import Image

RAIZ = pathlib.Path(__file__).parent
MAX_LADO = 1000          # px, suficiente para la vista previa
CALIDAD = 70


def a_data_uri(ruta: pathlib.Path) -> str:
    if ruta.suffix.lower() == ".png":
        datos = ruta.read_bytes()
        return "data:image/png;base64," + base64.b64encode(datos).decode()

    im = Image.open(ruta)
    im.thumbnail((MAX_LADO, MAX_LADO), Image.LANCZOS)
    buf = io.BytesIO()
    im.convert("RGB").save(buf, "JPEG", quality=CALIDAD, optimize=True)
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()


def main() -> None:
    html = (RAIZ / "index.html").read_text(encoding="utf-8")

    def reemplazar(m: re.Match) -> str:
        attr, ruta = m.group(1), m.group(2)
        archivo = RAIZ / ruta
        if not archivo.exists():
            return m.group(0)
        return f'{attr}="{a_data_uri(archivo)}"'

    html = re.sub(r'(src|data-oscuro)="(assets/img/[^"]+)"', reemplazar, html)

    # Fuentes: solo woff2, y se elimina el respaldo .otf que no se puede resolver
    def fuente(m: re.Match) -> str:
        archivo = RAIZ / m.group(1)
        if not archivo.exists():
            return m.group(0)
        b64 = base64.b64encode(archivo.read_bytes()).decode()
        return f'url("data:font/woff2;base64,{b64}") format("woff2")'

    html = re.sub(r'url\("(assets/fonts/[^"]+\.woff2)"\)\s*format\("woff2"\)',
                  fuente, html)
    html = re.sub(r',\s*\n\s*url\("assets/fonts/[^"]+\.otf"\)\s*format\("opentype"\)',
                  '', html)
    salida = RAIZ / "preview.html"
    salida.write_text(html, encoding="utf-8")
    print(f"preview.html escrito · {salida.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
