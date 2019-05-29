/* global __API_HOST__ __IS_DEV_MODE__ */
import createRequestEngine from '@request-kit/engine-rest';
import { middleware as authPlugin } from 'modules/auth';
import endpointPlugin from 'modules/utilities/request-kit/plugins/endpoint';
import adapterPlugin from 'modules/utilities/request-kit/plugins/adapter';
import loggerPlugin from 'modules/utilities/request-kit/plugins/logger';
import responseAsJsonPlugin from 'modules/utilities/request-kit/plugins/responseAsJson';
import { travelModels } from 'travel';
import { literatureModels } from 'literature';
import createRequestApi from './request';

const engine = createRequestEngine({
  presetOptions: {
    format: 'json',
    endpoint: ({ meta: { domain } }) => `${__API_HOST__}/api/${domain}`,
  },
  plugins: [
    authPlugin,
    endpointPlugin,
    adapterPlugin,
    __IS_DEV_MODE__ && loggerPlugin,
    responseAsJsonPlugin,
  ].filter(Boolean),
});

const {
  reduxMiddleware: requestMiddleware,
  provide,
  reducer: requestReducer,
  selectors: { selectDict, selectItem, selectList, selectMissingIds },
} = createRequestApi({
  modelsConfig: {
    modelsDefinitions: [
      literatureModels.articles.model,
      travelModels.locations.model,
      travelModels.rides.model,
      travelModels.trips.model,
      travelModels.visits.model,
    ],
  },
  requestHandler: (...args) => engine.request(...args),
});

export {
  requestMiddleware,
  provide,
  requestReducer,
  selectDict,
  selectItem,
  selectList,
  selectMissingIds,
};
