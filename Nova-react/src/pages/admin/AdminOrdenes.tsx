import { useState } from "react";
import { Link } from "react-router-dom";
import EncabezadoAdmin from "../../components/EncabezadoAdmin";
import { obtenerOrdenes } from "../../data/almacenamiento";
import { ESTADOS_ORDEN } from "../../data/Orden";
import { formatearCLP, formatearFecha } from "../../formato";

function AdminOrdenes() {
  const [filtroEstado, setFiltroEstado] = useState("todos");

  // Solo las órdenes que coinciden con el estado elegido
  const ordenes = obtenerOrdenes().filter(
    (orden) => filtroEstado === "todos" || orden.estado === filtroEstado,
  );

  return (
    <>
      <EncabezadoAdmin
        titulo="Órdenes de compra"
        subtitulo="Pedidos generados desde el carrito de la tienda."
      />

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6 col-lg-4">
          <label className="form-label fw-semibold" htmlFor="filtroEstado">
            Estado
          </label>
          <select
            id="filtroEstado"
            className="form-select text-capitalize"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="todos">Todos</option>
            {ESTADOS_ORDEN.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table align-middle bg-white">
          <thead>
            <tr>
              <th scope="col">N° orden</th>
              <th scope="col">Fecha</th>
              <th scope="col">Cliente</th>
              <th scope="col">Productos</th>
              <th scope="col">Total</th>
              <th scope="col">Estado</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  Todavía no hay órdenes registradas.
                </td>
              </tr>
            ) : (
              ordenes.map((orden) => (
                <tr key={orden.id}>
                  <td>{orden.id}</td>
                  <td className="small">{formatearFecha(orden.fecha)}</td>
                  <td>
                    {orden.clienteNombre}
                    <br />
                    <span className="small">{orden.clienteCorreo}</span>
                  </td>
                  <td>{orden.items.reduce((suma, item) => suma + item.cantidad, 0)}</td>
                  <td>{formatearCLP(orden.total)}</td>
                  <td>
                    <span className="badge text-bg-light text-capitalize">
                      {orden.estado}
                    </span>
                  </td>
                  <td>
                    <div className="admin-acciones-tabla">
                      <Link
                        to={"/admin/ordenes/" + orden.id}
                        className="btn btn-outline-secondary"
                      >
                        Ver detalle
                      </Link>
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

export default AdminOrdenes;
