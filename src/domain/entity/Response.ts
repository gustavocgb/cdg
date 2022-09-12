import {Response, ResponseEntity} from "../rules/response";

export class ResponseConcrete implements Response {

    private id?: any | undefined
    private fullAddress?: string | undefined
    private publicPlace?: string | undefined
    private number?: string | undefined
    private district?: string | undefined
    private zipCode?: string | undefined
    private city?: string | undefined
    private state?: string | undefined
    private country?: string | undefined
    private accuracy?: number | undefined
    private latitude?: number | undefined
    private longitude?: number | undefined
    private placeType?: string | undefined
    private longWestBBox?: number | undefined
    private latNorthBBox?: number | undefined
    private longEastBBox?: number | undefined
    private latSouthBBox?: number | undefined
    private searchId?: any | undefined
    private geoServiceId?: any | undefined
    private keyGeoServiceId?: any | undefined
    private addressId?: any | undefined

    constructor() {}

    getResponse(): ResponseEntity {
        let obj: ResponseEntity = {
            id: this.id,
            accuracy: this.accuracy,
            city: this.city,
            country: this.country,
            fullAddress: this.fullAddress,
            latSouthBBox: this.latSouthBBox,
            longEastBBox: this.longEastBBox,
            district: this.district,
            latitude: this.latitude,
            latNorthBBox: this.latNorthBBox,
            number: this.number,
            longitude: this.longitude,
            placeType: this.placeType,
            publicPlace: this.publicPlace,
            zipCode: this.zipCode,
            longWestBBox: this.longWestBBox,
            state: this.state,
            searchId: this.searchId,
            addressId: this.addressId,
            keyGeoServiceId: this.keyGeoServiceId,
            geoServiceId: this.geoServiceId
        }
        return obj
    }

    setResponse(data: ResponseEntity) {
        this.id = data.id
        this.accuracy = data.accuracy
        this.city = data.city
        this.country = data.country
        this.fullAddress = data.fullAddress
        this.latSouthBBox = data.latSouthBBox
        this.longEastBBox = data.longEastBBox
        this.district = data.district
        this.latitude = data.latitude
        this.latNorthBBox = data.latNorthBBox
        this.number = data.number
        this.longitude = data.longitude
        this.placeType = data.placeType
        this.publicPlace = data.publicPlace
        this.zipCode = data.zipCode
        this.longWestBBox = data.longWestBBox
        this.state = data.state
        this.keyGeoServiceId = data.keyGeoServiceId
        this.geoServiceId = data.geoServiceId
        this.addressId = data.addressId
        this.searchId = data.searchId
    }

    getId() {
        return this.id as any
    }
    getAccuracy() {
        return this.accuracy as number
    }
    getCity() {
        return this.city as string
    }
    getCountry() {
        return this.country as string
    }
    getDistrict() {
        return this.district as string
    }
    getFullAddress() {
        return this.fullAddress as string
    }
    getLatNorthBBox() {
        return this.latNorthBBox as number
    }
    getLatSouthBBox() {
        return this.latSouthBBox as number
    }
    getLatitude() {
        return this.latitude as number
    }
    getLongEastBBox() {
        return this.longEastBBox as number
    }
    getLongWestBBox() {
        return this.longWestBBox as number
    }
    getLongitude() {
        return this.longitude as number
    }
    getNumber() {
        return this.number as string
    }
    getPlaceType() {
        return this.placeType as string
    }
    getPublicPlace() {
        return this.publicPlace as string
    }
    getState() {
        return this.state as string
    }
    getZipCode() {
        return this.zipCode as string
    }
    getAddressId() {
        return this.addressId as any
    }
    getGeoServiceId() {
        return this.geoServiceId as any
    }
    getSearchId() {
        return this.searchId as any
    }
    getKeyGeoServiceId() {
        return this.keyGeoServiceId as any
    }

    setId(id: any) {
        this.id = id
    }
    setAccuracy(data: number) {
        this.accuracy = data
    }
    setCity(data: string) {
        this.city = data
    }
    setCountry(data: string) {
        this.country = data
    }
    setDistrict(data: string) {
        this.district = data
    }
    setFullAddress(data: string) {
        this.fullAddress = data
    }
    setLatNorthBBox(data: number) {
        this.latNorthBBox = data
    }
    setLatSouthBBox(data: number) {
        this.latSouthBBox = data
    }
    setLatitude(data: number) {
        this.latitude = data
    }
    setLongEastBBox(data: number) {
        this.longEastBBox = data
    }
    setLongWestBBox(data: number) {
        this.longWestBBox = data
    }
    setLongitude(data: number) {
        this.longitude = data
    }
    setNumber(data: string) {
        this.number = data
    }
    setPlaceType(data: string) {
        this.placeType = data
    }
    setPublicPlace(data: string) {
        this.publicPlace = data
    }
    setState(data: string) {
        this.state = data
    }
    setZipCode(data: string) {
        this.zipCode = data
    }
    setAddressId(data: any) {
        this.addressId = data
    }
    setSearchId(data: any) {
        this.searchId = data
    }
    setKeyGeoServiceId(data: any) {
        this.keyGeoServiceId = data
    }
    setGeoServiceId(data: any) {
        this.geoServiceId = data
    }
}
