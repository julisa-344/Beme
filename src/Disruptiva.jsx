import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { wa, MAPS, U, SERVICES, PRINCIPLES, REVIEWS, FAQ, Arrow } from './shared.jsx'
import './disruptiva.css'

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))

const MENU = [
  ['Servicios', '#d-servicios'],
  ['Esencia', '#d-esencia'],
  ['Opiniones', '#d-opiniones'],
  ['Preguntas', '#d-faq'],
  ['Reservar', '#d-reservar'],
]

const STATEMENT = 'Un espacio para reconocer tu belleza y expresar por fuera todo lo que eres por dentro.'

const PANEL_IMG = [
  U('photo-1522337360788-8b13dee7a37e', 1000),
  U('photo-1560066984-138dadb4c035', 1000),
  U('photo-1604654894610-df63bc536371', 1000),
]

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

/* Letras que suben desde una máscara */
function Chars({ text, on, base = 0, step = 55 }) {
  return (
    <span className={`d-chars ${on ? 'is-on' : ''}`} aria-label={text}>
      {[...text].map((ch, i) => (
        <span className="d-ch" aria-hidden="true" key={i}>
          <span style={{ transitionDelay: `${base + i * step}ms` }}>{ch === ' ' ? ' ' : ch}</span>
        </span>
      ))}
    </span>
  )
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

export default function Disruptiva() {
  const [ready, setReady] = useState(false)
  const [menu, setMenu] = useState(false)
  const [active, setActive] = useState(-1)
  const [form, setForm] = useState({ nombre: '', servicio: SERVICES[0].name, fecha: '' })
  const root = useRef(null)
  const preview = useRef(null)
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
    const clips = q('[data-clip]')
    const rows = q('[data-row]')
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
      for (const el of clips) {
        const r = el.getBoundingClientRect()
        const off = Number(el.dataset.clip) * 0.12
        const p = clamp((vh * 0.95 - r.top) / (vh * 0.85) - off)
        el.style.setProperty('--p', p.toFixed(3))
      }
      for (const el of rows) {
        const r = el.getBoundingClientRect()
        el.style.setProperty('--shift', `${((r.top + r.height / 2 - vh / 2) / vh * -40).toFixed(1)}px`)
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
      if (preview.current) {
        preview.current.style.transform = `translate3d(${e.clientX + 36}px, ${e.clientY - 150}px, 0)`
      }
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
    <div className={`d-root ${ready ? 'is-ready' : ''}`} ref={root}>
      <div className="d-cursor" ref={cursor} aria-hidden="true" />
      <div className="d-progress" aria-hidden="true"><i /></div>

      {/* Preloader */}
      <div className="d-loader" aria-hidden="true">
        <span className="d-loader__word"><Chars text="BÉME" on base={100} step={110} /></span>
        <span className="d-loader__sub">un espacio para ti</span>
      </div>

      {/* Header */}
      <header className={`d-bar ${menu ? 'menu-open' : ''}`}>
        <a className="d-logo" href="#d-top">BÉME</a>
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
          <div className="d-hero__img" style={{ backgroundImage: `url(${U('photo-1560066984-138dadb4c035', 1800)})` }} />
          <div className="d-hero__shade" />
        </div>

        <p className="d-hero__eyebrow">Beauty Studio · Santiago de Surco</p>
        <h1 className="d-hero__title">
          <span className="d-hero__line"><Chars text="BÉ" on={ready} base={200} step={120} /></span>
          <span className="d-hero__line d-hero__line--2"><Chars text="ME" on={ready} base={420} step={120} /></span>
        </h1>
        <p className="d-hero__script"><Mask delay={900} className={ready ? 'is-on' : ''}>míra<em>me</em></Mask></p>

        <div className="d-hero__foot">
          <a className="d-btn" data-magnetic href="#d-reservar">Reservar cita <Arrow /></a>
          <span className="d-scroll">Scroll<i /></span>
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

      {/* Servicios: lista gigante con preview que sigue al cursor */}
      <section className="d-services" id="d-servicios">
        <div className="d-services__head">
          <Mask as="p" className="d-eyebrow">Servicios</Mask>
          <Mask as="p" className="d-count">06</Mask>
        </div>
        <ul className="d-list" onMouseLeave={() => setActive(-1)}>
          {SERVICES.map((s, i) => (
            <li key={s.name} className={active === i ? 'is-active' : active >= 0 ? 'is-dim' : ''} onMouseEnter={() => setActive(i)}>
              <a href={wa(`Hola BÉME, quisiera reservar ${s.name}.`)} target="_blank" rel="noopener" data-row>
                <span className="d-list__n">0{i + 1}</span>
                <Mask as="span" className="d-list__name" delay={i * 60}>{s.name}</Mask>
                <span className="d-list__go">Reservar <Arrow /></span>
                <img className="d-list__thumb" src={s.img} alt="" loading="lazy" />
                <span className="d-list__desc">{s.desc}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className={`d-preview ${active >= 0 ? 'is-on' : ''}`} ref={preview} aria-hidden="true">
          {SERVICES.map((s, i) => (
            <div key={s.name} className={active === i ? 'is-on' : ''} style={{ backgroundImage: `url(${s.img})` }} />
          ))}
        </div>
      </section>

      {/* Paneles verticales: Escuchar / Respetar / Potenciar */}
      <section className="d-panels" aria-label="Principios">
        {PRINCIPLES.map(([t, d], i) => (
          <article className="d-panel" key={t} data-clip={i} data-hot>
            <div className="d-panel__img" style={{ backgroundImage: `url(${PANEL_IMG[i]})` }} />
            <div className="d-panel__shade" />
            <span className="d-panel__n">0{i + 1}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </article>
        ))}
      </section>

      {/* Testimonios: tarjetas apiladas con sticky */}
      <section className="d-quotes" id="d-opiniones">
        <div className="d-quotes__head">
          <Mask as="p" className="d-eyebrow">Opiniones</Mask>
          <Mask as="h2" className="d-h2">Lo que <em>dicen</em></Mask>
        </div>
        <div className="d-stack">
          {REVIEWS.map(([q, n], i) => (
            <figure className={`d-quote d-quote--${i}`} key={i} style={{ top: `${12 + i * 3}vh` }}>
              <span className="d-quote__n">0{i + 1}</span>
              <blockquote>“{q}”</blockquote>
              <figcaption>★★★★★ <span>{n}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="d-faq" id="d-faq">
        <div>
          <Mask as="p" className="d-eyebrow">Preguntas</Mask>
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

      {/* Cierre / CTA */}
      <section className="d-cta" id="d-reservar">
        <div className="d-cta__bg" style={{ backgroundImage: `url(${U('photo-1515377905703-c4788e51af15', 1800)})` }} />
        <div className="d-cta__inner">
          <Mask as="p" className="d-eyebrow d-eyebrow--light">Reserva</Mask>
          <h2 className="d-cta__title">
            <Mask as="span">Un espacio</Mask>
            <Mask as="span" delay={120}>para <em>ti.</em></Mask>
          </h2>
          <form className="d-form" onSubmit={submit}>
            <input required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Tu nombre" aria-label="Nombre" />
            <select value={form.servicio} onChange={(e) => setForm({ ...form, servicio: e.target.value })} aria-label="Servicio">
              {SERVICES.map((s) => <option key={s.name}>{s.name}</option>)}
            </select>
            <input type="date" value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} aria-label="Fecha preferida" />
            <button className="d-btn d-btn--rose" data-magnetic type="submit">Reservar por WhatsApp <Arrow /></button>
          </form>
          <p className="d-cta__addr">
            Av. Primavera 120, dpto. 501-2 · Santiago de Surco, Lima ·{' '}
            <a href={MAPS} target="_blank" rel="noopener">Ver en el mapa</a>
          </p>
        </div>
      </section>

      <footer className="d-footer">
        <span>BEME BEAUTY STUDIO S.A.C. · RUC 20615366669</span>
        <a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a>
        <a href={wa('Hola BÉME')} target="_blank" rel="noopener">WhatsApp</a>
      </footer>
    </div>
  )
}
