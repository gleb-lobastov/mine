import createRoute from 'modules/route';

export const blogRoute = createRoute('/liter/bolg');
export const booksRoute = createRoute('/liter/books');
export const chaldiniRoute = createRoute('/liter/chaldini');
export const blackSwanRoute = createRoute('/liter/blackSwan');
export const codeRoute = createRoute('/code');
export const error404 = createRoute('/404');
export const literatureRoute = createRoute('/liter');
export const root = createRoute('/');
export const travelsRoute = createRoute(
  '/travels/:reportType(countries|cities|trips)?',
);
