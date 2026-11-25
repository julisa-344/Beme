/**
 * Resultados (antes / después).
 *
 * Para agregar un caso: copia las dos fotos a src/assets/, impórtalas aquí y
 * añade un objeto al arreglo. Mientras `before` sea null, el comparador usa la
 * foto de "después" atenuada como relleno.
 *
 *   id        identificador único
 *   label     texto de la pestaña
 *   catalog   id de categoría en src/data/catalog.js (para el botón de precios)
 *   before    foto de antes  (null = aún no disponible)
 *   after     foto de después
 */
import cejas from '../assets/cejas.webp'
import cabello from '../assets/cabello.webp'
import manos from '../assets/manos.webp'
import pigmentacion from '../assets/pigmentacion.webp'

export const RESULTS = [
  { id: 'cejas', label: 'Cejas y pestañas', catalog: 'cejas-pestanas', before: null, after: cejas },
  { id: 'cabello', label: 'Cabello', catalog: 'cabello', before: null, after: cabello },
  { id: 'manos', label: 'Manos y pies', catalog: 'manos-pies', before: null, after: manos },
  { id: 'pigmentacion', label: 'Pigmentación', catalog: 'micropigmentacion', before: null, after: pigmentacion },
]
