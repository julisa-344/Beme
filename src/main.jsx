import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Femenina from './Femenina.jsx'
import Disruptiva from './Disruptiva.jsx'
import Precios from './Precios.jsx'

// Opciones de diseño: /  (Lujo Editorial) · /?v=femenina · /?v=disruptiva
const params = new URLSearchParams(window.location.search)
const v = params.get('v')
const page = params.get('page')

function Switcher() {
  return (
    <div className="switcher" role="group" aria-label="Opción de diseño">
      <a href="/" className={!v ? 'on' : ''}>Lujo Editorial</a>
      <a href="/?v=femenina" className={v === 'femenina' ? 'on' : ''}>Femenina</a>
      <a href="/?v=disruptiva" className={v === 'disruptiva' ? 'on' : ''}>Disruptiva</a>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Switcher />
    {v === 'femenina' ? <Femenina /> : v === 'disruptiva' ? (page === 'precios' ? <Precios /> : <Disruptiva />) : <App />}
  </StrictMode>,
)
