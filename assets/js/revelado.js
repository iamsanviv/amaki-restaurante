/* Revela los bloques .rev cuando entran en pantalla.
   Si el visitante pide menos movimiento, se muestran de una vez. */

(() => {
  const bloques = document.querySelectorAll('.rev');
  if (!bloques.length) return;

  const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (sinMovimiento || !('IntersectionObserver' in window)) {
    bloques.forEach(el => (el.dataset.visible = 'si'));
    return;
  }

  const ojo = new IntersectionObserver(entradas => {
    for (const e of entradas) {
      if (!e.isIntersecting) continue;
      e.target.dataset.visible = 'si';
      ojo.unobserve(e.target);
    }
  }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });

  bloques.forEach(el => ojo.observe(el));
})();
