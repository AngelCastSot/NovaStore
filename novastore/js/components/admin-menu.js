/* Menú vertical del panel administrativo.
   Cada opción declara qué roles pueden verla. */

const MENU_ADMIN = [
  { id: 'home', texto: 'Panel', href: 'home.html', roles: ['administrador', 'vendedor'] },
  { id: 'productos', texto: 'Productos', href: 'productos.html', roles: ['administrador', 'vendedor'] },
  { id: 'ordenes', texto: 'Órdenes', href: 'ordenes.html', roles: ['administrador', 'vendedor'] },
  { id: 'usuarios', texto: 'Usuarios', href: 'usuarios.html', roles: ['administrador'] }
];

function esAdministrador() {
  return Auth.tieneRol(ROLES.ADMINISTRADOR);
}

function pintarMenuAdmin(activo) {
  const sesion = Auth.obtenerSesion();
  if (!sesion) return;

  const lista = document.querySelector('[data-menu-admin]');
  if (lista) {
    lista.innerHTML = MENU_ADMIN
      .filter((opcion) => opcion.roles.includes(sesion.tipoUsuario))
      .map((opcion) => `
        <li>
          <a href="${opcion.href}" class="${opcion.id === activo ? 'activo' : ''}"
            ${opcion.id === activo ? 'aria-current="page"' : ''}>${opcion.texto}</a>
        </li>`)
      .join('');
  }

  const datos = document.querySelector('[data-usuario-admin]');
  if (datos) {
    datos.innerHTML = `
      <span class="d-block fw-semibold">${sesion.nombre}</span>
      <span class="d-block small text-capitalize" style="color:#A9B0AA;">${sesion.tipoUsuario}</span>`;
  }

  const salir = document.querySelector('[data-salir]');
  if (salir) {
    salir.addEventListener('click', () => {
      Auth.cerrarSesion();
      window.location.href = '../tienda/login.html';
    });
  }
}

/* Oculta los controles de escritura cuando el usuario no es administrador. */
function aplicarPermisosEscritura() {
  if (esAdministrador()) return;
  document.querySelectorAll('[data-solo-admin]').forEach((el) => el.remove());
}
