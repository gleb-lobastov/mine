export default (object, iteratee) =>
  Object.entries(object)
    .map(([key, value]) => [key, iteratee(value)])
    .reduce((memo, [key, value]) => {
      memo[key] = value;
      return memo;
    }, {});
