export default ({ adapters }) => next => options =>
  next(options).then(data => {
    const {
      require,
      meta: { domain },
    } = options;

    const entity = require || domain;
    const adapter = adapters[entity];
    if (adapter) {
      return adapter(data[entity]);
    }
    return data;
  });
