import { useState } from "react";
import { Link } from "react-router-dom";
import Contenedor from "../components/Contenedor";
import TarjetaProducto from "../components/TarjetaProducto";
import { obtenerProductos } from "../data/almacenamiento";

interface Props {
  agregarAlCarrito: (id: string, cantidad: number) => boolean;
}

function Home({ agregarAlCarrito }: Props) {
  // Leemos los productos una sola vez y mostramos solo los 4 primeros como destacados
  const [productos] = useState(obtenerProductos);
  const destacados = productos.slice(0, 4);

  return (
    <>
      {/* Portada */}
      <Contenedor clase="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <p className="text-marca fw-semibold text-uppercase small mb-2">
              Tecnología curada, envío rápido
            </p>
            <h1 className="display-5 fw-bold mb-3">
              Encuentra los gadgets que hacen tu día más simple
            </h1>
            <p className="text-body-secondary mb-4">
              En NovaStore seleccionamos audio, computación, hogar inteligente,
              gaming y wearables de marcas confiables, con stock real y precios
              claros.
            </p>
            <Link to="/productos" className="btn btn-primary btn-lg">
              Ver todos los productos
            </Link>
          </div>
          <div className="col-lg-6">
            <div
              className="hero-marca d-flex align-items-center justify-content-center p-5"
              style={{ aspectRatio: "4 / 3" }}
            >
              <img
                src="/img/marca/logo-blanco.png"
                alt="Logo de NovaStore"
                className="hero-marca__logo"
              />
            </div>
          </div>
        </div>
      </Contenedor>

      {/* Productos destacados */}
      <Contenedor clase="container py-5">
        <div className="d-flex justify-content-between align-items-baseline mb-4 flex-wrap gap-2">
          <h2 className="fw-bold mb-0">Destacados de la semana</h2>
          <Link to="/productos" className="text-marca fw-semibold text-decoration-none">
            Ver catálogo completo →
          </Link>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
          {destacados.map((producto) => (
            <div className="col" key={producto.id}>
              <TarjetaProducto
                producto={producto}
                agregarAlCarrito={agregarAlCarrito}
              />
            </div>
          ))}
        </div>
      </Contenedor>
    </>
  );
}

export default Home;
