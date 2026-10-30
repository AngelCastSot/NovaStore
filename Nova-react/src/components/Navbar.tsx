import { Link } from "react-router-dom";
import { PAGINAS } from "../data/Paginas";

interface NavbarProps {
  cambiarPagina: (pagina: string) => void;
  paginaActual: string;
}

function Navbar({ cambiarPagina, paginaActual }: NavbarProps) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <p className="navbar-brand">{paginaActual}</p>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {PAGINAS.map((pag) => (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={pag.ruta}
                  onClick={() => cambiarPagina(pag.nombreCorto)}
                >
                  {pag.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
    /*<header className="site-header">
      <div className="container navbar">
        <a
          href="#home"
          className="brand brand-logo-only"
          onClick={(e) => {
            e.preventDefault();
            cambiarPagina("home");
          }}
        >
          <img
            src="/img/marca/logo.jpg"
            alt="Logo NovaStore"
            className="brand-logo"
          />
        </a>

        <nav className="nav-links">
          <a
            href="#home"
            className={paginaActual === "home" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              cambiarPagina("home");
            }}
          >
            Inicio
          </a>
          <a
            href="#productos"
            className={paginaActual === "productos" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              cambiarPagina("productos");
            }}
          >
            Productos
          </a>
          <a
            href="#contacto"
            className={paginaActual === "contacto" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              cambiarPagina("contacto");
            }}
          >
            Contacto
          </a>
        </nav>

        <div className="nav-actions">
          <button
            className="btn btn-secondary"
            onClick={() => cambiarPagina("login")}
          >
            Ingresar
          </button>
          <button
            className="cart-pill"
            onClick={() => cambiarPagina("carrito")}
          >
            🛒 Carrito <span className="cart-count">0</span>
          </button>
        </div>
      </div>
    </header>*/
  );
}

export default Navbar;
