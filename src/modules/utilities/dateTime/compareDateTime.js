import isValidDate from './isValidDate';

export default function compareDateTime(
  dateTimeA,
  dateTimeB,
  { reverse, matchBy } = {},
) {
  const isValidA = isValidDate(dateTimeA);
  const isValidB = isValidDate(dateTimeB);
  if (!isValidA && !isValidB) {
    return 0;
  }
  if (!isValidA || !isValidB) {
    // here also considered previous check: !isValidA && !isValidB
    return isValidA ? -1 : 1;
  }

  const [actualDateTimeA, actualDateTimeB] = reverse
    ? [dateTimeB, dateTimeA]
    : [dateTimeA, dateTimeB];

  switch (matchBy) {
    case 'year':
      return actualDateTimeB.getFullYear() - actualDateTimeA.getFullYear();
    case 'time':
    default:
      return actualDateTimeB.getTime() - actualDateTimeA.getTime();
  }
}
