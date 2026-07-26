# AMAKI · Restaurante Amazónico

Sitio web de AMAKI, restaurante amazónico en Neiva, Huila.
Carrera 16 #51-76, Comuna 2 · 318 955 1594

**En línea: https://iamsanviv.github.io/amaki-restaurante/**

Sitio estático, sin dependencias ni proceso de compilación: se abre `index.html`
y funciona. Cada push a la rama principal lo publica solo en GitHub Pages
(`.github/workflows/deploy-pages.yml`).

Un solo tema visual —la selva de noche— y una sola tipografía para el texto
corrido. No hay interruptores de tema ni de tipografía: fueron herramientas de
decisión durante el diseño y ya cumplieron su función.

## Estructura

```
index.html                  Documento único: contenido y metadatos
assets/
  css/                      Hojas de estilo, en orden de carga
    1-fuentes.css             @font-face de las tres tipografías
    2-tokens.css              Colores, familias y ritmos (única fuente de verdad)
    3-base.css                Reset, fondo y jerarquía de texto
    4-layout.css              Contenedor, secciones y barra superior
    5-logotipo.css            El logotipo — ver aviso abajo
    6-portada.css             Portada
    7-media.css               Fotos, mosaicos, banda y video
    8-carta.css               La carta
    9-eventos.css             Eventos y pilares
    10-contacto.css           Visítanos, botones y cierre
    11-animacion.css          Keyframes, revelado y reduced-motion
  js/                       Un módulo por responsabilidad
    navegacion.js             Barra superior al desplazarse
    carta.js                  Filtros de la carta
    revelado.js               Aparición de bloques al hacer scroll
  fonts/                    TAN Grandeur, TAN Mignon y Nourd
  img/                      Fotografías y logotipo
build-preview.py            Genera preview.html (archivo único, para compartir)
```

### Reglas

- **Los colores se definen solo en `2-tokens.css`.** Ningún otro archivo debe
  escribir un color literal; todos usan `var(--…)`. Cambiar la paleta completa
  es editar ese archivo.
- **`5-logotipo.css` no se toca.** Sus medidas salen de medir el logo original y
  están en `em` sobre una única escala. Para cambiar el tamaño del logo, se
  modifica únicamente el `font-size` de `.marca`.
- El orden de las hojas importa: van numeradas y así se declaran en el HTML.

## Tipografías

| Fuente | Uso |
|---|---|
| **TAN Grandeur** | Solo el logotipo (la A inicial y la A interna) |
| **TAN Mignon** | Títulos, subtítulos y el resto del logotipo |
| **Nourd** | Texto corrido, etiquetas, precios y el "DESDE 2025" |

## Ver el sitio en local

```bash
python3 -m http.server
# abrir http://localhost:8000
```

`preview.html` es una copia en un solo archivo, con todo incrustado, para
compartir la maqueta. Se regenera con `python3 build-preview.py`. **No es el
sitio**: lo que se publica es `index.html` con la carpeta `assets/`.

## Agregar fotos y videos

Ver [`COMO-AGREGAR-CONTENIDO.md`](COMO-AGREGAR-CONTENIDO.md).

## Pendientes

- Confirmar los horarios de atención (los publicados son un supuesto).
- Confirmar el usuario de Instagram.
- Fotos del local, del equipo y de los platos de la carta regular.
- Los videos: presentación en 16:9 y los verticales en 9:16.
