import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Boton from "../components/Boton";
import Campo from "../components/Campo";
import Contenedor from "../components/Contenedor";
import { obtenerUsuarios } from "../data/almacenamiento";
import type { Usuario } from "../data/Usuario";
import {
  esCorreoValido,
  esRequerido,
  tieneLargoMaximo,
  tieneLargoMinimo,
  validarCampo,
  type Errores,
  type Regla,
} from "../validaciones";

// Reglas de cada campo (se revisan en orden)
const REGLAS: Record<string, Regla[]> = {
  correo: [
    { test: esRequerido, mensaje: "Escribe tu correo." },
    { test: (v) => tieneLargoMaximo(v, 100), mensaje: "Máximo 100 caracteres." },
    {
      test: esCorreoValido,
      mensaje: "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.",
    },
  ],
  password: [
    { test: esRequerido, mensaje: "Escribe tu contraseña." },
    { test: (v) => tieneLargoMinimo(v, 4), mensaje: "Mínimo 4 caracteres." },
    { test: (v) => tieneLargoMaximo(v, 10), mensaje: "Máximo 10 caracteres." },
  ],
};

interface Props {
  iniciarSesion: (usuario: Usuario) => void;
}

function Login({ iniciarSesion }: Props) {
  const navigate = useNavigate();
  const [parametros] = useSearchParams(); // lee lo que viene después del "?" en la dirección

  const [valores, setValores] = useState<Record<string, string>>({
    correo: "",
    password: "",
  });
  const [errores, setErrores] = useState<Errores>({});
  const [errorLogin, setErrorLogin] = useState("");

  function cambiar(campo: string, valor: string) {
    setValores({ ...valores, [campo]: valor });
  }

  // Valida un campo y guarda su mensaje de error. Devuelve true si está bien.
  function validar(campo: string): boolean {
    const mensaje = validarCampo(valores[campo], REGLAS[campo]);
    setErrores((anteriores) => ({ ...anteriores, [campo]: mensaje }));
    return mensaje === "";
  }

  function enviar(e: React.FormEvent) {
    e.preventDefault(); // evita que el formulario recargue la página
    setErrorLogin("");

    const correoOk = validar("correo");
    const passwordOk = validar("password");
    if (!correoOk || !passwordOk) return;

    // Buscamos un usuario con ese correo y esa contraseña
    const usuario = obtenerUsuarios().find(
      (u) =>
        u.correo.toLowerCase() === valores.correo.trim().toLowerCase() &&
        u.password === valores.password,
    );
    if (!usuario) {
      setErrorLogin(
        "Correo o contraseña incorrectos. Revisa los datos e inténtalo otra vez.",
      );
      return;
    }

    iniciarSesion(usuario);

    // A dónde vamos después de ingresar
    if (parametros.get("redirect") === "carrito") navigate("/carrito");
    else if (usuario.tipoUsuario !== "cliente") navigate("/admin");
    else navigate("/");
  }

  return (
    <Contenedor clase="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-5">
          <h1 className="h3 mb-1">Ingresar</h1>
          <p className="mb-4">Entra con tu cuenta para finalizar tus compras.</p>

          {errorLogin && <div className="alert alert-danger">{errorLogin}</div>}

          <form className="formulario" onSubmit={enviar} noValidate>
            <Campo
              id="correo"
              etiqueta="Correo"
              tipo="email"
              valor={valores.correo}
              alCambiar={(v) => cambiar("correo", v)}
              alSalir={() => validar("correo")}
              error={errores.correo}
              maxLength={100}
              autoComplete="username"
            />
            <Campo
              id="password"
              etiqueta="Contraseña"
              tipo="password"
              valor={valores.password}
              alCambiar={(v) => cambiar("password", v)}
              alSalir={() => validar("password")}
              error={errores.password}
              ayuda="Entre 4 y 10 caracteres."
              maxLength={10}
              autoComplete="current-password"
            />
            <div>
              <Boton tipo="submit">Ingresar</Boton>
            </div>
          </form>

          <p className="mt-3 mb-0">
            ¿No tienes cuenta? <Link to="/registro">Crea una aquí</Link>.
          </p>

          <div className="card mt-4 border-0 bg-white shadow-sm">
            <div className="card-body small">
              <p className="fw-semibold mb-2">Cuentas de prueba</p>
              <p className="mb-1">admin@duoc.cl / admin123</p>
              <p className="mb-0">vendedor@duoc.cl / vend1234</p>
            </div>
          </div>
        </div>
      </div>
    </Contenedor>
  );
}

export default Login;
