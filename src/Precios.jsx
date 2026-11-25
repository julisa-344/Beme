import { useEffect, useMemo, useState } from 'react'
import CategoryNav from './components/precios/CategoryNav.jsx'
import ServiceTable from './components/precios/ServiceTable.jsx'
import { CATALOG, getCategory, flattenItems } from './data/catalog.js'
import { logo, wa, MAPS, Arrow } from './shared.jsx'
import './disruptiva.css'
import './precios.css'

const readCategory = () => getCategory(new URLSearchParams(window.location.search).get('cat')).id

export default function Precios() {
  const [activeId, setActiveId] = useState(readCategory)
  const category = getCategory(activeId)

  const items = useMemo(() => flattenItems(category), [category])

  // Al cambiar de categoría se guarda ?cat= en la URL (enlace compartible).
  const select = (id) => {
    setActiveId(id)
    const url = new URL(window.location.href)
    url.searchParams.set('cat', id)
    window.history.replaceState(null, '', url)
  }

  useEffect(() => {
    document.title = `${category.label} · Servicios y precios | BÉME Beauty Studio`
  }, [category.label])

  return (
    <div className="d-root is-ready p-page">
      <header className="p-top">
        <a href="/?v=disruptiva" aria-label="Volver al inicio"><img src={logo} alt="BÉME Beauty Studio" /></a>
        <nav>
          <a className="p-link" href="/?v=disruptiva#d-servicios">← Inicio</a>
          <a className="p-link" href={wa('Hola BÉME, quisiera reservar una cita.')} target="_blank" rel="noopener">Reservar</a>
        </nav>
      </header>

      <div className="p-shell">
        <aside className="p-aside">
          <p className="p-eyebrow">Servicios y precios</p>
          <CategoryNav categories={CATALOG} activeId={category.id} onChange={select} />
        </aside>

        <main className="p-main">
          <div className="p-head">
            <h1 className="p-title">{category.label}</h1>
            <p className="p-meta" aria-live="polite">
              {items.length} servicios
            </p>
          </div>

          <div id="p-panel" role="tabpanel" aria-labelledby={`tab-${category.id}`} key={category.id} className="p-panel">
            <ServiceTable items={items} categoryLabel={category.label} grouped />
          </div>

          <p className="p-note">
            Los precios marcados como "desde" pueden variar según el largo, la técnica o el producto.
            Confírmalos con nosotros al reservar.
          </p>
        </main>
      </div>

      <section className="p-cta">
        <h2>¿Lista para tu cita?</h2>
        <a className="d-btn d-btn--sand" href={wa('Hola BÉME, quisiera reservar una cita.')} target="_blank" rel="noopener">
          Reservar por WhatsApp <Arrow />
        </a>
        <p>
          Av. Primavera 120, dpto. 501-2 · Santiago de Surco, Lima ·{' '}
          <a className="d-underline" href={MAPS} target="_blank" rel="noopener">Ver en el mapa</a>
        </p>
      </section>

      <footer className="d-footer">
        <span>BEME BEAUTY STUDIO S.A.C. · RUC 20615366669</span>
        <a href="/?v=disruptiva">Volver al inicio</a>
      </footer>
    </div>
  )
}
