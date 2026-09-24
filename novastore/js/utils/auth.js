const ROLES = {
  ADMINISTRADOR: 'administrador',
  VENDEDOR: 'vendedor',
  CLIENTE: 'cliente'
};

const Auth = {
  iniciarSesion(usuario) {
    const sesion = {
      run: usuario.run,
      nombre: usuario.nombre,
      correo: usuario.correo,
      tipoUsuario: usuario.tipoUsuario
    };
    Storage.guardar(STORAGE_KEYS.SESION, sesion);
  },

  cerrarSesion() {
    Storage.eliminar(STORAGE_KEYS.SESION);
  },

  obtenerSesion() {
    return Storage.obtener(STORAGE_KEYS.SESION, null);
  },

  estaAutenticado() {
    return this.obtenerSesion() !== null;
  },

  tieneRol(...rolesPermitidos) {
    const sesion = this.obtenerSesion();
    if (!sesion) return false;
    return rolesPermitidos.includes(sesion.tipoUsuario);
  },

  protegerVistaAdmin() {
    const sesion = this.obtenerSesion();
    if (!sesion || !this.tieneRol(ROLES.ADMINISTRADOR, ROLES.VENDEDOR)) {
      window.location.href = '../tienda/login.html';
    }
  },

  protegerSoloAdministrador() {
    const sesion = this.obtenerSesion();
    if (!sesion || !this.tieneRol(ROLES.ADMINISTRADOR)) {
      window.location.href = 'home.html';
    }
  }
};
