import { GROUP_VISITS_BY } from './consts';

export default function switchSortingFn(groupBy, tripsDict, countriesDict) {
  switch (groupBy) {
    case GROUP_VISITS_BY.TRIPS:
      return createTripsComparator(tripsDict, countriesDict);
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

function compareLocations(visitA, visitB) {
  const { locationName: locationNameA } = visitA;
  const { locationName: locationNameB } = visitB;
  if (locationNameA > locationNameB) {
    return 1;
  }
  if (locationNameB > locationNameA) {
    return -1;
  }
  return 0;
}

function createTripsComparator(tripsDict, countriesDict) {
  const compareCountries = createCountriesComparator(countriesDict);
  return (visitA, visitB) => {
    const { tripId: tripIdA } = visitA;
    const { tripId: tripIdB } = visitB;
    const { departureDateTime: departureDateTimeA } = tripsDict[tripIdA] || {};
    const { departureDateTime: departureDateTimeB } = tripsDict[tripIdB] || {};

    const fallbackToTripId = tripIdA - tripIdB;
    if (!departureDateTimeA && !departureDateTimeB) {
      return fallbackToTripId;
    }
    if (!departureDateTimeA || !departureDateTimeB) {
      // here also considered previous check: !arrivalDateTimeA && !arrivalDateTimeB
      return departureDateTimeA ? -1 : 1;
    }
    return (
      departureDateTimeB.getFullYear() - departureDateTimeA.getFullYear() ||
      fallbackToTripId ||
      compareCountries(visitA, visitB)
    );
  };
}

function createYearsComparator(fallbackComparator = () => 0) {
  return (visitA, visitB) => {
    const { arrivalDateTime: arrivalDateTimeA } = visitA;
    const { arrivalDateTime: arrivalDateTimeB } = visitB;

    if (!arrivalDateTimeA && !arrivalDateTimeB) {
      return fallbackComparator(visitA, visitB);
    }
    if (!arrivalDateTimeA || !arrivalDateTimeB) {
      // here also considered previous check: !arrivalDateTimeA && !arrivalDateTimeB
      return arrivalDateTimeA ? -1 : 1;
    }
    return (
      arrivalDateTimeB.getFullYear() - arrivalDateTimeA.getFullYear() ||
      fallbackComparator(visitA, visitB)
    );
  };
}

function createCountriesComparator(
  countriesDict,
  fallbackComparator = () => 0,
) {
  return (visitA, visitB) => {
    const { countryId: countryIdA } = visitA;
    const { countryId: countryIdB } = visitB;
    const { countryName: countryNameA } = countriesDict[countryIdA] || {};
    const { countryName: countryNameB } = countriesDict[countryIdB] || {};

    if (countryNameA > countryNameB) {
      return 1;
    }
    if (countryNameB > countryNameA) {
      return -1;
    }
    return fallbackComparator(visitA, visitB);
  };
}

function createDatesAndCountriesComparator(countriesDict) {
  const compareCountries = createCountriesComparator(countriesDict);
  const compareYears = createYearsComparator();
  return (visitA, visitB) =>
    compareYears(visitA, visitB) ||
    compareCountries(visitA, visitB) ||
    compareLocations(visitA, visitB);
}

function createCountriesAndDatesComparator(countriesDict) {
  const compareCountries = createCountriesComparator(countriesDict);
  const compareYears = createYearsComparator();
  return (visitA, visitB) =>
    compareCountries(visitA, visitB) ||
    compareYears(visitA, visitB) ||
    compareLocations(visitA, visitB);
}
