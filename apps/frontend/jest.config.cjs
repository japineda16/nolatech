const { createDefaultPreset } = require("ts-jest");
    const { pathsToModuleNameMapper } = require('ts-jest');
    const { compilerOptions } = require('./tsconfig.json'); // Adjust path if needed

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    ...tsJestTransformCfg,
  },
  preset: 'ts-jest',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
};