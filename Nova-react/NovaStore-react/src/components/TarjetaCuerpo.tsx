import type { ReactNode } from "react";

// Parte interior de una tarjeta de Bootstrap (card-body).
// Muestra, en este orden: antetítulo, título, texto y lo que pongamos dentro (children).
interface Props {
  clase?: string;
  claseTitulo?: string;
  claseTexto?: string;
  antetitulo?: ReactNode; // algo pequeño que va arriba del título (ej: una fecha o etiquetas)
  titulo?: ReactNode;
  texto?: ReactNode;
  children?: ReactNode;
}

function TarjetaCuerpo({
  clase = "card-body",
  claseTitulo = "card-title h5",
  claseTexto = "card-text",
  antetitulo,
  titulo,
  texto,
  children,
}: Props) {
  return (
    <div className={clase}>
      {antetitulo}
      {titulo && <h3 className={claseTitulo}>{titulo}</h3>}
      {texto && <p className={claseTexto}>{texto}</p>}
      {children}
    </div>
  );
}

export default TarjetaCuerpo;
