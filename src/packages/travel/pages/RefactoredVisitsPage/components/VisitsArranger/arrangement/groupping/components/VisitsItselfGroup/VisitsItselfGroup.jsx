import React from 'react';
import { findClosestGroupValue } from '../../utils/resolveGroupingUtils';
import { PLAIN_GROUPS } from '../../consts';
import VisitInfo from './components/VisitInfo';
import { LocationInfo } from 'travel/pages/RefactoredVisitsPage/components/VisitsArranger/arrangement/groupping/components/LocationVisitsGroup';
import LocationWithRideInfo from 'travel/pages/RefactoredVisitsPage/components/VisitsArranger/arrangement/groupping/components/VisitsItselfGroup/components/LocationWithRideInfo';

export default function VisitsItselfGroup({
  visitsGroup,
  visitsGroup: { visitsList },
  provision,
  provision: { tripsDict, locationsDict, countriesDict },
  classes,
}) {
  const groupTripId = findClosestGroupValue(visitsGroup, PLAIN_GROUPS.TRIPS);

  const groupCountryId = findClosestGroupValue(
    visitsGroup,
    PLAIN_GROUPS.COUNTRIES,
  );

  if (!groupTripId) {
    // Trip ID always expected
    return null;
  }

  const { originLocationId, departureRideId } = tripsDict[groupTripId] ?? {};

  return (
    <div className={classes.level}>
      <LocationWithRideInfo
        locationId={originLocationId}
        rideId={departureRideId}
        provision={provision}
        groupCountryId={groupCountryId}
        className={classes.header}
      />
      {visitsList.map(visit => (
        <VisitInfo
          className={classes.header}
          key={`v${visit.visitId}`}
          visit={visit}
          provision={provision}
          isObscure={false}
          groupCountryId={groupCountryId}
        />
      ))}
      {/* todo: Don't show for relocation trip */}
      <LocationInfo
        className={classes.header}
        countriesDict={countriesDict}
        location={locationsDict[originLocationId]}
        showCountry={!groupCountryId}
      />
    </div>
  );
}
