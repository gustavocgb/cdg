import request from 'supertest';
import { app } from "../../../../src/infra/framework/express/app";

describe("Controls routes", () => {
		describe("Get Controls", () => {
				it("Should return controls", async () => {
						await request(app).get("/controls").expect(200);
				});
		});
})