import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Femenina from './Femenina.jsx'
import Disruptiva from './Disruptiva.jsx'

// Opciones de diseño: /  (Lujo Editorial) · /?v=femenina · /?v=disruptiva
const v = new URLSearchParams(window.location.search).get('v')

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
    {v === 'femenina' ? <Femenina /> : v === 'disruptiva' ? <Disruptiva /> : <App />}
  </StrictMode>,
)
