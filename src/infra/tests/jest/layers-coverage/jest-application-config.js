const config = require("../jest.config");

config.rootDir = "../../../../../";
config.coveragePathIgnorePatterns = ["/node_modules/", "/src/domain/"];
config.roots = ["<rootDir>/tests/unit/application", "<rootDir>/src/application"];

module.exports = config;
