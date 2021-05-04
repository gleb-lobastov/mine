export default function resolvePhotosForLocation(
  location,
  { visitId, tripId, year },
  { visitsDict },
) {
  const { visitsIds } = location;
  const actualVisits = visitsIds
    .map(visitsId => visitsDict[visitsId])
    .filter(visit => {
      if (!visit) {
        return false;
      }
      const { tripId: tripIdToCompare, visitId: visitIdToCompare } = visit;
      if (visitId && visitId !== visitIdToCompare) {
        return false;
      }
      if (tripId && tripId !== tripIdToCompare) {
        return false;
      }
      if (!year) {
        return true;
      }
      const { arrivalDateTime, departureDateTime } = visit;
      return (
        arrivalDateTime.getFullYear() <= year &&
        departureDateTime.getFullYear() >= year
      );
    });

  const previewsUrls = actualVisits
    .flatMap(({ photos }) => photos.map(({ previewUrl }) => previewUrl))
    .slice(0, 7);

  return previewsUrls;
}
