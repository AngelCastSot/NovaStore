const STORAGE_KEYS = {
  CARRITO: 'novastore_carrito',
  USUARIOS: 'novastore_usuarios',
  PRODUCTOS: 'novastore_productos',
  SESION: 'novastore_sesion',
  ORDENES: 'novastore_ordenes'
};

/*
  Respaldo para cuando el navegador bloquea localStorage (pasa a menudo al
  abrir los archivos con doble clic usando file://, porque algunos
  navegadores tratan cada archivo local como un origen distinto).

  En ese caso, en vez de guardar los datos en un objeto en memoria (que se
  perdía apenas se cambiaba de página), los guardamos serializados en
  "window.name". Esa propiedad pertenece a la PESTAÑA del navegador, no al
  origen del documento, así que sobrevive a la navegación entre páginas
  aunque estés abriendo archivos locales sin servidor. Solo se pierde si
  cierras la pestaña o abres un enlace en una pestaña nueva.
*/
const PREFIJO_RESPALDO = 'NOVASTORE_STORAGE::';

function leerRespaldoDesdeWindowName() {
  try {
    if (typeof window.name === 'string' && window.name.startsWith(PREFIJO_RESPALDO)) {
      return JSON.parse(window.name.slice(PREFIJO_RESPALDO.length));
    }
  } catch (error) {
    /* si el contenido no es válido, se ignora y se parte de cero */
  }
  return {};
}

const memoriaRespaldo = leerRespaldoDesdeWindowName();

function guardarRespaldoEnWindowName() {
  try {
    window.name = PREFIJO_RESPALDO + JSON.stringify(memoriaRespaldo);
  } catch (error) {
    /* si falla, seguimos funcionando solo con memoria para esta página */
  }
}

function hayLocalStorage() {
  try {
    const prueba = '__novastore_test__';
    localStorage.setItem(prueba, '1');
    localStorage.removeItem(prueba);
    return true;
  } catch (error) {
    return false;
  }
}

const USA_LOCALSTORAGE = hayLocalStorage();

const Storage = {
  obtener(key, valorPorDefecto) {
    let raw = null;
    try {
      raw = USA_LOCALSTORAGE ? localStorage.getItem(key) : memoriaRespaldo[key];
    } catch (error) {
      raw = memoriaRespaldo[key];
    }
    if (raw === null || raw === undefined) return valorPorDefecto;
    try {
      return JSON.parse(raw);
    } catch (error) {
      return valorPorDefecto;
    }
  },

  guardar(key, valor) {
    const texto = JSON.stringify(valor);
    memoriaRespaldo[key] = texto;
    if (!USA_LOCALSTORAGE) guardarRespaldoEnWindowName();
    try {
      if (USA_LOCALSTORAGE) localStorage.setItem(key, texto);
    } catch (error) {
      console.warn('No se pudo guardar en localStorage:', key);
    }
  },

  eliminar(key) {
    delete memoriaRespaldo[key];
    if (!USA_LOCALSTORAGE) guardarRespaldoEnWindowName();
    try {
      if (USA_LOCALSTORAGE) localStorage.removeItem(key);
    } catch (error) {
      console.warn('No se pudo eliminar de localStorage:', key);
    }
  },

  disponible() {
    return USA_LOCALSTORAGE;
  }
};

function inicializarUsuarios() {
  const existentes = Storage.obtener(STORAGE_KEYS.USUARIOS, null);
  if (existentes === null) {
    const usuariosBase = [
      {
        run: '111111111',
        nombre: 'Admin',
        apellidos: 'NovaStore',
        correo: 'admin@duoc.cl',
        password: 'admin123',
        fechaNacimiento: '',
        tipoUsuario: 'administrador',
        region: 'metropolitana',
        comuna: 'Santiago',
        direccion: 'Av. Siempre Viva 123'
      },
      {
        run: '222222222',
        nombre: 'Vendedor',
        apellidos: 'Demo',
        correo: 'vendedor@duoc.cl',
        password: 'vend1234',
        fechaNacimiento: '',
        tipoUsuario: 'vendedor',
        region: 'biobio',
        comuna: 'Concepción',
        direccion: 'Calle Comercio 456'
      }
    ];
    Storage.guardar(STORAGE_KEYS.USUARIOS, usuariosBase);
    return usuariosBase;
  }
  return existentes;
}

function inicializarProductos() {
  const existentes = Storage.obtener(STORAGE_KEYS.PRODUCTOS, null);
  if (existentes === null) {
    Storage.guardar(STORAGE_KEYS.PRODUCTOS, PRODUCTOS);
    return PRODUCTOS;
  }
  return existentes;
}
