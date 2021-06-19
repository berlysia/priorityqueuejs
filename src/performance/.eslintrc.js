module.exports = {
  rules: {
    "import/no-unresolved": ["error", { ignore: ["perf_hooks"] }],
    "@typescript-eslint/no-require-imports": "off",
    "import/no-namespace": "off",
    "max-depth": "off",
  },
};
