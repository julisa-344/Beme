/** 90 -> "1h 30m", 60 -> "1h", 45 -> "45 min" */
export function formatDuration(minutes) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m} min`
  return m ? `${h}h ${m}m` : `${h}h`
}

/** 2000 -> "S/2,000.00"; sin precio -> "Consultar" */
export function formatPrice(amount) {
  if (amount == null) return 'Consultar'
  return `S/${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}
