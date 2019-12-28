import '@babel/polyfill';
import App from 'core/App';
import { configureNavigation } from 'configuration';
import definePackages from './packages/definePackages';

const packages = definePackages();
const app = App.create(
  {
    packages,
    navigation: configureNavigation(packages),
  },
  module.hot && module.hot.data && module.hot.data.state,
);
app.render();

if (module.hot) {
  module.hot.accept();
  module.hot.addDisposeHandler(data => {
    // eslint-disable-next-line
    data.state = app.getState();
  });
}
