/* eslint-disable import/prefer-default-export */

export function checkTripHasStory(tripVisitsList, ridesDict) {
  tripVisitsList.some(({ visitComment, arrivalRideId, departureRideId }) => {
    if (visitComment) {
      return true;
    }
    const { rideComment: arrivalRideComment } = ridesDict[arrivalRideId] || {};
    if (arrivalRideComment) {
      return true;
    }
    const { rideComment: departureRideComment } =
      ridesDict[departureRideId] || {};
    return Boolean(departureRideComment);
  });
}
