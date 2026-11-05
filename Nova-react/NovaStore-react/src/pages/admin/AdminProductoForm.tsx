import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Boton from "../../components/Boton";
import Campo from "../../components/Campo";
import EncabezadoAdmin from "../../components/EncabezadoAdmin";
import { guardarProductos, obtenerProductos } from "../../data/almacenamiento";
import { CATEGORIAS, IMAGENES_PRODUCTO, type Producto } from "../../data/Producto";
import type { Sesion } from "../../data/Usuario";
import {
  esNumeroDecimalValido,
  esNumeroEntero,
  esRequerido,
  tieneLargoMaximo,
  tieneLargoMinimo,
  validarCampo,
  type Errores,
  type Regla,
} from "../../validaciones";

const REGLAS: Record<string, Regla[]> = {
  codigo: [
    { test: esRequerido, mensaje: "El código es obligatorio." },
    { test: (v) => tieneLargoMinimo(v, 3), mensaje: "Mínimo 3 caracteres." },
  ],
  nombre: [
    { test: esRequerido, mensaje: "El nombre es obligatorio." },
    { test: (v) => tieneLargoMaximo(v, 100), mensaje: "Máximo 100 caracteres." },
  ],
  descripcion: [
    { test: (v) => tieneLargoMaximo(v, 500), mensaje: "Máximo 500 caracteres." },
  ],
  precio: [
    { test: esRequerido, mensaje: "El precio es obligatorio." },
    { test: esNumeroDecimalValido, mensaje: "Usa solo números." },
    { test: (v) => Number(v) >= 0, mensaje: "El precio no puede ser negativo." },
  ],
  stock: [
    { test: esRequerido, mensaje: "El stock es obligatorio." },
    { test: esNumeroEntero, mensaje: "Debe ser un número entero." },
    { test: (v) => Number(v) >= 0, mensaje: "El stock no puede ser negativo." },
  ],
  // El stock crítico es opcional: si está vacío no se valida
  stockCritico: [
    { test: (v) => !esRequerido(v) || esNumeroEntero(v), mensaje: "Debe ser un número entero." },
    { test: (v) => !esRequerido(v) || Number(v) >= 0, mensaje: "No puede ser negativo." },
  ],
};

interface Props {
  sesion: Sesion | null;
}

// Sirve para crear un producto (/admin/productos/nuevo)
// y para editarlo (/admin/productos/:id/editar)
function AdminProductoForm({ sesion }: Props) {
  const { id } = useParams(); // si hay id, estamos editando
  const navigate = useNavigate();

  // Si estamos editando, buscamos el producto una sola vez al abrir el formulario
  const [existente] = useState(() =>
    id ? obtenerProductos().find((p) => p.id === id) : undefined,
  );

  // Los valores del formulario parten con los datos del producto (o vacíos si es nuevo)
  const [valores, setValores] = useState<Record<string, string>>({
    codigo: existente?.codigo ?? "",
    nombre: existente?.nombre ?? "",
    descripcion: existente?.descripcion ?? "",
    precio: existente ? String(existente.precio) : "",
    stock: existente ? String(existente.stock) : "",
    stockCritico: String(existente?.stockCritico ?? ""),
    categoria: existente?.categoria ?? "",
    imagen: existente?.imagen ?? IMAGENES_PRODUCTO[0].valor,
  });
  const [errores, setErrores] = useState<Errores>({});
  const [errorGeneral, setErrorGeneral] = useState("");

  // Solo el administrador puede entrar a este formulario
  if (sesion?.tipoUsuario !== "administrador") {
    return <Navigate to="/admin" replace />;
  }

  // Si la dirección tiene un id que no existe
  if (id && !existente) {
    return (
      <>
        <EncabezadoAdmin titulo="Editar producto" subtitulo="Producto no encontrado." />
        <Link to="/admin/productos" className="btn btn-outline-primary">
          Volver al listado
        </Link>
      </>
    );
  }

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
    setErrorGeneral("");

    const resultados = Object.keys(REGLAS).map((campo) => validar(campo));
    if (!valores.categoria) {
      setErrorGeneral("Selecciona una categoría para el producto.");
      return;
    }
    if (!resultados.every((ok) => ok)) return;

    // No puede haber dos productos con el mismo código
    const productos = obtenerProductos();
    const codigoRepetido = productos.some(
      (p) =>
        p.codigo.toLowerCase() === valores.codigo.trim().toLowerCase() && p.id !== id,
    );
    if (codigoRepetido) {
      setErrorGeneral("Ya existe otro producto con ese código.");
      return;
    }

    // Datos del producto ya convertidos al tipo correcto (números, null, etc.)
    const datos: Omit<Producto, "id"> = {
      codigo: valores.codigo.trim().toUpperCase(),
      nombre: valores.nombre.trim(),
      descripcion: valores.descripcion.trim(),
      precio: Number(valores.precio),
      stock: Number(valores.stock),
      stockCritico: valores.stockCritico === "" ? null : Number(valores.stockCritico),
      categoria: valores.categoria,
      imagen: valores.imagen,
    };

    if (existente) {
      // Editar: reemplazamos solo el producto que estamos editando
      guardarProductos(
        productos.map((p) => (p.id === existente.id ? { ...p, ...datos } : p)),
      );
    } else {
      // Crear: le inventamos un id con la hora actual
      const nuevoId = "P" + Date.now().toString().slice(-6);
      guardarProductos([...productos, { id: nuevoId, ...datos }]);
    }
    navigate("/admin/productos");
  }

  return (
    <>
      <EncabezadoAdmin
        titulo={existente ? "Editar producto" : "Nuevo producto"}
        subtitulo="Los campos marcados con * son obligatorios."
      >
        <Link to="/admin/productos" className="btn btn-outline-primary">
          Volver al listado
        </Link>
      </EncabezadoAdmin>

      {errorGeneral && <div className="alert alert-danger">{errorGeneral}</div>}

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <form className="formulario formulario--ancho" onSubmit={enviar} noValidate>
            <div className="formulario__fila">
              <Campo
                id="codigo"
                etiqueta="Código del producto *"
                valor={valores.codigo}
                alCambiar={(v) => cambiar("codigo", v)}
                alSalir={() => validar("codigo")}
                error={errores.codigo}
                ayuda="Texto, mínimo 3 caracteres."
              />
              <Campo
                id="categoria"
                etiqueta="Categoría *"
                tipo="select"
                opciones={[
                  { valor: "", texto: "Selecciona una categoría" },
                  ...CATEGORIAS.map((c) => ({ valor: c.id, texto: c.nombre })),
                ]}
                valor={valores.categoria}
                alCambiar={(v) => cambiar("categoria", v)}
              />
            </div>
            <Campo
              id="nombre"
              etiqueta="Nombre *"
              valor={valores.nombre}
              alCambiar={(v) => cambiar("nombre", v)}
              alSalir={() => validar("nombre")}
              error={errores.nombre}
              ayuda="Máximo 100 caracteres."
              maxLength={100}
            />
            <Campo
              id="descripcion"
              etiqueta="Descripción"
              tipo="textarea"
              valor={valores.descripcion}
              alCambiar={(v) => cambiar("descripcion", v)}
              alSalir={() => validar("descripcion")}
              error={errores.descripcion}
              ayuda="Opcional. Máximo 500 caracteres."
              maxLength={500}
            />
            <div className="formulario__fila">
              <Campo
                id="precio"
                etiqueta="Precio *"
                tipo="number"
                min={0}
                step="0.01"
                valor={valores.precio}
                alCambiar={(v) => cambiar("precio", v)}
                alSalir={() => validar("precio")}
                error={errores.precio}
                ayuda="Mínimo 0. Con 0 el producto se muestra como gratis."
              />
              <Campo
                id="stock"
                etiqueta="Stock *"
                tipo="number"
                min={0}
                step={1}
                valor={valores.stock}
                alCambiar={(v) => cambiar("stock", v)}
                alSalir={() => validar("stock")}
                error={errores.stock}
                ayuda="Solo números enteros, mínimo 0."
              />
            </div>
            <Campo
              id="stockCritico"
              etiqueta="Stock crítico"
              tipo="number"
              min={0}
              step={1}
              valor={valores.stockCritico}
              alCambiar={(v) => cambiar("stockCritico", v)}
              alSalir={() => validar("stockCritico")}
              error={errores.stockCritico}
              ayuda="Opcional. Avisa cuando el stock llegue a este número."
            />
            <Campo
              id="imagen"
              etiqueta="Imagen"
              tipo="select"
              opciones={IMAGENES_PRODUCTO}
              valor={valores.imagen}
              alCambiar={(v) => cambiar("imagen", v)}
              ayuda="Opcional. Elige la ilustración que representa al producto."
            />
            <div className="campo">
              <span className="campo__label">Vista previa</span>
              <img
                src={"/img/" + valores.imagen}
                alt="Vista previa del producto"
                className="admin-previsualizacion"
              />
            </div>
            <div className="d-flex flex-wrap gap-2">
              <Boton tipo="submit">Guardar producto</Boton>
              <Link to="/admin/productos" className="btn btn-outline-primary">
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminProductoForm;
