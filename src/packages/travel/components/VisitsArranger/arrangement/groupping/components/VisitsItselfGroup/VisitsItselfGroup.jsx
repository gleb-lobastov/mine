import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import uniqBy from 'lodash/uniqBy';
import ConnectedLink from 'modules/components/muiExtended/ConnectedLink';
import { visitDateTimePeriodToString } from 'modules/utilities/dateTime/dateTimePeriodToString';
import { findClosestGroupValue } from '../../utils/resolveGroupingUtils';
import { PLAIN_GROUPS } from '../../consts';
import { LocationInfo } from '../LocationVisitsGroup';
import VisitInfo from './components/VisitInfo';
import LocationWithRideInfo from './components/LocationWithRideInfo';

const useStyles = makeStyles({
  placeDetails: {
    display: 'inline-block',
    marginRight: '8px',
  },
});

export default function VisitsItselfGroup({
  visitsGroup,
  visitsGroup: { visitsList },
  provision,
  provision: { tripsDict, locationsDict },
  classes,
  urls,
  config: {
    VisitsItselfGroup: {
      appearance: {
        country: countryAppearance = true,
        location: locationAppearance = true,
      } = {},
    } = {},
  } = {},
}) {
  const ownClasses = useStyles();
  const groupTripId = findClosestGroupValue(visitsGroup, PLAIN_GROUPS.TRIPS);
  const groupCountryId = findClosestGroupValue(
    visitsGroup,
    PLAIN_GROUPS.COUNTRIES,
  );
  const groupLocationId = findClosestGroupValue(
    visitsGroup,
    PLAIN_GROUPS.LOCATIONS,
  );

  // currently remains only first visit, and only dates for this visit is shown to user
  // todo: solve the issue, show all periods, or show no dates, whatever
  const actualVisitsList = useMemo(
    () => (groupCountryId ? uniqBy(visitsList, 'locationId') : visitsList),
    [groupCountryId, visitsList],
  );

  if (!groupTripId) {
    return (
      <>
        {visitsList.map(visit => {
          const { locationId, countryId } = visit;
          const locationUrl =
            locationAppearance && !groupLocationId
              ? urls?.resolveLocationUrl({ locationId })
              : null;
          const countryUrl =
            countryAppearance && !groupLocationId
              ? urls?.resolveCountryUrl({ countryId })
              : null;
          return (
            <div className={classes.level}>
              {locationUrl && (
                <LocationInfo
                  className={ownClasses.placeDetails}
                  location={locationsDict[locationId]}
                  provision={provision}
                  showCountry={Boolean(countryUrl) && !groupCountryId}
                  locationUrl={locationUrl}
                  countryUrl={countryUrl}
                />
              )}
              <ConnectedLink
                to={urls.resolveVisitUrl({ visitId: visit.visitId })}
                optional={true}
                display="inline"
              >
                {visitDateTimePeriodToString(visit, false)}
              </ConnectedLink>
            </div>
          );
        })}
      </>
    );
  }

  const { originLocationId, departureRideId } = tripsDict[groupTripId] ?? {};
  const originLocation = locationsDict[originLocationId];

  return (
    <div className={classes.level}>
      {!groupCountryId && (
        <LocationWithRideInfo
          locationId={originLocationId}
          rideId={departureRideId}
          provision={provision}
          groupCountryId={groupCountryId}
          className={classes.header}
          urls={urls}
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
          location={originLocation}
          showCountry={!groupCountryId}
          locationUrl={urls?.resolveLocationUrl({
            locationId: originLocationId,
          })}
          countryUrl={urls?.resolveCountryUrl({
            countryId: originLocation?.countryId,
          })}
        />
      )}
    </div>
  );
}
