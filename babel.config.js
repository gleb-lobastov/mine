/* eslint-disable func-names */
module.exports = function(api) {
  return {
    presets: [
      [
        '@babel/env',
        {
          modules: api.env('test') ? 'commonjs' : false,
          useBuiltIns: 'usage',
          corejs: { version: '3.18.0', proposals: true },
        },
      ],
      '@babel/react',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-export-default-from',
    ],
    env: {
      test: {
        plugins: [['@babel/plugin-transform-runtime', { regenerator: true }]],
      },
    },
  };
};
