/* Filtros de la carta: al pulsar un chip se baja al grupo,
   y al desplazarse el chip activo sigue al grupo visible. */

(() => {
  const chips = [...document.querySelectorAll('.chip')];
  if (!chips.length) return;

  const grupos = chips.map(c => document.getElementById(c.dataset.ir));
  const marcar = indice =>
    chips.forEach((c, i) => c.setAttribute('aria-selected', String(i === indice)));

  chips.forEach((chip, i) => {
    chip.addEventListener('click', () => {
      marcar(i);
      grupos[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const vigia = new IntersectionObserver(entradas => {
    for (const e of entradas) {
      if (!e.isIntersecting) continue;
      const i = grupos.indexOf(e.target);
      if (i > -1) marcar(i);
    }
  }, { rootMargin: '-20% 0px -70% 0px' });

  grupos.forEach(g => g && vigia.observe(g));
})();
