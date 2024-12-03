globalThis.ngJest = {
  skipNgcc: true,
  tsconfig: "tsconfig.spec.json", // this is the project root tsconfig
};

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: "jest-preset-angular",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setup-jest.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.html$",
    },
  },
  transform: {
    "^.+\\.ts$": "ts-jest", // Only transform .ts files
  },
  transformIgnorePatterns: [
    "/node_modules/(?!flat)/", // Exclude modules except 'flat' from transformation
  ],
  moduleDirectories: ["node_modules", "src"],
  fakeTimers: {
    enableGlobally: true,
  },
  coverageReporters: ["html"],
};
