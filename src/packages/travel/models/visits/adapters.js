export const toClient = ({
  arrival_ride_id: rawArrivalRideId,
  arrival_date_time: rawArrivalDateTime,
  departure_ride_id: rawDepartureRideId,
  departure_date_time: rawDepartureDateTime,
  id: rawVisitId,
  location_id: rawLocationId,
  country_id: rawCountryId,
  location_name: rawLocationName,
  order_in_trip: rawOrderInTrip,
  trip_id: rawTripId,
  visit_type: rawVisitType,
  visit_comment: rawVisitComment,
  photos: rawPhotos,
}) => ({
  arrivalRideId: rawArrivalRideId,
  arrivalDateTime: new Date(rawArrivalDateTime || NaN),
  departureRideId: rawDepartureRideId,
  departureDateTime: new Date(rawDepartureDateTime || NaN),
  countryId: rawCountryId,
  locationId: rawLocationId,
  locationName: rawLocationName,
  orderInTrip: rawOrderInTrip,
  tripId: rawTripId,
  visitId: rawVisitId,
  visitType: rawVisitType,
  visitComment: rawVisitComment,
  photos: rawPhotos
    ? rawPhotos.map(
        ({
          url: rawUrl,
          thumbnail_url: rawThumbnailUrl,
          preview_url: rawPreviewUrl,
        }) => ({
          fullSizePhotoUrl: rawUrl,
          thumbnailUrl: rawThumbnailUrl,
          previewUrl: rawPreviewUrl,
        }),
      )
    : [],
});

export const toServer = (requestBody, { isProvision } = {}) => {
  if (isProvision) {
    return undefined;
  }
  const {
    arrivalRideId: rawArrivalRideId,
    departureRideId: rawDepartureRideId,
    locationId: rawLocationId,
    geonameId: rawGeonameId,
    orderInTrip: rawOrderInTrip,
    tripId: rawTripId,
    visitId: rawVisitId,
    visitType: rawVisitType,
    visitComment: rawVisitComment,
  } = requestBody || {};

  return {
    id: rawVisitId,
    arrival_ride_id: rawArrivalRideId,
    departure_ride_id: rawDepartureRideId,
    location_id: rawLocationId,
    geoname_id: rawGeonameId,
    order_in_trip: rawOrderInTrip,
    trip_id: rawTripId,
    visit_type: rawVisitType,
    visit_comment: rawVisitComment,
  };
};
