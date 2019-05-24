export default next => ({
  isProvision,
  query: { body } = {},
  ...restOptions
}) =>
  next({
    method: isProvision ? 'GET' : 'PATCH',
    body: JSON.stringify(body),
    ...restOptions,
  });
