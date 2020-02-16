export const toClient = ({
  user_alias: rawUserAlias,
  locations_rating: rawLocationsRating,
}) => ({
  id: rawUserAlias,
  userAlias: rawUserAlias,
  locationsRating: rawLocationsRating,
});

export const toServer = () => undefined;
