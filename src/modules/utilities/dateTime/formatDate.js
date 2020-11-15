import ru from 'date-fns/locale/ru';
import dateFormat from './safeDateFormat';

export default function formatDate(date, format = 'eeeeee, d MMMM yyyy') {
  return dateFormat(date, format, { locale: ru });
}
