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
  const hasQueryParams = shouldPrepareQuery || Boolean(queryParams);
  const hasBody = body !== undefined;
  return next({
    method,
    id,
    query: hasQueryParams
      ? {
          ...queryParams,
          ...queryToServerAdapter({ filter, sorting, navigation }),
        }
      : undefined,
    body: hasBody
      ? JSON.stringify(
          toServerAdapter ? toServerAdapter(body, requirements) : body,
        )
      : undefined,
    ...restOptions,
  });
};
