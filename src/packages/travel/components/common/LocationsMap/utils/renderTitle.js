import formatDate from 'modules/utilities/dateTime/formatDate';
import { LOCATION_RATING } from 'travel/models/users/consts';

export default function renderTitle({
  locationName,
  locationRating,
  visitsCount,
  firstVisitDateTime,
  lastVisitDateTime,
}) {
  return [
    locationName,
    `Посещено ${visitsCount} раз`,
    `Впервые ${formatDate(firstVisitDateTime)}`,
    visitsCount > 1 && `Прошлое посешение ${formatDate(lastVisitDateTime)}`,
    `Рейтинг: ${renderRating(locationRating)}`,
  ]
    .filter(Boolean)
    .join('\n');
}

function renderRating(locationRating) {
  switch (locationRating) {
    case LOCATION_RATING.PLACE_TO_LIVE:
      return 'Жил бы здесь';
    case LOCATION_RATING.FEW_PER_YEAR:
    case LOCATION_RATING.ONCE_PER_YEAR:
      return 'Готов ездить сюда постоянно';
    case LOCATION_RATING.ONCE_PER_TWO_YEARS:
    case LOCATION_RATING.ONCE_PER_FIVE_YEARS:
      return 'Приезжал бы иногда';
    case LOCATION_RATING.ONCE_PER_DECADE:
    case LOCATION_RATING.TWICE_PER_LIVE:
      return 'Заглянул бы еще разок';
    case LOCATION_RATING.ONCE_PER_LIVE:
      return 'Одного посещения достаточно';
    case LOCATION_RATING.NEVER:
      return 'Тут нечего делать';
    default:
      return '?';
  }
}
