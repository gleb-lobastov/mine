import '@babel/polyfill';
import App from 'core/App';
import configuration from 'configuration';
import main from 'main';
import travel from 'travel';
import literature from 'literature';
import code from 'code';

// if mode == code: packages only code

App.create({
  ...configuration,
  packages: [
    main({ mountPath: '/' }),
    travel({ mountPath: '/travel' }),
    literature({ mountPath: '/liter' }),
    code ({ mountPath: '/code' }),
  ],
}).render();
