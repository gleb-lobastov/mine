import isSameDay from 'date-fns/isSameDay';
import isSameMonth from 'date-fns/isSameMonth';
import isSameYear from 'date-fns/isSameYear';
import dateFormat from 'date-fns/format';
import ru from 'date-fns/locale/ru';

const DATE_FORMATS = {
  FULL: 'd MMMM yyyy',
  DAY_MONTH: 'd MMMM',
  DAY_ONLY: 'd',
};

function dateTimePeriodToString(periodStart, periodEnd) {
  const periodEndString = dateFormat(periodEnd, DATE_FORMATS.FULL, {
    locale: ru,
  });

  if (isSameDay(periodStart, periodEnd)) {
    return periodEndString;
  }

  let periodStartString = '';
  if (isSameMonth(periodStart, periodEnd)) {
    periodStartString = dateFormat(periodStart, DATE_FORMATS.DAY_ONLY, {
      locale: ru,
    });
  } else if (isSameYear(periodStart, periodEnd)) {
    periodStartString = dateFormat(periodStart, DATE_FORMATS.DAY_MONTH, {
      locale: ru,
    });
  } else {
    periodStartString = dateFormat(periodStart, DATE_FORMATS.FULL, {
      locale: ru,
    });
  }

  return `${periodStartString}—${periodEndString}`;
}

export function rideDateTimePeriodToString({
  departureDateTime,
  arrivalDateTime,
}) {
  return dateTimePeriodToString(departureDateTime, arrivalDateTime);
}

export function visitDateTimePeriodToString({
  departureDateTime,
  arrivalDateTime,
}) {
  return dateTimePeriodToString(arrivalDateTime, departureDateTime);
}
