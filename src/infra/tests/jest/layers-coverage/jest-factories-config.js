const config = require("../jest.config");

config.rootDir = "../../../../../";
config.coveragePathIgnorePatterns = ["/node_modules/", "/src/domain/", "/src/application/", "/src/interfaces/", "/src/infra/"];
config.roots = ["<rootDir>/tests/integration/factories", "<rootDir>/src/main"];

module.exports = config;
