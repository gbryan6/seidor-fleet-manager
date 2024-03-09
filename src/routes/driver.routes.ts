import { Router } from 'express'
import driverController from '../controllers/driver.controller'

const driverRoutes = Router()


driverRoutes.get("/", driverController.listDrivers)
driverRoutes.get("/:id", driverController.getDriverById)
driverRoutes.post('/create', driverController.createDriver)
driverRoutes.put('/update/:id', driverController.updateDriver)
driverRoutes.delete('/delete/:id', driverController.deleteDriver)


export default driverRoutes