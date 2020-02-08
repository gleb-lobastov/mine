import { GROUP_VISITS_BY } from './consts';

export default function switchSortingFn(
  groupBy,
  tripsDict,
  countriesDict,
  counters,
) {
  switch (groupBy) {
    case GROUP_VISITS_BY.TRIPS:
      return createTripsComparator(tripsDict);
    case GROUP_VISITS_BY.TRIPS_COUNTRIES:
      return createTripsComparator(
        tripsDict,
        createCountriesComparator(
          countriesDict,
          createLocationsComparator(counters),
        ),
      );
    case GROUP_VISITS_BY.COUNTRIES:
      return createCountriesComparator(
        countriesDict,
        createLocationsComparator(counters),
      );
    case GROUP_VISITS_BY.YEARS:
      return createYearsComparator(createLocationsComparator(counters));
    case GROUP_VISITS_BY.YEARS_COUNTRIES:
      return createDatesAndCountriesComparator(countriesDict);
    case GROUP_VISITS_BY.COUNTRIES_YEARS:
      return createCountriesAndDatesComparator(countriesDict);
    case GROUP_VISITS_BY.LOCATIONS:
    default:
      return createLocationsComparator(counters);
  }
}

function createLocationsComparator() {
  return (visitA, visitB) => {
    const { locationName: locationNameA } = visitA;
    const { locationName: locationNameB } = visitB;
    if (locationNameA > locationNameB) {
      return 1;
    }
    if (locationNameB > locationNameA) {
      return -1;
    }
    return 0;
  };
}

function createTripsComparator(tripsDict, fallbackComparator = () => 0) {
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
      fallbackComparator(visitA, visitB)
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
    createLocationsComparator()(visitA, visitB);
}

function createCountriesAndDatesComparator(countriesDict) {
  const compareCountries = createCountriesComparator(countriesDict);
  const compareYears = createYearsComparator();
  return (visitA, visitB) =>
    compareCountries(visitA, visitB) ||
    compareYears(visitA, visitB) ||
    createLocationsComparator()(visitA, visitB);
}
