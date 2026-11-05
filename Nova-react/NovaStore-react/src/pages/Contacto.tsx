import { useState } from "react";
import Boton from "../components/Boton";
import Campo from "../components/Campo";
import Contenedor from "../components/Contenedor";
import {
  esCorreoValido,
  esRequerido,
  tieneLargoMaximo,
  validarCampo,
  type Errores,
  type Regla,
} from "../validaciones";

const REGLAS: Record<string, Regla[]> = {
  nombre: [
    { test: esRequerido, mensaje: "Escribe tu nombre." },
    { test: (v) => tieneLargoMaximo(v, 100), mensaje: "Máximo 100 caracteres." },
  ],
  correo: [
    { test: esRequerido, mensaje: "Escribe tu correo." },
    { test: (v) => tieneLargoMaximo(v, 100), mensaje: "Máximo 100 caracteres." },
    {
      test: esCorreoValido,
      mensaje: "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.",
    },
  ],
  comentario: [
    { test: esRequerido, mensaje: "Escribe tu comentario." },
    { test: (v) => tieneLargoMaximo(v, 500), mensaje: "Máximo 500 caracteres." },
  ],
};

const FORMULARIO_VACIO = { nombre: "", correo: "", comentario: "" };

function Contacto() {
  const [valores, setValores] = useState<Record<string, string>>(FORMULARIO_VACIO);
  const [errores, setErrores] = useState<Errores>({});
  const [mensajeEnviado, setMensajeEnviado] = useState(false);

  function cambiar(campo: string, valor: string) {
    setValores({ ...valores, [campo]: valor });
  }

  function validar(campo: string): boolean {
    const mensaje = validarCampo(valores[campo], REGLAS[campo]);
    setErrores((anteriores) => ({ ...anteriores, [campo]: mensaje }));
    return mensaje === "";
  }

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const resultados = Object.keys(REGLAS).map((campo) => validar(campo));
    if (!resultados.every((ok) => ok)) return;

    // Aquí no hay servidor: solo mostramos el aviso y limpiamos el formulario
    setMensajeEnviado(true);
    setValores(FORMULARIO_VACIO);
    setErrores({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Contenedor clase="container py-4 py-lg-5">
      <div className="row g-5">
        <div className="col-12 col-lg-7">
          <h1>Escríbenos</h1>
          <p>
            Respondemos consultas sobre productos, despachos y garantías dentro de
            24 horas hábiles.
          </p>

          {mensajeEnviado && (
            <div className="alert alert-success">
              Mensaje enviado. Te responderemos al correo que indicaste.
            </div>
          )}

          <form className="formulario" onSubmit={enviar} noValidate>
            <Campo
              id="nombre"
              etiqueta="Nombre"
              valor={valores.nombre}
              alCambiar={(v) => cambiar("nombre", v)}
              alSalir={() => validar("nombre")}
              error={errores.nombre}
              ayuda="Máximo 100 caracteres."
              maxLength={100}
            />
            <Campo
              id="correo"
              etiqueta="Correo"
              tipo="email"
              valor={valores.correo}
              alCambiar={(v) => cambiar("correo", v)}
              alSalir={() => validar("correo")}
              error={errores.correo}
              ayuda="Solo @duoc.cl, @profesor.duoc.cl o @gmail.com."
              maxLength={100}
            />
            <Campo
              id="comentario"
              etiqueta="Comentario"
              tipo="textarea"
              valor={valores.comentario}
              alCambiar={(v) => cambiar("comentario", v)}
              alSalir={() => validar("comentario")}
              error={errores.comentario}
              ayuda="Máximo 500 caracteres."
              maxLength={500}
            />
            <div>
              <Boton tipo="submit">Enviar mensaje</Boton>
            </div>
          </form>
        </div>

        <div className="col-12 col-lg-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h2 className="h5">Datos de contacto</h2>
              <p className="small mb-1">contacto@novastore.cl</p>
              <p className="small mb-1">+56 9 1234 5678</p>
              <p className="small mb-3">Av. Los Carrera 1234, Concepción</p>
              <h3 className="h6">Horario</h3>
              <p className="small mb-0">Lunes a viernes, 9:00 a 18:00</p>
            </div>
          </div>
        </div>
      </div>
    </Contenedor>
  );
}

export default Contacto;
