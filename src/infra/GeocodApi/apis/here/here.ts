import {Geocoder} from "../../../../application/rules/geocoder/geocoder";
import {HttpGet} from "../../../../interfaces/gateway/http";
import {ResponseEntity, GeoServiceEntity, GeoService} from "../../../../domain/rules/index";
import {JsonMapper} from "../../mapper/jsonMapper";
import {KeyGeoService, KeyGeoServiceEntity} from "../../../../domain/rules/keyGeoService";
import { getMaxRequestsPerDay } from "../../helpers/get-max-requests-per-day";

export class Here extends Geocoder {

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
        return address.replace(/[&#?]/g, '')
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

        if (json.items) {
            for (let addr of json.items) {
                let obj:ResponseEntity = {
                    fullAddress: addr.address?.label?.toString(),
                    latitude: addr.position?.lat?parseFloat(addr.position.lat):undefined,
                    longitude: addr.position?.lng?parseFloat(addr.position.lng):undefined,
                    longWestBBox: addr.mapView?.west?parseFloat(addr.mapView.west):undefined,
                    latSouthBBox: addr.mapView?.south?parseFloat(addr.mapView.south):undefined,
                    longEastBBox: addr.mapView?.east?parseFloat(addr.mapView.east):undefined,
                    latNorthBBox: addr.mapView?.north?parseFloat(addr.mapView.north):undefined,
                    state: addr.address?.state?.toString(),
                    zipCode: addr.address?.postalCode?.toString(),
                    publicPlace: addr.address?.street?.toString(),
                    city: addr.address?.city?.toString(),
                    number: addr.address?.houseNumber?.toString(),
                    country: addr.address?.countryName?.toString(),
                    district: addr.address?.district?.toString(),
                    accuracy: addr.scoring?.queryScore?parseFloat(addr.scoring.queryScore):undefined,
                }
                array.push(obj)
            }
        }
        return array
    }
}

// super({
// name: "Here",
// apiKey: env.HERE_API_KEY,
// url: "https://geocode.search.hereapi.com/v1/geocode?q=*ADDRESS*&apiKey=*KEY*&in=countryCode:BRA&limit=1",
// isDay: true,
// maxRequest: 8333,
// maxRequestPerSecond: 5,
// isInitialHours00: true
// })
