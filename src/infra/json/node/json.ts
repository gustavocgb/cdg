import fs from "fs";
import path from "path";
import { jsonData } from "../../../domain/rules/addressSource";

export class Json {
    async readerAll(parms: jsonData) {
        const { pathJson, nameFile } = parms;

        let results: any[] = [];
        const readFile = () => {
            return new Promise((resolve, reject) => {
                try {
                    let rawdata = fs.readFileSync(path.resolve(pathJson, `./${nameFile}`));

                    let convertedData = String(rawdata).replace(/\n/gi, ",").slice(0, -1);

                    let jsonData = JSON.parse(`[${convertedData}]`);
                    for (let obj of jsonData) {
                        const { number, street, unit, city, district, region, postcode } = obj;
                        let _street = street ? street + ", " : "";
                        let _number = number ? number + ", " : "";
                        let _unit = unit ? unit + ", " : "";
                        let _district = district ? district + ", " : "";
                        let _city = city ? city + ", " : "";
                        let _region = region ? region + ", " : "";
                        let _postcode = postcode ? postcode + ", " : "";
                        let full_address: string = _street + _number + _unit + _district + _city + _region + _postcode;
                        obj["full_address"] = full_address.slice(0, -2);
                        results.push(obj);
                    }
                    resolve(results);
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
