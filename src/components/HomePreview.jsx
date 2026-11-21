import {
  galleryImages,
  serviceCategories,
  services,
  siteLinks,
} from '../data/homeConcepts'

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="arrow-icon"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path d="M3.3 12.7 12.5 3.5M4.6 3.5h7.9v7.9" />
    </svg>
  )
}

function BrandMark() {
  return (
    <a className="brand-mark" href={siteLinks.services} aria-label="Béme, inicio">
      <img src="https://beme.pe/logo-transparent-768.webp" alt="Béme" />
      <span>BEAUTY STUDIO</span>
    </a>
  )
}

function SiteHeader() {
  return (
    <header className="site-header">
      <BrandMark />
      <nav className="site-nav" aria-label="Navegación de la propuesta">
        <a href="#servicios">Servicios</a>
        <a href={siteLinks.products}>Productos</a>
        <a href={siteLinks.location}>El estudio</a>
      </nav>
      <a className="button button--header" href={siteLinks.reservations}>
        Reservar cita
      </a>
    </header>
  )
}

function Hero({ concept }) {
  return (
    <section className={`hero hero--${concept.id}`}>
      <div className="hero__copy">
        <span className="eyebrow">{concept.eyebrow}</span>
        <h2>{concept.headline}</h2>
        <p>{concept.description}</p>
        <a className="button" href={siteLinks.reservations}>
          {concept.action}
          <ArrowIcon />
        </a>
      </div>
      <div className="hero__visual">
        <img src={concept.image} alt={concept.imageAlt} />
        {concept.id === 'social' && (
          <aside className="hero-card">
            <span>Favorito Béme</span>
            <strong>Un look que habla de ti</strong>
          </aside>
        )}
        {concept.id === 'future' && (
          <>
            <span className="future-orbit">Beauty<br />rituals</span>
            <aside className="hero-card">
              <span>Experiencia Béme / 01</span>
              <strong>Tu nueva era de belleza</strong>
            </aside>
          </>
        )}
      </div>
    </section>
  )
}

function BrandIntroduction({ conceptId }) {
  if (conceptId === 'future') {
    return null
  }

  return (
    <section className="brand-intro section">
      <h2>
        {conceptId === 'social'
          ? 'Tu estilo, tu momento, tu manera de brillar.'
          : 'La belleza está en sentirte bien contigo.'}
      </h2>
      <p>
        En Béme, cada detalle está pensado para que disfrutes tu momento: desde
        la atención cercana de nuestro equipo hasta los tratamientos y productos
        profesionales que elegimos para ti.
      </p>
    </section>
  )
}

function ServicesSection({ conceptId }) {
  const isFuture = conceptId === 'future'

  return (
    <section className="services-section section" id="servicios">
      <div className="section-heading">
        <span className="eyebrow">
          {isFuture ? 'Tu universo Béme' : 'Selección Béme'}
        </span>
        <h2>
          {isFuture
            ? 'Elige tu próximo momento'
            : conceptId === 'social'
              ? '¿Qué look te inspira?'
              : 'Nuestros servicios'}
        </h2>
        <p>
          {isFuture
            ? 'Un menú de experiencias para acompañarte como quieres sentirte hoy.'
            : 'Tratamientos elegidos para acompañar tu belleza natural.'}
        </p>
      </div>

      {isFuture ? (
        <div className="future-categories">
          {serviceCategories.map((category) => (
            <a
              className="future-category"
              href={siteLinks.services}
              key={category.number}
            >
              <span>
                {category.number} / {category.title}
              </span>
              <h3>{category.subtitle}</h3>
              <ArrowIcon />
            </a>
          ))}
        </div>
      ) : (
        <div className="service-grid">
          {services.map((service) => (
            <a
              className="service-card"
              href={siteLinks.services}
              key={service.number}
            >
              <span className="service-card__number">{service.number}</span>
              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="text-link">
                  {service.action}
                  <ArrowIcon />
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  )
}

function ProductFeature() {
  return (
    <section className="product-feature">
      <div className="product-feature__image" role="img" aria-label="Selección de productos profesionales de belleza" />
      <div className="product-feature__copy">
        <span className="eyebrow">Cuidado que continúa</span>
        <h2>Tu ritual Béme, también en casa</h2>
        <p>
          Descubre nuestra selección de productos profesionales para cuidar tu
          cabello y prolongar los resultados de tu visita.
        </p>
        <a className="button button--outline" href={siteLinks.products}>
          Explorar catálogo
          <ArrowIcon />
        </a>
      </div>
    </section>
  )
}

function InspirationSection({ conceptId }) {
  return (
    <section className="inspiration-section section">
      <div className="section-heading">
        <span className="eyebrow">
          {conceptId === 'social' ? 'Béme en Instagram' : 'Inspiración Béme'}
        </span>
        <h2>
          {conceptId === 'social'
            ? 'Belleza que se comparte'
            : 'Un vistazo a nuestro mundo'}
        </h2>
        <p>Resultados, detalles y momentos reales de nuestro estudio.</p>
      </div>
      <div className="inspiration-grid">
        {galleryImages.map((image) => (
          <img key={image.alt} src={image.src} alt={image.alt} loading="lazy" />
        ))}
      </div>
    </section>
  )
}

function BookingBanner() {
  return (
    <section className="booking-banner section">
      <div>
        <span className="eyebrow">Tu momento te espera</span>
        <h2>Regálate una pausa. Nosotros nos encargamos del resto.</h2>
      </div>
      <a className="button" href={siteLinks.reservations}>
        Reservar mi cita
        <ArrowIcon />
      </a>
    </section>
  )
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>© Béme Beauty Studio · Lima, Perú</span>
      <span>Av. Primavera 120, Chacarilla del Estanque</span>
    </footer>
  )
}

export default function HomePreview({ concept }) {
  return (
    <article
      className={`home-preview home-preview--${concept.id}`}
      aria-label={`Prototipo de home: ${concept.label}`}
    >
      <SiteHeader />
      <Hero concept={concept} />
      <BrandIntroduction conceptId={concept.id} />
      <ServicesSection conceptId={concept.id} />
      {concept.id === 'social' && (
        <aside className="social-note section">
          Tu próxima versión favorita empieza con un momento para ti.
        </aside>
      )}
      <ProductFeature />
      <InspirationSection conceptId={concept.id} />
      <BookingBanner />
      <SiteFooter />
    </article>
  )
}
