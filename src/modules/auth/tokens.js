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

export const deriveTokenStatus = (token = getAccessToken()) => {
  const claims = safeDecode(token);
  const { exp: expirationTime, alias: userAlias, id: userId } = claims || {};
  return {
    // todo: IMPORTANT, need to request server time, and compare with it
    // otherwise comparison could give false results if user has
    // shifted system time
    userId,
    userAlias,
    isExpired: !expirationTime || new Date().getTime() > expirationTime * 1000,
    isValid: Boolean(claims),
  };
};

export const checkIsAuthenticated = (tokenStatus = deriveTokenStatus()) => {
  const { isValid, isExpired } = tokenStatus;
  return isValid && !isExpired;
};

export const setAccessToken = accessToken => {
  storage.setItem('_at', accessToken);
  listeners.forEach(listener => {
    const tokenStatus = deriveTokenStatus(accessToken);
    const { userAlias } = tokenStatus;
    return listener({
      isAuthenticated: checkIsAuthenticated(tokenStatus),
      userAlias,
    });
  });
};

export const resetAccessToken = () => {
  storage.removeItem('_at');
  listeners.forEach(listener =>
    listener({ isAuthenticated: false, userAlias: null }),
  );
};
