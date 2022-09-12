import { Pm2Commands } from "../../../../src/infra/pm2/pm2Commands";

const sut = new Pm2Commands();

describe("Pm2", () => {
    it("Should restart application", () => {
        const response = sut.restart();

        expect(response).toBeTruthy();
    });
});
