import compose from 'lodash/fp/compose';
import { middleware as authPlugin } from 'modules/auth';
import endpointPlugin from 'modules/utilities/request-kit/plugins/endpoint';
import adapterPlugin from 'modules/utilities/request-kit/plugins/adapter';
import assetsPlugin from 'modules/utilities/request-kit/plugins/assets';
import hardCachePlugin from 'modules/utilities/request-kit/plugins/hardCache';
import responseAsJsonPlugin from 'modules/utilities/request-kit/plugins/responseAsJson';

function requestHandler({ endpoint, ...requestOptions }) {
  return fetch(endpoint, { format: 'json', ...requestOptions });
}

export default compose(
  authPlugin,
  adapterPlugin,
  endpointPlugin,
  assetsPlugin, // required to be placed before responseAsJsonPlugin, because do request by itself
  responseAsJsonPlugin,
)(requestHandler);
