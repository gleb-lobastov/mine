export { default as resolveTripCaption } from './resolveTripCaption';

export const sortVisitsByTrips = visitsList =>
  visitsList.sort(
    ({ orderInTrip: orderInTripA }, { orderInTrip: orderInTripB }) =>
      orderInTripA - orderInTripB,
  );
