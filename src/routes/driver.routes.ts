import { Router } from 'express'
import driverController from '../controllers/driver.controller'

const driverRoutes = Router()

driverRoutes.post('/create', driverController.createDriver)
driverRoutes.put('/update/:id', driverController.updateDriver)
driverRoutes.delete('/delete/:id', driverController.deleteDriver)


export default driverRoutes