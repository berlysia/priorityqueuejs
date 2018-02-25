/* eslint-disable import/no-commonjs */
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    "jest/globals": true,
  },
  "settings": {
    "flowtype": {
      "onlyFilesWithFlowAnnotation": true
    }
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  plugins: [
    "eslint-comments",
    "jest"
  ],
  extends: [
    '@berlysia/eslint-config/base-prettier',
    '@berlysia/eslint-config/flow-prettier',
  ],
  rules: {
    'one-var': ['error', 'never'],
    "prefer-destructuring": ["error", {"object": true, "array": false}],
    'flowtype/no-types-missing-file-annotation': 'off',
    'flowtype/require-variable-type': 'off',
    'flowtype/require-parameter-type': ['error', { excludeArrowFunctions: 'expressionsOnly' }],
    'eslint-comments/disable-enable-pair': 'error',
    'eslint-comments/no-aggregating-enable': 'error',
    'eslint-comments/no-duplicate-disable': 'error',
    'eslint-comments/no-unlimited-disable': 'error',
    'eslint-comments/no-unused-disable': 'error',
    'eslint-comments/no-unused-enable': 'error',
  }
};
