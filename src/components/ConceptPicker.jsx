export default function ConceptPicker({ concepts, selectedId, onSelect }) {
  return (
    <nav className="concept-picker" aria-label="Elegir propuesta de diseño">
      {concepts.map((concept) => (
        <button
          key={concept.id}
          type="button"
          className="concept-picker__button"
          aria-pressed={selectedId === concept.id}
          onClick={() => onSelect(concept.id)}
        >
          <span>{concept.number}</span>
          {concept.label}
        </button>
      ))}
    </nav>
  )
}
