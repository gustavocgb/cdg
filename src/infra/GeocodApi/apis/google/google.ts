import {Geocoder} from "../../../../application/rules/geocoder/geocoder";
import {HttpGet} from "../../../../interfaces/gateway/http";
import {ResponseEntity, GeoServiceEntity, GeoService} from "../../../../domain/rules/index";
import {JsonMapper} from "../../mapper/jsonMapper";
import {KeyGeoService, KeyGeoServiceEntity} from "../../../../domain/rules/keyGeoService";
import { getMaxRequestsPerDay } from "../../helpers/get-max-requests-per-day";

export class Google extends Geocoder {

    readonly httpGet: any
    readonly geoService: GeoService
    readonly keyGeoService: KeyGeoService

    constructor(httpGet: HttpGet<any, any>, geoServiceData?: GeoServiceEntity, keyGeoServiceData?: KeyGeoServiceEntity) {
        super()
        this.geoService = GeoService.createGeoService(geoServiceData)
        this.keyGeoService = KeyGeoService.createKeyGeoService(keyGeoServiceData)
        this.httpGet = httpGet
    }

    GeoService(): GeoService {
        return this.geoService
    }
    KeyGeoService(): KeyGeoService {
        return this.keyGeoService
    }

    getFormatedAddress(address: string) {
        return address.replace(/[&#]/g, '').replace(' ', '+');
    }

    getFullUrl(address:string) {
        let fullUrl = this.keyGeoService.getUrl().replace('*ADDRESS*', address)
        return fullUrl.replace('*KEY*', this.keyGeoService.getKey())
    }

    async responseGeoapi(address: string) {
        return new Promise(async (resolve, reject) => {
            try{
                // await a second to request
                await new Promise(resolve => setTimeout(resolve, 1000))
                const formatedAddress = this.getFormatedAddress(address)
                const resp = await this.httpGet.get({url:this.getFullUrl(formatedAddress) as string})
                resolve(resp)
            }catch (e: any) {
                reject(new Error(e))
            }
        })
    }

    async responseMapper(json: any) {
        return await mapper.responseJsonToEntity(json)
    }

}

let mapper: JsonMapper = {
    async responseJsonToEntity(json: any) {
        let array: Array<ResponseEntity> = [];

        if (json.results && json.status === "OK") {
            // for (const addr of json.results) {
            let addr = json.results[0]
                let obj: ResponseEntity = {};

                obj.fullAddress = addr.formatted_address;

                addr.address_components?.forEach((element: any) => {
                    obj.number = element.types.includes("street_number") ? element.long_name : obj.number;
                    obj.publicPlace = element.types.includes("route") ? element.long_name : obj.publicPlace;
                    obj.district = element.types.includes("sublocality_level_1") ? element.long_name : obj.district;
                    obj.zipCode = element.types.includes("postal_code") ? element.long_name : obj.zipCode;
                    obj.city = element.types.includes("administrative_area_level_2") ? element.long_name : obj.city;
                    obj.state = element.types.includes("administrative_area_level_1") ? element.long_name : obj.state;
                    obj.country = element.types.includes("country") ? element.long_name : obj.country;
                });

                obj.latitude = addr.geometry?.location?.lat;
                obj.longitude = addr.geometry?.location?.lng;

                obj.longWestBBox = addr.geometry?.viewport?.southwest.lng;
                obj.longEastBBox = addr.geometry?.viewport?.northeast.lng;
                obj.latNorthBBox = addr.geometry?.viewport?.northeast.lat;
                obj.latSouthBBox = addr.geometry?.viewport?.southwest.lat;

                obj.placeType = addr.types?.length > 0 ? addr.types[0] : undefined;

                array.push( obj );
            // }
            return array;
        } else if (json.status !== "ZERO_RESULTS") {
            const status = json?.status;
            const error = json?.error_message || "";

            throw new Error(`${status}: ${error}`);
        }

    }
}

// {
//     name: "Google",
//         apiKey: env.GOOGLE_API_KEY,
//     url: "https://maps.googleapis.com/maps/api/geocode/json?address=*ADDRESS*&key=*KEY*&components=country:BR",
//     maxRequest: 1333,
//     maxRequestPerSecond: 1
// }
