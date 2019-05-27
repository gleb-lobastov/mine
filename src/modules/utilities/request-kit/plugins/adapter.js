export default next => requirements => {
  const {
    isProvision,
    query: { id, body } = {},
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

  const hasBody = body !== undefined;
  return next({
    method,
    body: hasBody
      ? JSON.stringify(
          toServerAdapter ? toServerAdapter(body, requirements) : body,
        )
      : undefined,
    ...restOptions,
  });
};
