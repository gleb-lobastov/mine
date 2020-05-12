/* global __API_HOST__  */
export default next => ({ endpoint, ...restOptions }) => {
  const { domain } = restOptions;
  let actualEndpoint;
  if (typeof endpoint === 'undefined') {
    if (!domain) {
      throw new Error(
        'cannot resolve endpoint, both endpoint and domain is undefined',
      );
    }
    actualEndpoint = `${__API_HOST__}/api/${domain}`;
  } else if (typeof endpoint === 'function') {
    actualEndpoint = endpoint(restOptions);
  } else {
    actualEndpoint = endpoint;
  }

  return next({
    endpoint: actualEndpoint,
    ...restOptions,
  });
};
