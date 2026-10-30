// Interface exportada de Producto
export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: string;
  urlImagen: string;
  altImagen: string;
}

// Arreglo exportado de varios productos
export const PRODUCTOS: Producto[] = [
  {
    id: "A1",
    nombre: "Audifonos Inalámbricos",
    descripcion:
      "Audifonos Inalámbricos con sonido envolvente y mas de 30 hora de bateria.",
    precio: "24990",
    urlImagen: "img/productos/audifonos.webp",
    altImagen: "Audifonos inalambricos",
  },
  {
    id: "B2",
    nombre: "Parlante portátil mini",
    descripcion:
      "Parlante bluetooth resistente al agua, 12 horas de autonomia.",
    precio: "30990",
    urlImagen: "img/productos/parlante.webp",
    altImagen: "Parlante portatil",
  },
  {
    id: "C3",
    nombre: "Mouse Inalámbrico",
    descripcion: "Mouse Inalámbrico 2.4 ghz y bluetooth.",
    precio: "23990",
    urlImagen: "img/productos/mouse.jpg",
    altImagen: "Mouse inalambrico",
  },
  {
    id: "D4",
    nombre: "Teclado Mécanico",
    descripcion:
      "Teclado Mécanico con switches azules, RGB programable y layout español.",
    precio: "15990",
    urlImagen: "img/productos/teclado.jpg",
    altImagen: "Teclado Mecanico",
  },
];
