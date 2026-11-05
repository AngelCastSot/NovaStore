# NovaStore (React + TypeScript)

Migración del proyecto HTML plano NovaStore a React.

## Cómo ejecutarlo
    npm install
    npm run dev

Cuentas de prueba: `admin@duoc.cl / admin123` y `vendedor@duoc.cl / vend1234`.

## Estructura
    src/
      main.tsx            punto de entrada (carga Bootstrap y los CSS)
      App.tsx             rutas (<Routes>/<Route>) + estado del carrito y la sesión
      components/         Boton, Contenedor, Tarjeta, TarjetaCuerpo, TarjetaProducto,
                          Campo (campo de formulario), Navbar, PiePagina,
                          LayoutTienda, LayoutAdmin, EncabezadoAdmin
      data/               tipos y datos (Producto, Blog, Region, Usuario, Orden, Paginas)
                          + almacenamiento.ts (lee/guarda en localStorage)
      pages/              una página por ruta de la tienda
      pages/admin/        páginas del panel de administración
      validaciones.ts     reglas de validación de formularios
      formato.ts          formato de precios y fechas
      styles/             los mismos CSS del proyecto original

## Rutas
Tienda: `/`, `/productos`, `/productos/:id`, `/carrito`, `/login`, `/registro`,
`/contacto`, `/nosotros`, `/blog`, `/blog/:id`
Admin: `/admin`, `/admin/productos`, `/admin/productos/nuevo`, `/admin/productos/:id`,
`/admin/productos/:id/editar`, `/admin/ordenes`, `/admin/ordenes/:id`,
`/admin/usuarios`, `/admin/usuarios/nuevo`, `/admin/usuarios/:run/editar`
