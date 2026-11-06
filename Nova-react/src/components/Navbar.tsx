import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { PAGINAS } from "../data/Paginas";
import type { Sesion } from "../data/Usuario";
import Boton from "./Boton";

interface Props {
  cantidadCarrito: number; // cuántos productos hay en el carrito
  sesion: Sesion | null; // null = nadie ha iniciado sesión
  cerrarSesion: () => void;
}

function Navbar({ cantidadCarrito, sesion, cerrarSesion }: Props) {
  // En celulares el menú está plegado; este estado dice si está abierto o cerrado
  const [menuAbierto, setMenuAbierto] = useState(false);

  // La primera página de PAGINAS es "Inicio": la usamos también para el logo
  const inicio = PAGINAS[0];

  return (
    <header className="navbar navbar-expand-lg bg-white shadow-sm sticky-top py-3">
      <div className="container">
        <Link
          to={inicio.ruta}
          className="navbar-brand d-flex align-items-center gap-2 fw-bold"
          aria-label={"NovaStore, ir a " + inicio.nombre.toLowerCase()}
        >
          <img
            src="/img/marca/logo.png"
            alt="Logo de NovaStore"
            className="navbar-brand__logo"
          />
        </Link>

        {/* Botón de las "tres rayitas" que abre y cierra el menú en celulares */}
        <Boton
          clase="navbar-toggler"
          etiqueta="Abrir menú"
          alHacerClic={() => setMenuAbierto(!menuAbierto)}
        >
          <span className="navbar-toggler-icon"></span>
        </Boton>

        {/* La clase "show" es la que hace visible el menú plegado */}
        <div
          className={"collapse navbar-collapse" + (menuAbierto ? " show" : "")}
        >
          <ul className="navbar-nav mx-auto gap-lg-3 text-center">
            {/* Un <li> por cada página del arreglo PAGINAS */}
            {PAGINAS.map((pagina) => (
              <li className="nav-item" key={pagina.ruta}>
                {/* NavLink es un Link que agrega la clase "active" a la página actual */}
                <NavLink
                  className="nav-link"
                  to={pagina.ruta}
                  end={pagina.ruta === "/"}
                  onClick={() => setMenuAbierto(false)}
                >
                  {pagina.nombre}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="d-flex flex-wrap align-items-center gap-3 justify-content-center mt-3 mt-lg-0">
            {/* Si no hay sesión mostramos "Ingresar"; si hay, el saludo */}
            {sesion === null ? (
              <Link
                to="/login"
                className="btn btn-outline-primary btn-sm"
                onClick={() => setMenuAbierto(false)}
              >
                Ingresar
              </Link>
            ) : (
              <span className="d-flex align-items-center gap-2">
                {/* Solo administrador y vendedor ven el enlace al panel */}
                {sesion.tipoUsuario !== "cliente" && (
                  <Link to="/admin" className="text-marca fw-semibold me-2">
                    Panel admin
                  </Link>
                )}
                <span className="text-body-secondary small">
                  Hola, {sesion.nombre}
                </span>
                <Boton clase="link-boton small" alHacerClic={cerrarSesion}>
                  Salir
                </Boton>
              </span>
            )}

            <Link
              to="/carrito"
              className="btn btn-outline-primary position-relative"
              onClick={() => setMenuAbierto(false)}
            >
              🛒 Carrito
              <span className="badge rounded-pill text-bg-danger position-absolute top-0 start-100 translate-middle">
                {cantidadCarrito}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
