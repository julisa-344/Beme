import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { wa, MAPS, SERVICES, PRINCIPLES, REVIEWS, FAQ, Arrow, logo, heroVideo } from './shared.jsx'
import BeforeAfter from './components/BeforeAfter.jsx'
import { RESULTS } from './data/results.js'
import { HERO_LETTERS } from './data/heroLetters.js'
import './disruptiva.css'

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))

const MENU = [
  ['Servicios', '#d-servicios'],
  ['Resultados', '#d-resultados'],
  ['Opiniones', '#d-opiniones'],
  ['Preguntas', '#d-faq'],
  ['Precios', '/?v=disruptiva&page=precios'],
  ['Reservar', '#d-reservar'],
]

const STATEMENT = 'Un espacio para reconocer tu belleza y expresar por fuera todo lo que eres por dentro.'

function useInView(threshold = 0.2) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setOn(true), io.disconnect()),
      { threshold },
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [threshold])
  return [ref, on]
}

/* Línea que sube desde una máscara al entrar al viewport */
function Mask({ children, as: Tag = 'div', className = '', delay = 0 }) {
  const [ref, on] = useInView(0.3)
  return (
    <Tag ref={ref} className={`d-mask ${on ? 'is-on' : ''} ${className}`}>
      <span style={{ transitionDelay: `${delay}ms` }}>{children}</span>
    </Tag>
  )
}

function Fade({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const [ref, on] = useInView(0.15)
  return (
    <Tag ref={ref} className={`d-fade ${on ? 'is-on' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  )
}

/** Letras de la marca (PNG como máscara). `start` mantiene el escalonado de la animación. */
function HeroLetters({ letters, start = 0, className = '' }) {
  return (
    <span className={`d-hero__line ${className}`} aria-hidden="true">
      {letters.map((l, i) => (
        <span className="d-hl" key={l.char}>
          <i className="d-letter" style={{ '--h': l.h, '--ar': l.ar, '--img': `url(${l.img})`, '--i': start + i }} />
        </span>
      ))}
    </span>
  )
}

const FONTS = ['quicksand', 'jost', 'poiret', 'marcellus', 'cormorant']

export default function Disruptiva() {
  const fontParam = new URLSearchParams(window.location.search).get('font')
  const fontClass = FONTS.includes(fontParam) ? `d-font-${fontParam}` : ''
  const [ready, setReady] = useState(false)
  const [menu, setMenu] = useState(false)
  const [form, setForm] = useState({ nombre: '', servicio: SERVICES[0].name, fecha: '' })
  const root = useRef(null)
  const lenisRef = useRef(null)
  const [resultId, setResultId] = useState(RESULTS[0].id)
  const result = RESULTS.find((r) => r.id === resultId)
  const cursor = useRef(null)

  /* Preloader */
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t = setTimeout(() => setReady(true), reduce ? 0 : 1700)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('d-lock', menu || !ready)
    return () => document.documentElement.classList.remove('d-lock')
  }, [menu, ready])

  /* Scroll: parallax, texto "scrubbed", paneles con clip-path, cintillo ligado al scroll */
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const q = (s) => [...root.current.querySelectorAll(s)]
    const parallax = q('[data-d-speed]')
    const scrubs = q('[data-scrub]')
    const bar = root.current.querySelector('.d-progress i')
    const hero = root.current.querySelector('.d-hero__img')
    const header = root.current.querySelector('.d-bar')

    const update = () => {
      const vh = window.innerHeight
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - vh
      header?.classList.toggle('is-solid', y > 80)
      if (bar) bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`
      if (reduce) return

      if (hero) hero.style.transform = `translate3d(0, ${y * 0.2}px, 0) scale(${1 + Math.min(y / vh, 1) * 0.08})`

      for (const el of q('[data-hero-y]')) el.style.transform = `translate3d(0, ${(y * Number(el.dataset.heroY)).toFixed(1)}px, 0)`
      for (const el of parallax) {
        const r = el.parentElement.getBoundingClientRect()
        el.style.transform = `translate3d(0, ${(-(r.top + r.height / 2 - vh / 2) * Number(el.dataset.dSpeed)).toFixed(1)}px, 0)`
      }
      for (const el of scrubs) {
        const r = el.getBoundingClientRect()
        const p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.35))
        const words = el.children
        const n = words.length
        for (let i = 0; i < n; i++) words[i].style.opacity = String(0.14 + 0.86 * clamp((p * (n + 4) - i) / 3))
      }
      const m = root.current.querySelector('.d-marquee__row')
      if (m) m.style.transform = `translate3d(${(-y * 0.35).toFixed(1)}px,0,0)`
    }

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()

    let lenis, raf
    if (!reduce) {
      lenis = new Lenis({ lerp: 0.085, smoothWheel: true })
      lenisRef.current = lenis
      lenis.on('scroll', update)
      const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
      raf = requestAnimationFrame(loop)
    }
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      cancelAnimationFrame(raf)
      lenis?.destroy()
    }
  }, [])

  /* Pausar el scroll suave con el menú abierto */
  useEffect(() => {
    lenisRef.current?.[menu ? 'stop' : 'start']()
  }, [menu])

  /* Cursor propio + botones magnéticos + preview de servicios */
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const el = cursor.current
    let tx = -100, ty = -100, x = -100, y = -100, raf
    const tick = () => {
      x += (tx - x) * 0.18
      y += (ty - y) * 0.18
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const move = (e) => {
      tx = e.clientX
      ty = e.clientY
      el.classList.add('on')
      el.classList.toggle('hot', !!e.target.closest('a, button, summary, [data-hot]'))
      const mag = e.target.closest('[data-magnetic]')
      root.current.querySelectorAll('[data-magnetic]').forEach((m) => {
        if (m !== mag) m.style.transform = ''
      })
      if (mag) {
        const r = mag.getBoundingClientRect()
        mag.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.25}px, ${(e.clientY - (r.top + r.height / 2)) * 0.35}px)`
      }
    }
    const leave = () => el.classList.remove('on')
    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
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

  const go = () => setMenu(false)

  return (
    <div className={`d-root ${fontClass} ${ready ? 'is-ready' : ''}`} ref={root}>
      <div className="d-cursor" ref={cursor} aria-hidden="true" />
      <div className="d-progress" aria-hidden="true"><i /></div>

      {/* Preloader */}
      <div className="d-loader" aria-hidden="true">
        <img className="d-loader__logo" src={logo} alt="BÉME Beauty Studio" />
        <span className="d-loader__sub">un espacio para ti</span>
      </div>

      {/* Header */}
      <header className={`d-bar ${menu ? 'menu-open' : ''}`}>
        <a className="d-logo" href="#d-top"><img src={logo} alt="BÉME Beauty Studio" /></a>
        <a className="d-bar__book" href="#d-reservar">Reservar</a>
        <button className="d-menubtn" onClick={() => setMenu(!menu)} aria-expanded={menu}>
          {menu ? 'Cerrar' : 'Menú'}
        </button>
      </header>

      <nav className={`d-menu ${menu ? 'is-open' : ''}`} aria-hidden={!menu}>
        <ul>
          {MENU.map(([l, h], i) => (
            <li key={h} style={{ transitionDelay: `${menu ? 250 + i * 70 : 0}ms` }}>
              <a href={h} onClick={go} tabIndex={menu ? 0 : -1}><sup>0{i + 1}</sup>{l}</a>
            </li>
          ))}
        </ul>
        <p>Av. Primavera 120, dpto. 501-2 · Santiago de Surco, Lima</p>
      </nav>

      {/* Hero */}
      <section className="d-hero" id="d-top">
        <div className="d-hero__media">
          <video className="d-hero__img" src={heroVideo} autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
          <div className="d-hero__shade" />
        </div>

        <h1 className="d-hero__title" aria-label="BÉME">
          <HeroLetters letters={HERO_LETTERS.slice(0, 2)} />
          <HeroLetters letters={HERO_LETTERS.slice(2)} start={2} className="d-hero__line--2" />
        </h1>

        <div className="d-hero__foot">
          <span className="d-scroll">Scroll<i /></span>
          <a className="d-btn" data-magnetic href="#d-reservar">Reservar cita <Arrow /></a>
        </div>
      </section>

      {/* Cintillo gigante ligado al scroll */}
      <div className="d-marquee" aria-hidden="true">
        <div className="d-marquee__row">
          {[...SERVICES, ...SERVICES, ...SERVICES].map((s, i) => (
            <span key={i}>{s.name}<i>·</i></span>
          ))}
        </div>
      </div>

      {/* Declaración con texto que se ilumina al hacer scroll */}
      <section className="d-statement" id="d-esencia">
        <p className="d-statement__text" data-scrub>
          {STATEMENT.split(' ').map((w, i) => (
            <span key={i}>{w}{' '}</span>
          ))}
        </p>
      </section>

      {/* Servicios (de Lujo Editorial): tarjetas con reserva visible y precios */}
      <section className="d-services" id="d-servicios">
        <div className="d-services__head">
          <Mask as="p" className="d-eyebrow">Servicios</Mask>
          <Mask as="h2" className="d-h2">Elige tu <em>servicio</em></Mask>
        </div>
        <div className="d-gallery">
          {SERVICES.map((s) => (
            <article className="d-card-wrap" key={s.name} style={{ marginTop: s.offset }}>
              <div className="d-card" data-d-speed={s.speed}>
                <div className="d-card__img" style={{ backgroundImage: `url(${s.img})` }} />
                <div className="d-card__shade" />
                <div className="d-card__body">
                  <h3>{s.name}</h3>
                  <p className="d-card__desc">{s.desc}</p>
                  <div className="d-card__actions">
                    <a className="d-btn d-btn--sand d-btn--sm" data-magnetic href={`/?v=disruptiva&page=precios&cat=${s.catalog}`}>
                      Ver servicios y precios <Arrow />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Antes y después: comparador con barra arrastrable */}
      <section className="d-results" id="d-resultados">
        <div className="d-results__copy">
          <Mask as="p" className="d-eyebrow">Resultados</Mask>
          <Mask as="h2" className="d-h2">Antes y <em>después</em></Mask>
          <Fade as="p" className="d-results__hint">Desliza la barra para ver la transformación.</Fade>
          <div className="d-results__tabs" role="tablist" aria-label="Elegir resultado">
            {RESULTS.map((r) => (
              <button
                key={r.id}
                type="button"
                role="tab"
                aria-selected={r.id === resultId}
                className={`d-results__tab ${r.id === resultId ? 'is-on' : ''}`}
                onClick={() => setResultId(r.id)}
              >
                {r.label}
              </button>
            ))}
          </div>
          <a className="d-btn d-btn--sand d-btn--sm" data-magnetic href={`/?v=disruptiva&page=precios&cat=${result.catalog}`}>
            Ver servicios y precios <Arrow />
          </a>
        </div>
        <div className="d-results__view">
          <BeforeAfter key={result.id} before={result.before} after={result.after} placeholder={!result.before} alt={result.label} />
        </div>
      </section>

      {/* Escuchar. Respetar. Potenciar. (de Lujo Editorial) */}
      <section className="d-principles">
        <Mask as="h2">Escuchar. Respetar. Potenciar.</Mask>
        <div className="d-principles__grid">
          {PRINCIPLES.map(([t, d], i) => (
            <Fade key={t} className="d-principle" delay={i * 120}>
              <h3>{t}</h3>
              <p>{d}</p>
            </Fade>
          ))}
        </div>
      </section>

      {/* Opiniones (de Lujo Editorial) */}
      <section className="d-reviews" id="d-opiniones">
        <div className="d-reviews__head">
          <Mask as="p" className="d-eyebrow">Opiniones</Mask>
          <Mask as="h2" className="d-h2">Lo que dicen de <em>BÉME</em></Mask>
        </div>
        <div className="d-reviews__grid">
          {REVIEWS.map(([q, n], i) => (
            <Fade as="figure" key={i} className="d-review" delay={i * 120}>
              <div className="d-review__stars">★★★★★</div>
              <blockquote>“{q}”</blockquote>
              <figcaption>{n}</figcaption>
            </Fade>
          ))}
        </div>
      </section>

      {/* Preguntas frecuentes (de Lujo Editorial) */}
      <section className="d-faq" id="d-faq">
        <div>
          <Mask as="p" className="d-eyebrow">Preguntas frecuentes</Mask>
          <Mask as="h2" className="d-h2">Antes de <em>reservar</em></Mask>
        </div>
        <div className="d-faq__list">
          {FAQ.map(([q, a], i) => (
            <Fade as="details" className="d-faq__item" key={q} delay={i * 80}>
              <summary><span>0{i + 1}</span>{q}<i aria-hidden="true" /></summary>
              <p>{a}</p>
            </Fade>
          ))}
        </div>
      </section>

      {/* Reserva (de Lujo Editorial) */}
      <section className="d-book" id="d-reservar">
        <div className="d-book__copy">
          <Mask as="p" className="d-eyebrow d-eyebrow--light">Reserva</Mask>
          <h2 className="d-book__title">
            <Mask as="span">Un espacio</Mask>
            <Mask as="span" delay={120}>para <em>ti.</em></Mask>
          </h2>
          <p>Cuéntanos qué te gustaría y te confirmamos tu horario por WhatsApp.</p>
          <ul className="d-book__info">
            <li>Av. Primavera 120, dpto. 501-2</li>
            <li>Santiago de Surco, Lima</li>
            <li><a className="d-underline" href={MAPS} target="_blank" rel="noopener">Ver en el mapa →</a></li>
          </ul>
        </div>
        <form className="d-form" onSubmit={submit}>
          <label>
            Nombre
            <input required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Tu nombre" />
          </label>
          <label>
            Servicio
            <select value={form.servicio} onChange={(e) => setForm({ ...form, servicio: e.target.value })}>
              {SERVICES.map((s) => <option key={s.name}>{s.name}</option>)}
            </select>
          </label>
          <label>
            Fecha preferida
            <input type="date" value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} />
          </label>
          <button className="d-btn d-btn--sand" data-magnetic type="submit">Reservar por WhatsApp <Arrow /></button>
        </form>
      </section>

      <footer className="d-footer">
        <span>BEME BEAUTY STUDIO S.A.C. · RUC 20615366669</span>
        <a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a>
        <a href={wa('Hola BÉME')} target="_blank" rel="noopener">WhatsApp</a>
      </footer>
    </div>
  )
}
