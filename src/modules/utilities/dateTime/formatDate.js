import ru from 'date-fns/locale/ru';
import format from 'date-fns/format';

export default function formatDate(date) {
  return format(date, 'eeeeee, d MMMM yyyy', { locale: ru });
}
