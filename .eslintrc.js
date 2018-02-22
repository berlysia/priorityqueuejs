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
  extends: ['@berlysia/eslint-config/prettier'],
  rules: {
    'flowtype/no-types-missing-file-annotation': 'off'
  },
};
