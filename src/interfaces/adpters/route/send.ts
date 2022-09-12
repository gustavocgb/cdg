import {Request, Response} from '../../../infra/framework/express/adapters/express-route-adapter'

export const sendTxt = (data: any) => {
    return async (req: Request, res: Response) => {
        const body = await data.handle(req)
        res.set({'Content-Type': 'text/plain'}).send(body)
    }
}
