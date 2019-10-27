const serializeQuery = ({ endpoint }) => endpoint;

/* eslint-disable no-bitwise */
const hashString = string => {
  let hashValue = 0;
  if (string.length === 0) return hashValue;
  for (let charIndex = 0; charIndex < string.length; charIndex += 1) {
    const charCode = string.charCodeAt(charIndex);
    hashValue = (hashValue << 5) - hashValue + charCode;
    hashValue |= 0; // Convert to 32bit integer
  }
  return hashValue;
};
/* eslint-enable no-bitwise */

export default next => options => {
  const query = serializeQuery(options);
  const queryHash = `qc:${hashString(query)}`;
  const cachedResponse = localStorage.getItem(queryHash);
  if (cachedResponse) {
    console.log('cache catch', query, JSON.parse(cachedResponse));
    return Promise.resolve(JSON.parse(cachedResponse));
  }
  return next(options).then(response => {
    localStorage.setItem(queryHash, JSON.stringify(response));
    return response;
  });
};

window.resetRequestCache = () => {
  Object.keys(localStorage)
    .filter(key => key.startsWith('qc:'))
    .forEach(key => localStorage.removeItem(key));
};
