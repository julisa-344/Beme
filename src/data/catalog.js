/**
 * Catálogo de servicios y precios.
 *
 * Para agregar un servicio: añade una línea con `item(...)` al grupo que corresponda.
 * Para agregar una categoría: añade un objeto a CATALOG (la pestaña y la página
 * se generan solas). Nada más hay que tocar.
 *
 *   item(nombre, duraciónEnMinutos, precioEnSoles | null, { from: true })
 *   - precio `null`  -> se muestra "Consultar"
 *   - { from: true } -> se muestra "desde"
 *
 * `icon` debe existir en src/components/Icons.jsx.
 */
const item = (name, duration, price, { from = false } = {}) => ({ name, duration, price, from })

export const CATALOG = [
  {
    id: 'cabello',
    label: 'Cabello',
    icon: 'scissors',
    groups: [
      {
        title: 'Cabello',
        items: [
          item('Alisado keratina', 180, 300, { from: true }),
          item('Alisado Marroquin', 180, 380, { from: true }),
          item('Alisados orgánicos', 180, 350, { from: true }),
          item('Cepillado', 45, 80),
          item('Cepillado y planchado', 60, 80, { from: true }),
          item('COLOR COMPLETO+ CORTE', 120, 200),
          item('Corte clásico de caballero', 45, 50),
          item('Corte clásico + tinte de caballero', 60, 180),
          item('Corte dama puntas', 45, 70),
          item('Corte de dama', 45, 100),
          item('Corte y tratamiento', 90, 260),
          item('EXTENSIONES DE CABELLO', 120, 2000),
          item('MAQUILLAJE', 180, 150, { from: true }),
          item('Membresia de uñas', 60, 80),
          item('Ondas', 60, 90, { from: true }),
          item('Peinados básicos', 45, 70, { from: true }),
          item('SESION CHIC EXPRESS', 30, 109),
          item('TRATAMIENTO EXPRESS KERASTASE', 60, 180),
        ],
      },
      {
        title: 'Tratamientos',
        items: [
          item('PACK DE TRATAMIENTOS', 60, 300),
          item('Sesion Chic express', 90, 109),
          item('Tratamiento capilar botox', 120, 200, { from: true }),
          item('Tratamiento células madres', 60, 150),
          item('Tratamiento de brillo ALFAPARF', 60, 180),
          item('Tratamiento de nutrición ALFAPARF', 60, 180),
          item('Tratamiento de reparación ALFAPARF', 60, 250),
          item('Tratamiento detox', 60, 100, { from: true }),
          item('Tratamiento gold filler KLERAL', 60, 150),
          item('Tratamiento orchid oil KLERAL', 60, 200),
          item('Tratamiento PLEX FORTE', 60, 300),
          item('Tratamiento Premium Lights Co Alfa Parf engrosador del cabello', 60, 250),
          item('Tratamiento Premium Lights Co Alfa Parf hidratacion', 60, 250),
          item('Tratamiento Premium Lights Co Alfa Parf reparacion', 60, 250),
          item('TRATAMIENTO PROFUNDO KERASTASE', 60, 250),
          item('Tratamiento senjal KLERAL', 60, 180),
        ],
      },
      {
        title: 'Color',
        items: [
          item('Balayage morena iluminada', 90, 350, { from: true }),
          item('Balayage morena iluminada con súper aclarante', 180, 400),
          item('Balayage Rubio', 180, 300, { from: true }),
          item('Baño de color', 180, 220),
          item('Color entero', 120, 250, { from: true }),
          item('Mechas o baby lights', 180, 450),
          item('Raíces', 180, 200),
          item('SESION GLOW', 90, 360),
          item('SESION REFRESH', 90, 159),
          item('SESION TRANSFORMACION', 90, 529),
        ],
      },
    ],
  },
  {
    id: 'manos-pies',
    label: 'Manos & Pies',
    icon: 'foot',
    groups: [
      {
        items: [
          item('Acrílicas con tips', 120, 130),
          item('Acrílicas esculpidas', 120, 165),
          item('Adelanto', 30, 10, { from: true }),
          item('Adicional Tips', 10, 5),
          item('Builder', 30, 90),
          item('Diseño', 30, 15, { from: true }),
          item('Manicure gel', 90, 60),
          item('Manicure polygel', 120, 120),
          item('Manicure rubber', 90, 80),
          item('Manicure softgel', 90, 100),
          item('Manicure tradicional', 60, 45),
          item('Pedicure gel', 60, 70),
          item('Pedicure tradicional', 45, 55),
          item('Retiro de acrílico', 30, 50),
          item('Retiro definitivo', 30, 50),
          item('Retiro gel', 30, 25),
          item('Retoque de rubber', 30, 80),
        ],
      },
    ],
  },
  {
    id: 'depilacion',
    label: 'Depilación',
    icon: 'bolt',
    groups: [
      {
        items: [
          item('Depilacion de axilas', 25, 40),
          item('Depilación de bozo', 15, 20),
          item('Depilación de cara completa', 30, 100),
          item('Depilación de cejas', 30, 25),
          item('Depilación de media pierna', 30, 55),
          item('Depilación de patillas', 15, 30),
          item('Depilación de pierna entera', 45, 70),
          item('Depilacion de piernas', 30, 80),
          item('Depilación por zonas*', 30, null),
        ],
      },
    ],
  },
  {
    id: 'cejas-pestanas',
    label: 'Cejas y Pestañas',
    icon: 'eye',
    groups: [
      {
        items: [
          item('Depilación de cejas (Diseño y definición)', 30, 40),
          item('EFECTO RIMEL', 90, 142),
          item('HENNA', 60, 100),
          item('Lating Browns', 60, 500),
          item('Lifting de Pestañas', 60, 160),
          item('Lifting de Pestañas con tinte', 75, 180),
          item('Microblading', 120, 450),
          item('Microshading', 120, 500),
          item('Power brows', 120, 450),
          item('Técnica mixta', 120, 520),
        ],
      },
    ],
  },
  {
    id: 'micropigmentacion',
    label: 'Micropigmentación',
    icon: 'pen',
    groups: [
      {
        items: [
          item('Full Lips', 120, 460),
          item('Full Lips para labs oscuros', 60, 480),
          item('Microdelineado', 120, 410),
          item('Retoque Microblandig', 60, 250),
        ],
      },
    ],
  },
]

export const DEFAULT_CATEGORY = CATALOG[0].id

export const getCategory = (id) => CATALOG.find((c) => c.id === id) ?? CATALOG[0]

/** Cantidad total de servicios de una categoría (suma de todos sus grupos). */
export const countItems = (category) => category.groups.reduce((n, g) => n + g.items.length, 0)

/** Servicios de una categoría en una lista plana, con su grupo y número de catálogo (`n`). */
export const flattenItems = (category) =>
  category.groups
    .flatMap((g) => g.items.map((it) => ({ ...it, group: g.title ?? null })))
    .map((it, i) => ({ ...it, n: i + 1 }))
