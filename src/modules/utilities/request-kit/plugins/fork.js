export default next => ({ require, ...restOptions }) => {
  if (require && require.map) {
    return Promise.all(
      require.map(requireItem =>
        next({ ...restOptions, require: requireItem }),
      ),
    );
  }
  return next({ require, ...restOptions });
};
