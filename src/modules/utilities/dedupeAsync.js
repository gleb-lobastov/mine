export default fn => {
  let pendingRequest = null;
  return (...args) => {
    if (!pendingRequest) {
      pendingRequest = Promise.resolve(fn(...args)).finally(() => {
        pendingRequest = null;
      });
    }
    return pendingRequest;
  };
};
