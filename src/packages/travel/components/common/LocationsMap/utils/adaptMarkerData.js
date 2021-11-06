import resolveLocationFirstAndLastVisitDateTime from './resolveLocationFirstAndLastVisitDateTime';

export default function adaptMarkerData({
  locationsIds,
  locationsDict,
  visitsDict,
  locationsRating,
}) {
  return locationsIds.map(locationId => {
    const location = locationsDict[locationId];
    if (!location) {
      return null;
    }
    const { lon, lat, locationName, visitsIds } = location;
    const {
      firstVisitDateTime,
      lastVisitDateTime,
    } = resolveLocationFirstAndLastVisitDateTime(visitsIds ?? [], visitsDict);

    return {
      locationName,
      lat,
      lon,
      firstVisitDateTime,
      lastVisitDateTime,
      locationRating: locationsRating[locationId],
      visitsCount: location.visitsIds?.length,
    };
  });
}
