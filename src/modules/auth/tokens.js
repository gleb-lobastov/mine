import jwtDecode from 'jwt-decode';

const storage =
  typeof localStorage !== 'undefined'
    ? localStorage
    : (() => {
        const storageObject = {};
        return {
          getItem: key => storageObject[key],
          setItem: (key, value) => {
            storageObject[key] = value;
          },
          removeItem: key => {
            delete storageObject[key];
          },
        };
      })();

const listeners = [];
export const subscribe = listener => listeners.push(listener);
export const unsubscribe = listenerToRemove =>
  listeners.filter(listener => listener !== listenerToRemove);

export const getAccessToken = () => storage.getItem('_at') || '';

export const setAccessToken = accessToken => {
  storage.setItem('_at', accessToken);
  listeners.forEach(listener => listener(true));
};

export const resetAccessToken = () => {
  storage.removeItem('_at');
  listeners.forEach(listener => listener(false));
};

export const safeDecode = token => {
  if (!token) {
    return null;
  }
  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
};

export const deriveTokenStatus = token => {
  const claims = safeDecode(token);
  const { exp: expirationTime } = claims || {};
  return {
    // todo: IMPORTANT, need to request server time, and compare with it
    // otherwise comparison could give false results if user has
    // shifted system time
    isExpired: !expirationTime || new Date().getTime() > expirationTime * 1000,
    isValid: Boolean(claims),
  };
};

export const checkIsAuthenticated = () => {
  const { isValid, isExpired } = deriveTokenStatus(getAccessToken());
  return isValid && !isExpired;
};
