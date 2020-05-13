export const toClient = ({
  country_id: rawCountryId,
  country_name: rawCountryName,
  id: rawLocationId,
  location_name: rawLocationName,
  location_class: rawLocationClass,
  lat: rawLatitude,
  lon: rawLongitude,
  visits_ids: rawVisitsIds,
}) => ({
  countryId: rawCountryId,
  countryName: rawCountryName,
  locationId: rawLocationId,
  locationName: rawLocationName,
  locationClass: rawLocationClass,
  lat: rawLatitude,
  lon: rawLongitude,
  visitsIds: rawVisitsIds,
});

export const toServer = () => undefined;
