
export interface getParams {
    where?: {}
    select?: {}
    orderBy?: {}
    cursor?: {}
    skip?: number
    take?: number
    or?: boolean
}

export interface postParams {
    data?: any
}

export interface updateParams {
    where?: any
    data?: any
}

export interface deleteParams {
    id?: any
}

export interface SqlDrive {
    GetUnique(application: string, params: getParams): Promise<any>
    GetMany(application: string, params: getParams): Promise<any>
    GetFirst(application: string, params: getParams): Promise<any>
    Count(application: string, params: getParams): Promise<any>
    Post(application: string, params: postParams): Promise<any>
    PostMany(application: string, params: postParams): Promise<any>
    Update(application: string, params: updateParams): Promise<any>
    UpdateMany(application: string, params: updateParams): Promise<any>
    Delete(application: string, params: deleteParams): Promise<any>
}
