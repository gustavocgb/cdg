import { GeoCrawler } from '../../../application/rules/geoCrawler/geoCrawler'
import { GetHttpsNode } from '../../../infra/http/httpsNode/GetHttpsNode'
import { Google, Here, TomTom, OpenRouteService, MapBox } from '../../../infra/GeocodApi/apis'
import { GeoCrawlerController } from "../../../interfaces/controllers/aplications/geoCrawler/GeoCrawlerController";
import { HttpsGetAdpter } from "../../../interfaces/adpters/http/http-getAdpter";
import {Prisma} from "../../../infra/db/techs/prisma/sqlDrive/Prisma";
import { ProcessSystemProcessControls } from "../../../interfaces/adpters/process/application/useCases/systemProcessControls/processSystemProcessControls";
import {ChildProcess} from "../../../infra/systemProcess/childProcess/childProcess";
import {Pm2Commands} from "../../../infra/pm2/pm2Commands";
import {GeoServiceEntity} from "../../../domain/rules/geoService";
import {Geocoder} from "../../../application/rules/geocoder/geocoder";
import {GeoCrawlerConcrete} from "../../../application/useCases/geoCrawler/GeoCrawler";
import {Address} from "../../../domain/rules/address";
import {AddressSource} from "../../../domain/rules/addressSource";
import {AddressCache} from "../../../application/rules/addressCache/addressCache";
import {AddressCacheConcrete} from "../../../application/useCases/addressCache/AddressCache";
import {get, SqlRepository} from "../../../application/rules/repositories/sqlRepository/sqlRepository";
import {adptSqlRepository} from "../../../interfaces/adpters/sql/application/repository/adptSqlRepository";
import {KeyGeoServiceEntity} from "../../../domain/rules/keyGeoService";
import {ResponseEntity} from "../../../domain/rules";

export const GeoCrawlerFactory = async () => {

    // list concretes apis
    const apis = [Google, Here, TomTom, OpenRouteService, MapBox]
    let promisesGeoCrawlers: any = []

    try {
        for (let api of apis) {
            let promise = new Promise(async (resolve, reject) => {
                let geoCrawlers: any = []
                let addressSource = AddressSource.createAddressSource({name: 'sql', sql: {tech: 'prisma'}})
                let addressRepository = await SqlRepository.createSqlRepository(new adptSqlRepository(new Prisma(), 'Address'))
                let geoServiceRepository = await SqlRepository.createSqlRepository(new adptSqlRepository(new Prisma(), 'GeoService'))
                let keyGeoServiceRepository = await SqlRepository.createSqlRepository(new adptSqlRepository(new Prisma(), 'KeyGeoService'))

                let dataGetGeoService: get<GeoServiceEntity> = {where:{id: api.name}}
                let dataKeyGetGeoService: get<KeyGeoServiceEntity> = {where: {geoServiceId: api.name, isActivated: true, isExcluded: false}}

                let apiData: GeoServiceEntity = await geoServiceRepository.getById(dataGetGeoService)
                let keys: KeyGeoServiceEntity[] = await keyGeoServiceRepository.getAll(dataKeyGetGeoService)

                if (keys){
                    try {
                        // stack
                        let take = keys.length*2
                        let addressArray = await addressRepository.getAll({take: -(take), reference: {id: {id: keys[0].referenceAddress}}})
                        let stack: any
                        stack = await verifyGeocoding(addressArray, apiData)
                        let addressCache: AddressCache = AddressCache.createAddressCache(
                            new AddressCacheConcrete(
                                await SqlRepository.createSqlRepository(
                                    new adptSqlRepository(
                                        new Prisma(),
                                        'Address'
                                    )),
                                stack,
                                keys[0].referenceAddress,
                                take
                            ))

                        for (let key of keys) {
                            // geoCrawler factory
                            let geoCrawler = GeoCrawler.createGeoCrawler(new GeoCrawlerConcrete(
                                    Geocoder.createGeocoder(new api(new HttpsGetAdpter(new GetHttpsNode()), apiData, key)),
                                    await SqlRepository.createSqlRepository(new adptSqlRepository(new Prisma(), 'Address')),
                                    await SqlRepository.createSqlRepository(new adptSqlRepository(new Prisma(), 'Response')),
                                    await SqlRepository.createSqlRepository(new adptSqlRepository(new Prisma(), 'KeyGeoService')),
                                    await SqlRepository.createSqlRepository(new adptSqlRepository(new Prisma(), 'Search')),
                                    Address.createAddress(),
                                    addressCache,
                                    addressSource
                                )
                            )
                            geoCrawlers.push(geoCrawler)
                        }
                        resolve(geoCrawlers)
                    } catch (e) {
                        console.error(e)
                        reject(e)
                    }
                } else {
                    console.error('Error: '+api.name+' no key for execution')
                    resolve(geoCrawlers)
                }
            })
            promisesGeoCrawlers.push(promise)
        }

        let factory = await Promise.all(promisesGeoCrawlers)
        let factoryGeoCrawlers: any = []
        factory.forEach((array:any) => {
            array.forEach((obj:any) => {
                factoryGeoCrawlers.push(obj)
            })
        })

        const crawler = new GeoCrawlerController(factoryGeoCrawlers, new ProcessSystemProcessControls(new ChildProcess(), new Pm2Commands()))
        return await crawler.handle()

    } catch (e) {
        console.error(e)
        return {
            statusCode: 500,
            body: {
                error: 'server error'
            }
        }
    }
}

const verifyGeocoding = async (addressArray:any, geoService:any): Promise<any> => {
    return new Promise(async(resolve, reject) => {
        try {
            let responseRepository = await SqlRepository.createSqlRepository(new adptSqlRepository(new Prisma(), 'Response'))
            let array = [...addressArray]
            for (let i=0; i<array.length; i++) {
                // get address of stack
                let dataWhere: ResponseEntity = {addressId: array[i].id, geoServiceId: geoService.id}
                // verify address geocodify
                let resp = await responseRepository.getCount({where: dataWhere})
                console.log('Geocoding verified: '+geoService.id+' - '+(i+1)+'/'+array.length)
                if (resp) addressArray.splice(addressArray.indexOf(array[i]), 1)
            }
            resolve(addressArray)
        } catch (e) {
            console.error(e)
            reject(e)
        }
    })
}

