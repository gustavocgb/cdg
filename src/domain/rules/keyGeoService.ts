import { KeyGeoServiceConcrete } from "../entity/KeyGeoService";

export type KeyGeoServiceEntity = {
    id?: any | undefined
    geoServiceId?: any | undefined
    name?: string | undefined
    key?: string | undefined
    url?: string | undefined
    initialDate?: Date | undefined
    date?: Date | undefined
    requests?: number | undefined
    currentAddress?: any | undefined
    referenceAddress?: any | undefined
    isDay?: boolean | undefined
    isInitialZeroHours?: boolean | undefined
    isGeocoding?: boolean | undefined
    isRequests?: boolean | undefined
    isAddress?: boolean | undefined
    isDate?: boolean | undefined
    isError?: boolean | undefined
    isActivated?: boolean | undefined
    isExcluded?: boolean | undefined
    maxRequestPerSecond?: number | undefined
    maxRequestPerDay?: number | undefined
    maxRequestPerMonth?: number | undefined
    email?: string | undefined
    password?: string | undefined
}

export abstract class KeyGeoService {

    abstract getId(): any
    abstract getName(): string
    abstract getKey(): string
    abstract getUrl(): string
    abstract getInitialDate(): Date
    abstract getDate(): Date
    abstract getRequests(): number
    abstract getCurrentAddress(): any
    abstract getReferenceAddress(): any
    abstract getIsDay(): boolean
    abstract getIsInitialZeroHours(): boolean
    abstract getIsGeocoding(): boolean
    abstract getIsRequests(): boolean
    abstract getIsAddress(): boolean
    abstract getIsDate(): boolean
    abstract getIsError(): boolean
    abstract getEmail(): string
    abstract getPassword(): string
    abstract getGeoServiceId(): any
    abstract getIsActivated(): boolean
    abstract getIsExcluded(): boolean
    abstract getMaxRequestPerSecond(): number
    abstract getMaxRequestPerDay(): number
    abstract getMaxRequestPerMonth(): number
    abstract getKeyGeoService(): KeyGeoServiceEntity

    abstract setId(data: any): void
    abstract setName(data: string): void
    abstract setKey(data: string): void
    abstract setUrl(data: string): void
    abstract setInitialDate(data: Date): void
    abstract setDate(data: Date): void
    abstract setRequests(data: number): void
    abstract setCurrentAddress(data: any): void
    abstract setReferenceAddress(data: any): void
    abstract setIsDay(data: boolean): void
    abstract setIsInitialZeroHours(data: boolean): void
    abstract setIsGeocoding(data: boolean): void
    abstract setIsRequests(data: boolean): void
    abstract setIsAddress(data: boolean): void
    abstract setIsDate(data: boolean): void
    abstract setIsError(data: boolean): void
    abstract setEmail(data: string): void
    abstract setPassword(data: string): void
    abstract setGeoServiceId(data: any): void
    abstract setIsActivated(data: boolean): void
    abstract setIsExcluded(data: boolean): void
    abstract setMaxRequestPerSecond(data: number): void
    abstract setMaxRequestPerDay(data: number): void
    abstract setMaxRequestPerMonth(data: number): void
    abstract setKeyGeoService(data: KeyGeoServiceEntity): void

    public static createKeyGeoService(data?: KeyGeoServiceEntity): KeyGeoService {
        return new KeyGeoServiceConcrete(data)
    }

}
