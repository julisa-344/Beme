# Béme Beauty Studio — propuestas de home

Prototipo responsive en React y Vite para comparar tres direcciones visuales de la página de inicio:

1. Lujo editorial
2. Feminidad social
3. Béme Future Beauty

## Desarrollo

```sh
npm install
npm run dev
```

Se puede abrir una propuesta directamente con `?concept=editorial`, `?concept=social` o `?concept=future`. El selector actualiza el historial del navegador para compartir y comparar las rutas.

## Validación

```sh
npm run lint
npm run build
```

## Estructura

- `src/data/homeConcepts.js`: contenido y datos compartidos de las propuestas.
- `src/components/ConceptPicker.jsx`: selector accesible de propuestas.
- `src/components/HomePreview.jsx`: composición reutilizable de cabecera, hero y secciones de la home.
- `src/App.jsx`: presentación, estado de selección y sincronización de URL.
- `src/App.css`: estilos responsive compartidos y variantes visuales.

La sección de productos dirige al catálogo existente; este prototipo no implementa carrito ni compra en línea. Las páginas internas actuales se enlazan, pero no se rediseñan en esta etapa.
