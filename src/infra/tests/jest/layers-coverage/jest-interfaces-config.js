const config = require("../jest.config");

config.rootDir = "../../../../../";
config.coveragePathIgnorePatterns = ["/node_modules/", "/src/domain/", "/src/application/", "/src/infra/"];
config.roots = ["<rootDir>/tests/unit/interfaces", "<rootDir>/src/interfaces"];

module.exports = config;
