import { Link } from "react-router-dom";
import Contenedor from "../components/Contenedor";
import Tarjeta from "../components/Tarjeta";
import { BLOGS } from "../data/Blog";
import { formatearDia } from "../formato";

function Blogs() {
  return (
    <Contenedor clase="container py-4 py-lg-5">
      <h1 className="mb-2">Blog NovaStore</h1>
      <p className="mb-4">
        Guías simples para elegir bien y sacarle partido a tus equipos.
      </p>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {BLOGS.map((articulo) => (
          <div className="col" key={articulo.id}>
            <Tarjeta
              clase="card h-100 shadow-sm"
              urlImagen={"/img/" + articulo.imagen}
              claseImagen="card-img-top tarjeta-blog__imagen"
              altImagen={"Ilustración de " + articulo.titulo}
              enlaceImagen={"/blog/" + articulo.id}
              claseCuerpo="card-body d-flex flex-column"
              antetitulo={
                <p className="small text-marca fw-semibold mb-1">
                  {formatearDia(articulo.fecha)} · {articulo.categoria}
                </p>
              }
              titulo={
                <Link
                  to={"/blog/" + articulo.id}
                  className="text-body text-decoration-none"
                >
                  {articulo.titulo}
                </Link>
              }
              texto={articulo.resumen}
              claseTexto="small"
            >
              <Link to={"/blog/" + articulo.id} className="mt-auto fw-semibold">
                Leer artículo
              </Link>
            </Tarjeta>
          </div>
        ))}
      </div>
    </Contenedor>
  );
}

export default Blogs;
