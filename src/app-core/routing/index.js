import * as routes from './routes';
import routingConfig from './config';
import adaptToRoutesList from './tools/adaptToRoutesList';

const routesList = adaptToRoutesList(routingConfig);

export { routes, routingConfig, routesList };
