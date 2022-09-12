
export abstract class SystemProcessControls {

    constructor() {}

    abstract restartApplication(): Promise<any>
    abstract removeLogs(): Promise<any>
    abstract readLogs(type: string, date: string): Promise<any>

}
