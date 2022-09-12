export abstract class LogRepository {

    abstract readLog(path: any): Promise<any>
    abstract readLogError(path: any): Promise<any>

}
