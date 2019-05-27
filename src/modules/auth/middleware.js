import { getAccessToken } from './tokens';

export default next => (requirements = {}) => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    return next(requirements);
  }
  return next({
    ...requirements,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...requirements.headers,
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};
