import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutAdmin from "./components/LayoutAdmin";
import LayoutTienda from "./components/LayoutTienda";
import {
  guardarCarrito,
  guardarSesion,
  obtenerCarrito,
  obtenerProductos,
  obtenerSesion,
} from "./data/almacenamiento";
import type { ItemCarrito } from "./data/Orden";
import type { Sesion, Usuario } from "./data/Usuario";
// Páginas de la tienda
import BlogDetalle from "./pages/BlogDetalle";
import Blogs from "./pages/Blogs";
import Carrito from "./pages/Carrito";
import Contacto from "./pages/Contacto";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoEncontrado from "./pages/NoEncontrado";
import Nosotros from "./pages/Nosotros";
import ProductoDetalle from "./pages/ProductoDetalle";
import Productos from "./pages/Productos";
import Registro from "./pages/Registro";
// Páginas del panel de administración
import AdminHome from "./pages/admin/AdminHome";
import AdminOrdenDetalle from "./pages/admin/AdminOrdenDetalle";
import AdminOrdenes from "./pages/admin/AdminOrdenes";
import AdminProductoDetalle from "./pages/admin/AdminProductoDetalle";
import AdminProductoForm from "./pages/admin/AdminProductoForm";
import AdminProductos from "./pages/admin/AdminProductos";
import AdminUsuarioForm from "./pages/admin/AdminUsuarioForm";
import AdminUsuarios from "./pages/admin/AdminUsuarios";

function App() {
  // Estos dos datos los necesitan varias páginas y el Navbar,
  // por eso viven aquí en App y se los pasamos a los demás por props.
  const [carrito, setCarrito] = useState<ItemCarrito[]>(obtenerCarrito);
  const [sesion, setSesion] = useState<Sesion | null>(obtenerSesion);

  // ---------- Carrito ----------
  // Cambia el carrito en pantalla (estado) y también lo guarda en el localStorage
  function actualizarCarrito(nuevoCarrito: ItemCarrito[]) {
    setCarrito(nuevoCarrito);
    guardarCarrito(nuevoCarrito);
  }

  // Devuelve true si pudo agregar el producto; si no, avisa el motivo y devuelve false
  function agregarAlCarrito(id: string, cantidad: number): boolean {
    const producto = obtenerProductos().find((p) => p.id === id);
    if (!producto) {
      alert("Producto no encontrado.");
      return false;
    }
    if (producto.stock <= 0) {
      alert("Producto sin stock disponible.");
      return false;
    }

    const existente = carrito.find((item) => item.id === id);
    const cantidadFinal = (existente ? existente.cantidad : 0) + cantidad;
    if (cantidadFinal > producto.stock) {
      alert(`Solo quedan ${producto.stock} unidades disponibles.`);
      return false;
    }

    if (existente) {
      // Ya estaba en el carrito: solo cambiamos su cantidad
      actualizarCarrito(
        carrito.map((item) =>
          item.id === id ? { ...item, cantidad: cantidadFinal } : item,
        ),
      );
    } else {
      // Producto nuevo en el carrito
      actualizarCarrito([
        ...carrito,
        {
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          imagen: producto.imagen,
          cantidad,
        },
      ]);
    }
    return true;
  }

  function quitarDelCarrito(id: string) {
    actualizarCarrito(carrito.filter((item) => item.id !== id));
  }

  function cambiarCantidad(id: string, nuevaCantidad: number) {
    // Si la cantidad baja a 0, el producto sale del carrito
    if (nuevaCantidad <= 0) {
      quitarDelCarrito(id);
      return;
    }
    const producto = obtenerProductos().find((p) => p.id === id);
    if (producto && nuevaCantidad > producto.stock) {
      alert(`Solo quedan ${producto.stock} unidades disponibles.`);
      return;
    }
    actualizarCarrito(
      carrito.map((item) =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item,
      ),
    );
  }

  function vaciarCarrito() {
    actualizarCarrito([]);
  }

  // ---------- Sesión ----------
  function iniciarSesion(usuario: Usuario) {
    // Guardamos solo lo necesario (nunca la contraseña)
    const nuevaSesion: Sesion = {
      run: usuario.run,
      nombre: usuario.nombre,
      correo: usuario.correo,
      tipoUsuario: usuario.tipoUsuario,
    };
    setSesion(nuevaSesion);
    guardarSesion(nuevaSesion);
  }

  function cerrarSesion() {
    setSesion(null);
    guardarSesion(null);
  }

  // Número que aparece en el globito rojo del carrito
  const cantidadCarrito = carrito.reduce(
    (total, item) => total + item.cantidad,
    0,
  );

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas de la tienda: todas comparten Navbar + pie de página */}
        <Route
          element={
            <LayoutTienda
              cantidadCarrito={cantidadCarrito}
              sesion={sesion}
              cerrarSesion={cerrarSesion}
            />
          }
        >
          <Route
            path="/"
            element={<Home agregarAlCarrito={agregarAlCarrito} />}
          />
          <Route
            path="/productos"
            element={<Productos agregarAlCarrito={agregarAlCarrito} />}
          />
          <Route
            path="/productos/:id"
            element={<ProductoDetalle agregarAlCarrito={agregarAlCarrito} />}
          />
          <Route
            path="/carrito"
            element={
              <Carrito
                carrito={carrito}
                sesion={sesion}
                cambiarCantidad={cambiarCantidad}
                quitarDelCarrito={quitarDelCarrito}
                vaciarCarrito={vaciarCarrito}
              />
            }
          />
          <Route
            path="/login"
            element={<Login iniciarSesion={iniciarSesion} />}
          />
          <Route path="/registro" element={<Registro />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogDetalle />} />
          {/* "*" significa: cualquier otra dirección */}
          <Route path="*" element={<NoEncontrado />} />
        </Route>

        {/* Rutas del panel de administración: comparten el menú lateral (LayoutAdmin) */}
        <Route
          path="/admin"
          element={<LayoutAdmin sesion={sesion} cerrarSesion={cerrarSesion} />}
        >
          <Route index element={<AdminHome sesion={sesion} />} />
          <Route
            path="productos"
            element={<AdminProductos sesion={sesion} />}
          />
          <Route
            path="productos/nuevo"
            element={<AdminProductoForm sesion={sesion} />}
          />
          <Route
            path="productos/:id"
            element={<AdminProductoDetalle sesion={sesion} />}
          />
          <Route
            path="productos/:id/editar"
            element={<AdminProductoForm sesion={sesion} />}
          />
          <Route path="ordenes" element={<AdminOrdenes />} />
          <Route path="ordenes/:id" element={<AdminOrdenDetalle />} />
          <Route path="usuarios" element={<AdminUsuarios sesion={sesion} />} />
          <Route
            path="usuarios/nuevo"
            element={<AdminUsuarioForm sesion={sesion} />}
          />
          <Route
            path="usuarios/:run/editar"
            element={<AdminUsuarioForm sesion={sesion} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
