export interface Pagina {
  nombre: string;
  ruta: string;
  nombreCorto: string;
}

export const PAGINAS: Pagina[] = [
  {
    nombre: "Inicio",
    ruta: "/",
    nombreCorto: "Inicio",
  },
  {
    nombre: "Productos",
    ruta: "/Productos",
    nombreCorto: "Productos",
  },
  {
    nombre: "Contacto",
    ruta: "/Contacto",
    nombreCorto: "Contacto",
  },
  {
    nombre: "Sobre nosotros",
    ruta: "/Nosotros",
    nombreCorto: "Nosotros",
  },
  {
    nombre: "Inico Sesion",
    ruta: "/Login",
    nombreCorto: "Login",
  },
  /*{
    nombre: "Blog",
    ruta: "/Blog",
    nombreCorto: "Blog",
  },*/
];
