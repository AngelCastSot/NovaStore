interface LoginProps {
  cambiarPagina: (pagina: string) => void;
}

function Login({ cambiarPagina }: LoginProps) {
  return (
    <div className="container section">
      <h1 className="section-title">Iniciar Sesión</h1>
      <button className="btn btn-secondary" onClick={() => cambiarPagina('home')}>
        Volver al inicio
      </button>
    </div>
  );
}

export default Login;