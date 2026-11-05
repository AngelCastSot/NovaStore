// Campo de formulario reutilizable: etiqueta + control + ayuda + mensaje de error.
// Sirve para <input>, <textarea> y <select> según la propiedad "tipo".

interface Opcion {
  valor: string;
  texto: string;
}

interface Props {
  id: string;
  etiqueta: string;
  valor: string;
  alCambiar: (valor: string) => void; // se ejecuta cada vez que el usuario escribe
  alSalir?: () => void; // se ejecuta cuando el usuario sale del campo (para validar)
  tipo?: "text" | "email" | "password" | "date" | "number" | "textarea" | "select";
  opciones?: Opcion[]; // solo para tipo "select"
  ayuda?: string; // texto de ayuda debajo del campo
  // undefined = sin validar, "" = válido, "texto" = mensaje de error
  error?: string;
  maxLength?: number;
  min?: number;
  step?: number | string;
  autoComplete?: string;
}

function Campo({
  id,
  etiqueta,
  valor,
  alCambiar,
  alSalir,
  tipo = "text",
  opciones = [],
  ayuda,
  error,
  maxLength,
  min,
  step,
  autoComplete,
}: Props) {
  // Clase del control según el estado de la validación
  let clase = "campo__input";
  if (error) clase += " campo__input--error";
  else if (error === "") clase += " campo__input--valido";

  let control;
  if (tipo === "textarea") {
    control = (
      <textarea
        id={id}
        className={clase}
        value={valor}
        maxLength={maxLength}
        onChange={(e) => alCambiar(e.target.value)}
        onBlur={alSalir}
      />
    );
  } else if (tipo === "select") {
    control = (
      <select
        id={id}
        className={clase}
        value={valor}
        onChange={(e) => alCambiar(e.target.value)}
        onBlur={alSalir}
      >
        {opciones.map((opcion) => (
          <option key={opcion.valor} value={opcion.valor}>
            {opcion.texto}
          </option>
        ))}
      </select>
    );
  } else {
    control = (
      <input
        id={id}
        type={tipo}
        className={clase}
        value={valor}
        maxLength={maxLength}
        min={min}
        step={step}
        autoComplete={autoComplete}
        onChange={(e) => alCambiar(e.target.value)}
        onBlur={alSalir}
      />
    );
  }

  return (
    <div className="campo">
      <label className="campo__label" htmlFor={id}>
        {etiqueta}
      </label>
      {control}
      {ayuda && <span className="campo__ayuda">{ayuda}</span>}
      <span className="campo__error">{error}</span>
    </div>
  );
}

export default Campo;
