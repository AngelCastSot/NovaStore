import { Link, useParams } from "react-router-dom";
import Contenedor from "../components/Contenedor";
import Tarjeta from "../components/Tarjeta";
import { BLOGS } from "../data/Blog";
import { formatearDia } from "../formato";

function BlogDetalle() {
  const { id } = useParams();

  // Buscamos el artículo; si el id no existe, mostramos el primero
  const articulo = BLOGS.find((b) => b.id === id) ?? BLOGS[0];

  // Otros 3 artículos para la parte "Sigue leyendo"
  const otros = BLOGS.filter((b) => b.id !== articulo.id).slice(0, 3);

  return (
    <Contenedor clase="container py-4 py-lg-5">
      <nav aria-label="Ruta de navegación">
        <ol className="breadcrumb small">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/blog">Blog</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {articulo.titulo}
          </li>
        </ol>
      </nav>

      <article>
        <header className="mb-4">
          <p className="small text-marca fw-semibold mb-1">
            {formatearDia(articulo.fecha)} · {articulo.categoria} · {articulo.autor}
          </p>
          <h1>{articulo.titulo}</h1>
          <p className="fs-5">{articulo.resumen}</p>
        </header>
        <img
          src={"/img/" + articulo.imagen}
          className="w-100 rounded mb-4"
          alt={"Ilustración de " + articulo.titulo}
        />
        <div className="blog-cuerpo">
          {/* Cada elemento de "contenido" es un párrafo */}
          {articulo.contenido.map((parrafo, indice) => (
            <p key={indice}>{parrafo}</p>
          ))}
        </div>
        <p className="mt-4">
          <Link to="/blog">← Volver al blog</Link>
        </p>
      </article>

      <div className="mt-5">
        <h2 className="h4 mb-3">Sigue leyendo</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {otros.map((otro) => (
            <div className="col" key={otro.id}>
              <Tarjeta
                clase="card h-100 shadow-sm"
                urlImagen={"/img/" + otro.imagen}
                claseImagen="card-img-top tarjeta-blog__imagen"
                altImagen={"Ilustración de " + otro.titulo}
                enlaceImagen={"/blog/" + otro.id}
                claseTitulo="h6 mb-0"
                titulo={
                  <Link
                    to={"/blog/" + otro.id}
                    className="text-body text-decoration-none"
                  >
                    {otro.titulo}
                  </Link>
                }
              />
            </div>
          ))}
        </div>
      </div>
    </Contenedor>
  );
}

export default BlogDetalle;
