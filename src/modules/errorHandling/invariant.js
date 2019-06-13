export default (condition, ...args) => {
  if (!condition) {
    throw new Error(args.length === 1 ? args : JSON.stringify(args));
  }
};
