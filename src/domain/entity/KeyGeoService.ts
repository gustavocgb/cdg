import { KeyGeoService, KeyGeoServiceEntity } from '../rules/keyGeoService'

export class KeyGeoServiceConcrete implements KeyGeoService {

    private id?: any | undefined
    private geoServiceId?: any | undefined
    private name?: string | undefined
    private key?: string | undefined
    private url?: string | undefined
    private initialDate?: Date | undefined
    private date?: Date | undefined
    private requests?: number | undefined
    private currentAddress?: any | undefined
    private referenceAddress?: any | undefined
    private isDay?: boolean | undefined
    private isInitialZeroHours?: boolean | undefined
    private isGeocoding?: boolean | undefined
    private isRequests?: boolean | undefined
    private isAddress?: boolean | undefined
    private isDate?: boolean | undefined
    private isError?: boolean | undefined
    private email?: string | undefined
    private password?: string | undefined
    private isActivated?: boolean | undefined
    private isExcluded?: boolean | undefined
    private  maxRequestPerSecond?: number | undefined
    private maxRequestPerDay?: number | undefined
    private maxRequestPerMonth?: number | undefined

    constructor(data?: KeyGeoServiceEntity) {
        this.id = data?.id
        this.geoServiceId = data?.geoServiceId
        this.name = data?.name
        this.key = data?.key
        this.url = data?.url
        this.initialDate = data?.initialDate
        this.date = data?.date
        this.requests = data?.requests
        this.currentAddress = data?.currentAddress
        this.referenceAddress = data?.referenceAddress
        this.isDay = data?.isDay
        this.isInitialZeroHours = data?.isInitialZeroHours
        this.isGeocoding = data?.isGeocoding
        this.isRequests = data?.isRequests
        this.isAddress = data?.isAddress
        this.isDate = data?.isDate
        this.isError = data?.isError
        this.email = data?.email
        this.password = data?.password
        this.isActivated = data?.isActivated
        this.isExcluded = data?.isExcluded
        this.maxRequestPerSecond = data?.maxRequestPerSecond
        this.maxRequestPerDay = data?.maxRequestPerDay
        this.maxRequestPerMonth = data?.maxRequestPerMonth
    }

    getKeyGeoService(): KeyGeoServiceEntity {
        let obj: KeyGeoServiceEntity = {
            id: this.id,
            geoServiceId: this.geoServiceId,
            name: this.name,
            key: this.key,
            url: this.url,
            initialDate: this.initialDate,
            date: this.date,
            requests: this.requests,
            currentAddress: this.currentAddress,
            referenceAddress: this.referenceAddress,
            isDay: this.isDay,
            isInitialZeroHours: this.isInitialZeroHours,
            isGeocoding: this.isGeocoding,
            isRequests: this.isRequests,
            isAddress: this.isAddress,
            isDate: this.isDate,
            isError: this.isError,
            email: this.email,
            password: this.password,
            isExcluded: this.isExcluded,
            isActivated: this.isActivated,
            maxRequestPerMonth: this.maxRequestPerMonth,
            maxRequestPerSecond: this.maxRequestPerSecond,
            maxRequestPerDay: this.maxRequestPerDay
        }
        return obj
    }

    setKeyGeoService(data: KeyGeoServiceEntity) {
        this.id = data.id
        this.geoServiceId = data.geoServiceId
        this.name = data.name
        this.key = data.key
        this.url = data.url
        this.initialDate = data.initialDate
        this.date = data.date
        this.requests = data.requests
        this.currentAddress = data.currentAddress
        this.referenceAddress = data.referenceAddress
        this.isDay = data.isDay
        this.isInitialZeroHours = data.isInitialZeroHours
        this.isGeocoding = data.isGeocoding
        this.isRequests = data.isRequests
        this.isAddress = data.isAddress
        this.isDate = data.isDate
        this.isError = data.isError
        this.email = data.email
        this.password = data.password
        this.isActivated = data.isActivated
        this.isExcluded = data.isExcluded
        this.maxRequestPerSecond = data.maxRequestPerSecond
        this.maxRequestPerDay = data.maxRequestPerDay
        this.maxRequestPerMonth = data.maxRequestPerMonth
    }

    getName() {
        return this.name as string
    }
    getId() {
        return this.id as any
    }
    getKey() {
        return this.key as string
    }
    getUrl() {
        return this.url as string
    }
    getCurrentAddress() {
        return this.currentAddress as any
    }
    getDate() {
        return this.date as Date
    }
    getInitialDate() {
        return this.initialDate as Date
    }
    getIsAddress() {
        return this.isAddress as boolean
    }
    getIsDate() {
        return this.isDate as boolean
    }
    getIsDay() {
        return this.isDay as boolean
    }
    getIsGeocoding() {
        return this.isGeocoding as boolean
    }
    getIsInitialZeroHours() {
        return this.isInitialZeroHours as boolean
    }
    getIsRequests() {
        return this.isRequests as boolean
    }
    getReferenceAddress() {
        return this.referenceAddress as any
    }
    getRequests() {
        return this.requests as number
    }
    getEmail() {
        return this.email as string
    }
    getIsError() {
        return this.isError as boolean
    }
    getPassword() {
        return this.password as string
    }
    getGeoServiceId() {
        return this.geoServiceId as any
    }
    getIsActivated() {
        return this.isActivated as boolean
    }
    getIsExcluded() {
        return this.isExcluded as boolean
    }
    getMaxRequestPerSecond() {
        return this.maxRequestPerSecond as number
    }
    getMaxRequestPerDay() {
        return this.maxRequestPerDay as number
    }
    getMaxRequestPerMonth() {
        return this.maxRequestPerMonth as number
    }

    setCurrentAddress(data: any) {
        this.currentAddress = data
    }
    setDate(data: Date) {
        this.date = data
    }
    setId(data: any) {
        this.id = data
    }
    setInitialDate(data: Date) {
        this.initialDate = data
    }
    setIsAddress(data: boolean) {
        this.isAddress = data
    }
    setIsDate(data: boolean) {
        this.isDate = data
    }
    setIsDay(data: boolean) {
        this.isDay = data
    }
    setIsGeocoding(data: boolean) {
        this.isGeocoding = data
    }
    setIsInitialZeroHours(data: boolean) {
        this.isInitialZeroHours = data
    }
    setIsRequests(data: boolean) {
        this.isRequests = data
    }
    setName(data: string) {
        this.name = data
    }
    setReferenceAddress(data: any) {
        this.referenceAddress = data
    }
    setRequests(data: number) {
        this.requests = data
    }
    setUrl(data: string) {
        this.url = data
    }
    setEmail(data: string) {
        this.email = data
    }
    setIsError(data: boolean) {
        this.isError = data
    }
    setPassword(data: string) {
        this.password = data
    }
    setKey(data: string) {
        this.key = data
    }
    setGeoServiceId(data: any) {
        this.geoServiceId = data
    }
    setIsActivated(data: boolean) {
        this.isActivated = data
    }
    setIsExcluded(data: boolean) {
        this.isExcluded = data
    }
    setMaxRequestPerSecond(data: number) {
        this.maxRequestPerSecond = data
    }
    setMaxRequestPerDay(data: number) {
        this.maxRequestPerDay =  data
    }
    setMaxRequestPerMonth(data: number) {
        this.maxRequestPerMonth = data
    }
}
