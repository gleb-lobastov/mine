export default ({ option: visitId }) => {
  if (visitId === ORIGIN_OF_TRIP) {
    const { locationName } = originLocation;
    return locationName;
  }
  const visit = visitsDict[visitId];
  if (!visit) {
    return 'Не указано';
  }
  const { locationName } = visit;
  return locationName;
};
