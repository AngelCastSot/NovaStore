// Un producto dentro del carrito (también se guarda igual dentro de una orden)
export interface ItemCarrito {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  cantidad: number;
}

export type EstadoOrden = "pendiente" | "preparando" | "enviada" | "entregada";

export const ESTADOS_ORDEN: EstadoOrden[] = [
  "pendiente",
  "preparando",
  "enviada",
  "entregada",
];

// Una orden de compra: se crea cuando el cliente finaliza su carrito
export interface Orden {
  id: string; // ej: ORD-0001
  fecha: string; // fecha en formato ISO
  clienteRun: string;
  clienteNombre: string;
  clienteCorreo: string;
  estado: EstadoOrden;
  items: ItemCarrito[];
  total: number;
}
