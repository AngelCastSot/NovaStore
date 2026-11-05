import { useState } from "react";
import { Link } from "react-router-dom";
import Boton from "../../components/Boton";
import EncabezadoAdmin from "../../components/EncabezadoAdmin";
import { guardarProductos, obtenerProductos } from "../../data/almacenamiento";
import { CATEGORIAS } from "../../data/Producto";
import type { Sesion } from "../../data/Usuario";
import { formatearCLP } from "../../formato";

interface Props {
  sesion: Sesion | null;
}

function AdminProductos({ sesion }: Props) {
  const [productos, setProductos] = useState(obtenerProductos);
  const [texto, setTexto] = useState("");
  const [categoria, setCategoria] = useState("todas");

  // El vendedor solo puede ver; el administrador puede crear, editar y eliminar
  const puedeEditar = sesion?.tipoUsuario === "administrador";

  const busqueda = texto.trim().toLowerCase();
  const lista = productos.filter((p) => {
    const coincideTexto =
      p.nombre.toLowerCase().includes(busqueda) ||
      p.codigo.toLowerCase().includes(busqueda);
    const coincideCategoria = categoria === "todas" || p.categoria === categoria;
    return coincideTexto && coincideCategoria;
  });

  function nombreCategoria(id: string): string {
    return CATEGORIAS.find((c) => c.id === id)?.nombre ?? id;
  }

  function eliminar(id: string) {
    if (!confirm("¿Eliminar este producto del catálogo?")) return;
    const restantes = productos.filter((p) => p.id !== id);
    guardarProductos(restantes); // lo guardamos en el localStorage
    setProductos(restantes); // y actualizamos la pantalla
  }

  return (
    <>
      <EncabezadoAdmin
        titulo="Productos"
        subtitulo="Mantenedor del catálogo de la tienda."
      >
        {puedeEditar && (
          <Link to="/admin/productos/nuevo" className="btn btn-primary">
            Nuevo producto
          </Link>
        )}
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
            placeholder="Código o nombre"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <label className="form-label fw-semibold" htmlFor="filtroCategoria">
            Categoría
          </label>
          <select
            id="filtroCategoria"
            className="form-select"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="todas">Todas las categorías</option>
            {CATEGORIAS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table align-middle bg-white">
          <thead>
            <tr>
              <th scope="col">Imagen</th>
              <th scope="col">Código</th>
              <th scope="col">Nombre</th>
              <th scope="col">Categoría</th>
              <th scope="col">Precio</th>
              <th scope="col">Stock</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {lista.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No hay productos con esos filtros.
                </td>
              </tr>
            ) : (
              lista.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img src={"/img/" + p.imagen} alt="" className="admin-miniatura" />
                  </td>
                  <td>{p.codigo}</td>
                  <td>{p.nombre}</td>
                  <td>{nombreCategoria(p.categoria)}</td>
                  <td>{formatearCLP(p.precio)}</td>
                  <td>
                    {p.stock <= (p.stockCritico ?? 0) ? (
                      <span className="badge text-bg-warning">{p.stock}</span>
                    ) : (
                      p.stock
                    )}
                  </td>
                  <td>
                    <div className="admin-acciones-tabla">
                      <Link
                        to={"/admin/productos/" + p.id}
                        className="btn btn-outline-secondary"
                      >
                        Ver
                      </Link>
                      {puedeEditar && (
                        <>
                          <Link
                            to={"/admin/productos/" + p.id + "/editar"}
                            className="btn btn-outline-primary"
                          >
                            Editar
                          </Link>
                          <Boton
                            clase="btn btn-outline-danger"
                            alHacerClic={() => eliminar(p.id)}
                          >
                            Eliminar
                          </Boton>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminProductos;
