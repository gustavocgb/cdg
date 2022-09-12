import {Controller} from "../../../gateway/controller/controller";
import {GeoCrawler} from "../../../../application/rules/geoCrawler/geoCrawler";
import {SystemProcessControls} from "../../../../application/rules/systemProcessControls/systemProcessControls";

export class GeoCrawlerController implements Controller {

    readonly geoCrawlers: GeoCrawler[]
    readonly systemProcessControls: SystemProcessControls

    constructor(geoCrawlers: GeoCrawler[], systemProcessControls: SystemProcessControls) {
        this.geoCrawlers = geoCrawlers
        this.systemProcessControls = systemProcessControls
    }

    async handle() {
        try {
            // routine
            let currentDate = new Date()
            let timeBlock: any
            // calculate time to end of date, in milliseconds
            let date00Hours = new Date()
            date00Hours.setHours(23,59,59,0)
            timeBlock = date00Hours.getTime() - currentDate.getTime()

            console.log("-- Crawler its runing... --")
            await Promise.all(this.geoCrawlers.map((resp: any) => (
                resp.run()
            )))

            // wait for end day for restart application
            setTimeout(async ()=> {
                try{
                    // await two minutes
                    await new Promise(resolve => setTimeout(resolve, 20000))

                    try {
                        await this.systemProcessControls.removeLogs()
                    } catch (e) {
                        console.error((e as Error).message)
                    }
                    await this.systemProcessControls.restartApplication()
                } catch (e) {
                    console.error(e)
                }
            }, timeBlock)

            return {
                statusCode: 200,
                body: {
                    ok: 'Crawler its runing..'
                }
            }

        } catch (e) {
            console.error(e)
            return {
                statusCode: 500,
                body: {
                    error: 'server error'
                }
            }
        }
    }
}
