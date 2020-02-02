import React, { useEffect } from 'react';
import { usePaths } from 'modules/packages';
import { useTripsStats, useCountries } from 'travel/dataSource';
import { useQueryFilter } from 'core/context/QueryFilterContext';
import Year from './blocks/Year';
import Country from './blocks/Country';
import Location from './blocks/Location';
import useVisitsGroupingSidebar, {
  KEY_GROUP_VISITS_BY,
  GROUP_VISITS_BY,
} from './useVisitsGroupingSidebar';
import {
  compareLocations,
  createCountriesComparator,
  createYearsComparator,
  createDatesAndCountriesComparator,
  createCountriesAndDatesComparator,
} from './sorting';

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

  const {
    isPending,
    isError,
    visitsIds,
    visitsDict,
    locationsDict,
    countriesDict,
  } = useTripsStats({ userAlias });

  const {
    travel: { visits: visitsPaths },
  } = usePaths();

  if (isError) {
    return <div>...Error</div>;
  }
  if (isPending) {
    return <div>...Loading</div>;
  }

  const sortingFn = switchSortingFn(groupBy, countriesDict);
  const visitsList = visitsIds
    .map(visitId => visitsDict[visitId])
    .filter(Boolean)
    .sort(sortingFn);

  const nodes = visitsList.reduce((nodesMemo, visit, index) => {
    const prevVisit = index > 0 ? visitsList[index - 1] : {};
    const { countryId: prevCountryId, locationId: prevLocationId } = prevVisit;
    const { countryId, locationId } = visit;

    const prevYear = resolveArrivalYear(prevVisit);
    const year = resolveArrivalYear(visit);

    const isGroupedByYear = checkIsGroupedByYear(groupBy);
    const isGroupedByCountry = checkIsGroupedByCountry(groupBy);

    const isYearChanged = isGroupedByYear && prevYear !== year;
    const isCountryChanged = isGroupedByCountry && prevCountryId !== countryId;
    const isLocationChanged = prevLocationId !== locationId;

    const countryNode = isCountryChanged ? (
      <Country
        key={isGroupedByYear ? `c${countryId}_y${year}` : `c${countryId}`}
        country={countriesDict[visit.countryId]}
      />
    ) : null;

    const yearNode =
      isYearChanged ||
      (isCountryChanged && groupBy === GROUP_VISITS_BY.COUNTRIES_YEARS) ? (
        <Year
          key={isGroupedByCountry ? `y${year}_c${countryId}` : `y${year}`}
          year={year}
        />
      ) : null;

    const locationNode =
      isYearChanged || isCountryChanged || isLocationChanged ? (
        <Location
          key={isGroupedByYear ? `l${locationId}_y${year}` : `l${locationId}`}
          location={locationsDict[locationId]}
        />
      ) : null;

    const nodesToPush = switchNodesOrder(
      groupBy,
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

function resolveArrivalYear({ arrivalDateTime }) {
  if (!arrivalDateTime) {
    return null;
  }
  return arrivalDateTime.getFullYear(arrivalDateTime);
}

function switchSortingFn(groupBy, countriesDict) {
  switch (groupBy) {
    case GROUP_VISITS_BY.COUNTRIES:
      return createCountriesComparator(countriesDict, compareLocations);
    case GROUP_VISITS_BY.YEARS:
      return createYearsComparator(compareLocations);
    case GROUP_VISITS_BY.YEARS_COUNTRIES:
      return createDatesAndCountriesComparator(countriesDict);
    case GROUP_VISITS_BY.COUNTRIES_YEARS:
      return createCountriesAndDatesComparator(countriesDict);
    case GROUP_VISITS_BY.LOCATIONS:
    default:
      return compareLocations;
  }
}

function switchNodesOrder(groupBy, countryNode, yearNode, locationNode) {
  switch (groupBy) {
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

function checkIsGroupedByYear(groupBy) {
  return (
    groupBy === GROUP_VISITS_BY.YEARS ||
    groupBy === GROUP_VISITS_BY.COUNTRIES_YEARS ||
    groupBy === GROUP_VISITS_BY.YEARS_COUNTRIES
  );
}

function checkIsGroupedByCountry(groupBy) {
  return (
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
