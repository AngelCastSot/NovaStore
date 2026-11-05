import { useState } from "react";
import { Link } from "react-router-dom";
import Boton from "../components/Boton";
import Campo from "../components/Campo";
import Contenedor from "../components/Contenedor";
import { obtenerUsuarios, guardarUsuarios } from "../data/almacenamiento";
import { REGIONES } from "../data/Region";
import {
  esCorreoValido,
  esRequerido,
  esFormatoRunValido,
  esDVRunValido,
  tieneLargoMaximo,
  tieneLargoMinimo,
  validarCampo,
  type Errores,
  type Regla,
} from "../validaciones";

// Valores con los que parte (y vuelve a quedar) el formulario vacío
const FORMULARIO_VACIO = {
  run: "",
  fechaNacimiento: "",
  nombre: "",
  apellidos: "",
  correo: "",
  password: "",
  password2: "",
  region: "",
  comuna: "",
  direccion: "",
};

function Registro() {
  const [valores, setValores] =
    useState<Record<string, string>>(FORMULARIO_VACIO);
  const [errores, setErrores] = useState<Errores>({});
  const [errorGeneral, setErrorGeneral] = useState("");
  const [cuentaCreada, setCuentaCreada] = useState(false);

  // Reglas de cada campo. Están dentro del componente porque la regla de
  // "repetir contraseña" necesita saber lo que se escribió en "contraseña".
  const reglas: Record<string, Regla[]> = {
    run: [
      { test: esRequerido, mensaje: "Escribe tu RUN." },
      {
        test: esFormatoRunValido,
        mensaje: "RUN inválido. Escríbelo sin puntos ni guion.",
      },
      {
        test: esDVRunValido,
        mensaje: "RUN inválido. Dígito verificador inválido.",
      },
    ],
    nombre: [
      { test: esRequerido, mensaje: "Escribe tu nombre." },
      {
        test: (v) => tieneLargoMaximo(v, 50),
        mensaje: "Máximo 50 caracteres.",
      },
    ],
    apellidos: [
      { test: esRequerido, mensaje: "Escribe tus apellidos." },
      {
        test: (v) => tieneLargoMaximo(v, 100),
        mensaje: "Máximo 100 caracteres.",
      },
    ],
    correo: [
      { test: esRequerido, mensaje: "Escribe tu correo." },
      {
        test: (v) => tieneLargoMaximo(v, 100),
        mensaje: "Máximo 100 caracteres.",
      },
      {
        test: esCorreoValido,
        mensaje: "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.",
      },
    ],
    password: [
      { test: esRequerido, mensaje: "Escribe una contraseña." },
      { test: (v) => tieneLargoMinimo(v, 4), mensaje: "Mínimo 4 caracteres." },
      {
        test: (v) => tieneLargoMaximo(v, 10),
        mensaje: "Máximo 10 caracteres.",
      },
    ],
    password2: [
      { test: esRequerido, mensaje: "Repite la contraseña." },
      {
        test: (v) => v === valores.password,
        mensaje: "Las contraseñas no coinciden.",
      },
    ],
    direccion: [
      { test: esRequerido, mensaje: "Escribe tu dirección." },
      {
        test: (v) => tieneLargoMaximo(v, 300),
        mensaje: "Máximo 300 caracteres.",
      },
    ],
  };

  function cambiar(campo: string, valor: string) {
    setValores({ ...valores, [campo]: valor });
  }

  // Cuando cambia la región, la comuna elegida deja de servir: la vaciamos
  function cambiarRegion(regionId: string) {
    setValores({ ...valores, region: regionId, comuna: "" });
  }

  function validar(campo: string): boolean {
    const mensaje = validarCampo(valores[campo], reglas[campo]);
    setErrores((anteriores) => ({ ...anteriores, [campo]: mensaje }));
    return mensaje === "";
  }

  // Opciones de los selects de región y comuna
  const comunas = REGIONES.find((r) => r.id === valores.region)?.comunas ?? [];
  const opcionesRegion = [
    { valor: "", texto: "Selecciona una región" },
    ...REGIONES.map((r) => ({ valor: r.id, texto: r.nombre })),
  ];
  const opcionesComuna = [
    {
      valor: "",
      texto: valores.region
        ? "Selecciona una comuna"
        : "Selecciona primero una región",
    },
    ...comunas.map((nombre) => ({ valor: nombre, texto: nombre })),
  ];

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    setErrorGeneral("");
    setCuentaCreada(false);

    // Validamos todos los campos con reglas (map recorre todos, sin detenerse en el primero)
    const resultados = Object.keys(reglas).map((campo) => validar(campo));
    const todoValido = resultados.every((ok) => ok);

    if (!valores.region || !valores.comuna) {
      setErrorGeneral("Selecciona tu región y comuna.");
      return;
    }
    if (!todoValido) return;

    // No se pueden repetir ni el RUN ni el correo
    const usuarios = obtenerUsuarios();
    const run = valores.run.trim().toUpperCase();
    const repetido = usuarios.some(
      (u) =>
        u.correo.toLowerCase() === valores.correo.trim().toLowerCase() ||
        u.run === run,
    );
    if (repetido) {
      setErrorGeneral("Ya existe una cuenta con ese RUN o correo.");
      return;
    }

    guardarUsuarios([
      ...usuarios,
      {
        run,
        nombre: valores.nombre.trim(),
        apellidos: valores.apellidos.trim(),
        correo: valores.correo.trim(),
        password: valores.password,
        fechaNacimiento: valores.fechaNacimiento,
        tipoUsuario: "cliente", // quien se registra siempre es cliente
        region: valores.region,
        comuna: valores.comuna,
        direccion: valores.direccion.trim(),
      },
    ]);

    // Dejamos el formulario limpio y avisamos que salió bien
    setValores(FORMULARIO_VACIO);
    setErrores({});
    setCuentaCreada(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Contenedor clase="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <h1 className="h3 mb-1">Crear cuenta</h1>
          <p className="mb-4">
            Regístrate para guardar tus compras y seguir tus pedidos.
          </p>

          {cuentaCreada && (
            <div className="alert alert-success">
              Cuenta creada. Ya puedes{" "}
              <Link to="/login" className="alert-link">
                ingresar
              </Link>
              .
            </div>
          )}
          {errorGeneral && (
            <div className="alert alert-danger">{errorGeneral}</div>
          )}

          <form
            className="formulario formulario--ancho"
            onSubmit={enviar}
            noValidate
          >
            <div className="formulario__fila">
              <Campo
                id="run"
                etiqueta="RUN"
                valor={valores.run}
                alCambiar={(v) => cambiar("run", v)}
                alSalir={() => validar("run")}
                error={errores.run}
                ayuda="Sin puntos ni guion. Ej: 199876543"
                maxLength={9}
              />
              <Campo
                id="fechaNacimiento"
                etiqueta="Fecha de nacimiento"
                tipo="date"
                valor={valores.fechaNacimiento}
                alCambiar={(v) => cambiar("fechaNacimiento", v)}
                ayuda="Opcional."
              />
            </div>
            <div className="formulario__fila">
              <Campo
                id="nombre"
                etiqueta="Nombre"
                valor={valores.nombre}
                alCambiar={(v) => cambiar("nombre", v)}
                alSalir={() => validar("nombre")}
                error={errores.nombre}
                maxLength={50}
              />
              <Campo
                id="apellidos"
                etiqueta="Apellidos"
                valor={valores.apellidos}
                alCambiar={(v) => cambiar("apellidos", v)}
                alSalir={() => validar("apellidos")}
                error={errores.apellidos}
                maxLength={100}
              />
            </div>
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
            <div className="formulario__fila">
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
              />
              <Campo
                id="password2"
                etiqueta="Repetir contraseña"
                tipo="password"
                valor={valores.password2}
                alCambiar={(v) => cambiar("password2", v)}
                alSalir={() => validar("password2")}
                error={errores.password2}
                maxLength={10}
              />
            </div>
            <div className="formulario__fila">
              <Campo
                id="region"
                etiqueta="Región"
                tipo="select"
                opciones={opcionesRegion}
                valor={valores.region}
                alCambiar={cambiarRegion}
              />
              <Campo
                id="comuna"
                etiqueta="Comuna"
                tipo="select"
                opciones={opcionesComuna}
                valor={valores.comuna}
                alCambiar={(v) => cambiar("comuna", v)}
              />
            </div>
            <Campo
              id="direccion"
              etiqueta="Dirección"
              valor={valores.direccion}
              alCambiar={(v) => cambiar("direccion", v)}
              alSalir={() => validar("direccion")}
              error={errores.direccion}
              maxLength={300}
            />
            <div>
              <Boton tipo="submit">Crear cuenta</Boton>
            </div>
          </form>
        </div>
      </div>
    </Contenedor>
  );
}

export default Registro;
