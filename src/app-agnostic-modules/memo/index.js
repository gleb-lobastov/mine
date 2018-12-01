const defaultComparator = (list, listToCompare) =>
  list.every((item, index) => item === listToCompare[index]);

export default (decoratedFunc, comparator = defaultComparator) => {
  let cachedArgs;
  let cachedResult;
  return (...args) => {
    if (cachedArgs && comparator(args, cachedArgs)) {
      return cachedResult;
    }
    cachedResult = decoratedFunc(...args);
    return cachedResult;
  };
};
