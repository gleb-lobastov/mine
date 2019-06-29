const INITIAL_ORDER = 100;
export default ({ orderResolver: resolveOrder }) => ({ index, collection }) => {
  if (!collection.length) {
    return INITIAL_ORDER;
  }
  if (index <= 0) {
    return resolveOrder(collection[0]) - 1;
  }
  if (index >= collection.length - 1) {
    return resolveOrder(collection[collection.length - 1]) + 1;
  }
  const prevOrder = resolveOrder(collection[index]);
  const nextOrder = resolveOrder(collection[index + 1]);
  const randomness = ((Math.random() - 0.5) * (nextOrder - prevOrder)) / 2;
  return (prevOrder + nextOrder) / 2 + randomness;
};
