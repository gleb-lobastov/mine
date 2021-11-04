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
}) => {
  const arrivalDateTime = new Date(rawArrivalDateTime || NaN);
  const departureDateTime = new Date(rawDepartureDateTime || NaN);
  return {
    arrivalRideId: rawArrivalRideId,
    arrivalDateTime,
    arrivalYear: arrivalDateTime.getFullYear(),
    departureRideId: rawDepartureRideId,
    departureDateTime,
    departureYear: departureDateTime.getFullYear(),
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
            blurhash: rawBlurhash,
            aspect_ratio: rawAspectRatio = '',
          }) => {
            const [w, h] =
              rawAspectRatio && rawAspectRatio.includes(':')
                ? rawAspectRatio.split(':').map(Number)
                : '';
            return {
              fullSizePhotoUrl: rawUrl,
              thumbnailUrl: rawThumbnailUrl,
              previewUrl: rawPreviewUrl,
              blurhash: rawBlurhash,
              aspectRatio:
                w && h
                  ? { widthComponent: w, heightComponent: h, ratio: w / h }
                  : null,
            };
          },
        )
      : [],
  };
};

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
