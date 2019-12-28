import LoginPage from './pages/LoginPage';

export default ({ mountPath }) => ({
  id: '9f7b3838-779c-452b-9da0-67db3fd4ece4',
  packageName: 'auth',
  routing: {
    routes: [
      {
        routeName: 'entry',
        path: mountPath,
        Component: LoginPage,
      },
    ],
    routesDict: {
      entry: {
        routeName: 'entry',
        path: mountPath,
        Component: LoginPage,
      },
    },
  },
});
