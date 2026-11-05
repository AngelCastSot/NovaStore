import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Boton from "../../components/Boton";
import Campo from "../../components/Campo";
import EncabezadoAdmin from "../../components/EncabezadoAdmin";
import { guardarUsuarios, obtenerUsuarios } from "../../data/almacenamiento";
import { REGIONES } from "../../data/Region";
import type { Sesion, TipoUsuario, Usuario } from "../../data/Usuario";
import {
  esCorreoValido,
  esRequerido,
  esRunValido,
  tieneLargoMaximo,
  tieneLargoMinimo,
  validarCampo,
  type Errores,
  type Regla,
} from "../../validaciones";

interface Props {
  sesion: Sesion | null;
}

// Sirve para crear un usuario (/admin/usuarios/nuevo)
// y para editarlo (/admin/usuarios/:run/editar)
function AdminUsuarioForm({ sesion }: Props) {
  const { run } = useParams(); // si hay run, estamos editando
  const navigate = useNavigate();
  const editando = Boolean(run);

  const [existente] = useState(() =>
    run ? obtenerUsuarios().find((u) => u.run === run) : undefined,
  );

  const [valores, setValores] = useState<Record<string, string>>({
    run: existente?.run ?? "",
    tipoUsuario: existente?.tipoUsuario ?? "",
    nombre: existente?.nombre ?? "",
    apellidos: existente?.apellidos ?? "",
    correo: existente?.correo ?? "",
    fechaNacimiento: existente?.fechaNacimiento ?? "",
    password: "", // por seguridad nunca se muestra la contraseña actual
    region: existente?.region ?? "",
    comuna: existente?.comuna ?? "",
    direccion: existente?.direccion ?? "",
  });
  const [errores, setErrores] = useState<Errores>({});
  const [errorGeneral, setErrorGeneral] = useState("");

  // Solo el administrador puede entrar a este formulario
  if (sesion?.tipoUsuario !== "administrador") {
    return <Navigate to="/admin" replace />;
  }

  // Si la dirección tiene un RUN que no existe
  if (editando && !existente) {
    return (
      <>
        <EncabezadoAdmin titulo="Editar usuario" subtitulo="Usuario no encontrado." />
        <Link to="/admin/usuarios" className="btn btn-outline-primary">
          Volver al listado
        </Link>
      </>
    );
  }

  // Reglas de cada campo. Al editar, la contraseña es opcional
  // (si se deja vacía se mantiene la actual).
  const reglas: Record<string, Regla[]> = {
    run: [
      { test: esRequerido, mensaje: "El RUN es obligatorio." },
      { test: (v) => tieneLargoMinimo(v, 7), mensaje: "Mínimo 7 caracteres." },
      { test: (v) => tieneLargoMaximo(v, 9), mensaje: "Máximo 9 caracteres." },
      {
        test: esRunValido,
        mensaje: "El RUN no es válido. Escríbelo sin puntos ni guion.",
      },
    ],
    nombre: [
      { test: esRequerido, mensaje: "El nombre es obligatorio." },
      { test: (v) => tieneLargoMaximo(v, 50), mensaje: "Máximo 50 caracteres." },
    ],
    apellidos: [
      { test: esRequerido, mensaje: "Los apellidos son obligatorios." },
      { test: (v) => tieneLargoMaximo(v, 100), mensaje: "Máximo 100 caracteres." },
    ],
    correo: [
      { test: esRequerido, mensaje: "El correo es obligatorio." },
      { test: (v) => tieneLargoMaximo(v, 100), mensaje: "Máximo 100 caracteres." },
      {
        test: esCorreoValido,
        mensaje: "Solo se aceptan @duoc.cl, @profesor.duoc.cl o @gmail.com.",
      },
    ],
    password: [
      {
        test: (v) => editando || esRequerido(v),
        mensaje: "La contraseña es obligatoria.",
      },
      {
        test: (v) => !esRequerido(v) || tieneLargoMinimo(v, 4),
        mensaje: "Mínimo 4 caracteres.",
      },
      {
        test: (v) => !esRequerido(v) || tieneLargoMaximo(v, 10),
        mensaje: "Máximo 10 caracteres.",
      },
    ],
    direccion: [
      { test: esRequerido, mensaje: "La dirección es obligatoria." },
      { test: (v) => tieneLargoMaximo(v, 300), mensaje: "Máximo 300 caracteres." },
    ],
  };

  function cambiar(campo: string, valor: string) {
    setValores({ ...valores, [campo]: valor });
  }

  // Al cambiar la región, la comuna elegida ya no sirve: la vaciamos
  function cambiarRegion(regionId: string) {
    setValores({ ...valores, region: regionId, comuna: "" });
  }

  function validar(campo: string): boolean {
    const mensaje = validarCampo(valores[campo], reglas[campo]);
    setErrores((anteriores) => ({ ...anteriores, [campo]: mensaje }));
    return mensaje === "";
  }

  // Opciones de los selects
  const comunas = REGIONES.find((r) => r.id === valores.region)?.comunas ?? [];
  const opcionesRegion = [
    { valor: "", texto: "Selecciona una región" },
    ...REGIONES.map((r) => ({ valor: r.id, texto: r.nombre })),
  ];
  const opcionesComuna = [
    {
      valor: "",
      texto: valores.region ? "Selecciona una comuna" : "Selecciona primero una región",
    },
    ...comunas.map((nombre) => ({ valor: nombre, texto: nombre })),
  ];
  const opcionesTipo = [
    { valor: "", texto: "Selecciona un perfil" },
    { valor: "administrador", texto: "Administrador" },
    { valor: "vendedor", texto: "Vendedor" },
    { valor: "cliente", texto: "Cliente" },
  ];

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    setErrorGeneral("");

    const resultados = Object.keys(reglas).map((campo) => validar(campo));
    if (!valores.tipoUsuario) {
      setErrorGeneral("Selecciona el tipo de usuario.");
      return;
    }
    if (!valores.region || !valores.comuna) {
      setErrorGeneral("Selecciona la región y la comuna.");
      return;
    }
    if (!resultados.every((ok) => ok)) return;

    // No se pueden repetir el RUN ni el correo de OTRA cuenta
    const usuarios = obtenerUsuarios();
    const nuevoRun = valores.run.trim().toUpperCase();
    const repetido = usuarios.some(
      (u) =>
        (u.run === nuevoRun ||
          u.correo.toLowerCase() === valores.correo.trim().toLowerCase()) &&
        u.run !== run,
    );
    if (repetido) {
      setErrorGeneral("Ya existe otra cuenta con ese RUN o correo.");
      return;
    }

    const datos: Omit<Usuario, "password"> = {
      run: nuevoRun,
      nombre: valores.nombre.trim(),
      apellidos: valores.apellidos.trim(),
      correo: valores.correo.trim(),
      fechaNacimiento: valores.fechaNacimiento,
      tipoUsuario: valores.tipoUsuario as TipoUsuario,
      region: valores.region,
      comuna: valores.comuna,
      direccion: valores.direccion.trim(),
    };

    if (existente) {
      // Editar: si la contraseña quedó vacía, se mantiene la anterior
      const password = valores.password || existente.password;
      guardarUsuarios(
        usuarios.map((u) => (u.run === existente.run ? { ...u, ...datos, password } : u)),
      );
    } else {
      guardarUsuarios([...usuarios, { ...datos, password: valores.password }]);
    }
    navigate("/admin/usuarios");
  }

  return (
    <>
      <EncabezadoAdmin
        titulo={editando ? "Editar usuario" : "Nuevo usuario"}
        subtitulo="Los campos marcados con * son obligatorios."
      >
        <Link to="/admin/usuarios" className="btn btn-outline-primary">
          Volver al listado
        </Link>
      </EncabezadoAdmin>

      {errorGeneral && <div className="alert alert-danger">{errorGeneral}</div>}

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <form className="formulario formulario--ancho" onSubmit={enviar} noValidate>
            <div className="formulario__fila">
              <Campo
                id="run"
                etiqueta="RUN *"
                valor={valores.run}
                alCambiar={(v) => cambiar("run", v)}
                alSalir={() => validar("run")}
                error={errores.run}
                ayuda="Sin puntos ni guion. Ej: 19011022K"
                maxLength={9}
              />
              <Campo
                id="tipoUsuario"
                etiqueta="Tipo de usuario *"
                tipo="select"
                opciones={opcionesTipo}
                valor={valores.tipoUsuario}
                alCambiar={(v) => cambiar("tipoUsuario", v)}
              />
            </div>
            <div className="formulario__fila">
              <Campo
                id="nombre"
                etiqueta="Nombre *"
                valor={valores.nombre}
                alCambiar={(v) => cambiar("nombre", v)}
                alSalir={() => validar("nombre")}
                error={errores.nombre}
                ayuda="Máximo 50 caracteres."
                maxLength={50}
              />
              <Campo
                id="apellidos"
                etiqueta="Apellidos *"
                valor={valores.apellidos}
                alCambiar={(v) => cambiar("apellidos", v)}
                alSalir={() => validar("apellidos")}
                error={errores.apellidos}
                ayuda="Máximo 100 caracteres."
                maxLength={100}
              />
            </div>
            <div className="formulario__fila">
              <Campo
                id="correo"
                etiqueta="Correo *"
                tipo="email"
                valor={valores.correo}
                alCambiar={(v) => cambiar("correo", v)}
                alSalir={() => validar("correo")}
                error={errores.correo}
                ayuda="Solo @duoc.cl, @profesor.duoc.cl o @gmail.com."
                maxLength={100}
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
            <Campo
              id="password"
              etiqueta="Contraseña *"
              tipo="password"
              valor={valores.password}
              alCambiar={(v) => cambiar("password", v)}
              alSalir={() => validar("password")}
              error={errores.password}
              ayuda={
                editando
                  ? "Déjala vacía para mantener la contraseña actual."
                  : "Entre 4 y 10 caracteres."
              }
              maxLength={10}
            />
            <div className="formulario__fila">
              <Campo
                id="region"
                etiqueta="Región *"
                tipo="select"
                opciones={opcionesRegion}
                valor={valores.region}
                alCambiar={cambiarRegion}
              />
              <Campo
                id="comuna"
                etiqueta="Comuna *"
                tipo="select"
                opciones={opcionesComuna}
                valor={valores.comuna}
                alCambiar={(v) => cambiar("comuna", v)}
              />
            </div>
            <Campo
              id="direccion"
              etiqueta="Dirección *"
              valor={valores.direccion}
              alCambiar={(v) => cambiar("direccion", v)}
              alSalir={() => validar("direccion")}
              error={errores.direccion}
              ayuda="Máximo 300 caracteres."
              maxLength={300}
            />
            <div className="d-flex flex-wrap gap-2">
              <Boton tipo="submit">Guardar usuario</Boton>
              <Link to="/admin/usuarios" className="btn btn-outline-primary">
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminUsuarioForm;
