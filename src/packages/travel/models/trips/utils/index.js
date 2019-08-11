import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';

export { default as resolveTripCaption } from './resolveTripCaption';

export const sortVisitsByTrips = visitsList =>
  visitsList.sort(
    ({ orderInTrip: orderInTripA }, { orderInTrip: orderInTripB }) =>
      orderInTripA - orderInTripB,
  );

export const groupAndSortVisitsByTrips = visitsList =>
  mapValues(groupBy(visitsList, 'tripId'), sortVisitsByTrips);
