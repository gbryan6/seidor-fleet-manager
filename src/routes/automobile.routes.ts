import { Router } from 'express'

import automobileController from '../controllers/automobile.controller'

const automobileRoutes = Router()

automobileRoutes.post('/create', automobileController.createAutomobile)

export default automobileRoutes


