import {MapperModel} from "../../interface/mapperModel"
import {SearchModel} from "../../../models/search"
import {SearchEntity} from "../../../../domain/rules/search";

export let mapperSearchModel: MapperModel = {
    entityToModel(data: SearchEntity) {
        let objModel: any = {}
        let model: SearchModel = {
            key_id: data.keyGeoServiceId,
            date: data.date,
            search_id: data.id,
            error: data.error,
            geoapi_id: data.geoServiceId,
            generated_response: data.generatedResponse,
            request_id: data.addressId
        }
        // filter obj, without the null
        let arrayModel = Object.entries(model).filter(([key, value]) => value !== undefined)
        for (let item of arrayModel) {
            objModel[item[0]] = item[1]
        }
        return objModel
    }
}
