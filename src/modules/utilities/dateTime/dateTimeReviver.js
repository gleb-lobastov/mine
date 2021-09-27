const checkIsDate = value =>
  typeof value === 'string' &&
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value);

export default (key, value) => (checkIsDate(value) ? new Date(value) : value);
