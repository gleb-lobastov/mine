import { getAccessToken } from './tokens';

export default next => options => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    return next(options);
  }
  return next({
    headers: {
      ...(options || {}).headers,
      Authorization: `Bearer ${accessToken}`,
    },
    ...options,
  });
};
