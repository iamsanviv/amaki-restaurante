# Cómo agregar tus fotos y videos

Todo el contenido vive en la carpeta `assets/`. No necesitas tocar el diseño:
solo poner los archivos con el nombre correcto y, cuando haga falta, cambiar
una línea en `index.html`.

```
amaki-restaurante/
├─ index.html          ← la página
├─ assets/
│  ├─ img/             ← fotos y logo
│  ├─ video/           ← videos (crear esta carpeta)
│  └─ fonts/           ← TAN Grandeur y TAN Mignon
```

---

## 1. Videos

### El video de presentación (horizontal, 16:9)

1. Guarda el archivo como `assets/video/presentacion.mp4`.
2. Guarda una imagen de portada como `assets/img/portada-presentacion.jpg`
   (es el cuadro que se ve antes de darle play).
3. En `index.html` busca `<!-- ══ VIDEOS ══ -->` y reemplaza el bloque
   `<div class="vacio">Video de presentación · 16:9</div>` por:

```html
<video src="assets/video/presentacion.mp4"
       poster="assets/img/portada-presentacion.jpg"
       controls playsinline preload="metadata"></video>
```

### Los videos verticales (9:16)

Hay dos carruseles: **"Nos recomendaron"** y **"Desde nuestra cocina"**.
Cada tarjeta se ve así en el código:

```html
<article class="clip">
  <div class="vacio">Prensa 01 · 9:16</div>
  <div class="clip__pie">Reseña · Instagram</div>
</article>
```

Reemplaza la línea del `vacio` por tu video:

```html
<article class="clip">
  <video src="assets/video/prensa-01.mp4"
         poster="assets/img/prensa-01.jpg"
         controls playsinline preload="none" muted loop></video>
  <div class="clip__pie">Reseña · Instagram</div>
</article>
```

El texto del `clip__pie` es la etiqueta que aparece abajo: cámbiala por lo que
quieras ("Reseña de @usuario", "Nuestra barra", etc.).

**Para agregar más videos:** copia un bloque `<article class="clip">…</article>`
completo y pégalo dentro del mismo `<div class="reel">`. El carrusel crece solo.

**Para quitar uno:** borra su bloque `<article>` completo.

### Recomendaciones para los videos

| | |
|---|---|
| Formato | `.mp4` (códec H.264) — funciona en todos los navegadores |
| Verticales | 1080 × 1920 px (9:16) |
| Presentación | 1920 × 1080 px (16:9) |
| Peso máximo | ~10 MB por video vertical, ~30 MB el de presentación |
| Duración | 15–60 s los verticales |

> Si los videos pesan mucho, súbelos a YouTube o Vimeo y pídeme que cambie las
> tarjetas por reproductores incrustados. Así la página carga mucho más rápido.

**Nota sobre Instagram y TikTok:** no se pueden incrustar directamente
descargando el video de la app. O subes tu archivo original a `assets/video/`,
o usamos el código de inserción oficial de cada red. Lo segundo depende de
scripts externos y es más lento.

---

## 2. Fotos

Ya están puestas las fotos que venían en el PDF de eventos. Para cambiar
cualquiera, **reemplaza el archivo conservando el mismo nombre** y listo:

| Archivo | Dónde aparece |
|---|---|
| `selva.jpg` | Sección Historia |
| `evento-mesas.jpg` | Eventos · Opción 1 |
| `plato-opcion2.jpg` | Eventos · Opción 2 |
| `conitos.jpg`, `canastitas.jpg`, `albondigas.jpg`, `maduros-burguer.jpg`, `nachos-guacamole.jpg`, `sangria.jpg`, `sodas.jpg` | Eventos · Pasabocas y bebidas |
| `decoracion-mesa.jpg`, `backing-arco.jpg`, `montaje-globos.jpg`, `montaje-completo.jpg` | Eventos · Decoración |
| `decoracion-dorada.jpg` | Banda de ambiente |
| `logo-amaki.png` | Portada (tema claro) |
| `logo-amaki-beige.png` | Portada (tema oscuro) |

Si en lugar de reemplazar quieres usar otro nombre, busca el nombre viejo en
`index.html` y cámbialo.

### Recomendaciones para las fotos

- **Formato:** `.jpg` para fotos, `.png` solo si necesita fondo transparente.
- **Tamaño:** máximo 1600 px por el lado más largo.
- **Peso:** menos de 300 KB cada una.
- **Texto alternativo:** cada foto tiene un `alt="…"` que describe la imagen.
  Actualízalo si cambias la foto — sirve para accesibilidad y para Google.

### Fotos que todavía faltan

Estas son las que más ayudarían y que aún no tenemos:

1. El local (fachada, salón, la terraza de noche).
2. Los platos estrella de la carta: pirarucú, cazuela amazónica, churrascos.
3. El equipo trabajando en cocina.
4. Las bebidas de autor de la carta regular.

Cuando las tengas, mándamelas y armo una galería de la carta y una sección
del espacio.

---

## 3. Tipografías de marca

La página busca estos archivos:

```
assets/fonts/TAN-Grandeur.woff2   (o .otf)
assets/fonts/TAN-Mignon.woff2     (o .otf)
```

Mientras no estén, se usa un serif de reemplazo. Si solo tienes los `.otf` o
`.ttf`, puedes convertirlos gratis en <https://cloudconvert.com/otf-to-woff2>.
El `.woff2` pesa mucho menos y carga más rápido.

---

## 4. Datos que faltan por confirmar

- **Horarios de atención.** Los que están ahora son un supuesto; búscalos en
  `index.html` dentro de la sección `<!-- ══ VISITA ══ -->`.
- **Instagram.** El enlace que me pasaste apuntaba a TikTok. Actualmente está
  como `instagram.com/amaki.restaurante`; confírmame el usuario correcto.

---

## 5. Vista previa

- Para ver el sitio localmente: `python3 -m http.server` y abre
  <http://localhost:8000>.
- `preview.html` es un archivo único con todas las imágenes incrustadas, útil
  para compartir la maqueta. Se regenera con `python3 build-preview.py`.
  **No es el sitio real** — el que se publica es `index.html` con la carpeta
  `assets/`.
