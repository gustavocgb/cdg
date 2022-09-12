import {sendTxt} from "../../adpters/route/send";
import {LogErrosRepositoryFactory, LogsRepositoryFactory} from "../../../main/factories/logsRepository";

export const logsRepository = {
    route(route: any) {
        route.get('/log/logs', sendTxt(LogsRepositoryFactory()))
        route.get('/log/error', sendTxt(LogErrosRepositoryFactory()))
    }
}

