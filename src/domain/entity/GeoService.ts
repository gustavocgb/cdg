import { GeoService, GeoServiceEntity } from '../rules/geoService'

export class GeoServiceConcrete implements GeoService {

    private id?: any | undefined
    private name?: string | undefined
    private maxRequestPerSecond?: number | undefined
    private maxRequestPerDay?: number | undefined
    private maxRequestPerMonth?: number | undefined

    constructor(data?: GeoServiceEntity) {
        this.id = data?.id
        this.name = data?.name
        this.maxRequestPerSecond = data?.maxRequestPerSecond
        this.maxRequestPerDay = data?.maxRequestPerDay
        this.maxRequestPerMonth = data?.maxRequestPerMonth
    }

    getGeoService(): GeoServiceEntity {
        let obj: GeoServiceEntity = {
            id: this.id,
            name: this.name,
            maxRequestPerSecond: this.maxRequestPerSecond,
            maxRequestPerDay: this.maxRequestPerDay,
            maxRequestPerMonth: this.maxRequestPerMonth,
        }
        return obj
    }

    setGeoService(data: GeoServiceEntity) {
        this.id = data.id
        this.name = data.name
        this.maxRequestPerSecond = data.maxRequestPerSecond
        this.maxRequestPerDay = data.maxRequestPerDay
        this.maxRequestPerMonth = data.maxRequestPerMonth
    }

    getMaxRequestPerDay() {
        return this.maxRequestPerDay as number
    }
    getMaxRequestPerMonth() {
        return this.maxRequestPerMonth as number
    }
    getMaxRequestPerSecond() {
        return this.maxRequestPerSecond as number
    }
    getName() {
        return this.name as string
    }
    getId() {
        return this.id as any
    }

    setId(data: any) {
        this.id = data
    }
    setName(data: string) {
        this.name = data
    }
    setMaxRequestPerDay(data: number) {
        this.maxRequestPerDay = data
    }
    setMaxRequestPerMonth(data: number) {
        this.maxRequestPerMonth = data
    }
    setMaxRequestPerSecond(data: number) {
        this.maxRequestPerSecond = data
    }
}
