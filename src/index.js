import '@babel/polyfill';
import App from 'core/App';
import configuration from 'configuration';
import main from 'main';
import travel from 'travel';
import literature from 'literature';
import code from 'code';
import auth from 'auth';

const isCodeMode = /^\/mine\/_code/.test(window.location.pathname);
const packages = isCodeMode
  ? [code({ mountPath: '/_code' }), auth({ mountPath: '/hello' })]
  : [
      main({ mountPath: '/' }),
      travel({ mountPath: '/travel' }),
      literature({ mountPath: '/liter' }),
      code({ mountPath: '/code' }),
      auth({ mountPath: '/hello' }),
    ];

const app = App.create(
  {
    ...configuration,
    packages,
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
