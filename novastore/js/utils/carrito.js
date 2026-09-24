function obtenerCarrito() {
  return Storage.obtener(STORAGE_KEYS.CARRITO, []);
}

function guardarCarrito(carrito) {
  Storage.guardar(STORAGE_KEYS.CARRITO, carrito);
}

function obtenerProductoPorId(id) {
  const productos = Storage.obtener(STORAGE_KEYS.PRODUCTOS, PRODUCTOS);
  return productos.find((producto) => producto.id === id);
}

function agregarProductoAlCarrito(idProducto, cantidad) {
  const producto = obtenerProductoPorId(idProducto);
  if (!producto) return { ok: false, mensaje: 'Producto no encontrado.' };
  if (producto.stock <= 0) return { ok: false, mensaje: 'Producto sin stock disponible.' };

  const carrito = obtenerCarrito();
  const itemExistente = carrito.find((item) => item.id === idProducto);
  const cantidadActual = itemExistente ? itemExistente.cantidad : 0;
  const cantidadFinal = cantidadActual + cantidad;

  if (cantidadFinal > producto.stock) {
    return { ok: false, mensaje: `Solo quedan ${producto.stock} unidades disponibles.` };
  }

  if (itemExistente) {
    itemExistente.cantidad = cantidadFinal;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad
    });
  }

  guardarCarrito(carrito);
  return { ok: true };
}

function actualizarCantidadCarrito(idProducto, nuevaCantidad) {
  const producto = obtenerProductoPorId(idProducto);
  const carrito = obtenerCarrito();
  const item = carrito.find((item) => item.id === idProducto);
  if (!item) return { ok: false };

  if (nuevaCantidad <= 0) {
    return eliminarDelCarrito(idProducto);
  }

  if (producto && nuevaCantidad > producto.stock) {
    return { ok: false, mensaje: `Solo quedan ${producto.stock} unidades disponibles.` };
  }

  item.cantidad = nuevaCantidad;
  guardarCarrito(carrito);
  return { ok: true };
}

function eliminarDelCarrito(idProducto) {
  const carrito = obtenerCarrito().filter((item) => item.id !== idProducto);
  guardarCarrito(carrito);
  return { ok: true };
}

function vaciarCarrito() {
  guardarCarrito([]);
}

function calcularTotalCarrito() {
  return obtenerCarrito().reduce((total, item) => total + item.precio * item.cantidad, 0);
}
