import { getAccessToken } from './tokens';

export { default as middleware } from './middleware';
export const checkIsAuthenticated = () => Boolean(getAccessToken());
