import React from 'react';
import Typography from '@material-ui/core/Typography';
import { usePaths } from 'modules/packages';
import { useTripsStats } from 'travel/dataSource';
import { useQueryFilter } from 'core/context/QueryFilterContext';
import renderCountry from './blocks/renderCountry';
import renderLocation from './blocks/renderLocation';
import renderTrip from './blocks/renderTrip';
import renderYear from './blocks/renderYear';
import {
  KEY_GROUP_VISITS_BY,
  GROUP_VISITS_BY,
  KEY_SORT_VISITS_BY,
  SORT_VISITS_BY,
} from './consts';
import useVisitsPageStyles from './useVisitsPageStyles';
import useVisitsGroupingSidebar from './useVisitsGroupingSidebar';
import switchSortingFn from './switchSortingFn';
import switchNodesOrder from './switchNodesOrder';
import calcCounters from './calcCounters';

export default function VisitsPage({
  match: {
    params: { userAlias },
  },
}) {
  const classes = useVisitsPageStyles();
  const {
    queryFilter: {
      [KEY_GROUP_VISITS_BY]: groupBy = GROUP_VISITS_BY.LOCATIONS,
      [KEY_SORT_VISITS_BY]: sortBy = SORT_VISITS_BY.ALPHABET,
    } = {},
    setQueryFilter,
  } = useQueryFilter();
  useVisitsGroupingSidebar(setQueryFilter, { groupBy, sortBy });

  const provision = useTripsStats({ userAlias });
  const {
    isPending,
    isError,
    updatesCounter,
    visitsIds,
    visitsDict,
    tripsDict,
    locationsDict,
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

  const unsortedVisitsList = visitsIds
    .map(visitId => visitsDict[visitId])
    .filter(Boolean);

  const counters = calcCounters(unsortedVisitsList, updatesCounter);
  const sortingFn = switchSortingFn(
    { groupBy, sortBy },
    { locationsDict, tripsDict, countriesDict },
    counters,
  );
  const visitsList = unsortedVisitsList.sort(sortingFn);

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

    const renderProps = {
      changes,
      classes,
      counters,
      groupBy,
      provision,
      visit,
      year,
    };

    const nodesToPush = switchNodesOrder(
      {
        tripNode: renderTrip(renderProps),
        countryNode: renderCountry(renderProps),
        yearNode: renderYear(renderProps),
        locationNode: renderLocation(renderProps),
      },
      groupBy,
    ).filter(Boolean);

    nodesToPush.forEach(nodeToPush => {
      nodesMemo.push(nodeToPush);
    });
    return nodesMemo;
  }, []);

  const titleNode = (
    <Typography variant="h6" paragraph={true}>
      {`Всего ${Object.keys(counters?.locations || {}).length} городов из ${
        Object.keys(counters?.countries || {}).length
      } стран `}
    </Typography>
  );

  return (
    <div>
      {titleNode}
      {nodes}
    </div>
  );
}

function resolveArrivalYear({ arrivalDateTime }) {
  if (!arrivalDateTime) {
    return null;
  }
  return arrivalDateTime.getFullYear(arrivalDateTime);
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
Челябинск, 2 визита
-> 20-21 июня 2012
-> 31 июля-1 августа 2012

*/
