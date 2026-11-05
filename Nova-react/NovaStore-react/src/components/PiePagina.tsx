import { Link } from "react-router-dom";

// Pie de página de la tienda (aparece abajo en todas las páginas)
function PiePagina() {
  return (
    <footer className="footer-marca mt-5">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-12 col-sm-6 col-lg-3">
            <img
              src="/img/marca/logo-blanco.png"
              alt="NovaStore"
              className="footer-marca__logo mb-2"
            />
            <p className="small">
              Tienda online de tecnología. Proyecto académico DSY1104.
            </p>
          </div>

          <div className="col-6 col-lg-3">
            <p className="fw-bold mb-2">Tienda</p>
            <p className="mb-1"><Link to="/productos">Productos</Link></p>
            <p className="mb-1"><Link to="/carrito">Carrito</Link></p>
            <p className="mb-1"><Link to="/login">Ingresar</Link></p>
            <p className="mb-1"><Link to="/registro">Crear cuenta</Link></p>
          </div>

          <div className="col-6 col-lg-3">
            <p className="fw-bold mb-2">Empresa</p>
            <p className="mb-1"><Link to="/nosotros">Nosotros</Link></p>
            <p className="mb-1"><Link to="/blog">Blog</Link></p>
            <p className="mb-1"><Link to="/contacto">Contacto</Link></p>
          </div>

          <div className="col-12 col-lg-3">
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
