import { Link, useParams } from "react-router-dom";
import Contenedor from "../components/Contenedor";
import { PRODUCTOS } from "../data/Producto";
import Boton from "../components/Boton";

// Defino los tipos en los parametros de direccion
interface ProductoParams {
  id: string; // Id del producto
  [key: string]: string | undefined; // Cualquier otra propiedad que quiera enviar por parametros url
  // Puede ser un string o un dato no definido (undefined)
  // undefined != null != ""
}

function Producto2() {
  const { id } = useParams<ProductoParams>();
  console.log("Estoy en producto id=" + id);

  const producto = PRODUCTOS.find((p) => p.id === id);

  if (!producto) {
    return (
      <Contenedor clase="container text-center my-5">
        <h2 className="text-center my-5">Producto no encontrado</h2>
        <Link className="btn btn-outline-secondary" to={"/"}>
          Volver al Inicio
        </Link>
      </Contenedor>
    );
  }

  console.log("Nombre: " + producto.nombre);

  return (
    <Contenedor>
      <div className="my-5">
        <Link className="btn btn-outline-secondary" to={"/"}>
          ⬅️Volver a la Tienda
        </Link>
      </div>
      <div className="row">
        <div className="col-md-6">
          <img
            src={"/" + producto.urlImagen}
            alt={producto.altImagen}
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          {/* Datos del producto */}
          <p>ID: {producto.id}</p>
          <h1 className="text-success">{producto.nombre}</h1>
          <p>Descripcion: {producto.descripcion}</p>
          <h3 className="text-success">${producto.precio}</h3>
          <Boton>Añadir al carrito</Boton>
        </div>
      </div>
    </Contenedor>
  );
}

export default Producto2;
