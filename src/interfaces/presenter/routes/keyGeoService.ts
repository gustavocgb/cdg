import {
    getKeyGeoServiceRepositoryFactory,
    postKeyGeoServiceRepositoryFactory,
    updateKeyGeoServiceRepositoryFactory
} from "../../../main/factories/keyGeoServiceRepository";
import {statusJson} from "../../adpters/route/statusJson";

export const keyGeoService = {
    route(route: any) {
        route.get('/keygeoservice', statusJson(getKeyGeoServiceRepositoryFactory()))
        route.post('/keygeoservice', statusJson(postKeyGeoServiceRepositoryFactory()))
        route.put('/keygeoservice', statusJson(updateKeyGeoServiceRepositoryFactory()))
    }
}

