/* eslint-disable import/no-commonjs */
module.exports = {
  extends: ["@berlysia/eslint-config/auto"],
  overrides: [
    {
      files: ["src/testing/**/*.ts", "src/performance/**/*.ts"],
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off",
      },
    },
  ],
};
