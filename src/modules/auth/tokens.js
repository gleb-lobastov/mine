export const getAccessToken = () => localStorage && localStorage.getItem('_at') || '';
export const setAccessToken = accessToken =>
  localStorage && localStorage.setItem('_at', accessToken);
