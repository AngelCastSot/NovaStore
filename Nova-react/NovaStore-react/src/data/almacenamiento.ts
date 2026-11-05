// Aquí se guardan y leen los datos en el localStorage del navegador.
// Así los productos, usuarios, órdenes, el carrito y la sesión
// no se pierden al recargar la página (no tenemos base de datos real).

import { PRODUCTOS, type Producto } from "./Producto";
import { USUARIOS_INICIALES, type Usuario, type Sesion } from "./Usuario";
import type { ItemCarrito, Orden } from "./Orden";

const CLAVES = {
  carrito: "novastore_carrito",
  usuarios: "novastore_usuarios",
  productos: "novastore_productos",
  sesion: "novastore_sesion",
  ordenes: "novastore_ordenes",
};

// Lee un dato del localStorage. Si no existe, devuelve el valor por defecto.
function leer<T>(clave: string, valorPorDefecto: T): T {
  const texto = localStorage.getItem(clave);
  if (texto === null) return valorPorDefecto;
  try {
    return JSON.parse(texto) as T;
  } catch {
    return valorPorDefecto;
  }
}

// Guarda un dato convirtiéndolo a texto (JSON)
function guardar(clave: string, valor: unknown) {
  localStorage.setItem(clave, JSON.stringify(valor));
}

// ---------- Productos ----------
export function obtenerProductos(): Producto[] {
  return leer(CLAVES.productos, PRODUCTOS);
}
export function guardarProductos(productos: Producto[]) {
  guardar(CLAVES.productos, productos);
}

// ---------- Usuarios ----------
export function obtenerUsuarios(): Usuario[] {
  return leer(CLAVES.usuarios, USUARIOS_INICIALES);
}
export function guardarUsuarios(usuarios: Usuario[]) {
  guardar(CLAVES.usuarios, usuarios);
}

// ---------- Órdenes ----------
export function obtenerOrdenes(): Orden[] {
  return leer(CLAVES.ordenes, []);
}
export function guardarOrdenes(ordenes: Orden[]) {
  guardar(CLAVES.ordenes, ordenes);
}

// ---------- Carrito ----------
export function obtenerCarrito(): ItemCarrito[] {
  return leer(CLAVES.carrito, []);
}
export function guardarCarrito(carrito: ItemCarrito[]) {
  guardar(CLAVES.carrito, carrito);
}

// ---------- Sesión ----------
export function obtenerSesion(): Sesion | null {
  return leer(CLAVES.sesion, null);
}
export function guardarSesion(sesion: Sesion | null) {
  if (sesion === null) {
    localStorage.removeItem(CLAVES.sesion);
  } else {
    guardar(CLAVES.sesion, sesion);
  }
}

// ---------- Compra ----------
// Crea la orden a partir del carrito y descuenta el stock de cada producto.
// Devuelve la orden creada, o un mensaje de error si algo falla.
export function registrarCompra(
  carrito: ItemCarrito[],
  sesion: Sesion,
): { orden?: Orden; error?: string } {
  if (carrito.length === 0) return { error: "El carrito está vacío." };

  const productos = obtenerProductos();

  // 1) Revisamos que todos los productos existan y tengan stock suficiente
  for (const item of carrito) {
    const producto = productos.find((p) => p.id === item.id);
    if (!producto) {
      return { error: `El producto ${item.nombre} ya no está disponible.` };
    }
    if (producto.stock < item.cantidad) {
      return {
        error: `Solo quedan ${producto.stock} unidades de ${producto.nombre}.`,
      };
    }
  }

  // 2) Descontamos el stock
  const productosActualizados = productos.map((p) => {
    const item = carrito.find((i) => i.id === p.id);
    return item ? { ...p, stock: p.stock - item.cantidad } : p;
  });
  guardarProductos(productosActualizados);

  // 3) Creamos la orden y la guardamos al principio de la lista
  const ordenes = obtenerOrdenes();
  const orden: Orden = {
    id: "ORD-" + String(ordenes.length + 1).padStart(4, "0"),
    fecha: new Date().toISOString(),
    clienteRun: sesion.run,
    clienteNombre: sesion.nombre,
    clienteCorreo: sesion.correo,
    estado: "pendiente",
    items: carrito,
    total: carrito.reduce((suma, i) => suma + i.precio * i.cantidad, 0),
  };
  guardarOrdenes([orden, ...ordenes]);

  return { orden };
}
