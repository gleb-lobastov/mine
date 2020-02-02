export function compareLocations(visitA, visitB) {
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

export function createYearsComparator(fallbackComparator = () => 0) {
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

export function createCountriesComparator(
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

export function createDatesAndCountriesComparator(countriesDict) {
  const compareCountries = createCountriesComparator(countriesDict);
  const compareYears = createYearsComparator();
  return (visitA, visitB) =>
    compareYears(visitA, visitB) ||
    compareCountries(visitA, visitB) ||
    compareLocations(visitA, visitB);
}

export function createCountriesAndDatesComparator(countriesDict) {
  const compareCountries = createCountriesComparator(countriesDict);
  const compareYears = createYearsComparator();
  return (visitA, visitB) =>
    compareCountries(visitA, visitB) ||
    compareYears(visitA, visitB) ||
    compareLocations(visitA, visitB);
}
