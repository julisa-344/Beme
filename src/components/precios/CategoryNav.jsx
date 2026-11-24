import Icon from '../Icons.jsx'
import { countItems } from '../../data/catalog.js'

/** Lista de categorías (tablist vertical en escritorio, chips en celular). */
export default function CategoryNav({ categories, activeId, onChange }) {
  return (
    <div className="p-cats" role="tablist" aria-label="Categorías de servicios" aria-orientation="vertical">
      {categories.map((c) => (
        <button
          key={c.id}
          id={`tab-${c.id}`}
          role="tab"
          type="button"
          className={`p-cat ${c.id === activeId ? 'is-active' : ''}`}
          aria-selected={c.id === activeId}
          aria-controls="p-panel"
          onClick={() => onChange(c.id)}
        >
          <Icon name={c.icon} size={18} />
          <span className="p-cat__label">{c.label}</span>
          <span className="p-cat__count">{countItems(c)}</span>
        </button>
      ))}
    </div>
  )
}
