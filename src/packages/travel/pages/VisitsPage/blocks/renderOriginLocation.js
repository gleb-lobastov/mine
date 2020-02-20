import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconStar from '@material-ui/icons/StarBorder';
import IconThumbDown from '@material-ui/icons/ThumbDownOutlined';
import IconThumbsUpDown from '@material-ui/icons/ThumbsUpDownOutlined';
import { visitDateTimePeriodToString } from 'modules/utilities/dateTime/dateTimePeriodToString';
import RideInfo from 'travel/components/models/rides/RideInfo';
import LocationInfo from 'travel/components/models/locations/LocationInfo';
import CountryInfo from 'travel/components/models/countries/CountryInfo';
import { LOCATION_RATING } from 'travel/models/users/consts';
import { GROUP_VISITS_BY, SORT_VISITS_BY } from '../consts';
import {
  getYearsOfVisits,
  getLocationVisitsByYearCount,
  getLocationVisitsCount,
} from '../calcCounters';

const GROUPS_TO_RENDER_COUNTRY = [
  GROUP_VISITS_BY.LOCATIONS,
  GROUP_VISITS_BY.YEARS,
  GROUP_VISITS_BY.TRIPS,
];

export default function renderOriginLocation({
  visit: { tripId, arrivalRideId },
  classes,
  changes: { isTripChanged, willTripChange },
  provision: { tripsDict, locationsDict, countriesDict, ridesDict },
  groupBy,
  shouldRenderRide,
}) {
  if (!isTripChanged && !willTripChange) {
    return null;
  }
  const trip = tripsDict[tripId];
  if (!trip) {
    return null;
  }
  const { originLocationId } = trip;

  const originLocation = locationsDict[originLocationId];
  if (!originLocation) {
    return null;
  }

  const { countryId } = originLocation;
  const shouldRenderCountry = GROUPS_TO_RENDER_COUNTRY.includes(groupBy);
  const countryDetailNode = shouldRenderCountry ? (
    <CountryInfo
      country={countriesDict[countryId]}
      className={classes.detail}
      isDetail={true}
    />
  ) : null;

  const childrenNodes = countryDetailNode;

  return (
    <LocationInfo
      key={`t${tripId}_ol${originLocationId}`}
      location={locationsDict[originLocationId]}
      country={countriesDict[countryId]}
      shouldJustifyContent={shouldRenderRide}
    >
      {childrenNodes}
      {shouldRenderRide && (
        <RideInfo
          ride={ridesDict[arrivalRideId]}
          className={classes.halfDown}
        />
      )}
    </LocationInfo>
  );
}
