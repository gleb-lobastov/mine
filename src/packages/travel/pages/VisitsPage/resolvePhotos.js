export function resolvePhotosForYear() {}
export function resolvePhotosForTrip() {}
export function resolvePhotosForCountry(country, filter, { visitsDict }) {}

export function resolvePhotos(filter, provision) {
  const { visitsDict, visitsIds: allVisitsIds } = provision;
  const {
    tripId,
    visitId,
    year,
    visitsIds = visitId ? [visitId] : allVisitsIds,
  } = filter ?? {};

  return visitsIds
    .map(visitsId => visitsDict[visitsId])
    .filter(
      visit =>
        visit && isVisitInTrip(visit, tripId) && isVisitInYear(visit, year),
    )
    .flatMap(visit => resolvePhotosForVisit(visit, provision));
}

export function resolvePhotosForVisit(
  { photos, arrivalDateTime, locationName, countryId },
  { countriesDict },
) {
  const { countryName } = countriesDict[countryId] || {};
  const year = arrivalDateTime.getFullYear();
  const caption = `${locationName}, ${countryName}. ${year}`;
  return photos.map(({ previewUrl }) => ({
    previewUrl,
    caption,
  }));
}

function isVisitInTrip(visit, tripId) {
  const { tripId: tripIdToCompare } = visit;
  return !tripId || tripId === tripIdToCompare;
}

function isVisitInYear(visit, year) {
  if (!year) {
    return true;
  }
  const { arrivalDateTime, departureDateTime } = visit;
  return (
    arrivalDateTime.getFullYear() <= year &&
    departureDateTime.getFullYear() >= year
  );
}
