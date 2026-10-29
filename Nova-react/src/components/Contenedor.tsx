import type { ReactNode } from "react";

interface Props {
  clase?: string;
  children: ReactNode;
}

function Contenedor({ clase = "container", children }: Props) {
  return (
    <div className={clase}>
      {/* En 'children' va el contenido que quiero encerrar */}
      {children}
    </div>
  );
}

export default Contenedor;
