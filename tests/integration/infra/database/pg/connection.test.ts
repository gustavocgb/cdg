import { dataBase } from "../../../../../src/infra/db/techs/postegreSql/config/database";

describe("Pool package database connection", () => {
    it("should be able to connect to database", async () => {
        const client = await dataBase.connect();
        await dataBase.disconnect(client);

        expect(client).toBeDefined();
    });
});
