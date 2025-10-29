/**
 * Форматирует дату в локализованную строку
 * @param date Дата для форматирования
 * @returns Отформатированная строка даты
 */
export function formatDate(date: Date): string {
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}