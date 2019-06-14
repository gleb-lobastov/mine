/* globals __API_HOST__ */
import dedupeAsync from 'modules/utilities/dedupeAsync';
import {
  getAccessToken,
  setAccessToken,
  resetAccessToken,
  deriveTokenStatus,
} from './tokens';

const UNAUTHORIZED = 401;
const refreshToken = dedupeAsync(async accessToken => {
  const response = await fetch(`${__API_HOST__}/api/refresh_token`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    if (response.status === UNAUTHORIZED) {
      resetAccessToken();
    }
    return null;
  }
  const { token } = await response.json();
  if (!token) {
    return null;
  }
  setAccessToken(token);
  return token;
});

export default next => async (requirements = {}) => {
  let accessToken = getAccessToken();
  if (!accessToken) {
    return next(requirements);
  }

  const { isValid, isExpired } = deriveTokenStatus(accessToken);
  if (!isValid) {
    resetAccessToken();
    return next(requirements);
  }
  if (isExpired) {
    accessToken = await refreshToken(accessToken);
  }
  return next({
    ...requirements,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...requirements.headers,
    },
  });
};
