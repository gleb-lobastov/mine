import ru from 'date-fns/locale/ru';
import dateFormat from './safeDateFormat';

export default function formatDate(date) {
  return dateFormat(date, 'eeeeee, d MMMM yyyy', { locale: ru });
}
