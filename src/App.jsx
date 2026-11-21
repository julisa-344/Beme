import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

import { wa, MAPS, U, SERVICES, MARQUEE, PRINCIPLES, REVIEWS, FAQ, Arrow, Reveal } from './shared.jsx'

const NAV = [
  ['Servicios', '#servicios'],
  ['Opiniones', '#opiniones'],
  ['Preguntas', '#faq'],
  ['Contacto', '#reservar'],
]

export default function App() {
  const heroImg = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [form, setForm] = useState({ nombre: '', servicio: SERVICES[0].name, fecha: '' })

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cards = [...document.querySelectorAll('[data-speed]')]

    const update = () => {
      setScrolled(window.scrollY > 60)
      if (reduce) return
      const vh = window.innerHeight
      for (const el of cards) {
        const r = el.parentElement.getBoundingClientRect()
        const center = r.top + r.height / 2 - vh / 2
        el.style.transform = `translate3d(0, ${(-center * Number(el.dataset.speed)).toFixed(1)}px, 0)`
      }
      if (heroImg.current) {
        heroImg.current.style.transform = `translate3d(0, ${(window.scrollY * 0.18).toFixed(1)}px, 0) scale(1.08)`
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
    <>
      <nav className={`nav ${scrolled ? 'nav--solid' : ''}`}>
        <a className="nav__brand" href="#top">BÉME</a>
        <ul>
          {NAV.map(([label, href]) => (
            <li key={href}><a className="link" href={href}>{label}</a></li>
          ))}
        </ul>
        <a className="btn btn--nav" href="#reservar">Reservar <Arrow /></a>
      </nav>

      <header className="hero" id="top">
        <div className="hero__media">
          <div
            ref={heroImg}
            className="hero__img"
            style={{ backgroundImage: `url(${U('photo-1515377905703-c4788e51af15', 1800)})` }}
          />
          <div className="hero__veil" />
        </div>

        <p className="hero__eyebrow">Beauty Studio · Santiago de Surco, Lima</p>
        <h1 className="hero__title">BÉME</h1>
        <p className="hero__tag">Un espacio para ti.</p>
        <div className="hero__actions">
          <a className="btn btn--dark" href="#reservar">Reservar cita <Arrow /></a>
          <a className="btn btn--ghost" href="#servicios">Ver servicios</a>
        </div>
      </header>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__row">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i}>{m}<i>·</i></span>
          ))}
        </div>
      </div>

      <main>
        <section className="section-head" id="servicios">
          <Reveal as="p" className="eyebrow">Servicios</Reveal>
          <Reveal as="h2" className="h2">Elige tu servicio</Reveal>
        </section>

        <section className="gallery" aria-label="Servicios">
          <div className="gallery__track">
            {SERVICES.map((s) => (
              <article className="card-wrap" key={s.name} style={{ marginTop: s.offset }}>
                <div className="card" data-speed={s.speed}>
                  <div className="card__img" style={{ backgroundImage: `url(${s.img})` }} />
                  <div className="card__overlay">
                    <span className="card__name">{s.name}</span>
                    <div className="card__more">
                      <p>{s.desc}</p>
                      <a className="card__book" href={wa(`Hola BÉME, quisiera reservar ${s.name}.`)} target="_blank" rel="noopener">
                        Reservar <Arrow />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="principles" id="nosotras">
          <Reveal as="h2" className="principles__title">Escuchar. Respetar. Potenciar.</Reveal>
          <div className="principles__grid">
            {PRINCIPLES.map(([t, d], i) => (
              <Reveal key={t} className="principle" delay={i * 120}>
                <h3>{t}</h3>
                <p>{d}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="reviews" id="opiniones">
          <div className="section-head">
            <Reveal as="p" className="eyebrow">Opiniones</Reveal>
            <Reveal as="h2" className="h2">Lo que dicen de BÉME</Reveal>
          </div>
          <div className="reviews__grid">
            {REVIEWS.map(([q, n], i) => (
              <Reveal as="figure" key={n} className="review" delay={i * 120}>
                <div className="review__stars">★★★★★</div>
                <blockquote>“{q}”</blockquote>
                <figcaption>{n}</figcaption>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="faq" id="faq">
          <div className="section-head section-head--left">
            <Reveal as="p" className="eyebrow">Preguntas frecuentes</Reveal>
            <Reveal as="h2" className="h2">Antes de reservar</Reveal>
          </div>
          <div className="faq__list">
            {FAQ.map(([q, a]) => (
              <details key={q} className="faq__item">
                <summary>{q}<span aria-hidden="true" /></summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="book" id="reservar">
          <div className="book__copy">
            <p className="eyebrow eyebrow--light">Reserva</p>
            <h2 className="book__title">Un espacio para ti.</h2>
            <p>Cuéntanos qué te gustaría y te confirmamos tu horario por WhatsApp.</p>
            <ul className="book__info">
              <li>Av. Primavera 120, dpto. 501-2</li>
              <li>Santiago de Surco, Lima</li>
              <li><a className="link" href={MAPS} target="_blank" rel="noopener">Ver en el mapa →</a></li>
            </ul>
          </div>
          <form className="form" onSubmit={submit}>
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
            <button className="btn btn--terra" type="submit">Reservar por WhatsApp <Arrow /></button>
          </form>
        </section>
      </main>

      <footer className="footer">
        <div>
          <a className="nav__brand" href="#top">BÉME BEAUTY STUDIO</a>
          <p className="footer__legal">BEME BEAUTY STUDIO S.A.C. · RUC 20615366669</p>
        </div>
        <a className="link" href={MAPS} target="_blank" rel="noopener">Santiago de Surco, Lima</a>
        <a className="link" href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a>
        <a className="link" href={wa('Hola BÉME')} target="_blank" rel="noopener">WhatsApp</a>
      </footer>

      <a className={`sticky ${scrolled ? 'sticky--on' : ''}`} href="#reservar">Reservar cita <Arrow /></a>
    </>
  )
}
