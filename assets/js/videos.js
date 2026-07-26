/* Videos de Instagram bajo demanda.

   Cada tarjeta muestra una portada propia y solo carga el reproductor
   de Instagram cuando el visitante lo pide. Así la página abre rápido,
   no arrastra los scripts de Meta en cada visita y no se envían datos
   del visitante a Instagram sin que él lo decida. */

(() => {
  const botones = document.querySelectorAll('.clip__abrir');
  if (!botones.length) return;

  /* Si una portada aún no existe, se retira y la tarjeta se queda con su
     fondo de reserva. Así no aparece el icono de imagen rota. */
  document.querySelectorAll('.clip__portada').forEach(img => {
    img.addEventListener('error', () => img.remove(), { once: true });
    if (img.complete && img.naturalWidth === 0) img.remove();
  });

  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      const codigo = boton.dataset.reel;
      const tarjeta = boton.closest('.clip');
      if (!codigo || !tarjeta || tarjeta.dataset.cargado === 'si') return;

      const marco = document.createElement('iframe');
      marco.src = `https://www.instagram.com/reel/${codigo}/embed/`;
      marco.title = boton.getAttribute('aria-label') || 'Video de Instagram';
      marco.loading = 'lazy';
      marco.allow = 'autoplay; clipboard-write; encrypted-media; picture-in-picture';
      marco.allowFullscreen = true;
      marco.referrerPolicy = 'no-referrer-when-downgrade';

      tarjeta.dataset.cargado = 'si';
      boton.replaceWith(marco);
    });
  });
})();
