import { useEffect, useRef } from 'react'
import { DURATION_FILTERS, PRICE_FILTERS, SORTS, activeFilterCount } from '../../lib/filters.js'

function Chips({ label, options, value, onChange }) {
  return (
    <fieldset className="p-field">
      <legend>{label}</legend>
      <div className="p-chips">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            className={`p-chip ${value === o.id ? 'is-on' : ''}`}
            aria-pressed={value === o.id}
            onClick={() => onChange(o.id)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

/** Filtros del catálogo. Es "controlado": el estado vive en la página. */
export default function FilterPanel({ filters, groups, onChange, onReset }) {
  const active = activeFilterCount(filters)
  const ref = useRef(null)
  // Abierto en escritorio; plegado en celular para no empujar la lista.
  useEffect(() => {
    ref.current.open = window.matchMedia('(min-width: 961px)').matches
  }, [])
  return (
    <details className="p-filters" ref={ref}>
      <summary>
        Filtros {active > 0 && <span className="p-filters__badge">{active}</span>}
      </summary>

      <div className="p-filters__body">
        <label className="p-field">
          <span className="p-field__label">Buscar</span>
          <input
            type="search"
            value={filters.query}
            placeholder="Ej. corte, gel, lifting…"
            onChange={(e) => onChange('query', e.target.value)}
          />
        </label>

        {groups.length > 0 && (
          <Chips
            label="Tipo"
            value={filters.group}
            onChange={(v) => onChange('group', v)}
            options={[{ id: 'all', label: 'Todos' }, ...groups.map((g) => ({ id: g, label: g }))]}
          />
        )}

        <Chips label="Duración" options={DURATION_FILTERS} value={filters.duration} onChange={(v) => onChange('duration', v)} />
        <Chips label="Precio" options={PRICE_FILTERS} value={filters.price} onChange={(v) => onChange('price', v)} />

        <label className="p-field">
          <span className="p-field__label">Ordenar por</span>
          <select value={filters.sort} onChange={(e) => onChange('sort', e.target.value)}>
            {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </label>

        <button type="button" className="p-reset" onClick={onReset} disabled={active === 0 && filters.sort === 'default'}>
          Limpiar filtros
        </button>
      </div>
    </details>
  )
}
