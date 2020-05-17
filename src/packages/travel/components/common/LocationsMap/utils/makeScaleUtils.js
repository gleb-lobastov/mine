import min from 'lodash/min';
import max from 'lodash/max';
import { LOCATION_RATING } from 'travel/models/users/consts';
import { MARKERS_SCALES } from '../consts';

export default function makeScaleUtils(scaleBy) {
  switch (scaleBy) {
    case MARKERS_SCALES.BY_VISITS_COUNT:
      return {
        resolveStep: stepByVisitsCount,
      };
    case MARKERS_SCALES.BY_RATING:
      return {
        resolveStep: stepByRating,
      };
    case MARKERS_SCALES.BY_LAST_VISIT:
      return makeScaleByDateTimeUtils('lastVisitDateTime');
    case MARKERS_SCALES.BY_FIRST_VISIT:
    default:
      return makeScaleByDateTimeUtils('firstVisitDateTime');
  }
}

function stepByVisitsCount({ visitsCount }) {
  switch (true) {
    case visitsCount > 10:
      return 5;
    case visitsCount > 5:
      return 4;
    case visitsCount > 2:
      return 3;
    case visitsCount > 1:
      return 2;
    default:
      return 1;
  }
}

function stepByRating({ locationRating }) {
  switch (locationRating) {
    case LOCATION_RATING.PLACE_TO_LIVE:
      return 1;
    case LOCATION_RATING.FEW_PER_YEAR:
    case LOCATION_RATING.ONCE_PER_YEAR:
      return 3;
    case LOCATION_RATING.ONCE_PER_TWO_YEARS:
    case LOCATION_RATING.ONCE_PER_FIVE_YEARS:
      return 4;
    case LOCATION_RATING.ONCE_PER_DECADE:
    case LOCATION_RATING.TWICE_PER_LIVE:
      return 7;
    case LOCATION_RATING.ONCE_PER_LIVE:
      return 9;
    case LOCATION_RATING.NEVER:
      return 10;
    default:
      return 6;
  }
}

const stepsByDateTimeCount = 6;
function makeScaleByDateTimeUtils(field) {
  return {
    resolveStep: function stepByDateTime(
      { [field]: dateTime },
      { minTime, diff },
    ) {
      const step = ((dateTime - minTime) / diff) * stepsByDateTimeCount;
      return Math.min(Math.max(Math.floor(step), 0), stepsByDateTimeCount);
    },
    resolveOptions: function resolveOptionsForStepByDateTime(markersDataList) {
      const times = markersDataList
        .map(markerData => markerData[field] && markerData[field].getTime())
        .filter(Boolean);

      const minTime = min(times);
      const maxTime = max(times) + 1;
      const diff = maxTime - minTime;
      return { minTime, diff };
    },
  };
}
