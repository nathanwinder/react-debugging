module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/example/", "lib"],
  coveragePathIgnorePatterns: [
    "/example/",
    "/test/steps.tsx",
    "/test/jsdom-setup.ts"
  ],
  setupFiles: ["./test/jsdom-setup.ts"],
  snapshotSerializers: ["enzyme-to-json/serializer"]
};
