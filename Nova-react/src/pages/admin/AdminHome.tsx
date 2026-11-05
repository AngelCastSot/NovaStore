import { Link } from "react-router-dom";
import EncabezadoAdmin from "../../components/EncabezadoAdmin";
import {
  obtenerOrdenes,
  obtenerProductos,
  obtenerUsuarios,
} from "../../data/almacenamiento";
import type { Sesion } from "../../data/Usuario";
import { formatearCLP, formatearFecha } from "../../formato";

interface Props {
  sesion: Sesion | null;
}

function AdminHome({ sesion }: Props) {
  const productos = obtenerProductos();
  const ordenes = obtenerOrdenes();
  const usuarios = obtenerUsuarios();

  // Productos cuyo stock llegó (o bajó de) su stock crítico
  const criticos = productos.filter((p) => p.stock <= (p.stockCritico ?? 0));
  const totalStock = productos.reduce((suma, p) => suma + p.stock, 0);

  return (
    <>
      <EncabezadoAdmin
        titulo="Panel de administración"
        subtitulo="Resumen del catálogo, las órdenes y las cuentas registradas."
      >
        <Link to="/admin/productos" className="btn btn-primary">
          Ir a productos
        </Link>
      </EncabezadoAdmin>

      {/* Tarjetas con los números principales */}
      <div className="admin-kpis">
        <div className="admin-kpi">
          <p className="admin-kpi__valor">{productos.length}</p>
          <p className="admin-kpi__label mb-0">Productos en catálogo</p>
        </div>
        <div className="admin-kpi">
          <p className="admin-kpi__valor">{totalStock}</p>
          <p className="admin-kpi__label mb-0">Unidades en stock</p>
        </div>
        <div className="admin-kpi">
          <p className="admin-kpi__valor">{criticos.length}</p>
          <p className="admin-kpi__label mb-0">Productos con stock crítico</p>
        </div>
        <div className="admin-kpi">
          <p className="admin-kpi__valor">{ordenes.length}</p>
          <p className="admin-kpi__label mb-0">Órdenes registradas</p>
        </div>
        {/* Los usuarios solo los ve el administrador */}
        {sesion?.tipoUsuario === "administrador" && (
          <div className="admin-kpi">
            <p className="admin-kpi__valor">{usuarios.length}</p>
            <p className="admin-kpi__label mb-0">Usuarios registrados</p>
          </div>
        )}
      </div>

      <div className="mb-5">
        <h2 className="h5 mb-3">Productos que necesitan reposición</h2>
        <div className="table-responsive">
          <table className="table align-middle bg-white">
            <thead>
              <tr>
                <th scope="col">Código</th>
                <th scope="col">Producto</th>
                <th scope="col">Stock</th>
                <th scope="col">Stock crítico</th>
              </tr>
            </thead>
            <tbody>
              {criticos.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    Todo el catálogo tiene stock suficiente.
                  </td>
                </tr>
              ) : (
                criticos.map((p) => (
                  <tr key={p.id}>
                    <td>{p.codigo}</td>
                    <td>{p.nombre}</td>
                    <td>
                      <span className="badge text-bg-warning">{p.stock}</span>
                    </td>
                    <td>{p.stockCritico ?? "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="h5 mb-3">Últimas órdenes</h2>
        <div className="table-responsive">
          <table className="table align-middle bg-white">
            <thead>
              <tr>
                <th scope="col">N°</th>
                <th scope="col">Fecha</th>
                <th scope="col">Cliente</th>
                <th scope="col">Total</th>
                <th scope="col">Estado</th>
              </tr>
            </thead>
            <tbody>
              {ordenes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    Todavía no hay órdenes de compra.
                  </td>
                </tr>
              ) : (
                // slice(0, 5) = solo las 5 más recientes
                ordenes.slice(0, 5).map((orden) => (
                  <tr key={orden.id}>
                    <td>
                      <Link to={"/admin/ordenes/" + orden.id}>{orden.id}</Link>
                    </td>
                    <td>{formatearFecha(orden.fecha)}</td>
                    <td>{orden.clienteNombre}</td>
                    <td>{formatearCLP(orden.total)}</td>
                    <td className="text-capitalize">{orden.estado}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
