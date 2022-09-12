import { SystemCommands } from "../../interfaces/adpters/systemCommands/systemCommands";

export class Pm2Commands implements SystemCommands {
    restart() {
        return `pm2 restart 'SGM' --time`;
    }

    readLogs(type: string, date: string) {
        return `tail -n 10000 public/logs/sgm-${type}.log | grep "${date}"`;
    }

    removeLogs(type: string) {
        return type === "error"
            ? `
            grep -v $(date -d "$date -7 days" +"%Y-%m-%d") public/logs/sgm-error.log > public/logs/sgm-error-temp.log; 
            mv public/logs/sgm-error-temp.log public/logs/sgm-error.log
        `
            : `
            echo > public/logs/sgm-out.log
        `;
    }
}
