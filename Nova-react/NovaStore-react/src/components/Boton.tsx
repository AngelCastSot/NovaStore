import type { ReactNode } from "react";

// Botón reutilizable. En vez de escribir <button> en cada página,
// usamos este componente y solo cambiamos las clases de Bootstrap.
interface Props {
  children?: ReactNode; // texto o contenido del botón
  clase?: string; // clases de Bootstrap (por defecto, botón azul/verde primario)
  tipo?: "button" | "submit"; // "submit" sirve para enviar un formulario
  desactivado?: boolean;
  etiqueta?: string; // texto para lectores de pantalla (accesibilidad)
  titulo?: string; // texto que aparece al dejar el mouse encima
  alHacerClic?: () => void;
}

function Boton({
  children,
  clase = "btn btn-primary",
  tipo = "button",
  desactivado = false,
  etiqueta,
  titulo,
  alHacerClic,
}: Props) {
  return (
    <button
      type={tipo}
      className={clase}
      disabled={desactivado}
      aria-label={etiqueta}
      title={titulo}
      onClick={alHacerClic}
    >
      {children}
    </button>
  );
}

export default Boton;
