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
  originalPassword: rawOriginalPassword,
  password: rawPassword,
  passwordConfirm: rawPasswordConfirm,
  reset: rawReset,
  alias: rawUserAlias,
}) => ({
  invite_code: rawInviteCode,
  original_password: rawOriginalPassword,
  password: rawPassword,
  password_confirm: rawPasswordConfirm,
  user_alias: rawUserAlias,
  reset: rawReset,
  username: rawEmail,
});
