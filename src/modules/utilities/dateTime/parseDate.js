import parse from 'date-fns/parse';
import ru from 'date-fns/locale/ru';

// recommendation from https://date-fns.org/docs/I18n
export default function parseDate(
  dateStr,
  formatStr = 'yyyy-MM-dd',
  referenceDate = new Date(),
) {
  return parse(dateStr, formatStr, referenceDate, { locale: ru });
}
