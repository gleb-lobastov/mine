const path = require('path');

module.exports = {
  extends: ['airbnb', 'prettier', 'prettier/react'],
  env: {
    es6: true,
    browser: true,
    jest: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'jsx-a11y', 'import'],
  rules: {
    // only allowed in reducers
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['memo', 'accumulator'],
      },
    ],
    'no-use-before-define': ['error', { functions: false }],
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        jsx: 'never',
      },
    ],
    // use app level package.json, not component level
    'import/no-extraneous-dependencies': [
      'error',
      {
        packageDir: './',
      },
    ],
    'react/sort-comp': [
      'error',
      {
        order: [
          'static-methods',
          'lifecycle',
          'everything-else',
          '/^handle.+$/',
          'rendering',
        ],
        groups: {
          rendering: ['/^render.+$/', 'render'],
        },
      },
    ],
    'react/jsx-boolean-value': ['error', 'always'],
    'react/prop-types': 0,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: path.resolve(__dirname, 'webpack.config.js'),
      },
    },
  },
};
