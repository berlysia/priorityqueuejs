import berlysia from "@berlysia/eslint-config";

export default berlysia(
  {
    typescript: true,
    testLibrary: "vitest",
  },
  {
    files: ["src/testing/**/*.ts", "src/performance/**/*.ts"],
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "max-depth": "off",
      "unicorn/prefer-module": "off",
      "unicorn/text-encoding-identifier-case": "off",
      "unicorn/consistent-function-scoping": "off",
    },
  },
  {
    files: ["src/**/*.ts"],
    rules: {
      "jsdoc/require-template": "off",
      "unicorn/prefer-spread": "off",
      "unicorn/no-new-array": "off",
      "no-useless-assignment": "off",
    },
  },
  {
    files: ["src/**/*.test.ts"],
    rules: {
      "test/require-hook": "off",
    },
  }
);
