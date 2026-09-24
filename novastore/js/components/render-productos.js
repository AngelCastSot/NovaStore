const RUTA_ASSETS = typeof window.RUTA_ASSETS_BASE === 'string' ? window.RUTA_ASSETS_BASE : 'assets/img/';

function formatearCLP(valor) {
  if (valor === 0) return 'Gratis';
  return valor.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });
}

function crearTarjetaProducto(producto, urlDetalleBase) {
  const esGratis = producto.precio === 0;
  const stockCriticoAlcanzado = producto.stockCritico !== undefined
    && producto.stockCritico !== null
    && producto.stock <= producto.stockCritico;

  const badges = [
    esGratis ? '<span class="badge text-bg-success">Gratis</span>' : '',
    stockCriticoAlcanzado ? '<span class="badge text-bg-warning">Stock bajo</span>' : ''
  ].join(' ');

  const rutaImagen = RUTA_ASSETS + producto.imagen;

  return `
    <div class="col">
      <article class="card h-100 shadow-sm tarjeta-producto" data-producto-id="${producto.id}">
        <a href="${urlDetalleBase}?id=${producto.id}" class="text-decoration-none">
          <img src="${rutaImagen}" class="card-img-top" alt="${producto.nombre}" loading="lazy">
        </a>
        <div class="card-body d-flex flex-column">
          <div class="mb-2">${badges}</div>
          <a href="${urlDetalleBase}?id=${producto.id}" class="card-title fw-semibold text-body text-decoration-none">${producto.nombre}</a>
          <p class="fw-bold fs-5 mb-3 mt-2 text-marca">${formatearCLP(producto.precio)}</p>
          <button type="button" class="btn btn-primary mt-auto" data-agregar-carrito="${producto.id}">
            Añadir al carrito
          </button>
        </div>
      </article>
    </div>
  `;
}

function renderizarGrillaProductos(contenedorSelector, productos, urlDetalleBase) {
  const contenedor = document.querySelector(contenedorSelector);
  if (!contenedor) return;
  contenedor.innerHTML = productos
    .map((producto) => crearTarjetaProducto(producto, urlDetalleBase))
    .join('');

  contenedor.querySelectorAll('[data-agregar-carrito]').forEach((boton) => {
    boton.addEventListener('click', () => {
      const id = boton.getAttribute('data-agregar-carrito');
      const resultado = agregarProductoAlCarrito(id, 1);
      if (!resultado.ok) {
        alert(resultado.mensaje);
        return;
      }
      pintarContadorCarrito();
      boton.textContent = 'Añadido ✓';
      setTimeout(() => { boton.textContent = 'Añadir al carrito'; }, 1200);
    });
  });
}
