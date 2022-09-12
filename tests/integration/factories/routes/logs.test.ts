import request from "supertest";
import { app } from "../../../../src/infra/framework/express/app";

jest.spyOn(console, "log").mockImplementation(() => {});
jest.spyOn(console, "error").mockImplementation(() => {});

describe("Logs", () => {
    describe("Standard Out logs", () => {
        it("Should return logs", async () => {
            await request(app).get("/log/logs").expect(200);
        });
    });

    describe("Error logs", () => {
        it("Should return logs", async () => {
            await request(app).get("/log/error").expect(200);
        });
    });
});
