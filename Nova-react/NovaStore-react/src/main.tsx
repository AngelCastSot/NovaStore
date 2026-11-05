import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Bootstrap primero, para que nuestros estilos puedan sobrescribirlo
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/variables.css";
import "./styles/brand-overrides.css";
import "./styles/forms.css";
import "./styles/tienda.css";
import "./styles/admin.css";
import "./styles/responsive.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
