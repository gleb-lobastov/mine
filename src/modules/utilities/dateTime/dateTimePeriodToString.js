import isSameDay from 'date-fns/isSameDay';
import isSameMonth from 'date-fns/isSameMonth';
import isSameYear from 'date-fns/isSameYear';
import ru from 'date-fns/locale/ru';
import dateFormat from 'modules/utilities/dateTime/safeDateFormat';

const DATE_FORMATS = {
  FULL: 'd MMMM yyyy',
  MONTH_YEAR: 'LLLL yyyy',
  MONTH_ONLY: 'LLLL',
  DAY_MONTH: 'd MMMM',
  DAY_ONLY: 'd',
};

function dateTimePeriodToString(periodStart, periodEnd, isObscure) {
  const fullFormat = isObscure ? DATE_FORMATS.MONTH_YEAR : DATE_FORMATS.FULL;
  const periodEndString = dateFormat(periodEnd, fullFormat, {
    locale: ru,
  });

  if (isSameDay(periodStart, periodEnd)) {
    return periodEndString;
  }

  let periodStartString = '';
  if (isSameMonth(periodStart, periodEnd)) {
    if (!isObscure) {
      periodStartString = dateFormat(periodStart, DATE_FORMATS.DAY_ONLY, {
        locale: ru,
      });
    }
  } else if (isSameYear(periodStart, periodEnd)) {
    const shortFormat = isObscure
      ? DATE_FORMATS.MONTH_ONLY
      : DATE_FORMATS.DAY_MONTH;
    periodStartString = dateFormat(periodStart, shortFormat, { locale: ru });
  } else {
    periodStartString = dateFormat(periodStart, fullFormat, { locale: ru });
  }

  return `${periodStartString}—${periodEndString}`;
}

export function rideDateTimePeriodToString(
  { departureDateTime, arrivalDateTime },
  isObscure,
) {
  return dateTimePeriodToString(departureDateTime, arrivalDateTime, isObscure);
}

export function visitDateTimePeriodToString(
  { departureDateTime, arrivalDateTime },
  isObscure,
) {
  return dateTimePeriodToString(arrivalDateTime, departureDateTime, isObscure);
}
