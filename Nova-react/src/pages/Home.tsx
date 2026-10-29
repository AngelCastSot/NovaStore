import { Fragment } from "react/jsx-runtime";
import Contenedor from "../components/Contenedor";
import Tarjeta from "../components/Tarjeta";
import { PRODUCTOS } from "../data/Producto";
import { Link } from "react-router-dom";

interface HomeProps {
  cambiarPagina: (pagina: string) => void;
}

function Home({ cambiarPagina }: HomeProps) {
  return (
    <Fragment>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">Simple, útil y moderno</span>
          <h1>Tecnología y accesorios pensados para tu rutina</h1>
          <p>
            En NovaStore reunimos periféricos, audio, gadgets y equipamiento de
            escritorio con una navegación clara, precios visibles en pesos
            chilenos y compras simples desde cualquier dispositivo.
          </p>
          <div className="hero-actions">
            <button
              onClick={() => cambiarPagina("productos")}
              className="btn btn-primary"
            >
              Ver todos los Productos
            </button>
          </div>
          <div className="hero-stats"></div>
        </div>
        <div className="hero-card">
          <img src="/img/marca/logo.jpg" alt="Logo" />
        </div>
      </section>
      <h3 className="text-center" style={{ margin: "15px" }}>
        {" "}
        Productos Destacados HOY
      </h3>

      <Contenedor clase="container text-center">
        <div className="row">
          {/* Recorremos el arreglo de productos en Producto.ts
              y para cada elemento (identificado auxiliarmente como 'prod')
              va a generar la tarjeta del producto destacado con los datos
              de prod */}
          {PRODUCTOS.map((prod) => (
            <div className="col">
              <Tarjeta
                titulo={prod.nombre}
                texto={prod.descripcion}
                urlImagen={prod.urlImagen}
                altImagen={prod.altImagen}
              >
                <p className="card-text fw-bold">${prod.precio}</p>
                <Link to={`/producto/${prod.id}`} className="btn btn-primary">
                  +Info
                </Link>
              </Tarjeta>
            </div>
          ))}
        </div>
      </Contenedor>
    </Fragment>
  );
}

export default Home;
