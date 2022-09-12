import {MapperEntity} from "../../interface/mapperEntity"
import {ResponseModel} from "../../../models/index"
import {ResponseEntity} from "../../../../domain/rules";

export let mapperResponseEntity: MapperEntity = {
    modelToEntity(data: ResponseModel) {
        let entity: ResponseEntity = {
            id: data.geolocation_id,
            addressId: data.request_id,
            geoServiceId: data.geoapi_id,
            searchId: data.search_id,
            keyGeoServiceId: data.key_id,
            fullAddress: data.full_address,
            state: data.state,
            number: data.number,
            placeType: data.place_type,
            zipCode: data.zip_code,
            city: data.city,
            publicPlace: data.public_place,
            longitude: data.longitude,
            longWestBBox: data.longWestBBox,
            latitude: data.latitude,
            district: data.district,
            latNorthBBox: data.latNorthBBox,
            country: data.country,
            longEastBBox: data.longEastBBox,
            accuracy: data.accuracy,
            latSouthBBox: data.latSouthBBox
        }
        return entity
    }
}
