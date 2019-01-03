/* global window */
/* eslint-disable import/prefer-default-export */

export const debugStore = store => {
  // eslint-disable-next-line no-underscore-dangle
  window.__store = store;
};
