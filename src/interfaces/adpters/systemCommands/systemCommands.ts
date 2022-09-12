
export interface SystemCommands {
    restart(data: string): string
    readLogs(type: string, date: string): any
    removeLogs(type: string): string
}
