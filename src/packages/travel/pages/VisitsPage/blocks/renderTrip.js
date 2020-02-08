import React from 'react';
import TripInfo from 'travel/components/models/trips/TripInfo';
import { GROUP_VISITS_BY } from '../consts';

export default function renderTrip({
  visit: { visitId, tripId },
  changes: { isTripChanged },
  provision: { tripsDict },
}) {
  if (!isTripChanged) {
    return null;
  }
  return <TripInfo key={`t${tripId}_v${visitId}`} trip={tripsDict[tripId]} />;
}
