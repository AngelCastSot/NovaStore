import { useState } from "react";
import { Navigate, NavLink, Outlet, Link } from "react-router-dom";
import type { Sesion, TipoUsuario } from "../data/Usuario";
import Boton from "./Boton";
import Contenedor from "./Contenedor";

// Opciones del menú lateral; cada una indica qué perfiles la pueden ver
interface OpcionMenu {
  texto: string;
  ruta: string;
  roles: TipoUsuario[];
}

const MENU_ADMIN: OpcionMenu[] = [
  { texto: "Panel", ruta: "/admin", roles: ["administrador", "vendedor"] },
  { texto: "Productos", ruta: "/admin/productos", roles: ["administrador", "vendedor"] },
  { texto: "Órdenes", ruta: "/admin/ordenes", roles: ["administrador", "vendedor"] },
  { texto: "Usuarios", ruta: "/admin/usuarios", roles: ["administrador"] },
];

interface Props {
  sesion: Sesion | null;
  cerrarSesion: () => void;
}

// Estructura común del panel de administración: menú lateral + la página en <Outlet />
function LayoutAdmin({ sesion, cerrarSesion }: Props) {
  // En celulares el menú lateral se abre y se cierra con este estado
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Protección: si no hay sesión, o es un cliente, lo mandamos al login
  if (sesion === null || sesion.tipoUsuario === "cliente") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="layout-admin">
      <nav
        className={"admin-sidebar offcanvas-lg offcanvas-start" + (menuAbierto ? " show" : "")}
        aria-label="Menú del administrador"
      >
        <div className="offcanvas-header d-lg-none">
          <span className="fw-bold">Menú</span>
          <Boton
            clase="btn-close btn-close-white"
            etiqueta="Cerrar menú"
            alHacerClic={() => setMenuAbierto(false)}
          />
        </div>

        <div className="offcanvas-body d-flex flex-column">
          <Link to="/admin" className="d-block mb-4">
            <img
              src="/img/marca/logo-blanco.png"
              alt="NovaStore"
              style={{ height: "44px", width: "auto" }}
            />
          </Link>

          <ul className="admin-sidebar__lista">
            {/* Solo mostramos las opciones permitidas para el perfil de quien inició sesión */}
            {MENU_ADMIN.filter((opcion) => opcion.roles.includes(sesion.tipoUsuario)).map(
              (opcion) => (
                <li key={opcion.ruta}>
                  <NavLink
                    to={opcion.ruta}
                    end={opcion.ruta === "/admin"}
                    className={({ isActive }) => (isActive ? "activo" : "")}
                    onClick={() => setMenuAbierto(false)}
                  >
                    {opcion.texto}
                  </NavLink>
                </li>
              ),
            )}
          </ul>

          <div className="mt-auto pt-4">
            <p className="mb-2 admin-sidebar__usuario">
              <span className="d-block fw-semibold">{sesion.nombre}</span>
              <span className="d-block small text-capitalize" style={{ color: "#A9B0AA" }}>
                {sesion.tipoUsuario}
              </span>
            </p>
            <Link to="/" className="d-block small mb-2">
              Ver la tienda
            </Link>
            {/* Al cerrar sesión, esta misma página nos redirige al login (ver el if de arriba) */}
            <Boton
              clase="btn btn-outline-light btn-sm w-100 admin-sidebar__salir"
              alHacerClic={cerrarSesion}
            >
              Cerrar sesión
            </Boton>
          </div>
        </div>
      </nav>

      <Contenedor clase="admin-contenido">
        <Boton
          clase="btn btn-dark d-lg-none mb-3"
          alHacerClic={() => setMenuAbierto(true)}
        >
          &#9776; Menú
        </Boton>
        <Outlet />
      </Contenedor>
    </div>
  );
}

export default LayoutAdmin;
