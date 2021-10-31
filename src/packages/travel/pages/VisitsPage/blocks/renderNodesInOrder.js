import {
  resolveArrivalYear,
  checkIsGroupedByCountry,
  checkIsGroupedByTrip,
  checkIsGroupedByYear,
} from '../utils';
import { GROUP_VISITS_BY } from '../consts';
import renderCountry from './renderCountry';
import renderLocation from './renderLocation';
import renderDepartureLocation from './renderDepartureLocation';
import renderArrivalLocation from './renderArrivalLocation';
import renderTrip from './renderTrip';
import renderYear from './renderYear';

export default function renderNodesInOrder({
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
        renderTrip(renderProps),
        renderDepartureLocation(renderProps),
        renderLocation(renderProps),
        renderArrivalLocation(renderProps),
      ];
    case GROUP_VISITS_BY.TRIPS_COUNTRIES:
      return [
        renderTrip(renderProps),
        renderCountry(renderProps),
        renderLocation(renderProps),
      ];
    case GROUP_VISITS_BY.COUNTRIES:
      return [renderCountry(renderProps), renderLocation(renderProps)];
    case GROUP_VISITS_BY.YEARS:
      return [renderYear(renderProps), renderLocation(renderProps)];
    case GROUP_VISITS_BY.YEARS_COUNTRIES:
      return [
        renderYear(renderProps),
        renderCountry(renderProps),
        renderLocation(renderProps),
      ];
    case GROUP_VISITS_BY.COUNTRIES_YEARS:
      return [
        renderCountry(renderProps),
        renderYear(renderProps),
        renderLocation(renderProps),
      ];
    case GROUP_VISITS_BY.LOCATIONS:
    default:
      // return {push:[locationNode], keep: [countryNode, yearNode]};
      return [renderLocation(renderProps)];
  }
}
