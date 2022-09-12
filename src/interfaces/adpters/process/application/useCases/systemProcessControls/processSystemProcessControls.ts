import {SystemProcessControls} from "../../../../../../application/rules/systemProcessControls/systemProcessControls";
import {Process} from "../../../process";
import {SystemCommands} from "../../../../systemCommands/systemCommands";

export class ProcessSystemProcessControls extends SystemProcessControls {

    readonly process: Process
    readonly systemCommands: SystemCommands

    constructor(process: Process, systemCommands: SystemCommands) {
        super();
        this.process = process
        this.systemCommands = systemCommands
    }

    async restartApplication() {
        return await this.process.execute(this.systemCommands.restart('SGM'))
    }

    async removeLogs(): Promise<any> {
        await this.process.execute(this.systemCommands.removeLogs('error'))
        await this.process.execute(this.systemCommands.removeLogs('out'))
    }

    async readLogs(type: string, date: string): Promise<any> {
        return await this.process.execute(this.systemCommands.readLogs(type, date))
    }

}
