import { SystemProcessControls } from "../../../../application/rules/systemProcessControls/systemProcessControls";
import { Controller } from "../../../gateway/controller/controller";
import { HttpResponse, HttpRequest } from "../../../gateway/http";
import {get, insert, SqlRepository} from "../../../../application/rules/repositories/sqlRepository/sqlRepository";
import {KeyGeoServiceEntity} from "../../../../domain/rules/keyGeoService";
import {AddressEntity} from "../../../../domain/rules";

export class PostKeyGeoServiceRepositoryController implements Controller {
    readonly keyGeoServiceRepository: SqlRepository;
    readonly addressRepository: SqlRepository;
    readonly systemProcessControls: SystemProcessControls

    constructor(keyGeoServiceRepository: SqlRepository, addressRepository: SqlRepository, systemProcessControls: SystemProcessControls) {
        this.keyGeoServiceRepository = keyGeoServiceRepository
        this.addressRepository = addressRepository
        this.systemProcessControls = systemProcessControls
    }

    async handle(req: HttpRequest): Promise<HttpResponse<any>> {
        const { body } = req;

        if (!body.key || !body.referenceAddress) {
            return {
                statusCode: 400,
                body: {
                    error: "Invalid request",
                },
            }
        }

        try {
            let dataGetKey: get<KeyGeoServiceEntity> = {where: {geoServiceId: body.geoServiceId, key: body.key}}
            let dataGetAddr: get<AddressEntity> = {where: {id: body.referenceAddress}}
            const existKey = await this.keyGeoServiceRepository.getCount(dataGetKey)
            const existAddr = await this.addressRepository.getCount(dataGetAddr)
            let address = await this.addressRepository.get({take: 1})

            if (existKey || !existAddr) {
                return {
                    statusCode: 400,
                    body: {
                        error: existKey?"Key already exist":"Id address not exist"
                    },
                }
            }

            let dataSave: insert<KeyGeoServiceEntity> = {
                data: {
                    key: body.key,
                    geoServiceId: body.geoServiceId,
                    url: body.url,
                    isExcluded: false,
                    email: body.email,
                    isActivated: body.isActivated,
                    isDay: true,
                    currentAddress: address.id,
                    name: body.name,
                    isInitialZeroHours: body.isInitialZeroHours,
                    requests: 0,
                    referenceAddress: body.referenceAddress,
                    maxRequestPerDay: body.maxRequestPerDay,
                    maxRequestPerMonth: body.maxRequestPerMonth,
                    maxRequestPerSecond: 1
                }
            }
            const createApi = await this.keyGeoServiceRepository.save(dataSave);
            this.systemProcessControls.restartApplication();
            console.log("Chave da api "+body.geoServiceId+" cadastrada com sucesso!")

            return {
                statusCode: 200,
                body: {
                    body: createApi,
                },
            }
        } catch (e) {
            console.error(e);
            return {
                statusCode: 500,
                body: {
                    error: "Internal server error",
                },
            }
        }
    }
}
