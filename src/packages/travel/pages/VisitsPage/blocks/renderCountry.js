import React from 'react';
import CountryInfo from 'travel/components/models/countries/CountryInfo';
import { GROUP_VISITS_BY } from '../consts';
import { resolveTripCountryId, resolveYearCountryId } from '../utils';

export default function renderCountry({
  visit: { tripId, visitId, countryId },
  changes: { isTripChanged, isCountryChanged },
  provision: { countriesDict },
  groupBy,
  year,
  counters,
  classes,
}) {
  const isGroupedByTrip = groupBy === GROUP_VISITS_BY.TRIPS_COUNTRIES;
  const isGroupedByYearCountries = groupBy === GROUP_VISITS_BY.YEARS_COUNTRIES;
  const shouldRender = isCountryChanged || (isGroupedByTrip && isTripChanged);
  if (!shouldRender) {
    return null;
  }
  let locationsCounter = 0;
  switch (groupBy) {
    case GROUP_VISITS_BY.COUNTRIES:
      locationsCounter = Object.keys(
        counters?.countries?.[countryId]?.locations || {},
      ).length;
      break;
    case GROUP_VISITS_BY.COUNTRIES_YEARS:
    case GROUP_VISITS_BY.YEARS_COUNTRIES:
      locationsCounter = Object.keys(
        counters?.yearsCountries?.[resolveYearCountryId(year, countryId)]
          ?.locations || {},
      ).length;
      break;
    case GROUP_VISITS_BY.TRIPS_COUNTRIES:
      locationsCounter = Object.keys(
        counters?.tripsCountries?.[resolveTripCountryId(tripId, countryId)]
          ?.locations || {},
      ).length;
      break;
    default:
      break;
  }

  const isSubgroup = isGroupedByTrip || isGroupedByYearCountries;
  return (
    <CountryInfo
      key={`c${countryId}_v${visitId}`}
      country={countriesDict[countryId]}
      isSubgroup={isSubgroup}
      className={isSubgroup ? classes.subgroup : classes.group}
    >
      {locationsCounter > 2 && (
        <span className={classes.detail}>{`${locationsCounter} мест`}</span>
      )}
    </CountryInfo>
  );
}
