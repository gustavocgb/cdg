import {Geocoder} from "../../../../application/rules/geocoder/geocoder"
import {HttpGet} from "../../../../interfaces/gateway/http"
import {JsonMapper} from "../../mapper/jsonMapper"
import {ResponseEntity, GeoServiceEntity, GeoService} from "../../../../domain/rules/index"
import {KeyGeoService, KeyGeoServiceEntity} from "../../../../domain/rules/keyGeoService";

export class TomTom extends Geocoder {

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
        return address.replace(/\//g, ' ').replace(/[#\(\)\.:;=?&\[\]{}|]/g, '')
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

        if (json.results) {
            for (let addr of json.results) {
                let obj:ResponseEntity = {
                    fullAddress: addr.address?.freeformAddress?.toString(),
                    latitude: addr.position?.lat?parseFloat(addr.position.lat):undefined,
                    longitude: addr.position?.lon?parseFloat(addr.position.lon):undefined,
                    longWestBBox: addr.viewport?.topLeftPoint?.lon?parseFloat(addr.viewport.topLeftPoint.lon):undefined,
                    latSouthBBox: addr.viewport?.btmRightPoint?.lat?parseFloat(addr.viewport.btmRightPoint.lat):undefined,
                    longEastBBox: addr.viewport?.btmRightPoint?.lon?parseFloat(addr.viewport.btmRightPoint.lon):undefined,
                    latNorthBBox: addr.viewport?.topLeftPoint?.lat?parseFloat(addr.viewport.topLeftPoint.lat):undefined,
                    city: addr.address?.municipality?.toString(),
                    district: addr.address?.municipalitySubdivision?.toString(),
                    country: addr.address?.country?.toString(),
                    publicPlace: addr.address?.streetName?.toString(),
                    state: addr.address?.countrySubdivision?.toString(),
                    zipCode: addr.address?.extendedPostalCode?.toString(),
                    number: addr.address?.streetNumber?.toString(),
                    accuracy: addr.score?parseFloat(addr.score):undefined
                }
                array.push(obj)
            }
        }
        return array
    }
}


// {
//     name: "TomTom",
//         apiKey: env.TOMTOM_API_KEY,
//     url: "https://api.tomtom.com/search/2/geocode/*ADDRESS*.json?key=*KEY*&limit=1&countrySet=BR",
//     maxRequest: 2500,
//     maxRequestPerSecond: 5
// }
