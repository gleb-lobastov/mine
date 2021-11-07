/* global __API_HOST__  */
import request from 'superagent';

export default next => {
  return (requestOptions, ...args) => {
    if (!requestOptions.isAsset) {
      return next(requestOptions, ...args);
    }
    const ongoingRequest = request
      .post(`${__API_HOST__}/api/assets`)
      // Browser will set type automatically and add boundary
      // to the multipart request, that is required by the server
      // .type('multipart/form-data')
      .set({ ...requestOptions.headers })
      .field('visitId', requestOptions.id)
      .field('meta', JSON.stringify(requestOptions.meta));

    requestOptions.data.forEach((file, index) =>
      ongoingRequest.attach('data', file, `file${index}`),
    );

    return ongoingRequest.end();
  };
};
