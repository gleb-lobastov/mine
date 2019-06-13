export default (condition, ...args) => {
  if (!condition) {
    console.error(args);
  }
};
