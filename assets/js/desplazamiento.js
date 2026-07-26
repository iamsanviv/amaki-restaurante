/* Desplazamiento suave entre secciones.
   El del navegador es brusco y no se puede ajustar; este usa una curva
   de aceleración propia y una duración proporcional a la distancia,
   de modo que un salto corto no se arrastre y uno largo no se dispare. */

(() => {
  const raiz = document.documentElement;
  const quietud = matchMedia('(prefers-reduced-motion: reduce)');

  // El navegador no debe interferir con su propio scroll suave.
  if (!quietud.matches) raiz.style.scrollBehavior = 'auto';

  const barra = () => document.getElementById('nav')?.offsetHeight ?? 0;

  // Suave al arrancar y al frenar, sin rebote.
  const curva = t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  let animacion = null;

  const irA = destino => {
    if (animacion) cancelAnimationFrame(animacion);

    const desde = window.scrollY;
    const tope = document.body.scrollHeight - innerHeight;
    const hasta = Math.min(
      Math.max(destino.getBoundingClientRect().top + desde - barra() - 8, 0),
      tope
    );
    const recorrido = hasta - desde;
    if (Math.abs(recorrido) < 2) return;

    // Entre 620 ms y 1250 ms según lo lejos que quede la sección.
    const duracion = Math.min(1250, Math.max(620, Math.abs(recorrido) * 0.55));
    const inicio = performance.now();

    const paso = ahora => {
      const t = Math.min((ahora - inicio) / duracion, 1);
      scrollTo(0, desde + recorrido * curva(t));
      if (t < 1) animacion = requestAnimationFrame(paso);
      else animacion = null;
    };
    animacion = requestAnimationFrame(paso);
  };

  // Cualquier enlace interno usa este desplazamiento.
  document.addEventListener('click', e => {
    const enlace = e.target.closest('a[href^="#"]');
    if (!enlace) return;

    const id = enlace.getAttribute('href').slice(1);
    const destino = id && document.getElementById(id);
    if (!destino) return;

    e.preventDefault();
    history.replaceState(null, '', `#${id}`);

    if (quietud.matches) destino.scrollIntoView();
    else irA(destino);
  });

  // Si la persona toma el control, la animación se detiene.
  ['wheel', 'touchstart', 'keydown'].forEach(evento =>
    addEventListener(evento, () => {
      if (animacion) { cancelAnimationFrame(animacion); animacion = null; }
    }, { passive: true })
  );

  // Los filtros de la carta comparten el mismo desplazamiento.
  window.amakiIrA = irA;
})();
