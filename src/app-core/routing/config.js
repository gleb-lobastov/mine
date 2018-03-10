import ArticlesController from 'blog/ArticlesController';
import * as routes from './routes';

export default {
  routes: [{
    route: routes.root,
    component: ArticlesController,
  }],
};
