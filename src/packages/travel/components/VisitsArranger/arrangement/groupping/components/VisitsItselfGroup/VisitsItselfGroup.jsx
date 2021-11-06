import React, { useMemo } from 'react';
import uniqBy from 'lodash/uniqBy';
import { findClosestGroupValue } from '../../utils/resolveGroupingUtils';
import { PLAIN_GROUPS } from '../../consts';
import { LocationInfo } from '../LocationVisitsGroup';
import VisitInfo from './components/VisitInfo';
import LocationWithRideInfo from './components/LocationWithRideInfo';

export default function VisitsItselfGroup({
  visitsGroup,
  visitsGroup: { visitsList },
  provision,
  provision: { tripsDict, locationsDict, countriesDict },
  classes,
  urls,
}) {
  const groupTripId = findClosestGroupValue(visitsGroup, PLAIN_GROUPS.TRIPS);

  const groupCountryId = findClosestGroupValue(
    visitsGroup,
    PLAIN_GROUPS.COUNTRIES,
  );

  // currently remains only first visit, and only dates for this visit is shown to user
  // todo: solve the issue, show all periods, or show no dates, whatever
  const actualVisitsList = useMemo(
    () => (groupCountryId ? uniqBy(visitsList, 'locationId') : visitsList),
    [groupCountryId, visitsList],
  );

  if (!groupTripId) {
    // Trip ID always expected
    return null;
  }

  const { originLocationId, departureRideId } = tripsDict[groupTripId] ?? {};

  return (
    <div className={classes.level}>
      {!groupCountryId && (
        <LocationWithRideInfo
          locationId={originLocationId}
          rideId={departureRideId}
          provision={provision}
          groupCountryId={groupCountryId}
          className={classes.header}
        />
      )}
      {actualVisitsList.map(visit => (
        <VisitInfo
          className={classes.header}
          key={`v${visit.visitId}`}
          visit={visit}
          provision={provision}
          isObscure={false}
          groupCountryId={groupCountryId}
          urls={urls}
        />
      ))}
      {/* todo: Don't show for relocation trip */}
      {!groupCountryId && (
        <LocationInfo
          className={classes.header}
          provision={provision}
          location={locationsDict[originLocationId]}
          showCountry={!groupCountryId}
        />
      )}
    </div>
  );
}