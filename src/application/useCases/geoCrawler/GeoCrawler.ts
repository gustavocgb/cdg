import {Address, AddressEntity, AddressSource, ResponseEntity} from "../../../domain/rules/index"
import {GeoCrawler} from "../../rules/geoCrawler/geoCrawler"
import {AddressCache} from "../../rules/addressCache/addressCache"
import {Geocoder} from "../../rules/geocoder/geocoder"
import {get, SqlRepository, update, insert} from "../../rules/repositories/sqlRepository/sqlRepository"
import {KeyGeoServiceEntity} from "../../../domain/rules/keyGeoService";
import {SearchEntity} from "../../../domain/rules/search";

export class GeoCrawlerConcrete implements GeoCrawler {

    readonly addressRepository: SqlRepository
    readonly responseRepository: SqlRepository
    readonly keyGeoServiceRepository: SqlRepository
    readonly searchRepository: SqlRepository
    readonly geocoder: Geocoder
    readonly address: Address
    readonly addressCache: AddressCache
    readonly addressSource: AddressSource

    constructor(
        geocoder: Geocoder,
        addressRepository: SqlRepository,
        responseRepository: SqlRepository,
        keyGeoServiceRepository: SqlRepository,
        searchRepository: SqlRepository,
        address: Address,
        addressCache: AddressCache,
        addressSource: AddressSource
    ){
        this.addressRepository = addressRepository
        this.responseRepository = responseRepository
        this.keyGeoServiceRepository = keyGeoServiceRepository
        this.searchRepository = searchRepository
        this.geocoder = geocoder
        this.address = address
        this.addressCache = addressCache
        this.addressSource = addressSource
    }

    async geocodify() {
        // --------------------- begin --------------------
        // flags
        let isFirstGetControls = true

        // objects
        let whereById = {id:this.geocoder.KeyGeoService().getId()}
        let dataUpdateRequests: update<KeyGeoServiceEntity>
        let dataUpdateFlags: update<KeyGeoServiceEntity>
        let dataGetKeyGeoService: get<KeyGeoServiceEntity> = {where: whereById}
        let dataSaveResponseGeoapi: insert<SearchEntity>

        // // variables
        let searchBody: ResponseEntity[]
        let search = undefined
        let errorMessage = undefined
        let logDate = undefined

        // update flags
        dataUpdateFlags = {
            where: whereById,
            set: {
                isGeocoding: true,
                isAddress: true,
                isDate: true,
                isRequests: true
            }
        }

        try {
            this.geocoder.KeyGeoService().setKeyGeoService(await this.keyGeoServiceRepository.updateById(dataUpdateFlags))

            for (let i=this.geocoder.KeyGeoService().getRequests(); i<=this.geocoder.GeoService().getMaxRequestPerDay(); i++) {
                // start algorithm
                // if not first request, get Controls
                if (!isFirstGetControls) this.geocoder.KeyGeoService().setKeyGeoService(await this.keyGeoServiceRepository.getById(dataGetKeyGeoService))

                // create a new Date for verify
                let currentDate = new Date()
                // verify date
                if (currentDate < this.geocoder.KeyGeoService().getDate()) this.geocoder.KeyGeoService().setIsDate(true); else this.geocoder.KeyGeoService().setIsDate(false)

                // verify requests
                if (this.geocoder.KeyGeoService().getRequests() < this.geocoder.GeoService().getMaxRequestPerDay()) {
                    this.geocoder.KeyGeoService().setIsRequests(true)
                } else {
                    this.geocoder.KeyGeoService().setIsRequests(false)
                }

                // verify address
                try {
                    this.address.setAddressData(await this.addressCache.queue())
                    this.geocoder.KeyGeoService().setIsAddress(true)
                } catch (e) {
                    this.geocoder.KeyGeoService().setIsAddress(false)
                    let error = (e as Error).message
                    console.error('Error: '+this.geocoder.GeoService().getName()+' key '+this.geocoder.KeyGeoService().getId()+'; '+error)
                }

                // verify general
                if (this.geocoder.KeyGeoService().getIsRequests() && this.geocoder.KeyGeoService().getIsDate() && this.geocoder.KeyGeoService().getIsAddress()) {
                    searchBody = []
                    search = null
                    errorMessage = null
                    logDate = new Date()

                    try{
                        // geocodify
                        search = await this.geocoder.responseGeoapi(this.address.getAddress())
                        // parse of response geoapi
                        searchBody = await this.geocoder.responseMapper(search?.body)
                        console.log('- '+this.geocoder.GeoService().getName()+' - key'+this.geocoder.KeyGeoService().getId()+' - '+logDate.toLocaleDateString()+' '+logDate.toLocaleTimeString()+' - '+'geocodify request id '+this.address.getId()+' from '+this.addressSource.getName())
                    } catch (e) {
                        errorMessage = (e as Error).message
                        console.error('ErrorApi: '+this.geocoder.GeoService().getName()+' - key'+this.geocoder.KeyGeoService().getId()+' - '+logDate.toLocaleDateString()+' '+logDate.toLocaleTimeString()+' - '+'geocodify request id ' +this.address.getId()+'; '+errorMessage)
                    }

                    // update requests
                    dataUpdateRequests = {
                        where: {id:this.geocoder.KeyGeoService().getId()},
                        set: {
                            requests: this.geocoder.KeyGeoService().getRequests()+1,
                            currentAddress: this.address.getId(),
                            referenceAddress: this.addressCache.getReference(),
                        }
                    }
                    // update requests, currentRequest and geocodify
                    await this.keyGeoServiceRepository.updateById(dataUpdateRequests)

                    dataSaveResponseGeoapi = {
                        data: {
                            keyGeoServiceId: this.geocoder.KeyGeoService().getId(),
                            geoServiceId: this.geocoder.GeoService().getId(),
                            addressId: this.address.getId(),
                            generatedResponse: searchBody && searchBody.length>0 ? true : false,
                            error: errorMessage?errorMessage:undefined,
                            date: new Date()
                        }
                    }
                    // save response geoapi
                    let responseGeoapi: SearchEntity = await this.searchRepository.save(dataSaveResponseGeoapi)

                    // save response geocodify
                    if (searchBody && searchBody.length>0) {
                        for (let obj of searchBody) {
                            obj.keyGeoServiceId = this.geocoder.KeyGeoService().getId()
                            obj.geoServiceId = this.geocoder.GeoService().getId()
                            obj.searchId = responseGeoapi.id
                            obj.addressId = this.address.getId()
                        }
                        await this.responseRepository.saveMany({data: searchBody})
                    }

                } else {
                    // stop geocoding and break for
                    console.log('- '+this.geocoder.GeoService().getName()+' - key'+this.geocoder.KeyGeoService().getId()+' - '+'Final loop')
                    if (!this.geocoder.KeyGeoService().getIsAddress()) console.log('- '+this.geocoder.GeoService().getName()+' - key'+this.geocoder.KeyGeoService().getId()+' - '+'Expired address')
                    if (!this.geocoder.KeyGeoService().getIsRequests()) console.log('- '+this.geocoder.GeoService().getName()+' - key'+this.geocoder.KeyGeoService().getId()+' - '+'Expired requests')
                    if (!this.geocoder.KeyGeoService().getIsDate()) console.log('- '+this.geocoder.GeoService().getName()+' - key'+this.geocoder.KeyGeoService().getId()+' - '+'Expired date')
                    this.geocoder.KeyGeoService().setIsGeocoding(false)
                    // update flags
                    dataUpdateFlags = {
                        where: {id: this.geocoder.KeyGeoService().getId()},
                        set: {
                            isGeocoding: this.geocoder.KeyGeoService().getIsGeocoding(),
                            isAddress: this.geocoder.KeyGeoService().getIsAddress(),
                            isDate: this.geocoder.KeyGeoService().getIsDate(),
                            isRequests: this.geocoder.KeyGeoService().getIsRequests()
                        }
                    }
                    await this.keyGeoServiceRepository.updateById(dataUpdateFlags)
                    // final loop
                    break
                }
                // set firstRequestGetControls
                isFirstGetControls = false
            }
        } catch (e) {
            let error = (e as Error).message
            console.error('Error: '+this.geocoder.GeoService().getName()+' - key'+this.geocoder.KeyGeoService().getId()+'; '+error)
        }
        // --------------------- end --------------------
    }

    async run() {
        return new Promise(async (resolve, reject) => {
            try {
                let whereById = {id:this.geocoder.KeyGeoService().getId()}
                let dataUpdateKeyGeoService: update<KeyGeoServiceEntity>

                // if initial date null, create date
                if (!this.geocoder.KeyGeoService().getInitialDate()) {
                    const createInitialDate = new Date()
                    let dataCreateDate: update<KeyGeoServiceEntity> = {
                        where:whereById,
                        set:{initialDate: createInitialDate}
                    }
                    this.geocoder.KeyGeoService().setKeyGeoService(await this.keyGeoServiceRepository.updateById(dataCreateDate))
                }

                // if validate date null, set date
                if (!this.geocoder.KeyGeoService().getDate() || (this.geocoder.KeyGeoService().getDate() < new Date())) {
                    let updateDate = new Date()
                    // if api is day, if initial at 00 hours set hours else add a day, else add one month
                    if (this.geocoder.KeyGeoService().getIsInitialZeroHours()) {
                        updateDate.setHours(23,59,59,0)
                    } else {
                        updateDate.setDate(updateDate.getDate() + 1)
                    }
                    if (!this.geocoder.KeyGeoService().getIsDay()) updateDate.setMonth(updateDate.getMonth() + 1)
                    dataUpdateKeyGeoService = {
                        where:whereById,
                        set: {
                            date: updateDate,
                            requests: 0,
                            isGeocoding: false,
                            isDate: true,
                        }
                    }
                    this.geocoder.KeyGeoService().setKeyGeoService(await this.keyGeoServiceRepository.updateById(dataUpdateKeyGeoService))
                    this.geocodify()
                } else {
                    if (this.geocoder.KeyGeoService().getIsInitialZeroHours()) {
                        this.geocodify()
                    } else {
                        let currentDate = new Date()
                        let updateDate = new Date()
                        if (this.geocoder.KeyGeoService().getDate().getDate() === currentDate.getDate()) {
                            let timeBlock = this.geocoder.KeyGeoService().getDate().getTime() - currentDate.getTime()
                            updateDate.setDate(updateDate.getDate() + 1)
                            setTimeout(async () => {
                                dataUpdateKeyGeoService = {
                                    where: whereById,
                                    set: {
                                        date: updateDate,
                                        requests: 0,
                                        isGeocoding: false,
                                        isDate: true,
                                    }
                                }
                                this.geocoder.KeyGeoService().setKeyGeoService(await this.keyGeoServiceRepository.updateById(dataUpdateKeyGeoService))
                                this.geocodify()
                            }, timeBlock)
                        } else {
                            this.geocodify()
                        }
                    }
                }
                resolve('ok')
            } catch (e) {
                console.error(new Date() +" - "+ (e as Error).message)
                return reject(e)
            }
        })
    }
}
