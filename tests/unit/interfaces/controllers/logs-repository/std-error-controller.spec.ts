import path from "path";
import { SystemProcessControls } from "../../../../../src/application/rules/systemProcessControls/systemProcessControls";
import { LogErrosRepositoryController } from "../../../../../src/interfaces/controllers/aplications/logsRepository";

const systemProccessControlsStub: SystemProcessControls = {
    restartApplication: () => {
        return new Promise((resolve) => resolve("SGM"));
    },
    removeLogs: () => {
        return new Promise((resolve) => resolve(true));
    },
    readLogs: function (type: string, date: string): Promise<any> {
        return new Promise((resolve) => resolve(true));
    },
};

const sut = new LogErrosRepositoryController(systemProccessControlsStub);
const mockedPath = path.join(path.resolve()) + "/tests/unit/interfaces/controllers/logs-repository/faker-data";
jest.useFakeTimers().setSystemTime(new Date("2000-01-01"));

describe("Error Logs", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("Should return logs", async () => {
        jest.spyOn(path, "resolve").mockReturnValue(mockedPath);

        const resp = await sut.handle(undefined);

        expect(resp).toBe(true);
    });

    it("Should return error 404 if file not fount", async () => {
        jest.spyOn(console, "error").mockImplementation(() => {});
        jest.spyOn(systemProccessControlsStub, "readLogs").mockReturnValueOnce(new Promise((resolve) => resolve("404 - Not Found.")));

        const resp = await sut.handle(undefined);

        expect(resp).toBe("404 - Not Found.");
    });
});
