import {Geocoder} from "../../../../application/rules/geocoder/geocoder"
import {HttpGet} from "../../../../interfaces/gateway/http"
import {ResponseEntity, GeoServiceEntity, GeoService} from "../../../../domain/rules/index"
import {JsonMapper} from "../../mapper/jsonMapper"
import {KeyGeoService, KeyGeoServiceEntity} from "../../../../domain/rules/keyGeoService";

export class OpenRouteService extends Geocoder {

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
        return address.replace(/[&#]/g, '')
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
        let array: any[] = []

        if (json.features) {
            for (let addr of json.features) {
                let obj:ResponseEntity = {
                    latitude: addr.geometry?.coordinates?parseFloat(addr.geometry.coordinates[1]):undefined,
                    longitude: addr.geometry?.coordinates?parseFloat(addr.geometry.coordinates[0]):undefined,
                    longWestBBox: addr.bbox?parseFloat(addr.bbox[2]):undefined,
                    latSouthBBox: addr.bbox?parseFloat(addr.bbox[3]):undefined,
                    longEastBBox: addr.bbox?parseFloat(addr.bbox[0]):undefined,
                    latNorthBBox: addr.bbox?parseFloat(addr.bbox[1]):undefined,
                    fullAddress: addr.properties?.label?.toString(),
                    city: addr.properties?.locality?.toString(),
                    district: addr.properties?.neighbourhood?.toString(),
                    country: addr.properties?.country?.toString(),
                    publicPlace: addr.properties?.street?.toString(),
                    state: addr.properties?.region?.toString(),
                    zipCode: addr.properties?.postalcode?.toString(),
                    number: addr.properties?.housenumber?.toString(),
                    accuracy: addr.properties && addr.properties.confidence?parseFloat(addr.properties.confidence):undefined,
                    placeType: addr.properties?.venue?.toString()
                }
                array.push(obj)
            }
        }
        return array
    }
}

// {
//     name: "OpenRouteService",
//         apiKey: env.ORS_API_KEY,
//     url: "https://api.openrouteservice.org/geocode/search?api_key=*KEY*&text=*ADDRESS*&boundary.country=BR&size=1",
//     maxRequest: 1000,
//     maxRequestPerSecond: 1
// }
