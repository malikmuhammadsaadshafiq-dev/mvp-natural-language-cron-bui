export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}

export function validateCron(expression: string): boolean {
  const parts = expression.trim().split(/\s+/)
  if (parts.length !== 5) return false
  
  const [minute, hour, day, month, weekday] = parts
  
  const isValidField = (field: string, max: number) => {
    if (field === '*') return true
    const segments = field.split(',')
    return segments.every(part => {
      if (part.includes('/')) {
        const [base, step] = part.split('/')
        if (!step || isNaN(Number(step))) return false
        return base === '*' || (Number(base) >= 0 && Number(base) <= max)
      }
      if (part.includes('-')) {
        const [start, end] = part.split('-')
        return Number(start) >= 0 && Number(end) <= max && Number(start) <= Number(end)
      }
      const num = Number(part)
      return !isNaN(num) && num >= 0 && num <= max
    })
  }
  
  return isValidField(minute, 59) && 
         isValidField(hour, 23) && 
         isValidField(day, 31) && 
         isValidField(month, 12) && 
         isValidField(weekday, 7)
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}