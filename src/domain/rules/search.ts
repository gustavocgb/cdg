import {SearchConcrete} from "../entity/Search";

export interface SearchEntity {
    id?: any | undefined
    geoServiceId?: any | undefined
    keyGeoServiceId?: any | undefined
    addressId?: any | undefined
    date?: Date | undefined
    error?: string | undefined
    generatedResponse?: boolean | undefined
}

export abstract class Search {

    abstract getId(): any
    abstract getGeoServiceId(): any
    abstract getKeyGeoServiceId(): any
    abstract getAddressId(): any
    abstract getDate(): Date
    abstract getError(): string
    abstract getGeneratedResponse(): boolean
    abstract getSearch(): SearchEntity

    abstract setId(data: any): void
    abstract setGeoServiceId(data: any): void
    abstract setKeyGeoServiceId(data: any): void
    abstract setAddressId(data: any): void
    abstract setDate(data: Date): void
    abstract setError(data: string): void
    abstract setGeneratedResponse(data: boolean): void
    abstract setSearch(data: SearchEntity): void

    public static createSearch(): Search {
        return new SearchConcrete()
    }

}
