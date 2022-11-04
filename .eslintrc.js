module.exports = {
  extends: ["@berlysia/eslint-config/auto"],
  rules: {
    "@typescript-eslint/brace-style": "off",
  },
  overrides: [
    {
      files: ["src/testing/**/*.ts", "src/performance/**/*.ts"],
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off",
      },
    },
  ],
};
