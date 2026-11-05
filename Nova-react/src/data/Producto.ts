// Tipo de dato de un producto (cada propiedad con su tipo)
export interface Producto {
  id: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  precio: number; // en pesos chilenos; si es 0 se muestra "Gratis"
  stock: number;
  stockCritico: number | null; // cuando el stock llega a este número se avisa
  categoria: string; // id de la categoría
  imagen: string; // ruta dentro de /public/img/
}

export interface Categoria {
  id: string;
  nombre: string;
}

// Productos iniciales. Si el administrador los modifica, se guardan en localStorage.
export const PRODUCTOS: Producto[] = [
  {
    id: "P001",
    codigo: "AUD-001",
    nombre: "Audífonos Inalámbricos Nova Pulse",
    descripcion:
      "Audífonos over-ear con cancelación de ruido activa y 30 horas de batería.",
    precio: 49990,
    stock: 18,
    stockCritico: 4,
    categoria: "audio",
    imagen: "productos/audifonos.png",
  },
  {
    id: "P002",
    codigo: "AUD-002",
    nombre: "Parlante Portátil Orbe Mini",
    descripcion:
      "Parlante bluetooth resistente al agua (IPX6), 12 horas de autonomía.",
    precio: 24990,
    stock: 32,
    stockCritico: 6,
    categoria: "audio",
    imagen: "productos/parlante.png",
  },
  {
    id: "P003",
    codigo: "COM-001",
    nombre: "Mouse Ergonómico Flux",
    descripcion: "Mouse inalámbrico ergonómico con sensor óptico de 4000 DPI.",
    precio: 45990,
    stock: 40,
    stockCritico: 8,
    categoria: "computacion",
    imagen: "productos/mouse.png",
  },
  {
    id: "P004",
    codigo: "COM-002",
    nombre: "Teclado Mecánico Cascade",
    descripcion:
      "Teclado mecánico switches rojos, retroiluminado RGB, layout español.",
    precio: 39990,
    stock: 12,
    stockCritico: 3,
    categoria: "computacion",
    imagen: "productos/teclado.png",
  },
  {
    id: "P005",
    codigo: "HOG-001",
    nombre: "Lámpara Inteligente Halo",
    descripcion: "Lámpara LED con control por app, 16 millones de colores.",
    precio: 18990,
    stock: 25,
    stockCritico: 5,
    categoria: "hogar-inteligente",
    imagen: "productos/lampara.png",
  },
  {
    id: "P006",
    codigo: "HOG-002",
    nombre: "Enchufe Inteligente Nexo",
    descripcion: "Enchufe wifi con medición de consumo y control por voz.",
    precio: 9990,
    stock: 3,
    stockCritico: 5,
    categoria: "hogar-inteligente",
    imagen: "productos/enchufe.png",
  },
  {
    id: "P007",
    codigo: "GAM-001",
    nombre: "Control Gamer Vortex Pro",
    descripcion:
      "Control inalámbrico compatible con PC y consolas, gatillos programables.",
    precio: 32990,
    stock: 20,
    stockCritico: 4,
    categoria: "gaming",
    imagen: "productos/mando.png",
  },
  {
    id: "P008",
    codigo: "GAM-002",
    nombre: "Silla Gamer Apex",
    descripcion: "Silla ergonómica reclinable con soporte lumbar ajustable.",
    precio: 129990,
    stock: 6,
    stockCritico: 2,
    categoria: "gaming",
    imagen: "productos/silla.png",
  },
  {
    id: "P009",
    codigo: "WEA-001",
    nombre: "Smartwatch Pulse Fit",
    descripcion:
      "Reloj inteligente con monitor cardíaco, GPS y resistencia al agua.",
    precio: 45990,
    stock: 15,
    stockCritico: 3,
    categoria: "wearables",
    imagen: "productos/smartwatch.png",
  },
  {
    id: "P010",
    codigo: "WEA-002",
    nombre: "Pulsera Fitness Bandy",
    descripcion:
      "Pulsera de actividad física con notificaciones y monitor de sueño.",
    precio: 0,
    stock: 50,
    stockCritico: 10,
    categoria: "wearables",
    imagen: "productos/pulsera.png",
  },
];

export const CATEGORIAS: Categoria[] = [
  { id: "audio", nombre: "Audio" },
  { id: "computacion", nombre: "Computación" },
  { id: "hogar-inteligente", nombre: "Hogar Inteligente" },
  { id: "gaming", nombre: "Gaming" },
  { id: "wearables", nombre: "Wearables" },
];

// Imágenes que se pueden elegir en el formulario de productos del panel admin
export const IMAGENES_PRODUCTO = [
  { valor: "productos/audifonos-nova-pulse.svg", texto: "Audífonos" },
  { valor: "productos/parlante-orbe-mini.svg", texto: "Parlante" },
  { valor: "productos/mouse-flux.svg", texto: "Mouse" },
  { valor: "productos/teclado-cascade.svg", texto: "Teclado" },
  { valor: "productos/lampara-halo.svg", texto: "Lámpara" },
  { valor: "productos/enchufe-nexo.svg", texto: "Enchufe inteligente" },
  { valor: "productos/control-vortex-pro.svg", texto: "Control gamer" },
  { valor: "productos/silla-apex.svg", texto: "Silla gamer" },
  { valor: "productos/smartwatch-pulse-fit.svg", texto: "Smartwatch" },
  { valor: "productos/pulsera-bandy.svg", texto: "Pulsera fitness" },
];
