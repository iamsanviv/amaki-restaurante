/* Tema claro / oscuro y comparador de tipografía del texto corrido.
   Ambos escriben un data-attribute en <html>; el CSS hace el resto. */

(() => {
  const raiz = document.documentElement;

  const alternar = (boton, atributo, valores, etiqueta) => {
    if (!boton) return;
    raiz.dataset[atributo] = valores[0];
    boton.addEventListener('click', () => {
      const actual = raiz.dataset[atributo];
      const siguiente = actual === valores[0] ? valores[1] : valores[0];
      raiz.dataset[atributo] = siguiente;
      boton.textContent = etiqueta(siguiente);
    });
  };

  alternar(
    document.getElementById('btn-tema'),
    'tema', ['claro', 'oscuro'],
    v => (v === 'oscuro' ? 'Tema claro' : 'Tema oscuro')
  );

  alternar(
    document.getElementById('btn-parrafos'),
    'parrafos', ['nourd', 'mignon'],
    v => (v === 'mignon' ? 'Párrafos: Mignon' : 'Párrafos: Nourd')
  );
})();
