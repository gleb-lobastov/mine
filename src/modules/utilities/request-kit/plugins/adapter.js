import queryToServerAdapter from '../queryToServerAdapter';

export default next => requirements => {
  const {
    isProvision,
    query: { id, body, filter, sorting, navigation, ...queryParams } = {},
    toServerAdapter,
    ...restOptions
  } = requirements;

  let method;
  if (isProvision) {
    method = 'GET';
  } else if (id) {
    method = 'PATCH';
  } else {
    method = 'POST';
  }

  const shouldPrepareQuery =
    !id && method === 'GET' && (filter || sorting || navigation);
  const actualQueryParams = shouldPrepareQuery
    ? {
        ...queryToServerAdapter({ filter, sorting, navigation }),
        ...queryParams,
      }
    : queryParams;

  const hasBody = body !== undefined;
  return next({
    method,
    id,
    query: Object.keys(actualQueryParams).length
      ? actualQueryParams
      : undefined,
    body: hasBody
      ? JSON.stringify(
          toServerAdapter ? toServerAdapter(body, requirements) : body,
        )
      : undefined,
    ...restOptions,
  });
};
