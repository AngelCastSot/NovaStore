import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Boton from "../../components/Boton";
import EncabezadoAdmin from "../../components/EncabezadoAdmin";
import { guardarUsuarios, obtenerUsuarios } from "../../data/almacenamiento";
import { REGIONES } from "../../data/Region";
import type { Sesion } from "../../data/Usuario";

interface Props {
  sesion: Sesion | null;
}

function AdminUsuarios({ sesion }: Props) {
  const [usuarios, setUsuarios] = useState(obtenerUsuarios);
  const [texto, setTexto] = useState("");
  const [tipo, setTipo] = useState("todos");

  // Solo el administrador puede ver esta página
  if (sesion?.tipoUsuario !== "administrador") {
    return <Navigate to="/admin" replace />;
  }

  const busqueda = texto.trim().toLowerCase();
  const lista = usuarios.filter((u) => {
    const coincideTexto =
      u.run.toLowerCase().includes(busqueda) ||
      (u.nombre + " " + u.apellidos).toLowerCase().includes(busqueda) ||
      u.correo.toLowerCase().includes(busqueda);
    const coincideTipo = tipo === "todos" || u.tipoUsuario === tipo;
    return coincideTexto && coincideTipo;
  });

  const eliminar = (run: string) => {
    if (!confirm("¿Eliminar esta cuenta?")) return;
    const restantes = usuarios.filter((u) => u.run !== run);
    guardarUsuarios(restantes);
    setUsuarios(restantes);
  };

  return (
    <>
      <EncabezadoAdmin
        titulo="Usuarios"
        subtitulo="Mantenedor de las cuentas del sistema."
      >
        <Link to="/admin/usuarios/nuevo" className="btn btn-primary">
          Nuevo usuario
        </Link>
      </EncabezadoAdmin>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6 col-lg-4">
          <label className="form-label fw-semibold" htmlFor="buscador">
            Buscar
          </label>
          <input
            type="search"
            id="buscador"
            className="form-control"
            placeholder="RUN, nombre o correo"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <label className="form-label fw-semibold" htmlFor="filtroTipo">
            Tipo de usuario
          </label>
          <select
            id="filtroTipo"
            className="form-select"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="administrador">Administrador</option>
            <option value="vendedor">Vendedor</option>
            <option value="cliente">Cliente</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table align-middle bg-white">
          <thead>
            <tr>
              <th scope="col">RUN</th>
              <th scope="col">Nombre</th>
              <th scope="col">Correo</th>
              <th scope="col">Tipo</th>
              <th scope="col">Región / Comuna</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {lista.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No hay usuarios con esos filtros.
                </td>
              </tr>
            ) : (
              lista.map((u) => {
                const nombreRegion =
                  REGIONES.find((r) => r.id === u.region)?.nombre ?? "—";
                return (
                  <tr key={u.run}>
                    <td>{u.run}</td>
                    <td>
                      {u.nombre} {u.apellidos}
                    </td>
                    <td>{u.correo}</td>
                    <td>
                      <span className="badge text-bg-light text-capitalize">
                        {u.tipoUsuario}
                      </span>
                    </td>
                    <td className="small">
                      {nombreRegion}
                      {u.comuna ? " / " + u.comuna : ""}
                    </td>
                    <td>
                      <div className="admin-acciones-tabla">
                        <Link
                          to={"/admin/usuarios/" + u.run + "/editar"}
                          className="btn btn-outline-primary"
                        >
                          Editar
                        </Link>
                        {/* Nadie puede eliminar su propia cuenta */}
                        <Boton
                          clase="btn btn-outline-danger"
                          desactivado={sesion.run === u.run}
                          titulo={
                            sesion.run === u.run
                              ? "No puedes eliminar tu propia cuenta"
                              : undefined
                          }
                          alHacerClic={() => eliminar(u.run)}
                        >
                          Eliminar
                        </Boton>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminUsuarios;
