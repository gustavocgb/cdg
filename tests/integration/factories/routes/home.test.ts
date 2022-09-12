import request from "supertest";
import { app } from "../../../../src/infra/framework/express/app";

describe("Home Page", () => {
    it("Should return SGM HomePage", async () => {
        const response = await request(app).get("/")
				
				expect(response.status).toBe(200);
    });
});
