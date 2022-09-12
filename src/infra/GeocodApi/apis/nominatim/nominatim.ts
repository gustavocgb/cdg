import {Geocoder} from "../../../../application/rules/geocoder/geocoder"
import {HttpGet} from "../../../../interfaces/gateway/http"
import {ResponseEntity, GeoServiceEntity, GeoService} from "../../../../domain/rules/index"
import {JsonMapper} from "../../mapper/jsonMapper"
import {KeyGeoService, KeyGeoServiceEntity} from "../../../../domain/rules/keyGeoService";

export class Nominatim extends Geocoder {

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
        return address.replace(/[#?]/g, '').replace(/\s/g, '+').replace(/;/g, ',')
    }

    getFullUrl(address:string) {
        let fullUrl = this.keyGeoService.getUrl().replace('*ADDRESS*', address)
        return fullUrl.replace('*KEY*', this.keyGeoService.getKey())
    }

    async responseGeoapi(address: string) {
        return new Promise(async (resolve, reject) => {
            try{
                // await a second to request
                await new Promise(resolve => setTimeout(resolve, 4000))
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
        let array: any[] = []

        if (json) {
            for (let addr of json) {
                let obj:ResponseEntity = {
                    accuracy: addr.importance?parseFloat(addr.importance):undefined,
                    latitude: addr.lat?parseFloat(addr.lat):undefined,
                    longitude: addr.lon?parseFloat(addr.lon):undefined,
                    longWestBBox: addr.boundingbox?parseFloat(addr.boundingbox[2]):undefined,
                    latSouthBBox: addr.boundingbox?parseFloat(addr.boundingbox[3]):undefined,
                    longEastBBox: addr.boundingbox?parseFloat(addr.boundingbox[0]):undefined,
                    latNorthBBox: addr.boundingbox?parseFloat(addr.boundingbox[1]):undefined,
                    fullAddress: addr.display_name?.toString(),
                    city: addr.address?.town?.toString() || addr.address?.city?.toString(),
                    district: addr.address?.suburb?.toString(),
                    country: addr.address?.country?.toString(),
                    publicPlace: addr.address?.road?.toString(),
                    state: addr.address?.state?.toString(),
                    zipCode: addr.address?.postcode?.toString(),
                    number: addr.address?.house_number?.toString(),
                    placeType: addr.type?.toString(),
                }
                array.push(obj)
            }
        }
        return array
    }
}


// {
//     name: "Nominatim",
//         apiKey: undefined,
//     url: "https://nominatim.openstreetmap.org/?addressdetails=1&q=*ADDRESS*&format=json&countrycodes=BR&limit=1",
//     maxRequest: 8333,
//     maxRequestPerSecond: 1
// }
