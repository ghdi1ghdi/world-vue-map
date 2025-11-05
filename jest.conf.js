const path = require("path");

module.exports = {
  rootDir: path.resolve(__dirname, "."),
  moduleFileExtensions: ["js", "json", "vue"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.js$": "babel-jest",
    ".*\\.(vue)$": [
      "@vue/vue3-jest",
      {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("amcharts:"),
        },
      },
    ],
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@vue)/)"
  ],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/test/setup.js"],
  modulePathIgnorePatterns: ["<rootDir>/node_modules/snapdragon"],
};
