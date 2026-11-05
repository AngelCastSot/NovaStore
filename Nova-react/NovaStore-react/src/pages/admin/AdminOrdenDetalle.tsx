import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Boton from "../../components/Boton";
import EncabezadoAdmin from "../../components/EncabezadoAdmin";
import { guardarOrdenes, obtenerOrdenes } from "../../data/almacenamiento";
import { ESTADOS_ORDEN, type EstadoOrden } from "../../data/Orden";
import { formatearCLP, formatearFecha } from "../../formato";

function AdminOrdenDetalle() {
  const { id } = useParams();

  const [orden, setOrden] = useState(() => obtenerOrdenes().find((o) => o.id === id));
  // Estado elegido en el select (todavía no guardado hasta apretar "Actualizar")
  const [estado, setEstado] = useState<EstadoOrden>(orden?.estado ?? "pendiente");

  const volver = (
    <Link to="/admin/ordenes" className="btn btn-outline-primary">
      Volver a órdenes
    </Link>
  );

  if (!orden) {
    return (
      <>
        <EncabezadoAdmin titulo="Detalle de la orden" subtitulo="Orden no encontrada.">
          {volver}
        </EncabezadoAdmin>
        <p>No encontramos esa orden.</p>
      </>
    );
  }

  const actualizarEstado = () => {
    // Guardamos todas las órdenes, cambiando solo el estado de esta
    guardarOrdenes(
      obtenerOrdenes().map((o) => (o.id === orden.id ? { ...o, estado } : o)),
    );
    setOrden({ ...orden, estado });
  };

  return (
    <>
      <EncabezadoAdmin
        titulo="Detalle de la orden"
        subtitulo={orden.id + " · " + formatearFecha(orden.fecha)}
      >
        {volver}
      </EncabezadoAdmin>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="row g-4 mb-4">
            <div className="col-12 col-md-6">
              <h2 className="h6">Cliente</h2>
              <p className="mb-0">{orden.clienteNombre}</p>
              <p className="mb-0 small">{orden.clienteCorreo || "Sin correo"}</p>
              <p className="mb-0 small">RUN: {orden.clienteRun || "—"}</p>
            </div>
            <div className="col-12 col-md-6">
              <h2 className="h6">Estado</h2>
              <div className="d-flex flex-wrap gap-2 align-items-center">
                <select
                  className="form-select w-auto text-capitalize"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value as EstadoOrden)}
                >
                  {ESTADOS_ORDEN.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
                <Boton alHacerClic={actualizarEstado}>Actualizar</Boton>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th scope="col">Producto</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {orden.items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <span className="d-flex align-items-center gap-2">
                        <img
                          src={"/img/" + item.imagen}
                          alt=""
                          className="admin-miniatura"
                        />
                        {item.nombre}
                      </span>
                    </td>
                    <td>{formatearCLP(item.precio)}</td>
                    <td>{item.cantidad}</td>
                    <td>{formatearCLP(item.precio * item.cantidad)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan={3} className="text-end">
                    Total
                  </th>
                  <th>{formatearCLP(orden.total)}</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminOrdenDetalle;
