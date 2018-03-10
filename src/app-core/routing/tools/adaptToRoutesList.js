import { get } from 'lodash';

export default routesConfig => get(routesConfig, 'routes', []).map(
  ({ route, ...routeProps }) => ({ to: route.toPath(), ...routeProps }),
);
