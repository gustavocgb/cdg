import { Controller } from "../../../gateway/controller/controller";
import {get, SqlRepository, update} from "../../../../application/rules/repositories/sqlRepository/sqlRepository";
import { HttpRequest, HttpResponse } from "../../../gateway/http";
import {KeyGeoServiceEntity} from "../../../../domain/rules/keyGeoService";

export class GetKeyGeoServiceRepositoryController implements Controller {
    readonly keyGeoServiceRepository: SqlRepository;

    constructor(keyGeoServiceRepository: SqlRepository) {
        this.keyGeoServiceRepository = keyGeoServiceRepository;
    }

    async handle(req: HttpRequest): Promise<HttpResponse<any>> {
        const { query } = req;

        try {
            let data: get<KeyGeoServiceEntity>
            if (query && query.api){
                data = {
                    where: {
                        geoServiceId: query.api,
                        isExcluded: false
                    }
                }
            } else {
                data = {
                    where: {
                        isExcluded: false
                    }
                }
            }
            const geoApis = await this.keyGeoServiceRepository.getAll(data)

            return {
                statusCode: 200,
                body: {
                    body: geoApis,
                },
            };
        } catch (e) {
            console.log(e);
            return {
                statusCode: 500,
                body: {
                    error: "server error",
                },
            };
        }
    }
}
