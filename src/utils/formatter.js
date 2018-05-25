export function toMaxPrecision (val, precision) {
  if (typeof precision !== 'number') {
    precision = 2
  }
  const factor = Math.pow(10, precision)
  return Math.round(val * factor) / factor
}
