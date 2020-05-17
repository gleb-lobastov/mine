export default function createControlledPromise() {
  // This fields will be initialized synchronously in promise constructor
  let resolver = null;
  let rejector = null;

  const promise = new Promise((resolve, reject) => {
    resolver = resolve;
    rejector = reject;
  });
  return { promise, resolver, rejector };
}
