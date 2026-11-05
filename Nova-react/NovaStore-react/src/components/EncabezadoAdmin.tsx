import type { ReactNode } from "react";

// Título de cada página del panel de administración
// (a la derecha puede llevar un botón o enlace, que se pasa como children)
interface Props {
  titulo: string;
  subtitulo: string;
  children?: ReactNode;
}

function EncabezadoAdmin({ titulo, subtitulo, children }: Props) {
  return (
    <div className="admin-topbar">
      <div>
        <h1 className="h3 mb-1">{titulo}</h1>
        <p className="mb-0 small">{subtitulo}</p>
      </div>
      {children}
    </div>
  );
}

export default EncabezadoAdmin;
