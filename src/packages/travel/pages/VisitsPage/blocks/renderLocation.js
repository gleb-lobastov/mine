import React from 'react';
import LocationInfo from 'travel/components/models/locations/LocationInfo';
import CountryInfo from 'travel/components/models/countries/CountryInfo';
import { GROUP_VISITS_BY } from '../consts';

const GROUPS_TO_RENDER_COUNTRY = [
  GROUP_VISITS_BY.LOCATIONS,
  GROUP_VISITS_BY.YEARS,
  GROUP_VISITS_BY.TRIPS,
];
const GROUPS_TO_RENDER_YEARS_OF_VISIT = [
  GROUP_VISITS_BY.LOCATIONS,
  GROUP_VISITS_BY.COUNTRIES,
];

export default function renderLocation({
  visit,
  visit: { visitId, locationId, countryId },
  classes,
  changes: {
    isYearChanged,
    isCountryChanged,
    isTripChanged,
    isLocationChanged,
  },
  year,
  provision: { locationsDict, countriesDict },
  groupBy,
  counters,
}) {
  const isGroupedByTripsOnly = groupBy === GROUP_VISITS_BY.TRIPS;
  const shouldRender =
    isGroupedByTripsOnly || // every visit in trip should be shown
    isTripChanged || // in other grouping show only unique locations
    isYearChanged ||
    isCountryChanged ||
    isLocationChanged;

  if (!shouldRender) {
    return null;
  }

  const shouldRenderCountry = GROUPS_TO_RENDER_COUNTRY.includes(groupBy);
  const countryDetailNode = shouldRenderCountry ? (
    <CountryInfo
      country={countriesDict[countryId]}
      className={classes.detail}
      isDetail={true}
    />
  ) : null;

  const visitsCount = resolveVisitsCounter(visit, counters, year, groupBy);
  const visitsDetailNode =
    visitsCount > 1 ? (
      <span className={classes.detail}>{`${visitsCount} визитов`}</span>
    ) : null;

  const shouldRenderYearOfVisit = GROUPS_TO_RENDER_YEARS_OF_VISIT.includes(
    groupBy,
  );
  const yearsOfVisitDetailNode = shouldRenderYearOfVisit ? (
    <span className={classes.detail}>
      {`в ${getYearsOfVisits(counters, locationId).join(', ')}`}
    </span>
  ) : null;

  const childrenNodes = joinNodes(
    countryDetailNode,
    visitsDetailNode,
    yearsOfVisitDetailNode,
  );

  return (
    <LocationInfo
      key={`l${locationId}_v${visitId}`}
      location={locationsDict[locationId]}
      country={countriesDict[countryId]}
    >
      {childrenNodes}
    </LocationInfo>
  );
}

function joinNodes(...nodes) {
  return nodes.filter(Boolean).reduce((nodesMemo, node, index) => {
    if (index > 0) {
      nodesMemo.push(<span> </span>);
    }
    nodesMemo.push(node);
    return nodesMemo;
  }, []);
}

function resolveVisitsCounter(visit, counters = {}, year, groupBy) {
  const { locationId } = visit;
  switch (groupBy) {
    case GROUP_VISITS_BY.LOCATIONS:
      return getLocationVisitsCount(counters, locationId);
    case GROUP_VISITS_BY.COUNTRIES:
      return getLocationVisitsCount(counters, locationId);
    case GROUP_VISITS_BY.YEARS:
    case GROUP_VISITS_BY.COUNTRIES_YEARS:
    case GROUP_VISITS_BY.YEARS_COUNTRIES:
      return getLocationVisitsByYearCount(counters, locationId, year);
    case GROUP_VISITS_BY.TRIPS_COUNTRIES:
    default:
      break;
  }
}

function getLocationVisitsCount(counters = {}, locationId) {
  const { locations: { [locationId]: { visits = {} } = {} } = {} } = counters;
  return Object.keys(visits).length;
}

function getLocationVisitsByYearCount(counters, locationId, year) {
  const {
    years: {
      [year]: {
        locations: { [locationId]: locationVisitsByYearCount } = {},
      } = {},
    } = {},
  } = counters;
  return locationVisitsByYearCount;
}

function getYearsOfVisits(counters, locationId) {
  const { locations: { [locationId]: { years = {} } = {} } = {} } = counters;
  return Object.keys(years);
}
