import formatDuration from 'date-fns/formatDuration';
import add from 'date-fns/add';
import isValid from 'date-fns/isValid';
import ru from 'date-fns/locale/ru';
import intervalToDuration from 'date-fns/intervalToDuration';
import { dateTimeOpenPeriodToString } from 'modules/utilities/dateTime/dateTimePeriodToString';
import parseDate from 'modules/utilities/dateTime/parseDate';

export function dateTimePeriodToStr(from, to) {
  return dateTimeOpenPeriodToString({
    periodStart: from && parseDate(from),
    periodEnd: to && parseDate(to),
    isObscure: true,
    placeholder: 'по настоящее время',
  });
}

export function workPeriodToStr(from, to) {
  return formatDuration(
    intervalToDuration({
      start: asDate(from),
      end: asDate(to),
    }),
    { format: ['years', 'months'], locale: ru },
  );
}

export function workPeriodsToStr(periods) {
  const base = new Date();
  const advance = periods.reduce((accumulator, { from, to } = {}) => {
    return add(
      accumulator,
      intervalToDuration({
        start: asDate(from, null),
        end: asDate(to),
      }),
    );
  }, base);
  if (!isValid(advance)) {
    return '';
  }
  return workPeriodToStr(base, advance);
}

function asDate(maybeDate, fallback = new Date()) {
  if (maybeDate instanceof Date) {
    return maybeDate;
  }
  return maybeDate ? parseDate(maybeDate) : fallback;
}
