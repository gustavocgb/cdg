import * as childProcess from 'child_process'
import {Process} from "../../../interfaces/adpters/process/process";

export class ChildProcess implements Process {

    execute(data: any) {
        return new Promise((resolve, reject) => {
            childProcess.exec(data, (error, stdout, stderr) => {
                if (error) reject(error)
                if (stderr) reject(stderr)
                if (stdout) resolve(stdout)
                resolve('command successfully executed')
            });
        })
    }

}
