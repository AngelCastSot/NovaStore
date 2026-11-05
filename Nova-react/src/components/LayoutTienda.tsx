import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import type { Sesion } from "../data/Usuario";
import Navbar from "./Navbar";
import PiePagina from "./PiePagina";

interface Props {
  cantidadCarrito: number;
  sesion: Sesion | null;
  cerrarSesion: () => void;
}

// Estructura común de las páginas de la tienda: Navbar arriba, la página en el medio
// y el pie de página abajo. <Outlet /> es el "hueco" donde React Router
// pone la página que corresponde a la ruta actual.
function LayoutTienda({ cantidadCarrito, sesion, cerrarSesion }: Props) {
  const { pathname } = useLocation();

  // Cada vez que cambia la ruta, volvemos arriba de la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Navbar
        cantidadCarrito={cantidadCarrito}
        sesion={sesion}
        cerrarSesion={cerrarSesion}
      />
      <main>
        <Outlet />
      </main>
      <PiePagina />
    </>
  );
}

export default LayoutTienda;
