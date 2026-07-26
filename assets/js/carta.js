/* La carta como carrusel de grupos.

   Los siete grupos siguen estando en la página —Google los indexa igual—
   pero solo uno se muestra a la vez. Se cambia con las pestañas, con las
   flechas, con el teclado o deslizando el dedo. */

(() => {
  const pista = document.getElementById('carta-pista');
  const marco = pista?.closest('.carta__marco');
  const chips = [...document.querySelectorAll('.chip')];
  if (!pista || !marco || !chips.length) return;

  const paneles = [...pista.querySelectorAll('.carta__panel')];
  const antes = document.getElementById('carta-antes');
  const despues = document.getElementById('carta-despues');
  const cuenta = document.getElementById('carta-cuenta');
  let actual = 0;

  /* El marco toma el alto del panel visible. Sin esto quedaría un hueco
     del tamaño del grupo más largo debajo de los grupos cortos. */
  const ajustarAlto = () => {
    marco.style.height = `${paneles[actual].offsetHeight}px`;
  };

  const mostrar = (i, mover = true) => {
    actual = Math.max(0, Math.min(i, paneles.length - 1));

    pista.style.transform = `translateX(-${actual * 100}%)`;

    paneles.forEach((panel, j) => {
      const activo = j === actual;
      panel.dataset.activo = activo ? 'si' : 'no';
      // Los grupos ocultos no deben recibir el foco del teclado.
      panel.inert = !activo;
    });

    chips.forEach((c, j) => c.setAttribute('aria-selected', String(j === actual)));

    if (antes) antes.disabled = actual === 0;
    if (despues) despues.disabled = actual === paneles.length - 1;
    if (cuenta) cuenta.textContent = `${actual + 1} / ${paneles.length}`;

    ajustarAlto();

    // La pestaña activa se mantiene a la vista en la fila de filtros.
    if (mover) chips[actual]?.scrollIntoView({ block: 'nearest', inline: 'center' });
  };

  chips.forEach((chip, i) => chip.addEventListener('click', () => mostrar(i)));
  antes?.addEventListener('click', () => mostrar(actual - 1));
  despues?.addEventListener('click', () => mostrar(actual + 1));

  // Flechas del teclado sobre las pestañas.
  document.querySelector('.carta__nav')?.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { mostrar(actual + 1); chips[actual].focus(); }
    if (e.key === 'ArrowLeft')  { mostrar(actual - 1); chips[actual].focus(); }
  });

  /* Deslizar con el dedo. Solo cuenta si el gesto es más horizontal que
     vertical, para no robarle el desplazamiento normal a la página. */
  let x0 = null, y0 = null;
  marco.addEventListener('touchstart', e => {
    x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
  }, { passive: true });

  marco.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    const dy = e.changedTouches[0].clientY - y0;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      mostrar(actual + (dx < 0 ? 1 : -1));
    }
    x0 = y0 = null;
  }, { passive: true });

  // El alto cambia si cambia el ancho de la ventana o al cargar las fuentes.
  new ResizeObserver(ajustarAlto).observe(paneles[0].parentElement);
  addEventListener('resize', ajustarAlto);
  document.fonts?.ready.then(ajustarAlto);

  mostrar(0, false);
})();
