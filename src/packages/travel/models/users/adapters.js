export const toClient = ({
  user_alias: rawUserAlias,
  locations_rating: rawLocationsRating,
}) => ({
  id: rawUserAlias,
  userAlias: rawUserAlias,
  locationsRating: rawLocationsRating,
});

export const toServer = ({
  email: rawEmail,
  inviteCode: rawInviteCode,
  password: rawPassword,
  passwordConfirm: rawPasswordConfirm,
  alias: rawUserAlias,
}) => ({
  invite_code: rawInviteCode,
  password: rawPassword,
  password_confirm: rawPasswordConfirm,
  user_alias: rawUserAlias,
  username: rawEmail,
});
