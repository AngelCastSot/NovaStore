import { useState } from "react";
import Boton from "../components/Boton";
import Contenedor from "../components/Contenedor";
import TarjetaProducto from "../components/TarjetaProducto";
import { obtenerProductos } from "../data/almacenamiento";
import { CATEGORIAS } from "../data/Producto";

interface Props {
  agregarAlCarrito: (id: string, cantidad: number) => boolean;
}

function Productos({ agregarAlCarrito }: Props) {
  const [productos] = useState(obtenerProductos);

  // Un estado por cada filtro de la pantalla
  const [categoriaActiva, setCategoriaActiva] = useState("todas");
  const [texto, setTexto] = useState("");
  const [orden, setOrden] = useState("nombre");

  // Cada vez que cambia un estado, React vuelve a ejecutar esta función
  // y estos filtros se recalculan solos.
  const busqueda = texto.trim().toLowerCase();
  const lista = productos.filter((producto) => {
    const coincideCategoria =
      categoriaActiva === "todas" || producto.categoria === categoriaActiva;
    const coincideTexto =
      producto.nombre.toLowerCase().includes(busqueda) ||
      producto.descripcion.toLowerCase().includes(busqueda);
    return coincideCategoria && coincideTexto;
  });

  // Ordenamos la lista según lo elegido
  if (orden === "precio-asc") lista.sort((a, b) => a.precio - b.precio);
  else if (orden === "precio-desc") lista.sort((a, b) => b.precio - a.precio);
  else lista.sort((a, b) => a.nombre.localeCompare(b.nombre));

  // Botones de categoría: "Todas" + las categorías de los datos
  const categorias = [{ id: "todas", nombre: "Todas" }, ...CATEGORIAS];

  return (
    <Contenedor clase="container py-4 py-lg-5">
      <h1 className="mb-2">Catálogo de productos</h1>
      <p className="mb-4">
        Filtra por categoría o busca por nombre para encontrar lo que necesitas.
      </p>

      <div className="row g-3 align-items-end mb-4">
        <div className="col-12 col-md-6 col-lg-4">
          <label className="form-label fw-semibold" htmlFor="buscador">
            Buscar producto
          </label>
          <input
            type="search"
            id="buscador"
            className="form-control"
            placeholder="Ej: audífonos, teclado..."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <label className="form-label fw-semibold" htmlFor="orden">
            Ordenar por
          </label>
          <select
            id="orden"
            className="form-select"
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
          >
            <option value="nombre">Nombre (A-Z)</option>
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
          </select>
        </div>
      </div>

      <div className="filtros-categoria">
        {categorias.map((categoria) => (
          <Boton
            key={categoria.id}
            clase={
              "filtros-categoria__boton" +
              (categoria.id === categoriaActiva ? " activo" : "")
            }
            alHacerClic={() => setCategoriaActiva(categoria.id)}
          >
            {categoria.nombre}
          </Boton>
        ))}
      </div>

      <p className="small">{lista.length} producto(s) encontrado(s)</p>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {lista.map((producto) => (
          <div className="col" key={producto.id}>
            <TarjetaProducto
              producto={producto}
              agregarAlCarrito={agregarAlCarrito}
            />
          </div>
        ))}
      </div>

      {/* Solo se muestra si la lista quedó vacía */}
      {lista.length === 0 && (
        <div className="alert alert-warning">
          No encontramos productos con esos filtros. Prueba con otra categoría o
          borra la búsqueda.
        </div>
      )}
    </Contenedor>
  );
}

export default Productos;
