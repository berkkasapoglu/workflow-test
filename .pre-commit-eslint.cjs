const { error } = require("highcharts");

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["eslint-plugin-no-inline-styles"],
  rules: {
    "no-console": ["error"],
    "no-debugger": "error",
    "no-duplicate-imports": "error",
    "no-use-before-define": "error",
    "default-case": "error",
    "no-inline-styles/no-inline-styles": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
  },
};
