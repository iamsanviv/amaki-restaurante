/* La barra superior se vuelve sólida y muestra la marca
   en cuanto la portada deja de estar a la vista. */

(() => {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const actualizar = () => {
    nav.dataset.fijo = window.scrollY > 60 ? 'si' : 'no';
  };

  actualizar();
  window.addEventListener('scroll', actualizar, { passive: true });
})();
