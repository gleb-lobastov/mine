import React from 'react';
import LocationInfo from 'travel/components/models/locations/LocationInfo';
import CountryInfo from 'travel/components/models/countries/CountryInfo';
import { GROUP_VISITS_BY } from '../consts';

const GROUPS_TO_RENDER_COUNTRY = [
  GROUP_VISITS_BY.LOCATIONS,
  GROUP_VISITS_BY.YEARS,
  GROUP_VISITS_BY.TRIPS,
];

export default function renderOriginLocation({
  keyBase,
  children,
  classes,
  visit: { tripId },
  provision: { tripsDict, locationsDict, countriesDict },
  groupBy,
}) {
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

  return (
    <LocationInfo
      key={`${keyBase}_t${tripId}_ol${originLocationId}`}
      location={locationsDict[originLocationId]}
      country={countriesDict[countryId]}
      shouldJustifyContent={children != null}
    >
      {countryDetailNode}
      {children}
    </LocationInfo>
  );
}
