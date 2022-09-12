/**
 * get Params
 * @param {GeoServiceEntity} where - Object of GeoServiceEntity
 * @example where: {geoapiId: <Value>, ...}
 * @param {} orderBy - Object of object GeoServiceEntity with values String: 'asc' or 'desc'
 * @example orderBy: {where: {geoapiId: 'asc'}}
 * @param {} reference - Object of object GeoServiceEntity with primary key
 * @example reference: {id: {id: <Value>}}
 * @param {} skip - Number of elements to be skipped
 * @example skip: 2
 * @param {} take - Number of elements to be selected
 * @example take: 1
 */
export interface get<T> {
    where?: T
    orderBy?: {where: {}}
    reference?: {id: {}}
    skip?: number
    take?: number
}

/**
 * update Params
 * @param {GeoServiceEntity} id - Object of GeoServiceEntity, two id params
 * @example where: {id: <Value>, ...}
 * @param {} select - Object of object GeoServiceEntity with values Boolean
 * @example set: {isGeocoding: true, ...}
 */
export interface update<T> {
    where: T
    set: T
}

export interface insert<T> {
    data: T
}

export interface insertMany<T> {
    data: T[]
}

export abstract class SqlRepository {

    abstract get(data: get<any>): Promise<any>
    abstract getById(data: get<any>): Promise<any>
    abstract getAll(data?: get<any>): Promise<any>
    abstract getCount(data?: get<any>): Promise<any>
    abstract updateById(data: update<any>): Promise<any>
    abstract update(data: update<any>): Promise<any>
    abstract save(data: insert<any>): Promise<any>
    abstract saveMany(data: insertMany<any>): Promise<any>

    abstract getDomain(): string

    public static createSqlRepository(sqlRepositoryConcrete: SqlRepository): SqlRepository {
        return sqlRepositoryConcrete
    }
}
