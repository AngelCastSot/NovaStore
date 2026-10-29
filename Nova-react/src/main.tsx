import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './styles/variables.css'
//import './styles/base.css'
//import './styles/layout.css'
//import './styles/components.css'
//import './styles/forms.css'
//import './styles/tienda.css'
//import './styles/admin.css'
//import './styles/responsive.css'
//import './styles/brand-overrides.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
