/* Carrusel de la portada.

   El fundido y el acercamiento los hace el CSS; aquí solo se decide
   qué imagen toca. Así el navegador puede animar en la tarjeta gráfica
   y el movimiento no se entrecorta al desplazarse por la página. */

(() => {
  const carrusel = document.getElementById('carrusel');
  if (!carrusel) return;

  const diapos = [...carrusel.querySelectorAll('.diapo')];
  const puntos = [...document.querySelectorAll('.carrusel__mando .punto')];
  if (diapos.length < 2) return;

  const ESPERA = 9000;                       // igual que las animaciones del CSS
  const quietud = matchMedia('(prefers-reduced-motion: reduce)');

  let actual = 0;
  let reloj = null;

  const mostrar = i => {
    actual = (i + diapos.length) % diapos.length;

    diapos.forEach((d, j) => {
      const activa = j === actual;
      d.dataset.visible = activa ? 'si' : 'no';
      // Reiniciar la animación de acercamiento en cada pase.
      const img = d.querySelector('img');
      if (activa && img) {
        img.style.animation = 'none';
        void img.offsetWidth;                 // fuerza el reinicio
        img.style.animation = '';
      }
    });

    puntos.forEach((p, j) => {
      p.setAttribute('aria-selected', String(j === actual));
      const barra = p.querySelector('i');
      if (j === actual && barra) {
        barra.style.animation = 'none';
        void barra.offsetWidth;
        barra.style.animation = '';
      }
    });
  };

  const arrancar = () => {
    if (quietud.matches) return;
    detener();
    reloj = setInterval(() => mostrar(actual + 1), ESPERA);
  };
  const detener = () => {
    if (reloj) { clearInterval(reloj); reloj = null; }
  };

  puntos.forEach((p, i) =>
    p.addEventListener('click', () => { mostrar(i); arrancar(); })
  );

  // En una pestaña oculta no tiene sentido seguir pasando imágenes.
  document.addEventListener('visibilitychange', () =>
    document.hidden ? detener() : arrancar()
  );

  // Tampoco mientras la portada no está en pantalla.
  new IntersectionObserver(
    ([e]) => (e.isIntersecting ? arrancar() : detener()),
    { threshold: .15 }
  ).observe(carrusel);

  quietud.addEventListener('change', e => (e.matches ? detener() : arrancar()));

  mostrar(0);
})();
