import { Fragment, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import Contacto from "./pages/Contacto";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PiePagina from "./components/PiePagina";

function App() {
  // Estado que controla qué vista se muestra en pantalla
  const [paginaActual, setPaginaActual] = useState("home");

  return (
    <BrowserRouter>
      <Fragment>
        {/* Le pasamos setPaginaActual al Navbar para que los botones cambien la vista */}
        <Navbar cambiarPagina={setPaginaActual} paginaActual={paginaActual} />

        <main>
          <Routes>
            <Route
              path="/"
              element={<Home cambiarPagina={setPaginaActual}></Home>}
            ></Route>
            <Route path="/productos" element={<Productos></Productos>}></Route>
            <Route path="/carrito" element={<Carrito></Carrito>}></Route>
            <Route path="/contacto" element={<Contacto></Contacto>}></Route>
            <Route
              path="/login"
              element={<Login cambiarPagina={setPaginaActual}></Login>}
            ></Route>
          </Routes>
        </main>

        <PiePagina cambiarPagina={setPaginaActual}></PiePagina>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
