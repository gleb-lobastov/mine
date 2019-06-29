export default (prevVisit, nextVisit) => {
  if (!prevVisit || !nextVisit) {
    return true;
  }
  const { departureRideId: prevVisitDepartureRideId } = prevVisit;
  const { arrivalRideId: nextVisitArrivalRideId } = nextVisit;
  return prevVisitDepartureRideId === nextVisitArrivalRideId;
};
