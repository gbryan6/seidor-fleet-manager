import { Router } from 'express'

import driverUtilizationController from '../controllers/driverUtilization.controller' 

const driverUtilizationRoutes = Router()

driverUtilizationRoutes.post('/create', driverUtilizationController.createDriverUtilization)


export default driverUtilizationRoutes