import { Json } from "../../../../src/infra/json/node/json";
import { responseAll } from "./faker-data/json-response";
import { jsonData } from "../../../../src/domain/rules/addressSource";
import path from "path";

const sut = new Json();

describe("JSON parser", () => {
    it("Should parse all lines of a json file", async () => {
        const pathJson = path.join(__dirname, "./faker-data");
        const nameFile = "address.json";
        const parms: jsonData = { pathJson, nameFile };

        const json = await sut.readerAll(parms);

        expect(json).toEqual(responseAll);
    });

    it("Should throw if parse fail", async () => {
        const pathJson = path.join(__dirname, "./faker-data");
        const nameFile = "address-wrong.json";
        const parms: jsonData = { pathJson, nameFile };
        jest.spyOn(console, "error").mockImplementation(() => {});

        const json = sut.readerAll(parms);

        await expect(json).rejects.toThrow();
    });
});
