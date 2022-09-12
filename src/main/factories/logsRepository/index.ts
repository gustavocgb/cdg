import { Pm2Commands } from "../../../infra/pm2/pm2Commands";
import { ChildProcess } from "../../../infra/systemProcess/childProcess/childProcess";
import { ProcessSystemProcessControls } from "../../../interfaces/adpters/process/application/useCases/systemProcessControls/processSystemProcessControls";
import {
    LogsRepositoryController,
    LogErrosRepositoryController,
} from "../../../interfaces/controllers/aplications/logsRepository";

export const LogsRepositoryFactory = (): any => {
    return new LogsRepositoryController(new ProcessSystemProcessControls(new ChildProcess(), new Pm2Commands()));
};

export const LogErrosRepositoryFactory = (): any => {
    return new LogErrosRepositoryController(new ProcessSystemProcessControls(new ChildProcess(), new Pm2Commands()));
};
