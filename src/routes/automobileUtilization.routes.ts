import { Router } from 'express'

import automobileUtilizationController from '../controllers/automobileUtilization.controller' 

const automobileUtilizationRoutes = Router()

// automobileUtilizationRoutes.get('/', automobileUtilizationController.listAutomobileUtilizations)
automobileUtilizationRoutes.post('/create', automobileUtilizationController.createAutomobileUtilization)
automobileUtilizationRoutes.put('/finish/:id', automobileUtilizationController.finishAutomobileUtilization)

export default automobileUtilizationRoutes