import { format } from 'date-fns' // eslint-disable-line import/no-duplicates
import { ja } from 'date-fns/locale' // eslint-disable-line import/no-duplicates

export function formatDate(date: Date, pattern: string): string {
  return format(date, pattern, { locale: ja })
}
