import {MapperEntity} from "../../interface/mapperEntity"
import {KeyModel} from "../../../models/index"
import {KeyGeoServiceEntity} from "../../../../domain/rules/keyGeoService";

export let mapperKeyGeoService: MapperEntity = {
    modelToEntity(data: KeyModel) {
        let entity: KeyGeoServiceEntity = {
            id: data.key_id,
            geoServiceId: data.geoapi_id,
            name: data.name,
            url: data.url,
            isDate: data.isDate,
            key: data.value,
            date: data.date,
            isError: data.isError,
            referenceAddress: data.reference_address,
            requests: data.request,
            isRequests: data.isRequests,
            password: data.password,
            isInitialZeroHours: data.isInitialZeroHours,
            isDay: data.isDay,
            email: data.email,
            currentAddress: data.current_address,
            isGeocoding: data.isGeocoding,
            isAddress: data.isAddress,
            initialDate: data.initial_date,
            maxRequestPerSecond: data.maxRequestPerSecond,
            maxRequestPerDay: data.maxRequestPerDay,
            maxRequestPerMonth: data.maxRequestPerMonth,
            isExcluded: data.isExcluded,
            isActivated: data.isActivated
        }
        return entity
    }
}
