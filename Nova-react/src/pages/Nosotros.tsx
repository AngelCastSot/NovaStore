import Contenedor from "../components/Contenedor";
import Tarjeta from "../components/Tarjeta";

function Nosotros() {
  return (
    <Contenedor clase="container py-4 py-lg-5">
      <div className="row g-5 align-items-center">
        <div className="col-12 col-lg-6">
          <h1>Sobre NovaStore</h1>
          <p>
            Partimos el 2024 como un proyecto de estudiantes que se cansaron de
            comparar precios en diez pestañas distintas. Hoy somos una tienda de
            tecnología con stock real, precios claros y despacho a todo Chile.
          </p>
          <p>
            Trabajamos con cinco categorías: audio, computación, hogar inteligente,
            gaming y wearables. Cada producto pasa por una revisión antes de entrar
            al catálogo.
          </p>
        </div>
        <div className="col-12 col-lg-6">
          <div
            className="hero-marca d-flex align-items-center justify-content-center p-5"
            style={{ aspectRatio: "4 / 3" }}
          >
            <img
              src="/img/marca/logo-blanco.png"
              alt="Logo de NovaStore"
              className="hero-marca__logo"
            />
          </div>
        </div>
      </div>

      {/* Misión, visión y forma de trabajo: 3 tarjetas iguales */}
      <div className="row g-4 py-5">
        <div className="col-12 col-md-4">
          <Tarjeta
            titulo="Misión"
            texto="Acercar tecnología útil y confiable a personas que no quieren perder tiempo comparando especificaciones."
            claseTexto="mb-0 small"
          />
        </div>
        <div className="col-12 col-md-4">
          <Tarjeta
            titulo="Visión"
            texto="Ser la tienda de referencia en la región del Biobío para compras de tecnología en línea."
            claseTexto="mb-0 small"
          />
        </div>
        <div className="col-12 col-md-4">
          <Tarjeta
            titulo="Cómo trabajamos"
            texto="Stock actualizado, precios sin letra chica y respuesta a consultas dentro de 24 horas hábiles."
            claseTexto="mb-0 small"
          />
        </div>
      </div>

      <div className="py-4">
        <h2>El equipo</h2>
        <p>
          NovaStore es un proyecto de una sola persona: desde el diseño y el código
          hasta la atención a clientes.
        </p>
        <div className="row justify-content-center justify-content-lg-start">
          <div className="col-12 col-sm-8 col-md-6 col-lg-4">
            <Tarjeta
              clase="card border-0 shadow-sm text-center h-100"
              urlImagen="/img/equipo/angel-castillo.svg"
              claseImagen="card-img-top equipo-foto"
              altImagen="Retrato ilustrado de Angel Castillo"
              titulo="Angel Castillo"
              claseTitulo="h5 mb-1"
            >
              <p className="text-marca fw-semibold small mb-2">
                Propietario y desarrollador
              </p>
              <p className="small mb-0">
                Selecciona el catálogo, construye la tienda y responde las consultas
                de cada cliente.
              </p>
            </Tarjeta>
          </div>
        </div>
      </div>
    </Contenedor>
  );
}

export default Nosotros;
