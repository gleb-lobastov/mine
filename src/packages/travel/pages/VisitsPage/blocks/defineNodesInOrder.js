import {
  resolveArrivalYear,
  checkIsGroupedByCountry,
  checkIsGroupedByTrip,
  checkIsGroupedByYear,
} from '../utils';
import { GROUP_VISITS_BY, NODE_TYPE } from '../consts';

export default function defineNodesInOrder({
  prevVisit,
  visit,
  nextVisit,
  groupBy,
  ...forwardedProps
}) {
  const {
    countryId: prevCountryId,
    locationId: prevLocationId,
    tripId: prevTripId,
  } = prevVisit;
  const { tripId: nextTripId } = nextVisit;
  const { countryId, locationId, tripId } = visit;

  const prevYear = resolveArrivalYear(prevVisit);
  const year = resolveArrivalYear(visit);

  const isGroupedByTrip = checkIsGroupedByTrip(groupBy);
  const isGroupedByYear = checkIsGroupedByYear(groupBy);
  const isGroupedByCountry = checkIsGroupedByCountry(groupBy);

  const renderProps = {
    visit,
    groupBy,
    year,
    changes: {
      isTripChanged: isGroupedByTrip && prevTripId !== tripId,
      willTripChange: isGroupedByTrip && nextTripId !== tripId,
      isYearChanged: isGroupedByYear && prevYear !== year,
      isCountryChanged: isGroupedByCountry && prevCountryId !== countryId,
      isLocationChanged: prevLocationId !== locationId,
    },
    ...forwardedProps,
  };

  switch (groupBy) {
    case GROUP_VISITS_BY.TRIPS:
      return [
        { type: NODE_TYPE.TRIP, renderProps },
        { type: NODE_TYPE.DEPARTURE_LOCATION, renderProps },
        { type: NODE_TYPE.LOCATION, renderProps },
        { type: NODE_TYPE.ARRIVAL_LOCATION, renderProps },
      ];
    case GROUP_VISITS_BY.TRIPS_COUNTRIES:
      return [
        { type: NODE_TYPE.TRIP, renderProps },
        { type: NODE_TYPE.COUNTRY, renderProps },
        { type: NODE_TYPE.LOCATION, renderProps },
      ];
    case GROUP_VISITS_BY.COUNTRIES:
      return [
        { type: NODE_TYPE.COUNTRY, renderProps },
        { type: NODE_TYPE.LOCATION, renderProps },
      ];
    case GROUP_VISITS_BY.YEARS:
      return [
        { type: NODE_TYPE.YEAR, renderProps },
        { type: NODE_TYPE.LOCATION, renderProps },
      ];
    case GROUP_VISITS_BY.YEARS_COUNTRIES:
      return [
        { type: NODE_TYPE.YEAR, renderProps },
        { type: NODE_TYPE.COUNTRY, renderProps },
        { type: NODE_TYPE.LOCATION, renderProps },
      ];
    case GROUP_VISITS_BY.COUNTRIES_YEARS:
      return [
        { type: NODE_TYPE.COUNTRY, renderProps },
        { type: NODE_TYPE.YEAR, renderProps },
        { type: NODE_TYPE.LOCATION, renderProps },
      ];
    case GROUP_VISITS_BY.LOCATIONS:
    default:
      return [{ type: NODE_TYPE.LOCATION, renderProps }];
  }
}
