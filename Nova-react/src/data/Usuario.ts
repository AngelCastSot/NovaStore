// Los tres perfiles que existen en el sistema
export type TipoUsuario = "administrador" | "vendedor" | "cliente";

export interface Usuario {
  run: string;
  nombre: string;
  apellidos: string;
  correo: string;
  password: string;
  fechaNacimiento: string;
  tipoUsuario: TipoUsuario;
  region: string; // id de la región
  comuna: string;
  direccion: string;
}

// Lo que guardamos de la persona que inició sesión (sin la contraseña)
export interface Sesion {
  run: string;
  nombre: string;
  correo: string;
  tipoUsuario: TipoUsuario;
}

// Usuarios que existen desde el principio (para poder probar el panel admin)
export const USUARIOS_INICIALES: Usuario[] = [
  {
    run: "111111111",
    nombre: "Admin",
    apellidos: "NovaStore",
    correo: "admin@duoc.cl",
    password: "admin123",
    fechaNacimiento: "",
    tipoUsuario: "administrador",
    region: "metropolitana",
    comuna: "Santiago",
    direccion: "Av. Siempre Viva 123",
  },
  {
    run: "222222222",
    nombre: "Vendedor",
    apellidos: "Demo",
    correo: "vendedor@duoc.cl",
    password: "vend1234",
    fechaNacimiento: "",
    tipoUsuario: "vendedor",
    region: "biobio",
    comuna: "Concepción",
    direccion: "Calle Comercio 456",
  },
];
