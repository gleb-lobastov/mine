export default (object) => {
  if (process.env === 'production') {
    return object;
  }
  return Object.freeze(object);
};
