import { MARKERS_RATING_LEVELS } from '../consts';
import { LOCATION_RATING } from 'travel/models/users/consts';

export default function filterMarkerData(adaptedMarkersData, { ratingLevel }) {
  const validMarkersData = adaptedMarkersData.filter(Boolean);
  if (
    !Object.values(MARKERS_RATING_LEVELS).includes(ratingLevel) ||
    ratingLevel === MARKERS_RATING_LEVELS.ALL
  ) {
    return validMarkersData;
  }
  return validMarkersData.filter(({ locationRating, visitsCount }) => {
    switch (ratingLevel) {
      case MARKERS_RATING_LEVELS.WANT_COME_BACK:
        if (visitsCount < 2) {
          return locationRating <= LOCATION_RATING.TWICE_PER_LIVE;
        }
        return locationRating <= LOCATION_RATING.ONCE_PER_DECADE;
      case MARKERS_RATING_LEVELS.LOVE_THIS_PLACE:
        return locationRating <= LOCATION_RATING.ONCE_PER_YEAR;
      default:
        return true;
    }
  });
}
