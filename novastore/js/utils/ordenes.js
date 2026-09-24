/* Órdenes de compra: se crean al finalizar el carrito y las revisa
   el administrador o el vendedor desde el panel. */

const ESTADOS_ORDEN = ['pendiente', 'preparando', 'enviada', 'entregada'];

function obtenerOrdenes() {
  return Storage.obtener(STORAGE_KEYS.ORDENES, []);
}

function guardarOrdenes(ordenes) {
  Storage.guardar(STORAGE_KEYS.ORDENES, ordenes);
}

function obtenerOrdenPorId(id) {
  return obtenerOrdenes().find((orden) => orden.id === id);
}

function generarNumeroOrden() {
  const cantidad = obtenerOrdenes().length + 1;
  return 'ORD-' + String(cantidad).padStart(4, '0');
}

/* Crea la orden a partir del carrito actual y descuenta el stock. */
function crearOrdenDesdeCarrito(sesion) {
  const carrito = obtenerCarrito();
  if (carrito.length === 0) return { ok: false, mensaje: 'El carrito está vacío.' };

  const productos = Storage.obtener(STORAGE_KEYS.PRODUCTOS, PRODUCTOS);

  for (const item of carrito) {
    const producto = productos.find((p) => p.id === item.id);
    if (!producto) return { ok: false, mensaje: `El producto ${item.nombre} ya no está disponible.` };
    if (producto.stock < item.cantidad) {
      return { ok: false, mensaje: `Solo quedan ${producto.stock} unidades de ${producto.nombre}.` };
    }
  }

  carrito.forEach((item) => {
    const producto = productos.find((p) => p.id === item.id);
    producto.stock -= item.cantidad;
  });
  Storage.guardar(STORAGE_KEYS.PRODUCTOS, productos);

  const orden = {
    id: generarNumeroOrden(),
    fecha: new Date().toISOString(),
    clienteRun: sesion ? sesion.run : '',
    clienteNombre: sesion ? sesion.nombre : 'Invitado',
    clienteCorreo: sesion ? sesion.correo : '',
    estado: 'pendiente',
    items: carrito.map((item) => ({
      id: item.id,
      nombre: item.nombre,
      precio: item.precio,
      cantidad: item.cantidad,
      imagen: item.imagen
    })),
    total: carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0)
  };

  const ordenes = obtenerOrdenes();
  ordenes.unshift(orden);
  guardarOrdenes(ordenes);
  vaciarCarrito();

  return { ok: true, orden };
}

function cambiarEstadoOrden(id, estado) {
  const ordenes = obtenerOrdenes();
  const orden = ordenes.find((item) => item.id === id);
  if (!orden) return { ok: false };
  orden.estado = estado;
  guardarOrdenes(ordenes);
  return { ok: true };
}

function formatearFecha(iso) {
  const fecha = new Date(iso);
  return fecha.toLocaleDateString('es-CL') + ' ' + fecha.toLocaleTimeString('es-CL', {
    hour: '2-digit',
    minute: '2-digit'
  });
}
