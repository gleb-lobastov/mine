export const toClient = ({
  country_name: rawCountryName,
  id: rawLocationId,
  location_name: rawLocationName,
  lat: rawLatitude,
  lon: rawLongitude,
}) => ({
  countryName: rawCountryName,
  locationId: rawLocationId,
  locationName: rawLocationName,
  lat: rawLatitude,
  lon: rawLongitude,
});

export const toServer = () => undefined;
