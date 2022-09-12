import { FastCsv } from "../../../../../src/infra/csv/fast-csv/fast-csv";
import { csvData } from "../../../../../src/domain/rules/addressSource";
import { responseAll, responseOne } from "./faker-data/csv-response";
import path from "path";

const sut = new FastCsv();

describe("Fast CSV", () => {
    it("Should parse one row of a csv file", async () => {
        const pathCsv = path.join(__dirname, "./faker-data");
        const nameFile = "address.csv";
        const delimiter = ";";
        const parms: csvData = { pathCsv, nameFile, delimiter };

        const csv = await sut.readerOne(parms, 1);

        expect(csv).toBeTruthy();
        expect(csv).toEqual(responseOne);
    });

    it("Should parse all lines of a csv file", async () => {
        const pathCsv = path.join(__dirname, "./faker-data");
        const nameFile = "address.csv";
        const delimiter = ";";
        const parms: csvData = { pathCsv, nameFile, delimiter };

        const csv = await sut.readerAll(parms);

        expect(csv).toEqual(responseAll);
    });

});
