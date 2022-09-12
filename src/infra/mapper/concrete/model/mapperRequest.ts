import {RequestModel} from "../../../models/request";
import {AddressEntity} from "../../../../domain/rules/address";
import {MapperModel} from "../../interface/mapperModel";

export let mapperRequest: MapperModel = {
    entityToModel(data: AddressEntity) {
        let objModel: any = {}
        let model: RequestModel = {
            full_address: data.address,
            request_id: data.id,
            city: undefined,
            number: undefined,
            district: undefined,
            public_place: undefined,
            state: undefined,
            unit: undefined,
            zip_code: undefined
        }
        // filter obj, without the null
        let arrayModel = Object.entries(model).filter(([key, value]) => value != null)
        for (let item of arrayModel) {
            objModel[item[0]] = item[1]
        }
        return objModel
    }
}
