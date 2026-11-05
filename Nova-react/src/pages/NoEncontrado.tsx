import { Link } from "react-router-dom";
import Contenedor from "../components/Contenedor";

// Se muestra cuando la dirección no corresponde a ninguna página
function NoEncontrado() {
  return (
    <Contenedor clase="container py-5 text-center">
      <h1 className="h3">Página no encontrada</h1>
      <p className="mb-4">La dirección que buscas no existe.</p>
      <Link to="/" className="btn btn-primary">
        Volver al inicio
      </Link>
    </Contenedor>
  );
}

export default NoEncontrado;
