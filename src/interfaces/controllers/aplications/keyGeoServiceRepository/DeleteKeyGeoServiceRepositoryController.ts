// import { ControlsRepository } from "../../../../application/rules/controlsRepository/controlsRepository";
import { SystemProcessControls } from "../../../../application/rules/systemProcessControls/systemProcessControls";
import { Controller } from "../../../gateway/controller/controller";
import { HttpRequest, HttpResponse } from "../../../gateway/http";
import {SqlRepository} from "../../../../application/rules/repositories/sqlRepository/sqlRepository";

export class DeleteKeyGeoServiceRepositoryController implements Controller {
    readonly keyGeoServiceRepository: SqlRepository;
    readonly systemProcessControls: SystemProcessControls

    constructor(keyGeoServiceRepository: SqlRepository, systemProcessControls: SystemProcessControls) {
        this.keyGeoServiceRepository = keyGeoServiceRepository
        this.systemProcessControls = systemProcessControls
    }

    async handle(req: HttpRequest): Promise<HttpResponse<any>> {
        const { params } = req;
        // console.log(params)
    //     try {
    //         const existApi = await this.controlsRepository.get({
    //             where: {
    //                 id: Number(params.id),
    //             },
    //         });
    //         if (!existApi) {
    //             return {
    //                 statusCode: 400,
    //                 body: {
    //                     message: "Api not exist",
    //                 },
    //             };
    //         }
    //
    //         const deleteApi = await this.controlsRepository.remove({
    //             id: Number(params.id),
    //         });
    //         this.systemProcessControls.restartApplication();
    //
    //         return {
    //             statusCode: 200,
    //             body: {
    //                 body: deleteApi,
    //             },
    //         };
    //     } catch (e) {
    //         console.error(e);
            return {
                statusCode: 500,
                body: {
                    message: "Internal server error",
                },
            };
    //     }
    }
}
