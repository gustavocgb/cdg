import {GeoService} from "../../../domain/rules/geoService";
import {KeyGeoService} from "../../../domain/rules/keyGeoService";

export abstract class Geocoder {

    abstract getFormatedAddress(address: string): string
    abstract responseGeoapi(address: string): Promise<any>
    abstract responseMapper(json: any): Promise<any>

    abstract GeoService(): GeoService
    abstract KeyGeoService(): KeyGeoService

    public static createGeocoder(geocoderConcrete: Geocoder): Geocoder {
        return geocoderConcrete
    }

}
