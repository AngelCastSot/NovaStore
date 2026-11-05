import { useState } from "react";
import { Link } from "react-router-dom";
import type { Producto } from "../data/Producto";
import { formatearCLP } from "../formato";
import Boton from "./Boton";
import Tarjeta from "./Tarjeta";

// Tarjeta de un producto. Se usa en el inicio, en el catálogo y en "productos relacionados".
interface Props {
  producto: Producto;
  agregarAlCarrito: (id: string, cantidad: number) => boolean;
}

function TarjetaProducto({ producto, agregarAlCarrito }: Props) {
  // Para mostrar "Añadido ✓" un momento después de agregar al carrito
  const [agregado, setAgregado] = useState(false);

  const esGratis = producto.precio === 0;
  const stockBajo =
    producto.stockCritico !== null && producto.stock <= producto.stockCritico;

  function agregar() {
    // agregarAlCarrito devuelve true si se pudo agregar
    if (agregarAlCarrito(producto.id, 1)) {
      setAgregado(true);
      setTimeout(() => setAgregado(false), 1200);
    }
  }

  return (
    <Tarjeta
      clase="card h-100 shadow-sm tarjeta-producto"
      urlImagen={"/img/" + producto.imagen}
      altImagen={producto.nombre}
      enlaceImagen={"/productos/" + producto.id}
      claseCuerpo="card-body d-flex flex-column"
      claseTitulo="card-title fs-6 fw-semibold mb-0"
      antetitulo={
        <div className="mb-2">
          {esGratis && <span className="badge text-bg-success me-1">Gratis</span>}
          {stockBajo && <span className="badge text-bg-warning">Stock bajo</span>}
        </div>
      }
      titulo={
        <Link
          to={"/productos/" + producto.id}
          className="text-body text-decoration-none"
        >
          {producto.nombre}
        </Link>
      }
    >
      <p className="fw-bold fs-5 mb-3 mt-2 text-marca">
        {formatearCLP(producto.precio)}
      </p>
      <Boton clase="btn btn-primary mt-auto" alHacerClic={agregar}>
        {agregado ? "Añadido ✓" : "Añadir al carrito"}
      </Boton>
    </Tarjeta>
  );
}

export default TarjetaProducto;
