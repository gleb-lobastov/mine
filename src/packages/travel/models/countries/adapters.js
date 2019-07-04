export const toClient = ({
  country_name: rawCountryName,
  id: rawCountryId,
}) => ({
  countryName: rawCountryName,
  countryId: rawCountryId,
});

export const toServer = () => undefined;
