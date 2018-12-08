/* global __API_HOST__ __IS_DEV_MODE__ */
import createRequestApi from '@request-kit/react-redux';
import createRequestEngine from '@request-kit/engine-rest';
import {
  articlesAdapter,
  tripsAdapter,
  locationsAdapter,
  visitsAdapter,
} from './adapters';

const loggerPlugin = next => options => {
  const id = Math.round(Math.random() * 10000);
  console.log('request', id, 'options', options);
  const promise = next(options);
  promise.then(
    result => console.log('request', id, 'result', result),
    result => console.log('request', id, 'error', result),
  );
  return promise;
};

const endpointPlugin = next => ({ endpoint, ...restOptions }) =>
  next({
    endpoint: typeof endpoint === 'string' ? endpoint : endpoint(restOptions),
    ...restOptions,
  });

const adaptersPlugin = next => options =>
  next(options).then(data => {
    const {
      require,
      meta: { domain },
    } = options;

    const entity = require || domain;
    if (entity === 'articles') {
      return articlesAdapter(data.articles);
    }
    if (entity === 'locations') {
      return locationsAdapter(data.locations);
    }
    if (entity === 'trips') {
      return tripsAdapter(data.trips);
    }
    if (entity === 'visits') {
      return visitsAdapter(data.visits);
    }
    return data;
  });

const responseAsJsonPlugin = next => ({ format, ...restOptions }) =>
  next(restOptions).then(response => response.json());

const forkPlugin = next => ({ require, ...restOptions }) => {
  if (require && require.map) {
    return Promise.all(
      require.map(requireItem =>
        next({ ...restOptions, require: requireItem }),
      ),
    );
  }
  return next({ require, ...restOptions });
};

const {
  middleware: requestMiddleware,
  provide,
  reducer: requestReducer,
} = createRequestApi({
  engine: createRequestEngine({
    presetOptions: {
      format: 'json',
      endpoint: ({ require, meta: { domain } }) =>
        `${__API_HOST__}/api/${require || domain}`,
    },
    plugins: [
      __IS_DEV_MODE__ && loggerPlugin,
      forkPlugin,
      endpointPlugin,
      adaptersPlugin,
      responseAsJsonPlugin,
    ].filter(Boolean),
  }),
});

export { requestMiddleware, provide, requestReducer };
