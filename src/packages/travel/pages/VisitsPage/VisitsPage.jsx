import React from 'react';
import { usePaths } from 'modules/packages';
import { useTripsStats } from 'travel/dataSource';
import { useQueryFilter } from 'core/context/QueryFilterContext';
import Year from './blocks/Year';
import Country from './blocks/Country';
import Location from './blocks/Location';
import Trip from './blocks/Trip';
import { KEY_GROUP_VISITS_BY, GROUP_VISITS_BY } from './consts';
import useVisitsGroupingSidebar from './useVisitsGroupingSidebar';
import switchSortingFn from './switchSortingFn';

export default function VisitsPage({
  match: {
    params: { userAlias },
  },
}) {
  const {
    queryFilter: {
      [KEY_GROUP_VISITS_BY]: groupBy = GROUP_VISITS_BY.LOCATIONS,
    } = {},
    setQueryFilter,
  } = useQueryFilter();
  useVisitsGroupingSidebar(setQueryFilter, groupBy);

  const provision = useTripsStats({ userAlias });
  const {
    isPending,
    isError,
    updatesCounter,
    visitsIds,
    visitsDict,
    tripsDict,
    countriesDict,
  } = provision;

  const {
    travel: { visits: visitsPaths },
  } = usePaths();

  if (isError) {
    return <div>...Error</div>;
  }
  if (isPending) {
    return <div>...Loading</div>;
  }

  const sortingFn = switchSortingFn(groupBy, tripsDict, countriesDict);
  const visitsList = visitsIds
    .map(visitId => visitsDict[visitId])
    .filter(Boolean)
    .sort(sortingFn);

  const nodes = visitsList.reduce((nodesMemo, visit, index) => {
    const prevVisit = index > 0 ? visitsList[index - 1] : {};
    const {
      countryId: prevCountryId,
      locationId: prevLocationId,
      tripId: prevTripId,
    } = prevVisit;
    const { countryId, locationId, tripId } = visit;

    const prevYear = resolveArrivalYear(prevVisit);
    const year = resolveArrivalYear(visit);

    const isGroupedByTrip = checkIsGroupedByTrip(groupBy);
    const isGroupedByYear = checkIsGroupedByYear(groupBy);
    const isGroupedByCountry = checkIsGroupedByCountry(groupBy);

    const changes = {
      isTripChanged: isGroupedByTrip && prevTripId !== tripId,
      isYearChanged: isGroupedByYear && prevYear !== year,
      isCountryChanged: isGroupedByCountry && prevCountryId !== countryId,
      isLocationChanged: prevLocationId !== locationId,
    };

    const tripNode = renderTrip({ visit, changes, provision, groupBy });
    const countryNode = renderCountry({ visit, changes, provision, groupBy });
    const yearNode = renderYear({ visit, changes, provision, groupBy, year });
    const locationNode = renderLocation({ visit, changes, provision, groupBy });

    const nodesToPush = switchNodesOrder(
      groupBy,
      tripNode,
      countryNode,
      yearNode,
      locationNode,
    ).filter(Boolean);

    nodesToPush.forEach(nodeToPush => {
      nodesMemo.push(nodeToPush);
    });
    return nodesMemo;
  }, []);

  return <div>{nodes}</div>;
}

function renderTrip({
  visit: { visitId, tripId },
  changes: { isTripChanged },
  provision: { tripsDict },
}) {
  if (!isTripChanged) {
    return null;
  }
  return <Trip key={`t${tripId}_v${visitId}`} trip={tripsDict[tripId]} />;
}

function renderCountry({
  visit: { visitId, countryId },
  changes: { isTripChanged, isCountryChanged },
  provision: { countriesDict },
  groupBy,
}) {
  const isGroupedByTrip = groupBy === GROUP_VISITS_BY.TRIPS_COUNTRIES;
  const isGroupedByYearCountries = groupBy === GROUP_VISITS_BY.YEARS_COUNTRIES;
  const shouldRender = isCountryChanged || (isGroupedByTrip && isTripChanged);
  if (!shouldRender) {
    return null;
  }
  return (
    <Country
      key={`c${countryId}_v${visitId}`}
      country={countriesDict[countryId]}
      isSubgroup={isGroupedByTrip || isGroupedByYearCountries}
    />
  );
}
function renderYear({
  visit: { visitId },
  changes: { isYearChanged, isCountryChanged },
  groupBy,
  year,
}) {
  const isGroupedByCountriesYear = groupBy === GROUP_VISITS_BY.COUNTRIES_YEARS;
  const shouldRender =
    isYearChanged || (isGroupedByCountriesYear && isCountryChanged);
  if (!shouldRender) {
    return null;
  }
  return (
    <Year
      key={`y${year}_v${visitId}`}
      year={year}
      isSubgroup={isGroupedByCountriesYear}
    />
  );
}

function renderLocation({
  visit: { visitId, locationId },
  changes: {
    isYearChanged,
    isCountryChanged,
    isTripChanged,
    isLocationChanged,
  },
  provision: { locationsDict },
  groupBy,
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
  return (
    <Location
      key={`l${locationId}_v${visitId}`}
      location={locationsDict[locationId]}
    />
  );
}

function resolveArrivalYear({ arrivalDateTime }) {
  if (!arrivalDateTime) {
    return null;
  }
  return arrivalDateTime.getFullYear(arrivalDateTime);
}

function switchNodesOrder(
  groupBy,
  tripNode,
  countryNode,
  yearNode,
  locationNode,
) {
  switch (groupBy) {
    case GROUP_VISITS_BY.TRIPS:
      return [tripNode, locationNode];
    case GROUP_VISITS_BY.TRIPS_COUNTRIES:
      return [tripNode, countryNode, locationNode];
    case GROUP_VISITS_BY.COUNTRIES:
      return [countryNode, locationNode];
    case GROUP_VISITS_BY.YEARS:
      return [yearNode, locationNode];
    case GROUP_VISITS_BY.YEARS_COUNTRIES:
      return [yearNode, countryNode, locationNode];
    case GROUP_VISITS_BY.COUNTRIES_YEARS:
      return [countryNode, yearNode, locationNode];
    case GROUP_VISITS_BY.LOCATIONS:
    default:
      // return {push:[locationNode], keep: [countryNode, yearNode]};
      return [locationNode];
  }
}

function checkIsGroupedByTrip(groupBy) {
  return (
    groupBy === GROUP_VISITS_BY.TRIPS ||
    groupBy === GROUP_VISITS_BY.TRIPS_COUNTRIES
  );
}

function checkIsGroupedByYear(groupBy) {
  return (
    groupBy === GROUP_VISITS_BY.YEARS ||
    groupBy === GROUP_VISITS_BY.COUNTRIES_YEARS ||
    groupBy === GROUP_VISITS_BY.YEARS_COUNTRIES
  );
}

function checkIsGroupedByCountry(groupBy) {
  return (
    groupBy === GROUP_VISITS_BY.TRIPS_COUNTRIES ||
    groupBy === GROUP_VISITS_BY.COUNTRIES ||
    groupBy === GROUP_VISITS_BY.COUNTRIES_YEARS ||
    groupBy === GROUP_VISITS_BY.YEARS_COUNTRIES
  );
}

/*
// byCities -> groupBy(visits, cities) '123': []
Челябинск, Россия, 3 визита в 2011 и 2012
-> 20 августа 2011
-> 20-21 июня 2012
-> 31 июля-1 августа 2012

// byCountries -> groupBy(visits, countries & cities) '1-123': []
[Россия](/travel/:userAlias/countries/1)
[Челябинск](/travel/:userAlias/cities/123), 3 визита в [2011](/travel/:userAlias/year/2011) и [2012](/travel/:userAlias/year/2012) [заметки](/travel/:userAlias/cities/123/story)
-> 20 августа 2011 [заметки](/travel/:userAlias/visits/111/story)
   до 5 фоток
-> 20-21 июня 2012 [заметки](/travel/:userAlias/visits/222/story)
   до 5 фоток
-> 31 июля-1 августа 2012 [заметки](/travel/:userAlias/visits/333/story)
   до 5 фоток

// byYears -> groupBy(visits, years & cities) '2011-123': []
2011
Челябинск, Россия
-> 20 августа 2011

2012
Челябинск, Россия, 2 визита
-> 20-21 июня 2012
-> 31 июля-1 августа 2012

// byYearsAndCountries -> groupBy(visits, years & countries & cities)  '2011-1-123': []
2011
Россия
Челябинск
-> 20 августа 2011

2012
Россия
Челябинск, 2 визита
-> 20-21 июня 2012
-> 31 июля-1 августа 2012

// byCountriesAndYears -> groupBy(visits, countries & years & cities) 'c1-y2011-l123': []
Россия

2011
Челябинск
-> 20 августа 2011

2012
Челябинск
-> 20-21 июня 2012
-> 31 июля-1 августа 2012

*/
