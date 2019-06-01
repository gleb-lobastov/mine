import '@babel/polyfill';
import App from 'core/App';
import configuration from 'configuration';
import main from 'main';
import travel from 'travel';
import literature from 'literature';
import code from 'code';
import auth from 'auth';

// if mode == code: packages only code

const app = App.create(
  {
    ...configuration,
    packages: [
      main({ mountPath: '/' }),
      travel({ mountPath: '/travel' }),
      literature({ mountPath: '/liter' }),
      code({ mountPath: '/code' }),
      auth({ mountPath: '/hello' }),
    ],
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
