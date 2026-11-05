import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Boton from "../components/Boton";
import Contenedor from "../components/Contenedor";
import { registrarCompra } from "../data/almacenamiento";
import type { ItemCarrito } from "../data/Orden";
import type { Sesion } from "../data/Usuario";
import { formatearCLP } from "../formato";

interface Props {
  carrito: ItemCarrito[];
  sesion: Sesion | null;
  cambiarCantidad: (id: string, nuevaCantidad: number) => void;
  quitarDelCarrito: (id: string) => void;
  vaciarCarrito: () => void;
}

function Carrito({
  carrito,
  sesion,
  cambiarCantidad,
  quitarDelCarrito,
  vaciarCarrito,
}: Props) {
  const navigate = useNavigate();

  // Mensaje de "compra registrada" (vacío = no se muestra)
  const [mensajeCompra, setMensajeCompra] = useState("");

  // Totales calculados a partir del carrito
  const totalProductos = carrito.reduce((suma, item) => suma + item.cantidad, 0);
  const totalPagar = carrito.reduce(
    (suma, item) => suma + item.precio * item.cantidad,
    0,
  );

  function confirmarVaciar() {
    if (carrito.length === 0) return;
    if (confirm("¿Quieres vaciar el carrito?")) {
      vaciarCarrito();
    }
  }

  function pagar() {
    // Para comprar hay que haber iniciado sesión
    if (sesion === null) {
      navigate("/login?redirect=carrito");
      return;
    }
    const resultado = registrarCompra(carrito, sesion);
    if (resultado.error || !resultado.orden) {
      alert(resultado.error);
      return;
    }
    vaciarCarrito();
    setMensajeCompra(
      `Compra registrada con el número ${resultado.orden.id}. ` +
        `Total: ${formatearCLP(resultado.orden.total)}.`,
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Contenedor clase="container py-4 py-lg-5">
      <h1 className="mb-4">Tu carrito</h1>

      {mensajeCompra && <div className="alert alert-success">{mensajeCompra}</div>}

      <div className="carrito-layout">
        <div>
          {carrito.length === 0 ? (
            <div className="alert alert-light border text-center py-5">
              <p className="mb-3">Tu carrito está vacío.</p>
              <Link to="/productos" className="btn btn-primary">
                Ver productos
              </Link>
            </div>
          ) : (
            carrito.map((item) => (
              <div className="carrito-item" key={item.id}>
                <div className="carrito-item__imagen">
                  <img src={"/img/" + item.imagen} alt={item.nombre} />
                </div>
                <div>
                  <Link to={"/productos/" + item.id} className="fw-semibold">
                    {item.nombre}
                  </Link>
                  <p className="small mb-0">{formatearCLP(item.precio)} c/u</p>
                </div>
                <div className="cantidad-selector mb-0">
                  <Boton
                    clase=""
                    etiqueta="Quitar una unidad"
                    alHacerClic={() => cambiarCantidad(item.id, item.cantidad - 1)}
                  >
                    −
                  </Boton>
                  <input
                    type="number"
                    value={item.cantidad}
                    min={1}
                    aria-label={"Cantidad de " + item.nombre}
                    onChange={(e) => {
                      // Si el campo queda vacío o en 0 no hacemos nada
                      const nueva = Number(e.target.value);
                      if (nueva >= 1) cambiarCantidad(item.id, nueva);
                    }}
                  />
                  <Boton
                    clase=""
                    etiqueta="Agregar una unidad"
                    alHacerClic={() => cambiarCantidad(item.id, item.cantidad + 1)}
                  >
                    +
                  </Boton>
                </div>
                <div className="text-end">
                  <p className="fw-bold mb-1">
                    {formatearCLP(item.precio * item.cantidad)}
                  </p>
                  <Boton
                    clase="link-boton small"
                    alHacerClic={() => quitarDelCarrito(item.id)}
                  >
                    Eliminar
                  </Boton>
                </div>
              </div>
            ))
          )}

          <div className="d-flex flex-wrap gap-2 mt-4">
            <Link to="/productos" className="btn btn-outline-primary">
              Seguir comprando
            </Link>
            <Boton clase="btn btn-outline-danger" alHacerClic={confirmarVaciar}>
              Vaciar carrito
            </Boton>
          </div>
        </div>

        <aside className="carrito-resumen">
          <h2 className="h5 mb-3">Resumen de compra</h2>
          <div className="d-flex justify-content-between">
            <span>Productos</span>
            <span>{totalProductos}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Despacho</span>
            <span>Gratis</span>
          </div>
          <div className="carrito-resumen__total">
            <span>Total</span>
            <span>{carrito.length === 0 ? "$0" : formatearCLP(totalPagar)}</span>
          </div>
          <Boton
            clase="btn btn-primary w-100 mt-3"
            desactivado={carrito.length === 0}
            alHacerClic={pagar}
          >
            Continuar compra
          </Boton>
          {sesion === null && (
            <p className="small mb-0 mt-2">
              Necesitas <Link to="/login">iniciar sesión</Link> para finalizar la
              compra.
            </p>
          )}
        </aside>
      </div>
    </Contenedor>
  );
}

export default Carrito;
