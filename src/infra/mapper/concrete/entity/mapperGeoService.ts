import {MapperEntity} from "../../interface/mapperEntity"
import {GeoapiModel} from "../../../models/index"
import {GeoServiceEntity} from "../../../../domain/rules/geoService"

export let mapperGeoService: MapperEntity = {
    modelToEntity(data: GeoapiModel) {
        let entity: GeoServiceEntity = {
            id: data.geoapi_id,
            name: data.geoapi_id,
            maxRequestPerSecond: data.maxRequestPerSecond,
            maxRequestPerDay: data.maxRequestPerDay,
            maxRequestPerMonth: data.maxRequestPerMonth,
        }
        return entity
    }
}
