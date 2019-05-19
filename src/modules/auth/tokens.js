export const getAccessToken = () => localStorage && localStorage.getItem('at');
export const setAccessToken = accessToken =>
  localStorage && localStorage.setItem('at', accessToken);
