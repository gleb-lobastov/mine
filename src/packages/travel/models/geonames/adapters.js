export const toClient = ({
  country_name: rawCountryName,
  geoname_id: rawGeonameId,
  location_name: rawLocationName,
  region_name: rawRegionName,
}) => ({
  countryName: rawCountryName,
  geonameId: rawGeonameId,
  locationName: rawLocationName,
  regionName: rawRegionName,
});

export const toServer = () => undefined;
