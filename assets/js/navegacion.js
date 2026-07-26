/* Barra superior: se vuelve sólida al desplazarse y, en móvil,
   abre el menú a pantalla completa. */

(() => {
  const nav = document.getElementById('nav');
  if (!nav) return;

  /* ── Fondo sólido al bajar; el botón de WhatsApp aparece con él ── */
  const wasap = document.getElementById('wasap');
  const actualizar = () => {
    const bajando = window.scrollY > 60;
    nav.dataset.fijo = bajando ? 'si' : 'no';
    if (wasap) wasap.dataset.visible = bajando ? 'si' : 'no';
  };
  actualizar();
  window.addEventListener('scroll', actualizar, { passive: true });

  /* ── Menú móvil ── */
  const boton = document.getElementById('btn-menu');
  const menu = document.getElementById('menu');
  if (!boton || !menu) return;

  const cerrar = () => {
    nav.dataset.menu = 'cerrado';
    boton.setAttribute('aria-expanded', 'false');
    boton.setAttribute('aria-label', 'Abrir el menú');
    document.body.style.overflow = '';
  };

  const abrir = () => {
    nav.dataset.menu = 'abierto';
    boton.setAttribute('aria-expanded', 'true');
    boton.setAttribute('aria-label', 'Cerrar el menú');
    document.body.style.overflow = 'hidden';   // evita el scroll de fondo
  };

  cerrar();

  boton.addEventListener('click', () => {
    nav.dataset.menu === 'abierto' ? cerrar() : abrir();
  });

  // Al elegir una sección, el menú se cierra solo.
  menu.addEventListener('click', e => {
    if (e.target.closest('a')) cerrar();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.dataset.menu === 'abierto') {
      cerrar();
      boton.focus();
    }
  });

  // Si se pasa a pantalla ancha con el menú abierto, se restablece.
  matchMedia('(min-width: 901px)').addEventListener('change', e => {
    if (e.matches) cerrar();
  });
})();
