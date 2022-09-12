import {Geocoder} from "../../../../application/rules/geocoder/geocoder"
import {HttpGet} from "../../../../interfaces/gateway/http"
import {ResponseEntity, GeoServiceEntity, GeoService} from "../../../../domain/rules/index"
import {JsonMapper} from "../../mapper/jsonMapper"
import {KeyGeoService, KeyGeoServiceEntity} from "../../../../domain/rules/keyGeoService";
import { getMaxRequestsPerDay } from "../../helpers/get-max-requests-per-day";

export class MapBox extends Geocoder {

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
        return address.replace(/[,#;?]/g, '')
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
        let array: ResponseEntity[] = []

        if (json.features) {
            for (let addr of json.features) {
                let attributes: any[] = [
                    {
                        id: 'neighborhood',
                        text: undefined,
                    },{
                        id: 'place',
                        text: undefined,
                    },{
                        id: 'postcode',
                        text: undefined,
                    },{
                        id: 'region',
                        text: undefined,
                    },{
                        id: 'country',
                        text: undefined,
                    }
                ]

                if (addr.context) {
                    for (let context of addr.context) {
                        attributes.forEach(obj => {
                            if (context.id.split('.')[0] === obj.id) obj.text = context.text?.toString()
                        })
                    }
                }

                let obj:ResponseEntity = {
                    latitude: addr.geometry?.coordinates?parseFloat(addr.geometry.coordinates[1]):undefined,
                    longitude: addr.geometry?.coordinates?parseFloat(addr.geometry.coordinates[0]):undefined,
                    longWestBBox: addr.bbox ? parseFloat(addr.bbox[2]) : undefined,
                    latSouthBBox: addr.bbox ? parseFloat(addr.bbox[3]) : undefined,
                    longEastBBox: addr.bbox ? parseFloat(addr.bbox[0]) : undefined,
                    latNorthBBox: addr.bbox ? parseFloat(addr.bbox[1]) : undefined,
                    accuracy: addr.relevance?parseFloat(addr.relevance):undefined,
                    fullAddress: addr.place_name?.toString(),
                    number: addr.address?.toString(),
                    publicPlace: addr.text?.toString(),
                    placeType: addr.place_type?.length > 0 ? addr.place_type[0].toString() : undefined,
                    country: attributes[4].text,
                    city: attributes[1].text,
                    state: attributes[3].text,
                    district: attributes[0].text,
                    zipCode: attributes[2].text,
                }
                array.push(obj)
            }
        }
        return array
    }
}

// {
//     name: "MapBox",
//         apiKey: env.MAPBOX_API_KEY,
//     url: "https://api.mapbox.com/geocoding/v5/mapbox.places/*ADDRESS*.json?types=address&limit=1&country=BR&access_token=*KEY*",
//     maxRequest: 3333,
//     maxRequestPerSecond: 1
// }
