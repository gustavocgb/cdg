import {SqlDrive, getParams, updateParams, postParams} from "../../../../../interfaces/adpters/sql/sqlDrive";
import {PrismaClient} from "@prisma/client";
import {MapperEntity} from "../../../../mapper/interface/mapperEntity";
import {MapperModel} from "../../../../mapper/interface/mapperModel";
import {
    mapperGeoService,
    mapperKey,
    mapperRequest,
    mapperGeoapi,
    mapperAddress,
    mapperSearchModel,
    mapperResponseEntity,
    mapperResponseModel,
    mapperKeyGeoService,
    mapperSearchEntity
} from "../../../../mapper/concrete/index";

export class Prisma implements SqlDrive {

    readonly prisma: PrismaClient = new PrismaClient()

    async GetUnique(application: string, params: getParams): Promise<any> {
        return new Promise(async(resolve, reject) => {
            try {
                let query: any = []
                let appArray: App[]
                let objQuery: any

                appArray = getApp(application, this.prisma)
                if (appArray.length === 0) return []
                if (appArray.length > 1) appArray = sortApp(params, appArray)
                objQuery = getObjQuery(params, appArray)
                query = await appArray[0].prisma.findUnique(objQuery)
                if (query) resolve(getResponseMapper([query], appArray))
                resolve(query)
            } catch (e) {
                reject(e)
            }
        })
    }

    async GetFirst(application: string, params: getParams): Promise<any> {
        return new Promise(async(resolve, reject) => {
            try {
                let query: any
                let appArray: App[]
                let objQuery: any

                appArray = getApp(application, this.prisma)
                if (appArray.length === 0) return []
                if (appArray.length > 1) appArray = sortApp(params, appArray)
                objQuery = getObjQuery(params, appArray)
                query = await appArray[0].prisma.findFirst(objQuery)
                if (query) resolve(getResponseMapper([query], appArray))
                resolve(query)
            } catch (e) {
                reject(e)
            }
        })
    }

    async GetMany(application: string, params: getParams): Promise<any> {
        return new Promise(async(resolve, reject) => {
            try {
                let query: any
                let appArray: App[]
                let objQuery: any

                appArray = getApp(application, this.prisma)
                if (appArray.length === 0) return []
                if (appArray.length > 1) appArray = sortApp(params, appArray)
                objQuery = getObjQuery(params, appArray)
                query = await appArray[0].prisma.findMany(objQuery)
                if (query) resolve(getResponseMapper(query, appArray))
                resolve(query)
            } catch (e) {
                reject(e)
            }
        })
    }

    async Update(application: string, params: updateParams): Promise<any> {
        return new Promise(async(resolve, reject) => {
            try {
                let appArray: App[]
                let response: any

                appArray = getApp(application, this.prisma)
                if (appArray.length === 0) return []
                if (appArray.length > 1) appArray = sortApp(params, appArray)

                for (let app of appArray) {
                    let objQuery = updateParamsQuery(params, app)
                    if (Object.keys(objQuery.data).length !== 0) {
                        if (Object.keys(objQuery.where).length !== 0) {
                            response = await app.prisma.update(objQuery)
                        } else {
                            objQuery.where[app.pk] = response[app.pk]
                            let resp = await app.prisma.update(objQuery)
                            response = {...response, ...resp}
                        }
                    } else {
                        let query = getParamsQuery(params, app)
                        if (response) query.where[app.pk] = response[app.pk]
                        let resp = await app.prisma.findUnique(query)
                        response = {...response, ...resp}
                    }
                }
                resolve(appArray[0].mapperEntity.modelToEntity(response))
            } catch (e) {
                reject(e)
            }
        })
    }

    async Post(application: string, params: any): Promise<any> {
        return new Promise(async(resolve, reject) => {
            try {
                let appArray: App[]
                let response: any

                appArray = getApp(application, this.prisma)
                if (appArray.length === 0) return []
                // if (appArray.length > 1) appArray = sortApp(params, appArray)

                let objQuery = postParamsQuery(params, appArray[0])
                response = await appArray[0].prisma.create(objQuery)
                resolve(appArray[0].mapperEntity.modelToEntity(response))
            } catch (e) {
                reject(e)
            }
        })
    }

    async PostMany(application: string, params: any): Promise<any> {
        return new Promise(async(resolve, reject) => {
            try {
                let appArray: App[]
                let response: any
                let objQuery: any

                appArray = getApp(application, this.prisma)
                if (appArray.length === 0) return []
                // if (appArray.length > 1) appArray = sortApp(params, appArray)

                objQuery = postManyParamsQuery(params, appArray[0])
                response = await appArray[0].prisma.createMany(objQuery)
                resolve(response)
            } catch (e) {
                reject(e)
            }
        })
    }

    async Delete(application: string, params: any): Promise<any> {
        return Promise.resolve(undefined);
    }

    async Count(application: string, params: getParams): Promise<any> {
        return new Promise(async(resolve, reject) => {
            try {
                let query: any
                let appArray: App[]
                let objQuery: any

                appArray = getApp(application, this.prisma)
                if (appArray.length === 0) return []
                if (appArray.length > 1) appArray = sortApp(params, appArray)
                objQuery = getObjQuery(params, appArray)
                query = await appArray[0].prisma.count(objQuery)
                resolve(query)
            } catch (e) {
                reject(e)
            }
        })
    }

    async UpdateMany(application: string, params: updateParams): Promise<any> {
        return Promise.resolve(undefined);
    }
}

const getApp = (application: string, prisma: any) => {
    let app: any = []
    const config: App[] = [
        {
            entity: 'KeyGeoService',
            model: 'Key',
            prisma: prisma.key,
            mapperModel: mapperKey,
            mapperEntity: mapperKeyGeoService,
            pk: 'key_id'
        },{
            entity: 'GeoService',
            model: 'Geoapi',
            prisma: prisma.geoapi,
            mapperModel: mapperGeoapi,
            mapperEntity: mapperGeoService,
            pk: 'geoapi_id'
        },{
            entity: 'Search',
            model: 'Search',
            prisma: prisma.search,
            mapperModel: mapperSearchModel,
            mapperEntity: mapperSearchEntity,
            pk: 'search_id'
        },{
            entity: 'Response',
            model: 'Response',
            prisma: prisma.response,
            mapperModel: mapperResponseModel,
            mapperEntity: mapperResponseEntity,
            pk: 'geolocation_id'
        },{
            entity: 'Address',
            model: 'Request',
            prisma: prisma.request,
            mapperModel: mapperRequest,
            mapperEntity: mapperAddress,
            pk: 'request_id'
        }
    ]
    config.forEach(obj => {
        if (obj.entity === application) app.push(obj)
    })
    return app
}

const sortApp = (params: getParams, appArray: App[]) => {
    let sortArray: App[] = []
    if (params.where){
        appArray.forEach((app)=>{
            let getParams = getParamsQuery(params, app)
            if (Object.entries(getParams.where).length != 0){
                sortArray.unshift(app)
            } else {
                sortArray.push(app)
            }
        })
    }
    return sortArray
}

const getResponseMapper = (query: any, appArray: App[]) => {
    let response: any = []
    query.forEach((objQuery: any) => {
        let array: any = []
        appArray.forEach(app => {
            Object.entries(objQuery).forEach((query: any) => {
                if (query[0] === app.model) {
                    if (Array.isArray(query[1])){
                        query[1].forEach((objModel:any) => {
                            array.push(objModel)
                        })
                    } else {
                        array.push(query[1])
                    }
                    delete objQuery[app.model]
                }
            })
        })
        if (array.length > 0){
            array.forEach((model:any) => {
                let obj = {...objQuery, ...model}
                response.push(appArray[0].mapperEntity.modelToEntity(obj))
            })
        } else {
            response.push(appArray[0].mapperEntity.modelToEntity(objQuery))
        }
    })
    return response
}

const getObjQuery = (params: getParams, appArray: App[]) => {
    let objQuery: any = getParamsQuery(params, appArray[0])
    if (appArray.length > 1) objQuery['include'] = {}
    for (let i=1; i<appArray.length; i++){
        objQuery.include[appArray[i].model] = true
    }
    return objQuery
}

const updateParamsQuery = (params: updateParams, app: App) => {
    let obj: any = {
        where: params.where?app.mapperModel.entityToModel(params.where):undefined,
        data: params.data?app.mapperModel.entityToModel(params.data):undefined,
    }
    return obj
}

const postParamsQuery = (params: postParams, app: App) => {
    let obj: any = {
        data: params.data?app.mapperModel.entityToModel(params.data):undefined
    }
    return obj
}

const postManyParamsQuery = (params: postParams, app: App) => {
    let array: any = {}
    if (!params.data) return undefined
    array.data = params.data.map((obj: any) => {
        return app.mapperModel.entityToModel(obj)
    })
    return array
}

const getParamsQuery = (params: getParams, app: App) => {
    let obj: any = {
        where: params.where?app.mapperModel.entityToModel(params.where):undefined,
        cursor: params.cursor?app.mapperModel.entityToModel(params.cursor):undefined,
        skip: params.skip,
        select: params.select?app.mapperModel.entityToModel(params.select):undefined,
        orderBy: params.orderBy?app.mapperModel.entityToModel(params.orderBy):undefined,
        take: params.take,
        or: params.or
    }
    return obj
}

type App = {
    entity: string
    prisma: any
    mapperEntity: MapperEntity
    model: string
    mapperModel: MapperModel
    pk: string
}
