import { Router } from 'express'

import automobileController from '../controllers/automobile.controller'

const autobomileRoutes = Router()

autobomileRoutes.post('/create', automobileController.createAutomobile)

export default autobomileRoutes


