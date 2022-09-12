const config = require("../jest.config");

config.rootDir = "../../../../../";
config.coveragePathIgnorePatterns = ["/node_modules/", "/src/domain/", "/src/application/", "/src/interfaces/"];
config.roots = ["<rootDir>/tests/unit/infra", "<rootDir>/tests/integration/infra", "<rootDir>/src/infra"];

module.exports = config;
