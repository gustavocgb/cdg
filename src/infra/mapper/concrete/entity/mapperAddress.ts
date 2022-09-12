import {MapperEntity} from "../../interface/mapperEntity";
import {RequestModel} from "../../../models";
import {AddressEntity} from "../../../../domain/rules";

export let mapperAddress: MapperEntity = {
    modelToEntity(data: Model) {
        let entity: AddressEntity = {
            id: data.request_id,
            address: data.full_address
        }
        return entity
    }
}

type Model = (RequestModel)
