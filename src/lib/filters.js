/**
 * Lógica pura de filtrado/orden del catálogo (sin React), fácil de testear.
 * Para agregar un filtro nuevo: añade su lista de opciones aquí y su campo en
 * INITIAL_FILTERS; la interfaz lo recorre desde estas constantes.
 */
export const DURATION_FILTERS = [
  { id: 'all', label: 'Cualquiera' },
  { id: 'short', label: 'Hasta 30 min', test: (min) => min <= 30 },
  { id: 'medium', label: 'Hasta 1 h', test: (min) => min <= 60 },
  { id: 'long', label: 'Más de 1 h', test: (min) => min > 60 },
]

export const PRICE_FILTERS = [
  { id: 'all', label: 'Cualquiera' },
  { id: 'low', label: 'Hasta S/100', test: (p) => p <= 100 },
  { id: 'mid', label: 'S/100 – S/300', test: (p) => p > 100 && p <= 300 },
  { id: 'high', label: 'Más de S/300', test: (p) => p > 300 },
]

export const SORTS = [
  { id: 'default', label: 'Orden del catálogo' },
  { id: 'price-asc', label: 'Precio: menor a mayor' },
  { id: 'price-desc', label: 'Precio: mayor a menor' },
  { id: 'duration-asc', label: 'Duración: más corta' },
]

export const INITIAL_FILTERS = { query: '', group: 'all', duration: 'all', price: 'all', sort: 'default' }

/** Cantidad de filtros activos (el orden no cuenta). */
export const activeFilterCount = (f) =>
  (f.query.trim() !== '' ? 1 : 0) + ['group', 'duration', 'price'].filter((k) => f[k] !== INITIAL_FILTERS[k]).length

const normalize = (s) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim()

const byTest = (list, id) => list.find((o) => o.id === id)?.test

export function filterItems(items, { query, group, duration, price, sort }) {
  const q = normalize(query)
  const durationTest = byTest(DURATION_FILTERS, duration)
  const priceTest = byTest(PRICE_FILTERS, price)

  const result = items.filter((it) => {
    if (q && !normalize(it.name).includes(q)) return false
    if (group !== 'all' && it.group !== group) return false
    if (durationTest && !durationTest(it.duration)) return false
    // Con filtro de precio activo se excluyen los "Consultar" (no tienen precio).
    if (priceTest && (it.price == null || !priceTest(it.price))) return false
    return true
  })

  const price$ = (it, nullValue) => (it.price == null ? nullValue : it.price)
  if (sort === 'price-asc') result.sort((a, b) => price$(a, Infinity) - price$(b, Infinity))
  if (sort === 'price-desc') result.sort((a, b) => price$(b, -Infinity) - price$(a, -Infinity))
  if (sort === 'duration-asc') result.sort((a, b) => a.duration - b.duration)
  return result
}
