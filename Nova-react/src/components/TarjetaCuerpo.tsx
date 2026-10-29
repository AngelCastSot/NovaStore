import type { ReactNode } from "react";

interface Props {
  // Propiedades del estilo del cuerpo
  clase?: string;
  claseTitulo?: string;
  claseTexto?: string;
  // Propiedades del contenido del cuerpo
  titulo: string;
  texto: string;
  children: ReactNode;
}

function TarjetaCuerpo({
  clase = "card-body",
  claseTitulo = "card-title",
  claseTexto = "card-text",
  titulo,
  texto,
  children,
}: Props) {
  return (
    <div className={clase}>
      <h5 className={claseTitulo}>{titulo}</h5>
      <p className={claseTexto}>{texto}</p>
      {children}
    </div>
  );
}

export default TarjetaCuerpo;
