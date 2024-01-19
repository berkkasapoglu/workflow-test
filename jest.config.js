const { defaults } = require("jest-config");

/** @type {import('jest').Config} */
const config = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, "mts", "cts"],
  global: {
    branches: 20,
    functions: 20,
    lines: 20,
    statements: -10,
  },
};

module.exports = config;
