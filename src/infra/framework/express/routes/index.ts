import {addressCsv} from '../../../../interfaces/presenter/routes/addressCsv'
import {addressJson} from '../../../../interfaces/presenter/routes/addressJson'
import {home} from '../../../../interfaces/presenter/routes/home'
import {keyGeoService} from '../../../../interfaces/presenter/routes/keyGeoService'
import {logsRepository} from '../../../../interfaces/presenter/routes/logs'
import { Router } from 'express'

const route = Router();

// routes
home.route(route)
keyGeoService.route(route)
logsRepository.route(route)
addressCsv.route(route)
addressJson.route(route)

export const routes = route
