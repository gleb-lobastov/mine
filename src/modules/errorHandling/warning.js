export default (condition, ...args) => {
  if (!condition) {
    // eslint-disable-next-line
    console.error(args);
  }
};
