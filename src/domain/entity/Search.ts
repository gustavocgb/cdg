import {Search, SearchEntity} from "../rules/search";

export class SearchConcrete implements Search {

    private id?: any | undefined
    private geoServiceId?: any | undefined
    private keyGeoServiceId?: any | undefined
    private addressId?: any | undefined
    private date?: Date | undefined
    private error?: string | undefined
    private generatedResponse?: boolean | undefined

    constructor() {}

    getSearch(): SearchEntity {
        let obj: SearchEntity = {
            id: this.id,
            date: this.date,
            generatedResponse: this.generatedResponse,
            error: this.error,
            addressId: this.addressId,
            keyGeoServiceId: this.keyGeoServiceId,
            geoServiceId: this.geoServiceId
        }
        return obj
    }

    setSearch(data: SearchEntity) {
        this.id = data.id
        this.date = data.date
        this.generatedResponse = data.generatedResponse
        this.error = data.error
        this.keyGeoServiceId = data.keyGeoServiceId
        this.geoServiceId = data.geoServiceId
        this.addressId = data.addressId
    }

    getId() {
        return this.id as any
    }
    getDate() {
        return this.date as Date
    }
    getError() {
        return this.error as string
    }
    getGeneratedResponse() {
        return this.generatedResponse as boolean
    }
    getAddressId() {
        return this.addressId as any
    }
    getGeoServiceId() {
        return this.geoServiceId as any
    }
    getKeyGeoServiceId() {
        return this.keyGeoServiceId as any
    }

    setId(id: any) {
        this.id = id
    }
    setDate(data: Date) {
        this.date = data
    }
    setError(data: string) {
        this.error = data
    }
    setGeneratedResponse(data: boolean) {
        this.generatedResponse = data
    }
    setAddressId(data: any) {
        this.addressId = data
    }
    setKeyGeoServiceId(data: any) {
        this.keyGeoServiceId = data
    }
    setGeoServiceId(data: any) {
        this.geoServiceId = data
    }
}
