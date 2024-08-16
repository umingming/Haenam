module.exports = {
    preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
    moduleFileExtensions: ["js", "json", "vue"],
    transform: {
        "^.+\\.vue$": "@vue/vue3-jest",
        "^.+\\.js$": "babel-jest",
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[jt]s?(x)",
    ],
    testPathIgnorePatterns: ["/node_modules/"],
    transformIgnorePatterns: ["/node_modules/(?!(axios))"],
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.js", "src/**/*.vue"],
};
