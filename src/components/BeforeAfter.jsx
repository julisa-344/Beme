import { useEffect, useRef, useState } from 'react'
import './before-after.css'

const clamp = (v, a = 0, b = 100) => Math.min(b, Math.max(a, v))

/**
 * Comparador antes/después con barra arrastrable.
 *
 * - Ratón, tacto y lápiz (Pointer Events); el scroll vertical de la página sigue funcionando en móvil.
 * - Teclado: ← → (±5), Shift+← → (±15), Inicio / Fin. Expuesto como `role="slider"`.
 * - Al entrar en pantalla hace un pequeño recorrido de muestra (se omite con "reducir movimiento").
 *
 * Props: before, after (URLs), alt, beforeLabel, afterLabel, initial (0-100),
 *        placeholder (true si `before` aún no existe: se muestra la foto de "después" atenuada).
 */
export default function BeforeAfter({
  before,
  after,
  alt,
  beforeLabel = 'Antes',
  afterLabel = 'Después',
  initial = 50,
  placeholder = false,
}) {
  const [pos, setPos] = useState(initial)
  const box = useRef(null)
  const dragging = useRef(false)
  const touched = useRef(false)

  const moveTo = (clientX) => {
    const rect = box.current.getBoundingClientRect()
    setPos(clamp(((clientX - rect.left) / rect.width) * 100))
  }

  const onPointerDown = (e) => {
    touched.current = true
    dragging.current = true
    box.current.setPointerCapture(e.pointerId)
    moveTo(e.clientX)
  }
  const onPointerMove = (e) => dragging.current && moveTo(e.clientX)
  const stop = () => { dragging.current = false }

  const onKeyDown = (e) => {
    const step = e.shiftKey ? 15 : 5
    const next = { ArrowLeft: pos - step, ArrowRight: pos + step, Home: 0, End: 100 }[e.key]
    if (next === undefined) return
    e.preventDefault()
    touched.current = true
    setPos(clamp(next))
  }

  // Recorrido de muestra una sola vez, al entrar en pantalla.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const run = (t) => {
        if (touched.current) return
        const p = Math.min((t - t0) / 2200, 1)
        // 50 -> 28 -> 72 -> 50
        setPos(50 + Math.sin(p * Math.PI * 2) * 22 * (1 - p * 0.2))
        if (p < 1) raf = requestAnimationFrame(run)
        else setPos(initial)
      }
      raf = requestAnimationFrame(run)
    }, { threshold: 0.5 })
    io.observe(box.current)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [initial])

  return (
    <div
      ref={box}
      className="ba"
      style={{ '--pos': `${pos}%` }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stop}
      onPointerCancel={stop}
    >
      <img className="ba__img" src={after} alt={`${alt} — ${afterLabel.toLowerCase()}`} draggable="false" />
      <img
        className={`ba__img ba__before ${placeholder ? 'is-placeholder' : ''}`}
        src={before ?? after}
        alt={`${alt} — ${beforeLabel.toLowerCase()}`}
        draggable="false"
      />

      <span className="ba__tag ba__tag--l">{beforeLabel}</span>
      <span className="ba__tag ba__tag--r">{afterLabel}</span>

      <div className="ba__line" aria-hidden="true" />
      <div
        className="ba__knob"
        role="slider"
        tabIndex={0}
        aria-label={`Comparar ${beforeLabel.toLowerCase()} y ${afterLabel.toLowerCase()}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)} % ${beforeLabel.toLowerCase()}`}
        onKeyDown={onKeyDown}
      >
        <svg width="26" height="14" viewBox="0 0 26 14" fill="none" aria-hidden="true">
          <path d="M8 1 2 7l6 6M18 1l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}
