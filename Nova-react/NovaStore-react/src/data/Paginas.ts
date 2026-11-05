// Páginas que aparecen en el menú de navegación (Navbar)
export interface Pagina {
  nombre: string;
  ruta: string;
}

export const PAGINAS: Pagina[] = [
  { nombre: "Inicio", ruta: "/" },
  { nombre: "Productos", ruta: "/productos" },
  { nombre: "Blog", ruta: "/blog" },
  { nombre: "Nosotros", ruta: "/nosotros" },
  { nombre: "Contacto", ruta: "/contacto" },
];
