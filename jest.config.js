module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/example/"],
  setupFiles: ["./src/jsdom-setup.ts"],
  snapshotSerializers: ["enzyme-to-json/serializer"]
};
