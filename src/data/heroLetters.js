/**
 * Letras del título del hero (PNG transparentes recortados en src/assets/letters/).
 *
 * `h`  = alto de la letra en "alturas de mayúscula" (la É es más alta por la tilde).
 * `ar` = proporción ancho/alto del PNG recortado.
 * Se alinean por la base, así que las cuatro letras comparten la misma altura de mayúscula.
 * El título se muestra en una sola línea, repartido a todo el ancho del hero.
 */
import b from '../assets/letters/b.png'
import eTilde from '../assets/letters/e-tilde.png'
import m from '../assets/letters/m.png'
import e from '../assets/letters/e.png'

export const HERO_LETTERS = [
  { char: 'B', img: b, h: 1, ar: 757 / 990 },
  { char: 'É', img: eTilde, h: 1073 / 880, ar: 643 / 1073 },
  { char: 'M', img: m, h: 1, ar: 949 / 791 },
  { char: 'E', img: e, h: 1, ar: 721 / 920 },
]
