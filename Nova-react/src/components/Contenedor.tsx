import type { ReactNode } from "react";

// Contenedor genérico: es un <div> al que le podemos cambiar la clase.
// Lo usamos en lugar de repetir <section className="container ..."> en todas partes.
interface Props {
  clase?: string;
  children: ReactNode;
}

function Contenedor({ clase = "container", children }: Props) {
  return <div className={clase}>{children}</div>;
}

export default Contenedor;
