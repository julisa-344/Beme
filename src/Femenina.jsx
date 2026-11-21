import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { wa, MAPS, U, SERVICES, MARQUEE, PRINCIPLES, REVIEWS, FAQ, Arrow, Reveal } from './shared.jsx'
import './femenina.css'

const NAV = [
  ['Servicios', '#f-servicios'],
  ['Opiniones', '#f-opiniones'],
  ['Preguntas', '#f-faq'],
  ['Contacto', '#f-reservar'],
]

const TONES = ['blush', 'sage', 'petal', 'rose', 'petal', 'sage']

function Sprig({ className = '' }) {
  return (
    <svg className={`f-sprig ${className}`} viewBox="0 0 120 240" fill="none" aria-hidden="true">
      <path d="M60 238C58 170 64 100 78 8" stroke="currentColor" strokeWidth="1.2" />
      {[30, 70, 110, 150, 190].map((y, i) => (
        <g key={y}>
          <path d={`M${64 - i * 1.5} ${y + 8}c-26-4-40-20-42-36 24 0 40 14 42 36z`} fill="currentColor" opacity="0.55" />
          <path d={`M${66 - i * 1.5} ${y - 6}c26-2 38-18 40-34-24 0-38 12-40 34z`} fill="currentColor" opacity="0.4" />
        </g>
      ))}
    </svg>
  )
}

export default function Femenina() {
  const [scrolled, setScrolled] = useState(false)
  const [form, setForm] = useState({ nombre: '', servicio: SERVICES[0].name, fecha: '' })

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = [...document.querySelectorAll('.f-root [data-speed]')]

    const update = () => {
      setScrolled(window.scrollY > 60)
      if (reduce) return
      const vh = window.innerHeight
      for (const el of els) {
        const r = el.parentElement.getBoundingClientRect()
        const center = r.top + r.height / 2 - vh / 2
        el.style.transform = `translate3d(0, ${(-center * Number(el.dataset.speed)).toFixed(1)}px, 0)`
      }
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    if (reduce) return () => window.removeEventListener('scroll', update)

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    lenis.on('scroll', update)
    let raf
    const loop = (t) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('scroll', update)
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  const submit = (e) => {
    e.preventDefault()
    const f = form
    window.open(
      wa(`Hola BÉME, soy ${f.nombre}. Quisiera reservar: ${f.servicio}${f.fecha ? ` para el ${f.fecha}` : ''}.`),
      '_blank',
      'noopener',
    )
  }

  return (
    <div className="f-root">
      <nav className={`f-nav ${scrolled ? 'f-nav--solid' : ''}`}>
        <a className="f-brand" href="#f-top">BÉME</a>
        <ul>
          {NAV.map(([label, href]) => (
            <li key={href}><a className="f-link" href={href}>{label}</a></li>
          ))}
        </ul>
        <a className="f-btn f-btn--solid f-btn--sm" href="#f-reservar">Reservar <Arrow /></a>
      </nav>

      <header className="f-hero" id="f-top">
        <span className="f-blob f-blob--a" />
        <span className="f-blob f-blob--b" />
        <Sprig className="f-sprig--l" />

        <div className="f-hero__copy">
          <p className="f-eyebrow">Beauty Studio · Santiago de Surco</p>
          <h1 className="f-hero__title">Béme</h1>
          <p className="f-script">un espacio para ti</p>
          <div className="f-hero__actions">
            <a className="f-btn f-btn--solid" href="#f-reservar">Reservar cita <Arrow /></a>
            <a className="f-btn f-btn--line" href="#f-servicios">Ver servicios</a>
          </div>
        </div>

        <div className="f-hero__art">
          <div className="f-arch f-arch--back" />
          <div className="f-arch f-arch--front" data-speed="0.05" style={{ backgroundImage: `url(${U('photo-1515377905703-c4788e51af15', 1200)})` }} />
          <div className="f-badge">
            <span>Mírame</span>
          </div>
        </div>
      </header>

      <div className="f-marquee" aria-hidden="true">
        <div className="f-marquee__row">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i}>{m}<i>✿</i></span>
          ))}
        </div>
      </div>

      <main>
        <section className="f-head" id="f-servicios">
          <Reveal as="p" className="f-script f-script--sm">nuestros</Reveal>
          <Reveal as="h2" className="f-h2">Servicios</Reveal>
        </section>

        <section className="f-services">
          {SERVICES.map((s, i) => (
            <Reveal key={s.name} className={`f-card f-card--${TONES[i]}`} delay={(i % 3) * 100}>
              <div className="f-card__img" style={{ backgroundImage: `url(${s.img})` }} />
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
              <a className="f-btn f-btn--line f-btn--sm" href={wa(`Hola BÉME, quisiera reservar ${s.name}.`)} target="_blank" rel="noopener">
                Reservar <Arrow />
              </a>
            </Reveal>
          ))}
        </section>

        <section className="f-principles">
          {PRINCIPLES.map(([t], i) => (
            <Reveal key={t} className="f-circle" delay={i * 120}>
              <span>{t}</span>
            </Reveal>
          ))}
        </section>

        <section className="f-reviews" id="f-opiniones">
          <div className="f-head">
            <Reveal as="p" className="f-script f-script--sm">lo que dicen</Reveal>
            <Reveal as="h2" className="f-h2">Opiniones</Reveal>
          </div>
          <div className="f-reviews__grid">
            {REVIEWS.map(([q, n], i) => (
              <Reveal as="figure" key={i} className="f-review" delay={i * 120}>
                <span className="f-review__mark" aria-hidden="true">“</span>
                <blockquote>{q}</blockquote>
                <figcaption>★★★★★ <span>{n}</span></figcaption>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="f-faq" id="f-faq">
          <div className="f-head f-head--left">
            <Reveal as="p" className="f-script f-script--sm">antes de reservar</Reveal>
            <Reveal as="h2" className="f-h2">Preguntas</Reveal>
          </div>
          <div className="f-faq__list">
            {FAQ.map(([q, a]) => (
              <details key={q} className="f-faq__item">
                <summary>{q}<span aria-hidden="true" /></summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="f-book" id="f-reservar">
          <Sprig className="f-sprig--r" />
          <div className="f-book__copy">
            <p className="f-script f-script--light">reserva tu momento</p>
            <h2 className="f-book__title">Un espacio para ti</h2>
            <p className="f-book__addr">
              Av. Primavera 120, dpto. 501-2<br />Santiago de Surco, Lima<br />
              <a className="f-link" href={MAPS} target="_blank" rel="noopener">Ver en el mapa</a>
            </p>
          </div>
          <form className="f-form" onSubmit={submit}>
            <input required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Tu nombre" aria-label="Nombre" />
            <select value={form.servicio} onChange={(e) => setForm({ ...form, servicio: e.target.value })} aria-label="Servicio">
              {SERVICES.map((s) => <option key={s.name}>{s.name}</option>)}
            </select>
            <input type="date" value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} aria-label="Fecha preferida" />
            <button className="f-btn f-btn--solid" type="submit">Reservar por WhatsApp <Arrow /></button>
          </form>
        </section>
      </main>

      <footer className="f-footer">
        <div>
          <a className="f-brand" href="#f-top">BÉME BEAUTY STUDIO</a>
          <p>BEME BEAUTY STUDIO S.A.C. · RUC 20615366669</p>
        </div>
        <a className="f-link" href={MAPS} target="_blank" rel="noopener">Santiago de Surco, Lima</a>
        <a className="f-link" href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a>
        <a className="f-link" href={wa('Hola BÉME')} target="_blank" rel="noopener">WhatsApp</a>
      </footer>

      <a className={`f-sticky ${scrolled ? 'f-sticky--on' : ''}`} href="#f-reservar">Reservar cita <Arrow /></a>
    </div>
  )
}
