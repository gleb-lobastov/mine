import { PLAIN_FILTERING } from './consts';

export default function switchFilteringFn(provision, filteringOption) {
  switch (filteringOption) {
    case PLAIN_FILTERING.FOREIGN:
    case PLAIN_FILTERING.DOMESTIC:
      return createFilterBasedOnOrigin(provision, filteringOption);
    case PLAIN_FILTERING.ANY:
    default:
      return isVisitExist;
  }
}

function createFilterBasedOnOrigin(
  { tripsDict, locationsDict },
  filteringOption,
) {
  const isForeign = filteringOption === PLAIN_FILTERING.FOREIGN;
  if (!isForeign && filteringOption !== PLAIN_FILTERING.DOMESTIC) {
    return isVisitExist; // filter nothing
  }
  return function filterOnlyForeign(visit) {
    if (!visit) {
      return false;
    }
    const { countryId, tripId } = visit;
    if (!countryId) {
      return true;
    }
    const trip = tripsDict[tripId];
    if (!trip) {
      return true;
    }
    const { originLocationId } = trip;
    const originLocation = locationsDict[originLocationId];
    if (!originLocation) {
      return true;
    }
    const { countryId: originCountryId } = originLocation;
    if (!originCountryId) {
      return true;
    }
    return isForeign
      ? countryId !== originCountryId
      : countryId === originCountryId;
  };
}

function isVisitExist(visit) {
  return Boolean(visit);
}
