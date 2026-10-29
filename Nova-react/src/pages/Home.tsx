interface HomeProps {
  cambiarPagina: (pagina: string) => void;
}

function Home({ cambiarPagina }: HomeProps) {
  return (
    <div className="container">
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">Simple, útil y moderno</span>
          <h1>Tecnología y accesorios pensados para tu rutina</h1>
          <p>
            En NovaStore reunimos periféricos, audio, gadgets y equipamiento de escritorio con una navegación clara,
            precios visibles en pesos chilenos y compras simples desde cualquier dispositivo.
          </p>
          <div className="hero-actions">
            <button onClick={() => cambiarPagina('productos')} className="btn btn-primary">
              Explorar catálogo
            </button>
            <button onClick={() => cambiarPagina('nosotros')} className="btn btn-secondary">
              Conocer la tienda
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <strong>+10</strong>
              <span>productos listos para vitrina</span>
            </div>
            <div className="stat">
              <strong>5</strong>
              <span>categorías claras para filtrar</span>
            </div>
            <div className="stat">
              <strong>100%</strong>
              <span>responsive en móvil y escritorio</span>
            </div>
          </div>
        </div>
        <div className="hero-card">
          <img src="/assets/img/productos/audifonos-nova-pulse.svg" alt="Audífonos Nova Pulse" />
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Compra por categoría</h2>
            <p className="section-subtitle">Explora las líneas principales de la tienda según tu necesidad.</p>
          </div>
        </div>
        <div className="grid grid-3">
          <article className="feature-box">
            <div className="feature-icon">🎧</div>
            <h3>Audio y uso diario</h3>
            <p className="muted">Audífonos y parlantes compactos para estudiar, trabajar o moverte con comodidad.</p>
          </article>
          <article className="feature-box">
            <div className="feature-icon">⌨️</div>
            <h3>Escritorio y periféricos</h3>
            <p className="muted">Teclados, mouse y accesorios ergonómicos para mejorar tu espacio de trabajo o juego.</p>
          </article>
          <article className="feature-box">
            <div className="feature-icon">🏠</div>
            <h3>Hogar inteligente y bienestar</h3>
            <p className="muted">Iluminación, enchufes WiFi y wearables fáciles de integrar en el día a día.</p>
          </article>
        </div>
      </section>
    </div>
  );
}

export default Home;