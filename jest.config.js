module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/example/"],
  coveragePathIgnorePatterns: ["/example/", "jsdom-setup.ts"],
  setupFiles: ["./src/jsdom-setup.ts"],
  snapshotSerializers: ["enzyme-to-json/serializer"]
};
