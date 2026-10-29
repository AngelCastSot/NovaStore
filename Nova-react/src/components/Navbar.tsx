interface NavbarProps {
  cambiarPagina: (pagina: string) => void;
  paginaActual: string;
}

function Navbar({ cambiarPagina, paginaActual }: NavbarProps) {
  return (
    <header className="site-header">
      <div className="container navbar">
        <a 
          href="#home" 
          className="brand brand-logo-only" 
          onClick={(e) => { e.preventDefault(); cambiarPagina('home'); }}
        >
          <img src="/assets/img/marca/logo-blanco.png" alt="Logo NovaStore" className="brand-logo" />
        </a>

        <nav className="nav-links">
          <a 
            href="#home" 
            className={paginaActual === 'home' ? 'active' : ''} 
            onClick={(e) => { e.preventDefault(); cambiarPagina('home'); }}
          >
            Inicio
          </a>
          <a 
            href="#productos" 
            className={paginaActual === 'productos' ? 'active' : ''} 
            onClick={(e) => { e.preventDefault(); cambiarPagina('productos'); }}
          >
            Productos
          </a>
          <a 
            href="#contacto" 
            className={paginaActual === 'contacto' ? 'active' : ''} 
            onClick={(e) => { e.preventDefault(); cambiarPagina('contacto'); }}
          >
            Contacto
          </a>
        </nav>

        <div className="nav-actions">
          <button className="btn btn-secondary" onClick={() => cambiarPagina('login')}>
            Ingresar
          </button>
          <button className="cart-pill" onClick={() => cambiarPagina('carrito')}>
            🛒 Carrito <span className="cart-count">0</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;