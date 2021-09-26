/* globals __IS_DEV_MODE__ */
import 'core-js/features/set';
import App from 'core/App';
import definePackages from 'packages/definePackages';
import { registerDebugTools } from 'modules/utilities/debug';

if (__IS_DEV_MODE__) {
  registerDebugTools();
}

const app = App.create(
  { packages: definePackages() },
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
