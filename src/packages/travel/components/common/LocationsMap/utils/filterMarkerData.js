import { MARKERS_RATING_LEVELS } from '../consts';
import { LOCATION_RATING } from 'travel/models/users/consts';

export default function filterMarkerData(adaptedMarkersData, { ratingLevel }) {
  if (
    !Object.values(MARKERS_RATING_LEVELS).includes(ratingLevel) ||
    ratingLevel === MARKERS_RATING_LEVELS.ALL
  ) {
    return adaptedMarkersData;
  }
  return adaptedMarkersData.filter(({ locationRating }) => {
    switch (ratingLevel) {
      case MARKERS_RATING_LEVELS.GOOD:
        return locationRating <= LOCATION_RATING.TWICE_PER_LIVE;
      case MARKERS_RATING_LEVELS.BEST:
        return locationRating <= LOCATION_RATING.ONCE_PER_YEAR;
      default:
        return true;
    }
  });
}
