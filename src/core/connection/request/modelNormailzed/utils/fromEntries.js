export default entries =>
  entries.reduce((memo, [key, value]) => {
    memo[key] = value;
    return memo;
  }, {});
