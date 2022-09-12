import { SystemProcessControls } from "../../../../application/rules/systemProcessControls/systemProcessControls";
import { Controller } from "../../../gateway/controller/controller";
import { HttpRequest, HttpResponse } from "../../../gateway/http";
import {SqlRepository, update} from "../../../../application/rules/repositories/sqlRepository/sqlRepository";
import {KeyGeoServiceEntity} from "../../../../domain/rules/keyGeoService";

export class UpdateKeyGeoServiceRepositoryController implements Controller {
    readonly keyGeoServiceRepository: SqlRepository;
    readonly systemProcessControls: SystemProcessControls

    constructor(keyGeoServiceRepository: SqlRepository, systemProcessControls: SystemProcessControls) {
        this.keyGeoServiceRepository = keyGeoServiceRepository
        this.systemProcessControls = systemProcessControls
    }

    async handle(req: HttpRequest): Promise<HttpResponse<any>> {
        const { body } = req;

        try {
            let data: update<KeyGeoServiceEntity> = {
                where: {id: body.where.id},
                set: body.set
            }
            let updateKey = await this.keyGeoServiceRepository.updateById(data)
            if (!updateKey) {
                return {
                    statusCode: 400,
                    body: {
                        message: "Invalid request",
                    },
                };
            }
            this.systemProcessControls.restartApplication()
            console.log("Chave da api "+updateKey.geoServiceId+" atualizada com sucesso!")

            return {
                statusCode: 200,
                body: {
                    body: updateKey,
                },
            };
        } catch (e) {
            console.error(e);
            return {
                statusCode: 500,
                body: {
                    error: "Internal server error",
                },
            };
        }
    }
}
