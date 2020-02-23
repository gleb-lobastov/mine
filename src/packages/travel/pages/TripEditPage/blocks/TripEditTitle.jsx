import React from 'react';
import { resolveTripCaption } from 'travel/models/trips/utils';

export default function TripEditTitle({
  children,
  className,
  provision,
  trip,
  tripVisitsList,
}) {
  const { countriesDict, locationsDict } = provision;
  const { originLocationId, tripName } = trip;
  return (
    <h1 className={className}>
      {resolveTripCaption(
        tripVisitsList,
        countriesDict,
        locationsDict[originLocationId] &&
          locationsDict[originLocationId].countryId,
        tripName,
      )}
      {children}
    </h1>
  );
}
