import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import Contacto from './pages/Contacto';

function App() {
  // Estado que controla qué vista se muestra en pantalla
  const [paginaActual, setPaginaActual] = useState('home');

  return (
    <div>
      {/* Le pasamos setPaginaActual al Navbar para que los botones cambien la vista */}
      <Navbar cambiarPagina={setPaginaActual} paginaActual={paginaActual} />

      <main>
        {paginaActual === 'home' && <Home cambiarPagina={setPaginaActual} />}
        {paginaActual === 'productos' && <Productos />}
        {paginaActual === 'carrito' && <Carrito />}
        {paginaActual === 'contacto' && <Contacto />}
        {paginaActual === 'login' && <Login cambiarPagina={setPaginaActual} />}
      </main>
    </div>
  );
}

export default App;