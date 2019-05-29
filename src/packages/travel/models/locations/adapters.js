export const toClient = ({
  country_name: rawCountryName,
  id: rawLocationId,
  location_name: rawLocationName,
}) => ({
  countryName: rawCountryName,
  locationId: rawLocationId,
  locationName: rawLocationName,
});

export const toServer = () => undefined;
