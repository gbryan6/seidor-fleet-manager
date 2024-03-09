import { Router } from 'express'
import driverController from '../controllers/driver.controller'

const driverRoutes = Router()

driverRoutes.post('/create', driverController.createDriver)


export default driverRoutes