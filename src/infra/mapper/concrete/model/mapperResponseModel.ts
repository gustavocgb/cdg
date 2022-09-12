import {MapperModel} from "../../interface/mapperModel"
import {ResponseEntity} from "../../../../domain/rules/response"
import {ResponseModel} from "../../../models";

export let mapperResponseModel: MapperModel = {
    entityToModel(data: ResponseEntity) {
        let objModel: any = {}
        let model: ResponseModel = {
            geolocation_id: data.id,
            state: data.state,
            zip_code: data.zipCode,
            key_id: data.keyGeoServiceId,
            geoapi_id: data.geoServiceId,
            request_id: data.addressId,
            search_id: data.searchId,
            city: data.city,
            number: data.number,
            accuracy: data.accuracy,
            country: data.country,
            district: data.district,
            full_address: data.fullAddress,
            latitude: data.latitude,
            latNorthBBox: data.latNorthBBox,
            latSouthBBox: data.latSouthBBox,
            longEastBBox: data.longEastBBox,
            longitude: data.longitude,
            longWestBBox: data.longWestBBox,
            place_type: data.placeType,
            public_place: data.publicPlace
        }
        // filter obj, without the null
        let arrayModel = Object.entries(model).filter(([key, value]) => value !== undefined)
        for (let item of arrayModel) {
            objModel[item[0]] = item[1]
        }
        return objModel
    }
}
