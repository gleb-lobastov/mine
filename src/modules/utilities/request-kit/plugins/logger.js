/* eslint-disable no-console */
export default next => options => {
  const id = Math.round(Math.random() * 10000);
  console.log('request', id, 'options', options);
  const promise = next(options);
  promise.then(
    result => console.log('request', id, 'result', result),
    result => console.log('request', id, 'error', result),
  );
  return promise;
};
