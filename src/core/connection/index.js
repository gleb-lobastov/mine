/* global __API_HOST__ __IS_DEV_MODE__ */
import createRequestApi from '@request-kit/react-redux';
import createRequestEngine from '@request-kit/engine-rest';
import endpointPlugin from 'modules/utilities/request-kit/plugins/endpoint';
import forkPlugin from 'modules/utilities/request-kit/plugins/fork';
import adaptersPlugin from 'modules/utilities/request-kit/plugins/adapters';
import loggerPlugin from 'modules/utilities/request-kit/plugins/logger';
import responseAsJsonPlugin from 'modules/utilities/request-kit/plugins/responseAsJson';
import {
  tripsAdapter,
  visitsAdapter,
  locationsAdapter,
  articlesAdapter,
} from './adapters';

const engine = createRequestEngine({
  presetOptions: {
    format: 'json',
    endpoint: ({ require, meta: { domain } }) =>
      `${__API_HOST__}/api/${require || domain}`,
  },
  plugins: [
    __IS_DEV_MODE__ && loggerPlugin,
    forkPlugin,
    endpointPlugin,
    adaptersPlugin({
      adapters: {
        // ...packages[].adapters
        trips: tripsAdapter,
        visits: visitsAdapter,
        locations: locationsAdapter,
        articles: articlesAdapter,
      },
    }),
    responseAsJsonPlugin,
  ].filter(Boolean),
});

const {
  middleware: requestMiddleware,
  provide,
  reducer: requestReducer,
} = createRequestApi({ engine });

export { requestMiddleware, provide, requestReducer };
