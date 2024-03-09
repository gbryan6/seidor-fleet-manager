import { Router } from 'express'

import automobileController from '../controllers/automobile.controller'

const automobileRoutes = Router()

automobileRoutes.post('/create', automobileController.createAutomobile)
automobileRoutes.put('/update/:id', automobileController.updateAutomobile)

export default automobileRoutes


