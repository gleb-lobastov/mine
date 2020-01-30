/* global __API_HOST__ __IS_DEV_MODE__ */
import createRequestEngine from '@request-kit/engine-rest';
import { middleware as authPlugin } from 'modules/auth';
import endpointPlugin from 'modules/utilities/request-kit/plugins/endpoint';
import adapterPlugin from 'modules/utilities/request-kit/plugins/adapter';
import hardCachePlugin from 'modules/utilities/request-kit/plugins/hardCache';
import responseAsJsonPlugin from 'modules/utilities/request-kit/plugins/responseAsJson';
import modelsDefinitions from '../models';
import createRequestApi from './request';

const engine = createRequestEngine({
  presetOptions: {
    format: 'json',
    endpoint: ({ domain }) => `${__API_HOST__}/api/${domain}`,
  },
  plugins: [
    authPlugin,
    adapterPlugin,
    endpointPlugin,
    // __IS_DEV_MODE__ && hardCachePlugin,
    // __IS_DEV_MODE__ && loggerPlugin,
    responseAsJsonPlugin,
  ].filter(Boolean),
});

const {
  reduxMiddleware: requestMiddleware,
  provide,
  reducer: requestReducer,
  selectors,
} = createRequestApi({
  modelsConfig: { modelsDefinitions },
  requestHandler: (...args) => engine.request(...args),
});

const {
  selectDict,
  selectItem,
  selectList,
  selectMissingIds,
  selectError,
  selectIsError,
  selectIsPending,
  selectIsReady,
  selectIsUnsent,
  selectIsValid,
  selectLastError,
  selectPlaceholder,
  selectReadyState,
  selectResult,
  selectProvisionStatus,
} = selectors;

export {
  requestMiddleware,
  provide,
  requestReducer,
  selectProvisionStatus,
  selectError,
  selectIsError,
  selectIsPending,
  selectIsReady,
  selectIsUnsent,
  selectIsValid,
  selectLastError,
  selectPlaceholder,
  selectReadyState,
  selectResult,
  selectDict,
  selectItem,
  selectList,
  selectMissingIds,
};
