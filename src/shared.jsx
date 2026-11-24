import { useEffect, useRef, useState } from 'react'
import logoUrl from './assets/logo.png'

import heroVideoUrl from './assets/hero.mp4'

export const logo = logoUrl
export const heroVideo = heroVideoUrl

export const WA = '51999999999' // TODO: número real de WhatsApp
export const wa = (text) => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`
export const MAPS = 'https://www.google.com/maps/search/?api=1&query=Av.+Primavera+120+Santiago+de+Surco+Lima'

export const U = (id, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

// Contenido tomado del brochure institucional. Las fotos son provisionales.
export const SERVICES = [
  { name: 'Cabello', desc: 'Cortes, peinados, color, balayage, alisados, tratamientos capilares, extensiones y pelucas.', img: U('photo-1560066984-138dadb4c035'), speed: 0.06, offset: 0 },
  { name: 'Manos y pies', desc: 'Manicure tradicional, gel, rubber, dip powder, polygel, uñas acrílicas, diseños y pedicure.', img: U('photo-1604654894610-df63bc536371'), speed: -0.05, offset: 90 },
  { name: 'Cejas y pestañas', desc: 'Diseño, perfilado, laminado, henna, lifting, tinturado y extensiones de pestañas.', img: U('photo-1583001931096-959e9a1a6223'), speed: 0.09, offset: 40 },
  { name: 'Maquillaje', desc: 'Maquillaje social y aplicación de pestañas para celebraciones y ocasiones especiales.', img: U('photo-1522337360788-8b13dee7a37e'), speed: -0.07, offset: 40 },
  { name: 'Pigmentación', desc: 'Microblading, shading, microshading, Full Lips y microdelineado.', img: U('photo-1596462502278-27bfdc403348'), speed: 0.05, offset: 0 },
  { name: 'Depilación', desc: 'Bozo, patillas, rostro y zonas específicas según el servicio solicitado.', img: U('photo-1570172619644-dfd03ed5d881'), speed: -0.08, offset: 90 },
]

export const MARQUEE = SERVICES.map((s) => s.name)

export const PRINCIPLES = [
  ['Escuchar', 'Comprender las preferencias y necesidades.'],
  ['Respetar', 'Valorar cada decisión y forma de expresarse.'],
  ['Potenciar', 'Realzar la belleza y seguridad de cada persona.'],
]

// TODO: reemplazar por testimonios reales de clientes
export const REVIEWS = [
  ['Me escucharon, me explicaron todo y salí feliz con el resultado.', 'Cliente BÉME'],
  ['Un lugar tranquilo y bonito, con una atención muy cercana.', 'Cliente BÉME'],
  ['Mis uñas y mis cejas nunca habían quedado tan bien.', 'Cliente BÉME'],
]

export const FAQ = [
  ['¿Qué servicios ofrecen?', 'Cabello, manos y pies, cejas y pestañas, maquillaje, pigmentación y depilación, todo en un mismo espacio.'],
  ['¿Cómo reservo mi cita?', 'Escríbenos por WhatsApp o usa el formulario de esta página y te confirmamos tu horario.'],
  ['¿Dónde están ubicados?', 'En Av. Primavera 120, dpto. 501-2, Santiago de Surco, Lima.'],
  ['¿Tienen atención para pacientes oncológicos?', 'Sí. BÉME tiene un compromiso de apoyo a pacientes oncológicos, con una atención considerada que respeta sus tiempos y su privacidad.'],
]

export function Arrow() {
  return (
    <svg className="arrow" width="22" height="10" viewBox="0 0 22 10" fill="none" aria-hidden="true">
      <path d="M0 5h20M16 1l4 4-4 4" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setOn(true), io.disconnect()),
      { threshold: 0.15 },
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} className={`reveal ${on ? 'is-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  )
}


// Detalle de cada servicio (del brochure). Para mostrar un precio, agrega el
// nombre exacto del ítem aquí, p. ej. 'Corte': 'S/ 60'. Sin precio → "Consultar".
export const SERVICE_ITEMS = {
  'Cabello': ['Cortes', 'Peinados', 'Color', 'Balayage', 'Alisados', 'Tratamientos capilares', 'Extensiones', 'Pelucas'],
  'Manos y pies': ['Manicure tradicional', 'Gel', 'Rubber', 'Dip powder', 'Polygel', 'Uñas acrílicas', 'Diseños', 'Pedicure'],
  'Cejas y pestañas': ['Diseño', 'Perfilado', 'Laminado', 'Henna', 'Lifting', 'Tinturado', 'Extensiones de pestañas'],
  'Maquillaje': ['Maquillaje social', 'Aplicación de pestañas'],
  'Pigmentación': ['Microblading', 'Shading', 'Microshading', 'Full Lips', 'Microdelineado'],
  'Depilación': ['Bozo', 'Patillas', 'Rostro', 'Zonas específicas'],
}
export const PRICES = {}
