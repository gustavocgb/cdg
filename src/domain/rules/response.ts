import {ResponseConcrete} from "../entity/Response";

export interface ResponseEntity {
    id?: any | undefined
    fullAddress?: string | undefined
    publicPlace?: string | undefined
    number?: string | undefined
    district?: string | undefined
    zipCode?: string | undefined
    city?: string | undefined
    state?: string | undefined
    country?: string | undefined
    accuracy?: number | undefined
    latitude?: number | undefined
    longitude?: number | undefined
    placeType?: string | undefined
    longWestBBox?: number | undefined
    latNorthBBox?: number | undefined
    longEastBBox?: number | undefined
    latSouthBBox?: number | undefined
    searchId?: any | undefined
    geoServiceId?: any | undefined
    keyGeoServiceId?: any | undefined
    addressId?: any | undefined
}

export abstract class Response {

    abstract getId(): any
    abstract getFullAddress(): string
    abstract getPublicPlace(): string
    abstract getZipCode(): string
    abstract getPlaceType(): string
    abstract getNumber(): string
    abstract getDistrict(): string
    abstract getCity(): string
    abstract getState(): string
    abstract getCountry(): string
    abstract getAccuracy(): number
    abstract getLatitude(): number
    abstract getLongitude(): number
    abstract getLongWestBBox(): number
    abstract getLatNorthBBox(): number
    abstract getLongEastBBox(): number
    abstract getLatSouthBBox(): number
    abstract getSearchId(): any
    abstract getGeoServiceId(): any
    abstract getKeyGeoServiceId(): any
    abstract getAddressId(): any
    abstract getResponse(): ResponseEntity

    abstract setId(data: any): void
    abstract setFullAddress(data: string): void
    abstract setPublicPlace(data: string): void
    abstract setZipCode(data: string): void
    abstract setPlaceType(data: string): void
    abstract setNumber(data: string): void
    abstract setDistrict(data: string): void
    abstract setCity(data: string): void
    abstract setState(data: string): void
    abstract setCountry(data: string): void
    abstract setAccuracy(data: number): void
    abstract setLatitude(data: number): void
    abstract setLongitude(data: number): void
    abstract setLongWestBBox(data: number): void
    abstract setLatNorthBBox(data: number): void
    abstract setLongEastBBox(data: number): void
    abstract setLatSouthBBox(data: number): void
    abstract setSearchId(data: any): void
    abstract setGeoServiceId(data: any): void
    abstract setKeyGeoServiceId(data: any): void
    abstract setAddressId(data: any): void
    abstract setResponse(data: ResponseEntity): void

    public static createResponse(): Response {
        return new ResponseConcrete()
    }

}
