/* global __API_HOST__  */
import request from 'superagent';

export default next => {
  return (requestOptions, ...args) => {
    if (!requestOptions.isAsset) {
      return next(requestOptions, ...args);
    }
    const ongoingRequest = request
      .post(`${__API_HOST__}/api/assets`)
      .type('multipart/form-data')
      .set({ ...requestOptions.headers })
      .field('visitId', requestOptions.id);

    requestOptions.data.forEach((file, index) =>
      ongoingRequest.attach('data', file, `file${index}`),
    );

    return ongoingRequest.end();
  };
};
