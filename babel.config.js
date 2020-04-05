/* eslint-disable func-names */
module.exports = function(api) {
  api.cache(false);
  return {
    presets: ['@babel/env', '@babel/react'],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-optional-chaining',
    ],
    env: {
      test: {
        plugins: [['@babel/plugin-transform-runtime', { regenerator: true }]],
      },
    },
  };
};
