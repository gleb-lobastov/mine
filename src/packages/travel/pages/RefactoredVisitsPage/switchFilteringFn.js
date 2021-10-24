import { FILTER_VISITS_BY } from './components/VisitsArranger/arrangement/filtering';

export default function switchFilteringFn(provision, filterBy) {
  switch (filterBy) {
    case FILTER_VISITS_BY.FOREIGN:
    case FILTER_VISITS_BY.DOMESTIC:
      return createFilterBasedOnOrigin(provision, filterBy);
    case FILTER_VISITS_BY.ANY:
    default:
      return isVisitExist;
  }
}

function createFilterBasedOnOrigin({ tripsDict, locationsDict }, filterBy) {
  const isForeign = filterBy === FILTER_VISITS_BY.FOREIGN;
  if (!isForeign && filterBy !== FILTER_VISITS_BY.DOMESTIC) {
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
