import {MapperEntity} from "../../interface/mapperEntity"
import {SearchModel} from "../../../models/index"
import {SearchEntity} from "../../../../domain/rules/search";

export let mapperSearchEntity: MapperEntity = {
    modelToEntity(data: SearchModel) {
        let entity: SearchEntity = {
            id: data.search_id,
            addressId: data.request_id,
            geoServiceId: data.geoapi_id,
            keyGeoServiceId: data.key_id,
            generatedResponse: data.generated_response,
            error: data.error,
            date: data.date,
        }
        return entity
    }
}
