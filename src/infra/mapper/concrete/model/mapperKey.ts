import {MapperModel} from "../../interface/mapperModel"
import {KeyModel} from "../../../models/key"
import {KeyGeoServiceEntity} from "../../../../domain/rules/keyGeoService";

export let mapperKey: MapperModel = {
    entityToModel(data: KeyGeoServiceEntity) {
        let objModel: any = {}
        let model: KeyModel = {
            key_id: data.id,
            name: data.name,
            password: data.password,
            value: data.key,
            date: data.date,
            isError: data.isError,
            email: data.email,
            isDay: data.isDay,
            url: data.url,
            request: data.requests,
            isRequests: data.isRequests,
            isAddress: data.isAddress,
            isGeocoding: data.isGeocoding,
            isInitialZeroHours: data.isInitialZeroHours,
            geoapi_id: data.geoServiceId,
            current_address: data.currentAddress,
            isDate: data.isDate,
            reference_address: data.referenceAddress,
            initial_date: data.initialDate,
            isExcluded: data.isExcluded,
            maxRequestPerMonth: data.maxRequestPerMonth,
            maxRequestPerDay: data.maxRequestPerDay,
            maxRequestPerSecond: data.maxRequestPerSecond,
            isActivated: data.isActivated
        }
        // filter obj, without the null
        let arrayModel = Object.entries(model).filter(([key, value]) => value !== undefined)
        for (let item of arrayModel) {
            objModel[item[0]] = item[1]
        }
        return objModel
    }
}
