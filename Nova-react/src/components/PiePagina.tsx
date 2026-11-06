import { Link } from "react-router-dom";
import { PAGINAS } from "../data/Paginas";

// Pie de página de la tienda (aparece abajo en todas las páginas)
function PiePagina() {
  return (
    <footer className="footer-marca mt-5">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-12 col-sm-6 col-lg-4">
            <img
              src="/img/marca/logo-blanco.png"
              alt="NovaStore"
              className="footer-marca__logo mb-2"
            />
            <p className="small">
              Tienda online de tecnología. Proyecto académico DSY1104.
            </p>
          </div>

          <div className="col-6 col-lg-4">
            <p className="fw-bold mb-2">Enlaces</p>
            {/* Un enlace por cada página del arreglo PAGINAS (el mismo que usa el Navbar) */}
            {PAGINAS.map((pagina) => (
              <p className="mb-1" key={pagina.ruta}>
                <Link to={pagina.ruta}>{pagina.nombre}</Link>
              </p>
            ))}
          </div>

          <div className="col-6 col-lg-4">
            <p className="fw-bold mb-2">Contacto</p>
            <p className="mb-1 small">contacto@novastore.cl</p>
            <p className="mb-1 small">Concepción, Chile</p>
          </div>
        </div>
        <p className="text-center small footer-marca__copy border-top border-secondary-subtle pt-3 mt-4 mb-0">
          © 2026 NovaStore. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default PiePagina;
