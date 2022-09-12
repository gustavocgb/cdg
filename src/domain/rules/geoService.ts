import { GeoServiceConcrete } from "../entity/GeoService";

export type GeoServiceEntity = {
    id?: any | undefined
    name?: string | undefined
    maxRequestPerSecond?: number | undefined
    maxRequestPerDay?: number | undefined
    maxRequestPerMonth?: number | undefined
}

export abstract class GeoService {

    abstract getId(): any
    abstract getName(): string
    abstract getMaxRequestPerSecond(): number
    abstract getMaxRequestPerDay(): number
    abstract getMaxRequestPerMonth(): number
    abstract getGeoService(): GeoServiceEntity

    abstract setId(data: any): void
    abstract setName(data: string): void
    abstract setMaxRequestPerSecond(data: number): void
    abstract setMaxRequestPerDay(data: number): void
    abstract setMaxRequestPerMonth(data: number): void
    abstract setGeoService(data: GeoServiceEntity): void

    public static createGeoService(data?: GeoServiceEntity): GeoService {
        return new GeoServiceConcrete(data)
    }

}
