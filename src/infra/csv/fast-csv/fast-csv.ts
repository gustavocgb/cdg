import * as fs from "fs";
import * as path from "path";
import * as fastCsv from "fast-csv";
import { csvData } from "../../../domain/rules/addressSource";

type AddressRow = {
    number: string;
    street: string;
    unit: string;
    city: string;
    district: string;
    region: string;
    postcode: string;
};

type FormattedAddressRow = {
    number: string;
    street: string;
    unit: string;
    city: string;
    district: string;
    region: string;
    postcode: string;
    full_address: string;
};

export class FastCsv {
    private formatAddress(row: AddressRow): FormattedAddressRow {
        const { number, street, unit, city, district, region, postcode } = row;
        let _street = street ? street + ", " : "";
        let _number = number ? number + ", " : "";
        let _unit = unit ? unit + ", " : "";
        let _district = district ? district + ", " : "";
        let _city = city ? city + ", " : "";
        let _region = region ? region + ", " : "";
        let _postcode = postcode ? postcode + ", " : "";
        let full_address: string = _street + _number + _unit + _district + _city + _region + _postcode;

        return { ...row, full_address: full_address.slice(0, -2) };
    }

    async readerAll(parms: csvData) {
        const { pathCsv, nameFile, delimiter } = parms;
        let results: FormattedAddressRow[] = [];

        const readFile = () => {
            return new Promise((resolve, reject) => {
                try {
                    fs.createReadStream(path.resolve(pathCsv, `./${nameFile}`)).pipe(
                        fastCsv
                            .parse<AddressRow, FormattedAddressRow>({ headers: true, delimiter: delimiter })
                            .on("error", (error) => {
                                console.error(error);
                                reject(error);
                            })
                            .on("data", (row: AddressRow) => {
                                const transformedRow = this.formatAddress(row);

                                results.push(transformedRow);
                            })
                            .on("end", () => {
                                resolve(results);
                            })
                    );
                } catch (error) {
                    console.error(error);
                    reject(error);
                }
            });
        };
        const file = await readFile();

        return file;
    }

    async readerOne(parms: csvData, skip: number) {
        const { pathCsv, nameFile, delimiter } = parms;
        let row: FormattedAddressRow;

        const readFile = () => {
            return new Promise((resolve, reject) => {
                try {
                    fs.createReadStream(path.resolve(pathCsv, `./${nameFile}`))
                        .pipe(fastCsv.parse({ headers: true, delimiter: delimiter, skipRows: skip, maxRows: 1 }))
                        .on("error", (error) => {
                            console.error(error);
                            reject(error);
                        })
                        .on("data", (rowData) => {
                            row = this.formatAddress(rowData);
                        })
                        .on("end", () => {
                            resolve(row);
                        });
                } catch (error) {
                    console.error(error);
                    reject(error);
                }
            });
        };
        const file = await readFile();

        return file;
    }
}
