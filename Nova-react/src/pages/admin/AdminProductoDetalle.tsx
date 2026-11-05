import { Link, useParams } from "react-router-dom";
import EncabezadoAdmin from "../../components/EncabezadoAdmin";
import { obtenerProductos } from "../../data/almacenamiento";
import { CATEGORIAS } from "../../data/Producto";
import type { Sesion } from "../../data/Usuario";
import { formatearCLP } from "../../formato";

interface Props {
  sesion: Sesion | null;
}

// Vista de solo lectura de un producto
function AdminProductoDetalle({ sesion }: Props) {
  const { id } = useParams();
  const producto = obtenerProductos().find((p) => p.id === id);

  const volver = (
    <Link to="/admin/productos" className="btn btn-outline-primary">
      Volver al listado
    </Link>
  );

  return (
    <>
      <EncabezadoAdmin titulo="Detalle del producto" subtitulo="Vista de solo lectura.">
        {volver}
      </EncabezadoAdmin>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          {!producto ? (
            <p className="mb-0">No encontramos ese producto.</p>
          ) : (
            <div className="row g-4">
              <div className="col-12 col-md-5">
                <img
                  src={"/img/" + producto.imagen}
                  alt={producto.nombre}
                  className="w-100 rounded border"
                />
              </div>
              <div className="col-12 col-md-7">
                <p className="text-marca fw-semibold small mb-1">{producto.codigo}</p>
                <h2 className="h4">{producto.nombre}</h2>
                <p>{producto.descripcion || "Sin descripción."}</p>
                <dl className="row mb-0">
                  <dt className="col-5 col-sm-4">Categoría</dt>
                  <dd className="col-7 col-sm-8">
                    {CATEGORIAS.find((c) => c.id === producto.categoria)?.nombre ??
                      producto.categoria}
                  </dd>
                  <dt className="col-5 col-sm-4">Precio</dt>
                  <dd className="col-7 col-sm-8">{formatearCLP(producto.precio)}</dd>
                  <dt className="col-5 col-sm-4">Stock</dt>
                  <dd className="col-7 col-sm-8">
                    {producto.stock}{" "}
                    {producto.stock <= (producto.stockCritico ?? 0) && (
                      <span className="badge text-bg-warning">Reponer</span>
                    )}
                  </dd>
                  <dt className="col-5 col-sm-4">Stock crítico</dt>
                  <dd className="col-7 col-sm-8">
                    {producto.stockCritico ?? "No definido"}
                  </dd>
                </dl>
                {/* Solo el administrador puede editar */}
                {sesion?.tipoUsuario === "administrador" && (
                  <div className="mt-4">
                    <Link
                      to={"/admin/productos/" + producto.id + "/editar"}
                      className="btn btn-primary"
                    >
                      Editar producto
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminProductoDetalle;
