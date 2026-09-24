const RUTA_TIENDA = typeof window.RUTA_TIENDA_BASE === 'string' ? window.RUTA_TIENDA_BASE : 'pages/tienda/';
const RUTA_ADMIN = typeof window.RUTA_ADMIN_BASE === 'string' ? window.RUTA_ADMIN_BASE : 'pages/admin/';

function contarItemsCarrito() {
  const carrito = Storage.obtener(STORAGE_KEYS.CARRITO, []);
  return carrito.reduce((total, item) => total + item.cantidad, 0);
}

function pintarContadorCarrito() {
  const contador = document.querySelector('[data-carrito-contador]');
  if (!contador) return;
  contador.textContent = contarItemsCarrito();
}

function pintarEstadoSesion() {
  const contenedor = document.querySelector('[data-sesion-area]');
  if (!contenedor) return;

  const sesion = Auth.obtenerSesion();

  if (!sesion) {
    contenedor.innerHTML = `<a class="btn btn-outline-primary btn-sm" href="${RUTA_TIENDA}login.html">Ingresar</a>`;
    return;
  }

  const linkAdmin = sesion.tipoUsuario !== ROLES.CLIENTE
    ? `<a href="${RUTA_ADMIN}home.html" class="text-marca fw-semibold me-2">Panel admin</a>`
    : '';

  contenedor.innerHTML = `
    <span class="d-flex align-items-center gap-2">
      ${linkAdmin}
      <span class="text-body-secondary small">Hola, ${sesion.nombre}</span>
      <button type="button" class="link-boton small" data-cerrar-sesion>Salir</button>
    </span>
  `;

  const botonSalir = contenedor.querySelector('[data-cerrar-sesion]');
  botonSalir.addEventListener('click', () => {
    Auth.cerrarSesion();
    window.location.reload();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  pintarContadorCarrito();
  pintarEstadoSesion();
});
