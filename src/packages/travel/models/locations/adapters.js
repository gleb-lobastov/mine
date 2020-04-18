export const toClient = ({
  country_id: rawCountryId,
  country_name: rawCountryName,
  id: rawLocationId,
  location_name: rawLocationName,
  location_class: rawLocationClass,
  lat: rawLatitude,
  lon: rawLongitude,
}) => ({
  countryId: rawCountryId,
  countryName: rawCountryName,
  locationId: rawLocationId,
  locationName: rawLocationName,
  locationClass: rawLocationClass,
  lat: rawLatitude,
  lon: rawLongitude,
});

export const toServer = () => undefined;
