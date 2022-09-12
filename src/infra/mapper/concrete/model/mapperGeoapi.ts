import {MapperModel} from "../../interface/mapperModel"
import {GeoapiModel} from "../../../models/geoapi"
import {GeoServiceEntity} from "../../../../domain/rules/index"

export let mapperGeoapi: MapperModel = {
    entityToModel(data: GeoServiceEntity) {
        let objModel: any = {}
        let model: GeoapiModel = {
            geoapi_id: data.id,
            maxRequestPerDay: data.maxRequestPerDay,
            maxRequestPerSecond: data.maxRequestPerSecond,
            maxRequestPerMonth: data.maxRequestPerMonth
        }
        // filter obj, without the null
        let arrayModel = Object.entries(model).filter(([key, value]) => value != null)
        for (let item of arrayModel) {
            objModel[item[0]] = item[1]
        }
        return objModel
    }
}
