import dateFormat from 'date-fns/format';
import isValidDate from './isValidDate';

export default function safeDateFormat(date, ...args) {
  if (!isValidDate(date)) {
    return '?';
  }
  return dateFormat(date, ...args);
}
