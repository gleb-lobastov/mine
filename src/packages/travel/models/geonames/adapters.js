export const toClient = ({
  country_name: rawCountryName,
  geoname_id: rawGeonameId,
  location_name: rawLocationName,
  region_name: rawRegionName,
  class: rawFeatureClassName,
}) => ({
  countryName: rawCountryName,
  geonameId: rawGeonameId,
  locationName: rawLocationName,
  regionName: rawRegionName,
  featureClassName: rawFeatureClassName,
});

export const toServer = () => undefined;
