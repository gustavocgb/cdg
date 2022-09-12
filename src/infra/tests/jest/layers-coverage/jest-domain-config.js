const config = require("../jest.config");

config.coverageDirectory = "coverage",
config.rootDir = "../../../../../",
config.coveragePathIgnorePatterns = ["/node_modules/"];
config.roots = ["<rootDir>/tests/unit/domain", "<rootDir>/src/domain"];

module.exports = config;
