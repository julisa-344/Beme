import Icon from '../Icons.jsx'
import { Arrow, wa } from '../../shared.jsx'
import { formatDuration, formatPrice } from '../../lib/format.js'

function Row({ item, categoryLabel }) {
  const message = `Hola BÉME, quisiera reservar: ${item.name} (${categoryLabel}).`
  return (
    <li className="p-row">
      <span className="p-row__n">{String(item.n).padStart(2, '0')}</span>
      <div className="p-row__main">
        <h3 className="p-row__name">{item.name}</h3>
        <span className="p-row__time"><Icon name="clock" size={15} />{formatDuration(item.duration)}</span>
      </div>
      <div className="p-row__price">
        <strong>{formatPrice(item.price)}</strong>
        {item.from && item.price != null && <small>desde</small>}
      </div>
      <a className="p-row__book" href={wa(message)} target="_blank" rel="noopener" aria-label={`Reservar ${item.name}`}>
        Reservar <Arrow />
      </a>
    </li>
  )
}

/**
 * Lista de servicios. Si `grouped` es true, los separa por subcategoría
 * (solo tiene sentido con el orden del catálogo y sin filtro de tipo).
 */
export default function ServiceTable({ items, categoryLabel, grouped }) {
  if (!grouped) {
    return <ul className="p-list">{items.map((it) => <Row key={`${it.group}-${it.n}`} item={it} categoryLabel={categoryLabel} />)}</ul>
  }
  const titles = [...new Set(items.map((it) => it.group))]
  return titles.map((title) => {
    const rows = items.filter((it) => it.group === title)
    return (
      <section className="p-group" key={title ?? 'all'}>
        {title && <h3 className="p-group__title">{title} <span>({rows.length})</span></h3>}
        <ul className="p-list">{rows.map((it) => <Row key={`${it.group}-${it.n}`} item={it} categoryLabel={categoryLabel} />)}</ul>
      </section>
    )
  })
}
