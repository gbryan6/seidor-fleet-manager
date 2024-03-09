import { Router } from 'express'

import automobileUtilizationController from '../controllers/automobileUtilization.controller' 

const automobileUtilizationRoutes = Router()

automobileUtilizationRoutes.post('/create', automobileUtilizationController.createAutomobileUtilization)


export default automobileUtilizationRoutes