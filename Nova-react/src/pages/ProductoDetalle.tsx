import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Boton from "../components/Boton";
import Contenedor from "../components/Contenedor";
import TarjetaProducto from "../components/TarjetaProducto";
import { obtenerProductos } from "../data/almacenamiento";
import { formatearCLP } from "../formato";

interface Props {
  agregarAlCarrito: (id: string, cantidad: number) => boolean;
}

function ProductoDetalle({ agregarAlCarrito }: Props) {
  // useParams lee el :id que viene en la dirección (/productos/P001)
  const { id } = useParams();

  const [productos] = useState(obtenerProductos);
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  const producto = productos.find((p) => p.id === id);

  // Si el id no corresponde a ningún producto
  if (!producto) {
    return (
      <Contenedor clase="container py-4 py-lg-5">
        <div className="alert alert-warning">
          No encontramos ese producto.{" "}
          <Link to="/productos" className="alert-link">
            Volver al catálogo
          </Link>
          .
        </div>
      </Contenedor>
    );
  }

  const sinStock = producto.stock <= 0;
  const stockBajo =
    producto.stock > 0 &&
    producto.stockCritico !== null &&
    producto.stock <= producto.stockCritico;

  // Color del texto de stock
  let claseStock = "text-success";
  if (sinStock) claseStock = "text-danger";
  else if (stockBajo) claseStock = "text-warning-emphasis";

  // Otros productos de la misma categoría (máximo 4)
  const relacionados = productos
    .filter((p) => p.categoria === producto.categoria && p.id !== producto.id)
    .slice(0, 4);

  const agregar = () => {
    // Nos aseguramos de que la cantidad sea al menos 1
    if (agregarAlCarrito(producto.id, Math.max(1, cantidad))) {
      setAgregado(true);
      setTimeout(() => setAgregado(false), 1200);
    }
  };

  return (
    <Contenedor clase="container py-4 py-lg-5">
      <nav aria-label="Ruta de navegación">
        <ol className="breadcrumb small">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/productos">Productos</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {producto.nombre}
          </li>
        </ol>
      </nav>

      <div className="row g-4 g-lg-5 align-items-start">
        <div className="col-12 col-lg-6">
          <div className="producto-detalle__imagen">
            <img src={"/img/" + producto.imagen} alt={producto.nombre} />
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <p className="text-marca fw-semibold small mb-1">{producto.codigo}</p>
          <h1 className="h2">{producto.nombre}</h1>
          <p>{producto.descripcion}</p>
          <p className="producto-detalle__precio">{formatearCLP(producto.precio)}</p>
          <p className={"small " + claseStock}>
            {sinStock ? "Sin stock" : `Stock disponible: ${producto.stock} unidades`}
          </p>

          <div className="d-flex flex-wrap align-items-center gap-3">
            <div className="cantidad-selector">
              <Boton
                clase=""
                etiqueta="Quitar una unidad"
                alHacerClic={() => setCantidad(Math.max(1, cantidad - 1))}
              >
                −
              </Boton>
              <input
                type="number"
                value={cantidad}
                min={1}
                max={producto.stock}
                aria-label="Cantidad"
                onChange={(e) => setCantidad(Number(e.target.value))}
              />
              <Boton
                clase=""
                etiqueta="Agregar una unidad"
                alHacerClic={() => setCantidad(Math.min(producto.stock, cantidad + 1))}
              >
                +
              </Boton>
            </div>
            <Boton
              clase="btn btn-primary btn-lg flex-grow-1 flex-sm-grow-0"
              desactivado={sinStock}
              alHacerClic={agregar}
            >
              {agregado ? "Añadido ✓" : "Añadir al carrito"}
            </Boton>
          </div>
          <p className="mt-3 mb-0">
            <Link to="/carrito">Ir al carrito →</Link>
          </p>
        </div>
      </div>

      {relacionados.length > 0 && (
        <div className="mt-5">
          <h2 className="h4 mb-3">También te puede interesar</h2>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
            {relacionados.map((relacionado) => (
              <div className="col" key={relacionado.id}>
                <TarjetaProducto
                  producto={relacionado}
                  agregarAlCarrito={agregarAlCarrito}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </Contenedor>
  );
}

export default ProductoDetalle;
