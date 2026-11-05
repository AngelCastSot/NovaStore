// Funciones para validar los formularios.

// Una regla = una función que dice si el valor está bien + el mensaje si está mal
export interface Regla {
  test: (valor: string) => boolean;
  mensaje: string;
}

// Errores de un formulario, uno por campo:
//   undefined -> el campo todavía no se ha validado
//   ""        -> el campo está bien
//   "texto"   -> el campo tiene ese error
export type Errores = Record<string, string | undefined>;

const DOMINIOS_PERMITIDOS = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

export function esRequerido(valor: string): boolean {
  return valor.trim().length > 0;
}

export function tieneLargoMaximo(valor: string, max: number): boolean {
  return valor.trim().length <= max;
}

export function tieneLargoMinimo(valor: string, min: number): boolean {
  return valor.trim().length >= min;
}

export function esCorreoValido(valor: string): boolean {
  const patronGeneral = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!patronGeneral.test(valor)) return false;
  return DOMINIOS_PERMITIDOS.some((dominio) =>
    valor.toLowerCase().endsWith(dominio),
  );
}

export function esNumeroEntero(valor: string): boolean {
  return Number.isInteger(Number(valor)) && valor.trim() !== "";
}

export function esNumeroDecimalValido(valor: string): boolean {
  return !Number.isNaN(Number(valor)) && valor.trim() !== "";
}

// Valida un RUN chileno sin puntos ni guion (ej: 199876543) con el dígito verificador
export function esFormatoRunValido(run: string): boolean {
  const runLimpio = run.trim().toUpperCase();
  if (!/^[0-9]+[0-9K]$/.test(runLimpio)) return false;
  if (runLimpio.length < 7 || runLimpio.length > 9) return false;
  return true;
}

export function esDVRunValido(run: string): boolean {
  const runLimpio = run.trim().toUpperCase();
  if (!esFormatoRunValido(runLimpio)) return false;

  const cuerpo = runLimpio.slice(0, -1);
  const dv = runLimpio.slice(-1);

  let suma = 0;
  let multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }
  const resto = 11 - (suma % 11);
  let dvEsperado = String(resto);
  if (resto === 11) dvEsperado = "0";
  if (resto === 10) dvEsperado = "K";

  return dv === dvEsperado;
}

export function esRunValido(run: string): boolean {
  return esFormatoRunValido(run) && esDVRunValido(run);
}

// Revisa las reglas en orden. Devuelve el mensaje de la primera que falle,
// o "" si el valor cumple todas.
export function validarCampo(valor: string, reglas: Regla[]): string {
  for (const regla of reglas) {
    if (!regla.test(valor)) return regla.mensaje;
  }
  return "";
}
