import {getParams, postParams, SqlDrive, updateParams} from "../../sqlDrive";
import {SqlRepository, get, update, insert} from "../../../../../application/rules/repositories/sqlRepository/sqlRepository";

export class adptSqlRepository implements SqlRepository {

    readonly sqlDrive: SqlDrive
    readonly domain: string

    constructor(sqlDrive: SqlDrive, domain: string) {
        this.sqlDrive = sqlDrive
        this.domain = domain
    }

    async getById(data: get<any>) {
        return new Promise(async(resolve, reject) => {
            try {
                let response: any
                let params: getParams
                params = {
                    where: data?.where,
                    orderBy: data?.orderBy?.where,
                    skip: data?.skip,
                    take: data?.take,
                    cursor: data?.reference?.id
                }
                response = await this.sqlDrive.GetUnique(this.domain, params)
                if (response) resolve(response[0])
                resolve(null)
            } catch (e) {
                reject(e)
            }
        })
    }

    async get(data: get<any>) {
        return new Promise(async(resolve, reject) => {
            try {
                let params: getParams
                let response: any
                params = {
                    where: data?.where,
                    orderBy: data?.orderBy?.where,
                    skip: data?.skip,
                    take: data?.take,
                    cursor: data?.reference?.id
                }
                response = await this.sqlDrive.GetFirst(this.domain, params)
                if (response) resolve(response[0])
                resolve(null)
            } catch (e) {
                reject(e)
            }
        })
    }

    async getAll(data?: get<any>) {
        return new Promise(async(resolve, reject) => {
            try {
                let response: any
                let params: getParams
                params = {
                    where: data?.where,
                    orderBy: data?.orderBy?.where,
                    skip: data?.skip,
                    take: data?.take,
                    cursor: data?.reference?.id
                }
                response = await this.sqlDrive.GetMany(this.domain, params)
                if (response.length > 0) resolve(response)
                resolve(null)
            } catch (e) {
                reject(e)
            }
        })
    }

    async getCount(data?: get<any>) {
        return new Promise(async(resolve, reject) => {
            try {
                let params: getParams
                params = {
                    where: data?.where,
                    orderBy: data?.orderBy?.where,
                    skip: data?.skip,
                    take: data?.take,
                    cursor: data?.reference?.id
                }
                const response = await this.sqlDrive.Count(this.domain, params)
                // if response = 0 return null
                if (response) resolve(response)
                resolve(null)
            } catch (e) {
                reject(e)
            }
        })
    }

    async update(data: update<any>) {
        return new Promise(async(resolve, reject) => {
            try {
                let response: any
                let params: updateParams
                params = {
                    where: data?.where,
                    data: data?.set
                }
                response = await this.sqlDrive.UpdateMany(this.domain, params)
                resolve(response)
            } catch (e) {
                reject(e)
            }
        })
    }

    async updateById(data: update<any>) {
        return new Promise(async(resolve, reject) => {
            try {
                let response: any
                let params: updateParams
                params = {
                    where: data?.where,
                    data: data?.set
                }
                response = await this.sqlDrive.Update(this.domain, params)
                if (response) resolve(response)
                resolve(null)
            } catch (e) {
                reject(e)
            }
        })
    }

    async save(data: insert<any>) {
        return new Promise(async(resolve, reject) => {
            try {
                let response: any
                let params: postParams
                params = {
                    data: data?.data,
                }
                response = await this.sqlDrive.Post(this.domain, params)
                if (response) resolve(response)
                resolve(null)
            } catch (e) {
                reject(e)
            }
        })
    }

    async saveMany(data: insert<any>) {
        return new Promise(async(resolve, reject) => {
            try {
                let response: any
                let params: postParams
                params = {
                    data: data?.data,
                }
                response = await this.sqlDrive.PostMany(this.domain, params)
                if (response) resolve(response)
                resolve(null)
            } catch (e) {
                reject(e)
            }
        })
    }

    getDomain() {
        return this.domain as string
    }
}
