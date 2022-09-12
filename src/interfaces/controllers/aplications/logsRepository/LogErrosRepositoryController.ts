import { SystemProcessControls } from "../../../../application/rules/systemProcessControls/systemProcessControls";

export class LogErrosRepositoryController {
    readonly systemProcessControls: SystemProcessControls;

    constructor(systemProcessControls: SystemProcessControls) {
        this.systemProcessControls = systemProcessControls;
    }

    async handle(req: any) {
        try {
            let date = req?.query?.date;
            if (!date) {
                date = new Date().toISOString().split("T")[0];
            }

            try {
                const file = await this.systemProcessControls.readLogs("error", date);
                return file;
            } catch (e) {
                return "404 - Not Found.";
            }
        } catch (e) {
            console.error(e);
            return "server error";
        }
    }
}
