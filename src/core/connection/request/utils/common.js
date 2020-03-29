export const compose = (...funcs) => (...args) => {
  const lastFn = funcs[funcs.length - 1] || (arg => arg);
  return funcs
    .slice(0, -1)
    .reduceRight((composed, f) => f(composed), lastFn(...args));
};

export const createControlledPromise = () => {
  // This fields will be initialized synchronously in promise constructor
  let resolver = null;
  let rejector = null;

  const promise = new Promise((resolve, reject) => {
    resolver = resolve;
    rejector = reject;
  });
  return { promise, resolver, rejector };
};

export const mapValues = (object, iteratee) =>
  Object.entries(object).reduce((memo, [key, value]) => {
    memo[key] = iteratee(value, key, object);
    return memo;
  }, {});
