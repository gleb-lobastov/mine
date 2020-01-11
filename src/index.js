import '@babel/polyfill';
import App from 'core/App';
import definePackages from 'packages/definePackages';

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
