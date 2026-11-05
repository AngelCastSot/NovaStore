import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import TarjetaCuerpo from "./TarjetaCuerpo";

// Tarjeta de Bootstrap: imagen opcional arriba + cuerpo.
// Se usa para los productos, los artículos del blog y la página "Nosotros".
interface Props {
  // Imagen
  urlImagen?: string;
  altImagen?: string;
  claseImagen?: string;
  enlaceImagen?: string; // si se indica, la imagen es un enlace a esa ruta
  // Cuerpo (se lo pasamos tal cual a TarjetaCuerpo)
  claseCuerpo?: string;
  claseTitulo?: string;
  claseTexto?: string;
  antetitulo?: ReactNode;
  titulo?: ReactNode;
  texto?: ReactNode;
  clase?: string;
  children?: ReactNode;
}

function Tarjeta({
  urlImagen,
  altImagen = "",
  claseImagen = "card-img-top",
  enlaceImagen,
  claseCuerpo,
  claseTitulo,
  claseTexto,
  antetitulo,
  titulo,
  texto,
  clase = "card h-100 border-0 shadow-sm",
  children,
}: Props) {
  // Si hay URL de imagen, preparamos la etiqueta <img>
  const imagen = urlImagen && (
    <img src={urlImagen} className={claseImagen} alt={altImagen} loading="lazy" />
  );

  return (
    <div className={clase}>
      {/* Si la imagen tiene enlace la envolvemos en un Link, si no, va sola */}
      {enlaceImagen ? <Link to={enlaceImagen}>{imagen}</Link> : imagen}
      <TarjetaCuerpo
        clase={claseCuerpo}
        claseTitulo={claseTitulo}
        claseTexto={claseTexto}
        antetitulo={antetitulo}
        titulo={titulo}
        texto={texto}
      >
        {children}
      </TarjetaCuerpo>
    </div>
  );
}

export default Tarjeta;
