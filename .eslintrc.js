/* eslint-disable import/no-commonjs */
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  extends: [
    '@berlysia/eslint-config/base-prettier',
    '@berlysia/eslint-config/flow-prettier',
  ],
  rules: {
    'one-var': ['error', 'never'],
    "prefer-destructuring": ["error", {"object": true, "array": false}],
    'flowtype/no-types-missing-file-annotation': 'off',
    'flowtype/require-variable-type': 'off',
  }
};
