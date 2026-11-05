// Funciones pequeñas para mostrar precios y fechas

// 49990 -> "$49.990" (y si el precio es 0 mostramos "Gratis")
export function formatearCLP(valor: number): string {
  if (valor === 0) return "Gratis";
  return valor.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });
}

// Fecha ISO completa (con hora) -> "04-11-2026 15:30"
export function formatearFecha(iso: string): string {
  const fecha = new Date(iso);
  return (
    fecha.toLocaleDateString("es-CL") +
    " " +
    fecha.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })
  );
}

// Fecha simple "2026-03-12" -> "12-03-2026".
// Se agrega la hora para que no se corra un día por la zona horaria.
export function formatearDia(fecha: string): string {
  return new Date(fecha + "T00:00:00").toLocaleDateString("es-CL");
}
